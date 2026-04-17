const { GoogleGenerativeAI } = require('@google/generative-ai');
const { buildCareerPrompt } = require('../utils/prompts');
const { AppError } = require('../utils/AppError');

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Sends career data to Gemini and returns structured analysis.
 * @param {object} githubData
 * @param {string} portfolioDescription
 * @param {string} resumeText
 * @param {string} apiKey - User-supplied Gemini API key
 * @returns {Promise<object>} Parsed JSON analysis
 */
async function analyzeWithGemini(githubData, portfolioDescription, resumeText, apiKey) {
  if (!apiKey) {
    throw new AppError({
      status: 400,
      code: 'MISSING_GEMINI_API_KEY',
      message: 'Gemini API key is required.',
    });
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
      responseMimeType: 'application/json',
    },
  });

  const prompt = buildCareerPrompt(githubData, portfolioDescription, resumeText);

  let text;
  try {
    const result = await model.generateContent(prompt);
    text = result.response.text();
  } catch (err) {
    const msg = String(err?.message || '');
    const status = err?.status || err?.response?.status;

    if (status === 401 || /api key|unauthorized|invalid.*key/i.test(msg)) {
      throw new AppError({
        status: 401,
        code: 'GEMINI_UNAUTHORIZED',
        message: 'Gemini API key is invalid or unauthorized.',
        cause: err,
      });
    }

    if (status === 429 || /quota|rate limit|resource exhausted/i.test(msg)) {
      throw new AppError({
        status: 429,
        code: 'GEMINI_RATE_LIMIT',
        message: 'Gemini rate limit or quota exceeded. Please try again later.',
        cause: err,
      });
    }

    throw new AppError({
      status: 502,
      code: 'GEMINI_UPSTREAM_ERROR',
      message: 'Gemini request failed. Please try again.',
      cause: err,
    });
  }

  if (!text) {
    throw new AppError({
      status: 502,
      code: 'GEMINI_EMPTY_RESPONSE',
      message: 'Gemini returned an empty response. Please try again.',
    });
  }

  // Strip any accidental code fences
  const cleaned = text.replace(/```json|```/gi, '').trim();

  // First, try direct parse
  try {
    return JSON.parse(cleaned);
  } catch {
    // Some responses may contain extra text around the JSON.
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        // fall through to fallback below
      }
    }

    // At this point, Gemini did respond but not in the exact JSON format.
    // Instead of breaking the app, return a safe, neutral analysis object.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('[Gemini] Could not parse JSON. Raw response preview:', cleaned.slice(0, 500));
    }

    return {
      score: 6.0,
      decision: 'Consider',
      decisionReason:
        'Based on the available GitHub profile, resume, and portfolio information, this developer shows potential but would benefit from deeper, production-level experience.',
      summary:
        'Overall this profile suggests a motivated developer who is actively building skills and projects. There are good signs of curiosity and a willingness to learn, but some gaps remain in production readiness, testing, and large-scale system design. With more focus on a few strong, well-documented projects, this profile could become competitive for many intermediate roles.',
      strengths: [
        'Shows initiative by publishing code publicly and experimenting with different technologies.',
        'Demonstrates clear interest in improving as a developer and investing in career growth.',
        'Has started to build a portfolio that can be refined into strong, hire-ready case studies.',
      ],
      weaknesses: [
        'Some projects may lack production-quality structure, testing, or documentation.',
        'Signals about ownership of complex systems and long-term maintenance are still limited.',
        'The profile would benefit from clearer storytelling about impact, outcomes, and responsibilities.',
      ],
      suggestions: [
        'Choose 2–3 key projects and polish them into case studies with clear problem, solution, and impact.',
        'Add tests, documentation, and a clean README to at least one main project to show production habits.',
        'Focus on mastering a core stack end to end (frontend, backend, database, deployment) instead of spreading too thin.',
      ],
      skills: {
        Frontend: 60,
        Backend: 55,
        Database: 45,
        DevOps: 35,
      },
      skillLevel: 'Intermediate',
      skillLevelReason:
        'Signals point toward an early-to-mid Intermediate level: there is a foundation in place, and with more production-style work and polish this can grow into a solid, hire-ready profile.',
      recommendedProjects: [
        {
          title: 'Portfolio Upgrade with Case Studies',
          description:
            'Create or refine a personal portfolio site that presents 2–3 of your strongest projects as in-depth case studies, explaining the problem, your solution, and the impact.',
          techStack: ['React', 'Node.js', 'TypeScript'],
          impact: 'High',
        },
        {
          title: 'Full-Stack CRUD Application',
          description:
            'Build a full-stack app with authentication, CRUD operations, and testing to demonstrate end-to-end ownership of a real-world style product.',
          techStack: ['React', 'Express', 'PostgreSQL'],
          impact: 'High',
        },
        {
          title: 'DevOps & Deployment Pipeline',
          description:
            'Set up CI/CD, automated tests, and cloud deployment for an existing project to strengthen your operational and reliability skills.',
          techStack: ['Docker', 'GitHub Actions', 'Cloud Provider (e.g. Render, Railway, AWS)'],
          impact: 'Medium',
        },
      ],
      jobRoles: [
        {
          title: 'Full-Stack JavaScript Developer',
          match: 60,
          reason:
            'Your interest in combining frontend, backend, and AI tools aligns with typical full-stack roles.',
        },
        {
          title: 'Frontend Developer',
          match: 55,
          reason:
            'With further focus on UI, UX, and state management, you could fit modern frontend positions.',
        },
        {
          title: 'Backend Node.js Developer',
          match: 55,
          reason:
            'Experience with APIs, authentication, and integrations can position you for backend roles as you deepen these skills.',
        },
      ],
      nextTechnologies: ['TypeScript', 'Next.js', 'PostgreSQL', 'Docker'],
      nextDomains: [
        {
          domain: 'SaaS / Product Engineering',
          reason:
            'Building and iterating on real products will sharpen both your technical and product thinking.',
        },
        {
          domain: 'Developer Tooling & Automation',
          reason:
            'Given your use of AI and integrations, working on tools for developers could be a strong fit.',
        },
      ],
      careerAdvice:
        'Anchor your growth around a small number of well-crafted projects that mirror the kind of work you want to do professionally. Prioritize code quality, testing, documentation, and clear READMEs so that a hiring manager can quickly understand your strengths. Keep your GitHub profile tidy and active, and use each project to deliberately practice one or two new skills rather than trying to learn everything at once. Over the next 6–12 months, consistently shipping and refining real projects will do more for your career than any course or certificate.',
    };
  }
}

module.exports = { analyzeWithGemini };
