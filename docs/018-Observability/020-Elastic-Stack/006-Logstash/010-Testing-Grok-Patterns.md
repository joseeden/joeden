---
title: "Testing Grok Patterns"
description: "Testing Grok Patterns"
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
sidebar_position: 10
last_update:
  date: 3/28/2023
---


## Overview 

Grok filtering is a powerful feature in Logstash that enables the extraction and structuring of unstructured data. By using patterns, Grok can match and parse specific fields from logs or text data, making it easier to process and analyze.  

This lab focuses on testing Grok patterns on a sample log and configuring Logstash to ingest the sample log, parse it with Grok, and then index the structured data into Elasticsearch.  

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


## Importing the Sample Log

On a computer with internet access:

1. Download the sample log file: [linux-system-log.log](@site/assets/elastic-stack/sample-logs/linux-system-log.log)

2. Check the sample log file:

    ```bash
    2020-10-11T09:49:35Z INFO variable server value is tomcat
    2020-03-14T22:50:34Z ERROR cannot find the requested resource
    2020-01-02T14:58:40Z INFO initializing the bootup
    2020-06-04T06:56:04Z DEBUG initializing checksum  
    ```

3. Transfer the files to your virtual machine. 

    You can configure a fileshare in the VM's settings, map it to a local folder in your computer, and place the access log in that folder. Then, confirm the VM can access the fileshare and copy the log to `/tmp` within the VM.

    For more information, please see [Setup Fileshare](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare)


## Configure Logstash

Login to the Logstash node, switch to **root** user, and perform the following:

1. Create the `grok-linux-log.conf` file.

    ```bash
    sudo vi /etc/logstash/conf.d/grok-linux-log.conf
    ```

    Use this configuration file: 

    ```json
    input {
      file {
        path => "/mnt/fileshare/logs/linux-system-log.log"    ## sample csv file
        start_position => "beginning"
        sincedb_path => "/dev/null"
      }
    }

    filter {
      grok {
        match => { "message" => ['%{TIMESTAMP_ISO8601:time} %{LOGLEVEL:logLevel} %{GREEDYDATA:logMessage}'] }
      }
    }

    output {
        stdout { codec => json_lines }
        elasticsearch {
            hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
            index => "demo-grok"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            cacert => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```

2. Start Logstash with the updated configuration:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-linux-log.conf
    ```

## Verify Data in Elasticsearch

Login to the Elasticsearch node and switch to **root** user:

1. First, store the Elasticsearch endpoint and credentials in variables:  

    ```bash
    ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
    ELASTIC_USER="your-username"
    ELASTIC_PW="your-password"
    ```  

2. Verify that the `demo-json` index has been created.

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index     uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size

    yellow open   demo-grok iaCaAbTXS-6TjGPUgEN8HA   1   1          4            0     12.6kb         12.6kb       12.6kb
    ```             

