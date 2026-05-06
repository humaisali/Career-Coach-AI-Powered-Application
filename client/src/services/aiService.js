import { API_BASE } from '../constants';

async function parseResponseSafely(res) {
  const raw = await res.text();
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    // Some proxy/upstream failures can return non-JSON text or HTML.
    return { error: raw };
  }
}

/**
 * Sends all career data to the backend for analysis.
 * @param {object} params
 * @param {string} params.githubLink
 * @param {string} params.description
 * @param {File|null} params.resumeFile
 * @param {string} params.apiKey
 * @returns {Promise<object>} Full analysis result from server
 */
export async function analyzeCareer({ githubLink, description, resumeFile, apiKey }) {
  const formData = new FormData();
  formData.append('githubLink', githubLink.trim());
  formData.append('description', description || '');
  formData.append('apiKey', apiKey.trim());

  if (resumeFile) {
    formData.append('resume', resumeFile);
  }

  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    body: formData,
  });

  const data = await parseResponseSafely(res);

  if (!res.ok) {
    throw new Error(data.error || `Server error: ${res.status}`);
  }

  return data;
}

/**
 * Prefetch GitHub profile for live verification in the form.
 * @param {string} usernameOrUrl
 * @returns {Promise<object>} GitHub profile data
 */
export async function prefetchGitHub(usernameOrUrl) {
  let username = usernameOrUrl.trim().replace(/\/$/, '');
  if (username.includes('github.com/')) {
    username = username.split('github.com/')[1].split('/')[0];
  }
  if (!username) throw new Error('Invalid GitHub URL.');

  const res = await fetch(`${API_BASE}/github/${encodeURIComponent(username)}`);
  const data = await parseResponseSafely(res);

  if (!res.ok) throw new Error(data.error || 'GitHub fetch failed.');
  return data;
}
