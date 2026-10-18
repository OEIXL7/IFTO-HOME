# IFTO-HOME

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