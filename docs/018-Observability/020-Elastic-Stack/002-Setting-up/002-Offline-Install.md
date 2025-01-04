---
title: "Offline Install"
description: "Offline Install"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 2
last_update:
  date: 3/28/2023
---

## Overview 

This lab covers the offline installation of Elasticsearch. This is suited for private networks where nodes doesn't have internet access. The nodes are still created as virtual machines in VirtualBox using Vagrant, but the installation process will use a package manager.

## Pre-requisites 

- [Install VirtualBox](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#install-virtualbox)
- [Install Vagrant on Windows](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#install-vagrant-on-windows)
- [Setup fileshare on the Virtual Machine](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare)
- [Install jq on Elasticsearch node](https://www.scaler.com/topics/linux-jq/)


## Setup the Virtual Machines 

:::info

If you are using cloud compute instances, you can skip this section.

:::

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

5. Open VirtualBox. You should see all VMs running.

    ![](/img/docs/12152021-vm-setup-virtualbox-vagrant.png)

6. To login to the node, run:

    ```bash
    vagrant ssh node1 
    ```

## Download the Packages

1. On a computer with internet access, download the Debian package for Elasticsearch v8.17.0.

    ```bash
    wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.17.0-amd64.deb
    wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.17.0-amd64.deb.sha512
    shasum -a 512 -c elasticsearch-8.17.0-amd64.deb.sha512 
    sudo dpkg -i elasticsearch-8.17.0-amd64.deb 
    ```

2. Copy the files to the virtual machine. [You can map local folder to a fileshare in you VM](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare).

## Install Elasticsearch 8.17 

1. Login to the Elasticsearch node, switch to **root**, and move the files from fileshare to `/tmp`.

    ```bash
    cp -r /mnt/fileshare/elastic* /tmp 
    cd /tmp/elastic*
    ```

2. Install the packages.

    ```bash
    sudo dpkg -i elasticsearch-8.17.0-amd64.deb 
    ```


3. Configure Elasticsearch configuration file.

    ```bash
    sudo vi /etc/elasticsearch/elasticsearch.yml 
    ```

    Specify the following:

    ```bash
    node.name: node-1
    network.host: 0.0.0.0
    discovery.seed_hosts: ["127.0.0.1"]
    cluster.initial_master_nodes: ["node-1"] 
    ```

    :::info 

    The `cluster.initial_master_nodes` may already be set at the end of the file. 
    Confirm first to avoid duplicate fields.

    :::

4. Enable and start the service.

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable --now elasticsearch.service
    sudo systemctl status elasticsearch.service 
    ```


5. Reset the password for the `elastic` user.

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

    If you encounter the error below, you may need to [adjust the heap size.](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#adjust-the-heap-size)

    ```bash
    ERROR: Failed to determine the health of the cluster. Unexpected http status [503], with exit code 65
    ```

6. Verify the access:

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

7. Another way to verify access: Open a web browser in your computer (host) and navigate to:

    ```bash
    https://localhost:9200/ 
    ```

    It will prompt you to enter the username and password. If successful, you should see the same output.

    ![](/img/docs/12202024-es-port-forwarding-works.png)

## Configure SSL on Elasticsearch

When configuring SSL/TLS for secure communication between Elasticsearch and clients, it is important to trust the Certificate Authority (CA) certificate to ensure the authenticity of the server. 

For more information, please see [SSL Configuration.](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/003-SSL-Configuration.md)

## Share the Certificate to Other VMs (Optional)

If you want other VMs to trust the Elasticsearch SSL certificate, you need to share the CA certificate. This allows them to securely connect to Elasticsearch using the same certificate.

For more information, please see [Sharing the Certificate.](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/003-SSL-Configuration.md#share-the-ca-certificate-to-other-vms-optional)


## Next Steps 

- [Adjust the Heap Size](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#share-the-certificate-to-other-vms-optional)
- [Share the Certificate to Other VMs (Optional)](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#share-the-certificate-to-other-vms-optional)
- [Sample Search Index](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#sample-search-index)
- [Sample Bulk Indexing](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#sample-bulk-indexing)
