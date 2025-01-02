---
title: "Input Plugin: Heartbeat"
description: "Input Plugin: Heartbeat"
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
sidebar_position: 15
last_update:
  date: 3/28/2023
---

## Overview 

The Heartbeat Input Plugin in Logstash generates regular events to test pipelines and monitor systems. It’s useful for debugging, automation, and checking data flow.  

- Creates events at set intervals for testing pipelines.  
- Check if logstash is up and running without any issue.
- Send periodic messages to Elasticsearch or any description.

This lab focuses on testing input plugins in Logstash and integrating them with Elasticsearch for log processing and data visualization. 


## Lab Environment 

| Node    | Hostname       | IP Address       | 
|---------|----------------|------------------|
| Node 1  | elasticsearch  |  192.168.56.101  |
| Node 2  | logstash       |  192.168.56.102  |

Setup details:

- The nodes are created in VirtualBox using Vagrant.
- An SSH key is generated on the Elasticsearch node
- The SSH key is shared to the Logstash node.
- The Logstash node can reach Elasticsearch node via port 9200 


## Pre-requisites 

- [Create the nodes in VirtualBox](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#setup-the-virtual-machines)
- [Install Elasticsearch on node 1](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#install-elasticsearch-817)
- [Install Logstash on node 2](/docs/018-Observability/020-Elastic-Stack/006-Logstash/001-Installing-Logstash.md)
- [Configure SSL on Elasticsearch](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#configure-ssl-on-elasticsearch)
- [Share Elasticsearch CA cert to Logstash](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#share-the-certificate-to-other-vms-optional)
- [Install jq on Elasticsearch node](https://www.scaler.com/topics/linux-jq/)


## Sending Messages at Set Intervals

Consider the sample `heartbeat.conf` below:

```json
input {
  heartbeat {
    message => "ok"
    interval => 5
    type => "heartbeat"
  }
}

output {
  if [type] == "heartbeat" {
    elasticsearch {
      hosts => ["https://192.168.56.101:9200"]                  ## address of elasticsearch node
      index => "heartbeat"
      user => "elastic"
      password => "elastic"
      ssl => true
      ssl_certificate_authorities => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
    }
  }
 stdout {
  codec => "rubydebug"
  }
} 
```

This configuration sets the `heartbeat` type to be sent every 5 seconds. Save the configuration file under `/etc/logstash/conf.d/` and run:

```bash
/usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/heartbeat.conf
```

You should see the output printed every 5 seconds, like this:

```bash
{
          "type" => "heartbeat",
       "message" => "ok",
    "@timestamp" => 2025-01-01T17:06:41.829207384Z,
          "host" => {
        "name" => "node2"
    },
      "@version" => "1"
}
{
          "type" => "heartbeat",
       "message" => "ok",
    "@timestamp" => 2025-01-01T17:06:46.831802882Z,
          "host" => {
        "name" => "node2"
    },
      "@version" => "1"
}
{
          "type" => "heartbeat",
       "message" => "ok",
    "@timestamp" => 2025-01-01T17:06:51.832630046Z,
          "host" => {
        "name" => "node2"
    },
      "@version" => "1"
} 
```

From the Elasticsearch, verify that the index has been created:

```bash
health status index     uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
yellow open   heartbeat m4-s-GupTaWqLtQoR-VdHg   1   1          6            0     40.1kb         40.1kb       40.1kb 
```

Check the data in Elasticsearch:

```bash
curl -s -u elastic:elastic  \
-H 'Content-Type: application/json' \
-XGET https://localhost:9200/heartbeat/_search?pretty=true -d'
{
  "size": 1
}' | jq
```

Sample output:

```json
{
  "took": 14,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 41,
      "relation": "eq"
    },
    "max_score": 1,
    "hits": [
      {
        "_index": "heartbeat",
        "_id": "6SPTIpQBoqYOKoM-ZAuh",
        "_score": 1,
        "_source": {
          "type": "heartbeat",
          "message": "ok",
          "@timestamp": "2025-01-01T17:04:26.689529157Z",
          "host": {
            "name": "node2"
          },
          "@version": "1"
        }
      }
    ]
  }
} 
```
