// Refuses to publish while any [[OWNER: …]] blank is left (or anything else the strict build rejects).
import { spawnSync } from 'node:child_process';
const r = spawnSync(process.execPath, ['build.mjs', '--publish'], { stdio: 'inherit' });
console.log(r.status === 0 ? 'No blanks left: ready to publish (site/).' : 'DO NOT PUBLISH: fix the items above first.');
process.exit(r.status ?? 1);
