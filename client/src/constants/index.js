const rawApiBase = import.meta.env.VITE_API_BASE?.trim();
const normalizedApiBase = rawApiBase ? rawApiBase.replace(/\/+$/, '') : '';

export const API_BASE = normalizedApiBase
  ? (normalizedApiBase.endsWith('/api') ? normalizedApiBase : `${normalizedApiBase}/api`)
  : '/api';

export const DECISION_CONFIG = {
  Hire: {
    color: 'var(--green)',
    bg: 'var(--green-dim)',
    border: 'rgba(16,185,129,0.3)',
    label: 'HIRE',
  },
  Consider: {
    color: 'var(--amber)',
    bg: 'var(--amber-dim)',
    border: 'rgba(245,158,11,0.3)',
    label: 'CONSIDER',
  },
  Reject: {
    color: 'var(--red)',
    bg: 'var(--red-dim)',
    border: 'rgba(239,68,68,0.3)',
    label: 'REJECT',
  },
};

export const SKILL_COLORS = {
  Frontend: '#3b82f6',
  Backend:  '#8b5cf6',
  Database: '#10b981',
  DevOps:   '#f59e0b',
};

export const SKILL_LEVEL = {
  Beginner:     { color: '#f59e0b', width: '33%' },
  Intermediate: { color: '#3b82f6', width: '66%' },
  Advanced:     { color: '#10b981', width: '100%' },
};

export const LANG_COLORS = {
  JavaScript:  '#f1e05a',
  TypeScript:  '#3178c6',
  Python:      '#3572A5',
  Java:        '#b07219',
  'C++':       '#f34b7d',
  C:           '#555555',
  Go:          '#00ADD8',
  Rust:        '#dea584',
  Ruby:        '#701516',
  PHP:         '#4F5D95',
  Swift:       '#ffac45',
  Kotlin:      '#A97BFF',
  HTML:        '#e34c26',
  CSS:         '#563d7c',
  Shell:       '#89e051',
  Vue:         '#41b883',
  Dart:        '#00B4AB',
  'C#':        '#178600',
  default:     '#4a5568',
};
