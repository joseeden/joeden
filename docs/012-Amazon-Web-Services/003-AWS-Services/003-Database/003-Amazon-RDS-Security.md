---
title: "Amazon RDS Security"
description: "Securing your Amazon RDS Databases"
tags: [Cloud, AWS, DevOps, Certifications]
sidebar_position: 3
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::


## Encryption at rest

- Possibility to encrypt the master and read replicas with AWS KMS - AES-256 encryption.
- Encryption has to be defined at the launch time.
- **If the master is not encrypted, the read replicas cannot be encrypted**.
- Transparent Data Encryption (TDE) is available for Oracle and SQL Server.

## Encryption in flight

Uses SSL certificates to encrypt data from client to RDS in flight. When using SSL, a trust certificate is used when connecting to the database.

To enforce SSL:

- PostgeSQL: 

    ```bash
    rds.force_ssl=1 in the AWS RDS Console (Parameter Groups)
    ```

- MySQL: 

    ```bash
    GRANT USAGE ON *.* To 'user'@'%' REQUIRE SSL; 
    ```

## Encrypting RDS backups

- Snapshots of un-encrypted RDS databases are un-encrypted.
- Snapshots of encrypted RDS databases are encrypted.
- We can copy an un-encrypted snapshot into an encrypted one.

## Encrypt an un-encrypted RDS database

1. Create a snapshot.
2. Copy the snapshot and enable encryption for the snapshot.
3. Restore the database from the encrypted snapshot.
4. Migrate application from the old database to the new one and delete the old database.

## Network Security and IAM

### Network security

- RDS databases are usually deployed within a private subnet.
- RDS security works by leveraging security groups (similar to EC2), they control who can communicate with the database instance.

### Access management

- There are IAM policies which help control who can manage an AWS RDS database (through the RDS API).
- Traditional username/password can be used to login into the database.
- IAM-based authentication can be used to login into MySQL and PostgreSQL. 

### IAM authentication

- IAM database authentication works with MySQL and PostgreSQL.
- We don't need a password to authenticate, just an authentication token obtained through IAM and RDS API calls.
- The token has a lifetime of 15 minutes.
- Benefits:
    - Network in/out must be encrypted using SSL.
    - IAM is used to centrally manage users instead of DB credentials.
    - We can manage IAM roles and EC2 instance profiles for easy integration.