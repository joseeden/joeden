---
title: "Admonitions"
sidebar_position: 6
description: "Resources, bookmarks"
tags: 
- Docusaurus
# last_update:
#   date: 7/14/2024
---



## Removing the icon 

Use this syntax to remove the icon:

```bash
import Admonition from '@theme/Admonition';

<Admonition type="info" title={null} icon={null}>
  <p>Some information</p>
</Admonition> 
```

Sample:

![](/img/docs/sample-docusaurus-admonition-removing-icon.png)

Reference: https://github.com/facebook/docusaurus/issues/8568

