---
title: "Sample Pipeline"
description: "Sample Pipeline"
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
  date: 3/28/2023
---


## Overview

This lab focuses on using a sample Apache web server log file with Logstash and Elasticsearch. 

- Configure Logstash to ingest log data from the sample file
- Verify successful indexing in Elasticsearch
- Query the indexed data.

## Lab Environment 

| Node    | Hostname       | IP Address       | 
|---------|----------------|------------------|
| Node 1  | elasticsearch  |  192.168.56.101  |
| Node 2  | logstash       |  192.168.56.103  |

Setup details:

- The nodes are created in VirtualBox using Vagrant.
- An SSH key is generated on the Elasticsearch node
- The SSH key is shared to the Logstash node.
- The Logstash node can reach Elasticsearch node via port 9200 


## Pre-requisites 

- [Create the nodes in VirtualBox](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant.md#setup-the-virtual-machines)
- [Install Elasticsearch on node 1](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant.md#install-elasticsearch-817)
- [Install Logstash on node 2](/docs/018-Observability/020-Elastic-Stack/006-Logstash/001-Installing-Logstash.md)
- [Configure SSL on Elasticsearch](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant.md#configure-ssl-on-elasticsearch)
- [Share Elasticsearch CA cert to Logstash](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant.md#share-the-certificate-to-other-vms-optional)
- [Install jq on Elasticsearch node](https://www.scaler.com/topics/linux-jq/)

## Steps 

Login to the Logstash node, switch to **root** user, and perform the following:

1. Download the sample Apache web server log file below: [access_log.log](@site/assets/elastic-stack/access_log.log)

    You can configure a fileshare in the VM's settings, map it to a local folder in your computer, and place the access log in that folder. Then, confirm the VM can access the fileshare and copy the log to `/tmp` within the VM.

    For more information, please see [Shared Folders - Oracle® VM VirtualBox.](https://docs.oracle.com/en/virtualization/virtualbox/6.0/user/sharedfolders.html)

2. Change the permissions of the sample log file.

    ```bash
    ls -la /tmp/access_log.log
    chmod 644 /tmp/access_log.log
    ```
    
3. Confirm that Logstash can communicate with Elasticsearch on port 9200.

    ```bash
    $ telnet 192.168.56.101 9200

    Trying 192.168.56.101...
    Connected to 192.168.56.101.
    Escape character is '^]'.  
    ```

4. Ensure that [Elasticsearch CA cert is shared to Logstash.](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant.md#share-the-certificate-to-other-vms-optional)

    Set the permissions and ownership.

    ```bash
    sudo chown root:logstash /usr/share/ca-certificates/elastic-ca.crt
    sudo chmod 640 /usr/share/ca-certificates/elastic-ca.crt
    ```

    Manually verify the certificate works using curl:

    ```bash
    curl --cacert /usr/share/ca-certificates/elastic-ca.crt -u elastic:<password> https://192.168.56.101:9200
    ```

    Output:

    ```json
    {
      "name" : "node-1",
      "cluster_name" : "elasticsearch",
      "cluster_uuid" : "Lmfoq9mbRBqis3GvrLVTZw",
      "version" : {
        "number" : "8.17.0",
        "build_flavor" : "default",
        "build_type" : "deb",
        "build_hash" : "2b6a7fed44faa321997703718f07ee0420804b41",
        "build_date" : "2024-12-11T12:08:05.663969764Z",
        "build_snapshot" : false,
        "lucene_version" : "9.12.0",
        "minimum_wire_compatibility_version" : "7.17.0",
        "minimum_index_compatibility_version" : "7.0.0"
      },
      "tagline" : "You Know, for Search"
    } 
    ```


5. Configure Logstash.

    ```bash
    sudo vi /etc/logstash/conf.d/logstash.conf 
    ```

    Use the following configuration to process the sample access log file located on the Logstash node. This configuration will:

    - Set the index name to `sample-access-log` 
    - Read the file from the start
    - Apply a Grok filter to parse the log entries
    - Send the processed data to Elasticsearch
    - Output the results to the standard output

    Make sure to set the password.

    ```bash
    input {
      file {
        path => "/tmp/access_log.log"
        start_position => "beginning"
      }
    }
    filter {
      grok {
        match => { "message" => "%{COMBINEDAPACHELOG}" }
      }
      date {
        match => [ "timestamp", "dd/MMM/yyyy:HH:mm:ss Z" ]
      }
      mutate {
        add_field => { "debug" => "true" }
      }      
    }
    output {
      elasticsearch {
        hosts => ["https://192.168.56.101:9200"]
        index => "sample-access-log"
        user => elastic 
        password => enter-password-here
        ssl => true
        cacert => "/usr/share/ca-certificates/elastic-ca.crt"
      }
      stdout {
        codec => rubydebug
      }
    }
    ```    

6. Run Logstash with the updated configuration

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/logstash.conf
    ```

7. If successful, Logstash should connect to Elasticsearch without errors. 

    ```bash
    [[main]-pipeline-manager] elasticsearch - Restored connection to ES instance {:url=>"https://elastic:xxxxxx@192.168.56.101:9200/"}
    [[main]-pipeline-manager] elasticsearch - Elasticsearch version determined (8.17.0) {:es_version=>8}
    [[main]-pipeline-manager] elasticsearch - Detected a 6.x and above cluster: the `type` event field won't be used to determine the document _type {:es_version=>8} 
    ```

Login to Elasticsearch node and switch to **root**:

1. Login to Elasticsearch and switch to root. Check if data has been indexed by Logstash

    ```bash
    curl -u elastic:<password> --insecure \
    -X GET "https://192.168.56.101:9200/_cat/indices?v"
    ```

    Output:

    ```bash
    health status index             uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   sample-access-log 6KvdkUlvT3mdPP0JjyudLw   1   1      31250            0     14.9mb         14.9mb       14.9mb
    ```

2. Check the `sample-access-log` and confirm that it contains the sample Apache web server log data:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XGET "https://192.168.56.101:9200/sample-access-log/_search?pretty=true" | jq
    ```

    If the indexing was successful, the output should show something like this:

    ```bash
    {
      "took": 217,
      "timed_out": false,
      "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
      },
      "hits": {
        "total": {
          "value": 10000,
          "relation": "gte"
        },
        "max_score": 1,
        "hits": [
          {
            "_index": "sample-access-log",
            "_id": "K5xY9JMBNQdWCWQ3sSRr",
            "_score": 1,
            "_ignored": [
              "message.keyword"
            ],
            "_source": {
              "clientip": "174.0.59.42",
              "referrer": "\"http://sundog-soft.com/features/real-time-3d-clouds/?gclid=CKiV8suV0NMCFUqewAodLWgE5A\"",
              "auth": "-",
              "timestamp": "02/May/2017:02:32:25 +0000",
              "verb": "GET",
              "debug": "true",
              "agent": "\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36\"",
              "@version": "1",
              "host": "logstash",
              "@timestamp": "2017-05-02T02:32:25.000Z",
              "request": "/wp-content/plugins/js_composer/assets/js/dist/js_composer_front.min.js?ver=5.1.2",
              "httpversion": "1.1",
              "path": "/tmp/access_log.log",
              "response": "200",
              "message": "174.0.59.42 - - [02/May/2017:02:32:25 +0000] \"GET /wp-content/plugins/js_composer/assets/js/dist/js_composer_front.min.js?ver=5.1.2 HTTP/1.1\" 200 6450 \"http://sundog-soft.com/features/real-time-3d-clouds/?gclid=CKiV8suV0NMCFUqewAodLWgE5A\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36\"",
              "bytes": "6450",
              "ident": "-"
            }
          },

          ....... 
    ```    