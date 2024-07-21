---
title: "Generative AI"
description: "Notes from the Gen AI Introductory course from DataCamp"
tags: [Generative AI]
sidebar_position: 1
# last_update:
#   date: 1/30/2024
---


## Overview 

Generative AI is a new domain producing technologies that can bring our ideas to life using various models. These tools range from those that create magazine covers to others that converse as humans would. Generative AI tools are rapidly bringing new creative capabilities to the mainstream.

**What is Generative AI?**
- Machine learning models that generate new content based on data they've seen.
- Examples:
    - Google Bard: Generates text in response to user questions.
    - Facebook Make-a-Video: Creates videos for filmmakers using descriptive prompts.
    - Replit Ghostwriter: Writes code to help developers work faster.

### How it works

Generative AI models work by taking a prompt as input. This prompt is a piece of data that guides the model to complete its task. The model processes the prompt and generates a response similar to the data it has already seen.

![](/img/docs/gen-ai-how-it-works.png)

Steps:

1. Input prompt
2. Run the model
3. Get the response 
4. Use the model utput

Examples:

- **Creating Images**
  - A generative AI model can take a prompt describing a picture of a female astronaut and produce the image, like the Dall-E model used for Cosmopolitan Magazine.

    ![](/img/docs/gen-ai-creating-img.png)

- **Holding Conversations**
  - Another model can write an imagined conversation between the Sun and Pluto, as demonstrated by Facebook's LLaMA model.

    ![](/img/docs/gen-ai-holding-conversation.png)

- **Input Beyond Text**
  - Prompts aren't limited to text. For example, a model can take an image of a person walking on a beach, process it, and output the same beach image with the person removed, as seen with Runway ML's InPainting Tool.

    ![](/img/docs/gen-ai-input-beyond-textss.png)

### Real-World Applications

They can:

- Draft sales outreach emails
- Analyze financial data
- Generate marketing ads for testing
- Assist legal professionals in sifting through regulations
- Customize educational experiences
- Support medical practitioners in analyzing medical data
- Automate repetitive tasks in industrial engineering and design
- Generate 3D objects for games

### The End of Work?

While there are concerns about AI taking over jobs, there are still limitations and risks associated with this technology. Understanding these technologies can open new ways to utilize them in our daily and professional lives. 

## Generative AI in the Machine Learning Landscape

### Models that Analyze

Many ML models, known as **discriminative models**, differentiate between inputs. They answer closed-ended questions with predefined answers. For instance, a model can identify if an image is of a puppy or a bagel by learning from training data.

Example: Training a model with labeled pictures of puppies and bagels. Millions of images might be needed in real settings to teach the algorithm the difference.

<div class="img-center"> 

![](/img/docs/gen-ai-discriminative-models.png)

</div>

With enough data, the model can tell the difference between new images, but it can only express its confidence in its guess.

### Models that Imagine

**Generative models**, on the other hand, generate new content based on predictions. They also require training but can create new content similar to their training data. If asked for a puppy image, a generative model will produce one resembling the training data.

<div class="img-center"> 

![](/img/docs/gen-ai-generative-models.png)

</div>


### Combining Models

Generative AI combines discriminative and generative models along with other techniques. These models work together like parts of a machine to produce high-quality responses, resulting in creative works.

![](/img/docs/gen-ai-gans.png)


### Generative Adversarial Networks (GANs)

GANs train a generative model and a discriminative model together. They compete, with one trying to trick the other. After each round, they compare notes and improve. Over time, the generator gets good at creating convincing images that fool the discriminator.

<div class="img-center"> 

![](/img/docs/gen-ai-gans.png)

</div>

:::Info[remember]

GAN consists of two models in competition:

- A generator model tries to create fake data that looks indistinguishable from real data
- A discriminator model tries to tell the difference between real and fake data

:::


Example: The generator creates bagel images that look so much like puppies (or vice versa) that they fool the discriminator.

<div class="img-center"> 

![](/img/docs/gen-ai-gans-2.png)

</div>


### Artificial General Intelligence (AGI)

A goal of AI is to create AGI, which exhibits human-like intelligence. AGI would have broad knowledge, reason across domains, interact socially with humans, think creatively, and possess cognitive skills like sight and language.

### Choosing the Right Tool

Understanding the differences helps in choosing the right model:


- **Discriminative Models:** 

    - Predict weather
    - Categorize books
    - Classify images

- **Generative AI:** 

    - Create website code
    - Customer service responses, images.

- **AGI:** 

    - Potentially complete human jobs in the future.
    


