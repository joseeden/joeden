---
title: "Sidebars"
sidebar_position: 3
description: "Resources, bookmarks"
tags: 
- Docusaurus
# last_update:
#   date: 7/14/2024
---


## Overview 

The sidebar is the menu on the left side. It can be auto-generated, or manually defined in the **sidebar.js**. It is recommended to have it automatically generated.

## Naming of folders 

When renaming or adding sidebars, <s>make sure to **`rename both the folder as well as the label in _category_.json file.`**</s> the folder name and label name does not need to match. 

<!-- ![](/img/docs/notes-sidebars-edit-both.png) -->

![](/img/docs/sidebar-naming-foldersss.png)


## Naming of files 

Similar with folders, the filenames does not need to match the actual titles of the files. The title of the markdown file can be written with the "#" to signify the title heading, or use the `title` in the Frontmatter (see section below).

![](/img/docs/sidebar-naming-files.png)

## Changing the ordering

In your IDE, folder names will appear in alphabetical order. However, we can change their order when rendered by specifying their position in the `_category_.json` file. In the example above, the folder "Microsoft Azure" appears as the fourth folder inside the docs. But since we specified its position as 9th, it will be displayed in a different order in the browser.

![](/img/docs/notes-sidebars-ordering-corrected.png)

## Ordering of the Sidebars 

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

