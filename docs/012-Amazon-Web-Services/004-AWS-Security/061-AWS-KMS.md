---
title: "AWS KMS"
description: "Create and control your cryptographic keys"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Security
- Certifications
sidebar_position: 61
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Key Management Service (KMS)

This is an AWS Managed service that makes it easy to create and manage keys, and control the use of encryption.

- Secure and resilient service that uses hardware security modules.
- Integrated with AWS CloudTrail to provide logs for all key usage.
- Audit logging and trailing is important to meet regulatory and compliance needs.
- Easy to create, manage, and control the use of encryption.
- Customer-managed key (CMK) can neve be exported.


### How it works

- Create a new customer-managed key (CMK) with the following details:
    - Alias and description
    - Key material (customer-provided or AWS-provided)
    - creation date 
    - key state
- Define the key adminitrative permissions:
    - Which IAM users/roles can manage the key?
- Define the key usage permissions: 
    - Which IAM users/roles can use the key to encrypt/decrypt data?

### Why use customer provided key material?

With customer-provided key, you can perform the following:

- You can import a symmetric 256-bt key from your existing key management infrastructure
- For compliance requirements
- To introduce non-AWS randomness 
- Can also be used to extend existing processes to AWS
- If you delete the key by accident, it stays for 7-30 days so it can still be retrieved

When a key is deleted completely, you will no longer be able to decrypt any content encrypted with that key.

### What are the cons of usind customer provided key material?

If we decided to go with customer-provided material, there are some points that we need to remember:

- Availability and durability are different from AWS-provided key material. 
- Automatic rotation is not available.
- Security of key generation is on the customer side.

## Encryption-at-rest Only 

It is important to understand that the KMS service is for encryption at rest only which can include for example S3 Object Storage, RDS, EMR and EBS Encryption to name a few. 

KMS does not perform encryption for data in transit or in motion. If you want to encrypt data while in transit, then you would need to use a different method such as SSL. However, if your data was encrypted at rest using KMS, then when it was sent from one source to another, that data would be a cipher text which could only be converted to plain text with the corresponding key. 

Another important aspect of encryption at rest is whether it is done:

- Server-side by the server
- Client-side by the end user

Examples of server-side encryption are back end servers that encrypt the data as it arrives transparent to the end user. The overhead of performing the encryption and managing the keys is handled by the server, in this case S3, not by the client-side application or the end user. 

On the other hand, client-side encryption requires the user to interact with the data to make the data encrypted and the overhead of encryption process is on the client rather than the server. 

## Compliance and Regulations 

When working with encrypted data, compliance and regulations are often tightly integrated. As a result, KMS works seamlessly with AWS CloudTrail to audit and track how your encryption keys are being used and by whom in addition to other metadata captured by the APIs used such as the source IP address.

The CloudTrail logs that are stored in S3 record KMS API calls such as:

- Decrypt
- Encrypt
- GenerateDataKey
- GetKeyPolicy

## Region-specific and Multi-region Keys 

KMS keys are initially region specific, which means you need to establish a Key Management Service in each region that you want to encrypt data. However, AWS has announced that multi-region keys are now supported for client-side encryption in the: 

- AWS Encryption SDK 
- AWS S3 Encryption Client 
- AWS DynamoDB Encryption Client 

## Customer Master Key (CMK)

The CMK is the main key type within KMS and can generate, encrypt and decrypt **data encryption keys** or **DEKs**, which are used outside of the KMS service by other AWS services to perform encryption against your data. 

CMKs can either be managed by AWS or by customers of AWS. 

- **AWS-Managed CMK**
    - CMKs managed by AWS are used by other AWS services that have the ability to interact with KMS directly to perform encryption against data:
        - Amazon S3
        - SSE-KMS
    
- **Customer-managed CMK**    
    - These are CMKs that are created and generated by customers rather than AWS. They provide the ability to implement greater flexibility,

        - rotation
        - governing access
        - key policy configuration
        - enabling/disabling the key when it is no longer required.

With many services that you use within AWS, you can control access using identity-based access IAM policies. However, KMS also uses resource-based policies when it comes to CMK access. If you want to allow other IAM users or roles in a different AWS account in which a CMK was created, then you must understand how KMS permissions work. 

### Access 

To manage access to your CMKs, you must use a **key policy**. Without a key policy associated to your CMK, users will not be able to use it. Permissions to allow you to access and use a CMK from a different AWS account can't be given and generated using IAM alone. 

As a result, you have to use and edit a resource-based key policy in the AWS account where the CMK resides, in addition to an IAM identity-based policy in the AWS account that wants to access the CMK. 

