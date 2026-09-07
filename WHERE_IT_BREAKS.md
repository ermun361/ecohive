# Break Your Own Site — Hardening & Diligence Report
**Project:** EcoHive Kenya Ltd.  
**Track:** General AI Fluency (Week 7)  
**Live Application URL:** https://ais-pre-vegkej4u2lmpqczdp2pstl-122122115705.europe-west2.run.app  
**Date:** September 2026  

---

## 1. Executive Summary
This document records the results of deliberately testing, breaking, and hardening the **EcoHive Kenya Ltd.** digital platform. We moved beyond the happy path by subjecting the forms, API endpoints, navigation states, and rendering pipelines to empty inputs, garbage data, malformed payloads, rapid double-submits, unhandled routes, and low-power rendering constraints.

Every finding was triaged into **Fix-Now** (resolved immediately) or **Known Limitation** (documented and architecturally bounded).

---

## 2. The Honest "Where It Breaks" Triage

| # | Test Scenario / Breaking Attempt | Pre-Hardening Behavior | Triage | Resolution / Fix Implemented |
|---|---|---|---|---|
| **1** | **Empty & Whitespace Form Submissions** | Submitting `"   "` or leaving inputs blank passed basic client checks and created empty database leads (`"Thank you,    !"`). | **Fix-Now** | Implemented backend & frontend string sanitization, minimum length constraints (≥2 chars for name, ≥5 for message), and strict RFC-compliant email regex validation. |
| **2** | **Garbage / Malformed JSON Payloads** | Sending `{malformed` to `/api/*` caused the Express JSON parser to crash with an unhandled HTML `SyntaxError` stack trace. | **Fix-Now** | Added Express error-handling middleware that intercepts JSON `SyntaxError` and returns a clean, secure HTTP 400 JSON payload: `{ "error": "Malformed JSON payload provided." }`. |
| **3** | **Rapid Double-Submitting Forms** | Double-clicking or spamming submit sent duplicate simultaneous requests, creating duplicate lead entries. | **Fix-Now** | Enforced client-side submit lock (`submitting` state disables button and displays loading spinner) and clamped numeric inputs (`hiveQuantity` bounded to `1–1000`). |
| **4** | **Querying Non-Existent API Routes (`GET /api/unknown`)** | Unmatched `/api/*` requests fell through to the Vite SPA fallback, returning HTTP 200 with raw HTML instead of a JSON REST error. | **Fix-Now** | Added an explicit `app.all('/api/*', ...)` catch-all returning structured HTTP 404 JSON: `{ "error": "API route not found: METHOD PATH" }`. |
| **5** | **Empty Search & Catalog Zero-States** | Searching for non-existent items or empty filter categories rendered a blank, dead grid without user feedback. | **Fix-Now** | Built an interactive product search bar with an informative zero-results empty-state card and a one-click *"Reset Search & Show All"* button. |
| **6** | **Route Transitions Retaining Prior Scroll Position** | Navigating between views while scrolled down preserved the scroll offset, causing new views to load mid-page. | **Fix-Now** | Added an automated `useEffect` hook in `App.tsx` executing `window.scrollTo({ top: 0, behavior: 'instant' })` whenever `currentPage` changes. |
| **7** | **Social Link Sharing & Findability** | Missing OpenGraph/Twitter image tags produced blank link previews on WhatsApp, LinkedIn, and Twitter. | **Fix-Now** | Added 1200x630 `og:image`, `twitter:image`, canonical URL tags, author tags, and Schema.org `Organization` JSON-LD structured data in `index.html`. |
| **8** | **Hardware WebGL Disabled or Low-Power Device** | Legacy smartphones or browsers with hardware acceleration turned off failed to initialize the Three.js 3D viewport. | **Known Limitation** | Handled with an integrated **2D High-Resolution Render** mode featuring interactive pinned hotspots, allowing 100% feature parity on devices without WebGL. |
| **9** | **Real-world Apiary MQTT Stream vs. Simulation** | Telemetry currently streams from the Express server rather than live physical satellite hardware in Baringo/Nakuru. | **Known Limitation** | The architecture is decoupled: `/api/iot-telemetry` provides a drop-in contract ready to point to physical GSM hardware brokers without frontend refactoring. |

---

## 3. Speed & Performance Benchmarks

All response times measured on the live deployment:

| Endpoint / Asset | Latency | Status |
|---|---|---|
| **Root Document (`/`)** | ~53 ms | HTTP 200 |
| **IoT Telemetry (`/api/iot-telemetry`)** | ~4.0 ms | HTTP 200 |
| **Health Check (`/api/health`)** | ~3.2 ms | HTTP 200 |
| **API Error Handling (`/api/404`)** | ~3.5 ms | HTTP 404 JSON |
| **3D Model Payload** | **0 KB** (Procedural) | WebGL 60 FPS |

---

## 4. How to Verify
1. **Empty Form Test**: Navigate to **About & Contact**, leave fields blank or type spaces, and click *Send Inquiry*. Notice specific validation errors.
2. **Double-Click Test**: Enter valid info and click submit rapidly; the button locks immediately to prevent double submissions.
3. **Search Zero-State**: Go to **Products & Honey**, type `"xyz123"` in the search bar, and verify the friendly empty state and reset button.
4. **WebGL Fallback**: Go to **The Smart Hive** and click the *"2D Hotspots"* toggle to test the non-WebGL experience.
