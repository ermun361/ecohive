# General AI Fluency — Week 3 Assignment
## "Consistency, Not Talent (and Frame, Not Upstage)"

**Candidate:** Eric Munyi (`munyieric7@gmail.com`)  
**Track:** General AI Fluency  
**Week:** Week 3 (Foundations)  
**Project:** EcoHive Kenya Ltd. — Visual Identity & Image Judgment Memo  
**Production URL:** [https://ecohive-jet.vercel.app/](https://ecohive-jet.vercel.app/)  

---

## 1. Visual Identity Kit (Consistency, Not Talent)

To eliminate the common markers of "AI Slop" (arbitrary neon glows, purple-to-cyan gradients, and mismatched font pairings), EcoHive Kenya enforces a strict, intentional 3-color palette, disciplined typography tokens, and an 8pt spatial grid:

### A. The 3-Color Semantic Palette
1. **Forest Pine (`#1B4D3E`):** Primary structural neutral representing Kenyan agricultural canopy and environmental permanence. Grounding tone for headers, high-contrast cards, and dark theme containers.
2. **Savanna Gold (`#D4A373`):** Organic warm neutral evoking East African drylands and raw beeswax. Used for secondary metadata labels and subtle hairline dividers.
3. **Honey Amber (`#E5A93C` / `#FEF3C7`):** High-contrast active accent reserved exclusively for interactive elements, hover states, and WCAG AA-compliant focus rings (`focus-visible:ring-2 focus-visible:ring-amber-500`).

*Constraint:* Zero rainbow gradients, zero arbitrary saturation spikes. Every hue has a direct real-world grounding in Kenyan apiculture.

### B. Typographic Hierarchy
* **Display & Heading:** *Cinzel* — Architectural, classical serif conveying agricultural stewardship, heritage, and enterprise credibility.
* **Interface & Body:** *Plus Jakarta Sans* — Highly legible, contemporary geometric sans-serif optimized for multi-screen readability at 16px baseline with a 1.6 line height.

---

## 2. "Frame, Not Upstage" (The Gallery Wall Principle)

A portfolio's layout must serve as an unobtrusive gallery frame that highlights the proof of engineering rather than competing with it for visual dominance:

1. **Subtle Depth Over Visual Noise:** Flat structural cards with 1px border dividers (`border-stone-800`) rather than gaudy drop shadows or artificial glassmorphism.
2. **The Work is the Hero:** The canvas design steps back to let the technical proof shine:
   - The interactive procedural Three.js Langstroth hive model.
   - The real-time sensor telemetry graphs (temperature, acoustics, weight).
   - The interactive multi-turn Hive AI assistant drawer.
3. **Restraint:** Text inside buttons, chips, and persona selectors remains on a single line with mathematical padding (horizontal padding = 2x vertical padding).

---

## 3. AI Image Judgment & Curation

The primary skill when working with generative AI is **curation and rejection**—knowing when an AI image degrades credibility and when real technical assets or disciplined code beat generative art:

### What Was Rejected
* **Generic AI Bee/Hive Illustrations:** High-gloss, cartoonish AI renderings of bees, neon honeycombs, and pseudo-futuristic glass hives were systematically rejected. They look like generic stock imagery and signal amateur execution to technical evaluators.
* **Hallucinated Hardware:** Generative AI concepts of solar sensors often invent impossible wiring or fantastical industrial designs that undermine real agronomic validity.

### What Was Chosen & Why
1. **Real Procedural Three.js 3D Geometry:** Instead of a static AI picture, the hive was built out of real mathematical 3D boxes in Three.js. This proves real frontend engineering skill and interactive capability.
2. **Custom WebGL Amber Shader:** Rather than a static AI background, a custom GLSL fluid caustic shader was programmed to mathematically simulate Kenyan raw honey viscosity in response to cursor vectors.
3. **Authentic Data Visualizations:** Real telemetry dashboards, SVG system architecture sketches, and structured data tables take precedence over decorative art. Real proof always beats synthetic illustration.

---

## 4. Verification & Live Implementation
The complete visual identity and design system is live and verified across all viewport widths at:  
👉 **[https://ecohive-jet.vercel.app/](https://ecohive-jet.vercel.app/)**