Note that you can only edit key policies for keys that you have created.

### Key Policies 

Key policies are resource-based policies that are tied to your CMK. And the key policy document itself is JSON-based, much like IAM policies. Below is an example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Sid": "statement identifier",
        "Effect": "effect",
        "Principal": "principal",
        "Action": "action",
        "Resource": "resource",
        "Condition": {
            "condition operator": { 
                "condition context key": "context key value"
                }
            }
    }
    ]
} 
``` 

During the creation of a CMK, whether you create it programmatically or if you've created it through the AWS Management Console, KMS will create a default key policy for you to allow principles to use the CMK in question. 

By default, KMS will configure the root user of the AWS account in which the key was created full access to the CMK within the key policy. 

### Creating CMKs 

When you create a CMK through the Management Console, then you can configure different permissions sets. These include key administrators and users. Key administrators can only administer the CMK, but not use it to perform any encryption functions. Whereas users have the ability to access the CMK to perform encryption of data. The permissions that can be given to use the key for any user selected, are as follows. 

- `kms:Encrypt`
- `kms:Decrypt`
- `kms:ReEncrypt*`
- `kms:GenerateDataKey*`
- `kms:DescribeKey`

### Sharing CMKs across accounts 

The first step in allowing the sharing of your CMK across AWS accounts is to add the principals from the external account into the key policy of the CMK. To do so, you will need to add a statement as shown where the text embed should be replaced with the external AWS account number.

```json
{
    "Sid": "Allow another AWS Account to use this CMK",
    "Effect": "Allow",
    "Principal": {
        "AWS": [
            "arn:aws:iam::123456789012:root"
        ]
    },
    "Action": [
        "kms:Encrypt",
        "kms:Decrypt",
        "kms:ReEncrypt*",
        "kms:GenerateDataKey*",
        "kms:DescribeKey"
    ],
    "Resource": "*"
}
```

This key policy statement can be created with even more granularity by limiting the specific actions required, or by specifying individual users or roles. For example, instead of using the root of the external account and the principal parameter, you could add an IAM user named Bob. 

```json
 "Principal": {
        "AWS": [
            "arn:aws:iam::123456789012:user/Bob"
        ]
    }
```

Once this statement is added to the key policy, the users within the account would still not be able to use the CMK until IAM permissions in the external account have been added to specific users or roles. And once the key policy has been edited to allow either the external account or specific users or roles from the external account access to a CMK, identity-based policies need to be associated with those users or roles who intend to use the CMK.

Let's assume that in the key policy, we set the principal component of the root of the external account. This would mean we can set the IAM permissions on any user or role in the external account to allow access to the CMK. The permissions required would need to include a statement as shown for the user or role.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Allow the use of a CMK In Account 1234567889012",
      "Effect": "Allow",
      "Action": [
        "kms:Encrypt",
        "kms:Decrypt",
        "kms:ReEncrypt*",
        "kms:GenerateDataKey*",
        "kms:DescribeKey"
      ],
      "Resource": [
        "arn:aws:kms:us-east-2:123456789012:key/5e698272-88c6-4f6b-970e-1d1dbd0c6412"
        ]
    }
  ]
}
```

In this policy, you'll notice that we have an additional parameter of resource, which details which CMK the action should take effect on. And in this instance, is the Amazon resource name of the CMK in which we updated the key policy for. 

ne other point that's important is that if for example, your key policy only allowed the **kms:Decrypt** action, but your IAM policy allowed both the kms:Decrypt and kms:encrypt actions, then only the kms:Decrypt action would be allowed, as that is all that is allowed in the key policy, which takes precedence.

Once the policy is associated with the user or role, you will now be able to use the CMK to perform encryption functions. However, please do be aware that even though you have access to the CMK from a different account, the CMK will not be shown in the AWS Management Console for integrated services. Instead, you must use the ARN of the CMK.

## Best practices on managing keys

- Avoid re-using encryption keys.
- Rotate the keys on a regular basis. 
- Key rotation varies depending if AWS-managed or customer-managed.
- AWS-managed keys cannot be deleted.

## Key Rotation

**AWS-Managed key:**

- Automatic rotation every three years
- Everything is handled by AWS 
- A new backing key is creataed and marked as active 
- Old key is available for decryption

**Customer-managed key:**

- Automatically rotate every year if enabled:

    - AWS KMS generated new cryptographical material for CMK
    - Old backing key is saved and can be used to decrypt data 
    - only available for AWS-imported key material

- On-demand manually:

    - Rotation frequency can be controlled
    - Keys can be deleted
