---
title: "Responsible Use of AI"
description: "Notes from the Gen AI Introductory course from DataCamp"
tags: 
- Generative AI
sidebar_position: 4
# last_update:
#   date: 1/30/2024
---



## Social Bias

Social bias in AI refers to systematic unfairness that typically affects certain groups. As generative AI becomes more integrated into everyday life, these biases can lead to significant social consequences. Fairness is subjective and varies among different people, but focusing on shared human values can help develop and apply AI that aims for unbiased outcomes.

- an AI involved in hiring might favor candidates with certain names
- an AI in healthcare might be trained on data that does not represent the broader population. 

Bias can manifest in three main areas within AI systems:

1. Training Data
2. Model Design
3. Model Application

### Training Data Bias

Bias in training data arises from a lack of diversity or misrepresentation of groups, leading to skewed outputs. A model will generate outputs based on its training data. For example, if a model is trained only on purple squares, it will only produce purple squares. Diverse training data, however, allows for a broader range of outputs.

<div class="img-center"> 

![](/img/docs/gen-ai-social-bias-training-data-bias.png)

</div>


### Model Design Bias

Bias can also stem from assumptions or optimization choices during model design. For instance, a generative AI created to write political speeches might stir up group rivalries to win an election. Even with unbiased training data, the model's narrow goals can result in biased outcomes.


<div class="img-center"> 

![](/img/docs/gen-ai-social-bias-model-design-bias.png)

</div>


### Application Bias

Bias can occur if users apply AI in harmful or unfair ways. For example, users might use prompting tricks to create fake videos that promote biased narratives. Even an unbiased AI can lead to biased outcomes when used maliciously.

<div class="img-center"> 

![](/img/docs/gen-ai-social-bias-application-bias.png)

</div>


## Detecting Bias

Identifying bias is the first step in addressing it. Key techniques include:

- **Representation Analysis**
    - Comparing how the model refers to different groups.
    - Example: Checking for gender-biased language.

- **Fairness Metrics**
    - Evaluating models for equal treatment, opportunity, and accuracy across groups.
    - These metrics can detect subtle biases that humans might miss.

- **Human Audits**
    - People reviewing a model's outputs to identify biases.

## Mitigating Bias

Various strategies can help address bias:

- **Diversifying Training Data**
    - Ensuring that underrepresented groups are included.

- **Adjusting Models**
    - Prioritizing data from underrepresented groups.

- **Adversarial Training**
    - Using a separate model to detect and correct bias in the generative AI.

- **Continuous Evaluation and Improvement**
    - Regularly updating models with new anti-bias techniques.
    - Engaging diverse stakeholders to identify and address potential biases early.



## Law vs. AI

As AI becomes increasingly creative and independent, determining rights and responsibilities for AIs and their creations will only become more important and more difficult. Intellectual Property law has been around for centuries, but how does it apply to AI-generated content? As generative AI advances, the legal landscape is evolving to address new challenges. Three legal areas are significantly impacted:

- Intellectual Property Determination
- Privacy Implications
- Evolving Industry Norms and Government Regulations

### Intellectual Property Best Practices

Copyright and IP laws were designed for human creators, not AI systems. With AI independently producing content like art, music, and academic research, determining ownership becomes crucial. Here are some best practices:

- **Check Copyright Status**
  - Always verify the copyright status of data used to develop AI systems.
  - Example: A code-generating AI trained on others' code without permission may face legal issues.
  
- **Engage Legal Professionals**
  - Legal experts can help navigate the evolving copyright landscape and mitigate risks.
  
- **Stay Updated**
  - Keep up with the latest developments in AI and copyright law as regulations may vary by region and change over time.
  - Ignorance of the law does not excuse violations or privacy breaches.

### Privacy Implications

Privacy is a major concern with AI-generated content. Consider these points:

- **Read Terms of Use**
  - Understand how developers store and use user data.
  
- **Consider Privacy Implications**
  - Be mindful of what you share, as it may be used in future model training.
  
- **Local Models**
  - Running models on local computers or private servers ensures data privacy.

### Evolving Industry Norms

Each industry is adapting to generative AI differently:

- **Creative Fields**
  - Fears of AI replacing human jobs have led to protests in the movie industry.
  
- **Medical Research**
  - Rapid AI adoption is leading to major breakthroughs.
  
- **Adaptation**
  - Understanding and adapting to specific industry norms is essential.

### Evolving Regulations

The legal landscape for AI is an active patchwork of new laws emerging at different paces across various regions. 

- **Regional Variations**
  - Laws may depend on where users are, where servers are located, and where the developer is based.
  - Example: EU regulations enforce privacy restrictions for EU user data even if the developer is not based in the EU.
  
- **Stay Informed**
  - Keeping up with the latest legal changes is crucial as the landscape rapidly evolves.
  

## Malicious Use

Generative AI can be used maliciously to manipulate society, especially during critical times like elections. Imagine on the eve of an election, numerous videos appear online showing a candidate resigning, making offensive remarks, or committing crimes. Here are some example of malicious uses of AI:

- **Deepfakes**
  - Synthetic media depicting events that never happened.
  - Defame individuals, influence public opinion, and undermine truth.
  - Example: A viral image of Pope Francis in a puffer jacket.

- **Misinformation Campaigns**
  - AI can create and spread false content on social media.
  - Manipulate opinions or decisions.

- **Enhanced Hacking**
  - Malicious actors using AI to access critical infrastructure.
  - Devastating impacts if poorly moderated AI is used irresponsibly.

### Prevention

To prevent negative outcomes, apply these principles:

- **Human-in-the-Loop**
  - Ensure humans review AI-generated output.
  - Example: A human editor reviews a generated news article before publication.

- **Harm Prevention**
  - Proactively limit malicious behavior.
  - Example: Reject prompts associated with harmful content.

- **Regular Review and Updates**
  - Continuously update AI products to address new problems and norms.

### Access Controls 

Developers can adopt practices like **Know Your Customer (KYC)** to verify user identities at sign-up. This first line of defense helps prevent fraud and illicit use by ensuring only legitimate entities gain access.

### Prompts and Responses 

In addition to practices mentioned above, developers should also monitor both prompts and responses for abuse:

- **Block Calls to Violence and Hate Speech**
  - Ban offending users.
  
- **Screen Generated Responses**
  - Prevent users from subverting guidelines with jailbreaking prompts. 

### Application

Despite best efforts, malicious actors might misuse AI for illegal or unethical activities. Developers can:

- **Watermark Content**
  - Use invisible signatures to identify AI-generated content.
  
- **Law Enforcement Intervention**
  - Address activities beyond developers' control.

### Communications and Feedback

Best practices for responsibility needs to evolve as generative AI evolves. Developers need to engage key stakeholders through:

- **Clear Usage Guidelines**
  - Provide accessible guidelines for customers, end users, and regulators.

- **Regular Feedback Loops**
  - Assess the impact of AI applications on stakeholders.
  - Conduct roundtables and partner with civil society to address concerns.
  - Build feedback opportunities directly into the product. 