/**
 * Builds the master prompt for Gemini career analysis.
 */
function buildCareerPrompt(githubData, portfolioDescription, resumeText) {
  const langList = githubData.languages
    ? Object.entries(githubData.languages)
        .map(([lang, count]) => `${lang} (${count} repos)`)
        .join(', ')
    : 'Not available';

  const topRepoList = (githubData.topRepos || [])
    .map(r => `  - ${r.name} (Stars: ${r.stars}, Lang: ${r.language || 'N/A'}): ${r.description || 'No description'}`)
    .join('\n');

  return `You are acting as a senior software engineer (10+ years experience), a technical recruiter at a top-tier tech company, and a career mentor combined. Your analysis must be brutally honest, specific, and grounded in real-world hiring standards. Do not flatter. Do not be vague.

Analyze this developer profile across three data sources:

===== GITHUB PROFILE DATA =====
Username       : ${githubData.username}
Full Name      : ${githubData.name || 'Not provided'}
Bio            : ${githubData.bio || 'Not provided'}
Location       : ${githubData.location || 'Not provided'}
Company        : ${githubData.company || 'Not provided'}
Public Repos   : ${githubData.publicRepos}
Total Stars    : ${githubData.totalStars}
Total Forks    : ${githubData.totalForks}
Followers      : ${githubData.followers}
Following      : ${githubData.following}
Account Created: ${githubData.accountCreated}
Languages Used : ${langList}
Top Repositories:
${topRepoList || '  None available'}

===== PORTFOLIO DESCRIPTION =====
${portfolioDescription || 'Not provided by the developer.'}

===== RESUME / CV CONTENT =====
${resumeText || 'Resume not uploaded.'}

===== INSTRUCTIONS =====
Respond ONLY with a valid JSON object. No markdown, no code fences, no explanations before or after.
Use this EXACT schema:

{
  "score": <number, 1 decimal, range 0.0-10.0>,
  "decision": <"Hire" | "Consider" | "Reject">,
  "decisionReason": <string, 2-3 sentences, specific and honest>,
  "summary": <string, 3-4 sentences, overall profile assessment>,
  "strengths": [<string>, <string>, <string>],
  "weaknesses": [<string>, <string>, <string>],
  "suggestions": [<string>, <string>, <string>],
  "skills": {
    "Frontend": <integer 0-100>,
    "Backend": <integer 0-100>,
    "Database": <integer 0-100>,
    "DevOps": <integer 0-100>
  },
  "skillLevel": <"Beginner" | "Intermediate" | "Advanced">,
  "skillLevelReason": <string, 1-2 sentences>,
  "recommendedProjects": [
    {
      "title": <string>,
      "description": <string, 2 sentences — what to build and why it matters>,
      "techStack": [<string>],
      "impact": <"High" | "Medium">
    },
    { "title": <string>, "description": <string>, "techStack": [<string>], "impact": <"High" | "Medium"> },
    { "title": <string>, "description": <string>, "techStack": [<string>], "impact": <"High" | "Medium"> }
  ],
  "jobRoles": [
    { "title": <string>, "match": <integer 0-100>, "reason": <string, 1 sentence> },
    { "title": <string>, "match": <integer 0-100>, "reason": <string> },
    { "title": <string>, "match": <integer 0-100>, "reason": <string> }
  ],
  "nextTechnologies": [<string>, <string>, <string>, <string>],
  "nextDomains": [
    { "domain": <string>, "reason": <string, 1 sentence> },
    { "domain": <string>, "reason": <string> }
  ],
  "careerAdvice": <string, 3-4 sentences of direct, honest, actionable career guidance>
}`;
}

module.exports = { buildCareerPrompt };
