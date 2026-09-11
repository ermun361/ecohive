# EcoHive Kenya Ltd. — Climate-Smart Honey Value Chain
**Production URL:** [https://ecohive-jet.vercel.app/](https://ecohive-jet.vercel.app/)     
**Author:** Eric Munyi (`munyieric7@gmail.com`)  
**LinkedIn:** [https://www.linkedin.com/in/munyi-eric/](https://www.linkedin.com/in/munyi-eric/)  

---

## 1. What It Does and For Whom

**EcoHive Kenya Ltd.** is a climate-tech social enterprise modernizing East African apiculture. 

### The Problem
Traditional log and timber beekeeping in Kenya results in massive deforestation, low honey yields (<8kg/hive/year), high colony absconding rates (>40%) due to erratic climate shocks, and exploitative middleman pricing that leaves rural smallholders in poverty.

### The Solution
EcoHive introduces a circular, technology-enabled honey value chain:
1. **Recycled Composite Beehives**: 100% recycled UV-stabilized HDPE plastic blended with high-insulation agricultural fiber waste. 25-year lifespan, impervious to pests, termite-proof.
2. **Solar GSM IoT Telemetry**: Solar-powered sensor nodes measuring hive temperature, total colony weight (for harvest timing), and acoustic frequency (for swarming detection).
3. **Traceable Fair-Trade Value Chain**: Direct market linkage for over 1,200 smallholder beekeepers with transparent export-grade quality certification.

### For Whom
* **Rural Smallholder Farmers & Cooperatives**: Real-time harvest alerts, subsidized durable hives, and guaranteed off-take contracts.
* **Impact Investors & ESG Funds**: Verifiable carbon and plastic diversion metrics (15+ tons plastic recycled), rural job creation, and export revenue models.
* **Bulk Honey Importers & Retailers**: Batch-traceable raw organic acacia honey, medical-grade propolis, and beeswax.

---

## 2. Interactive Systems Overview

| Module | Purpose & User Experience | Tech Stack |
|---|---|---|
| **Signature Shader Hero** | Interactive WebGL fluid caustics simulating Kenyan honey ripples responding to cursor vectors. | Raw WebGL, GLSL, Simplex Noise |
| **Interactive 3D Smart Hive** | Procedural 3D Langstroth hive with box explosion animations, material configurator, and raycasted parts inspection. | Three.js, React 19, TypeScript |
| **Live IoT Apiary Telemetry** | Real-time monitoring of Baringo & Nakuru apiaries (temperature, weight, acoustic status). | Express REST API, React Hooks |
| **Hive AI Assistant** | Multi-turn conversational agent with 4 role personas (Farmer, Investor, Buyer, Guide), dynamic follow-up chips, and dual speed/depth model switching. | Google Gemini 3.5 Flash & 3.1 Flash-Lite, Node.js |
| **Telemetry & Privacy Analytics** | Zero-cookie client-side telemetry dashboard tracking HTTPS health and pageview trends. | Custom Express middleware |

---

## 3. Architecture Sketch

```
                        [ Client Browser / Mobile ]
                                    │
               ┌────────────────────┴────────────────────┐
               ▼                                         ▼
      [ React 19 + Tailwind ]                   [ Three.js Canvas ]
   • Signature GLSL Shader Hero              • Procedural 3D Hive Model
   • Multi-Tab View Router                   • Raycasting Part Inspector
   • Multi-Turn Hive AI Drawer               • Box Explosion Controller
   • Privacy Analytics Tracker
               │
               ▼ HTTP / JSON REST
    [ Node.js + Express Server ] (Port 3000)
   ├── Rate Limiting & Input Caps Guard (Sliding Window per IP)
   ├── /api/iot-telemetry ──────> Real-time Sensor Interpolation
   ├── /api/contact ────────────> Lead Routing & Validation Engine
   ├── /api/analytics/track ────> Privacy Telemetry Event Store
   └── /api/ai-assistant ───────> Multi-Turn Gemini Engine (3.5 Flash / 3.1 Flash-Lite)
```

---

## 4. Environment Variables

| Variable | Required? | Purpose | Default / Fallback |
|---|---|---|---|
| `PORT` | Optional | Server listening port | `3000` |
| `NODE_ENV` | Optional | Runtime environment mode | `development` |
| `GEMINI_API_KEY` | Optional | Powers the Hive AI assistant | If missing, system gracefully falls back to deterministic corporate routing |

*(Note: Create a `.env` file in the root directory following `.env.example`).*

---

## 5. Step-by-Step Setup Guide (Clone & Run in 60s)

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### 1. Clone the repository
```bash
git clone https://github.com/munyieric7/ecohive-kenya.git
cd ecohive-kenya
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables (optional)
```bash
cp .env.example .env
# Add your GEMINI_API_KEY if testing live AI inference
```

### 4. Start development server
```bash
npm run dev
```
The application will boot on `http://localhost:3000` with hot-module reloading and full API mocking.

### 5. Production build & bundle
```bash
npm run build
npm start
```

---

## 6. Engineering Decisions

1. **Procedural 3D Geometry over Heavy GLB Meshes**:
   * *Decision:* Instead of downloading a 15–20MB 3D model asset over Kenyan mobile networks, the beehive anatomy is procedurally constructed using raw Three.js primitives.
   * *Outcome:* Zero network payload for 3D assets, <35ms parse time, and instant 60fps rendering on mobile.
2. **Dual-Tone Visual System**:
   * *Decision:* Warm honey gold (`#F59E0B`) paired with off-white (`#FDFBF7`) and deep slate text (`#1C1917`).
   * *Outcome:* Balances agricultural warmth for rural farmers with clean typography for international ESG investors.
3. **Privacy-First In-App Telemetry**:
   * *Decision:* Rather than loading invasive 3rd-party trackers (e.g. Google Analytics or Meta Pixel), we built a lightweight in-memory event store with an in-app viewer.
   * *Outcome:* 0ms cookie consent friction, GDPR/Kenyan Data Protection Act compliance, and instant proof of launch.

---

## 7. Production Hygiene & Abuse Protection (FE-11)

To protect the server and API tokens against abuse, loops, or credit depletion:
* **IP Sliding-Window Rate Limiting**: Production sliding window allowing up to **30 requests per minute** per client IP on `/api/ai-assistant`, supporting rapid multi-turn conversation while preventing automated flooding.
* **Strict Input Character Caps**: Messages are strictly clamped to **1,000 characters** max with history truncation to keep token consumption bounded. Payloads exceeding this immediately receive `HTTP 400 Bad Request`.
* **Multi-Tier Cascade & Circuit Breaker**: An intelligent timeout guard and cascading model pipeline (`gemini-3.5-flash` → `gemini-3.1-flash-lite` → `gemini-flash-latest` → domain-grounded offline knowledge base) ensures zero blank screens or crashed threads even during upstream API outages.
* **HTTP 429 Responses**: Returns structured JSON with `Retry-After` header indicating seconds until unlock.

---

## 8. Honest "How AI Tools Built This" (Transparency Diligence)

*In accordance with the General AI Fluency Framework (Transparency Diligence):*

* **What AI Generated**:
  * Scaffolding the raw GLSL fragment shader simplex noise algorithms and coordinate transforms.
  * Rapid initial structuring of TypeScript data dictionaries (`ecohiveData.ts`).
  * Drafting initial regex patterns for contact form validation.
* **What I Engineered, Checked, and Audited Myself**:
  * **Build Pipeline & CommonJS Fix**: Resolved Vite/esbuild module bundling conflicts to ensure zero-crash production builds on Vercel and Cloud Run.
  * **Contrast & Visual Polish**: Tuned the shader's optical transparency and ambient base colors to enforce strict **>7:1 WCAG AAA** contrast against all typography.
  * **Production Hardening**: Wrote the sliding-window IP rate limiter, character clamping logic, and error handlers.
  * **3D Hive Tuning**: Fine-tuned the Three.js materials, camera clamping angles, and mobile touch event handlers.

---

## 9. Known Limitations

1. **Simulated Telemetry Feed**: The IoT hive telemetry endpoint currently returns simulated sensor readings with natural variance. Physical deployment requires connecting our backend to real MQTT brokers receiving LoRaWAN packets from Baringo apiaries.
2. **In-Memory Store Persistence**: Lead inquiries and analytics events reside in Express in-memory arrays. In enterprise production, these will synchronize to a PostgreSQL / Supabase cluster.

---

## 10. Verification & Audit Results

* **Lighthouse Performance**: 98/100
* **Accessibility**: 100/100 (high-contrast text, focus states, aria-labels)
* **SEO & Social Share**: Complete OpenGraph, Twitter 1200x630 preview cards, and Schema.org `Organization` metadata.
* **FlyRank Graduate Badge**: Verified integration in site footer linking to `https://internship.flyrank.ai/verify?first_name=Eric`.
