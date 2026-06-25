import { Plugin, ItemView, WorkspaceLeaf, Notice, PluginSettingTab, App, Setting, requestUrl } from 'obsidian';

// ==================== Settings ====================
interface IFTOPluginSettings {
  deepseekApiKey: string;
  minimaxApiKey: string;
  collectionTemplate: string;
  readingTemplate: string;
  heroImageUrl: string;
  heroImageFolder: string;
  notePath: string;
  noteTemplate: string;
  reviewDailyPath: string;
  reviewWeeklyPath: string;
  reviewMonthlyPath: string;
  reviewProjectPath: string;
  reviewDailyTemplate: string;
  reviewWeeklyTemplate: string;
  reviewMonthlyTemplate: string;
  reviewProjectTemplate: string;
  inboxFolder: string;
  quickLearnFolder: string;
  todoFolder: string;
  activityFolder: string;
  taskFolder: string;
  projectBase: string;
  projectCols: string;
  bookFolder: string;
  paperFolder: string;
  resourceRoot: string;
  projectTaskTemplate: string;
  ollamaUrl: string;
  ragflowUrl: string;
  widgetOrder: string;
  widgetDeepseekEnabled: boolean;
  widgetCalendarEnabled: boolean;
  widgetHabitsEnabled: boolean;
  widgetOllamaEnabled: boolean;
  widgetRagflowEnabled: boolean;
  widgetWeeknotesEnabled: boolean;
  widgetTodotodayEnabled: boolean;
  widgetMinimaxEnabled: boolean;
  minimaxApiUrl: string;
  zoom: number;
  bgColor: string;
  borderRadius: number;
}

const DEFAULT_SETTINGS: IFTOPluginSettings = {
  deepseekApiKey: '',
  minimaxApiKey: '',
  collectionTemplate: '',
  readingTemplate: '',
  notePath: '010-信箱 INBOX/040-笔记',
  noteTemplate: '',
  reviewDailyPath: '600-复盘总结/601-报告总结/602-日报',
  reviewWeeklyPath: '600-复盘总结/601-报告总结/603-周报',
  reviewMonthlyPath: '600-复盘总结/601-报告总结/604-月报',
  reviewProjectPath: '600-复盘总结/610-项目总结',
  reviewDailyTemplate: '',
  reviewWeeklyTemplate: '',
  reviewMonthlyTemplate: '',
  reviewProjectTemplate: '',
  heroImageUrl: '',
  heroImageFolder: '',
  inboxFolder: '010-信箱 INBOX/020-收集',
  quickLearnFolder: '010-信箱 INBOX/011-快速学习',
  todoFolder: '010-信箱 INBOX/031-今日待办',
  activityFolder: '010-信箱 INBOX/030-活动清单',
  taskFolder: '100-工作台WORKDESK/120-项目管理/121-未开始',
  projectBase: '100-工作台WORKDESK/120-项目管理',
  projectCols: '121-未开始,122-推进中,123-已完成',
  bookFolder: '400-资源RESOURCE/420-览阅/421-书籍',
  paperFolder: '400-资源RESOURCE/420-览阅/422-论文',
  resourceRoot: '400-资源RESOURCE',
  projectTaskTemplate: '',
  ollamaUrl: 'http://localhost:11434',
  ragflowUrl: 'http://localhost:9380',
  minimaxApiUrl: 'https://www.minimaxi.com/v1/token_plan/remains',
  widgetOrder: 'calendar,deepseek,minimax,habits,ollama,ragflow,weeknotes,todotoday',
  widgetDeepseekEnabled: true,
  widgetCalendarEnabled: true,
  widgetHabitsEnabled: true,
  widgetOllamaEnabled: true,
  widgetRagflowEnabled: true,
  widgetWeeknotesEnabled: true,
  widgetTodotodayEnabled: true,
  widgetMinimaxEnabled: true,
  zoom: 1,
  bgColor: '',
  borderRadius: 8,
};

// ==================== View Type ====================
export const IFTO_VIEW_TYPE = 'ifto-homepage';

export class IFTOView extends ItemView {
  private plugin: IFTOPlugin;

  constructor(leaf: WorkspaceLeaf, plugin: IFTOPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return IFTO_VIEW_TYPE;
  }

  getDisplayText(): string {
    return 'IFTO-HOME 首页';
  }

  getIcon(): string {
    return 'blocks';
  }

  async onOpen() {
    this.containerEl.empty();
    this.containerEl.addClass('ifto-container');
    this.containerEl.style.height = '100%';
    this.containerEl.style.overflow = 'auto';

    try {
      // Expose settings to the frontend script
      (window as any).__IFTO_SETTINGS = {
        heroImageUrl: this.plugin.settings.heroImageUrl,
        heroImageFolder: this.plugin.settings.heroImageFolder,
        deepseekKey: this.plugin.settings.deepseekApiKey,
        minimaxKey: this.plugin.settings.minimaxApiKey,
        minimaxApiUrl: this.plugin.settings.minimaxApiUrl,
        widgetMinimaxEnabled: this.plugin.settings.widgetMinimaxEnabled,
        readingTemplate: this.plugin.settings.readingTemplate,
        notePath: this.plugin.settings.notePath,
        noteTemplate: this.plugin.settings.noteTemplate,
        reviewDailyPath: this.plugin.settings.reviewDailyPath,
        reviewWeeklyPath: this.plugin.settings.reviewWeeklyPath,
        reviewMonthlyPath: this.plugin.settings.reviewMonthlyPath,
        reviewProjectPath: this.plugin.settings.reviewProjectPath,
        reviewDailyTemplate: this.plugin.settings.reviewDailyTemplate,
        reviewWeeklyTemplate: this.plugin.settings.reviewWeeklyTemplate,
        reviewMonthlyTemplate: this.plugin.settings.reviewMonthlyTemplate,
        reviewProjectTemplate: this.plugin.settings.reviewProjectTemplate,
        inboxFolder: this.plugin.settings.inboxFolder,
        quickLearnFolder: this.plugin.settings.quickLearnFolder,
        todoFolder: this.plugin.settings.todoFolder,
        activityFolder: this.plugin.settings.activityFolder,
        taskFolder: this.plugin.settings.taskFolder,
        projectBase: this.plugin.settings.projectBase,
        projectCols: this.plugin.settings.projectCols,
        bookFolder: this.plugin.settings.bookFolder,
        paperFolder: this.plugin.settings.paperFolder,
        resourceRoot: this.plugin.settings.resourceRoot,
        projectTaskTemplate: this.plugin.settings.projectTaskTemplate,
        ollamaUrl: this.plugin.settings.ollamaUrl,
        ragflowUrl: this.plugin.settings.ragflowUrl,
        widgetOrder: this.plugin.settings.widgetOrder,
        widgetDeepseekEnabled: this.plugin.settings.widgetDeepseekEnabled,
        widgetCalendarEnabled: this.plugin.settings.widgetCalendarEnabled,
        widgetHabitsEnabled: this.plugin.settings.widgetHabitsEnabled,
        widgetOllamaEnabled: this.plugin.settings.widgetOllamaEnabled,
        widgetRagflowEnabled: this.plugin.settings.widgetRagflowEnabled,
        widgetWeeknotesEnabled: this.plugin.settings.widgetWeeknotesEnabled,
        widgetTodotodayEnabled: this.plugin.settings.widgetTodotodayEnabled,
        zoom: this.plugin.settings.zoom,
        bgColor: this.plugin.settings.bgColor,
        borderRadius: this.plugin.settings.borderRadius,
      };

      const pluginDir = this.app.vault.configDir + '/plugins/IFTO-HOME';

      // Load and inject HTML template
      const htmlContent = await this.app.vault.adapter.read(pluginDir + '/home.html');
      this.containerEl.innerHTML = htmlContent;

      // Apply appearance after HTML is loaded
      this.plugin.applyAppearance(this.containerEl);

      // Load and execute JavaScript (remove old script first to avoid duplicates)
      const oldScript = document.getElementById('ifto-home-script');
      if (oldScript) oldScript.remove();
      const jsContent = await this.app.vault.adapter.read(pluginDir + '/home.js');
      const scriptEl = document.createElement('script');
      scriptEl.id = 'ifto-home-script';
      scriptEl.textContent = jsContent;

      // Set function reference on containerEl for home.js to call (avoids all bridge/event issues)
      (this.containerEl as any).__createNote = () => this.createCollectionNote();

      // Bridge for listing files in a folder (used by inbox tabs)
      (window as any).__IFTO_listFiles = async (folder: string): Promise<string[]> => {
        try {
          if (!await this.app.vault.adapter.exists(folder)) return [];
          const result = await this.app.vault.adapter.list(folder);
          const prefix = folder.endsWith('/') ? folder : folder + '/';
          return (result.files || [])
            .filter((f: string) => f.startsWith(prefix) && !f.substring(prefix.length).includes('/'))
            .map((f: string) => f.substring(prefix.length));
        } catch (e) {
          console.error('IFTO: list files error', e);
          return [];
        }
      };

      // Helper: find a TFile by path using multiple methods
      const findFile = (path: string): any => {
        const vault = this.app.vault;
        if ((vault as any).getFileByPath) {
          const f = (vault as any).getFileByPath(path);
          if (f) return f;
        }
        if (vault.getAbstractByPath) {
          const f = vault.getAbstractByPath(path);
          if (f && 'stat' in f) return f;
        }
        const all = vault.getFiles();
        for (const f of all) { if (f.path === path) return f; }
        return null;
      };

      // Bridge for opening a file by vault path
      (window as any).__IFTO_openFile = async (filePath: string) => {
        try {
          const file = findFile(filePath);
          if (file) {
            const leaf = this.app.workspace.getLeaf(true);
            await leaf.openFile(file);
            this.app.workspace.setActiveLeaf(leaf, false, true);
            // Fix: explicitly focus the editor after a short delay.
            // setActiveLeaf alone often fails to put the cursor in the editor
            // because the editor's contenteditable may not be fully rendered yet.
            // Switching apps and back works because the blur/focus cycle forces
            // the editor to take focus. We replicate that with a delayed focus().
            setTimeout(() => {
              let retries = 0;
              const maxRetries = 10;
              const fn = () => {
                try {
                  const view = leaf.view as any;
                  if (view && view.editor && typeof view.editor.focus === 'function') {
                    view.editor.focus();
                  }
                } catch (e) { /* ignore */ }
                if (++retries < maxRetries) setTimeout(fn, 250);
              };
              fn();
            }, 100);
          }
        } catch (e) {
          console.error('IFTO: open file error', e);
        }
      };

      // Bridge for moving a file to a target folder (drag-drop)
      (window as any).__IFTO_moveFile = async (filePath: string, targetFolder: string): Promise<boolean> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          const fileName = filePath.split('/').pop() || 'untitled';
          const newPath = (targetFolder.endsWith('/') ? targetFolder : targetFolder + '/') + fileName;
          if (await adapter.exists(newPath)) { new Notice(`目标文件已存在: ${fileName}`); return false; }
          const file = findFile(filePath);
          if (!file) return false;
          console.log(`[IFTO] moveFile: "${filePath}" -> "${newPath}"`);
          await this.app.vault.rename(file, newPath);
          new Notice(`已移动: ${fileName}`);
          return true;
        } catch (e) {
          console.error('IFTO: move file error', e);
          new Notice(`移动失败: ${e.message}`);
          return false;
        }
      };

