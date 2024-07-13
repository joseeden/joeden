---
title: "Docusaurus Notes"
sidebar_position: 2
description: "Resources, bookmarks"
tags: [Docusaurus]
# last_update:
#   date: 7/14/2024
---


## Tabs 

### Changing heading colors 

Create the CSS file.

```css
/* Default text color for all tabs */
.tab-label {
    color: black;
  }
  

  .red {
    /* Default text color for unselected tab */
    color: black;
  }
  
  .red[aria-selected='true'] {
    /* Background color for selected tab */
    background-color: #ff8686;
    /* Text color for selected tab */
    color: black;
  }

  
  .yellow {
    /* Default text color for unselected tab */
    color: black;
  }
  
  .yellow[aria-selected='true'] {
    /* Background color for selected tab */
    background-color: #d3d3d3;
    /* Text color for selected tab */
    color: black;
  }
  

  .gray {
    /* Default text color for unselected tab */
    color: black;
  }
  
  .gray[aria-selected='true'] {
    /* Background color for selected tab */
    background-color: #fed871;
    /* Text color for selected tab */
    color: black;
  }
```

