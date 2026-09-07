import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_TELEMETRY, COMPANY_INFO } from './src/data/ecohiveData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

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

// Lazy Gemini AI initialization
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY') {
      aiClient = new GoogleGenAI({ apiKey: key });
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

// Contact Inquiry Submission
app.post('/api/contact', (req, res) => {
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
    destination = COMPANY_INFO.emails.ceo; // Gitau@ecohivekenya.com
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

  leadsStore.push(newLead);

  console.log(`[EcoHive Contact] New validated lead routed to ${destination}:`, newLead);

  res.json({
    success: true,
    message: `Thank you, ${newLead.name}! Your message has been routed to ${destination}. Our team will respond shortly.`,
    leadId: newLead.id,
    routedTo: destination,
  });
});

// Download Technical Catalog Lead Request
app.post('/api/catalog-request', (req, res) => {
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

// Gemini AI Assistant Endpoint
app.post('/api/ai-assistant', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message must be a non-empty string.' });
      return;
    }

    const cleanMessage = message.trim().slice(0, 1000);

    const ai = getAiClient();
    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured
      res.json({
        reply: `EcoHive Kenya Ltd. is modernizing African agriculture through IoT climate-smart beehives made from 100% recycled plastic. You can contact Peter Gitau (CEO) at Gitau@ecohivekenya.com or Operations at Andika@ecohivekenya.com. Phone: +254 726 988 151.`,
      });
      return;
    }

    const prompt = `You are Hive AI, the intelligent virtual assistant for EcoHive Kenya Ltd.
Company Details:
- Name: EcoHive Kenya Ltd.
- Slogan: "People | Planet | Profit"
- Tagline: "Building Africa’s Technology-Enabled Honey Value Chain"
- CEO: Peter Gitau (Email: Gitau@ecohivekenya.com)
- Operations & Sales: Andika (Email: Andika@ecohivekenya.com)
- General Info: Info@ecohivekenya.com
- Phone: +254 726 988 151
- Flagship Product: Climate-Smart Langstroth Beehive made from UV-stabilized recycled HDPE plastic and thermal agricultural fiber composites, equipped with solar IoT telemetry sensors (Temperature, Weight, Acoustics).
- Products: Organic Raw Honey, Medical-grade Propolis, Beeswax Soap.
- Mission: Empower Kenyan beekeeping families, eliminate plastic waste, and create high-yield traceable honey for global export.

User question: "${cleanMessage}"

Provide a friendly, authoritative, dual-tone answer (balancing technical specs for investors with community warmth for farmers). Keep response concise (under 150 words).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const reply = response.text || 'Thank you for contacting EcoHive Kenya Ltd. Please reach out to Info@ecohivekenya.com for more details.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: 'Failed to process query',
      reply: 'EcoHive Kenya Ltd. offers climate-smart beehives and IoT value chain solutions. For direct queries, email Info@ecohivekenya.com.',
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
      server: { middlewareMode: true },
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
