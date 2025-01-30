---
title: "Heartbeat Plugin"
description: "Heartbeat Plugin"
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
sidebar_position: 1
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
 
- The Logstash node can reach Elasticsearch node via port 9200 


## Pre-requisites 

- [Create the nodes in VirtualBox](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#setup-the-virtual-machines)
- [Install Elasticsearch on node 1](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#install-elasticsearch-817)
- [Install Logstash on node 2](/docs/018-Observability/020-Elastic-Stack/006-Logstash/001-Installing-Logstash.md)
- [Configure SSL on Elasticsearch](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/003-SSL-Configuration.md)
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
      hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
      index => "heartbeat"
      user => "elastic"
      password => "enter-password-here"
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
curl -u $ELASTIC_USER:$ELASTIC_PW --insecure \
-X GET "$ELASTIC_ENDPOINT:9200/_cat/indices?v"
```

:::info 

Store the Elasticsearch endpoint and credentials in variables:  

```bash
ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
ELASTIC_USER="your-username"
ELASTIC_PW="your-password"
```  

:::


Output:

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
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/heartbeat/_search?pretty=true -d'
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


## Epoch Messages

The `heartbeat` input plugin can also send messages with the value set to "epoch." This configuration helps to generate time-based messages, stored in a dedicated index. This is usefule when we want to calculate the delays in the ingestion pipeline by substracting the ingestion time by the actual time the event is generated.

Save the following configuration as `/etc/logstash/conf.d/plugin-heartbeat-epoch.conf`:

```json
input {
  heartbeat {
    message => "epoch"
    interval => 5
    type => "heartbeat"
  }
}

output {
  if [type] == "heartbeat" {
    elasticsearch {
      hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## Elasticsearch node address
      index => "heartbeat-epoch"
      user => "elastic"
      password => "enter-password-here"
      ssl => true
      ssl_certificate_authorities => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
    }
  }
  stdout {
    codec => "rubydebug"
  }
} 
```

This configuration sends messages with a `message` field set to "epoch" at 5-second intervals and stores them in the `heartbeat-epoch` index.

Start Logstash with the configuration:

```bash
/usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/plugin-heartbeat-epoch.conf
```

Run the following command on the Elasticsearch node to confirm that the index was created:

```bash
curl -u $ELASTIC_USER:$ELASTIC_PW --insecure \
-X GET "$ELASTIC_ENDPOINT:9200/_cat/indices?v"
```

Sample Output:

```bash
health status index           uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
yellow open   heartbeat       m4-s-GupTaWqLtQoR-VdHg   1   1       5032            0    431.4kb        431.4kb      431.4kb
yellow open   heartbeat-epoch i_Cqj6SVTVa6YfXke8uq7A   1   1         53            0     58.6kb         58.6kb       58.6kb
```

Query Elasticsearch to view the indexed data:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/heartbeat-epoch/_search?pretty=true -d'
{
  "size": 1
}' | jq
```

This will display a sample document, showing the message set to "epoch" and the corresponding timestamp.

```bash
{
  "took": 22,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 80,
      "relation": "eq"
    },
    "max_score": 1,
    "hits": [
      {
        "_index": "heartbeat-epoch",
        "_id": "WSPTMJQBoqYOKoM-0x_V",
        "_score": 1,
        "_source": {
          "@version": "1",
          "message": "epoch",
          "type": "heartbeat",
          "@timestamp": "2025-01-04T10:19:35.879415471Z",
          "host": {
            "name": "node2"
          }
        }
      }
    ]
  } 
```

## Sequence Messages

This configuration sets up Logstash to generate heartbeat messages at regular intervals. Each message includes a unique, incrementing sequence number to track the events.

Save the following configuration as `/etc/logstash/conf.d/plugin-heartbeat-sequence.conf`:

```json
input {
  heartbeat {
    message => "sequence"
    interval => 5
    type => "heartbeat"
  }
}

filter {
  if [type] == "heartbeat" {
    ruby {
      code => '
        if !defined?($sequence_number)
          $sequence_number = 0
        end
        $sequence_number += 1
        event.set("sequence_number", $sequence_number)
      '
    }
  }
}

output {
  if [type] == "heartbeat" {
    elasticsearch {
      hosts => ["$ELASTIC_ENDPOINT:9200"]
      index => "heartbeat-sequence"
      user => "elastic"
      password => "enter-password-here"
      ssl => true
      ssl_certificate_authorities => "/usr/share/ca-certificates/elastic-ca.crt"
    }
  }
  stdout {
    codec => "rubydebug"
  }
}
```

Start Logstash with the command:

```bash
/usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/plugin-heartbeat-sequence.conf
```

Logstash will output messages every 5 seconds, each with an incrementing `sequence_number`.

```json
{
         "@timestamp" => 2025-01-04T10:35:18.867765167Z,
    "sequence_number" => 1,
           "@version" => "1",
               "type" => "heartbeat",
            "message" => "sequence",
               "host" => {
        "name" => "node2"
    }
}
{
         "@timestamp" => 2025-01-04T10:35:23.854339816Z,
    "sequence_number" => 2,
           "@version" => "1",
               "type" => "heartbeat",
            "message" => "sequence",
               "host" => {
        "name" => "node2"
    }
}
{
         "@timestamp" => 2025-01-04T10:35:28.855818208Z,
    "sequence_number" => 3,
           "@version" => "1",
               "type" => "heartbeat",
            "message" => "sequence",
               "host" => {
        "name" => "node2"
    }
}
{
         "@timestamp" => 2025-01-04T10:35:33.857222134Z,
    "sequence_number" => 4,
           "@version" => "1",
               "type" => "heartbeat",
            "message" => "sequence",
               "host" => {
        "name" => "node2"
    }
}
```

To verify, check the index in Elasticsearch:

```bash
curl -u $ELASTIC_USER:$ELASTIC_PW --insecure \
-X GET "$ELASTIC_ENDPOINT:9200/_cat/indices?v"
```

Example output:

```bash
health status index              uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
yellow open   heartbeat          m4-s-GupTaWqLtQoR-VdHg   1   1       5112            0    404.6kb        404.6kb      404.6kb
yellow open   heartbeat-sequence s4d7tOJbTdqp-d_HJOC7Rw   1   1        179            0     81.1kb         81.1kb       81.1kb
yellow open   heartbeat-epoch    i_Cqj6SVTVa6YfXke8uq7A   1   1        132            0     81.3kb         81.3kb       81.3kb
```

Query Elasticsearch to view the indexed data:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/heartbeat-sequence/_search?pretty=true -d'
{
  "sort": [{
      "@timestamp": {
        "order": "asc"      
      }
  }]
}' | jq
``` 


## Cleanup 

Use the command below to delete the indices after the lab. Make sure to replace `enter-name` with the index name.

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XDELETE "$ELASTIC_ENDPOINT:9200/enter-name" | jq
```