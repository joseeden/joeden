---
title: "Enhancing Visualizations"
description: "Enhancing Visualizations"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 24
last_update:
  date: 5/19/2024
---

## Overview

Reference lines, trend lines, and forecastsing provide context and help with data analysis.  

## Reference Lines  

Reference lines are lines on the chart representing a key value (e.g., average). They help compare individual data points to a benchmark.  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-09-192446.png)

</div>

## Trend Lines  

Trend line show overall movement in the data over time. This helps in identifying the increasing, decreasing, or stable trends.  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-09-192511.png)

</div>


## Forecasting  

Forecasting predicts future values based on past trends. It uses mathematical models to extend trends forward.  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-09-192532.png)

</div>

## Example: Birth Trends 

In this example, we'll use UN Health Data to analyze birth trends in portugal over five years using a line chart and enhance it with reference lines, trend lines, and forecasting. 

### Adding a Reference Line

The line chart below shows Years on the x-axis and Birthrate on the y-axis.

1. Open the **Analytics** pane and drag **Reference Line** into the chart.  
2. Set it to show the **average number of births** across all months.  
3. Click **OK** to add the line.

The reference line helps visualize how Portuguese births compare to the overall average over time. 

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-23.gif)

</div>

To remove the reference line, click the line and select Remove.

### Adding a Trend Line  

To determine if there is an upward or downward trend in the number of births over the part 5 years, add a trend line.

2. In the **Analytics** pane, drag **Trend Line** into the chart.  
3. Choose **Linear** to see if births are increasing or decreasing.  

Based on this, we can see that there is a slight upwards trend on the number of births. To remove the trend line, click the line and deselect **Show Trend Lines.**

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-24.gif)

</div>

### Forecasting Future Births  

To get an estimate on the number of births the following year, use forecasting. 

1. Drag **Forecast** from the **Analytics** pane and drop it on the chart.  
2. Tableau will generate a prediction for the next year.

Forecasting helps predict future trends and allows for better decision-making.

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-25.gif)

</div>
