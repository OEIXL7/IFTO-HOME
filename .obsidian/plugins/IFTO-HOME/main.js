var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// main.ts
var main_exports = {};
__export(main_exports, {
  IFTOView: () => IFTOView,
  IFTO_VIEW_TYPE: () => IFTO_VIEW_TYPE,
  default: () => IFTOPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  deepseekApiKey: "",
  minimaxApiKey: "",
  collectionTemplate: "",
  readingTemplate: "",
  notePath: "010-\u4FE1\u7BB1 INBOX/040-\u7B14\u8BB0",
  noteTemplate: "",
  reviewDailyPath: "600-\u590D\u76D8\u603B\u7ED3/601-\u62A5\u544A\u603B\u7ED3/602-\u65E5\u62A5",
  reviewWeeklyPath: "600-\u590D\u76D8\u603B\u7ED3/601-\u62A5\u544A\u603B\u7ED3/603-\u5468\u62A5",
  reviewMonthlyPath: "600-\u590D\u76D8\u603B\u7ED3/601-\u62A5\u544A\u603B\u7ED3/604-\u6708\u62A5",
  reviewProjectPath: "600-\u590D\u76D8\u603B\u7ED3/610-\u9879\u76EE\u603B\u7ED3",
  reviewDailyTemplate: "",
  reviewWeeklyTemplate: "",
  reviewMonthlyTemplate: "",
  reviewProjectTemplate: "",
  heroImageUrl: "",
  heroImageFolder: "",
  inboxFolder: "010-\u4FE1\u7BB1 INBOX/020-\u6536\u96C6",
  quickLearnFolder: "010-\u4FE1\u7BB1 INBOX/011-\u5FEB\u901F\u5B66\u4E60",
  todoFolder: "010-\u4FE1\u7BB1 INBOX/031-\u4ECA\u65E5\u5F85\u529E",
  activityFolder: "010-\u4FE1\u7BB1 INBOX/030-\u6D3B\u52A8\u6E05\u5355",
  taskFolder: "100-\u5DE5\u4F5C\u53F0WORKDESK/120-\u9879\u76EE\u7BA1\u7406/121-\u672A\u5F00\u59CB",
  projectBase: "100-\u5DE5\u4F5C\u53F0WORKDESK/120-\u9879\u76EE\u7BA1\u7406",
  projectCols: "121-\u672A\u5F00\u59CB,122-\u63A8\u8FDB\u4E2D,123-\u5DF2\u5B8C\u6210",
  bookFolder: "400-\u8D44\u6E90RESOURCE/420-\u89C8\u9605/421-\u4E66\u7C4D",
  paperFolder: "400-\u8D44\u6E90RESOURCE/420-\u89C8\u9605/422-\u8BBA\u6587",
  resourceRoot: "400-\u8D44\u6E90RESOURCE",

  shortcutCollectPath: "010-\u4FE1\u7BB1 INBOX/020-\u6536\u96C6",
  shortcutTodoPath: "010-\u4FE1\u7BB1 INBOX/030-\u6D3B\u52A8\u6E05\u5355",
  shortcutTaskPath: "100-\u5DE5\u4F5C\u53F0WORKDESK/120-\u9879\u76EE\u7BA1\u7406/121-\u672A\u5F00\u59CB",
  shortcutNotePath: "010-\u4FE1\u7BB1 INBOX/040-\u7B14\u8BB0",
  shortcutCollectTemplate: "",
  shortcutTodoTemplate: "",
  shortcutTaskTemplate: "",
  shortcutNoteTemplate: "",
  projectTaskTemplate: "",
  ollamaUrl: "http://localhost:11434",
  ragflowUrl: "http://localhost:9380",
  minimaxApiUrl: "https://www.minimaxi.com/v1/token_plan/remains",
  widgetOrder: "calendar,deepseek,minimax,habits,ollama,ragflow,weeknotes,todotoday",
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
var IFTO_VIEW_TYPE = "ifto-homepage";
var IFTOView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    __publicField(this, "plugin");
    this.plugin = plugin;
  }
  getViewType() {
    return IFTO_VIEW_TYPE;
  }
  getDisplayText() {
    return "IFTO-HOME \u9996\u9875";
  }
  getIcon() {
    return "blocks";
  }
  async onOpen() {
    this.containerEl.empty();
    this.containerEl.addClass("ifto-container");
    this.containerEl.style.height = "100%";
    this.containerEl.style.overflow = "auto";
    try {
      window.__IFTO_SETTINGS = {
        heroImageUrl: this.plugin.settings.heroImageUrl,
        heroImageFolder: this.plugin.settings.heroImageFolder,
        deepseekKey: this.plugin.settings.deepseekApiKey,
        minimaxKey: this.plugin.settings.minimaxApiKey,
        minimaxApiUrl: this.plugin.settings.minimaxApiUrl,
        widgetMinimaxEnabled: this.plugin.settings.widgetMinimaxEnabled,
        readingTemplate: this.plugin.settings.readingTemplate,
        collectionTemplate: this.plugin.settings.collectionTemplate,
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
        shortcutCollectPath: this.plugin.settings.shortcutCollectPath,
        shortcutTodoPath: this.plugin.settings.shortcutTodoPath,
        shortcutTaskPath: this.plugin.settings.shortcutTaskPath,
        shortcutNotePath: this.plugin.settings.shortcutNotePath,
        shortcutCollectTemplate: this.plugin.settings.shortcutCollectTemplate,
        shortcutTodoTemplate: this.plugin.settings.shortcutTodoTemplate,
        shortcutTaskTemplate: this.plugin.settings.shortcutTaskTemplate,
        shortcutNoteTemplate: this.plugin.settings.shortcutNoteTemplate,
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
      const pluginDir = this.app.vault.configDir + "/plugins/IFTO-HOME";
      const htmlContent = await this.app.vault.adapter.read(pluginDir + "/home.html");
      this.containerEl.innerHTML = htmlContent;
      this.plugin.applyAppearance(this.containerEl);
      const oldScript = document.getElementById("ifto-home-script");
      if (oldScript) oldScript.remove();
      const jsContent = await this.app.vault.adapter.read(pluginDir + "/home.js");
      const scriptEl = document.createElement("script");
      scriptEl.id = "ifto-home-script";
      scriptEl.textContent = jsContent;
      this.containerEl.__createNote = () => this.createCollectionNote();
      window.__IFTO_listFiles = async (folder) => {
        try {
          if (!await this.app.vault.adapter.exists(folder)) return [];
          const result = await this.app.vault.adapter.list(folder);
          const prefix = folder.endsWith("/") ? folder : folder + "/";
          return (result.files || []).filter((f) => f.startsWith(prefix) && !f.substring(prefix.length).includes("/")).map((f) => f.substring(prefix.length));
        } catch (e) {
          console.error("IFTO: list files error", e);
          return [];
        }
      };
      const findFile = (path) => {
        const vault = this.app.vault;
        if (vault.getFileByPath) {
          const f = vault.getFileByPath(path);
          if (f) return f;
        }
        if (vault.getAbstractByPath) {
          const f = vault.getAbstractByPath(path);
          if (f && "stat" in f) return f;
        }
        const all = vault.getFiles();
        for (const f of all) {
          if (f.path === path) return f;
        }
        return null;
      };
      window.__IFTO_openFile = async (filePath) => {
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
                  const view = leaf.view;
                  if (view && view.editor && typeof view.editor.focus === "function") {
                    view.editor.focus();
                  }
                } catch (e) { /* ignore */ }
                if (++retries < maxRetries) setTimeout(fn, 250);
              };
              fn();
            }, 100);
          }
        } catch (e) {
          console.error("IFTO: open file error", e);
        }
      };
      window.__IFTO_moveFile = async (filePath, targetFolder) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          const fileName = filePath.split("/").pop() || "untitled";
          const newPath = (targetFolder.endsWith("/") ? targetFolder : targetFolder + "/") + fileName;
          if (await adapter.exists(newPath)) {
            new import_obsidian.Notice(`\u76EE\u6807\u6587\u4EF6\u5DF2\u5B58\u5728: ${fileName}`);
            return false;
          }
          const file = findFile(filePath);
          if (!file) return false;
          console.log("[IFTO] moveFile: \"" + filePath + "\" -> \"" + newPath + "\"");
          await this.app.vault.rename(file, newPath);
          new import_obsidian.Notice(`\u5DF2\u79FB\u52A8: ${fileName}`);
          return true;
        } catch (e) {
          console.error("IFTO: move file error", e);
          new import_obsidian.Notice(`\u79FB\u52A8\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_listFolderContents = async (folder) => {
        try {
          const result = await this.app.vault.adapter.list(folder);
          const prefix = folder.endsWith("/") ? folder : folder + "/";
          const items = [];
          (result.folders || []).forEach((f) => {
            if (f.startsWith(prefix) && !f.substring(prefix.length).includes("/")) {
              items.push({ name: f.substring(prefix.length), isFolder: true });
            }
          });
          (result.files || []).forEach((f) => {
            if (f.startsWith(prefix) && !f.substring(prefix.length).includes("/")) {
              items.push({ name: f.substring(prefix.length), isFolder: false });
            }
          });
          return items;
        } catch (e) {
          console.error("IFTO: list folder error", e);
          return [];
        }
      };
      window.__IFTO_getFilesDetail = async (folder, start, count) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) return { files: [], total: 0 };
          const result = await adapter.list(folder);
          const prefix = folder.endsWith("/") ? folder : folder + "/";
          const files = (result.files || []).filter((f) => f.startsWith(prefix) && !f.substring(prefix.length).includes("/")).map((f) => f.substring(prefix.length)).sort().reverse();
          const pageFiles = files.slice(start, start + count);
          const details = [];
          for (const f of pageFiles) {
            try {
              const fp = folder + "/" + f;
              const stat = await adapter.stat(fp);
              const content = await adapter.read(fp);
              const tags = [];
              let title = "";
              const fm = content.match(/^---\n([\s\S]*?)\n---/);
              if (fm) {
                const titleMatch = fm[1].match(/^title:\s*(.+)$/m);
                if (titleMatch) title = titleMatch[1].trim().replace(/^['"]|['"]$/g, "");
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
                    tags.push(...inlineArr[1].split(/[,，]/).map((t) => t.trim().replace(/^['"]|['"]$/g, '')).filter((t) => t));
                  } else if (rest) {
                    // Single-value scalar
                    tags.push(rest.replace(/^['"]|['"]$/g, ''));
                  } else {
                    // Multi-line list following an empty `tags:` line
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
              if (!title) {
                const heading = content.match(/^#\s+(.+)$/m);
                if (heading) title = heading[1].trim();
              }
              details.push({ name: f, ctime: stat.ctime, tags, title });
            } catch (e) {
              details.push({ name: f, ctime: null, tags: [] });
            }
          }
          return { files: details, total: files.length };
        } catch (e) {
          console.error("IFTO: getFilesDetail error", e);
          return { files: [], total: 0 };
        }
      };
      window.__IFTO_createFile = async (folder, fileName, content) => {
        try {
          const fullPath = (folder.endsWith("/") ? folder : folder + "/") + fileName;
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) await this.app.vault.createFolder(folder);
          await this.app.vault.create(fullPath, content || "");
          return true;
        } catch (e) {
          console.error("IFTO: create file error", e);
          new import_obsidian.Notice(`\u521B\u5EFA\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_createFolder = async (folderPath) => {
        try {
          if (!await this.app.vault.adapter.exists(folderPath)) {
            await this.app.vault.createFolder(folderPath);
            return true;
          }
          return false;
        } catch (e) {
          console.error('IFTO: create folder error', e);
          return false;
        }
      };
      window.__IFTO_readFile = async (filePath) => {
        try {
          return await this.app.vault.adapter.read(filePath);
        } catch (e) {
          try {
            return await this.app.vault.adapter.read(filePath + ".md");
          } catch (e2) {
            console.error("IFTO: read file error", e, e2);
            return "";
          }
        }
      };
      window.__IFTO_resolveImageUrl = async (path) => {
        if (!path) return "";
        try {
          if (path.startsWith("http://") || path.startsWith("https://")) {
            try {
              const resp = await import_obsidian.requestUrl({ url: path });
              if (resp && resp.arrayBuffer) {
                return _bufToDataUrl(path, resp.arrayBuffer);
              }
            } catch (e) {
              console.warn("IFTO: requestUrl failed, trying fetch fallback", e);
            }
            // Fallback: fetch via Node.js http/https module
            try {
              const mod = path.startsWith("https") ? require("https") : require("http");
              const buf = await new Promise((resolve, reject) => {
                mod.get(path, (res) => {
                  const chunks = [];
                  res.on("data", (c) => chunks.push(c));
                  res.on("end", () => resolve(Buffer.concat(chunks)));
                  res.on("error", reject);
                }).on("error", reject);
              });
              return _bufToDataUrl(path, buf);
            } catch (e2) {
              console.error("IFTO: http fallback also failed", e2);
            }
            return "";
          }
          const file = findFile(path);
          if (!file) return "";
          const arrayBuffer = await this.app.vault.readBinary(file);
          return _bufToDataUrl(path, arrayBuffer);
        } catch (e) {
          console.error("IFTO: resolve image url error", e);
        }
        return "";
      };
      // Helper: ArrayBuffer/Buffer → base64 data URL
      function _bufToDataUrl(p, buf) {
        const ext = (p.split("?")[0].split(".").pop() || "png").toLowerCase();
        const mime = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp", bmp: "image/bmp", svg: "image/svg+xml" };
        const bytes = new Uint8Array(buf);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        return "data:" + (mime[ext] || "image/png") + ";base64," + btoa(binary);
      }
            window.__IFTO_fetchWeatherUrl = async (url) => {
        try {
          const resp = await import_obsidian.requestUrl({
            url,
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
          });
          if (resp.status !== 200) {
            return "__IFTO_ERROR__: HTTP " + resp.status;
          }
          return resp.text || "";
        } catch (e) {
          console.error("IFTO: fetchWeatherUrl error", e);
          return "__IFTO_ERROR__: " + (e.message || "Unknown error");
        }
      };

      window.__IFTO_renameFile = async (filePath, newName) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          const dir = filePath.substring(0, filePath.lastIndexOf("/") + 1);
          const newPath = dir + newName;
          if (await adapter.exists(newPath)) {
            new import_obsidian.Notice("\u76EE\u6807\u6587\u4EF6\u5DF2\u5B58\u5728");
            return false;
          }
          const file = findFile(filePath);
          if (!file) return false;
          console.log("[IFTO] renameFile: \"" + filePath + "\" -> \"" + newPath + "\"");
          await this.app.vault.rename(file, newPath);
          return true;
        } catch (e) {
          console.error("IFTO: rename file error", e);
          new import_obsidian.Notice(`\u91CD\u547D\u540D\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_renameFolder = async (folderPath, newName) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folderPath)) return false;
          const parent = folderPath.substring(0, folderPath.lastIndexOf("/") + 1);
          const newPath = parent + newName;
          if (await adapter.exists(newPath)) {
            new import_obsidian.Notice("\u76EE\u6807\u6587\u4EF6\u5939\u5DF2\u5B58\u5728");
            return false;
          }
          await adapter.rename(folderPath, newPath);
          return true;
        } catch (e) {
          console.error("IFTO: rename folder error", e);
          new import_obsidian.Notice(`\u91CD\u547D\u540D\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_moveFolder = async (srcPath, targetFolder) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(srcPath)) return false;
          const folderName = srcPath.split("/").pop();
          const newPath = (targetFolder.endsWith("/") ? targetFolder : targetFolder + "/") + folderName;
          if (await adapter.exists(newPath)) {
            new import_obsidian.Notice("\u76EE\u6807\u6587\u4EF6\u5939\u5DF2\u5B58\u5728");
            return false;
          }
          await adapter.rename(srcPath, newPath);
          new import_obsidian.Notice(`\u5DF2\u79FB\u52A8\u6587\u4EF6\u5939: ${folderName}`);
          return true;
        } catch (e) {
          console.error("IFTO: move folder error", e);
          new import_obsidian.Notice(`\u79FB\u52A8\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_moveFolderByFiles = async (srcPath, destParent) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(srcPath)) return false;
          const folderName = srcPath.split("/").pop();
          const targetPath = (destParent.endsWith("/") ? destParent : destParent + "/") + folderName;
          if (await adapter.exists(targetPath)) { new import_obsidian.Notice("\u76EE\u6807\u6587\u4EF6\u5939\u5DF2\u5B58\u5728"); return false; }
          await this.app.vault.createFolder(targetPath);
          const moveRec = async (from, to) => {
            const contents = await adapter.list(from);
            for (const f of (contents.files || [])) {
              const fileName = f.split("/").pop();
              const file = findFile(f);
              if (file) await this.app.vault.rename(file, to + "/" + fileName);
            }
            for (const sub of (contents.folders || [])) {
              const subName = sub.split("/").pop();
              const newSub = to + "/" + subName;
              await this.app.vault.createFolder(newSub);
              await moveRec(sub, newSub);
            }
          };
          await moveRec(srcPath, targetPath);
          const delRec = async (p) => {
            const c = await adapter.list(p);
            for (const f of c.files || []) await adapter.remove(f);
            for (const d of c.folders || []) await delRec(d);
            await adapter.rmdir(p);
          };
          await delRec(srcPath);
          new import_obsidian.Notice("\u5DF2\u79FB\u52A8\u6587\u4EF6\u5939: " + folderName);
          return true;
        } catch (e) {
          console.error("IFTO: moveFolderByFiles error", e);
          new import_obsidian.Notice("\u6587\u4EF6\u5939\u79FB\u52A8\u5931\u8D25: " + e.message);
          return false;
        }
      };
      window.__IFTO_deleteFile = async (filePath) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          const file = findFile(filePath);
          if (!file) return false;
          console.log("[IFTO] deleteFile: \"" + filePath + "\"");
          await this.app.vault.delete(file);
          return true;
        } catch (e) {
          console.error("IFTO: delete file error", e);
          new import_obsidian.Notice(`\u5220\u9664\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_deleteFolder = async (folderPath) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folderPath)) return false;
          // Recursively delete all files and subfolders, then remove the folder
          const delRec = async (p) => {
            const c = await adapter.list(p);
            for (const f of c.files || []) await adapter.remove(f);
            for (const d of c.folders || []) await delRec(d);
            await adapter.rmdir(p);
          };
          await delRec(folderPath);
          console.log("[IFTO] deleteFolder: \"" + folderPath + "\"");
          new import_obsidian.Notice(`\u5DF2\u5220\u9664\u9879\u76EE\u6587\u4EF6\u5939`);
          return true;
        } catch (e) {
          console.error("IFTO: delete folder error", e);
          new import_obsidian.Notice(`\u5220\u9664\u5931\u8D25: ${e.message}`);
          return false;
        }
      };
      window.__IFTO_getFilesWithMeta = async (folder) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) return [];
          const result = await adapter.list(folder);
          const prefix = folder.endsWith("/") ? folder : folder + "/";
          const files = (result.files || []).filter((f) => f.startsWith(prefix) && !f.substring(prefix.length).includes("/")).map((f) => f.substring(prefix.length));
          const out = [];
          for (const f of files) {
            try {
              const fp = folder + "/" + f;
              const content = await adapter.read(fp);
              let due = "";
              const fm = content.match(/^---\n([\s\S]*?)\n---/);
              if (fm) {
                const dm = fm[1].match(/due:\s*(.+)/) || fm[1].match(/deadline:\s*(.+)/);
                if (dm) due = dm[1].trim();
              }
              out.push({ name: f, due });
            } catch (e) {
              out.push({ name: f, due: "" });
            }
          }
          return out;
        } catch (e) {
          console.error("IFTO: getFilesWithMeta error", e);
          return [];
        }
      };
      window.__IFTO_getFilesCheckboxState = async (folder) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) return [];
          const result = await adapter.list(folder);
          const prefix = folder.endsWith("/") ? folder : folder + "/";
          const files = (result.files || []).filter((f) => f.startsWith(prefix) && !f.substring(prefix.length).includes("/") && f.toLowerCase().endsWith(".md")).map((f) => f.substring(prefix.length));
          const out = [];
          for (const f of files) {
            let checked = false;
            try {
              const fp = folder + "/" + f;
              const content = await adapter.read(fp);
              const m = content.match(/^\s*[-*+]\s+\[( |x|X)\]/m);
              if (m) checked = m[1].toLowerCase() === "x";
            } catch (e) { /* keep unchecked */ }
            out.push({ name: f, checked });
          }
          return out;
        } catch (e) {
          console.error("IFTO: getFilesCheckboxState error", e);
          return [];
        }
      };
      window.__IFTO_setCheckboxState = async (filePath, checked) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          let content = await adapter.read(filePath);
          const want = checked ? "x" : " ";
          const re = /^(\s*[-*+]\s+)\[( |x|X)\]/m;
          if (re.test(content)) {
            content = content.replace(re, (_full, prefix) => prefix + "[" + want + "]");
          } else {
            content = "- [" + want + "] " + (checked ? "" : "") + "\n" + content.replace(/^\n+/, "");
          }
          await adapter.write(filePath, content);
          return true;
        } catch (e) {
          console.error("IFTO: setCheckboxState error", e);
          return false;
        }
      };
      window.__IFTO_createReadingNote = async () => {
        const folder = this.plugin.settings.bookFolder || "400-\u8D44\u6E90RESOURCE/420-\u89C8\u9605/421-\u4E66\u7C4D";
        const adapter = this.app.vault.adapter;
        const vault = this.app.vault;
        const tpl = this.plugin.settings.readingTemplate;
        let content = "";
        const now = /* @__PURE__ */ new Date();
        const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
        if (tpl) {
          try {
            content = await adapter.read(tpl);
          } catch (e) {
            try {
              content = await adapter.read(tpl + ".md");
            } catch (e2) {
              console.error("IFTO: reading template error", e, e2);
            }
          }
          if (content) {
            content = this.processTemplateVars(content, ts);
          }
        }
        const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (fmMatch) {
          if (fmMatch[1].match(/^status:/m)) {
            content = content.replace(/^status:.*$/m, "status: \u5728\u8BFB");
          } else {
            content = content.replace(/^---\n/, "---\nstatus: \u5728\u8BFB\n");
          }
        } else {
          content = "---\nstatus: \u5728\u8BFB\n---\n" + content;
        }
        const fileName = `${ts}.md`;
        const fullPath = `${folder}/${fileName}`;
        try {
          if (!await adapter.exists(folder)) await vault.createFolder(folder);
          await vault.create(fullPath, content);
          return fullPath;
        } catch (e) {
          console.error("IFTO: create reading note error", e);
          new import_obsidian.Notice(`\u521B\u5EFA\u5931\u8D25: ${e.message}`);
          return "";
        }
      };
      window.__IFTO_getFilesFrontmatter = async (folder) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folder)) return [];
          const result = await adapter.list(folder);
          const prefix = folder.endsWith("/") ? folder : folder + "/";
          const files = (result.files || []).filter((f) => f.startsWith(prefix) && !f.substring(prefix.length).includes("/")).map((f) => f.substring(prefix.length));
          const out = [];
          for (const f of files) {
            try {
              const fp = folder + "/" + f;
              const content = await adapter.read(fp);
              const fm = {};
              const m = content.match(/^---\n([\s\S]*?)\n---/);
              if (m) {
                let _ck = null;
                m[1].split("\n").forEach((line) => {
                  const li = line.match(/^\s+[-]\s+(.+)/);
                  if (li && _ck && !(_ck in fm)) { fm[_ck] = li[1].trim().replace(/^['"]|['"]$/g, ""); return; }
                  const kv = line.match(/^\s*([^:]+?)\s*:\s*(.*)/);
                  if (kv) { _ck = kv[1].trim(); var _v = kv[2].trim().replace(/^['"]|['"]$/g, ""); if (_v) fm[_ck] = _v; }
                });
              }
              out.push({ name: f, fm });
            } catch (e) {
              out.push({ name: f, fm: {} });
            }
          }
          return out;
        } catch (e) {
          console.error("IFTO: getFilesFrontmatter error", e);
          return [];
        }
      };
      // Recursive version: includes files in subfolders
      window.__IFTO_getFilesFrontmatterRecursive = async (folder) => {
        const recList = async (base, dir) => {
          try {
            const adapter = this.app.vault.adapter;
            const result = await adapter.list(dir);
            const out = [];
            for (const f of result.files || []) {
              if (!f.endsWith('.md')) continue;
              const content = await adapter.read(f);
              const fm = {};
              const m = content.match(/^---\n([\s\S]*?)\n---/);
              if (m) {
                let _ck = null;
                m[1].split('\n').forEach((line) => {
                  const li = line.match(/^\s+[-]\s+(.+)/);
                  if (li && _ck && !(_ck in fm)) { fm[_ck] = li[1].trim().replace(/^['"]|['"]$/g, ''); return; }
                  const kv = line.match(/^\s*([^:]+?)\s*:\s*(.*)/);
                  if (kv) { _ck = kv[1].trim(); var _v = kv[2].trim().replace(/^['"]|['"]$/g, ''); if (_v) fm[_ck] = _v; }
                });
              }
              // Fallback: parse blockquote metadata (> **key:** value) if no YAML frontmatter
              if (!m) {
                const bqRegex = /> \*\*([^*]+)\*\*:\s*(.+)/g;
                let match;
                while ((match = bqRegex.exec(content)) !== null) {
                  var key = match[1].trim();
                  var val = match[2].trim().replace(/^['"]|['"]$/g, '');
                  if (key && val) fm[key] = val;
                }
              }
              out.push({ name: f.substring(base.length + 1), fm });
            }
            for (const sub of result.folders || []) {
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
      window.__IFTO_refreshSettings = () => {
        window.__IFTO_SETTINGS = Object.assign({}, window.__IFTO_SETTINGS, {
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
        });
      };
      window.__IFTO_updateFileFrontmatter = async (filePath, key, value) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) return false;
          let content = await adapter.read(filePath);
          const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (fmMatch) {
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
      window.__IFTO_refreshWidgetDisplay = () => {
        window.__IFTO_refreshSettings();
        if (typeof window.renderWidget === 'function') {
          window.renderWidget();
        }
      };
      window.__IFTO_getRandomImageFromFolder = async (folderPath) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(folderPath)) return "";
          const result = await adapter.list(folderPath);
          const prefix = folderPath.endsWith("/") ? folderPath : folderPath + "/";
          const imgExts = new Set([".jpg",".jpeg",".png",".gif",".webp",".bmp",".svg"]);
          const images = (result.files || []).filter((f) =>
            f.startsWith(prefix) && imgExts.has(f.substring(f.lastIndexOf(".")))
          );
          if (images.length === 0) return "";
          const chosen = images[Math.floor(Math.random() * images.length)];
          const buf = await adapter.readBinary(chosen);
          const ext = (chosen.split(".").pop() || "png").toLowerCase();
          const m = {jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",gif:"image/gif",webp:"image/webp",bmp:"image/bmp",svg:"image/svg+xml"};
          const b = new Uint8Array(buf); let s = "";
          for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
          return "data:" + (m[ext] || "image/png") + ";base64," + btoa(s);
        } catch(e) { console.error("IFTO: getRandomImageFromFolder error", e); return ""; }
      };
      window.__IFTO_readListOrder = async (folder) => {
        try {
          const adapter = this.app.vault.adapter;
          const orderPath = (folder.endsWith("/") ? folder : folder + "/") + ".ifto_order.json";
          if (!await adapter.exists(orderPath)) return [];
          const raw = await adapter.read(orderPath);
          const arr = JSON.parse(raw);
          return Array.isArray(arr) ? arr : [];
        } catch(e) { return []; }
      };
      window.__IFTO_writeListOrder = async (folder, order) => {
        try {
          const adapter = this.app.vault.adapter;
          const orderPath = (folder.endsWith("/") ? folder : folder + "/") + ".ifto_order.json";
          await adapter.write(orderPath, JSON.stringify(order, null, 2));
          return true;
        } catch(e) { console.error("IFTO: writeListOrder error", e); return false; }
      };
      window.__IFTO_processTemplate = async (content, fileTitle) => {
        try {
          const now = new Date();
          const ts = fileTitle || now.getFullYear()+String(now.getMonth()+1).padStart(2,"0")+String(now.getDate()).padStart(2,"0")+"_"+String(now.getHours()).padStart(2,"0")+String(now.getMinutes()).padStart(2,"0")+String(now.getSeconds()).padStart(2,"0");
          return this.processTemplateVars(content || "", ts);
        } catch(e) { console.error("IFTO: processTemplate error", e); return content || ""; }
      };
      window.__IFTO_readFileAsDataURL = async (filePath) => {
        try {
          const adapter = this.app.vault.adapter;
          if (!await adapter.exists(filePath)) { console.warn("IFTO: file not found", filePath); return ""; }
          const buf = await adapter.readBinary(filePath);
          const ext = (filePath.split(".").pop() || "png").toLowerCase();
          const m = {jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",gif:"image/gif",webp:"image/webp",bmp:"image/bmp",svg:"image/svg+xml"};
          const b = new Uint8Array(buf); let s = "";
          for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
          return "data:" + (m[ext] || "image/png") + ";base64," + btoa(s);
        } catch(e) { console.error("IFTO: readFileAsDataURL error", e); return ""; }
      };
      window.__IFTO_findFolderByName = async (name, searchRoot) => {
        try {
          const adapter = this.app.vault.adapter;
          const searchDirs = searchRoot ? [searchRoot] : [
            "500-归档资料/510-归档项目",
            "200-工作库WORKFILE/201-项目文件",
            "100-工作台WORKDESK/120-项目管理",
            "010-信箱 INBOX",
            "200-工作库WORKFILE",
            "400-资源RESOURCE",
          ];
          for (const dir of searchDirs) {
            if (!await adapter.exists(dir)) continue;
            const result = await adapter.list(dir);
            for (const folder of (result.folders || [])) {
              const folderName = folder.split("/").pop();
              if (folderName === name) return folder;
            }
          }
          return "";
        } catch (e) {
          console.error("IFTO: findFolderByName error", e);
          return "";
        }
      };
      window.__IFTO_findItemByName = async (name) => {
        try {
          const adapter = this.app.vault.adapter;
          const searchRoots = [
            "500-归档资料", "200-工作库WORKFILE/201-项目文件",
            "100-工作台WORKDESK/120-项目管理", "200-工作库WORKFILE",
            "010-信箱 INBOX", "400-资源RESOURCE",
          ];
          for (const root of searchRoots) {
            if (!await adapter.exists(root)) continue;
            const result = await _searchItem(adapter, root, name, 0, 3);
            if (result) return result;
          }
          return null;
        } catch (e) {
          console.error("IFTO: findItemByName error", e);
          return null;
        }
      };
      const _searchItem = async (adapter, dir, name, depth, maxDepth) => {
        if (depth > maxDepth) return null;
        try {
          const result = await adapter.list(dir);
          for (const folder of (result.folders || [])) {
            const folderName = folder.split("/").pop();
            if (folderName === name) return { path: folder, isFolder: true };
            const sub = await _searchItem(adapter, folder, name, depth + 1, maxDepth);
            if (sub) return sub;
          }
          for (const file of (result.files || [])) {
            if (!file.endsWith(".md")) continue;
            const fileName = file.split("/").pop();
            if (fileName === name) return { path: file, isFolder: false };
          }
          return null;
        } catch (e) { return null; }
      };
      document.body.appendChild(scriptEl);
      const tryRefresh = (fn) => {
        try { if (typeof window[fn] === "function") window[fn](); }
        catch(e) { /* ignore */ }
      };
      this.registerEvent(this.app.vault.on("rename", (file, oldPath) => {
        const pBase = this.plugin.settings.projectBase;
        const actFolder = this.plugin.settings.activityFolder;
        const todoFolder = this.plugin.settings.todoFolder;
        const inboxFolder = this.plugin.settings.inboxFolder;
        const bookFolder = this.plugin.settings.bookFolder;
        const paperFolder = this.plugin.settings.paperFolder;
        const newPath = file.path;
        if (pBase && (newPath.startsWith(pBase) || oldPath && oldPath.startsWith(pBase))) tryRefresh("renderProject");
        if (actFolder && (newPath.startsWith(actFolder) || oldPath && oldPath.startsWith(actFolder))) tryRefresh("renderActivity");
        if (todoFolder && (newPath.startsWith(todoFolder) || oldPath && oldPath.startsWith(todoFolder))) tryRefresh("renderTodo");
        if (inboxFolder && (newPath.startsWith(inboxFolder) || oldPath && oldPath.startsWith(inboxFolder))) tryRefresh("renderInbox");
        if (bookFolder && (newPath.startsWith(bookFolder) || oldPath && oldPath.startsWith(bookFolder))) tryRefresh("renderNote");
        if (paperFolder && (newPath.startsWith(paperFolder) || oldPath && oldPath.startsWith(paperFolder))) tryRefresh("renderNote");
      }));
      this.registerEvent(this.app.vault.on("create", (file) => {
        const actFolder = this.plugin.settings.activityFolder;
        const pBase = this.plugin.settings.projectBase;
        const inboxFolder = this.plugin.settings.inboxFolder;
        const bookFolder = this.plugin.settings.bookFolder;
        const paperFolder = this.plugin.settings.paperFolder;
        const newPath = file.path;
        if (pBase && newPath.startsWith(pBase)) tryRefresh("renderProject");
        if (actFolder && newPath.startsWith(actFolder)) tryRefresh("renderActivity");
        if (inboxFolder && newPath.startsWith(inboxFolder)) tryRefresh("renderInbox");
        if (bookFolder && newPath.startsWith(bookFolder)) tryRefresh("renderNote");
        if (paperFolder && newPath.startsWith(paperFolder)) tryRefresh("renderNote");
      }));
      this.registerEvent(this.app.vault.on("delete", (file) => {
        const inboxFolder = this.plugin.settings.inboxFolder;
        const bookFolder = this.plugin.settings.bookFolder;
        const paperFolder = this.plugin.settings.paperFolder;
        const pBase = this.plugin.settings.projectBase;
        if (inboxFolder && file.path.startsWith(inboxFolder)) tryRefresh("renderInbox");
        if (bookFolder && file.path.startsWith(bookFolder)) tryRefresh("renderNote");
        if (paperFolder && file.path.startsWith(paperFolder)) tryRefresh("renderNote");
        if (pBase && file.path.startsWith(pBase)) tryRefresh("renderProject");
      }));
      let __iftoProjectModifyTimer = null;
      this.registerEvent(this.app.vault.on("modify", (file) => {
        const bookFolder = this.plugin.settings.bookFolder;
        const paperFolder = this.plugin.settings.paperFolder;
        const pBase = this.plugin.settings.projectBase;
        if (bookFolder && file.path.startsWith(bookFolder)) tryRefresh("renderNote");
        if (paperFolder && file.path.startsWith(paperFolder)) tryRefresh("renderNote");
        if (pBase && file.path.startsWith(pBase)) {
          if (__iftoProjectModifyTimer) clearTimeout(__iftoProjectModifyTimer);
          __iftoProjectModifyTimer = setTimeout(() => {
            __iftoProjectModifyTimer = null;
            tryRefresh("renderProject");
          }, 600);
        }
      }));
    } catch (e) {
      console.error("IFTO: Failed to load home.html", e);
      this.containerEl.innerHTML = `
        <div style="padding:40px;text-align:center;color:var(--text-muted);">
          <h2>IFTO \u9996\u9875</h2>
          <p>\u52A0\u8F7D\u9875\u9762\u5931\u8D25: ${e.message}</p>
          <p style="font-size:12px;margin-top:20px;">\u8BF7\u786E\u8BA4 home.html \u6587\u4EF6\u5B58\u5728\u4E8E\u63D2\u4EF6\u76EE\u5F55\u4E2D</p>
        </div>
      `;
    }
  }
  async createCollectionNote() {
    const folder = this.plugin.settings.inboxFolder || "010-\u4FE1\u7BB1 INBOX/020-\u6536\u96C6";
    const templatePath = this.plugin.settings.collectionTemplate;
    let content = "";
    const now = /* @__PURE__ */ new Date();
    const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
    if (templatePath) {
      try {
        content = await this.app.vault.adapter.read(templatePath);
      } catch (e) {
        try {
          content = await this.app.vault.adapter.read(templatePath + ".md");
        } catch (e2) {
          console.error("IFTO: template read failed", e, e2);
          new import_obsidian.Notice(`\u6A21\u677F\u8BFB\u53D6\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u8DEF\u5F84: ${templatePath}`);
        }
      }
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
      new import_obsidian.Notice(`\u5DF2\u521B\u5EFA: ${fileName}`);
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
            const view = leaf.view;
            if (view && view.editor && typeof view.editor.focus === "function") {
              view.editor.focus();
            }
          } catch (e) { /* ignore */ }
          if (++retries < maxRetries) setTimeout(fn, 250);
        };
        fn();
      }, 100);
    } catch (e) {
      new import_obsidian.Notice(`\u521B\u5EFA\u5931\u8D25: ${e.message}`);
    }
  }
  processTemplateVars(text, fileTitle) {
    const now = /* @__PURE__ */ new Date();
    const y = now.getFullYear();
    const M = now.getMonth() + 1;
    const d = now.getDate();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    text = text.replace(/\{\{date:([^}]+)\}\}/g, (_, fmt) => {
      return fmt.replace(/YYYY/g, String(y)).replace(/YY/g, String(y).slice(-2)).replace(/MM/g, String(M).padStart(2, "0")).replace(/M/g, String(M)).replace(/DD/g, String(d).padStart(2, "0")).replace(/D/g, String(d));
    });
    text = text.replace(/\{\{time:([^}]+)\}\}/g, (_, fmt) => {
      return fmt.replace(/HH/g, String(h).padStart(2, "0")).replace(/H/g, String(h)).replace(/hh/g, String(h % 12 || 12).padStart(2, "0")).replace(/h/g, String(h % 12 || 12)).replace(/mm/g, String(m).padStart(2, "0")).replace(/ss/g, String(s).padStart(2, "0")).replace(/A/g, h < 12 ? "AM" : "PM");
    });
    text = text.replace(/\{\{date\}\}/g, `${y}-${String(M).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
    text = text.replace(/\{\{time\}\}/g, `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    text = text.replace(/<%\s*tp\.file\.creation_date\s*\(\s*(?:"([^"]*)"|'([^']*)')?\s*\)\s*%>/g, (_, fmt1, fmt2) => {
      const fmt = (fmt1 || fmt2 || "YYYY-MM-DD").replace(/HH/, String(h).padStart(2, "0")).replace(/mm/, String(m).padStart(2, "0")).replace(/ss/, String(s).padStart(2, "0"));
      return fmt.replace(/YYYY/g, String(y)).replace(/YY/g, String(y).slice(-2)).replace(/MM/g, String(M).padStart(2, "0")).replace(/M/g, String(M)).replace(/DD/g, String(d).padStart(2, "0")).replace(/D/g, String(d));
    });
    text = text.replace(/<%\s*tp\.date\.now\s*\(\s*(?:"([^"]*)"|'([^']*)')?\s*\)\s*%>/g, (_, fmt1, fmt2) => {
      const fmt = (fmt1 || fmt2 || "YYYY-MM-DD").replace(/HH/, String(h).padStart(2, "0")).replace(/mm/, String(m).padStart(2, "0")).replace(/ss/, String(s).padStart(2, "0"));
      return fmt.replace(/YYYY/g, String(y)).replace(/YY/g, String(y).slice(-2)).replace(/MM/g, String(M).padStart(2, "0")).replace(/M/g, String(M)).replace(/DD/g, String(d).padStart(2, "0")).replace(/D/g, String(d));
    });
    text = text.replace(/<%\s*tp\.date\.now\s*\(\s*(?:"([^"]*)"|'([^']*)')\s*,\s*(-?\d+)\s*\)\s*%>/g, (_, fmt1, fmt2, offset) => {
      const fmt = (fmt1 || fmt2 || "YYYY-MM-DD").replace(/HH/, String(h).padStart(2, "0")).replace(/mm/, String(m).padStart(2, "0")).replace(/ss/, String(s).padStart(2, "0"));
      const od = new Date(now.getTime() + parseInt(offset) * 864e5);
      const oy = od.getFullYear(), oM = od.getMonth() + 1, oDate = od.getDate();
      return fmt.replace(/YYYY/g, String(oy)).replace(/YY/g, String(oy).slice(-2)).replace(/MM/g, String(oM).padStart(2, "0")).replace(/M/g, String(oM)).replace(/DD/g, String(oDate).padStart(2, "0")).replace(/D/g, String(oDate));
    });
    text = text.replace(/<%\s*tp\.file\.title\s*(?:\(\s*\))?\s*%>/g, fileTitle || "");
    text = text.replace(/<%\s*tp\.file\.folder\s*\(\s*\)\s*%>/g, "");
    return text;
  }
};
var IFTOPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "settings");
  }
  applyAppearance(container) {
    const target = container || this.app.workspace.getLeavesOfType(IFTO_VIEW_TYPE)?.[0]?.view?.containerEl;
    if(!target) return;
    target.style.zoom = String(this.settings.zoom);
    if(this.settings.bgColor) {
      target.style.background = this.settings.bgColor;
      target.style.setProperty("--bg", this.settings.bgColor);
      target.style.setProperty("--ifto-bg", this.settings.bgColor);
    } else {
      target.style.background = "";
      target.style.removeProperty("--bg");
      target.style.removeProperty("--ifto-bg");
    }
  }
  async onload() {
    await this.loadSettings();
    this.registerView(IFTO_VIEW_TYPE, (leaf) => new IFTOView(leaf, this));
    this.addRibbonIcon("blocks", "IFTO-HOME \u9996\u9875", () => {
      this.activateView();
    });
    this.addCommand({
      id: "open-ifto-homepage",
      name: "\u6253\u5F00 IFTO-HOME \u9996\u9875",
      callback: () => this.activateView()
    });
    this.addSettingTab(new IFTOSettingsTab(this.app, this));
    window.__IFTO_applyRadius = (radius) => {
      const v = typeof radius === "number" && radius >= 0 ? radius : 8;
      document.documentElement.style.setProperty("--ifto-radius", v + "px");
    };
    window.__IFTO_applyRadius(this.settings.borderRadius);
    this.registerEvent(this.app.workspace.on("css-change", () => {
      this.applyAppearance();
    }));
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
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
};
var IFTOSettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    __publicField(this, "plugin");
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("ifto-settings-tab");
    containerEl.style.padding = "0";
    containerEl.style.boxSizing = "border-box";
    const settingsRoot = containerEl.createDiv({ cls: "ifto-settings-root" });
    settingsRoot.style.padding = "24px clamp(24px, 5vw, 48px)";
    settingsRoot.style.boxSizing = "border-box";
    settingsRoot.style.maxWidth = "960px";
    settingsRoot.style.margin = "0 auto";
    settingsRoot.style.width = "100%";
    settingsRoot.createEl("h2", { text: "IFTO-HOME \u8BBE\u7F6E" });
    new import_obsidian.Setting(settingsRoot).setName("\u9996\u9875\u56FE\u7247\u6587\u4EF6\u5939\u8DEF\u5F84").setDesc("\u8BBE\u7F6E\u9996\u9875\u9876\u90E8\u5927\u56FE\u968F\u673A\u663E\u793A\u7684\u56FE\u7247\u6587\u4EF6\u5939\u8DEF\u5F84\uFF0C\u6BCF\u6B21\u52A0\u8F7D\u968F\u673A\u9009\u53D6\u4E00\u5F20\u3002\u7559\u7A7A\u5219\u4F7F\u7528\u4E0B\u65B9\u5355\u5F20\u56FE\u7247 URL").addText((text) => text.setPlaceholder("900-\u6570\u636E\u5E93/920-\u56FE\u7247\u8D44\u6E90").setValue(this.plugin.settings.heroImageFolder).onChange(async (value) => {
      this.plugin.settings.heroImageFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("\u9996\u9875\u5355\u5F20\u56FE\u7247 URL\uFF08\u5907\u9009\uFF09").setDesc("\u5F53\u4E0A\u65B9\u6587\u4EF6\u5939\u65E0\u56FE\u7247\u6216\u672A\u8BBE\u7F6E\u65F6\uFF0C\u4F7F\u7528\u6B64\u5355\u5F20\u56FE\u7247 URL\u3002\u82E5\u4E8C\u8005\u5747\u672A\u8BBE\u7F6E\u5219\u663E\u793A\u9ED8\u8BA4\u80CC\u666F").addText((text) => text.setPlaceholder("https://example.com/hero.jpg").setValue(this.plugin.settings.heroImageUrl).onChange(async (value) => {
      this.plugin.settings.heroImageUrl = value.trim();
      await this.plugin.saveSettings();
    }));

    settingsRoot.createEl("h3", { text: "\u5916\u89C2" });
    new import_obsidian.Setting(settingsRoot)
      .setName('\u7f29\u653e\u6bd4\u4f8b')
      .setDesc('\u8c03\u6574\u9996\u9875\u6574\u4f53\u7f29\u653e\uff08Mac \u4e0a\u663e\u793a\u8fc7\u5927\u53ef\u8c03\u5c0f\uff0c\u5982 0.85\uff1bWindows \u663e\u793a\u6b63\u5e38\u4fdd\u6301 1.0\uff09')
      .addSlider(sl => sl
        .setLimits(0.5, 1.5, 0.05)
        .setValue(this.plugin.settings.zoom)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.zoom = value;
          await this.plugin.saveSettings();
          this.plugin.applyAppearance();
        }));

    new import_obsidian.Setting(settingsRoot)
      .setName('\u80cc\u666f\u989c\u8272')
      .setDesc('\u81ea\u5b9a\u4e49\u9996\u9875\u80cc\u666f\u8272\uff0c\u8f93\u5165 # \u516d\u8fdb\u5236\u989c\u8272\u4ee3\u7801\uff08\u5982 #fbfbfb\uff09\uff0c\u7559\u7a7a\u4f7f\u7528\u9ed8\u8ba4')
      .addText(text => text
        .setPlaceholder('#fbfbfb')
        .setValue(this.plugin.settings.bgColor)
        .onChange(async (value) => {
          var v = value.trim();
          this.plugin.settings.bgColor = v;
          await this.plugin.saveSettings();
          this.plugin.applyAppearance();
        }));

    new import_obsidian.Setting(settingsRoot).setName("\u5706\u89D2\u5927\u5C0F").setDesc("\u5168\u5C40\u8C03\u6574\u77E9\u5F62\u5706\u89D2(0=\u786C\u8FB9, 16=\u5F88\u5706);\u4FDD\u5B58\u540E\u7ACB\u5373\u751F\u6548").addSlider((slider) => slider.setLimits(0, 16, 1).setValue(this.plugin.settings.borderRadius).setDynamicTooltip().onChange(async (value) => {
      this.plugin.settings.borderRadius = value;
      await this.plugin.saveSettings();
      if(typeof window.__IFTO_applyRadius === "function") {
        window.__IFTO_applyRadius(value);
      }
    }));
        
    // ====== 快捷通道 ======
    settingsRoot.createEl("h3", { text: "快捷通道" });
    new import_obsidian.Setting(settingsRoot).setName("新建收集路径").setDesc("点击「快捷通道 > 新建收集」时创建文件的文件夹路径").addText((text) => text.setPlaceholder("010-信箱 INBOX/020-收集").setValue(this.plugin.settings.shortcutCollectPath).onChange(async (value) => {
      this.plugin.settings.shortcutCollectPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("新建收集模板").setDesc("快捷通道 > 新建收集 使用的模板文件路径，留空则创建空白文件").addText((text) => text.setPlaceholder("Templates/收集模板.md").setValue(this.plugin.settings.shortcutCollectTemplate).onChange(async (value) => {
      this.plugin.settings.shortcutCollectTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("新建待办路径").setDesc("点击「快捷通道 > 新建待办」时创建文件的文件夹路径").addText((text) => text.setPlaceholder("010-信箱 INBOX/030-活动清单").setValue(this.plugin.settings.shortcutTodoPath).onChange(async (value) => {
      this.plugin.settings.shortcutTodoPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("新建待办模板").setDesc("快捷通道 > 新建待办 使用的模板文件路径，留空则创建空白文件（默认 - [ ]）").addText((text) => text.setPlaceholder("Templates/待办模板.md").setValue(this.plugin.settings.shortcutTodoTemplate).onChange(async (value) => {
      this.plugin.settings.shortcutTodoTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("新建任务路径").setDesc("点击「快捷通道 > 新建任务」时创建文件的文件夹路径").addText((text) => text.setPlaceholder("100-工作台WORKDESK/120-项目管理/121-未开始").setValue(this.plugin.settings.shortcutTaskPath).onChange(async (value) => {
      this.plugin.settings.shortcutTaskPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("新建任务模板").setDesc("快捷通道 > 新建任务 使用的模板文件路径，留空则创建空白文件").addText((text) => text.setPlaceholder("Templates/任务模板.md").setValue(this.plugin.settings.shortcutTaskTemplate).onChange(async (value) => {
      this.plugin.settings.shortcutTaskTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("新建笔记路径").setDesc("点击「快捷通道 > 新建笔记」时创建文件的文件夹路径").addText((text) => text.setPlaceholder("010-信箱 INBOX/040-笔记").setValue(this.plugin.settings.shortcutNotePath).onChange(async (value) => {
      this.plugin.settings.shortcutNotePath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("新建笔记模板").setDesc("快捷通道 > 新建笔记 使用的模板文件路径，留空则创建空白文件").addText((text) => text.setPlaceholder("Templates/笔记模板.md").setValue(this.plugin.settings.shortcutNoteTemplate).onChange(async (value) => {
      this.plugin.settings.shortcutNoteTemplate = value.trim();
      await this.plugin.saveSettings();
    }));

    settingsRoot.createEl('h3', { text: '组件管理' });
    new import_obsidian.Setting(settingsRoot).setName("组件顺序与开关").setDesc("启用/禁用组件，使用 ▲ ▼ 调整显示顺序");
    var self = this;
    var defs = [
      {id:'deepseek', label:'DeepSeek Token'},
      {id:'minimax', label:'MiniMax Token'},
      {id:'calendar', label:'日历'},
      {id:'habits', label:'习惯打卡'},
      {id:'ollama', label:'Ollama 连通检测'},
      {id:'ragflow', label:'Ragflow 连通检测'},
      {id:'weeknotes', label:'本周笔记'},
      {id:'todotoday', label:'今日待办'}
    ];
    defs.forEach(function(def){
      var curOrder = self.plugin.settings.widgetOrder.split(',').map(function(s){return s.trim()}).filter(function(s){return s});
      var pos = curOrder.indexOf(def.id);
      var ek = 'widget'+def.id.charAt(0).toUpperCase()+def.id.slice(1)+'Enabled';
      var st = new import_obsidian.Setting(settingsRoot).setName((pos+1) + '. ' + def.label).addToggle(function(tg){
        return tg.setValue(self.plugin.settings[ek]).onChange(async function(v){
          self.plugin.settings[ek] = v;
          await self.plugin.saveSettings();
          if(window.__IFTO_refreshWidgetDisplay) window.__IFTO_refreshWidgetDisplay();
        });
      });
      if(pos > 0){
        (function(wid){
          st.addButton(function(btn){
            btn.setButtonText('▲');
            btn.onClick(async function(){
              try {
                var a = self.plugin.settings.widgetOrder.split(',').map(function(s){return s.trim()}).filter(function(s){return s});
                var i = a.indexOf(wid);
                if(i > 0){
                  var t = a[i-1]; a[i-1] = a[i]; a[i] = t;
                  self.plugin.settings.widgetOrder = a.join(',');
                  await self.plugin.saveSettings();
                  self.display();
                  if(window.__IFTO_refreshWidgetDisplay) window.__IFTO_refreshWidgetDisplay();
                }
              } catch(e){ console.error('IFTO up err', e); }
            });
            return btn;
          });
        })(def.id);
      }
      if(pos >= 0 && pos < curOrder.length - 1){
        (function(wid){
          st.addButton(function(btn){
            btn.setButtonText('▼');
            btn.onClick(async function(){
              try {
                var a = self.plugin.settings.widgetOrder.split(',').map(function(s){return s.trim()}).filter(function(s){return s});
                var i = a.indexOf(wid);
                if(i >= 0 && i < a.length - 1){
                  var t = a[i+1]; a[i+1] = a[i]; a[i] = t;
                  self.plugin.settings.widgetOrder = a.join(',');
                  await self.plugin.saveSettings();
                  self.display();
                  if(window.__IFTO_refreshWidgetDisplay) window.__IFTO_refreshWidgetDisplay();
                }
              } catch(e){ console.error('IFTO down err', e); }
            });
            return btn;
          });
        })(def.id);
      }
      if(def.id === 'deepseek'){
        new import_obsidian.Setting(settingsRoot).setName("DeepSeek API Key").setDesc("用于查询 DeepSeek Token 额度。注意：API Key 以明文存储于 Vault 配置中，请勿将 Vault 分享给他人，以免泄露，保存后需刷新首页生效").addText(function(text){
          text.inputEl.type = "password";
          return text.setPlaceholder("sk-...").setValue(self.plugin.settings.deepseekApiKey).onChange(async function(value){
            self.plugin.settings.deepseekApiKey = value.trim();
            await self.plugin.saveSettings();
          });
        });
      }
      if(def.id === 'minimax'){
        new import_obsidian.Setting(settingsRoot).setName("MiniMax API Key").setDesc("用于查询 MiniMax Token 额度。注意：API Key 以明文存储于 Vault 配置中，请勿将 Vault 分享给他人，以免泄露").addText(function(text){
          text.inputEl.type = "password";
          return text.setPlaceholder("sk-...").setValue(self.plugin.settings.minimaxApiKey).onChange(async function(value){
            self.plugin.settings.minimaxApiKey = value.trim();
            await self.plugin.saveSettings();
          });
        });
        new import_obsidian.Setting(settingsRoot).setName("MiniMax API URL").setDesc("查询余额的接口地址(MiniMax 官方 https://www.minimaxi.com/v1/token_plan/remains,Bearer API key 认证);若改,确保该端点支持 Bearer 而非 cookie session").addText(function(text){
          return text.setPlaceholder("https://www.minimaxi.com/v1/token_plan/remains").setValue(self.plugin.settings.minimaxApiUrl).onChange(async function(value){
            self.plugin.settings.minimaxApiUrl = value.trim();
            await self.plugin.saveSettings();
          });
        });
      }
    });

    // ====== INBOX 收集 ======
    settingsRoot.createEl("h3", { text: "INBOX 收集" });
    new import_obsidian.Setting(settingsRoot).setName("新建收集模板").setDesc("新建收集文件时使用的模板文件路径（如 Templates/收集模板.md），留空则创建空白文件").addText((text) => text.setPlaceholder("Templates/收集模板.md").setValue(this.plugin.settings.collectionTemplate).onChange(async (value) => {
      this.plugin.settings.collectionTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("收集箱").setDesc("新建收集文件存放的文件夹路径").addText((text) => text.setPlaceholder("010-信箱 INBOX/020-收集").setValue(this.plugin.settings.inboxFolder).onChange(async (value) => {
      this.plugin.settings.inboxFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("快速学习").setDesc("快速学习文件存放的文件夹路径").addText((text) => text.setPlaceholder("010-信箱 INBOX/011-快速学习").setValue(this.plugin.settings.quickLearnFolder).onChange(async (value) => {
      this.plugin.settings.quickLearnFolder = value.trim();
      await this.plugin.saveSettings();
    }));

    // ====== TODO 待办 ======
    settingsRoot.createEl("h3", { text: "TODO 待办" });
    new import_obsidian.Setting(settingsRoot).setName("今日待办").setDesc("今日待办文件存放的文件夹路径").addText((text) => text.setPlaceholder("010-信箱 INBOX/031-今日待办").setValue(this.plugin.settings.todoFolder).onChange(async (value) => {
      this.plugin.settings.todoFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("活动清单").setDesc("活动清单文件存放的文件夹路径").addText((text) => text.setPlaceholder("010-信箱 INBOX/030-活动清单").setValue(this.plugin.settings.activityFolder).onChange(async (value) => {
      this.plugin.settings.activityFolder = value.trim();
      await this.plugin.saveSettings();
    }));

    // ====== PROJECT 项目 ======
    settingsRoot.createEl("h3", { text: "PROJECT 项目" });
    new import_obsidian.Setting(settingsRoot).setName("新建任务存放").setDesc("新建任务文件默认存放的文件夹路径").addText((text) => text.setPlaceholder("100-工作台WORKDESK/120-项目管理/121-未开始").setValue(this.plugin.settings.taskFolder).onChange(async (value) => {
      this.plugin.settings.taskFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("项目任务模板").setDesc("PROJECT板块新建任务时使用的模板文件路径，留空则创建空白文件").addText((text) => text.setPlaceholder("Templates/任务模板.md").setValue(this.plugin.settings.projectTaskTemplate).onChange(async (value) => {
      this.plugin.settings.projectTaskTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("项目管理基础路径").setDesc("项目管理看板读取的父文件夹路径").addText((text) => text.setPlaceholder("100-工作台WORKDESK/120-项目管理").setValue(this.plugin.settings.projectBase).onChange(async (value) => {
      this.plugin.settings.projectBase = value.trim();
      await this.plugin.saveSettings();
    }));


    // ====== NOTE 阅读笔记 ======
    settingsRoot.createEl("h3", { text: "NOTE 阅读笔记" });
    new import_obsidian.Setting(settingsRoot).setName("新建阅读模板").setDesc("新建阅读记录时使用的模板文件路径（自动添加 status: 在读），留空则创建空白文件").addText((text) => text.setPlaceholder("Templates/阅读模板.md").setValue(this.plugin.settings.readingTemplate).onChange(async (value) => {
      this.plugin.settings.readingTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("新建笔记路径").setDesc("新建笔记文件时保存的文件夹路径").addText((text) => text.setPlaceholder("010-信箱 INBOX/040-笔记").setValue(this.plugin.settings.notePath).onChange(async (value) => {
      this.plugin.settings.notePath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("新建笔记模板").setDesc("新建笔记时使用的模板文件路径，留空则创建空白文件").addText((text) => text.setPlaceholder("Templates/笔记模板.md").setValue(this.plugin.settings.noteTemplate).onChange(async (value) => {
      this.plugin.settings.noteTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("书籍文件夹").setDesc("阅读笔记-书籍存放的文件夹路径").addText((text) => text.setPlaceholder("400-资源RESOURCE/420-览阅/421-书籍").setValue(this.plugin.settings.bookFolder).onChange(async (value) => {
      this.plugin.settings.bookFolder = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("论文文件夹").setDesc("阅读笔记-论文存放的文件夹路径").addText((text) => text.setPlaceholder("400-资源RESOURCE/420-览阅/422-论文").setValue(this.plugin.settings.paperFolder).onChange(async (value) => {
      this.plugin.settings.paperFolder = value.trim();
      await this.plugin.saveSettings();
    }));

    // ====== REVIEW 复盘 ======
    settingsRoot.createEl("h3", { text: "REVIEW 复盘" });
    new import_obsidian.Setting(settingsRoot).setName("日报文件夹").setDesc("日报文件所在文件夹路径").addText((text) => text.setPlaceholder("600-复盘总结/601-报告总结/602-日报").setValue(this.plugin.settings.reviewDailyPath).onChange(async (value) => {
      this.plugin.settings.reviewDailyPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("日报模板").setDesc("新建日报时使用的模板文件路径，留空则创建空白文件").addText((text) => text.setPlaceholder("Templates/日报模板.md").setValue(this.plugin.settings.reviewDailyTemplate).onChange(async (value) => {
      this.plugin.settings.reviewDailyTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("周报文件夹").setDesc("周报文件所在文件夹路径").addText((text) => text.setPlaceholder("600-复盘总结/601-报告总结/603-周报").setValue(this.plugin.settings.reviewWeeklyPath).onChange(async (value) => {
      this.plugin.settings.reviewWeeklyPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("周报模板").setDesc("新建周报时使用的模板文件路径，留空则创建空白文件").addText((text) => text.setPlaceholder("Templates/周报模板.md").setValue(this.plugin.settings.reviewWeeklyTemplate).onChange(async (value) => {
      this.plugin.settings.reviewWeeklyTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("月报文件夹").setDesc("月报文件所在文件夹路径").addText((text) => text.setPlaceholder("600-复盘总结/601-报告总结/604-月报").setValue(this.plugin.settings.reviewMonthlyPath).onChange(async (value) => {
      this.plugin.settings.reviewMonthlyPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("月报模板").setDesc("新建月报时使用的模板文件路径，留空则创建空白文件").addText((text) => text.setPlaceholder("Templates/月报模板.md").setValue(this.plugin.settings.reviewMonthlyTemplate).onChange(async (value) => {
      this.plugin.settings.reviewMonthlyTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("项目总结文件夹").setDesc("项目总结文件所在文件夹路径").addText((text) => text.setPlaceholder("600-复盘总结/610-项目总结").setValue(this.plugin.settings.reviewProjectPath).onChange(async (value) => {
      this.plugin.settings.reviewProjectPath = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("项目总结模板").setDesc("新建项目总结时使用的模板文件路径，留空则创建空白文件").addText((text) => text.setPlaceholder("Templates/项目总结模板.md").setValue(this.plugin.settings.reviewProjectTemplate).onChange(async (value) => {
      this.plugin.settings.reviewProjectTemplate = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("整理-资源根目录").setDesc("整理杂项中显示的文件夹根目录路径").addText((text) => text.setPlaceholder("400-资源RESOURCE").setValue(this.plugin.settings.resourceRoot).onChange(async (value) => {
      this.plugin.settings.resourceRoot = value.trim();
      await this.plugin.saveSettings();
    }));

    settingsRoot.createEl('h3', { text: '服务连接' });
    new import_obsidian.Setting(settingsRoot).setName("Ollama 地址").setDesc("本地 Ollama 服务地址，用于连通性检测").addText((text) => text.setPlaceholder("http://localhost:11434").setValue(this.plugin.settings.ollamaUrl).onChange(async (value) => {
      this.plugin.settings.ollamaUrl = value.trim();
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(settingsRoot).setName("Ragflow 地址").setDesc("Ragflow 服务地址，用于连通性检测").addText((text) => text.setPlaceholder("http://localhost:9380").setValue(this.plugin.settings.ragflowUrl).onChange(async (value) => {
      this.plugin.settings.ragflowUrl = value.trim();
      await this.plugin.saveSettings();
    }));
  }
};
