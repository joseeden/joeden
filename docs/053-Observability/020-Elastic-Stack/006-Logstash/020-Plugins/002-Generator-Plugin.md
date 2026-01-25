---
title: "Generator Plugin"
description: "Generator Plugin"
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
sidebar_position: 2
last_update:
  date: 12/30/2022
---

## Overview 

The Generator Input Plugin in Logstash produces synthetic events for testing and development purposes. It allows users to simulate log data without requiring external input sources.

- Useful for debugging and validating Logstash pipelines
- Quick testing without connecting to live data sources

This lab focuses on testing input plugins in Logstash and integrating them with Elasticsearch for log processing and data visualization. 


## Lab Environment 

| Node    | Hostname       | IP Address       | 
|---------|----------------|------------------|
| Node 1  | elasticsearch  |  192.168.56.101  |
| Node 2  | logstash       |  192.168.56.102  |

Setup details:

- The nodes are created in VirtualBox using Vagrant.
- An SSH key is generated on the Elasticsearch node
 
- The Logstash node can reach Elasticsearch node via port 9200 


## Pre-requisites 

- [Create the nodes in VirtualBox](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#setup-the-virtual-machines)
- [Install Elasticsearch on node 1](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#install-elasticsearch-817)
- [Install Logstash on node 2](/docs/053-Observability/020-Elastic-Stack/006-Logstash/001-Installing-Logstash.md)
- [Configure SSL on Elasticsearch](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/003-SSL-Configuration.md)
- [Share Elasticsearch CA cert to Logstash](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#share-the-certificate-to-other-vms-optional)
- [Install jq on Elasticsearch node](https://www.scaler.com/topics/linux-jq/)


## Using the Plugin

Consider the sample `plugin-generator.conf` below:

```json
input {
  generator {
    lines => [
      '{"id": 1,"first_name": "john","last_name": "smith","email": "johnsmith@abc.com","gender": "Male","ip_address": "112.29.200.6"}', 
      '{"id": 2,"first_name": "jane","last_name": "doe","email": "janedoe@xyz.com","gender": "Female","ip_address": "98.98.248.37"}'
    ]
    count => 0
    codec =>  "json"
  }
}

output {
    elasticsearch {
      hosts => ["$ELASTIC_ENDPOINT:9200"]    ## address of elasticsearch node
      index => "generator"
      user => "elastic"
      password => "enter-password-here"
      ssl => true
      ssl_certificate_authorities => "/usr/share/ca-certificates/elastic-ca.crt"      ## Shared Elasticsearch CA certificate path
    }
 stdout {
  codec => "rubydebug"
  }
} 
```

This configuration sets up Logstash to generate synthetic JSON events and send them to Elasticsearch. The `generator` input plugin continuously produces sample log messages defined in the `lines` parameter. 

Run the configuration using Logstash:

```bash
/usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/plugin-generator.conf
```

This will output generated log events to the console and index them into Elasticsearch. 

:::info 

Store the Elasticsearch endpoint and credentials in variables:  

```bash
ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
ELASTIC_USER="your-username"
ELASTIC_PW="your-password"
```  

:::

To verify the indexed data in Elasticsearch:

```bash
curl -u $ELASTIC_USER:$ELASTIC_PW --insecure \
-X GET "$ELASTIC_ENDPOINT:9200/_cat/indices?v"
```

Query Elasticsearch to retrieve the data:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/generator/_search?pretty=true -d'
{
  "size": 1
}' | jq
```

The output confirms that the synthetic data was indexed successfully.

## Cleanup 

Use the command below to delete the indices after the lab. Make sure to replace `enter-name` with the index name.

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XDELETE "$ELASTIC_ENDPOINT:9200/enter-name" | jq
```