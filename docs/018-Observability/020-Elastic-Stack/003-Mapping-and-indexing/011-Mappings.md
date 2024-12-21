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
sidebar_position: 11
last_update:
  date: 3/28/2023
---


## Overview 

Mapping defines how Elasticsearch stores, indexes, and queries document fields.

- Similar to SQL schemas, it sets field types and properties.  
- Ensures efficient storage and accurate searches.

A mapping is a **schema definition**. Elasticsearch has default settings, but you may customize it. For example, the following `POST` request:

```bash
curl -XPUT https://127.0.0.1:9200/movies -d '
{
  "mappings": {
    "properties": {
      "year": {
        "type": "date"
      }
    }
  }
}
'
```


## Field Types

Field types specify the format for each field in Elasticsearch. 

```bash
curl -XPUT https://127.0.0.1:9200/movies -d '
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text"
      },
      "release_date": {
        "type": "date"
      }
    }
  }
}
'
```

## Field Index

Field indexing controls how data is indexed and searched. 

```bash
curl -XPUT https://127.0.0.1:9200/movies -d '
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "index": true
      }
    }
  }
}
'
```

## Field Analyzer

Field analyzers define how text is processed for indexing and search, affecting how documents are stored and queried. 

```bash
curl -XPUT https://127.0.0.1:9200/movies -d '
{
  "mappings": {
    "properties": {
      "description": {
        "type": "text",
        "analyzer": "standard"
      }
    }
  }
}
'
```

## Sample Field Analyzers

Field analyzers can include components like character filters, tokenizers, and token filters.

- **Character Filters**  
  - Modify text before tokenization.  
  - Examples: removing punctuation or normalizing case.

- **Tokenizers**  
  - Break text into individual terms or tokens.  
  - Split strings with whitespace, punctuations, or non-letters
  - Examples: include standard, whitespace, and keyword.

- **Token Filters**  
  - Process tokens after tokenization.  
  - Lower-casing, stemming, synonyms, stopwords
  - Examples: remove stop words, modify token case, etc.

Common choices for analyzers:

- **Standard**

  - Split on word boundaries, remove punctuation, lowercases
  - Good choice if language is unknown 

- **Simple**

  - Splits on anything that isn't a letter, and lowercase 

- **Whitespace**

  - Splits on whitespaces but don't lowercase

- **Language**

  - Example: English
  - Accounts for language-specific stopwords and stemming.