3. Verify index data:

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/demo-grok/_search?pretty=true -d'
    {
      "_source": [
        "logLevel",
        "time",
        "logMessage" 
      ]
    }' | jq
    ```

    Output:

    ```bash
    {
      "_source": [
        "logLevel",
        "time",
        "logMessage"
      ]
    }' | jq
    {
      "took": 4,
      "timed_out": false,
      "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
      },
      "hits": {
        "total": {
          "value": 4,
          "relation": "eq"
        },
        "max_score": 1,
        "hits": [
          {
            "_index": "demo-grok",
            "_id": "9yEKIZQBoqYOKoM-gWlY",
            "_score": 1,
            "_source": {
              "logLevel": "INFO",
              "logMessage": "variable server value is tomcat",
              "time": "2020-10-11T09:49:35Z"
            }
          },
          {
            "_index": "demo-grok",
            "_id": "-CEKIZQBoqYOKoM-gWlY",
            "_score": 1,
            "_source": {
              "logLevel": "INFO",
              "logMessage": "initializing the bootup",
              "time": "2020-01-02T14:58:40Z"
            }
          },
          {
            "_index": "demo-grok",
            "_id": "-SEKIZQBoqYOKoM-gWla",
            "_score": 1,
            "_source": {
              "logLevel": "ERROR",
              "logMessage": "cannot find the requested resource",
              "time": "2020-03-14T22:50:34Z"
            }
          },
          {
            "_index": "demo-grok",
            "_id": "-iEKIZQBoqYOKoM-gWla",
            "_score": 1,
            "_source": {
              "logLevel": "DEBUG",
              "logMessage": "initializing checksum",
              "time": "2020-06-04T06:56:04Z"
            }
          }
        ]
      }
    }    
    ```    


## Unrecognized Pattern 

From the Logstash node: 

1. Consider the [linux-system-log-2.log](@site/assets/elastic-stack/sample-logs/linux-system-log-2.log)

    ```bash
    2020-10-11T09:49:35Z INFO variable server value is tomcat
    2020-03-14T22:50:34Z ERROR cannot find the requested resource
    2020-01-02T14:58:40Z INFO initializing the bootup
    2020-06-04T06:56:04Z DEBUG initializing checksum
    2020-05-07T03:07:11Z INFO variable server value is tomcat
    98.45.112.110 GET /user/id/properties 
    98.45.112.110 GET /user/name/properties 
    ```

2. Create the new Logstash pipeline file. 

    ```bash
    sudo vi /etc/logstash/conf.d/grok-linux-log-2.conf
    ```

    Use this configuration file: 

    ```json
    input {
      file {
        path => "/mnt/fileshare/logs/linux-system-log-2.log"    ## sample csv file
        start_position => "beginning"
        sincedb_path => "/dev/null"
      }
    }

    filter {
      grok {
        match => { "message" => ['%{TIMESTAMP_ISO8601:time} %{LOGLEVEL:logLevel} %{GREEDYDATA:logMessage}'] }
      }
    }

    output {
        stdout { codec => json_lines }
        elasticsearch {
            hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
            index => "demo-grok-2"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            cacert => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```


3. Create the index.

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-linux-log-2.conf
    ```

Back at the Elasticsearch node:

1. Verify the index.

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index       uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   demo-grok   dBhwHfiJSty9Gog0vwWQXw   1   1          4            0     12.5kb         12.5kb       12.5kb
    yellow open   demo-grok-2 HGgW67D1Qb22Wim5s147aA   1   1          6            0     14.5kb         14.5kb       14.5kb    
    ``` 


2. Check the index data:

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/demo-grok-2/_search?pretty=true -d'
    { }' | jq
    ```

    The `_grokparsefailure` tag indicates a parsing issue in the log message.

    ```bash
    {
      "_index": "demo-grok-2",
      "_id": "_yEbIZQBoqYOKoM-KmkO",
      "_score": 1,
      "_source": {
        "@timestamp": "2025-01-01T09:03:35.540507681Z",
        "@version": "1",
        "time": "2020-06-04T06:56:04Z",
        "logMessage": "initializing checksum",
        "event": {
          "original": "2020-06-04T06:56:04Z DEBUG initializing checksum"
        },
        "log": {
          "file": {
            "path": "/mnt/fileshare/logs/linux-system-log-2.log"
          }
        },
        "message": "2020-06-04T06:56:04Z DEBUG initializing checksum",
        "host": {
          "name": "node2"
        },
        "logLevel": "DEBUG"
    },
    {
      "_index": "demo-grok-2",
      "_id": "ACEbIZQBoqYOKoM-KmoO",
      "_score": 1,
      "_source": {
        "@timestamp": "2025-01-01T09:03:35.541475910Z",
        "@version": "1",
        "event": {
          "original": "98.45.112.110 GET /user/id/properties "
        },
        "log": {
          "file": {
            "path": "/mnt/fileshare/logs/linux-system-log-2.log"
          }
        },
        "message": "98.45.112.110 GET /user/id/properties ",
        "host": {
          "name": "node2"
        },
        "tags": [
          "_grokparsefailure"
        ]
    }
    ```

## Multiple Patterns 

We can also define multiple patterns in Logstash to parse log files with diverse formats. This allows for extracting specific fields from various log messages.

From the Logstash node: 

1. Use the same [linux-system-log-2.log](@site/assets/elastic-stack/sample-logs/linux-system-log-2.log)

2. Create the new Logstash pipeline file. 

    ```bash
    sudo vi /etc/logstash/conf.d/grok-linux-log-3.conf
    ```

    Use this configuration file: 

    ```json
    input {
      file {
        path => "/mnt/fileshare/logs/linux-system-log-2.log"    ## sample csv file
        start_position => "beginning"
        sincedb_path => "/dev/null"
      }
    }

    filter {
      grok {
        match => { "message" => [
                  '%{TIMESTAMP_ISO8601:time} %{LOGLEVEL:logLevel} %{GREEDYDATA:logMessage}',
                  '%{IP:clientIP} %{WORD:httpMethod} %{URIPATH:url}'
                  ] }
    }
    }

    output {
        stdout { codec => json_lines }
        elasticsearch {
            hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
            index => "demo-grok-3"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            cacert => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }

    ```

3. Create the index.

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-linux-log-3.conf
    ```

Back at the Elasticsearch node:

1. Verify the index.

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index       uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   demo-grok   dBhwHfiJSty9Gog0vwWQXw   1   1          4            0     12.6kb         12.6kb       12.6kb
    yellow open   demo-grok-3 foAvM_VYTeyQ2qggUX_VfQ   1   1          6            0     14.6kb         14.6kb       14.6kb
    yellow open   demo-grok-2 HGgW67D1Qb22Wim5s147aA   1   1          6            0     14.6kb         14.6kb       14.6kb
    ``` 


2. Check the index data:

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/demo-grok-3/_search?pretty=true -d'
    { 
      "_source": {
        "excludes": [
          "@timestamp",
          "host",
          "path"
        ]
      }
    }' | jq
    ```

    We can see that the multiple patterns in the Logstash configuration successfully captured and parsed all logs, including fields like `httpMethod`, `clientIP`, and `url`.

    ```bash
    {
      "_index": "demo-grok-3",
      "_id": "ECExIZQBoqYOKoM-_Gqj",
      "_score": 1,
      "_source": {
        "event": {
          "original": "98.45.112.110 GET /user/id/properties" }
        },
        "httpMethod": "GET",
        "clientIP": "98.45.112.110",
        "log": {
          "file": {
            "path": "/mnt/fileshare/logs/linux-system-log-2.log" }
          }
        "url": "/user/id/properties",
        "message": "98.45.112.110 GET /user/id/properties ",
        "@version": "1"
    }
    ```    


## Cleanup 

Use the command below to delete the indices after the lab. Make sure to replace `enter-name` with the index name.

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XDELETE "$ELASTIC_ENDPOINT:9200/enter-name" | jq
```