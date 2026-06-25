---
title: "060-claude-obsidian-Skill"
description:claude-obsidian plugin · 命名空间 claude-obsidian: · 15 个 skill 入口（含兼容性提醒）
type: Skill
tags:
  - Skill
  - claude-obsidian
  - Plugin
related_to:
  - "[[000-Rule总览]]"
  - "[[050-Context-Engineering-Skill]]"
  - "[[070-kepano-obsidian-skills]]"
---

# 060 · claude-obsidian Skill 入口

> 来源 plugin：**claude-obsidian**
> 命名空间前缀：`claude-obsidian:`
> 已加载 skill 数：**15 个**（vault 现有 [[_INDEX-900-数据库#五、990-BASE 视图清单]] 配套使用）

## 一、Skill 分类（15 个）

### 1. wiki 主入口（5 个）

| Skill | 作用 | 何时调用 |
|-------|------|----------|
| `claude-obsidian:wiki` | 引导建 / 检 vault | 第一次建 vault / 检查 vault 状态 |
| `claude-obsidian:wiki-mode` | 设置 vault 模式（LYT/PARA/Zettelkasten/Generic） | 决定 vault 组织方法论 |
| `claude-obsidian:wiki-lint` | 健康检查（orphan/dead link/frontmatter gap） | 每 10-15 次 ingest 后 / 每周一次 |
| `claude-obsidian:wiki-ingest` | 摄取源（URL/文件）到 vault | 抓网页 / 写论文 / 加新概念 |
| `claude-obsidian:wiki-cli` | Obsidian CLI 封装（claude-obsidian v1.7+ 默认 transport）；**官方 SKILL.md 原话：优先用 kepano/obsidian-skills 的 `obsidian-cli`** | kepano 没装时才用 |

### 2. 知识检索（3 个）

| Skill | 作用 | 何时调用 |
|-------|------|----------|
| `claude-obsidian:wiki-fold` | log 折叠成 meta-page | 长期积累的 log 太多需要合并 |
| `claude-obsidian:wiki-query` | 用 wiki 回答问题 | 查 vault 知识 / 引用笔记 |
| `claude-obsidian:wiki-retrieve` | 混合检索（BM25 + cosine rerank） | 需要高精度召回 vault 内容 |

### 3. 自动化（3 个）

| Skill | 作用 | 何时调用 |
|-------|------|----------|
| `claude-obsidian:autoresearch` | 自主研究循环 | 给定一个研究主题，自动跑搜索+摄取 |
| `claude-obsidian:save` | 保存对话/洞察到 vault | 当前对话有值得留存的洞察 |
| `claude-obsidian:defuddle` | 抓网页后清理 | 抓 URL 内容，去除广告/导航/页脚 |

### 4. 格式与可视化（3 个）

| Skill | 作用 | 何时调用 |
|-------|------|----------|
| `claude-obsidian:obsidian-markdown` | Obsidian Flavored Markdown 规范 | 写 wikilink / callout / canvas / 双链 |
| `claude-obsidian:obsidian-bases` | `.base` 文件读写 | 改 base 视图 / 新建 base |
| `claude-obsidian:canvas` | canvas 可视化层 | 改 / 新建 canvas 文件 |

### 5. 方法论（1 个）

| Skill | 作用 | 何时调用 |
|-------|------|----------|
| `claude-obsidian:think` | 10 原则思维循环 | 解决非平凡问题 / 需要第一性原理分析 |

## 二、触发场景对照

| 我在 vault 做什么                    | 推荐 skill                               |
| ------------------------------- | -------------------------------------- |
| 跑我现在的"整理 060-碎片灵感"任务            | `wiki-lint`（先看健康） → `wiki-ingest`（再处理） |
| 用户给一个 URL 让抓内容                  | `defuddle`（清理） → `wiki-ingest`（入库）     |
| 跑 `ObsidianFlavoredMarkdown` 检查 | `obsidian-markdown`                    |
| 改 `990-BASE/xxx.base` 文件        | `obsidian-bases`                       |
| 改 `000-索引INDEX/xxx.canvas`      | `canvas`                               |
| 用户问"我 vault 里有什么 X 相关"          | `wiki-query` → `wiki-retrieve`         |
| 当前对话的洞察值得保存                     | `save`                                 |
| log.md 太长                       | `wiki-fold`                            |
| 用户给一个研究主题                       | `autoresearch`                         |
| 解决复杂决策                          | `think`                                |

## 三、重要的兼容性提醒

> ⚠️ claude-obsidian skill 假设 vault 是它自己的 `wiki/` 目录结构（`wiki/sources/` `wiki/entities/` `wiki/concepts/` `wiki/mocs/` 等），**与本 vault 的 8 大数字编号文件夹（000/010/100/200/300/400/500/600/900）不兼容**。

> 💡 **本 vault 的解决方案**：见 [[800-Wiki流水线/801-规则]]。把 wiki/ 流水线隔离在 `800-Wiki流水线/` 下，用 Mode A 单向桥 SOP 与 vault 主体协同，不让 skill 直接污染 vault 主体。

### 直接跑会怎样

- `wiki-lint` 会**找不到** `wiki/` 目录，输出 0 issues（false negative）
- `wiki-ingest` 会**新建** `wiki/` 目录并按它的模式归档（污染 vault）
- `wiki-mode` 会创建 `.vault-meta/mode.json`（**有副作用**）
- `autoresearch` 会**新建**它自己的 `wiki/sources/` `wiki/concepts/`（污染 vault）

### 怎么办

| 场景 | 决策 |
|------|------|
| 跑 `wiki-lint` / `wiki-query` / `wiki-retrieve` / `think` | ✅ **安全**：只读或独立，不污染 vault |
| 跑 `defuddle` 抓网页 | ✅ **安全**：只输出清理后的 markdown，不入库 |
| 跑 `obsidian-markdown` / `obsidian-bases` / `canvas` / `save` | ⚠️ **局部**：只写它负责的格式文件，不动 vault 整体 |
| 跑 `wiki-mode` | ⚠️ **谨慎**：会创建 `.vault-meta/mode.json` |
| 跑 `wiki-ingest` / `wiki-fold` / `autoresearch` | ❌ **不建议**：会强加 `wiki/` 目录结构 |
| 跑 `wiki` 入口 | ⚠️ **看情况**：vault 已有结构会跳过 setup |

## 四、本 Plugin 与其他 Plugin 的边界

| 操作 | 是否调用本 Plugin |
|------|----------------|
| agent 在 vault 里**移动/修改文件** | ❌ 不调本层（走 [[070-kepano-obsidian-skills]]） |
| agent **抓 URL 内容**入库 | ✅ `defuddle` |
| agent **vault 健康检查** | ✅ `wiki-lint`（每 10-15 次 ingest 后跑一次） |
| agent **改 .base 视图** | ✅ `obsidian-bases` |
| agent **改 .canvas 文件** | ✅ `canvas` |
| 用户给研究主题 → 自主研究 | ✅ `autoresearch`（但需注意兼容性） |
| agent **拆多 agent 任务 / 压缩长会话** | ❌ 不调本层（走 [[050-Context-Engineering-Skill]]） |

## 五、调用方式

```
# 在 Claude Code 中：
> /wiki
> /wiki-lint
> /wiki-ingest

# 或在 Skill 工具中：
skill: "claude-obsidian:wiki"
skill: "claude-obsidian:wiki-lint"
```

## 六、维护

- claude-obsidian plugin 版本更新 → 更新本文件
- 触发场景对照表是经验积累，每月一次在 [[600-复盘总结/610-项目总结]] 复盘
- vault 结构若改为 `wiki/` 兼容结构 → 重写本文件第三部分
- 与 [[050-Context-Engineering-Skill]] / [[070-kepano-obsidian-skills]] 的边界若变化 → 同步更新本文件第四节