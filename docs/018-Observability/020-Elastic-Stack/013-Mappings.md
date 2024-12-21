---
title: "Mappings"
description: "Mappings"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Elasticsearch
- DevOps
sidebar_position: 13
last_update:
  date: 3/28/2023
---


## Overview 

Mapping specifies how documents and their fields are stored, indexed, and queried in Elasticsearch.  

- Similar to a schema in SQL, defining data types and field properties.  
- Ensures efficient storage and accurate search results.  

A mapping is a **schema definition**. Elasticsearch has reasonable defaults, but sometimes you may need to customize it. As an example, the `POST` request below...

```bash
curl -XPUT https://127.0.0.1:9200/movies -d '
{
  "mappings": {
    "properties": {
      "year": {
        "type: "date"
      }
    }
  }
}
' 
```

## Common Mappings 

add simplified short intro...2 sentences..

### Field Types 

add simplified short intro...2 sentences..

```bash
add sample.... 
```

### Field Index 

add simplified short intro...2 sentences..


```bash
add sample.... 
```

### Field Analyzer 

add simplified short intro...2 sentences..

```bash
add sample.... 
```
