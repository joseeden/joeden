---
title: "Plotting Multiple Variables at Once"
description: "Notes from DataCamp's Understanding Data Visualization Course"
tags: 
- Data Engineering
- Data Science
- Data Visualization
sidebar_position: 18
last_update:
  date: 9/22/2021
---


## Overview

To handle the visualization of many variables simultaneously, you can use advanced plotting techniques such as pair plots, correlation heatmaps, and parallel coordinates plots.

## Using Pair Plots

Pair plots are effective for visualizing up to ten variables at once. They display the distribution of each variable and the relationships between each pair.

<div class='img-center'>

![](/img/docs/pair-plots-la-home-pricesss.png)

</div>

Above is a pair plot of LA home prices includes four variables, arranged in a grid of panels. Each panel provides insights into different aspects of the data.

### Diagonal Panels

Panels along the diagonal show the distribution of variables. For categorical variables, like city, the distribution is displayed as a bar plot. 

<div class='img-center'>

![](/img/docs/pair-plots-la-home-pricesss-diagonal-panels.png)

</div>

Continuous variables, such as number of beds, price, and area, are shown with histograms.

<div class='img-center'>

![](/img/docs/pair-plots-la-home-pricesss-non-diagonal-panels.png)

</div>


### Off-Diagonal Panels

Panels off the diagonal reveal the relationships between pairs of variables. Continuous variable pairs are represented by scatter plots, showing their correlation. For instance, a scatter plot might show the relationship between the number of beds and area, with a correlation value indicated.

<div class='img-center'>

![](/img/docs/pair-plots-la-home-pricesss-off-diagonalll.png)

</div>

### Categorical and Continuous Variables

When one variable is categorical and the other is continuous, the plot includes a box plot and a histogram. For example, the box plot shows prices by city, and the histogram represents the same data.

<div class='img-center'>

![](/img/docs/pair-plots-la-home-pricesss-categ-continuous-varssss.png)

</div>

## Correlation Heatmaps

Pair plots are useful for quickly exploring datasets. For datasets with many continuous variables, a correlation heatmap, a variant of the pair plot, offers a more compact and scalable alternative.

Correlation heatmaps display the relationships between continuous variables using color rather than numbers. They are useful for comparing a large number of variables.

### Heatmap Example

In a customer satisfaction survey dataset, the correlation heatmap reveals strong relationships between various product features. Bright red areas indicate high correlation among price-related aspects.

<div class='img-center'>

![](/img/docs/heat-mapppp-cust-satisfaction-survey-dataset.png)

</div>

Reference: [Rossi, Allenby, and McCulloch (2005). Bayesian Statistics & Marketing](https://onlinelibrary.wiley.com/doi/book/10.1002/0470863692)


## Parallel Coordinates Plots

For datasets with many continuous variables, parallel coordinates plots are effective for understanding relationships or grouping data into clusters.

<div class='img-center'>

![](/img/docs/parallel-coordinates-plot-examplesssse.png)

</div>

Above is a parallel coordinates plot shows multiple variables, including the human development index score, with each line representing a country. Variables are plotted along the x-axis, and the y-axis ranges from the lowest to the highest value for each variable. Splitting the data by continent can reveal patterns.

<div class='img-center'>

![](/img/docs/parallel-coordinates-plot-splittingggg.png)

</div>

By segmenting the dataset by continent, distinct patterns emerge. For example, South American countries show consistent metrics, while European countries have high values across all metrics. African countries display low GNIs with a broad range in other metrics. This plot allows for easy comparison of many variables simultaneously.


### Case Study: Fatty acid levels in olive oils

This dataset contains fatty acid levels from olive oil samples sourced from six different regions in Italy. Each line in the plot corresponds to a single oil sample. Because the region is a categorical variable, there are six parallel coordinates plots, with one plot for each region.

<div class='img-center'>

![](/img/docs/case-study-fatty-acids-olive-oils-italyyyy.png)

</div>

Reference: [Graphics of large datasets](https://www.springer.com/gp/book/9780387329062)

Observations:

- Sardinian oils have low elcosenoic acid and high linoleic acid levels.
- Calabrian oils show a wide range of elcosenoic and stearic acid levels.
- Northern oils have high oleic acid levels.