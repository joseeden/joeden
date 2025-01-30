---
title: "Using Scripts"
description: "Importing data using Scripts into Elasticsearch"
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

Importing data into Elasticsearch is efficient with scripts, automating bulk operations and ensuring consistency.  

- Use Python with `elasticsearch-py` for programmatic imports and transformations.  
- Use shell scripts with the `_bulk` API for fast, structured data uploads.  

Other methods:  

- Logstash and Beats stream data from logs, S3, and databases.  
- AWS services (Lambda, Kinesis Firehose) enable seamless streaming.  
- Integration add-ons for Kafka, Spark, and more.  

## Importing Data

:::info

You need a running Elasticsearch cluster to test the examples below.
You will also need to install the following:

- [unzip](https://www.tecmint.com/install-zip-and-unzip-in-linux/).
- [python](https://www.python.org/downloads/)
- [python3-pip](https://packaging.python.org/en/latest/tutorials/installing-packages/)

::::

The script below reads a CSV file of movies, formats the data for Elasticsearch bulk indexing, and prints the output to the console.

```python title="movies-to-json.py"
import csv
import re

csvfile = open('ml-latest-small/movies.csv', 'r')
reader = csv.DictReader(csvfile)

for movie in reader:
    print(f'{{ "create" : {{ "_index": "movies", "_id" : "{movie["movieId"]}" }} }}')

    # Extract title and year
    title = re.sub(r" \(.*\)$", "", movie['title'].replace('"', ''))
    year = movie['title'][-5:-1]
    if not year.isdigit():
        year = "2016"  # Default year if no valid year is found

    # Extract genres
    genres = movie['genres'].split('|')
    genres_json = ', '.join(f'"{genre}"' for genre in genres)

    print(f'{{ "id": "{movie["movieId"]}", "title": "{title}", "year": {year}, "genre": [{genres_json}] }}')

```

Steps:

1. Download the dataset.

    - [ml-latest-small.zip](@site/assets/elastic-stack/ml-latest-small.zip)

2. Unzip the package.

    ```bash
    unzip ml-latest-small.zip 
    ```

3. Run the Python script and forward it to a file.

    ```bash
    python3 movies-to-json.py > movies-2.json 
    ```
  
4. Import the new dataset into Elasticsearch.

    :::info 

    Store the Elasticsearch endpoint and credentials in variables:  

    ```bash
    ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
    ELASTIC_USER="your-username"
    ELASTIC_PW="your-password"
    ```  

    :::


    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H 'Content-Type: application/json' \
    -XPUT $ELASTIC_ENDPOINT:9200/_bulk?pretty \
    --data-binary @movies-2.json | jq 
    ```

5. Now try to query for a movie title.

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/movies/_search?q=shrek | jq
    ```

    Output:

    ```json
    {
      "took": 10,
      "timed_out": false,
      "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
      },
      "hits": {
        "total": {
          "value": 5,
          "relation": "eq"
        },
        "max_score": 10.226742,
        "hits": [
          {
            "_index": "movies",
            "_id": "4306",
            "_score": 10.226742,
            "_source": {
              "id": "4306",
              "title": "Shrek",
              "year": 2001,
              "genre": [
                "Adventure",
                "Animation",
                "Children",
                "Comedy",
                "Fantasy",
                "Romance"
              ]
            }
          },
          {
            "_index": "movies",
            "_id": "8360",
            "_score": 8.57909,
            "_source": {
              "id": "8360",
              "title": "Shrek 2",
              "year": 2004,
              "genre": [
                "Adventure",
                "Animation",
                "Children",
                "Comedy",
                "Musical",
                "Romance"
              ]
            }
          },
          {
            "_index": "movies",
            "_id": "53121",
            "_score": 7.3886833,
            "_source": {
              "id": "53121",
              "title": "Shrek the Third",
              "year": 2007,
              "genre": [
                "Adventure",
                "Animation",
                "Children",
                "Comedy",
                "Fantasy"
              ]
            }
          },
          {
            "_index": "movies",
            "_id": "64249",
            "_score": 7.3886833,
            "_source": {
              "id": "64249",
              "title": "Shrek the Halls",
              "year": 2007,
              "genre": [
                "Adventure",
                "Animation",
                "Comedy",
                "Fantasy"
              ]
            }
          },
          {
            "_index": "movies",
            "_id": "78637",
            "_score": 7.3886833,
            "_source": {
              "id": "78637",
              "title": "Shrek Forever After",
              "year": 2010,
              "genre": [
                "Adventure",
                "Animation",
                "Children",
                "Comedy",
                "Fantasy",
                "IMAX"
              ]
            }
          }
        ]
      }
    }
    ```


