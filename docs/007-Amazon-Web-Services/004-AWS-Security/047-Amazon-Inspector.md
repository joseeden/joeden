---
title: "Amazon Inspector"
description: "Automated and continual vulnerability management"
tags: [Cloud, AWS, Cloud, DevOps, Security, Certifications]
sidebar_position: 47
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Overview

It is an automated security assessment service that can help you improve the security and compliance of applications deployed in AWS.

- automatically discovers vulnerabilities and deviations from best practices
- assessment templates can be created based on rule packages
- these rules tell Inspector what it needs to test your resources against
- assessement report can be downloaded in either HTML or PDF format

Assessments are based on best practices and known security weaknesses covering:

- Common vulnerabilities and Exposures (CVEs)
- Center for Internet Security (CIS) Benchmarks 
- Security Best Practices 
- Runtime Behavior Analysis 

## Agent Based

Amazon Inspector requires software agents to be installed on any EC2 instance that you want to assess. This makes it an easy service to be configured and added at any point to existing resources already running within your AWS infrastructure. This helps Amazon Inspector to become a seamless integration with any of your existing security processes and procedures as another level of security.

## Types of assessments

- Network assessments - check for ports reachable from outside the VPC.
- Host assessments - check for vulnerabilities in software (CVE).
- Security best practices for configuration.

## Assessment report sample

![](/img/docs/awsinspectorsamplereport.png)

## How to get started

- Install the AWS Inspector agent in your EC2 instances.
- Create an assessment target using tags (which to inspect?).
- Create an assessment template (What rules to run?).
- Execute the assessment run. 
- Review all findings.

## Key Components 

Amazon Inspector has the following components and elements: 

- Amazon Inspector Role
- Assessment Targets
- AWS Agents
- Assessment Templates
- Rule Packages
- Assessment Runs
- Telemetry
- Assessment Reports
- Findings

### Amazon Inspector Role

When you first start using Amazon Inspector, you are required to create or select a role to allow Amazon Inspector to have read-only access to all of your EC2 instances. Without this role, the service would not have the relevant permissions to be able to gather the telemetry data of the instance during any assessment runs.

If you allow Amazon Inspector to create a role, then it will have a policy attached as detailed below:

```json 
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
} 
```

This allows the role to have read-only access to all EC2 instances within your AWS account. For more information on IAM and IAM roles, please see our existing course here. Assessment Targets.

### Assessment Targets

An Assessment Target is a grouping of AWS EC2 instances that you want to run an assessment against. This grouping of EC2 instances are managed and defined by the tags that are associated to your EC2 instance. **Tagging** is simply a way of adding metadata to your instances to help with management and organization, consisting of a key value pair.

When creating an assessment target, you are asked to select which keys from your tags that you would like to include within your Assessment Target. You can also refine your selection even further by providing the values for each of those keys, too. 

The EC2 instances are not required to contain both keys to be included within this Assessment Target. Only a match of one key is necessary. AWS Agents.

### AWS Agents

AWS Agents are software agents that must be installed on EC2 instances that you with to monitor and run the assessments on. Without this agent, Amazon Inspector would not be able to perform the analysis that it needs to. 

Once installed, the agent will be able to track and monitor data across the network file system, and any process activity of the instance. This data is then recorded as telemetry data, and is fed back to the Amazon Inspector service via the public endpoint of the service over a  TLS-protected channel (Transport Layer Security).

A regular heartbeat is sent from the agent to Inspector, which the Inspector service will respond to with instructions, such as to perform an assessment at a particular time. 

As the Agent is software-based, it is necessary from time to time to update the agent with the latest version. These new updates are managed and automatically installed by AWS, and so you don't need to worry about the latest Agent software version.

### Assessment Templates

An assessment template defines a specific configuration as to how an assessment is run on your EC2 instances. These configurable items within the template include the following.

- Rules packages to be used during the assessment
- Duration of the assessment run, which can be:
    - 15 minutes
    - 1 hour (recommended)
    - 8 hours
    - 12 hours
    - 24 hours
- Specific SNS topics notifications
    - when assessment starts
    - when it finishes
    - when it changes state
    - when findings are reported.

- Attributes that can be assigned to findings generated by the assessment. 

Once your assessment template is created, you are not able to modify it again to make changes. You can, however, tag your assessment templates to help with the organization and management of your assessment runs. 

### Rules Packages

When Amazon Inspector gathers telemetry during an assessment run, it will then compare this data against specific security rules to ascertain its compliance. And these rules are grouped together in what is known as a rules package. A rules package contains a number of individual rules that are each checked against the telemetry data back from the EC2 instance.

Each rule will also have an associated severity which will be one of the following:

- **High** - Highest severity level, should be looked at immediately and rectified

- **Medium** - Should be attended to in a timely manner

- **Low** - Need to be rectified, but the urgency is not as severe as medium or high.

