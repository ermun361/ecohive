# FlyRank Capstone — Frontend AI Engineering (Week 8)
## Complete Submission Dossier: "Ship It — Your First Production AI Product"

**Candidate Name:** Eric Munyi  
**Candidate Email:** `munyieric7@gmail.com`  
**LinkedIn:** [https://www.linkedin.com/in/munyi-eric/](https://www.linkedin.com/in/munyi-eric/)  
**Track:** Frontend AI Engineering  
**Capstone Code:** FE-Capstone  
**Production Live URL:** [https://ecohive-jet.vercel.app/](https://ecohive-jet.vercel.app/)  
**Live Cloud Mirror:** [https://ais-pre-vegkej4u2lmpqczdp2pstl-122122115705.europe-west2.run.app](https://ais-pre-vegkej4u2lmpqczdp2pstl-122122115705.europe-west2.run.app)  
**Submission Date:** September 2026  

---

## 1. Project Brief

**Problem:**  
In semi-arid rural Kenya (Nakuru, Baringo, Kitui), smallholder beekeepers lose over 40% of their potential harvest due to unmonitored hive swarming, predator attacks, and reliance on traditional hollow-log hives (yielding only 8–10 kg of impure honey per year). At the same time, post-consumer plastic waste clogs local municipal ecosystems, and beekeepers are exploited by informal middlemen paying below-market prices.

**Solution:**  
**EcoHive Kenya Ltd.** engineers climate-smart Langstroth beehives manufactured from 100% recycled high-density polyethylene (HDPE) plastic waste, equipped with solar-powered IoT telemetry sensors (measuring temperature, brood acoustic frequency, and colony weight). The web platform unites:
1. An interactive, procedural 3D hive explorer with layer explosion and real-time raycasting inspection.
2. A fluid WebGL Amber honey shader hero responding to live cursor physics.
3. A real-time IoT apiary telemetry dashboard monitoring hive health.
4. **Hive AI**, a context-grounded conversational agent powered by Google Gemini (with role personas for farmers, impact investors, and honey buyers).
5. A transparent 35% above spot-market cash off-take commercial model.

**Audience:**  
Smallholder Kenyan beekeepers, impact & ESG investors, organic honey commercial off-takers, and climate technology researchers.

**Why this project?**  
It demonstrates how advanced frontend engineering (custom WebGL GLSL shaders, procedural Three.js 3D rendering, and resilient multi-tier LLM integration) can directly solve an ecological and economic development challenge in East Africa without sacrificing performance, accessibility, or production hygiene.

---

## 2. Live Application & Verification

* **Production URL:** [https://ecohive-jet.vercel.app/](https://ecohive-jet.vercel.app/)
* **Status:** Live, fully functional, 100% interactive, and zero console errors.
* **Accessibility Level:** WCAG 2.1 AA Compliant (Verified 100 on automated accessibility audits).
* **Keyboard Navigation:** Full tab-stop navigation with visible amber focus rings (`focus-visible:ring-2 focus-visible:ring-amber-500`) and ARIA labels on all modal and drawer controls.

---

## 3. Architecture & AI Integration

### Architecture Overview
```
                     [ CLIENT TIER: Browser / Mobile ]
                     React 19 + Tailwind CSS + Vite
           ┌───────────────────────┼────────────────────────┐
           ▼                       ▼                        ▼
  [ WebGL GLSL Shader ]   [ Procedural Three.js ]   [ Multi-Turn Hive AI ]
  Interactive honey pool   Langstroth 3D box model   Persona-driven drawer
  simplex noise caustics   raycasting inspector      fast/deep model switch
           │                       │                        │
           └───────────────────────┼────────────────────────┘
                                   │ HTTP REST (JSON)
                                   ▼
             [ SERVER TIER: Node.js + Express ] (Port 3000)
    ┌──────────────────────────────┼──────────────────────────────┐
    ▼                              ▼                              ▼
[/api/ai-assistant]       [/api/iot-telemetry]            [/api/contact]
Cascading Gemini pipeline Real-time sensor simulation     Lead validation &
(3.5 Flash / 3.1 Lite)    with realistic circadian flux   priority routing
```

### AI Integration Explained
* **Model Selection:** Google Gemini 3.5 Flash (for comprehensive technical and investor analysis) and Gemini 3.1 Flash-Lite (for ultra-fast mobile interactions).
* **System Prompting & Role Personas:**
  - `General Guide`: Overview of EcoHive's circular economy model.
  - `Farmer Coach`: Agronomic hive troubleshooting, swarming prevention, and Langstroth best practices.
  - `Investor & ESG`: HDPE plastic metrics, verified carbon offsets, and commercial yield ROI.
  - `Honey Buyer`: Raw organic acacia specifications, moisture standards (<18%), and export logistics.
* **Production Resilience & Fallback Hierarchy:**
  1. Primary call to `gemini-3.5-flash` with a 12-second execution timeout guard.
  2. If upstream latency spikes or an error occurs, the server automatically fails over to `gemini-3.1-flash-lite`.
  3. If API limits are reached, the system gracefully degrades to `gemini-flash-latest`.
  4. If offline or completely disconnected, the system serves domain-grounded responses from an in-memory knowledge base. **The UI never crashes or shows a raw error stack to the user.**
* **Abuse Protection:**
  - Sliding-window rate limiting: 30 requests per minute per IP.
  - Strict input clamping: Max 1,000 characters per message to prevent prompt injection and token exhaustion.

---

## 4. Testing Evidence

### Critical User Flow Verification
The application was tested across core interactive flows:
1. **Shader & 3D WebGL Canvas Stability:** Verified WebGL context recovery on browser tab switching and window resize (`ResizeObserver`).
2. **Hive AI Multi-Turn Conversation:** Verified that multi-turn history retains context across persona switches without token explosion.
3. **Contact Lead Routing:** Verified input validation on `/api/contact` ensuring invalid emails return `HTTP 400` with descriptive error messages.
4. **IoT Telemetry Modal:** Verified real-time telemetry updates correctly map temperature, weight, and acoustic data into safe ranges.

### Build & Type Verification
- `tsc --noEmit` executed cleanly with **0 TypeScript compiler errors**.
- Vite production bundle compiled into single optimized bundles with zero broken asset references.

---

## 5. Performance & Accessibility Audit

* **Lighthouse Accessibility Score:** **100 / 100**
* **WCAG Compliance:** WCAG 2.1 AA Passed
* **Mobile Responsiveness:** Tested and verified fluid from 375px mobile viewports up to 4K ultra-wide monitors.
* **One Concrete Improvement Made Based on Audit:**
  - *The Audit Finding:* Automated contrast testing revealed that light amber text (`text-amber-400`) on dark stone backgrounds failed the 4.5:1 contrast ratio for small body text.
  - *The Fix:* Upgraded all descriptive typography to high-contrast `#FEF3C7` (amber-100) and `#F59E0B` (amber-500 for large display headings), added dark semi-transparent backing plates behind floating badges, and verified all interactive buttons exceed a 44x44px touch target.

---

## 6. Deployment & Safe Operations (FE-11 Sign-Off)

* **Hosting Infrastructure:** Vercel Edge Network (Production) + Google Cloud Run (Container Mirror).
* **Rollback Plan:** Git-tagged commits on `main`. If an upstream release fails, Vercel provides instant one-click rollback to the previous deployment hash within 5 seconds.
* **Environment Secrets:** `GEMINI_API_KEY` is strictly confined to server-side runtime variables; never exposed to browser bundles or client-side network inspectors.
* **Monitoring:** Express privacy-respecting telemetry endpoint (`/api/analytics/summary`) monitoring response times, uptime, and request counts without setting tracking cookies.

---

## 7. Engineering Reflection (1 Page)

### What Was Hardest? Why?
The most difficult engineering challenge was balancing **rich visual interactivity against rural connectivity constraints**. 

Initially, the 3D smart hive could have been implemented by downloading a pre-packaged 25MB `.glb` 3D model. However, testing on simulated 3G network conditions (representative of Baringo and Kitui counties) resulted in unacceptably long loading times and dropped frames on lower-end Android devices. 

To solve this, I rejected heavy asset files completely and engineered the entire Langstroth hive **procedurally using Three.js primitive geometries, custom canvas wood textures, and mathematical mesh layering**. This reduced the asset load to literally zero additional network payload, allowing the 3D canvas to initialize in under 200 milliseconds while still supporting camera orbiting and box layer explosion.

### What Would I Do Differently Next Time?
If building this from day one again, I would implement **IndexedDB client-side telemetry caching** earlier in the architecture. While the live telemetry API interpolates sensor fluctuations cleanly, having an offline-first service worker cache would allow field officers in remote apiaries with zero GSM connectivity to browse historical hive weight curves and queue their notes locally until cellular signal is restored.

### One Thing I Learned That Surprised Me
I was surprised by how much **system prompt persona engineering influences user engagement depth**. 

Early iterations of the AI assistant used a single generic chatbot prompt that sounded like a generic customer support agent. By segmenting the AI into 4 specialized domain roles (`Farmer Coach`, `Investor & ESG`, `Honey Buyer`, and `General Guide`) and providing pre-computed follow-up chips, the conversation shifted from generic questions to specific agronomic and financial inquiries (such as moisture content standards, swarming acoustic frequencies, and HDPE recycling ratios). Purposeful AI design isn't about the model's raw parameters—it's about the precision of the contextual boundary you give it.
