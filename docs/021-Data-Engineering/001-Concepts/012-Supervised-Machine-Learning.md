---
title: "Supervised Machine Learning"
description: "Notes from DataCamp's Understanding Data Science Course"
tags: [Data Engineering, Data Science, Machine Learning]
sidebar_position: 12
last_update:
  date: 2/27/2022
---


## Supervised Machine Learning and Model Evaluation

Machine learning aims to make predictions based on data, and supervised machine learning is a type where the data includes both **labels** and **features**. 

- Labels are the outcomes we want to predict, such as whether a customer will cancel their subscription. 
- Features are pieces of information that might help make these predictions, like age or last purchase date.

Examples:

- Recommendation systems
- Diagnosing biomedical images
- Recognizing hand-written digits
- Predicting customer churn

## Case Study: Churn Prediction

In a subscription business, we want to predict if a customer will cancel.

- Gather historical data with labels (cancelled or not)
- Gather data with features (e.g., age, gender, income).
- Train our model using this data to understand patterns that indicate cancellation.
- Use the model to predict if a new customer is likely to churn and take action if needed.

Features like age, gender, last purchase date, and household income can help predict cancellations. The strength of machine learning lies in its ability to analyze multiple features simultaneously. By using these features and labels, we train the model to make predictions on new data.

<div class="img-center"> 

![](/img/docs/data-engg-case-study-churn-predictions.png)

</div>

We can then input this data into our trained model, which then provides a prediction. If the model indicates that the customer isn’t at risk of churning, we can expect their revenue for the next month. However, if the model predicts they might churn, we can proactively reach out to try to retain their subscription.

<div class="img-center"> 

![](/img/docs/data-engg-case-study-churn-predictions-feed-input.png)

</div>


## Evaluating Model Performance

After training a model, it's important to reserve some of your historical data for testing rather than using it all for training. This reserved data, known as a **test set**, allows us to evaluate how well the model performs. 

![](/img/docs/data-engg-case-study-churn-subscriptiosn-evaluating-model-performance.png)

For instance, we can use the model to predict which customers might churn and then check how accurate these predictions are.

![](/img/docs/data-engg-case-study-churn-model-evaluation-97percent.png)


Remarks: 

- The model shows a high overall accuracy of 97%, being correct on 970 out of 1000 customers.
- However, it failed to correctly identify any customers who actually churned.
- For rare events, it’s crucial to evaluate the accuracy for each outcome separately.
- The model’s accuracy in predicting churn is 0%, indicating it’s not effective for this task.

 
If the model's performance is not satisfactory, it may need retraining with different parameters or more data.