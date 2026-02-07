---
title: "Microsoft Azure Overview"
description: "A 10,000 ft view of Microsoft Azure"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 1
last_update:
  date: 11/16/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::


## Overview 

Microsoft Azure is a collection of online services for application development and hosting. 

- Eliminates the need for personal data centers; operates in Microsoft's global data centers.
- Pay-as-you-go model based on actual usage.
- Flexible resource scaling up and down as needed.

![](/img/docs/azure-complete-services.png)


### Compute Options

- Virtual Machines (VMs) for traditional IT infrastructure.
- Azure App Service for web and mobile applications.
- Azure Functions for serverless execution of individual functions.
- Azure Container Instances for simplified container deployment.
- Azure Kubernetes Service for managing multi-container applications.

### Storage Solutions

- Blob Storage for unstructured data with hot, cool, and archive access tiers.
- Azure File Storage for hierarchical file storage.
- Azure Data Lake Storage Gen2 for Hadoop-compatible storage in data analytics.

### Database Services

- Azure SQL Database for relational databases.
- Azure Database for MySQL, MariaDB, and PostgreSQL for open-source databases.
- Cosmos DB for globally scalable NoSQL databases.
- Azure Cache for Redis for caching frequently requested data.

### Network Services

- Virtual Networks (VNets) for VMs with IP addresses, subnets, and route definitions.
- VNet peering for communication between VMs in different VNets.
- VPN or Azure ExpressRoute for secure connections to on-premises networks.

### Additional Services

- Beyond core compute, storage, and networking, Azure offers services in areas like artificial intelligence and DevOps.

  

## Comparison of AWS and Azure Services

| TOPIC      | AWS                                      | AZURE                          | FUNCTIONALITY                                                                                                                                                                                                                                         |
| ---------- | ---------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Compute    | Amazon EC2                               | Azure Virtual Machines         | Manage your own virtual machines, IaaS, this is the services you are looking at.                                                                                                                                                                      |
|            | AWS Lambda                               | Azure Function                 | Need to execute a bit of code, but you don’t need a dedicated virtual machine for that. You can go server-less and use Azure functions or Lambda.                                                                                                     |
|            | AWS Elastic Beanstalk                    | Azure App Services             | Running applications in the cloud, without having to worry too much about the servers they are running. They will have dedicated virtual machines under the hood.                                                                                     |
| Containers | AWS Fargate                              |                                | Serverless container orchestration.                                                                                                                                                                                                                   |
|            | AWS ECS Elastic container service        | Azure Container Instances      | PaaS fully managed container orchestration service. You will still have the virtual machine cluster.                                                                                                                                                  |
|            | Amazon EKS (Elastic Kubernetes Service)  | AKS (Azure Kubernetes Service) | Kubernetes as a service, with the dedicated virtual machine cluster.                                                                                                                                                                                  |
| Storage    | Amazon S3 (Simple storage service)       | Azure Blob Storage             | To store files. This service is region-less in AWS and region-specific in Azure.                                                                                                                                                                      |
|            | Amazon Elastic Filesystem (EFS)          | Azure File Storage (SMB)       | EFS is a filesystem while Azure Files is a SMB-storage-as-a-service.
| Security   | IAM Roles                                | Azure AD                       | For access-control, in Azure, you would have Service Principals registered in Azure Active Directory, in AWS you will have roles configured in IAM. Both support a similar permissions model.                                                         |
|            | AWS Cognito                              | Azure AD B2C                   | For when you want to implement Single sign-on from external providers like Twitter, Facebook or Active Directory.                                                                                                                                     |
|            | AWS KMS (Key Management System)          | Key vault                      | Add the secret and only permit the specific people. secrets managements                                                                                                                                                                               |
|            | AWS Trust Advisor                        | Azure Advisor                  | Provide recommendations for reducing costs and managing security.
| Logs       | AWS CloudTrail                           | Azure Activity log             | Stores the logs of what actions have been done against resources, for example when a new virtual machine is started.                                                                                                                                  |
| Databases  | Amazon RDS (Relational databases server) | Azure SQL Database             | PaaS relational database servers                                                                                                                                                                                                                      |
|            | Amazon Dynamo DB                         | Azure Cosmos DB                | NoSql fully managed instances by both cloud providers, both work as key-value or document stores.                                                                                                                                                     |
|            | Amazon ElastiCache                       | Azure Cache for Redis          | When your application could use a distributed caching layer with low latency. This is PaaS, so you don’t need to worry about maintaining the cache cluster.                                                                                           |
|            | Amazon Redshift                          | Azure Synapse Analytics        | Used for data warehousing
| Networking | Amazon VPC (Virtual private cloud)       | Virtual Networks (VNet)        | Azure you have the concept of VNets, the major difference is that in AWS most services can be easily added into a VNet.                                                                                                                               |
|            | AWS Site-to-Site VPN                     | Azure VPN                      | Connection between your VPC/VNet and your own on-premises network. 
|            | AWS Direct Connect                       | Azure ExpressRoute             | Supports connectivity between VPC/Vnet and an on-premises network
|            | Amazon Route 53                          | Azure Traffic manager          | Service for setting routes at DNS level.                                                                                                                                                                                                              |
|            | Amazon API Gateway                       | API Management                 | Concept of API gateways, rather than having one client having to know about many backend services, you can add an API Gateway layer                                                                                                                   |
|            | Amazon CloudFront                        | Azure CDN                      | Content delivery networks are important when performance is key for your web applications. Rather than leaving your static files in your application virtual machines, we can use a dedicated resource for handling content distribution and caching. |
| Integration| AWS SQS                                  | Azure Service Bus              | When you have a simple queue, one publisher and one consumer.                                                                                                                                                                                         |
|            | AWS SNS                                  | Azure Event Grid               | SNS works in the publisher/subscriber pattern, so you could argue that is also equivalent to Azure Service Bus, because you could have multiple subscribers with their own SQS queue.                                                                 |
|            | AWS Step Functions                       | Azure Logic Apps               | Serverless orchestration tool to build and manage cloud-based multistep application workflows using a visual interface for business-critical processes
|            | AWS Kinesis                              | Azure Event hub                | You are dealing with a high throughput queue.                                                                                                                                                                                                         |
| Devops     | AWS DevOps                               | Azure DevOps                   | Host your code with GIT or TFS. AWS has CodeCommit for this.                                                                                                                                                                                          |
|            | AWS CloudFormation                       | ARM Templates/blueprints       | Creating your resources in the cloud for test purposes is fine                                                                                                                                                                                        |
|            | AWS Cloud 9                              | Azure console                  | In Azure you have the option to have a bash/Powershell for writing commands, I found that AWS Cloud 9 provides you with a full own mini IDE environment                                                                                               |
| Monitoring | Cloud Watch                              | Azure Monitor                  | Services need to report metrics, for example, the CPU percentage of the running virtual machines                                                                                                                                                      |
|            | X-Ray                                    | App Insights                   | what is going on your application, being able to see called requests, response times, success rates and dependency calls.  |

  


