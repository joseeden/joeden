---
title: "Query Lite"
description: "Query Lite Interface"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 1
last_update:
  date: 3/28/2023
---

## Overview

Query Lite provides a simple way to search Elasticsearch using query parameters. It is useful for quick searches without requiring JSON bodies. 

- Easy to use for basic searches
- Reduces the need for complex query structures

:::info

Query Lite is previously known as **URI Search**. 

:::

## Simpler Queries

As an example, we can search for documents with a specific title by appending a query string:

```bash
/movies/_search?q=title:star
```

Similarly, to query for movies released after 2010 with a title containing "Trek":

```bash
/movies/_search?q=+year:>2010+title:Trek
```

Take note that spaces and special characters must be URL encoded before being sent:

```bash
/movies/_search?q=+year:>2010+title:trek
```

The above query will be encoded as:

```bash
/movies/_search?q=%2Byear%3A%3E2010+%2Btitle%3Atrek
```

Using simple queries is convenient for experimenting, but they come with risks:

- Difficult to debug when issues arise  
- Potential security risks if exposed to end users  
- Prone to errors – a single mistake can cause failure

## Examples 

First, import the datasets:

1. For the following examples, download the datasets:

    - [series.json](@site/assets/elastic-stack/series.json)

2. Import the dataset into Elasticsearch:

  ```bash
  curl -u elastic:elastic \
  -H 'Content-Type: application/json' \
  --data-binary @movies.json \
  -XPUT https://localhost:9200/_bulk?pretty 
  ```

Start using the query lite:

1. Run the command below to search for movies with "Star" in the title:

    ```bash
    curl -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET "https://localhost:9200/movies/_search?q=title:star&pretty"
    ```

    Output:

    ```json
    {
      "took" : 7,
      "timed_out" : false,
      "_shards" : {
        "total" : 1,
        "successful" : 1,
        "skipped" : 0,
        "failed" : 0
      },
      "hits" : {
        "total" : {
          "value" : 2,
          "relation" : "eq"
        },
        "max_score" : 0.8025915,
        "hits" : [
          {
            "_index" : "movies",
            "_id" : "135569",
            "_score" : 0.8025915,
            "_source" : {
              "id" : "135569",
              "title" : "Star Trek Beyond",
              "year" : 2016,
              "genre" : [
                "Action",
                "Adventure",
                "Sci-Fi"
              ]
            }
          },
          {
            "_index" : "movies",
            "_id" : "122886",
            "_score" : 0.56478655,
            "_source" : {
              "id" : "122886",
              "title" : "Star Wars: Episode VII - The Force Awakens",
              "year" : 2015,
              "genre" : [
                "Action",
                "Adventure",
                "Fantasy",
                "Sci-Fi",
                "IMAX"
              ]
            }
          }
        ]
      }
    } 
    ```

2. Now search for movies released after 2010 with "Trek" in the title

    ```bash
    curl -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET "https://localhost:9200/movies/_search?q=+year>2010+title:trek&pretty"
    ```

    Output:

    ```json
    {
      "took" : 7,
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
        "max_score" : 1.3940738,
        "hits" : [
          {
            "_index" : "movies",
            "_id" : "135569",
            "_score" : 1.3940738,
            "_source" : {
              "id" : "135569",
              "title" : "Star Trek Beyond",
              "year" : 2016,
              "genre" : [
                "Action",
                "Adventure",
                "Sci-Fi"
              ]
            }
          }
        ]
      }
    } 
    ```