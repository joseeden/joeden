---
title: "AWS Config"
description: "Assess, audit, and evaluate configurations"
tags: [Cloud, AWS, Cloud, DevOps, Security, Certifications]
sidebar_position: 46
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::




## Overview

Common resource management questions:

- What resources do we have?
- Which devices are performing functions?
- Do we have resources that are no longer needed and can we switch them off? 
- What are the status of the current configurations?
- Are there any security vulnerabilities? 
- How are the resources linked within the environment?
- Do we have a history of the changes in the resources? 
- Is the infrastructure compliant with specific governance controls? 
- Do we have accurate auditing information?

AWS Config is designed to record and capture resource changes within your environment, allowing you to perform a number of actions against the data that helps to find answers to the questions that we highlighted previously. Main features include:

- Capture resource changes 
- Act as a resource inventory 
- Store configuration history 
- Provide a snapshot in time of configurations 
- Notifications about changes
- Provide AWS ClousTrail integration 
- Rules to check compliancy 
- Perform security analysis 
- Identify relationship between resources

**AWS Config is region-specific**, which means that if you have resources in multiple regions, you will have to configure AWS Config for each region you want to record resource changes for. When doing so, you are able to specify different options for each region.

For services that are not region-specific such as IAM, there is also an option to record global-scoped resources.

## Use Cases 

### Security Compliance

AWS Config can be a great tool, when enforcing strict compliance against specific security controls.

- Be notified of noncompliant resources to protect internal and external customer data. 
- Services are continually monitor and checked to remain compliant throughout its life cycle.

### Discovery of Resources

When you first activate AWS Config, or run the configuration recorder, AWS Config will discover all supported resources types, allowing you to view them from within the AWS Config dashboard. 

- A configuration item will be recorded for each.
- Resources could also be found in the configuration history file on S3.
- Allows you to perform some essential housekeeping within your network and VPC.

### Audit Compliance

As well as using AWS Config for being compliant for internal security standards, there are also many external audit and governance controls, where the service can also enforce specific controls on resources to maintain compliance. 

- Health Insurance Portability and Accountability Act, known as HiPAA.
- Payment Card Industry Data Security Standard, known as PCI DSS. 

### Resource Change Management

When planning changes within your infrastructure, it's often required that you have an understanding of what affect the change will have on other resources. 

- Resource relationshipd is not always known.
- We are able to use the dashboard to list all related resources of a particular resource.
- Allows us to plan our changes more effectively.
- Prevent outages and configurational mistakes being made by having an overall better visual awareness of the environment.

### Troubleshooting and Problem Management

AWS Config is a great tool to help you troubleshoot issues, that may arise within your environment. 

- See a timeline of events allowing you to go back to any point in time. 
- Understand what changes happened on your supported resources. 
- See the changes made to the resource and make any amendments to resolve the issue.
- Through AWS CloudTrail, we can see who or what triggered the change, via which API call.



## Key Components

The following identifies the main components to the AWS Config service:

- AWS resources
- Configuration Items
- Configuration Streams
- Configuration History
- Configuration Snapshots
- Configuration Recorder
- Config Rules
- Resource Relationships
- SNS Topics
- S3 Bucket 
- AWS Config Permissions

### AWS resources

These are objects that can be created, updated, and deleted from within the Management console or programmatically through the AWS CLI or SDKs.

### Configuration Items

A configuration item or CI is comprised of a JSON file that holds the configuration information, relationship information, and other metadata as a point-in-time snapshot view of a supported resource. 

- All the information that AWS Config can record for a resource is captured within the CI.
- Created every time a supported resource has a change made to its configuration in any way.
- Record CIs for directly related resources to ensure change doesn't affect those resources too.
- CI is then sent to configuration stream.

    <div class="img-center"> 

    ![](/img/docs/aws-config-config-item.png)

    </div>

Sections of a Configuration Item:

- **Metadata** - Version ID, Configuration ID, Time of capture, MD5 hash
- **Attributes** - Unique Resource ID, Key-value tags, Resource type, ARN
- **Relationships** - relationship of the recorded resource to the other resources
- **Current Configuration** - information for the resource
- **Related Events** - related AWS CloudTrail event ID


### Configuration Streams

When new CIs are created, they are sent to a Configuration Stream which is in a form of an SNS topic. This stream is used on events like:

- When configuraiton history files are delivered
- When configuration snapshots are started
- When state of compliance changes for a resource  
- When evaluations for rules are started  
- When AWS Config fails to dleiver notifications

