---
title: "Importing CSV Data"
description: "Importing CSV Data"
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
sidebar_position: 6
last_update:
  date: 12/30/2022
---

## Overview

CSV (Comma-Separated Values) is a simple file format used to store tabular data. It organizes data into rows and columns and makes it easy to import and export across different applications.

- **Header Row**: Optional row at the top, defines column names.
- **Data Row**: Contains the actual data for each column.
- **Separator**: Comma (or other delimiters like semicolons) between columns.
- **New Line**: Each row is typically separated by a new line.

Note: Ensure each row has the same number of items for consistency.

Sample CSV data:

```csv
name,age,city
John,25,New York
Jane,30,Los Angeles
Alice,28,Chicago
```


## Lab Environment 

This lab focuses on importing CSV data using Logstash and Elasticsearch.

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

## Importing the Logs 

On a computer with internet access:

1. Download the sample datasets: [csv-schema-short-numerical.csv](@site/assets/elastic-stack/csv-schema-short-numerical.csv)

2. Transfer the files to your virtual machine. 

    You can configure a fileshare in the VM's settings, map it to a local folder in your computer, and place the access log in that folder. Then, confirm the VM can access the fileshare and copy the log to `/tmp` within the VM.

    For more information, please see [Setup Fileshare](/docs/001-Personal-Notes/050-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare)


## Configure Logstash

Login to the Logstash node, switch to **root** user, and perform the following:

1. Create the testing directory and move the transferred datasets to this folder.

    ```bash
    mkdir -p /mnt/fileshare/datasets 
    ```

2. Create the `csv-read.conf` file.

    ```bash
    sudo vi /etc/logstash/conf.d/csv-read.conf 
    ```

    Use the configuration file below:

    ```bash
    input {
      file {
        path => "/mnt/fileshare/datasets/csv-schema-short-numerical.csv"    ## sample csv file
        start_position => "beginning"
        sincedb_path => "/dev/null"
      }
    }

    filter {
      csv {
          separator => ","
          skip_header => "true"
          columns => ["id","timestamp","paymentType","name","gender","ip_address","purpose","country","age"]
      }
    }

    output {
        stdout { codec => json_lines }
        elasticsearch {
            hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
            index => "demo-csv"
            user => "elastic"
            password => "enter-password-here"
            ssl => true
            cacert => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```

3. Start Logstash with the updated configuration:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/csv-read.conf
    ```

## Verify Data in Elasticsearch

Login to the Elasticsearch node and switch to **root** user:

1. First, store the Elasticsearch endpoint and credentials in variables:  

    ```bash
    ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
    ELASTIC_USER="your-username"
    ELASTIC_PW="your-password"
    ```  


2. Verify that the `demo-csv` index has been created.

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index              uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   shakespeare        umINGu-cQGykbRmDb4BmZQ   1   1     111396            0       19mb           19mb         19mb
    yellow open   demo-csv           bOUUiz2lSpWmeknhKl-H2Q   1   1          4            0     18.5kb         18.5kb       18.5kb
    yellow open   movielens-sql      GhfPWKYBQgumzbDiBPONTQ   1   1       1682            0    282.8kb        282.8kb      282.8kb
    ```

## Using `mutate` 

The `mutate` filter in Logstash is used to modify data during processing. It can convert, remove, or rename fields to customize the data before it is output.

- **Convert**: Changes data types of fields (e.g., integer conversion).
- **Remove Field**: Removes unnecessary fields from the event.

In the example Logstash configuration below:

- The `csv` filter parses the file, skips the header and defins column names.
- The `mutate` filter converts `age` field to integer and removes other unnecessary fields.

Config file:

```bash
input {
  file {
    path => "/mnt/fileshare/datasets/csv-schema-short-numerical.csv"    ## sample csv file
    start_position => "beginning"
    sincedb_path => "/dev/null"
  }
}
filter {
  csv {
      separator => ","
      skip_header => "true"
      columns => ["id","timestamp","paymentType","name","gender","ip_address","purpose","country","age"]
  }
  mutate {
      convert => {
          age => "integer"
      }
          remove_field => ["message","@timestamp","path","host","@version"]
  }
}

output {
    stdout { codec => json_lines }
    elasticsearch {
        hosts => ["$ELASTIC_ENDPOINT:9200"]                  ## address of elasticsearch node
        index => "demo-csv-mutate"
        user => "elastic"
        password => "enter-password-here"
        ssl => true
        cacert => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
    }
}
```

Using the updated config file:

1. On the Logstashn node, run Logstash with the new configuration file.

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/csv-read-drop.conf 
    ```

2. On the Elasticsearch node, verify that the index has been created.

   ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index              uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   shakespeare        umINGu-cQGykbRmDb4BmZQ   1   1     111396            0       19mb           19mb         19mb
    yellow open   demo-csv           bOUUiz2lSpWmeknhKl-H2Q   1   1          4            0     18.6kb         18.6kb       18.6kb
    yellow open   movielens-sql      GhfPWKYBQgumzbDiBPONTQ   1   1       1682            0    282.8kb        282.8kb      282.8kb
    yellow open   demo-csv-mutate    rOh8AoJVTKqDpq0wrYxB6A   1   1          4            0     24.5kb         24.5kb       24.5kb
    ```

3. Confirm that the age field is now an integer field. In the output below, it shows `long`, which is long integer. Long integers can store more digits than short integers.

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H 'Content-Type: application/json' \
    -XGET "$ELASTIC_ENDPOINT:9200/demo-csv-mutate/_mapping/field/age?pretty=true" | jq
    ```

    Output:

    ```bash 
    {
      "demo-csv-mutate": {
        "mappings": {
          "age": {
            "full_name": "age",
            "mapping": {
              "age": {
                "type": "long"
              }
            }
          }
        }
      } 
    ```
