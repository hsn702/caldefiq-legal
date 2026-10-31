// Refuses to publish while any [[OWNER: ...]] blank is left.
import { readdirSync, readFileSync } from 'node:fs';
let n = 0;
for (const f of readdirSync('.').filter((f) => f.endsWith('.md'))) {
  const left = readFileSync(f, 'utf8').match(/\[\[OWNER:[^\]]*\]\]/g) ?? [];
  for (const b of left) console.log(`${f}: ${b}`);
  n += left.length;
}
console.log(n ? `${n} blank(s) left: DO NOT PUBLISH` : 'No blanks left: ready to publish');
process.exit(n ? 1 : 0);
