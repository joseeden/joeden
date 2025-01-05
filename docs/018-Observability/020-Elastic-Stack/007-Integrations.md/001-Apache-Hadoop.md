---
title: "Apache Hadoop"
description: "Apache Hadoop"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Apache Hadoop
sidebar_position: 1
last_update:
  date: 3/28/2023
---


## Add simple short title 

When we need to collect thousand petabytes of data, we can use Hadoop to...it uses multiple computers at once to process data in parallel..

- Easily expand storage capacity to accoomoate growthof data
- Every computer added to cluster expands the **Hadoop Distributed Filesystem (HDFS**)
- Designed to continue work after one or more of the computers in the cluster fail
- Distributes the chunks of data on separate hardware

This lab will focus on integrating Elasticsearch with Apache Hadoop to..and to process large amounts of data...We'll also use an Apache access log to represent our big data...

- Write a simple Mapreduce job to ingest the file with Hadoop.
- Index the ingested data to Elasticsearch

## Which One to Use

..short simple intro..Hadoop sounds similar to Elasticsearch..

- **Hadoop** 
  - Ingest data from billions of websites
  - add short info 
  - add short info 

- **Elasticsearch**
  - Store and index data for fast queries 
  - add short info 
  - add short info 

- **Logstash**
  - Gather real time data 
  - add short info 

..working together..Hadoop will be greate in collecting all the data and then Logstash then sends them to be stored in Elasticsearch, which will be good for quickly returning resuls to the users to search through that data...

## How MapReduce Works

MapReduce works by...we can fine tune the settings at a much lower level for more customization and optimization...