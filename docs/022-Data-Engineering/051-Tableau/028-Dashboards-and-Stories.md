---
title: "Dashboards and Stories"
description: "Dashboards and Stories"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 28
last_update:
  date: 5/20/2024
---


## Dashboards  

Dashboards combine multiple views into one interactive display. They help compare data and reveal insights.  

- Automatically updates when worksheets change  
- Allows filtering and interactive analysis  
- Can connect views to act as filters  

## Dashboard Example  

A dashboard on video game sales can show:  

- Sales by platform  
- Top video games  
- Most popular genres  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-10-003023.png)

</div>


## Stories  

Stories organize key insights into a sequence of visualizations, which makes it easier to understand trends.  

- Helps present data as a narrative  
- Bookmarks important findings  
- Each step in a story is called a **story point**  

## Stories Example  

A video game sales story might include:  

- **Platform Comparison** – Compare Xbox, PlayStation, and Nintendo sales  

    ![](/img/docs/Screenshot-2025-03-10-003129.png)

- **Deep Dive** – Focus on PlayStation sales by platform   

    ![](/img/docs/Screenshot-2025-03-10-003210.png)

## How Everything Fits  

Think of worksheets, dashboards, and stories like Russian dolls.  

- **Worksheets** go into **dashboards**  
- **Dashboards** go into **stories**  
- Sometimes, worksheets can go straight into a story  

This structure keeps insights organized and easy to explore.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-10-003256.png)

</div>

## Example: Playstation Games Sales 

In this example, we'll use the a dataset containing video games sales to determine:

- Which platform was the most popular?
- Which game was the most popular?

To do this, we'll create a dashboard called **Playstation Overview 1994** using four worksheets.  

**Worksheets:**  

- **Platform Analysis Over Time**  
- **Sales by Platform**  
- **Sales by Genre**  
- **Top Video Games**  

See below:

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-29.gif)

</div>


**Steps:**  

1. Drag **Platform Analysis Over Time** to the empty dashboard.  
2. Click the **Legend** box, then the small arrow.  
3. Select **Floating** from the dropdown menu.  
4. Move the legend to the top left of the graph.  
5. Add the other three sheets and arrange them in this order:  

   ![](/img/docs/Screenshot-2025-03-10-005001.png)  

6. Make the **Genre** legend floating and place it next to **Top Video Games**.  


**Insights:**  

- **PS2** was the most popular platform.  
- **Grand Theft Auto** was the top-selling action game.

## Example: Adding Filters

Continuing on the previous example, we'll add filters to the dashboard to focus on specific games and genres. Our goal is to find how many copies (in millions) **Sony Computer Entertainment** sold for the **PS2** in the **Racing** genre.  

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-30.gif)

</div>

**Steps:**  

1. Toggle **Show dashboard title** (lower left).  
2. Center the title and set font size to **20**.  

Filtering by Publisher:

3. Click the **Sales by Genre** graph, then the small arrow.  
4. Select **Filters** > **Publisher**.  
5. Click the dropdown arrow on the filter > **Single Value (dropdown)**.  
6. Drag the filter below the title.  

Filtering by Genre:

7. Click the **Treemap** on **Sales by Genre**, then select **Use as Filter**.  
8. Click any genre in the treemap to filter data.  
9. Click the same genre again to remove the filter.  
10. The other graphs will update based on the filter selection.  

Finding the Sales for PS2 Racing Games:

11. Scroll up and filter **Publisher** to **Sony Computer Entertainment**.  
12. In **Sales by Genre**, click the **Racing** section.  
13. Hover over **PS2** in **Sales by Platform**.  


**Insights:**  

Sony Computer Entertainment sold **35.41 million** copies for the **PS2** in the **Racing** genre.


## Example: Creating a Story 

We'll build a story to answer two questions:  

- On which platform did **Call of Duty: Black Ops** sell more—PlayStation or Xbox?  
- What was the **best-selling PS2 simulation game** published by **Electronic Arts**?  

See below:

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-31.gif)

</div>


**Steps:**  

1. Click **New Story** at the bottom.  
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

**Insights:**  

- **Call of Duty: Black Ops** sales:  
  - **Xbox:** 14.64 million  
  - **PlayStation:** 12.73 million  
  - It sold more copies on **Xbox**.  

- **The Sims** is the best-selling PS2 simulation game by Electronic Arts.