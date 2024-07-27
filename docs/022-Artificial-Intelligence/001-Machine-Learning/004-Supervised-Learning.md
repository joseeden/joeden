---
title: "Supervised Learning"
description: "Notes from DataCamp's Understanding Machine Learning Course"
tags: [Data Engineering, Data Science, Machine Learning]
sidebar_position: 4
last_update:
  date: 2/27/2022
---

## Overview 

Modeling is at the heart of machine learning. It's about teaching machines to make decisions or predictions based on data. There are different types of machine learning models, but this page will focus on supervised learning and its two main types: classification and regression.

## Classification

Classification involves assigning categories to observations. This is useful for predicting discrete outcomes such as customer churn, cancer diagnosis, or wine type.

- **Observations**
   - Data points fed into the model. Example: predicting college admissions.

- **Features**
   - Variables used for prediction, such as GPA and test scores.

- **Target**
   - The outcome to predict, like acceptance or rejection.

- **Graphing Data**
   - Visual representation of data points (e.g., GPA vs. test results).

- **Splitting Data**
   - Use 80% of data for training and 20% for testing.

- **Manual Classifier**
   - Simple method to classify data, visualized with a support vector machine (SVM).

- **Support Vector Machine (SVM)**
   - Linear classifier uses a straight line, while a polynomial classifier uses a curved line for better accuracy.

### Case Study: College Admissions

As an example, we'll try to predict acceptance in college admissions. We have two features here, GPA and admission test results, but we can have more if we like. The "Accepted" column is the target that we want to predict. It can have two labels: True or False.

<div class='img-center'>

![](/img/docs/ml-college-admissions-example.png)

</div>

### Manual Classifier 

We graph our observations, with GPA on the x-axis and test results on the y-axis. We'll then keep only 80% of the data to train our models (recall that the other 20% will be used as testing data set). From here we can see that if you score 4 and above on the GPA and test result, you're accepted.

<div class='img-center'>

![](/img/docs/ml-college-admissions-80-percent-only.png)

</div>


### Linear Classifier 

We can use the **Support Vector Machine (SVM)** which will be the line that separates the points. Two points are on the line, which means two applicants are wrongly predicted as rejected. The problem with this approach is that the line only tries to separate the graph with a straight line, so it's unlikely to do better than that.

<div class='img-center'>

![](/img/docs/ml-college-admissions-linear-classifier.png)

</div>

### Polynomial Classifier

Instead of a straight line, we can also use a curve line. This approach can better classify the separation of points correctly.

<div class='img-center'>

![](/img/docs/ml-college-admissions-polynomial-classifier.png)

</div>


## Regression

Regression predicts continuous variables, useful for forecasting values like stock prices, planetary masses, or future heights.

- **Predicting Temperature**
   - Example of using weather data to predict temperature based on humidity.

- **Training Data**
   - 80% of data used for training the regression model.

- **Linear Regression**
   - Model that identifies trends, such as the inverse relationship between humidity and temperature.

- **Model Evaluation**
   - Test the model with real data to assess accuracy. Adding more features can improve predictions.


### Case Study: Weather Readings

We'll use the following data to predict the temperature. We don't a specific set of labels, but instead we have variable temperatures.

<div class='img-center'>

![](/img/docs/ml-weather-readings-variable.png)

</div>

We use 80% of the data to train the model and then graph the points. Using the linear regression model, we can see that when the humidity rate is above 0.4, the temperature also rises to around 20 degree celsius.

<div class='img-center'>

![](/img/docs/ml-weather-readings-regression-line.png)

</div>

## Which one to use

Choosing between classification and regression depends on the problem. For example, predicting an exact temperature is regression, while predicting a temperature range like "Cold," "Mild," or "Hot" is classification.

By understanding the differences and applications   of these models, you can better decide how to approach your machine learning problems.