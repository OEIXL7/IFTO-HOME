// Local visual/interaction QA with in-memory fixtures. Never reads data.json or notes.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFile(path.join(root, file), 'utf8');
const runFile = promisify(execFile);
async function baselineRead(file) {
  try { return await read('backups/mobile-20261022/' + file); }
  catch (err) {
    if (err.code !== 'ENOENT') throw err;
    // A fresh repository checkout can use the previous release as its baseline.
    const result = await runFile('git', ['show', '1.1.6:.obsidian/plugins/IFTO-HOME/' + file], {cwd: root, maxBuffer: 4 * 1024 * 1024});
    return result.stdout.replace(/^\uFEFF/, '');
  }
}
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    const baseline = url.searchParams.has('baseline');
    const readView = baseline ? baselineRead : read;
    if (url.pathname === '/') {
      let html = await readView('home.html');
      const css = baseline ? '' : await read('mobile.css');
      const fixture = await read('scripts/preview-fixture.js');
      const js = await readView('home.js') + (baseline ? '' : '\n;' + await read('mobile.js'));
      html = html.replace(/https:\/\/picsum.photos\/1200\/800/g, '');
      html = html.replace('</head>', '<link rel="stylesheet" href="/styles.css' + (baseline ? '?baseline=1' : '') + '"><style>' + css + '\nbody{margin:0;height:100vh}.ifto-container{height:100%;position:relative}</style></head>');
      html = html.replace('<body>', '<body class="theme-' + (url.searchParams.get('theme') === 'dark' ? 'dark' : 'light') + '"><div class="ifto-container' + (url.searchParams.has('phone') ? ' ifto-phone' : '') + '">');
      html = html.replace('</body>', '</div><script>' + fixture + '</script><script>' + js.replace(/<\/script/gi, '<\\/script') + '</script></body>');
      res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.end(html); return;
    }
    if (url.pathname === '/styles.css') { res.setHeader('Content-Type', 'text/css'); res.end(await readView('styles.css')); return; }
    res.statusCode = 404; res.end('Not found');
  } catch (err) { res.statusCode = 500; res.end(String(err)); }
});
server.listen(8765, '127.0.0.1', () => console.log('Fixture preview: http://127.0.0.1:8765/?phone=1 (no real vault access)'));
