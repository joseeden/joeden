---
title: "Histograms"
description: "Notes from DataCamp's Understanding Data Visualization Course"
tags: [Data Engineering,  Data Science, Data Visualization]
sidebar_position: 11
last_update:
  date: 2/27/2022
---


## Histograms
Histograms are used to visualize the distribution of a continuous variable. They reveal insights into the shape of the data's distribution, including its range, central tendencies, and the frequency of various values.

- Ideal for examining a single continuous variable
- Analyze distribution shape, range, and common values

Below is a data set on the Monarch ages. Examining the ages of kings and queens of England and Britain at their ascension can provide insights into historical patterns of leadership age.

![](/img/docs/datasets-kings-queens-england.png)

## Age Distribution
Histograms display age data by grouping it into intervals or "bins". The x-axis represents these age bins, and the y-axis shows the count of monarchs in each bin.

- Age bins like 0-5 years, 5-10 years, etc.
- No monarchs began ruling between ages 45 and 50

![](/img/docs/datasets-histogram-kings-queens-englad.png)

## Binwidth
The binwidth affects the histogram's clarity and informativeness. Testing various binwidths can help find the most useful representation.

- **Narrow Binwidth (1 year)**: Can lead to noisy data and unclear distribution

    ![](/img/docs/datasets-histogram-selecting-binwidth.png)


- **Wide Binwidth (25 years)**: May obscure details in the distribution

    ![](/img/docs/datasets-histogram-selecting-binwidth-25years.png)


## Modality

Modality refers to the number of peaks in the histogram's distribution.

![](/img/docs/datasets-histogram-many-modality.png)

For instance, the age distribution of monarchs is unimodal, peaking between 25 and 35 years.

![](/img/docs/datasets-kings-queens-histogram-uni-modality.png)



## Skewness

<div class="img-center"> 

![](/img/docs/datasets-skewness-different-types.png)

</div>


Skewness assesses the symmetry of the distribution.

- **Left-skewed**: Outliers on the left; imagine a skewer pointing left
- **Right-skewed**: Outliers on the right; skewer points right

The distribution in the Monarch dataset is nearly symmetric.

![](/img/docs/datasets-kings-queens-histogram-uni-modality.png)


## Kurtosis

<div class="img-center"> 

![](/img/docs/assessing-kurtosissss.png)

</div>

Kurtosis measures the presence of extreme values and the shape of the distribution's tails.

- **Mesokurtic**: Normal bell curve shape
- **Leptokurtic**: Sharp peak with many extreme values; relevant for financial data
- **Platykurtic**: Broad peak with few extreme values