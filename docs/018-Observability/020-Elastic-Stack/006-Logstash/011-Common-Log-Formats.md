---
title: "Common Log Formats"
description: "Common Log Formats"
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

Grok filtering allows for the extraction and structuring of unstructured data from different kinds of logs. It simplifies parsing various log formats into structured fields for easier analysis and processing.  

This lab focuses on testing Grok patterns on a sample log and configuring Logstash to ingest and index the parsed data into Elasticsearch. The following log formats will be used in this lab:

- NGINX access logs
- IIS Server logs
- MongoDB logs
- User Agent and IP-to-Geolocation mapping logs
- Elasticsearch logs
- Elasticsearch Slow logs
- AWS Elastic Load Balancer (ELB) logs
- AWS Application Load Balancer (ALB) logs
- AWS CloudFront logs

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


## Importing the Sample Logs

On a computer with internet access:

1. Download the sample log files: 

    - [nginx-access.log](@site/assets/elastic-stack/sample-logs/nginx-access.log)
    - [iis-server.log](@site/assets/elastic-stack/sample-logs/iis-server.log)
    - [mongodb.log](@site/assets/elastic-stack/sample-logs/mongodb.log)
    - [apache-access.log](@site/assets/elastic-stack/sample-logs/apache-access.log)
    - [elasticsearch.log](@site/assets/elastic-stack/sample-logs/elasticsearch.log)
    - [es_slowlog.log](@site/assets/elastic-stack/sample-logs/es_slowlog.log)
    - [mysql-slow.log](@site/assets/elastic-stack/sample-logs/mysql-slow.log)
    <!-- - [aws-elb.log](@site/assets/elastic-stack/sample-logs/aws-elb.log)
    - [aws-alb.log](@site/assets/elastic-stack/sample-logs/aws-alb.log)
    - [aws-cloudfront.log](@site/assets/elastic-stack/sample-logs/aws-cloudfront.log) -->

2. Transfer the files to your virtual machine. 

    You can configure a fileshare in the VM's settings, map it to a local folder in your computer, and place the access log in that folder. Then, confirm the VM can access the fileshare and copy the log to `/tmp` within the VM.

    For more information, please see [Setup Fileshare](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare)

    :::info 

    For this lab, the sample log files are stored in `/mnt/fileshare/logs` inside the Elasticsearch node and will be referenced in the Logstash pipeline files in the succeeding sections. 

    :::


## NGINX Logs

Nginx logs provide valuable information such as request details, response times, and error messages, which are important for monitoring and troubleshooting web server performance. This section provides a walkthrough how to ingest and parse NGINX logs using Logstash.

Login to the Logstash node, switch to **root** user, and perform the following:

1. Create the `grok-nginx.conf` file.

    ```bash
    sudo vi /etc/logstash/conf.d/grok-nginx.conf
    ```

    Use the configuration file below:

    - [grok-nginx.conf](/docs/018-Observability/020-Elastic-Stack/006-Logstash/Logstash-config-files/grok-nginx.conf)

    :::info 

    Make sure to modify the details on the configuration file, such as the path of the sample log file and the Elasticsearch node specifications.

    :::

2. Start Logstash with the updated configuration:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-nginx.conf
    ```

Login to the Elasticsearch node and switch to **root** user:

1. Verify that the `nginx-access` index has been created. 

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index        uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   nginx-access 5S4no-NuTVOSUilwgntuCg   1   1        995            0    552.2kb        552.2kb      552.2kb
    yellow open   demo-grok    dBhwHfiJSty9Gog0vwWQXw   1   1          4            0     12.6kb         12.6kb       12.6kb
    ```             

