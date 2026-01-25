---
title: "Model Governance"
description: "Model Governance"
tags: 
- Machine Learning
- MLOps
sidebar_position: 32
last_update:
  date: 5/14/2023
---


## Overview

Model governance provides proper oversight of ML models, especially when decisions have high consequences.

- Manages access, policies, and activity tracking.
- Reduces business risks and maintains reputation.

While it may slow down development, model governance ensures safe and valuable ML model use.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-20-110011.png)

</div>


## Design Phase

In the design phase, we address questions like:

- When is it ethical to use ML models?
- How do we ensure privacy and control over sensitive data?
- How do we avoid model bias?

## Development Phase

During development, we focus on:

- Documenting the model selection process.
- Ensuring data quality and versioning.
- Making the model reproducible for testing and future use.

## Pre-Production

Before production, we must:

- Prove the model's API is secure.
- Set up monitoring and alerting systems.
- Plan for failure handling and define who is responsible for each action.

This phase ensures that the model is secure and can be maintained once live.

## Regulatory Considerations

Some industries, like finance, require strict compliance with regulations to avoid penalties. The risk level of the model impacts how stringent the governance needs to be.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-20-110338.png)

</div>

Higher-risk models, like those for detecting fraud, face more governance requirements than low-risk models, such as product recommendations.


