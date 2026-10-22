/* In-memory sample vault for browser QA only; never loaded into the plugin. */
(function() {
  var files = new Map(), folders = new Set(), calls = [];
  var settings = {
    inboxFolder: 'Inbox', quickLearnFolder: 'Learn', todoFolder: 'Todos', activityFolder: 'Activities',
    taskFolder: 'Projects', projectBase: 'Projects', projectCols: '未开始,推进中,已完成',
    draftFolder: 'Drafts', archivePath: 'Archive', bookFolder: 'Books', paperFolder: 'Papers',
    resourceRoot: 'Resources', domainFolder: 'Areas', notePath: 'Notes', shortcutNotePath: 'Notes',
    reviewDailyPath: 'Reviews/Daily', reviewWeeklyPath: 'Reviews/Weekly', reviewMonthlyPath: 'Reviews/Monthly', reviewProjectPath: 'Reviews/Projects',
    widgetOrder: 'calendar,habits,todotoday', widgetCalendarEnabled: true, widgetHabitsEnabled: true,
    widgetTodotodayEnabled: true, widgetDeepseekEnabled: false, widgetMinimaxEnabled: false, widgetWeeknotesEnabled: false
  };
  window.__IFTO_SETTINGS = settings;
  window.__fixture = { files: files, calls: calls };
  function put(p, fm) { files.set(p, { fm: fm || {}, ctime: Date.now() - files.size * 86400000, checked: false }); folders.add(p.slice(0, p.lastIndexOf('/'))); }
  for(var i=1;i<=19;i++) {
    put('Inbox/收集文件 ' + i + ' — 一段稍长的标题.md');
    put('Learn/学习记录 ' + i + '.md');
    put('Books/书籍 ' + i + '.md', { title: '书籍 ' + i, status: i < 15 ? '在读' : '已读', author: '作者', description: '阅读内容', rating: 3 });
    put('Papers/文献 ' + i + '.md', { title: '研究文献 ' + i, author: '作者', year: 2026 });
    ['Daily','Weekly','Monthly','Projects'].forEach(function(type) { put('Reviews/' + type + '/复盘记录 ' + i + '.md'); });
  }
  for(var j=1;j<=4;j++) { put('Todos/今日待办 ' + j + '.md'); put('Activities/活动清单 ' + j + '.md'); }
  ['未开始','推进中','已完成'].forEach(function(status, n) {
    put('Projects/独立任务 ' + n + '.md', { status: status });
    put('Projects/示例项目/任务 ' + n + '.md', { status: status });
  });
  put('Drafts/草稿任务.md', { status: '未开始' });
  put('Resources/参考资料/参考笔记.md');
  function list(folder, recursive) {
    return Array.from(files).filter(function(entry) {
      if(!entry[0].startsWith(folder + '/')) return false;
      return recursive || entry[0].slice(folder.length + 1).indexOf('/') < 0;
    }).map(function(entry) { return { name: entry[0].slice(folder.length + 1), fm: entry[1].fm, ctime: entry[1].ctime, title: entry[1].fm.title, tags: [] }; });
  }
  window.__IFTO_listFiles = async function(folder) { return list(folder, false).map(function(f) { return f.name; }); };
  window.__IFTO_getFilesDetail = async function(folder) { var rows = list(folder, false); return { total: rows.length, files: rows }; };
  window.__IFTO_getFilesFrontmatter = async function(folder) { return list(folder, false); };
  window.__IFTO_getFilesFrontmatterRecursive = async function(folder) { return list(folder, true); };
  window.__IFTO_listFolderContents = async function(folder) {
    var entries = new Map();
    Array.from(files.keys()).concat(Array.from(folders)).forEach(function(p) {
      if(!p.startsWith(folder + '/')) return;
      var suffix = p.slice(folder.length + 1), name = suffix.split('/')[0];
      entries.set(name, { name: name, isFolder: suffix.indexOf('/') >= 0 || folders.has(p) });
    });
    return Array.from(entries.values());
  };
  window.__IFTO_readListOrder = async function() { return []; };
  window.__IFTO_writeListOrder = async function() { return true; };
  window.__IFTO_getFilesCheckboxState = async function(folder) { return list(folder, false).map(function(f) { return { name: f.name, checked: files.get(folder + '/' + f.name).checked }; }); };
  window.__IFTO_setCheckboxState = async function(p, checked) { calls.push(['check',p,checked]); files.get(p).checked = checked; return true; };
  window.__IFTO_openFile = async function(p) { calls.push(['open',p]); };
  window.__IFTO_createFolder = async function(p) { folders.add(p); return true; };
  window.__IFTO_createFile = async function(folder, name, content) { var p = folder + '/' + name; if(files.has(p)) return false; put(p); calls.push(['create',p,content]); return true; };
  window.__IFTO_readFile = async function(p) { var f = files.get(p); return f ? '---\nstatus: ' + (f.fm.status || '') + '\n---\n' : ''; };
  window.__IFTO_moveFile = async function(p, folder) { var dst = folder + '/' + p.split('/').pop(); if(!files.has(p) || files.has(dst)) return false; files.set(dst, files.get(p)); files.delete(p); calls.push(['move',p,dst]); return true; };
  window.__IFTO_renameFile = async function(p, name) { var dst = p.slice(0,p.lastIndexOf('/') + 1) + name; if(files.has(dst)) return false; files.set(dst,files.get(p)); files.delete(p); calls.push(['rename',p,dst]); return true; };
  window.__IFTO_renameFolder = async function(p, name) {
    var dst = p.slice(0,p.lastIndexOf('/') + 1) + name;
    Array.from(files.keys()).forEach(function(k) { if(k.startsWith(p + '/')) { files.set(dst + k.slice(p.length),files.get(k)); files.delete(k); } });
    calls.push(['renameFolder',p,dst]); return true;
  };
  window.__IFTO_updateFileFrontmatter = async function(p, key, value) { if(!files.has(p)) return false; files.get(p).fm[key] = value; calls.push(['status',p,value]); return true; };
  window.__IFTO_deleteFile = async function(p) { calls.push(['delete',p]); return files.delete(p); };
  window.__IFTO_deleteFolder = async function(p) { calls.push(['deleteFolder',p]); Array.from(files.keys()).forEach(function(k) { if(k.startsWith(p + '/')) files.delete(k); }); return true; };
  window.__IFTO_getDomainTree = async function() {
    return ['301-事业','310-个人'].map(function(name, i) {
      return { name: name, path: 'Areas/' + name, totalTasks: 10, completedTasks: i ? 4 : 7, subfolders: [1,2,3,4].map(function(n) {
        return { name: '领域目标 ' + n, path: 'Areas/' + name + '/目标' + n, totalTasks: 4, completedTasks: n, files: [{ name: '目标说明.md', path: 'Areas/' + name + '/目标' + n + '/目标说明.md', totalTasks: 4, completedTasks: n }], subfolders: [], fileCount: 1 };
      }), files: [] };
    });
  };
  window.__IFTO_getRandomImageFromFolder = async function() { return ''; };
  window.__IFTO_leafActive = function() { return true; };
})();
