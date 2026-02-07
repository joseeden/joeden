---
title: "Front Matter"
sidebar_position: 4
description: "Resources, bookmarks"
tags: 
- Docusaurus
# last_update:
#   date: 7/14/2024
---


## Overview

Specify properties for the docs files. It is the YAML file at the top of the docs page.

```bash
---
title: Put Main Title of Page here
sidebar_position: 2                   # Ordering of display on the sidebar
toc_min_heading_level: 1              # TOC at the right, shows min Header 1 level
toc_max_heading_level: 6              # TOC at the right, shows max Header 6 level
--- 
```


## Description 

The description will appear as the brief description or a preview of the doc. As an example:

```yaml
---
title: "Networking Basics"
description: "Learn the basics of Networking"
tags: 
- Networking
- Cybersecurity
sidebar_position: 1
last_update:
  date: 1/30/2024
--- 
```

![](/img/docs/frontmatter-description-sample.png)

When rendered, it will look like this:

![](/img/docs/frontmatter-description-sample-2.png)


## TOC 

If you want to also show the TOC at the main page, besides the TOC at the right, add the following after the front matter section, like this:

```bash
---
title: Put Main Title of Page here
sidebar_position: 2                   # Ordering of display on the sidebar
toc_min_heading_level: 1              # TOC at the right, shows min Header 1 level
toc_max_heading_level: 6              # TOC at the right, shows max Header 6 level
--- 

import TOCInline from '@theme/TOCInline

<TOCInline toc={toc} minHeadingLevel=}{2} maxHeadingLevel=}{6} />>
```
