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
sidebar_position: 9
last_update:
  date: 3/28/2023
---


## Overview 

N-grams break text into smaller chunks, enhancing search features like autocomplete. Elasticsearch uses N-gram tokenizers to improve search performance.

- N-grams enable autocomplete and fuzzy search.
- Elasticsearch uses custom analyzers for N-grams.
- N-gram tokenizers index text for partial matching.
- Improves search speed and accuracy.

## add header 

Index-time with N-grams....

Consider the example term "star".....

...add table..

unigram   [ s, t, a, r ]
bigram    [ st, ta, ar ]
trigram   [ sta, tar ]
4-gram    [ star ]


Edge n-grams are built only on the beginning of each term...

- single unigram  [ s ]
- single bigram   [ st ]
- single trigram  [ sta ]
- single 4-gram   [ star ]

## Indexing N-grams 

...add short simplified intro..

1. Create an Autocomplete anayzer..explain the command below..

    ```bash
    curl -XPUT 127.0.0.1:9200/movies?pretty
    "settings":
    "analysis": t
    "filter":
    autocomplete_filter": (
    "type": "edge_ngram",
    "min_gram": 1,
    "max_gram": 20


    analyzer":
    'autocomplete":
    "type": "custom"
    "tokenizer": "standard"
    "filter": [
    "lowercase"
    "autocomplete_filter"
    ```

2. Apply the analyzer during indexing time....

```bash
curl -XPUT '127.0.0.1:9200/movies/_mapping?pretty


-d


ب


'properties" : (
"title":


"type" : "text",
"analyzer": "autocomplete" 
```

3. Use the standard analyzer on our queries...only use ng-grams on the index side...otherwise our query will also 