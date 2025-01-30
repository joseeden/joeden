---
title: "Elasticsearch SQL"
description: "Elasticsearch SQL"
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

Elasticsearch SQL lets you query data in Elasticsearch using SQL syntax. You can run queries from the Elastic Cloud console or directly via the terminal.  

If you're using Elastic Cloud, go to **Management > DevTools**, enter your SQL commands in the Console Editor, and click the **Play** button to see results.  

![](/img/docs/01302025-elastic-cloud-elasticsearch-sql.png)  

If you are using a self-managed Elasticsearch cluster, you can run SQL queries from the terminal using `curl`:  

```bash
curl -XPOST https://add-your-endpoint-here/_xpack/sql?format=txt -d '
{
  "query": "DESCRIBE index-name-here" 
}' 
```  

## How it Works  

Elasticsearch SQL processes queries in several steps:  

1. **Parser**: Converts the SQL query into an internal abstract syntax tree (AST) and validates it.  
2. **Analyzer**: Matches tables, columns, and functions to the underlying indices and creates a logical execution plan.  
3. **Query Planner**: Optimizes the logical plan by removing redundant operations and generates a physical plan.  
4. **Query Executor**: Runs the physical plan to execute the query. Returns the query results to the client.  

Here’s a diagram illustrating the Elasticsearch SQL query execution process:

![](/img/docs/all-things-observability-es-sql.png)


## Lab Environment 

| Node    | Hostname       | IP Address       | 
|---------|----------------|------------------|
| Node 1  | elasticsearch  |  192.168.56.101  |

Setup details:

- The node is created in VirtualBox using Vagrant.
- An SSH key is generated on the Elasticsearch node
- The Logstash node can reach Elasticsearch node via port 9200 
- The Logstash node needs to have internet access for this lab.

## Pre-requisites 

You can run a virtual machine in VirtualBox or use cloud-based compute instances. 

