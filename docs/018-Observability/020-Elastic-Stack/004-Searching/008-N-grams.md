---
title: "N-grams"
description: "Indexing with N-grams in Elasticsearch"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 8
last_update:
  date: 3/28/2023
---


## Overview 

N-grams break text into smaller chunks, enhancing search features like autocomplete. Elasticsearch uses N-gram tokenizers to improve search performance.

- N-grams enable autocomplete and fuzzy search.
- Elasticsearch uses custom analyzers for N-grams.
- N-gram tokenizers index text for partial matching.
- Improves search speed and accuracy.

## Index-time with N-grams

N-grams helps improve search functionalities like autocomplete. Each type of N-gram represents different token lengths used for matching text.

Consider the example term "star":

| N-gram  |  Description    | Example tokens      |
|---------|-----------|
| Unigram | Single tokens that represent individual characters or words | [ s, t, a, r ] |
| Bigram  | Pairs of consecutive characters or words | [ st, ta, ar ] |
| Trigram | Sets of three consecutive characters or words  | [ sta, tar ] |
| 4-gram  | Sets of four consecutive characters or words  | [ star ]     |


## Edge N-grams

Edge n-grams work differently from standard n-grams. Instead of breaking down a term into n-grams for the entire word, edge n-grams generate tokens only from the **beginning** of each term. This is especially useful for **autocomplete** scenarios, where you want to match partial words typed by the user.

For example, using edge n-grams on the word "star":

| N-gram  | Description                                           | Example tokens      |
|---------|-------------------------------------------------------|----------------------|
| Unigram | Single token from the start of the term              | [ s ]                |
| Bigram  | Two consecutive tokens from the start                | [ st ]               |
| Trigram | Three consecutive tokens from the start              | [ sta ]              |
| 4-gram  | Four consecutive tokens from the start               | [ star ]             |

## Indexing N-grams

N-gram indexing is used to optimize search, allowing for efficient partial matching and autocomplete results. Here's how to set it up in Elasticsearch:

1. **Create an Autocomplete Analyzer**

   Setup a custom analyzer for autocomplete. The `edge_ngram` filter breaks down the text into smaller chunks (e.g., `s`, `st`, `sta`) for fast matching.

   ```bash
   curl -XPUT 127.0.0.1:9200/movies?pretty \
   -H "Content-Type: application/json" -d '
   {
     "settings": {
       "analysis": {
         "filter": {
           "autocomplete_filter": {
             "type": "edge_ngram",
             "min_gram": 1,
             "max_gram": 20
           }
         },
         "analyzer": {
           "autocomplete": {
             "type": "custom",
             "tokenizer": "standard",
             "filter": [
               "lowercase",
               "autocomplete_filter"
             ]
           }
         }
       }
     }
   }'
   ```

2. **Apply the Analyzer During Indexing**

   This command applies the custom `autocomplete` analyzer to the `title` field during indexing.

   ```bash
   curl -XPUT '127.0.0.1:9200/movies/_mapping?pretty' \
   -H "Content-Type: application/json" -d '
   {
     "properties": {
       "title": {
         "type": "text",
         "analyzer": "autocomplete"
       }
     }
   }'
   ```

3. **Use the Standard Analyzer on Queries**

   To avoid splitting the query into n-grams, use the standard analyzer on the search query. This ensures that only the indexed n-grams are used for matching.

   ```bash
   curl -XGET 127.0.0.1:9200/movies/_search?pretty \
   -H "Content-Type: application/json" -d '
   {
     "query": {
       "match": {
         "title": {
           "query": "sta",
           "analyzer": "standard"
         }
       }
     }
   }'
   ```

   In this query, we use "sta" as the search term for "Star Wars", and by specifying the standard analyzer, we ensure it is not broken down into n-grams.

4. **Use Completion Suggesters**

   You can also pre-load lists of potential completions using **completion suggesters**. This allows you to efficiently suggest options like "star" while typing.

   ```bash
   curl -XPUT 127.0.0.1:9200/movies/_mapping?pretty \
   -H "Content-Type: application/json" -d '
   {
     "properties": {
       "title_suggest": {
         "type": "completion"
       }
     }
   }'
   ```

  


## Lab: N-grams in Action 

1. Download the `movies.json` dataset.

    - [movies.json](@site/assets/elastic-stack/movies.json)

2. First, store the Elasticsearch endpoint and credentials in variables:  

    ```bash
    ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
    ELASTIC_USER="your-username"
    ELASTIC_PW="your-password"
    ```  

3. Create the Movies Index with a custom autocomplete analyzer. This analyzer uses edge n-grams to enhance search functionality. 

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H 'Content-Type: application/json' \
    -XPUT $ELASTIC_ENDPOINT:9200/movies?pretty -d '
    {
      "settings": {
        "analysis": {
          "filter": {
            "autocomplete_filter": {
              "type": "edge_ngram",
              "min_gram": 1,
              "max_gram": 20
            }
          },
          "analyzer": {
            "autocomplete": {
              "type": "custom",
              "tokenizer": "standard",
              "filter": [
                "lowercase",
                "autocomplete_filter"
              ]
            }
          }
        }
      }
    }' | jq
    ```

    Output:

    ```json
    {
      "acknowledged": true,
      "shards_acknowledged": true,
      "index": "movies"
    } 
    ```

4. Test the autocomplete analyzer on the term "Sta" and check the n-gram tokenization:

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H "Content-Type: application/json" \
    -XGET $ELASTIC_ENDPOINT:9200/movies/_analyze?pretty -d '
    {
      "analyzer": "autocomplete",
      "text": "Sta"
    }' | jq
    ```

   The output will show how the term "Sta" is split into tokens by the edge n-gram analyzer:

    ```json
    {
      "tokens": [
        {
          "token": "s",
          "start_offset": 0,
          "end_offset": 3,
          "type": "<ALPHANUM>",
          "position": 0
        },
        {
          "token": "st",
          "start_offset": 0,
          "end_offset": 3,
          "type": "<ALPHANUM>",
          "position": 0
        },
        {
          "token": "sta",
          "start_offset": 0,
          "end_offset": 3,
          "type": "<ALPHANUM>",
          "position": 0
        }
      ]
    }  
    ```

5. Map the `autocomplete` analyzer to the `title` field of the movies index to ensure it's used during indexing:

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H "Content-Type: application/json" \
    -XPUT $ELASTIC_ENDPOINT:9200/movies/_mapping?pretty -d'
    {
      "properties": {
         "title": {
           "type": "text",
           "analyzer": "autocomplete"
         }
      }
    }' | jq
    ```

    Output:

    ```json
    {
       "acknowledged": true
    }     
    ```

6. Import the `movies.json` dataset into Elasticsearch using the bulk API:

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H 'Content-Type: application/json' \
    -XPUT $ELASTIC_ENDPOINT:9200/_bulk?pretty \
    --data-binary @movies.json | jq 
    ```

7. Finally, execute a search query using the `standard` analyzer on the query side, while the `autocomplete` analyzer is used on the index side. This ensures the query does not split into n-grams:

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/movies/_search?pretty -d'
    {
      "query": {
        "match": {
          "title": {
            "query": "sta",
            "analyzer": "standard"
          }
        }
      }
    }' | jq
    ```

   This will return all movie entries related to the "Star Wars" and "Star Trek" franchises, demonstrating the autocomplete functionality with the edge n-gram analyzer.