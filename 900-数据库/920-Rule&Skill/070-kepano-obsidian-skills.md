---
title: "070-kepano-obsidian-skills"
description:kepano/obsidian-skills plugin · 命名空间 obsidian: · 5 个 skill 入口（CLI / Markdown / Bases / defuddle / json-canvas）
type: Skill
tags:
  - Skill
  - kepano
  - obsidian-skills
  - Plugin
related_to:
  - "[[000-Rule总览]]"
  - "[[050-Context-Engineering-Skill]]"
  - "[[060-claude-obsidian-Skill]]"
  - "[[010-Frontmatter规则]]"
---

# 070 · kepano/obsidian-skills 入口

> 来源 plugin：**kepano/obsidian-skills**
> 命名空间前缀：`obsidian:`
> 已加载 skill 数：**5 个**（通过系统 reminder 验证）

## 一、Skill 清单（5 个，已验证加载）

| Skill | 一句话定位 | 典型动作 |
|-------|----------|---------|
| `obsidian:obsidian-cli` | 行动层——"做" | 通过 Obsidian CLI 读写文件、查 backlinks |
| `obsidian:obsidian-markdown` | 内容层——"写" | wikilink `[[Note]]`、callout、embed、frontmatter |
| `obsidian:obsidian-bases` | 数据层——"看" | 写 `.base` 文件（filter / formula / view） |
| `obsidian:defuddle` | 抓取层——"取" | 用 Defuddle CLI 抓 URL 内容并清理 |
| `obsidian:json-canvas` | 可视化层——"画" | 读写 `.canvas` 文件（nodes / edges / groups） |

> ⚠️ 注意：`claude-obsidian:` 命名空间下也有 `obsidian-markdown` / `obsidian-bases` / `defuddle` 3 个**真同名** skill（功能相同），调用时**注意前缀**。本文件只覆盖 `obsidian:` 命名空间下的版本。

## 二、命名空间重叠与集成关系

> `claude-obsidian:` 和 `obsidian:` 命名空间下有 3 个**真同名** skill（`obsidian-markdown` / `obsidian-bases` / `defuddle`），另外还有 2 对**功能不同 / 集成关系**的对照（`obsidian-cli` vs `wiki-cli`、`json-canvas` vs `canvas`）。**到底用哪个 prefix 需要明确**。

| 场景 | 推荐 prefix | 理由 |
|------|------------|------|
| agent 在 vault 里**写/改文件**（CLI 操作） | `obsidian:` | kepano 是 Obsidian 团队核心开发者维护的 plugin，对 obsidian-cli 调用更直接 |
| agent **改 .base 视图** | `obsidian:` | 同上 |
| agent **抓 URL 内容**入库 | `obsidian:defuddle` 或 `claude-obsidian:defuddle` | 功能等价，看是否后续还要 ingest |
| agent **改 .canvas 文件** | `obsidian:json-canvas` 或 `claude-obsidian:canvas` | 前者管 JSON 格式，后者管 Obsidian canvas 插件 |
| agent **vault 健康检查** | `claude-obsidian:wiki-lint` | kepano 没有 lint 等价 skill |

> 实际上大多数 vault 操作**两个 prefix 都能用**。如果不确定，优先 `obsidian:`（本文件覆盖），遇到 vault 整体性操作（lint / ingest / autoresearch）再用 `claude-obsidian:`。

## 三、obsidian-cli 真实命令清单（按官方 SKILL.md）

