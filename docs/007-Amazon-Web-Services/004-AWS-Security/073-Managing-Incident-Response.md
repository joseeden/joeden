---
title: "Managing Incident Responses"
description: "Detecting and remediating incidents"
tags: [Cloud, AWS, Cloud, DevOps, Security, Certifications]
sidebar_position: 73
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::





## Overview

As part of the incident response strategy, we should be able to appropriately contain compromised resources and perform the following:

- Conduct forensic investigations.
- Remove harmful elements from the architectures.
- Recovery of any important data. 

It is recommended to have an incident response playbook that provides a step-by-step guide of what to do when an incident occurs. 

**Isolation** is the concept of limiting the visibility and scope of an element so that its actions only affect itself. In case of EC2 instances, this means the instance will not be able to see other instances or nodes on the network, as well as not having the ability to reach out to the internet. 

## Detection Mechanisms 

To isolate EC2 instances, we can start with using detection mechanisms (**Amazon GuardDuty** and **Amazon Inspector**) to determine what is wrong.

- **Amazon GuardDuty**

    - Amazon GuradDuty is a threat detection service that continually monitors and protects your AWS accounts, workloads, and data.
    - It monirots and analyzes your metadata streams that come from AWS CloudTrail Events and VPC flow logs and then use Machine Learning to watch for anomalies within your architectures.
    - If GuardDuty detects any threat such as compromised EC2 instances that have been set up to serve malware to your users, or to mine for bitcoin, it can send alerts which can be integrated with event management systems.

- **Amazon Inspector**

    - Amazon Inspector is an automated security service that can assess accessibility of the instance, as well as the security state of the applications running in the instances.
    - We can automate security testing against our fleets to make sure they are all running according to plan.
    - If it finds any issues, Inspector can notify you directly by email, or it can message any service that accepts SNS notifications.


## Isolation  

Once we found out what's wrong, we have a couple of ways to perform the actual isolation.

- Security Group Isolation
- NACL Isolation
- Internet Gateway Isolation
- Route Table Isolation

### Security Group Isolation

If an instance has multiple active security groups that overlap, AWS will apply the most permissive rule. 

1. Leverage stateful feature, which means outbound traffic is automatically allowed, regardless of any inbound or outbound rules.
2. Note that we can never shut off traffic to an EC2 instance by adding a security group, but we can dictate which specific traffic to allow. 
3. As correct measure, remove any existing security group from the instance or delete all rules of the security groups attached to the instance.
3. Once we removed the rules, attach a new blank security group to the instance to ensure no traffic is coming in or out of the instance.

#### Tracked vs. Untracked Connections

Since security groups are stateful, they keep track of certain connections to allow traffic back into the network. Having said, we need to understand the difference between tracked and untracked connections.

**Untracked connections** are from traffic that come from a 0.0.0.0/0 (all traffic) rule AND a 0.0.0.0/0 (all traffic) from (0-65535) ports in the other direction. And this includes both inbound and outbound ways this rule can be written. Any traffic that fits this category will be immediately interrupted when a rule from a security group changes that would normally stop the flow of traffic.

- removing a rule
- updating a rule
- deleting a security group

<div class="img-center">

![](/img/docs/Devops-SRE-untracked-conn.png)

</div>

**Tracked connections** apply to any traffic that has a specific IP or CIDR rule within the security group. This would be something like allowing 203.0.113.1/32 for example. This is a specific IP address that has been allowed on the security. This type of traffic will NOT be immediately interrupted if a rule that has previously allowed its traffic to flow is removed.

To removed tracked connections:

1. Create a dedicated "isolation" security group.
2. Create a single rule of 0.0.0.0/0 for all traffic in both inbound and outbound rules.
3. Remove any existing security groups attached to the instance.
4. Associate isolation security group to the instance. 
5. Finally, delete both inbound and outbound rules created for the isolation security group. 


### NACL Isolation

Network ACLs or NACLs helps in directing traffic into and out of the network at the subnet level. NACLs work by explicitly allowing or denying access to a subnet based on rules that we establish. 

- NACLs are **stateless**, which means that there must be an explicit rule that allows response traffic back into the network or out of the network (unlike Security groups) which are stateful and do this for you.

- All NACL rules are based on external IP addresses or CIDR blocks, and are not relative to any internal destinations.

- NACL and its associated rules can only be added to one subnet at a time

Unlike security groups, NACLs cannot be used in a **targeted** manner because when you change a NACL, it will impact all instances that are inside the subnet which basically isolates all of those instances instead of isolating just the compromised one.

To isolation using NACL, simply add a DENY rule for ALL traffic in the inbound and outbound rule. Another option is to create a dedicated NACL with all the DENY rules and replace the existing NACL with this new dedicated NACLs.

<div class="img-center"> 

![](/img/docs/nacl-isolation.png)

</div>

### Route Table Isolation

A route table is connected to a subnet, just like the Network ACL. The route table helps the subnet direct traffic around your VPC. You will have one route table per VPC, and if you do not create one yourself, a default one will be applied. 

To isolate using route tables,  we simply need to remove all routes within a route table ( these could be internet gateway, Direct connections, or VPN connections).

Another option is to create a custom route table and associate this to the subnet. Note that the instances inside the same subnet will still be able to communicate with each other. We would have to first remove each and every dependency from the network (shut down every instance) in order to actually remove the internet gateway.

### Internet Gateway Isolation

This is the top of the chain. AWS doesn't allow us to simply remove an itnernet gateway from the VPC if there are any EC2 dependencies within the VPC that require the internet gateway. This isolation can also be done by simply performing the route table isolation since enforcing a strict route table or blank route table also isolates at the gateway level.


## Compromised Instance Incident Run Book

:::info[note]

*This is a sample runbook for dealing with a suspected compromised Amazon EC2 instance.* 
*Note that the Console UI gets updates and may change.*

:::

Tag any resources you create with the key **IncidentStatus** and the value **Isolated**.

1. Detach the instance from its auto scaling group and tag it.

    ```bash
    EC2 > Auto Scaling groups > Select the ASG > Instance Management
    Select the instance > Actions > Detach
    ```

2. Create a new security group that disallows both inbound and outbound traffic (if one doesn't already exist)
3. Remove the instance's current security group and replace it with the group that blocks inbound and outbound traffic.

    ![](/img/docs/change-sec-groups-to-isoalte-instance.png) 

4. Remove the IAM role from the instance (ensure no role is associated)

    ![](/img/docs/modify-iam-role-to-isolate-ec2.png)

5. Snapshot the instance's root volume for later analysis.

    ![](/img/docs/snapshot-ebs-vol.png)

6. Create an AMI of the instance for later analysis.

    ![](/img/docs/create-an-ami-for-ec2.png)


## Resources 

- [Introduction: Incident Response overview](https://www.ncsc.gov.uk/collection/incident-management/incident-response)
- [Incident Response vs. Incident Handling](https://isc.sans.edu/diary/Incident+Response+vs+Incident+Handling/6205)
- [Cloud Incident Response](https://www.paloaltonetworks.com/cyberpedia/unit-42-cloud-incident-response)
- [IR Playbook Designer](https://www.incidentresponse.org/playbooks/?fbclid=IwAR3n1j0O6Z4bK4GRY696H6XjrcHSR4Cy73ITF-I0cHG2EmoGTRIRM301C_0) 
