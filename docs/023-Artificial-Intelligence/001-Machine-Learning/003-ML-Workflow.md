---
title: "Machine Learning Workflow"
description: "Notes from DataCamp's Understanding Machine Learning Course"
tags: 
- Data Science
- Machine Learning
- Artificial Intelligence
sidebar_position: 3
last_update:
  date: 5/4/2023
---

## Overview 

In machine learning, having a clear workflow is key to getting good results. The order in which steps are done plays a big role. Rearranging these steps will help you better understand their importance and how they fit into a typical machine learning project.

<div class='img-center'>

![](/img/docs/ml-worklow-diagram-detailed.png)

</div>

In the sample diagram above, the workflow begins with raw data, which is transformed into features and labels. 

- These are split into training, validation, and testing datasets. 
- Training and validation datasets are used for model training and hyperparameter tuning.
- The testing dataset evaluates the final model. 

The process results in a trained model capable of generating predicted labels.


## Sample Scenario

<div class='img-center'>

![](/img/docs/ml-workflow-nyc.png)

</div>

New York City releases monthly records of apartment sales, including details like square footage, neighborhood, year built, and sale price. We aim to predict future sale prices, making this a supervised learning problem.

- **Step 1: Extract Features**

    - Datasets often need reformatting to extract clear features.
    - Decide on relevant features like square feet, neighborhood, and proximity to subway stations.

- **Step 2: Split Dataset**

    - Split the dataset into training and testing sets.
    - Two datasets are essential for effective model evaluation.

- **Step 3: Train Model**

    - Input the training dataset into a selected machine learning model.
    - Choose from various models like neural networks or logistic regression based on use-cases and complexity.

- **Step 4: Evaluate**

    - Evaluate the model using the test dataset (unseen data).
    - Various metrics can assess performance, such as:
        - Average error or percentage accuracy within a margin.
        - Percentage of apartments did the model predict correctly within the margin
    - Decide on a performance threshold to determine model readiness.
    - Is performance good enough?
        - Yes, then our model is ready to use.
        - No, tune the model by tweaking options or features and repeat the training.


## The Complete ML Workflow

A clear workflow consists of steps that build on each other, taking the process from data collection to deploying a reliable model.

1. Requirements Gathering  
2. Data Preparation  
3. Model Development  
4. Model Evaluation and Tuning  
5. Model Testing  
6. Model Deployment  
