---
title: "Azure App Service"
description: "Fully managed platform as a service (PaaS)"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 10
last_update:
  date: 11/16/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::



## Overview 

When it comes to hosting websites on Azure, there are several options available, each catering to different needs. 

- For static websites without user interactions, Azure Storage is a suitable choice. 

- For more sophisticated requirements, deploying on Azure virtual machines with content management systems or utilizing Azure Kubernetes Service for microservices-based applications are viable options.

However, the most popular and versatile way is through **Azure App Service**. App Service is a platform-as-a-service (PaaS) offering that simplifies web application deployment while providing flexibility and a rich set of features. 

- It manages the underlying infrastructure, alleviating concerns such as operating system patching.
- Frameworks come preinstalled and are automatically updated with new patches or releases.
- Most frameworks allow choosing between Windows and Linux hosting.
- For applications in different programming languages, App Service supports Docker containers with required dependencies.

## Additional features

- Well-integrated with Visual Studio and Visual Studio Code.
- Seamless integration with continuous integration/continuous delivery tools such as Azure DevOps, GitHub, and BitBucket.
- App Service can host mobile backends and APIs.
- Guarantees 99.95% uptime in most cases.
- Configurable to automatically scale resources based on demand.
- Provides authentication capabilities for restricting access to authorized users.
- Enables control over allowed or denied IP addresses for site access.

## Supported languages

- ASP.NET
- ASP.NET Core
- Java
- Ruby
- Node.js
- PHP
- Python

 

## App Service Plan 

When using Azure App Service, one of the critical decisions is configuring the **App Service Plan**. This defines the type of infrastructure your web application will utilize. The three primary settings to decide in an App Service Plan are the following:

- **Operating System**
   - Choose between **Windows or Linux** based on your application's compatibility and requirements.

- **Region**
   - Select the region closest to your target audience for optimal performance.
   - Note: The region is immutable; you can't change it after the plan is created.

- **Pricing Tiers**
   - Pricing tiers determine compute resources, features, and costs associated with the App Service Plan.
   - The tiers include Free, Shared, Basic, Standard, Premium, and Isolated.


### Pricing Tier 

1. **Free Tier**
   - Suitable for development and testing.
   - Provides up to 60 CPU minutes per day.
   - Shared compute resources.

2. **Shared (D1) Tier**
   - Offers up to 240 CPU minutes per day.
   - Shared compute resources.
   - Allows the use of a custom domain.

3. **Basic Tier**
   - Apps run on dedicated virtual machines.
   - Various options based on CPU cores and memory.
   - All options come with 10 GB of storage.

4. **Standard Tier**
   - Similar to Basic tier but with 50 GB of storage.
   - Supports autoscaling.
   - Allows up to 10 VM instances.

5. **Premium Tier**
   - More CPU, memory, and storage options.
   - Supports autoscaling.
   - Allows up to 30 VM instances.

6. **Isolated Tier**
   - Provides a private, dedicated environment.
   - VMs in their own virtual network, isolated from other App Service instances.
   - Allows up to 100 VM instances.

### Scaling

- **Scaling Out (Horizontal Scaling)**
  - Add more virtual machine instances, up to the limit of the selected pricing tier.
  - Multiple apps within the same service plan share compute resources.

- **Scaling Up (Vertical Scaling)**
  - Switch to a pricing tier with more powerful instances or a higher limit on the number of instances.
  - Easy to perform, taking effect in seconds.

### Considerations

- **Multiple Apps in a Service Plan**
  - Possible, but all apps share the same compute resources.
  - Excessive apps in one plan may lead to performance issues.

- **Scaling Strategies**
  - Choose between scaling out (horizontal) and scaling up (vertical) based on performance needs.
  - Autoscaling is a more advanced scaling strategy covered in a separate course.


 


## Resources 

- [Learning About Azure](https://cloudacademy.com/learning-paths/learning-about-azure-5663/) 



