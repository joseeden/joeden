---
title: "Kibana Canvas"
description: "Kibana Canvas"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Kibana
sidebar_position: 6
last_update:
  date: 3/28/2023
---

## Overview 

Kibana Canvas is a tool for creating dynamic, live infographic dashboards. It allows users to design visually rich presentations with real-time data.  

- Similar to a PowerPoint presentation  
- Can generate bar charts, plots, and other visualizations  

Canvas can pull data from multiple sources for flexible and dynamic visualizations. 

- **Elasticsearch SQL queries** – Retrieve data using SQL-like queries  
- **Timelion expressions** – Perform time-series analysis and visualizations  
- **Raw documents** – Use raw data directly from Elasticsearch

## Components  

Kibana Canvas consists of three main components:  

- **Workpad**  
  - A workspace where graphical representations are built  
  - Single page or multiple pages, similar to visualization panels  

- **Pages**  
  - Contain graphical elements that display data  
  - Allow organizing and structuring the presentation of data  

- **Elements**  
  - **Charts** – Area, bubble, coordinate, bar charts  
  - **Shapes** – Shapes and textboxes, formatted with Markdown  
  - **Images** – Static or dynamic images based on data  
  - **Supporting Elements** – Dropdown filters, time filters  

## Piping Functions  

Kibana allows chaining functions by piping results, known as **contexts**, from one function to another for further processing.

## Pre-requisites  

This guide uses Elastic Cloud for the hosted Elasticsearch cluster and Kibana.

- [Sign up for Elastic Cloud account](https://www.elastic.co/cloud/elasticsearch-service/signup) 
- [Create a hosted deployment](https://www.elastic.co/guide/en/cloud/current/ec-create-deployment.html)
- [Install jq](https://www.scaler.com/topics/linux-jq/)


## Importing the Data 

We'll use an Nginx log file as our dataset. Download the files here:  

- [nginx_json_logs](@site/assets/elastic-stack/kibana-canvas/nginx_json_logs)
- [nginx_json_logs_bulk](@site/assets/elastic-stack/kibana-canvas/nginx_json_logs)

First, we need to convert the log file into a format compatible with the Elasticsearch Bulk API. This can be done using `awk`:  

```bash
awk '{print "{\"index\":{}}\n" $0}' nginx_json_logs > nginx_json_logs_bulk
```

Next, store the Elasticsearch endpoint and credentials in variables:  

```bash
ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
ELASTIC_USER="your-username"
ELASTIC_PW="your-password"
```  

Create the index and define mappings, ensuring the Nginx timestamp is correctly formatted:  

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-X PUT "$ELASTIC_ENDPOINT/nginx" \
-H "Content-Type: application/json" \
-d '{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    "properties": {
      "time": { "type": "date", "format": "dd/MMM/yyyy:HH:mm:ss Z" },
      "response": { "type": "keyword" }
    }
  }
}'
```  

Finally, index the data using the Bulk API:  

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-X POST "$ELASTIC_ENDPOINT/nginx/_bulk" \
-H "Content-Type: application/x-ndjson" \
--data-binary "@nginx_json_logs_bulk" | jq '.errors'
```

If there are no errors during indexing, it should return `false`.