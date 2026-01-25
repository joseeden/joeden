---
title: "Auto Scaling Groups"
description: "Basics of AWS Compute"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Certifications
sidebar_position: 10
last_update:
  date: 7/26/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Overview

An Auto Scaling group contains a collection of EC2 instances that are treated as a logical grouping for the purposes of automatic scaling and management.

- Size of an Auto Scaling group depends on the number of instances that you set as the desired capacity.
- Responds to changing conditions by adding or terminating EC2 Instances
- Launches instances from a specified Amazon Machine Image (AMI)
- Enforces a minimum number of running Amazon EC2 instances.

Auto Scaling Group in AWS:

<div class="img-center"> 

![](/img/docs/aws-asg-in-aws.png)

</div>


Auto Scaling Group in AWS with LoadBalancer:

<div class="img-center"> 

![](/img/docs/aws-asg-in-aws-with-lb.png)

</div>



## Launch Configuration

The launch configuration is referenced by the Auto Scaling group instead of being part of the Auto Scaling group because:

- It allows you to change the EC2 instance type and AMI without disrupting the Auto Scaling group.
- It facilitates rolling out a patch to an existing set of instances managed by an ASG.
- It allows you to change security groups associated with the instances launched without having to make changes to the ASG

## Scaling Policies

Scaling policies determine when, if, and how the ASG scales and shrinks.

- Simple/Step Scaling 
- Scheduled Actions 
- Dynamic 
- Target Traking 

## Scaling Cooldown 

After your Auto Scaling group launches or terminates instances, it waits for a cooldown period to end before any further scaling activities initiated by simple scaling policies can start. 

<div class="img-center"> 

![](/img/docs/scalingcooldown-2024.png)

</div>


The intention of the cooldown period is to prevent your Auto Scaling group from launching or terminating additional instances before the effects of previous activities are visible.

- It is recommended not to use simple scaling policies and scaling cooldowns.
- Target tracking scaling policy or a step scaling policy is better for scaling performance
- After the cooldown period ends, any scaling activities initiated by simple scaling policies can resume

## Scaling Plans

Scaling Plans define the triggers and when instances should be provisioned/deprovisioned.


## Lifecycle Hooks 

Amazon EC2 Auto Scaling offers the ability to add lifecycle hooks to your Auto Scaling groups. 

- Lets you create solutions that are aware of events in the Auto Scaling instance lifecycle, and then perform a custom action on instances when the corresponding lifecycle event occurs. 

- Provides a specified amount of time (one hour by default) to wait for the action to complete before the instance transitions to the next state.

A popular use of lifecycle hooks is to control when instances are registered with Elastic Load Balancing. 

![](/img/docs/aws-asg-lifecyclehook-diag.png)


By adding a launch lifecycle hook to your Auto Scaling group, you can ensure that your bootstrap scripts have completed successfully and the applications on the instances are ready to accept traffic before they are registered to the load balancer at the end of the lifecycle hook.

## Auto Scaling Alarms 


It is possible to scale an ASG based on CloudWatch alarms which monitors a set metric, such as average CPU. Note that metrics are computed for overall ASG instances. 

<div class="img-center"> 

![](/img/docs/aws-elb-alarms-based-on-cw-alarm.png)


</div>
  