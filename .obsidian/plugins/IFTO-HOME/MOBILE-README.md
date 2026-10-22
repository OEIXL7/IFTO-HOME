# 手机端改造说明

本目录的 `main.js` 已构建完成。手机端由 Obsidian 的 `Platform.isPhone` 识别，桌面窄窗口和现有平板分支不会启用新布局。

## 查看效果

1. 将更新后的插件文件同步到手机。部署仍使用 `main.js`、`manifest.json`、`styles.css`；手机样式和脚本已经内嵌到 `main.js`，无需额外加载移动资源文件。
2. 在手机 Obsidian 中关闭再启用 IFTO-HOME，然后重新打开首页。
3. 点击顶部栏目，或从页面中央区域左右滑动切换七页。两侧保留给 Obsidian 打开侧栏；短距离手势不会切页。
4. 点击固定在右侧的 IFTO 标识展开快捷通道，四个创建按钮纵向排列；再点标识、点击面板外、按 Escape 或切换页面可收起面板。按钮沿用当前路径和模板设置，待办按钮仍新建到活动清单。
5. 收集卡片上的 `⋯` 可直接移动文件到资源文件目录、项目管理目录、快速学习、今日待办或活动清单。手机端不显示拖拽整理标签。
6. 待办、活动清单和项目状态列各自固定高度，超出时在列表内部滚动。卡片上的 `⋯` 打开触屏操作菜单。

执行计划和完成记录见 `MOBILE-PLAN.md`。原始代码快照位于 `backups/mobile-20261022/`；用户设置 `data.json` 和库内笔记未修改。

## 后续修改与构建

- `home.html`、`home.js`：现有结构与业务逻辑。
- `mobile.css`：仅手机生效的排版。
- `mobile.js`：手机页面切换、手势、菜单和阅读分页。
- `main.ts`：Obsidian 宿主桥接和平台身份。

首次安装构建依赖后运行：

```powershell
npm install
npm run build
npm run check
```

构建脚本会将最新 HTML、手机 CSS、业务 JS 和手机 JS 同步到内嵌资源，再编译 `main.js`。仅修改外部页面文件不会改变已加载的运行版，需要重新构建并重载插件。

已有本地 esbuild 时，可通过 `IFTO_ESBUILD_MODULE` 指向其包目录来构建。本轮使用了本机已有的 esbuild 0.28.1，没有额外下载依赖。

## 浏览器验证

```powershell
node scripts/preview-server.mjs
```

预览：`http://127.0.0.1:8765/?phone=1`；加 `&theme=dark` 查看深色模式。无 `phone` 参数时使用桌面分支；`?baseline=1` 使用改造前备份。

服务只监听本机回环地址，仅提供页面和内存模拟数据，不读取真实笔记或 `data.json`。桌面基线优先使用本地备份；新克隆的仓库通过 Git 的 `1.1.6` 标签读取基线，浅克隆需要先运行 `git fetch origin tag 1.1.6`。使用 Playwright CLI 打开支持触摸的 Chromium/Edge 会话后运行：

```powershell
playwright-cli run-code --filename scripts/verify-mobile.js --raw
```

手机布局与快捷面板通过 **128 项浏览器检查**，无未捕获浏览器错误；结果保存在 `output/playwright/verification.json`，七页预览图及快捷面板预览为同目录的 `mobile-*.png`。

构建校验还检查了运行文件中的内嵌资源一致性、插件模块加载、关闭时清理入口，以及手机不继承桌面缩放值。

浏览器模拟覆盖布局和交互逻辑；原生工具栏、实际输入法与系统边缘手势仍需手机实测。
