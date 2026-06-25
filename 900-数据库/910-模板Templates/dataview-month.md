---
title: "{{title}}"
description: ""
created: {{date}}
tags:
  - 月报
related_to:
  -
---

# {{title}}

```dataview
TABLE
file.ctime AS "日期",
place AS "地点",
tags AS "标签",
description AS "简述",
link(file.link, "查看详情") AS "操作"
FROM "600-复盘总结"
WHERE file.ctime >= date("{{start_date}}")
AND file.ctime < date("{{start_date}}") + dur(31 days)
AND contains(tags, "周报")
SORT file.ctime DESC
```