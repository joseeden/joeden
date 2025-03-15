---
title: "Axes in Plots"
description: "Notes from DataCamp's Understanding Data Visualization Course"
tags: [Data Engineering,  Data Science, Data Visualization]
sidebar_position: 20
last_update:
  date: 9/22/2021
---


## Misleading Plots

Bar plots rely on the length of each bar being proportional to the value it represents. 


<div class='img-center'>

![](/img/docs/misleading-plotsssssssss.png)

</div>


For example, in a misleading infographic from "dataisugly," Yang’s 22.5% poll score appears much larger than Sanders’ 21% score, even though the actual difference is minimal. This example highlights the importance of scrutinizing political graphs for accuracy.


<div class='img-center'>

![](/img/docs/misleading-plotsssssssss-correcteddddd.png)

</div>


## Stacked Bar Plots

This issue also affects stacked bar plots. Another example from "dataisugly" shows a market share plot for phone operating systems where the y-axis starts at 75% instead of zero. 

<div class='img-center'>

![](/img/docs/misleading-stacked-bar-plotsssssss.png)

</div>

This adjustment makes Android and iOS market shares seem similar, whereas a correct plot reveals Android’s much larger share.

<div class='img-center'>

![](/img/docs/misleading-stacked-bar-plotsssssss-correcteddddd.png)

</div>


## Dual Y-Axes

Dual y-axes can also be misleading. For instance, a plot using the United Nations dataset displays life expectancy and the human development index on separate y-axes. 

<div class='img-center'>

![](/img/docs/misleading-dual-y-axesssssssss.png)

</div>

While this approach attempts to accommodate different scales, it can obscure the relationship between the variables. On one axis, there might appear to be a strong correlation, while on the other, the correlation seems absent, making interpretation challenging. 

When we change the right-hand y-axis, the interpretation of the plot completely changes.

<div class='img-center'>

![](/img/docs/misleading-dual-y-axesssssssss-changing-one-y-axiss.png)

</div>



## Multiple Panels 

A clearer alternative is to use multiple panels. This way, you can separately present different metrics, making it easier for the audience to understand the data.

<div class='img-center'>

![](/img/docs/use-separate-panels-for-easier-Understandingssss.png)

</div>
