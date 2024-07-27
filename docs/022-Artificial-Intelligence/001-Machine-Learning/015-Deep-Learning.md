---
title: "Deep Learning"
description: "Notes from DataCamp's Understanding Machine Learning Course"
tags: [Data Engineering, Data Science, Machine Learning, Deep Learning]
sidebar_position: 15
last_update:
  date: 2/27/2022
---




## Overview

Deep learning involves using algorithms called **neural networks**, which are inspired by how human brains work. These networks consist of interconnected nodes or neurons that process data and learn patterns.

- Neurons, also known as nodes, are the basic units of these networks
- Solves complex problems but requires large amounts of data
- Best suited for less structured inputs like large texts or images

## Case Study: Box Office Revenue

Deep learning can be applied to real-world problems, like predicting the box office revenue of a movie based on various factors.

- **Simple Model Example**
  - Predicting box office revenue based on production budget
  - A straight line through data points shows the relationship between budget and revenue
  - This is a prediction from a simple model
  - Neural network might use budget as input to predict revenue

- **Adding More Data**
  - More information available: advertising spend, star power, timing of release
  - Leads to a more complex neural network

In a neural network, different neurons handle different aspects of the data. 

- **First Neuron**: Estimates spend based on budget and advertising costs
- **Second Neuron**: Tracks awareness from advertising and star power
- **Third Neuron**: Considers distribution decisions, budget, advertising, and release timing
- **Final Neuron**: Takes outputs from previous neurons to estimate box office revenue

We can better understand this from the diagram below: 

![](/img/docs/deeplearning-predicting-box-office-revenue.png)


## Training the Neural Network

Training a neural network involves feeding it data and allowing it to learn the relationships between different inputs and outputs.

- Training data is input to figure out relationships between neurons
- Neural network learns by testing and analyzing these relationships

## Deep Learning

Deep learning involves using much larger neural networks, enabling the computation of very complex functions.

- Real networks are much larger, with thousands of neurons
- Stacking many neurons enables computation of complex functions
- Provides accurate mappings from input to output

    |![](/img/docs/ml-deeplearning-million-neurons.png)|
    |-|


## When to Use Deep Learning?

Deep learning is powerful but should be chosen based on specific conditions.

- Best for large datasets
- Requires powerful computers for training
- Excels in areas with lack of domain knowledge, as it identifies features for you
- Shines in complex problems like computer vision and natural language processing