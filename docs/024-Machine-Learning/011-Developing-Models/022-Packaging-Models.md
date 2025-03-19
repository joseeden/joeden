---
title: "Packaging ML Models"
description: "Packaging ML Models"
tags: 
- Machine Learning
- MLOps
sidebar_position: 22
last_update:
  date: 5/13/2023
---

## Overview

Packaging ML models ensures that they perform well and are easy to deploy across different environments. There are three main ways to package models:

- **Serialization**
  - Simple, light-weight, and language-agnostic
  - Converting ML model to a retrievable file
  - Not suitable for complex models

- **Environment Packaging**
  - Captures the entire software environment
  - Results to a heavy package

- **Containerization**
  - Packages everything into a container for portability
  - The model, dependencies, and environment is packaged
  - Requires expertise in containerization

## Serialization 

Serialized models can be loaded into memory and used for prediction or scoring.

### scikit-learn Models

Scikit-learn models can be easily serialized using Python’s `pickle` library.

```python
import pickle
from sklearn.ensemble import RandomForestClassifier

# Example model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Serialize the model
with open('model.pkl', 'wb') as file:
    pickle.dump(model, file)
```

The result is a saved model file `model.pkl` which can later be loaded for predictions.

### PyTorch and TensorFlow Models

PyTorch and Tensorflow are popular Python libraries for deep learning and provide a variety of tools for training and deploying ML models.

- **PyTorch**

  - Use `torch.save` and `torch.load` to serialize and deserialize models.
  - Example:

      ```python
      import torch
      import torch.nn as nn

      # Define a simple model
      model = nn.Linear(10, 1)

      # Serialize the model
      torch.save(model.state_dict(), 'model.pth')

      # Deserialize the model
      loaded_model = nn.Linear(10, 1)
      loaded_model.load_state_dict(torch.load('model.pth'))
      loaded_model.eval()
      ```

- **TensorFlow**

  - Use `tf.saved_model.save` to serialize; `tf.saved_model.load` to deserialize.
  - Example:

      ```python
      import tensorflow as tf

      # Define a simple model
      model = tf.keras.Sequential([tf.keras.layers.Dense(1, input_dim=10)])

      # Serialize the model
      model.save('model')

      # Deserialize the model
      loaded_model = tf.keras.models.load_model('model')
      ```

## Packaging with Docker

Using Docker, you can package the model and its environment into a container. This ensures that the model will run the same way on any system.

- Use `conda` or `virtualenv` to create isolated environments.
- Use Docker to containerize the model with all dependencies.

Here’s an example of a simple Dockerfile to containerize a model:

```Dockerfile
FROM python:3.8

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY model.pkl /app/
COPY run_model.py /app/

CMD ["python", "run_model.py"]
```

## Sample Docker Workflow

In the example below, we packaged the ML model in a Docker container, which can be deployed anywhere with consistent performance.

1. Train the ML model on a sample dataset.
2. Serialize the model (e.g., using pickle or TensorFlow).
3. Create a `requirements.txt` for the required packgaes.
4. Create a Docker image with the model and environment.
5. Deploy the image and run the model in a Docker container.
6. Run and use the model via an API.
