---
title: "AWS Logs"
description: "AWS Logs"
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
- Cloud 
- AWS
sidebar_position: 13
last_update:
  date: 12/30/2022
---




## Overview 

AWS logs, including Elastic Load Balancer (ELB) logs and CloudFront logs, provide valuable insights into application performance and traffic patterns. 

- ELB logs capture connection-level details for debugging network issues.
- Application Load Balancer (ALB) logs focus on request-level metrics 
- CloudFront logs record detailed information for CDN optimization.

Grokking can extract structured data from these logs by matching patterns, which makes it easier to analyze and index log data for monitoring and reporting.  

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


## Importing the Sample Logs

On a computer with internet access:

1. Download the sample log files: 

    - [aws-elb.log](@site/assets/elastic-stack/sample-logs/aws-elb.log)
    - [aws-alb.log](@site/assets/elastic-stack/sample-logs/aws-alb.log)
    - [aws-cloudfront.log](@site/assets/elastic-stack/sample-logs/aws-cloudfront.log)

2. Transfer the files to your virtual machine. 

    You can configure a fileshare in the VM's settings, map it to a local folder in your computer, and place the access log in that folder. Then, confirm the VM can access the fileshare and copy the log to `/tmp` within the VM.

    For more information, please see [Setup Fileshare](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare)

    :::info 

    For this lab, the sample log files are stored in `/mnt/fileshare/logs` inside the Elasticsearch node and will be referenced in the Logstash pipeline files in the succeeding sections. 

    :::


## ELB Logs 

Elastic Load Balancer (ELB) distributes traffic across backend instances and improves application availability and scalability. ELB access logs capture details such as request time, client IP, latencies, and server responses.

Steps to Process ELB Logs:

1. On the Logstash node, create the configuration file:

    ```bash
    sudo vi /etc/logstash/conf.d/grok-elb-logs.conf
    ```

    **Note**: Update the file path and Elasticsearch node details in the configuration.

    Use the configuration file below:

    ```json
    input {
      file {
        path => "/mnt/fileshare/logs/aws-elb.log"    ## sample csv file
        start_position => "beginning" 
        sincedb_path => "/dev/null"
      }
    }

    filter {
          grok {
            match => { "message" => ["%{TIMESTAMP_ISO8601:timestamp} %{NOTSPACE:loadbalancer} %{IP:client_ip}:%{NUMBER:client_port} (?:%{IP:backend_ip}:%{NUMBER:backend_port}|-) %{NUMBER:request_processing_time} %{NUMBER:backend_processing_time} %{NUMBER:response_processing_time} (?:%{NUMBER:elb_status_code}|-) (?:%{NUMBER:backend_status_code}|-) %{NUMBER:received_bytes} %{NUMBER:sent_bytes} \"(?:%{WORD:verb}|-) (?:%{GREEDYDATA:request}|-) (?:HTTP/%{NUMBER:httpversion}|-( )?)\" \"%{DATA:userAgent}\"( %{NOTSPACE:ssl_cipher} %{NOTSPACE:ssl_protocol})?"] }
            remove_field => "message"
          }
    }

    output {
        stdout { codec => rubydebug }
        elasticsearch {
            hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
            index => "aws-elb-logs"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            ssl_certificate_authorities => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```


2. After creating the configuration file, start Logstash:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-elb-logs.conf
    ```

3. Log in to the Elasticsearch node as the **root** user and verify that the `aws-alb-logs` index has been created:

    :::info 
    
    Store the Elasticsearch endpoint and credentials in variables:  

    ```bash
    ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
    ELASTIC_USER="your-username"
    ELASTIC_PW="your-password"
    ```  

    :::

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v
    ```

    Output:

    ```json
    health status index             uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   aws-elb-logs      4TMs0KYaQDGTg3h-Q4rZ1w   1   1         12            0       53kb           53kb         53kb
    ```        