- [Create the nodes in VirtualBox](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#setup-the-virtual-machines)
- [Install Elasticsearch on node 1](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#install-elasticsearch-817)
- [Configure SSL on Elasticsearch](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/003-SSL-Configuration.md)
- [Install jq](https://www.scaler.com/topics/linux-jq/)


## Verify Connection

First, define your Elasticsearch endpoint and credentials:  

```bash
ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint:9200"
ELASTIC_USER="your-username"
ELASTIC_PW="your-password"
```  

If running these commands on an Elasticsearch node, set the endpoint to `https://127.0.0.1`.  

Run the following command to check connectivity:  

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-XGET $ELASTIC_ENDPOINT:9200
```  

Expected output:  

```json
{
  "name" : "node1",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "UYlLyPlmRkGGSHGZQxUIhw",
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

## Import the Dataset  

Download the dataset here: [movies.json](@site/assets/elastic-stack/movies-2.json)  

Run the command below to create the `movies` index and import the dataset.

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XPUT $ELASTIC_ENDPOINT:9200/_bulk?pretty  \
--data-binary @movies-2.json 
```  

Verify the index.

```bash
curl -s -u "$ELASTIC_USER:$ELASTIC_PW" \
-XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v 
```

## Using Self-hosted Elasticsearch

Check...

```bash
curl -s -u "$ELASTIC_USER:$ELASTIC_PW" \
-XPOST $ELASTIC_ENDPOINT:9200/_xpack/sql -d '
{
  "query": "DESCRIBE movies"
}'
```

:::info 

Elasticsearch 7.0 and later replaced `_xpack/sq`l with `_sql`:

:::

Alternatively, you can try:

```bash
curl -s -u "$ELASTIC_USER:$ELASTIC_PW" \
   -H "Content-Type: application/json" \
  -XPOST "$ELASTIC_ENDPOINT:9200/_sql" -d '
{
  "query": "DESCRIBE movies"
}' | jq
```

This will return the columns...we can use `jq` to make it format it to make it easier to read, but we can still make it more easier to read by using the `format` option.

```bash
{
  "columns": [
    {
      "name": "column",
      "type": "keyword"
    },
    {
      "name": "type",
      "type": "keyword"
    },
    {
      "name": "mapping",
      "type": "keyword"
    }
  ],
  "rows": [
    [
      "genre",
      "VARCHAR",
      "text"
    ],
    [
      "genre.keyword",
      "VARCHAR",
      "keyword"
    ],
    [
      "id",
      "VARCHAR",
      "text"
    ],
    [
      "id.keyword",
      "VARCHAR",
      "keyword"
    ],
    [
      "title",
      "VARCHAR",
      "text"
    ],
    [
      "title.keyword",
      "VARCHAR",
      "keyword"
    ],
    [
      "year",
      "BIGINT",
      "long"
    ]
  ]
} 
```

Add the  `format` to format it...

```bash
curl -s -u "$ELASTIC_USER:$ELASTIC_PW" \
   -H "Content-Type: application/json" \
  -XPOST "$ELASTIC_ENDPOINT:9200/_sql?format=txt" -d '
{
  "query": "DESCRIBE movies"
}' 
```

It should now be in table format, similar like how in SQL...

```bash
    column     |     type      |    mapping
---------------+---------------+---------------
genre          |VARCHAR        |text
genre.keyword  |VARCHAR        |keyword
id             |VARCHAR        |text
id.keyword     |VARCHAR        |keyword
title          |VARCHAR        |text
title.keyword  |VARCHAR        |keyword
year           |BIGINT         |long 
```


Other sample SQL statements you can run:

- Check first 10 movie titles in the `movies` index.

    ```bash
    curl -s -u "$ELASTIC_USER:$ELASTIC_PW" \
      -H "Content-Type: application/json" \
      -XPOST "$ELASTIC_ENDPOINT:9200/_sql?format=txt" -d '
    {
      "query": "SELECT title FROM movies LIMIT 10"
    }' 
    ```

    Output:

    ```bash
              title
    ---------------------------
    Toy Story
    Jumanji
    Grumpier Old Men
    Waiting to Exhale
    Father of the Bride Part II
    Heat
    Sabrina
    Tom and Huck
    Sudden Death
    GoldenEye 
    ```

- Retrieve title and year for movies released before 1920, sorted by year of release

    ```bash
    curl -s -u "$ELASTIC_USER:$ELASTIC_PW" \
      -H "Content-Type: application/json" \
      -XPOST "$ELASTIC_ENDPOINT:9200/_sql?format=txt" -d '
    {
      "query": "SELECT title, year FROM movies WHERE year < 1920 ORDER BY year"
    }' 
    ```

    Output:

    ```bash
                        title                      |     year
    ------------------------------------------------+---------------
    Trip to the Moon, A                             |1902
    The Great Train Robbery                         |1903
    The Electric Hotel                              |1908
    Birth of a Nation, The                          |1915
    Intolerance: Love's Struggle Throughout the Ages|1916
    20,000 Leagues Under the Sea                    |1916
    Snow White                                      |1916
    Rink, The                                       |1916
    Immigrant, The                                  |1917
    Daddy Long Legs                                 |1919 
    ```

## Using Elastic Cloud 

You can also test SQL commands on indexes in ELastic Cloud...

Do the same steps...on another termina, save variables...

```bash
ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
ELASTIC_USER="your-username"
ELASTIC_PW="your-password"
```  

Make sure to import the same movie dataset...

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XPUT $ELASTIC_ENDPOINT/_bulk?pretty  \
--data-binary @movies-2.json 
```

You can run the same SQL statements:

- see movies...

    ```bash
    curl -s -u "$ELASTIC_USER:$ELASTIC_PW" \
      -H "Content-Type: application/json" \
      -XPOST "$ELASTIC_ENDPOINT/_sql?format=txt" -d '
    {
      "query": "DESCRIBE movies"
    }'
    ```

    Output:

    ```bash
        column     |     type      |    mapping    
    ---------------+---------------+---------------
    genre          |VARCHAR        |text
    genre.keyword  |VARCHAR        |keyword
    id             |VARCHAR        |text
    id.keyword     |VARCHAR        |keyword
    title          |VARCHAR        |text
    title.keyword  |VARCHAR        |keyword
    year           |BIGINT         |long 
    ```

- Check first 10 movie titles in the `movies` index.

    ```bash
    curl -s -u "$ELASTIC_USER:$ELASTIC_PW" \
      -H "Content-Type: application/json" \
      -XPOST "$ELASTIC_ENDPOINT:9200/_sql?format=txt" -d '
    {
      "query": "SELECT title FROM movies LIMIT 10"
    }' 
    ```

    Output:

    ```bash
              title
    ---------------------------
    Toy Story
    Jumanji
    Grumpier Old Men
    Waiting to Exhale
    Father of the Bride Part II
    Heat
    Sabrina
    Tom and Huck
    Sudden Death
    GoldenEye 
    ```

- Retrieve title and year for movies released before 1920, sorted by year of release.

    ```bash
    curl -s -u "$ELASTIC_USER:$ELASTIC_PW" \
      -H "Content-Type: application/json" \
      -XPOST "$ELASTIC_ENDPOINT/_sql?format=txt" -d '
    {
      "query": "SELECT title, year FROM movies WHERE year < 1920 ORDER BY year"
    }' 
    ```

    Output:

    ```bash
                        title                      |     year
    ------------------------------------------------+---------------
    Trip to the Moon, A                             |1902
    The Great Train Robbery                         |1903
    The Electric Hotel                              |1908
    Birth of a Nation, The                          |1915
    Intolerance: Love's Struggle Throughout the Ages|1916
    20,000 Leagues Under the Sea                    |1916
    Snow White                                      |1916
    Rink, The                                       |1916
    Immigrant, The                                  |1917
    Daddy Long Legs                                 |1919 
    ```


## Translate SQL to DSL 

If you want to see the DSL....the actual JSON quey is executed under the hood...the command works both on self-host elasticsearch cluster and on Elastic Cloud deployment..just make sure you're using correct endpoint URL...

```bash
curl -s -u "$ELASTIC_USER:$ELASTIC_PW" \
    -H "Content-Type: application/json" \
    -XPOST "$ELASTIC_ENDPOINT/_sql/translate?pretty" -d '
  {
    "query": "SELECT title, year FROM movies WHERE year < 1920 ORDER BY year"
  }'
```

Output:

```json
{
  "size" : 1000,
  "query" : {
    "range" : {
      "year" : {
        "lt" : 1920,
        "boost" : 1.0
      }
    }
  },
  "_source" : false,
  "fields" : [
    {
      "field" : "title"
    },
    {
      "field" : "year"
    }
  ],
  "sort" : [
    {
      "year" : {
        "order" : "asc",
        "missing" : "_last",
        "unmapped_type" : "long"
      }
    }
  ],
  "track_total_hits" : -1
} 
```

## Using the SQL Client 


You can also use the standalone SQL client that makes running similar to querying a database...note that his is only available on self-hosted Elasticsearch cluster since you need access the executable itself.

To run...

```bash
sudo /usr/share/elasticsearch/bin/elasticsearch-sql-cli
```

If you've enabled HTTPs and using username and password...

```bash
/usr/share/elasticsearch/bin/elasticsearch-sql-cli  \
https://$ELASTIC_USER:$ELASTIC_PW@$ELASTIC_ENDPOINT:9200 -c -d -v
```

