import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const viteCli = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');
const children = [
  spawn(process.execPath, [path.join(root, 'server', 'index.js')], { cwd: root, stdio: 'inherit' }),
  spawn(process.execPath, [viteCli, '--host', '0.0.0.0'], { cwd: root, stdio: 'inherit' })
];
let shuttingDown = false;
function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) if (!child.killed) child.kill();
  process.exitCode = code;
}
for (const child of children) {
  child.on('error', error => { console.error(error); shutdown(1); });
  child.on('exit', code => { if (!shuttingDown && code && code !== 0) shutdown(code); });
}
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => shutdown(0));
