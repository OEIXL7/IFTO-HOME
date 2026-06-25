---
title: "000-Rule总览"
description: vault 规则与 skill 总览入口，含 Harness 三 Plugin 概念框架
type: 规则
tags:
  - 规则
  - INDEX
  - Skill
  - Harness
related_to:
  - "[[010-Frontmatter规则]]"
  - "[[020-Tag规则]]"
  - "[[030-关联引用规则]]"
  - "[[040-文件夹专属规则]]"
  - "[[050-Context-Engineering-Skill]]"
  - "[[060-claude-obsidian-Skill]]"
  - "[[070-kepano-obsidian-skills]]"
---

# 000 · Rule & Skill 总览

> 本目录是 vault 的**规则与 skill 层**。结构化属性、标签、引用、文件夹专属行为、Harness 三 Plugin 矩阵的入口都在这里。

## 一、Harness 三 Plugin 概念框架

> 💡 这是组织性的概念框架，不一定 1:1 对应每个 plugin 的实际职责。具体每个 plugin 做什么，详见各自的入口文件。

| 概念层级 | Claude Plugin | 入口 | 实际做什么（详见各文件） |
|---------|--------------|------|------------------------|
| **方法论层**（教 agent 怎么想） | Agent-Skills-for-Context-Engineering | [[050-Context-Engineering-Skill]] | 长会话压缩、跨 agent 记忆、KV 缓存、多 agent 决策 |
| **操作层**（教 agent 怎么动） | kepano/obsidian-skills | [[070-kepano-obsidian-skills]] | obsidian-cli / Markdown / Bases / defuddle / json-canvas |
| **引擎层**（让 vault 怎么自组织） | claude-obsidian | [[060-claude-obsidian-Skill]] | wiki / ingest / lint / autoresearch / canvas / save / think |

> ⚠️ **说明**：方法论 / 操作 / 引擎三层划分是组织思路，**实际 plugin 边界以各自 SKILL.md 为准**。不要因为有这个框架就假设某 plugin 一定不做别的事。

## 二、Harness 三 Plugin 的真实边界（按官方 SKILL.md）

> ⚠️ **关键认知**：三个 Plugin **不挡 AI**——它们是"教 AI 怎么用工具"的教学文档，不是权限系统。AI 能不能调某个命令、不准做某件事，**取决于你自己 vault 里的规则文件（CLAUDE.md / frontmatter 规范 / prompt）怎么写**。
>
> 下表是 plugin 真实能力的边界，**不是** AI 被约束的来源。

| 层级 | 真实职责（按 plugin 官方 SKILL.md） | 它**不**做的事 |
|------|----------------------------------|----------------|
| **方法论层**（[[050-Context-Engineering-Skill]]） | 4 个 skill：长会话压缩 / KV 缓存传递 / 跨 agent 持久化记忆 / 多 agent 协作设计 | 不挡 AI 调具体命令 |
| **操作层**（[[070-kepano-obsidian-skills]]） | 5 个 skill：教 AI 怎么用 Obsidian CLI / 写 markdown / 写 .base / 抓 URL / 写 .canvas | 不挡 AI 调 delete 等危险命令（Obsidian CLI 本身有这些命令） |
| **引擎层**（[[060-claude-obsidian-Skill]]） | 15 个 skill：wiki 体系 / 批量入库 / 自主研究 / 体检 / 思维循环 | wiki-lint **不会自动跑**——需要你手动触发 |

> 真正的"防护"在你自己 vault 写的规则文件里（[[010-Frontmatter规则]] / [[020-Tag规则]] / CLAUDE.md）。三个 Plugin 只负责"教 AI 用工具"，不负责"管 AI 不许做某事"。

## 三、规则文件（4 个）

| 编号  | 文件                    | 作用                                 | 何时查阅        |
| --- | --------------------- | ---------------------------------- | ----------- |
| 010 | [[010-Frontmatter规则]] | 统一 frontmatter 字段、目录默认 status、排除目录 | 新建 / 整理笔记   |
| 020 | [[020-Tag规则]]         | 双层 tag 体系、命名、组合使用                  | 写 / 改 tag   |
| 030 | [[030-关联引用规则]]        | wikilink、`related_to`、Base 引用      | 写正文引用       |
| 040 | [[040-文件夹专属规则]]       | 各主文件夹的状态默认值与专属字段                   | 决定笔记属于哪个文件夹 |

## 四、Skill 文件（3 个，每个 Plugin 一份）

