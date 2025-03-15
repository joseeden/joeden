---
title: "Multi-Line and Slow Logs"
description: "Multi-Line Logs"
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
sidebar_position: 12
last_update:
  date: 12/30/2022
---


## Overview 

Multi-line logs, such as slow logs, often require specialized handling to capture and structure the data properly. Grok filtering can be used process log files with multi-line events. This makes it easier to extract meaningful data for analysis.

This lab focuses on how to test and apply Grok patterns to various multi-line log types:

- Elasticsearch logs  
- Elasticsearch slow logs  
- MySQL slow logs  

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

    - [elasticsearch.log](@site/assets/elastic-stack/sample-logs/elasticsearch.log)
    - [es_slowlog.log](@site/assets/elastic-stack/sample-logs/es_slowlog.log)
    - [mysql-slow.log](@site/assets/elastic-stack/sample-logs/mysql-slow.log)

2. Transfer the files to your virtual machine. 

    You can configure a fileshare in the VM's settings, map it to a local folder in your computer, and place the access log in that folder. Then, confirm the VM can access the fileshare and copy the log to `/tmp` within the VM.

    For more information, please see [Setup Fileshare](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare)

    :::info 

    For this lab, the sample log files are stored in `/mnt/fileshare/logs` inside the Elasticsearch node and will be referenced in the Logstash pipeline files in the succeeding sections. 

    :::



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
            hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
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
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/es-test-logs/_search?pretty=true -d'
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
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/es-test-logs/_search?pretty=true -d'
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
            hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
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
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v
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
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/es-slow-logs/_search?pretty=true -d'
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
            hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
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
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v
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
    curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/mysql-slowlogs/_search?pretty=true -d'
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


## Cleanup 

Use the command below to delete the indices after the lab. Make sure to replace `enter-name` with the index name.

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XDELETE "$ELASTIC_ENDPOINT:9200/enter-name" | jq
```