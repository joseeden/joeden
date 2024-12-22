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
   curl -XPUT 127.0.0.1:9200/movies?pretty -H "Content-Type: application/json" -d '
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
   curl -XPUT '127.0.0.1:9200/movies/_mapping?pretty' -H "Content-Type: application/json" -d '
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
   curl -XGET 127.0.0.1:9200/movies/_search?pretty -H "Content-Type: application/json" -d '
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

4. **Use Completion Suggesters**

   You can also pre-load lists of potential completions using **completion suggesters**. This allows you to efficiently suggest options like "star" while typing.

   ```bash
   curl -XPUT 127.0.0.1:9200/movies/_mapping?pretty -H "Content-Type: application/json" -d '
   {
     "properties": {
       "title_suggest": {
         "type": "completion"
       }
     }
   }'
   ```