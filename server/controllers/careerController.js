const { fetchGitHubData } = require('../services/githubService');
const { analyzeWithGemini } = require('../services/geminiService');
const { extractTextFromPDF } = require('../utils/pdfParser');
const { AppError } = require('../utils/AppError');
const { asyncHandler } = require('../middleware/asyncHandler');

/**
 * POST /api/analyze
 * Accepts: githubLink, description, apiKey (body), resume (file via multer)
 */
const analyzeCareer = asyncHandler(async (req, res) => {
  const { githubLink, description, apiKey } = req.body || {};
  const resumeFile = req.file; // multer provides this

  if (!githubLink || !String(githubLink).trim()) {
    throw new AppError({
      status: 400,
      code: 'MISSING_GITHUB_LINK',
      message: 'GitHub link is required.',
    });
  }

  if (!apiKey || !String(apiKey).trim()) {
    throw new AppError({
      status: 400,
      code: 'MISSING_GEMINI_API_KEY',
      message: 'Gemini API key is required.',
    });
  }

  const githubData = await fetchGitHubData(String(githubLink).trim());

  let resumeText = '';
  if (resumeFile?.buffer) {
    resumeText = await extractTextFromPDF(resumeFile.buffer);
  }

  const analysis = await analyzeWithGemini(
    githubData,
    description ? String(description) : '',
    resumeText,
    String(apiKey).trim()
  );

  res.status(200).json({
    github: githubData,
    score: analysis.score,
    decision: analysis.decision,
    decisionReason: analysis.decisionReason,
    summary: analysis.summary,
    strengths: analysis.strengths,
    weaknesses: analysis.weaknesses,
    suggestions: analysis.suggestions,
    skills: analysis.skills,
    skillLevel: analysis.skillLevel,
    skillLevelReason: analysis.skillLevelReason,
    recommendedProjects: analysis.recommendedProjects,
    jobRoles: analysis.jobRoles,
    nextTechnologies: analysis.nextTechnologies,
    nextDomains: analysis.nextDomains,
    careerAdvice: analysis.careerAdvice,
  });
});

/**
 * GET /api/github/:username
 * Quick GitHub profile prefetch for frontend verification
 */
const getGitHubProfile = asyncHandler(async (req, res) => {
  const { username } = req.params || {};
  if (!username) {
    throw new AppError({
      status: 400,
      code: 'MISSING_GITHUB_USERNAME',
      message: 'Username required.',
    });
  }

  const data = await fetchGitHubData(username);
  res.status(200).json(data);
});

module.exports = { analyzeCareer, getGitHubProfile };
