// inboxCards is also used by reviewGrid section below
var inboxCards = [
  {add:true,title:'新建收集'},
  ...Array(9).fill().map(()=>({title:'收集文件',date:'date：YYYYMMDD'}))
];

// ============================================================
// IFTO Input Focus Guard — fixes intermittent "click input, no cursor"
// ============================================================
// Problem: IFTO-HOME runs inside an Obsidian ItemView. Obsidian's workspace
// fires events (vault change, leaf focus, metadata cache, etc.) that can yank
// focus back to whatever it considers the "active" element, intermittently
// stealing focus from our <input>s. This affects every input in the plugin
// (habit name, inline rename, etc.) — symptom is "click/double-click, input
// appears but no caret, can't type until alt-tab away and back".
//
// Fix: install ONE document-level guard that on mousedown into an IFTO input,
// force-focuses it across a 400ms window (microtask, 30ms, 100ms, 250ms).
// This wins the race against whatever else is grabbing focus during the
// click event tick (e.g. vault.on('create') triggering a re-render). After
// the window closes the input is on its own — user Enter/Esc/blur work
// normally without interference.
(function installIftoFocusGuard(){
  if(window.__IFTO_FOCUS_GUARD_INSTALLED) return;
  window.__IFTO_FOCUS_GUARD_INSTALLED = true;
  function isIftoEditable(el){
    if(!el) return false;
    var tag = el.tagName;
    if(tag !== 'INPUT' && tag !== 'TEXTAREA') return false;
    if(tag === 'INPUT' && el.type && !['text','search','url','email','tel',''].includes(el.type)) return false;
    return !!el.closest('.ifto-container, .widget-card, [id="widgetBody"]');
  }
  function pinFocus(el){
    if(!document.contains(el)) return;
    if(document.activeElement === el) return;
    try { el.focus({preventScroll:true}); } catch(_) {}
  }
  document.addEventListener('mousedown', function(e){
    var el = e.target.closest && e.target.closest('input, textarea');
    if(!el || !isIftoEditable(el)) return;
    setTimeout(function(){ pinFocus(el); }, 0);
    setTimeout(function(){ pinFocus(el); }, 30);
    setTimeout(function(){ pinFocus(el); }, 100);
    setTimeout(function(){ pinFocus(el); }, 250);
  }, true);
})();
// ============================================================


// Todo & Activity folder paths — read from settings
function _getFolder(key, fallback) {
  var s = window.__IFTO_SETTINGS || {};
  return s[key] || fallback;
}
// IMPORTANT: these three used to be `var TODO_FOLDER = _getFolder(...)` — i.e.
// resolved once at script-load time and frozen. That meant changing the path
// in settings (todoFolder / activityFolder / taskFolder) did NOT take effect
// until the user reloaded Obsidian, and even then only if main.ts had
// re-pushed __IFTO_SETTINGS. Defining them as getters on the global makes
// every reference (`TODO_FOLDER`, `ACTIVITY_FOLDER`, `TASK_FOLDER`) re-read
// __IFTO_SETTINGS at the moment of use, matching how getInboxFolder() etc.
// already work for the other folder fields.
Object.defineProperty(globalThis, 'TODO_FOLDER', {
  get: function() { return _getFolder('todoFolder', '010-信箱 INBOX/031-今日待办'); },
  configurable: true
});
Object.defineProperty(globalThis, 'ACTIVITY_FOLDER', {
  get: function() { return _getFolder('activityFolder', '010-信箱 INBOX/030-活动清单'); },
  configurable: true
});
Object.defineProperty(globalThis, 'TASK_FOLDER', {
  get: function() { return _getFolder('taskFolder', '100-工作台WORKDESK/120-项目管理/121-未开始'); },
  configurable: true
});
var _organizeResourceExpanded = [];
var _organizeProjectExpanded = [];
function getInboxFolder() { return _getFolder('inboxFolder', '010-信箱 INBOX/020-收集'); }
function getQuickLearnFolder() { return _getFolder('quickLearnFolder', '010-信箱 INBOX/011-快速学习'); }
function getProjectBase() { return _getFolder('projectBase', '100-工作台WORKDESK/120-项目管理'); }
function getProjectCols() { return (_getFolder('projectCols', '121-未开始,122-推进中,123-已完成')).split(',').map(function(s){return s.trim();}).filter(function(s){return s;}); }
function getDraftFolder() { return _getFolder('draftFolder', '100-工作台WORKDESK/110-草稿箱'); }
function _isDraftPath(path) {
  if (!path) return false;
  return path.indexOf(getDraftFolder()) === 0;
}

// ====== Project Middle Column (推进中) View Toggle ======
// 'progress' = show 推进中 kanban column (default)
// 'draft'    = show 草稿箱 (drafts) folder contents
var projectMiddleView = 'progress';
function switchProjectMiddleView(view) {
  if(view !== 'progress' && view !== 'draft') return;
  projectMiddleView = view;
  renderProject();
}
function getBookFolder() { return _getFolder('bookFolder', '400-资源RESOURCE/420-览阅/421-书籍'); }
function getPaperFolder() { return _getFolder('paperFolder', '400-资源RESOURCE/420-览阅/422-论文'); }
function getResourceRoot() { return _getFolder('resourceRoot', '400-资源RESOURCE'); }
function getNoteFolder() { return _getFolder('notePath', '010-信箱 INBOX/040-笔记'); }

// ====== Inbox Tab State ======
var inboxTab = 'collect';
var inboxPage = 1;
var inboxPerPage = 17;
var inboxSortDesc = true; // true=从新到旧, false=从旧到新

function switchInboxTab(tab) {
  inboxTab = tab;
  inboxPage = 1;
  document.querySelectorAll('#inbox .tab').forEach(function(t){ t.classList.remove('active'); });
  var te = document.querySelector('#inbox .tab[data-tab="'+tab+'"]');
  if(te) te.classList.add('active');
  renderInbox();
}

async function renderInbox() {
  try {
    var grid = document.getElementById('inboxGrid');
    if(!grid) return;
    if(inboxTab === 'collect') await renderInboxCollect(grid);
    else if(inboxTab === 'organize') await renderInboxOrganize(grid);
    else if(inboxTab === 'learn') await renderInboxLearn(grid);
  } catch(e) { console.error('IFTO: renderInbox error', e); }
}

function fmtDate(ts){if(!ts)return'';var d=new Date(ts);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}
function tagColor(tag){var colors=['#e74c3c','#e67e22','#3498db','#2ecc71','#9b59b6','#1abc9c','#e84393','#00b894','#6c5ce7','#fd79a8','#0984e3','#00cec9'];var h=0;for(var i=0;i<tag.length;i++)h=((h<<5)-h)+tag.charCodeAt(i);return colors[Math.abs(h)%colors.length]}
function hexRgb(h){return parseInt(h.slice(1,3),16)+','+parseInt(h.slice(3,5),16)+','+parseInt(h.slice(5,7),16)}
function fmtTags(tags){if(!tags||!tags.length)return'';return tags.map(function(t){var c=tagColor(t),rgb=hexRgb(c);return'<span class="card-tag" style="background:rgba('+rgb+',0.12);color:'+c+';border:1px solid rgba('+rgb+',0.25)">'+t+'</span>'}).join(' ')}

async function renderInboxCollect(grid) {
  var all = (typeof window.__IFTO_getFilesDetail === 'function')
    ? await window.__IFTO_getFilesDetail(getInboxFolder(), 0, 999)
    : {files: [], total: 0};
  var totalFiles = all.total;
  var allDetails = all.files || [];
  // Filter out hidden files (starting with .)
  allDetails = allDetails.filter(function(f){ return f.name && f.name[0] !== '.'; });

  // Sort by creation time
  allDetails.sort(function(a, b) {
    var tA = a.ctime || 0;
    var tB = b.ctime || 0;
    return inboxSortDesc ? tB - tA : tA - tB;
  });

  // Page 1: add button + items (4 rows). Other pages: items only (4 rows)
  var gridWidth = grid.clientWidth - 48; // subtract padding (24px each side)
  var itemsPerRow = Math.max(1, Math.floor((gridWidth + 10) / 210)); // card 200px + gap 10px
  var rowsPerPage = 4;
  var itemsPerPage = itemsPerRow * rowsPerPage;
  var page1Slots = itemsPerPage - 1; // one slot reserved for add button
  var otherSlots = itemsPerPage;
  var totalPages = 1;
  if(totalFiles > page1Slots) totalPages = 1 + Math.ceil((totalFiles - page1Slots) / otherSlots);
  if(inboxPage > totalPages) inboxPage = totalPages;

  var start, count;
  if(inboxPage === 1) { start = 0; count = Math.min(allDetails.length, page1Slots); }
  else { start = page1Slots + (inboxPage - 2) * otherSlots; count = Math.min(allDetails.length - start, otherSlots); }
  var pf = allDetails.slice(start, start + count);

  var html = '';
  if(inboxPage === 1) {
    html += '<div class="card card-add" id="collect-add-btn"><span class="ci">+</span><span class="cl">新建收集</span></div>';
  }
  for(var i=0;i<pf.length;i++) {
    var d = pf[i];
    var nm = d.name.replace(/\.md$/i, '');
    html += '<div class="card card-detail" data-path="'+getInboxFolder()+'/'+d.name+'">'+
      '<span class="card-title">'+nm+'</span>'+
      '<span class="card-date">'+fmtDate(d.ctime)+'</span>'+
      (d.tags && d.tags.length ? '<span class="card-tags">'+fmtTags(d.tags)+'</span>' : '')+
    '</div>';
  }

  grid.className = 'card-grid';
  grid.innerHTML = html;

  // Wire add button
  var ab = document.getElementById('collect-add-btn');
  var ct = grid.closest('.ifto-container');
  if(ab && ct && ct.__createNote) {
    ab.onclick = function(){ ct.__createNote(); };
  }

  // Wire file cards
  var cards = grid.querySelectorAll('.card[data-path]');
  for(var j=0;j<cards.length;j++) {
    (function(card){
      card.onclick = function(){
        var p = this.getAttribute('data-path');
        if(window.__IFTO_openFile) window.__IFTO_openFile(p);
      };
    })(cards[j]);
  }

  updateInboxNav(totalPages);
}

async function renderInboxOrganize(grid) {
  var all = (typeof window.__IFTO_getFilesDetail === 'function')
    ? await window.__IFTO_getFilesDetail(getInboxFolder(), 0, 999)
    : {files: [], total: 0};
  var allDetails = all.files || [];
  // Filter out hidden files (starting with .)
  allDetails = allDetails.filter(function(f){ return f.name && f.name[0] !== '.'; });

  // Sort by creation time
  allDetails.sort(function(a, b) {
    var tA = a.ctime || 0;
    var tB = b.ctime || 0;
    return inboxSortDesc ? tB - tA : tA - tB;
  });

  // 4 rows per page, calculated from grid width (estimate card area = total - sidebar 180px - gap 16px)
  var ogW = grid.clientWidth - 48 - 180 - 16;
  var itemsPerRow = Math.max(1, Math.floor((ogW + 10) / 210));
  var itemsPerPage = itemsPerRow * 4;
  var totalPages = Math.ceil(allDetails.length / itemsPerPage) || 1;
  if(inboxPage > totalPages) inboxPage = totalPages;
  var start = (inboxPage - 1) * itemsPerPage;
  var pf = allDetails.slice(start, start + itemsPerPage);

  // Build card grid HTML
  var cardHtml = '';
  for(var i=0;i<pf.length;i++) {
    var d = pf[i];
    var nm = d.name.replace(/\.md$/i, '');
    cardHtml += '<div class="card card-detail" draggable="true" data-path="'+getInboxFolder()+'/'+d.name+'">'+
      '<span class="card-title">'+nm+'</span>'+
      '<span class="card-date">'+fmtDate(d.ctime)+'</span>'+
      (d.tags && d.tags.length ? '<span class="card-tags">'+fmtTags(d.tags)+'</span>' : '')+
    '</div>';
  }

  // Build sidebar: 400-资源RESOURCE directory, 快速学习, 今日待办/活动清单
  var sidebarHtml = '<div class="organize-sidebar">';

  // 400-资源RESOURCE section
  sidebarHtml += '<div class="side-box" style="flex:1">';
  sidebarHtml += '<div class="side-box-title">资源文件目录</div>';
  sidebarHtml += '<div class="side-folder-list" id="resourceFolderList">';
  sidebarHtml += '<div class="side-folders-empty">加载中...</div>';
  sidebarHtml += '</div></div>';

  // 项目管理目录 section
  sidebarHtml += '<div class="side-box" style="flex:1">';
  sidebarHtml += '<div class="side-box-title">项目管理目录</div>';
  sidebarHtml += '<div class="side-folder-list" id="projectFolderList">';
  sidebarHtml += '<div class="side-folders-empty">加载中...</div>';
  sidebarHtml += '</div></div>';

  // 快速学习 section
  sidebarHtml += '<div class="side-box" style="flex:1;min-height:0">';
  sidebarHtml += '<div class="side-box-title">快速学习</div>';
  sidebarHtml += '<div class="side-drop-area" id="dropQuickLearn" data-target="__quicklearn__">拖拽至此 →<br>移动到快速学习</div>';
  sidebarHtml += '</div>';

  // 今日待办 / 活动清单
  sidebarHtml += '<div class="side-row" style="flex:1;min-height:0">';
  sidebarHtml += '<div class="side-col"><div class="side-box-title">今日待办</div><div class="side-drop-area" id="dropTodo" data-target="__todo__" style="flex:1">拖拽至此</div></div>';
  sidebarHtml += '<div class="side-col"><div class="side-box-title">活动清单</div><div class="side-drop-area" id="dropActivity" data-target="__activity__" style="flex:1">拖拽至此</div></div>';
  sidebarHtml += '</div></div>';

  // Full layout: main + sidebar
  grid.className = '';
  grid.innerHTML = '<div class="organize-layout"><div class="organize-main"><div class="card-grid" id="organizeCardGrid">'+cardHtml+'</div></div>'+sidebarHtml+'</div>';

  // Setup card drag
  setupOrganizeCardDrag(grid);

  // Load 400-资源RESOURCE contents (also wires drop targets after render)
  await loadResourceFolder();

  // Load 项目管理目录 contents
  await loadProjectFolders();

  updateInboxNav(totalPages);
}

function setupOrganizeCardDrag(container) {
  // Cards: draggable + click to open
  var cards = container.querySelectorAll('#organizeCardGrid .card[data-path]');
  for(var i=0;i<cards.length;i++){(function(c){
    c.ondragstart = function(e){
      e.dataTransfer.setData('text/plain', this.getAttribute('data-path'));
      this.classList.add('dragging');
    };
    c.ondragend = function(){ this.classList.remove('dragging'); };
    c.onclick = function(){
      var p = this.getAttribute('data-path');
      if(window.__IFTO_openFile) window.__IFTO_openFile(p);
    };
  })(cards[i]);}

  // Card grid as drop target: files from resource tree drag back to 收集
  var grid = document.getElementById('organizeCardGrid');
  if(grid) {
    grid.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over-target'); };
    grid.ondragleave = function(){ this.classList.remove('drag-over-target'); };
    grid.ondrop = function(e){
      e.preventDefault(); this.classList.remove('drag-over-target');
      var path = e.dataTransfer.getData('text/plain');
      if(path && window.__IFTO_moveFile) {
        window.__IFTO_moveFile(path, getInboxFolder()).then(function(success){ if(success) renderInbox(); });
      }
    };
  }
}

function showToast(msg) {
  var t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:var(--g1);color:var(--bg);padding:8px 16px;font-size:12px;z-index:99999;transition:opacity .3s;font-family:var(--font)';
  document.body.appendChild(t);
  setTimeout(function(){ t.style.opacity='0'; setTimeout(function(){ t.remove(); },400); },2000);
}

async function loadResourceFolder() {
  try {
    var list = document.getElementById('resourceFolderList');
    if(!list) return;
    var items = (typeof window.__IFTO_listFolderContents === 'function')
      ? await window.__IFTO_listFolderContents(getResourceRoot())
      : [];
    if(items.length === 0) {
      list.innerHTML = '<div class="side-folders-empty">400-资源RESOURCE 为空</div>';
      return;
    }
    // Only show folders at the top level
    var folders = items.filter(function(i){ return i.isFolder; });
    if(folders.length === 0) {
      list.innerHTML = '<div class="side-folders-empty">无子文件夹</div>';
      return;
    }
    var html = '';
    for(var i=0;i<folders.length;i++) {
      var fp = getResourceRoot()+'/'+folders[i].name;
      html += '<div class="side-folder-item" data-folder="'+fp+'" data-expanded="false">'+
        '<span class="folder-toggle">▶</span> 📁 '+folders[i].name+
        '</div><div class="folder-children" id="fch_'+i+'" style="display:none"></div>';
    }
    list.innerHTML = html;

    // Restore previously expanded folders from module-level state
    _organizeResourceExpanded.forEach(function(fp){
      var items = list.querySelectorAll('.side-folder-item[data-folder]');
      for(var ei=0;ei<items.length;ei++){
        if(items[ei].getAttribute('data-folder') === fp){
          items[ei].setAttribute('data-expanded','true');
          var t = items[ei].querySelector('.folder-toggle');
          if(t) t.textContent = '▼';
          var idx = Array.prototype.indexOf.call(list.querySelectorAll('.side-folder-item'), items[ei]);
          var children = document.getElementById('fch_'+idx);
          if(children){
            children.style.display = 'flex';
            loadFolderChildren(children, fp);
          }
        }
      }
    });


    // Wire expand/collapse on click + drag-drop on folder items
    var layout = list.closest('.organize-layout');
    list.querySelectorAll('.side-folder-item').forEach(function(item, idx){
      // Click to toggle expand
      item.onclick = function(e){
        e.stopPropagation();
        var isExpanded = this.getAttribute('data-expanded') === 'true';
        var children = document.getElementById('fch_'+idx);
        if(!children) return;
        var fp = this.getAttribute('data-folder');
        if(isExpanded) {
          children.style.display = 'none';
          children.innerHTML = '';
          this.setAttribute('data-expanded','false');
          var t = this.querySelector('.folder-toggle');
          if(t) t.textContent = '▶';
          _organizeResourceExpanded = _organizeResourceExpanded.filter(function(x){ return x !== fp; });
        } else {
          children.style.display = 'flex';
          this.setAttribute('data-expanded','true');
          var t = this.querySelector('.folder-toggle');
          if(t) t.textContent = '▼';
          if(_organizeResourceExpanded.indexOf(fp) === -1) _organizeResourceExpanded.push(fp);
          // Load children contents
          loadFolderChildren(children, fp);
        }
      };
      // Drag-drop for the folder item itself
      item.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over'); };
      item.ondragleave = function(){ this.classList.remove('drag-over'); };
      item.ondrop = function(e){
        e.preventDefault(); this.classList.remove('drag-over');
        var path = e.dataTransfer.getData('text/plain');
        var target = this.getAttribute('data-folder');
        if(path && target && window.__IFTO_moveFile) {
          window.__IFTO_moveFile(path, target).then(function(success){ if(success) renderInbox(); });
        }
      };
    });

    // Wire sidebar drop areas (快速学习, 今日待办, 活动清单)
    var layout = list.closest('.organize-layout');
    if(layout) {
      layout.querySelectorAll('.side-drop-area').forEach(function(area){
        area.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over'); };
        area.ondragleave = function(){ this.classList.remove('drag-over'); };
        area.ondrop = function(e){
          e.preventDefault(); this.classList.remove('drag-over');
          var path = e.dataTransfer.getData('text/plain');
          var target = this.getAttribute('data-target');
          if(!path) return;
          if(target === '__todo__') {
            if(path && window.__IFTO_moveFile) {
              window.__IFTO_moveFile(path, TODO_FOLDER).then(function(success){ if(success){ renderInbox(); renderTodo(); } });
            }
            return;
          }
          if(target === '__activity__') {
            if(path && window.__IFTO_moveFile) {
              window.__IFTO_moveFile(path, ACTIVITY_FOLDER).then(function(success){ if(success){ renderInbox(); renderActivity(); } });
            }
            return;
          }
          if(target === '__quicklearn__') {
            if(path && window.__IFTO_moveFile) {
              window.__IFTO_moveFile(path, getQuickLearnFolder()).then(function(success){ if(success){ renderInbox(); } });
            }
            return;
          }
          if(path && target && window.__IFTO_moveFile) {
            window.__IFTO_moveFile(path, target).then(function(success){ if(success) renderInbox(); });
          }
        };
      });
    }
  } catch(e) { console.error('IFTO: loadResourceFolder error', e); }
}

async function loadProjectFolders() {
  try {
    var list = document.getElementById('projectFolderList');
    if(!list) return;
    var pBase = getProjectBase();
    var items = (typeof window.__IFTO_listFolderContents === 'function')
      ? await window.__IFTO_listFolderContents(pBase) : [];
    if(items.length === 0) {
      list.innerHTML = '<div class="side-folders-empty">项目管理为空</div>';
      return;
    }
    // Only show project folders (exclude status columns)
    var pCols = getProjectCols();
    var statusMap = {};
    for(var si=0;si<pCols.length;si++) statusMap[pCols[si]] = true;
    var folders = items.filter(function(i){
      return i.isFolder && !statusMap[i.name];
    });
    if(folders.length === 0) {
      list.innerHTML = '<div class="side-folders-empty">无项目文件夹</div>';
      return;
    }
    var html = '';
    for(var i=0;i<folders.length;i++) {
      var fp = pBase+'/'+folders[i].name;
      html += '<div class="side-folder-item" data-folder="'+fp+'" data-expanded="false">'+
        '<span class="folder-toggle">▶</span> 📁 '+folders[i].name+
        '</div><div class="folder-children" id="pfch_'+i+'" style="display:none"></div>';
    }
    list.innerHTML = html;

    // Restore previously expanded folders from module-level state
    _organizeProjectExpanded.forEach(function(fp){
      var items = list.querySelectorAll('.side-folder-item[data-folder]');
      for(var ei=0;ei<items.length;ei++){
        if(items[ei].getAttribute('data-folder') === fp){
          items[ei].setAttribute('data-expanded','true');
          var t = items[ei].querySelector('.folder-toggle');
          if(t) t.textContent = '▼';
          var idx = Array.prototype.indexOf.call(list.querySelectorAll('.side-folder-item'), items[ei]);
          var children = document.getElementById('pfch_'+idx);
          if(children){
            children.style.display = 'flex';
            loadFolderChildren(children, fp);
          }
        }
      }
    });

    // Wire expand/collapse on click + drag-drop on folder items
    list.querySelectorAll('.side-folder-item').forEach(function(item, idx){
      item.onclick = function(e){
        e.stopPropagation();
        var isExpanded = this.getAttribute('data-expanded') === 'true';
        var children = document.getElementById('pfch_'+idx);
        if(!children) return;
        var fp = this.getAttribute('data-folder');
        if(isExpanded) {
          children.style.display = 'none';
          children.innerHTML = '';
          this.setAttribute('data-expanded','false');
          var t = this.querySelector('.folder-toggle');
          if(t) t.textContent = '▶';
          _organizeProjectExpanded = _organizeProjectExpanded.filter(function(x){ return x !== fp; });
        } else {
          children.style.display = 'flex';
          this.setAttribute('data-expanded','true');
          var t = this.querySelector('.folder-toggle');
          if(t) t.textContent = '▼';
          if(_organizeProjectExpanded.indexOf(fp) === -1) _organizeProjectExpanded.push(fp);
          loadFolderChildren(children, fp);
        }
      };
      item.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over'); };
      item.ondragleave = function(){ this.classList.remove('drag-over'); };
      item.ondrop = function(e){
        e.preventDefault(); this.classList.remove('drag-over');
        var path = e.dataTransfer.getData('text/plain');
        var target = this.getAttribute('data-folder');
        if(path && target && window.__IFTO_moveFile) {
          window.__IFTO_moveFile(path, target).then(function(success){ if(success) renderInbox(); });
        }
      };
    });
  } catch(e) { console.error('IFTO: loadProjectFolders error', e); }
}

async function loadFolderChildren(container, folderPath) {
  try {
    var items = (typeof window.__IFTO_listFolderContents === 'function')
      ? await window.__IFTO_listFolderContents(folderPath)
      : [];
    if(items.length === 0) {
      container.innerHTML = '<div style="font-size:10px;color:var(--g4);padding:2px 0 2px 20px">空</div>';
      return;
    }
    var html = '';
    for(var i=0;i<items.length;i++) {
      var fp = folderPath+'/'+items[i].name;
      if(items[i].isFolder) {
        // Subfolder: render with expand toggle + children container
        html += '<div class="side-folder-item" data-folder="'+fp+'" data-expanded="false" style="padding-left:20px">'+
          '<span class="folder-toggle">▶</span> 📁 '+items[i].name+
          '</div><div class="folder-children" style="display:none"></div>';
      } else {
        html += '<div class="side-folder-item" style="padding-left:20px" data-folder="'+fp+'" data-file="true" draggable="true">📄 '+items[i].name+'</div>';
      }
    }
    container.innerHTML = html;

    // Wire drag-drop + click handlers on child items
    container.querySelectorAll('.side-folder-item').forEach(function(item){
      var fp = item.getAttribute('data-folder');
      // Drag-drop
      item.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over'); };
      item.ondragleave = function(){ this.classList.remove('drag-over'); };
      item.ondrop = function(e){
        e.preventDefault(); this.classList.remove('drag-over');
        var path = e.dataTransfer.getData('text/plain');
        var target = this.getAttribute('data-folder');
        if(!path) return;
        if(this.getAttribute('data-file') === 'true') {
          showToast('不能移动到文件上');
          return;
        }
        if(target && window.__IFTO_moveFile) {
          window.__IFTO_moveFile(path, target).then(function(success){ if(success) renderInbox(); });
        }
      };
      // File items: draggable out + click to open
      if(item.getAttribute('data-file') === 'true') {
        item.ondragstart = function(e){
          e.dataTransfer.setData('text/plain', this.getAttribute('data-folder'));
          this.classList.add('drag-over');
        };
        item.onclick = function(){
          var p = this.getAttribute('data-folder');
          if(window.__IFTO_openFile) window.__IFTO_openFile(p);
        };
      } else {
        // Subfolder: click to toggle expand
        item.onclick = function(e){
          e.stopPropagation();
          var isExpanded = this.getAttribute('data-expanded') === 'true';
          // Find the sibling .folder-children container
          var children = this.nextElementSibling;
          while(children && !children.classList.contains('folder-children')) {
            children = children.nextElementSibling;
          }
          if(!children) return;
          if(isExpanded) {
            children.style.display = 'none';
            children.innerHTML = '';
            this.setAttribute('data-expanded','false');
            var t = this.querySelector('.folder-toggle');
            if(t) t.textContent = '▶';
            _organizeResourceExpanded = _organizeResourceExpanded.filter(function(x){ return x !== fp; });
          } else {
            children.style.display = 'flex';
            this.setAttribute('data-expanded','true');
            var t = this.querySelector('.folder-toggle');
            if(t) t.textContent = '▼';
            if(_organizeResourceExpanded.indexOf(fp) === -1) _organizeResourceExpanded.push(fp);
            loadFolderChildren(children, fp);
          }
        };
      }
    });

    // Restore expanded subfolder state
    container.querySelectorAll('.side-folder-item[data-expanded]').forEach(function(item){
      var fp = item.getAttribute('data-folder');
      if(_organizeResourceExpanded.indexOf(fp) !== -1) {
        var children = item.nextElementSibling;
        while(children && !children.classList.contains('folder-children')) {
          children = children.nextElementSibling;
        }
        if(children) {
          item.setAttribute('data-expanded','true');
          var t = item.querySelector('.folder-toggle');
          if(t) t.textContent = '▼';
          children.style.display = 'flex';
          loadFolderChildren(children, fp);
        }
      }
    });
  } catch(e) { console.error('IFTO: loadFolderChildren error', e); }
}

async function renderInboxLearn(grid) {
  var all = (typeof window.__IFTO_getFilesDetail === 'function')
    ? await window.__IFTO_getFilesDetail(getQuickLearnFolder(), 0, 999)
    : {files: [], total: 0};
  var allDetails = all.files || [];
  // Filter out hidden files (starting with .)
  allDetails = allDetails.filter(function(f){ return f.name && f.name[0] !== '.'; });

  // Sort by creation time
  allDetails.sort(function(a, b) {
    var tA = a.ctime || 0;
    var tB = b.ctime || 0;
    return inboxSortDesc ? tB - tA : tA - tB;
  });

  // 4 rows per page, calculated from grid width
  var gridW = grid.clientWidth - 48;
  var itemsPerRow = Math.max(1, Math.floor((gridW + 10) / 210));
  var itemsPerPage = itemsPerRow * 4;
  var totalPages = Math.ceil(allDetails.length / itemsPerPage) || 1;
  if(inboxPage > totalPages) inboxPage = totalPages;

  var start = (inboxPage - 1) * itemsPerPage;
  var pf = allDetails.slice(start, start + itemsPerPage);

  var html = '';
  for(var i=0;i<pf.length;i++) {
    var d = pf[i];
    var nm = d.name.replace(/\.md$/i, '');
    html += '<div class="card card-detail" data-path="'+getQuickLearnFolder()+'/'+d.name+'">'+
      '<span class="card-title">'+nm+'</span>'+
      '<span class="card-date">'+fmtDate(d.ctime)+'</span>'+
      (d.tags && d.tags.length ? '<span class="card-tags">'+fmtTags(d.tags)+'</span>' : '')+
    '</div>';
  }

  grid.className = 'card-grid';
  grid.innerHTML = html;

  // Wire file cards
  var cards = grid.querySelectorAll('.card[data-path]');
  for(var j=0;j<cards.length;j++) {
    (function(card){
      card.onclick = function(){
        var p = this.getAttribute('data-path');
        if(window.__IFTO_openFile) window.__IFTO_openFile(p);
      };
    })(cards[j]);
  }

  updateInboxNav(totalPages);
}

function updateInboxNav(tp) {
  var nav = document.querySelector('#inbox .slide-nav');
  if(!nav) return;
  var btns = nav.querySelectorAll('.slide-btn');
  var num = nav.querySelector('.slide-num');
  if(num) num.textContent = String(inboxPage).padStart(2,'0')+' / '+String(tp).padStart(2,'0');
  if(btns.length >= 2) {
    btns[0].onclick = function(){
      if(inboxPage > 1) { inboxPage--; renderInbox(); }
    };
    btns[1].onclick = function(){
      if(inboxPage < tp) { inboxPage++; renderInbox(); }
    };
  }
}

// ====== Todo & Activity ======

// Helper: apply custom sort order (from _order.json) to a file list
function _applyListOrder(files, order) {
  if(!order || order.length===0) return files.sort().reverse();
  var ordered = [];
  var fileSet = {};
  for(var fi=0;fi<files.length;fi++) fileSet[files[fi]] = true;
  for(var oi=0;oi<order.length;oi++) {
    if(fileSet[order[oi]]) { ordered.push(order[oi]); delete fileSet[order[oi]]; }
  }
  // Append remaining files not in the order list, sorted reverse
  var remaining = [];
  for(var name in fileSet) remaining.push(name);
  remaining.sort().reverse();
  for(var ri=0;ri<remaining.length;ri++) ordered.push(remaining[ri]);
  return ordered;
}

// Helper: reorder items on same-folder drop, save to _order.json
function _reorderOnDrop(e, folder, renderFn) {
  e.preventDefault();
  var srcPath = e.dataTransfer.getData('text/plain');
  if(!srcPath) return;
  var srcFolder = srcPath.substring(0, srcPath.lastIndexOf('/'));
  if(srcFolder !== folder) return; // not same folder → handled by container drop
  var targetItem = e.target.closest('[data-path]');
  if(!targetItem) return;
  var tgtPath = targetItem.getAttribute('data-path');
  if(srcPath === tgtPath) return;
  var srcName = srcPath.split('/').pop();
  var tgtName = tgtPath.split('/').pop();
  window.__IFTO_readListOrder(folder).then(function(order){
    var all = Array.from(targetItem.parentNode.querySelectorAll('[data-path]')).map(function(el){ return el.getAttribute('data-path').split('/').pop(); });
    if(order.length===0) order = all.slice().sort().reverse();
    // Remove src from order, insert before tgt
    var idx = order.indexOf(srcName);
    if(idx>=0) order.splice(idx,1);
    var tgtIdx = order.indexOf(tgtName);
    if(tgtIdx>=0) order.splice(tgtIdx, 0, srcName);
    else order.push(srcName);
    window.__IFTO_writeListOrder(folder, order).then(function(){ renderFn(); });
  });
}

