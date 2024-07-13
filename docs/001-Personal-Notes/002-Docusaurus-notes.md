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

Create the CSS file. You can customize the color and labels.

```css title="styles.modulus.css"
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
    background-color: #fed871;
    /* Text color for selected tab */
    color: black;
  }
  

  .gray {
    /* Default text color for unselected tab */
    color: black;
  }
  
  .gray[aria-selected='true'] {
    /* Background color for selected tab */
    background-color: #d3d3d3;
    /* Text color for selected tab */
    color: black;
  }
```

In your markdown file, add the following code. You can customize the texts inside each tab.

```typescript
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from '../../../src/css/styles.module.css';

<Tabs>
  <TabItem value="Red" label="Red" attributes={{className: `${styles.red} ${styles['tab-label']}`}}>
    This tab will be color red
  </TabItem>
  <TabItem value="Yellow" label="Yellow" attributes={{className: `${styles.yellow} ${styles['tab-label']}`}}>
    This tab will be color yellow
  </TabItem>
  <TabItem value="Gray" label="Gray" attributes={{className: `${styles.gray} ${styles['tab-label']}`}}>
    This tab will be color gray
  </TabItem>
</Tabs> 
```
