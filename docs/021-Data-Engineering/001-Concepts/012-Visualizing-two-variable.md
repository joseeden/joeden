---
title: "Visualizing two variables"
description: "Notes from DataCamp's Understanding Data Visualization Course"
tags: [Data Engineering,  Data Science, Data Visualization]
sidebar_position: 12
last_update:
  date: 2/27/2022
---


## Scatter Plots
Scatter plots are ideal when you have two continuous variables and want to explore their relationship. For instance, does one variable increase as the other increases, or does it decrease?

### Case Study: Los Angeles County Home Prices
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


### Correlation

Correlation measures how well you can draw a straight line through points. 

- An upward line indicates positive correlation
- a downward line shows negative correlation

Examples include strong negative correlation (x increases, y decreases) and strong positive correlation (x and y both increase). Intermediate states show varying levels of correlation, including none.

<div class='img-center'>


![](/img/docs/scatter-plottttt-2.png)

</div>

### Limitations of Correlation

Let's take a look at the Datasaurus Dozen again. This illustrates that datasets with identical correlations can look vastly different. Correlation works best with straight-line relationships between x and y. 

<div class='img-center'>

![](/img/docs/scatter-plottttt-3.png)

</div>

For complex shapes, describe the relationship creatively, such as "the plot looks like a dinosaur" instead of "x and y have a slight negative correlation".


### Trend Lines
Straight lines on scatter plots help identify linear relationships between x and y variables. For example, with logarithmic scales, a trend line closely fitting the points indicates a linear relationship between the logarithms of area and price.

<div class='img-center'>

![](/img/docs/scatter-plottttt-4.png)

</div>

### Using Smooth Trend Lines

When a straight trend line poorly fits, such as missing more expensive homes on a price vs. area plot using a linear scale, a curved trend line can better represent the relationship. A curve showing the trend line arching upwards suggests that as the area increases, the price increases faster than linearly.

<div class='img-center'>

![](/img/docs/scatter-plottttt-5.png)

</div>



## Line Plots 


Line plots are similar to scatter plots but connect consecutive data points. They are especially useful when the x-axis represents dates or times. For example, a scatter plot of worldwide COVID-19 cases in early 2020 becomes clearer when points are connected with a line.

<div class='img-center'>

![](/img/docs/line-plotssss-1.png)

</div>

### Multiple Lines

Line plots can compare multiple lines, like showing COVID-19 cases in different regions. For example, in February 2020, most cases were in China, but by March, the rest of the world had more cases.

<div class='img-center'>

![](/img/docs/line-plotssss-2.png)

</div>


### Trend Lines and Log Scale

Trend lines from linear regression help analyze line plots. In China, March 2020 data showed a linear increase in cases post-quarantine. 

<div class="img-center"> 

![](/img/docs/line-plotssss-3.png)

</div>

For other countries, using a logarithmic scale showed exponential growth in cases, fitting the trend line better.

![](/img/docs/line-plotssss-4.png)

### Time x-axis and line plots

A time axis doesn't always mean a line plot is suitable. For instance, a scatter plot of hip-hop song ratings by critics, with dates on the x-axis and scores on the y-axis, is more appropriate since the songs aren't sequentially connected.

By the way: The top-rated hip-hop song of all time was "Juicy" by The Notorious B.I.G.

<div class="img-center"> 

![](/img/docs/line-plotssss-5.png)

</div>


Sometimes, plots with a time axis may not be effective. For example, a plot of juvenile offenders in Switzerland by age group over time may not provide clear insights. Alternative approaches without a time x-axis might work better.

<div class="img-center"> 

![](/img/docs/line-plotssss-5.png)

</div>

### Case Study: Technology Adoption in the US

The following line plot illustrates the percentage of U.S. households adopting four technologies (automobiles, refrigerators, stoves, and vacuums) from 1930 to 1970.

<div class='img-center'>

![](/img/docs/casestudy-adaoption-ref-stove-cars.png)

</div>

Reference: [Hannah Ritchie and Max Roser (2019) - Technology Adoption](https://ourworldindata.org/technology-adoption)

Observations:

- After 1940, refrigerator adoption consistently surpassed stove adoption.
- In 1930, car adoption exceeded 50%.
- In 1945, two out of four technologies had lower adoption rates than in 1940.

### Case Study: COVID-19

In this line plot of COVID-19 data, we're focusing on the six countries with the most cases outside mainland China. Both a logarithmic and linear scale is presented.

- On a linear scale, each grid line represents an addition of 20,000 cases. 
- On a logarithmic scale, each grid line represents a multiplication by 4.

For datasets with values spanning several orders of magnitude, a logarithmic scale can make visualization easier.

![](/img/docs/casestudy-covidddd1.png)

![](/img/docs/casestudy-covidddd2.png)
