// Saves a snapshot of the GitHub contribution calendar into src/data/contributions.json.
// The site reads this file, so visitors never depend on an outside service.
// If the download fails, the previous snapshot is kept and the build continues.
// Usage: npm run contributions   (also runs automatically inside npm run deploy)
import { readFileSync, writeFileSync } from 'node:fs';

const USER = 'superwowers';
const OUT = new URL('../src/data/contributions.json', import.meta.url);

try {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!Array.isArray(json.contributions) || json.contributions.length < 300) {
    throw new Error('unexpected response shape');
  }
  const data = {
    fetchedAt: new Date().toISOString(),
    total: json.total?.lastYear ?? json.contributions.reduce((n, d) => n + d.count, 0),
    contributions: json.contributions.map(({ date, count, level }) => ({ date, count, level })),
  };
  writeFileSync(OUT, JSON.stringify(data));
  console.log(`GitHub snapshot saved: ${data.total} contributions (${data.contributions.length} days).`);
} catch (err) {
  let old = 'none';
  try {
    old = JSON.parse(readFileSync(OUT, 'utf8')).fetchedAt;
  } catch {
    /* no previous snapshot */
  }
  console.warn(`Could not refresh GitHub data (${err.message}). Keeping the previous snapshot (${old}).`);
}
