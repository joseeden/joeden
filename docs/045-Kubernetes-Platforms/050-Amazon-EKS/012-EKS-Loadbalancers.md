---
title: "LoadBalancers"
description: "LoadBalancers in EKS"
tags: 
 
  - Cloud
    - DevOps
    - Containers
    - Containerization
    - Kubernetes
    - Amazon EKS
sidebar_position: 12
last_update:
  date: 5/26/2022
---


## Overview 

Amazon EKS supports three types of load balancers:  

| Load Balancer         | Service Type      |  
|-----------------------|-------------------|  
| Classic Load Balancer | None             |  
| Network Load Balancer | LoadBalancer     |  
| Application Load Balancer | Ingress Controller |  

For more information, please see [Type LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer)

## Annotations 

Load balancer configuration is controlled by **annotations** in Kubernetes manifests.  

- **Labels**: Used to identify and select objects.  
- **Annotations**: Attach metadata without affecting object selection.  

For more information, please see [Annotations in Kubernetes.](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/)

## AWS Load Balancer Controller 

The AWS Load Balancer Controller manages Elastic Load Balancers for Kubernetes:  

- Creates **ALB** for Ingress resources.  
- Creates **NLB** for services of type LoadBalancer.  
- Does not support Classic Load Balancers.  

:::info[NOTE]

Note that it doesn't create AWS Classic Load Balancers. 
It is recommended to use version *2.4.3* or above if your cluster is version *1.19* and above.

:::

**Service annotations** are different when using the AWS Load Balancer Controller than they are when using the AWS cloud provider load balancer controller. 

To tag load balancers during creation, use this annotation:  

```bash
service.beta.kubernetes.io/aws-load-balancer-additional-resource-tags 
```

For more information, please see the links below:

- [AWS Load Balancer Controller](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html)

- [AWS Load Balancer Controller Github page](https://github.com/kubernetes-sigs/aws-load-balancer-controller)

## Classic LoadBalancer

By default, EKS creates a Classic Load Balancer for services of type LoadBalancer. To use a different type, add annotations in the manifest.  

- Limited to basic Layer 4 load balancing.  
- Lacks advances path-based routing or host-based routing.  

## Network LoadBalancer

An AWS Network Load Balancer can load balance network traffic to pods deployed to Amazon EC2 IP with either targets.

- **Instance targets** for EC2 Pods.  
- **IP targets** for Fargate Pods.  

### Instance Targets  

Use the AWS Load Balancer Controller to create Network Load Balancers with instance targets.  

- To deploy an NLB in a private subnet, add these annotations:
 
  ```yaml
  service.beta.kubernetes.io/aws-load-balancer-type: "external"
  service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: "instance"
  ```  

- For an NLB in a public subnet (e.g., to load balance to EC2 nodes):

  ```yaml
  service.beta.kubernetes.io/aws-load-balancer-scheme: "internet-facing"
  ```  

### IP Targets  

To create an NLB using IP targets for Pods:  

- Add these annotations to your manifest:  

  ```yaml
  service.beta.kubernetes.io/aws-load-balancer-type: "external"
  service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: "ip"
  ```  

- For public-facing NLBs (Fargate workloads must remain private):

  ```yaml
  service.beta.kubernetes.io/aws-load-balancer-scheme: "internet-facing"
  ```  

- To assign Elastic IPs, add:  

  ```yaml
  service.beta.kubernetes.io/aws-load-balancer-eip-allocations: eipalloc-xxxxxx,eipalloc-yyyyyy
  ```  

For more information, please see [Network load balancing on Amazon EKS.](https://docs.aws.amazon.com/eks/latest/userguide/network-load-balancing.html)



## Application Load Balancer  

For Layer 7 traffic, use Kubernetes Ingress to create ALBs:  

- Works with Pods on nodes or Fargate.  
- Supports public or private subnets.  

To tell the AWS LoadBalancer Controller to create an ALB and its supporting resources when a Kubernetes Ingress is created, add this annotation to the manifest:

```bash
annotations:
    kubernetes.io/ingress.class: alb 
```

To loadbalance on IPv6 pods deployed on IP targets (instance targets not allowed):

```bash
alb.ingress.kubernetes.io/ip-address-type: dualstack 
```

The AWS Load Balancer Controller supports the following traffic modes:

- **Instance mode**: Routes traffic to NodePort services, then Pods.  
- **IP mode**: Directly routes ALB traffic to Pods.  


For more information, please see the links below:

- [Application load balancing on Amazon EKS.](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html)

- [Kubernetes Ingress.](https://kubernetes.io/docs/concepts/services-networking/ingress/)



 

  