async function renderTodo() {
  try {
    // Skip re-render if user is currently editing an inline rename input.
    // Otherwise grid.innerHTML would obliterate the input mid-edit, which
    // is the root cause of "double-click on freshly created card shows no cursor"
    // — vault.on('create') fires renderActivity right when the dblclick handler
    // is mounting its input, and the re-render wipes it before focus lands.
    if(window.__IFTO_renaming) return;
    // Clean up any orphaned rename inputs before re-render
    (function(){
      document.querySelectorAll('.todo-inline-edit').forEach(function(oi){
        var els = oi.parentNode ? Array.from(oi.parentNode.children) : [];
        for(var ei=0;ei<els.length;ei++) {
          if(els[ei] !== oi && els[ei].style && els[ei].style.display === 'none') els[ei].style.display = '';
        }
        oi.remove();
      });
    })();

    var list = document.getElementById('todoList');
    if(!list) return;
    var all = (typeof window.__IFTO_listFiles === 'function')
      ? await window.__IFTO_listFiles(TODO_FOLDER)
      : [];

    // Apply custom order if exists, filter out hidden dotfiles
    var order = (typeof window.__IFTO_readListOrder === 'function')
      ? await window.__IFTO_readListOrder(TODO_FOLDER) : [];
    all = _applyListOrder(all, order);
    all = all.filter(function(n){ return !n.startsWith('.'); });

    // Bug fix: badge count must be taken AFTER filtering out hidden files
    // (e.g. .ifto_order.json) so it matches what is actually displayed.
    var badge = document.getElementById('todoBadge');
    if(badge) badge.textContent = all.length;

    // Bug 1 fix: read the persisted checkbox state from each file so that
    // a full re-render (e.g. after dragging in a new todo from activity) does
    // not wipe out the user's previously checked items. File is the source of
    // truth; the DOM is just a reflection.
    var stateMap = {};
    if(typeof window.__IFTO_getFilesCheckboxState === 'function') {
      try {
        var states = await window.__IFTO_getFilesCheckboxState(TODO_FOLDER);
        for(var si=0; si<states.length; si++) {
          stateMap[states[si].name] = states[si].checked;
        }
      } catch(e) { console.error('IFTO: read todo checkbox states error', e); }
    }

    var html = '';
    for(var i=0;i<all.length;i++) {
      var nm = all[i].replace(/\.md$/i, '');
      var checkedCls = stateMap[all[i]] ? ' checked' : '';
      html += '<div class="todo-item" draggable="true" data-path="'+TODO_FOLDER+'/'+all[i]+'" data-folder="'+TODO_FOLDER+'">'+
        '<span class="cb'+checkedCls+'"></span>'+
        '<span class="todo-text">'+nm+'</span>'+
      '</div>';
    }
    list.innerHTML = html;

    // Wire checkbox toggle — persist the new state to the file so it survives
    // any future re-render (Bug 1 fix).
    list.querySelectorAll('.todo-item .cb').forEach(function(cb){
      cb.onclick = function(e){
        e.stopPropagation();
        var cbEl = this;
        var item = cbEl.closest('.todo-item');
        var filePath = item ? item.getAttribute('data-path') : null;
        var newChecked = !cbEl.classList.contains('checked');
        cbEl.classList.toggle('checked', newChecked);
        if(filePath && typeof window.__IFTO_setCheckboxState === 'function') {
          // Fire-and-forget: file write happens in background, UI is already
          // updated optimistically.
          window.__IFTO_setCheckboxState(filePath, newChecked).then(function(ok){
            if(!ok) {
              // Revert visual state if write failed.
              cbEl.classList.toggle('checked', !newChecked);
            }
          }).catch(function(){
            cbEl.classList.toggle('checked', !newChecked);
          });
        }
      };
    });

    // Wire drag & reorder drop on items
    list.querySelectorAll('.todo-item[draggable]').forEach(function(item){
      item.ondragstart = function(e){
        e.dataTransfer.setData('text/plain', this.getAttribute('data-path'));
        this.classList.add('dragging');
      };
      item.ondragend = function(){ this.classList.remove('dragging'); };
      item.onclick = function(){ /* just a tap, do nothing special */ };
      // Accept drops from same-folder items for reorder
      item.ondragover = function(e){ e.preventDefault(); };
      item.ondrop = function(e){
        e.stopPropagation();
        _reorderOnDrop(e, TODO_FOLDER, function(){ renderTodo(); renderActivity(); });
      };
    });

    // Wire double-click rename
    list.querySelectorAll('.todo-item .todo-text').forEach(function(txt){
      txt.ondblclick = function(e){
        e.preventDefault();
        e.stopPropagation();
        var item = this.closest('.todo-item');
        if(!item) return;
        var oldPath = item.getAttribute('data-path');
        var oldName = oldPath.split('/').pop();
        var input = document.createElement('input');
        input.className = 'todo-inline-edit';
        input.value = this.textContent;
        this.style.display = 'none';
        this.parentNode.insertBefore(input, this);
        protectInlineEditInput(input);
        focusInlineEditInput(input);
        input.onblur = function(){
          finishRename(oldPath, oldName, input, item.querySelector('.todo-text'));
        };
        input.onkeydown = function(e){
          e.stopPropagation();
          if(e.key === 'Enter') { input.blur(); }
          if(e.key === 'Escape') { input.value = oldName.replace(/\.md$/i,''); input.blur(); }
        };
      };
    });

    // Make todo list a drop target (for drag from activity)
    list.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over-target'); };
    list.ondragleave = function(){ this.classList.remove('drag-over-target'); };
    list.ondrop = function(e){
      e.preventDefault(); this.classList.remove('drag-over-target');
      var path = e.dataTransfer.getData('text/plain');
      // if same folder, reorder was already handled by item.ondrop
      if(path && !path.startsWith(TODO_FOLDER) && window.__IFTO_moveFile) {
        window.__IFTO_moveFile(path, TODO_FOLDER).then(function(success){ if(success) { renderTodo(); renderActivity(); } });
      }
    };
  } catch(e) { console.error('IFTO: renderTodo error', e); }
}

// Helper: finish inline rename (titleEl is the element that was hidden during edit)
function protectInlineEditInput(input) {
  // Mark a global "renaming in progress" flag so background re-renders
  // (triggered by vault.on create/rename/modify events) don't wipe the input.
  window.__IFTO_renaming = true;
  input.__iftoCreatedAt = Date.now();
  input.draggable = false;
  input.style.cursor = 'text';
  input.style.userSelect = 'text';
  input.style.webkitUserSelect = 'text';
  var draggableParent = null;
  function disableParentDrag() {
    draggableParent = input.closest('[draggable="true"]');
    if(draggableParent) draggableParent.draggable = false;
  }
  // Disable parent drag SYNCHRONOUSLY before focus runs. The previous
  // setTimeout(0) deferred this until after focusInlineEditInput, so the
  // parent .card-sm still had draggable="true" when input.focus() ran —
  // Chromium swallows focus on inputs inside live draggable ancestors,
  // which is why the cursor only appeared after alt-tabbing back.
  disableParentDrag();
  ['pointerdown','mousedown','mousemove','mouseup','click','dblclick'].forEach(function(evt){
    input.addEventListener(evt, function(e){ disableParentDrag(); e.stopPropagation(); });
  });
  input.addEventListener('focus', disableParentDrag);
  input.addEventListener('dragstart', function(e){ e.preventDefault(); e.stopPropagation(); });

  // ====== Grace-period blur bouncer ======
  // During the first ~700ms after the input is created, any blur event is
  // intercepted and bounced back to the input. This wins the focus race
  // against Obsidian's leaf-focus / vault-event-driven focus theft.
  //
  // Crucially this listener is registered BEFORE the dblclick handler sets
  // `input.onblur = ...` (which calls finishRename). Because it uses
  // capture-phase + stopImmediatePropagation, it prevents the user-supplied
  // onblur from running during the grace window — so the rename isn't
  // committed prematurely on a transient focus blip, and the {once:true}
  // teardown handler below also stays unfired.
  //
  // After the grace expires, blur events flow through normally and
  // finishRename / cleanup run as expected.
  function bounceBlur(ev) {
    var elapsed = Date.now() - (input.__iftoCreatedAt || 0);
    if(elapsed < 700 && document.body.contains(input)) {
      ev.stopImmediatePropagation();
      // Aggressively refocus across the same retry schedule used by
      // focusInlineEditInput, so even multiple yank attempts lose.
      setTimeout(function(){ try { input.focus({preventScroll:true}); } catch(_){} }, 0);
      setTimeout(function(){ try { input.focus({preventScroll:true}); } catch(_){} }, 30);
      setTimeout(function(){ try { input.focus({preventScroll:true}); } catch(_){} }, 100);
    }
  }
  input.addEventListener('blur', bounceBlur, true);

  // Real teardown blur handler — runs only after grace expires (because
  // bounceBlur swallows earlier blurs via stopImmediatePropagation).
  // Replaces the previous {once:true} handler that could clear
  // __IFTO_renaming on a transient focus blip and let a background
  // re-render wipe the still-active rename input.
  input.addEventListener('blur', function(){
    if(draggableParent) draggableParent.draggable = true;
    window.__IFTO_renaming = false;
  });
}

function focusInlineEditInput(input) {
  // First ask the Obsidian plugin host to make the IFTO-HOME leaf active.
  // This is the important part: it replaces the user's manual Alt-Tab workaround
  // by making Obsidian itself route keyboard focus back into this ItemView.
  try {
    if(window.__IFTO_forceInputFocus) window.__IFTO_forceInputFocus(input);
  } catch(e) {}

  // Force Electron BrowserWindow OS-level focus first.
  // Fixes the "new card double-click rename has no cursor until you alt-tab away
  // and back" bug. Root cause: vault.create event triggers re-render concurrent
  // with the dblclick, leaving Electron's window-focus state out of sync;
  // input.focus() then becomes a no-op until the OS sends a real focus event.
  try {
    var er = window.require && window.require('electron');
    if(er) {
      var win = (er.remote && er.remote.getCurrentWindow && er.remote.getCurrentWindow())
              || (er.getCurrentWindow && er.getCurrentWindow());
      if(win && typeof win.focus === 'function') win.focus();
    }
  } catch(e) {}

  var focusInput = function(){
    if(!input || !document.body.contains(input)) return;
    try {
      // Release any stuck focus elsewhere so the browser will accept ours
      if(document.activeElement && document.activeElement !== input
         && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    } catch(e) {}
    try { window.focus(); } catch(e) {}
    try {
      input.focus({preventScroll:true});
      var len = input.value.length;
      try { input.setSelectionRange(0, len); } catch(e2) { input.select(); }
    } catch(e3) {}
  };
  focusInput();
  if(typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(function(){ focusInput(); requestAnimationFrame(focusInput); });
  }
  setTimeout(focusInput, 30);
  setTimeout(focusInput, 100);
  setTimeout(focusInput, 250);
  setTimeout(focusInput, 500);
  // Extra retries near the tail of the 700ms grace period — the blur
  // bouncer in protectInlineEditInput keeps fighting until 700ms, so we
  // make sure focus is asserted one more time right before the grace
  // ends. Without this, a yank-and-no-bounce-back at ~600ms can leave the
  // input visible but cursor-less.
  setTimeout(focusInput, 650);
}

function finishRename(oldPath, oldName, input, titleEl) {
  var newName = input.value.trim();
  input.remove();
  if(titleEl) titleEl.style.display = '';
  if(!newName || newName === oldName.replace(/\.md$/i,'')) return;
  var newFullName = newName + '.md';
  if(window.__IFTO_renameFile) {
    window.__IFTO_renameFile(oldPath, newFullName).then(function(ok){
      if(ok) {
        // Update order file if exists: replace old name with new name
        var folder = oldPath.substring(0, oldPath.lastIndexOf('/'));
        var oldFile = oldPath.split('/').pop();
        if(window.__IFTO_readListOrder) {
          window.__IFTO_readListOrder(folder).then(function(order){
            if(order && order.length) {
              var idx = order.indexOf(oldFile);
              if(idx >= 0) {
                order[idx] = newFullName;
                window.__IFTO_writeListOrder(folder, order);
              }
            }
          });
        }
        renderTodo(); renderActivity();
      }
    });
  }
}


// Helper: create a new todo file with checkbox
async function createTodoFile() {
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  if(window.__IFTO_createFile) {
    var ok = await window.__IFTO_createFile(TODO_FOLDER, fn, '- [ ] \n');
    if(ok) renderTodo();
  }
}

async function renderActivity() {
  try {
    // Skip re-render if user is currently editing — otherwise grid.innerHTML
    // would obliterate the inline rename input under the cursor.
    if(window.__IFTO_renaming) return;
    var grid = document.getElementById('activityGrid');
    if(!grid) return;
    var all = (typeof window.__IFTO_listFiles === 'function')
      ? await window.__IFTO_listFiles(ACTIVITY_FOLDER)
      : [];

    // Apply custom order if exists, filter out hidden dotfiles
    var order = (typeof window.__IFTO_readListOrder === 'function')
      ? await window.__IFTO_readListOrder(ACTIVITY_FOLDER) : [];
    all = _applyListOrder(all, order);
    all = all.filter(function(n){ return !n.startsWith('.'); });

    // Bug fix: badge count must be taken AFTER filtering out hidden files
    // (e.g. .ifto_order.json) so it matches what is actually displayed.
    var badge = document.getElementById('activityBadge');
    if(badge) badge.textContent = all.length;

    // Bug 1 fix: read persisted checkbox state from files (mirror of renderTodo).
    var stateMap = {};
    if(typeof window.__IFTO_getFilesCheckboxState === 'function') {
      try {
        var states = await window.__IFTO_getFilesCheckboxState(ACTIVITY_FOLDER);
        for(var si=0; si<states.length; si++) {
          stateMap[states[si].name] = states[si].checked;
        }
      } catch(e) { console.error('IFTO: read activity checkbox states error', e); }
    }

    var html = '';
    // Add button always first (top-left)
    html += '<div class="card-sm add-card" id="activityAddBtn"><span class="ci">+</span><span class="cl">新建活动事件</span></div>';
    for(var i=0;i<all.length;i++) {
      var nm = all[i].replace(/\.md$/i, '');
      var checkedCls = stateMap[all[i]] ? ' checked' : '';
      html += '<div class="card-sm" draggable="true" data-path="'+ACTIVITY_FOLDER+'/'+all[i]+'" data-folder="'+ACTIVITY_FOLDER+'">'+
        '<div style="display:flex;align-items:flex-start;gap:6px"><span class="cb'+checkedCls+'"></span><span class="card-sm-title">'+nm+'</span></div>'+
      '</div>';
    }
    grid.innerHTML = html;

    // Wire checkbox toggle — persist to file (Bug 1 fix).
    grid.querySelectorAll('.card-sm .cb').forEach(function(cb){
      cb.onclick = function(e){
        e.stopPropagation();
        var cbEl = this;
        var card = cbEl.closest('.card-sm');
        var filePath = card ? card.getAttribute('data-path') : null;
        var newChecked = !cbEl.classList.contains('checked');
        cbEl.classList.toggle('checked', newChecked);
        if(filePath && typeof window.__IFTO_setCheckboxState === 'function') {
          window.__IFTO_setCheckboxState(filePath, newChecked).then(function(ok){
            if(!ok) cbEl.classList.toggle('checked', !newChecked);
          }).catch(function(){
            cbEl.classList.toggle('checked', !newChecked);
          });
        }
      };
    });

    // Wire drag & reorder drop on cards
    grid.querySelectorAll('.card-sm[draggable]').forEach(function(item){
      item.ondragstart = function(e){
        e.dataTransfer.setData('text/plain', this.getAttribute('data-path'));
        this.classList.add('dragging');
      };
      item.ondragend = function(){ this.classList.remove('dragging'); };
      // Accept drops from same-folder items for reorder
      item.ondragover = function(e){ e.preventDefault(); };
      item.ondrop = function(e){
        e.stopPropagation();
        _reorderOnDrop(e, ACTIVITY_FOLDER, function(){ renderActivity(); renderTodo(); });
      };
    });

    // Wire double-click rename
    grid.querySelectorAll('.card-sm .card-sm-title').forEach(function(txt){
      txt.ondblclick = function(e){
        e.preventDefault();
        e.stopPropagation();
        var item = this.closest('.card-sm');
        if(!item) return;
        var oldPath = item.getAttribute('data-path');
        var oldName = oldPath.split('/').pop();
        var input = document.createElement('input');
        input.className = 'todo-inline-edit';
        input.value = this.textContent;
        this.style.display = 'none';
        this.parentNode.insertBefore(input, this);
        protectInlineEditInput(input);
        focusInlineEditInput(input);
        input.onblur = function(){
          finishRename(oldPath, oldName, input, item.querySelector('.card-sm-title'));
        };
        input.onkeydown = function(e){
          e.stopPropagation();
          if(e.key === 'Enter') { input.blur(); }
          if(e.key === 'Escape') { input.value = oldName.replace(/\.md$/i,''); input.blur(); }
        };
      };
    });

    // Wire add button
    var addBtn = document.getElementById('activityAddBtn');
    if(addBtn) {
      addBtn.onclick = async function(){
        await createActivityFile();
      };
    }

    // Make activity grid a drop target (for drag from todo)
    grid.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over-target'); };
    grid.ondragleave = function(){ this.classList.remove('drag-over-target'); };
    grid.ondrop = function(e){
      e.preventDefault(); this.classList.remove('drag-over-target');
      var path = e.dataTransfer.getData('text/plain');
      if(path && !path.startsWith(ACTIVITY_FOLDER) && window.__IFTO_moveFile) {
        window.__IFTO_moveFile(path, ACTIVITY_FOLDER).then(function(success){ if(success) { renderTodo(); renderActivity(); } });
      }
    };
  } catch(e) { console.error('IFTO: renderActivity error', e); }
}

// Prepend a new activity card to the grid (avoids full re-render race conditions)
function prependActivityCard(title, filename) {
  var grid = document.getElementById('activityGrid');
  if(!grid) return;
  var card = document.createElement('div');
  card.className = 'card-sm';
  card.draggable = true;
  card.setAttribute('data-path', ACTIVITY_FOLDER+'/'+filename);
  card.setAttribute('data-folder', ACTIVITY_FOLDER);
  card.innerHTML = '<div style="display:flex;align-items:flex-start;gap:6px"><span class="cb"></span><span class="card-sm-title">'+title+'</span></div>';
  // New files are created with `- [ ] ` content, so visually unchecked is correct.
  // On click, persist to file (Bug 1 fix) — same as renderActivity's handler.
  card.querySelector('.cb').onclick = function(e){
    e.stopPropagation();
    var cbEl = this;
    var fp = card.getAttribute('data-path');
    var newChecked = !cbEl.classList.contains('checked');
    cbEl.classList.toggle('checked', newChecked);
    if(fp && typeof window.__IFTO_setCheckboxState === 'function') {
      window.__IFTO_setCheckboxState(fp, newChecked).then(function(ok){
        if(!ok) cbEl.classList.toggle('checked', !newChecked);
      }).catch(function(){
        cbEl.classList.toggle('checked', !newChecked);
      });
    }
  };
  card.ondragstart = function(e){ e.dataTransfer.setData('text/plain', this.getAttribute('data-path')); this.classList.add('dragging'); };
  card.ondragend = function(){ this.classList.remove('dragging'); };
  card.ondragover = function(e){ e.preventDefault(); };
  card.ondrop = function(e){
    e.stopPropagation();
    _reorderOnDrop(e, ACTIVITY_FOLDER, function(){ renderActivity(); renderTodo(); });
  };
  card.querySelector('.card-sm-title').ondblclick = function(e){
    e.preventDefault();
    e.stopPropagation();
    var item = this.closest('.card-sm');
    if(!item) return;
    var oldPath = item.getAttribute('data-path');
    var oldName = oldPath.split('/').pop();
    var input = document.createElement('input');
    input.className = 'todo-inline-edit';
    input.value = this.textContent;
    this.style.display = 'none';
    this.parentNode.insertBefore(input, this);
    protectInlineEditInput(input);
    focusInlineEditInput(input);
    input.onblur = function(){ finishRename(oldPath, oldName, input, item.querySelector('.card-sm-title')); };
    input.onkeydown = function(e){
      e.stopPropagation();
      if(e.key === 'Enter') input.blur();
      if(e.key === 'Escape') { input.value = oldName.replace(/\.md$/i,''); input.blur(); }
    };
  };
  var addBtn = grid.querySelector('.add-card');
  if(addBtn) addBtn.after(card);
  else grid.insertBefore(card, grid.firstChild);
  var badge = document.getElementById('activityBadge');
  if(badge) badge.textContent = grid.querySelectorAll('.card-sm:not(.add-card)').length;
}

async function createActivityFile() {
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  if(window.__IFTO_createFile) {
    var ok = await window.__IFTO_createFile(ACTIVITY_FOLDER, fn, '- [ ] \n');
    if(ok) {
      prependActivityCard(ts, fn);
      // Prepend to order file so re-render keeps it at the top
      if(window.__IFTO_readListOrder) {
        try {
          var order = await window.__IFTO_readListOrder(ACTIVITY_FOLDER);
          if(order && order.length > 0) {
            order.unshift(fn);
            if(window.__IFTO_writeListOrder) window.__IFTO_writeListOrder(ACTIVITY_FOLDER, order);
          }
        } catch(e) {}
      }
    }
  }
}

// Initialize todo & activity
try { renderTodo(); } catch(e){console.error('IFTO: init todo error',e)}
try { renderActivity(); } catch(e){console.error('IFTO: init activity error',e)}

// ====== Project ======
// Reads all .md files recursively under projectBase, categorizes by frontmatter["status"]
// Drag & drop updates the frontmatter field instead of moving files

function getProjectColTitle(folderName) {
  return folderName.replace(/^\d+-/, '');
}

function matchProjectStatus(status, colKey) {
  var title = getProjectColTitle(colKey);
  return status === colKey || status === title;
}

// ====== Folder Card Expand/Collapse ======
function toggleProjectFolder(headerEl) {
  var card = headerEl.closest('.project-folder-card');
  if(!card) return;
  var body = card.querySelector('.project-folder-body');
  var toggle = headerEl.querySelector('.folder-toggle');
  if(!body) return;
  body.classList.toggle('open');
  if(toggle) toggle.textContent = body.classList.contains('open') ? '▼' : '▶';
}

// ====== Create New Project Folder ======
async function createProjectFolder() {
  var pBase = getProjectBase();
  var items = (typeof window.__IFTO_listFolderContents === 'function')
    ? await window.__IFTO_listFolderContents(pBase) : [];
  var folders = items.filter(function(i){ return i.isFolder; });
  var maxN = 0;
  for(var i=0;i<folders.length;i++) {
    var m = folders[i].name.match(/^未命名项目(\d+)/);
    if(m) { var n = parseInt(m[1],10); if(n>maxN) maxN=n; }
  }
  var name = '未命名项目' + (maxN+1);
  var fullPath = pBase + '/' + name;
  if(window.__IFTO_createFolder) {
    var ok = await window.__IFTO_createFolder(fullPath);
    if(ok) { showToast('已创建项目: '+name); renderProject(); }
    else { showToast('创建失败或已存在'); }
  }
}

// ====== Create New Task in Project Root ======
async function createProjectTask() {
  var pBase = getProjectBase();
  var s = window.__IFTO_SETTINGS || {};
  var tpl = s.shortcutTaskTemplate || '';
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  var content = '';
  if(tpl && window.__IFTO_readFile) {
    content = (await window.__IFTO_readFile(tpl)) || '';
  }
  if(content && window.__IFTO_processTemplate){
    content = await window.__IFTO_processTemplate(content, ts);
  }
  // Ensure frontmatter has status: 未开始
  var fmMatch = content.match(/^---\n[\s\S]*?\n---/);
  if(fmMatch) {
    if(!fmMatch[0].match(/^status:/m)) {
      content = content.replace(/^---\n/, '---\nstatus: 未开始\n');
    }
  } else {
    content = '---\nstatus: 未开始\n---\n' + (content || '# \n\n## 任务描述\n\n## 完成标准\n\n');
  }
  if(window.__IFTO_createFile) {
    var ok = await window.__IFTO_createFile(pBase, fn, content);
    if(ok) {
      renderProject();
      if(window.__IFTO_openFile) await window.__IFTO_openFile(pBase+'/'+fn);
    }
  }
}

// ====== Create Activity from PROJECT Section ======
async function createProjectActivity() {
  var now=new Date();
  var ts=now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn=ts+'.md';
  if(window.__IFTO_createFile){
    var ok=await window.__IFTO_createFile(ACTIVITY_FOLDER, fn, '- [ ] \n');
    if(ok){
      prependActivityCard(ts, fn);
      if(window.__IFTO_openFile) window.__IFTO_openFile(ACTIVITY_FOLDER+'/'+fn);
    }
  }
}

// Helper: get frontmatter status for project files
function _projectFileStatus(fm, pCols) {
  var status = (fm && fm['status']) || '';
  for(var ci=0;ci<pCols.length;ci++) {
    if(matchProjectStatus(status, pCols[ci])) return pCols[ci];
  }
  return pCols[0] || '';
}

// Parse a due date string and return {cls, text} for badge rendering
function formatDueDate(dueStr) {
  if(!dueStr) return null;
  var s = dueStr.replace(/[年月]/g,'-').replace(/[日号]/g,'').replace(/[\/\.]/g,'-').replace(/\s+/g,'').trim();
  // Handle compact YYYYMMDD
  if(/^\d{8}$/.test(s)) s = s.substring(0,4)+'-'+s.substring(4,6)+'-'+s.substring(6,8);
  var dt = new Date(s);
  if(isNaN(dt.getTime())) {
    // Try other parsers
    var parts = s.split('-');
    if(parts.length === 3) dt = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]));
  }
  if(isNaN(dt.getTime())) return {cls:'', text:dueStr};

  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var target = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  var diff = Math.floor((target.getTime() - today.getTime()) / 86400000);

  var cls, label;
  if(diff < 0) { cls = 'overdue'; label = '已过期' + Math.abs(diff) + '天'; }
  else if(diff === 0) { cls = 'today'; label = '今天到期'; }
  else if(diff <= 3) { cls = 'upcoming'; label = '还有' + diff + '天'; }
  else { cls = 'future'; label = dueStr; }

  return {cls: 'pc-date-badge '+cls, text: label};
}

// Render the body of the middle column when in 草稿箱 (draft) view.
// Reads the draft folder (default 100-工作台WORKDESK/110-草稿箱), lists its
// subfolders + files, and renders them in the same kanban-card style as the
// normal project columns.
async function _renderDraftColumnBody() {
  var dBase = getDraftFolder();
  if(typeof window.__IFTO_listFolderContents !== 'function') {
    return '<div class="project-empty">草稿箱不可用</div>';
  }
  var contents = await window.__IFTO_listFolderContents(dBase);
  var subFolders = contents.filter(function(i){ return i.isFolder; }).map(function(i){ return i.name; });
  subFolders.sort();

  // Recursively gather all files under the draft folder
  var allFiles = (typeof window.__IFTO_getFilesFrontmatterRecursive === 'function')
    ? await window.__IFTO_getFilesFrontmatterRecursive(dBase) : [];

  // Group files: top-level files go to root, files inside subfolders are
  // grouped by their top-level folder (matches project-column logic).
  var folderMap = {};
  var rootFiles = [];
  for(var fi=0;fi<allFiles.length;fi++) {
    var f = allFiles[fi];
    var slashIdx = f.name.indexOf('/');
    if(slashIdx === -1) {
      rootFiles.push(f);
    } else {
      var folName = f.name.substring(0, slashIdx);
      var relPath = f.name.substring(slashIdx + 1);
      if(!folderMap[folName]) folderMap[folName] = [];
      folderMap[folName].push({ name: f.name, relPath: relPath, fm: f.fm });
    }
  }

  var html = '';

  // Root-level draft files
  for(var ri=0;ri<rootFiles.length;ri++) {
    var rf = rootFiles[ri];
    var rnm = rf.name.replace(/\.md$/i,'');
    var dueInfo = formatDueDate(rf.fm && (rf.fm['due'] || rf.fm['截止'] || rf.fm['截止时间'] || rf.fm['end_time'] || rf.fm['endTime'] || ''));
    html += '<div class="project-card" draggable="true" data-path="'+dBase+'/'+rf.name+'">'+
      '<span class="pc-title">'+rnm+'</span>'+
      (dueInfo ? '<span class="'+dueInfo.cls+'">'+dueInfo.text+'</span>' : '')+
    '</div>';
  }

  // Subfolders as project-folder-cards
  var hasAnyFolderContent = false;
  for(var folIdx=0;folIdx<subFolders.length;folIdx++) {
    var folName = subFolders[folIdx];
    var folFiles = folderMap[folName] || [];
    if(folFiles.length === 0) continue;
    hasAnyFolderContent = true;

    html += '<div class="project-folder-card" data-folder="'+dBase+'/'+folName+'">';
    html += '<div class="project-folder-header" draggable="true" data-path="'+dBase+'/'+folName+'" onclick="toggleProjectFolder(this)">';
    html += '<span class="folder-toggle">▶</span>';
    html += '<span class="project-folder-name">'+folName+'</span>';
    html += '<span class="project-folder-count">'+folFiles.length+'个任务</span>';
    html += '</div>';
    html += '<div class="project-folder-body">';

    // Group files within folder by their immediate subdir
    var subGroups = {};
    for(var sfi=0;sfi<folFiles.length;sfi++) {
      var sf = folFiles[sfi];
      var subPath = sf.relPath;
      var subDir = '';
      var fileName;
      var subSlash = subPath.lastIndexOf('/');
      if(subSlash >= 0) {
        subDir = subPath.substring(0, subSlash);
        fileName = subPath.substring(subSlash + 1);
      } else {
        fileName = subPath;
      }
      if(!subGroups[subDir]) subGroups[subDir] = [];
      subGroups[subDir].push({
        name: fileName,
        fullPath: dBase+'/'+sf.name,
        fm: sf.fm
      });
    }

    var subdirNames = Object.keys(subGroups).sort();
    for(var sdi=0;sdi<subdirNames.length;sdi++) {
      var sd = subdirNames[sdi];
      var sFiles = subGroups[sd];
      if(sd) {
        html += '<div class="project-subfolder">'+sd+'/</div>';
      }
      for(var fi2=0;fi2<sFiles.length;fi2++) {
        var fileItem = sFiles[fi2];
        var fileNm = fileItem.name.replace(/\.md$/i,'');
        var fileDueInfo = formatDueDate(fileItem.fm && (fileItem.fm['due'] || fileItem.fm['截止'] || fileItem.fm['截止时间'] || fileItem.fm['end_time'] || fileItem.fm['endTime'] || ''));
        html += '<div class="project-file-item" draggable="true" data-path="'+fileItem.fullPath+'" data-folder="'+dBase+'/'+folName+'">'+
          '<span class="pc-title">📄 '+fileNm+'</span>'+
          (fileDueInfo ? '<span class="'+fileDueInfo.cls+'">'+fileDueInfo.text+'</span>' : '')+
        '</div>';
      }
    }

    html += '</div>'; // project-folder-body
    html += '</div>'; // project-folder-card
  }

  if(rootFiles.length === 0 && !hasAnyFolderContent) {
    html += '<div class="project-empty">草稿箱为空</div>';
  }

  return html;
}

// Check whether a file's frontmatter marks it as 推进中 (status=推进中, with
// optional number prefix like "122-推进中").
function _isProgressFileFm(fm) {
  var status = (fm && fm['status']) || '';
  if(!status) return false;
  return status === '推进中' || /^\d+-推进中$/.test(status);
}

// Copy a single .md file to a target folder. If a file with the same name
// exists, append a timestamp suffix to avoid overwriting. Returns the final
// name written, or null on failure.
async function _copySingleFileToDraft(srcPath, dstFolder) {
  if(!window.__IFTO_readFile || !window.__IFTO_createFile) return null;
  var fileName = srcPath.split('/').pop();
  var content = await window.__IFTO_readFile(srcPath);
  if(content === null || content === undefined) return null;
  // If a file with the same name exists, add a timestamp suffix
  var finalName = fileName;
  if(window.__IFTO_listFolderContents) {
    try {
      var existing = await window.__IFTO_listFolderContents(dstFolder);
      var taken = {};
      for(var ei=0;ei<existing.length;ei++) taken[existing[ei].name] = true;
      if(taken[fileName]) {
        var stem = fileName.replace(/\.md$/i, '');
        var n = new Date();
        var ts = '_'+n.getFullYear()+
          String(n.getMonth()+1).padStart(2,'0')+
          String(n.getDate()).padStart(2,'0')+'_'+
          String(n.getHours()).padStart(2,'0')+
          String(n.getMinutes()).padStart(2,'0')+
          String(n.getSeconds()).padStart(2,'0');
        finalName = stem + ts + '.md';
      }
    } catch(_) {}
  }
  var ok = await window.__IFTO_createFile(dstFolder, finalName, content);
  return ok ? finalName : null;
}

// Handle a drop on the 草稿箱 toggle. Path may be a single .md file or a
// folder. Files are COPIED (never moved) so the user can edit the drafts
// without touching the originals.
async function _handleDraftDrop(rawPath) {
  if(!rawPath) { showToast('无法识别拖拽内容'); return; }
  var path = rawPath;
  // Normalize
  try { path = decodeURIComponent(path); } catch(_) {}
  path = path.replace(/\\/g, '/');
  if(path.indexOf('obsidian://') !== -1) {
    var fm = path.match(/[?&]file=([^&]+)/);
    if(fm) path = decodeURIComponent(fm[1]);
  }
  if(path.startsWith('file:///')) path = path.substring(8);
  else if(path.startsWith('file://')) path = path.substring(7);
  while(path.startsWith('/')) path = path.substring(1);
  // Bare name — try to find in vault
  if(path.indexOf('/') === -1 && path.length > 0) {
    if(window.__IFTO_findItemByName) {
      var found = await window.__IFTO_findItemByName(path);
      if(found && found.path) {
        path = found.path;
      } else {
        showToast('未找到「' + path + '」在库中的位置');
        return;
      }
    } else {
      showToast('无法识别路径');
      return;
    }
  }
  if(!window.__IFTO_createFile) {
    showToast('草稿箱不可用');
    return;
  }

  var dBase = getDraftFolder();
  var isFolder = !path.endsWith('.md');
  var pBase = getProjectBase();

  if(isFolder) {
    // ---- FOLDER DROP ----
    // Copy 推进中 files (preserving subdirectory structure) into a same-named
    // folder under the draft box.
    var folderName = path.split('/').pop();
    var targetFolder = dBase + '/' + folderName;
    if(window.__IFTO_createFolder) {
      await window.__IFTO_createFolder(targetFolder);
    }
    if(!window.__IFTO_getFilesFrontmatterRecursive) {
      showToast('草稿箱不支持递归复制');
      return;
    }
    var allFiles = await window.__IFTO_getFilesFrontmatterRecursive(path);
    var copied = 0;
    var skipped = 0;
    for(var fi=0;fi<allFiles.length;fi++) {
      var f = allFiles[fi];
      if(!_isProgressFileFm(f.fm)) { skipped++; continue; }
      var relPath = f.name; // e.g. "subdir/file.md"
      var srcFull = path + '/' + relPath;
      var dstFull = targetFolder + '/' + relPath;
      var dstDir = dstFull.substring(0, dstFull.lastIndexOf('/'));
      // Ensure intermediate folders exist
      if(window.__IFTO_createFolder && dstDir !== targetFolder) {
        var built = targetFolder;
        var subParts = relPath.split('/');
        for(var spi=0; spi<subParts.length-1; spi++) {
          built += '/' + subParts[spi];
          await window.__IFTO_createFolder(built);
        }
      }
      var written = await _copySingleFileToDraft(srcFull, dstDir);
      if(written) copied++;
    }
    showToast('已复制 ' + copied + ' 个推进中文件到草稿箱/' + folderName +
              (skipped ? '（跳过 ' + skipped + ' 个非推进中文件）' : ''));
  } else {
    // ---- SINGLE FILE DROP ----
    // Find the project folder the file belongs to (first subfolder under
    // projectBase). Create a same-named project folder in the draft box and
    // place the copy inside. Files at the project base root, or outside
    // projectBase, go straight into the draft box.
    var projectLeaf = null;
    if(path.indexOf(pBase + '/') === 0) {
      var afterBase = path.substring(pBase.length + 1);
      var firstSlash = afterBase.indexOf('/');
      if(firstSlash > 0) projectLeaf = afterBase.substring(0, firstSlash);
    } else {
      // Outside project base — use the immediate parent folder name
      var parentPath2 = path.substring(0, path.lastIndexOf('/'));
      projectLeaf = parentPath2.split('/').pop();
    }
    var targetFolder = projectLeaf ? dBase + '/' + projectLeaf : dBase;
    if(projectLeaf && window.__IFTO_createFolder) {
      await window.__IFTO_createFolder(targetFolder);
    }
    var written = await _copySingleFileToDraft(path, targetFolder);
    if(written) {
      var displayFolder = projectLeaf ? '草稿箱/' + projectLeaf : '草稿箱';
      showToast('已复制到 ' + displayFolder + '/' + written);
    } else {
      showToast('复制失败');
    }
  }

  // Switch to draft view so the user can see the result
  projectMiddleView = 'draft';
  if(typeof path === 'string' && path) {
    console.log('[IFTO] 拖拽到草稿箱: src="' + path + '" 目标=' + dBase);
  }
  renderProject();
}

