---
title: "Fuzzy Queries"
description: "Fuzzy Matching in Elasticsearch"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 6
last_update:
  date: 3/28/2023
---


## Overview

Fuzzy matching finds terms that are similar to the search term, which makes it useful for handling typos or slight spelling variations. It works by allowing a defined number of character edits (insertions, deletions, or substitutions).  

- Specify the `fuzziness` parameter to control similarity.  
- Ideal for misspellings or approximate matches.  
- Higher fuzziness values may retrieve broader results.  

In the example below, we are searching for the movie "Interstellar" and we've set the fuzziness to 2, allowing for up to two typos or misspellings.

```bash
curl -s -u elastic:<password> \
-H 'Content-Type: application/json' \
-XGET "https://localhost:9200/movies/_search?pretty" -d '
{
  "query": {
    "fuzzy": {
      "title": {
        "value": "intrsteller",
        "fuzziness": 2
      }
    }
  }
}' | jq
```  



## Levenshtein Edit Distance

Levenshtein Edit Distance measures the difference between two strings based on the number of single-character edits required to transform one string into the other.

In the example below, all have an edit distance of 1.

- Substitutions of characters

    ```plaintext
    interstellar --> intersteller
    ```

- Insertions of characters

    ```plaintext
    interstellar --> instersteller
    ```

- Deletion of characters

    ```plaintext
    interstellar --> interstelar
    ```


## Auto Fuzziness

Auto fuzziness automatically adjusts the fuzziness level based on the length of the string. This helps make fuzzy matching more flexible.

- Use `0` for 1-2 character strings  
- Use `1` for 3-5 character strings  
- Use `2` for longer strings

Using the previous example, we can set the fuzzines to `auto':

```bash
curl -s -u elastic:<password> \
-H 'Content-Type: application/json' \
-XGET "https://localhost:9200/movies/_search?pretty" -d '
{
  "query": {
    "fuzzy": {
      "title": {
        "value": "intrsteller",
        "fuzziness": "auto"
      }
    }
  }
}' | jq
```  

Output:

```json
{
  "took": 12,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 1,
      "relation": "eq"
    },
    "max_score": 2.884009,
    "hits": [
      {
        "_index": "movies",
        "_id": "135570",
        "_score": 2.884009,
        "_source": {
          "id": "135570",
          "title": "Interstellar",
          "year": 2014,
          "genre": [
            "Sci-Fi",
            "Adventure",
            "Drama"
          ]
        }
      }
    ]
  }
} 
```