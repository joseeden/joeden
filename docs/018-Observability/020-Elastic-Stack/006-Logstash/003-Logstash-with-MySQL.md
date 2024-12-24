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
| Node 4  | mysql          |  192.168.56.104  |

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

## Install MySQL on Node 4 

For the entire installation steps, please see [Offlne Install - MySQL](/docs/022-Data-Engineering/035-MySQL/001-Offline-Install.md).
