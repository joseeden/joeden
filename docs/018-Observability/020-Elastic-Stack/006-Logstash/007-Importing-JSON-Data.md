---
title: "Importing JSON Data"
description: "Importing JSON Data"
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
sidebar_position: 7
last_update:
  date: 3/28/2023
---


## Overview

JSON (JavaScript Object Notation) is a simple data format used for storing and exchanging information. It is easy to read, write, and understand.

- Structured in key/value pairs and ordered lists.
- Keys and values are separated by a colon (`:`).
- Double quotes enclose keys.
- Key/value pairs are separated by a comma.
- The file extension is `.json`.

Example JSON:

```json
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

:::info 

Logstash has a built-in JSON filter plugin that parses JSON data and converts it into a structured Logstash event. Without this plugin, JSON data will be ingested into Elasticsearch as a single line event.

::::

## Lab Environment 

This lab focuses on importing JSON data using Logstash and Elasticsearch.

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


## Importing the Logs 

On a computer with internet access:

1. Download the sample datasets: [sample-json.log](@site/assets/elastic-stack/sample-logs/sample-json.log)

2. Transfer the files to your virtual machine. 

    You can configure a fileshare in the VM's settings, map it to a local folder in your computer, and place the access log in that folder. Then, confirm the VM can access the fileshare and copy the log to `/tmp` within the VM.

    For more information, please see [Setup Fileshare](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare)




## Configure Logstash

Login to the Logstash node, switch to **root** user, and perform the following:

1. Create the `json-read.conf` file.

    ```bash
    sudo vi /etc/logstash/conf.d/json-read.conf
    ```

    Use the configuration file below:

    ```bash
    input {
      file {
        path => "/mnt/fileshare/datasets/sample-json.log"    ## sample json file
        start_position => "beginning"
        sincedb_path => "/dev/null"
      }
    }

    filter {
      json {
        source => "message"
      }
    }

    output {
        stdout { codec => json_lines }
        elasticsearch {
            hosts => ["https://192.168.56.101:9200"]                  ## address of elasticsearch node
            index => "demo-json"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            cacert => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```

2. Start Logstash with the updated configuration:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/json-read.conf
    ```

## Verify Data in Elasticsearch

Login to the Elasticsearch node and switch to **root** user:

1. Verify that the `demo-json` index has been created.

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index              uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   demo-csv           bOUUiz2lSpWmeknhKl-H2Q   1   1          4            0     18.6kb         18.6kb       18.6kb
    yellow open   movielens-sql      GhfPWKYBQgumzbDiBPONTQ   1   1       1682            0    282.8kb        282.8kb      282.8kb
    yellow open   demo-json          2abPTr7ZSPSKCFOgD7ED7Q   1   1          5            0     21.2kb         21.2kb       21.2kb
    yellow open   demo-csv-mutate    rOh8AoJVTKqDpq0wrYxB6A   1   1          4            0     24.7kb         24.7kb       24.
    ```    

## Drop Parameters based on Conditions 

We can also choose to print the data based on some conditions.

1. Create the `json-read-drop.conf` file.

    ```bash
    sudo vi /etc/logstash/conf.d/json-read-drop.conf
    ```

    Use the configuration file below:

    ```bash
    input {
      file {
        path => "/mnt/fileshare/datasets/sample-json.log"    ## sample csv file
        start_position => "beginning"
        sincedb_path => "/dev/null"
      }
    }

    filter {
      json {
        source => "message"
      }
      if [paymentType] == "Mastercard" {
        drop {}
      }
      mutate {
        remove_field => ["message","@timestamp","path","host","@version"]
      }
    }

    output {
        stdout { codec => json_lines }
        elasticsearch {
            hosts => ["https://192.168.56.101:9200"]                  ## address of elasticsearch node
            index => "demo-json-drop"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            cacert => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```

    This configuration filters and drops data based on specific conditions.

    - Parses data from the `message` field.
    - Drops events where `paymentType` is "Mastercard".
    - Removes unnecessary fields like `message`, `@timestamp`, etc.



2. Start Logstash with the updated configuration:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/json-read-drop.conf
    ```

3. Check if index is created.

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index           uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   demo-csv        bOUUiz2lSpWmeknhKl-H2Q   1   1          4            0     18.6kb         18.6kb       18.6kb
    yellow open   movielens-sql   GhfPWKYBQgumzbDiBPONTQ   1   1       1682            0    282.8kb        282.8kb      282.8kb
    yellow open   demo-json-drop  IwgvhAEEThGUYQcJX-cbuA   1   1          3            0     23.9kb         23.9kb       23.9kb
    yellow open   demo-json       2abPTr7ZSPSKCFOgD7ED7Q   1   1          5            0     21.3kb         21.3kb       21.3kb
    yellow open   demo-csv-mutate rOh8AoJVTKqDpq0wrYxB6A   1   1          4            0     24.7kb         24.7kb       24.7kb
    ```   

4. Check the data imported to the index. None of the details will have a `paymentType` of Mastercard.

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XGET "https://127.0.0.1:9200/demo-json-drop/_search?pretty=true" | jq
    ```


## Using the Split Filter 

The `split` filter in Logstash is useful when your data includes arrays (multiple items inside a single field). This filter takes each element from the array and creates a new event for each one. This way, Logstash can process each item individually.

1. Create the `json-split.conf` file.

    ```bash
    sudo vi /etc/logstash/conf.d/json-split.conf
    ```

    Use the configuration file below:

    ```bash
    input {
      file {
        path => "/mnt/fileshare/datasets/sample-json.log"    ## sample json file
        start_position => "beginning"
        sincedb_path => "/dev/null"
      }
    }

    filter {
      json {
        source => "message"
      }
      split {
        field => "[pastEvents]"
      }
      mutate {
        remove_field => ["message", "@timestamp", "path", "host", "@version"]
      }
    }

    output {
      stdout { }
      elasticsearch {
        hosts => ["https://192.168.56.101:9200"]                  ## address of elasticsearch node
        index => "json-split"
        user => "elastic"
        #password => "enter-password-here"
        password => "enter-password-here"
        ssl => true
        cacert => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
      }
    }
    ```

    This configuration is useful when dealing with arrays; each array is treated as a separate event for further processing.

    - Splits each value of the `pastEvents` array into separate events.
    - Removes unnecessary fields such as `message`, `@timestamp`, and others.


2. Start Logstash with the updated configuration:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/json-split.conf
    ```

3. Check if the `json-split` index is created.

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XGET https://localhost:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index           uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   demo-csv        bOUUiz2lSpWmeknhKl-H2Q   1   1          4            0     18.6kb         18.6kb       18.6kb
    yellow open   movielens-sql   GhfPWKYBQgumzbDiBPONTQ   1   1       1682            0    282.8kb        282.8kb      282.8kb
    yellow open   demo-json-drop  IwgvhAEEThGUYQcJX-cbuA   1   1          3            0     24.1kb         24.1kb       24.1kb
    yellow open   json-split      4CcfiWDVRQWkflMZP1jFlg   1   1          5            0     16.6kb         16.6kb       16.6kb
    yellow open   demo-json       2abPTr7ZSPSKCFOgD7ED7Q   1   1         10            0       49kb           49kb         49kb
    yellow open   demo-csv-mutate rOh8AoJVTKqDpq0wrYxB6A   1   1          4            0     24.7kb         24.7kb       24.7kb
    ```   


4. Run the query below.

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XGET "https://127.0.0.1:9200/json-split/_search?pretty=true" | jq
    ```

    The documents are now split into two; a new document is created for each pass event.