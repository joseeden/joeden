---
title: "Elastic Cloud"
description: "Elastic Cloud"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Opensearch
sidebar_position: 10
last_update:
  date: 3/28/2023
---

## Overview 

Elastic Cloud is a managed service for deploying, running, and scaling the Elasticsearch Stack in the cloud. It simplifies the process of setting up and maintaining Elasticsearch and its associated tools.

- Fully managed Elasticsearch service
- Includes search, analytics, and observability  
- Supports AWS, Google Cloud, and Azure for deployment  

## Creating a Deployment 

To use this managed service, sign up for a [14-day trial cluster](https://www.elastic.co/guide/en/cloud/current/ec-getting-started-trial.html). During sign-up, an Elasticsearch cluster will be created for you based on the details you'll provide. 

For this demo, I've deleted the deployment created during sign up and created a new one.

1. On the [Elastic main page](https://cloud.elastic.co/deployments), go to Deployment > Create deployment.

2. Set the following details. You can change the cloud provider and the region based on your preferred location. Click Continue.

    ![](/img/docs/01232025-elastic-creating-a-deployment.png)

3. Choose a solution view. You can change this later. Click Create deployment afterwards.

    ![](/img/docs/01232025-elastic-creating-a-deployment-2.png)

4. Make sure to save the deployment credentials.

    ![](/img/docs/01232025-elastic-creating-a-deployment-3.png)

5. The deployment will take around 10 minutes. Once done, click Continue. 

    ![](/img/docs/01232025-elastic-creating-a-deployment-4.png)

6. In the main page, you'll see the Elasticsearch endpoint. 

    ![](/img/docs/01232025-elastic-creating-a-deployment-5.png)

## Testing the Cluster 

Use the Elasticsearch endpoint and run the following command

```bash
curl -XGET https://c21e45fcb6ca4c9594c0cc05f8a03c76.asia-southeast1.gcp.elastic-cloud.com:443
```

As expected, this will return an error. This is because Elasticsearch is using X-PACK... 

```bash
{"error":{"root_cause":[{"type":"security_exception","reason":"missing authentication credentials for REST request [/]","header":{"WWW-Authenticate":["Basic realm=\"security\", charset=\"UTF-8\"","Bearer realm=\"security\"","ApiKey"]}}],"type":"security_exception","reason":"missing authentication credentials for REST request [/]","header":{"WWW-Authenticate":["Basic realm=\"security\", charset=\"UTF-8\"","Bearer realm=\"security\"","ApiKey"]}},"status":401} 
```

To authenticate to the cluster, provide the credentials:

```bash
curl -XGET https://c21e45fcb6ca4c9594c0cc05f8a03c76.asia-southeast1.gcp.elastic-cloud.com:443 -u elastic:add-password-here 
```

It should now succeed.

```bash
{
  "name" : "instance-0000000000",
  "cluster_name" : "c21e45fcb6ca4c9594c0cc05f8a03c76",
  "cluster_uuid" : "QMwQk4tIQyidcGrNoJyp0A",
  "version" : {
    "number" : "8.17.1",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "d4b391d925c31d262eb767b8b2db8f398103f909",
    "build_date" : "2025-01-10T10:08:26.972230187Z",
    "build_snapshot" : false,
    "lucene_version" : "9.12.0",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
} 
```

## Import Log File 

Click on the Kibana endpoint link to open Kibana in a new tab. 

1. Login to Kibana using the credentials from the previous section.
2. Click Import a CSV, NDJSON, or log file.
3. Select the file you want to upload. You can download the dataset here: [movies.json](@site/assets/elastic-stack/movies.json)