> 📖 来源：[kepano/obsidian-skills 官方 SKILL.md](https://github.com/kepano/obsidian-skills/blob/main/skills/obsidian-cli/SKILL.md)
>
> ⚠️ **关键认知**：obsidian-cli skill **不规定 AI 能用哪些命令、不能调哪些命令**——它只是"教 AI 怎么用 Obsidian CLI"的教学文档。AI 能不能调 `delete`，不取决于这个 skill，**取决于你自己 vault 里的规则文件（CLAUDE.md / 规则表）怎么写**。
>
> 完整命令列表以 Obsidian 官方 CLI 为准：`obsidian help`（官方建议总是跑这个看最新版）。官方文档：https://help.obsidian.md/cli

### 1. 官方 Common patterns 段给出的命令（vault 常用）

| 命令 | 作用 | 典型用途 |
|------|------------|---------|
| `read file=<name>` | 读文件 | 取笔记内容做摘要 |
| `create name=<n> content=<c>` | 新建文件（支持 `template` / `silent` / `overwrite` flag） | 起草草稿 / 新建收集 |
| `append file=<n> content=<c>` | 追加内容到现有文件末尾 | 在笔记末尾补归档备注 |
| `search query=<q>` | 全文搜索 | 找本周攒下来的所有笔记 |
| `daily:read` / `daily:append` | 读 / 追加 Daily Note | 处理当日笔记 |
| `property:set name=<n> value=<v> file=<f>` | 改 frontmatter 字段 | 改 status / tags |
| `tasks` | 任务管理 | 拉取任务清单 |
| `tags` | 标签管理 | 看 / 改标签 |
| `backlinks file=<n>` | 查反向链接 | 检查 related_to 一致性 |

### 2. 官方给出的 plugin/theme 开发用命令（dev:*）

| 命令 | 作用 |
|------|------|
| `plugin:reload id=<n>` | 重载插件（开发循环用） |
| `dev:errors` | 抓 Obsidian 错误 |
| `dev:screenshot path=<p>` | 截图 |
| `dev:dom selector=<s>` | 检视 DOM |
| `dev:console level=<l>` | 看 console 输出 |
| `eval code=<js>` | 在 Obsidian 上下文跑 JS |
| `dev:css selector=<s> prop=<p>` | 检视 CSS 值 |
| `dev:mobile on/off` | 切换移动端模拟 |

> ⚠️ **AI 也能调这些 dev:* 命令**——理论上能跑任意 JS、reload 任意插件、截图。挡不挡住，靠 vault 自己的规则文件，不靠 skill。

### 3. vault 怎么"约束" AI 能调什么

obsidian-cli skill 不挡 AI——真正挡 AI 的是**你自己 vault 里的规则文件**（[[010-Frontmatter规则]] / [[020-Tag规则]] / [[CLAUDE.md]] 之类的）。常见写法：

- 在 CLAUDE.md 里写"禁止直接 delete，统一走 move 归档"
- 在 frontmatter 规范里规定 create 必须填哪些字段
- 用 prompt 让 AI 在跑 `obsidian help` 前先报告准备调的命令清单，等你确认

> 💡 这层"允许/禁止 AI 调什么"的规则是**你自己定的**，不是 plugin 默认行为。不同 vault 的规则可以完全不同——没有"标准答案"。

## 四、frontmatter 字段约束（与 010 / 020 联动）

> 调用 `create` / `append` / `property:set` 时，**按 vault 自己的 frontmatter 规范**会涉及以下字段。详见 [[010-Frontmatter规则]] 和 [[020-Tag规则]]。

| 字段 | 涉及场景 | 来源 |
|------|---------|------|
| `created` | `append` 后保留原值；`create` 时填当前时间 | [[010-Frontmatter规则]] |
| `status` | 笔记迁移后必须重新评估（迁移 = 状态变化） | [[010-Frontmatter规则#三、目录默认 status 速查]] |
| `related_to` | 任何操作后必须保留关联 | [[030-关联引用规则]] |
| `tags` | `create` 后必须 ≥ 1 个分类层 tag | [[020-Tag规则]] |

> 上述字段约束**由 [[010-Frontmatter规则]] / [[020-Tag规则]] / [[030-关联引用规则]] 定义**，obsidian-cli 只是执行者，不是定义者。

## 五、本 Plugin 与其他 Plugin 的边界

| 操作 | 是否调用本 Plugin |
|------|----------------|
| agent 在 vault 里**新建/移动/读文件** | ✅ 入口之一（看上面"命名空间重叠"选择） |
| agent **改 frontmatter 字段** | ✅ `property:set` |
| agent **查反向链接** | ✅ `backlinks` |
| agent **写 wikilink / callout / embed** | ✅ `obsidian-markdown` |
| agent **改 .base 视图** | ✅ `obsidian-bases` |
| agent **改 .canvas 文件** | ✅ `json-canvas` |
| agent **抓 URL 内容清理** | ✅ `defuddle` |
| agent **vault 健康检查** | ❌ 不调本层（走 [[060-claude-obsidian-Skill]] `wiki-lint`） |
| agent **拆多 agent 任务 / 压缩长会话** | ❌ 不调本层（走 [[050-Context-Engineering-Skill]]） |

## 六、调用方式

```
# 在 Claude Code 中：
> /obsidian-cli
> /obsidian-markdown
> /obsidian-bases
> /defuddle
> /json-canvas

# 或在 Skill 工具中：
skill: "obsidian:obsidian-cli"
skill: "obsidian:obsidian-markdown"
skill: "obsidian:obsidian-bases"
skill: "obsidian:defuddle"
skill: "obsidian:json-canvas"
```

## 七、维护

- Plugin 新增 skill → 更新本文件第一节
- 命名空间重叠的偏好规则变化 → 更新本文件第二节
- kepano/obsidian-skills 上游更新命令清单（看 [GitHub SKILL.md](https://github.com/kepano/obsidian-skills/blob/main/skills/obsidian-cli/SKILL.md) diff）→ 同步更新本文件第三节
- 与 [[050-Context-Engineering-Skill]] / [[060-claude-obsidian-Skill]] 的边界若变化 → 同步更新本文件第五节