---
title: "Amazon Opensearch"
description: "Amazon Opensearch"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 1
last_update:
  date: 3/28/2023
---


## Overview

Amazon OpenSearch is a managed service for deploying and operating Elasticsearch clusters with built-in Kibana for data visualization. It supports real-time search and analytics, integrates with AWS services, and includes advanced security features.  

- Fully managed service with automated updates and scaling  
- Supports integration with Kinesis, CloudWatch, and S3  

:::info 

Amazon OpenSearch was previously known as Amazon Elasticsearch because it originated as a managed service for Elasticsearch.

::::



## Configuring Opensearch 

For customers in the AWS Free Tier, OpenSearch Service provides free usage of up to 750 hours per month of a t2.small.search or t3.small.search instance. For more information, please see [Amazon OpenSearch Service Pricing.](https://aws.amazon.com/opensearch-service/pricing/)

1. **Log in** to the AWS Console and navigate to the Amazon OpenSearch page.  
2. **Create a Domain**: Click "Create Domain" (a domain represents a cluster).  
3. **Set a Cluster Name**: Enter a name for your cluster.  
4. **Configure Domain Settings**:  

| Setting                    | Value                  |  
|----------------------------|------------------------|  
| Domain creation method     | Standard create        |  
| Templates                  | Dev/test               |  
| Deployment option          | Domain without standby |  
| Availability zone          | 1-AZ                  |  
| Engine options             | Latest version         |  

5. **Configure Data Nodes**:  

| Setting                   | Value                        |  
|---------------------------|------------------------------|  
| Instance family           | Memory optimized            |  
| Instance type             | r5.large.search             |  
| Number of data nodes      | 1                            |  
| Storage type              | EBS                          |  
| EBS volume type           | General Purpose (SSD) - gp3 |  
| Advanced volume options   | Default                      |  

6. **Master Nodes**: Leave **Enable dedicated master nodes** unchecked.  

:::info  
For production setups, use at least 3 dedicated master instances to ensure cluster availability.  
:::  

7. **Network Settings**: Set the network to **Public access** for now.  

:::info  
For production setups, always use VPC access for enhanced security.  
:::  

8. **Fine-Grained Access Control**:  

| Setting                      | Value                        |  
|------------------------------|------------------------------|  
| Enable fine-grained access   | Yes                          |  
| Master user                  | Use IAM ARN or create a user |  
| IAM ARN                      | Provide IAM ARN              |  
| Master username/password     | Set credentials              |  

9. **Access Policy**: Select **Configure domain-level access policy > JSON** and paste the following policy. Update the `Resource` field with your resource ARN.

```json title="Access Policy"  
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "es:ESHttpGet",
      "Resource": "arn:aws:es:us-east-1:12345678910:domain/my-opensearch/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "es:*",
      "Resource": "arn:aws:es:us-east-1:12345678910:domain/my-opensearch/*"
    }
  ]
}
```  

10. **Review and Create**: Review the configuration and click **Create**.  

## Test the Cluster 

On the console, select the Domain endpoint link. 

1. Open a terminal and run the following:

  ```bash
  curl -XGET https://my-openseardh-qwertyuiasdfghjjkl.us-east-1.es.amazonaws.com \
  -u 'admin:add-password-here'
  ```

  Output:

  ```json
  {
    "name" : "******************",   
    "cluster_name" : "12345678910:my-opensearch",
    "cluster_uuid" : ""******************",     
    "version" : {
      "distribution" : "opensearch",
      "number" : "2.17.0",
      "build_type" : "tar",
      "build_hash" : "unknown",
      "build_date" : "2023-12-17T11:14:55.776568428Z",
      "build_snapshot" : false,
      "lucene_version" : "9.11.1",
      "minimum_wire_compatibility_version" : "7.10.0",
      "minimum_index_compatibility_version" : "7.0.0"
    },
    "tagline" : "The OpenSearch Project: https://opensearch.org/"
  }
  ```

2. Import data to Opensearch.

  ```bash
  curl -s -u 'admin:add-password-here' \
  -H 'Content-Type: application/json' \
  -XPUT https://my-openseardh-qwertyuiasdfghjjkl.us-east-1.es.amazonaws.com/_bulk?pretty \
  --data-binary "@movies.json"
  ```

3. Verify that the index has been created.


  ```bash
  curl -s -u 'admin:add-password-here' \
  -H 'Content-Type: application/json' \
  -XGET https://my-openseardh-qwertyuiasdfghjjkl.us-east-1.es.amazonaws.com/_cat/indices?v
  ```

  Output:

  ```bash
  health status index                             uuid                   pri rep docs.count docs.deleted store.size pri.store.size
  green  open   .plugins-ml-model-group           iWVJMeUPRC2NgneFjLR8fA   1   0          1            0     13.4kb         13.4kb
  green  open   .plugins-flow-framework-state     0MfLPDJiQp62lV6ZzOpTJg   5   0          2            0     29.3kb         29.3kb
  green  open   .ql-datasources                   Px1yzKDGQ_uhfrTu7DplwQ   1   0          0            0       208b           208b
  green  open   .plugins-ml-agent                 8iJMHmt6Q060xQNn08Dl-A   1   0          1            0     16.7kb         16.7kb
  green  open   .plugins-ml-task                  umTG4B5yT0GQyPCTUh6-3Q   1   0          3            0     52.5kb         52.5kb
  green  open   .plugins-flow-framework-templates RszEIIN8SKaDh87VfTPyiw   5   0          2            0     18.8kb         18.8kb
  green  open   .kibana_1                         2gVRUPA2RSi4M7HmIlwZ5Q   1   0          1            0      5.2kb          5.2kb
  green  open   .opendistro_security              eh8sqjVARICaGTVPqDAW-A   1   0         10            2     76.7kb         76.7kb
  yellow open   movies                            rKzq_O6rTRmiZtI4p3LETw   5   1         50            0     39.1kb         39.1kb
  green  open   .opensearch-observability         _ml656htS4iLp_RRciEFpQ   1   0          0            0       208b           208b
  green  open   .plugins-ml-config                QbvYbTMTSvWGArG-48LSRQ   1   0          2            0      8.6kb          8.6kb
  green  open   .plugins-ml-model                 xklLhm_XSKexHNMjXCAo7Q   1   0          1            0    160.9kb        160.9kb
  green  open   .plugins-flow-framework-config    ClN-4X7ITSWadUYwbAIXQw   5   0          1            0      4.7kb          4.7kb 
  ```


## Access the Dashboard 

Back at the AWS Console, click the OpenSearch Dashboards link.

1. Login using the master username and password.

  ![](/img/docs/01232025-opensearch-login.png)

2. Choose Explore on my own. 

  ![](/img/docs/01232025-opensearch-login-2.png)

3. Click the hamburger button at the right > Management > Index Management > Indexes
4. You should see the `movie` index here.

  ![](/img/docs/01232025-opensearch-login-3.png)
