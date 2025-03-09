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

Continuing on the previous dashboard, we'll add filters to filter only specific games and specific genre.