async function renderProject() {
  // Concurrency guard: if a render is already in flight, queue another
  if (window.__ifto_renderProjectBusy) {
    window.__ifto_renderProjectQueued = true;
    return;
  }
  window.__ifto_renderProjectBusy = true;
  window.__ifto_renderProjectQueued = false;
  try {
    // Clean up any orphaned rename inputs before re-render
    (function(){
      document.querySelectorAll('.todo-inline-edit').forEach(function(oi){
        var els = oi.parentNode ? Array.from(oi.parentNode.children) : [];
        for(var ei=0;ei<els.length;ei++) {
          if(els[ei] !== oi && els[ei].style && els[ei].style.display === 'none') els[ei].style.display = '';
        }
        oi.remove();
      });
    })();

    var cols = document.getElementById('projectCols');
    if(!cols) return;

    // Save folder expand/collapse states before re-render (per column)
    (function(){
      var states = [];
      cols.querySelectorAll('.project-folder-card[data-folder]').forEach(function(card){
        var body = card.querySelector('.project-folder-body');
        if(body && body.classList.contains('open')){
          var colEl = card.closest('.project-col');
          var colIdx = colEl ? colEl.getAttribute('data-col') : '';
          states.push(card.getAttribute('data-folder') + '||' + colIdx);
        }
      });
      window.__ifto_folderState = states;
    })();
    var pBase = getProjectBase();
    var pCols = getProjectCols();

    // Get all project folders (subdirectories of projectBase, excluding status columns)
    var contents = (typeof window.__IFTO_listFolderContents === 'function')
      ? await window.__IFTO_listFolderContents(pBase) : [];
    var statusFolderMap = {};
    for(var sci=0;sci<pCols.length;sci++) statusFolderMap[pCols[sci]] = true;
    var projectFolders = contents.filter(function(i){
      return i.isFolder && !statusFolderMap[i.name];
    }).map(function(i){ return i.name; });
    projectFolders.sort();

    // Get all files recursively from projectBase with frontmatter
    var allFiles = (typeof window.__IFTO_getFilesFrontmatterRecursive === 'function')
      ? await window.__IFTO_getFilesFrontmatterRecursive(pBase) : [];

    // Group files by top-level folder vs root
    var folderMap = {};
    var rootFiles = [];
    for(var fi=0;fi<allFiles.length;fi++) {
      var f = allFiles[fi];
      var slashIdx = f.name.indexOf('/');
      if(slashIdx === -1) {
        rootFiles.push(f);
      } else {
        var folName = f.name.substring(0, slashIdx);
        var relPath = f.name.substring(slashIdx + 1);
        if(!folderMap[folName]) folderMap[folName] = [];
        folderMap[folName].push({ name: f.name, relPath: relPath, fm: f.fm });
      }
    }

    // Group root files by status
    var rootByStatus = {};
    for(var ci=0;ci<pCols.length;ci++) rootByStatus[pCols[ci]] = [];
    for(var ri=0;ri<rootFiles.length;ri++) {
      var s = _projectFileStatus(rootFiles[ri].fm, pCols);
      if(rootByStatus[s]) rootByStatus[s].push(rootFiles[ri]);
      else if(pCols.length>0) rootByStatus[pCols[0]].push(rootFiles[ri]);
    }

    // Build column HTML
    var html = '';
    for(var ci=0;ci<pCols.length;ci++) {
      var colKey = pCols[ci];
      var colTitle = getProjectColTitle(colKey);
      var isMiddleCol = (colTitle === '推进中');

      html += '<div class="project-col" data-col="'+ci+'" data-status="'+colTitle+'">';

      // Middle column gets a view toggle: 推进中 <-> 草稿箱
      if(isMiddleCol) {
        html += '<div class="project-col-title project-col-title-toggle">'+
          '<span class="'+(projectMiddleView === 'draft' ? 'project-view-toggle' : 'project-view-active')+'" onclick="switchProjectMiddleView(\'progress\')">推进中</span>'+
          '<span class="project-view-sep">|</span>'+
          '<span class="'+(projectMiddleView === 'draft' ? 'project-view-active' : 'project-view-toggle project-view-drop')+'" data-draft-drop="1" title="拖入文件/文件夹可复制到草稿箱" onclick="switchProjectMiddleView(\'draft\')">草稿箱</span>'+
        '</div>';
      } else {
        html += '<div class="project-col-title">'+colTitle+'</div>';
      }

      // Draft view replaces the normal column body for the middle column
      if(isMiddleCol && projectMiddleView === 'draft') {
        html += await _renderDraftColumnBody();
        html += '</div>'; // project-col
        continue;
      }

      // Root-level cards (files directly in projectBase, not in subfolders)
      var rootCol = rootByStatus[colKey] || [];
      for(var ri2=0;ri2<rootCol.length;ri2++) {
        var rf = rootCol[ri2];
        var rnm = rf.name.replace(/\.md$/i,'');
        var rfStatus = _projectFileStatus(rf.fm, pCols);
        var rfCompleted = pCols.length > 0 && rfStatus === pCols[pCols.length - 1];
        var dueInfo = rfCompleted ? null : formatDueDate(rf.fm && (rf.fm['due'] || rf.fm['截止'] || rf.fm['截止时间'] || rf.fm['end_time'] || rf.fm['endTime'] || ''));
        html += '<div class="project-card" draggable="true" data-path="'+pBase+'/'+rf.name+'" data-status="'+colTitle+'">'+
          '<span class="pc-title">'+rnm+'</span>'+
          (dueInfo ? '<span class="'+dueInfo.cls+'">'+dueInfo.text+'</span>' : '')+
        '</div>';
      }

      // Project folder cards — show for each project folder, filtered by status
      var hasAnyFolderContent = false;
      for(var folIdx=0;folIdx<projectFolders.length;folIdx++) {
        var folName = projectFolders[folIdx];
        var folFiles = folderMap[folName] || [];

        // Filter files in this folder by current column's status
        var statusFiles = folFiles.filter(function(f){
          return _projectFileStatus(f.fm, pCols) === colKey;
        });

        // Always show folder in first column (even if empty), otherwise show only with content
        if(statusFiles.length === 0 && (colKey !== pCols[0] || folFiles.length > 0)) continue;
        hasAnyFolderContent = true;

        var folTitle = getProjectColTitle(folName);
        html += '<div class="project-folder-card" data-folder="'+pBase+'/'+folName+'">';
        html += '<div class="project-folder-header" draggable="true" data-path="'+pBase+'/'+folName+'" onclick="toggleProjectFolder(this)">';
        html += '<span class="folder-toggle">▶</span>';
        html += '<span class="project-folder-name">'+folTitle+'</span>';
        html += '<span class="project-folder-count">'+statusFiles.length+'个任务</span>';
        html += '</div>';
        html += '<div class="project-folder-body">';

        if(statusFiles.length > 0) {
          // Group files within folder by subdirectory
          var subGroups = {};
          for(var sfi=0;sfi<statusFiles.length;sfi++) {
            var sf = statusFiles[sfi];
            var subPath = sf.relPath;
            var subDir = '';
            var fileName;
            var subSlash = subPath.lastIndexOf('/');
            if(subSlash >= 0) {
              subDir = subPath.substring(0, subSlash);
              fileName = subPath.substring(subSlash + 1);
            } else {
              fileName = subPath;
            }
            if(!subGroups[subDir]) subGroups[subDir] = [];
            subGroups[subDir].push({
              name: fileName,
              fullPath: pBase+'/'+sf.name,
              fm: sf.fm
            });
          }

          var subdirNames = Object.keys(subGroups).sort();
          for(var sdi=0;sdi<subdirNames.length;sdi++) {
            var sd = subdirNames[sdi];
            var sFiles = subGroups[sd];
            if(sd) {
              html += '<div class="project-subfolder">'+sd+'/</div>';
            }
            for(var fi2=0;fi2<sFiles.length;fi2++) {
              var fileItem = sFiles[fi2];
              var fileNm = fileItem.name.replace(/\.md$/i,'');
              var fiStatus = _projectFileStatus(fileItem.fm, pCols);
              var fiCompleted = pCols.length > 0 && fiStatus === pCols[pCols.length - 1];
              var fileDueInfo = fiCompleted ? null : formatDueDate(fileItem.fm && (fileItem.fm['due'] || fileItem.fm['截止'] || fileItem.fm['截止时间'] || fileItem.fm['end_time'] || fileItem.fm['endTime'] || ''));
              html += '<div class="project-file-item" draggable="true" data-path="'+fileItem.fullPath+'" data-folder="'+pBase+'/'+folName+'">'+
                '<span class="pc-title">📄 '+fileNm+'</span>'+
                (fileDueInfo ? '<span class="'+fileDueInfo.cls+'">'+fileDueInfo.text+'</span>' : '')+
              '</div>';
            }
          }
        } else {
          html += '<div style="font-size:11px;color:var(--g4);padding:8px 8px 4px 16px">空文件夹</div>';
        }

        html += '</div>'; // project-folder-body
        html += '</div>'; // project-folder-card
      }

      if(rootCol.length === 0 && !hasAnyFolderContent) {
        html += '<div class="project-empty">暂无文件</div>';
      }

      html += '</div>'; // project-col
    }

    // Archive drop zone on the right
    html += '<div class="project-archive-zone" id="projectArchiveZone">';
    html += '<div class="project-archive-drop" data-archive="1"><div class="project-archive-title">归档</div>拖拽至此<br>归档项目</div>';
    html += '</div>';

    cols.innerHTML = html;
    // Restore folder expand/collapse states after re-render (per column)
    (function(){
      var saved = window.__ifto_folderState;
      if(!saved) return;
      saved.forEach(function(entry){
        var parts = entry.split('||');
        var folderPath = parts[0];
        var colIdx = parts[1] || '';
        var container = colIdx ? cols.querySelector('.project-col[data-col="' + colIdx + '"]') : cols;
        if(!container) container = cols;
        var card = container.querySelector('.project-folder-card[data-folder="' + folderPath + '"]');
        if(card){
          var body = card.querySelector('.project-folder-body');
          var toggle = card.querySelector('.folder-toggle');
          if(body){ body.classList.add('open'); if(toggle) toggle.textContent = '\u25bc'; }
        }
      });
    })();
    wireProjectColumns(cols);
  } catch(e) { console.error('IFTO: renderProject error', e); }
  window.__ifto_renderProjectBusy = false;
  if (window.__ifto_renderProjectQueued) {
    window.__ifto_renderProjectQueued = false;
    renderProject();
  }
}

