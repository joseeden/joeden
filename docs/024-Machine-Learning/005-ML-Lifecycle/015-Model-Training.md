---
title: "Model Training"
description: "Model Training"
tags: 
- Machine Learning
- MLOps
sidebar_position: 15
last_update:
  date: 5/17/2023
---


## Keep It Simple (Occam’s Razor)  

The best model is usually the simplest one that fits the data. Avoid unnecessary complexity.  

- Simple models are easier to interpret.  
- Complex models can overfit and perform worse on new data.  

Occam's Razor suggests starting with simple models and using complex ones only if necessary.

## Choosing a Model  

After selecting important features, pick a suitable model for predictions.  

- **Logistic Regression (LR)** – Finds a decision boundary to separate classes.  
- **Support Vector Classifier (SVC)** – Similar to LR but more flexible.  
- **Decision Tree** – Uses rules to classify data.  
- **Random Forest** – Combines multiple decision trees for better predictions.  

If simple models don’t work well, try more advanced ones.  

- **Neural Networks** – Good for deep learning tasks.  
- **K-Nearest Neighbors (KNN)** – Classifies based on closest data points.  
- **XGBoost** – A powerful boosting algorithm for structured data.  

## Training Principles  

Once we've selected the model, the next step is to train the model on labeled data so that it can make predictions. To generalize unseen data, we **split our dataset** into two parts:

- Use 80% for training
- Use 20% for testing 

The model should not see the testing data during training, which we could achieve by setting some data aside. The split could be 80/20 or 70/30.

Sometimes we could use a third hold-out dataset, often called a **validation set** – optional, but it helps fine-tune model parameters.  

## Training a Model  

We train our model using `sklearn`. First, we split the dataset into training and testing sets with `train_test_split`.  

- **Set max iterations** – Limits training steps.  
- **Fit the model** – Learns patterns from training data.  

Logistic regression is a simple and effective choice. We define the model, set the maximum training iterations, and train it using `fit`. The model minimizes prediction errors using log loss, ensuring outputs stay between 0 and 1.  

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Split data (80:20)
X_train, X_test, y_train, y_test = train_test_split(features, targets, test_size=0.2, random_state=42)

# Define and train model
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
```

## Making Predictions  

After training, we use the trained model to predict outcomes.  

- **Predict classes** – Get binary predictions.  
- **Predict probabilities** – Get confidence scores.  

```python
# Predict outcomes
y_pred = model.predict(X_test)

# Predict probabilities
y_proba = model.predict_proba(X_test)
```  

## Understanding Predictions  

Interpret prediction probabilities as confidence scores.  

- **Threshold = 0.5** – Above 0.5 → positive, below 0.5 → negative.  
- **Example:** A model predicts an 80% chance of an event occurring.