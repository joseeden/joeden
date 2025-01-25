---
title: "Aggregations and Buckets"
description: "Aggregations and Buckets"
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

Elasticsearch is not just a search engine—it can analyze and structure numerical data, providing quick and efficient metrics analysis.  

![](/img/docs/01232025-elasticsearch-beyond-searching.png)  

Elasticsearch aggregations can sometimes replace tools like Hadoop and Spark. While Hadoop or Spark might take minutes or hours to process queries, Elasticsearch often delivers results in seconds.  

## Pre-requisites 

- [Sign up for Elastic Cloud account](https://www.elastic.co/cloud/elasticsearch-service/signup) 
- [Create a hosted deployment](https://www.elastic.co/guide/en/cloud/current/ec-create-deployment.html)
- [Install Postman](https://www.postman.com/downloads/)

## Importing the Sample Data

We need an index with sample data for analysis. You can download the Postman collections which contains all the queries which will be used in this guide.

1. Download the files here:   

    - Postman collections 
    - sp500-companies.txt 

2. On the **Overview** page, scroll down to **Ingest your content** and click **Sample data**.  
3. Choose a sample dataset under **Other sample sets**.  
4. For this guide, use the **Sample eCommerce orders** dataset.  

   ![](/img/docs/01242025-elasticcloud-sample-ecommerce-data.png)  

5. Navigate to **Dashboards > eCommerce Revenue Dashboard**.  

   ![](/img/docs/01242025-elasticcloud-sample-ecommerce-data-2.png)  

6. The index name is `Kibana Sample Data eCommerce`.  

<!-- 
## Aggregation Types 

| Aggregation Type         | Description                                                                                     |  
|---------------------------|-------------------------------------------------------------------------------------------------|  
| **Bucket Aggregations**   | Groups documents into buckets based on fields, filters, ranges, etc.                          |  
| **Metric Aggregations**   | Calculates metrics (e.g., sum, average) for document field values.                            |  
| **Pipeline Aggregations** | Processes results from other aggregations as input.                                           |  
| **Matrix Aggregations**   | (In development) Works with multiple fields to provide statistical insights.                  |  

## Aggregation Syntax

The basic aggregation syntax is:  

```json  
"aggs": {  
  "name_of_aggregation": {  
    "type_of_aggregation": {  
      "field": "document_field_name"  
    }  
  }  
}  
```  

Where: 

- **aggs**: Specifies that an aggregation is being used.  
- **name_of_aggregation**: User-defined name for the aggregation.  
- **type_of_aggregation**: The aggregation type (e.g., terms, sum).  
- **field**: Indicates the target field.  
- **document_field_name**: The column name of the document to aggregate.  



## Cardinality aggregation -->

Needing to find the number of unique values for a particular field is a common requirement. The cardinality aggregation can be used to determine the number of unique elements. 

On your Elastic Cloud dashboard, go to DevTools and run the command below to see how many unique sku’s can be found in our e-commerce data. 

```json
GET /kibana_sample_data_ecommerce/_search
{
  "size": 0, 
 "aggs": {
  "unique_skus": {
    "cardinality": {
      "field": "sku"
    }
  }
}
} 
```

Click the Play button to send the request.

![](/img/docs/01242025-elasticcloud-sample-ecommerce-data-2.png)


#### Aggregating by Rating Value  

To group documents by rating value, use the `aggs` field to create an aggregation named `ratings`.  

```json
curl -XGET '127.0.0.1:9200/ratings/_search?size-0&pretty'
-d '
{
  "aggs": {
    "ratings": {
      "terms":: {
        "field": "rating" 
      }
    }
  }
}'
```

#### Counting 5-Star Ratings  

To count only movies with a 5-star rating, add a query clause to filter the results and use an aggregation to sum them up.  

```json
curl -XGET '127.0.0.1:9200/ratings/_search?size-0&pretty'
-d '
{
  "query": {
    "match": {
      "rating": 5.0
    }
  },
  "aggs": {
    "ratings": {
      "terms":: {
        "field": "rating" 
      }
    }
  }
}'
```

#### Average Rating for a Single Movie  

To calculate the average rating for a specific movie, filter by its title and use an aggregation to compute the average.  

```json
curl -XGET '127.0.0.1:9200/ratings/_search?size-0&pretty'
-d '
{
  "query": {
    "match_phrase": {
      "title": "Star Wars Episode IV"
    }
  },
  "aggs": {
    "avg_rating": {
      "avg":: {
        "field": "rating" 
      }
    }
  }
}'
```