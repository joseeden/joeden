---
title: "Types of Machine Learning"
description: "Notes from DataCamp's Understanding Machine Learning Course"
tags: 
- Data Science
- Machine Learning
- Artificial Intelligence
sidebar_position: 2
last_update:
  date: 5/4/2023
---

## Overview 

Machine learning can be divided into three main types: reinforcement learning, supervised learning, and unsupervised learning. Reinforcement learning involves making sequential decisions and won't be covered further. Both supervised and unsupervised learning are common types and they differ mainly in their training data.

- **Reinforcement Learning**: Uses sequential actions, not covered further.
- **Supervised Learning**: Uses labeled training data.
- **Unsupervised Learning**: Uses unlabeled training data.

## Training Data

Machine learning learns patterns from existing data, called "training data," and applies them to new data. Training a model involves this process, which can take from nanoseconds to weeks, depending on the data size.

## Supervised Learning  

To train a supervised learning model, we need labeled training data. For instance, to predict if a patient has heart disease, we use existing patient records with chest pain and heart disease test results.

<div class='img-center'>

![](/img/docs/ml-supervised-learning-model-heart-disease.png)

</div>

Where: 

- **Target Variable**: What we want to predict (e.g., heart disease).
- **Labels**: True/False values indicating if a patient has heart disease.
- **Observations**: Rows of data the model learns from. Also called or *Examples*
- **Features**: Columns of data that help predict the target (e.g., age, cholesterol).

With machine learning, we can analyze many features at once, even the ones we're unsure about, and find relationships between different features. Once the model is trained, new input data (like a new patient) is provided, and the model predicts the outcome.

<div class='img-center'>

![](/img/docs/ml-new-input-to-ml-model.png)

</div>

## Unsupervised Learning

In unsupervised learning, training data only has features, not labels. It’s useful for tasks like anomaly detection and clustering, which groups data based on similarity. For example, to find different types of heart disease patients, we can cluster patients with heart disease based on features like age, cholesterol, and blood sugar levels.

<div class='img-center'>

![](/img/docs/ml-unsupervised-no-features-only-labels.png)

</div>

Now, with a new patient, we can input the features into the model and get which patient type they best fit into. Categorizing the input data based on these groups helps in research and treatment planning.

In reality, data often lacks labels. It might be too labor-intensive to label, or we might not even know what the labels should be. Imagine trying to label millions of road images for self-driving cars. This is where unsupervised learning excels. The model, operating without supervision, discovers its own patterns.

