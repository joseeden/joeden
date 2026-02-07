---
title: "AWS Trusted Advisor"
description: "Optimize costs, performance, etc."
tags:
- Cloud
- AWS
- DevOps
- Security
- Certifications
sidebar_position: 49
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Overview

AWS Trusted Advisor provides guidance on how to provision resources following AWS best practices.

- Helps to reduce cost, increase performance, and improve security. 
- Seven core checks and recommendations by default. 
- Full set of checks only for business and enterprise support plans.

The type of AWS account support plan in place determines how many checks AWS Trusted Advisor will perform. All AWS accounts benefit from six Trusted Advisor checks, while accounts with Business or Enterprise support plans have access to over 50 Trusted Advisor checks. Business support plans start at $100 per month.

In the Trusted Advisor, we can see the recommendations in each of the four categories checked by Trusted Advisor.

![](/img/docs/awstrsutedadvisorconsoleview.png)

The six checks included without a support plan fall under the Performance and Security categories. Under each category, the number of checks that fall into each recommendation status category are shown. The recommendation statuses by color are:

- **Red**: Action recommended
- **Yellow**: Investigation recommended
- **Gray** : Excluded items


We can also see the recommended actions (if there are any): 

![](/img/docs/awstrustedadvisorrecommendedactions.png)

Trusted Advisor will automatically perform all of the checks without manual intervention. This feature is useful because we can trigger CloudWatch Events to send us emails when the status of a check changes. However, the intervals for each check vary greatly. 

We can easily get the latest check results in the AWS Management Console by clicking the refresh all button.

Similarly, if we want to export a report with all check results at once, the download all results button is available.

## Categories

- **Cost optimization** - Helps to identify ways in which you could optimize your resources to help you reduce costs by implementing features such as reserved capacity and removing unused capacity

- **Performance** - This reviews your resources to highlight any potential performance issues across your infrastructure, determining if you could take benefits from performance-enhancing capabilities such as provisioned throughput

- **Security** - This analyses your environment for any potential security weaknesses or vulnerabilities that could potentially lead to a breach.

- **Fault Tolerance** - This helps to suggest best practices to maintain service operations by increasing resiliency, should a fault or incident occur across your resources.

- **Service Limit** - This identifies and warns you when your resources reach 80% capacity of their service limit quota.  

Security Core checks:

- Security Groups - specific ports unrestricted 
- EBS Public Snapshots 
- RDS Public Snapshots 
- IAM use 
- MFA on root account

## Features

- **Trusted Advisor Notifications** - This tracks your resource check changes and cost-saving estimates over the course of a week and e-mail you a report
- **Exclude Items** - This allows you to select specific resources to be excluded from appearing in the console within a specific check.  
- **Action Links** - Action Links lead you on to remediate any issue identified
- **Access Management** - Using IAM you can grant different levels of access to Trusted Advisor:
    - Full Access
    - Read-only 
    - Restrict access to specific categories, checks, and actions
- **Refresh** - You can perform a manual refresh 5 minutes after the previous refresh against either individual checks or against all checks

For every check that Trusted Advisor provides, you will see:

- A description 
- Alert Criteria
- Recommended Action
- Additional Resources

![](/img/docs/awsloggingandmonitoringtrustedadvisor.png)    

## Security Groups - Specific Ports Unrestricted

The check looks for unrestricted access to ports on inbound traffic. Any unrestricted port is given a status according to the following rules:

- No action is recommended for web traffic ports 80 (HTTP) and 443 (HTTPS), and mail ports 25 (SMTP) and 465 (SMTPS). That is due to the nature of the web and email which are expected to be accessed from anywhere.

- Action is recommended for certain file transfer and database ports. It is highly possible these services contain sensitive information and should be secured.

- Investigation is recommended for all other ports. 
