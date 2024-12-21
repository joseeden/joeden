---
title: "Using Vagrant and VirtualBox"
description: "Setting up Elastic Stack using Vagrant"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Elasticsearch
- DevOps
sidebar_position: 1
last_update:
  date: 3/28/2023
---


## Overview

This lab demonstrates how to set up the Elastic Stack using Vagrant and VirtualBox.  

## Pre-requisites 

- [Install VirtualBox](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-Vagrant.md#virtualbox)
- [Install Vagrant on Windows](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-Vagrant.md#install-vagrant-on-windows)

## Setup the Virtual Machines 

1. Download the Vagrant files here: [Project Files](@site/assets/elastic-stack/elastic.zip)
2. Unzip the Files. Open Powershell and proceed to Elastic directory.

    ```bash
    cd elastic 
    ```

3. Run the command below. This will create four virtual machines in VirtualBox

    ```bash
    vagrant up 
    ```

    If you encounter any error, you can add the `--debug` parameter:

    ```bash
    vagrant up --debug
    ```

    Since having multiple Virtual machines can be resource-intensive, you can modify the `Vagrantfile` and comment out the `config` blocks for the other VMs.

4. Run the `vagrant` command below to list the VMs:

    ```bash
    vagrant ssh-config 
    ```

    Output:

    ```bash
    Host node1
      HostName 127.0.0.1
      User vagrant
      Port 2222
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/virtual-machines/elastic/.vagrant/machines/node1/virtualbox/private_key
      IdentitiesOnly yes
      LogLevel FATAL
      PubkeyAcceptedKeyTypes +ssh-rsa
      HostKeyAlgorithms +ssh-rsa

    Host node2
      HostName 127.0.0.1
      User vagrant
      Port 2200
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/virtual-machines/elastic/.vagrant/machines/node2/virtualbox/private_key
      IdentitiesOnly yes
      LogLevel FATAL
      PubkeyAcceptedKeyTypes +ssh-rsa
      HostKeyAlgorithms +ssh-rsa

    Host node3
      HostName 127.0.0.1
      User vagrant
      Port 2201
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/virtual-machines/elastic/.vagrant/machines/node3/virtualbox/private_key
      IdentitiesOnly yes
      LogLevel FATAL
      PubkeyAcceptedKeyTypes +ssh-rsa
      HostKeyAlgorithms +ssh-rsa

    Host node4
      HostName 127.0.0.1
      User vagrant
      Port 2202
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/virtual-machines/elastic/.vagrant/machines/node4/virtualbox/private_key
      IdentitiesOnly yes
      LogLevel FATAL
      PubkeyAcceptedKeyTypes +ssh-rsa
      HostKeyAlgorithms +ssh-rsa      
    ```

5. Open VirtualBox. You should see all VMs running.

    ![](/img/docs/12152021-vm-setup-virtualbox-vagrant.png)

6. To login to the node, run:

    ```bash
    vagrant ssh node1 
    ```


## Install Elasticsearch 8.17 

On Node1, switch to **root** user and perform the steps below:

1. Download and install the public signing key:

    ```bash
    wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
    ```

2. Install the `apt-transport-https` package on Debian before proceeding:

    ```bash
    sudo apt-get install -y apt-transport-https
    ```

3. Save the repository definition to `/etc/apt/sources.list.d/elastic-8.x.list:`

    ```bash
    echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list 
    ```

4. Install the Elasticsearch Debian package

    ```bash
    sudo apt-get update && sudo apt-get install -y elasticsearch 
    ```

5. Configure Elasticsearch configuration file.

    ```bash
    sudo vi vi /etc/elasticsearch/elasticsearch.yml 
    ```

    Specify the following:

    ```bash
    node.name: node-1
    network.host: 0.0.0.0
    discovery.seed_hosts: ["127.0.0.1"]
    cluster.initial_master_nodes: ["node-1"] 
    ```

6. Enable and start the service.

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable --now elasticsearch.service
    sudo systemctl status elasticsearch.service 
    ```

7. Reset the password for the `elastic` user.

    ```bash
    /usr/share/elasticsearch/bin/elasticsearch-reset-password -i -u elastic 
    ```

    Press `y` when prompted and then provide your new password.

    ```bash
    Please confirm that you would like to continue [y/N]y

    Enter password for [elastic]:
    Re-enter password for [elastic]:
    Password for the [elastic] user successfully reset.      
    ```

8. Verify the access:

    ```bash
    curl -k -u elastic:<add-password>  https://localhost:9200
    ```

    Output:

    ```bash
    {
    "name" : "elasticsearch",
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

9. Another way to verify access: Open a web browser in your computer (host) and navigate to:

    ```bash
    https://localhost:9200/ 
    ```

    It will prompt you to enter the username and password. If successful, you should see the same output.

    ![](/img/docs/12202024-es-port-forwarding-works.png)

## Tune Down the Memory (Optional)

Since we're using virtual machines on a Windows computer, we can set the memory limit used by Elasticsearch. 

1. Login to Node1 and edit the config file:

    ```bash
    sudo vi /etc/default/elasticsearch
    ```

2. Set the max and minimum memory to 512MB. Save afterwards.

    ```bash
    ES_JAVA_OPTS="-Xms512m -Xmx512m"
    ```

3. Restart the service.

    ```bash
    sudo systemctl restart elasticsearch.service 
    sudo systemctl status elasticsearch.service 
    ```

## Configure SSL on Elasticsearch

To establish the trust relationship, perform the steps below:

1. Copy the certificate to the trusted certificates directory:

    ```bash
    cp /etc/elasticsearch/certs/http_ca.crt /usr/share/ca-certificates/elastic-ca.crt 
    ```

2. If you're using Ubuntu or Debian-based system, run the command below.

    ```bash
    dpkg-reconfigure ca-certificates
    ```

4.  When prompted, click Yes. 

    ![](/img/docs/12152024-Observability-elastic-config-ssl.png)

4. Select the copied certificate by pressing spacebar > Enter 

    ![](/img/docs/12152024-Observability-elastic-config-ssl-2.png)

5. Verify that the SSL certificate works.

    ```bash
    curl -u elastic:<add-password>  https://localhost:9200
    ```

    Output:

    ```bash
    {
    "name" : "elasticsearch",
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

## Sample Search Index 

Create the Shakespeare dataset below. This will be used to test how Elasticsearch index data with various fields.

:::info 

This is taken from [Sundog's Elasticsearch Course. ](https://www.sundog-education.com/elasticsearch/). The structure has been update for Elasticsearch 8

:::


```json title="shakes-mapping.json "
{
  "mappings": {
    "properties": {
      "speaker": {
        "type": "keyword"
      },
      "play_name": {
        "type": "keyword"
      },
      "line_id": {
        "type": "integer"
      },
      "speech_number": {
        "type": "integer"
      }
    }
  }
}
```


Submit the mapping to Elasticsearch.

```bash
curl -u elastic:<password> \
-k -X PUT -H 'Content-Type: application/json' \
https://localhost:9200/shakespeare --data-binary @shakes-mapping.json -X PUT
```

It should return:

```bash
{"acknowledged":true,"shards_acknowledged":true,"index":"shakespeare"} 
```

## Sample Bulk Indexing 

Download the file below. This bulk indexing file contains lines from Shakespeare's plays, formatted for compatibility with Elasticsearch's Bulk API.

- [shakespeare_8.0.json](@site/assets/elastic-stack/shakespeare_8.0.json)

Run the following command to index the data into Elasticsearch:

```bash
curl -u elastic:<password> -H 'Content-Type: application/json' -XPOST 'localhost:9200/shakespeare/_bulk?pretty' --data-binary @shakespeare_7.0.json
```

After indexing, you can search for the famous line "to be or not to be" using this query:

```bash
curl -u elastic:<password> -H 'Content-Type: application/json' -XGET \
'https://127.0.0.1:9200/shakespeare/_search?pretty' -d '
{
  "query": {
    "match_phrase": {
      "text_entry": "to be or not to be"
    }
  }
}' 
```

If the data was indexed correctly, the query should return the following result:

```bash
{
  "took" : 18,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 13.889601,
    "hits" : [
      {
        "_index" : "shakespeare",
        "_id" : "34229",
        "_score" : 13.889601,
        "_source" : {
          "type" : "line",
          "line_id" : 34230,
          "play_name" : "Hamlet",
          "speech_number" : 19,
          "line_number" : "3.1.64",
          "speaker" : "HAMLET",
          "text_entry" : "To be, or not to be: that is the question:"
        }
      }
    ]
  }
}  
```
