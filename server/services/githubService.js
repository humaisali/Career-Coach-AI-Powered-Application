const axios = require('axios');
const { AppError } = require('../utils/AppError');

const GITHUB_API = 'https://api.github.com';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const githubCache = new Map();

function getCachedProfile(username) {
  const entry = githubCache.get(username);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    githubCache.delete(username);
    return null;
  }
  return entry.value;
}

function setCachedProfile(username, value) {
  githubCache.set(username, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

/**
 * Fetches GitHub user profile and repository data.
 * @param {string} githubLink - Full GitHub URL or username
 * @returns {Promise<object>} Structured GitHub profile data
 */
async function fetchGitHubData(githubLink) {
  // Extract username from URL or use as-is
  let username = githubLink.trim().replace(/\/$/, '');
  if (username.includes('github.com/')) {
    username = username.split('github.com/')[1].split('/')[0];
  }

  if (!username) {
    throw new AppError({
      status: 400,
      code: 'INVALID_GITHUB_INPUT',
      message: 'Invalid GitHub profile link or username.',
    });
  }

  const cached = getCachedProfile(username);
  if (cached) return cached;

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'AI-Career-Coach/1.0',
  };
  const githubToken = String(process.env.GITHUB_TOKEN || '').trim();
  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }

  const [userRes, reposRes] = await Promise.all([
    axios.get(`${GITHUB_API}/users/${username}`, { headers }),
    axios.get(`${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100`, { headers }),
  ]);

  const user = userRes.data;
  const repos = reposRes.data || [];

  // Build language frequency map
  const languageMap = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
    }
  });

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description || '',
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language || null,
      url: r.html_url,
      updatedAt: r.updated_at,
    }));

  const profile = {
    username,
    name: user.name || null,
    bio: user.bio || null,
    location: user.location || null,
    company: user.company || null,
    avatar: user.avatar_url,
    profileUrl: user.html_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    accountCreated: user.created_at,
    totalStars,
    totalForks,
    languages: languageMap,
    topRepos,
    repoCount: repos.length,
  };

  setCachedProfile(username, profile);
  return profile;
}

module.exports = { fetchGitHubData };
