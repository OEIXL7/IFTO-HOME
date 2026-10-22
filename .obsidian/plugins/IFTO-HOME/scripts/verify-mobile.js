// Execute with playwright-cli run-code --filename scripts/verify-mobile.js
async (page) => {
  const passed = [], errors = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); passed.push(message); };
  try {
  page.on('pageerror', error => errors.push(String(error)));
  await page.route('**/*', route => route.request().url().startsWith('http://127.0.0.1:8765') ? route.continue() : route.abort());
  const go = async id => {
    await page.locator('.nav-item[href="#' + id + '"]').click();
    await page.waitForFunction(id => document.querySelector('.ifto-phone').dataset.mobilePage === id, id);
  };
  const settle = async () => { await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))); };
  await page.setViewportSize({ width: 375, height: 813 });
  await page.goto('http://127.0.0.1:8765/?phone=1');
  await page.waitForSelector('.mobile-dock', { state: 'attached' });
  await settle();
  assert(await page.locator('.mobile-panel').count() === 7, 'Seven phone pages');
  assert(await page.locator('.mobile-dock .btn-s').count() === 4, 'Four shared creation buttons');
  assert(await page.locator('#s-collect').count() === 1, 'No duplicated shortcut IDs');
  assert(await page.locator('.mobile-brand-toggle').count() === 1, 'One fixed brand toggle is shared across pages');
  assert(await page.locator('.mobile-brand-mark').count() === 1, 'The IFTO mark is rendered once outside the scrolling pages');
  assert(await page.locator('.mobile-dock').evaluate(el => el.hidden), 'Shortcut panel starts collapsed');
  assert(await page.locator('#inbox [data-tab="organize"]').count() === 0, 'Phone inbox omits the drag-based organize tab');
  const topInset = await page.locator('.header .nav-items').evaluate(el => el.getBoundingClientRect().top);
  assert(topInset >= 52, 'Phone navigation clears the status area');
  const phoneLogo = await page.locator('.mobile-brand-toggle').evaluate(el => { const r = el.getBoundingClientRect(); return {right:r.right,bottom:r.bottom,top:r.top,width:parseFloat(getComputedStyle(el).width),viewport:innerHeight}; });
  assert(Math.abs(phoneLogo.right - 375) < 1, 'Phone brand toggle sits flush with the viewport edge');
  assert(phoneLogo.bottom < phoneLogo.viewport - 80 && phoneLogo.top > phoneLogo.viewport / 2, 'Phone brand toggle sits at the bottom-right above Obsidian controls');
  assert(await page.locator('.mobile-brand-mark').evaluate(el => { const r = el.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth && parseFloat(getComputedStyle(el).width) >= 130; }), 'Enlarged IFTO mark remains fully visible at the viewport edge');
  assert(await page.locator('.nav-item').first().evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 18), 'Phone navigation type matches habit heading size');
  assert(await page.locator('.mobile-home-cover').evaluate(el => !el.hidden && el.querySelector('#heroImage')), 'Home opens on the configured cover image');
  assert(await page.locator('#widgetCard').evaluate(el => el.hidden), 'First home slide hides widgets behind the cover');
  assert(await page.locator('#widgetDots .mobile-cover-dot.active').count() === 1, 'Cover image is the active first carousel page');
  const homeGeometry = await page.evaluate(() => ({
    title: document.querySelector('.hero-brand').getBoundingClientRect().bottom,
    widget: document.querySelector('.mobile-home-cover').getBoundingClientRect().top,
    viewport: innerHeight
  }));
  assert(homeGeometry.title < homeGeometry.widget, 'Home title above widget');
  assert(await page.locator('.mobile-dock').evaluate(el => getComputedStyle(el).position === 'absolute'), 'Shortcut panel floats above page content');
  const logoTop = await page.locator('.mobile-brand-toggle').evaluate(el => el.getBoundingClientRect().top);
  await go('inbox');
  await page.locator('#inbox').evaluate(el => { el.scrollTop = Math.min(160, el.scrollHeight); });
  await settle();
  assert(Math.abs(await page.locator('.mobile-brand-toggle').evaluate(el => el.getBoundingClientRect().top) - logoTop) < 1, 'IFTO logo stays fixed while page content scrolls');
  await go('home');
  await page.locator('.mobile-brand-toggle').click();
  assert(await page.locator('.mobile-dock').evaluate(el => !el.hidden && el.getBoundingClientRect().bottom <= innerHeight - 80 && el.getBoundingClientRect().width <= 155), 'Brand tap opens a compact on-screen shortcut panel beside the logo');
  assert(await page.locator('.mobile-dock').evaluate(el => getComputedStyle(el).transitionDuration.split(',').some(duration => parseFloat(duration) >= .2)), 'Shortcut panel expands with a transition');
  const shortcutTops = await page.locator('.mobile-dock .btn-s').evaluateAll(els => els.map(el => el.getBoundingClientRect().top));
  assert(shortcutTops.every((top, i) => i === 0 || top > shortcutTops[i - 1]), 'Shortcut actions stack vertically');
  await page.keyboard.press('Escape');
  assert(await page.locator('.mobile-dock').evaluate(el => el.getAttribute('aria-hidden') === 'true'), 'Escape closes the shortcut panel');
  const widgetBefore = await page.evaluate(() => curWidget);
  await page.locator('#widgetNext').click();
  assert(await page.evaluate(before => curWidget === before && document.querySelector('.mobile-home-cover').hidden && !document.querySelector('#widgetCard').hidden, widgetBefore), 'Next arrow advances from the cover to the first widget');
  await page.locator('#widgetNext').click();
  assert(await page.evaluate(before => curWidget !== before && document.querySelector('.ifto-phone').dataset.mobilePage === 'home', widgetBefore), 'Widget arrows continue through widgets without changing pages');
  await page.locator('#widgetPrev').click(); await page.locator('#widgetPrev').click();
  assert(await page.locator('.mobile-home-cover').evaluate(el => !el.hidden), 'Previous arrow returns from the first widget to the cover');
  await page.screenshot({ path: 'output/playwright/mobile-home.png', scale: 'css' });

  for (const id of ['inbox','todo','project','area','note','review']) {
    await go(id); await settle();
    assert(await page.locator('.mobile-panel:not([hidden])').count() === 1, 'Only ' + id + ' is visible');
    assert(await page.evaluate(id => { const el = document.getElementById(id); return el.scrollWidth <= el.clientWidth + 1; }, id), id + ' has no horizontal overflow');
    if (id === 'area') await page.waitForSelector('#area .dt-card');
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'output/playwright/mobile-' + id + '.png', scale: 'css' });
  }
  await go('inbox');
  assert(await page.locator('#inboxGrid > .card-detail').count() === 8, 'Inbox has eight real cards per phone page');
  await page.locator('#inbox .slide-btn').nth(1).click();
  await page.waitForFunction(() => inboxPage === 2 && document.querySelector('#inbox .slide-num').textContent.startsWith('02'));
  await go('todo'); await go('inbox');
  assert(await page.evaluate(() => inboxPage === 2), 'Inbox pagination survives page switching');
  await page.locator('#inbox [data-tab="learn"]').click();
  await settle();
  assert(await page.locator('#inboxGrid > .card-detail').count() === 8, 'Quick learning uses two-column phone pagination');
  await page.locator('#inbox [data-tab="collect"]').click();
  await page.locator('#inboxGrid .card-detail .mobile-more').first().click();
  for (const name of ['资源文件目录','项目管理目录','快速学习','今日待办','活动清单']) {
    assert(await page.getByRole('button', {name:'移至' + name, exact:true}).count() === 1, 'Inbox card can move directly to ' + name);
  }
  await page.getByRole('button', {name:'移至资源文件目录',exact:true}).click(); await settle();
  assert(await page.evaluate(() => Array.from(__fixture.files.keys()).some(p => p.startsWith('Resources/') && p.includes('收集文件 1'))), 'Inbox card moves to the resource root from its action menu');

  await go('note'); await settle();
  assert(await page.locator('#noteGrid > :is(.note-card,.note-add-btn):not([hidden])').count() === 8, 'Reading add card occupies one of eight slots');
  await page.locator('.mobile-note-nav .slide-btn').nth(1).click();
  assert(await page.locator('#noteGrid > :is(.note-card,.note-add-btn):not([hidden])').count() === 7, 'Reading second page has remaining seven cards');
  await page.locator('#noteTab1').click(); await settle();
  await page.locator('#noteTab0').click(); await settle();
  assert((await page.locator('.mobile-note-nav .slide-num').textContent()).startsWith('02'), 'Reading pagination survives category switching');
  await page.locator('#noteTab2').click(); await settle();
  await page.locator('#paperSearchInput').fill('研究文献 19'); await settle();
  assert(await page.locator('#noteGrid > .note-card:not([hidden])').count() === 1, 'Paper search and pagination compose');

  await go('review'); await settle();
  assert(await page.locator('#reviewGrid > .card').count() === 8, 'Review has add card plus seven files');
  await page.locator('#review .slide-btn').nth(1).click(); await settle();
  assert(await page.evaluate(() => reviewPage === 2), 'Review arrows paginate instead of switching pages');

  await go('todo');
  assert(await page.evaluate(() => document.getElementById('todoList').getBoundingClientRect().left === document.getElementById('activityGrid').getBoundingClientRect().left), 'Todo and activity sections share the same phone alignment');
  await page.evaluate(async () => {
    for (let i=0;i<14;i++) {
      __fixture.files.set('Todos/溢出待办 ' + i + '.md',{fm:{},ctime:Date.now()-i,checked:false});
      __fixture.files.set('Activities/溢出活动 ' + i + '.md',{fm:{},ctime:Date.now()-i,checked:false});
      __fixture.files.set('Projects/溢出项目 ' + i + '.md',{fm:{status:'未开始'},ctime:Date.now()-i,checked:false});
    }
    await renderTodo(); await renderActivity(); await renderProject();
  }); await settle();
  assert(await page.locator('#todoList').evaluate(el => el.clientHeight === 220 && el.scrollHeight > el.clientHeight), 'Today todo list keeps a fixed height and scrolls internally');
  assert(await page.locator('#activityGrid').evaluate(el => el.clientHeight === 220 && el.scrollHeight > el.clientHeight), 'Activity list keeps a fixed height and scrolls internally');
  await go('project'); await settle();
  const projectScroll = await page.locator('.project-col[data-status="未开始"]').evaluate(el => ({height:el.clientHeight,scroll:el.scrollHeight,children:el.children.length,overflow:getComputedStyle(el).overflowY}));
  assert(projectScroll.height === 260 && projectScroll.scroll > projectScroll.height, 'Project status column keeps a fixed height and scrolls internally ' + JSON.stringify(projectScroll));
  assert(await page.locator('#projectArchiveZone').evaluate(el => getComputedStyle(el).display === 'none'), 'Phone project view hides the dashed archive rail');
  assert(await page.locator('#project .btn-project-new').first().evaluate(el => getComputedStyle(el).borderTopWidth === '0px' && getComputedStyle(el, '::before').content !== 'none'), 'Project creation uses compact line-style buttons');
  await go('todo');
  const cb = page.locator('#todoList .cb').first();
  const openedBefore = await page.evaluate(() => __fixture.calls.filter(c => c[0] === 'open').length);
  await cb.click(); await settle();
  assert(await cb.getAttribute('aria-checked') === 'true', 'Checkbox accessible state updates');
  assert(await page.evaluate(n => __fixture.calls.filter(c => c[0] === 'open').length === n, openedBefore), 'Checking task does not open file');
  await page.evaluate(() => renderTodo()); await settle();
  assert(await page.locator('#todoList .cb').first().getAttribute('aria-checked') === 'true', 'Checkbox state persists after refresh');
  await page.locator('#todoList .todo-text').first().click();
  assert(await page.evaluate(n => __fixture.calls.filter(c => c[0] === 'open').length === n + 1, openedBefore), 'Task title opens with a single tap');
  await page.locator('#todoList .mobile-more').first().click();
  assert(await page.locator('.mobile-sheet[role="dialog"]').count() === 1, 'Touch action sheet opens');
  await page.getByRole('button', { name: '重命名', exact: true }).click();
  await page.getByRole('textbox', { name: '名称', exact: true }).fill('手机重命名验证');
  await page.getByRole('button', { name: '保存', exact: true }).click(); await settle();
  assert(await page.evaluate(() => __fixture.files.has('Todos/手机重命名验证.md')), 'Touch rename writes through existing bridge');

  await go('project'); await settle();
  assert(await page.locator('#projectCols').evaluate(el => getComputedStyle(el).flexDirection) === 'column', 'Project status sections stack vertically');
  const task = page.locator('.project-card[data-path="Projects/独立任务 0.md"]');
  await task.locator('.mobile-more').click();
  await page.getByRole('button', { name: '移至「推进中」', exact: true }).click(); await settle();
  assert(await page.evaluate(() => __fixture.files.get('Projects/独立任务 0.md').fm.status === '推进中'), 'Touch status change uses existing project operation');
  await page.locator('.project-folder-card[data-folder="Projects/示例项目"] .project-folder-header .mobile-more').first().click();
  await page.getByRole('button', { name: '移至「推进中」', exact: true }).click(); await settle();
  assert(await page.evaluate(() => __fixture.files.get('Projects/示例项目/任务 0.md').fm.status === '推进中' && __fixture.files.get('Projects/示例项目/任务 2.md').fm.status === '已完成'), 'Folder status change preserves files in other source columns');
  await page.locator('.project-card[data-path="Projects/独立任务 0.md"] .mobile-more').click();
  await page.getByRole('button', { name: '复制到草稿箱', exact: true }).click(); await settle();
  assert(await page.evaluate(() => __fixture.files.has('Projects/独立任务 0.md') && Array.from(__fixture.files.keys()).some(p => p.startsWith('Drafts/') && p.endsWith('独立任务 0.md'))), 'Draft operation copies and preserves original');
  await page.locator('.project-view-toggle').filter({ hasText: '推进中' }).click(); await settle();
  await page.locator('.project-folder-card[data-folder="Projects/示例项目"] .project-folder-header .mobile-more').first().click();
  await page.getByRole('button', { name: '归档已完成内容', exact: true }).click();
  await page.waitForFunction(() => __fixture.files.has('Archive/示例项目/任务 2.md'));
  assert(await page.evaluate(() => __fixture.files.has('Projects/示例项目/任务 0.md') && __fixture.files.has('Projects/示例项目/任务 1.md')), 'Archive retains unfinished project files');

  await go('area'); await page.waitForSelector('.dt-card');
  assert(await page.locator('#domainTreeInner').evaluate(el => getComputedStyle(el).position === 'relative'), 'AREA dashboard participates in page scroll layout');
  await page.locator('.dt-view-btn[data-view="sun"]').click();
  assert(await page.locator('.dt-sun-svg').count() === 1, 'AREA sun view renders in independent page');
  await page.locator('.dt-view-btn[data-view="tree"]').click();
  assert(await page.locator('.dt-tree-row').count() > 0, 'AREA tree view remains available');
  await page.locator('.dt-view-btn[data-view="cards"]').click();

  // Real browser touch events via CDP exercise the installed touch listeners.
  const cdp = await page.context().newCDPSession(page);
  const swipe = async (x1, y1, x2, y2) => {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x1, y: y1 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x2, y: y2 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await settle();
  };
  await page.evaluate(() => { document.getElementById('area').scrollTop = 0; });
  await swipe(180, 480, 180, 250);
  assert(await page.evaluate(() => document.querySelector('.ifto-phone').dataset.mobilePage === 'area'), 'Vertical AREA card gesture does not switch pages');
  await page.locator('.dt-view-btn[data-view="sun"]').click();
  await cdp.send('Input.dispatchTouchEvent', {type:'touchStart',touchPoints:[{x:140,y:350},{x:240,y:350}]});
  await cdp.send('Input.dispatchTouchEvent', {type:'touchMove',touchPoints:[{x:110,y:350},{x:270,y:350}]});
  await cdp.send('Input.dispatchTouchEvent', {type:'touchEnd',touchPoints:[]});
  assert(await page.evaluate(() => dZoom > 1 && document.querySelector('.ifto-phone').dataset.mobilePage === 'area'), 'AREA pinch zoom remains isolated from page navigation');
  await page.waitForTimeout(360);
  await page.locator('#domainResetBtn').click();
  assert(await page.evaluate(() => dZoom === 1 && dPanX === 0 && dPanY === 0), 'AREA reset control resets zoom and pan');
  await go('home');
  await swipe(280, 80, 100, 80);
  assert(await page.evaluate(() => document.querySelector('.ifto-phone').dataset.mobilePage === 'inbox' && document.querySelector('.nav-item[aria-current="page"]').getAttribute('href') === '#inbox'), 'Navigation-bar swipe switches the page and selected tab together');
  await swipe(100, 80, 280, 80);
  assert(await page.evaluate(() => document.querySelector('.ifto-phone').dataset.mobilePage === 'home'), 'Reverse navigation-bar swipe returns to the previous page');
  await swipe(280, 120, 100, 120);
  assert(await page.evaluate(() => document.querySelector('.ifto-phone').dataset.mobilePage === 'inbox'), 'Left swipe goes to next page');
  await swipe(100, 120, 280, 120);
  assert(await page.evaluate(() => document.querySelector('.ifto-phone').dataset.mobilePage === 'home'), 'Right swipe goes to previous page');
  await swipe(100, 120, 280, 120);
  assert(await page.evaluate(() => document.querySelector('.ifto-phone').dataset.mobilePage === 'home'), 'First page does not wrap');
  var reservedProbe = String(Date.now());
  await page.evaluate(probe => { document.querySelector('.ifto-phone').dataset.reservedProbe = probe; }, reservedProbe);
  try { await swipe(52, 180, 220, 180); } catch (_) { /* host may handle the reserved edge swipe */ }
  var reservedEdgeChangedPluginPage = false;
  try { reservedEdgeChangedPluginPage = await page.evaluate(probe => { var root = document.querySelector('.ifto-phone'); return root && root.dataset.reservedProbe === probe && root.dataset.mobilePage !== 'home'; }, reservedProbe); } catch (_) { /* host navigation replaced the document */ }
  assert(!reservedEdgeChangedPluginPage, 'Reserved edge gesture does not also change the plugin page');
  await page.goto('http://127.0.0.1:8765/?phone=1'); await page.waitForSelector('.mobile-dock', { state: 'attached' });
  await page.evaluate(() => document.querySelector('.ifto-phone').dataset.mobilePage = 'home');
  await swipe(180, 240, 184, 100);
  assert(await page.evaluate(() => document.querySelector('.ifto-phone').dataset.mobilePage === 'home'), 'Vertical gesture does not navigate');
  var edgeProbe = String(Date.now());
  await page.evaluate(probe => { document.querySelector('.ifto-phone').dataset.edgeProbe = probe; }, edgeProbe);
  try { await swipe(5, 180, 220, 180); } catch (_) { /* native browser back */ }
  // Edge gestures are deliberately owned by the host: Chromium may go back to
  // about:blank here. It must never cause the plugin to advance its own page.
  var edgeChangedPluginPage = false;
  try { edgeChangedPluginPage = await page.evaluate(probe => { var root = document.querySelector('.ifto-phone'); return root && root.dataset.edgeProbe === probe && root.dataset.mobilePage !== 'home'; }, edgeProbe); } catch (_) { /* host navigation replaced the document */ }
  assert(!edgeChangedPluginPage, 'Host edge gesture does not change plugin page');

  // New page discards any gesture click suppression before creation checks.
  await page.goto('http://127.0.0.1:8765/?phone=1'); await page.waitForSelector('.mobile-dock', { state: 'attached' });
  await page.locator('.mobile-brand-toggle').click();
  for (const id of ['s-collect','s-todo','s-task','s-note']) await page.locator('#' + id).click();
  assert(await page.evaluate(() => __fixture.calls.filter(c => c[0] === 'create').length === 4), 'All four dock buttons retain creation handlers');
  assert(await page.locator('#s-collect .s-label').evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 15), 'Phone shortcut labels use readable type size');
  assert(await page.locator('.mobile-brand-mark').evaluate(el => parseFloat(getComputedStyle(el).width) >= 130), 'Phone brand mark is enlarged');

  for (const size of [{width:320,height:568},{width:430,height:932},{width:813,height:375}]) {
    await page.setViewportSize(size);
    for (const id of ['home','inbox','todo','project','area','note','review']) {
      await go(id); await settle();
      assert(await page.evaluate(id => { const el = document.getElementById(id), brand = document.querySelector('.mobile-brand-toggle').getBoundingClientRect(); return el.scrollWidth <= el.clientWidth + 1 && brand.top >= 0 && brand.bottom <= innerHeight; }, id), id + ' fits ' + size.width + '×' + size.height);
      assert(await page.evaluate(id => Array.from(document.querySelectorAll('#' + id + ' .card-detail,#' + id + ' .card-sm,#' + id + ' .note-card,#' + id + ' .project-card,#' + id + ' .project-file-item')).every(card => card.getBoundingClientRect().width <= card.parentElement.getBoundingClientRect().width + 1), id), id + ' cards stay within their panels');
    }
    if (size.height === 375) {
      await page.locator('.mobile-brand-toggle').click();
      assert(await page.locator('.mobile-dock').evaluate(el => el.clientHeight > 0 && el.scrollHeight >= el.lastElementChild.getBoundingClientRect().bottom - el.getBoundingClientRect().top), 'Shortcut panel remains usable in short landscape view');
      await page.locator('.mobile-brand-toggle').click();
    }
  }
  await page.setViewportSize({width:375,height:813});
  await page.goto('http://127.0.0.1:8765/?phone=1&theme=dark');
  await go('area'); await page.waitForSelector('.dt-card');
  await page.waitForTimeout(200);
  await page.screenshot({path:'output/playwright/mobile-area-dark.png',scale:'css'});
  await page.locator('.mobile-brand-toggle').click();
  assert(await page.locator('.mobile-dock').evaluate(el => getComputedStyle(el).backgroundColor) !== 'rgb(255, 255, 255)', 'Dark theme reaches shortcut panel');

  await page.goto('http://127.0.0.1:8765/?phone=1');
  await page.waitForSelector('.mobile-dock', { state: 'attached' });
  await page.evaluate(() => { __fixture.files.clear(); return Promise.all([renderInbox(),renderTodo(),renderNote(),renderReview()]); }); await settle();
  assert(await page.locator('#inboxGrid .mobile-empty').count() === 1 && await page.locator('#todoList .mobile-empty').count() === 1, 'Empty inbox and todo states remain usable');
  await page.evaluate(() => document.querySelector('.ifto-phone').__IFTO_mobileCleanup());
  assert(await page.evaluate(() => !window.__IFTO_MOBILE_ACTIVE && !window.__IFTO_mobileNavigate && !window.__IFTO_mobileCleanup), 'Phone controller cleans up on view close');

  // Compare baseline and changed desktop element geometry at wide and narrow sizes.
  for (const width of [1440, 375]) {
    await page.setViewportSize({width,height:900});
    const geometry = async baseline => {
      await page.goto('http://127.0.0.1:8765/' + (baseline ? '?baseline=1' : ''));
      await page.waitForSelector('#inboxGrid .card-detail'); await settle();
      return page.evaluate(() => ['.header','.hero','.shortcuts','.widget-card','#inbox','#todo','#project','#note','#review'].map(selector => {
        const el = document.querySelector(selector), r = el.getBoundingClientRect(), s = getComputedStyle(el);
        return {selector,x:r.x,y:r.y,w:r.width,h:r.height,display:s.display,direction:s.flexDirection};
      }));
    };
    const before = await geometry(true), after = await geometry(false);
    assert(JSON.stringify(before) === JSON.stringify(after), 'Desktop geometry unchanged at ' + width + 'px');
    assert(await page.locator('.mobile-dock').count() === 0, 'Desktop has no mobile controls at ' + width + 'px');
  }
  assert(errors.length === 0, 'No uncaught browser errors: ' + errors.join('; '));
  return { passed: passed.length, checks: passed, uncaughtErrors: errors };
  } catch (error) {
    throw new Error('After ' + passed.length + ' checks (' + passed.slice(-1) + '), URL ' + page.url() + ': ' + error.message);
  }
}
