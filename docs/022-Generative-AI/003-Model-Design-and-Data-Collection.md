---
title: "Developing the Model"
description: "Notes from the Gen AI Introductory course from DataCamp"
tags: [Generative AI]
sidebar_position: 3
# last_update:
#   date: 1/30/2024
---



## Overview

Developing new generative AI models involves four key steps:

1. Research and design to decide on a model architecture.
2. Training data collection and preparation.
3. Model training.
4. Model evaluation.


### Stable Diffusion

Stable Diffusion is an example of an image generative AI model. It was designed to generate unique and aesthetic images from any text prompt. Their development process included:

- **Defining Purpose** 

    - Create an accessible AI tool to inspire creativity through image generation.
    
- **Architecture Design** 

    - Researchers chose a diffusion model to create images from static.
    
- **Resource Planning** 

    - It required hundreds of GPUs running in the cloud for 100,000+ hours.

Considerations during the esearch and development stage:

1. Core purpose and use cases
2. Model architecture 
3. Computational resources 
4. Financial budget

:::info[Note]

At the research stage, the data has not yet been collected, so it is too early to decide how to deal with poor-quality data.

:::



### Data Collection

Generative AI models need massive amounts of data to learn to generate new content, unlike discriminative models that classify existing data. For example, Stable Diffusion used 2 billion images (100 TB of data). The data must be diverse to represent the domain accurately. In addition to this, data must be adjusted for quality and format, such as resizing images.

### Privacy and Security

Privacy is critical during data collection due to user-generated content that may include personally identifiable information (PII). Measures include:

- Anonymize, remove individual details, e.g., blurring faces in security footage.
- Implementing measures to prevent unauthorized access and misuse of data.
- Store in secure location with controlled access.
- Ensuring data collection adheres to copyright and ownership laws.


## Model Training 

### Choose Your Training Method

Training AI models can be compared to traveling. It involves three main components:

1. **Hardware (Mode of Transportation):** 
   - Personal laptop: Walking
   - Local GPUs: Driving a car
   - Server farm of TPUs: Jet plane

2. **Time (Travel Distance):** 
   - Larger datasets, complex models, and more training rounds require more time.

3. **Cost (Travel Expense):** 
   - Walking is free, but faster modes of transportation cost more.

:::info[various factors]

Various factors that impact model training time:

- Using GPUs or TPUs decreases training time.
- Increasing the number of training rounds increases the training time.
- A more complex model architecture increases training time.

:::


### Advanced Training Techniques

Training a foundational AI model is just the start. Advanced techniques are used to specialize these models for specific tasks. Similar to how students gain work experience after graduation, these techniques include:

1. **Transfer Learning and Fine-tuning**
   - Uses a pre-trained model's knowledge to learn new tasks quickly.
   - Since tasks are related, it leverages existing knowledge to learn the new task.
   - Also, since model already has the knowledge, it doesn't need to start from scratch.
   - Fine-tuning is teaching a pre-trained model a small dataset.
   - Example: Fine-tuning a house cat image generator to generate lions.

    ![](/img/docs/gen-ai-from-cats-to-lions.png)

2. **Reinforcement Learning with Human Feedback (RLHF)**
   - User feedback is collected and used to further train the model.
   - Positive feedback encourages similar responses.
   - Negative feedback discourages them.
   - Example: A thumbs-up feedback tells the chatbot to generate a similar response for similar prompts while a thumbs-down does the opposite.

    ![](/img/docs/gen-ai-rlhf-thumbs-down.png)

3. **Embeddings**
   - Create unique representations of data entities within the model.
   - Data entities may be words, objects, people, etc.
   - Captures meaning, context, and relationship in compact form.
   - Helps the model process and understand data more efficiently.

### Embeddings in Practice

Embeddings are like fingerprints that help the model recognize specific patterns. For example:

- A headshot generator AI can be trained to recognize specific individuals.
- This allows the model to create various portraits in different styles.
- Embeddings can be applied to other data types, not just images.
- This makes them a versatile tool in advanced AI training.

## Model Evaluation