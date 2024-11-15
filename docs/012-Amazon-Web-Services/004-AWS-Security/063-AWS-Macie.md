---
title: "Amazon Macie"
description: "Protecting sensitive data"
tags: [Cloud, AWS, Cloud, DevOps, Security, Certifications]
sidebar_position: 63
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Overview 

When working with large quantities of data, it becomes very difficult to effectively scrub all that information for any secure vulnerabilities. This is where Amazon Macie is able to step in and help you manage the security of your Amazon S3 buckets and all the text data that lives within them.

Amazon Macie is a fully managed machine learning and pattern matching service that helps with data security and data privacy. 

- Automatically provide a detailed list of any sensitive data found in your S3 buckets.
- Find personally identifiable information, PII, as well as any protected financial information.
- Take actions on your behalf by using services such as Lambda and Step Functions.
- Allow you to have constant and detailed visibility into your Amazon S3 data. 


## How does Macie works 

When you enable the service you are allowing Macie to automate the discovery of any sensitive data that exists within your S3 buckets. In order to do this, Amazon Macie will create a service Link role that will give a service the permissions it requires to operate on your behalf.

This Service-Linked role gives Macie the permissions to:

- Create an inventory of all of your S3 buckets.
- Provide statistical data about the buckets and the objects held within.
- Monitor your buckets and evaluate them for security access control.
- Analyze the objects within the buckets to detect sensitive data.

With these permissions, Macie will begin to create metadata about your buckets so that it can see if anything changes in the future. This data includes general bucket information such as:

- name
- ARN
- creation date
- account level permission settings
- shared access and replication settings object counts

Using this information, Macie's able to calculate statistics and provide assessments about your security and the privacy of your bucket inventory.

Macie will also monitor this data and these buckets to watch out for:

- unencrypted buckets
- publicly accessible buckets
- buckets that are shared with accounts not explicitly allowed within your Amazon Macie's settings. 

## Metadata 

The metadata is refreshed every day, directly through Amazon S3, as part of Macie's daily refresh cycle. The metadata can be directly refreshed whenever you choose by clicking the refresh button within the Amazon Macie console. This can be done at most once every five minutes.

Additionally, specific metadata will be updated whenever Macie detects a relevant AWS CloudTrail/EventBridge event.

## Bucket Policy Findings 

Anytime Macie finds an issue or detects an event that lowers your security posture, Macie will create a policy finding for you review at your earliest convenience. For example, if someone was to disable default encryption for a bucket after Macie's been enabled, Macie will create a S3 bucket encryption disabled finding for that bucket.

It is important to note that if the encryption for a bucket was disabled before Macie was enabled, Macie will not generate a policy finding for that possible security vulnerability. In total, there are five different types of bucket findings that Macie can watch out for. 

- `Policy:IAMUser/S3BlockPublicAccessDisabled`
- `Policy:IAMUser/S3BucketEncryptionDisabled`
- `Policy:IAMUser/S3BucketPublic`
- `Policy:IAMUser/S3BucketReplicatedExternally`
- `Policy:IAMUser/S3BucketSharedExternally`


Each finding will be available for up to 90 days and includes the following information:

- a severity rating 
- general information about the affected resource
- when and how Macie found the issue

## Reviewing the findings 

You have a few options for reviewing and analyzing your findings:

- Directly in the Amazon Macie console
- Use the API to review them, programmatically
- In Amazon EventBridge (formally CloudWatch events)
- In the AWS Security Hub 

Since these findings can be viewed programmatically, as well as through EventBridge, this is how you would be able to create automatic workflows that could lock down buckets or archive sensitive data for you.

## Discover sensitive data within your buckets

When you're ready to begin scrubbing the data that resides within your S3 buckets, you'll need to create a run sensitive data discovery jobs. A **sensitive data discovery job**, as the name alludes to, allows you to analyze objects that are stored within your Amazon S3 buckets for sensitive content.

Sensitive content might include any of the following: 

- financial information, i.e. credit cards and bank accounts
- personal information such as names, address and contacting data
- national information like passports, IDs, driver's license and social security numbers
- medical information like healthcare, data, pharmacy information and drug agencies, 
- credentials and secrets, like AWS secret keys and private keys. 

These jobs will have a detailed report of any sensitive data that they find, as well as an overall analysis. A job can be scheduled to run either one time or on a daily, weekly or monthly basis. A sensitive data discovery job is able to analyze objects by using identifiers.

### Managed data identifiers

The managed data identifier are a built-in set of parameters and techniques that detect specific varieties of data. These are created and curated by AWS. With this option, Macie is in charge of these data types. As a list of new and important data identifiers grows, Amazon Macie will automatically include them. The current list is defined by data protection regulations like GDPR, PCI, DSS, CCPA and HIPAA. 

