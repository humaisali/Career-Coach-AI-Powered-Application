<div align="center">

# AI Career Coach

### An AI-powered full-stack tool that delivers recruiter-level career analysis from your GitHub profile, portfolio, and resume

[![React](https://img.shields.io/badge/React%2018-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Google Gemini](https://img.shields.io/badge/Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

</div>

---

## Overview

AI Career Coach is a full-stack web application that analyzes a developer's GitHub profile, portfolio description, and resume — then delivers honest, actionable career insights powered by **Google Gemini 2.5 Flash**. It provides a profile score, skill radar chart, job role predictions, and a personalized career growth roadmap.

---

## Features

| Feature | Description |
|---|---|
| **GitHub Analysis** | Fetches and analyzes public GitHub profile data in real time |
| **Resume Parsing** | Accepts PDF resumes up to 10MB and extracts content via pdf-parse |
| **Profile Score** | Honest recruiter-level score with strengths and weaknesses |
| **Skill Chart** | Animated progress bars and Recharts radar visualization |
| **Job Prediction** | Suggests suitable job roles and recommended projects |
| **Career Growth** | Level meter, next technologies to learn, and mentor-style advice |
| **Step-by-step Loader** | Animated loader showing analysis progress |
| **Privacy First** | API key is passed per-request, never logged or stored |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS v4 |
| **Charts** | Recharts (radar + progress bars) |
| **Backend** | Node.js, Express |
| **AI Engine** | Google Gemini 2.5 Flash |
| **Data Source** | GitHub REST API (no auth required) |
| **PDF Parsing** | pdf-parse |
| **Icons** | Lucide React |

---

## Project Structure

```
AI-Career-Coach/
├── client/                        # React + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── GitHubInput.jsx    # GitHub URL input with live verification
│       │   ├── PortfolioInput.jsx # Portfolio description textarea
│       │   ├── ResumeUpload.jsx   # Drag-and-drop PDF upload
│       │   ├── ReviewPanel.jsx    # Score ring, verdict, strengths/weaknesses
│       │   ├── SkillChart.jsx     # Animated bars + Recharts radar
│       │   ├── JobPrediction.jsx  # Job role cards + recommended projects
│       │   ├── CareerGrowth.jsx   # Level meter, next tech, mentor advice
│       │   └── Loader.jsx         # Animated step-by-step loader
│       ├── services/
│       │   └── aiService.js       # API calls to Express backend
│       └── pages/
│           └── Home.jsx           # Full page layout
├── server/                        # Node.js + Express backend
│   ├── controllers/
│   │   └── careerController.js    # Request handlers
│   ├── routes/
│   │   └── careerRoutes.js        # POST /api/analyze, GET /api/github/:user
│   ├── services/
│   │   ├── geminiService.js       # Gemini 2.5 Flash integration
│   │   └── githubService.js       # GitHub REST API integration
│   └── utils/
│       ├── prompts.js             # Master AI prompt builder
│       └── pdfParser.js           # PDF text extraction
├── .env.example
└── package.json                   # Root — runs both client + server
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- Google Gemini API key — [Get one free here](https://aistudio.google.com/app/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/humaisali/AI-Career-Coach.git
cd AI-Career-Coach

# Install all dependencies
npm install
cd client && npm install && cd ..

# Configure environment
cp .env.example .env
```

### Run Development Servers

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## API Endpoints

### POST /api/analyze

Accepts `multipart/form-data`:

| Field | Type | Required | Description |
|---|---|---|---|
| `githubLink` | string | Yes | GitHub profile URL or username |
| `description` | string | No | Portfolio description text |
| `apiKey` | string | Yes | User's Gemini API key |
| `resume` | file | No | PDF resume (max 10MB) |

### GET /api/github/:username

Live profile prefetch for verification. Returns GitHub profile data.

---

## Privacy

The Gemini API key is passed per-request from the browser to the Express server. It is used immediately to call the Gemini API and is never logged or stored. GitHub data is fetched from the public GitHub REST API with no authentication required.

---

## Author

**Humais Ali** — Full Stack Developer at SkyTech Developers

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/humaisaliskytechdeveloper)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/humaisali)
