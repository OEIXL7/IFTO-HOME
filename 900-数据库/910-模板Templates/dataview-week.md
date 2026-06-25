---
title: "{{title}}"
description: ""
created: {{date}}
start_date: {{start_date}}
tags:
  - 周报
related_to:
  -
---

# {{title}}

```dataview
TABLE
created AS "日期",
place AS "地点",
tags AS "标签",
description AS "简述",
link(file.link, "查看详情") AS "操作"
FROM "600-复盘总结"
WHERE created >= date(start_date) AND created < date(start_date) + dur(7 days)
AND contains(tags, "日报")
SORT file.ctime DESC
```

### 周复盘总结方式方法

| **时间** | **地点** | **简述一周感想** |
| :---: | :---: | :---: |
| | | |
| **经验类型** | **经验总结（方式方法）** | |
| | | |