2. Verify index data. 

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/nginx-access/_search?pretty=true -d'
    {
      "size": 1,
      "track_total_hits": true,
      "query": {
        "bool": {
          "must_not": [
            {
              "term": {
                "tags.keyword": "_grokparsefailure"
              }
            }
          ]
        }
      }
    }' | jq
    ```

    The log file has been successfully parsed, and you should see a response similar to the one below.

    ```json
        "_source": {
          "response_code": "200",
          "body_sent_bytes": "131",
          "referrer": "https://www.techstuds.com/blog/join-in-mongodb/",
          "@version": "1",
          "http_version": "1.1",
          "@timestamp": "2025-01-01T10:21:23.080929351Z",
          "access_time": "01/Jun/2020:15:49:10 +0000",
          "log": {
            "file": {
              "path": "/mnt/fileshare/logs/nginx-access.log"
            }
          },
          "remote_ip": "73.44.199.53",
          "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
          "http_method": "GET",
          "host": {
            "name": "node2"
          },
          "read_timestamp": "2025-01-01T10:21:23.080929351Z",
          "url": "/blog/join-in-mongodb/?relatedposts=1",
          "event": {
            "original": "73.44.199.53 - - [01/Jun/2020:15:49:10 +0000] \"GET /blog/join-in-mongodb/?relatedposts=1 HTTP/1.1\" 200 131 \"https://www.techstuds.com/blog/join-in-mongodb/\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36\""
          },
          "user_name": "-"
    ```    

## IIS Server Logs 

IIS server logs are used for monitoring web traffic, identifying potential issues, and ensuring optimal performance. This step explains how to ingest and parse IIS logs using Logstash and verify the data in Elasticsearch.

1. Log in to the Logstash node as the root user and create the configuration file:

    ```bash
    sudo vi /etc/logstash/conf.d/grok-iis-server.conf
    ```

    Use the configuration file below:

    - [grok-iis-server.conf](/docs/018-Observability/020-Elastic-Stack/006-Logstash/Logstash-config-files/grok-iis-server.conf)

    :::info 

    Make sure to modify the details on the configuration file, such as the path of the sample log file and the Elasticsearch node specifications.

    :::

2. After creating the configuration file, start Logstash:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-iis-server.conf
    ```

3. Log in to the Elasticsearch node as the root user and verify that the `iis-server-log` index has been created:

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index          uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   nginx-access   5S4no-NuTVOSUilwgntuCg   1   1        995            0    552.6kb        552.6kb      552.6kb
    yellow open   iis-server-log imBZpDsxTjqEGcYSLOQnxQ   1   1        145            0     86.4kb         86.4kb       86.4kb
    ```             

4. To verify the data in the `iis-server-log` index:

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/iis-server-log/_search?pretty=true -d'
    {
      "size": 1, 
      "track_total_hits": true,
      "query": {
        "bool": {
          "must_not": [
            {
              "term": {
                "tags.keyword": "_grokparsefailure"
              }
            }
          ]
        }
      }
    }'  | jq
    ```

    If the IIS log has been parsed correctly, you should see output similar to the following:

    ```json
    "hits": [
      {
        "_index": "iis-server-log",
        "_id": "9iFvIZQBoqYOKoM-hG1r",
        "_score": 0,
        "_ignored": [
          "event.original.keyword"
        ],
        "_source": {
          "uri_requested": "/de/",
          "cookie": "-",
          "http_version": "HTTP/2.0",
          "event": {
            "original": "2017-11-18 08:48:20 GET /de/ adpar=12345&gclid=1234567890 443 - 149.172.138.41 HTTP/2.0 Mozilla/5.0+(Windows+NT+10.0;+Win64;+x64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/62.0.3202.89+Safari/537.36+OPR/49.0.2725.39 - https://www.google.de/ www.site-logfile-explorer.com 200 0 0 12973 544 62"
          },
          "bytes_received": "544",
          "user_agent": "Mozilla/5.0+(Windows+NT+10.0;+Win64;+x64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/62.0.3202.89+Safari/537.36+OPR/49.0.2725.39",
          "time": "2017-11-18 08:48:20",
          "read_timestamp": "2025-01-01T10:35:41.136388394Z",
          "query": "adpar=12345&gclid=1234567890",
          "referrer_url": "https://www.google.de/",
          "protocol_substatus_code": "0",
          "bytes_sent": "12973",
          "method": "GET",
          "client_ip": "149.172.138.41",
          "log": {
            "file": {
              "path": "/mnt/fileshare/logs/iis-server.log"
            }
          },
          "username": "-",
          "http_status_code": "200",
          "win32_status": "0",
          "@timestamp": "2017-11-18T08:48:20.000Z",
          "port": "443",
          "time_taken": "62"
        }
      }
    ]
    ```    

## MongoDB Logs

MongoDB logs are useful for tracking the operational status, performance, and issues within your MongoDB instances. This section covers how to configure Logstash to ingest MongoDB logs and store them in Elasticsearch for better searching and analysis.

1. Log in to the Logstash node as the **root** user and create the configuration file:

    ```bash
    sudo vi /etc/logstash/conf.d/grok-mongodb.conf
    ```

    Use the configuration file below:

    - [grok-mongodb.conf](/docs/018-Observability/020-Elastic-Stack/006-Logstash/Logstash-config-files/grok-mongodb.conf)

    :::info 

    Make sure to modify the details on the configuration file, such as the path of the sample log file and the Elasticsearch node specifications.

    :::

2. After creating the configuration file, start Logstash:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-mongodb.conf
    ```

3. Log in to the Elasticsearch node as the **root** user and verify that the `mongodb-log` index has been created:

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index          uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   mongodb-log    T-btzMB8RLeQ3dXh2AiTcQ   1   1       1000            0    301.4kb        301.4kb      301.4kb
    yellow open   nginx-access   5S4no-NuTVOSUilwgntuCg   1   1        995            0    552.6kb        552.6kb      552.6kb
    yellow open   iis-server-log imBZpDsxTjqEGcYSLOQnxQ   1   1        145            0     86.5kb         86.5kb       86.5kb
    ```             

4. To verify the data inside the `mongodb-log` index, use the following query:

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/mongodb-log/_search?pretty=true -d'
    {
      "size": 1, 
      "track_total_hits": true,
      "query": {
        "bool": {
          "must_not": [
            {
              "term": {
                "tags.keyword": "_grokparsefailure"
              }
            }
          ]
        }
      }
    }' | jq
    ```

    This output confirms that MongoDB log data has been indexed correctly and is ready for search and analysis.

    ```json
    "hits": [
      {
        "_index": "mongodb-log",
        "_id": "hSF8IZQBoqYOKoM-6W7J",
        "_score": 0,
        "_source": {
          "host": {
            "name": "node2"
          },
          "severity": "I",
          "context": "main",
          "@timestamp": "2025-01-01T10:50:18.896177864Z",
          "@version": "1",
          "event": {
            "original": "2019-06-25T10:08:01.111+0000 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'"
          },
          "log": {
            "file": {
              "path": "/mnt/fileshare/logs/mongodb.log"
            }
          },
          "component": "CONTROL",
          "read_timestamp": "2025-01-01T10:50:18.896177864Z",
          "timestamp": "2019-06-25T10:08:01.111+0000",
          "log_message": "Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'"
        }
      }
    ]
    ```    


## User Agent and IP-to-Geolocation Mapping Logs 

When a web browser requests a page from a server, it sends a user agent that contains details like the operating system and browser being used. This helps identify issues related to specific operating systems, devices, or browsers.

Web servers also log the IP addresses of visitors. These logs are useful for debugging connectivity issues or blocking certain IP ranges. Additionally, mapping these IP addresses to geographic locations, such as countries or cities, is useful for statistical analysis and charts.

In this scenario, we will use Apache access logs.

1. Log in to the Logstash node as the **root** user and create the configuration file:

    ```bash
    sudo vi /etc/logstash/conf.d/grok-apache-access.conf
    ```

    Use the configuration file below:

    - [grok-apache-access.conf](/docs/018-Observability/020-Elastic-Stack/006-Logstash/Logstash-config-files/grok-apache-access.conf)

    :::info 

    Make sure to modify the details on the configuration file, such as the path of the sample log file and the Elasticsearch node specifications.

    :::

2. After creating the configuration file, start Logstash:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-apache-access.conf
    ```

3. Log in to the Elasticsearch node as the **root** user and verify that the `apache-access-log` index has been created:

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index             uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   mongodb-log       T-btzMB8RLeQ3dXh2AiTcQ   1   1       1000            0    301.8kb        301.8kb      301.8kb
    yellow open   nginx-access      5S4no-NuTVOSUilwgntuCg   1   1        995            0    552.6kb        552.6kb      552.6kb
    yellow open   iis-server-log    imBZpDsxTjqEGcYSLOQnxQ   1   1        145            0     86.5kb         86.5kb       86.5kb
    yellow open   apache-access-log OIix9FX3SiCDeiMf9FtEWA   1   1        250            0    192.1kb        192.1kb      192.1kb
    ```             

4. Use the following query to verify the data inside the `apache-access-log`index:

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/apache-access-log/_search?pretty=true -d'
    {
      "size": 10,
      "track_total_hits": true,
      "query": {
      "bool": {
        "must_not": [
          {
            "term": {
              "tags.keyword": "_grokparsefailure"
            }
          }
        ]
      }
      }
    }' | jq
    ```

## Elasticsearch Logs (Multi-line)

Elasticsearch generates multi-line logs, where a single event can span multiple lines. These logs use square brackets to indicate where an event begins and ends. Logstash processes these events using the multiline input codec.

1. Log in to the Logstash node as the **root** user and create the configuration file:

    ```bash
    sudo vi /etc/logstash/conf.d/grok-es-logs.conf
    ```

    **Note**: Update the file path and Elasticsearch node details in the configuration.

    Below is the configuration file:

    ```json
    input {
      file {
        path => "/mnt/fileshare/logs/elasticsearch.log"    ## sample csv file
        type => "elasticsearch"
        start_position => "beginning" 
        sincedb_path => "/dev/null"
        codec => multiline {
          pattern => "^\["
          negate => true
          what => "previous"
        }
      }
    }

    filter {
      if [type] == "elasticsearch" {
        grok {
          match => [ "message", "\[%{TIMESTAMP_ISO8601:timestamp}\]\[%{DATA:severity}%{SPACE}\]\[%{DATA:source}%{SPACE}\]%{SPACE}(?<message>(.|\r|\n)*)" ]
          overwrite => [ "message" ]
        }

        if "_grokparsefailure" not in [tags] {
          grok {  
            match => [
              "message", "^\[%{DATA:node}\] %{SPACE}\[%{DATA:index}\]%{SPACE}(?<short_message>(.|\r|\n)*)",
              "message", "^\[%{DATA:node}\]%{SPACE}(?<short_message>(.|\r|\n)*)" ]
            tag_on_failure => []
          }
        }
      }
    }

    output {
        stdout { codec => rubydebug }
        elasticsearch {
            hosts => ["https://192.168.56.101:9200"]                  ## address of elasticsearch node
            index => "es-test-logs"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            ssl_certificate_authorities => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```

    This configuration processes multi-line logs and extracts key details:

    - Multiline codec handles logs starting with "["
    - Continues until a line without "["
    - Grok filter extracts timestamp, severity, and node
    - Applies predefined patterns for processing

2. After creating the configuration file, start Logstash:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-es-logs.conf
    ```

3. Log in to the Elasticsearch node as the **root** user and verify that the `es-test-logs` index has been created:

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index             uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   mongodb-log       T-btzMB8RLeQ3dXh2AiTcQ   1   1       1000            0    301.8kb        301.8kb      301.8kb
    yellow open   nginx-access      5S4no-NuTVOSUilwgntuCg   1   1        995            0    552.6kb        552.6kb      552.6kb
    yellow open   es-test-logs      vEhLIHYBRSmErz9AKdN8zA   1   1        134            0    101.8kb        101.8kb      101.8kb
    yellow open   iis-server-log    imBZpDsxTjqEGcYSLOQnxQ   1   1        145            0     86.5kb         86.5kb       86.5kb
    yellow open   apache-access-log OIix9FX3SiCDeiMf9FtEWA   1   1     102972            0     34.3mb         34.3mb       34.3mb
    ```             

4. To filter non-multi-line log events, use the following query:

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/es-test-logs/_search?pretty=true -d'
    {
      "size": 1, 
      "query": {
        "bool": {
          "must_not": [
            {
              "match": {
                "tags": "multiline"
              }
            }
          ]
        }
      }
    }' | jq
    ```

    This query filters out logs tagged as "multiline."

    ```json
    {
      "took": 25,
      "timed_out": false,
      "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
      },
      "hits": {
        "total": {
          "value": 124,
          "relation": "eq"
        },
        "max_score": 0,
        "hits": [
          {
            "_index": "es-test-logs",
            "_id": "qSO1IZQBoqYOKoM-_QRQ",
            "_score": 0,
            "_source": {
              "log": {
                "file": {
                  "path": "/mnt/fileshare/logs/elasticsearch.log"
                }
              },
              "severity": "INFO",
              "node": "node-1",
              "timestamp": "2020-06-15T01:30:00,000",
              "@version": "1",
              "source": "o.e.x.m.MlDailyMaintenanceService",
              "short_message": "triggering scheduled [ML] maintenance tasks",
              "@timestamp": "2025-01-01T11:52:40.113091128Z",
              "type": "elasticsearch",
              "event": {
                "original": "[2020-06-15T01:30:00,000][INFO ][o.e.x.m.MlDailyMaintenanceService] [node-1] triggering scheduled [ML] maintenance tasks"
              },
              "message": "[node-1] triggering scheduled [ML] maintenance tasks",
              "host": {
                "name": "node2"
              }
            }
          }
        ]
      }
    }      
    ```

5. Similarly, to filter only multi-line log events, use the `must` parameter:

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/es-test-logs/_search?pretty=true -d'
    {
      "size": 1, 
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "tags": "multiline"
              }
            }
          ]
        }
      }
    }' | jq
    ```

    Output:

    ```json
    {
      "took": 13,
      "timed_out": false,
      "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
      },
      "hits": {
        "total": {
          "value": 10,
          "relation": "eq"
        },
        "max_score": 0.046520013,
        "hits": [
          {
            "_index": "es-test-logs",
            "_id": "4iO1IZQBoqYOKoM-_QRQ",
            "_score": 0.046520013,
            "_ignored": [
              "event.original.keyword",
              "message.keyword",
              "short_message.keyword"
            ],
            "_source": {
              "log": {
                "file": {
                  "path": "/mnt/fileshare/logs/elasticsearch.log"
                }
              },
              "severity": "WARN",
              "node": "node-1",
              "timestamp": "2020-06-15T17:13:35,451",
              "@version": "1",
              "source": "r.suppressed",
              "short_message": "path: /.kibana_task_manager/_count, params: {index=.kibana_task_manager}\norg.elasticsearch.action.search.SearchPhaseExecutionException: all shards failed\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.onPhaseFailure(AbstractSearchAsyncAction.java:551) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.executeNextPhase(AbstractSearchAsyncAction.java:309) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.onPhaseDone(AbstractSearchAsyncAction.java:580) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.onShardFailure(AbstractSearchAsyncAction.java:393) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.lambda$performPhaseOnShard$0(AbstractSearchAsyncAction.java:223) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction$2.doRun(AbstractSearchAsyncAction.java:288) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.common.util.concurrent.AbstractRunnable.run(AbstractRunnable.java:37) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.common.util.concurrent.TimedRunnable.doRun(TimedRunnable.java:44) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.common.util.concurrent.ThreadContext$ContextPreservingAbstractRunnable.doRun(ThreadContext.java:692) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.common.util.concurrent.AbstractRunnable.run(AbstractRunnable.java:37) [elasticsearch-7.7.0.jar:7.7.0]\n\tat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130) [?:?]\n\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:630) [?:?]\n\tat java.lang.Thread.run(Thread.java:832) [?:?]",
              "@timestamp": "2025-01-01T11:52:40.368678903Z",
              "tags": [
                "multiline"
              ],
              "type": "elasticsearch",
              "event": {
                "original": "[2020-06-15T17:13:35,451][WARN ][r.suppressed             ] [node-1] path: /.kibana_task_manager/_count, params: {index=.kibana_task_manager}\norg.elasticsearch.action.search.SearchPhaseExecutionException: all shards failed\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.onPhaseFailure(AbstractSearchAsyncAction.java:551) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.executeNextPhase(AbstractSearchAsyncAction.java:309) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.onPhaseDone(AbstractSearchAsyncAction.java:580) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.onShardFailure(AbstractSearchAsyncAction.java:393) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.lambda$performPhaseOnShard$0(AbstractSearchAsyncAction.java:223) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction$2.doRun(AbstractSearchAsyncAction.java:288) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.common.util.concurrent.AbstractRunnable.run(AbstractRunnable.java:37) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.common.util.concurrent.TimedRunnable.doRun(TimedRunnable.java:44) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.common.util.concurrent.ThreadContext$ContextPreservingAbstractRunnable.doRun(ThreadContext.java:692) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.common.util.concurrent.AbstractRunnable.run(AbstractRunnable.java:37) [elasticsearch-7.7.0.jar:7.7.0]\n\tat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130) [?:?]\n\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:630) [?:?]\n\tat java.lang.Thread.run(Thread.java:832) [?:?]"
              },
              "message": "[node-1] path: /.kibana_task_manager/_count, params: {index=.kibana_task_manager}\norg.elasticsearch.action.search.SearchPhaseExecutionException: all shards failed\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.onPhaseFailure(AbstractSearchAsyncAction.java:551) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.executeNextPhase(AbstractSearchAsyncAction.java:309) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.onPhaseDone(AbstractSearchAsyncAction.java:580) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.onShardFailure(AbstractSearchAsyncAction.java:393) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction.lambda$performPhaseOnShard$0(AbstractSearchAsyncAction.java:223) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.action.search.AbstractSearchAsyncAction$2.doRun(AbstractSearchAsyncAction.java:288) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.common.util.concurrent.AbstractRunnable.run(AbstractRunnable.java:37) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.common.util.concurrent.TimedRunnable.doRun(TimedRunnable.java:44) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.common.util.concurrent.ThreadContext$ContextPreservingAbstractRunnable.doRun(ThreadContext.java:692) [elasticsearch-7.7.0.jar:7.7.0]\n\tat org.elasticsearch.common.util.concurrent.AbstractRunnable.run(AbstractRunnable.java:37) [elasticsearch-7.7.0.jar:7.7.0]\n\tat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130) [?:?]\n\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:630) [?:?]\n\tat java.lang.Thread.run(Thread.java:832) [?:?]",
              "host": {
                "name": "node2"
              }
            }
          }
        ]
      }
    } 
    ```

