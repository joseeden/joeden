---
title: "Model Packaging"
description: "Model Packaging"
tags: 
- Machine Learning
- MLOps
sidebar_position: 19
last_update:
  date: 5/14/2023
---

## Overview

Model packaging is the final step before we deploy our machine learning model into production. When packaging a model, we focus on three main objectives:

- Smooth deployment
- Reproducibility
- Monitoring

These objectives help ensure that the model can be deployed effectively, recreated if necessary, and monitored for performance.

## Storage Format

The format used to save the trained model depends on the framework and deployment environment.

- **PMML (Predictive Model Markup Language)**
  - Universal format for model portability between programming languages
  - Can be difficult to customize for complex models

- **Pickle format**
  - Stores models with no limits on what can be saved
  - Not ML-specific, can store anything
  - Only works within Python, requires same libraries used in training

If you choose Pickle format for your model, remember to store the list of dependencies used during training in the package metadata. This helps avoid compatibility issues when loading the model for deployment.

## Reproducibility

Reproducibility means that the model can be recreated at any time using the same conditions. The elements below are necessary for verifying the model's integrity and recreating it if needed.

- **Model pipeline version** – Record the exact training code version
- **Dataset versions** – Include training datasets and splits
- **Performance metrics** – Save test set performance results

## Monitoring 

To monitor the model effectively after deployment, we need to ensure that data profiles are included in the package.

- **Input data profile** - Define expectations for input and output data
- **Output data profile** - Tracks if the model performs as expected over time

Saving these profiles with the model package makes it easier to monitor and maintain the model’s performance in production.