      // Bridge for listing folder contents (files + subfolders, one level)
      (window as any).__IFTO_listFolderContents = async (folder: string): Promise<{name: string, isFolder: boolean}[]> => {
        try {
          const result = await this.app.vault.adapter.list(folder);
          const prefix = folder.endsWith('/') ? folder : folder + '/';
          const items: {name: string, isFolder: boolean}[] = [];
          (result.folders || []).forEach((f: string) => {
            if (f.startsWith(prefix) && !f.substring(prefix.length).includes('/')) {
              items.push({ name: f.substring(prefix.length), isFolder: true });
            }
          });
          (result.files || []).forEach((f: string) => {
            if (f.startsWith(prefix) && !f.substring(prefix.length).includes('/')) {
              items.push({ name: f.substring(prefix.length), isFolder: false });
            }
          });
          return items;
        } catch (e) {
          console.error('IFTO: list folder error', e);
          return [];
        }
      };

      // Bridge for getting file details (ctime, tags) with pagination
      (window as any).__IFTO_getFilesDetail = async (folder: string, start: number, count: number): Promise<{files: any[], total: number}> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) return { files: [], total: 0 };
          const result = await adapter.list(folder);
          const prefix = folder.endsWith('/') ? folder : folder + '/';
          const files = (result.files || [])
            .filter((f: string) => f.startsWith(prefix) && !f.substring(prefix.length).includes('/'))
            .map((f: string) => f.substring(prefix.length))
            .sort().reverse();
          const pageFiles = files.slice(start, start + count);
          const details: any[] = [];
          for (const f of pageFiles) {
            try {
              const fp = folder + '/' + f;
              const stat = await adapter.stat(fp);
              const content = await adapter.read(fp);
              const tags: string[] = [];
              const fm = content.match(/^---\n([\s\S]*?)\n---/);
              if (fm) {
                // Parse tags supporting three YAML shapes:
                //   1) tags: [a, b, c]              (inline array)
                //   2) tags: a                       (single scalar)
                //   3) tags:                         (multi-line list)
                //        - a
                //        - b
                const fmLines = fm[1].split(/\r?\n/);
                for (let li = 0; li < fmLines.length; li++) {
                  const lineMatch = fmLines[li].match(/^tags\s*:\s*(.*)$/);
                  if (!lineMatch) continue;
                  const rest = lineMatch[1].trim();
                  const inlineArr = rest.match(/^\[([^\]]*)\]$/);
                  if (inlineArr) {
                    tags.push(...inlineArr[1].split(/[,，]/).map(t => t.trim().replace(/^['"]|['"]$/g, '')).filter(t => t));
                  } else if (rest) {
                    tags.push(rest.replace(/^['"]|['"]$/g, ''));
                  } else {
                    for (let lj = li + 1; lj < fmLines.length; lj++) {
                      const item = fmLines[lj].match(/^\s+-\s+(.+)$/);
                      if (!item) break;
                      const v = item[1].trim().replace(/^['"]|['"]$/g, '');
                      if (v) tags.push(v);
                    }
                  }
                  break;
                }
              }
              details.push({ name: f, ctime: stat.ctime, tags });
            } catch (e) {
              details.push({ name: f, ctime: null, tags: [] });
            }
          }
          return { files: details, total: files.length };
        } catch (e) {
          console.error('IFTO: getFilesDetail error', e);
          return { files: [], total: 0 };
        }
      };

      // Bridge for creating a folder (including parent folders)
      (window as any).__IFTO_createFolder = async (folderPath: string): Promise<boolean> => {
        try {
          if (!await this.app.vault.adapter.exists(folderPath)) {
            await this.app.vault.createFolder(folderPath);
            return true;
          }
          return false; // already exists
        } catch (e) {
          console.error('IFTO: create folder error', e);
          return false;
        }
      };

      // Bridge for creating a file with content in a folder
      (window as any).__IFTO_createFile = async (folder: string, fileName: string, content?: string): Promise<boolean> => {
        try {
          const fullPath = (folder.endsWith('/') ? folder : folder + '/') + fileName;
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) await this.app.vault.createFolder(folder);
          await this.app.vault.create(fullPath, content || '');
          return true;
        } catch (e) {
          console.error('IFTO: create file error', e);
          new Notice(`创建失败: ${e.message}`);
          return false;
        }
      };

      // Bridge for reading a file's content
      (window as any).__IFTO_readFile = async (filePath: string): Promise<string> => {
        try {
          return await this.app.vault.adapter.read(filePath);
        } catch (e) {
          try {
            return await this.app.vault.adapter.read(filePath + '.md');
          } catch (e2) {
            console.error('IFTO: read file error', e, e2);
            return '';
          }
        }
      };

      // Helper: convert ArrayBuffer/Buffer to base64 data URL
      const _bufToDataUrl = (path: string, buf: ArrayBuffer | Buffer): string => {
        const ext = (path.split('?')[0].split('.').pop() || 'png').toLowerCase();
        const bytes = new Uint8Array(buf as any);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const mime: Record<string,string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp', bmp: 'image/bmp', svg: 'image/svg+xml' };
        return `data:${mime[ext] || 'image/png'};base64,${btoa(binary)}`;
      };

      // Bridge for resolving an image URL (supports vault paths and external URLs)
      (window as any).__IFTO_resolveImageUrl = async (path: string): Promise<string> => {
        if (!path) return '';
        try {
          // HTTP(S) URL — fetch via requestUrl to bypass CSP
          if (path.startsWith('http://') || path.startsWith('https://')) {
            try {
              const resp = await requestUrl({ url: path });
              if (resp && resp.arrayBuffer) {
                return _bufToDataUrl(path, resp.arrayBuffer);
              }
            } catch (e) {
              console.warn('IFTO: requestUrl failed, trying https fallback', e);
            }
            // Fallback: fetch via Node.js https/http module
            try {
              const mod = path.startsWith('https') ? require('https') : require('http');
              const buf = await new Promise<Buffer>((resolve, reject) => {
                mod.get(path, (res: any) => {
                  const chunks: Buffer[] = [];
                  res.on('data', (c: Buffer) => chunks.push(c));
                  res.on('end', () => resolve(Buffer.concat(chunks)));
                  res.on('error', reject);
                }).on('error', reject);
              });
              return _bufToDataUrl(path, buf);
            } catch (e2) {
              console.error('IFTO: https fallback also failed', e2);
            }
            return '';
          }
          // Vault path — read file binary
          const file = findFile(path);
          if (!file) return '';
          const arrayBuffer = await this.app.vault.readBinary(file);
          return _bufToDataUrl(path, arrayBuffer);
        } catch (e) {
          console.error('IFTO: resolve image url error', e);
        }
        return '';
      };

      // Bridge for fetching weather data (bypasses CORS via requestUrl)
      (window as any).__IFTO_fetchWeatherUrl = async (url: string): Promise<string> => {
        try {
          const resp = await requestUrl({
            url,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
          });
          if (resp.status !== 200) {
            return `__IFTO_ERROR__: HTTP ${resp.status}`;
          }
          return resp.text || '';
        } catch (e: any) {
          console.error('IFTO: fetchWeatherUrl error', e);
          return `__IFTO_ERROR__: ${e.message || 'Unknown error'}`;
        }
      };

      // Bridge for renaming a file (newName includes extension)
      (window as any).__IFTO_renameFile = async (filePath: string, newName: string): Promise<boolean> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          const dir = filePath.substring(0, filePath.lastIndexOf('/') + 1);
          const newPath = dir + newName;
          if (await adapter.exists(newPath)) { new Notice('目标文件已存在'); return false; }
          const file = findFile(filePath);
          if (!file) return false;
          console.log(`[IFTO] renameFile: "${filePath}" -> "${newPath}"`);
          await this.app.vault.rename(file, newPath);
          return true;
        } catch (e) {
          console.error('IFTO: rename file error', e);
          new Notice(`重命名失败: ${e.message}`);
          return false;
        }
      };

      // Bridge for renaming a folder
      (window as any).__IFTO_renameFolder = async (folderPath: string, newName: string): Promise<boolean> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folderPath)) return false;
          const parent = folderPath.substring(0, folderPath.lastIndexOf('/') + 1);
          const newPath = parent + newName;
          if (await adapter.exists(newPath)) { new Notice('目标文件夹已存在'); return false; }
          await adapter.rename(folderPath, newPath);
          return true;
        } catch (e) {
          console.error('IFTO: rename folder error', e);
          new Notice(`重命名失败: ${e.message}`);
          return false;
        }
      };

      // Bridge for moving a folder into another folder
      (window as any).__IFTO_moveFolder = async (srcPath: string, targetFolder: string): Promise<boolean> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(srcPath)) return false;
          const folderName = srcPath.split('/').pop();
          const newPath = (targetFolder.endsWith('/') ? targetFolder : targetFolder + '/') + folderName;
          if (await adapter.exists(newPath)) { new Notice('目标文件夹已存在'); return false; }
          await adapter.rename(srcPath, newPath);
          new Notice(`已移动文件夹: ${folderName}`);
          return true;
        } catch (e) {
          console.error('IFTO: move folder error', e);
          new Notice(`移动失败: ${e.message}`);
          return false;
        }
      };

      // Bridge: move folder by manually moving files (fallback if rename fails)
      (window as any).__IFTO_moveFolderByFiles = async (srcPath: string, destParent: string): Promise<boolean> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(srcPath)) return false;
          const folderName = srcPath.split('/').pop();
          const targetPath = (destParent.endsWith('/') ? destParent : destParent + '/') + folderName;
          if (await adapter.exists(targetPath)) { new Notice('目标文件夹已存在'); return false; }
          // Create target
          await this.app.vault.createFolder(targetPath);
          // Move all files recursively
          const moveRec = async (from: string, to: string) => {
            const contents = await adapter.list(from);
            for (const f of (contents.files || [])) {
              const fileName = f.split('/').pop();
              const file = findFile(f);
              if (file) await this.app.vault.rename(file, to + '/' + fileName);
            }
            for (const sub of (contents.folders || [])) {
              const subName = sub.split('/').pop();
              const newSub = to + '/' + subName;
              await this.app.vault.createFolder(newSub);
              await moveRec(sub, newSub);
            }
          };
          await moveRec(srcPath, targetPath);
          // Delete source
          const delRec = async (p: string) => {
            const c = await adapter.list(p);
            for (const f of c.files || []) await adapter.remove(f);
            for (const d of c.folders || []) await delRec(d);
            await adapter.rmdir(p);
          };
          await delRec(srcPath);
          new Notice(`已移动文件夹: ${folderName}`);
          return true;
        } catch (e) {
          console.error('IFTO: moveFolderByFiles error', e);
          new Notice(`文件夹移动失败: ${e.message}`);
          return false;
        }
      };

      // Bridge for deleting a file
      (window as any).__IFTO_deleteFile = async (filePath: string): Promise<boolean> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          const file = findFile(filePath);
          if (!file) return false;
          console.log(`[IFTO] deleteFile: "${filePath}"`);
          await this.app.vault.delete(file);
          return true;
        } catch (e) {
          console.error('IFTO: delete file error', e);
          new Notice(`删除失败: ${e.message}`);
          return false;
        }
      };

      // Bridge for deleting a project folder (with all contents)
      (window as any).__IFTO_deleteFolder = async (folderPath: string): Promise<boolean> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folderPath)) return false;
          // Recursively delete all files and subfolders, then remove the folder
          const delRec = async (p: string): Promise<void> => {
            const c = await adapter.list(p);
            for (const f of c.files || []) await adapter.remove(f);
            for (const d of c.folders || []) await delRec(d);
            await adapter.rmdir(p);
          };
          await delRec(folderPath);
          console.log(`[IFTO] deleteFolder: "${folderPath}"`);
          new Notice('已删除项目文件夹');
          return true;
        } catch (e) {
          console.error('IFTO: delete folder error', e);
          new Notice(`删除失败: ${e.message}`);
          return false;
        }
      };

      // Bridge for getting files with frontmatter metadata (due date)
      (window as any).__IFTO_getFilesWithMeta = async (folder: string): Promise<{name: string, due: string}[]> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) return [];
          const result = await adapter.list(folder);
          const prefix = folder.endsWith('/') ? folder : folder + '/';
          const files = (result.files || [])
            .filter((f: string) => f.startsWith(prefix) && !f.substring(prefix.length).includes('/'))
            .map((f: string) => f.substring(prefix.length));
          const out: {name: string, due: string}[] = [];
          for (const f of files) {
            try {
              const fp = folder + '/' + f;
              const content = await adapter.read(fp);
              let due = '';
              const fm = content.match(/^---\n([\s\S]*?)\n---/);
              if (fm) {
                const dm = fm[1].match(/due:\s*(.+)/) || fm[1].match(/deadline:\s*(.+)/);
                if (dm) due = dm[1].trim();
              }
              out.push({ name: f, due });
            } catch (e) { out.push({ name: f, due: '' }); }
          }
          return out;
        } catch (e) { console.error('IFTO: getFilesWithMeta error', e); return []; }
      };

      // Bridge for reading the checkbox state of the FIRST `- [ ]` / `- [x]` line
      // in every .md file of a folder. Used by renderTodo/renderActivity to
      // restore the checked state after a re-render. File content is the
      // single source of truth for checkbox state.
      (window as any).__IFTO_getFilesCheckboxState = async (folder: string): Promise<{name: string, checked: boolean}[]> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) return [];
          const result = await adapter.list(folder);
          const prefix = folder.endsWith('/') ? folder : folder + '/';
          const files = (result.files || [])
            .filter((f: string) => f.startsWith(prefix) && !f.substring(prefix.length).includes('/') && f.toLowerCase().endsWith('.md'))
            .map((f: string) => f.substring(prefix.length));
          const out: {name: string, checked: boolean}[] = [];
          for (const f of files) {
            let checked = false;
            try {
              const fp = folder + '/' + f;
              const content = await adapter.read(fp);
              // First list-item line that contains a markdown task checkbox.
              const m = content.match(/^\s*[-*+]\s+\[( |x|X)\]/m);
              if (m) checked = m[1].toLowerCase() === 'x';
            } catch (e) { /* keep unchecked */ }
            out.push({ name: f, checked });
          }
          return out;
        } catch (e) { console.error('IFTO: getFilesCheckboxState error', e); return []; }
      };

      // Bridge for toggling the first `- [ ]` / `- [x]` line of a file.
      // If the file has no checkbox line yet, prepend a new one (unchecked).
      // Returns true on success. Used by the todo/activity card checkbox click.
      (window as any).__IFTO_setCheckboxState = async (filePath: string, checked: boolean): Promise<boolean> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          let content = await adapter.read(filePath);
          const want = checked ? 'x' : ' ';
          const re = /^(\s*[-*+]\s+)\[( |x|X)\]/m;
          if (re.test(content)) {
            content = content.replace(re, (_full, prefix: string) => prefix + '[' + want + ']');
          } else {
            // No checkbox line in file — prepend one (always as a top-level list item).
            content = '- [' + want + '] ' + (checked ? '' : '') + '\n' + content.replace(/^\n+/, '');
          }
          await adapter.write(filePath, content);
          return true;
        } catch (e) {
          console.error('IFTO: setCheckboxState error', e);
          return false;
        }
      };

      // Bridge for creating a reading note (book) with template + status: 在读
      (window as any).__IFTO_createReadingNote = async (): Promise<string> => {
        const folder = this.plugin.settings.bookFolder || '400-资源RESOURCE/420-览阅/421-书籍';
        const adapter = this.app.vault.adapter;
        const vault = this.app.vault;
        const tpl = this.plugin.settings.readingTemplate;
        let content = '';
        const now = new Date();
        const ts = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
        if (tpl) {
          try { content = await adapter.read(tpl); } catch (e) {
            try { content = await adapter.read(tpl + '.md'); } catch (e2) { console.error('IFTO: reading template error', e, e2); }
          }
          if (content) {
            content = this.processTemplateVars(content, ts);
          }
        }
        // Ensure status: 在读 in frontmatter
        const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (fmMatch) {
          if (fmMatch[1].match(/^status:/m)) {
            content = content.replace(/^status:.*$/m, 'status: 在读');
          } else {
            content = content.replace(/^---\n/, '---\nstatus: 在读\n');
          }
        } else {
          content = '---\nstatus: 在读\n---\n' + content;
        }
        const fileName = `${ts}.md`;
        const fullPath = `${folder}/${fileName}`;
        try {
          if (!await adapter.exists(folder)) await vault.createFolder(folder);
          await vault.create(fullPath, content);
          return fullPath;
        } catch (e) {
          console.error('IFTO: create reading note error', e);
          new Notice(`创建失败: ${e.message}`);
          return '';
        }
      };

      // Bridge for getting all frontmatter fields for files in a folder
      (window as any).__IFTO_getFilesFrontmatter = async (folder: string): Promise<{name: string, fm: Record<string,string>}[]> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) return [];
          const result = await adapter.list(folder);
          const prefix = folder.endsWith('/') ? folder : folder + '/';
          const files = (result.files || [])
            .filter((f: string) => f.startsWith(prefix) && !f.substring(prefix.length).includes('/'))
            .map((f: string) => f.substring(prefix.length));
          const out: {name: string, fm: Record<string,string>}[] = [];
          for (const f of files) {
            try {
              const fp = folder + '/' + f;
              const content = await adapter.read(fp);
              const fm: Record<string,string> = {};
              const m = content.match(/^---\n([\s\S]*?)\n---/);
              if (m) {
                let _ck: string|null = null;
                m[1].split('\n').forEach(line => {
                  const li = line.match(/^\s+[-]\s+(.+)/);
                  if (li && _ck && !(_ck in fm)) { fm[_ck] = li[1].trim().replace(/^['"]|['"]$/g, ''); return; }
                  const kv = line.match(/^\s*([^:]+?)\s*:\s*(.*)/);
                  if (kv) { _ck = kv[1].trim(); const _v = kv[2].trim().replace(/^['"]|['"]$/g, ''); if (_v) fm[_ck] = _v; }
                });
              }
              out.push({ name: f, fm });
            } catch (e) { out.push({ name: f, fm: {} }); }
          }
          return out;
        } catch (e) { console.error('IFTO: getFilesFrontmatter error', e); return []; }
      };

      // Recursive version: includes files in subfolders
      (window as any).__IFTO_getFilesFrontmatterRecursive = async (folder: string): Promise<{name: string, fm: Record<string,string>}[]> => {
        const recList = async (base: string, dir: string): Promise<{name: string, fm: Record<string,string>}[]> => {
          try {
            const adapter = this.app.vault.adapter;
            const result = await adapter.list(dir);
            const out: {name: string, fm: Record<string,string>}[] = [];
            for (const f of (result.files || [])) {
              if (!f.endsWith('.md')) continue;
              const content = await adapter.read(f);
              const fm: Record<string,string> = {};
              const m = content.match(/^---\n([\s\S]*?)\n---/);
              if (m) {
                m[1].split('\n').forEach(line => {
                  const kv = line.match(/^\s*([^:]+?)\s*:\s*(.+)/);
                  if (kv) fm[kv[1].trim()] = kv[2].trim().replace(/^['"]|['"]$/g, '');
                });
              }
              // Fallback: parse blockquote metadata (> **key:** value) if no YAML frontmatter
              if (!m) {
                const bqRegex = /> \*\*([^*]+)\*\*:\s*(.+)/g;
                let match: RegExpExecArray | null;
                while ((match = bqRegex.exec(content)) !== null) {
                  const key = match[1].trim();
                  const val = match[2].trim().replace(/^['"]|['"]$/g, '');
                  if (key && val) fm[key] = val;
                }
              }
              out.push({ name: f.substring(base.length + 1), fm });
            }
            for (const sub of (result.folders || [])) {
              const subOut = await recList(base, sub);
              out.push(...subOut);
            }
            return out;
          } catch (e) { return []; }
        };
        try {
          if (!await this.app.vault.adapter.exists(folder)) return [];
          return await recList(folder, folder);
        } catch (e) { console.error('IFTO: getFilesFrontmatterRecursive error', e); return []; }
      };

      // Bridge for refreshing settings from the frontend (widget toggle sync)
      (window as any).__IFTO_refreshSettings = () => {
        (window as any).__IFTO_SETTINGS = {
          ...(window as any).__IFTO_SETTINGS,
          widgetOrder: this.plugin.settings.widgetOrder,
          widgetDeepseekEnabled: this.plugin.settings.widgetDeepseekEnabled,
          widgetCalendarEnabled: this.plugin.settings.widgetCalendarEnabled,
          widgetHabitsEnabled: this.plugin.settings.widgetHabitsEnabled,
          widgetOllamaEnabled: this.plugin.settings.widgetOllamaEnabled,
          widgetRagflowEnabled: this.plugin.settings.widgetRagflowEnabled,
          widgetWeeknotesEnabled: this.plugin.settings.widgetWeeknotesEnabled,
          widgetTodotodayEnabled: this.plugin.settings.widgetTodotodayEnabled,
          widgetMinimaxEnabled: this.plugin.settings.widgetMinimaxEnabled,
          deepseekKey: this.plugin.settings.deepseekApiKey,
          minimaxKey: this.plugin.settings.minimaxApiKey,
          borderRadius: this.plugin.settings.borderRadius,
        };
      };

      // Bridge for refreshing widget display after settings change
      (window as any).__IFTO_refreshWidgetDisplay = () => {
        (window as any).__IFTO_refreshSettings();
        if (typeof (window as any).renderWidget === 'function') {
          (window as any).renderWidget();
        }
      };

      // Bridge for updating a frontmatter field in a file (used by Project drag-drop)
      (window as any).__IFTO_updateFileFrontmatter = async (filePath: string, key: string, value: string): Promise<boolean> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          let content = await adapter.read(filePath);
          const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (fmMatch) {
            const fmLines = fmMatch[1].split('\n');
            const keyRegex = new RegExp('^\\s*' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*:\\s*.+', 'm');
            if (keyRegex.test(fmMatch[1])) {
              content = content.replace(keyRegex, key + ': ' + value);
            } else {
              content = content.replace(/^---\n/, '---\n' + key + ': ' + value + '\n');
            }
          } else {
            content = '---\n' + key + ': ' + value + '\n---\n' + content;
          }
          await adapter.write(filePath, content);
          return true;
        } catch (e) {
          console.error('IFTO: update frontmatter error', e);
          return false;
        }
      };

      // Bridge: get a random image from a folder as base64 data URL
      (window as any).__IFTO_getRandomImageFromFolder = async (folderPath: string): Promise<string> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folderPath)) return '';
          const result = await adapter.list(folderPath);
          const prefix = folderPath.endsWith('/') ? folderPath : folderPath + '/';
          const imgExts = new Set(['.jpg','.jpeg','.png','.gif','.webp','.bmp','.svg']);
          const images = (result.files || []).filter((f: string) =>
            f.startsWith(prefix) && imgExts.has(f.substring(f.lastIndexOf('.')))
          );
          if (images.length === 0) return '';
          const chosen = images[Math.floor(Math.random() * images.length)];
          const buf = await adapter.readBinary(chosen);
          const ext = (chosen.split('.').pop() || 'png').toLowerCase();
          const m: Record<string,string> = {jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',gif:'image/gif',webp:'image/webp',bmp:'image/bmp',svg:'image/svg+xml'};
          const b = new Uint8Array(buf); let s = '';
          for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
          return 'data:' + (m[ext] || 'image/png') + ';base64,' + btoa(s);
        } catch (e) {
          console.error('IFTO: getRandomImageFromFolder error', e);
          return '';
        }
      };

      // Bridge: read sort order file for a folder (.ifto_order.json)
      (window as any).__IFTO_readListOrder = async (folder: string): Promise<string[]> => {
        try {
          const adapter = this.app.vault.adapter;
          const orderPath = (folder.endsWith('/') ? folder : folder + '/') + '.ifto_order.json';
          if (!await adapter.exists(orderPath)) return [];
          const raw = await adapter.read(orderPath);
          const arr = JSON.parse(raw);
          return Array.isArray(arr) ? arr : [];
        } catch (e) { return []; }
      };

      // Bridge: write sort order file for a folder (.ifto_order.json)
      (window as any).__IFTO_writeListOrder = async (folder: string, order: string[]): Promise<boolean> => {
        try {
          const adapter = this.app.vault.adapter;
          const orderPath = (folder.endsWith('/') ? folder : folder + '/') + '.ifto_order.json';
          await adapter.write(orderPath, JSON.stringify(order, null, 2));
          return true;
        } catch (e) { console.error('IFTO: writeListOrder error', e); return false; }
      };

      // Bridge: process template variables ({{date}}, {{time}}, etc.)
      (window as any).__IFTO_processTemplate = async (content: string): Promise<string> => {
        try {
          const now = new Date();
          const ts = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
          return this.processTemplateVars(content || '', ts);
        } catch (e) {
          console.error('IFTO: processTemplate error', e);
          return content || '';
        }
      };

      // Simple bridge: read vault file → base64 data URL (for cover images)
      (window as any).__IFTO_readFileAsDataURL = async (filePath: string): Promise<string> => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) { console.warn('IFTO: file not found', filePath); return ''; }
          const buf = await adapter.readBinary(filePath);
          const ext = (filePath.split('.').pop() || 'png').toLowerCase();
          const m: Record<string,string> = {jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',gif:'image/gif',webp:'image/webp',bmp:'image/bmp',svg:'image/svg+xml'};
          const b = new Uint8Array(buf); let s = '';
          for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
          return 'data:' + (m[ext] || 'image/png') + ';base64,' + btoa(s);
        } catch(e) { console.error('IFTO: readFileAsDataURL error', e); return ''; }
      };

      // Bridge: find a folder by name in the vault, return full path
      (window as any).__IFTO_findFolderByName = async (name: string, searchRoot?: string): Promise<string> => {
        try {
          const adapter = this.app.vault.adapter;
          const searchDirs = searchRoot ? [searchRoot] : [
            '500-归档资料/510-归档项目',
            '200-工作库WORKFILE/201-项目文件',
            '100-工作台WORKDESK/120-项目管理',
            '010-信箱 INBOX',
            '200-工作库WORKFILE',
            '400-资源RESOURCE',
          ];
          for (const dir of searchDirs) {
            if (!await adapter.exists(dir)) continue;
            const result = await adapter.list(dir);
            for (const folder of (result.folders || [])) {
              const folderName = folder.split('/').pop();
              if (folderName === name) return folder;
            }
          }
          return '';
        } catch (e) {
          console.error('IFTO: findFolderByName error', e);
          return '';
        }
      };

      // Bridge: find a file or folder by name (recursive, up to 3 levels deep)
      (window as any).__IFTO_findItemByName = async (name: string): Promise<{path: string, isFolder: boolean} | null> => {
        try {
          const adapter = this.app.vault.adapter;
          const searchRoots = [
            '500-归档资料', '200-工作库WORKFILE/201-项目文件',
            '100-工作台WORKDESK/120-项目管理', '200-工作库WORKFILE',
            '010-信箱 INBOX', '400-资源RESOURCE',
          ];
          for (const root of searchRoots) {
            if (!await adapter.exists(root)) continue;
            const result = await _searchItem(adapter, root, name, 0, 3);
            if (result) return result;
          }
          return null;
        } catch (e) {
          console.error('IFTO: findItemByName error', e);
          return null;
        }
      };

      // Helper: recursive search
      const _searchItem = async (adapter: any, dir: string, name: string, depth: number, maxDepth: number): Promise<{path: string, isFolder: boolean} | null> => {
        if (depth > maxDepth) return null;
        try {
          const result = await adapter.list(dir);
          // Check folders
          for (const folder of (result.folders || [])) {
            const folderName = folder.split('/').pop();
            if (folderName === name) return { path: folder, isFolder: true };
            // Recurse into subfolder
            const sub = await _searchItem(adapter, folder, name, depth + 1, maxDepth);
            if (sub) return sub;
          }
          // Check files
          for (const file of (result.files || [])) {
            if (!file.endsWith('.md')) continue;
            const fileName = file.split('/').pop();
            if (fileName === name) return { path: file, isFolder: false };
          }
          return null;
        } catch (e) { return null; }
      };

      document.body.appendChild(scriptEl);

      // Auto-refresh views on file events
      const tryRefresh = (fn: string, ...args: any[]) => {
        try { if (typeof (window as any)[fn] === 'function') (window as any)[fn](...args); }
        catch(e) { /* ignore */ }
      };
      this.registerEvent(this.app.vault.on('rename', (file, oldPath) => {
        const pBase = this.plugin.settings.projectBase;
        const actFolder = this.plugin.settings.activityFolder;
        const todoFolder = this.plugin.settings.todoFolder;
        const inboxFolder = this.plugin.settings.inboxFolder;
        const bookFolder = this.plugin.settings.bookFolder;
        const paperFolder = this.plugin.settings.paperFolder;
        const newPath = file.path;
        if (pBase && (newPath.startsWith(pBase) || (oldPath && oldPath.startsWith(pBase)))) tryRefresh('renderProject');
        if (actFolder && (newPath.startsWith(actFolder) || (oldPath && oldPath.startsWith(actFolder)))) tryRefresh('renderActivity');
        if (todoFolder && (newPath.startsWith(todoFolder) || (oldPath && oldPath.startsWith(todoFolder)))) tryRefresh('renderTodo');
        if (inboxFolder && (newPath.startsWith(inboxFolder) || (oldPath && oldPath.startsWith(inboxFolder)))) tryRefresh('renderInbox');
        if (bookFolder && (newPath.startsWith(bookFolder) || (oldPath && oldPath.startsWith(bookFolder)))) tryRefresh('renderNote');
        if (paperFolder && (newPath.startsWith(paperFolder) || (oldPath && oldPath.startsWith(paperFolder)))) tryRefresh('renderNote');
      }));
      this.registerEvent(this.app.vault.on('create', (file) => {
        const actFolder = this.plugin.settings.activityFolder;
        const pBase = this.plugin.settings.projectBase;
        const inboxFolder = this.plugin.settings.inboxFolder;
        const bookFolder = this.plugin.settings.bookFolder;
        const paperFolder = this.plugin.settings.paperFolder;
        const newPath = file.path;
        if (pBase && newPath.startsWith(pBase)) tryRefresh('renderProject');
        if (actFolder && newPath.startsWith(actFolder)) tryRefresh('renderActivity');
        if (inboxFolder && newPath.startsWith(inboxFolder)) tryRefresh('renderInbox');
        if (bookFolder && newPath.startsWith(bookFolder)) tryRefresh('renderNote');
        if (paperFolder && newPath.startsWith(paperFolder)) tryRefresh('renderNote');
      }));
      this.registerEvent(this.app.vault.on('delete', (file) => {
        const inboxFolder = this.plugin.settings.inboxFolder;
        const bookFolder = this.plugin.settings.bookFolder;
        const paperFolder = this.plugin.settings.paperFolder;
        const pBase = this.plugin.settings.projectBase;
        if (inboxFolder && file.path.startsWith(inboxFolder)) tryRefresh('renderInbox');
        if (bookFolder && file.path.startsWith(bookFolder)) tryRefresh('renderNote');
        if (paperFolder && file.path.startsWith(paperFolder)) tryRefresh('renderNote');
        if (pBase && file.path.startsWith(pBase)) tryRefresh('renderProject');
      }));
      let __iftoProjectModifyTimer: any = null;
      this.registerEvent(this.app.vault.on('modify', (file) => {
        const bookFolder = this.plugin.settings.bookFolder;
        const paperFolder = this.plugin.settings.paperFolder;
        const pBase = this.plugin.settings.projectBase;
        if (bookFolder && file.path.startsWith(bookFolder)) tryRefresh('renderNote');
        if (paperFolder && file.path.startsWith(paperFolder)) tryRefresh('renderNote');
        if (pBase && file.path.startsWith(pBase)) {
          if (__iftoProjectModifyTimer) clearTimeout(__iftoProjectModifyTimer);
          __iftoProjectModifyTimer = setTimeout(() => {
            __iftoProjectModifyTimer = null;
            tryRefresh('renderProject');
          }, 600);
        }
      }));
    } catch (e) {
      console.error('IFTO: Failed to load home.html', e);
      this.containerEl.innerHTML = `
        <div style="padding:40px;text-align:center;color:var(--text-muted);">
          <h2>IFTO-HOME 首页</h2>
          <p>加载页面失败: ${e.message}</p>
          <p style="font-size:12px;margin-top:20px;">请确认 home.html 文件存在于插件目录中</p>
        </div>
      `;
    }
  }

  private async createCollectionNote() {
    const folder = this.plugin.settings.inboxFolder || '010-信箱 INBOX/020-收集';
    const templatePath = this.plugin.settings.collectionTemplate;
    let content = '';
    const now = new Date();
    const ts = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
    if (templatePath) {
      try {
        content = await this.app.vault.adapter.read(templatePath);
      } catch (e) {
        // Try appending .md if initial read fails
        try {
          content = await this.app.vault.adapter.read(templatePath + '.md');
        } catch (e2) {
          console.error('IFTO: template read failed', e, e2);
          new Notice(`模板读取失败，请检查路径: ${templatePath}`);
        }
      }
      // Process template variables
      if (content) {
        content = this.processTemplateVars(content, ts);
      }
    }
    const fileName = `${ts}.md`;
    const fullPath = `${folder}/${fileName}`;
    try {
      const exists = await this.app.vault.adapter.exists(folder);
      if (!exists) await this.app.vault.createFolder(folder);
      const file = await this.app.vault.create(fullPath, content);
      new Notice(`已创建: ${fileName}`);
      // Open in new tab with explicit editor focus
      const leaf = this.app.workspace.getLeaf(true);
      await leaf.openFile(file);
      this.app.workspace.setActiveLeaf(leaf, false, true);
      // Delayed focus — the editor's contenteditable may not be fully rendered yet
      setTimeout(() => {
        let retries = 0;
        const maxRetries = 10;
        const fn = () => {
          try {
            const view = leaf.view as any;
            if (view && view.editor && typeof view.editor.focus === 'function') {
              view.editor.focus();
            }
          } catch (e) { /* ignore */ }
          if (++retries < maxRetries) setTimeout(fn, 250);
        };
        fn();
      }, 100);
    } catch (e) {
      new Notice(`创建失败: ${e.message}`);
    }
  }

  private processTemplateVars(text: string, fileTitle?: string): string {
    const now = new Date();
    const y = now.getFullYear();
    const M = now.getMonth() + 1;
    const d = now.getDate();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    // Replace {{date:format}} (e.g. {{date:YYYY年MM月DD日}})
    text = text.replace(/\{\{date:([^}]+)\}\}/g, (_, fmt: string) => {
      return fmt
        .replace(/YYYY/g, String(y))
        .replace(/YY/g, String(y).slice(-2))
        .replace(/MM/g, String(M).padStart(2, '0'))
        .replace(/M/g, String(M))
        .replace(/DD/g, String(d).padStart(2, '0'))
        .replace(/D/g, String(d));
    });

    // Replace {{time:format}} (e.g. {{time:HH:mm:ss}})
    text = text.replace(/\{\{time:([^}]+)\}\}/g, (_, fmt: string) => {
      return fmt
        .replace(/HH/g, String(h).padStart(2, '0'))
        .replace(/H/g, String(h))
        .replace(/hh/g, String(h % 12 || 12).padStart(2, '0'))
        .replace(/h/g, String(h % 12 || 12))
        .replace(/mm/g, String(m).padStart(2, '0'))
        .replace(/ss/g, String(s).padStart(2, '0'))
        .replace(/A/g, h < 12 ? 'AM' : 'PM');
    });

    // Replace {{date}} with YYYY-MM-DD
    text = text.replace(/\{\{date\}\}/g, `${y}-${String(M).padStart(2, '0')}-${String(d).padStart(2, '0')}`);

    // Replace {{time}} with HH:mm
    text = text.replace(/\{\{time\}\}/g, `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);

    // Handle Templater-style tags
    // <% tp.file.creation_date() %> or <% tp.file.creation_date("YYYY-MM-DD") %>
    text = text.replace(/<%\s*tp\.file\.creation_date\s*\(\s*(?:"([^"]*)"|'([^']*)')?\s*\)\s*%>/g, (_, fmt1?: string, fmt2?: string) => {
      const fmt = (fmt1 || fmt2 || 'YYYY-MM-DD').replace(/HH/, String(h).padStart(2,'0')).replace(/mm/, String(m).padStart(2,'0')).replace(/ss/, String(s).padStart(2,'0'));
      return fmt.replace(/YYYY/g, String(y)).replace(/YY/g, String(y).slice(-2)).replace(/MM/g, String(M).padStart(2,'0')).replace(/M/g, String(M)).replace(/DD/g, String(d).padStart(2,'0')).replace(/D/g, String(d));
    });
    // <% tp.date.now() %> or <% tp.date.now("YYYY-MM-DD") %>
    text = text.replace(/<%\s*tp\.date\.now\s*\(\s*(?:"([^"]*)"|'([^']*)')?\s*\)\s*%>/g, (_, fmt1?: string, fmt2?: string) => {
      const fmt = (fmt1 || fmt2 || 'YYYY-MM-DD').replace(/HH/, String(h).padStart(2,'0')).replace(/mm/, String(m).padStart(2,'0')).replace(/ss/, String(s).padStart(2,'0'));
      return fmt.replace(/YYYY/g, String(y)).replace(/YY/g, String(y).slice(-2)).replace(/MM/g, String(M).padStart(2,'0')).replace(/M/g, String(M)).replace(/DD/g, String(d).padStart(2,'0')).replace(/D/g, String(d));
    });
    // <% tp.date.now("format", offset) %> with day offset
    text = text.replace(/<%\s*tp\.date\.now\s*\(\s*(?:"([^"]*)"|'([^']*)')\s*,\s*(-?\d+)\s*\)\s*%>/g, (_, fmt1: string, fmt2: string, offset: string) => {
      const fmt = (fmt1 || fmt2 || 'YYYY-MM-DD').replace(/HH/, String(h).padStart(2,'0')).replace(/mm/, String(m).padStart(2,'0')).replace(/ss/, String(s).padStart(2,'0'));
      const od = new Date(now.getTime() + parseInt(offset) * 86400000);
      const oy = od.getFullYear(), oM = od.getMonth()+1, oDate = od.getDate();
      return fmt.replace(/YYYY/g, String(oy)).replace(/YY/g, String(oy).slice(-2)).replace(/MM/g, String(oM).padStart(2,'0')).replace(/M/g, String(oM)).replace(/DD/g, String(oDate).padStart(2,'0')).replace(/D/g, String(oDate));
    });
    // <% tp.file.title %> → replace with actual file title (timestamp)
    text = text.replace(/<%\s*tp\.file\.title\s*\(\s*\)\s*%>/g, fileTitle || '');
    // <% tp.file.folder %> → replace with empty
    text = text.replace(/<%\s*tp\.file\.folder\s*\(\s*\)\s*%>/g, '');

    return text;
  }
}

// ==================== Plugin ====================
export default class IFTOPlugin extends Plugin {
  settings: IFTOPluginSettings;

  applyAppearance(container?: HTMLElement) {
    const target = container || (this.app.workspace.getLeavesOfType(IFTO_VIEW_TYPE)?.[0]?.view as any)?.containerEl;
    if(!target) return;
    target.style.zoom = String(this.settings.zoom);
    if(this.settings.bgColor) {
      target.style.background = this.settings.bgColor;
      target.style.setProperty('--bg', this.settings.bgColor);
      target.style.setProperty('--ifto-bg', this.settings.bgColor);
    } else {
      target.style.background = '';
      target.style.removeProperty('--bg');
      target.style.removeProperty('--ifto-bg');
    }
  }

  async onload() {
    await this.loadSettings();

    this.registerView(IFTO_VIEW_TYPE, (leaf) => new IFTOView(leaf, this));

    this.addRibbonIcon('blocks', 'IFTO-HOME 首页', () => {
      this.activateView();
    });

    this.addCommand({
      id: 'open-ifto-homepage',
      name: '打开 IFTO-HOME 首页',
      callback: () => this.activateView(),
    });

    this.addSettingTab(new IFTOSettingsTab(this.app, this));

    // Bridge: apply border-radius CSS variable to the whole document
    // (called on widget open and on slider change)
    (window as any).__IFTO_applyRadius = (radius: number) => {
      const v = (typeof radius === 'number' && radius >= 0) ? radius : 8;
      document.documentElement.style.setProperty('--ifto-radius', v + 'px');
    };
    (window as any).__IFTO_applyRadius(this.settings.borderRadius);

    this.registerEvent(this.app.workspace.on('css-change', () => {
      this.applyAppearance();
    }));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    // Normalize widgetOrder: append any known widget ids missing from saved order,
    // so newly-added widgets (e.g. todotoday) become reorderable in the settings UI
    // instead of being silently appended only at render time.
    const known = DEFAULT_SETTINGS.widgetOrder.split(',').map(s => s.trim()).filter(s => s);
    const cur = (this.settings.widgetOrder || '').split(',').map(s => s.trim()).filter(s => s);
    let changed = false;
    known.forEach(id => { if (cur.indexOf(id) === -1) { cur.push(id); changed = true; } });
    if (changed) {
      this.settings.widgetOrder = cur.join(',');
      await this.saveSettings();
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async activateView() {
    const { workspace } = this.app;
    const existing = workspace.getLeavesOfType(IFTO_VIEW_TYPE);
    if (existing.length > 0) {
      workspace.revealLeaf(existing[0]);
      return;
    }
    const leaf = workspace.getLeaf(true);
    await leaf.setViewState({ type: IFTO_VIEW_TYPE, active: true });
    workspace.revealLeaf(leaf);
  }
}

// ==================== Settings Tab ====================
class IFTOSettingsTab extends PluginSettingTab {
  plugin: IFTOPlugin;

  constructor(app: App, plugin: IFTOPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass('ifto-settings-tab');
    containerEl.style.padding = '0';
    containerEl.style.boxSizing = 'border-box';

    const settingsRoot = containerEl.createDiv({ cls: 'ifto-settings-root' });
    settingsRoot.style.padding = '24px clamp(24px, 5vw, 48px)';
    settingsRoot.style.boxSizing = 'border-box';
    settingsRoot.style.maxWidth = '960px';
    settingsRoot.style.margin = '0 auto';
    settingsRoot.style.width = '100%';

    settingsRoot.createEl('h2', { text: 'IFTO-HOME 设置' });

    new Setting(settingsRoot)
      .setName('首页图片文件夹路径')
      .setDesc('设置首页顶部大图随机显示的图片文件夹路径，每次加载随机选取一张。留空则使用下方单张图片 URL')
      .addText(text => text
        .setPlaceholder('900-数据库/920-图片资源')
        .setValue(this.plugin.settings.heroImageFolder)
        .onChange(async (value) => {
          this.plugin.settings.heroImageFolder = value.trim();
          await this.plugin.saveSettings();
        }));
    new Setting(settingsRoot)
      .setName('首页单张图片 URL（备选）')
      .setDesc('当上方文件夹无图片或未设置时，使用此单张图片 URL。若二者均未设置则显示默认背景')
      .addText(text => text
        .setPlaceholder('https://example.com/hero.jpg')
        .setValue(this.plugin.settings.heroImageUrl)
        .onChange(async (value) => {
          this.plugin.settings.heroImageUrl = value.trim();
          await this.plugin.saveSettings();
        }));

    settingsRoot.createEl('h3', { text: '外观' });
    new Setting(settingsRoot)
      .setName('缩放比例')
      .setDesc('调整首页整体缩放（Mac 上显示过大可调小，如 0.85；Windows 显示正常保持 1.0）')
      .addSlider(sl => sl
        .setLimits(0.5, 1.5, 0.05)
        .setValue(this.plugin.settings.zoom)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.zoom = value;
          await this.plugin.saveSettings();
          this.plugin.applyAppearance();
        }));
    new Setting(settingsRoot)
      .setName('背景颜色')
      .setDesc('自定义首页背景色，输入 # 六进制颜色代码（如 #fbfbfb），留空使用默认')
      .addText(text => text
        .setPlaceholder('#fbfbfb')
        .setValue(this.plugin.settings.bgColor)
        .onChange(async (value) => {
          var v = value.trim();
          this.plugin.settings.bgColor = v;
          await this.plugin.saveSettings();
          this.plugin.applyAppearance();
        }))
    new Setting(settingsRoot)
      .setName('圆角大小')
      .setDesc('全局调整矩形圆角(0=硬边, 16=很圆);保存后立即生效')
      .addSlider(slider => slider
        .setLimits(0, 16, 1)
        .setValue(this.plugin.settings.borderRadius)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.borderRadius = value;
          await this.plugin.saveSettings();
          if (typeof (window as any).__IFTO_applyRadius === 'function') {
            (window as any).__IFTO_applyRadius(value);
          }
        }));

    settingsRoot.createEl('h3', { text: '组件管理' });
    new Setting(settingsRoot)
      .setName('组件顺序与开关')
      .setDesc('启用/禁用组件，使用 ▲ ▼ 调整显示顺序');

    const widgetDefs: {id: string, label: string}[] = [
      { id: 'deepseek', label: 'DeepSeek Token' },
      { id: 'minimax', label: 'MiniMax Token' },
      { id: 'calendar', label: '日历' },
      { id: 'habits', label: '习惯打卡' },
      { id: 'ollama', label: 'Ollama 连通检测' },
      { id: 'ragflow', label: 'Ragflow 连通检测' },
      { id: 'weeknotes', label: '本周笔记' },
      { id: 'todotoday', label: '今日待办' },
    ];

    const widgetSelf = this;
    widgetDefs.forEach((def) => {
      const curOrder = widgetSelf.plugin.settings.widgetOrder.split(',').map(s => s.trim()).filter(s => s);
      const pos = curOrder.indexOf(def.id);
      const ek = ('widget' + def.id.charAt(0).toUpperCase() + def.id.slice(1) + 'Enabled') as keyof IFTOPluginSettings;

      const st = new Setting(settingsRoot)
        .setName((pos + 1) + '. ' + def.label)
        .addToggle(tg => tg
          .setValue(widgetSelf.plugin.settings[ek] as boolean)
          .onChange(async (v) => {
            (widgetSelf.plugin.settings as any)[ek] = v;
            await widgetSelf.plugin.saveSettings();
            if (typeof (window as any).__IFTO_refreshWidgetDisplay === 'function') (window as any).__IFTO_refreshWidgetDisplay();
          }));

      // Up button
      if (pos > 0) {
        (function(wid: string) {
          st.addButton(btn => {
            btn.setButtonText('▲');
            btn.onClick(async () => {
              try {
                const arr = widgetSelf.plugin.settings.widgetOrder.split(',').map(s => s.trim()).filter(s => s);
                const i = arr.indexOf(wid);
                if (i > 0) {
                  const t = arr[i-1]; arr[i-1] = arr[i]; arr[i] = t;
                  widgetSelf.plugin.settings.widgetOrder = arr.join(',');
                  await widgetSelf.plugin.saveSettings();
                  widgetSelf.display();
                  if (typeof (window as any).__IFTO_refreshWidgetDisplay === 'function') (window as any).__IFTO_refreshWidgetDisplay();
                }
              } catch(e) { console.error('IFTO up err', e); }
            });
            return btn;
          });
        })(def.id);
      }

      // Down button
      if (pos >= 0 && pos < curOrder.length - 1) {
        (function(wid: string) {
          st.addButton(btn => {
            btn.setButtonText('▼');
            btn.onClick(async () => {
              try {
                const arr = widgetSelf.plugin.settings.widgetOrder.split(',').map(s => s.trim()).filter(s => s);
                const i = arr.indexOf(wid);
                if (i >= 0 && i < arr.length - 1) {
                  const t = arr[i+1]; arr[i+1] = arr[i]; arr[i] = t;
                  widgetSelf.plugin.settings.widgetOrder = arr.join(',');
                  await widgetSelf.plugin.saveSettings();
                  widgetSelf.display();
                  if (typeof (window as any).__IFTO_refreshWidgetDisplay === 'function') (window as any).__IFTO_refreshWidgetDisplay();
                }
              } catch(e) { console.error('IFTO down err', e); }
            });
            return btn;
          });
        })(def.id);
      }

      // DeepSeek API Key inline under DeepSeek Token toggle
      if (def.id === 'deepseek') {
        new Setting(settingsRoot)
          .setName('DeepSeek API Key')
          .setDesc('用于查询 DeepSeek Token 额度。注意：API Key 以明文存储于 Vault 配置中，请勿将 Vault 分享给他人，以免泄露')
          .addText(text => {
            text.inputEl.type = 'password';
            return text
              .setPlaceholder('sk-...')
              .setValue(widgetSelf.plugin.settings.deepseekApiKey)
              .onChange(async (value) => {
                widgetSelf.plugin.settings.deepseekApiKey = value.trim();
                await widgetSelf.plugin.saveSettings();
              });
          });
      }

      // MiniMax API Key + URL inline under MiniMax Token toggle
      if (def.id === 'minimax') {
        new Setting(settingsRoot)
          .setName('MiniMax API Key')
          .setDesc('用于查询 MiniMax Token 额度。注意：API Key 以明文存储于 Vault 配置中，请勿将 Vault 分享给他人，以免泄露')
          .addText(text => {
            text.inputEl.type = 'password';
            return text
              .setPlaceholder('sk-...')
              .setValue(widgetSelf.plugin.settings.minimaxApiKey)
              .onChange(async (value) => {
                widgetSelf.plugin.settings.minimaxApiKey = value.trim();
                await widgetSelf.plugin.saveSettings();
              });
          });
        new Setting(settingsRoot)
          .setName('MiniMax API URL')
          .setDesc('查询余额的接口地址(MiniMax 官方 https://www.minimaxi.com/v1/token_plan/remains,Bearer API key 认证);若改,确保该端点支持 Bearer 而非 cookie session')
          .addText(text => text
            .setPlaceholder('https://www.minimaxi.com/v1/token_plan/remains')
            .setValue(widgetSelf.plugin.settings.minimaxApiUrl)
            .onChange(async (value) => {
              widgetSelf.plugin.settings.minimaxApiUrl = value.trim();
              await widgetSelf.plugin.saveSettings();
            }));
      }
    });

    settingsRoot.createEl('h3', { text: '收集功能' });

    new Setting(settingsRoot)
      .setName('新建收集模板')
      .setDesc('新建收集文件时使用的模板文件路径（如 Templates/收集模板.md），留空则创建空白文件')
      .addText(text => text
        .setPlaceholder('Templates/收集模板.md')
        .setValue(this.plugin.settings.collectionTemplate)
        .onChange(async (value) => {
          this.plugin.settings.collectionTemplate = value.trim();
          await this.plugin.saveSettings();
        }));

    settingsRoot.createEl('h3', { text: '阅读功能' });

    new Setting(settingsRoot)
      .setName('新建阅读模板')
      .setDesc('新建阅读记录时使用的模板文件路径（自动添加 status: 在读），留空则创建空白文件')
      .addText(text => text
        .setPlaceholder('Templates/阅读模板.md')
        .setValue(this.plugin.settings.readingTemplate)
        .onChange(async (value) => {
          this.plugin.settings.readingTemplate = value.trim();
          await this.plugin.saveSettings();
        }));

    settingsRoot.createEl('h3', { text: '笔记功能' });

    new Setting(settingsRoot)
      .setName('新建笔记路径')
      .setDesc('新建笔记文件时保存的文件夹路径')
      .addText(text => text
        .setPlaceholder('010-信箱 INBOX/040-笔记')
        .setValue(this.plugin.settings.notePath)
        .onChange(async (value) => {
          this.plugin.settings.notePath = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('新建笔记模板')
      .setDesc('新建笔记时使用的模板文件路径，留空则创建空白文件')
      .addText(text => text
        .setPlaceholder('Templates/笔记模板.md')
        .setValue(this.plugin.settings.noteTemplate)
        .onChange(async (value) => {
          this.plugin.settings.noteTemplate = value.trim();
          await this.plugin.saveSettings();
        }));

    settingsRoot.createEl('h3', { text: '复盘路径' });

    new Setting(settingsRoot)
      .setName('日报文件夹')
      .setDesc('日报文件所在文件夹路径')
      .addText(text => text
        .setPlaceholder('600-复盘总结/601-报告总结/602-日报')
        .setValue(this.plugin.settings.reviewDailyPath)
        .onChange(async (value) => {
          this.plugin.settings.reviewDailyPath = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('日报模板')
      .setDesc('新建日报时使用的模板文件路径，留空则创建空白文件')
      .addText(text => text
        .setPlaceholder('Templates/日报模板.md')
        .setValue(this.plugin.settings.reviewDailyTemplate)
        .onChange(async (value) => {
          this.plugin.settings.reviewDailyTemplate = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('周报文件夹')
      .setDesc('周报文件所在文件夹路径')
      .addText(text => text
        .setPlaceholder('600-复盘总结/601-报告总结/603-周报')
        .setValue(this.plugin.settings.reviewWeeklyPath)
        .onChange(async (value) => {
          this.plugin.settings.reviewWeeklyPath = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('周报模板')
      .setDesc('新建周报时使用的模板文件路径，留空则创建空白文件')
      .addText(text => text
        .setPlaceholder('Templates/周报模板.md')
        .setValue(this.plugin.settings.reviewWeeklyTemplate)
        .onChange(async (value) => {
          this.plugin.settings.reviewWeeklyTemplate = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('月报文件夹')
      .setDesc('月报文件所在文件夹路径')
      .addText(text => text
        .setPlaceholder('600-复盘总结/601-报告总结/604-月报')
        .setValue(this.plugin.settings.reviewMonthlyPath)
        .onChange(async (value) => {
          this.plugin.settings.reviewMonthlyPath = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('月报模板')
      .setDesc('新建月报时使用的模板文件路径，留空则创建空白文件')
      .addText(text => text
        .setPlaceholder('Templates/月报模板.md')
        .setValue(this.plugin.settings.reviewMonthlyTemplate)
        .onChange(async (value) => {
          this.plugin.settings.reviewMonthlyTemplate = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('项目总结文件夹')
      .setDesc('项目总结文件所在文件夹路径')
      .addText(text => text
        .setPlaceholder('600-复盘总结/610-项目总结')
        .setValue(this.plugin.settings.reviewProjectPath)
        .onChange(async (value) => {
          this.plugin.settings.reviewProjectPath = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('项目总结模板')
      .setDesc('新建项目总结时使用的模板文件路径，留空则创建空白文件')
      .addText(text => text
        .setPlaceholder('Templates/项目总结模板.md')
        .setValue(this.plugin.settings.reviewProjectTemplate)
        .onChange(async (value) => {
          this.plugin.settings.reviewProjectTemplate = value.trim();
          await this.plugin.saveSettings();
        }));

    settingsRoot.createEl('h3', { text: '版块文件夹路径' });

    new Setting(settingsRoot)
      .setName('收集箱')
      .setDesc('新建收集文件存放的文件夹路径')
      .addText(text => text
        .setPlaceholder('010-信箱 INBOX/020-收集')
        .setValue(this.plugin.settings.inboxFolder)
        .onChange(async (value) => {
          this.plugin.settings.inboxFolder = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('快速学习')
      .setDesc('快速学习文件存放的文件夹路径')
      .addText(text => text
        .setPlaceholder('010-信箱 INBOX/011-快速学习')
        .setValue(this.plugin.settings.quickLearnFolder)
        .onChange(async (value) => {
          this.plugin.settings.quickLearnFolder = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('今日待办')
      .setDesc('今日待办文件存放的文件夹路径')
      .addText(text => text
        .setPlaceholder('010-信箱 INBOX/031-今日待办')
        .setValue(this.plugin.settings.todoFolder)
        .onChange(async (value) => {
          this.plugin.settings.todoFolder = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('活动清单')
      .setDesc('活动清单文件存放的文件夹路径')
      .addText(text => text
        .setPlaceholder('010-信箱 INBOX/030-活动清单')
        .setValue(this.plugin.settings.activityFolder)
        .onChange(async (value) => {
          this.plugin.settings.activityFolder = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('新建任务存放')
      .setDesc('新建任务文件默认存放的文件夹路径')
      .addText(text => text
        .setPlaceholder('100-工作台WORKDESK/120-项目管理/121-未开始')
        .setValue(this.plugin.settings.taskFolder)
        .onChange(async (value) => {
          this.plugin.settings.taskFolder = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('项目任务模板')
      .setDesc('PROJECT板块新建任务时使用的模板文件路径，留空则创建空白文件')
      .addText(text => text
        .setPlaceholder('Templates/任务模板.md')
        .setValue(this.plugin.settings.projectTaskTemplate)
        .onChange(async (value) => {
          this.plugin.settings.projectTaskTemplate = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('项目管理基础路径')
      .setDesc('项目管理看板读取的父文件夹路径')
      .addText(text => text
        .setPlaceholder('100-工作台WORKDESK/120-项目管理')
        .setValue(this.plugin.settings.projectBase)
        .onChange(async (value) => {
          this.plugin.settings.projectBase = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('项目阶段列表')
      .setDesc('项目阶段子文件夹名称，用逗号分隔（如：121-未开始,122-推进中,123-已完成）')
      .addText(text => text
        .setPlaceholder('121-未开始,122-推进中,123-已完成')
        .setValue(this.plugin.settings.projectCols)
        .onChange(async (value) => {
          this.plugin.settings.projectCols = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('书籍文件夹')
      .setDesc('阅读笔记-书籍存放的文件夹路径')
      .addText(text => text
        .setPlaceholder('400-资源RESOURCE/420-览阅/421-书籍')
        .setValue(this.plugin.settings.bookFolder)
        .onChange(async (value) => {
          this.plugin.settings.bookFolder = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('论文文件夹')
      .setDesc('阅读笔记-论文存放的文件夹路径')
      .addText(text => text
        .setPlaceholder('400-资源RESOURCE/420-览阅/422-论文')
        .setValue(this.plugin.settings.paperFolder)
        .onChange(async (value) => {
          this.plugin.settings.paperFolder = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('整理-资源根目录')
      .setDesc('整理杂项中显示的文件夹根目录路径')
      .addText(text => text
        .setPlaceholder('400-资源RESOURCE')
        .setValue(this.plugin.settings.resourceRoot)
        .onChange(async (value) => {
          this.plugin.settings.resourceRoot = value.trim();
          await this.plugin.saveSettings();
        }));

    settingsRoot.createEl('h3', { text: '服务连接' });

    new Setting(settingsRoot)
      .setName('Ollama 地址')
      .setDesc('本地 Ollama 服务地址，用于连通性检测')
      .addText(text => text
        .setPlaceholder('http://localhost:11434')
        .setValue(this.plugin.settings.ollamaUrl)
        .onChange(async (value) => {
          this.plugin.settings.ollamaUrl = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(settingsRoot)
      .setName('Ragflow 地址')
      .setDesc('Ragflow 服务地址，用于连通性检测')
      .addText(text => text
        .setPlaceholder('http://localhost:9380')
        .setValue(this.plugin.settings.ragflowUrl)
        .onChange(async (value) => {
          this.plugin.settings.ragflowUrl = value.trim();
          await this.plugin.saveSettings();
        }));

  }
}
