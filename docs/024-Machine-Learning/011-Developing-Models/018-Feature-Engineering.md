---
title: "Feature Engineering"
description: "Feature Engineering"
tags: 
- Machine Learning
- MLOps
sidebar_position: 18
last_update:
  date: 5/13/2023
---

## Overview 

Feature engineering helps improve machine learning model performance by transforming data into a more useful form. 

- Aggregating data  
- Constructing new features  
- Transforming features  
- Selecting important features  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-19-070728.png)

</div>

## Aggregating Data from Multiple Sources 

Combining data from various sources helps create a richer dataset and improves model accuracy.  

- Merge different datasets  
- Use varied data types for better insights  

Example of Data Aggregator class that loads data from three sources into a single dataset for further processing:

```python
import pandas as pd

class DataAggregator:
  def __init__(self):
    pass
  
  def fit(self, data):
    pass
  
  def transform(self, data):
    data1 = pd.read_csv("data_source1.csv")
    data2 = pd.read_csv("data_source2.csv")
    data3 = pd.read_csv("data_source3.csv")
    
    # Combine all datasets into one DataFrame
    return pd.concat([data1, data2, data3], axis=0)
```

### Expected Result  

## Feature Construction  

Feature construction is creating new features from existing ones. This can make the model more interpretable and improve performance.  

- Combine or modify existing features  
- Work with domain experts to identify relevant features  

In the example below, the `FeatureConstructor` class creates two new features by subtracting the mean of two columns from each value. These new features show how each data point deviates from the mean.

```python
class FeatureConstructor:
  def __init__(self):
      pass
  
  def fit(self, X, y=None):
      return self 

  def transform(self, X, y=None):
    # Find mean of each column
    mean_values = X.mean()
    
    # Construct new features by subtracting column means
    X['feature1_deviation'] = X['feature1'] - mean_values['feature1']
    X['feature2_deviation'] = X['feature2'] - mean_values['feature2']
    
    return X
```


## Feature Transformation  

Transforming features ensures they are in a usable form for the model. This can include normalizing data or handling outliers.  

- Normalize data for consistency  
- Remove outliers to improve model accuracy  

In the example below, the `StandardScaler` transformer in scikit-learn scales the features so they have a mean of 0 and a standard deviation of 1. This helps to bring all the data to the same scale, which can improve the performance of certain machine learning models.

```python
from sklearn.datasets import load_breast_cancer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

# Load data and split into train/test sets
data = load_breast_cancer()
X, y = data.data, data.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Logistic regression model
model = LogisticRegression(random_state=42)

# Without scaling
model.fit(X_train, y_train)
y_pred_no_scaling = model.predict(X_test)
acc_no_scaling = accuracy_score(y_test, y_pred_no_scaling)

# With scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model.fit(X_train_scaled, y_train)
y_pred_with_scaling = model.predict(X_test_scaled)
acc_with_scaling = accuracy_score(y_test, y_pred_with_scaling)

# Output accuracy comparison
print(f"Accuracy without scaling: {acc_no_scaling}")  # Example output: 0.971
print(f"Accuracy with scaling: {acc_with_scaling}")   # Example output: 0.982
```


## Feature Selection  

Feature selection helps by identifying the most relevant features and removing redundant ones, which improves model interpretability and performance.  

- Reduce overfitting  
- Focus on relevant features  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-19-072430.png)

</div>

#### Example: Feature Engineering Pipeline

This pipeline performs a sequence of operations: data aggregation, feature construction, scaling, and feature selection. It uses the Chi-squared test to pick the top 10 features. After fitting, the pipeline can transform new data in the same way.

```python
from sklearn.preprocessing import StandardScaler
from sklearn.feature_selection import SelectKBest, chi2

class FeatureEngineeringPipeline:
    def __init__(self):
        self.aggregator = DataAggregator()
        self.constructor = FeatureConstructor()
        self.scaler = StandardScaler()
        self.selector = SelectKBest(chi2, k=10)
    
    def fit(self, X, y):
        # Apply aggregation, feature construction, scaling, and feature selection
        X = self.aggregator.transform(X)
        X = self.constructor.transform(X)
        X = self.scaler.fit_transform(X)
        self.selector.fit(X, y)
    
    def transform(self, X):
        # Apply transformations to new data
        X = self.aggregator.transform(X)
        X = self.constructor.transform(X)
        X = self.scaler.transform(X)
        return self.selector.transform(X)
``` 

In this code:

- `fit()`: Aggregates, constructs, scales, and selects features for the model.
- `transform()`: Applies the same transformations to new data for predictions. 

:::info

Make sure that `DataAggregator` and `FeatureConstructor` are defined and their `transform` methods work correctly before running this pipeline.

:::
