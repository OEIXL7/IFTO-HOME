---
title: "{{title}}"
description: ""
created: {{date}}
作者: "{{authors}}{{directors}}"
发表: "{{publicationTitle}}"
链接: "{{pdfZoteroLink}}"
tags:
  - 论文
  - AI思考
  - {{hashTags}}
related_to:
  -
---

> **作者:** {{authors}}{{directors}}
> {% if publicationTitle %}**发表:** *"{{publicationTitle}}"*{% endif %}
> {% if date %}**日期:** {{date | format("YYYY-MM-DD")}}{% endif %}

---
##### **发表刊物**
~~~~
{{bibliography}}
~~~~

**Zotero链接:** {{pdfZoteroLink}}
**文章关键词:** {{hashTags}}

---

> [!abstract]+ **摘要**
> *{{abstractNote}}*

---

> [!important]+ **重点总结**
> *在此处手动总结论文的核心观点、创新点或重要发现。*

---

> [!cite]- **参考文献列表**
> {% if relations.length > 0 %}
{% for r in relations %}
{% if r.title %}
- **{{r.title}}**{% if r.creators and r.creators[0] and (r.creators[0].lastName or r.creators[0].name) %} ({{ r.creators[0].lastName or r.creators[0].name }}{% if r.date and r.date | trim != "" %}, {{ r.date | slice(0,4) }}{% endif %}){% elif r.date and r.date | trim != "" %} ({{ r.date | slice(0,4) }}){% endif %} {% if r.desktopURI %}[🔗 Zotero]({{r.desktopURI}}){% endif %}
{% endif %}
{% endfor %}
{% else %}
*暂无关联的参考文献*
{% endif %}

---

### **我的注释与标注**

{% for annotation in annotations %}
> [!{% if annotation.comment %}comment{% else %}quote{% endif %}] **{{annotation.type | capitalize}}** ({% if annotation.desktopURI %}[pg. {{annotation.pageLabel}}]({{annotation.desktopURI}}){% else %}pg. {{annotation.pageLabel}}{% endif %}) {% if annotation.comment %} 💬{% endif %}
> {% if annotation.comment %}**评论:** {{annotation.comment}}{% endif %}
> {% if annotation.annotatedText %}**标注:** > *"{{annotation.annotatedText}}"*{% endif %}
> {% if annotation.imageRelativePath %}**图片:** ![[{{annotation.imageRelativePath}}]]{% endif %}
> {% if annotation.hashTags %}**标签:** {{annotation.hashTags | replace(",", " ")}}{% endif %}

{% else %}
*暂无注释*
{% endfor %}