## Elasticsearch Slow Logs 

Elasticsearch generate **slow logs**, which are used to optimize Elasticsearch search indexing and operations. These logs are simpler to process as they do not contain multi-line messages.

1. On the Logstash node, create the configuration file:

    ```bash
    sudo vi /etc/logstash/conf.d/grok-es_slowlog.conf
    ```

    **Note**: Update the file path and Elasticsearch node details in the configuration.

    Below is the configuration file:

    ```json
    input {
      file {
        path => "/mnt/fileshare/logs/es_slowlog.log"    ## sample csv file
        type => "elasticsearch"
        start_position => "beginning" 
        sincedb_path => "/dev/null"
        codec => plain {
            charset => "ISO-8859-15" #Reads plaintext with no delimiting between events
        }
      }
    }

    filter {
      grok {
        match => { "message" => ['\[%{TIMESTAMP_ISO8601:timestamp}\]\[%{LOGLEVEL:level}\]\[%{HOSTNAME:type}\]%{SPACE}\[%{HOSTNAME:[node_name]}\]%{SPACE}\[%{WORD:[index_name]}\]%{NOTSPACE}%{SPACE}took\[%{NUMBER:took_micro}%{NOTSPACE}\]%{NOTSPACE}%{SPACE}%{NOTSPACE}%{NOTSPACE}%{SPACE}%{NOTSPACE}%{NOTSPACE}%{SPACE}%{NOTSPACE}%{NOTSPACE}%{SPACE}search_type\[%{WORD:search_type}\]%{NOTSPACE}%{SPACE}total_shards\[%{NUMBER:total_shards}\]%{NOTSPACE}%{SPACE}source%{GREEDYDATA:query}\Z']}
      }
      
      mutate{
        remove_field => ["@version","@timestamp","host","path","logTook"] 
      }
    } 

    output {
        stdout { codec => rubydebug }
        elasticsearch {
            hosts => ["https://192.168.56.101:9200"]                  ## address of elasticsearch node
            index => "es-slow-logs"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            ssl_certificate_authorities => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```