The SNS topic can have different notification endpoints;

- Email notification
- SQS 


### Configuration History

The configuration history uses configuration items to collate and produce a history of changes to a particular resource. This allows you to see the complete set of changes made to a resource over a set period of time.

The information can be accessed  AWS CLI using the following command:

```bash
aws configservice get-resource-config-history 
```

This could also be accessed via the AWS Management Console. A configuration history file for each resource type is sent to a S3 bucket that is selected during the set up of AWS Config. 
- Typically delivered every six hours.
- Contains all CI changes for all resources of a particular type.  
 
### Configuration Snapshots 

The configuration snapshot takes a point-in-time snapshot of all supported resources configured for that region. It will then generate CIs for each resource in your AWS account for a specific region, and this configuration snapshot can then be sent to an S3 bucket. Alternatively, this information can be viewed via the AWS Management Console.


### Configuration Recorder

This can be seen as the engine of the service as it is responsible for recording all of the changes to the supported resources and generating the configuration items. 

- Automatically enabled by default and started when you first configure AWS Config. 
- Can be stopped and then restarted again at a later point. 
- When stopped, AWS Config will no longer track and record changes to your supported resources.


### Config Rules

AWS config rules enforce specific compliance checks and controls across your resources, and allows you to adopt an ideal deployment specification for each of your resource types. 

- Each rule is a lambda function that evaluates resources and carries out some simple logic to determine the compliance result with the rule. 
- Each time a change is made to one of your supported resources, AWS Config will check the compliance against any config rules that you have in place. 
- If there was a violation against these rules, then AWS Config will send a message to the configuration stream via SNS and the resource will be marked as non-compliant. 

It's important to note that marking a resource as non-compliant does not mean the resource will be taken out of service or it will stop working. It will continue to operate exactly as it is with its new configuration.

AWS Config simply alerts you that there is a violation, and it's up to you to take the appropriate action. 

- Rules can be custom defined, or selected from a predefined list of AWS managed rules. 
- Custom-defined rules allows you to adopt internal best practices.
- Predefined rules can also be modified to make subtle parameter changes as needed.
- 50 config rules per region, but can raise a request to AWS to increase limit.

Examples of predefined rules that AWS have created:

- **Rds-storage-encrypted**

    - This checks whether storage encryption is activated by your RDS database instances. 

- **Encrypted-volumes**

    - This checks to see if any EBS volumes that have an attached state are encrypted. 
    - Optionally you can specify the ID of a KMS key to use to encrypt the volume. 

- **Root-account-mfa-enabled**

    - This checks whether your root account of your AWS account requires multifactor authentication for console sign in. 

- **IAM-user-no-policy-check**

    - This checks that none of your IAM users have policies attached. 
    - Best practice dictates that permissions should be provided via roles or groups.

When creating or modifying rules:

- Identify the compliance and standards that we need to adhere to. 
- Define requirements from all parties. 
- Create/modify the rules.

### Resource Relationships

AWS Config identifies relationships with other resources from a specific resource. As an example, it might be the EC2 instance that the volume is attached to. 

- Builds a logical mapping of resources and how they connect. 
- Allows you to see linked resources to view their configuration history and CI data. 
- Useful if you're trying to troubleshoot an issue and pinpoint where the source.

### SNS Topics

An SNS topic is used as a configuration stream for notifications of various events triggered by AWS Config. You can have various endpoints associated to the SNS stream. Best practice indicates that you should use SQS and then programmatically analyze the results via SQS. 


<div class="img-center"> 

![](/img/docs/aws-config-sns-topic.png)

</div>


### S3 Bucket 

The S3 bucket that was selected at the time of configuration is used to store all the configuration history files that are generated for each resource type, which happens every six hours. Also, any configuration snapshots that are taken are also stored within the same S3 bucket. 

The configuration details used for both SNS and S3 are classed as the AWS Config delivery channel by which data can be sent to other services.

### AWS Config Permissions

When setting up AWS Config, you're required to select an IAM role. This role is required to allow AWS Config to obtain the correct permissions to carry out and perform a number of functions. 

For example, AWS Config will need read-only access to all the supported resources within your account so it can retrieve data for the configuration items. Also, we now know that AWS Config uses SNS and S3 both for streams and storage of the configuration history files and snapshots. So AWS Config requires the relevant permission to allow it to send data to these services.

