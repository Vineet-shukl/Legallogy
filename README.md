# ⚖️ Legallogy — India's AI-Powered Digital Legal Assistant

<div align="center">

![Legallogy Banner](public/assets/hero_banner.jpg)

**Demystifying Indian law with Gemini 2.5 Flash**

[![Made with React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%202.5%20Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev)
[![Indian Law](https://img.shields.io/badge/Jurisdiction-India%20🇮🇳-FF9933?style=flat-square)](https://www.india.gov.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg?style=flat-square)](LICENSE)

[Live Demo](https://legallogy-india.web.app) · [Report Bug](https://github.com/Vineet-shukl/Legallogy/issues) · [Request Feature](https://github.com/Vineet-shukl/Legallogy/issues)

</div>

---

## 🏛️ What is Legallogy?

Legallogy is an AI-powered legal assistance platform designed exclusively for **Indian citizens and businesses**. It bridges the gap between complex legal jargon and everyday understanding — making Indian law accessible to all.

> ⚠️ **Legal Disclaimer:** Legallogy provides legal *information*, not legal *advice*. All analysis is for educational purposes only and does not constitute professional legal advice under the Advocates Act, 1961. Always consult a qualified Indian Advocate for your specific legal situation.

---

## ✨ Core Features

### 🔍 Statutory Audit Engine
- Audits contracts against **6+ Indian statutes** in real-time
- Flags clauses violating Indian Contract Act 1872, DPDP Act 2023, Consumer Protection Act 2019, Model Tenancy Act 2021, Arbitration & Conciliation Act 1996, and more
- Cites relevant Supreme Court judgments (Perkins Eastman, TRF Ltd, etc.)

### 📝 5-Tab Intelligence Workbench
| Tab | Feature |
|-----|---------|
| 🇮🇳 Plain English + हिंदी | Clause-by-clause plain language + Devanagari translation |
| 🚩 Red Flag Audit | Statutory violations, risk scoring, fairness meter |
| ⚖️ Comparison Diff | Current draft vs. Model Fair Standard side-by-side |
| 💬 Legal Q&A | Ask questions about your document, get cited answers |
| 🤝 Negotiate & Brief | Counter-proposals + printable Advocate brief |

### 🧠 Powered by Gemini 2.5 Flash
- Structured JSON responses with Indian statute citations
- Offline fallback engine using built-in statutory heuristics
- Hindi translation for all key clauses (Devanagari script)

### 📄 Indian Statute Coverage

| Statute | Key Provisions Audited |
|--------|----------------------|
| Indian Contract Act, 1872 | §27 (non-compete void), §74 (penalty), §23 (public policy), §28 (restraint of legal proceedings) |
| DPDP Act, 2023 | §5 & §6 (data consent), data processor obligations |
| Consumer Protection Act, 2019 | §2(46) (unfair contracts), penalty provisions |
| Model Tenancy Act, 2021 | 2-month deposit cap, 24-hour entry notice |
| Arbitration & Conciliation Act, 1996 | §12(5) unilateral arbitrator appointment (void) |
| Specific Relief Act, 1963 | §14 & §41 personal service enforceability |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A [Google Gemini API key](https://aistudio.google.com/app/apikey) (optional — offline mode works without it)

### Installation

```bash
# Clone the repository
git clone https://github.com/Vineet-shukl/Legallogy.git
cd Legallogy

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Configure Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to get a free API key
2. Click the **🔑 API Key** button in the top navbar
3. Paste your key — it's stored locally in your browser

Or set it as an environment variable:
```bash
echo "VITE_GEMINI_API_KEY=your_key_here" > .env.local
```

---

## 🏗️ Project Structure

```
Legallogy/
├── public/
│   └── assets/
│       ├── emblem_logo.jpg          # Ashoka Lion + Scales emblem
│       ├── hero_banner.jpg          # Hero section banner
│       └── indian_law_security.jpg  # Feature illustration
├── src/
│   ├── components/
│   │   ├── Navbar.tsx               # Sticky navbar with sample switcher
│   │   ├── HeroSection.tsx          # Landing hero with upload/paste CTAs
│   │   ├── DocumentViewer.tsx       # Clause list (left pane)
│   │   ├── AnalysisPanel.tsx        # 5-tab workbench (right pane)
│   │   ├── AdvocateBriefModal.tsx   # Printable 1-page consultation brief
│   │   ├── ApiKeyModal.tsx          # Gemini API key configuration
│   │   └── DisclaimerBanner.tsx     # Advocates Act 1961 compliance banner
│   ├── services/
│   │   ├── geminiService.ts         # Gemini 2.5 Flash REST client
│   │   └── indianLawRules.ts        # Indian statute knowledge base
│   ├── data/
│   │   └── sampleIndianContracts.ts # 3 sample contracts (Employment, Rental, Freelance)
│   ├── types/
│   │   └── legal.ts                 # TypeScript interfaces
│   ├── App.tsx                      # Root orchestrator
│   └── index.css                    # Tailwind v4 luxury design tokens
├── firebase.json                    # Firebase Hosting + Firestore config
└── firestore.rules                  # Firestore security rules
```

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript |
| Build Tool | Vite 8.3 |
| Styling | Tailwind CSS v4 (luxury design tokens) |
| AI Engine | Google Gemini 2.5 Flash |
| Icons | Lucide React |
| Fonts | Cinzel + Playfair Display + Plus Jakarta Sans |
| Hosting | Firebase Hosting |
| Database | Cloud Firestore |

---

## 🎨 Design Philosophy

Legallogy draws inspiration from the visual language of leading legal-tech platforms (Harvey AI, Robin AI, SpotDraft) — combining:
- **Obsidian midnight navy** (`#050A15`) — conveys authority and trust
- **Champagne gold** (`#D4AF37`) — nods to Indian legal heritage
- **Editorial typography** — Cinzel for headers (Roman gravitas), Plus Jakarta Sans for body
- **Glassmorphism** — subtle frosted panels for a premium feel

---

## 🧪 Sample Contracts Included

| Contract | Score | Key Issues |
|----------|-------|------------|
| Tech Employment (Bengaluru) | 38/100 🔴 | Non-compete void (§27 ICA), Liquidated damages (§74 ICA) |
| Residential Rental (Delhi) | 42/100 🔴 | 5-month deposit > Model Tenancy 2-month cap |
| Freelance MSA | 45/100 🟡 | Unilateral arbitrator appointment (§12(5) A&C Act) |

---

## 🔮 Roadmap

- [ ] PDF upload support (direct text extraction)
- [ ] NDA analysis with §27 ICA non-compete audit
- [ ] SaaS consumer terms vs. Consumer Protection Act 2019
- [ ] Personal loan agreement analysis (SARFAESI, RBI guidelines)
- [ ] State-specific rent acts (Maharashtra, Karnataka)
- [ ] Lawyer directory integration (find verified Indian advocates)
- [ ] Hindi-first UI mode
- [ ] WhatsApp bot integration for rural access

---

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines and open an issue before submitting a PR.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
Made with ❤️ in India | ⚖️ Built for Google GenAI Hackathon 2025

**Jai Hind 🇮🇳**
</div>
