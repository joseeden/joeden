---
title: "Indexing"
description: "Search Indexing"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 12
last_update:
  date: 12/30/2022
---


## Overview

Elasticsearch uses a process called **search indexing** to efficiently search and retrieve relevant documents. It organizes data into an inverted index to speed up queries and allows for fast text searches by mapping terms to their occurrences in documents.

## Inverted Index 

An inverted index is a key data structure used in Elasticsearch for fast text searching. It breaks text into terms and maps each term to the documents where it appears, along with its frequency.

As an example:

```plaintext title="Star Wars"
The power of the Force will be with you always.
```

```plaintext title="Spiderman"
With great power comes great responsibility.
```

Elasticsearch tokenizes these documents into terms and creates a search index.

| Word          | Appears in Document |
|---------------|---------------------|
| power         | 1, 2                |
| great         | 2                   |
| comes         | 2                   |
| responsibility | 2                   |
| force         | 1                   |
| will          | 1                   |
| be            | 1                   |
| with          | 1                   |
| you           | 1                   |
| always        | 1                   |


## How Inverted Indexing Works 

Elasticsearch uses a series of steps to build an inverted index, as seen in the `Star Wars` and  `Spiderman` quotes in the previous example.

1. **Tokenization**

    - Sentences are broken into individual words (tokens).
    - Each token forms the basis for creating the search index.

2. **Normalization**

    - Tokens are converted to lowercase for consistency.
    - This ensures case-insensitive searches.

3. **Stop Words Removal**

    - Common words like "the," "is," and "at" are removed.
    - These words doesnt add any significant meaning to the text.
    - Removing these stop words improves search relevance. 

4. **Index Creation**

    - Elasticsearch maps each term to the documents where it appears.
    - This structure allows for fast and efficient text searches.

## Term importance

Below are some key concepts used to measure the importance of these terms in search indexing.

- **TF-IDF**  
  - **Term Frequency** (TF) and **Inverse Document Frequency** (IDF).
  - Measures word importance in a document.  

- **Term Frequency**  
  - How often a word appears in a **given** document.  
  - More frequent words are considered more important.

- **Document Frequency**  
  - How often a word appears in a **all** documents.  
  - Counts how many documents contain a specific word.  
  - Helps identify common and rare terms.

- **Term Frequency/Document Frequency**  
  - The ratio of **Term Frequency** to **Document Frequency**.  
  - Highlights important terms in one document, rare across others.

## Using Indices


- **RESTful API**  
  - Provides an HTTP-based interface for Elasticsearch.  
  - Manages indices and executes search queries.

- **Client APIs**  
  - Libraries for various programming languages.  
  - Simplifies communication with Elasticsearch.

- **Analytic Tools**  
  - Tools for visualizing and analyzing data.  
  - Generate insights through queries and aggregations.