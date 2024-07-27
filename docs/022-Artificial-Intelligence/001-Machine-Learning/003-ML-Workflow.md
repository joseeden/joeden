---
title: "Machine Learning Workflow"
description: "Notes from DataCamp's Understanding Machine Learning Course"
tags: [Data Science, Machine Learning, Artificial Intelligence]
sidebar_position: 3
last_update:
  date: 2/27/2022
---

## Overview 

Understanding the workflow of machine learning is key to building effective models. Training data allows a model to learn and make predictions, but there are essential steps in between. These steps will be better explained in the sample scenario in the next section.

<div class='img-center'>

![](/img/docs/ml-worklow-diagram-detailed.png)

</div>


For simplicity, we won't be splitting the data sets into three. Instead, we'll only divide it into training and testing data sets.

## Scenario

<div class='img-center'>

![](/img/docs/ml-workflow-nyc.png)

</div>

New York City releases monthly records of apartment sales, including details like square footage, neighborhood, year built, and sale price. We aim to predict future sale prices, making this a supervised learning problem.

## Step 1: Extract Features

    - Datasets often need reformatting to extract clear features.
    - Decide on relevant features like square feet, neighborhood, and proximity to subway stations.

## Step 2: Split Dataset

    - Split the dataset into training and testing sets.
    - Two datasets are essential for effective model evaluation.

## Step 3: Train Model

    - Input the training dataset into a selected machine learning model.
    - Choose from various models like neural networks or logistic regression based on use-cases and complexity.

## Step 4: Evaluate

    - Evaluate the model using the test dataset (unseen data).
    - Various metrics can assess performance, such as:
        - Average error or percentage accuracy within a margin.
        - Percentage of apartments did the model predict correctly within the margin
    - Decide on a performance threshold to determine model readiness.
    - Is performance good enough?
        - Yes, then our model is ready to use.
        - No, tune the model by tweaking options or features and repeat the training.


