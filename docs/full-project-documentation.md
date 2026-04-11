# VMG TESOL e-PATH - Full Project Documentation (Expanded)

## 1. Project Overview
Customized **Simple Light** Tailwind/Next.js landing template for **VMG Intesol** — Vietnamese premium English education platform with **2 separate flagship products**:

### Product 1: TESOL e-Path (MOOC → Cert)
- **Format**: Pre-recorded **video MOOC** (self-paced + weekly Live Sessions, AOS anims).
- **Outcome**: **ALAP international TESOL cert** (lifetime valid, globally recognized).
- **Target**: Aspiring teachers/trainers (quick cert w/o full-time classes).
- **Path**: `/tesolmooc` — HeroTesol + ExitIntent ebook popup (\"Bí Quyết Dạy TESOL\" 499k VND value).
- **Branding Colors** (VMG Palette — theme.css):
  | Color | Hex | Usage |
  |-------|-----|-------|
  | VMG-navy | #0a2f5b | Text, shadows, numbers bkg. |
  | VMG-blue | #024bef | Primary cards/icons/borders (Shield/Laptop/Dollar/Zap). |
  | VMG-green | #75d648 | Live sessions/discuss icons. |
  | VMG-red | #af2130 | Quizzes/checks. |
  | VMG-blue-soft | #f0f4ff | Hovers/bgs. |
  | (Shared Crimson #BE202F/Gold #B6914C hero CTAs).

  **Style**: Rounded 2.5rem cards (softer), numbered bkg (opacity 0.08-0.15 navy), inverted silhouettes (Picture1.png), hover scale/shadow.

  **Benefits** (tesol-benefits.tsx):
  | # | Benefit | Icons |
  |---|---------|-------|
  |1| ALAP cert value | Shield (blue) |
  |2| Live/flex | Laptop (green) |
  |3| Cost/tech | Dollar (blue) |
  |4| Fast-track | Zap (green) |

- **Curriculum**: 8 modules (~23h/100+ lessons: Video/Discuss/Quiz). E.g., Mod1 Grammar (Deductive/Inductive), Mod8 Young Learners.
- **Visuals**: Infinite grad carousel (9 photos), Intesol signing (2:1 grid, hover scale), ebook popup (499k value).

### Product 2: FlexTrack 1-1 (Custom 1:1 Training)
- **Format**: Personalized 1-1 English communication training, **tailored per industry/profession**.
- **Target**: **C-level executives & managers** — Busy pros with budget but no time for self-study.
- **Key**: AI assessment (`/giaotiep-1-1/assessment`) customizes roadmap (e.g., 36-180h packages).
- **AI-Powered**: Azure Speech + Inception LLM scoring (pron/vocab/fluency/CEFR gap).

**Landing**: Homepage promotes both; Crimson/Gold branding, VN-focused (10+ yrs, 50K students).

**Stats (Homepage)**: 10+ years exp, 15+ national centers, 50K+ trained, 98% satisfaction.

**Branding**: Crimson (#BE202F primary CTA), Gold (#B6914C accents), Brutalist academic (0-radius, tracked uppercase).

**Live Paths**:
- `/`: Dual-product hero → TESOL/FlexTrack CTAs.
- `/tesolmooc`: MOOC details/cert signup.
- `/giaotiep-1-1`: FlexTrack landing → assessment → custom roadmap.
- Auth/Checkout/Terms.

## 2. Design System: \"The Academic Architect\" (from DESIGN.md)
**North Star**: Brutalist academia + modern architecture — precise, authoritative, expensive editorial feel.

- **Colors**: Crimson primary, Gold accents. Surfaces: #f8f9f9 (base), #f3f4f4/#e7e8e8 (layers).
- **Textures**: Radial dot grid (`radial-gradient(#e1e3e3 1px, transparent 1px; size:40px`) for blueprint effect.
- **Typography**:
  | Typeface | Usage | Weights |
  |----------|--------|---------|
  | Montserrat | Headlines | Bold (var --font-montserrat)
  | Be Vietnam Pro | Body/Labels | 400-700 (var --font-be-vietnam-pro, latin/latin-ext)

- **Rules**: 0px radius, uppercase/tracked labels (1.5px), heavy accents (border-t-4/l-4), no soft shadows.
- **Buttons**: Geometric (no radius), uppercase, tracked.
- **Grids**: Bento stats (4-col, alternating borders).

**ASCII Layout Example (Hero Section)**:
```
+-------------------------------+
| [Hero Img]  | H1: NỀN TẢNG... |
|             | Subtitle        |
|             | Features list   |
|             | [CTA1][CTA2]    |
+-------------------------------+
```

## 3. Tech Stack (package.json)
```
Next.js 15.1 (App Router, Turbopack)
React 19.2, TS 5.7
Tailwind v4 (@tailwindcss/postcss, no config.js)
shadcn/ui (button, header, etc.)
Framer Motion 12, AOS, Headless UI v2, Lucide
Azure Speech SDK 1.49
pnpm 10.32
ESLint/Prettier/Stylelint
```
**External APIs**:
- Azure Cognitive Services (speech token/assessment).
- Inception AI (mercury-2 LLM for content scoring).
- GA4 (G-T451F3E6QV), GTM (GTM-MHRRKZ8P).

## 4. File Structure (Full Scan: 50+ files)
```
app/
├── layout.tsx (fonts: Montserrat/BeVietnamPro, GA4/GTM)
├── (default)/page.tsx (Homepage: Hero/Stats/Programs/Values/CTA)
├── api/ (assess, assess-batch, azure-batch/test, speech-token, assessment-lead)
├── (giaotiep-1-1)/giaotiep-1-1/ (Landing: DESIGN.md)
├── giaotiep-1-1/assessment/ (AI test wrapper)
├── (assessment)/giaotiep-1-1/danh-gia-lo-trinh/ (Eval flow: khao-sat/survey, gioi-thieu/intro, test/)
├── (auth)/ (signin/signup/reset-password)
└── tesolmooc/ (MOOC pages)

components/ (~60 TSX)
├── ui/ (shadcn: button, header, footer, logo...)
├── giaotiep-1-1/ (ai-assessment.tsx=core flow, recording-controls, results...)
├── homepage/ (header/footer)
└── shared (hero, pricing, testimonials, faq...)

lib/ai-assessment/ (Core Logic)
├── types.ts (interfaces: CriterionScore, FullResult...)
├── scoring.ts (Azure→LLM→CEFR/gap/roadmap)
├── utils.ts/audio-utils.ts/email.ts/constants.ts/coupons.ts

public/images/ (vmg-intesolvietnam x4, tesol_certificate.avif)
.next/ (built)
configs: next.config.js (images), postcss.config.js (Tailwind v4), tsconfig.json (@/* paths)
```

## 5. Key Pages & Flows

### TESOL e-Path (MOOC)
- `/tesolmooc`: Video curriculum, benefits (international cert, livestreams, job guarantee), enrollment CTA.

### FlexTrack 1-1 (Custom Training)
**Homepage (`app/(default)/page.tsx`)**: Hero pitches both products; stats grid; programs cards (TESOL cert vs FlexTrack personal).

**FlexTrack Assessment (`/giaotiep-1-1/assessment`)**: AI-powered entry point (`ai-assessment.tsx`, 300+ lines state machine):
```
Survey (industry/skills/target CEFR) → Intro → Part1 (3 scripted: pron/flu/..) → Part2 (3 role-plays: vocab/gram/q-handling) → Batch Process → Results/Roadmap
```
- **Record**: MediaRecorder (3s countdown) → Azure live STT.
- **Score**: Azure (delivery: pron/flu/pros/compl) + LLM (content: vocab/gram/q-hand).
- **Output**: CEFR current/target gap (e.g., A2→B1=90h), industry roadmap (teaching/sales/C-level), package recs.
- **Results**: Rubrics (0-10/crit), strengths/weaknesses, email lead gen.

## 6. AI Assessment Deep Dive (scoring.ts + APIs)
**Flow**:
1. **Record**: WebM → WAV base64.
2. **Azure Batch** (`/api/azure-batch` → Azure Speech): accuracy/fluency/prosody/pron/completeness (0-100).
3. **LLM Content** (`/api/assess-batch` → Inception mercury-2): vocab/grammar/questionHandling (strict JSON).
4. **Aggregate** (`computeFullResult`):
   - Rubric: 0/2/4/6/8/10 per criterion.
   - CEFR: <A1 (0-40%) → B1+ (90%+).
   - Gap: Current→Target (e.g., A2→B1 = 90h).
   - Roadmap: Industry-specific (e.g., teaching: 'Master IELTS Listening...').

**Criteria**:
| Criterion | Part1 | Part2 | Azure/LLM |
|-----------|-------|-------|-----------|
| Pronunciation | ✓ | ✓ | Azure pronScore |
| Fluency | ✓ | ✓ | Azure fluency |
| Prosody | ✓ |  | Azure prosody |
| Completeness | ✓ |  | Azure completeness |
| Vocabulary |  | ✓ | LLM |
| Grammar |  | ✓ | LLM |
| Question Handling |  | ✓ | LLM |

**ASCII Assessment Flow**:
```
User Records (MediaRecorder)
     ↓
WAV Base64 → /api/azure-batch (SSE progress)
     ↓ (pron/flu/.. scores)
Transcripts → /api/assess-batch (Inception LLM JSON)
     ↓ (vocab/gram/q-handling)
scoring.ts → Parts → CEFR/Gap/Roadmap → Email Report
```

## 7. API Routes Details
- **/api/speech-token**: Azure auth token.
- **/api/assess** (single): LLM content score (prompt-tuned for rubric).
- **/api/assess-batch**: Batch LLM (Part2 transcripts).
- **/api/azure-batch**: SSE-stream Azure assessments.
- **/api/assessment-lead**: POST email leads.
- Logs: Heavy console for debug.

## 8. Components Catalog
**UI Primitives** (shadcn): button, header, footer, logo, aspect-ratio.
**Homepage**: hero-tesol, pricing-section, testimonials, faq, floating-cta/purchase/contact.
**Assessment**: ai-assessment (state mgmt), recording-controls (countdown/active/review), progress, prompt, results, processing-screen.
**Giaotiep**: survey-step, assessment-{header,breadcrumb,results,...}.

## 9. Setup/Dev/Deploy
```
pnpm i && pnpm dev  # Turbopack @3000
pnpm build && pnpm start
```
**.env.local**: INCEPTION_API_KEY, Azure keys.
**Vercel**: Git push auto-deploys.

## 10. Changelog/Custom Notes
Template: Tailwind v4 (2025), Next 15 (2024).
Custom: AI integration (2026?), VMG branding.

## Credits
- Cruip (GPL template).
- Azure/Inception AI.
- Generated: Hermes Agent (2026-04-11, full file scan + code analysis).

~12K chars. View: `cat docs/full-project-documentation.md | less`