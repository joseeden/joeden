---
title: "Elastic Kubernetes Service (EKS)"
description: ""
tags: 
 
  - Cloud
    - DevOps
    - Containers
    - Containerization
    - Kubernetes
    - Amazon EKS
sidebar_position: 10
last_update:
  date: 7/7/2022
---


## Amazon EKS  

**Amazon EKS** is AWS’s managed Kubernetes service that simplifies deploying Kubernetes by handling the control plane and its components for you. Users are responsible for managing where workloads run, such as on Fargate or EC2.  

<div class='img-center'>

![](/img/docs/eks-banner2.png)  

</div>



## Traditional vs. EKS Setup  

Traditionally, deploying Kubernetes required:  

- Setting up master nodes and `etcd`.  
- Configuring CA for TLS encryption.  
- Managing monitoring, scaling, and authentication.  
- Provisioning worker nodes.  

With EKS:  

- AWS manages the control plane
- Provides HA and scalability.  
- Integrated load balancing, networking, and storage.  
- Authentication via IAM.
- AMI for nodes can be customized.
- Container images can be stored through ECR.


## What EKS Manages vs. What You Manage  

The diagram below illustrates which components are managed by Amazon EKS and which require user management.  

<div class='img-center'>

![](/img/docs/whateksmanages.png)  

</div>


When you create you EKS cluster, AWS takes care of all of these under the hood:

1. Master nodes and `etcd` are set up for HA  
2. IAM plugin is configured  
3. CA is enabled for TLS  
4. Autoscaling is activated  
5. Load balancers like NLB and ELB are provisioned  

## EKS Control Plane  

The EKS control plane is fully managed by AWS.

- Highly available and dedicated to your account  
- Uses native AWS components for seamless integration  
- API server connects to `etcd` through an ALB  
- Control plane is fronted by an NLB with fixed IPs  

## Pricing  

**What you pay for:**  
- EKS clusters (per hour).  
- Resources for running applications (e.g., EC2, Fargate).  

**What’s free:**  
- The control plane.  

For more details, visit the official [Amazon EKS Pricing](https://aws.amazon.com/eks/pricing/).  