---
title: "Deployment"
description: "Preparing the model for deployment"
tags: 
- Machine Learning
- MLOps
sidebar_position: 20
# last_update:
#   date: 7/7/2022
---


## Preparing for Deployment  

Before deploying a machine learning model, we need to ensure it runs smoothly in production. This includes managing different runtime environments and using containers for consistency.  

## Development vs. Production  

Models go through different stages before deployment.  

- **Development**: Models are trained using sample data on a local machine or cloud.  
- **Production**: Deployed models process real-world data and make real-time predictions.  

Before full deployment, models may also run in a **testing environment** to identify and fix issues. However, differences in runtime environments can still cause problems.  

<div class="img-center"> 

![](/img/docs/all-things-data-Page-21.png)

</div>


<!-- <div class="img-center"> 

![](/img/docs/testing-environment.png)

</div> -->

## Runtime Environments  

Development and production environments may have different software setups, which can lead to errors or performance issues.  

- Different Python versions, libraries, or dependencies can break the model.  
- Hardware, operating systems, or resource limitations may affect speed and accuracy.  

To solve this, we use **containers**.  

## Using Containers  

A container packages a program with all its dependencies to ensure consistent performance across environments.

- Works the same across different environments.  
- Build once, run anywhere.  
- Starts quickly with only necessary components.  

For more information, please see [Containerization.](/docs/015-Containerization/015-Docker/001-From-VMs-to-Containers.md)

## Microservices Architecture  

Before deploying a machine learning model, we need to decide how to structure the system. This involves choosing between a monolithic or microservices architecture.  

- **Monolith**: All services run as a single application.  
- **Microservices**: Services are independent and deployed separately.  

A monolithic system can become complex and difficult to scale because all parts are tightly connected. If one part fails, the whole system may go down. On the other hand, microservices allow individual services to fail without affecting the entire system, making them more flexible. However, they require more resources and maintenance.  

<div class='img-center'>

![](/img/docs/udacity-suse-2-monoliths-micro.png)

</div>


## Inferencing  

Machine learning models are often deployed as microservices, allowing them to process new data and make predictions independently. This process, called **inferencing**, involves sending input, like customer data, to the model and receiving an output, such as the likelihood of a customer churning.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-18-231406.png)

</div>


## APIs for Communication  

Microservices rely on APIs to communicate and define how they interact with each other.  

- **With API**: Think of an API like a bridge between two islands, allowing information to travel back and forth.  
- **Without an API**: Without this bridge, services can't exchange information properly, leading to confusion and errors.  

Using APIs ensures that services can communicate clearly and work together efficiently.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-18-231737.png)

</div>

Here’s an example of how an API request works with a machine learning model:

1. New input data is received.  
2. The data is sent to the API.  
3. The API forwards the data to the machine learning model.  
4. The model generates a prediction based on the data.  
5. The prediction is sent back to the API.  
6. The API sends the prediction to the application.  