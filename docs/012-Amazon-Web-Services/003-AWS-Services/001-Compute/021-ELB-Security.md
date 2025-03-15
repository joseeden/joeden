---
title: "ELB Security"
description: "Securing your Loadbalacers"
tags: [Cloud, AWS, DevOps, Security, Certifications]
sidebar_position: 21
last_update:
  date: 7/26/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::


## Security Features 

AWS Loadbalacers can automatically distribute incoming application traffic across multiple targets.

- Handles the varying load of application traffic.
- Offers different types of Loadbalancers 
    - Network Loadbalancers 
    - Application Loadbalancers 
    - Classic Loadbalancers
    - Gateway Loadbalancers
- Provides some security features such as security policies.

## Security Policy of HTTPS Listeners

When you create a TLS Listener, you must select a security policy which can be updated as needed. To learn more, check out the following links:

- [User Guide for Application Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/index.html)
- [User Guide for Network Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/index.html)
- [User Guide for Gateway Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/index.html)
- [User Guide for Classic Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/index.html)
- [TLS listeners for your Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-tls-listener.html)

## TLS/SSL Termination Options

TLS/SSL can be terminated in either:

- ELB 
- EC2/ECS/EKS/Fargate (behind the loadbalancer)

To terminate the TLS/SSL behind the loadbalancer, you can only use:

- Network Loadbalancer 
- Classic Loadbalancer with TCP protocol support for termination

Security implications of terminating TLS/SSL in the ELB:

- ELB will decrypt TLS/SSL so traffic between ELB and EC2/ECS/EKS will be unencryptesd
- you will not have end-to-end encryption in place 

Benefits of termination TLS/SSL in the ELB:

- Offloads processing to the ELB 
- Faster and less resources needed in the EC2/ECS/EKS/Fargate

**NOTE:**
Do not terminate the TLS/SSL in the ELB unless you really need to.

To learn more, check out:

- [New – TLS Termination for Network Load Balancers](https://aws.amazon.com/blogs/aws/new-tls-termination-for-network-load-balancers/)

- [Network Load Balancer Now Supports TLS Termination](https://aws.amazon.com/about-aws/whats-new/2019/01/network-load-balancer-now-supports-tls-termination/)

- [Verify that ELB load balancers require TLS termination](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/verify-that-elb-load-balancers-require-tls-termination.html) 
