---
title: "Ingesting Logs from S3"
description: "Ingesting Logs from S3"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Logstash
sidebar_position: 8
last_update:
  date: 12/30/2022
---

## Overview

S3 buckets are cloud storage containers provided by Amazon Web Services (AWS) to store and manage data. They can be used for various purposes, including storing logs, backups, and other files.

- S3 buckets allow for easy storage and retrieval of data.
- Store log files from different sources, such as applications or servers.

Logs stored in S3 buckets can be imported into Logstash to be transformed to structured data. Once processed, the logs can be sent to Elasticsearch for indexing and analysis.

## Lab Environment 

This lab focuses on importing logs stored in a S3 Bucket using Logstash and Elasticsearch.

| Node    | Hostname       | IP Address       | 
|---------|----------------|------------------|
| Node 1  | elasticsearch  |  192.168.56.101  |
| Node 2  | logstash       |  192.168.56.102 |

Setup details:

- The nodes are created in VirtualBox using Vagrant
- An SSH key is generated on the Elasticsearch node
 
- The Logstash node can reach Elasticsearch node via port 9200 

S3 Bucket detail:

- S3 Bucket named "prod-logs" is created and set to public access 
- IAM User "siem" is created and granted `Administrator` permissions (for testing)
- Access keys are generated under `siem` user

:::info

If you're using cloud compute instances, you can skip some of the pre-requites.

:::


## Pre-requisites 

- [Create the nodes in VirtualBox](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#setup-the-virtual-machines)
- [Install Elasticsearch on node 1](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#install-elasticsearch-817)
- [Install Logstash on node 2](/docs/053-Observability/020-Elastic-Stack/006-Logstash/001-Installing-Logstash.md)
- [Configure SSL on Elasticsearch](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/003-SSL-Configuration.md)
- [Share Elasticsearch CA cert to Logstash](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#share-the-certificate-to-other-vms-optional)
- [Install jq on Elasticsearch node](https://www.scaler.com/topics/linux-jq/)
- [AWS Account](https://aws.amazon.com/free/free-tier-faqs/?p=ft&z=subnav&loc=5&refid=f42fef03-b1e6-4841-b001-c44b4eccaf41)

## Create the AWS Resources 

:::info 

You can sign up for a [free tier account in AWS](https://signin.aws.amazon.com/signup?request_type=register).

:::

Login to your AWS Account and create the following resources. Note that 
You may use a different S3 Bucket name and IAM User name.

| Resource  | Name                          | How to                    |
|-----------|-------------------------------|---------------------------|
| S3 Bucket | `sample-logs-<add-name-here`  | [Using the S3 Console](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html)  |
| IAM User  | `logstash`                    | [Create an IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) |

S3 Bucket:

1. S3 Buckets need to have unique name. 
2. Set S3 Bucket access to public.
3. You may use a different S3 Bucket name.
4. **Upload the sample log file to the S3 Bucket:** [access_log.log](@site/assets/elastic-stack/sample-logs/access_log.log)
5. After the lab, you can delete this S3 Bucket.

IAM User:

1. Attach the `AmazonS3ReadOnlyAccess` policy directly to the IAM user.
2. After creating the user, select the user > Security credentials > Access keys > Create access key.
3. Set `Access key best practices & alternatives` to Other > Next > Create access key.
4. Copy the **Access key** and **Secret access key** > Done.

    :::info 

    Make sure to copy the Access key and Secret access key. 
    You will only see the secret access key once, during creation.

    ::::

5. After the lab, you can delete this IAM user.


## Configure Logstash 

Login to the Logstash node, switch to **root** user, and perform the following:

1. Create the `s3-read.conf` file.

    ```bash
    sudo vi /etc/logstash/conf.d/s3-read.conf
    ```

    Use the configuration file below. Make sure to set the following:

    - Bucket name
    - Region 
    - Access key
    - Secret access key
    - Index name (you can set any name)

    ```bash
    input {
      s3 {
        bucket => "samplelogs-eden"
        access_key_id=> "AKIA******************"
        secret_access_key=> "hW*******************************"
        region ==> "ap-southeast-1"
      }
    }

    filter {
      grok {
        match => { "message" => "%{COMBINEDAPACHELOG}" }
      }
      date {
        match => [ "timestamp", "dd/MMM/yyyy:HH:mm:ss Z" ]
      }
      mutate {
        add_field => { "debug" => "true" }
      }      
    }

    output {
        stdout {
          codec => rubydebug
        }
        elasticsearch {
            hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
            index => "s3-logs"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            cacert => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```

2. Start Logstash with the updated configuration:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/s3-read.conf
    ```


## Verify Data in Elasticsearch

Login to the Elasticsearch node and switch to **root** user:

1. First, store the Elasticsearch endpoint and credentials in variables:  

    ```bash
    ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
    ELASTIC_USER="your-username"
    ELASTIC_PW="your-password"
    ```  

2. Verify that the `s3-logs` index has been created.

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index           uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   demo-csv        bOUUiz2lSpWmeknhKl-H2Q   1   1          4            0     18.6kb         18.6kb       18.6kb
    yellow open   movielens-sql   GhfPWKYBQgumzbDiBPONTQ   1   1       1682            0    282.8kb        282.8kb      282.8kb
    yellow open   demo-json-drop  IwgvhAEEThGUYQcJX-cbuA   1   1          3            0     24.1kb         24.1kb       24.1kb
    yellow open   json-split      4CcfiWDVRQWkflMZP1jFlg   1   1          5            0     16.7kb         16.7kb       16.7kb
    yellow open   s3-logs         ZjOQ0u_hT2GMXfR1gz0xjQ   1   1      12875            0       10mb           10mb         10mb
    yellow open   demo-json       2abPTr7ZSPSKCFOgD7ED7Q   1   1         10            0     49.1kb         49.1kb       49.1kb  
    ```    



2. Run a sample query. This should return the apache logs in the sample log file puloaded to S3.

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET "$ELASTIC_ENDPOINT:9200/s3-logs/_search?pretty=true" | jq 
    ```
