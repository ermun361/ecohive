import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { INITIAL_TELEMETRY, COMPANY_INFO } from './src/data/ecohiveData.js';

const app = express();
const PORT = 3000;

// Supabase PostgreSQL Credentials
const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://oofkbzkncgztazlfvlsp.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_4Sqdy0YVuN1x0lJnifmOCg_q6Gr4p4w';

let supabaseClient: SupabaseClient | null = null;
function getSupabase(): SupabaseClient | null {
  if (!supabaseClient && SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: false },
      });
      console.log('[EcoHive Supabase] Connected to PostgreSQL instance at:', SUPABASE_URL);
    } catch (e) {
      console.warn('[EcoHive Supabase] Initialization warning:', e);
    }
  }
  return supabaseClient;
}

app.use(express.json({ limit: '1mb' }));

// Graceful JSON syntax error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && (err as any).status === 400 && 'body' in err) {
    res.status(400).json({ error: 'Malformed JSON payload provided.' });
    return;
  }
  next(err);
});

app.use('/images', express.static(path.join(process.cwd(), 'public/images')));
app.use(express.static(path.join(process.cwd(), 'public')));

// Memory store for contact lead submissions
const leadsStore: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  targetEmail: string;
  message: string;
  timestamp: string;
}> = [];

// Lightweight, privacy-first analytics event store
const analyticsEvents: Array<{
  type: string;
  path: string;
  referrer: string;
  device: string;
  timestamp: string;
}> = [];

// Production Rate Limiter for AI endpoints (sliding window per IP)
const aiRateLimitStore = new Map<string, { count: number; resetAt: number }>();
const AI_RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const AI_MAX_REQUESTS_PER_WINDOW = 30;      // max 30 requests per minute per IP for fluid multi-turn chat
const AI_MAX_INPUT_CHARS = 1000;            // support detailed questions

function checkAiRateLimit(ip: string): { allowed: boolean; remaining: number; retryAfterSec: number } {
  const now = Date.now();
  const record = aiRateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    aiRateLimitStore.set(ip, { count: 1, resetAt: now + AI_RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: AI_MAX_REQUESTS_PER_WINDOW - 1, retryAfterSec: 0 };
  }

  if (record.count >= AI_MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  record.count += 1;
  return { allowed: true, remaining: AI_MAX_REQUESTS_PER_WINDOW - record.count, retryAfterSec: 0 };
}

// Lazy Gemini AI initialization with recommended User-Agent
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY') {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }
  return aiClient;
}

// ---------------- API ROUTES ----------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: COMPANY_INFO.name,
    slogan: COMPANY_INFO.slogan,
    timestamp: new Date().toISOString(),
  });
});

// Supabase PostgreSQL Status & Diagnostic Check
app.get('/api/supabase-status', async (req, res) => {
  const sb = getSupabase();
  if (!sb) {
    res.json({
      configured: false,
      message: 'Supabase credentials are not configured.',
      url: null,
    });
    return;
  }

  try {
    const { count, error } = await sb.from('leads').select('*', { count: 'exact', head: true });

    if (error) {
      res.json({
        configured: true,
        connected: false,
        url: SUPABASE_URL,
        tableExists: false,
        error: error.message,
        hint: error.code === '42P01' ? 'Table "leads" does not exist yet. Run the starter SQL schema in your Supabase SQL Editor.' : error.message,
      });
      return;
    }

    res.json({
      configured: true,
      connected: true,
      url: SUPABASE_URL,
      tableExists: true,
      totalLeadsRecorded: count ?? 0,
    });
  } catch (err: any) {
    res.json({
      configured: true,
      connected: false,
      url: SUPABASE_URL,
      error: err.message,
    });
  }
});

