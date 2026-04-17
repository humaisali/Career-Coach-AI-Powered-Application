# AI Career Coach

An advanced full-stack web application that analyzes a developer's GitHub profile,
portfolio description, and resume — delivering honest, recruiter-level career insights
powered by Gemini 2.5 Flash.

---

## Architecture

```
ai-career-coach/
│
├── client/                        # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── GitHubInput.jsx    # GitHub URL input with live verification
│   │   │   ├── PortfolioInput.jsx # Portfolio description textarea
│   │   │   ├── ResumeUpload.jsx   # Drag-and-drop PDF upload
│   │   │   ├── ReviewPanel.jsx    # Score ring, verdict, strengths/weaknesses
│   │   │   ├── SkillChart.jsx     # Animated bars + Recharts radar
│   │   │   ├── JobPrediction.jsx  # Job role cards + recommended projects
│   │   │   ├── CareerGrowth.jsx   # Level meter, next tech, mentor advice
│   │   │   └── Loader.jsx         # Animated step-by-step loader
│   │   ├── services/
│   │   │   └── aiService.js       # API calls to Express backend
│   │   ├── pages/
│   │   │   └── Home.jsx           # Full page layout
│   │   ├── constants/index.js
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/                        # Node.js + Express backend
│   ├── controllers/
│   │   └── careerController.js    # Request handlers
│   ├── routes/
│   │   └── careerRoutes.js        # POST /api/analyze, GET /api/github/:user
│   ├── services/
│   │   ├── geminiService.js       # Gemini 2.5 Flash integration
│   │   └── githubService.js       # GitHub REST API integration
│   ├── utils/
│   │   ├── prompts.js             # Master AI prompt builder
│   │   └── pdfParser.js           # PDF text extraction via pdf-parse
│   └── index.js                   # Express server entry point
│
├── package.json                   # Root — runs both client + server
├── .env.example
└── README.md
```

---

## Quick Start

### 1. Install all dependencies

```bash
# Root (server deps)
npm install

# Client deps
cd client && npm install && cd ..
```

### 2. Configure environment

```bash
cp .env.example .env
```

### 3. Run development (both client + server)

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend:  http://localhost:5000

### 4. Get a Gemini API Key

Get a free key at: https://aistudio.google.com/app/apikey

Enter it in the app UI — it is sent to the server per-request and never stored.

---

## API Endpoints

### POST /api/analyze

Accepts `multipart/form-data`:

| Field        | Type   | Required | Description                     |
|---|---|---|---|
| `githubLink` | string | Yes      | GitHub profile URL or username  |
| `description`| string | No       | Portfolio description text      |
| `apiKey`     | string | Yes      | User's Gemini API key           |
| `resume`     | file   | No       | PDF resume file (max 10 MB)     |

Response: Full JSON analysis object.

### GET /api/github/:username

Quick profile prefetch for live verification. Returns GitHub profile data.

---

## Tech Stack

| Layer     | Technology                          |
|---|---|
| Frontend  | React 18, Vite, Tailwind CSS v4     |
| Charts    | Recharts (radar + progress bars)    |
| Backend   | Node.js, Express                    |
| AI        | Google Gemini 2.5 Flash             |
| Data      | GitHub REST API (no auth required)  |
| PDF       | pdf-parse                           |
| Icons     | Lucide React                        |

---

## Production Build

```bash
# Build client
cd client && npm run build

# Start production server (serves client + API)
cd .. && NODE_ENV=production npm start
```

The Express server serves the compiled React app from `client/dist` in production.

---

## Privacy

- The Gemini API key is passed per-request from the browser to the Express server
- It is used immediately to call the Gemini API and is never logged or stored
- GitHub data is fetched from the public GitHub REST API — no authentication required
