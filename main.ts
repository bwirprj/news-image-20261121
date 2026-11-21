// news-image-20261121: copy the checked poster into /output/entry.png.
// The program runs with no network and must write identical bytes twice.
import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(out, { recursive: true });
copyFileSync(join(here, 'entry.png'), join(out, 'entry.png'));
const bytes = statSync(join(out, 'entry.png')).size;
if (bytes > 1048576) throw new Error('entry.png over the 1 MiB gate cap: ' + bytes);
process.stdout.write('news image: copied ' + bytes + ' bytes to ' + join(out, 'entry.png') + '\n');
