require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const careerRoutes = require('./routes/careerRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

function normalizeOrigin(origin) {
  return String(origin || '').trim().replace(/\/+$/, '');
}

function getAllowedOrigins() {
  const defaults = ['http://localhost:5173'];
  const fromEnv = String(process.env.CLIENT_URL || '')
    .split(',')
    .map((value) => normalizeOrigin(value))
    .filter(Boolean);

  return [...new Set([...defaults, ...fromEnv])];
}

const allowedOrigins = getAllowedOrigins();

// ── Middleware ──
app.use(cors({
  origin: (origin, callback) => {
    // Allow same-origin/server-to-server requests with no Origin header.
    if (!origin) return callback(null, true);

    const normalizedRequestOrigin = normalizeOrigin(origin);
    const isAllowed = allowedOrigins.includes(normalizedRequestOrigin);

    if (isAllowed) return callback(null, true);

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── API Routes ──
app.use('/api', careerRoutes);

// ── Root route (useful in dev; React serves in prod) ──
app.get('/', (_req, res) => {
  res.status(200).json({
    name: 'AI Career Coach API',
    status: 'ok',
    endpoints: {
      health: '/health',
      analyze: 'POST /api/analyze',
      github: 'GET /api/github/:username',
    },
  });
});

// ── Health check ──
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Serve React client in production ──
if (process.env.NODE_ENV === 'production') {
  const clientBuild = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuild));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientBuild, 'index.html'));
  });
}

// ── 404 handler (must be after routes/static) ──
app.use(notFoundHandler);

// ── Global error handler (last) ──
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server] Running on http://localhost:${PORT}`);
});