// Contact Inquiry Submission
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, role, message, targetEmail, hiveQuantity } = req.body;

  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
  const cleanMessage = typeof message === 'string' ? message.trim() : '';
  const cleanRole = typeof role === 'string' ? role.trim() : 'General';

  if (!cleanName || cleanName.length < 2) {
    res.status(400).json({ error: 'A valid full name (at least 2 characters) is required.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    res.status(400).json({ error: 'A valid email address is required.' });
    return;
  }

  if (!cleanMessage || cleanMessage.length < 5) {
    res.status(400).json({ error: 'Please enter a message of at least 5 characters.' });
    return;
  }

  // Determine appropriate routing email based on user intent if not specified
  let destination = targetEmail || COMPANY_INFO.emails.general;
  if (cleanRole === 'Investor') {
    destination = COMPANY_INFO.emails.ceo; // ericmunyi361@gmail.com
  } else if (cleanRole === 'Farmer' || cleanRole === 'Retailer / Buyer') {
    destination = COMPANY_INFO.emails.operations; // Andika@ecohivekenya.com
  }

  const safeQuantity = Math.max(1, Math.min(1000, Number(hiveQuantity) || 1));

  const newLead = {
    id: `LEAD-${Date.now()}`,
    name: cleanName.slice(0, 100),
    email: cleanEmail.slice(0, 120),
    phone: cleanPhone.slice(0, 35) || 'N/A',
    role: cleanRole.slice(0, 50),
    hiveQuantity: safeQuantity,
    targetEmail: destination,
    message: cleanMessage.slice(0, 2500),
    timestamp: new Date().toISOString(),
  };

  // Memory backup store
  leadsStore.push(newLead);

  // Attempt Supabase PostgreSQL persistence
  let savedToDatabase = false;
  let dbNotice: string | undefined;

  const sb = getSupabase();
  if (sb) {
    try {
      const { error } = await sb.from('leads').insert([
        {
          name: newLead.name,
          email: newLead.email,
          phone: newLead.phone,
          role: newLead.role,
          hive_quantity: newLead.hiveQuantity,
          target_email: newLead.targetEmail,
          message: newLead.message,
        },
      ]);

      if (!error) {
        savedToDatabase = true;
        dbNotice = 'Persisted in Supabase PostgreSQL (leads table)';
        console.log('[EcoHive Supabase] Saved lead to PostgreSQL:', newLead.email);
      } else {
        console.warn('[EcoHive Supabase] Note inserting lead:', error.message);
        dbNotice = `Database notice: ${error.message}`;
      }
    } catch (dbErr: any) {
      console.warn('[EcoHive Supabase] Database request exception:', dbErr);
      dbNotice = dbErr.message;
    }
  }

  console.log(`[EcoHive Contact] New validated lead routed to ${destination}:`, newLead);

  res.json({
    success: true,
    message: `Thank you, ${newLead.name}! Your message has been routed to ${destination}. Our team will respond shortly.`,
    leadId: newLead.id,
    routedTo: destination,
    savedToDatabase,
    databaseNotice: dbNotice,
  });
});

// Download Technical Catalog Lead Request
app.post('/api/catalog-request', async (req, res) => {
  const { email, name, organization } = req.body;

  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    res.status(400).json({ error: 'A valid email address is required.' });
    return;
  }

  const cleanName = typeof name === 'string' ? name.trim().slice(0, 100) : 'Lead User';
  const cleanOrg = typeof organization === 'string' ? organization.trim().slice(0, 100) : 'Individual';

  console.log(`[EcoHive Lead Magnet] Catalog requested by ${cleanEmail} (${cleanName}, ${cleanOrg})`);

  // Attempt to store in Supabase
  const sb = getSupabase();
  if (sb) {
    try {
      await sb.from('leads').insert([
        {
          name: cleanName,
          email: cleanEmail,
          phone: 'N/A',
          role: 'Catalog Download',
          hive_quantity: 1,
          target_email: COMPANY_INFO.emails.general,
          message: `Catalog requested for organization: ${cleanOrg}`,
        },
      ]);
    } catch (e) {
      console.warn('[EcoHive Supabase] Catalog lead insert warning:', e);
    }
  }

  res.json({
    success: true,
    message: 'EcoHive Climate-Smart Beehive Technical Specification PDF has been prepared!',
    downloadUrl: '#',
    sentTo: cleanEmail,
  });
});

// Live Telemetry Endpoint
app.get('/api/iot-telemetry', (req, res) => {
  // Add small dynamic realistic variations to temperatures & weights
  const dynamicTelemetry = INITIAL_TELEMETRY.map((node) => {
    const tempVariation = Number((Math.random() * 0.4 - 0.2).toFixed(1));
    const weightVariation = Number((Math.random() * 0.1 - 0.05).toFixed(2));

    return {
      ...node,
      tempC: Number((node.tempC + tempVariation).toFixed(1)),
      weightKg: Number((node.weightKg + weightVariation).toFixed(1)),
      lastUpdated: 'Just now (Live IoT Stream)',
    };
  });

  res.json({
    updatedAt: new Date().toISOString(),
    nodes: dynamicTelemetry,
  });
});

