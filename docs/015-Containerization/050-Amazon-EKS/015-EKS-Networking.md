---
title: "EKS Networking"
description: "EKS Networking"
tags: 
    - Cloud
    - DevOps
    - Containers
    - Containerization
    - Kubernetes
    - Amazon EKS
sidebar_position: 15
last_update:
  date: 7/7/2022
---


## Subnets

For networking in EKS clusters, keep these key points in mind:

- **Private subnets** are required:

  - Need a large CIDR
  - Host all worker nodes
  - Applications are deployed here

- **Public subnets** are also required:

  - Smaller CIDR size
  - Contain internet-facing LoadBalancers
  - LoadBalancers expose applications to the internet

- **Private subnets only** 

    - Prevents applications from being exposed to the web 
    - Expose your worker nodes to the internet.

**Notes:**

- AWS recommends using a mix of public and private subnets.

- The VPC must have **DNS Names** and **DNS Resolution support** for node registration.

## Security Groups

There are two security groups you can manage:

- Control Plane security group 
- Worker node security group
- 
When you create a cluster, Amazon EKS automatically creates a security group named:

```bash
eks-cluster-sg-<cluster-uniqueID>
```

This security group comes with default rules:

<div class='img-center'>

![](/img/docs/kubebasicssgdefaultrules.png)

</div>

Minimum required rules for the cluster:

<div class='img-center'>

![](/img/docs/kubebasicsminimumrules.png)

</div>

Here's a visual diagram showing the recommended ports for the control plane and worker node security groups:

<div class='img-center'>

![](/img/docs/eks-security-groups.png)

</div>


## Pod Networking

An EKS cluster is shipped with the **Amazon VPC CNI Plugin** which enables each Pod to receive 1 IP address that's linked to an ENI (Elastic Network Interface)

- Pod will the same IP address inside and outside of the cluster
- This ensures external apps can talk to the Pods

However, it has some **subnet limitations:**

- A small subnet limits the number of Pods
- CIDR /24 has 254 IP can't run a lot of Pods
- CIDR /18 has 16,384 IP is good for running more Pods

In addition to this, it also has **EC2 limitations:**

- Limited IP address per ENI 
- This depends on instance type

For more information, please see [EC2 ENI and IP Limits.](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#AvailableIpPerENI)


## Network Security with Calico

Calico is a third-party project that offers enhanced network security through network policies, instead of AWS security groups.

- Segment apps, tenants, environments
- Network policies directly assigned to Pods
- Security groups are **node-level**
- Network policies are **Pod-level**
- Greater network security

For more information, please see [Calico add-on in EKS.](https://docs.aws.amazon.com/eks/latest/userguide/calico.html)



 

  