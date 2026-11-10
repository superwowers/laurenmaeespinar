// Builds the site and publishes dist/ to the gh-pages branch of the "pages" remote.
// Usage: npm run deploy
import { execSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const read = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();

const remoteUrl = read('git remote get-url pages');
const name = read('git config user.name') || 'laurenmae';
const email = read('git config user.email') || 'noreply@users.noreply.github.com';

execSync('node scripts/fetch-contributions.mjs', { stdio: 'inherit' });
execSync('npm run build', { stdio: 'inherit' });

const tmp = mkdtempSync(join(tmpdir(), 'portfolio-deploy-'));
try {
  cpSync('dist', tmp, { recursive: true });
  writeFileSync(join(tmp, '.nojekyll'), '');
  const run = (cmd) => execSync(cmd, { cwd: tmp, stdio: 'inherit' });
  run('git init -q -b gh-pages');
  run('git add -A');
  run(`git -c user.name="${name}" -c user.email="${email}" commit -q -m "Deploy site"`);
  run(`git push -f ${remoteUrl} gh-pages`);
  console.log('\nPublished: https://superwowers.github.io/laurenmaeespinar/ (updates in about a minute)');
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
