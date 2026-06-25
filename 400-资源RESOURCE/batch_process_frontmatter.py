#!/usr/bin/env python3
"""批量处理带有author: JIAXI的markdown文件frontmatter"""

import os
import re
from pathlib import Path

def process_frontmatter(file_path):
    """处理单个文件的frontmatter"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 检查是否包含 author: JIAXI
    if 'author: JIAXI' not in content:
        return False

    # 提取frontmatter
    frontmatter_match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
    if not frontmatter_match:
        return False

    frontmatter = frontmatter_match.group(1)
    body = content[frontmatter_match.end():]

    # 解析原frontmatter字段
    created_match = re.search(r'created:\s*([\d-]+)', frontmatter)
    alias_match = re.search(r'alias:\s*(.+)', frontmatter)
    tags_match = re.findall(r'^\s*-\s*(.+?)\s*$', frontmatter, re.MULTILINE)

    # 提取日期部分（去掉时间）
    created = ''
    if created_match:
        created_full = created_match.group(1).strip()
        # 提取日期部分 YYYY-MM-DD
        date_match = re.match(r'(\d{4}-\d{2}-\d{2})', created_full)
        if date_match:
            created = date_match.group(1)

    # 获取标题（来自alias）
    title = ''
    if alias_match:
        title = alias_match.group(1).strip().strip('"\'')
        # 清理特殊字符
        title = title.replace('"', '').replace("'", '')

    # 根据文件路径判断标签
    tags = determine_tags(file_path, tags_match)

    # 构建新的frontmatter
    new_frontmatter = f'''---
title: "{title}"
description: ""
created: {created}
tags:
'''
    for tag in tags:
        new_frontmatter += f'  - {tag}\n'

    new_frontmatter += 'related_to:\n  - "[[]]"\n---\n'

    # 组合新内容
    new_content = new_frontmatter + body

    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True

def determine_tags(file_path, existing_tags):
    """根据文件路径和现有标签判断新标签"""
    tags = []
    path_str = str(file_path).lower()

    # 路径分类映射
    tag_mappings = {
        'html': 'HTML',
        'css': 'CSS',
        'python': 'Python',
        'javascript': 'JavaScript',
        'docker': 'Docker',
        'pytorch': 'PyTorch',
        'n8n': 'N8N',
        'arcgis': 'ArcGIS',
        'comfyui': 'ComfyUI',
        'ollama': 'Ollama',
        'ragflow': 'Ragflow',
        'gaussian': '高斯泼溅',
        'lmstudio': 'LM Studio',
        'openclaw': 'Openclaw',
        '设计': '设计',
        'obsidian': 'Obsidian',
        '生产力': '生产力',
        '商业分析': '商业分析',
        '社会分析': '社会分析',
        '哲学思辨': '哲学思辨',
        '心理分析': '心理分析',
        '学习思考': '学习思考',
        '设计分析': '设计分析',
        'ai': 'AI',
        '计算机语言': '编程语言',
        '个人笔记': '个人笔记',
        '读书心得': '读书笔记',
        '摘录': '摘录',
    }

    # 检查路径包含的关键字
    for key, tag in tag_mappings.items():
        if key.lower() in path_str:
            if tag not in tags:
                tags.append(tag)

    # 如果没有找到标签，添加默认标签
    if not tags:
        tags.append('个人笔记')

    return tags

def main():
    base_dir = Path(r'H:\100-文本资料\102-Obisidian\lock store\400-资源RESOURCE')

    # 查找所有包含 author: JIAXI 的md文件
    files_to_process = []
    for md_file in base_dir.rglob('*.md'):
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
                if 'author: JIAXI' in content:
                    files_to_process.append(md_file)
        except Exception as e:
            print(f"Error reading {md_file}: {e}")

    print(f"找到 {len(files_to_process)} 个文件需要处理")

    success_count = 0
    for file_path in files_to_process:
        try:
            if process_frontmatter(file_path):
                success_count += 1
                print(f"已处理: {file_path.name}")
        except Exception as e:
            print(f"处理失败 {file_path}: {e}")

    print(f"\n完成! 成功处理 {success_count} 个文件")

if __name__ == '__main__':
    main()