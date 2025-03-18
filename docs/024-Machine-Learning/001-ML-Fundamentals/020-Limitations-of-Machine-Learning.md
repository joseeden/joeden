---
title: "Limitations"
description: "Notes from DataCamp's Understanding Machine Learning Course"
tags: [Data Engineering, Data Science, Machine Learning, Deep Learning]
sidebar_position: 20
last_update:
  date: 5/4/2023
---


## Overview

Machine learning has impressive capabilities, but it also has limitations: 

- Data quality 
- Explainability

## Data Quality

The quality of input data is important for machine learning models.

- "Garbage in, garbage out" means poor data leads to poor results
- Bad data can produce inaccurate, incomplete, or incoherent outputs

Importance of scrutinizing your model's output.

- Never blindly trust your model
- Awareness of data's role is important for machine learning projects
- The model's performance is only as good as the input data quality

Ensuring high-quality data involves several steps.

- Data analysis: Examining characteristics, distribution, source, and relevance
- Reviewing outliers and suspicious data
- Involving domain experts to explain unexpected patterns
- Documenting processes to ensure transparency and repeatability

## Explainability

Another significant limitation of machine learning is explainability.

- Machine learning models are often viewed as black boxes
- Transparency in AI reasoning is necessary for trust and understanding

Sometimes there is a need for AI systems to be transparent about the reasoning it uses, to increase trust, clarity, and understanding. 

- Business adoption: Explaining models to customers
- Legal compliance: Adhering to data regulations
- Bias detection: Faster and more accurate identification of biases

Despite its accuracy, Deep learning often lacks explainability.

- Deep learning models can make precise predictions without clear reasons
- Explainable AI methods help us understand prediction factors

## Examples

### Explainable AI in Healthcare

Explainable AI can provide valuable insights, such as in a hospital setting.

- **Prediction**: A traditional model can predict Type 2 diabetes onset
- **Inference**: Highlights important features, factors like blood pressure


### Inexplicable AI in Handwriting Recognition

In some cases, like handwriting recognition, explainability is less critical.

- Recognizing letters accurately is more important than understanding why
- Deep learning is ideal for such tasks due to its high accuracy without needing explanations