---
title: "Feature Engineering"
description: "Feature Engineering"
tags: 
- Machine Learning
- MLOps
sidebar_position: 10
last_update:
  date: 5/12/2023
---

## Feature Engineering  

After designing a machine learning model, the next step is feature engineering.  

**Feature engineering** involves selecting, modifying, and creating useful variables (features) from raw data. These features help the model make better predictions.  

- **Feature**: A measurable property, like a column in a table.  
- **Raw vs. Engineered Features**: We can use existing data or create new features.

For more information, please see [Feature Engineering.](/docs/024-Machine-Learning/005-ML-Lifecycle/014-Feature-Engineering.md)

## Feature Store  

A **feature store** is a central location to save and reuse features across projects. It helps large teams maintain consistency, but smaller projects may not need it.  

For more information, please see [Feature Stores.](/docs/024-Machine-Learning/011-MLOps-Deployment/017-Feature-Stores.md)

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-18-202541.png)

</div>

## Data Version Control  

Just like Git tracks code changes, **data version control** tracks dataset changes.  

- **Keeps history**: Allows rolling back to previous versions.  
- **Ensures consistency**: Prevents unexpected changes in model inputs.  