## Subscriptions and Billing 

When you sign up for Azure, Microsoft creates a billing account and a subscription. These are easily confused, as both are related to billing. 

### Subscription

- A subscription is a collection of Azure resources and are charged in the same monthly bill.
- It serves as the basis for billing, allowing Microsoft to charge for the resources used in Azure.
- Each resource created in Azure is linked to a subscription, and it's possible to have multiple subscriptions.
- However, each resource can only belong to one subscription.

### Billing Account

- To facilitate billing, a billing account is needed, containing payment details like credit card information. 
- Each subscription must be linked to one billing account, but multiple subscriptions can be linked to a single billing account, making it easier to manage costs.

Reasons for having both:

- Multiple subscriptions within a billing account for departmental invoicing.
- Isolation of resources in different subscriptions for security or compliance.

### Subscription Types

**1. Free Trial Subscription**

    - Offers limited free usage of certain Azure services each month.
    - Provides a $200 credit for other Azure services.
    - The credit is valid for 30 days, and after that, an upgrade to pay-as-you-go is required.
    - Only one free trial per customer is allowed.
    - After 12 months, the monthly allotment of free services ends.

**2. Pay-As-You-Go Subscription**

    - Allows payment for Azure resources as they are used.
    - No long-term commitment or contract is required.
    - Offers flexibility with consumption-based-billing.

**3. Member Offers Subscription**

    - Provides reduced rates for Azure services for certain groups (e.g., MSDN Platform subscribers).
    - Offers discounts and benefits for eligible members.

**4. Reservations**

    - Committing to one-year or three-year plans.
    - Significantly reduce costs and ensure resource availability.
    - Reservations can cut costs by up to 72% compared to pay-as-you-go pricing.
    - Ideal for consistent, long-term resource usage.
    - Similar to booking a hotel room in advance, it secures resources at a lower rate for a set period.
  

### Purchasing Options

**1. Web Direct**

    - Directly purchase Azure subscriptions through the Azure website.

**2. Enterprise Agreement (EA)**

    - Suitable for organizations purchasing a significant amount of Microsoft products and services.
    - Involves a negotiated agreement with substantial discounts.
    - Requires a long-term commitment (minimum three years) to use Microsoft products and services.

**3. Cloud Solution Provider (CSP)**

    - An option for running custom third-party solutions on Azure.
    - Purchased through Microsoft partners known as Cloud Solution Providers.
    - Partners bill for both Azure services and their own solutions, providing technical support.

### Purchasing Third-Party Solutions

- For custom third-party solutions: Consider purchasing through a Cloud Solution Provider.
- For off-the-shelf third-party solutions: Access the Azure Marketplace after obtaining an Azure subscription.
- Azure Marketplace offers virtual machine images from various vendors that can be quickly deployed.

