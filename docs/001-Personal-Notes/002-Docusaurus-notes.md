---
title: "Docusaurus Notes"
sidebar_position: 2
description: "Resources, bookmarks"
tags: [Docusaurus]
# last_update:
#   date: 7/14/2024
---


## Sidebars 


The sidebar is the menu on the left side. It can be auto-generated, or manually defined in the **sidebar.js**. It is recommended to have it automatically generated.

### Naming of folders 

When renaming or adding sidebars, <s>make sure to **`rename both the folder as well as the label in _category_.json file.`**</s> the folder name and label name does not need to match. 

<!-- ![](static/img/main-readme/notes-sidebars-edit-both.png) -->

![](/img/docs/sidebar-naming-foldersss.png)


### Naming of files 

Similar with folders, the filenames does not need to match the actual titles of the files. The title of the markdown file can be written with the "#" to signify the title heading, or use the `title` in the Frontmatter (see section below).

![](/img/docs/sidebar-naming-files.png)

### Changing the ordering

In your IDE, folder names will appear in alphabetical order. However, we can change their order when rendered by specifying their position in the `_category_.json` file. In the example above, the folder "Microsoft Azure" appears as the fourth folder inside the docs. But since we specified its position as 9th, it will be displayed in a different order in the browser.

![](/img/docs/notes-sidebars-ordering-corrected.png)

### Ordering of the Sidebars 

:::info[NOTE]

The ordering will be updated from time to time so it might not match the sample photo above.

:::

These are the current ordering:

Order   | Sidebar                       | 
--------|-------------------------------|
 00     | Technical Notes               | 
 01     | Personal Notes                | 
 02     | IT Foundations                | 
 03     | Linux                         | 
 04     | Networking                    | 
 05     | Cybersecurity                 | 
 06     | Cloud Computing               | 
 07     | Amazon Web Services           | 
 08     | Microsoft Azure               | 
 09     | Google Cloud                  | 
 15     | Containerization              | 
 16     | Insfrastructure as Code       | 
 17     | Version Control and CICD      | 
 18     | Observability                 | 
 19     | DevSecOps                     | 
 20     | Site Reliability Engineering  | 
 21     | Project Management            | 



## Front Matter 

Specify properties for the docs files. It is the YAML file at the top of the docs page.

```bash
---
title: Put Main Title of Page here
sidebar_position: 2                   # Ordering of display on the sidebar
toc_min_heading_level: 1              # TOC at the right, shows min Header 1 level
toc_max_heading_level: 6              # TOC at the right, shows max Header 6 level
--- 
```


### Description 

The description will appear as the brief description or a preview of the doc. As an example:

```yaml
---
title: "Networking Basics"
description: "Learn the basics of Networking"
tags: [Networking,Cybersecurity]
sidebar_position: 1
last_update:
  date: 1/30/2024
--- 
```

![](/img/docs/frontmatter-description-sample.png)

When rendered, it will look like this:



### TOC 

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

```typescript title="filename.md"
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

Build and deploy. It should look like this:

![](/gif/docs/changing-heading-colors-for-tabs.gif)


### Changing label and heading colors 

Modifying the CSS file and markdown files from the previous section:

```css title="styles.modulus.css"
/* Default text color for all tabs */
.tab-label {
  color: black;
}

.red {
  /* Default text color for unselected tab */
  color: red;
}

.red[aria-selected='true'] {
  /* Background color for selected tab */
  background-color: red;
  /* Text color for selected tab */
  color: black;
}

.orange {
  /* Default text color for unselected tab */
  color: orange;
}

.orange[aria-selected='true'] {
  /* Background color for selected tab */
  background-color: orange;
  /* Text color for selected tab */
  color: black;
}

.yellow {
  /* Default text color for unselected tab */
  color: yellow;
}

.yellow[aria-selected='true'] {
  /* Background color for selected tab */
  background-color: yellow;
  /* Text color for selected tab */
  color: black;
}
```

```typescript title="filename.md"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from '../../../src/css/styles.module.css';

<Tabs>
  <TabItem value="apple" label="Apple" attributes={{className: `${styles.red} ${styles['tab-label']}`}}>
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange" attributes={{className: `${styles.orange} ${styles['tab-label']}`}}>
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana" attributes={{className: `${styles.yellow} ${styles['tab-label']}`}}>
    This is a banana 🍌
  </TabItem>
</Tabs>
```

Build and deploy. It should look like this:

![](/gif/docs/changing-label-heading-colors-for-tabs.gif)