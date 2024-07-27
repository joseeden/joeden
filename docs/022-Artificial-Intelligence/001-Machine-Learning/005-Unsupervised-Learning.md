---
title: "Unsupervised Learning"
description: "Notes from DataCamp's Understanding Machine Learning Course"
tags: [Data Engineering, Data Science, Machine Learning]
sidebar_position: 5
last_update:
  date: 2/27/2022
---


## Overview

Unsupervised learning is similar to supervised learning but without a target column. It learns from the dataset to find patterns, providing insights without needing to know much about the data beforehand.

  - Learns from the datasets, trying to detect patterns.
  - Clustering, anomaly detection, and association.

## Clustering

Clustering identifies groups in your dataset where observations in the same group share more similarities with each other than with those in other groups.

- Clustering of animals by breed
- Clustering of animals by color

Below are some examples of clustering models: 

- **K-Means**
    
    - Requires specifying the number of clusters.
    
- **DBSCAN**
    
    - Density-based spatial clustering of applications with noise.
    - Defines clusters based on density
    - Doesn't need the number of clusters defined in advance.
    - Instead, it requires you to define what constitutes a cluster.

## Anomaly Detection

Anomaly detection focuses on identifying outliers, which are observations that significantly differ from others.

- **Detecting Outliers**
  - Example: A point that stands out from a cluster of points, such as a sum total that wasn't removed.

- **Removing Outliers**
  - Easier to identify with fewer dimensions, but challenging with many dimensions, requiring algorithms.

- **Anomaly Detection Use Cases**
  - Finding errors, identifying faulty devices, detecting fraud, or recognizing patients with unexpected disease resistance.

## Association

Association involves finding relationships between observations, often used in market basket analysis to determine which items are bought together.

- Finding events that happen together.
- Often used in **market basket analysis** - "which object are bought together?"
- People who buy jam often buy bread, beer with peanuts, and wine with cheese.