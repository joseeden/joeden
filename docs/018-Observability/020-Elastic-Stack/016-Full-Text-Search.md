---
title: "Full-Text Search"
description: "Using Analyzers to Cotrol Full-Text Search"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Elasticsearch
- DevOps
sidebar_position: 16
last_update:
  date: 3/28/2023
---

## Overview

Analyzers in Elasticsearch help to control how text is indexed and searched. They can be customized for exact or partial matches to improve search accuracy and relevance.

- **Exact Match**
    - Matches the exact text.
    - Use keyword mapping instead of text.
    - Ideal for precise searches like product IDs.

- **Partial Match**
    - Matches parts of the text.
    - Useful for flexible searches like titles or descriptions.

## Searching Keywords 

:::info 

The example below is tested on a running Elasticsearch 8, and uses a dataset containing movie ratings. For more information, please see [Importing by Bulk.](/docs/018-Observability/020-Elastic-Stack/014-Updating-Data.md#importing-by-bulk)

:::

Search the index for "Star Trek" movies.

```bash
curl -s -u elastic:elastic \
-H 'Content-Type: application/json' \
-XGET https://localhost:9200/movies/_search?pretty -d '
{
    "query": {
        "match": {
            "title": "Star Trek"
        }
    }
}' | jq
```

Notice that this query returns documents for both "Star Trek" and "Star Wars". The main difference is that the "Star Trek" document returned a higher score (2.6716127), while the "Star Wars" document had a lower score (0.73723686), indicating less relevance for the search term.

```json
{
  "took": 5,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 2,
      "relation": "eq"
    },
    "max_score": 2.6716127,
    "hits": [
      {
        "_index": "movies",
        "_id": "135569",
        "_score": 2.6716127,
        "_source": {
          "id": "135569",
          "title": "Star Trek Beyond",
          "year": 2016,
          "genre": [
            "Action",
            "Adventure",
            "Sci-Fi"
          ]
        }
      },
      {
        "_index": "movies",
        "_id": "122886",
        "_score": 0.73723686,
        "_source": {
          "id": "122886",
          "title": "Star Wars: Episode VII - The Force Awakens",
          "year": 2015,
          "genre": [
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

Try another qeury. Search for movies with "sci-fi" genre.

```bash
curl -s -u elastic:elastic \
-H 'Content-Type: application/json' \
-XGET https://localhost:9200/movies/_search?pretty -d '
{
    "query": {
        "match": {
            "genre": "sci-fi"
        }
    }
}' | jq
```

This query will return all movies with the "Sci-Fi" genre. Since the index isn’t strict about genre types, it will return results even with partial matches, such as lowercase text.

```json
{
  "took": 8,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 3,
      "relation": "eq"
    },
    "max_score": 0.81092054,
    "hits": [
      {
        "_index": "movies",
        "_id": "1924",
        "_score": 0.81092054,
        "_source": {
          "id": "1924",
          "title": "Plan 9 from Outer Space",
          "year": 1959,
          "genre": [
            "Horror",
            "Sci-Fi"
          ]
        }
      },
      {
        "_index": "movies",
        "_id": "135569",
        "_score": 0.7309394,
        "_source": {
          "id": "135569",
          "title": "Star Trek Beyond",
          "year": 2016,
          "genre": [
            "Action",
            "Adventure",
            "Sci-Fi"
          ]
        }
      },
      {
        "_index": "movies",
        "_id": "122886",
        "_score": 0.61051,
        "_source": {
          "id": "122886",
          "title": "Star Wars: Episode VII - The Force Awakens",
          "year": 2015,
          "genre": [
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


## Enforcing Exact Match 

To enforce an exact match, we need to modify the index mappings. In this case, we will delete the existing index and reindex the data.

```bash
curl -s -u elastic:elastic \
-H 'Content-Type: application/json' \
-XDELETE https://localhost:9200/movies
```

Output:

```bash
{"acknowledged":true} 
```

Next, we re-define the mappings. The `genre` field will be of type `keyword` for exact matches, and the `title` field will use the `text` type to allow partial matches. We will also apply the English analyzer to handle stopwords and synonyms specific to the language.

```bash
curl -u elastic:elastic \
-H 'Content-Type: application/json' \
-XPUT https://127.0.0.1:9200/movies -d '
{
  "mappings": {
    "properties": {
        "id": {"type": "integer"},
        "year": {"type": "date"},
        "genre": {"type": "keyword"},
        "type": {
            "type": "text", 
            "analyzer": "english"
            }
    }
  }
}'
```

Output:

```bash
{"acknowledged":true} 
```

Now, we reindex the data using the [movies.json](@site/assets/elastic-stack/movies.json) file.

```bash
curl -u elastic:elastic \
-H 'Content-Type: application/json' \
-XPUT https://localhost:9200/_bulk?pretty \
--data-binary @movies.json 
```

Next, search for movies with the "sci-fi" genre.

```bash
curl -s -u elastic:elastic \
-H 'Content-Type: application/json' \
-XGET https://localhost:9200/movies/_search?pretty -d '
{
    "query": {
        "match": {
            "genre": "sci-fi"
        }
    }
}' | jq
```

Since we have set the `genre` field to `keyword` type, there will be no partial matches, and the search will return no results.

```json 
{
  "took": 5,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 0,
      "relation": "eq"
    },
    "max_score": null,
    "hits": []
  }
}  
```

Finally, search for "star wars" using the `title` field.

```bash
curl -s -u elastic:elastic \
-H 'Content-Type: application/json' \
-XGET https://localhost:9200/movies/_search?pretty -d '
{
    "query": {
        "match": {
            "title": "star wars"
        }
    }
}' | jq
```

Since the `title` field is of type `text`, the search will return both "Star Wars" and "Star Trek" due to partial matches.

```json
{
  "took": 6,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 2,
      "relation": "eq"
    },
    "max_score": 1.5458014,
    "hits": [
      {
        "_index": "movies",
        "_id": "122886",
        "_score": 1.5458014,
        "_source": {
          "id": "122886",
          "title": "Star Wars: Episode VII - The Force Awakens",
          "year": 2015,
          "genre": [
            "Action",
            "Adventure",
            "Fantasy",
            "Sci-Fi",
            "IMAX"
          ]
        }
      },
      {
        "_index": "movies",
        "_id": "135569",
        "_score": 0.8025915,
        "_source": {
          "id": "135569",
          "title": "Star Trek Beyond",
          "year": 2016,
          "genre": [
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