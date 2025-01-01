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
    - [aws-elb.log](@site/assets/elastic-stack/sample-logs/aws-elb.log)
    - [aws-alb.log](@site/assets/elastic-stack/sample-logs/aws-alb.log)
    - [aws-cloudfront.log](@site/assets/elastic-stack/sample-logs/aws-cloudfront.log)

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

    ```bash
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

    ```bash
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

    ```bash
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

    This confirms that the data from the Apache access logs is correctly indexed and ready for use.

    ```bash
    "hits": {
      "total": {
        "value": 8750,
        "relation": "eq" 
      },
      "max_score": 0,
      "hits": [
        {
          "_index": "apache-access-log",
          "_id": "5CGYIZQBoqYOKoM-DHMF",
          "_score": 0,
          "_source": {
            "user_agent": {
              "original": "WordPress"
            },
            "http": {
              "request": {
                "method": "GET",
                "referrer": "http://sundog-soft.com/clients/fs-aero/"
              },
              "version": "1.1",
              "response": {
                "status_code": 200,
                "body": {
                  "bytes": 13338
                }
              }
            },
            "tags": [
              "_geoip_lookup_failure"
            ],
            "@version": "1",
            "log": {
              "file": {
                "path": "/mnt/fileshare/logs/apache-access.log"
              }
            },
            "host": {
              "name": "node2"
            },
            "event": {
              "original": "54.210.20.202 - - [30/Apr/2017:05:24:05 +0000] \"GET /clients/fs-aero/ HTTP/1.1\" 200 13338 \"http://sundog-soft.com/clients/fs-aero/\" \"WordPress\""
            },
            "read_timestamp": "2025-01-01T11:19:53.612670899Z",
            "source": {
              "address": "54.210.20.202"
            },
            "url": {
              "original": "/clients/fs-aero/"
            },
            "@timestamp": "2017-04-30T05:24:05.000Z"
          }
        }
      ]
    }  
    ```    
