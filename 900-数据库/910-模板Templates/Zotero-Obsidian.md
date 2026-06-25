---
作者: "{{authors}}{{directors}}"
日期: '{% if date %} {{date | format("YYYY-MM-DD")}}{% endif %}'
发表: '{% if publicationTitle %} "{{publicationTitle}}"{% endif %}'
关键词: "{{hashTags}}, {% for annotation in annotations %}{% if annotation.hashTags %}{{annotation.hashTags}}, {% endif %}{% endfor %}"
链接: "{{pdfZoteroLink}}"
---

> **作者:** {{authors}}{{directors}}
> {% if publicationTitle %}**发表:** *"{{publicationTitle}}"*{% endif %}
> {% if date %}**日期:** {{date | format("YYYY-MM-DD")}}{% endif %}

---
##### **发表刊物**
~~~~
{{bibliography}}
~~~~

##### **Zotero链接:** 

>  {{pdfZoteroLink}}   


##### **关键词:** 
>  {{hashTags}}, {% for annotation in annotations %}{% if annotation.hashTags %}{{annotation.hashTags}}, {% endif %}{% endfor %}

 --- 

##### **摘要**
>  *{{abstractNote}}*

--- 
##### **参考文献列表**
>  {% if relations is defined and relations and relations.length > 0 %}
{% for r in relations %}
{# 只处理有标题的条目 #}
{% if r.title %}- **{{ r.title }}**{% if r.creators and r.creators[0] and (r.creators[0].lastName or r.creators[0].name) %} ({{ r.creators[0].lastName or r.creators[0].name }}{% if r.date and r.date is not none %}{% set dateStr = r.date | string | trim %}{% if dateStr != "" %}, {{ dateStr | slice(0,4) }}{% endif %}{% endif %}){% elif r.date and r.date is not none %}{% set dateStr = r.date | string | trim %}{% if dateStr != "" %} ({{ dateStr | slice(0,4) }}){% endif %}{% endif %} {% if r.desktopURI %}[🔗 Zotero]({{ r.desktopURI }}){% endif %}
{% endif %}
{% endfor %}
{% else %}
*暂无关联的参考文献*
{% endif %}



---
##### **注释:**
{% for annotation in annotations %}

##### **{{annotation.type | capitalize}}**  

**评论:** {{annotation.comment}}

{% if annotation.annotatedText %}
**标注:** *“{{annotation.annotatedText}}”*
{% endif %}

{% if annotation.imageRelativePath %}
![[{{annotation.imageRelativePath}}]]
{% endif %}

**关键词:** {% if annotation.hashTags %}{{annotation.hashTags}}{% endif %}  
{% if annotation.pageLabel %} **页数:**  {% if annotation.desktopURI %} [{{annotation.pageLabel}}]({{annotation.desktopURI}})  
{% else %} {{annotation.pageLabel}}  
{% endif %}{% endif %}

---
{% endfor %}