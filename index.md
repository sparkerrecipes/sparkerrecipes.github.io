---
layout: page
title: Recipes
subtitle: <small>by tags</small>
---

{% assign date_format = site.date_format | default: "%B %-d, %Y" %}

{% assign tags = site.recipes | map: 'tags' | uniq | sort %}

{%- for tag in tags -%}
    <a href="#{{- tag -}}" class="btn btn-primary tag-btn"><i class="fas fa-tag" aria-hidden="true"></i>&nbsp;{{- tag -}}</a>
{%- endfor -%}

{% for tag in tags %}
<h2 id="{{ tag }}" class="linked-section">
    <i class="fas fa-tag" aria-hidden="true"></i>
    &nbsp;{{ tag }}
</h2>
<div class="post-list">
    {%- for post in site.recipes -%}
        {% if post.tags contains tag %}
        <div class="tag-entry">
            <a href="{{ post.url | relative_url }}">{{- post.title -}}</a>
        </div>
        {% endif %}
    {%- endfor -%}
</div>
{% endfor %}