function wireProjectColumns(container) {
  // Wire 草稿箱 toggle as a drop target: dragging a file/folder onto the
  // "草稿箱" label copies it (and its 推进中 contents if a folder) into the
  // draft box, then switches the view to show the result.
  container.querySelectorAll('.project-view-toggle[data-draft-drop]').forEach(function(toggle){
    toggle.ondragover = function(e){
      e.preventDefault();
      e.stopPropagation();
      if(e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
      this.classList.add('drag-over');
    };
    toggle.ondragleave = function(e){
      e.stopPropagation();
      this.classList.remove('drag-over');
    };
    toggle.ondrop = async function(e){
      e.preventDefault();
      e.stopPropagation();
      this.classList.remove('drag-over');
      var path = e.dataTransfer.getData('text/plain');
      if(!path) return;
      await _handleDraftDrop(path);
    };
  });

  // Wire project-card: Ctrl+Click to open, double-click to rename
  container.querySelectorAll('.project-card[draggable]').forEach(function(card){
    card.ondragstart = function(e){
      e.dataTransfer.setData('text/plain', this.getAttribute('data-path'));
      this.classList.add('dragging');
    };
    card.ondragend = function(){ this.classList.remove('dragging'); };
    card.onclick = function(e){
      if(e.ctrlKey || e.metaKey) {
        var p = this.getAttribute('data-path');
        if(window.__IFTO_openFile) window.__IFTO_openFile(p);
      }
    };
    card.ondblclick = function(e){
      e.preventDefault();
      e.stopPropagation();
      // Remove any existing rename input in this card to prevent duplicates
      var _old = this.querySelector('.todo-inline-edit');
      if(_old) { var _t = _old.parentNode ? _old.parentNode.querySelector('.pc-title') : null; if(_t) _t.style.display=''; _old.onblur=null; _old.remove(); return; }
      var titleEl = this.querySelector('.pc-title');
      if(!titleEl) return;
      var oldPath = this.getAttribute('data-path');
      var oldName = oldPath.split('/').pop();
      var input = document.createElement('input');
      input.className = 'todo-inline-edit';
      input.value = titleEl.textContent;
      titleEl.style.display = 'none';
      titleEl.parentNode.insertBefore(input, titleEl);
      protectInlineEditInput(input);
      // Use setTimeout to ensure focus works after DOM update in Obsidian
      focusInlineEditInput(input);
      input.onblur = function(){
        var newName = input.value.trim();
        input.remove();
        titleEl.style.display = '';
        if(!newName || newName === oldName.replace(/\.md$/i,'')) return;
        if(window.__IFTO_renameFile) {
          window.__IFTO_renameFile(oldPath, newName + '.md').then(function(ok){
            if(_isDraftPath(oldPath)) console.log('[IFTO] 草稿箱重命名: "' + oldPath + '" -> "' + newName + '.md" 结果:', ok);
            if(ok) renderProject();
          });
        }
      };
      input.onkeydown = function(e){
        e.stopPropagation();
        if(e.key === 'Enter') { input.blur(); }
        if(e.key === 'Escape') { input.value = oldName.replace(/\.md$/i,''); input.blur(); }
      };
    };
  });

  // Wire file items: Ctrl+Click to open, double-click to rename
  container.querySelectorAll('.project-file-item[draggable]').forEach(function(item){
    item.ondragstart = function(e){
      e.dataTransfer.setData('text/plain', this.getAttribute('data-path'));
      this.classList.add('dragging');
    };
    item.ondragend = function(){ this.classList.remove('dragging'); };
    item.onclick = function(e){
      e.stopPropagation();
      if(e.ctrlKey || e.metaKey) {
        var p = this.getAttribute('data-path');
        if(window.__IFTO_openFile) window.__IFTO_openFile(p);
      }
    };
    item.ondblclick = function(e){
      e.preventDefault();
      e.stopPropagation();
      // Remove any existing rename input in this item to prevent duplicates
      var _old = this.querySelector('.todo-inline-edit');
      if(_old) { _old.onblur=null; this.innerHTML = _old._oldHtml || ''; return; }
      var oldPath = this.getAttribute('data-path');
      var oldName = oldPath.split('/').pop();
      var oldHtml = this.innerHTML;
      var input = document.createElement('input');
      input.className = 'todo-inline-edit';
      input._oldHtml = oldHtml;
      input.value = oldName.replace(/\.md$/i,'');
      input.style.width = 'calc(100% - 20px)';
      this.innerHTML = '';
      this.appendChild(input);
      protectInlineEditInput(input);
      focusInlineEditInput(input);
      input.onblur = function(){
        var newName = input.value.trim();
        if(!newName || newName === oldName.replace(/\.md$/i,'')) {
          item.innerHTML = oldHtml;
          return;
        }
        if(window.__IFTO_renameFile) {
          window.__IFTO_renameFile(oldPath, newName + '.md').then(function(ok){
            if(ok) renderProject();
            else item.innerHTML = oldHtml;
          });
        } else {
          item.innerHTML = oldHtml;
        }
      };
      input.onkeydown = function(e){
        e.stopPropagation();
        if(e.key === 'Enter') { input.blur(); }
        if(e.key === 'Escape') { input.value = oldName.replace(/\.md$/i,''); input.blur(); }
      };
    };
  });

  // Double-click rename for folder headers
  container.querySelectorAll('.project-folder-header').forEach(function(header){
    header.ondblclick = function(e){
      e.preventDefault();
      e.stopPropagation();
      // Remove any existing rename input in this header to prevent duplicates
      var _old = this.querySelector('.todo-inline-edit');
      if(_old) { var _n = _old.parentNode ? _old.parentNode.querySelector('.project-folder-name') : null; if(_n) _n.style.display=''; _old.onblur=null; _old.remove(); return; }
      var card = this.closest('.project-folder-card');
      if(!card) return;
      var oldPath = card.getAttribute('data-folder');
      if(!oldPath) return;
      var oldName = oldPath.split('/').pop();
      var nameEl = this.querySelector('.project-folder-name');
      if(!nameEl) return;
      var input = document.createElement('input');
      input.className = 'todo-inline-edit';
      input.value = nameEl.textContent;
      input.style.fontSize = '13px';
      input.style.fontWeight = '500';
      nameEl.style.display = 'none';
      nameEl.parentNode.insertBefore(input, nameEl.nextSibling);
      protectInlineEditInput(input);
      focusInlineEditInput(input);
      input.onblur = function(){
        var newName = input.value.trim();
        input.remove();
        nameEl.style.display = '';
        if(!newName || newName === oldName) return;
        if(window.__IFTO_renameFolder) {
          window.__IFTO_renameFolder(oldPath, newName).then(function(ok){
            if(ok) renderProject();
          });
        }
      };
      input.onkeydown = function(e){
        e.stopPropagation();
        if(e.key === 'Enter') { input.blur(); }
        if(e.key === 'Escape') { input.value = oldName; input.blur(); }
      };
    };
  });

  // Wire folder header drag — draggable to columns (update all files' status)
  container.querySelectorAll('.project-folder-header[draggable]').forEach(function(header){
    header.ondragstart = function(e){
      e.dataTransfer.setData('text/plain', this.getAttribute('data-path'));
      var srcCol = this.closest('.project-col');
      var srcStatus = srcCol ? (srcCol.getAttribute('data-status') || '') : '';
      if(srcCol) e.dataTransfer.setData('text/x-ifto-src-col', srcStatus);
      // Store in global as reliable fallback (dataTransfer custom types can be lost)
      window.__ifto_dragSrcStatus = srcStatus;
      console.log('[IFTO dragstart] FOLDER HEADER. path:', this.getAttribute('data-path'), 'srcStatus:', srcStatus);
      this.classList.add('dragging');
    };
    header.ondragend = function(){ this.classList.remove('dragging'); delete window.__ifto_dragSrcStatus; };
  });

  // Wire folder cards as drop targets (move file into folder + update status)
  container.querySelectorAll('.project-folder-card').forEach(function(fc){
    fc.ondragover = function(e){
      e.preventDefault();
      e.stopPropagation();
      this.classList.add('drag-over');
    };
    fc.ondragleave = function(){ this.classList.remove('drag-over'); };
    fc.ondrop = function(e){
      e.preventDefault();
      e.stopPropagation();
      this.classList.remove('drag-over');
      var path = e.dataTransfer.getData('text/plain');
      var targetFolder = this.getAttribute('data-folder');
      if(!path || !targetFolder) return;
      // Skip if already inside this folder, or if dropping folder onto itself
      if(path.indexOf(targetFolder + '/') === 0 || path === targetFolder) return;
      var col = this.closest('.project-col');
      var targetStatus = col ? col.getAttribute('data-status') : '';

      // Folder-to-folder: move folder into another folder
      if(window.__IFTO_moveFolder && !path.endsWith('.md')) {
        window.__IFTO_moveFolder(path, targetFolder).then(function(success){
          if(success) renderProject();
        });
        return;
      }

      // File-to-folder: move file and update status
      if(window.__IFTO_moveFile) {
        window.__IFTO_moveFile(path, targetFolder).then(function(success){
          if(success) {
            var fileName = path.split('/').pop();
            var newPath = targetFolder + '/' + fileName;
            if(targetStatus && window.__IFTO_updateFileFrontmatter) {
              window.__IFTO_updateFileFrontmatter(newPath, 'status', targetStatus).then(function(){ renderProject(); });
            } else {
              renderProject();
            }
          }
        });
      }
    };
  });

  // Wire column drop targets (update frontmatter status — supports file and folder drops)
  var _dropHandler = async function(e, col){
    var targetStatus = col.getAttribute('data-status');
    if(!targetStatus) return;

    // DEBUG: log drop event details
    console.log('[IFTO _dropHandler] targetStatus:', targetStatus, 'col data-col:', col.getAttribute('data-col'));

    // IMPORTANT: capture srcStatus SYNCHRONOUSLY before any await — dragend fires
    // after drop and clears window.__ifto_dragSrcStatus, and dataTransfer values
    // are not reliably readable after the first await on some platforms.
    var _capturedSrcStatus = '';
    try { _capturedSrcStatus = e.dataTransfer.getData('text/x-ifto-src-col') || ''; } catch(_ex){}
    if(!_capturedSrcStatus && window.__ifto_dragSrcStatus) _capturedSrcStatus = window.__ifto_dragSrcStatus;

    // Extract path from drag data — support multiple sources
    var path = '';
    try {
      // Try text/plain first (standard for Obsidian file explorer and internal IFTO drags)
      if(e.dataTransfer.getData('text/plain')) {
        path = e.dataTransfer.getData('text/plain');
      }
      // Try all other available types as fallback
      if(!path && e.dataTransfer.types) {
        for(var ti=0;ti<e.dataTransfer.types.length;ti++) {
          var t = e.dataTransfer.types[ti];
          try {
            var v = e.dataTransfer.getData(t);
            if(v && typeof v === 'string' && v.length > 0) {
              path = v;
              break;
            }
          } catch(ex) {}
        }
      }
    } catch(e2) { console.error('IFTO: drag data error', e2); }

    // Debug: show all available drag types and values
    var debugInfo = '原始: ' + (path ? path.substring(0,120) : '(空)');
    try {
      var typesList = [];
      if(e.dataTransfer.types) {
        for(var _ti=0;_ti<e.dataTransfer.types.length;_ti++) {
          try {
            var _tv = e.dataTransfer.getData(e.dataTransfer.types[_ti]);
            typesList.push(e.dataTransfer.types[_ti] + '=[' + (_tv ? _tv.substring(0,80) : '空') + ']');
          } catch(ex) { typesList.push(e.dataTransfer.types[_ti] + '=(读取失败)'); }
        }
      }
      if(typesList.length > 0) debugInfo += ' | types: ' + typesList.join(', ');
    } catch(ex) {}
    // showToast(debugInfo); // 调试时取消注释

    if(!path) { showToast('无法识别拖拽内容'); return; }

    // Normalize path — handle obsidian:// URLs and various path formats
    try { path = decodeURIComponent(path); } catch(e3) {}
    path = path.replace(/\\/g, '/');

    // Handle obsidian://open?vault=xxx&file=path (used by Obsidian file explorer)
    if(path.indexOf('obsidian://') !== -1) {
      var fm = path.match(/[?&]file=([^&]+)/);
      if(fm) {
        path = decodeURIComponent(fm[1]);
      }
    }
    // Handle file:// URLs
    if(path.startsWith('file:///')) path = path.substring(8);
    else if(path.startsWith('file://')) path = path.substring(7);
    while(path.startsWith('/')) path = path.substring(1);

    var pBase = getProjectBase();
    var isInProject = path.indexOf(pBase + '/') === 0 || path === pBase;
    var isExternalDrag = false; // track if this came from outside the project

    // If path is just a name (no slashes), search vault for full path
    if(path.indexOf('/') === -1 && path.length > 0) {
      var foundItem = null;
      if(window.__IFTO_findItemByName) {
        foundItem = await window.__IFTO_findItemByName(path);
      }
      if(foundItem && foundItem.path) {
        path = foundItem.path;
        isInProject = path.indexOf(pBase + '/') === 0 || path === pBase;
        isExternalDrag = !isInProject;
        showToast('找到完整路径: ' + path + (foundItem.isFolder ? ' (文件夹)' : ' (文件)'));
      } else {
        showToast('未找到「' + path + '」在库中的位置');
        return;
      }
    }

    if(!path.endsWith('.md')) {
      // EARLY GUARD: For folders already in the project, check if source column
      // matches target column. If same, this is a no-op drag — just refresh.
      // Also: dropping a 草稿箱 folder while the middle column is showing the
      // draft view is always a no-op — the user is dragging "in place" and we
      // must not move/delete the folder from 草稿箱.
      if(isInProject) {
        var _earlySrc = _capturedSrcStatus;
        if(_earlySrc && _earlySrc === targetStatus) {
          console.log('[IFTO _dropHandler] EARLY SAME-COLUMN GUARD: src="'+_earlySrc+'" target="'+targetStatus+'" — no-op');
          renderProject();
          return;
        }
      } else if(_isDraftPath(path) && projectMiddleView === 'draft') {
        console.log('[IFTO _dropHandler] DRAFT-VIEW NO-OP: folder="' + path + '" dropped in 草稿箱 view');
        renderProject();
        return;
      }
      // Folder drop — move into projectBase if not already there
      if(!isInProject && window.__IFTO_moveFolder && window.__IFTO_createFolder) {
        await window.__IFTO_createFolder(pBase);
        var moved = await window.__IFTO_moveFolder(path, pBase);
        if(!moved) {
          if(window.__IFTO_moveFolderByFiles) {
            moved = await window.__IFTO_moveFolderByFiles(path, pBase);
          }
        }
        if(!moved) {
          var parts = path.split('/');
          if(parts.length > 1) {
            var altPath = parts.slice(1).join('/');
            moved = await window.__IFTO_moveFolder(altPath, pBase);
            if(!moved && window.__IFTO_moveFolderByFiles) {
              moved = await window.__IFTO_moveFolderByFiles(altPath, pBase);
            }
            if(moved) path = altPath;
          }
        }
        if(moved) {
          var folderName = path.split('/').pop();
          path = pBase + '/' + folderName;
          isExternalDrag = true;
        }
      }
      // If folder move failed because target already exists, merge contents
      if(!isInProject && !moved && window.__IFTO_listFolderContents && window.__IFTO_moveFile) {
        var folderName = path.split('/').pop();
        var targetPath = pBase + '/' + folderName;
        var created = await window.__IFTO_createFolder(targetPath);
        if(!created) {
          // Target folder exists — merge files
          showToast('合并文件夹: ' + folderName);
          try {
            var mergeOK = await (async function(){
              var mergeRec = async function(src, dst){
                var items = await window.__IFTO_listFolderContents(src);
                for(var mi=0;mi<items.length;mi++){
                  var it = items[mi];
                  var srcItem = src + '/' + it.name;
                  var dstItem = dst + '/' + it.name;
                  if(it.isFolder){
                    await window.__IFTO_createFolder(dstItem);
                    await mergeRec(srcItem, dstItem);
                  } else {
                    await window.__IFTO_moveFile(srcItem, dst);
                  }
                }
                // Clean up empty source folder
                try { await window.__IFTO_deleteFolder(src); } catch(e){}
              };
              await mergeRec(path, targetPath);
              return true;
            })();
            if(mergeOK){
              path = targetPath;
              moved = true;
              isExternalDrag = true;
              // 合并后直接刷新，不批量更新状态，避免影响原有的文件
              renderProject();
              return;
            }
          } catch(e){
            console.error('IFTO: merge error', e);
            showToast('合并失败: ' + e.message);
          }
        }
      }
      // If all folder moves failed, maybe it's a file without .md extension (Obsidian URL strips it)
      if(!isInProject && !moved && path.indexOf('.') === -1) {
        var filePathMd = path + '.md';
        if(window.__IFTO_moveFile) {
          var fileMoved2 = await window.__IFTO_moveFile(filePathMd, pBase);
          if(!fileMoved2) {
            var parts2 = filePathMd.split('/');
            if(parts2.length > 1) {
              var altPath2 = parts2.slice(1).join('/');
              fileMoved2 = await window.__IFTO_moveFile(altPath2, pBase);
              if(fileMoved2) filePathMd = altPath2;
            }
          }
          if(fileMoved2) {
            path = pBase + '/' + filePathMd.split('/').pop();
            if(window.__IFTO_updateFileFrontmatter) {
              window.__IFTO_updateFileFrontmatter(path, 'status', targetStatus).then(function(success){ if(success) renderProject(); });
            }
            return;
          }
        }
      }
      // Update files inside the folder (only files from the source column)
      if(typeof window.__IFTO_getFilesFrontmatterRecursive !== 'function') { renderProject(); return; }
      var files = await window.__IFTO_getFilesFrontmatterRecursive(path);
      if(files.length === 0) { renderProject(); return; }
      // Use srcStatus captured synchronously at the start of the handler — by now
      // the dragend event has cleared window.__ifto_dragSrcStatus and dataTransfer
      // values may no longer be readable. Re-read defensively as a last-resort
      // fallback, but prefer the captured value.
      var srcStatus = _capturedSrcStatus;
      if(!srcStatus) {
        try { srcStatus = e.dataTransfer.getData('text/x-ifto-src-col') || ''; } catch(ex) {}
        if(!srcStatus && window.__ifto_dragSrcStatus) srcStatus = window.__ifto_dragSrcStatus;
      }
      // DEBUG
      console.log('[IFTO _dropHandler] FOLDER DROP. path:', path, 'targetStatus:', targetStatus, 'srcStatus:', srcStatus, 'isInProject:', isInProject);
      // Build key maps
      var _allCols = getProjectCols();
      var targetColKey = '', srcColKey = '';
      for(var _ci2=0;_ci2<_allCols.length;_ci2++) {
        var _ct = getProjectColTitle(_allCols[_ci2]);
        if(_ct === targetStatus) targetColKey = _allCols[_ci2];
        if(_ct === srcStatus) srcColKey = _allCols[_ci2];
      }
      console.log('[IFTO _dropHandler] allCols:', _allCols, 'targetColKey:', targetColKey, 'srcColKey:', srcColKey);
      // If source and target column are the same, nothing to do
      // Check both the mapped key AND the raw status string
      if((srcColKey && srcColKey === targetColKey) || (srcStatus && srcStatus === targetStatus)) {
        console.log('[IFTO _dropHandler] SAME COLUMN - skipping update');
        showToast('文件夹已在「' + targetStatus + '」列');
        renderProject();
        return;
      }
      // BUG FIX: if we still don't have srcStatus for an internal drag, refuse to
      // touch files in non-source columns. Only allow the bulk "update all
      // non-target files" behavior for true external drags (folder originally
      // outside the project). This prevents collateral damage when dragging a
      // project folder card from one status column to another.
      var _isInternalProjectDrag = isInProject && !isExternalDrag;
      if(_isInternalProjectDrag && !srcColKey) {
        console.warn('[IFTO _dropHandler] srcColKey missing on internal drag — aborting bulk update to avoid moving non-source files');
        showToast('未能识别源状态列，已取消批量更新以防误改');
        renderProject();
        return;
      }
      // If no source column recorded (e.g. external drag), update all non-target files
      console.log('[IFTO _dropHandler] Proceeding to update files. srcColKey empty?', !srcColKey);
      var updatedCount = 0;
      for(var fi=0;fi<files.length;fi++) {
        var fullPath = path + '/' + files[fi].name;
        if(window.__IFTO_updateFileFrontmatter) {
          var currentCol = _projectFileStatus(files[fi].fm, _allCols);
          console.log('[IFTO _dropHandler] file:', files[fi].name, 'currentCol:', currentCol, 'targetColKey:', targetColKey, 'srcColKey:', srcColKey);
          if(currentCol === targetColKey) continue; // already in target
          if(srcColKey && currentCol !== srcColKey) continue; // not from source column, leave alone
          console.log('[IFTO _dropHandler] UPDATING file:', files[fi].name, 'from', currentCol, 'to', targetStatus);
          await window.__IFTO_updateFileFrontmatter(fullPath, 'status', targetStatus);
          updatedCount++;
        }
      }
      if(updatedCount > 0) showToast('已更新 ' + updatedCount + ' 个文件的状态');
      else showToast('文件夹已在「' + targetStatus + '」列，无需更新');
      renderProject();
      return;
    }

    // File drop
    var fileMoved = isInProject;
    if(!isInProject && window.__IFTO_moveFile && window.__IFTO_createFolder) {
      await window.__IFTO_createFolder(pBase);
      var moved = await window.__IFTO_moveFile(path, pBase);
      if(!moved) {
        var parts = path.split('/');
        if(parts.length > 1) {
          var altPath = parts.slice(1).join('/');
          moved = await window.__IFTO_moveFile(altPath, pBase);
          if(moved) path = altPath;
        }
      }
      if(moved) {
        path = pBase + '/' + path.split('/').pop();
        fileMoved = true;
      }
    }
    if(fileMoved && window.__IFTO_updateFileFrontmatter) {
      window.__IFTO_updateFileFrontmatter(path, 'status', targetStatus).then(function(success){ if(success) renderProject(); });
    } else {
      renderProject();
    }
  };

  // Store globally so the document-level drop listener always uses the latest version
  window.__ifto_dropHandler = _dropHandler;

  // Standard column-level drop handlers (works for internal IFTO drags)
  container.querySelectorAll('.project-col').forEach(function(col){
    col.ondragover = function(e){ e.preventDefault(); e.dataTransfer.dropEffect = 'move'; this.classList.add('drag-over'); };
    col.ondragleave = function(){ this.classList.remove('drag-over'); };
    col.ondrop = async function(e){
      e.preventDefault();
      // Skip if dropped on the 草稿箱 toggle — handled by its own drop handler
      if(e.target && e.target.closest && e.target.closest('.project-view-toggle[data-draft-drop]')) return;
      if(this.__dropHandled) return; // already processed by document handler
      // Allow folder header drags through for batch status update
      if(e.target && e.target.closest('.project-folder-card')) {
        var _dragP = e.dataTransfer.getData('text/plain');
        if(_dragP && _dragP.endsWith('.md')) return; // file drops handled by folder card
      }
      this.classList.remove('drag-over');
      this.__dropHandled = true;
      setTimeout(function(){ delete this.__dropHandled; }, 1000);
      await window.__ifto_dropHandler(e, this);
    };
  });

  // Document-level capture handlers to intercept Obsidian file explorer drags
  // Remove old listeners first to ensure fresh closure references
  if(window.__ifto_dragOverHandler) document.removeEventListener('dragover', window.__ifto_dragOverHandler, true);
  if(window.__ifto_dropListener) document.removeEventListener('drop', window.__ifto_dropListener, true);

  window.__ifto_dragOverHandler = function(e){
    var cols = document.getElementById('projectCols');
    if(cols && cols.contains(e.target)) {
      e.preventDefault();
      if(e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    }
  };
  window.__ifto_dropListener = async function(e){
    var cols = document.getElementById('projectCols');
    if(!cols || !cols.contains(e.target)) return;
    // Skip if dropped on the 草稿箱 toggle — handled by its own drop handler
    if(e.target.closest && e.target.closest('.project-view-toggle[data-draft-drop]')) return;
    var col = e.target.closest('.project-col');
    if(!col) return;
    // Allow folder header drags through for batch status update
    if(e.target.closest('.project-folder-card')) {
      var _dp2 = e.dataTransfer.getData('text/plain');
      if(_dp2 && _dp2.endsWith('.md')) return;
    }
    // Avoid double-handling if column handler already got it
    if(col.__dropHandled) return;
    console.log('[IFTO doc drop] target col status:', col.getAttribute('data-status'), 'path:', e.dataTransfer.getData('text/plain'));
    e.preventDefault();
    e.stopPropagation();
    col.classList.remove('drag-over');
    col.__dropHandled = true;
    setTimeout(function(){ delete col.__dropHandled; }, 1000);
    // Use global reference to always get the latest _dropHandler
    if(window.__ifto_dropHandler) await window.__ifto_dropHandler(e, col);
  };
  document.addEventListener('dragover', window.__ifto_dragOverHandler, true);
  document.addEventListener('drop', window.__ifto_dropListener, true);

  // Wire archive drop zone
  var archiveZone = document.getElementById('projectArchiveZone');
  if(archiveZone) {
    var archiveDrop = archiveZone.querySelector('.project-archive-drop');
    if(archiveDrop) {
      archiveDrop.ondragover = function(e){ e.preventDefault(); this.classList.add('drag-over'); };
      archiveDrop.ondragleave = function(){ this.classList.remove('drag-over'); };
      archiveDrop.ondrop = function(e){
        e.preventDefault();
        this.classList.remove('drag-over');
        var path = e.dataTransfer.getData('text/plain');
        if(!path) return;
        var s2 = window.__IFTO_SETTINGS || {};
var archiveRoot = s2.archivePath || '500-归档资料/510-归档项目';

        // Folder drop — archive only completed files, not the whole folder
        if(!path.endsWith('.md')) {
          if(!window.__IFTO_listFolderContents || !window.__IFTO_readFile || !window.__IFTO_createFolder) return;
          var folderName = path.split('/').pop();
          var targetDir = archiveRoot + '/' + folderName;

          (async function(){
            // Recursively scan folder: find files with "status: 已完成"
            var completedFiles = [];
            var hasIncomplete = false;

            var scanFolder = async function(dir){
              var contents = await window.__IFTO_listFolderContents(dir);
              for(var si=0;si<contents.length;si++){
                var item = contents[si];
                var itemPath = dir + '/' + item.name;
                if(item.isFolder){
                  await scanFolder(itemPath);
                } else if(item.name.endsWith('.md')){
                  var content = await window.__IFTO_readFile(itemPath);
                  // Parse frontmatter for status
                  var fm = content.match(/^---\n([\s\S]*?)\n---/);
                  var status = '';
                  if(fm){
                    var lines = fm[1].split('\n');
                    for(var li=0;li<lines.length;li++){
                      var kv = lines[li].match(/^\s*([^:]+?)\s*:\s*(.+)/);
                      if(kv && kv[1].trim() === 'status'){
                        status = kv[2].trim().replace(/^['"]|['"]$/g, '');
                        break;
                      }
                    }
                  }
                  if(status === '已完成'){
                    completedFiles.push({
                      fullPath: itemPath,
                      relPath: itemPath.substring(path.length + 1)
                    });
                  } else {
                    hasIncomplete = true; // includes 未开始, 推进中, or no status
                  }
                }
              }
            };

            try {
              await scanFolder(path);
            } catch(e){
              console.error('IFTO: archive scan error', e);
              showToast('归档扫描失败');
              renderProject();
              return;
            }

            if(completedFiles.length === 0){
              showToast('文件夹中没有已完成文件');
              renderProject();
              return;
            }

            await window.__IFTO_createFolder(targetDir);
            var movedCount = 0;

            for(var ci=0;ci<completedFiles.length;ci++){
              var cf = completedFiles[ci];
              var lastSlash = cf.relPath.lastIndexOf('/');
              var fileTargetDir = targetDir;

              // Maintain subfolder structure in archive
              if(lastSlash >= 0){
                var subDir = cf.relPath.substring(0, lastSlash);
                fileTargetDir = targetDir + '/' + subDir;
                await window.__IFTO_createFolder(fileTargetDir);
              }

              if(window.__IFTO_moveFile){
                var ok = await window.__IFTO_moveFile(cf.fullPath, fileTargetDir);
                if(ok) movedCount++;
              }
            }

            if(movedCount > 0){
              showToast('已归档 ' + movedCount + ' 个已完成文件' + (hasIncomplete ? '，未开始/推进中的留在原处' : ''));
              // If all files were archived, clean up empty folder
              if(!hasIncomplete){
                try { await window.__IFTO_deleteFolder(path); } catch(e){}
              }
            } else {
              showToast('归档失败，请重试');
            }
            renderProject();
          })();
          return;
        }

        // File drop — archive individual .md file
        if(!window.__IFTO_createFolder || !window.__IFTO_moveFile) return;
        var pBase = getProjectBase();
        // Compute relative path to determine project subfolder
        var relPath = path.substring(pBase.length + 1);
        var slashIdx = relPath.indexOf('/');
        var targetFolder = archiveRoot;
        if(slashIdx > -1) {
          // File is inside a project subfolder — use that as archive subfolder name
          var projName = relPath.substring(0, slashIdx);
          targetFolder = archiveRoot + '/' + projName;
        }
        // Create target folder (if subfolder, creates recursively) then move file
        window.__IFTO_createFolder(targetFolder).then(function(){
          window.__IFTO_moveFile(path, targetFolder).then(function(ok){ if(ok) renderProject(); });
        });
      };
    }
  }
}

// Initialize project
try { renderProject(); } catch(e){console.error('IFTO: init project error',e)}

// ====== Note ======
// getBookFolder() and getPaperFolder() are now read from settings via getBookFolder()/getPaperFolder()
var NOTE_TABS = ['reading', 'read', 'paper'];
var noteTab = 'reading';
var paperQuery = ''; // search query for paper tab

function getNoteTabDisplay(tab) {
  return tab === 'reading' ? '正在阅读' : tab === 'read' ? '已读书目' : '已读文献';
}

async function renderNote() {
  try {
    var grid = document.getElementById('noteGrid');
    if(!grid) return;

    // Update sidebar active state
    document.querySelectorAll('#noteSidebar .note-item').forEach(function(item){
      item.classList.toggle('active', item.getAttribute('data-tab') === noteTab);
    });

    if(noteTab === 'paper') {
      // Load papers (no status filter)
      var all = (typeof window.__IFTO_getFilesFrontmatterRecursive === 'function')
        ? await window.__IFTO_getFilesFrontmatterRecursive(getPaperFolder()) : [];

      // Filter by search query across all frontmatter fields
      if(paperQuery) {
        var q = paperQuery.toLowerCase();
        all = all.filter(function(item){
          var fm = item.fm;
          for(var k in fm) {
            if(String(fm[k]).toLowerCase().indexOf(q) >= 0) return true;
          }
          return false;
        });
      }

      if(all.length === 0) {
        grid.innerHTML = '<div class="note-search"><input class="paper-search-input" id="paperSearchInput" type="text" placeholder="检索作者、日期、发表、关键词..." value="'+paperQuery+'"></div><div class="note-empty">暂无文献</div>';
        wirePaperSearch();
        return;
      }
      var html = '<div class="note-search"><input class="paper-search-input" id="paperSearchInput" type="text" placeholder="检索作者、日期、发表、关键词..." value="'+paperQuery+'"></div>';
      for(var i=0;i<all.length;i++) {
        var f = all[i].fm;
        var nm = all[i].name.replace(/\.md$/i,'');
        // Support multiple possible field names
        var title = f.title || f.Title || f.题目 || nm;
        var author = f.author || f.Author || f.authors || f.Authors || f.作者 || '';
        var journal = f.journal || f.Journal || f.publication || f.Publication || f.发表 || f.source || f.Source || '';
        var date = f.date || f.Date || f.year || f.Year || f.日期 || f.published || f.Published || '';
        // Parse keywords: extract #tag from text fields like 关键词/keywords
        var kwText = f.关键词 || f.keywords || f.Keywords || f.tags || f.Tags || '';
        var kwTags = [];
        var kwRe = /#([^\s,#]+)/g;
        var kwMatch;
        while ((kwMatch = kwRe.exec(kwText)) !== null) {
          var t = kwMatch[1].trim();
          if(t) kwTags.push(t);
        }
        html += '<div class="note-card note-card-paper" data-path="'+getPaperFolder()+'/'+all[i].name+'">'+
          '<span class="nci-title">'+title+'</span>'+
          '<div class="nci-detail">'+
            (author?'<span class="nci-row"><span class="nci-label">作者</span><span>'+author+'</span></span>':'')+
            (journal?'<span class="nci-row"><span class="nci-label">发表</span><span>'+journal+'</span></span>':'')+
            '<span class="nci-row"><span class="nci-label">日期</span><span>'+date+'</span></span>'+
          '</div>'+
          (kwTags.length ? '<div class="nci-tags">'+kwTags.map(function(t){return '<span class="nci-tag">#'+t+'</span>';}).join('')+'</div>' : '')+
        '</div>';
      }
      grid.innerHTML = html;
      wirePaperSearch();
    } else {
      var statusFilter = noteTab === 'reading' ? '在读' : '已读';
      var all = (typeof window.__IFTO_getFilesFrontmatter === 'function')
        ? await window.__IFTO_getFilesFrontmatter(getBookFolder()) : [];
      var filtered = all.filter(function(item){ return item.fm.status === statusFilter; });
      if(filtered.length === 0) {
        if(noteTab === 'reading') {
          // Show just the add button when empty
          grid.innerHTML = '<div class="note-add-btn" id="readingAddBtn"><span class="ci">+</span><span class="cl">新增在读</span></div>';
        } else {
          grid.innerHTML = '<div class="note-empty">暂无已读书目</div>';
        }
        // Wire add reading note button (even when empty)
        var emptyBtn = document.getElementById('readingAddBtn');
        if(emptyBtn) {
          emptyBtn.onclick = async function(){
            if(window.__IFTO_createReadingNote) {
              var path = await window.__IFTO_createReadingNote();
              if(path) {
                renderNote();
                if(window.__IFTO_openFile) window.__IFTO_openFile(path);
              }
            }
          };
        }
        return;
      }
      var html = '';
      // Add "+新增在读" button for reading tab
      if(noteTab === 'reading') {
        html += '<div class="note-add-btn" id="readingAddBtn"><span class="ci">+</span><span class="cl">新增在读</span></div>';
      }
      // Pre-resolve covers: vault paths → bridge; HTTP URLs → fetch directly in webview
      async function _fetchAsDataURL(url) {
        try {
          var r = await fetch(url, { mode: 'cors', credentials: 'omit' });
          if(!r.ok) return '';
          var blob = await r.blob();
          return await new Promise(function(rs){
            var rd = new FileReader();
            rd.onloadend = function(){ rs(rd.result); };
            rd.readAsDataURL(blob);
          });
        } catch(e) { return ''; }
      }
      // Resolve a single cover URL to a data URL
      async function _resolveCover(cv) {
        if(!cv) return '';
        if(cv.match(/^https?:\/\//)) {
          // HTTP URL: use bridge (server-side, no CORS) first; fallback to webview fetch
          if(typeof window.__IFTO_resolveImageUrl === 'function') {
            try { var data = await window.__IFTO_resolveImageUrl(cv); if(data) return data; } catch(e) {}
          }
          try { var d2 = await _fetchAsDataURL(cv); if(d2) return d2; } catch(e) {}
          return '';
        }
        // Vault path: try resolveImageUrl (uses vault.readBinary) first, then readFileAsDataURL (uses adapter.readBinary)
        if(typeof window.__IFTO_resolveImageUrl === 'function') {
          try { var data = await window.__IFTO_resolveImageUrl(cv); if(data) return data; } catch(e) {}
        }
        if(typeof window.__IFTO_readFileAsDataURL === 'function') {
          try { return await window.__IFTO_readFileAsDataURL(cv); } catch(e) {}
        }
        return '';
      }
      var resolvedCovers = [];
      for(var ri=0;ri<filtered.length;ri++) {
        resolvedCovers[ri] = await _resolveCover(filtered[ri].fm.cover);
      }
      for(var i=0;i<filtered.length;i++) {
        var f = filtered[i].fm;
        var nm = filtered[i].name.replace(/\.md$/i,'');
        var coverSrc = resolvedCovers[i];
        html += '<div class="note-card" data-path="'+getBookFolder()+'/'+filtered[i].name+'">'+
          '<div class="note-card-thumb">'+
            (coverSrc ? '<img src="'+coverSrc+'" onerror="this.style.display=\'none\'">' : '')+
          '</div>'+
          '<div class="note-card-info">'+
            '<span class="nci-title">'+(f.title||nm)+'</span>'+
            '<span class="nci-author">'+(f.author||'')+'</span>'+
            (f.rating ? '<span class="nci-rating">' + '★'.repeat(parseInt(f.rating)||0) + '</span>' : '')+
            (f.type ? '<span class="nci-type">类型: '+f.type+'</span>' : '')+
            (f.description ? '<span class="nci-desc">'+f.description+'</span>' : '')+
          '</div>'+
        '</div>';
      }
      grid.innerHTML = html;
    }

    // Wire click-to-open
    grid.querySelectorAll('.note-card').forEach(function(card){
      card.onclick = function(){
        var p = this.getAttribute('data-path');
        if(window.__IFTO_openFile) window.__IFTO_openFile(p);
      };
    });

    // Wire add reading note button
    var readingBtn = document.getElementById('readingAddBtn');
    if(readingBtn) {
      readingBtn.onclick = async function(){
        if(window.__IFTO_createReadingNote) {
          var path = await window.__IFTO_createReadingNote();
          if(path) {
            renderNote();
            if(window.__IFTO_openFile) window.__IFTO_openFile(path);
          }
        }
      };
    }
  } catch(e) { console.error('IFTO: renderNote error', e); }
}

// Wire paper search input
function wirePaperSearch() {
  var input = document.getElementById('paperSearchInput');
  if(input) {
    var composing = false;
    input.addEventListener('compositionstart', function(){ composing = true; });
    input.addEventListener('compositionend', function(){
      composing = false;
      paperQuery = this.value;
      var cp = this.selectionStart;
      renderNote().then(function(){
        var ni = document.getElementById('paperSearchInput');
        if(ni){ ni.focus(); ni.setSelectionRange(cp, cp); }
      });
    });
    input.oninput = function(){
      if(composing) return;
      paperQuery = this.value;
      var cp = this.selectionStart;
      renderNote().then(function(){
        var ni = document.getElementById('paperSearchInput');
        if(ni){ ni.focus(); ni.setSelectionRange(cp, cp); }
      });
    };
  }
}

// Wire sidebar tab clicks
document.querySelectorAll('#noteSidebar .note-item').forEach(function(item){
  item.addEventListener('click', function(){
    var tab = this.getAttribute('data-tab');
    if(tab && tab !== noteTab) {
      noteTab = tab;
      renderNote();
    }
  });
});

// Initialize note
try { renderNote(); } catch(e){console.error('IFTO: init note error',e)}

// ====== Review ======
var REVIEW_TABS = ['daily','weekly','monthly','project'];
var reviewTab = 'daily';
var reviewPage = 1;
var reviewPerPage = 12;

function getReviewFolder(tab) {
  var s = window.__IFTO_SETTINGS || {};
  return tab === 'daily' ? (s.reviewDailyPath || '600-复盘总结/601-报告总结/602-日报')
    : tab === 'weekly' ? (s.reviewWeeklyPath || '600-复盘总结/601-报告总结/603-周报')
    : tab === 'monthly' ? (s.reviewMonthlyPath || '600-复盘总结/601-报告总结/604-月报')
    : (s.reviewProjectPath || '600-复盘总结/610-项目总结');
}

function getReviewTemplate(tab) {
  var s = window.__IFTO_SETTINGS || {};
  return tab === 'daily' ? (s.reviewDailyTemplate || '')
    : tab === 'weekly' ? (s.reviewWeeklyTemplate || '')
    : tab === 'monthly' ? (s.reviewMonthlyTemplate || '')
    : (s.reviewProjectTemplate || '');
}

function switchReviewTab(tab) {
  reviewTab = tab;
  reviewPage = 1;
  document.querySelectorAll('#review .tab').forEach(function(t){ t.classList.remove('active'); });
  var te = document.querySelector('#review .tab[data-tab="'+tab+'"]');
  if(te) te.classList.add('active');
  renderReview();
}

async function renderReview() {
  try {
    var grid = document.getElementById('reviewGrid');
    if(!grid) return;
    var folder = getReviewFolder(reviewTab);
    var all = (typeof window.__IFTO_getFilesDetail === 'function')
      ? await window.__IFTO_getFilesDetail(folder, 0, 999)
      : {files: [], total: 0};
    var allDetails = all.files || [];

    var totalPages = Math.ceil(allDetails.length / reviewPerPage) || 1;
    if(reviewPage > totalPages) reviewPage = totalPages;
    var start = (reviewPage - 1) * reviewPerPage;
    var pf = allDetails.slice(start, start + reviewPerPage);

    var html = '';
    html += '<div class="card card-add" id="reviewAddBtn"><span class="ci">+</span><span class="cl">新增复盘</span></div>';
    for(var i=0;i<pf.length;i++) {
      var d = pf[i];
      var nm = d.name.replace(/\.md$/i, '');
      html += '<div class="card card-detail" data-path="'+folder+'/'+d.name+'">'+
        '<span class="card-title">'+(d.title || nm)+'</span>'+
        '<span class="card-date">'+fmtDate(d.ctime)+'</span>'+
        (d.tags && d.tags.length ? '<span class="card-tags">'+fmtTags(d.tags)+'</span>' : '')+
      '</div>';
    }

    grid.className = 'card-grid';
    grid.innerHTML = html;

    // Wire file cards
    var cards = grid.querySelectorAll('.card[data-path]');
    for(var j=0;j<cards.length;j++) {
      (function(card){
        card.onclick = function(){
          var p = this.getAttribute('data-path');
          if(window.__IFTO_openFile) window.__IFTO_openFile(p);
        };
      })(cards[j]);
    }

    // Wire add button
    var addBtn = document.getElementById('reviewAddBtn');
    if(addBtn){
      addBtn.onclick = async function(){
        var folder = getReviewFolder(reviewTab);
        var tpl = getReviewTemplate(reviewTab);
        var now = new Date();
        var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
        var fn = ts+'.md';
        var content = '';
        if(tpl && window.__IFTO_readFile){
          content = (await window.__IFTO_readFile(tpl)) || '';
        }
        if(content && window.__IFTO_processTemplate){
          content = await window.__IFTO_processTemplate(content, ts);
        }
        if(window.__IFTO_createFile){
          var ok = await window.__IFTO_createFile(folder, fn, content);
          if(ok){
            renderReview();
            if(window.__IFTO_openFile) window.__IFTO_openFile(folder+'/'+fn);
          }
        }
      };
    }

    updateReviewNav(totalPages);
  } catch(e) { console.error('IFTO: renderReview error', e); }
}

function updateReviewNav(tp) {
  var nav = document.querySelector('#review .slide-nav');
  if(!nav) return;
  var btns = nav.querySelectorAll('.slide-btn');
  var num = nav.querySelector('.slide-num');
  if(num) num.textContent = String(reviewPage).padStart(2,'0')+' / '+String(tp).padStart(2,'0');
  if(btns.length >= 2) {
    btns[0].onclick = function(){
      if(reviewPage > 1) { reviewPage--; renderReview(); }
    };
    btns[1].onclick = function(){
      if(reviewPage < tp) { reviewPage++; renderReview(); }
    };
  }
}

// Wire review tab clicks
document.querySelectorAll('#review .tab[data-tab]').forEach(function(t){
  t.addEventListener('click', function(){
    switchReviewTab(this.getAttribute('data-tab'));
  });
});

// Initialize review
try { renderReview(); } catch(e){console.error('IFTO: init review error',e)}

// ====== Shortcut buttons ======
function _getSC(k, fb) { var s = window.__IFTO_SETTINGS || {}; return s[k] || fb; }
// Prefer the primary settings field (the one actually exposed by the settings
// panel), then fall back to a legacy "shortcut*"-prefixed override if the user
// has manually set one, then the hardcoded default. Previously the shortcut
// buttons ONLY read shortcut*-prefixed keys, which don't exist in the settings
// panel — so user paths typed into 设置 were ignored and every shortcut wrote
// to the hardcoded default folder.
function _getSCPath(primaryKey, legacyKey, fb) {
  var s = window.__IFTO_SETTINGS || {};
  return s[primaryKey] || s[legacyKey] || fb;
}

// 新建收集 shortcut
try{
var _sbtn = document.getElementById('s-collect');
if(_sbtn){_sbtn.onclick = async function(e){
  e.preventDefault();
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  var folder = _getSCPath('inboxFolder', 'shortcutCollectPath', '010-信箱 INBOX/020-收集');
  var s = window.__IFTO_SETTINGS || {};
  var tpl = s.collectionTemplate || s.shortcutCollectTemplate || '';
  var content = '';
  if(tpl && window.__IFTO_readFile){
    content = (await window.__IFTO_readFile(tpl)) || '';
  }
  if(content && window.__IFTO_processTemplate){
    content = await window.__IFTO_processTemplate(content, ts);
  }
  if(window.__IFTO_createFile){
    var ok = await window.__IFTO_createFile(folder, fn, content);
    if(ok && window.__IFTO_openFile) window.__IFTO_openFile(folder+'/'+fn);
  }
}}
}catch(e){console.error('IFTO: shortcut collect btn error',e)}

// 新建待办 shortcut (creates an activity item — handler calls renderActivity)
try{
var _st = document.getElementById('s-todo');
if(_st){_st.onclick = async function(e){
  e.preventDefault();
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  var folder = _getSCPath('activityFolder', 'shortcutTodoPath', '010-信箱 INBOX/030-活动清单');
  var s = window.__IFTO_SETTINGS || {};
  var tpl = s.shortcutTodoTemplate || '';
  var content = '- [ ] \n';
  if(tpl && window.__IFTO_readFile){
    var tplContent = (await window.__IFTO_readFile(tpl)) || '';
    if(tplContent) content = tplContent;
  }
  if(content && window.__IFTO_processTemplate){
    content = await window.__IFTO_processTemplate(content, ts);
  }
  if(window.__IFTO_createFile){
    var ok = await window.__IFTO_createFile(folder, fn, content);
    if(ok) {
      if(window.__IFTO_openFile) window.__IFTO_openFile(folder+'/'+fn);
      // If creating in activity folder, prepend to order
      if(folder === ACTIVITY_FOLDER && window.__IFTO_readListOrder) {
        try {
          var o2 = await window.__IFTO_readListOrder(folder);
          if(o2 && o2.length > 0) { o2.unshift(fn); window.__IFTO_writeListOrder(folder, o2); }
        } catch(e) {}
      }
      renderActivity();
    }
  }
}}
}catch(e){console.error('IFTO: shortcut todo btn error',e)}

// 新建任务 shortcut
try{
var _stask = document.getElementById('s-task');
if(_stask){_stask.onclick = async function(e){
  e.preventDefault();
  var s = window.__IFTO_SETTINGS || {};
  var tpl = s.projectTaskTemplate || '';
  var folder = _getSCPath('taskFolder', 'shortcutTaskPath', '100-工作台WORKDESK/120-项目管理/121-未开始');
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  var content = '';
  if(tpl && window.__IFTO_readFile){
    content = (await window.__IFTO_readFile(tpl)) || '';
  }
  if(content && window.__IFTO_processTemplate){
    content = await window.__IFTO_processTemplate(content, ts);
  }
  var fmMatch = content.match(/^---\n[\s\S]*?\n---/);
  if(fmMatch){
    if(!fmMatch[0].match(/^status:/m)){
      content = content.replace(/^---\n/, '---\nstatus: 未开始\n');
    }
  } else {
    content = '---\nstatus: 未开始\n---\n' + (content || '# \n\n## 任务描述\n\n## 完成标准\n\n');
  }
  if(window.__IFTO_createFile){
    var ok = await window.__IFTO_createFile(folder, fn, content);
    if(ok && window.__IFTO_openFile) await window.__IFTO_openFile(folder+'/'+fn);
  }
}}
}catch(e){console.error('IFTO: shortcut task btn error',e)}

// 新建笔记 shortcut
try{
var _sn = document.getElementById('s-note');
if(_sn){_sn.onclick = async function(e){
  e.preventDefault();
  var s = window.__IFTO_SETTINGS || {};
  var folder = _getSCPath('notePath', 'shortcutNotePath', '010-信箱 INBOX/040-笔记');
  var now = new Date();
  var ts = now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+'_'+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')+String(now.getSeconds()).padStart(2,'0');
  var fn = ts+'.md';
  var content = '';
  var tpl = s.noteTemplate || s.shortcutNoteTemplate;
  if(tpl && window.__IFTO_readFile){
    content = (await window.__IFTO_readFile(tpl)) || '';
    if(content && window.__IFTO_processTemplate){
      content = await window.__IFTO_processTemplate(content, ts);
    }
  }
  if(window.__IFTO_createFile){
    var ok = await window.__IFTO_createFile(folder, fn, content);
    if(ok && window.__IFTO_openFile) window.__IFTO_openFile(folder+'/'+fn);
  }
}}
}catch(e){console.error('IFTO: shortcut note btn error',e)}
// ====== Week Notes Widget ======
function renderWeekNotesPage() {
  var body = document.getElementById('widgetBody');
  if(!body) return;
  var s3 = window.__IFTO_SETTINGS || {};
  var notePath = s3.widgetWeeknotesPath || getNoteFolder();
  var now = new Date();
  var day = now.getDay();
  var diff = day === 0 ? 6 : day - 1;
  var monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  monday.setHours(0,0,0,0);
  var sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23,59,59,999);
  var msMon = monday.getTime();
  var msSun = sunday.getTime();
  var dateRange = (monday.getMonth()+1)+'/'+monday.getDate()+' - '+(sunday.getMonth()+1)+'/'+sunday.getDate();
  body.innerHTML = '<div class="token-loading">加载中...</div>';
  window.__IFTO_getFilesDetail(notePath, 0, 999).then(function(result){
    var weekFiles = [];
    for(var i=0;i<result.files.length;i++){
      var f = result.files[i];
      if(f.ctime && f.ctime >= msMon && f.ctime <= msSun) weekFiles.push(f);
    }
    weekFiles.sort(function(a,b){return b.ctime - a.ctime});
    var html = '<div style="display:flex;flex-direction:column;gap:0">';
    html += '<div class="habit-header"><span class="habit-header-title">本周笔记</span><span class="habit-header-count">'+dateRange+'</span></div>';
    if(weekFiles.length===0){
      html += '<div class="habit-empty">本周还没有创建笔记</div>';
    } else {
      html += '<div style="display:flex;flex-direction:column;gap:4px">';
      for(var i=0;i<weekFiles.length;i++){
        var f = weekFiles[i];
        var d = new Date(f.ctime);
        var dateStr = (d.getMonth()+1)+'/'+d.getDate();
        var name = f.name.replace('.md','');
        var fullPath = notePath+'/'+f.name;
        html += '<div class="wn-card" data-path="'+fullPath+'" onclick="window.__IFTO_openFile(\''+fullPath+'\')">';
        html += '<span class="wn-card-title">'+escHtml(name)+'</span>';
        html += '<span class="wn-card-date">'+dateStr+'</span>';
        html += '</div>';
      }
      html += '</div>';
    }
    html += '</div>';
    body.innerHTML = html;
  }).catch(function(){
    body.innerHTML = '<div style="text-align:center;color:#ef4444;font-size:12px;padding:20px">加载失败</div>';
  });
}

// ====== Today Todo Widget ======
function renderTodoWidgetPage() {
  var body = document.getElementById('widgetBody');
  if(!body) return;
  var s4 = window.__IFTO_SETTINGS || {};
  var todoFolder = s4.widgetTodotodoPath || TODO_FOLDER;
  var now = new Date();
  var dateStr = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
  body.innerHTML = '<div class="token-loading">加载中...</div>';

  var pListFiles = (typeof window.__IFTO_listFiles === 'function')
    ? window.__IFTO_listFiles(todoFolder) : Promise.resolve([]);
  var pStates = (typeof window.__IFTO_getFilesCheckboxState === 'function')
    ? window.__IFTO_getFilesCheckboxState(todoFolder) : Promise.resolve([]);

  Promise.all([pListFiles, pStates]).then(function(res){
    var files = (res[0] || []).filter(function(n){ return n && !n.startsWith('.'); });
    var stateMap = {};
    (res[1] || []).forEach(function(s){ stateMap[s.name] = s.checked; });

    var html = '<div style="display:flex;flex-direction:column;gap:0">';
    html += '<div class="habit-header"><span class="habit-header-title">今日待办</span><span class="habit-header-count">'+dateStr+' \u00B7 '+files.length+'\u9879</span></div>';
    if(files.length === 0) {
      html += '<div class="habit-empty">\u4ECA\u65E5\u8FD8\u6CA1\u6709\u5F85\u529E</div>';
    } else {
      html += '<div style="display:flex;flex-direction:column;gap:4px">';
      for(var i=0;i<files.length;i++){
        var fn = files[i];
        var nm = fn.replace(/\.md$/i, '');
        var fullPath = todoFolder+'/'+fn;
        var checkedCls = stateMap[fn] ? ' checked' : '';
        html += '<div class="wn-card todo-widget-item" data-path="'+fullPath+'" data-name="'+escHtml(fn)+'">';
        html += '<span class="cb'+checkedCls+'" data-toggle="1"></span>';
        html += '<span class="wn-card-title" style="flex:1">'+escHtml(nm)+'</span>';
        html += '</div>';
      }
      html += '</div>';
    }
    html += '</div>';
    body.innerHTML = html;

    // Wire click: cb toggles, title opens file
    body.querySelectorAll('.todo-widget-item').forEach(function(item){
      var cb = item.querySelector('.cb');
      if(cb){
        cb.onclick = function(e){
          e.stopPropagation();
          var fp = item.getAttribute('data-path');
          var newChecked = !cb.classList.contains('checked');
          cb.classList.toggle('checked', newChecked);
          if(fp && typeof window.__IFTO_setCheckboxState === 'function'){
            window.__IFTO_setCheckboxState(fp, newChecked).then(function(ok){
              if(!ok) cb.classList.toggle('checked', !newChecked);
              if(typeof renderTodo === 'function') { try { renderTodo(); } catch(e){} }
            }).catch(function(){
              cb.classList.toggle('checked', !newChecked);
            });
          }
        };
      }
      item.onclick = function(){
        var fp = this.getAttribute('data-path');
        if(fp && window.__IFTO_openFile) window.__IFTO_openFile(fp);
      };
    });
  }).catch(function(e){
    console.error('IFTO: renderTodoWidgetPage error', e);
    body.innerHTML = '<div style="text-align:center;color:#ef4444;font-size:12px;padding:20px">加载失败</div>';
  });
}

// ====== Theme detection ======
// IFTO-HOME's dark-mode styles are scoped to `.theme-dark{...}` on the root.
// Obsidian toggles `body.theme-dark` / `body.theme-light` when the user
// switches theme — we mirror that onto <html> so our scoped rules update.
// Previously this was a one-shot check on script load, so switching from
// dark back to light left <html class="theme-dark"> stuck, making IFTO
// keep rendering dark colors (white text on light cards, etc.) until reload.
(function syncIftoTheme(){
  function apply(){
    var isDark = document.body.classList.contains('theme-dark');
    document.documentElement.classList.toggle('theme-dark', isDark);
    document.documentElement.classList.toggle('theme-light', !isDark);
  }
  apply();
  try {
    var mo = new MutationObserver(apply);
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.__IFTO_THEME_OBSERVER = mo;
  } catch(e) { console.error('IFTO: theme observer error', e); }
})();

// ====== Widget Carousel (Dynamic) ======
var widgetRenderers = {
  deepseek: renderDeepSeekPage,
  minimax: renderMinimaxPage,
  calendar: renderCalPage,
  habits: renderHabitPage,
  ollama: renderOllamaPage,
  ragflow: renderRagflowPage,
  weeknotes: renderWeekNotesPage,
  todotoday: renderTodoWidgetPage
};
var widgetTitles = {
  deepseek: '',
  minimax: 'MiniMax',
  calendar: '\u65E5\u5386',
  habits: '\u4E60\u60EF\u6253\u5361',
  ollama: 'Ollama',
  ragflow: 'Ragflow',
  weeknotes: '\u672C\u5468\u7B14\u8BB0',
  todotoday: '\u4ECA\u65E5\u5F85\u529E'
};

function getWidgetList() {
  var order = (window.__IFTO_SETTINGS&&window.__IFTO_SETTINGS.widgetOrder) || 'deepseek,minimax,calendar,habits,ollama,ragflow,weeknotes,todotoday';
  var ids = order.split(',').map(function(s){return s.trim()}).filter(function(s){return s});
  // Append any known widget renderer not present in saved order (forward-compat)
  Object.keys(widgetRenderers).forEach(function(k){
    if(ids.indexOf(k) === -1) ids.push(k);
  });
  var list = [];
  for(var i=0;i<ids.length;i++) {
    var id = ids[i];
    var key = 'widget'+id.charAt(0).toUpperCase()+id.slice(1)+'Enabled';
    var enabled = true;
    if(window.__IFTO_SETTINGS && window.__IFTO_SETTINGS[key] !== undefined) {
      enabled = window.__IFTO_SETTINGS[key];
    }
    if(enabled && widgetRenderers[id]) list.push(id);
  }
  return list;
}

var curWidget = 0;
var _widgetList = getWidgetList();

function renderWidget() {
  if(window.__IFTO_refreshSettings) window.__IFTO_refreshSettings();
  _widgetList = getWidgetList();
  if(_widgetList.length===0) {
    var card = document.getElementById('widgetCard');
    if(card) card.innerHTML='<div style="display:flex;align-items:center;justify-content:center;flex:1;padding:20px;text-align:center;color:var(--g4);font-size:12px">所有组件已关闭，请在插件设置中启用</div>';
    var dotsEl = document.getElementById('widgetDots');
    if(dotsEl) dotsEl.innerHTML='';
    return;
  }
  if(curWidget >= _widgetList.length) curWidget = 0;
  var card = document.getElementById('widgetCard');
  if(!card) return;
  var id = _widgetList[curWidget];
  card.innerHTML = '<div style="display:flex;flex-direction:column;flex:1;min-height:0"><div id="widgetBody" style="display:flex;flex-direction:column;flex:1;overflow-y:auto;overflow-x:hidden;padding:0 2px;min-height:0"></div></div>';
  renderPage();
  updateWidgetDots();
}

function renderPage() {
  var id = _widgetList[curWidget];
  if(id && widgetRenderers[id]) widgetRenderers[id]();
}

function widgetPrev() {
  if(_widgetList.length<=1) return;
  curWidget = (curWidget-1+_widgetList.length)%_widgetList.length;
  renderWidget();
  updateWidgetDots();
}
function widgetNext() {
  if(_widgetList.length<=1) return;
  curWidget = (curWidget+1)%_widgetList.length;
  renderWidget();
  updateWidgetDots();
}
function goToWidget(i) {
  curWidget = i;
  renderWidget();
  updateWidgetDots();
}
function updateWidgetDots() {
  var dotsEl = document.getElementById('widgetDots');
  if(!dotsEl) return;
  if(_widgetList.length<=1){dotsEl.innerHTML='';return}
  dotsEl.innerHTML = _widgetList.map(function(_,i){
    return '<span class="widget-dot'+(i===curWidget?' active':'')+'" onclick="goToWidget('+i+')"></span>';
  }).join('');
}

// ====== DeepSeek Token - balance fetch ======
function fetchDeepSeek(apiKey) {
  return new Promise(function(resolve){
    var url = 'https://api.deepseek.com/user/balance';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
    xhr.timeout = 10000;
    xhr.onload = function(){
      try {
        if (xhr.status < 200 || xhr.status >= 300) {
          resolve({error: 'HTTP ' + xhr.status + ': ' + xhr.statusText});
          return;
        }
        var data = JSON.parse(xhr.responseText);
        var total = 0;
        if (data && data.balance_infos && data.balance_infos[0]) {
          var raw = data.balance_infos[0].total_balance;
          if (raw !== undefined && raw !== null) total = parseFloat(raw);
        } else if (data && data.balance !== undefined) {
          total = parseFloat(data.balance);
        }
        var avail = data ? data.is_available !== false : true;
        var today = new Date();
        var ymd = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
        var midnightKey = 'ds_' + ymd + '_midnight';
        var midnight = localStorage.getItem(midnightKey);
        var usage = null;
        if (midnight !== null) {
          midnight = parseFloat(midnight);
          usage = Math.max(0, midnight - total);
        } else {
          localStorage.setItem(midnightKey, String(total));
          midnight = total;
          usage = 0;
        }
        var monthly = 0;
        var monthPrefix = 'ds_' + today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0');
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (key && key.indexOf(monthPrefix) === 0 && key.indexOf('_midnight') < 0) {
            var val = parseFloat(localStorage.getItem(key));
            if (!isNaN(val)) monthly += val;
          }
        }
        resolve({
          balance: total,
          avail: avail,
          usage: usage,
          midnight: midnight,
          monthly: monthly
        });
      } catch(e) {
        resolve({error: '\u89E3\u6790\u5931\u8D25: ' + e.message});
      }
    };
    xhr.onerror = function(){ resolve({error: '\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25'}); };
    xhr.ontimeout = function(){ resolve({error: '\u8BF7\u6C42\u8D85\u65F6'}); };
    xhr.send();
  });
}

// ====== DeepSeek Token ======
function renderDeepSeekPage() {
  var dsKey = (window.__IFTO_SETTINGS&&window.__IFTO_SETTINGS.deepseekKey) || localStorage.getItem('ifto_deepseek_key');
  var body = document.getElementById('widgetBody');
  if(!body) return;
  if(!dsKey) {
    body.innerHTML = '<div class="token-error"><div class="token-error-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#bbb" stroke-width="1.5"/><path d="M12 8v4M12 16v0" stroke="#bbb" stroke-width="1.5" stroke-linecap="round"/></svg></div><div class="token-error-title">未配置 API 密钥</div><div style="font-size:12px;color:var(--g4);margin-top:6px">请在插件设置中填写 DeepSeek API Key</div><span class="token-setup-btn" onclick="setTokenKey()">设置 API Key</span></div>';
    return;
  }
  body.innerHTML = '<div class="token-loading">查询中...</div>';
  fetchDeepSeek(dsKey).then(function(data){
    if(!data || data.error) {
      body.innerHTML = '<div class="token-error"><div class="token-error-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#bbb" stroke-width="1.5"/><path d="M12 8v4M12 16v0" stroke="#bbb" stroke-width="1.5" stroke-linecap="round"/></svg></div><div class="token-error-title">查询失败</div><div style="font-size:12px;color:var(--g4);margin-top:6px">'+(data&&data.error||'无法获取余额信息')+'</div><span class="token-setup-btn" onclick="renderDeepSeekPage()">重新查询</span></div>';
      return;
    }
    var b = data;
    var html = '<div class="token-section">'+
'<div class="token-logo"><svg width="121" height="26" viewBox="0 0 121 26" fill="none" style="width:240px;height:auto;display:block;margin:0 auto" xmlns="http://www.w3.org/2000/svg"><path d="M24.1325 0C24.9975 0.0793117 24.8022 1.26571 25.2204 1.66113C26.7587 3.11549 27.6878 2.48738 28.4411 4.80859C29.8863 3.35444 30.6801 3.83209 32.4225 3.47949C32.9369 3.37048 33.8403 2.24753 34.2155 2.15332C35.2445 1.895 34.6814 4.06635 34.5934 4.42871C33.903 7.27267 31.9302 8.42088 29.2252 8.86816C29.3134 13.6312 27.4165 17.1715 24.2623 20.5781C25.0139 21.0084 27.1242 21.5466 27.5641 22.1572C28.1433 24.1638 22.7763 23.4761 21.7213 22.8955C20.5384 23.8392 19.0972 24.8237 17.5504 25.1084C15.1529 25.5496 11.8539 25.5804 9.50942 24.9004C8.27118 24.5412 6.98621 23.7888 5.93227 23.1143C3.03868 21.1559 1.01693 18.1518 0.292622 14.7344C-1.1699 7.85142 2.95924 1.43343 10.2311 1.58301C10.7182 1.59319 12.5211 1.82506 12.7956 1.77441C14.605 1.43819 16.9496 -0.137631 18.7614 1.05957C17.7863 1.6865 16.556 2.61789 17.8825 3.85254C18.5287 4.45389 19.3737 4.91331 20.0426 5.54395C20.9411 6.3911 24.3821 10.2461 25.5211 9.85938C25.8091 9.52909 26.0056 8.65407 26.1247 8.21582C24.2773 6.78237 23.2004 5.47129 23.2165 2.99902C23.2227 2.03961 23.4279 0.694291 24.1325 0ZM4.16567 9.15039C3.72576 9.18801 2.74291 9.20489 2.43715 9.54492C2.14702 9.92535 2.31398 10.5488 2.36098 10.9814C2.75726 14.6271 4.52232 18.228 7.48891 20.458C8.5146 21.2289 9.83114 22.0457 11.1862 21.875C13.1386 21.6289 10.7942 19.8205 11.32 18.7773C11.3658 18.6833 11.4653 18.6398 11.567 18.6162C12.8145 18.6926 14.3977 20.0086 15.4176 20.707C15.7713 20.9491 16.2236 21.3084 16.4704 21.5088C17.8797 22.5945 19.2806 22.885 21.0436 22.6621C21.0928 22.6559 21.1419 22.6496 21.1911 22.6426C19.974 21.757 19.1109 20.9957 18.1286 19.835C16.9041 18.3881 15.9469 16.7874 14.8434 15.2559C13.0862 12.817 10.6656 10.8444 7.80239 9.86816C6.78248 9.52043 5.25605 9.12231 4.16567 9.15039ZM22.8209 13.3555C21.9771 11.9609 20.5849 9.99977 18.734 10.2129C18.4131 10.3663 17.9831 10.5439 18.1022 10.9551C18.7435 11.5511 19.461 11.1095 20.0368 12.1094C19.9934 12.5673 19.8744 13.3218 20.0348 13.7383C20.3551 14.5695 21.3956 15.1447 22.276 14.917C23.2747 14.5687 23.411 14.3307 22.8209 13.3555ZM18.6051 11.9971C18.4454 12.0363 18.3209 12.1616 18.2819 12.3213C18.243 12.4811 18.2958 12.6495 18.4196 12.7578C18.5434 12.8661 18.7174 12.8966 18.8707 12.8369C19.0872 12.7525 19.2014 12.5145 19.1315 12.293C19.0613 12.0714 18.8308 11.9416 18.6051 11.9971Z" fill="currentColor"/><path d="M69.561 9.35254L71.5799 9.3546C71.5721 9.63977 71.5305 9.9425 71.6813 10.1671C71.8617 10.1371 72.0506 10.0176 72.2105 9.92355C72.9454 9.45314 73.3358 9.36761 74.1667 9.35985C77.0455 9.34866 78.3875 11.2711 78.3271 14.0743C78.2384 18.2018 76.4596 18.8739 72.972 18.8559L72.9708 16.9624C75.0235 16.9966 76.1326 17.0265 76.6388 14.6883C76.6479 14.5622 76.6545 14.4361 76.6594 14.3098C76.7197 12.5821 75.9823 11.2645 74.174 11.2445C72.9967 11.1859 71.8756 11.8728 71.6771 13.1496C71.5148 14.1955 71.5745 15.4181 71.5745 16.499L71.5781 21.9201L69.5652 21.9202L69.561 9.35254Z" fill="currentColor"/><path d="M44.6193 6.42993L46.7639 6.43707L46.7611 18.984L44.6256 18.9852C44.64 18.7051 44.7202 18.4181 44.5067 18.2284C44.226 18.1762 43.5128 18.7265 43.138 18.816C40.163 19.5256 37.5911 18.136 37.4371 14.9905C37.3614 13.4435 37.4131 12.5843 38.1243 11.1899C39.24 9.41347 41.2697 9.49989 43.1134 9.50941L43.108 11.4018C42.1333 11.3933 40.8616 11.286 40.0659 11.9304C38.9301 12.8503 38.9258 15.3479 39.8716 16.3787C40.7494 17.3354 42.9628 17.3358 43.8887 16.4258C44.6104 15.7163 44.6298 14.4883 44.6216 13.5469C44.6176 12.991 44.624 12.4195 44.624 11.8597L44.6193 6.42993Z" fill="currentColor"/><path d="M105.198 9.39515C106.391 9.20961 108.136 9.63905 108.966 10.507C110.139 11.7321 110.2 13.371 110.185 14.9446L104.643 14.948L104.641 13.4314L108.365 13.4279C108.294 13.2066 108.194 12.8805 108.103 12.6725C107.866 12.1291 107.42 11.7007 106.862 11.4819C106.151 11.2033 105.083 11.2173 104.388 11.5308C102.675 12.304 102.698 14.59 103.381 16.0282C104.328 17.4814 106.841 17.4083 107.92 16.1049L109.965 16.1066C109.311 17.8156 108.536 18.678 106.573 18.9378C105.311 19.1046 103.673 18.949 102.656 18.1229C100.725 16.5553 100.692 12.6154 102.163 10.735C102.922 9.77215 104.044 9.51624 105.198 9.39515Z" fill="currentColor"/><path d="M62.82 9.39597C64.0113 9.20775 65.7563 9.64108 66.5861 10.5066C67.7669 11.7374 67.8086 13.3667 67.8073 14.946L62.2632 14.9476L62.2601 13.43L65.979 13.4297C65.9143 13.2127 65.8309 12.9223 65.7457 12.7168C65.5087 12.1552 65.0533 11.7104 64.481 11.4818C63.7718 11.2031 62.7024 11.2213 62.0094 11.5323C60.3142 12.2929 60.3086 14.558 60.9829 15.9911C61.8551 17.4667 64.4617 17.4279 65.5323 16.1053L67.5921 16.108C66.9482 17.7945 66.1563 18.6651 64.2396 18.9319C62.9761 19.1078 61.3114 18.9583 60.2893 18.132C58.344 16.56 58.3118 12.6313 59.7829 10.7353C60.5344 9.77552 61.6716 9.5162 62.82 9.39597Z" fill="currentColor"/><path d="M52.4196 9.38934C53.6898 9.22785 55.3975 9.59808 56.2902 10.496C57.5013 11.7143 57.5893 13.3641 57.5769 14.9423L51.8664 14.9455L51.8639 13.428L55.6721 13.426C55.6157 13.2197 55.5122 12.8761 55.4259 12.6833C55.172 12.1229 54.6927 11.6839 54.0963 11.4653C53.3494 11.19 52.288 11.2176 51.5596 11.5353C49.8497 12.2811 49.8169 14.5448 50.5103 15.9722C51.2935 17.2458 53.3207 17.3579 54.5502 16.6802C54.8281 16.5271 55.0263 16.3243 55.2421 16.1033L57.3362 16.1042C56.659 17.8262 55.8031 18.707 53.8035 18.9409C52.4848 19.102 50.8659 18.9464 49.795 18.1179C47.8037 16.5771 47.786 12.5649 49.2951 10.7211C50.0717 9.77214 51.2368 9.50922 52.4196 9.38934Z" fill="currentColor"/><path d="M94.5135 9.39192C95.7652 9.21999 97.4993 9.61496 98.375 10.4987C99.5799 11.7145 99.6721 13.3704 99.6645 14.9441L93.96 14.9472L93.9568 13.4302L97.7574 13.4272C97.5031 12.5817 97.1482 11.7617 96.2059 11.4757C92.8704 10.463 91.3285 13.3587 92.5872 15.9502C93.3598 17.2473 95.4231 17.3693 96.6569 16.6689C96.9227 16.5179 97.122 16.3154 97.334 16.1046L99.4172 16.1063C98.7286 17.8323 97.9099 18.6946 95.8907 18.9416C94.5807 19.102 92.9383 18.9434 91.8845 18.1197C89.8967 16.566 89.8698 12.6025 91.3752 10.7404C92.1651 9.76845 93.3047 9.51472 94.5135 9.39192Z" fill="currentColor"/><path d="M83.7924 9.40524C84.7186 9.22225 86.6001 9.53111 87.3645 10.0941C88.1682 10.6861 88.3087 11.315 88.4593 12.2199C88.1501 12.2224 86.5622 12.3181 86.3208 12.0783C86.2027 11.8644 86.0664 11.6481 85.9004 11.4689C85.4202 10.949 83.0715 10.9911 82.7076 11.5808C81.5215 13.5024 84.7484 13.3588 85.8375 13.4432C88.3541 13.6382 89.7387 15.7175 88.2167 17.8849C87.6003 18.7444 85.8108 18.944 84.6949 18.995C82.4165 19.0223 80.1481 18.8672 79.7905 16.1821L82.2268 16.1813C82.5167 17.3737 83.7308 17.2598 84.7416 17.2657C85.4158 17.2696 86.5889 16.9914 86.5 16.1004C86.3774 14.87 84.0574 15.0745 83.064 14.9716C80.5854 14.715 79.4191 12.598 80.8286 10.5128C81.3902 9.68867 82.7642 9.49704 83.7924 9.40524Z" fill="currentColor"/><path d="M111.648 6.1377L113.986 6.13925L113.985 18.9966L111.649 18.9976L111.648 6.1377Z" fill="currentColor"/><path d="M118.349 9.64502L121.001 9.64926C119.868 10.8968 118.592 12.5086 117.484 13.8204L120.969 18.9961L118.326 18.9977C118.056 18.5295 117.51 17.7631 117.197 17.2934L114.863 13.8228L118.349 9.64502Z" fill="currentColor"/></svg> </div>'+
      '<div class="token-title">Token 额度</div>'+
      '<div class="token-card">'+
        '<div class="token-label-row">'+
          '<span class="token-label">余额</span>'+
          '<span class="token-status'+(b.avail?'':' unavail')+'"><span class="token-status-dot'+(b.avail?'':' unavail')+'"></span>'+(b.avail?'可用':'不可用')+'</span>'+
        '</div>'+
        '<div class="token-big-amount">¥'+b.balance.toFixed(2)+'</div>'+
        '<hr class="token-divider">'+
        '<div class="token-label-row" style="margin-bottom:6px">'+
          '<span class="token-label">今日消耗</span>'+
          (b.usage!==null?'<span class="token-usage-value">-¥'+b.usage.toFixed(2)+'</span>':'<span class="token-usage-value" style="color:#999">—</span>')+
        '</div>'+
        (b.usage!==null?'<div class="token-usage-row"><span class="token-usage-sub">0点余额 ¥'+b.midnight.toFixed(2)+'</span></div>':'')+
        '<hr class="token-divider">'+
        '<div class="token-usage-row">'+
          '<span class="token-usage-label">本月消费</span>'+
          (b.monthly!==null?'<span class="token-usage-value">-¥'+b.monthly.toFixed(2)+'</span>':'<span class="token-usage-value" style="color:#999">¥0.00</span>')+
        '</div>'+
      '</div>'+
      '<div class="token-footer">'+
        '<span class="token-refresh" onclick="renderWidget()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8a6 6 0 0 1 10.47-4M14 8a6 6 0 0 1-10.47 4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M14 2v4h-4M2 14v-4h4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
        '<span class="token-recharge" onclick="window.open(\'https://platform.deepseek.com/top_up\',\'_blank\')">前往充值</span>'+
      '</div>'+
    '</div>';
  body.innerHTML = html;
});
}

// ====== MiniMax Token - balance fetch ======
function fetchMinimax(apiKey, apiUrl) {
  return new Promise(function(resolve){
    var url = apiUrl || 'https://www.minimaxi.com/v1/token_plan/remains';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.timeout = 10000;
    xhr.onload = function(){
      try {
        if (xhr.status < 200 || xhr.status >= 300) {
          resolve({error: 'HTTP ' + xhr.status + ': ' + xhr.statusText});
          return;
        }
        var data;
        try { data = JSON.parse(xhr.responseText); }
        catch(e) { resolve({error: '\u8FD4\u56DE\u975E JSON: ' + (xhr.responseText||'').substring(0, 200)}); return; }
        if (data && data.base_resp && data.base_resp.status_code !== undefined && data.base_resp.status_code !== 0) {
          resolve({error: '\u540E\u7AEF\u62A5\u9519: ' + (data.base_resp.status_msg || ('code ' + data.base_resp.status_code))}); return;
        }
        var total = 0;
        var totalCredits = null;
        var usedCredits = null;
        var windows = [];
        var weekly = null;
        if (data && data.remaining_credits !== undefined) {
          total = parseFloat(data.remaining_credits);
          if (data.total_credits !== undefined) totalCredits = parseFloat(data.total_credits);
          if (data.used_credits !== undefined) usedCredits = parseFloat(data.used_credits);
        } else if (data && Array.isArray(data.model_remains) && data.model_remains.length > 0) {
          var nowMs = Date.now();
          // Token Plan 共享 5h 额度,API 按 model 列举,取第一条(general = 文本主额度)
          var entry = data.model_remains[0] || {};
          var usedPct2 = 0;
          // MiniMax 真实字段: current_interval_remaining_percent (0-100, 直接给剩余百分比)
          if (entry.current_interval_remaining_percent !== undefined && entry.current_interval_remaining_percent !== null) {
            usedPct2 = 100 - parseFloat(entry.current_interval_remaining_percent);
          } else {
            // fallback: 旧启发式 (从 used/total/remaining 推断)
            var usedVal = null, totalVal = null, remainsVal = null;
            for (var k2 in entry) {
              if (typeof entry[k2] !== 'number') continue;
              if (/used/i.test(k2)) usedVal = entry[k2];
              else if (/total/i.test(k2)) totalVal = entry[k2];
              else if (/remain|current|left/i.test(k2)) remainsVal = entry[k2];
            }
            if (usedVal !== null && totalVal !== null && totalVal > 0) {
              usedPct2 = (usedVal / totalVal) * 100;
            } else if (usedVal !== null) {
              usedPct2 = usedVal;
            } else if (remainsVal !== null && totalVal !== null && totalVal > 0) {
              usedPct2 = ((totalVal - remainsVal) / totalVal) * 100;
            } else if (remainsVal !== null) {
              usedPct2 = 100 - remainsVal;
            }
          }
          usedPct2 = Math.max(0, Math.min(100, usedPct2));
          // 重置倒计时: 优先 end_time - now, 备选 remains_time 字段
          var startMs2 = entry.start_time || entry.startTime || 0;
          var endMs2 = entry.end_time || entry.endTime || 0;
          var resetInMin2 = 0;
          if (endMs2 > nowMs) {
            resetInMin2 = Math.ceil((endMs2 - nowMs) / 60000);
          } else if (typeof entry.remains_time === 'number' && entry.remains_time > 0) {
            resetInMin2 = Math.ceil(entry.remains_time / 60000);
          }
          windows.push({
            model: '5h \u7A97\u53E3',
            startTime: startMs2,
            endTime: endMs2,
            usedPct: usedPct2,
            resetInMin: resetInMin2
          });
          // 周限额: status=3 → 无限制;否则按 remaining 算
          if (entry.current_weekly_remaining_percent !== undefined || entry.current_weekly_status !== undefined) {
            var wStatus = entry.current_weekly_status;
            var wRemain = entry.current_weekly_remaining_percent !== undefined ? parseFloat(entry.current_weekly_remaining_percent) : null;
            var wUnlimited = (wStatus === 3) || (wRemain === 100 && wStatus === undefined);
            if (wUnlimited) {
              weekly = { unlimited: true, usedPct: 0 };
            } else if (wRemain !== null) {
              weekly = { unlimited: false, usedPct: Math.max(0, Math.min(100, 100 - wRemain)) };
            }
          }
          total = usedPct2;
        } else if (data && (data.remains !== undefined || data.total_remains !== undefined)) {
          if (data.remains !== undefined) total = parseFloat(data.remains);
          else total = parseFloat(data.total_remains);
          if (data.total !== undefined) totalCredits = parseFloat(data.total);
          else if (data.total_remains !== undefined) totalCredits = parseFloat(data.total_remains);
          if (data.used !== undefined) usedCredits = parseFloat(data.used);
        } else if (data && data.data && (data.data.remains !== undefined || data.data.remaining_credits !== undefined)) {
          var d2 = data.data;
          if (d2.remains !== undefined) total = parseFloat(d2.remains);
          else total = parseFloat(d2.remaining_credits);
          if (d2.total !== undefined) totalCredits = parseFloat(d2.total);
          if (d2.used !== undefined) usedCredits = parseFloat(d2.used);
        } else if (data && data.balance_breakdown && data.balance_breakdown.total_balance !== undefined) {
          total = parseFloat(data.balance_breakdown.total_balance);
        } else if (data && data.balance_infos && data.balance_infos[0]) {
          var raw = data.balance_infos[0].total_balance;
          if (raw !== undefined && raw !== null) total = parseFloat(raw);
        } else if (data && data.credit_grants && data.credit_grants.total_available !== undefined) {
          total = parseFloat(data.credit_grants.total_available);
        } else if (data && data.total_available !== undefined) {
          total = parseFloat(data.total_available);
        } else if (data && data.balance !== undefined) {
          total = parseFloat(data.balance);
        } else {
          resolve({error: '\u672A\u80FD\u89E3\u6790\u4F59\u989D\u5B57\u6BB5,\u539F\u6587: ' + (xhr.responseText||'').substring(0, 1000)});
          return;
        }
        if (isNaN(total)) { resolve({error: '\u4F59\u989D\u975E\u6570\u5B57: ' + total}); return; }
        var today = new Date();
        var ymd = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
        var midnightKey = 'mn_' + ymd + '_midnight';
        var midnight = localStorage.getItem(midnightKey);
        var usage = null;
        if (midnight !== null) {
          midnight = parseFloat(midnight);
          usage = Math.max(0, midnight - total);
        } else {
          localStorage.setItem(midnightKey, String(total));
          midnight = total;
          usage = 0;
        }
        var monthly = 0;
        var monthPrefix = 'mn_' + today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0');
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (key && key.indexOf(monthPrefix) === 0 && key.indexOf('_midnight') < 0) {
            var val = parseFloat(localStorage.getItem(key));
            if (!isNaN(val)) monthly += val;
          }
        }
        resolve({
          mode: 'plan',
          windows: windows,
          weekly: weekly,
          balance: total,
          total: totalCredits,
          used: usedCredits,
          avail: true,
          usage: null,
          midnight: null,
          monthly: null
        });
      } catch(e) {
        resolve({error: '\u89E3\u6790\u5931\u8D25: ' + e.message});
      }
    };
    xhr.onerror = function(){ resolve({error: '\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25 (\u53EF\u80FD CORS \u88AB\u62D2)'}); };
    xhr.ontimeout = function(){ resolve({error: '\u8BF7\u6C42\u8D85\u65F6'}); };
    xhr.send();
  });
}

// ====== MiniMax Token ======
function renderMinimaxPage() {
  var mnKey = (window.__IFTO_SETTINGS&&window.__IFTO_SETTINGS.minimaxKey) || localStorage.getItem('ifto_minimax_key');
  var mnUrl = (window.__IFTO_SETTINGS&&window.__IFTO_SETTINGS.minimaxApiUrl) || 'https://www.minimaxi.com/v1/token_plan/remains';
  var body = document.getElementById('widgetBody');
  if(!body) return;
  if(!mnKey) {
    body.innerHTML = '<div class="token-error"><div class="token-error-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#bbb" stroke-width="1.5"/><path d="M12 8v4M12 16v0" stroke="#bbb" stroke-width="1.5" stroke-linecap="round"/></svg></div><div class="token-error-title">\u672A\u914D\u7F6E API \u5BC6\u94A5</div><div style="font-size:12px;color:var(--g4);margin-top:6px">\u8BF7\u5728\u63D2\u4EF6\u8BBE\u7F6E\u4E2D\u586B\u5199 MiniMax API Key</div><span class="token-setup-btn" onclick="setTokenKey()">\u8BBE\u7F6E API Key</span></div>';
    return;
  }
  body.innerHTML = '<div class="token-loading">\u67E5\u8BE2\u4E2D...</div>';
  fetchMinimax(mnKey, mnUrl).then(function(data){
    if(!data || data.error) {
      body.innerHTML = '<div class="token-error"><div class="token-error-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#bbb" stroke-width="1.5"/><path d="M12 8v4M12 16v0" stroke="#bbb" stroke-width="1.5" stroke-linecap="round"/></svg></div><div class="token-error-title">\u67E5\u8BE2\u5931\u8D25</div><div style="font-size:12px;color:var(--g4);margin-top:6px">'+(data&&data.error||'\u65E0\u6CD5\u83B7\u53D6\u4F59\u989D\u4FE1\u606F')+'</div><span class="token-setup-btn" onclick="renderMinimaxPage()">\u91CD\u65B0\u67E5\u8BE2</span></div>';
      return;
    }
    var b = data;
    if (b.mode !== 'plan') {
      // 兜底:旧 balance 渲染
      var balText2 = (b.balance % 1 === 0) ? b.balance.toFixed(0) : b.balance.toFixed(2);
      var totalRow2 = '';
      if(b.total !== null && b.used !== null) {
        totalRow2 = '<div class="token-usage-row"><span class="token-usage-sub">\u603B\u989D '+b.total+' \u00B7 \u5DF2\u7528 '+b.used+'</span></div>';
      }
      var htmlLegacy = '<div class="token-section">'+
'<div class="token-logo" style="display:block;text-align:center;margin:0 auto 6px"><svg width="200" viewBox="0 0 532 127" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:200px;height:auto;display:inline-block"><path d="M242.658 32.0206C246.102 31.8118 251.125 31.9255 254.625 32.0228C254.922 34.5364 254.801 39.568 254.803 42.2778L254.811 60.6297L254.809 79.7618C254.808 83.0451 254.95 88.1395 254.575 91.2595C253.366 92.0215 244.708 91.7531 242.509 91.8146C241.998 88.0545 242.276 74.9741 242.284 70.4965C242.303 65.1999 242.03 57.9428 242.36 52.8424C239.846 56.1117 235.15 64.0186 232.793 67.7782C230.284 67.9348 228.399 67.9212 225.91 67.8635C223.675 65.052 218.249 55.7856 216.156 52.3627C215.856 61.0924 216.219 70.4905 216.072 79.2795C216.002 83.4331 216.241 87.6513 215.941 91.8056C212.354 91.6031 207.553 91.7228 203.874 91.7058C203.202 78.802 204.138 65.0947 203.778 52.1097C203.599 45.6435 203.675 38.4952 203.881 32.0179C207.472 31.8301 212.151 31.9288 215.771 32.0182C217.243 33.7558 218.774 36.3848 220.073 38.3102C223.186 42.9258 226.183 48.1281 229.513 52.5431C230.563 50.4761 232.931 46.9507 234.231 44.9299C236.989 40.5939 239.798 36.2905 242.658 32.0206Z" fill="currentColor"/><path d="M405.846 32.0108C409.304 31.8018 414.432 31.9346 417.95 32.0456L417.945 91.8545C415.326 91.6323 407.16 92.2178 405.876 91.2156C405.039 88.9296 405.386 73.3174 405.397 69.8098C405.386 63.8372 405.419 58.4537 405.665 52.4789L395.994 67.7821C393.457 67.9436 391.325 67.9108 388.799 67.8646C386.068 62.9673 382.411 57.2588 379.248 52.5642C379.056 65.3688 379.543 79.1232 379.106 91.766L367.108 91.743C366.794 89.2439 366.892 85.5568 366.889 82.9443L366.878 69.259C366.876 57.5291 366.837 45.7258 366.93 33.9912C366.936 33.1896 366.968 32.4921 367.515 31.9838C370.776 31.9327 375.754 31.7952 378.876 32.1103C380.265 33.6925 382.465 37.3039 383.69 39.201C386.511 43.6594 389.381 48.0877 392.298 52.4849C396.098 46.3058 401.688 38.0244 405.846 32.0108Z" fill="currentColor"/><path d="M284.748 31.9931C288.288 31.8969 292.003 31.963 295.559 31.9788C297.177 33.9931 299.963 39.017 301.546 41.4721C307.436 50.6098 312.813 60.3028 318.743 69.4011C318.931 65.5093 318.647 60.8358 318.557 56.9201C318.486 51.9719 318.458 47.0232 318.477 42.0745C318.477 39.2922 318.335 34.5665 318.803 31.9685C322.072 31.9389 327.635 31.7782 330.691 32.1748C331.383 50.9216 330.472 72.12 330.653 91.0945C330.656 91.4634 330.478 91.5238 330.213 91.7654L319.278 91.7086C317.042 88.6864 314.281 83.654 312.215 80.3167C306.767 71.5671 301.401 62.7675 296.114 53.919C296.015 64.3431 296.256 74.7382 296.24 85.1618C296.234 87.4439 296.3 89.7102 296.081 91.9846C293.829 91.5449 286.934 91.7529 284.256 91.7898C283.763 72.6677 284.403 52.0602 284.329 32.816C284.329 32.3773 284.477 32.3139 284.748 31.9931Z" fill="currentColor"/><path d="M444.042 32.0152C448.189 31.843 455.162 31.8329 459.238 32.0699C460.285 34.3919 461.114 37.4067 461.923 39.8566C465.974 52.122 469.779 64.4571 473.885 76.7077C475.533 81.622 477.316 86.8364 478.639 91.8327C474.749 91.5878 469.26 91.7297 465.293 91.7398C464.181 89.1491 463.246 85.269 462.491 82.4739L459.55 82.2408C453.38 82.1828 447.21 82.2197 441.041 82.3515C440.013 84.9421 438.922 89.1562 438.124 91.9554C435.131 91.6089 427.026 92.1126 425.265 91.3006C425.115 88.8069 442.022 38.2583 444.042 32.0152ZM443.963 72.7658C446.574 72.7429 449.184 72.7401 451.795 72.7579C454.318 72.753 456.838 72.733 459.361 72.6978C458.582 70.1771 452.011 47.6942 451.191 47.1118C450.939 49.1296 450.34 51.0922 449.788 53.0433C447.916 59.6363 445.729 66.1423 443.963 72.7658Z" fill="currentColor"/><path d="M519.087 32.0512C520.864 31.8959 530.76 31.6787 531.834 32.4393C531.594 34.6287 517.125 58.5271 514.954 61.7193C517.871 67.0766 531.555 87.809 531.949 91.7957C527.928 91.63 523.139 91.7386 519.036 91.7159C516.89 88.7549 514.282 83.4981 512.543 80.225C510.859 77.0525 509.4 74.6717 507.508 71.5905C503.856 77.4994 499.288 86.4077 495.639 91.7323C493.69 91.7427 484.672 91.9378 483.283 91.5431C482.619 89.9295 486.541 83.9868 487.564 82.2647L495.811 68.5339C497.022 66.4764 498.711 63.7701 499.537 61.5957C496.626 56.4565 493.646 51.3572 490.598 46.2988C489.196 44.002 482.794 34.0217 482.917 32.2723L483.398 32.0047C487.49 31.9282 491.585 31.9238 495.68 31.9911C496.82 33.5634 498.785 37.2672 499.848 39.1126C502.372 43.483 504.919 47.8389 507.494 52.1806C509.637 48.7075 511.66 45.1619 513.563 41.5504C514.924 38.9773 517.316 34.2617 519.087 32.0512Z" fill="currentColor"/><path d="M344.865 32.0127C348.344 31.8326 353.186 31.9149 356.69 32.0379C356.955 41.028 356.676 51.4802 356.761 60.4938C356.794 64.0192 357.029 90.8783 356.406 91.7985C352.543 91.6698 348.317 91.7485 344.427 91.7477C343.998 73.5245 344.597 55.1086 344.356 36.8669C344.34 35.687 344.173 32.8709 344.865 32.0127Z" fill="currentColor"/><path d="M265.855 31.9962C269.611 31.9361 273.368 31.9358 277.124 31.9954C277.367 36.9947 277.553 89.9965 277.066 91.3125C276.949 91.6254 276.705 91.6505 276.416 91.7839C272.624 91.7038 268.692 91.7369 264.89 91.7164C264.75 86.2836 264.494 33.9187 265.11 32.313L265.855 31.9962Z" fill="currentColor"/><path d="M90.152 117.149C90.5071 108.307 90.2821 98.1757 90.2824 89.2285L90.2807 39.7923L90.284 21.4893C90.2854 17.9381 90.0426 13.9707 90.5675 10.5246C92.8495 -4.45876 115.5 -3.10579 115.683 12.4296C115.763 19.1578 115.771 25.9425 115.77 32.6341L115.784 80.4275C115.793 83.4645 115.676 86.5632 115.722 89.5977C115.805 95.127 115.419 97.473 121.167 99.0992L124.347 98.03C125.01 97.1743 125.751 96.2688 126.296 95.3402L126.294 61.1664C126.291 55.2384 125.971 48.79 126.707 42.9391C127.771 34.4707 137.785 29.7057 145.149 33.89C148.025 35.5246 150.964 38.4998 151.532 41.9008C152.458 47.4443 151.803 53.3556 151.998 58.9755C151.95 68.1149 152.097 77.3518 151.974 86.458C151.96 87.2148 151.934 87.9713 151.894 88.7273C151.057 89.8678 150.208 91.0228 148.701 91.2693C147.893 91.4002 147.066 91.1999 146.407 90.7134C143.707 88.6882 144.581 79.4084 144.602 75.9956L144.675 54.4529C144.687 48.8791 145.901 36.0043 136.047 40.9814C135.083 42.2736 134.434 43.1924 134.239 44.8498C133.718 49.2735 133.929 54.4611 133.937 58.9556L133.985 85.2014C133.991 89.0694 134.379 95.1609 133.099 98.6031C130.331 106.054 119.727 108.764 113.53 103.927C111.404 102.268 108.974 99.2536 108.669 96.4725C108.056 89.8905 108.301 82.5394 108.303 75.8953L108.309 32.296C108.309 26.5367 108.66 15.611 108.146 10.4443C106.908 9.01598 106.299 8.4258 104.595 7.441C101.213 7.58752 99.9265 7.83377 98.0234 10.8889C97.5871 19.495 97.8744 30.3578 97.8738 39.1027L97.8722 90.0479L97.9001 107.013C97.9222 113.579 99.037 119.81 93.7098 124.634C92.7702 125.498 91.7656 126.288 90.7055 126.999H79.2266C70.2468 120.495 72.4596 114.363 72.1964 104.318C72.16 102.931 72.6302 101.212 73.3869 100.079C74.2835 98.6452 76.8427 98.7168 78.1089 99.6228C82.9014 104.619 74.442 121.65 85.98 120.452C87.5682 120.287 88.961 118.801 89.9125 117.497C89.9956 117.383 90.0754 117.267 90.152 117.149Z" fill="currentColor"/><path d="M54.1038 104.615L54.0669 40.4261L54.071 21.8738C54.0727 18.0539 53.8504 13.8619 54.4081 10.1282C55.8872 0.22075 68.6299 -3.02492 75.7361 3.24176C77.2336 4.56232 78.7983 7.70773 79.2261 9.72221C79.8832 17.0421 79.6194 25.5635 79.6216 32.9113L79.6225 82.4877C79.6203 83.9196 79.7405 87.9724 79.1796 89.0156C77.3664 92.3885 74.4478 91.6025 72.5392 89.0389C71.9145 85.3025 72.2163 72.7201 72.2234 68.3417L72.2357 27.1659C72.2349 22.2011 72.4028 16.3243 72.0305 11.3922C71.7265 7.36531 64.7391 6.06593 62.6165 9.52387C61.9583 10.4054 61.7579 11.7878 61.7409 12.8655C61.619 20.6982 61.7144 28.5668 61.7144 36.4011L61.7051 84.4331C61.7048 90.2496 62.5268 102.697 60.8091 107.788C56.9793 119.139 38.5822 118.021 36.3628 105.77C35.7275 101.962 36.0889 96.8997 36.0941 92.9572L36.1403 60.0177C36.1438 54.7566 36.389 49.2861 35.8205 44.0744C35.4963 41.1028 33.1019 40.3296 30.6351 39.6043C24.6296 41.6019 25.2765 44.3469 25.3004 50.1282L25.3626 62.5089C25.4012 70.4582 26.1158 78.2179 17.032 81.5861C13.7767 82.793 9.66831 82.4528 6.56839 80.9223C3.13562 79.2272 1.75859 76.4928 0 73.3736V59.277C3.33753 55.4983 7.20821 56.5197 7.43193 61.4714C7.6428 66.1386 5.70722 74.7005 12.6884 75.1501C18.1363 75.5007 17.9462 67.2401 17.9311 64.1175L17.8683 52.0137C17.8443 46.7187 17.3132 39.8338 21.467 35.9138C29.5403 28.2952 43.3955 33.515 43.4341 44.9441C43.4516 50.1191 43.4827 55.2857 43.4759 60.4118L43.4701 88.1203C43.4701 92.8728 43.1366 98.4786 43.5371 103.119C44.1062 109.717 50.0841 109.227 53.7843 104.992C53.8939 104.869 54.0002 104.743 54.1038 104.615Z" fill="currentColor"/></svg></div>'+
        '<div class="token-title">Token \u989D\u5EA6</div>'+
        '<div class="token-card">'+
          '<div class="token-label-row">'+
            '<span class="token-label">\u4F59\u989D (credits)</span>'+
            '<span class="token-status'+(b.avail?'':' unavail')+'"><span class="token-status-dot'+(b.avail?'':' unavail')+'"></span>'+(b.avail?'\u53EF\u7528':'\u4E0D\u53EF\u7528')+'</span>'+
          '</div>'+
          '<div class="token-big-amount">'+balText2+'</div>'+
          totalRow2+
        '</div>'+
        '<div class="token-footer">'+
          '<span class="token-refresh" onclick="renderWidget()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8a6 6 0 0 1 10.47-4M14 8a6 6 0 0 1-10.47 4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M14 2v4h-4M2 14v-4h4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
          '<span class="token-recharge" onclick="window.open(\'https://platform.minimaxi.com/console/usage\',\'_blank\')">\u524D\u5F80\u67E5\u770B</span>'+
        '</div>'+
      '</div>';
      body.innerHTML = htmlLegacy;
      return;
    }
    // 套餐模式:逐模型展示 5h 窗口 + 周限额
    var cards = '';
    for (var wi2 = 0; wi2 < (b.windows||[]).length; wi2++) {
      var win = b.windows[wi2];
      var used = win.usedPct || 0;
      var resetTxt = '';
      if (win.endTime) {
        if (win.resetInMin <= 0) resetTxt = '\u7A97\u53E3\u5DF2\u91CD\u7F6E';
        else if (win.resetInMin < 60) resetTxt = win.resetInMin + ' \u5206\u949F\u540E\u91CD\u7F6E';
        else if (win.resetInMin < 60 * 24) {
          var hh = Math.floor(win.resetInMin / 60);
          var mm = win.resetInMin % 60;
          resetTxt = hh + ' \u5C0F\u65F6' + (mm > 0 ? (' ' + mm + ' \u5206\u949F') : '') + ' \u540E\u91CD\u7F6E';
        } else {
          var dd = Math.floor(win.resetInMin / 1440);
          resetTxt = dd + ' \u5929\u540E\u91CD\u7F6E';
        }
      }
      var barColor = used >= 90 ? '#e74c3c' : (used >= 70 ? '#e67e22' : '#4a90e2');
      cards += '<div class="token-card">'+
        '<div class="token-label-row">'+
          '<span class="token-label">'+win.model+'</span>'+
          '<span class="token-status"><span class="token-status-dot"></span>5h \u7A97\u53E3</span>'+
        '</div>'+
        '<div style="display:flex;align-items:center;gap:8px;margin:8px 0 4px">'+
          '<div style="flex:1;height:10px;background:var(--ifto-g6,var(--g6));border-radius:9999px;overflow:hidden">'+
            '<div style="height:100%;width:'+used.toFixed(1)+'%;background:'+barColor+';border-radius:9999px;transition:width 0.3s"></div>'+
          '</div>'+
          '<div style="min-width:54px;text-align:right;font-size:14px;font-weight:600;color:'+barColor+'">'+used.toFixed(0)+'%</div>'+
        '</div>'+
        '<div class="token-usage-row">'+
          '<span class="token-usage-sub">\u5DF2\u7528 '+used.toFixed(1)+'% \u00B7 '+resetTxt+'</span>'+
        '</div>'+
      '</div>';
    }
    if (b.weekly) {
      if (b.weekly.unlimited) {
        cards += '<div class="token-card">'+
          '<div class="token-label-row">'+
            '<span class="token-label">\u5468\u9650\u989D</span>'+
            '<span class="token-status"><span class="token-status-dot"></span>\u65E0\u9650\u5236</span>'+
          '</div>'+
          '<div class="token-usage-row"><span class="token-usage-sub">\u221E \u00B7 \u4E0D\u53D7\u5468\u9650\u989D\u7EA6\u675F</span></div>'+
        '</div>';
      } else {
        var wUsed = b.weekly.usedPct || 0;
        var wColor = wUsed >= 90 ? '#e74c3c' : (wUsed >= 70 ? '#e67e22' : '#4a90e2');
        cards += '<div class="token-card">'+
          '<div class="token-label-row">'+
            '<span class="token-label">\u5468\u9650\u989D</span>'+
            '<span class="token-status"><span class="token-status-dot"></span>\u672C\u5468</span>'+
          '</div>'+
          '<div style="display:flex;align-items:center;gap:8px;margin:8px 0 4px">'+
            '<div style="flex:1;height:10px;background:var(--ifto-g6,var(--g6));border-radius:9999px;overflow:hidden">'+
              '<div style="height:100%;width:'+wUsed.toFixed(1)+'%;background:'+wColor+';border-radius:9999px;transition:width 0.3s"></div>'+
            '</div>'+
            '<div style="min-width:54px;text-align:right;font-size:14px;font-weight:600;color:'+wColor+'">'+wUsed.toFixed(0)+'%</div>'+
          '</div>'+
          '<div class="token-usage-row"><span class="token-usage-sub">\u5DF2\u7528 '+wUsed.toFixed(1)+'%</span></div>'+
        '</div>';
      }
    }
    var html2 = '<div class="token-section">'+
'<div class="token-logo" style="display:block;text-align:center;margin:0 auto 6px"><svg width="200" viewBox="0 0 532 127" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:200px;height:auto;display:inline-block"><path d="M242.658 32.0206C246.102 31.8118 251.125 31.9255 254.625 32.0228C254.922 34.5364 254.801 39.568 254.803 42.2778L254.811 60.6297L254.809 79.7618C254.808 83.0451 254.95 88.1395 254.575 91.2595C253.366 92.0215 244.708 91.7531 242.509 91.8146C241.998 88.0545 242.276 74.9741 242.284 70.4965C242.303 65.1999 242.03 57.9428 242.36 52.8424C239.846 56.1117 235.15 64.0186 232.793 67.7782C230.284 67.9348 228.399 67.9212 225.91 67.8635C223.675 65.052 218.249 55.7856 216.156 52.3627C215.856 61.0924 216.219 70.4905 216.072 79.2795C216.002 83.4331 216.241 87.6513 215.941 91.8056C212.354 91.6031 207.553 91.7228 203.874 91.7058C203.202 78.802 204.138 65.0947 203.778 52.1097C203.599 45.6435 203.675 38.4952 203.881 32.0179C207.472 31.8301 212.151 31.9288 215.771 32.0182C217.243 33.7558 218.774 36.3848 220.073 38.3102C223.186 42.9258 226.183 48.1281 229.513 52.5431C230.563 50.4761 232.931 46.9507 234.231 44.9299C236.989 40.5939 239.798 36.2905 242.658 32.0206Z" fill="currentColor"/><path d="M405.846 32.0108C409.304 31.8018 414.432 31.9346 417.95 32.0456L417.945 91.8545C415.326 91.6323 407.16 92.2178 405.876 91.2156C405.039 88.9296 405.386 73.3174 405.397 69.8098C405.386 63.8372 405.419 58.4537 405.665 52.4789L395.994 67.7821C393.457 67.9436 391.325 67.9108 388.799 67.8646C386.068 62.9673 382.411 57.2588 379.248 52.5642C379.056 65.3688 379.543 79.1232 379.106 91.766L367.108 91.743C366.794 89.2439 366.892 85.5568 366.889 82.9443L366.878 69.259C366.876 57.5291 366.837 45.7258 366.93 33.9912C366.936 33.1896 366.968 32.4921 367.515 31.9838C370.776 31.9327 375.754 31.7952 378.876 32.1103C380.265 33.6925 382.465 37.3039 383.69 39.201C386.511 43.6594 389.381 48.0877 392.298 52.4849C396.098 46.3058 401.688 38.0244 405.846 32.0108Z" fill="currentColor"/><path d="M284.748 31.9931C288.288 31.8969 292.003 31.963 295.559 31.9788C297.177 33.9931 299.963 39.017 301.546 41.4721C307.436 50.6098 312.813 60.3028 318.743 69.4011C318.931 65.5093 318.647 60.8358 318.557 56.9201C318.486 51.9719 318.458 47.0232 318.477 42.0745C318.477 39.2922 318.335 34.5665 318.803 31.9685C322.072 31.9389 327.635 31.7782 330.691 32.1748C331.383 50.9216 330.472 72.12 330.653 91.0945C330.656 91.4634 330.478 91.5238 330.213 91.7654L319.278 91.7086C317.042 88.6864 314.281 83.654 312.215 80.3167C306.767 71.5671 301.401 62.7675 296.114 53.919C296.015 64.3431 296.256 74.7382 296.24 85.1618C296.234 87.4439 296.3 89.7102 296.081 91.9846C293.829 91.5449 286.934 91.7529 284.256 91.7898C283.763 72.6677 284.403 52.0602 284.329 32.816C284.329 32.3773 284.477 32.3139 284.748 31.9931Z" fill="currentColor"/><path d="M444.042 32.0152C448.189 31.843 455.162 31.8329 459.238 32.0699C460.285 34.3919 461.114 37.4067 461.923 39.8566C465.974 52.122 469.779 64.4571 473.885 76.7077C475.533 81.622 477.316 86.8364 478.639 91.8327C474.749 91.5878 469.26 91.7297 465.293 91.7398C464.181 89.1491 463.246 85.269 462.491 82.4739L459.55 82.2408C453.38 82.1828 447.21 82.2197 441.041 82.3515C440.013 84.9421 438.922 89.1562 438.124 91.9554C435.131 91.6089 427.026 92.1126 425.265 91.3006C425.115 88.8069 442.022 38.2583 444.042 32.0152ZM443.963 72.7658C446.574 72.7429 449.184 72.7401 451.795 72.7579C454.318 72.753 456.838 72.733 459.361 72.6978C458.582 70.1771 452.011 47.6942 451.191 47.1118C450.939 49.1296 450.34 51.0922 449.788 53.0433C447.916 59.6363 445.729 66.1423 443.963 72.7658Z" fill="currentColor"/><path d="M519.087 32.0512C520.864 31.8959 530.76 31.6787 531.834 32.4393C531.594 34.6287 517.125 58.5271 514.954 61.7193C517.871 67.0766 531.555 87.809 531.949 91.7957C527.928 91.63 523.139 91.7386 519.036 91.7159C516.89 88.7549 514.282 83.4981 512.543 80.225C510.859 77.0525 509.4 74.6717 507.508 71.5905C503.856 77.4994 499.288 86.4077 495.639 91.7323C493.69 91.7427 484.672 91.9378 483.283 91.5431C482.619 89.9295 486.541 83.9868 487.564 82.2647L495.811 68.5339C497.022 66.4764 498.711 63.7701 499.537 61.5957C496.626 56.4565 493.646 51.3572 490.598 46.2988C489.196 44.002 482.794 34.0217 482.917 32.2723L483.398 32.0047C487.49 31.9282 491.585 31.9238 495.68 31.9911C496.82 33.5634 498.785 37.2672 499.848 39.1126C502.372 43.483 504.919 47.8389 507.494 52.1806C509.637 48.7075 511.66 45.1619 513.563 41.5504C514.924 38.9773 517.316 34.2617 519.087 32.0512Z" fill="currentColor"/><path d="M344.865 32.0127C348.344 31.8326 353.186 31.9149 356.69 32.0379C356.955 41.028 356.676 51.4802 356.761 60.4938C356.794 64.0192 357.029 90.8783 356.406 91.7985C352.543 91.6698 348.317 91.7485 344.427 91.7477C343.998 73.5245 344.597 55.1086 344.356 36.8669C344.34 35.687 344.173 32.8709 344.865 32.0127Z" fill="currentColor"/><path d="M265.855 31.9962C269.611 31.9361 273.368 31.9358 277.124 31.9954C277.367 36.9947 277.553 89.9965 277.066 91.3125C276.949 91.6254 276.705 91.6505 276.416 91.7839C272.624 91.7038 268.692 91.7369 264.89 91.7164C264.75 86.2836 264.494 33.9187 265.11 32.313L265.855 31.9962Z" fill="currentColor"/><path d="M90.152 117.149C90.5071 108.307 90.2821 98.1757 90.2824 89.2285L90.2807 39.7923L90.284 21.4893C90.2854 17.9381 90.0426 13.9707 90.5675 10.5246C92.8495 -4.45876 115.5 -3.10579 115.683 12.4296C115.763 19.1578 115.771 25.9425 115.77 32.6341L115.784 80.4275C115.793 83.4645 115.676 86.5632 115.722 89.5977C115.805 95.127 115.419 97.473 121.167 99.0992L124.347 98.03C125.01 97.1743 125.751 96.2688 126.296 95.3402L126.294 61.1664C126.291 55.2384 125.971 48.79 126.707 42.9391C127.771 34.4707 137.785 29.7057 145.149 33.89C148.025 35.5246 150.964 38.4998 151.532 41.9008C152.458 47.4443 151.803 53.3556 151.998 58.9755C151.95 68.1149 152.097 77.3518 151.974 86.458C151.96 87.2148 151.934 87.9713 151.894 88.7273C151.057 89.8678 150.208 91.0228 148.701 91.2693C147.893 91.4002 147.066 91.1999 146.407 90.7134C143.707 88.6882 144.581 79.4084 144.602 75.9956L144.675 54.4529C144.687 48.8791 145.901 36.0043 136.047 40.9814C135.083 42.2736 134.434 43.1924 134.239 44.8498C133.718 49.2735 133.929 54.4611 133.937 58.9556L133.985 85.2014C133.991 89.0694 134.379 95.1609 133.099 98.6031C130.331 106.054 119.727 108.764 113.53 103.927C111.404 102.268 108.974 99.2536 108.669 96.4725C108.056 89.8905 108.301 82.5394 108.303 75.8953L108.309 32.296C108.309 26.5367 108.66 15.611 108.146 10.4443C106.908 9.01598 106.299 8.4258 104.595 7.441C101.213 7.58752 99.9265 7.83377 98.0234 10.8889C97.5871 19.495 97.8744 30.3578 97.8738 39.1027L97.8722 90.0479L97.9001 107.013C97.9222 113.579 99.037 119.81 93.7098 124.634C92.7702 125.498 91.7656 126.288 90.7055 126.999H79.2266C70.2468 120.495 72.4596 114.363 72.1964 104.318C72.16 102.931 72.6302 101.212 73.3869 100.079C74.2835 98.6452 76.8427 98.7168 78.1089 99.6228C82.9014 104.619 74.442 121.65 85.98 120.452C87.5682 120.287 88.961 118.801 89.9125 117.497C89.9956 117.383 90.0754 117.267 90.152 117.149Z" fill="currentColor"/><path d="M54.1038 104.615L54.0669 40.4261L54.071 21.8738C54.0727 18.0539 53.8504 13.8619 54.4081 10.1282C55.8872 0.22075 68.6299 -3.02492 75.7361 3.24176C77.2336 4.56232 78.7983 7.70773 79.2261 9.72221C79.8832 17.0421 79.6194 25.5635 79.6216 32.9113L79.6225 82.4877C79.6203 83.9196 79.7405 87.9724 79.1796 89.0156C77.3664 92.3885 74.4478 91.6025 72.5392 89.0389C71.9145 85.3025 72.2163 72.7201 72.2234 68.3417L72.2357 27.1659C72.2349 22.2011 72.4028 16.3243 72.0305 11.3922C71.7265 7.36531 64.7391 6.06593 62.6165 9.52387C61.9583 10.4054 61.7579 11.7878 61.7409 12.8655C61.619 20.6982 61.7144 28.5668 61.7144 36.4011L61.7051 84.4331C61.7048 90.2496 62.5268 102.697 60.8091 107.788C56.9793 119.139 38.5822 118.021 36.3628 105.77C35.7275 101.962 36.0889 96.8997 36.0941 92.9572L36.1403 60.0177C36.1438 54.7566 36.389 49.2861 35.8205 44.0744C35.4963 41.1028 33.1019 40.3296 30.6351 39.6043C24.6296 41.6019 25.2765 44.3469 25.3004 50.1282L25.3626 62.5089C25.4012 70.4582 26.1158 78.2179 17.032 81.5861C13.7767 82.793 9.66831 82.4528 6.56839 80.9223C3.13562 79.2272 1.75859 76.4928 0 73.3736V59.277C3.33753 55.4983 7.20821 56.5197 7.43193 61.4714C7.6428 66.1386 5.70722 74.7005 12.6884 75.1501C18.1363 75.5007 17.9462 67.2401 17.9311 64.1175L17.8683 52.0137C17.8443 46.7187 17.3132 39.8338 21.467 35.9138C29.5403 28.2952 43.3955 33.515 43.4341 44.9441C43.4516 50.1191 43.4827 55.2857 43.4759 60.4118L43.4701 88.1203C43.4701 92.8728 43.1366 98.4786 43.5371 103.119C44.1062 109.717 50.0841 109.227 53.7843 104.992C53.8939 104.869 54.0002 104.743 54.1038 104.615Z" fill="currentColor"/></svg></div>'+
      '<div class="token-title">\u5957\u9910\u7528\u91CF</div>'+
      cards+
      '<div class="token-footer">'+
        '<span class="token-refresh" onclick="renderWidget()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8a6 6 0 0 1 10.47-4M14 8a6 6 0 0 1-10.47 4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M14 2v4h-4M2 14v-4h4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
        '<span class="token-recharge" onclick="window.open(\'https://platform.minimaxi.com/console/usage\',\'_blank\')">\u524D\u5F80\u67E5\u770B</span>'+
      '</div>'+
    '</div>';
  body.innerHTML = html2;
});
}
function renderCalPage() {
  var body = document.getElementById('widgetBody');
  if(!body) return;
  var now = new Date();
  var y = now.getFullYear(), m = now.getFullYear() + '/' + String(now.getMonth()+1).padStart(2,'0');
  var title = y + '\u5E74' + (now.getMonth()+1) + '\u6708';
  var first = new Date(y, now.getMonth(), 1).getDay();
  first = first === 0 ? 6 : first - 1;
  var days = new Date(y, now.getMonth()+1, 0).getDate();
  var today = now.getDate();
  var wds = ['\u4E00','\u4E8C','\u4E09','\u56DB','\u4E94','\u516D','\u65E5'];
  var html = '<div class="cal-title" style="margin-bottom:12px">' + title + '</div><div class="cal-grid">';
  for(var i=0;i<7;i++) html += '<div class="cal-header">' + wds[i] + '</div>';
  for(var i=0;i<first;i++) html += '<div class="cal-day" style="visibility:hidden"></div>';
  for(var d=1;d<=days;d++) {
    html += '<div class="cal-day' + (d===today?' today':'') + '">' + d + '</div>';
  }
  html += '</div>';
  html += '<div id="calWeather" class="cal-weather"><div class="cal-weather-main" style="justify-content:center;font-size:12px;color:var(--g4)">\u52A0\u8F7D\u5929\u6C14...</div></div>';
  body.innerHTML = html;
  fetchWeather();
}
async function fetchWeather() {
  var el = document.getElementById('calWeather');
  if(!el) return;
  if(typeof window.__IFTO_fetchWeatherUrl !== 'function') {
    el.innerHTML = '<div class="cal-weather-main" style="justify-content:center;font-size:12px;color:var(--g4)">插件未加载</div>';
    return;
  }
  el.innerHTML = '<div class="cal-weather-main" style="justify-content:center;font-size:12px;color:var(--g4)">加载天气...</div>';

  var cityCoords = {
    '北京':{lat:39.9,lon:116.4,code:'101010100'},'上海':{lat:31.2,lon:121.5,code:'101020100'},'天津':{lat:39.1,lon:117.2,code:'101030100'},
    '重庆':{lat:29.6,lon:106.5,code:'101040100'},'广州':{lat:23.1,lon:113.3,code:'101280101'},'深圳':{lat:22.5,lon:114.1,code:'101280601'},
    '杭州':{lat:30.3,lon:120.2,code:'101210101'},'南京':{lat:32.1,lon:118.8,code:'101190101'},'成都':{lat:30.6,lon:104.1,code:'101270101'},
    '武汉':{lat:30.6,lon:114.3,code:'101200101'},'西安':{lat:34.3,lon:108.9,code:'101110101'},'长沙':{lat:28.2,lon:112.9,code:'101250101'},
    '苏州':{lat:31.3,lon:120.6,code:'101190401'},'青岛':{lat:36.1,lon:120.4,code:'101120201'},'大连':{lat:38.9,lon:121.6,code:'101070201'},
    '厦门':{lat:24.5,lon:118.1,code:'101230201'},'昆明':{lat:25.0,lon:102.7,code:'101290101'},'宁波':{lat:29.9,lon:121.5,code:'101210401'},
    '郑州':{lat:34.8,lon:113.7,code:'101180101'},'沈阳':{lat:41.8,lon:123.4,code:'101070101'},'济南':{lat:36.7,lon:117.0,code:'101120101'},
    '哈尔滨':{lat:45.8,lon:126.5,code:'101050101'},'福州':{lat:26.1,lon:119.3,code:'101230101'},'合肥':{lat:31.8,lon:117.3,code:'101220101'},
    '东莞':{lat:23.0,lon:113.8,code:'101281601'},'佛山':{lat:23.0,lon:113.1,code:'101280301'},'珠海':{lat:22.3,lon:113.6,code:'101280701'},
    '长春':{lat:43.9,lon:125.3,code:'101060101'},'贵阳':{lat:26.6,lon:106.6,code:'101260101'},'南宁':{lat:22.8,lon:108.4,code:'101300101'},
    '太原':{lat:37.9,lon:112.5,code:'101100101'},'石家庄':{lat:38.0,lon:114.5,code:'101090101'},'南昌':{lat:28.7,lon:115.9,code:'101240101'},
    '兰州':{lat:36.1,lon:103.8,code:'101160101'},'呼和浩特':{lat:40.8,lon:111.7,code:'101080101'},'乌鲁木齐':{lat:43.8,lon:87.6,code:'101130101'},
    '拉萨':{lat:29.7,lon:91.1,code:'101140101'},'西宁':{lat:36.6,lon:101.8,code:'101150101'},'银川':{lat:38.5,lon:106.2,code:'101170101'},
    '海口':{lat:20.0,lon:110.3,code:'101310101'},'三亚':{lat:18.3,lon:109.5,code:'101310201'},'桂林':{lat:25.3,lon:110.3,code:'101300501'},
    '洛阳':{lat:34.6,lon:112.4,code:'101180901'},'徐州':{lat:34.3,lon:117.2,code:'101190801'},'温州':{lat:28.0,lon:120.7,code:'101210701'},
    '无锡':{lat:31.5,lon:120.3,code:'101190201'},'常州':{lat:31.8,lon:119.9,code:'101191101'},'唐山':{lat:39.6,lon:118.2,code:'101090501'}
  };

  // Get location: manual lat/lon > manual city name (with geocoding) > IP auto-detect
  var lat, lon, displayCity, weatherCode;
  // Priority 1: Manual lat/lon coordinates
  var manualLat = localStorage.getItem('ifto_weather_manual_lat');
  var manualLon = localStorage.getItem('ifto_weather_manual_lon');
  if(manualLat && manualLon && !isNaN(parseFloat(manualLat)) && !isNaN(parseFloat(manualLon))) {
    lat = parseFloat(manualLat);
    lon = parseFloat(manualLon);
    displayCity = localStorage.getItem('ifto_weather_manual_city_name') || '';
    if(!displayCity) displayCity = lat.toFixed(2) + ', ' + lon.toFixed(2);
  } else {
  var manualCity = localStorage.getItem('ifto_weather_city') || '';
  if(manualCity && cityCoords[manualCity]) {
    lat = cityCoords[manualCity].lat;
    lon = cityCoords[manualCity].lon;
    weatherCode = cityCoords[manualCity].code;
    displayCity = manualCity;
  } else if(manualCity) {
    // Manual city set but not in cityCoords — try Open-Meteo Geocoding API
    try {
      var geoRes = await window.__IFTO_fetchWeatherUrl('https://geocoding-api.open-meteo.com/v1/search?name='+encodeURIComponent(manualCity)+'&count=1&language=zh&format=json');
      if(geoRes && geoRes.indexOf('__IFTO_ERROR__') !== 0) {
        var geoData = JSON.parse(geoRes);
        if(geoData.results && geoData.results.length > 0) {
          lat = geoData.results[0].latitude;
          lon = geoData.results[0].longitude;
          displayCity = geoData.results[0].name;
          // Cache geocoding result so next load doesn't re-query
          localStorage.setItem('ifto_weather_manual_lat', String(lat));
          localStorage.setItem('ifto_weather_manual_lon', String(lon));
          localStorage.setItem('ifto_weather_manual_city_name', displayCity);
          localStorage.removeItem('ifto_weather_city');
        }
      }
    } catch(e){console.error('IFTO: geocoding error', e)}
    if(!lat || !lon) {
      // Geocoding failed, fall through to IP detection below
    }
  }
  if(!lat || !lon) {
    var cachedLat = localStorage.getItem('ifto_weather_lat');
    var cachedLon = localStorage.getItem('ifto_weather_lon');
    var cachedCity = localStorage.getItem('ifto_weather_auto_city');
    if(cachedLat && cachedLon) {
      lat = parseFloat(cachedLat);
      lon = parseFloat(cachedLon);
      displayCity = cachedCity || '北京';
      // Try to find city code for auto-detected city
      if(cachedCity && cityCoords[cachedCity]) weatherCode = cityCoords[cachedCity].code;
    } else {
      var _ipSuccess = false;
      // Attempt 1: ip-api.com (works outside China)
      try {
        var ipRes = await window.__IFTO_fetchWeatherUrl('https://ip-api.com/json/?lang=zh-CN');
        if(ipRes && ipRes.indexOf('__IFTO_ERROR__') !== 0) {
          var ipData = JSON.parse(ipRes);
          if(ipData.lat && ipData.lon) {
            lat = ipData.lat; lon = ipData.lon;
            displayCity = ipData.city || '北京';
            if(displayCity && cityCoords[displayCity]) weatherCode = cityCoords[displayCity].code;
            _ipSuccess = true;
          }
        }
      } catch(e){console.error('IFTO: ip-api error',e)}
      // Attempt 2: China-friendly API
      if(!_ipSuccess) {
        try {
          var ipRes2 = await window.__IFTO_fetchWeatherUrl('https://ip.useragentinfo.com/json');
          if(ipRes2 && ipRes2.indexOf('__IFTO_ERROR__') !== 0) {
            var ipData2 = JSON.parse(ipRes2);
            var cnCity = (ipData2.city || '').replace(/市$/g, '');
            if(cnCity && cityCoords[cnCity]) {
              lat = cityCoords[cnCity].lat; lon = cityCoords[cnCity].lon;
              displayCity = cnCity;
              weatherCode = cityCoords[cnCity].code;
              _ipSuccess = true;
            }
          }
        } catch(e2){console.error('IFTO: useragentinfo error',e2)}
      }
      if(_ipSuccess) {
        localStorage.setItem('ifto_weather_lat', String(lat));
        localStorage.setItem('ifto_weather_lon', String(lon));
        localStorage.setItem('ifto_weather_auto_city', displayCity);
      }
    }
  }
}
  // Fallback
  if(!lat || !lon) { lat = 39.9; lon = 116.4; displayCity = displayCity || '北京'; weatherCode = weatherCode || '101010100'; }

  // Fetch weather — try Open-Meteo first, fallback to scraping weather.com.cn
  var weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+'&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=4';
  var text = await window.__IFTO_fetchWeatherUrl(weatherUrl);
  var isFallback = false;
  if(text && text.indexOf('__IFTO_ERROR__') === 0 && weatherCode) {
    // Fallback: scrape weather.com.cn 7-day page directly
    isFallback = true;
    weatherUrl = 'https://www.weather.com.cn/weather/' + weatherCode + '.shtml';
    text = await window.__IFTO_fetchWeatherUrl(weatherUrl);
    if(text && text.indexOf('__IFTO_ERROR__') === 0) {
      var errMsg = text.replace('__IFTO_ERROR__: ','');
      el.innerHTML = '<div style="text-align:center;font-size:20px;font-weight:600;color:var(--g1);margin-bottom:6px;cursor:pointer" onclick="setWeatherCity()" title="点击修改城市">'+displayCity+'</div><div class="cal-weather-main" style="justify-content:center;font-size:11px;color:var(--g4);padding:8px">连接失败: '+errMsg+'</div>';
      return;
    }
  } else if(text && text.indexOf('__IFTO_ERROR__') === 0) {
    var errMsg = text.replace('__IFTO_ERROR__: ','');
    el.innerHTML = '<div style="text-align:center;font-size:20px;font-weight:600;color:var(--g1);margin-bottom:6px;cursor:pointer" onclick="setWeatherCity()" title="点击修改城市">'+displayCity+'</div><div class="cal-weather-main" style="justify-content:center;font-size:11px;color:var(--g4);padding:8px">连接失败: '+errMsg+'</div>';
    return;
  }
  var temp = '--', desc = '--', icon = '\u2600', hi = '--', lo = '--', fHtml = '';
  try {
    if(text) {
      if(isFallback) {
        // Scrape weather.com.cn HTML for current + forecast
        var dayN = ['日','一','二','三','四','五','六'];
        var liRegex = /<li>([\s\S]*?)<\/li>/g;
        var lis = [], m;
        while((m = liRegex.exec(text)) !== null) lis.push(m[1]);
        if(lis.length >= 1) {
          var tWea = lis[0].match(/<p class="wea">\s*([^<]+)/);
          var tHi = lis[0].match(/<span>\s*(\d+)/);
          var tLo = lis[0].match(/<i>\s*(\d+)/);
          if(tWea) { desc = tWea[1]; icon = getWeatherEmoji(desc); }
          if(tHi) { hi = tHi[1]; temp = tHi[1]; }
          if(tLo) lo = tLo[1];
        }
        if(lis.length >= 4) {
          fHtml = '<div class="cal-forecast">';
          for(var fi=1;fi<=3&&fi<lis.length;fi++) {
            var fWea = lis[fi].match(/<p class="wea">\s*([^<]+)/);
            var fHi = lis[fi].match(/<span>\s*(\d+)/);
            var fLo = lis[fi].match(/<i>\s*(\d+)/);
            var fIcon = fWea ? getWeatherEmoji(fWea[1]) : '\u2600';
            var d = new Date(); d.setDate(d.getDate() + fi);
            var dn = dayN[d.getDay()] || '';
            fHtml += '<div class="wf-day"><span class="wf-icon">'+fIcon+'</span><span>'+dn+'</span><span>'+(fHi?fHi[1]+'°':'--')+'</span><span style="color:var(--g4)">'+(fLo?fLo[1]+'°':'--')+'</span></div>';
          }
          fHtml += '</div>';
        }
      } else {
        // Parse Open-Meteo JSON
        var data = JSON.parse(text);
        if(data.current) {
          temp = data.current.temperature_2m !== undefined ? data.current.temperature_2m : '--';
          var wCode = data.current.weather_code !== undefined ? data.current.weather_code : -1;
          desc = getWeatherDesc(wCode);
          icon = getWeatherEmoji(wCode);
          hi = data.daily && data.daily.temperature_2m_max ? data.daily.temperature_2m_max[0] : '--';
          lo = data.daily && data.daily.temperature_2m_min ? data.daily.temperature_2m_min[0] : '--';
        }
        if(data.daily && data.daily.time) {
          var dayN = ['日','一','二','三','四','五','六'];
          fHtml = '<div class="cal-forecast">';
          for(var fi=1;fi<=3 && fi<data.daily.time.length;fi++) {
            var fcHi = data.daily.temperature_2m_max ? data.daily.temperature_2m_max[fi] : '--';
            var fcLo = data.daily.temperature_2m_min ? data.daily.temperature_2m_min[fi] : '--';
            var fcCode = data.daily.weather_code ? data.daily.weather_code[fi] : -1;
            var fcIcon = getWeatherEmoji(fcCode);
            var d = new Date(data.daily.time[fi] + 'T12:00:00');
            var dn = dayN[d.getDay()] || '';
            fHtml += '<div class="wf-day"><span class="wf-icon">'+fcIcon+'</span><span>'+dn+'</span><span>'+(fcHi!=='--'?fcHi+'°':'--')+'</span><span style="color:var(--g4)">'+(fcLo!=='--'?fcLo+'°':'--')+'</span></div>';
          }
          fHtml += '</div>';
        }
      }
    }
  } catch(e){console.error('IFTO: weather parse error',e)}
  el.innerHTML = '<div style="text-align:center;font-size:20px;font-weight:600;color:var(--g1);margin-bottom:6px;cursor:pointer" onclick="setWeatherCity()" title="点击修改城市">'+displayCity+'</div><div class="cal-weather-main"><span class="cal-weather-icon">'+icon+'</span><span class="cal-weather-temp">'+temp+'°</span><span class="cal-weather-desc">'+desc+'</span></div>'+(fHtml||'');
}
function getWeatherDesc(code){
  if(code===0) return '晴天';
  if(code===1) return '少云';
  if(code>=2&&code<=3) return '多云';
  if(code===45||code===48) return '雾';
  if(code>=51&&code<=57) return '毛毛雨';
  if(code>=61&&code<=67) return '雨';
  if(code>=71&&code<=77) return '雪';
  if(code>=80&&code<=82) return '阵雨';
  if(code>=85&&code<=86) return '阵雪';
  if(code>=95&&code<=99) return '雷暴';
  return '未知';
}
function setWeatherCity(){
  var el = document.getElementById('calWeather');
  if(!el) return;
  // Check current manual setting
  var curLat = localStorage.getItem('ifto_weather_manual_lat');
  var curLon = localStorage.getItem('ifto_weather_manual_lon');
  var curCity = localStorage.getItem('ifto_weather_city');
  var hint = '输入城市名（如 上海）或经纬度（如 31.2,121.5）';
  var curVal = '';
  if(curLat && curLon) {
    curVal = curLat + ',' + curLon;
    var cn = localStorage.getItem('ifto_weather_manual_city_name');
    if(cn) hint = '当前: ' + cn + ' (' + curLat + ',' + curLon + ')';
    else hint = '当前: ' + curLat + ',' + curLon;
  } else if(curCity) {
    curVal = curCity;
    hint = '当前: ' + curCity;
  }
  el.innerHTML = '<div style="display:flex;flex-direction:column;gap:4px;padding:4px 0">'+
    '<div style="display:flex;gap:6px;align-items:center">'+
    '<input id="cityInput" style="flex:1;min-width:0;padding:6px 14px;font-size:12px;border:1px solid var(--ifto-divider,var(--ifto-g5,var(--g5)));background:var(--ifto-card-bg,var(--bg));color:var(--ifto-text,var(--g1));border-radius:9999px" placeholder="'+hint+'" value="'+curVal+'" />'+
    '<button onclick="saveCity()" style="padding:0 14px;font-size:12px;font-weight:600;border:none;border-radius:9999px;background:var(--ifto-accent,var(--g1));color:var(--ifto-accent-text,var(--bg));cursor:pointer;white-space:nowrap;height:28px">确定</button>'+
    '<button onclick="cancelCity()" style="padding:0 12px;font-size:12px;border:1px solid var(--ifto-divider,var(--ifto-g5,var(--g5)));border-radius:9999px;background:transparent;color:var(--ifto-text-2,var(--g4));cursor:pointer;height:28px">取消</button>'+
    '</div>'+
    '<div style="display:flex;gap:6px;font-size:10px;color:var(--g4)">'+
    '<span>支持城市名（中文/英文）或 纬度,经度 坐标</span>'+
    '<span style="cursor:pointer;text-decoration:underline" onclick="clearCity()">重置为自动定位</span>'+
    '</div>'+
    '</div>';
  var inp = document.getElementById('cityInput');
  if(inp) { inp.focus(); inp.select(); }
}
function saveCity(){
  var inp = document.getElementById('cityInput');
  if(inp && inp.value && inp.value.trim()){
    var val = inp.value.trim();
    // Detect coordinate input: contains digits and comma or common coordinate separators
    var coordMatch = val.match(/^([\d.-]+)\s*[,，\s]\s*([\d.-]+)$/);
    if(coordMatch) {
      var lat = parseFloat(coordMatch[1]);
      var lon = parseFloat(coordMatch[2]);
      if(!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
        // Save as manual lat/lon
        localStorage.setItem('ifto_weather_manual_lat', String(lat));
        localStorage.setItem('ifto_weather_manual_lon', String(lon));
        localStorage.removeItem('ifto_weather_manual_city_name');
        localStorage.removeItem('ifto_weather_city');
        localStorage.removeItem('ifto_weather_lat');
        localStorage.removeItem('ifto_weather_lon');
        localStorage.removeItem('ifto_weather_auto_city');
        fetchWeather();
        return;
      }
    }
    // Treat as city name
    localStorage.setItem('ifto_weather_city', val);
    localStorage.removeItem('ifto_weather_manual_lat');
    localStorage.removeItem('ifto_weather_manual_lon');
    localStorage.removeItem('ifto_weather_manual_city_name');
    localStorage.removeItem('ifto_weather_lat');
    localStorage.removeItem('ifto_weather_lon');
    localStorage.removeItem('ifto_weather_auto_city');
    fetchWeather();
  } else { fetchWeather(); }
}
function cancelCity(){
  fetchWeather();
}
function clearCity(){
  localStorage.removeItem('ifto_weather_manual_lat');
  localStorage.removeItem('ifto_weather_manual_lon');
  localStorage.removeItem('ifto_weather_manual_city_name');
  localStorage.removeItem('ifto_weather_city');
  localStorage.removeItem('ifto_weather_lat');
  localStorage.removeItem('ifto_weather_lon');
  localStorage.removeItem('ifto_weather_auto_city');
  fetchWeather();
}

function getWeatherEmoji(code){
  var vs = '\uFE0E'; // 变体选择符，强制文本样式（非彩色emoji）
  // Chinese weather descriptions (weather.com.cn)
  if(typeof code === 'string' || code !== +code) {
    if(code.indexOf('晴')>=0) return '\u2600'+vs;
    if(code.indexOf('云')>=0||code.indexOf('阴')>=0) return '\u26C5'+vs;
    if(code.indexOf('雾')>=0) return '\u2601'+vs+'\u2601'+vs;
    if(code.indexOf('雨')>=0) return '\u2602'+vs;
    if(code.indexOf('雪')>=0) return '\u2603'+vs;
    if(code.indexOf('雷')>=0||code.indexOf('闪')>=0) return '\u26A1'+vs;
    return '\u2600'+vs;
  }
  // WMO weather codes (Open-Meteo)
  if(code===0) return '\u2600'+vs;
  if(code>=1&&code<=3) return '\u26C5'+vs;
  if(code===45||code===48) return '\u2601'+vs+'\u2601'+vs;
  if(code>=51&&code<=67) return '\u2602'+vs;
  if(code>=71&&code<=77) return '\u2603'+vs;
  if(code>=80&&code<=82) return '\u2602'+vs;
  if(code>=85&&code<=86) return '\u2603'+vs;
  if(code>=95&&code<=99) return '\u26A1'+vs;
  // OpenWeather condition codes
  if(code>=200&&code<300) return '\u26A1'+vs;
  if(code>=300&&code<400) return '\u2602'+vs;
  if(code>=500&&code<600) return '\u2602'+vs;
  if(code>=600&&code<700) return '\u2603'+vs;
  if(code>=700&&code<800) return '\u2601'+vs+'\u2601'+vs;
  if(code===800) return '\u2600'+vs;
  if(code>=801&&code<=804) return '\u26C5'+vs;
  // Legacy wttr.in codes
  if(code===113) return '\u2600'+vs;
  if(code===116) return '\u26C5'+vs;
  if(code>=119&&code<=122) return '\u2601'+vs;
  if(code===143||(code>=248&&code<=260)) return '\u2601'+vs+'\u2601'+vs;
  if(code===200) return '\u26A1'+vs;
  if(code>=176&&code<=199) return '\u2602'+vs;
  if(code>=227&&code<=230) return '\u2603'+vs;
  if(code>=263&&code<=284) return '\u2602'+vs;
  if(code>=293&&code<=308) return '\u2602'+vs;
  if(code>=311&&code<=317) return '\u2602'+vs;
  if(code>=320&&code<=338) return '\u2603'+vs;
  if(code===350) return '\u2602'+vs;
  if(code>=353&&code<=359) return '\u2602'+vs;
  if(code>=362&&code<=377) return '\u2602'+vs;
  if(code>=386&&code<=392) return '\u26A1'+vs;
  if(code>=393&&code<=395) return '\u2603'+vs;
  return '\u2600'+vs;
}
// ====== Page 2: Habit Tracking - Calendar View ======
var HABIT_COLORS = ['#22c55e','#3b82f6','#a855f7','#f59e0b','#ef4444','#ec4899','#14b8a6','#f97316'];
var curHabitIdx = 0;

function renderHabitPage() {
  var body = document.getElementById('widgetBody');
  if(!body) return;
  var LS_KEY = 'ifto_habits';
  var habits = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  // Auto-assign colorIdx for old data
  for(var i=0;i<habits.length;i++) {
    if(habits[i].colorIdx===undefined) habits[i].colorIdx = i % HABIT_COLORS.length;
  }
  // Clamp curHabitIdx
  if(habits.length===0) curHabitIdx = 0;
  else if(curHabitIdx >= habits.length) curHabitIdx = habits.length - 1;
  else if(curHabitIdx < 0) curHabitIdx = 0;

  var now = new Date();
  var y = now.getFullYear(), mon = now.getMonth();
  var firstDay = new Date(y, mon, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;
  var daysInMonth = new Date(y, mon + 1, 0).getDate();
  var todayDate = now.getDate();
  // FIX: use local time for todayStr to match calendar cell date strings
  var pad = function(n) { return String(n).padStart(2,'0'); };
  var todayStr = y + '-' + pad(mon+1) + '-' + pad(todayDate);
  var monthStr = y + '\u5E74' + (mon+1) + '\u6708';

  var html = '<div style="display:flex;flex-direction:column;gap:0">';
  // Header
  html += '<div class="habit-header">';
  html += '<span class="habit-header-title">\u4E60\u60EF\u6253\u5361</span>';
  html += '<span class="habit-header-count">' + monthStr + (habits.length > 0 ? ' \u00B7 ' + habits.length + '\u4E2A\u4E60\u60EF' : '');
  html += '</span>';
  html += '</div>';
  // Input
  html += '<div class="habit-input-wrap">';
  html += '<input id="habitInput" class="habit-input" placeholder="\u65B0\u4E60\u60EF\u540D\u79F0..." onkeydown="if(event.key==\'Enter\')addHabit()" />';
  html += '<button class="habit-add-btn" onclick="addHabit()">+ \u6DFB\u52A0</button>';
  html += '</div>';

  if(habits.length === 0) {
    html += '<div class="habit-empty">\u2728 \u8FD8\u6CA1\u6709\u4E60\u60EF<br>\u8F93\u5165\u540D\u79F0\u5F00\u59CB\u6DFB\u52A0\u5427</div>';
  } else {
    html += '<div class="habit-list">';
    var hi = curHabitIdx;
    var h = habits[hi];
    var dates = h.dates || [];
    var streak = dates.length;
    var color = HABIT_COLORS[h.colorIdx % HABIT_COLORS.length];
    html += '<div class="habit-item">';
    // Top bar
    html += '<div class="habit-topbar">';
    html += '<span class="habit-color-dot" style="background:'+color+'" onclick="cycleHabitColor('+hi+')" title="\u70B9\u51FB\u5207\u6362\u989C\u8272"></span>';
    html += '<span class="habit-name">' + escHtml(h.name) + '</span>';
    html += '<span class="habit-streak"><span style="filter:grayscale(1) brightness(0);display:inline-block">\uD83D\uDD25</span> ' + streak + '</span>';
    html += '<span class="habit-del" onclick="removeHabit('+hi+')">\u2715</span>';
    html += '</div>';
    // Calendar grid
    html += '<div class="habit-calendar">';
    html += '<div class="habit-weekdays"><span>\u4E00</span><span>\u4E8C</span><span>\u4E09</span><span>\u56DB</span><span>\u4E94</span><span>\u516D</span><span>\u65E5</span></div>';
    html += '<div class="habit-month-grid">';
    for(var e=0; e<firstDay; e++) {
      html += '<div class="habit-day-cell" style="cursor:default"></div>';
    }
    for(var d=1; d<=daysInMonth; d++) {
      var dateStr = y + '-' + pad(mon+1) + '-' + pad(d);
      var isDone = dates.indexOf(dateStr) >= 0;
      var isToday = d === todayDate;
      var isFuture = dateStr > todayStr;
      var cls = 'habit-day-cell';
      if(isDone) cls += ' done';
      if(isToday) cls += ' today';
      if(isFuture) cls += ' future';
      var bgStyle = isDone ? 'background:' + color : '';
      if(isFuture) {
        html += '<div class="'+cls+'">' + d + '</div>';
      } else {
        html += '<div class="'+cls+'" style="'+bgStyle+'" onclick="toggleHabitDate('+hi+',\''+dateStr+'\')">' + d + '</div>';
      }
    }
    html += '</div></div></div>';
    // Habit navigation below calendar
    if(habits.length > 1) {
      html += '<div style="display:flex;align-items:center;justify-content:center;gap:8px;padding:6px 0 2px">';
      html += '<span style="cursor:pointer;user-select:none;font-size:11px;font-weight:600;padding:0 12px;background:var(--ifto-accent,var(--g1));color:var(--ifto-accent-text,var(--bg));border-radius:var(--ifto-radius,9999px);height:28px;display:inline-flex;align-items:center;transition:opacity .15s" onclick="navHabit(-1)" onmouseenter="this.style.opacity=.7" onmouseleave="this.style.opacity=1">\u25C0</span>';
      html += '<span style="font-size:11px;color:var(--g4);min-width:32px;text-align:center">' + (curHabitIdx+1) + '/' + habits.length + '</span>';
      html += '<span style="cursor:pointer;user-select:none;font-size:11px;font-weight:600;padding:0 12px;background:var(--ifto-accent,var(--g1));color:var(--ifto-accent-text,var(--bg));border-radius:var(--ifto-radius,9999px);height:28px;display:inline-flex;align-items:center;transition:opacity .15s" onclick="navHabit(1)" onmouseenter="this.style.opacity=.7" onmouseleave="this.style.opacity=1">\u25B6</span>';
      html += '</div>';
    }
    html += '</div>';
  }
  html += '</div>';
  body.innerHTML = html;
}
function navHabit(dir) {
  var LS_KEY = 'ifto_habits';
  var habits = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  if(habits.length <= 1) return;
  curHabitIdx = (curHabitIdx + dir + habits.length) % habits.length;
  renderHabitPage();
}
function addHabit() {
  var input = document.getElementById('habitInput');
  if(!input||!input.value.trim()) return;
  var LS_KEY = 'ifto_habits';
  var habits = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  var colorIdx = habits.length % HABIT_COLORS.length;
  habits.push({name: input.value.trim(), dates: [], colorIdx: colorIdx});
  localStorage.setItem(LS_KEY, JSON.stringify(habits));
  curHabitIdx = habits.length - 1;
  renderHabitPage();
}
function toggleHabitDate(idx, dateStr) {
  var LS_KEY = 'ifto_habits';
  var habits = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  if(idx<0||idx>=habits.length) return;
  var pos = habits[idx].dates.indexOf(dateStr);
  if(pos >= 0) habits[idx].dates.splice(pos, 1);
  else habits[idx].dates.push(dateStr);
  localStorage.setItem(LS_KEY, JSON.stringify(habits));
  renderHabitPage();
}
function cycleHabitColor(idx) {
  var LS_KEY = 'ifto_habits';
  var habits = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  if(idx<0||idx>=habits.length) return;
  habits[idx].colorIdx = ((habits[idx].colorIdx || 0) + 1) % HABIT_COLORS.length;
  localStorage.setItem(LS_KEY, JSON.stringify(habits));
  renderHabitPage();
}
function removeHabit(idx) {
  var LS_KEY = 'ifto_habits';
  var habits = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  if(idx<0||idx>=habits.length) return;
  habits.splice(idx,1);
  localStorage.setItem(LS_KEY, JSON.stringify(habits));
  if(curHabitIdx >= habits.length && habits.length > 0) curHabitIdx = habits.length - 1;
  else if(habits.length === 0) curHabitIdx = 0;
  renderHabitPage();
}
function calcStreak(dates) {
  if(!dates||dates.length===0) return 0;
  dates.sort().reverse();
  var streak = 0, today = new Date();
  var check = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  for(var i=0;i<dates.length;i++) {
    var y = check.getFullYear(), m = String(check.getMonth()+1).padStart(2,'0'), d = String(check.getDate()).padStart(2,'0');
    var dStr = y + '-' + m + '-' + d;
    if(dates.indexOf(dStr)>=0) {
      streak++;
      check.setDate(check.getDate()-1);
    } else break;
  }
  return streak;
}
function escHtml(s) {
  if(!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ====== Page 3: Ollama Status ======
// Ollama pagination state
var _ollamaModels = [];
var _ollamaPage = 0;
var _ollamaPerPage = 3;

function _ollamaRenderModels() {
	  var list = document.querySelector('.token-model-list');
	  if(!list) return;
	  var start = _ollamaPage * _ollamaPerPage;
	  var pageModels = _ollamaModels.slice(start, start + _ollamaPerPage);
	  var totalPages = Math.ceil(_ollamaModels.length / _ollamaPerPage) || 1;
	  list.innerHTML = pageModels.map(function(m){
	    return '<div class="token-model-item">'+escHtml(m.name)+'</div>';
	  }).join('');
	  var num = document.querySelector('.token-model-pg-num');
	  if(num) num.textContent = (_ollamaPage+1)+'/'+totalPages;
	  var prev = document.querySelector('.token-model-pg-btn.prev');
	  var next = document.querySelector('.token-model-pg-btn.next');
	  if(prev) prev.disabled = _ollamaPage<=0;
	  if(next) next.disabled = _ollamaPage>=totalPages-1;
	}
	function _ollamaPrev(){if(_ollamaPage>0){_ollamaPage--;_ollamaRenderModels();}}
	function _ollamaNext(){var tp=Math.ceil(_ollamaModels.length/_ollamaPerPage);if(_ollamaPage<tp-1){_ollamaPage++;_ollamaRenderModels();}}

function renderOllamaPage() {
  var body = document.getElementById('widgetBody');
  if(!body) return;
  var url = (window.__IFTO_SETTINGS&&window.__IFTO_SETTINGS.ollamaUrl) || 'http://localhost:11434';
  body.innerHTML = '<div class="token-loading">检测中...</div>';
  var start = Date.now();
  fetch(url+'/api/tags', {method:'GET', signal: AbortSignal.timeout(5000)}).then(function(r){
    if(!r.ok) throw new Error('HTTP '+r.status);
    return r.json();
  }).then(function(d){
    var elapsed = ((Date.now()-start)/1000).toFixed(1);
    var models = d.models||[];
    _ollamaModels = models;
    _ollamaPage = 0;
    var totalPages = Math.ceil(models.length / _ollamaPerPage) || 1;
    var pageModels = models.slice(0, _ollamaPerPage);
    var html = '<div class="token-section">'+
      '<div class="token-logo"><svg width="99" height="131" viewBox="0 0 99 131" style="height:36px;width:auto;display:block;margin:0 auto" xmlns="http://www.w3.org/2000/svg"><path d="M72.48 0.993031C77.4903 -1.86521 82.7457 1.908 84.9829 6.45397C88.3905 13.3788 89.8275 26.9411 87.5815 34.2479C94.1456 39.7258 97.4952 45.0296 98.6167 53.6385C99.4397 59.9562 98.2247 67.6453 94.2114 72.7723C96.4073 77.4233 97.6978 80.9544 98.2319 86.1503C98.9241 92.8844 97.8813 101.924 93.4175 107.346C93.5117 107.465 93.6024 107.588 93.689 107.714C97.9363 113.868 97.7961 123.668 96.4429 130.743C93.8568 130.784 91.2703 130.786 88.6841 130.748C89.8876 124.697 90.6416 119.936 88.4692 113.906C87.4501 111.077 83.9865 108 86.1499 104.989C89.9876 99.6503 91.509 93.9369 90.854 87.3631C90.5953 84.7413 89.985 82.1659 89.0395 79.7069C88.1599 77.4793 86.1499 74.4947 85.8716 72.2557C85.7072 70.9321 88.5563 68.3195 89.2261 66.9032C90.8029 63.5679 91.66 60.0538 91.3852 56.369C90.9039 49.9141 88.6418 45.1457 83.8218 40.911C78.2906 36.1379 73.9842 37.2699 67.8179 37.0409C65.8201 33.1226 64.9377 31.0824 61.2524 28.2508C52.8671 21.8077 41.4318 23.2445 34.5434 31.1356C33.1059 32.7824 31.6785 35.2677 30.3061 37.1171C27.5565 37.1655 25.0696 36.6264 22.2563 37.2977C9.87717 40.2523 3.96077 55.5416 9.5161 66.5428C10.0968 67.6926 13.4066 71.3815 13.2729 72.3358C12.6627 75.0805 11.0698 77.1931 10.0083 79.8788C7.32412 86.6714 7.25318 96.2231 11.4087 102.461C14.7267 107.441 14.0718 107.261 11.3403 112.516C8.37005 118.232 9.05038 124.676 10.4653 130.73C7.90261 130.806 5.23912 130.765 2.66845 130.761L2.64208 130.636C1.10984 123.109 1.30321 114.002 5.66063 107.401C-1.50653 97.9623 -0.286469 83.2681 4.81688 73.1698C0.914316 67.6103 -0.468643 61.4907 0.13622 54.7792C0.955417 45.6939 4.72398 40.0259 11.56 34.2889L11.4995 34.1131C9.4484 27.9601 10.696 12.6436 13.979 6.71373C15.8472 3.3396 17.4211 1.44205 21.1694 0.18639C31.2144 -0.771835 34.9911 13.053 35.522 20.7508C43.7374 15.3456 55.2399 15.3727 63.4341 20.8016C64.5994 14.0915 65.8394 4.78159 72.48 0.993031ZM76.2866 7.57897C71.6262 12.0498 70.965 19.9755 70.6099 26.0848C70.5513 27.0947 70.7414 28.2441 71.4507 29.0194C72.5353 29.5107 75.7847 29.731 77.0845 29.868C78.1466 30.0668 79.7313 30.3137 80.7183 30.6405C81.5776 24.2907 81.1457 17.4482 78.9868 11.3837C78.564 10.1965 77.5529 7.95917 76.2866 7.57897ZM22.4438 7.59166C18.3937 12.0301 17.8106 21.533 18.0776 27.2186C18.1348 28.351 18.2068 29.4827 18.2925 30.6131C19.9374 30.1947 21.6101 29.8912 23.2974 29.7049C24.0218 29.6418 26.9123 29.5083 27.2475 29.0536C29.5312 25.9569 26.0926 8.26409 22.4438 7.59166Z" fill="currentColor"/><path d="M49.0751 55.2467C55.1116 55.21 60.5316 56.8112 64.8192 61.026C74.6914 70.7307 68.2685 84.4827 55.3759 86.1627C53.5499 86.4008 51.903 86.3584 50.1054 86.3571C43.3686 86.4185 39.0346 86.1047 33.6571 81.4489C27.7102 76.2997 27.562 68.1517 32.7958 62.5026C37.4482 57.481 42.313 55.557 49.0751 55.2467ZM60.8993 64.2565C57.5827 61.2939 53.1201 59.933 48.6962 60.194C32.2664 61.5275 28.2527 79.1995 46.161 81.401C47.5904 81.5767 49.8885 81.4383 51.3944 81.4196C53.8671 81.3732 55.2596 81.2966 57.577 80.4791C65.1916 77.7927 66.9722 69.681 60.8993 64.2565Z" fill="currentColor"/><path d="M46.5375 66.7715C47.6744 66.8574 49.1173 67.6874 49.4039 67.6386C50.6047 67.4349 53.4035 65.7187 53.8765 68.2232C54.2379 70.1372 52.6878 70.8905 51.2 71.7885C51.4497 72.8589 51.57 73.9135 51.7133 75.0011C50.7963 76.2343 48.9974 77.359 47.8399 75.698C46.904 74.3552 47.3322 73.2488 47.6534 71.7885C45.5657 70.6043 43.1752 68.333 46.5375 66.7715Z" fill="currentColor"/><path d="M73.8295 56.054C80.5543 55.9105 82.6935 64.7019 75.7693 66.3224C74.4592 66.3712 73.7392 66.4095 72.587 65.7346C71.2176 64.9369 70.227 63.6214 69.8383 62.0849C69.0391 58.9088 70.8266 56.7864 73.8295 56.054Z" fill="currentColor"/><path d="M23.8407 56.028C30.2974 55.9154 30.7892 64.0883 24.7192 66.3828C17.277 66.357 17.4671 57.7642 23.8407 56.028Z" fill="currentColor"/></svg></div>'+
      '<div class="token-title">Ollama</div>'+
      '<div class="token-card">'+
        '<div class="token-label-row">'+
          '<span class="token-label">状态</span>'+
          '<span class="token-status"><span class="token-status-dot"></span>已连通</span>'+
        '</div>'+
        '<div class="token-label-row">'+
          '<span class="token-label">延迟</span>'+
          '<span class="token-detail">'+elapsed+'s</span>'+
        '</div>'+
        '<div class="token-label-row">'+
          '<span class="token-label">地址</span>'+
          '<span class="token-detail">'+escHtml(url)+'</span>'+
        '</div>'+
        (models.length>0?'<hr class="token-divider"><div class="token-usage-row" style="margin-bottom:4px"><span class="token-usage-label">已安装模型 ('+models.length+')</span>'+(models.length>_ollamaPerPage?'<span class="token-model-pg"><button class="token-model-pg-btn prev" onclick="_ollamaPrev()" disabled>◀</button><span class="token-model-pg-num">1/'+totalPages+'</span><button class="token-model-pg-btn next" onclick="_ollamaNext()">▶</button></span>':'')+'</div><div class="token-model-list">'+pageModels.map(function(m){return '<div class="token-model-item">'+escHtml(m.name)+'</div>';}).join('')+'</div>':'')+
      '</div>'+
      '<div class="token-footer">'+
        '<span class="token-refresh" onclick="renderOllamaPage()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8a6 6 0 0 1 10.47-4M14 8a6 6 0 0 1-10.47 4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M14 2v4h-4M2 14v-4h4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
      '</div>'+
    '</div>';
    body.innerHTML = html;
  }).catch(function(e){
    var elapsed = ((Date.now()-start)/1000).toFixed(1);
    var html = '<div class="token-section">'+
      '<div class="token-logo"><svg width="99" height="131" viewBox="0 0 99 131" style="height:36px;width:auto;display:block;margin:0 auto" xmlns="http://www.w3.org/2000/svg"><path d="M72.48 0.993031C77.4903 -1.86521 82.7457 1.908 84.9829 6.45397C88.3905 13.3788 89.8275 26.9411 87.5815 34.2479C94.1456 39.7258 97.4952 45.0296 98.6167 53.6385C99.4397 59.9562 98.2247 67.6453 94.2114 72.7723C96.4073 77.4233 97.6978 80.9544 98.2319 86.1503C98.9241 92.8844 97.8813 101.924 93.4175 107.346C93.5117 107.465 93.6024 107.588 93.689 107.714C97.9363 113.868 97.7961 123.668 96.4429 130.743C93.8568 130.784 91.2703 130.786 88.6841 130.748C89.8876 124.697 90.6416 119.936 88.4692 113.906C87.4501 111.077 83.9865 108 86.1499 104.989C89.9876 99.6503 91.509 93.9369 90.854 87.3631C90.5953 84.7413 89.985 82.1659 89.0395 79.7069C88.1599 77.4793 86.1499 74.4947 85.8716 72.2557C85.7072 70.9321 88.5563 68.3195 89.2261 66.9032C90.8029 63.5679 91.66 60.0538 91.3852 56.369C90.9039 49.9141 88.6418 45.1457 83.8218 40.911C78.2906 36.1379 73.9842 37.2699 67.8179 37.0409C65.8201 33.1226 64.9377 31.0824 61.2524 28.2508C52.8671 21.8077 41.4318 23.2445 34.5434 31.1356C33.1059 32.7824 31.6785 35.2677 30.3061 37.1171C27.5565 37.1655 25.0696 36.6264 22.2563 37.2977C9.87717 40.2523 3.96077 55.5416 9.5161 66.5428C10.0968 67.6926 13.4066 71.3815 13.2729 72.3358C12.6627 75.0805 11.0698 77.1931 10.0083 79.8788C7.32412 86.6714 7.25318 96.2231 11.4087 102.461C14.7267 107.441 14.0718 107.261 11.3403 112.516C8.37005 118.232 9.05038 124.676 10.4653 130.73C7.90261 130.806 5.23912 130.765 2.66845 130.761L2.64208 130.636C1.10984 123.109 1.30321 114.002 5.66063 107.401C-1.50653 97.9623 -0.286469 83.2681 4.81688 73.1698C0.914316 67.6103 -0.468643 61.4907 0.13622 54.7792C0.955417 45.6939 4.72398 40.0259 11.56 34.2889L11.4995 34.1131C9.4484 27.9601 10.696 12.6436 13.979 6.71373C15.8472 3.3396 17.4211 1.44205 21.1694 0.18639C31.2144 -0.771835 34.9911 13.053 35.522 20.7508C43.7374 15.3456 55.2399 15.3727 63.4341 20.8016C64.5994 14.0915 65.8394 4.78159 72.48 0.993031ZM76.2866 7.57897C71.6262 12.0498 70.965 19.9755 70.6099 26.0848C70.5513 27.0947 70.7414 28.2441 71.4507 29.0194C72.5353 29.5107 75.7847 29.731 77.0845 29.868C78.1466 30.0668 79.7313 30.3137 80.7183 30.6405C81.5776 24.2907 81.1457 17.4482 78.9868 11.3837C78.564 10.1965 77.5529 7.95917 76.2866 7.57897ZM22.4438 7.59166C18.3937 12.0301 17.8106 21.533 18.0776 27.2186C18.1348 28.351 18.2068 29.4827 18.2925 30.6131C19.9374 30.1947 21.6101 29.8912 23.2974 29.7049C24.0218 29.6418 26.9123 29.5083 27.2475 29.0536C29.5312 25.9569 26.0926 8.26409 22.4438 7.59166Z" fill="currentColor"/><path d="M49.0751 55.2467C55.1116 55.21 60.5316 56.8112 64.8192 61.026C74.6914 70.7307 68.2685 84.4827 55.3759 86.1627C53.5499 86.4008 51.903 86.3584 50.1054 86.3571C43.3686 86.4185 39.0346 86.1047 33.6571 81.4489C27.7102 76.2997 27.562 68.1517 32.7958 62.5026C37.4482 57.481 42.313 55.557 49.0751 55.2467ZM60.8993 64.2565C57.5827 61.2939 53.1201 59.933 48.6962 60.194C32.2664 61.5275 28.2527 79.1995 46.161 81.401C47.5904 81.5767 49.8885 81.4383 51.3944 81.4196C53.8671 81.3732 55.2596 81.2966 57.577 80.4791C65.1916 77.7927 66.9722 69.681 60.8993 64.2565Z" fill="currentColor"/><path d="M46.5375 66.7715C47.6744 66.8574 49.1173 67.6874 49.4039 67.6386C50.6047 67.4349 53.4035 65.7187 53.8765 68.2232C54.2379 70.1372 52.6878 70.8905 51.2 71.7885C51.4497 72.8589 51.57 73.9135 51.7133 75.0011C50.7963 76.2343 48.9974 77.359 47.8399 75.698C46.904 74.3552 47.3322 73.2488 47.6534 71.7885C45.5657 70.6043 43.1752 68.333 46.5375 66.7715Z" fill="currentColor"/><path d="M73.8295 56.054C80.5543 55.9105 82.6935 64.7019 75.7693 66.3224C74.4592 66.3712 73.7392 66.4095 72.587 65.7346C71.2176 64.9369 70.227 63.6214 69.8383 62.0849C69.0391 58.9088 70.8266 56.7864 73.8295 56.054Z" fill="currentColor"/><path d="M23.8407 56.028C30.2974 55.9154 30.7892 64.0883 24.7192 66.3828C17.277 66.357 17.4671 57.7642 23.8407 56.028Z" fill="currentColor"/></svg></div>'+
      '<div class="token-title">Ollama</div>'+
      '<div class="token-card">'+
        '<div class="token-label-row">'+
          '<span class="token-label">状态</span>'+
          '<span class="token-status unavail"><span class="token-status-dot unavail"></span>未连通</span>'+
        '</div>'+
        '<div class="token-label-row">'+
          '<span class="token-label">错误</span>'+
          '<span class="token-detail">'+escHtml(e.message)+'</span>'+
        '</div>'+
        '<div class="token-label-row">'+
          '<span class="token-label">地址</span>'+
          '<span class="token-detail">'+escHtml(url)+'</span>'+
        '</div>'+
      '</div>'+
      '<div class="token-footer">'+
        '<span class="token-setup-btn" onclick="renderOllamaPage()">重新检测</span>'+
      '</div>'+
    '</div>';
    body.innerHTML = html;
  });
}

// ====== Page 4: Ragflow Status ======
// Ragflow logo SVG (official logo from ragflow.ai)
var _ragflowLogoSVG = '<svg width="525" height="538" viewBox="0 0 525 538" fill="none" style="height:36px;width:auto;display:block;margin:0 auto" xmlns="http://www.w3.org/2000/svg"><path d="M472.022 173.128C480.647 164.622 493.32 160.888 504.973 165.146C507.498 165.987 510.28 167.602 512.371 169.253C513.742 170.739 515.212 172.1 516.794 173.497C524.915 178.488 527.399 201.41 522.215 208.917C515.448 218.719 498.196 235.444 489.099 243.986C484.793 248.029 481.398 252.79 477.349 256.924L414.47 320.729C411.279 323.922 408.118 326.364 404.863 329.895C399.407 335.808 394.015 341.57 388.396 347.351C383.994 351.854 378.923 355.663 374.877 360.487C368.049 368.664 360.024 376.19 352.197 383.433C350.109 385.754 347.583 388.082 345.644 390.504C338.466 399.488 329.612 406.559 321.529 414.745L244.341 493.245C238.388 499.324 232.606 506.017 226.774 512.229C224.248 515.062 220.381 517.695 217.939 520.467C207.521 532.301 196.308 541.314 179.66 536.068C177.544 535.401 176.091 534.159 174.237 533.3C167.26 530.054 163.782 524.905 160.454 518.197C157.26 511.989 157.608 500.411 160.052 494.05C160.785 492.14 166.713 483.93 168.416 482.394C173.433 477.868 177.788 472.054 182.655 467.499C188.528 462.004 194.246 456.515 199.903 450.77C203.529 447.09 206.629 443.138 210.152 439.5L267.346 381.322L294.399 353.711C297.1 350.984 300.845 348.225 303.276 345.47C308.564 339.475 314.108 333.849 319.574 328.026C321.818 325.64 324.93 323.41 326.999 321.092C330.834 316.796 334.985 313.058 338.973 308.982L417.537 229.018C421.836 224.656 425.918 220.176 430.039 215.646C432.39 213.06 435.493 210.699 437.989 208.101C449.233 196.298 460.412 184.582 472.022 173.128ZM178.203 330.828C196.116 330.569 208.95 343.233 209.075 360.533C209.105 364.628 208.302 374.429 206.11 377.853C203.492 381.944 198.067 387.08 194.648 390.563L181.256 404.195L149.504 436.764C147.585 438.751 145.301 440.499 143.371 442.477C134.777 451.286 126.507 460.571 117.55 468.972C110.44 475.641 105.399 478.812 95.5351 479.207C86.8359 478.987 82.0212 477.569 75.0966 471.863C67.6737 465.749 65.3296 459.887 64.499 450.322C64.038 445.012 65.2226 436.766 67.8076 432.007C68.9305 429.942 73.1985 425.569 74.9296 423.581C81.5498 415.982 88.9318 409.218 96.0068 402.056L130.883 366.382C137.148 360.082 143.389 353.669 150.001 347.717C151.714 346.174 153.476 342.653 155.283 341.019C162.453 334.541 168.644 331.35 178.203 330.828ZM491.728 320.408C498.728 320.22 506.901 321.485 512.99 325.871C525.126 334.615 526.682 349.092 523.265 362.722C522.982 363.844 520.694 367.205 519.86 368.197C509.596 380.398 497.826 391.636 486.618 402.974C480.698 409.014 475.225 415.077 468.213 419.914C464.974 422.145 459.261 423.114 455.448 423.626C448.679 424.456 440.505 422.141 435.029 418.117C428.444 413.28 424.388 406.371 423.156 398.337C421.61 388.267 423.879 380.155 429.896 372.085C436.157 363.688 446.387 355.673 453.824 348.196C459.994 341.994 469.299 330.057 476.532 325.417C480.873 322.632 486.687 321.16 491.728 320.408ZM32.3593 322.914C49.2984 321.228 64.4175 333.542 66.1943 350.473C67.9712 367.403 55.7391 382.586 38.8193 384.457C21.7683 386.341 6.43907 373.994 4.64839 356.931C2.8579 339.87 15.2887 324.61 32.3593 322.914ZM437.486 68.4542C444.927 68.449 453.227 70.7077 458.583 76.1016C464.882 82.4676 468.378 91.0882 468.287 100.044C468.079 119.819 446.123 133.466 434.085 146.979C428.09 153.707 420.39 161.802 413.621 167.915L307.786 275.399C303.704 279.562 299.078 284.154 295.19 288.424C286.66 298.102 276.194 309.488 261.974 308.811C243.981 307.955 231.201 295.627 231.679 277.325C232.109 260.855 240.282 255.748 251.187 244.754C262.988 232.858 273.672 220.685 286.265 209.618C289.017 207.221 292.191 202.621 294.989 199.755L333.425 160.515C335.266 158.668 338.373 156.83 339.884 155.062C348.116 145.409 357.258 136.717 366.304 127.815C376.238 117.786 385.352 107.712 395.821 98.1094C403.495 91.0697 411.208 79.602 420.06 73.7774C425.211 70.3126 431.278 68.46 437.486 68.4542ZM344.851 8.39655C354.538 8.29609 361.726 13.0842 368.668 19.4258C373.881 24.176 374.818 33.8744 375.101 40.418C375.214 43.0663 373.304 53.0779 372.075 55.1739C367.877 62.3407 356.094 72.2422 350.304 78.0645L321.607 107.151C319.043 109.725 316.825 112.583 314.335 115.113C307.384 122.187 300.299 129.422 292.978 136.118C281.55 151.384 261.546 166.041 249.237 181.458C247.313 183.869 242.746 187.016 240.292 189.523L154.68 276.415C152.66 278.445 150.795 281.366 148.818 283.298C144.739 286.981 139.908 293.226 135.278 296.033C124.047 302.845 105.437 301.733 96.4189 291.906C86.2096 280.779 85.3012 262.217 94.0976 250.107C99.1243 243.188 106.567 237.495 112.646 231.488C124.333 219.441 135.592 207.023 147.832 195.518C149.998 193.482 151.878 190.576 154.09 188.659C161.017 182.656 167 175.903 173.536 169.505C175.943 167.149 177.982 164.011 180.471 161.581C183.111 159.004 185.88 156.921 188.585 154.447C194.759 147.483 201.576 141.152 207.863 134.279C209.708 132.263 212.116 130.581 213.969 128.603C224.806 117.034 235.785 105.631 247.315 94.7422L302.715 38.4454L313.719 27.1026C322.735 17.7061 330.685 8.54376 344.851 8.39655ZM119.551 81.8262C127.278 82.1382 133.212 83.5115 139.127 88.836C145.684 95.1368 149.691 101.151 150.553 110.075C152.254 127.677 141.557 134.807 130.002 146.617L101.749 175.184C99.9606 176.993 98.6576 179.175 96.9804 181.02C94.3106 183.729 91.4727 186.271 88.7021 188.884C86.1447 191.296 83.8147 193.909 81.2959 196.357C80.0173 197.599 78.6488 198.809 77.4121 200.081C69.5625 208.152 61.9368 216.429 54.0097 224.418C47.4548 231.025 40.4768 234.085 31.1259 234.58C24.3637 234.223 17.127 232.295 12.1259 227.611C5.63365 221.54 0.474522 214.236 0.0497578 205.182C-0.486799 193.736 3.33291 187.82 10.6923 179.671C14.3922 175.575 17.8379 171.612 22.1025 167.89C24.3716 165.909 26.5758 162.741 28.9003 160.711C33.8073 156.626 37.3853 152.548 41.4834 147.675C44.9671 143.532 49.587 139.532 53.4218 135.624C55.8794 133.119 59.1617 130.884 61.582 128.272C71.0028 117.543 80.6439 107.471 91.1816 97.8389C95.6076 93.7934 98.6395 88.9459 104.077 85.6954C109.389 82.5198 113.506 82.2091 119.551 81.8262ZM194.269 0.106509C201.174 -0.674007 210.699 2.93836 215.792 7.56549C236.091 26.0067 226.879 63.5111 197.791 65.752C182.255 66.2967 168.007 55.6583 165.566 40.0323C162.316 19.2218 172.416 2.55953 194.269 0.106509Z" fill="currentColor"/></svg>';

function renderRagflowPage() {
  var body = document.getElementById('widgetBody');
  if(!body) return;
  var url = (window.__IFTO_SETTINGS&&window.__IFTO_SETTINGS.ragflowUrl) || 'http://localhost:9380';
  body.innerHTML = '<div class="token-loading">检测中...</div>';
  var start = Date.now();
  // Try multiple endpoints
  var endpoints = [url+'/api/', url+'/api/health', url+'/api/new/chat', url];
  function tryEndpoint(idx) {
    if(idx>=endpoints.length) {
      var elapsed2 = ((Date.now()-start)/1000).toFixed(1);
      body.innerHTML = '<div class="token-section">'+
        '<div class="token-logo">'+_ragflowLogoSVG+'</div>'+
        '<div class="token-title">Ragflow</div>'+
        '<div class="token-card">'+
          '<div class="token-label-row">'+
            '<span class="token-label">状态</span>'+
            '<span class="token-status unavail"><span class="token-status-dot unavail"></span>未连通</span>'+
          '</div>'+
          '<div class="token-label-row">'+
            '<span class="token-label">错误</span>'+
            '<span class="token-detail">所有端点均无响应</span>'+
          '</div>'+
          '<div class="token-label-row">'+
            '<span class="token-label">地址</span>'+
            '<span class="token-detail">'+escHtml(url)+'</span>'+
          '</div>'+
        '</div>'+
        '<div class="token-footer">'+
          '<span class="token-setup-btn" onclick="renderRagflowPage()">重新检测</span>'+
        '</div>'+
      '</div>';
      return;
    }
    fetch(endpoints[idx], {method:'GET', signal: AbortSignal.timeout(5000)}).then(function(r){
      var elapsed2 = ((Date.now()-start)/1000).toFixed(1);
      var html2 = '<div class="token-section">'+
        '<div class="token-logo">'+_ragflowLogoSVG+'</div>'+
        '<div class="token-title">Ragflow</div>'+
        '<div class="token-card">'+
          '<div class="token-label-row">'+
            '<span class="token-label">状态</span>'+
            '<span class="token-status"><span class="token-status-dot"></span>'+(r.ok?'已连通':'可访问')+'</span>'+
          '</div>'+
          '<div class="token-label-row">'+
            '<span class="token-label">延迟</span>'+
            '<span class="token-detail">'+elapsed2+'s</span>'+
          '</div>'+
          '<div class="token-label-row">'+
            '<span class="token-label">地址</span>'+
            '<span class="token-detail">'+escHtml(url)+'</span>'+
          '</div>'+
          '<div class="token-label-row">'+
            '<span class="token-label">状态码</span>'+
            '<span class="token-detail">'+(r.ok?'200':'非200')+'</span>'+
          '</div>'+
        '</div>'+
        '<div class="token-footer">'+
          '<span class="token-refresh" onclick="renderRagflowPage()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8a6 6 0 0 1 10.47-4M14 8a6 6 0 0 1-10.47 4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M14 2v4h-4M2 14v-4h4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
        '</div>'+
      '</div>';
      body.innerHTML = html2;
    }).catch(function(e){
      tryEndpoint(idx+1);
    });
  }
  tryEndpoint(0);
}

// ====== Initialization ======

// Inbox tab switching
document.querySelectorAll('#inbox .tab[data-tab]').forEach(function(t){
  t.addEventListener('click', function(){
    switchInboxTab(this.getAttribute('data-tab'));
  });
});
// Init first inbox tab
switchInboxTab('collect');

// Sort toggle for inbox collect
(function(){
  var btn = document.getElementById('inboxSortBtn');
  if(btn) {
    btn.onclick = function(){
      inboxSortDesc = !inboxSortDesc;
      btn.textContent = inboxSortDesc ? '排序：从新到旧' : '排序：从旧到新';
      renderInbox();
    };
  }
})();

// Init widget carousel
try { renderWidget(); } catch(e){console.error('IFTO: renderWidget error',e)}

// Widget carousel navigation
document.getElementById('widgetPrev')?.addEventListener('click',widgetPrev);
document.getElementById('widgetNext')?.addEventListener('click',widgetNext);

// Handle "返回首页" links (link-back) — scroll page to top
document.querySelectorAll('a.link-back[href="#home"]').forEach(function(link){
  link.addEventListener('click', function(e){
    e.preventDefault();
    var page = document.querySelector('.page');
    if(page) page.scrollTo({top: 0, behavior: 'smooth'});
    // Also update nav active state
    document.querySelectorAll('.nav-item').forEach(function(n){ n.classList.remove('active'); });
    var homeNav = document.querySelector('.nav-item[href="#home"]');
    if(homeNav) homeNav.classList.add('active');
  });
});

// ====== Hero image: random from folder or single URL ======
function loadHeroImage() {
  try {
    var heroImg = document.getElementById('heroImage');
    var settings = window.__IFTO_SETTINGS || {};
    if(!heroImg) return;
    if(settings.heroImageFolder && typeof window.__IFTO_getRandomImageFromFolder === 'function') {
      window.__IFTO_getRandomImageFromFolder(settings.heroImageFolder).then(function(url){
        if(url) {
          heroImg.style.backgroundImage = 'url("' + url + '")';
        } else if(settings.heroImageUrl) {
          if(typeof window.__IFTO_resolveImageUrl === 'function') {
            window.__IFTO_resolveImageUrl(settings.heroImageUrl).then(function(url2){
              if(url2) heroImg.style.backgroundImage = 'url("' + url2 + '")';
            });
          } else {
            heroImg.style.backgroundImage = 'url("' + settings.heroImageUrl + '")';
          }
        }
      });
    } else if(settings.heroImageUrl) {
      if(typeof window.__IFTO_resolveImageUrl === 'function') {
        window.__IFTO_resolveImageUrl(settings.heroImageUrl).then(function(url){
          if(url) heroImg.style.backgroundImage = 'url("' + url + '")';
        });
      } else {
        heroImg.style.backgroundImage = 'url("' + settings.heroImageUrl + '")';
      }
    }
  } catch(e) { console.error('IFTO: loadHeroImage error', e); }
}

// Load hero image on page load
loadHeroImage();

// Click "换个心情" to randomly switch hero image
document.getElementById('heroRefreshLabel')?.addEventListener('click', function(e) {
  e.stopPropagation();
  if(typeof domainMode !== 'undefined' && domainMode) toggleDomainMode();
  loadHeroImage();
});

// ====== Domain Skill Tree ======
var domainMode = false;
var domainTreeData = null;

// Zoom/pan state
var dZoom = 1, dPanX = 0, dPanY = 0;
var dPanning = false, dPanStartX = 0, dPanStartY = 0;

function applyDomainTransform() {
  var inner = document.getElementById('domainTreeInner');
  if(inner) inner.style.transform = 'translate('+dPanX+'px,'+dPanY+'px) scale('+dZoom+')';
  var pctEl = document.getElementById('domainZoomPct');
  if(pctEl) pctEl.textContent = Math.round(dZoom * 100) + '%';
}

function resetDomainView() {
  dZoom = 1; dPanX = 0; dPanY = 0;
  applyDomainTransform();
}

// Setup zoom/pan (called once on first domainMode enter)
var _domainZoomSetup = false;
function setupDomainZoom() {
  if(_domainZoomSetup) return;
  _domainZoomSetup = true;
  var overlay = document.getElementById('domainTreeOverlay');
  if(!overlay) return;

  // Ctrl/Cmd + wheel → zoom (on document for reliable capture)
  document.addEventListener('wheel', function(e) {
    if(!domainMode) return;
    if(!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    var delta = e.deltaY > 0 ? -0.1 : 0.1;
    dZoom = Math.round(Math.max(0.3, Math.min(3, dZoom + delta)) * 100) / 100;
    applyDomainTransform();
  }, { passive: false });

  // Middle-button drag → pan (on overlay)
  overlay.addEventListener('mousedown', function(e) {
    if(!domainMode) return;
    if(e.button !== 1) return;
    e.preventDefault();
    dPanning = true;
    dPanStartX = e.clientX - dPanX;
    dPanStartY = e.clientY - dPanY;
    overlay.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', function(e) {
    if(!dPanning || !domainMode) return;
    dPanX = e.clientX - dPanStartX;
    dPanY = e.clientY - dPanStartY;
    applyDomainTransform();
  });

  document.addEventListener('mouseup', function(e) {
    if(!dPanning) return;
    dPanning = false;
    var overlay = document.getElementById('domainTreeOverlay');
    if(overlay) overlay.style.cursor = '';
  });

  // Reset button
  var resetBtn = document.getElementById('domainResetBtn');
  if(resetBtn) {
    resetBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      resetDomainView();
    });
  }

  // Watch theme changes → re-render domain tree
  var themeObserver = new MutationObserver(function() {
    if(domainMode && window._domainTreeCache) {
      renderDomainTree(window._domainTreeCache);
    }
  });
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
}

function toggleDomainMode() {
  var overlay = document.getElementById('domainTreeOverlay');
  var heroImg = document.getElementById('heroImage');
  var domainLabel = document.getElementById('heroDomainLabel');
  if(!overlay || !heroImg) return;
  if(!domainMode) {
    domainMode = true;
    setupDomainZoom();
    // Show zoom controls
    var zc = document.getElementById('domainZoomCtrl');
    if(zc) zc.style.display = 'flex';
    if(domainLabel) domainLabel.classList.add('active');
    heroImg.style.backgroundImage = 'none';
    heroImg.style.backgroundColor = document.body.classList.contains('theme-dark') ? '#1e1e1e' : '#fff';
    // Expand container to fit the skill tree (cy + r3out + margin)
    var _expandH = 830;
    heroImg.style.minHeight = _expandH + 'px';
    var heroRight = heroImg.parentElement;
    if(heroRight) heroRight.style.minHeight = _expandH + 'px';
    if(domainTreeData) {
      renderDomainTree(domainTreeData);
    } else {
      renderDomainTreeLoading();
      if(typeof window.__IFTO_getDomainTree === 'function') {
        var domainFolder = (window.__IFTO_SETTINGS && window.__IFTO_SETTINGS.domainFolder) || '300-领域AREA';
        window.__IFTO_getDomainTree(domainFolder).then(function(data) {
          domainTreeData = data;
          window._domainTreeCache = data;
          renderDomainTree(data);
        }).catch(function(err) {
          console.error('IFTO: bridge failed', err);
          var inner = document.getElementById('domainTreeInner');
          if(inner) inner.innerHTML = '<div class="dt-empty">加载失败: '+escHtml(String(err))+'</div>';
        });
      } else {
        var inner = document.getElementById('domainTreeInner');
        if(inner) inner.innerHTML = '<div class="dt-empty">Bridge 未就绪，请重载插件</div>';
      }
    }
  } else {
    domainMode = false;
    if(domainLabel) domainLabel.classList.remove('active');
    overlay.style.display = 'none';
    var zc = document.getElementById('domainZoomCtrl');
    if(zc) zc.style.display = 'none';
    heroImg.style.backgroundImage = '';
    heroImg.style.backgroundColor = '';
    heroImg.style.minHeight = '';
    var heroRight = heroImg.parentElement;
    if(heroRight) heroRight.style.minHeight = '';
    loadHeroImage();
  }
}

function renderDomainTreeLoading() {
  var overlay = document.getElementById('domainTreeOverlay');
  var inner = document.getElementById('domainTreeInner');
  if(!overlay || !inner) return;
  inner.innerHTML = '<div class="domain-tree-loading">加载领域数据中…</div>';
  overlay.style.display = 'block';
}

function renderDomainTree(treeData) {
  var overlay = document.getElementById('domainTreeOverlay');
  var inner = document.getElementById('domainTreeInner');
  if(!overlay || !inner) return;
  overlay.style.display = 'block';
  if(!treeData || treeData.length === 0) {
    inner.innerHTML = '<div class="dt-empty">暂无领域数据</div>';
    return;
  }
  try {
  var oRect = overlay.getBoundingClientRect();
  var W = oRect.width, H = oRect.height;
  if(W < 100) W = 800; if(H < 100) H = 600;
  var cx = W / 2, cy = H / 2;

  var dark = document.body.classList.contains('theme-dark');
  // Force overlay background — use backgroundColor to beat CSS background shorthand
  overlay.style.backgroundColor = dark ? '#1e1e1e' : '#fff';
  var accent = dark ? '#fff' : '#111';
  var bg = dark ? '#1e1e1e' : '#fff';
  var textColor = dark ? '#e8e8e8' : '#111';
  var text2 = dark ? '#aaa' : '#666';
  var lineColor = dark ? '#444' : '#d4d4d4';

  function sectorPath(cx, cy, r1, r2, a1, a2) {
    var large = (a2 - a1) > Math.PI ? 1 : 0;
    var x1o = cx + r2 * Math.cos(a1), y1o = cy + r2 * Math.sin(a1);
    var x2o = cx + r2 * Math.cos(a2), y2o = cy + r2 * Math.sin(a2);
    var x1i = cx + r1 * Math.cos(a1), y1i = cy + r1 * Math.sin(a1);
    var x2i = cx + r1 * Math.cos(a2), y2i = cy + r1 * Math.sin(a2);
    return 'M '+x1o+' '+y1o+' A '+r2+' '+r2+' 0 '+large+' 1 '+x2o+' '+y2o+
           ' L '+x2i+' '+y2i+' A '+r1+' '+r1+' 0 '+large+' 0 '+x1i+' '+y1i+' Z';
  }

  if(!window._stExpanded) window._stExpanded = {};
  var sectorColors = dark
    ? ['rgba(255,255,255,0.55)','rgba(255,255,255,0.35)','rgba(255,255,255,0.2)']
    : ['rgba(0,0,0,0.45)','rgba(0,0,0,0.28)','rgba(0,0,0,0.13)'];
  var lightColor = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.035)';

  var donutInner = 55, donutOuter = 180;
  var r2in = donutOuter + 18, r2out = donutOuter + 65;
  var r3in = r2out + 8, r3out = r2out + 50;
  // Auto-scale: ensure r3out fits within the container
  var maxR = r3out + 10;
  var baseR3out = r3out;
  var _scale = maxR / baseR3out;
  var n = treeData.length;
  var sectorAngle = 2 * Math.PI / n;
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" style="position:absolute;top:0;left:0;width:'+W+'px;height:'+H+'px;z-index:1">';
  var labelDivs = '';
  var arcDefs = '';
  var arcIdCounter = 0;
  function arcTextPath(r, a1, a2, midA) {
    var top = Math.sin(midA) < 0.5;
    var startA = top ? a1 : a2;
    var endA = top ? a2 : a1;
    var sx = cx + r * Math.cos(startA);
    var sy = cy + r * Math.sin(startA);
    var ex = cx + r * Math.cos(endA);
    var ey = cy + r * Math.sin(endA);
    var sweep = top ? 1 : 0;
    var id = 'ap' + (arcIdCounter++);
    var d = 'M ' + sx + ' ' + sy + ' A ' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + ex + ' ' + ey;
    arcDefs += '<path id="'+id+'" d="'+d+'" fill="none" stroke="none"/>';
    return id;
  }

  // === Ring 1: major sectors ===
  for(var i = 0; i < n; i++) {
    var branch = treeData[i];
    var pct = branch.totalTasks > 0 ? Math.round(branch.completedTasks / branch.totalTasks * 100) : 0;
    var a1 = -Math.PI/2 + i * sectorAngle;
    var a2 = a1 + sectorAngle;
    var fillR = donutInner + (donutOuter - donutInner) * Math.max(0.04, pct / 100);
    var color = sectorColors[i];

    svg += '<path d="'+sectorPath(cx, cy, donutInner, donutOuter, a1, a2)+'" fill="'+lightColor+'" stroke="'+lineColor+'" stroke-width="1.5"/>';
    svg += '<path d="'+sectorPath(cx, cy, donutInner, fillR, a1, a2)+'" fill="'+color+'"/>';
    svg += '<path class="st-sector" data-path="'+escHtml(branch.path||'')+'" data-ring="1" d="'+sectorPath(cx, cy, donutInner, donutOuter, a1, a2)+'" fill="transparent" stroke="none" style="cursor:pointer"><title>'+escHtml(branch.name)+'</title></path>';

    var midA = (a1 + a2) / 2;
    var labelR = donutInner + (donutOuter - donutInner) * 0.55;
    var lx = cx + labelR * Math.cos(midA);
    var ly = cy + labelR * Math.sin(midA);
    var lw = labelR * sectorAngle * 0.78;
    labelDivs += '<div style="position:absolute;left:'+(lx-lw/2)+'px;top:'+(ly-22)+'px;width:'+lw+'px;height:44px;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;z-index:2;text-align:center;line-height:1.3;overflow:hidden">';
    labelDivs += '<span style="font-size:13px;font-weight:700;color:'+textColor+';word-break:break-all">'+escHtml(branch.name)+'</span>';
    labelDivs += '<span style="font-size:10px;color:'+text2+'">'+pct+'% \u00b7 '+branch.fileCount+'文件</span>';
    labelDivs += '</div>';
  }

  // === Center ===
  svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+donutInner+'" fill="'+bg+'" stroke="'+accent+'" stroke-width="2"/>';
  svg += '<text x="'+cx+'" y="'+(cy-6)+'" text-anchor="middle" font-size="15" font-weight="700" fill="'+textColor+'" style="pointer-events:none">领域</text>';
  svg += '<text x="'+cx+'" y="'+(cy+14)+'" text-anchor="middle" font-size="11" fill="'+text2+'" style="pointer-events:none">技能树</text>';

  // === Ring 2: sub-folders + Ring 3: files ===
  var activeSub = window._stActiveSub || null;

  for(var ei = 0; ei < n; ei++) {
    var eb = treeData[ei];
    if(!window._stExpanded[eb.path || '']) continue;
    var subs = eb.subfolders || [];
    var ea1 = -Math.PI/2 + ei * sectorAngle;
    var ea2 = ea1 + sectorAngle;
    var childAngle = sectorAngle / Math.max(1, subs.length);

    for(var sj = 0; sj < subs.length; sj++) {
      var sub = subs[sj];
      var subPct = sub.totalTasks > 0 ? Math.round(sub.completedTasks / sub.totalTasks * 100) : 0;
      var sa1 = ea1 + sj * childAngle + childAngle * 0.05;
      var sa2 = ea1 + (sj + 1) * childAngle - childAngle * 0.05;
      var subFillR = r2in + (r2out - r2in) * Math.max(0.04, subPct / 100);
      var isActiveSub = (activeSub === sub.path);

      svg += '<path d="'+sectorPath(cx, cy, r2in, r2out, sa1, sa2)+'" fill="'+lightColor+'" stroke="'+lineColor+'" stroke-width="1"/>';
      svg += '<path d="'+sectorPath(cx, cy, r2in, subFillR, sa1, sa2)+'" fill="'+color+'"/>';
      svg += '<path class="st-sector" data-path="'+escHtml(sub.path||'')+'" data-ring="2" d="'+sectorPath(cx, cy, r2in, r2out, sa1, sa2)+'" fill="transparent" stroke="none" style="cursor:pointer"><title>'+escHtml(sub.name)+'</title></path>';

      var smid = (sa1 + sa2) / 2;
      var slR = r2in + (r2out - r2in) * 0.5;
      var sPathId = arcTextPath(slR, sa1, sa2, smid);
      var sPathId2 = arcTextPath(slR - 12, sa1, sa2, smid);
      svg += '<text style="pointer-events:none"><textPath href="#'+sPathId+'" startOffset="50%" text-anchor="middle" fill="'+textColor+'" font-size="9" font-weight="600">'+escHtml(sub.name)+'</textPath></text>';
      svg += '<text style="pointer-events:none"><textPath href="#'+sPathId2+'" startOffset="50%" text-anchor="middle" fill="'+text2+'" font-size="8">'+subPct+'% \u00b7 '+sub.fileCount+'</textPath></text>';

      // === Ring 3: only the active sub-folder's children ===
      if(isActiveSub) {
        var items = [];
        // Deeper sub-folders first
        var deeperSubs = sub.subfolders || [];
        for(var ds = 0; ds < deeperSubs.length; ds++) {
          items.push({ name: deeperSubs[ds].name, path: deeperSubs[ds].path, leaf: false, total: deeperSubs[ds].totalTasks||0, done: deeperSubs[ds].completedTasks||0, fileCount: deeperSubs[ds].fileCount||0 });
        }
        // Then files
        var fls = sub.files || [];
        for(var fi = 0; fi < fls.length; fi++) {
          var f = fls[fi];
          var fname = (f.name || f.path || '').split('/').pop().replace(/\.md$/i, '');
          items.push({ name: fname, path: f.path, leaf: true, total: f.totalTasks||0, done: f.completedTasks||0, fileCount: 0 });
        }
        var itemCount = items.length;
        // Wider spread for Ring 3: use at least 50% of parent Ring 1 sector
        var midAngle = (sa1 + sa2) / 2;
        var spreadAngle = Math.max(sa2 - sa1, sectorAngle * 0.5);
        var r3a1 = midAngle - spreadAngle / 2;
        for(var ii = 0; ii < itemCount; ii++) {
          var item = items[ii];
          var ia1 = r3a1 + ii * (spreadAngle / itemCount) + (spreadAngle / itemCount) * 0.05;
          var ia2 = r3a1 + (ii + 1) * (spreadAngle / itemCount) - (spreadAngle / itemCount) * 0.05;
          var ipct = item.total > 0 ? Math.round(item.done / item.total * 100) : 0;
          var ifillR = r3in + (r3out - r3in) * Math.max(0.04, ipct / 100);

          svg += '<path d="'+sectorPath(cx, cy, r3in, r3out, ia1, ia2)+'" fill="'+lightColor+'" stroke="'+lineColor+'" stroke-width="0.5"/>';
          if(item.total > 0) {
            svg += '<path d="'+sectorPath(cx, cy, r3in, ifillR, ia1, ia2)+'" fill="'+color+'"/>';
          }
          svg += '<path class="st-sector" data-path="'+escHtml(item.path||'')+'"'+(item.leaf?' data-leaf="1"':'')+' data-ring="3" d="'+sectorPath(cx, cy, r3in, r3out, ia1, ia2)+'" fill="transparent" stroke="none" style="cursor:pointer"><title>'+escHtml(item.name+(item.total>0?' '+Math.round(item.done/item.total*100)+'%':''))+'</title></path>';

          var imid = (ia1 + ia2) / 2;
          var ilR = r3in + (r3out - r3in) * 0.5;
          var iPathId = arcTextPath(ilR, ia1, ia2, imid);
          var fullName = item.name + (item.total > 0 ? ' ' + ipct + '%' : '');
          svg += '<text style="pointer-events:none"><textPath href="#'+iPathId+'" startOffset="50%" text-anchor="middle" fill="'+text2+'" font-size="8">'+escHtml(fullName)+'</textPath></text>';
        }
      }
    }
  }

  svg += '<defs>' + arcDefs + '</defs>';
  svg += '</svg>';
  inner.style.position = 'absolute';
  inner.style.top = '0px';
  inner.style.left = '0px';
  inner.style.width = W + 'px';
  inner.style.height = H + 'px';
  inner.innerHTML = svg + labelDivs;
  applyDomainTransform();

  var sectors = inner.querySelectorAll('.st-sector');
  for(var k = 0; k < sectors.length; k++) {
    sectors[k].addEventListener('click', function(e) {
      e.stopPropagation();
      var path = this.getAttribute('data-path');
      var ring = this.getAttribute('data-ring');
      if(this.getAttribute('data-leaf') === '1' && path) {
        if(typeof window.__IFTO_openFile === 'function') window.__IFTO_openFile(path);
        return;
      }
      if(!path) return;
      if(ring === '2') {
        // Single expand: only one Ring 2 active at a time
        window._stActiveSub = (window._stActiveSub === path) ? null : path;
      } else {
        // Ring 1 toggle
        window._stExpanded[path] = window._stExpanded[path] ? false : true;
      }
      renderDomainTree(window._domainTreeCache || treeData);
    });
  }
  } catch(err) {
    inner.innerHTML = '<div class="dt-empty">渲染出错: '+escHtml(String(err))+'</div>';
    console.error('IFTO: renderDomainTree error', err);
  }
}

// Click "领域" to toggle domain skill tree
document.getElementById('heroDomainLabel')?.addEventListener('click', function(e) {
  e.stopPropagation();
  toggleDomainMode();
});

// Nav active state
var navClickActive = false;
document.querySelectorAll('.nav-item').forEach(item=>{
  item.addEventListener('click',function(e){
    e.preventDefault();
    navClickActive = true;
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    this.classList.add('active');
    const id = this.getAttribute('href')?.replace('#','');
    if(id){
      if(id === 'home'){
        var page = document.querySelector('.page');
        if(page) page.scrollTo({top: 0, behavior: 'smooth'});
      } else {
        const target = document.getElementById(id);
        if(target) target.scrollIntoView({behavior:'smooth'});
      }
    }
    setTimeout(function(){navClickActive=false},600);
  });
});
// Update active nav on scroll
var navItems = document.querySelectorAll('.nav-item');
var navSections = ['home','inbox','todo','project','note','review'];
var navScrollPending = false;
function updateActiveNav(){
  if(navClickActive) return;
  let cur = navSections[0];
  for(const id of navSections){
    const el = document.getElementById(id);
    if(el && el.getBoundingClientRect().top <= 120) cur = id;
  }
  navItems.forEach(n=>n.classList.remove('active'));
  const link = document.querySelector('.nav-item[href="#'+cur+'"]');
  if(link) link.classList.add('active');
  navScrollPending = false;
}
var scrollContainer = document.querySelector('.page') || window;
scrollContainer.addEventListener('scroll',()=>{
  if(!navScrollPending){navScrollPending=true;requestAnimationFrame(updateActiveNav)}
},{passive:true});
setTimeout(updateActiveNav,200);

// ====== Right-click delete cards & folders ======
document.querySelector('.ifto-container')?.addEventListener('contextmenu', function(e) {
  var card = e.target.closest('.card-detail, .todo-item, .card-sm, .project-card, .project-file-item, .project-folder-card, .project-folder-header, .note-card, .habit-row, .wn-card');
  if(!card) return;
  e.preventDefault();

  // Check if this is a folder (project-folder-header or project-folder-card)
  if(card.classList.contains('project-folder-card') || card.classList.contains('project-folder-header')) {
    var folderPath = card.getAttribute('data-path') || card.getAttribute('data-folder');
    if(!folderPath) return;
    var folName = folderPath.split('/').pop();
    if(confirm('确定要删除项目文件夹「' + folName + '」及其所有内容吗？')) {
      if(window.__IFTO_deleteFolder) {
        window.__IFTO_deleteFolder(folderPath).then(function(ok){
          if(ok) { renderInbox(); renderProject(); renderTodo(); renderActivity(); renderNote(); }
        });
      }
    }
    return;
  }

  var path = card.getAttribute('data-path');
  if(!path) return;
  var name = path.split('/').pop().replace(/\.md$/i,'');
  if(confirm('确定要删除「' + name + '」吗？')) {
    if(window.__IFTO_deleteFile) {
      if(_isDraftPath(path)) console.log('[IFTO] 草稿箱右键删除: "' + path + '"');
      window.__IFTO_deleteFile(path).then(function(success){
        if(success) {
          // Remove from order file if exists
          var folder = path.substring(0, path.lastIndexOf('/'));
          var fileName = path.split('/').pop();
          if(window.__IFTO_readListOrder) {
            window.__IFTO_readListOrder(folder).then(function(order){
              if(order && order.length) {
                var idx = order.indexOf(fileName);
                if(idx >= 0) { order.splice(idx,1); window.__IFTO_writeListOrder(folder, order); }
              }
            });
          }
          renderInbox();
          renderTodo();
          renderActivity();
          renderProject();
          renderNote();
          renderReview();
          if(typeof renderWeekNotesPage==='function') renderWeekNotesPage();
        }
      });
    }
  }
});
