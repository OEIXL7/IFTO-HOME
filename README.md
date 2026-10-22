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

## 手机端（1.2.12）

- 七个独立页面，点击顶部导航或从内容中间区域左右滑动切换；左右边缘留给 Obsidian 侧栏手势。点击固定在右下角的放大 IFTO 标识，可从标识旁自然展开宽 150px 的紧凑矩形面板，四个快捷按钮依次出现，并提供“返回首页”入口。
- INBOX 不再显示“整理杂项”标签；收集卡片 `⋯` 菜单可移动到资源文件目录、项目管理目录、快速学习、今日待办或活动清单。
- TODO 今日待办与活动清单、PROJECT 各状态列固定显示高度并在内部滚动；项目卡片菜单可归档，创建入口改为细线文字按钮。
- 右侧竖排标识放大并贴齐 Obsidian 最外层面板边缘，且不会随页面滚动。AREA、NOTE、REVIEW 卡片也限制在各自区域内。
- 手机布局由平台身份启用，Windows / macOS 的宽屏与窄窗口保留现有表现。
- 顶部导航字号增至 18px，点击或在导航栏横向滑动均可切换页面；快捷面板按需展开，避开 Obsidian 工具栏。
- 所有页面标题统一位置与中英文基线，小标题统一为 16px 下划线标签；收集和快速学习卡片显示 tag。今日待办限制三行并内部滚动，PROJECT 状态列表改由整页滚动，分页箭头及新建按钮间距统一。
- 固定 IFTO 标识放大并贴边；每页底部显示 IFTO × IFUS 水印。
- 按最新真机反馈，IFTO 图案扩大到与触控区域同尺寸；水印缩小并固定在视图最底部，快捷面板只显示居中文字的四个按钮。
- 收集、复盘、阅读、AREA 卡片改为固定显示区内滚动，项目页由整页滚动。
- 最新修正：HOME 与其他页面的英文背景标题统一字号；右下角 IFTO 标识贴齐最外层面板边缘；快捷面板增加“返回首页”。未配置封面时随机显示四张内置图片。
- BRAT 已安装用户检查更新至 **1.2.12** 即可；若固定在旧版本，请在 BRAT 中切换到最新版本。未设置封面图片路径时，首页会随机显示插件内置的四张图片。更新后重新打开插件首页。
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

