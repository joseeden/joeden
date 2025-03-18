---
title: "Data Versioning"
description: "Data Versioning"
tags: 
- Machine Learning
- MLOps
sidebar_position: 20
last_update:
  date: 5/13/2023
---

## Overview

Tracking data and model versions is essential in machine learning to ensure reproducibility and traceability.

- Easy tracking and rollback of changes to data and models.
- Differentiates large updates from small tweaks.
- Helps identify which data was used for experiments.
- Ensures that model changes are tracked alongside data.

## Types of Versioning 

Versioning is categorized into two types:

- **Major Versioning**: 
  - Represents significant changes
  - Example: Adding new features or methods

- **Minor Versioning**
  - Indicates smaller updates
  - Bug fixes or slight adjustments.

## Versioning Training Data

We can version data by labeling it with unique identifiers. For example:

- **Version 1.0**: Initial dataset.
- **Version 1.1**: Added data transformations (e.g., scaling).
- **Version 1.2**: Added feature selection (e.g., Chi-squared).
- **Version 2.0**: Major update with new data.

## Feature Store

A **feature store** manages the versions of features across experiments, ensures consistent data usage in future tests, and avoids duplication.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-18-202541.png)

</div>

## Versioning ML Models

Model versioning allows tracking of model changes over time. For example:

- **Model version 1.0**: Initial model trained with data version 1.0.
- **Model version 1.1**: Fine-tuned model with data version 1.1.
- **Model version 2.0**: New model (e.g., XGBoost) trained with data version 1.2.

## Using MLflow for Model Versioning

Here’s how you can log a model version with MLflow:

```python
import mlflow

# Set version to 1.0
mlflow.set_tag("model_version", "1.0")

# Log model
with mlflow.start_run():
    mlflow.log_model(model, "model")
```

This logs the model version, and you can track changes across experiments.

## Model Stores

A **model store** is like a feature store but for models. It ensures models can be reused and reproduced across experiments. 

- Enable version control and rollback
- Works well in tandem with feature stores 