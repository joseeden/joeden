---
title: "Scripts and Client Libraries"
description: "Importing data using Scripts and Client Libraries into Elasticsearch"
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



## Using Scripts  

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
    python3 movies-to-json.py > other-movies.json 
    ```
  
4. Import the new dataset into Elasticsearch.

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XPUT https://localhost:9200/_bulk?pretty \
    --data-binary @other-movies.json | jq 
    ```

5. Now try to query for a movie title.

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET 'https://localhost:9200/movies/_search?q=shrek' | jq
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


## Using Client APIs  

Elasticsearch provides client libraries for most programming languages. This makes it easier to interact with Elasticsearch without dealing directly with raw JSON.  

- Java has an official client maintained by Elastic.  
- Python offers the `elasticsearch` package.  
- Ruby supports `elasticsearch-ruby`.  
- Scala has multiple client options.  
- Perl uses the `elasticsearch.pm` module.  

## Python Client Library

1. Run an update and install required packages.

    ```bash
    sudo apt update
    sudo apt install -y python3-pip  
    sudo pip3 uninstall urllib3 chardet
    sudo pip3 install --upgrade requests
    sudo pip3 install "urllib3==1.26.6"
    sudo pip3 install "chardet==3.0.4"  
    sudo pip3 install "charset-normalizer==2.0.4"
    ```

2. Install the elasticsearch library using pip.

    ```bash
    sudo pip3 install elasticsearch
    ```

3. Download the dataset and unzip from the previous section (if you haven't done so).

    - [ml-latest-small.zip](@site/assets/elastic-stack/ml-latest-small.zip)

   Unzip the package.

    ```bash
    unzip ml-latest-small.zip 
    ```

4. Below is a sample Python code that uses the Elasticsearch client library to import movie ratings into Elasticsearch.

    :::info

    **Notes:**

    - SSL is enabled on the Elasticsearch cluster in this example.
    - Authentication is done using a username and password, without certificates.
    - The default cluster URL is `https://localhost:9200`.
    
    :::

    ```python
    import csv
    import elasticsearch
    from elasticsearch import helpers
    import urllib3
    import sys
    import warnings
    import getpass
    from collections import deque

    # Suppress specific warnings
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning) 
    warnings.filterwarnings("ignore", category=UserWarning, module='requests') 
    warnings.filterwarnings("ignore", category=Warning, module='elasticsearch')  

    # Read movie titles
    def readMovies(movies_path):
        titleLookup = {}
        with open(movies_path, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            for movie in reader:
                titleLookup[movie['movieId']] = movie['title']
        return titleLookup

    # Read ratings 
    def readRatings(movies_path, ratings_path):
        titleLookup = readMovies(movies_path)
        with open(ratings_path, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            for line in reader:
                yield {
                    'user_id': int(line['userId']),
                    'movie_id': int(line['movieId']),
                    'title': titleLookup[line['movieId']],
                    'rating': float(line['rating']),
                    'timestamp': int(line['timestamp']),
                }


    def main():
        if len(sys.argv) < 3:
            print("Usage: python3 indexratings.py <path_to_movies.csv> <path_to_ratings.csv>")
            sys.exit(1)

        movies_path = sys.argv[1]
        ratings_path = sys.argv[2]
        
        es_host = "https://localhost:9200"
        es_username = input("Enter Elasticsearch username: ")
        es_password = getpass.getpass("Enter Elasticsearch password: ")

        es = elasticsearch.Elasticsearch(
            [es_host],
            basic_auth=(es_username, es_password),
            verify_certs=False  # Disable SSL certificate verification
        )

        es.indices.delete(index="ratings", ignore=404)

        deque(helpers.parallel_bulk(es, readRatings(movies_path, ratings_path), index="ratings"), maxlen=0)
        es.indices.refresh(index="ratings")

    if __name__ == "__main__":
        main()
    ```

4. To run the code, pass the `movies.csv` and the `ratings.csv`.

    ```bash
    python3 indexratings.py ml-latest-small/movies.csv ml-latest-small/ratings.csv
    ```

    :::info

    You can put the script and the files in the same directory and run:

    ```bash
    python3 indexratings.py  movies.csv  ratings.csv
    ```

    :::

5. Provide username and password when prompted. 

    ```bash
    Enter Elasticsearch username: elastic
    Enter Elasticsearch password: 
    ```

    :::info 

    The Elasticsearch host is set to `https://localhost:9200`.  
    If your cluster uses a different address, you may need to update the script accordingly.

    :::

6. Run a query to verify if the index has been created and populated.

    ```bash
    curl -s -u elastic:elastic \
    -H 'Content-Type: application/json' \
    -XGET 'https://localhost:9200/ratings/_search?pretty' | jq
    ```
    
    Output:

    ```json
    "hits": [
      {
        "_index": "ratings",
        "_id": "NyP57pMBek9Hxsebqms0",
        "_score": 1,
        "_source": {
          "user_id": 263,
          "movie_id": 6708,
          "title": "Matchstick Men (2003)",
          "rating": 3,
          "timestamp": 1090948299
        }
      },
      {
        "_index": "ratings",
        "_id": "OCP57pMBek9Hxsebqms0",
        "_score": 1,
        "_source": {
          "user_id": 263,
          "movie_id": 6711,
          "title": "Lost in Translation (2003)",
          "rating": 4.5,
          "timestamp": 1090948232
        }
      },
      {
        "_index": "ratings",
        "_id": "OSP57pMBek9Hxsebqms0",
        "_score": 1,
        "_source": {
          "user_id": 263,
          "movie_id": 6773,
          "title": "Triplets of Belleville, The (Les triplettes de Belleville) (2003)",
          "rating": 3.5,
          "timestamp": 1090948250
        }
      }, 
    ```