- **Informational** - Describes a particular security configuration within your assessment target

The rule packages themselves are split across four different categories, these being: 

- Common Vulnerabilities and Exposures
- Center for Internet SecurityBenchmarks
- Security Best Practices
- Runtime Behavior Analysis

### Assessment Run

As assessment run can happen once you have configured your Amazon Inspector role, installed the agents and configured your Assessment Target and Assessment Templates. Once these components are in place, you are then able to run the configured assessment on your assessment targets. This process is known as the **assessment run.**

<div class="img-center">

![](/img/docs/aws-config-assessment-run.png)

</div>

During this time, telemetry data will be sent back to Amazon Inspector and S3 to assess the data against the specified rules packages defined within the assessment template

- Multiple assessment runs can be run at the same time, but only if the assessment targets do not have any duplicated EC2 instances within them.

- It is possible to view the progress of the run in addition to stopping, starting, and deleting the run. 


### Telemetry

Telemetry is a data that is collected from an instance, detailing its configuration, behavior and processes during an assessment run.

Once collected, the data is then sent back to Amazon Inspector in near-real-time over TLS where it is then stored and encrypted on S3 via an ephemeral KMS key. Amazon Inspector then accesses the S3 Bucket, decrypts the data in memory, and analyzes it against any rules packages used for that assessment to generate the findings.

After 30 days, this telemetry data is then deleted using a lifecycle policy attached to the dedicated Amazon Inspector S3 Bucket. 


### Assessment Reports

On completion of an assessment run, it is possible to generate an assessment report which provides details on what was assessed, and the results of that assessment.

As this feature was only released at the end of April 2017, It's only possible to generate these reports for any assessment runs that were completed on or after the 25th of April, 2017. There are two different types of reports that you can generate: 

- Findings report 
    
    - Contains only a subset of the full report.
    - summary of the assessment that took place.
    - list of the EC2 instances that were within the assessment targets.
    - rules packages that were used from within the assessment template.
    - detailed report on any findings that occurred. 

- Full report 

    - Contains all of the information from the findings report, in addition to a list of rules that were passed successfully for all the instances within the assessment target.

### Findings

Findings are generated from the results of an assessment run. A finding is a potential security issue or risk against one of your EC2 instances within the assessment target. For each finding, an explanation of the issue is given, along with guidance on how to remediate the problem. 


## Service Limitations 

These are the service limitations per account. Note that you can raise a request to AWS to increase the limits .

- 500 Agents per assessments
- 50,000 Assessment Runs
- 500 Assessment Templates 
- 50 Assessment Targets 


## Common Vulnerabilities and Exposures

The CVE is a publicly-known reference list of security threats that are well-documented. The rules used within this package will check the Assessment Target for exposure to any known security holes that would compromise the integrity, confidentiality, and availability of your EC2 instance.

Should any findings from an assessment be found against a CVE, it's recommended you visit this site and search for specific vulnerability ID to gather additional detailed information to help you resolve and mitigate the issue. To check which CVEs the rules within the rules package are performing an assessment against, you can visit the following link.

```bash
https://cve.mitre.org/ 
```

As new CVEs are found, they are added to this list by AWS, and the corresponding rules added to the rules package, preventing the need for you to stay up-to-date with the latest known security issues. 

## Center for Internet Security Benchmarks

These benchmarks are continuously refined and used as global standards for best practices for protecting data and IT resources. AWS is a CIS Benchmarks member company, and Amazon Inspector's associated certifications can be found here:

```bash
https://www.cisecurity.org/partner/amazon-web-services/ 
```

The rules within this rule package help to assess security for the various operating systems. If any findings are made against this rules package, then similarly to the CVE list, you can visit the provided link to download the detailed description, explanation, and advice on how to mitigate the security issue found.

## Security Best Practices

This rules package looks for weaknesses in common security best practices. However, this only applies to Assessment Targets that are running the Linux operating system. At this stage, it's not possible to run this rules package on any target that has the marks of Windows OS. The following security checks are covered within this rules package.

- **Disable root login over SSH** 

    - Checks if the SSH daemon is configured to allow login into your instances root. 
    
- **Support SSH version two only** 

    - Checks if the instance is configured to run SSH protocol version one. 

- **Disable password authentication over SSH** 

    - Checks if password authentication over SSH is configured.

- **Configure password maximum age** 

    - Checks if a maximum age for a password has been configured on the instance. 

- **Configure password minimum length** 

    - Checks if a minimum password length has been configured on the instance.

- **Configure password complexity** 

    - Checks if the instance is using a password complexity mechanism for passwords.

- **Enable ASLR** 

    - Checks if address space layout randomization is enabled.

- **Enable DEP** 

    - Checks if data execution prevention is enabled on the instance.

- **Configuration permissions for systems directories**

    - Ensures that only the root user has right access to system directories. 

