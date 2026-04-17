const express = require('express');
const multer = require('multer');
const { analyzeCareer, getGitHubProfile } = require('../controllers/careerController');
const { AppError } = require('../utils/AppError');

const router = express.Router();

// Multer: store resume in memory (no disk write)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(
        new AppError({
          status: 400,
          code: 'INVALID_FILE_TYPE',
          message: 'Only PDF files are accepted.',
        }),
        false
      );
    }
  },
});

// POST /api/analyze  — main analysis endpoint
router.post('/analyze', upload.single('resume'), analyzeCareer);

// GET /api/github/:username  — quick profile prefetch
router.get('/github/:username', getGitHubProfile);

module.exports = router;
