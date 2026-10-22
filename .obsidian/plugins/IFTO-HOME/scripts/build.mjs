import { readFile, writeFile, rename } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = async name => (await readFile(path.join(root, name), 'utf8')).replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
const coverFiles = ['cover-01.jpg', 'cover-02.jpg', 'cover-03.jpg', 'cover-04.jpg'];
const [html, js, css, mobile, source, ...covers] = await Promise.all([
  read('home.html'), read('home.js'), read('mobile.css'), read('mobile.js'), read('main.ts'),
  ...coverFiles.map(file => readFile(path.join(root, 'assets', 'home-covers', file)))
]);
const htmlBundle = html.replace('</head>', '<style id="ifto-mobile-styles">\n' + css + '\n</style>\n</head>');
const coverData = covers.map(buffer => 'data:image/jpeg;base64,' + buffer.toString('base64'));
const coverBootstrap = 'window.__IFTO_DEFAULT_HERO_IMAGES=' + JSON.stringify(coverData) + ';\n';
const jsBundle = coverBootstrap + js + '\n;\n' + mobile;
const literal = value => JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
const inline = '/* __IFTO_INLINE_START__ */\nconst __IFTO_HOME_HTML = ' + literal(htmlBundle) + ';\nconst __IFTO_HOME_JS = ' + literal(jsBundle) + ';\n/* __IFTO_INLINE_END__ */';
const marker = /\/\* __IFTO_INLINE_START__ \*\/[\s\S]*?\/\* __IFTO_INLINE_END__ \*\//;
if (!marker.test(source)) throw new Error('Missing inline resource markers in main.ts');
const updated = source.replace(marker, () => inline);
const require = createRequire(import.meta.url);
// Set IFTO_ESBUILD_MODULE to use an existing local install without downloading.
const esbuild = require(process.env.IFTO_ESBUILD_MODULE || 'esbuild');
const built = await esbuild.build({
  stdin: { contents: updated, sourcefile: 'main.ts', resolveDir: root, loader: 'ts' },
  bundle: true, external: ['obsidian'], platform: 'browser', format: 'cjs',
  target: 'es2018', write: false, logLevel: 'warning'
});
new Function(jsBundle);
new Function('require', 'module', 'exports', built.outputFiles[0].text);
await writeFile(path.join(root, 'main.ts'), updated);
await writeFile(path.join(root, 'main.js.tmp'), built.outputFiles[0].text);
await rename(path.join(root, 'main.js.tmp'), path.join(root, 'main.js'));
console.log('Built main.js with synchronized home + mobile resources.');