| 编号  | 来源 Plugin                            | 命名空间前缀                 | 何时查阅                                                           |
| --- | ------------------------------------ | ---------------------- | -------------------------------------------------------------- |
| 050 | Agent-Skills-for-Context-Engineering | `context-engineering:` | 长会话压缩 / 跨 agent 记忆 / KV 缓存 / 多 agent 设计                        |
| 060 | claude-obsidian                      | `claude-obsidian:`     | 涉及 wiki / Base / 自动化时                                          |
| 070 | kepano/obsidian-skills               | `obsidian:`            | 任何 obsidian-cli / Markdown / Bases / defuddle / json-canvas 操作 |

## 五、执行优先级

1. **040 > 010**：文件夹专属字段优先于通用字段
2. **050 / 060 / 070 是行为入口**，不是字段定义
3. **新规则先在 `100-工作台WORKDESK/110-草稿箱/` 起草**，成熟后迁入本目录

## 六、维护约定

- 任何规则改动必须同步更新本总览
- 规则变更要在 [[600-复盘总结/610-项目总结]] 留变更记录
- 规则文件之间用 wikilink 串联，禁止裸文本路径
- Plugin 版本更新 → 同步更新对应 Skill 入口文件
- star 数 / 作者 / plugin README 上的 "skill 总数" 等营销性数字**不要写进 vault 文件**——这些会变，也不影响 vault 自身使用
- **防止幻觉**：草稿、AI 生成内容、剪藏摘要中的数字、人名、版本号、引用、结论，未经核验不得进入正式资源、规则、索引或对外发布稿
- **任何文件跨文件夹操作后必须走 [[#七、迁移 SOP]]**——这是工序，不是可选项

## 七、迁移 SOP（任何跨文件夹移动 / 批量分类后强制执行）

> ⚠️ **触发条件**：`mv` / `cp` / 批量分类 / 跨文件夹移动 / 删除整个子目录——任何让文件实际位置或计数变化的操作后，**必须**走完这 5 步才能算"迁移完成"。

| # | 步骤 | 检查内容 | 标准依据 |
|---|------|---------|---------|
| 1 | **索引更新** | 源文件夹 `_INDEX`（如源被清空，记录迁移日志）；目标文件夹 `_INDEX`（新增文件 + 更新计数）；顶层 `000-索引INDEX/_INDEX-000-总览.md`（如结构树变了）| — |
| 2 | **frontmatter 体检** | `title` 不空；`created` 是 `YYYY-MM-DD`；`status` 与目标文件夹默认一致（[[040-文件夹专属规则]]）；`tags` 是 1 分类层 + 1~4 主题层（[[020-Tag规则]]）；`related_to` 链接目标仍存在；文件不在 [[010-Frontmatter规则#四、排除目录]] | [[010-Frontmatter规则]] + [[020-Tag规则]] |
| 3 | **关联引用检查** | 其他文件 `related_to` 是否仍指向迁移后位置；wikilink 完整性（无死链） | [[030-关联引用规则]] |
| 4 | **Base 视图检查** | `900-BASE/*.base` 的 `filters` 是否仍匹配新路径；首页 base 视图（如 `011-快速学习LEARN.base`）若源文件夹已删，需归档或删除 | [[030-关联引用规则#六、Base / Dataview 引用规范]] |
| 5 | **Dataview 查询检查** | 各 `_INDEX` 里的 `FROM` 子句、`TABLE` 块是否需要更新路径 | 同上 |

**判定**：5 步全过才算"迁移完成"。任一步骤发现问题：
- 索引数字不对 → 直接改 markdown
- frontmatter 缺字段 → 用 [[070-kepano-obsidian-skills]] 的 `property:set` 补
- 死链 → 修 [[030-关联引用规则#七、引用失败处理]]
- Base/Dataview 失效 → 改 filters 或重建视图

**反例（漏掉的真实代价）**：
- 索引文件数与实际不符 → 用户/agent 按错误指引操作
- wikilink 死链 → [[030-关联引用规则#七]] 定义的"链接变红"等异常
- Base 视图失效 → 看板数据丢失
- status 没改 → 状态机停留在错误阶段，触发 [[040-文件夹专属规则]] 排除逻辑错误

## 八、跨主文件夹规则入口

| 主文件夹 | 规则入口 |
|---------|---------|
| 800-Wiki流水线（wiki/ pipeline 作业区） | [[800-Wiki流水线/801-规则]] |