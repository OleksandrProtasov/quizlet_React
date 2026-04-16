const THEME_KEY = 'pulsequiz:theme';
const BEST_KEY = 'pulsequiz:best';

export function loadTheme() {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v === 'light' || v === 'dark') return v;
  } catch {
    /* ignore */
  }
  return 'dark';
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function loadBest(deckId) {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw);
    return typeof map?.[deckId] === 'number' ? map[deckId] : null;
  } catch {
    return null;
  }
}

export function saveBestIfBetter(deckId, score, total) {
  const ratio = total > 0 ? score / total : 0;
  try {
    const raw = localStorage.getItem(BEST_KEY);
    const map = raw ? JSON.parse(raw) : {};
    const prev = typeof map[deckId] === 'number' ? map[deckId] : -1;
    if (ratio > prev) {
      map[deckId] = ratio;
      localStorage.setItem(BEST_KEY, JSON.stringify(map));
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}
