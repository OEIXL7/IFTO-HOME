---
title: "050-Context-Engineering-Skill"
description:Agent-Skills-for-Context-Engineering plugin · 命名空间 context-engineering: · 4 个已加载 skill 入口
type: Skill
tags:
  - Skill
  - Context-Engineering
  - Plugin
related_to:
  - "[[000-Rule总览]]"
  - "[[060-claude-obsidian-Skill]]"
  - "[[070-kepano-obsidian-skills]]"
---

# 050 · Context-Engineering Skill 入口

> 来源 plugin：**Agent-Skills-for-Context-Engineering**
> 命名空间前缀：`context-engineering:`
> 已加载 skill 数：**4 个**（仅这 4 个通过命名空间暴露给 Claude Code，其他主题是这 4 个 skill 内部方法论，不是独立 skill）

## 一、Skill 清单（4 个，已验证加载）

| Skill                                      | 作用                                      | 何时调用                          |
| ------------------------------------------ | --------------------------------------- | ----------------------------- |
| `context-engineering:context-compression`  | 长会话压缩、结构化摘要、token-优化                    | 跑长任务需要交接 / 对话超长需要压缩           |
| `context-engineering:latent-briefing`      | 跨 agent KV 缓存压缩、orchestrator-worker 上下文 | 多 agent 协作 / 减少 worker token  |
| `context-engineering:memory-systems`       | 持久化语义记忆、跨会话知识保留、记忆巩固                    | 需要实体追踪 / 时间有效性 / 记忆整合         |
| `context-engineering:multi-agent-patterns` | 多 agent 上下文隔离、supervisor 协调、显式交接        | 设计多 agent 系统 / 决定是否多 agent 合理 |

> ⚠️ **不要相信 plugin README 上的"skill 总数"宣传数字**——只有这 4 个真正通过 `context-engineering:` 命名空间加载。其他主题是这 4 个 skill 内部引用的方法论，不是独立可调用的 skill。

## 二、触发场景对照

| 场景                                   | 用哪个                    |
| ------------------------------------ | ---------------------- |
| 单个长会话压缩、做摘要                          | `context-compression`  |
| orchestrator 把上下文传给 worker（节省 token） | `latent-briefing`      |
| agent 需要"记住"用户偏好、跨会话持续工作             | `memory-systems`       |
| 决定一个任务是否需要多 agent / 怎么分              | `multi-agent-patterns` |

## 三、本 Plugin 与其他 Plugin 的边界

| 操作                              | 是否调用本 Plugin                             |
| ------------------------------- | ---------------------------------------- |
| agent 在 vault 里**移动/修改文件**      | ❌ 不调本层（走 [[070-kepano-obsidian-skills]]） |
| agent **跑 vault 健康检查**          | ❌ 不调本层（走 [[060-claude-obsidian-Skill]]）  |
| agent **长会话压缩 / 跨 agent 上下文传递** | ✅ 本 Plugin                               |
| agent **跨会话记忆持久化**              | ✅ 本 Plugin                               |

## 四、与本 vault 的关联

| vault 场景 | 推荐 skill |
|------------|-----------|
| 跑 `整理 060-碎片灵感` 这种批量任务 | `context-compression`（中间结果交接） |
| `_INDEX` 体系跨 8 个文件夹，决定要不要多 agent | `multi-agent-patterns` |
| 用户的"长内容加个人体验声明"反馈（来自 memory） | `memory-systems`（持久化） |
| 跑 `wiki-lint` + `wiki-ingest` 跨阶段 | `latent-briefing`（阶段间压缩） |

## 五、调用方式

```
# 在 Claude Code 中直接调用：
> /context-compression
> /latent-briefing
> /memory-systems
> /multi-agent-patterns

# 或在 Skill 工具中：
skill: "context-engineering:context-compression"
```

## 六、维护

- Plugin 新增 skill 进 `context-engineering:` 命名空间 → 更新本文件第一节
- 触发场景对照表是经验积累，每月一次在 [[600-复盘总结/610-项目总结]] 复盘
- 与 [[060-claude-obsidian-Skill]] / [[070-kepano-obsidian-skills]] 的边界若变化 → 同步更新本文件第三节