import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = async name => (await readFile(path.join(root, name), 'utf8')).replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
const coverFiles = ['cover-01.jpg', 'cover-02.jpg', 'cover-03.jpg', 'cover-04.jpg'];
const [source, runtime, html, js, css, mobile, ...covers] = await Promise.all([
  ...['main.ts','main.js','home.html','home.js','mobile.css','mobile.js'].map(read),
  ...coverFiles.map(name => readFile(path.join(root, 'assets', 'home-covers', name)))
]);
const coverBootstrap = 'window.__IFTO_DEFAULT_HERO_IMAGES=' + JSON.stringify(covers.map(buffer => 'data:image/jpeg;base64,' + buffer.toString('base64'))) + ';\n';
const expectedHtml = html.replace('</head>', '<style id="ifto-mobile-styles">\n' + css + '\n</style>\n</head>');
const expectedJs = coverBootstrap + js;
const inline = source.match(/\/\* __IFTO_INLINE_START__ \*\/([\s\S]*?)\/\* __IFTO_INLINE_END__ \*\//);
assert(inline, 'TypeScript inline markers exist');
const embedded = vm.runInNewContext(inline[1] + '\n({html:__IFTO_HOME_HTML,js:__IFTO_HOME_JS,mobile:__IFTO_MOBILE_JS})');
assert.equal(embedded.html, expectedHtml, 'TypeScript HTML includes current mobile CSS');
assert.equal(embedded.js, expectedJs, 'TypeScript JS includes current home script');
assert.equal(embedded.mobile, mobile, 'TypeScript keeps the phone controller in its own script');
const host = { Plugin: class {}, ItemView: class {}, PluginSettingTab: class {}, Platform: {isPhone: false} };
const sandbox = { module: {exports:{}}, require: id => { assert.equal(id, 'obsidian'); return host; } };
vm.runInNewContext(runtime + '\nglobalThis.__embeddedCheck={html:__IFTO_HOME_HTML,js:__IFTO_HOME_JS,mobile:__IFTO_MOBILE_JS};', sandbox);
assert.equal(sandbox.__embeddedCheck.html, expectedHtml, 'Runtime HTML synchronized');
assert.equal(sandbox.__embeddedCheck.js, expectedJs, 'Runtime JS synchronized');
assert.equal(sandbox.__embeddedCheck.mobile, mobile, 'Runtime phone controller synchronized');
assert.equal(typeof sandbox.module.exports.default, 'function', 'Obsidian plugin exports load');
assert.equal(typeof sandbox.module.exports.IFTOView.prototype.onClose, 'function', 'Phone cleanup available');
const plugin = Object.create(sandbox.module.exports.default.prototype);
plugin.settings = { zoom: .85, bgColor: '' };
for (const phone of [true, false]) {
  const container = { classList: { contains: () => phone }, style: { removeProperty() {} } };
  plugin.applyAppearance(container);
  assert.equal(container.style.zoom, phone ? '1' : '0.85', 'Phone scale independent of saved desktop zoom');
}
assert.equal((embedded.js.match(/data:image\/jpeg;base64,/g) || []).length, 4, 'All four bundled HOME covers are embedded for BRAT installs');
assert.match(runtime, /__IFTO_ACTIVE_CONTAINER\s*=\s*this\.containerEl/, 'Each view exposes its own root before scripts execute');
assert.match(runtime, /ifto-mobile-script/, 'Phone controller loads in a separate script from home rendering');
console.log('Build checks passed: isolated home/phone scripts, scoped view root, embedded resources and covers, plugin exports, cleanup, and platform-specific zoom.');