2. After creating the configuration file, start Logstash:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-es_slowlog.conf
    ```

3. Log in to the Elasticsearch node as the **root** user and verify that the `es-slow-logs` index has been created:

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index             uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   mongodb-log       T-btzMB8RLeQ3dXh2AiTcQ   1   1       1000            0    301.8kb        301.8kb      301.8kb
    yellow open   es-slow-logs      WDPpwGWjT6yF6tIupd725Q   1   1        999            0    547.5kb        547.5kb      547.5kb
    yellow open   es-test-logs      vEhLIHYBRSmErz9AKdN8zA   1   1        134            0      102kb          102kb        102kb
    yellow open   nginx-access      5S4no-NuTVOSUilwgntuCg   1   1        995            0    552.6kb        552.6kb      552.6kb
    yellow open   iis-server-log    imBZpDsxTjqEGcYSLOQnxQ   1   1        145            0     86.5kb         86.5kb       86.5kb
    yellow open   apache-access-log OIix9FX3SiCDeiMf9FtEWA   1   1     102972            0     34.3mb         34.3mb       34.3mb
    ```             

4. Confirm that the logs has been parsed, ingested, and indexed.

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/es-slow-logs/_search?pretty=true -d'
    {  
      "size": 1
    }'
    ```

    Output:

    ```json
    {
      "took" : 6,
      "timed_out" : false,
      "_shards" : {
        "total" : 1,
        "successful" : 1,
        "skipped" : 0,
        "failed" : 0
      },
      "hits" : {
        "total" : {
          "value" : 999,
          "relation" : "eq"
        },
        "max_score" : 1.0,
        "hits" : [
          {
            "_index" : "es-slow-logs",
            "_id" : "LyPPIZQBoqYOKoM-HgUh",
            "_score" : 1.0,
            "_ignored" : [
              "event.original.keyword",
              "message.keyword",
              "query.keyword"
            ],
            "_source" : {
              "index_name" : "inv_02",
              "timestamp" : "2018-03-13T00:01:09,811",
              "took_micro" : "198.8",
              "node_name" : "node23",
              "log" : {
                "file" : {
                  "path" : "/mnt/fileshare/logs/es_slowlog.log"
                }
              },
              "total_shards" : "105",
              "event" : {
                "original" : "[2018-03-13T00:01:09,811][TRACE][index.search.slowlog.query] [node23] [inv_02][2] took[198.8micros], took_millis[0], types[], stats[], search_type[QUERY_THEN_FETCH], total_shards[105], source[{\"size\":1000,\"query\":{\"has_parent\":{\"query\":{\"bool\":{\"must\":[{\"terms\":{\"id_receipt\":[234707456,234707458],\"boost\":1.0}},{\"term\":{\"receipt_key\":{\"value\":6799,\"boost\":1.0}}},{\"term\":{\"code_receipt\":{\"value\":\"TKMS\",\"boost\":1.0}}}],\"disable_coord\":false,\"adjust_pure_negative\":true,\"boost\":1.0}},\"parent_type\":\"receipts\",\"score\":false,\"ignore_unmapped\":false,\"boost\":1.0}},\"version\":true,\"_source\":false,\"sort\":[{\"_doc\":{\"order\":\"asc\"}}]}], "
              },
              "search_type" : "QUERY_THEN_FETCH",
              "query" : "[{\"size\":1000,\"query\":{\"has_parent\":{\"query\":{\"bool\":{\"must\":[{\"terms\":{\"id_receipt\":[234707456,234707458],\"boost\":1.0}},{\"term\":{\"receipt_key\":{\"value\":6799,\"boost\":1.0}}},{\"term\":{\"code_receipt\":{\"value\":\"TKMS\",\"boost\":1.0}}}],\"disable_coord\":false,\"adjust_pure_negative\":true,\"boost\":1.0}},\"parent_type\":\"receipts\",\"score\":false,\"ignore_unmapped\":false,\"boost\":1.0}},\"version\":true,\"_source\":false,\"sort\":[{\"_doc\":{\"order\":\"asc\"}}]}], ",
              "message" : "[2018-03-13T00:01:09,811][TRACE][index.search.slowlog.query] [node23] [inv_02][2] took[198.8micros], took_millis[0], types[], stats[], search_type[QUERY_THEN_FETCH], total_shards[105], source[{\"size\":1000,\"query\":{\"has_parent\":{\"query\":{\"bool\":{\"must\":[{\"terms\":{\"id_receipt\":[234707456,234707458],\"boost\":1.0}},{\"term\":{\"receipt_key\":{\"value\":6799,\"boost\":1.0}}},{\"term\":{\"code_receipt\":{\"value\":\"TKMS\",\"boost\":1.0}}}],\"disable_coord\":false,\"adjust_pure_negative\":true,\"boost\":1.0}},\"parent_type\":\"receipts\",\"score\":false,\"ignore_unmapped\":false,\"boost\":1.0}},\"version\":true,\"_source\":false,\"sort\":[{\"_doc\":{\"order\":\"asc\"}}]}], ",
              "level" : "TRACE",
              "type" : [
                "elasticsearch",
                "index.search.slowlog.query"
              ]
            }
          }
        ]
      }
    }
    ```


## MySQL Slow Logs (Multi-line)

MySQL generates **slow logs** for optimizing database performance. These logs differ from Elasticsearch slow logs as they include multi-line entries, requiring the multi-line codec for proper ingestion into Logstash and indexing into Elasticsearch.

1. On the Logstash node, create the configuration file:

    ```bash
    sudo vi /etc/logstash/conf.d/grok-mysql-slowlogs.conf
    ```

    **Note**: Update the file path and Elasticsearch node details in the configuration.

    Use the configuration file below:

    ```json
    input {
      file {
        path => "/mnt/fileshare/logs/mysql-slow.log"    ## sample csv file
        type => "elasticsearch"
        start_position => "beginning" 
        sincedb_path => "/dev/null"
        codec => multiline {
            pattern => "^# Time: %{TIMESTAMP_ISO8601}"
            negate => true
            what => "previous"
          }
      }
    }

    filter {
          mutate {
            gsub => [
              "message", "#", "",
              "message", "\n", " "
            ]
            remove_field => "host"
          }
          grok {
            match => { "message" => [
                  "Time\:%{SPACE}%{TIMESTAMP_ISO8601:timestamp}%{SPACE}User\@Host\:%{SPACE}%{WORD:user}\[%{NOTSPACE}\] \@ %{NOTSPACE:host} \[\]%{SPACE}Id\:%{SPACE}%{NUMBER:sql_id}%{SPACE}Query_time\:%{SPACE}%{NUMBER:query_time}%{SPACE}Lock_time\:%{SPACE}%{NUMBER:lock_time}%{SPACE}Rows_sent\:%{SPACE}%{NUMBER:rows_sent}%{SPACE}Rows_examined\:%{SPACE}%{NUMBER:rows_examined}%{SPACE}%{GREEDYDATA}; %{GREEDYDATA:command}\;%{GREEDYDATA}" 
          ] }
          }
          
          mutate {
            add_field => { "read_timestamp" => "%{@timestamp}" }
            #remove_field => "message"
          }
    }

    output {
        stdout { codec => rubydebug }
        elasticsearch {
            hosts => ["https://192.168.56.101:9200"]                  ## address of elasticsearch node
            index => "mysql-slowlogs"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            ssl_certificate_authorities => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```

    Each section of the configuration file serves a specific purpose:

    - If the line begins with `# Time:`, it's the start of a new log event.
    - Otherwise, append the line to the previous log event.
    - Extract key details like timestamp, user, query time, and rows.

2. After creating the configuration file, start Logstash:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-mysql-slowlogs.conf
    ```

3. Log in to the Elasticsearch node as the **root** user and verify that the `mysql-slowlogs` index has been created:

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index             uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   mongodb-log       T-btzMB8RLeQ3dXh2AiTcQ   1   1       1000            0    301.8kb        301.8kb      301.8kb
    yellow open   es-slow-logs      WDPpwGWjT6yF6tIupd725Q   1   1        999            0      548kb          548kb        548kb
    yellow open   es-test-logs      vEhLIHYBRSmErz9AKdN8zA   1   1        134            0      102kb          102kb        102kb
    yellow open   mysql-slowlogs    dyAGjXMAQeOIqz5BhbKinQ   1   1          5            0     39.5kb         39.5kb       39.5kb
    yellow open   nginx-access      5S4no-NuTVOSUilwgntuCg   1   1        995            0    552.6kb        552.6kb      552.6kb
    yellow open   iis-server-log    imBZpDsxTjqEGcYSLOQnxQ   1   1        145            0     86.5kb         86.5kb       86.5kb
    yellow open   apache-access-log OIix9FX3SiCDeiMf9FtEWA   1   1     102972            0     34.3mb         34.3mb       34.3mb
    ```             

4. Confirm that the logs has been parsed, ingested, and indexed.

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/mysql-slowlogs/_search?pretty=true -d'
    {

      "size":1,
      "query": {
        "bool": {
        "must_not": [
          {
            "term": {
              "tags.keyword": "_grokparsefailure"
            }
          }
        ]
      }
      }

    }'
    ```

    Output:

    ```json
    {
      "took" : 4,
      "timed_out" : false,
      "_shards" : {
        "total" : 1,
        "successful" : 1,
        "skipped" : 0,
        "failed" : 0
      },
      "hits" : {
        "total" : {
          "value" : 4,
          "relation" : "eq"
        },
        "max_score" : 0.0,
        "hits" : [
          {
            "_index" : "mysql-slowlogs",
            "_id" : "FiPmIZQBoqYOKoM-ygnd",
            "_score" : 0.0,
            "_source" : {
              "query_time" : "2.064824",
              "lock_time" : "0.000000",
              "@timestamp" : "2025-01-01T12:46:00.349405856Z",
              "command" : "SELECT SLEEP(2)",
              "tags" : [
                "multiline"
              ],
              "@version" : "1",
              "rows_examined" : "0",
              "timestamp" : "2020-06-03T06:03:33.675799Z",
              "read_timestamp" : "2025-01-01T12:46:00.349405856Z",
              "sql_id" : "4",
              "log" : {
                "file" : {
                  "path" : "/mnt/fileshare/logs/mysql-slow.log"
                }
              },
              "host" : "localhost",
              "rows_sent" : "1",
              "message" : " Time: 2020-06-03T06:03:33.675799Z  User@Host: root[root] @ localhost []  Id:     4  Query_time: 2.064824  Lock_time: 0.000000 Rows_sent: 1  Rows_examined: 0 SET timestamp=1591164213; SELECT SLEEP(2);",
              "event" : {
                "original" : "# Time: 2020-06-03T06:03:33.675799Z\n# User@Host: root[root] @ localhost []  Id:     4\n# Query_time: 2.064824  Lock_time: 0.000000 Rows_sent: 1  Rows_examined: 0\nSET timestamp=1591164213;\nSELECT SLEEP(2);"
              },
              "type" : "elasticsearch",
              "user" : "root"
            }
          }
        ]
      }
    } 
    ```