4. Confirm that the logs has been parsed, ingested, and indexed.

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/aws-elb-logs/_search?pretty=true -d'
    {
      "size": 1,
      "query": {
        "bool": {
          "must_not": [
            {
            "term": {
              "tags": {
                "value": "_grokparsefailure"
              }
            }
          }
          ]
        }
      }
    }' | jq
    ```

    Parsed log entries include fields like `timestamp`, `client_ip`, `backend_ip`, `response_processing_time`, and more. The structured data can then be used for analysis and monitoring.

    ```json
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
          "value": 12,
          "relation": "eq"
        },
        "max_score": 0,
        "hits": [
          {
            "_index": "aws-elb-logs",
            "_id": "IiOrIpQBoqYOKoM-swnH",
            "_score": 0,
            "_ignored": [
              "event.original.keyword"
            ],
            "_source": {
              "response_processing_time": "0.000017",
              "ssl_protocol": "-",
              "@timestamp": "2025-01-01T16:21:04.868963430Z",
              "backend_status_code": "200",
              "received_bytes": "0",
              "host": {
                "name": "node2"
              },
              "timestamp": "2020-06-14T17:26:04.805368Z",
              "backend_port": "5000",
              "ssl_cipher": "-",
              "log": {
                "file": {
                  "path": "/mnt/fileshare/logs/aws-elb.log"
                }
              },
              "request_processing_time": "0.000032",
              "verb": "GET",
              "request": "http://my-clb-1-1798137604.us-east-2.elb.amazonaws.com:80/",
              "client_port": "39492",
              "@version": "1",
              "event": {
                "original": "2020-06-14T17:26:04.805368Z my-clb-1 170.01.01.02:39492 172.31.25.183:5000 0.000032 0.001861 0.000017 200 200 0 13 \"GET http://my-clb-1-1798137604.us-east-2.elb.amazonaws.com:80/ HTTP/1.1\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36\" - -"
              },
              "loadbalancer": "my-clb-1",
              "sent_bytes": "13",
              "client_ip": "170.01.01.02",
              "backend_processing_time": "0.001861",
              "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
              "backend_ip": "172.31.25.183",
              "httpversion": "1.1",
              "elb_status_code": "200"
            }
          }
        ]
      }
    }
    ```


## ALB Logs 

AWS Application Load Balancer (ALB) helps distribute incoming traffic across multiple targets, such as EC2 instances, based on request attributes. ALB logs capture detailed information on HTTP requests, such as request time, response times, request methods, and status codes. 

Steps to Process ALB Logs:

1. On the Logstash node, create the configuration file:

    ```bash
    sudo vi /etc/logstash/conf.d/grok-alb-logs.conf
    ```

    **Note**: Update the file path and Elasticsearch node details in the configuration.

    Use the configuration file below:

    ```json
    input {
      file {
        path => "/mnt/fileshare/logs/aws-alb.log"    ## sample csv file
        start_position => "beginning" 
        sincedb_path => "/dev/null"
      }
    }

    filter {
          grok {
            match => { "message" => ["%{NOTSPACE:request_type} %{TIMESTAMP_ISO8601:log_timestamp} %{NOTSPACE:alb-name} %{NOTSPACE:client}:%{NUMBER:client_port} (?:%{IP:backend_ip}:%{NUMBER:backend_port}|-) %{NUMBER:request_processing_time} %{NUMBER:backend_processing_time} %{NOTSPACE:response_processing_time:float} %{NOTSPACE:elb_status_code} %{NOTSPACE:target_status_code} %{NOTSPACE:received_bytes:float} %{NOTSPACE:sent_bytes:float} %{QUOTEDSTRING:request} %{QUOTEDSTRING:user_agent} %{NOTSPACE:ssl_cipher} %{NOTSPACE:ssl_protocol} %{NOTSPACE:target_group_arn} %{QUOTEDSTRING:trace_id}"] }
            remove_field => "message"
          }
    }

    output {
        stdout { codec => rubydebug }
        elasticsearch {
            hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
            index => "aws-alb-logs"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            ssl_certificate_authorities => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```


2. Run Logstash with the new configuration file:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-alb-logs.conf
    ```

3. Log in to the Elasticsearch node as the **root** user and verify the `aws-alb-logs` index:

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v
    ```

    Output:

    ```json
    health status index             uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   aws-alb-logs      URXZO-f2RAOIcVKBcujbFQ   1   1        665            0    589.7kb        589.7kb      589.7kb
    yellow open   aws-elb-logs      4TMs0KYaQDGTg3h-Q4rZ1w   1   1         12            0     53.2kb         53.2kb       53.2kb
    ```        

4. Ensure logs are correctly parsed and indexed:

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/aws-alb-logs/_search?pretty=true -d'
    {
      "size": 1,
      "query": {
        "bool": {
          "must_not": [
            {"term": {
              "tags": {
                "value": "_grokparsefailure"
              }
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
      "took": 5,
      "timed_out": false,
      "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
      },
      "hits": {
        "total": {
          "value": 665,
          "relation": "eq"
        },
        "max_score": 0,
        "hits": [
          {
            "_index": "aws-alb-logs",
            "_id": "KCOzIpQBoqYOKoM-OQnn",
            "_score": 0,
            "_ignored": [
              "event.original.keyword"
            ],
            "_source": {
              "alb-name": "elb1",
              "backend_ip": "10.0.2.143",
              "ssl_protocol": "-",
              "received_bytes": 0,
              "client_port": "55857",
              "request_type": "h2",
              "@version": "1",
              "event": {
                "original": "h2 2015-11-07T18:45:33.575333Z elb1 195.142.179.105:55857 10.0.2.143:80 0.000025 0.0003 0.000023 200 200 0 3764 \"GET http://example.com:80/favicons/favicon-160x160.png HTTP/1.1\" \"Mozilla/5.0 (Linux; Android 4.4.2; GT-N7100 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36\" - - arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067 \"Root=1-58337262-36d228ad5d99923122bbe354\""
              },
              "target_status_code": "200",
              "ssl_cipher": "-",
              "request": "\"GET http://example.com:80/favicons/favicon-160x160.png HTTP/1.1\"",
              "user_agent": "\"Mozilla/5.0 (Linux; Android 4.4.2; GT-N7100 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36\"",
              "trace_id": "\"Root=1-58337262-36d228ad5d99923122bbe354\"",
              "log": {
                "file": {
                  "path": "/mnt/fileshare/logs/aws-alb.log"
                }
              },
              "response_processing_time": 2.3e-05,
              "log_timestamp": "2015-11-07T18:45:33.575333Z",
              "host": {
                "name": "node2"
              },
              "request_processing_time": "0.000025",
              "backend_processing_time": "0.0003",
              "@timestamp": "2025-01-01T16:29:14.420018195Z",
              "target_group_arn": "arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067",
              "sent_bytes": 3764,
              "elb_status_code": "200",
              "client": "195.142.179.105",
              "backend_port": "80"
            }
          }
        ]
      }
    }
    ```


## CloudFront Logs 

Amazon CloudFront is a content delivery network (CDN) service designed to deliver data, videos, applications, and APIs globally with low latency. 

CloudFront logs record details about user requests, such as request timestamps, IP addresses, request URLs, and HTTP methods. These logs can be used to analyze traffic, optimize content delivery, and identify security threats.

Steps to Process ALB Logs:

1. On the Logstash node, create the configuration file:

    ```bash
    sudo vi /etc/logstash/conf.d/grok-cloudfront.conf
    ```

    **Note**: Update the file path and Elasticsearch node details in the configuration.

    Sample configuration file:

    ```json
    input {
      file {
        path => "/mnt/fileshare/logs/aws-cloudfront.log"    ## sample csv file
        start_position => "beginning" 
        sincedb_path => "/dev/null"
      }
    }

    filter {
      mutate {
              gsub => [
                "message", "\t", " ",
                "message", "\n", " "
              ]
            }
      grok {
              match => { "message" => [
                    "%{DATE:date}[ \t]%{TIME:time}[ \t]%{DATA:x_edge_location}[ \t](?:%{NUMBER:sc_bytes}|-)[ \t]%{IP:c_ip}[ \t]%{WORD:cs_method}[ \t]%{HOSTNAME:cs_host}[ \t]%{NOTSPACE:cs_uri_stem}[ \t]%{NUMBER:sc_status}[ \t]%{GREEDYDATA:referrer}[ \t]%{NOTSPACE:user_agent}[ \t]%{GREEDYDATA:cs_uri_query}[ \t]%{NOTSPACE:cookie}[ \t]%{WORD:x_edge_result_type}[ \t]%{NOTSPACE:x_edge_request_id}[ \t]%{HOSTNAME:x_host_header}[ \t]%{URIPROTO:cs_protocol}[ \t]%{INT:cs_bytes}[ \t]%{NUMBER:time_taken}[ \t]%{NOTSPACE:x_forwarded_for}[ \t]%{NOTSPACE:ssl_protocol}[ \t]%{NOTSPACE:ssl_cipher}[ \t]%{NOTSPACE:x_edge_response_result_type}[ \t]%{NOTSPACE:cs_protocol_version}[ \t]%{NOTSPACE:fle_status}[ \t]%{NOTSPACE:fle_encrypted_fields}[ \t]%{NOTSPACE:c_port}[ \t]%{NOTSPACE:time_to_first_byte}[ \t]%{NOTSPACE:x_edge_detailed_result_type}[ \t]%{NOTSPACE:sc_content_type}[ \t]%{NOTSPACE:sc_content_len}[ \t]%{NOTSPACE:sc_range_start}[ \t]%{NOTSPACE:sc_range_end}" 
            ] }
            }
      mutate {
            remove_field => "message"
          }
      if "_grokparsefailure" in [tags] { drop {} }
    }

    output {
        stdout { codec => rubydebug }
        elasticsearch {
            hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
            index => "aws-cloudfront-logs"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            ssl_certificate_authorities => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```


2. Run Logstash with the configuration file:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/grok-cloudfront.conf
    ```

3. Log in to the Elasticsearch node as the **root** user and verify the `aws-cloudfront-logs` index:

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v
    ```

    Output:

    ```json
    health status index               uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   aws-elb-logs        4TMs0KYaQDGTg3h-Q4rZ1w   1   1         12            0     53.2kb         53.2kb       53.2kb
    yellow open   aws-alb-logs        URXZO-f2RAOIcVKBcujbFQ   1   1        665            0    590.2kb        590.2kb      590.2kb
    yellow open   aws-cloudfront-logs 2F1NE3S0QgasK7IyWu8VGg   1   1         34            0       61kb           61kb         61kb
    ```        

4. Check the parsed logs in Elasticsearch:

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/aws-cloudfront-logs/_search?pretty=true -d'
    {
      "query": {
        "bool": {
          "must_not": [
            {"term": {
              "tags": {
                "value": "_grokparsefailure"
              }
            }
          }
          ]
        }
      }
    }' | jq
    ```

    Output:

    ```json
    "_source": {
      "x_edge_response_result_type": "Error",
      "cs_uri_stem": "/",
      "@timestamp": "2025-01-01T16:40:07.521849226Z",
      "cookie": "-",
      "user_agent": "Mozilla/5.0%20(X11;%20Linux%20x86_64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/77.0.3865.75%20Safari/537.36",
      "x_edge_result_type": "Error",
      "sc_bytes": "910",
      "cs_uri_query": "-",
      "time_to_first_byte": "0.001",
      "c_port": "57406",
      "fle_status": "-",
      "c_ip": "2409:4073:20a:8398:c85d:cc75:6c7a:be8b",
      "fle_encrypted_fields": "-",
      "sc_content_len": "507",
      "cs_host": "dej1k5scircsp.cloudfront.net",
      "event": {
        "original": "2020-06-16\t10:58:06\tMAA50-C2\t910\t2409:4073:20a:8398:c85d:cc75:6c7a:be8b\tGET\tdej1k5scircsp.cloudfront.net\t/\t502\t-\tMozilla/5.0%20(X11;%20Linux%20x86_64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/77.0.3865.75%20Safari/537.36\t-\t-\tError\txUfUnco4pMECnPLWxjHMHxhOObO59ga942MjjkmqRPj1kNdsNwUtgQ==\tdej1k5scircsp.cloudfront.net\thttp\t466\t0.001\t-\t-\t-\tError\tHTTP/1.1\t-\t-\t57406\t0.001\tError\ttext/html\t507\t-\t-"
      },
      "referrer": "-",
      "time": "10:58:06",
      "x_edge_detailed_result_type": "Error",
      "sc_range_start": "-",
      "cs_protocol_version": "HTTP/1.1",
      "x_edge_request_id": "xUfUnco4pMECnPLWxjHMHxhOObO59ga942MjjkmqRPj1kNdsNwUtgQ==",
      "cs_bytes": "466",
      "cs_protocol": "http",
      "sc_content_type": "text/html",
      "host": {
        "name": "node2"
      },
      "ssl_cipher": "-",
      "log": {
        "file": {
          "path": "/mnt/fileshare/logs/aws-cloudfront.log"
        }
      },
      "x_edge_location": "MAA50-C2",
      "cs_method": "GET",
      "time_taken": "0.001",
      "x_forwarded_for": "-",
      "sc_range_end": "-",
      "date": "20-06-16",
      "sc_status": "502",
      "@version": "1",
      "x_host_header": "dej1k5scircsp.cloudfront.net",
      "ssl_protocol": "-"
    }
    ```


## Cleanup 

Use the command below to delete the indices after the lab. Make sure to replace `enter-name` with the index name.

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XDELETE "$ELASTIC_ENDPOINT:9200/enter-name" | jq
```