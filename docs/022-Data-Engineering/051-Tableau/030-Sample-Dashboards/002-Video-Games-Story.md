---
title: "Video Games Story"
description: "Video Games Story"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 2
last_update:
  date: 5/21/2024
---



## Workbook 

In this example, we'll use a dataset on video game sales from the following game publishers:  

- Playstation
- Nintendo 
- XBox

**Download the workbook here:** [4_6_first_story.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/001-Introduction-to-Tableau/Workbooks)  


## Creating a Story 

We'll build a story to answer two questions:  

- On which platform did **Call of Duty: Black Ops** sell more—PlayStation or Xbox?  
- What was the **best-selling PS2 simulation game** published by **Electronic Arts**?  

**Steps:**  

1. Open the workbook and click **New Story** at the bottom.  
2. Rename it to **Competitor Analysis 1994 - 2010**.  
3. Drag **PlayStation, Nintendo, and Xbox** to the **Story** board.  
4. Rename each story point accordingly.  

Finding the Highest Sales for "Call of Duty: Black Ops":

5. Go to the **Xbox** story point.  
6. In **Top Video Games**, hover over **Call of Duty: Black Ops** to check sales.  
7. Repeat for the **PlayStation** story point.  

Finding the Best-Selling PS2 Simulation Game by EA:

8. Go to the **PlayStation** story point.  
9. Filter **Publisher** to show only **Electronic Arts**.  
10. In **Sales by Genre**, click **Simulation** to filter data.  
11. In **Top Video Games**, check the highest-selling game.  


**Solution:**

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-31.gif)

</div>


**Insights:**  

- **Call of Duty: Black Ops** sales:  
  - **Xbox:** 14.64 million  
  - **PlayStation:** 12.73 million  
  - It sold more copies on **Xbox**.  

- **The Sims** is the best-selling PS2 simulation game by Electronic Arts.