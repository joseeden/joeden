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
- **Raw vs. Engineered Features**: We can use existing data or create new features for better insights.  

## Example: Customer Data  

Consider a dataset with customer orders. Two existing features are:  

- **Number of orders**: Total purchases by a customer.  
- **Total expenditure**: Total money spent by a customer.  


**Customer ID** | **Number of orders** | **Total expenditure** |
----------------|----------------------|-----------------------|
 0              | 11                   | $3199                 |
 1              | 5                    | $9851                 |
 2              | 9                    | $574                  |


We can create a new feature called **Average expenditure** which gets the amount paid by the customer per order.

**Customer ID** | **Number of orders** | **Total expenditure** | **Average expenditure** |
----------------|----------------------|-----------------------|-------------------------|
 0              | 11                   | $3199                 | $290.82                 |
 1              | 5                    | $9851                 | $1970.2                 |
 2              | 9                    | $574                  | $63.77                  |


## Selecting Features  

Note that adding more features doesn’t always help. The goal is to find the most useful ones.  

- **Feature Selection**: Identifying the most important variables.  
- **Correlation Check**: Removing redundant features.  
- **Dimensionality Reduction**: Methods like PCA (Principal Component Analysis) simplify data.  

## The Best Approach  

Here are four options ranked in order of effectiveness for improving feature engineering:  

1. **Consult a domain expert**  
   - Get insights from someone with expertise in the field.  
   - Helps identify features that are most relevant to the problem.  

2. **Use a combination of feature selection tools**  
   - Apply techniques like univariate selection, PCA, and Recursive Feature Elimination (RFE).  
   - Ensures only the most valuable features are kept.  

3. **Use as many features as possible**  
   - Adds all available features, assuming more data improves performance.  
   - Can lead to overfitting and unnecessary complexity.  

4. **Manually create features based on intuition**  
   - Develop new features based on gut feeling.  
   - Lacks a systematic approach and may not improve the model.  

Using expert knowledge and selection techniques leads to better results than blindly adding more features.

## Feature Store  

A **feature store** is a central location to save and reuse features across projects. It helps large teams maintain consistency, but smaller projects may not need it.  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-18-202541.png)

</div>

## Data Version Control  

Just like Git tracks code changes, **data version control** tracks dataset changes.  

- **Keeps history**: Allows rolling back to previous versions.  
- **Ensures consistency**: Prevents unexpected changes in model inputs.  
