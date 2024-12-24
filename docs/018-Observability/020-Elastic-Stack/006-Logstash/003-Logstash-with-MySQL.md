---
title: "Logstash with MySQL"
description: "Logstash with MySQL"
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
sidebar_position: 3
last_update:
  date: 3/28/2023
---

## Overview

This lab focuses on integrating Logstash with MySQL to ingest data into Elasticsearch.

- Set up the MySQL server and the movie database from the dataset
- Install the JDBC connector on Logstash
- Configure Logstash to ingest data from MySQL
- Verify successful indexing in Elasticsearch
- Query the indexed data

## Lab Environment 

| Node    | Hostname       | IP Address       | 
|---------|----------------|------------------|
| Node 1  | elasticsearch  |  192.168.56.101  |
| Node 2  | logstash       |  192.168.56.103  |
| Node 3  | mysql          |  192.168.56.104  |

Setup details:

- The nodes are running Ubuntu Linux 22.04
- The nodes are created in VirtualBox using Vagrant.
- An SSH key is generated on the Elasticsearch node
- The SSH key is shared to the Logstash node.
- The Logstash node can reach Elasticsearch node via port 9200 
- The Logstash node can reach MySQL node via port 3306

## Pre-requisites 

- [Create the nodes in VirtualBox](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant.md#setup-the-virtual-machines)
- [Setup fileshare on the Virtual Machines](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare)
- [Install Elasticsearch on node 1](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant.md#install-elasticsearch-817)
- [Install Logstash on node 2](/docs/018-Observability/020-Elastic-Stack/006-Logstash/001-Installing-Logstash.md)
- [Configure SSL on Elasticsearch](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant.md#configure-ssl-on-elasticsearch)
- [Share Elasticsearch CA cert to Logstash](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant.md#share-the-certificate-to-other-vms-optional)
- [Install jq on Elasticsearch node](https://www.scaler.com/topics/linux-jq/)

## Steps 

Login to the MySQL node, switch to **root** user, and perform the following:

1. Go to MySQL Community Downloads > Select Operating System > Ubuntu Linux.
2. Select the bundle then click Download.
3. When prompted to sign up, click **No thanks, just start my download.**
4. Copy the file to the [local folder mapped to a fileshare in you VM](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare).

5. Copy the file from the fileshare to `/tmp`. Untar the file. 

    ```bash
    cp /mnt/fileshare/mysql-server_9.1.0-1ubuntu24.10_amd64.deb-bundle.tar /tmp
    mkdir /tmp/mysql-server_9.1.0
    tar xvf /tmp/mysql-server_9.1.0-1ubuntu24.10_amd64.deb-bundle.tar -C /tmp/mysql-server_9.1.0
    cd /tmp/mysql-server_9.1.0
    ```

6. The bundle will contain...

    ```bash
    $ ls -la

    total 511748
    drwxr-xr-x  2 root root       4096 Dec 24 06:53 .
    drwxrwxrwt 11 root root       4096 Dec 24 06:52 ..
    -rw-r--r--  1 7155 31415  30523142 Sep 24 12:52 libmysqlclient-dev_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415   1477084 Sep 24 12:52 libmysqlclient24_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415     57774 Sep 24 12:52 mysql-client_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415     59084 Sep 24 12:52 mysql-common_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415   1773946 Sep 24 12:52 mysql-community-client-core_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415   1666066 Sep 24 12:52 mysql-community-client-plugins_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415   2061550 Sep 24 12:52 mysql-community-client_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415  31484058 Sep 24 12:52 mysql-community-server-core_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415  39117876 Sep 24 12:52 mysql-community-server-debug_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415     67388 Sep 24 12:52 mysql-community-server_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415  18817812 Sep 24 12:52 mysql-community-test-debug_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415 396766024 Sep 24 12:52 mysql-community-test_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415     57768 Sep 24 12:52 mysql-server_9.1.0-1ubuntu24.10_amd64.deb
    -rw-r--r--  1 7155 31415     57788 Sep 24 12:52 mysql-testsuite_9.1.0-1ubuntu24.10_amd64.deb 
    ```

7. To avoid dependency errors, install all relevant .deb files at once:

```bash
sudo dpkg -i *.deb
```