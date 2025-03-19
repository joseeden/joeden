---
title: "ML Lifecycle"
description: "ML Lifecycle"
tags: 
- Machine Learning
- MLOps
sidebar_position: 10
last_update:
  date: 5/14/2023
---


## ML Project Flow

These three concepts helps define the ML lifecycle.

- **ML Project**
  - The overall effort to solve a business problem with ML.

- **ML Application**
  - The software system using ML models.
  - Includes other components such as databases and APIs

- **ML Model**
  - The trained estimator used for predictions.
  - Example: daily sales forecast model

The ML Project Life Cycle covers the entire process of solving a problem with ML.

<div class="img-center"> 

![](/img/docs/all-things-data-Page-23.png)

</div>

## ML Application Components

An ML application includes more than just the model.

- **Business Rules**
  - Example: "If fewer than 10 ratings, recommend popular movies."

- **Database**
  - Stores features and logs model outputs.

- **GUI**
  - Allows admin users to configure and troubleshoot.

- **API**
  - Enables external communication securely and consistently.

## Monolithic vs. Decoupled

Before deploying a machine learning model, we need to decide how to structure the system. 

- **Monolith**: Model is tightly integrated into the app.
- **Microservices**: Model and application are separate.

A monolithic system can become complex and difficult to scale because all parts are tightly connected. On the other hand, microservices allow individual services to fail without affecting the entire system.

<div class='img-center'>

![](/img/docs/udacity-suse-2-monoliths-micro.png)

</div>

Decoupling the model from the application results in two distinct life cycles:  the **ML Application Lifecycle** and the **ML Model Lifecycle**.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-20-050332.png)

</div>

Separating the two lifecycles enables independent updates.

- The ML application has a long life cycle.
- ML models are frequently updated

## Model Life Cycle

Once an ML model is trained, it goes through a structured deployment process to ensure it functions correctly in real-world conditions.

1. **Deployment**
    - The trained model and required resources are packaged.
    - Once packaged, they are put into production.
    - This marks the start of the life cycle.

2. **Monitoring**
    - After deployment, the model is continuously monitored.
    - This ensures it runs correctly and performs as expected.
    - Helps detect issues early and maintain reliability.

3. **Decommissioning**
    - Outdated models are replaced with improved versions.
    - Better model has more informative features created.
    - Modeled process may have changed, invlidating the existing model. 

4. **Archiving**
    - Past models must be stored for regulatory or debugging purposes.
    - Regulators may require us to explain our model's decision in the past.
    - We should be able to load and run all previous model versions when required.