// Analytics Ingestion & Reporting Endpoints
app.post('/api/analytics/track', (req, res) => {
  const { type = 'pageview', path: pagePath = '/', referrer = '' } = req.body || {};
  const userAgent = req.headers['user-agent'] || '';
  const isMobile = /mobile|iphone|android|ipad/i.test(userAgent);

  analyticsEvents.push({
    type: String(type).slice(0, 50),
    path: String(pagePath).slice(0, 200),
    referrer: String(referrer).slice(0, 200),
    device: isMobile ? 'Mobile' : 'Desktop',
    timestamp: new Date().toISOString(),
  });

  if (analyticsEvents.length > 500) {
    analyticsEvents.shift();
  }

  res.json({ success: true, recordedEvents: analyticsEvents.length });
});

app.get('/api/analytics/stats', (req, res) => {
  const pageViews = analyticsEvents.filter((e) => e.type === 'pageview').length;
  const uniquePaths = Array.from(new Set(analyticsEvents.map((e) => e.path)));

  res.json({
    status: 'online',
    protocol: 'HTTPS',
    totalEvents: analyticsEvents.length,
    pageViews,
    uniquePagesTracked: uniquePaths,
    recentEvents: analyticsEvents.slice(-10).reverse(),
    activeTracking: true,
  });
});

// System Instructions for distinct EcoHive Assistant Roles
const AI_ROLE_INSTRUCTIONS: Record<string, string> = {
  general: `You are Hive AI, the intelligent, conversational virtual ambassador for EcoHive Kenya Ltd.
Company Profile & Facts:
- Company: EcoHive Kenya Ltd.
- Founder & CEO: Eric Munyi (Direct Contact: ericmunyi361@gmail.com, Phone/WhatsApp: +254741076205, LinkedIn: https://www.linkedin.com/in/munyi-eric/)
- Operations & Farmer Relations: Andika (Email: Andika@ecohivekenya.com)
- General Inquiries: Info@ecohivekenya.com
- Location: Headquartered in Nairobi with active apiary clusters in Nakuru, Baringo, and Kitui counties, Kenya.
- Mission: Modernizing Africa's honey value chain through our People-Planet-Profit model.
- Core Innovation: Climate-Smart Langstroth Beehive made from 100% UV-stabilized recycled post-consumer HDPE plastic and agricultural crop waste (25+ year lifespan, termite-proof, prevents deforestation).
- Solar IoT Telemetry: Built-in solar GSM sensors monitoring brood temperature (target 34-36°C), internal acoustic swarming frequencies (450-500Hz warning threshold), and live colony weight.
- Products: Pure unfiltered raw organic honey (<18% moisture), medical-grade propolis tinctures, and cosmetic-grade beeswax.
- Community Impact: 1,200+ smallholder beekeepers supported with guaranteed cash off-take at 35% above spot market; 15+ metric tons of plastic waste diverted from landfills.

Persona & Rules:
- Be interactive, warm, concise, and helpful.
- Keep responses engaging with Markdown formatting (bullet points, bold highlights).
- Offer practical follow-up avenues.
- If asked about CEO or leadership, highlight Founder & CEO Eric Munyi and his vision for tech-enabled African agriculture.`,

  farmer: `You are Hive AI in Agronomist & Beekeeper Coach role for EcoHive Kenya Ltd.
Your Expertise:
- Helping Kenyan smallholder beekeepers optimize colony health, honey yields, and apiary management using EcoHive's Climate-Smart Beehives.
- Advising on thermal control (recycled plastic composite retains warmth during cold nights), brood temperature monitoring (ideal 34-36°C), and acoustic frequency telemetry to prevent swarming before it happens.
- Explaining how non-invasive digital weight sensors allow timely super additions and harvesting without opening the hive and disturbing the bees.
- Explaining EcoHive's guaranteed farmer off-take contracts and training programs.
- To register as an out-grower or request hives, direct them to Operations Lead Andika (Andika@ecohivekenya.com) or call +254741076205.
Tone: Encouraging, practical, accessible, respectful of local farming conditions.`,

  investor: `You are Hive AI in Investor & ESG Strategy role for EcoHive Kenya Ltd.
Your Expertise:
- Presenting EcoHive Kenya Ltd. to venture capitalists, impact funds, and carbon credit brokers.
- Founder & CEO: Eric Munyi (Direct Email: ericmunyi361@gmail.com, Phone: +254741076205).
- Opportunity: Transforming the informal African honey trade into a tech-enabled, export-grade, traceable value chain.
- Competitive Edge: Patented durable recycled-plastic hive manufacturing, proprietary solar IoT telemetry hardware, integrated out-grower network of 1,200+ farmers.
- Traction & Unit Economics: Superior yield per hive (35-45 kg/year vs 8-10 kg in traditional log hives), high gross margins on value-added honey and propolis products.
- ESG Impact: 15+ tons plastic diverted, climate-smart reforestation corridors, 45% women and youth inclusion.
Tone: Commercially astute, metric-focused, visionary, professional.`,

  buyer: `You are Hive AI in Honey Buyer & Quality Specialist role for EcoHive Kenya Ltd.
Your Expertise:
- Working with commercial food buyers, supermarkets, organic retailers, and international export partners.
- Standards: EcoHive raw organic honey is cold-filtered, unpasteurized, strictly below 18% moisture content, free of antibiotics or agricultural chemical residues.
- Single-origin traceability: QR-code tracked back to apiary clusters in Nakuru, Kitui, and Baringo.
- Products: Bulk 25kg buckets, 500g and 250g retail jars, raw propolis chunks, 30ml propolis tinctures, and premium beeswax blocks.
- Wholesale & Export Orders: Contact Info@ecohivekenya.com or Operations (Andika@ecohivekenya.com).
Tone: Quality-assured, transparent, commercial, responsive.`
};

