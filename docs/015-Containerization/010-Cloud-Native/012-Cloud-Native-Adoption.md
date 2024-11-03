---
title: "Cloud Native Adoption"
description: "Being Cloud Native"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 12
last_update:
  date: 7/7/2022
---


## Business and Technical Considerations

Adopting cloud-native practices means consideration alot of factors, specifically business and technical keypoints, which would need to be assessed by all the stakeholders.

From a business perspective, the adoption of cloud-native tooling represents:

- **Agility** - perform strategic transformations
- **Growth** - quickly iterate on customer feedback
- **Service availability** - ensures the product is available to customers 24/7

From a technical perspective, the adoption of cloud-native tooling represents:

- **Automation** - release a service without human intervention
- **Orchestration** - managing thousands of services with minimal effort
- **Observability** - ability to independently troubleshoot and debug each component


## Design Considerations

It is necessary to allocate time at the start to identifying the design factors ensure that the application will be built and maintained with minimal engineering effort.

1. **List all requirements**
    In this phase, we determine the following:
    - Stakeholders - *who will sponsor the project?*
    - Functionalities - *what functions should be included?*
    - End users - *For whom is this service?*
    - Input and Output Process - *What will be the flow?*
    - Engineering Teams - *Who are needed in doing the project?*


2. **List all available resources**
    Here we determine what is the context of implementing these functionalities.
    - Engineering resources - *Who can work on the project?*
    - Financial resources - *How much is the budget?*
    - Timeframes - *How soon do we want the project to finish?*


## Deciding the Model

After the requirements are carefully reviewed, we can now start deciding which model we'll use: **monoliths** or **microservices**.


<div class='img-center'>

![](/img/docs/udacity-suse-2-monoliths-micro.png)

</div>

Typically, there will be three tiers in an application:

<!-- ![](../../Images/udacity-suse-2-apptier.png) -->

- **UI (User Interface)** - handles HTTP requests and responses
- **Business logic** - contains code that provides service to the users
- **Data layer** - implements access and storage of data objects

In a monolithic architecture, application tiers can be described as:

- part of the same unit
- managed in a single repository
- sharing existing resources (e.g. CPU and memory)
- developed in one programming language
- released using a single binary
 

<div class='img-center'>

![](/img/docs/all-things-docker-k8s-monolith-vs-microservice.png)

</div>

In a microservice architecture, application tiers can be described as

- Tiers are managed independently
- Managed in a separate repository
- Own allocated resources (e.g. CPU and memory)
- Well-defined APIs for connecting to other units
- Implemented using the programming language of choice
- Released using its own binary
  
The main point of microservices is to break the software into smaller chunks, allowing developers to work on a piece of the code and release on their own cycle, which in turn speeds up development. This kind of architecture also enables the software to scale independently.

<div class='img-center'>

![](/img/docs/all-things-docker-k8s-microservice-booking-application.png)

</div>


## Tradeoffs

Depending on which model we choose, each one will have their own set of tradeoffs:

| Tradeoffs               | Description                                                                                  | Monoliths                                                                                                                               | Microservices                                                                                                                          |
|-------------------------|----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| **Development Complexity** | Effort required to deploy and manage an application.                                      | - One programming language  <br /> ▪️ One repository <br /> ▪️ Sequential development                                                        | - Multiple programming languages <br /> ▪️ Multiple repositories <br /> ▪️ Concurrent development                                           |
| **Scalability**         | Scaling up or down, based on incoming traffic.                                               | - Entire stack is replicated <br /> ▪️ High resource consumption                                                                         | - Single unit is replicated <br /> ▪️ On-demand resource consumption                                                                     |
| **Time to Deploy**      | Time needed to build a pipeline for shipping features.                                       | - One pipeline for entire stack <br /> ▪️ Higher risk per deployment, lower velocity                                                     | - Multiple pipelines for separate units <br /> ▪️ Lower risk per deployment, higher velocity                                             |
| **Flexibility**         | Ability to adapt to new tech and functionalities.                                            | - Low rate <br /> ▪️ Entire stack may need restructuring for new features                                                                | - High rate <br /> ▪️ Changes to independent units are straightforward                                                                   |
| **Operational Cost**    | Cost of resources required to release and maintain the product.                              | - Low initial cost <br /> ▪️ Single codebase and pipeline to manage <br /> ▪️ Cost increases significantly at scale                          | - Higher initial cost <br /> ▪️ Multiple repositories and pipelines <br /> ▪️ Scaling cost proportional to consumed resources               |
| **Reliability**         | Practices for recovery and tools to monitor the application.                                 | - Entire stack recovers together <br /> ▪️ Low visibility into individual functionality logs and metrics                                 | - Only failed unit needs recovery <br /> ▪️ High visibility into logs and metrics for each unit                                          |
