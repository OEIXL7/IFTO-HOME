/* Phone presentation only. Business operations continue to use the host bridges. */
(function installPhoneHome() {
  // Bind to the ItemView that is currently opening. A global first-match
  // selector can attach the phone controller to a hidden/stale leaf when
  // Obsidian keeps more than one IFTO view alive.
  var root = window.__IFTO_ACTIVE_CONTAINER;
  if (!root || !root.classList.contains('ifto-phone')) root = document.querySelector('.ifto-container.ifto-phone');
  if (!root) return;
  // A view can be reopened while its old global callbacks are still present.
  // Clean the previous controller before installing this one, but make global
  // teardown ownership-aware so a late onClose from an older leaf cannot
  // erase the newer leaf's navigation state.
  if (typeof window.__IFTO_mobileCleanup === 'function') window.__IFTO_mobileCleanup();
  var page = root.querySelector('.page');
  if (!page) return;
  window.__IFTO_MOBILE_OWNER = root;
  window.__IFTO_MOBILE_ACTIVE = true;
  var controller = new AbortController();
  var signal = controller.signal;
  var ids = ['home', 'inbox', 'todo', 'project', 'area', 'note', 'review'];
  var current = 'home', frame = 0, gesture = null, navGesture = null, suppressClickUntil = 0;
  var notePages = { reading: 1, read: 1, paper: 1 };
  var sheet = null, sheetTrigger = null;
  var viewportBase = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  var organizeTab = root.querySelector('#inbox .tab[data-tab="organize"]');
  if (organizeTab) organizeTab.remove();
  function on(el, event, handler, options) {
    el.addEventListener(event, handler, Object.assign({}, options, { signal: signal }));
  }
  function button(label, action, className) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = label;
    b.className = className || '';
    b.onclick = action;
    return b;
  }

  var rail = document.createElement('main');
  rail.className = 'mobile-pages';
  rail.setAttribute('aria-label', 'IFTO 页面');
  var area = document.createElement('section');
  area.id = 'area'; area.className = 'section';
  area.innerHTML = '<div class="section-title-wrap"><div class="section-title-watermark">AREA领域</div><h2 class="section-title">AREA</h2></div>';
  var domain = root.querySelector('#domainTreeOverlay');
  var zoom = root.querySelector('#domainZoomCtrl');
  if (domain) area.appendChild(domain);
  if (zoom) area.appendChild(zoom);
  var heroImage = root.querySelector('#heroImage');
  var heroImageParent = heroImage && heroImage.parentNode;
  var heroImageNext = heroImage && heroImage.nextSibling;
  var homeLeft = root.querySelector('#home .hero-left');
  var home = root.querySelector('#home');
  var homeWatermark = root.querySelector('#home .hero-watermark');
  var homeBrand = root.querySelector('#home .hero-brand');
  if (home && homeWatermark && homeBrand) {
    var homeHeading = document.createElement('div');
    homeHeading.className = 'mobile-home-heading';
    home.insertBefore(homeHeading, home.firstChild);
    homeHeading.appendChild(homeWatermark);
    homeHeading.appendChild(homeBrand);
  }
  var widgetCard = root.querySelector('#widgetCard');
  var widgetDots = root.querySelector('#widgetDots');
  var coverSlide = null, homeCoverActive = true;
  if (heroImage && homeLeft && widgetCard) {
    coverSlide = document.createElement('div');
    coverSlide.className = 'mobile-home-cover';
    coverSlide.setAttribute('aria-label', '首页封面图片');
    homeLeft.insertBefore(coverSlide, widgetCard);
    coverSlide.appendChild(heroImage);
    heroImage.classList.add('mobile-cover-image');
    var domainLabel = heroImage.querySelector('#heroDomainLabel');
    if (domainLabel) domainLabel.hidden = true;
    widgetCard.hidden = true;
    if (widgetDots) widgetDots.hidden = true;
  }
  ids.forEach(function(id) {
    var section = id === 'area' ? area : root.querySelector('#' + id);
    if (!section) return;
    section.classList.add('mobile-panel');
    section.setAttribute('aria-label', id.toUpperCase());
    section.hidden = id !== current;
    rail.appendChild(section);
  });
  var header = root.querySelector('.header');
  header.after(rail);
  var watermark = document.createElement('div');
  watermark.className = 'mobile-page-watermark';
  watermark.setAttribute('aria-label', 'IFTO 与 IFUS');
  var footerLogo = root.querySelector('.footer-social img');
  if (footerLogo) {
    var watermarkLogo = footerLogo.cloneNode(true);
    watermarkLogo.alt = 'IFTO × IFUS';
    watermark.appendChild(watermarkLogo);
  }
  var watermarkCopy = document.createElement('span');
  watermarkCopy.textContent = '© 2026 Designed by IFTO&IFUS';
  watermark.appendChild(watermarkCopy);
  root.appendChild(watermark);
  var nav = root.querySelector('.nav-items');
  var areaLink = document.createElement('a');
  areaLink.href = '#area'; areaLink.className = 'nav-item'; areaLink.textContent = 'AREA领域';
  nav.querySelector('[href="#note"]').before(areaLink);
  nav.setAttribute('aria-label', '切换页面');

  // Move existing buttons, preserving their handlers and their unique IDs.
  var dock = document.createElement('footer');
  dock.className = 'mobile-dock';
  dock.id = 'mobile-shortcuts';
  dock.hidden = true;
  var shortcuts = root.querySelector('.shortcuts');
  dock.appendChild(shortcuts);
  var shortcutLabels = {
    's-collect': 'INBOX收集',
    's-todo': 'TODO待办',
    's-task': 'PROJECT任务',
    's-note': 'NOTE笔记'
  };
  shortcuts.querySelectorAll('.btn-s').forEach(function(b) {
    var label = shortcutLabels[b.id];
    if (!label) return;
    b.setAttribute('aria-label', label);
    b.querySelector('.s-label').textContent = label;
  });
  root.appendChild(dock);
  var returnHomeButton = button('HOME返回首页', function() { navigate('home'); }, 'mobile-return-home');
  dock.appendChild(returnHomeButton);

  var shortcutOpen = false, shortcutHideTimer = 0;
  var brandToggle = button('', function(e) {
    e.preventDefault(); e.stopPropagation();
    setShortcutsOpen(!shortcutOpen);
  }, 'mobile-brand-toggle');
  brandToggle.setAttribute('aria-label', '打开快捷通道');
  brandToggle.setAttribute('aria-expanded', 'false');
  brandToggle.setAttribute('aria-controls', dock.id);
  var brandLayer = document.createElement('div');
  brandLayer.className = 'mobile-brand-layer ifto-phone';
  var brandImage = root.querySelector('.nav-logo img');
  if (brandImage) {
    var brandMark = brandImage.cloneNode(true);
    brandMark.className = 'mobile-brand-mark'; brandMark.alt = '';
    brandMark.setAttribute('aria-hidden', 'true');
    brandToggle.appendChild(brandMark);
  }
  brandLayer.appendChild(brandToggle);
  document.body.appendChild(brandLayer);
  // The visible artwork should meet the phone viewport edge; anchoring to an
  // Obsidian pane's content box leaves a noticeable gap on mobile layouts.
  function setShortcutsOpen(open) {
    shortcutOpen = open;
    window.clearTimeout(shortcutHideTimer);
    if (open) {
      dock.hidden = false;
      dock.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(function() { if (shortcutOpen) dock.classList.add('is-open'); });
    } else {
      dock.classList.remove('is-open');
      dock.setAttribute('aria-hidden', 'true');
      shortcutHideTimer = window.setTimeout(function() { if (!shortcutOpen) dock.hidden = true; }, 260);
    }
    brandToggle.setAttribute('aria-expanded', String(open));
    brandToggle.setAttribute('aria-label', open ? '关闭快捷通道' : '打开快捷通道');
  }
  on(root, 'click', function(e) {
    if (shortcutOpen && !dock.contains(e.target) && !brandToggle.contains(e.target)) setShortcutsOpen(false);
  });
  on(root, 'keydown', function(e) {
    if (e.key === 'Escape' && !dock.hidden) { setShortcutsOpen(false); brandToggle.focus(); }
  });

  function navigate(id) {
    if (ids.indexOf(id) < 0 || sheet) return;
    setShortcutsOpen(false);
    var active = document.activeElement;
    if (active && /^(INPUT|TEXTAREA)$/.test(active.tagName)) active.blur();
    current = id;
    rail.querySelectorAll('.mobile-panel').forEach(function(panel) { panel.hidden = panel.id !== id; });
    nav.querySelectorAll('.nav-item').forEach(function(link) {
      var selected = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', selected);
      if (selected) {
        link.setAttribute('aria-current', 'page');
        nav.scrollTo({ left: Math.max(0, link.offsetLeft - nav.offsetLeft - 12), behavior: 'smooth' });
      } else link.removeAttribute('aria-current');
    });
    root.setAttribute('data-mobile-page', id);
    // AREA reuses its existing renderer but lives outside heroImage on phones.
    domainMode = id === 'area';
    if (domainMode) {
      if (domainTreeData) renderDomainTree(domainTreeData);
      else renderDomainTreeLoading();
      fetchDomainTree();
    }
  }
  window.__IFTO_mobileNavigate = navigate;

  // On phones the home carousel starts with the configured cover image, then
  // continues through the existing widgets. Desktop widget rendering remains
  // untouched because these handlers only exist in this phone controller.
  if (coverSlide && widgetCard) {
    var originalWidgetNext = window.widgetNext;
    var originalWidgetPrev = window.widgetPrev;
    var originalGoToWidget = window.goToWidget;
    var originalUpdateWidgetDots = window.updateWidgetDots;
    function showHomeCover() {
      homeCoverActive = true;
      coverSlide.hidden = false;
      widgetCard.hidden = true;
      if (widgetDots) widgetDots.hidden = false;
      if (window.updateWidgetDots) window.updateWidgetDots();
    }
    function showHomeWidget() {
      homeCoverActive = false;
      coverSlide.hidden = true;
      widgetCard.hidden = false;
      if (widgetDots) widgetDots.hidden = false;
      if (window.updateWidgetDots) window.updateWidgetDots();
    }
    window.goToWidget = function(index) { showHomeWidget(); if (originalGoToWidget) originalGoToWidget(index); };
    window.updateWidgetDots = function() {
      if (originalUpdateWidgetDots) originalUpdateWidgetDots();
      if (!widgetDots) return;
      var dot = widgetDots.querySelector('.mobile-cover-dot');
      if (!dot) {
        dot = document.createElement('span');
        dot.className = 'widget-dot mobile-cover-dot';
        dot.setAttribute('role', 'button'); dot.setAttribute('aria-label', '封面图片');
        dot.setAttribute('tabindex', '0');
        widgetDots.prepend(dot);
      }
      dot.classList.toggle('active', homeCoverActive);
      var activeDot = widgetDots.querySelectorAll('.widget-dot:not(.mobile-cover-dot)')[window.curWidget || 0];
      if (activeDot) activeDot.classList.toggle('active', !homeCoverActive);
    };
    if (widgetDots) {
      on(widgetDots, 'click', function(e) {
        if (!e.target.closest('.mobile-cover-dot')) return;
        e.preventDefault(); e.stopImmediatePropagation(); showHomeCover();
      }, { capture: true });
      on(widgetDots, 'keydown', function(e) {
        if (!e.target.closest('.mobile-cover-dot') || (e.key !== 'Enter' && e.key !== ' ')) return;
        e.preventDefault(); showHomeCover();
      });
    }
    var prevButton = root.querySelector('#widgetPrev');
    var nextButton = root.querySelector('#widgetNext');
    if (prevButton) on(prevButton, 'click', function(e) {
      e.preventDefault(); e.stopImmediatePropagation();
      if (homeCoverActive) {
        var count = Array.isArray(window._widgetList) ? window._widgetList.length : 0;
        if (count && originalGoToWidget) { showHomeWidget(); originalGoToWidget(count - 1); }
      } else if ((window.curWidget || 0) === 0) showHomeCover();
      else if (originalWidgetPrev) originalWidgetPrev();
    }, { capture: true });
    if (nextButton) on(nextButton, 'click', function(e) {
      e.preventDefault(); e.stopImmediatePropagation();
      if (homeCoverActive) {
        if (originalGoToWidget && Array.isArray(window._widgetList) && window._widgetList.length) originalGoToWidget(0);
        showHomeWidget();
      } else {
        var count = Array.isArray(window._widgetList) ? window._widgetList.length : 0;
        if (count && (window.curWidget || 0) >= count - 1) showHomeCover();
        else if (originalWidgetNext) originalWidgetNext();
      }
    }, { capture: true });
    window.updateWidgetDots();
  }
  on(root, 'click', function(e) {
    if (Date.now() < suppressClickUntil) { e.preventDefault(); e.stopImmediatePropagation(); return; }
    var link = e.target.closest('a[href^="#"]');
    if (link && root.contains(link)) {
      var id = link.getAttribute('href').slice(1);
      if (ids.indexOf(id) >= 0) { e.preventDefault(); e.stopImmediatePropagation(); navigate(id); }
    }
  }, { capture: true });

  // Swiping directly across the top navigation changes the selected page as
  // well as keeping the selected label in view. The outer edge lanes remain
  // available to Obsidian's own sidebar gestures.
  on(nav, 'touchstart', function(e) {
    navGesture = null;
    if (sheet || e.touches.length !== 1 || e.target.closest('input,button,[contenteditable="true"]')) return;
    var t = e.touches[0], bounds = root.getBoundingClientRect();
    var edgeReserve = Math.min(64, Math.max(48, bounds.width * 0.16));
    if (t.clientX - bounds.left < edgeReserve || bounds.right - t.clientX < edgeReserve) return;
    navGesture = { x: t.clientX, y: t.clientY, lastX: t.clientX, start: Date.now(), axis: '' };
  }, { passive: true });
  on(nav, 'touchmove', function(e) {
    if (!navGesture) return;
    if (e.touches.length !== 1) { navGesture = null; return; }
    var t = e.touches[0], dx = t.clientX - navGesture.x, dy = t.clientY - navGesture.y;
    navGesture.lastX = t.clientX;
    if (!navGesture.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 10) navGesture.axis = Math.abs(dx) > Math.abs(dy) * 1.4 ? 'x' : 'y';
    if (navGesture.axis === 'x') {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    }
  }, { passive: false });
  on(nav, 'touchend', function(e) {
    if (!navGesture) return;
    var g = navGesture; navGesture = null;
    var t = e.changedTouches[0], dx = t ? t.clientX - g.x : g.lastX - g.x;
    var dy = t ? t.clientY - g.y : 0;
    if (g.axis === 'x' && Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.4 && Date.now() - g.start < 900) {
      suppressClickUntil = Date.now() + 350;
      var next = ids.indexOf(current) + (dx < 0 ? 1 : -1);
      if (next >= 0 && next < ids.length) navigate(ids[next]);
    }
  }, { passive: true });
  on(nav, 'touchcancel', function() { navGesture = null; }, { passive: true });

  // Reserve broad edge zones for Obsidian's sidebar gestures. Inside the
  // center lane, require a deliberate horizontal swipe before changing pages.
  var excluded = 'input,textarea,select,button,a,[contenteditable="true"],.tabs,.note-sidebar,.slide-nav,.hero-nav-row,.mobile-note-nav,.dt-visual,.dt-zoom-ctrl,.mobile-sheet-overlay';
  on(rail, 'touchstart', function(e) {
    gesture = null;
    if (sheet || e.touches.length !== 1 || e.target.closest(excluded)) return;
    if (document.activeElement && /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) return;
    var t = e.touches[0], bounds = root.getBoundingClientRect();
    var edgeReserve = Math.min(64, Math.max(48, bounds.width * 0.16));
    if (t.clientX - bounds.left < edgeReserve || bounds.right - t.clientX < edgeReserve) return;
    gesture = { x: t.clientX, y: t.clientY, lastX: t.clientX, start: Date.now(), axis: '' };
  }, { passive: true });
  on(rail, 'touchmove', function(e) {
    if (!gesture) return;
    if (e.touches.length !== 1) { gesture = null; return; }
    var t = e.touches[0], dx = t.clientX - gesture.x, dy = t.clientY - gesture.y;
    gesture.lastX = t.clientX;
    if (!gesture.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 10) gesture.axis = Math.abs(dx) > Math.abs(dy) * 1.4 ? 'x' : 'y';
    if (gesture.axis === 'x') {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    }
  }, { passive: false });
  on(rail, 'touchend', function(e) {
    if (!gesture) return;
    var g = gesture; gesture = null;
    var t = e.changedTouches[0];
    var dx = t ? t.clientX - g.x : g.lastX - g.x;
    var dy = t ? t.clientY - g.y : 0;
    if (g.axis === 'x' && Math.abs(dx) >= 80 && Math.abs(dx) > Math.abs(dy) * 1.5 && Date.now() - g.start < 900) {
      suppressClickUntil = Date.now() + 350;
      var next = ids.indexOf(current) + (dx < 0 ? 1 : -1);
      if (next >= 0 && next < ids.length) navigate(ids[next]);
    }
  }, { passive: true });
  on(rail, 'touchcancel', function() { gesture = null; }, { passive: true });

  // The desktop domain handler pans on its entire overlay. Phones only pan
  // the sun chart, leaving cards and the tree free to scroll vertically.
  var domainGesture = null;
  on(area, 'touchstart', function(e) {
    if (!e.target.closest('.dt-sun-wrap')) { domainGesture = null; return; }
    if (e.touches.length === 1) {
      domainGesture = { x: e.touches[0].clientX, y: e.touches[0].clientY, px: dPanX, py: dPanY, moved: false };
    } else if (e.touches.length === 2) {
      domainGesture = { distance: Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY), zoom: dZoom, moved: false };
    }
  }, { passive: true });
  on(area, 'touchmove', function(e) {
    if (!domainGesture) return;
    var g = domainGesture;
    if (e.touches.length === 2 && g.distance) {
      if (e.cancelable) e.preventDefault();
      var distance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      dZoom = Math.max(.3, Math.min(3, g.zoom * distance / Math.max(1, g.distance))); g.moved = true;
      applyDomainTransform();
    } else if (e.touches.length === 1 && g.x !== undefined) {
      var dx = e.touches[0].clientX - g.x, dy = e.touches[0].clientY - g.y;
      if (Math.abs(dx) + Math.abs(dy) > 6) {
        if (e.cancelable) e.preventDefault();
        dPanX = g.px + dx; dPanY = g.py + dy; g.moved = true; applyDomainTransform();
      }
    }
  }, { passive: false });
  on(area, 'touchend', function() {
    if (domainGesture && domainGesture.moved) suppressClickUntil = Date.now() + 350;
    domainGesture = null;
  }, { passive: true });
  on(area, 'touchcancel', function() { domainGesture = null; }, { passive: true });
  var resetDomain = root.querySelector('#domainResetBtn');
  if (resetDomain) on(resetDomain, 'click', function(e) { e.preventDefault(); e.stopPropagation(); resetDomainView(); });

  var noteNav = document.createElement('div');
  noteNav.className = 'slide-nav mobile-note-nav';
  var prev = button('◀', function() { notePages[noteTab]--; paginateNotes(); }, 'slide-btn');
  prev.setAttribute('aria-label', '上一页阅读笔记');
  var number = document.createElement('span'); number.className = 'slide-num';
  var next = button('▶', function() { notePages[noteTab]++; paginateNotes(); }, 'slide-btn');
  next.setAttribute('aria-label', '下一页阅读笔记');
  noteNav.append(prev, number, next);
  root.querySelector('#note .note-main').appendChild(noteNav);
  function paginateNotes() {
    var grid = root.querySelector('#noteGrid');
    var cards = Array.from(grid.children).filter(function(el) { return el.matches('.note-card,.note-add-btn'); });
    var total = Math.max(1, Math.ceil(cards.length / 8));
    var index = Math.max(1, Math.min(total, notePages[noteTab] || 1));
    notePages[noteTab] = index;
    cards.forEach(function(card, i) { card.hidden = i < (index - 1) * 8 || i >= index * 8; });
    noteNav.hidden = cards.length === 0;
    var countLabel = String(index).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
    if (number.textContent !== countLabel) number.textContent = countLabel;
    prev.disabled = index === 1; next.disabled = index === total;
  }

  function closeSheet() {
    if (!sheet) return;
    sheet.remove(); sheet = null;
    if (sheetTrigger && sheetTrigger.isConnected && sheetTrigger.focus) sheetTrigger.focus({ preventScroll: true });
    sheetTrigger = null;
  }
  function openSheet(title, items, trigger) {
    closeSheet(); sheetTrigger = trigger || document.activeElement;
    sheet = document.createElement('div'); sheet.className = 'mobile-sheet-overlay';
    var box = document.createElement('div'); box.className = 'mobile-sheet';
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', title); box.tabIndex = -1;
    var heading = document.createElement('h3'); heading.textContent = title; box.appendChild(heading);
    items.forEach(function(item) {
      var b = button(item.label, async function() {
        closeSheet();
        try { await item.action(); } catch (err) { console.error('IFTO mobile action:', err); showToast('操作失败，请重试'); }
      }, item.danger ? 'mobile-sheet-danger' : '');
      box.appendChild(b);
    });
    box.appendChild(button('取消', closeSheet, 'mobile-sheet-cancel'));
    sheet.appendChild(box); root.appendChild(sheet);
    sheet.onclick = function(e) { if (e.target === sheet) closeSheet(); };
    box.focus({ preventScroll: true });
  }
  on(root, 'keydown', function(e) {
    if (!sheet) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); closeSheet(); }
    if (e.key === 'Tab') {
      var controls = sheet.querySelectorAll('button,input');
      var first = controls[0], last = controls[controls.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === sheet.firstChild)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, { capture: true });

  function refreshLists() { renderInbox(); renderTodo(); renderActivity(); renderProject(); renderNote(); renderReview(); }
  function pathOf(card) { return card.getAttribute('data-path') || card.getAttribute('data-folder'); }
  function dropEvent(path, source) {
    return { preventDefault: function() {}, stopPropagation: function() {}, dataTransfer: {
      types: ['text/plain', 'text/x-ifto-src-col'],
      getData: function(type) { return type === 'text/plain' ? path : type === 'text/x-ifto-src-col' ? source || '' : ''; }
    } };
  }
  function rename(path, folder) {
    openSheet('重命名', []);
    var box = sheet.querySelector('.mobile-sheet'), input = document.createElement('input');
    var oldName = path.split('/').pop();
    input.type = 'text'; input.value = folder ? oldName : oldName.replace(/\.md$/i, '');
    input.setAttribute('aria-label', '名称'); box.insertBefore(input, box.lastChild);
    var save = button('保存', async function() {
      var name = input.value.trim();
      if (!name || /[\\/:*?"<>|]/.test(name) || name === '.' || name === '..') { input.setCustomValidity('请输入有效名称'); input.reportValidity(); return; }
      save.disabled = true;
      try {
        var fn = folder ? window.__IFTO_renameFolder : window.__IFTO_renameFile;
        var ok = fn && await fn(path, folder ? name : name.replace(/\.md$/i, '') + '.md');
        if (ok) { closeSheet(); refreshLists(); } else { showToast('重命名失败'); save.disabled = false; }
      } catch (err) { showToast('重命名失败'); save.disabled = false; }
    });
    input.oninput = function() { input.setCustomValidity(''); };
    input.onkeydown = function(e) { if (e.key === 'Enter') save.click(); };
    box.insertBefore(save, box.lastChild); input.focus(); input.select();
  }
  async function move(path, folder) {
    if (!window.__IFTO_moveFile) return;
    if (window.__IFTO_createFolder) await window.__IFTO_createFolder(folder);
    if (await window.__IFTO_moveFile(path, folder)) refreshLists(); else showToast('移动失败');
  }
  function showActions(card, trigger) {
    var path = pathOf(card); if (!path) return;
    var isFolder = card.matches('.project-folder-card');
    var project = !!card.closest('#project');
    var column = card.closest('.project-col');
    var source = column ? column.getAttribute('data-status') : '';
    var items = [];
    if (!isFolder) items.push({ label: '打开文件', action: function() { if (window.__IFTO_openFile) window.__IFTO_openFile(path); } });
    items.push({ label: '重命名', action: function() { rename(path, isFolder); } });
    if (card.matches('.todo-item,.card-sm')) {
      [-1, 1].forEach(function(direction) {
        items.push({ label: direction < 0 ? '上移' : '下移', action: async function() {
          var folder = path.slice(0, path.lastIndexOf('/'));
          var files = await window.__IFTO_listFiles(folder);
          var order = await window.__IFTO_readListOrder(folder);
          var names = _applyListOrder(files.filter(function(name) { return name[0] !== '.'; }), order);
          var index = names.indexOf(path.split('/').pop()), destination = index + direction;
          if (index < 0 || destination < 0 || destination >= names.length) return;
          var movedName = names.splice(index, 1)[0]; names.splice(destination, 0, movedName);
          if (window.__IFTO_writeListOrder) await window.__IFTO_writeListOrder(folder, names);
          renderTodo(); renderActivity();
        } });
      });
    }
    if (project) {
      root.querySelectorAll('#project .project-col').forEach(function(col) {
        var status = col.getAttribute('data-status');
        if (status === source) return;
        items.push({ label: '移至「' + status + '」', action: async function() {
          // A destination may currently show drafts; switch it back to status view.
          if (projectMiddleView === 'draft') { projectMiddleView = 'progress'; }
          if (window.__ifto_dropHandler) await window.__ifto_dropHandler(dropEvent(path, source), col);
        } });
      });
      if (!_isDraftPath(path)) items.push({ label: '复制到草稿箱', action: async function() { await _handleDraftDrop(path); } });
      if (!_isDraftPath(path)) items.push({ label: isFolder ? '归档已完成内容' : '归档', action: function() {
        var target = root.querySelector('.project-archive-drop');
        if (target && target.ondrop) target.ondrop(dropEvent(path, source));
      } });
    } else if (!isFolder && card.closest('#inbox,#todo')) {
      var inboxCard = !!card.closest('#inbox');
      var destinations = inboxCard ? [
        ['资源文件目录', getResourceRoot()],
        ['项目管理目录', getProjectBase()],
        ['快速学习', getQuickLearnFolder()],
        ['今日待办', TODO_FOLDER],
        ['活动清单', ACTIVITY_FOLDER]
      ] : [
        ['收集', getInboxFolder()], ['今日待办', TODO_FOLDER],
        ['活动清单', ACTIVITY_FOLDER], ['快速学习', getQuickLearnFolder()]
      ];
      destinations.forEach(function(dest) {
        if (path.substring(0, path.lastIndexOf('/')) !== dest[1]) items.push({ label: '移至' + dest[0], action: function() { return move(path, dest[1]); } });
      });
      if (!inboxCard) items.push({ label: '选择目标文件夹…', action: function() {
        openSheet('选择分类位置', [getResourceRoot(), getProjectBase(), getNoteFolder()].map(function(folder) {
          return { label: folder, action: function() { pickFolder(path, folder); } };
        }));
      } });
    }
    items.push({ label: '删除', danger: true, action: async function() {
      if (!await iftoConfirm('确定要删除「' + path.split('/').pop() + '」' + (isFolder ? '及其所有内容' : '') + '吗？')) return;
      var fn = isFolder ? window.__IFTO_deleteFolder : window.__IFTO_deleteFile;
      if (fn && await fn(path)) refreshLists(); else showToast('删除失败');
    } });
    openSheet(path.split('/').pop().replace(/\.md$/i, ''), items, trigger);
  }
  async function pickFolder(path, folder) {
    var contents = window.__IFTO_listFolderContents ? await window.__IFTO_listFolderContents(folder) : [];
    var items = [{ label: '移到此文件夹', action: function() { return move(path, folder); } }];
    contents.filter(function(item) { return item.isFolder && item.name[0] !== '.'; }).forEach(function(item) {
      items.push({ label: item.name + ' →', action: function() { return pickFolder(path, folder + '/' + item.name); } });
    });
    items.push({ label: '重新选择分类位置', action: function() { showActionsForPath(path); } });
    openSheet(folder, items);
  }
  function showActionsForPath(path) {
    openSheet('选择分类位置', [getResourceRoot(), getProjectBase(), getNoteFolder()].map(function(folder) {
      return { label: folder, action: function() { return pickFolder(path, folder); } };
    }));
  }

  var cardsSelector = '.card-detail[data-path],.todo-item[data-path],.card-sm[data-path],.project-card[data-path],.project-file-item[data-path],.project-folder-card[data-folder],.note-card[data-path],.inbox-list-item[data-path],.side-folder-item[data-file="true"]';
  function decorate() {
    frame = 0;
    ['#inboxGrid', '#todoList'].forEach(function(selector) {
      var grid = root.querySelector(selector);
      if (grid && grid.children.length === 0) {
        var empty = document.createElement('div'); empty.className = 'mobile-empty';
        empty.textContent = selector === '#todoList' ? '暂无今日待办' : '暂无内容'; grid.appendChild(empty);
      }
    });
    rail.querySelectorAll(cardsSelector).forEach(function(card) {
      card.setAttribute('draggable', 'false');
      if (card.matches('.card-grid .card-detail')) {
        var tagCount = card.querySelectorAll('.card-tags .card-tag').length;
        card.classList.toggle('mobile-card-wide', tagCount > 3);
      }
      // Nested project items get their own menus; folder menus live in the header.
      var holder = card.matches('.project-folder-card') ? card.querySelector('.project-folder-header') : card;
      if (!holder || Array.from(holder.children).some(function(el) { return el.classList.contains('mobile-more'); })) return;
      var more = button('⋯', function(e) { e.preventDefault(); e.stopPropagation(); showActions(card, more); }, 'mobile-more');
      more.setAttribute('aria-label', '更多操作：' + pathOf(card).split('/').pop());
      holder.appendChild(more);
    });
    rail.querySelectorAll('.cb').forEach(function(cb) {
      cb.setAttribute('role', 'checkbox');
      cb.setAttribute('aria-label', '完成待办');
      cb.setAttribute('aria-checked', String(cb.classList.contains('checked') || !!cb.querySelector('svg') || cb.textContent.trim() === '✓'));
    });
    var archive = root.querySelector('#projectArchiveZone');
    if (archive && !archive.querySelector('.mobile-archive-button')) {
      archive.appendChild(button('归档', function() {
        var entries = Array.from(root.querySelectorAll('#project .project-card[data-path],#project .project-folder-card[data-folder]'));
        var seen = {};
        var items = entries.filter(function(card) { var p = pathOf(card); if (seen[p] || _isDraftPath(p)) return false; seen[p] = true; return true; }).map(function(card) {
          return { label: pathOf(card).split('/').pop(), action: function() { showActions(card); } };
        });
        openSheet('选择要归档的项目或文件', items.length ? items : [{ label: '暂无项目', action: function() {} }]);
      }, 'mobile-archive-button'));
    }
    paginateNotes();
  }
  function scheduleDecorate() { if (!frame) frame = requestAnimationFrame(decorate); }
  var observer = new MutationObserver(scheduleDecorate);
  observer.observe(rail, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  decorate();

  // Project cards previously required Ctrl/Cmd; use tap on phones, without
  // interfering with checkboxes, folder expansion, menus or form controls.
  on(rail, 'click', function(e) {
    if (e.target.closest('button,input,textarea,.cb,.project-view-toggle,.project-view-active')) return;
    var card = e.target.closest('.project-card[data-path],.project-file-item[data-path],.todo-item[data-path],.card-sm[data-path]');
    if (card) {
      e.preventDefault(); e.stopImmediatePropagation();
      if (window.__IFTO_openFile) window.__IFTO_openFile(pathOf(card));
    }
  }, { capture: true });
  on(rail, 'contextmenu', function(e) {
    var card = e.target.closest(cardsSelector);
    if (card) { e.preventDefault(); e.stopImmediatePropagation(); showActions(card); }
  }, { capture: true });
  on(rail, 'dblclick', function(e) { e.preventDefault(); e.stopPropagation(); }, { capture: true });

  function keyboardLayout() {
    var active = document.activeElement;
    var editing = !!active && root.contains(active) && (active.matches('input,textarea,[contenteditable="true"]'));
    var height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    if (!editing) viewportBase = Math.max(viewportBase, height);
    root.classList.toggle('mobile-keyboard', editing && viewportBase - height > 120);
    brandToggle.hidden = root.classList.contains('mobile-keyboard');
  }
  on(root, 'focusin', keyboardLayout); on(root, 'focusout', function() { requestAnimationFrame(keyboardLayout); });
  if (window.visualViewport) on(window.visualViewport, 'resize', keyboardLayout);
  on(window, 'resize', function() { if (!root.querySelector('input:focus,textarea:focus')) viewportBase = window.visualViewport ? window.visualViewport.height : window.innerHeight; keyboardLayout(); });
  navigate('home');
  window.__IFTO_mobileCleanup = function() {
    controller.abort(); observer.disconnect(); if (frame) cancelAnimationFrame(frame);
    if (brandAlignmentFrame) cancelAnimationFrame(brandAlignmentFrame);
    if (brandResizeObserver) brandResizeObserver.disconnect();
    window.clearTimeout(shortcutHideTimer);
    closeSheet(); gesture = null; domainGesture = null; domainMode = false;
    if (coverSlide && widgetCard) {
      window.widgetNext = originalWidgetNext;
      window.widgetPrev = originalWidgetPrev;
      window.goToWidget = originalGoToWidget;
      window.updateWidgetDots = originalUpdateWidgetDots;
      widgetCard.hidden = false;
      if (widgetDots) widgetDots.hidden = false;
    }
    if (heroImage && heroImageParent) {
      heroImage.classList.remove('mobile-cover-image');
      if (heroImageNext && heroImageNext.parentNode === heroImageParent) heroImageParent.insertBefore(heroImage, heroImageNext);
      else heroImageParent.appendChild(heroImage);
    }
    dock.remove(); brandLayer.remove();
    if (root.__IFTO_mobileCleanup === cleanup) root.__IFTO_mobileCleanup = null;
    if (window.__IFTO_MOBILE_OWNER === root) {
      if (window.__IFTO_ACTIVE_CONTAINER === root) window.__IFTO_ACTIVE_CONTAINER = null;
      window.__IFTO_mobileNavigate = null;
      window.__IFTO_MOBILE_ACTIVE = false;
      window.__IFTO_mobileCleanup = null;
      window.__IFTO_MOBILE_OWNER = null;
    }
  };
  var cleanup = window.__IFTO_mobileCleanup;
  window.__IFTO_mobileCleanup = cleanup;
  root.__IFTO_mobileCleanup = window.__IFTO_mobileCleanup;
})();
