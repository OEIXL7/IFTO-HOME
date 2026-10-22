# IFTO-HOME

[![Release](https://img.shields.io/github/v/release/OEIXL7/IFTO-HOME?label=release&color=blue)](https://github.com/OEIXL7/IFTO-HOME/releases)
[![Stars](https://img.shields.io/github/stars/OEIXL7/IFTO-HOME?color=yellow)](https://github.com/OEIXL7/IFTO-HOME/stargazers)
[![Obsidian](https://img.shields.io/badge/Obsidian-plugin-7C3AED)](https://obsidian.md)

> INFOTOOLS 插件首页 —— 快捷通道、收集、待办、项目、阅读笔记、复盘一体化。

本仓库除 **IFTO-HOME 插件本体** 外，还包含一套 **适配该插件的 Obsidian 文件夹结构**，可以整体放入你的 vault 使用。

## 安装插件

### 方式一：BRAT（推荐，支持自动更新）

1. 安装并启用 [BRAT](https://github.com/TfTHacker/obsidian42-brat)
2. 在 BRAT 中选择 **Add Beta plugin**，填入 `OEIXL7/IFTO-HOME`
3. 选择要安装的版本

### 方式二：手动安装

前往 [Releases](https://github.com/OEIXL7/IFTO-HOME/releases) 下载最新版：

1. 下载 `IFTO-HOME-<版本>.zip` 解压（或分别下载 `main.js`、`manifest.json`、`styles.css`）
2. 放入 `<你的vault>/.obsidian/plugins/IFTO-HOME/`
3. 重启 Obsidian，在 **设置 → 第三方插件** 中启用 IFTO-HOME

## 手机端（1.2.0）

- 七个独立页面，点击顶部导航或从内容中间区域左右滑动切换；左右边缘留给 Obsidian 侧栏手势。
- INBOX 不再显示“整理杂项”标签；收集卡片 `⋯` 菜单可移动到资源文件目录、项目管理目录、快速学习、今日待办或活动清单。
- TODO 今日待办与活动清单、PROJECT 各状态列固定显示高度并在内部滚动；项目卡片菜单可归档，创建入口改为细线文字按钮。
- 底部快捷入口字号增大；右侧竖排标识放大并贴齐边缘。AREA、NOTE、REVIEW 卡片也限制在各自区域内。
- 手机布局由平台身份启用，Windows / macOS 的宽屏与窄窗口保留现有表现。
- 顶部导航为系统状态栏留出空间，底部快捷入口避开 Obsidian 工具栏。
- BRAT 已安装用户检查更新至 **1.2.0** 即可；若固定在旧版本，请在 BRAT 中切换到最新版本。更新后重新打开插件首页。
- [执行计划](.obsidian/plugins/IFTO-HOME/MOBILE-PLAN.md) · [操作与构建说明](.obsidian/plugins/IFTO-HOME/MOBILE-README.md)

## 使用配套文件夹结构

把下列目录整体复制到你的 vault 根目录即可：

```
000-信箱INBOX       收集箱 / 活动清单 / 今日待办
100-工作台WORKDESK    当前工作台
200-工作库WORKFILE    进行中的工作
300-领域AREA         长期关注领域
400-资源RESOURCE     主题资源
500-归档资料         归档
600-复盘总结         复盘
900-数据库
 ├─ 910-模板Templates  笔记模板
 ├─ 920-Rule&Skill     规则与技能
 └─ 930-图片资源        图片资源
```

## 插件源码

插件源码位于 `.obsidian/plugins/IFTO-HOME/`：

| 文件 | 说明 |
| --- | --- |
| `main.ts` | 源码（TypeScript） |
| `main.js` | 编译产出（Obsidian 实际加载） |
| `home.js` / `home.html` | 首页视图 |
| `styles.css` | 样式 |
| `manifest.json` | 插件清单 |

## 更新日志

版本变更记录见 [CHANGELOG.md](./CHANGELOG.md)。