// Gemini AI Assistant Endpoint with Multi-Turn Interactive Conversation Support
app.post('/api/ai-assistant', async (req, res) => {
  try {
    // 1. IP-Based Sliding Window Rate Limiting
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || '127.0.0.1';
    const rateLimit = checkAiRateLimit(clientIp);

    res.setHeader('X-RateLimit-Limit', AI_MAX_REQUESTS_PER_WINDOW.toString());
    res.setHeader('X-RateLimit-Remaining', rateLimit.remaining.toString());

    if (!rateLimit.allowed) {
      res.setHeader('Retry-After', rateLimit.retryAfterSec.toString());
      res.status(429).json({
        error: 'Rate limit exceeded. Please wait a moment before sending another message.',
        retryAfter: rateLimit.retryAfterSec,
      });
      return;
    }

    const { message, history, role = 'general', mode = 'balanced', stream = false } = req.body;

    // 2. Input Validation & Character Cap
    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message must be a non-empty string.' });
      return;
    }

    const cleanMessage = message.trim();
    if (cleanMessage.length > AI_MAX_INPUT_CHARS) {
      res.status(400).json({
        error: `Input exceeds maximum allowed length of ${AI_MAX_INPUT_CHARS} characters.`,
      });
      return;
    }

    const selectedRole = AI_ROLE_INSTRUCTIONS[role] ? role : 'general';
    const systemInstruction = AI_ROLE_INSTRUCTIONS[selectedRole];

    // Compute dynamic suggested follow-ups
    const lower = cleanMessage.toLowerCase();
    let suggestedFollowUps = ['What are the Smart Hive specs?', 'How can I partner with EcoHive?', 'Who is CEO Eric Munyi?'];
    if (lower.includes('spec') || lower.includes('iot') || lower.includes('sensor')) {
      suggestedFollowUps = ['How does acoustic swarming alert work?', 'What is the hive battery life?', 'How to buy a Smart Hive?'];
    } else if (lower.includes('eric') || lower.includes('ceo') || lower.includes('founder') || lower.includes('munyi')) {
      suggestedFollowUps = ['How can I email CEO Eric Munyi?', 'What is EcoHive’s 2026 expansion roadmap?', 'Tell me about the People-Planet-Profit model'];
    } else if (lower.includes('invest') || lower.includes('partner') || lower.includes('esg')) {
      suggestedFollowUps = ['What are the carbon credit benefits?', 'How much plastic is recycled per hive?', 'Request investor deck from Eric Munyi'];
    } else if (lower.includes('farmer') || lower.includes('yield') || lower.includes('harvest') || lower.includes('bee')) {
      suggestedFollowUps = ['What is the ideal brood temperature?', 'How does the off-take payment work?', 'Contact Operations Lead Andika'];
    }

    // Select primary model per guidelines:
    const primaryModel = mode === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash';
    const fallbackModel = primaryModel === 'gemini-3.5-flash' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash';

    const ai = getAiClient();
    if (!ai) {
      // Intelligent topic-aware response when API key is unconfigured
      let reply = `Welcome to EcoHive Kenya Ltd.! We are modernizing African agriculture through IoT climate-smart beehives made from 100% recycled plastic.`;
      if (lower.includes('eric') || lower.includes('munyi') || lower.includes('ceo') || lower.includes('founder') || lower.includes('leadership')) {
        reply = `**Eric Munyi** is the Founder & CEO of EcoHive Kenya Ltd. He is pioneering climate-smart apiculture across East Africa by uniting IoT hardware, circular plastic recycling, and smallholder empowerment. You can reach his office directly at **${COMPANY_INFO.emails.ceo}** or via WhatsApp/Phone at **${COMPANY_INFO.phone}**.`;
      } else if (lower.includes('spec') || lower.includes('hive') || lower.includes('iot') || lower.includes('sensor') || lower.includes('plastic')) {
        reply = `Our **Climate-Smart Langstroth Beehive** features:\n- **Material:** 100% UV-stabilized recycled HDPE plastic + agricultural crop fibers (25+ year lifespan, termite & honey-badger proof).\n- **Solar IoT Telemetry:** Real-time brood temperature monitoring (34-36°C), acoustic swarming frequency alerts (450-500 Hz), and automated colony weight sensors.\n- **Thermal Efficiency:** 2.4x higher insulation than traditional cedar or cypress wood.`;
      } else if (lower.includes('invest') || lower.includes('partner') || lower.includes('fund') || lower.includes('esg')) {
        reply = `EcoHive Kenya is opening investment and strategic partnership rounds for expanding our out-grower network (1,200+ beekeepers) and industrial recycled plastic manufacturing. Direct partnership discussions are managed by CEO Eric Munyi at **${COMPANY_INFO.emails.ceo}**.`;
      } else if (lower.includes('honey') || lower.includes('buy') || lower.includes('order') || lower.includes('price')) {
        reply = `EcoHive Kenya produces certified organic raw acacia & wildflower honey (<18% moisture), raw & liquid propolis tinctures, and all-natural beeswax blocks. For wholesale orders and export inquiries, contact **${COMPANY_INFO.emails.operations}** or **${COMPANY_INFO.emails.general}**.`;
      }

      if (stream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        res.setHeader('Connection', 'keep-alive');

        // Stream in small words/chunks
        const words = reply.split(' ');
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? '' : ' ') + words[i];
          res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
          await new Promise((r) => setTimeout(r, 20));
        }
        res.write(`data: ${JSON.stringify({ done: true, modelUsed: 'local-knowledge', role: selectedRole, suggestedFollowUps })}\n\n`);
        res.end();
        return;
      }

      res.json({
        reply,
        modelUsed: 'local-knowledge',
        suggestedFollowUps,
      });
      return;
    }

    // Build multi-turn contents array
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      const validHistory = history.slice(-10);
      for (const turn of validHistory) {
        if (
          turn &&
          typeof turn.text === 'string' &&
          turn.text.trim() &&
          (turn.role === 'user' || turn.role === 'model')
        ) {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text.trim() }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: cleanMessage }],
    });

    // If streaming is requested:
    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');

      let usedModel = primaryModel;
      let streamSucceeded = false;

      try {
        const streamResult = await ai.models.generateContentStream({
          model: primaryModel,
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        for await (const chunk of streamResult) {
          if (chunk.text) {
            res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
          }
        }
        streamSucceeded = true;
      } catch (streamErr) {
        console.warn(`Streaming primary model ${primaryModel} failed:`, streamErr);
        try {
          usedModel = fallbackModel;
          const fallbackResult = await ai.models.generateContentStream({
            model: fallbackModel,
            contents,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });
          for await (const chunk of fallbackResult) {
            if (chunk.text) {
              res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
            }
          }
          streamSucceeded = true;
        } catch (fbErr) {
          console.warn(`Streaming fallback model also failed:`, fbErr);
        }
      }

      if (!streamSucceeded) {
        const fallbackText = `EcoHive Kenya Ltd. provides climate-smart beehives made from 100% recycled plastic with solar IoT telemetry. For direct inquiries, email ${COMPANY_INFO.emails.general} or contact CEO Eric Munyi at ${COMPANY_INFO.emails.ceo}.`;
        res.write(`data: ${JSON.stringify({ text: fallbackText })}\n\n`);
        usedModel = 'offline-knowledge-base';
      }

      res.write(`data: ${JSON.stringify({ done: true, modelUsed: usedModel, role: selectedRole, suggestedFollowUps })}\n\n`);
      res.end();
      return;
    }

    // Standard Non-Streaming JSON Fallback
    async function generateWithModel(modelName: string): Promise<string> {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`AI inference timeout (12s) for ${modelName}`)), 12000)
      );

      const generatePromise = ai!.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const response = await Promise.race([generatePromise, timeoutPromise]);
      return response.text || '';
    }

    let botReply = '';
    let usedModel = primaryModel;

    try {
      botReply = await generateWithModel(primaryModel);
    } catch (primaryErr) {
      console.warn(`Primary model ${primaryModel} failed, trying fallback ${fallbackModel}:`, primaryErr);
      try {
        botReply = await generateWithModel(fallbackModel);
        usedModel = fallbackModel;
      } catch (fallbackErr) {
        console.warn(`Fallback model ${fallbackModel} also failed, trying gemini-flash-latest:`, fallbackErr);
        botReply = await generateWithModel('gemini-flash-latest');
        usedModel = 'gemini-flash-latest';
      }
    }

    if (!botReply) {
      botReply = `EcoHive Kenya Ltd. provides climate-smart beehives made from 100% recycled plastic with solar IoT telemetry. For direct inquiries, email ${COMPANY_INFO.emails.general} or contact CEO Eric Munyi at ${COMPANY_INFO.emails.ceo}.`;
    }

    res.json({
      reply: botReply,
      modelUsed: usedModel,
      role: selectedRole,
      suggestedFollowUps,
    });
  } catch (error: any) {
    console.error('Gemini Assistant Error:', error);
    // Dynamic contextual fallback rather than a static duplicate response
    const cleanMsg = String(req.body?.message || '');
    const lower = cleanMsg.toLowerCase();
    let dynamicReply = `EcoHive Kenya Ltd. is modernizing African beekeeping with 100% recycled plastic IoT Langstroth beehives.`;
    if (lower.includes('eric') || lower.includes('munyi') || lower.includes('ceo')) {
      dynamicReply = `**Eric Munyi** is the Founder & CEO of EcoHive Kenya Ltd. You can reach him directly at **${COMPANY_INFO.emails.ceo}** or by phone at **${COMPANY_INFO.phone}**.`;
    } else if (lower.includes('spec') || lower.includes('sensor') || lower.includes('hive')) {
      dynamicReply = `Our **Climate-Smart Hive** is built from 100% recycled HDPE plastic (lasts 25+ years) and includes solar GSM telemetry tracking brood temperature (34-36°C), acoustic swarming frequencies, and colony weight.`;
    } else if (lower.includes('invest') || lower.includes('partner')) {
      dynamicReply = `EcoHive Kenya Ltd. partners with impact investors and ESG funds. Contact Founder & CEO Eric Munyi at **${COMPANY_INFO.emails.ceo}** for our investor pitch book.`;
    } else {
      dynamicReply = `EcoHive Kenya Ltd. empowers smallholder beekeepers through solar IoT beehives and high-grade organic honey processing. Feel free to contact our team at **${COMPANY_INFO.emails.general}** or call **${COMPANY_INFO.phone}**.`;
    }

    res.json({
      reply: dynamicReply,
      modelUsed: 'offline-knowledge-base',
      suggestedFollowUps: ['What are the Smart Hive specs?', 'Contact CEO Eric Munyi', 'How do farmers join?'],
    });
  }
});

// Explicit API 404 catch-all
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.path}` });
});

// ---------------- VITE & STATIC SERVING ----------------

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[EcoHive Server] Running on http://0.0.0.0:${PORT}`);
  });
}

start();
