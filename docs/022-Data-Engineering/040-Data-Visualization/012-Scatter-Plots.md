---
title: "Scatter Plots"
description: "Notes from DataCamp's Understanding Data Visualization Course"
tags: [Data Engineering,  Data Science, Data Visualization]
sidebar_position: 12
last_update:
  date: 9/22/2021
---


## Scatter Plots
Scatter plots are ideal when you have two continuous variables and want to explore their relationship. For instance, does one variable increase as the other increases, or does it decrease?

## Case Study: Los Angeles County Home Prices
This dataset covers home prices in four cities within Los Angeles County for 2012, including details on the number of bedrooms, sale prices in millions of dollars, and area in square feet.

<div class='img-center'>

![](/img/docs/dataset-lahomeprices.png)

</div>

This scatter plot features price on the y-axis and area on the x-axis. Describing it verbally, you'd say it's a scatter plot of "price versus area". 

<div class='img-center'>

![](/img/docs/scatter-plottttt.png)

</div>

Initially, points cluster in the bottom left, making it hard to read. Switching to a logarithmic scale spreads points more evenly, where moving right doubles the area, and moving up multiplies the price by ten.

<div class='img-center'>

![](/img/docs/scatter-plottttt-1.png)

</div>


## Correlation

Correlation measures how well you can draw a straight line through points. 

- An upward line indicates positive correlation
- a downward line shows negative correlation

Examples include strong negative correlation (x increases, y decreases) and strong positive correlation (x and y both increase). Intermediate states show varying levels of correlation, including none.

<div class='img-center'>


![](/img/docs/scatter-plottttt-2.png)

</div>

## Limitations of Correlation

Let's take a look at the Datasaurus Dozen again. This illustrates that datasets with identical correlations can look vastly different. Correlation works best with straight-line relationships between x and y. 

<div class='img-center'>

![](/img/docs/scatter-plottttt-3.png)

</div>

For complex shapes, describe the relationship creatively, such as "the plot looks like a dinosaur" instead of "x and y have a slight negative correlation".


## Trend Lines
Straight lines on scatter plots help identify linear relationships between x and y variables. For example, with logarithmic scales, a trend line closely fitting the points indicates a linear relationship between the logarithms of area and price.

<div class='img-center'>

![](/img/docs/scatter-plottttt-4.png)

</div>

## Using Smooth Trend Lines

When a straight trend line poorly fits, such as missing more expensive homes on a price vs. area plot using a linear scale, a curved trend line can better represent the relationship. A curve showing the trend line arching upwards suggests that as the area increases, the price increases faster than linearly.

<div class='img-center'>

![](/img/docs/scatter-plottttt-5.png)

</div>

