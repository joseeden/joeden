---
title: "Model Evaluation"
description: "Model Evaluation and Visualization"
tags: 
- Machine Learning
- MLOps
sidebar_position: 17
last_update:
  date: 5/18/2023
---


## Overview

There are several methods to measure how well your model is performing. Here are some of the most commonly used metrics.

- Accuracy 
- Confusion matrix 
- Balanced accuracy 
- Cross-validation 
- Hyperparameter tuning 

## Accuracy

Accuracy is the ratio of correct predictions to total predictions. While it’s simple, it may not always give an accurate picture, especially with imbalanced data.

- Easy to misinterpret or obscure results
- **Standard accuracy** = num correct answers / num answers 
- Standard accuracy can be unhelpful

For example, if a model predicts 99% of positive cases correctly, but incorrectly classifies a small number of negative cases, the accuracy may be misleading.

## Confusion Matrix

A confusion matrix helps to evaluate binary classification models. It shows the actual vs predicted labels in a 2x2 table:

- **True positives** - Correct positive predictions
- **True negatives** - Correct negative predictions
- **False positives** - Incorrect positive predictions
- **False negatives** - Incorrect negative predictions

This matrix highlights where the model is making errors.

## Balanced Accuracy

Balanced accuracy averages the accuracy across both classes. It’s useful when classes are imbalanced, ensuring the model doesn’t favor one class too much.

```
Balanced accuracy = (TP + TN)  / 2
```

Consequently, balanced accuracy is **often more reliable** than standard accuracy.

## Cross-validation

Cross-validation divides the data into multiple groups (folds) and evaluates the model performance on each split. It provides a more reliable estimate of the model's ability to generalize.

- Resampling procedure
- Ensure robustness of results

### `k-fold cross-validation`

`k-fold cross-validation` helps evaluate models when data is limited. It splits the data into multiple groups (k), training the model on k-1 parts and testing it on the remaining part.

- Divides data into k groups
- Trains on k-1 parts
- Tests on 1 part
- Repeats for each group

### `sklearn`

`sklearn` provides an easy way to implement k-fold cross-validation using the `KFold` function. 

- Set the number of splits (k) with KFold
- Use cross_val_score to calculate the scores
- Pass in the model, KFold object, dataset features, and target to evaluate the model

This allows for efficient model evaluation with different data splits.

```python
from sklearn.model_selection import cross_val_score, KFold

# Split data into 5 equal parts
kfold = KFold(n_splits=5, shuffle=True, random_state=42)

# Get cross-validation accuracy
cv_results = cross_val_score(model, feature_X, feature_y, cv=kfold, scoring='balanced_accuracy')

print(cv_results)
```

## Hyperparameter Tuning

Adjusting hyperparameters can improve model performance. You can test different values of a hyperparameter to find the best one for your model.

- **Hyperparameter** is a global model parameter
- It doesn't changed during training

For example, in logistic regression, the hyperparameter `C` controls the regularization strength.

```python
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score, KFold

# Hyperparameters to test
C_values = [0.001, 0.01, 0.1, 1, 10, 100, 1000]

# KFold cross-validation setup
kfold = KFold(n_splits=5, shuffle=True, random_state=42)

# Manually iterate over the hyperparameters
for C in C_values:
    model = LogisticRegression(max_iter=200, C=C)
    model.fit(X_train, y_train)  # Fit the model on training data
    accuracy = cross_val_score(model, X, y, cv=kfold, scoring='balanced_accuracy')  
    print(f"C = {C}, Accuracy: {accuracy.mean():.4f} (+/- {accuracy.std():.4f})")
```