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

- The nodes are created in VirtualBox using Vagrant.
- An SSH key is generated on the Elasticsearch node
- The SSH key is shared to the Logstash node.
- The Logstash node can reach Elasticsearch node via port 9200 