### Custom data identifiers

The custom identifiers are ones that you create and manage. They are written in the form of regular expressions which defines specific patterns to match to and could include things like employee IDs, customer account numbers or other case specific sensitive data types. 

## Severity Level 

You can also set a severity level for your custom data types. Each is set to medium by default, but having the ability to set multiple levels can be quite useful. 

- The custom data identifiers supplement the built-in managed data identifiers. 
- You'll be reported in the same way and location.
- You'll be notified by Macie if it detects text that match either identifier type.

Findings will be categorized by:

- What bucket they are in
- What type they are
- What job found them

These types and categories make it easy to filter on what you wish to search for. This allows you to help automate workflows or to even suppress specific types of findings that you know are clear based on your policy needs.

## Analyzing encrypted object

Amazon Macie supports reading and analyzing multiple encryption options for your S3 objects. Macie will decrypt the objects by using the Service Link role we spoke of earlier. However, it will depend on what type of encryptions the objects have used. 

- If an object was encrypted using server-side encryption with Amazon S3 managed keys, SSE-S3, Macie is able to decrypt and analyze this type of object without much trouble. 

- If the object uses server-side encryption with AWS KMS keys, SSE-KMS, these are also able to be decrypted fairly easily. 

- If this was encrypted with a customer managed KMS key, Macie can only decrypt the object, if you specifically allow Macie to use that key. 

- For server-side encryption with customer provided keys, SEE-C, Macie will be unable to decrypt to analyze the objects of this type. The service will only store and report metadata for that object.

- For client-side encryption, Macie will not be to decrypt or analyze the object. Again, the service will just store and report metadata for that object. 

Within the Macie console, you can sort and filter your buckets to see which types of encryption they may have. This might be useful if you wish to further investigate objects that Macie did not analyze.

## Supported file formats 

Macie is able to scrub through birth file formats and look for the managed data and custom data identifiers you've defined. 

Big data formats:

- Avro 
- Parquet

Compressed and archive data:

- .gz
- .gzip 
- .tar
- .zip files. 

Generic document types:

- .doc
- .docx
- .pdf
- .xls
- .xlsx

Pure text files:

- .cvs
- .htm
- .html
- .json
- .jsonal
- .tsl
- .txt
- .xml

Here's a note from Amazon about how deep Macie will look through your files:


:::note

"When Macie analyzes a compressed or archived file, it inspects both the full file and the contents of the file. To inspect the file's contents, it decompresses the file, and then inspects each extracted file that uses a support format. Macie can do this for as many as a million files and up to a nested depth of 10 levels."

:::

It's important to know that anything Macie does not support, it will not inspect. This means any video files or images, for example, will have to be checked on their own. You might try to create something using AWS recognition if that was important to you or your organization. 

## Integrations with AWS organizations

Amazon Macie has some impressive integrations with AWS organizations that make security of multiple accounts and their S3 buckets a lot easier. When working with multiple accounts, Macie provides **Macie administrator account** which can access and monitor your entire organization's S3 security. 

- Allows you to run sensitive data discovery jobs which are able to detect S3 data vulnerabilities across all member accounts.

- Has access to all policy findings, inventory data and other Macie settings and resources for each member account.

- Can have up to 5,000 members, when they use AWS organizations.

To start using Macie's new organization, you'll need to designate an account to be the Macie administrator. However, it is not recommended to not set this account to be the same as the organizational root account to keep power separated and follow the [principles of least privilege](/docs/007-Cybersecurity/006-Identity-and-Access-Management/005-IAM-Concepts.md#principle-of-least-privilege) whenever possible. 

It is important to note that an organization can only have a single administrator account at one time. And an account cannot be both a Macie admin and a member account.

To change the Macie administrator account, all member accounts will be removed. However, Macie will not be disabled from those member accounts. A member account can only be associated with one administrator at one time and it is unable to disassociate itself from that admin once under its stewardship. 


## Cost

Amazon Macie is a very impressive service that offers a lot of good protection. However, all that does come at some cost. There are two ways that Macie charges you:

- Throught static protection of your buckets:

    - Charged on a per bucket basis of 10 cents per S3 bucket per month.
    - Depending on how you've set up your S3 data, it has a potential to be a non-zero cost.

- Through sensitive data discovery jobs:

    - Like most AWS services and does get cheaper the more you use.
    - Starts off at $1 per gigabyte of data you scan for the first 50,000 gigs per month.
    - Depending on the size of your organization, that could be quite a sum of money.
