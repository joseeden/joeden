---
title: "Mapping Exceptions"
description: "Mapping Exceptions in Elasticsearch"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 18
last_update:
  date: 3/28/2023
---


## Process and Result

Mapping in Elasticsearch involves two key components: **process** and **result**. 

### The Mapping Process

In Elasticsearch, the mapping process determines how documents and their fields are indexed and stored. There are two types of mapping: explicit and dynamic.

- **Explicit Mapping**  
  - Defines field types manually.  
  - Provides full control over indexing.

- **Dynamic Mapping**  
  - Automatically detects and assigns field types.  
  - Useful for unknown or changing data structures.

### The Mapping Result

The result of mapping defines the field types and structures that are created when a document is indexed. For example:

- **Timestamp** mapped as a date
- **Service** mapped as a keyword
- **IP** mapped as an IP data type
- **Port** mapped as an integer
- **Message** mapped as text 

This could look like the following JSON:

```json
{
  "mappings": {
    "properties": {
      "timestamp": {"type": "date"},
      "service": {"type": "keyword"},
      "host_ip": {"type": "ip"},
      "port": {"type": "integer"},
      "message": {"type": "text"}
    }
  }
}
```

## Mapping Challenges

With **Explicit Mapping**, it can provide full control over field types, but there are some challenges when mismatches occur:

- Field types must be predefined
- Unexpected data will not fit the defined schema.
- Mismatches  between  field type and incoming data can cause indexing failures unless mapping is adjusted.

On the other hand, **Dynamic Mapping** is more flexible but comes with its own challenges:

- Mapping explosion; increasing index size and reducing performance.
- New fields are automatically added, may lead to incorrect types/results.

## Getting Exceptions

:::info 

The example below is tested on a running Elasticsearch 8.

:::

1. Create the mapping:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -X PUT 'https://localhost:9200/microservice-logs' \
    --data-raw '{
      "mappings": {
          "properties": {
              "timestamp": { "type": "date" },
              "service": { "type": "keyword" },
              "host_ip": { "type": "ip" },
              "port": { "type": "integer" },
              "message": { "type": "text" }
          }
      }
    }' | jq
    ```

    Output:

    ```json
    {
      "acknowledged": true,
      "shards_acknowledged": true,
      "index": "microservice-logs"
    }      
    ```

2. Try to index data where the `port` is set to a string instead of a numeric value:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPOST 'https://localhost:9200/microservice-logs/_doc?pretty' \
    --data-raw '{
      "timestamp": "2020-04-11T12:34:56.789Z", 
      "service": "XYZ", 
      "host_ip": "10.0.2.15", 
      "port": "15000", 
      "message": "Hello!" 
    }' | jq
    ```

    Output:

    ```json
    {
      "_index": "microservice-logs",
      "_id": "kAq66pMBk-O02Q_RbeJw",
      "_version": 1,
      "result": "created",
      "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
      },
      "_seq_no": 0,
      "_primary_term": 1
    } 
    ```

3. Now try setting `port` to `NONE`:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPOST 'https://localhost:9200/microservice-logs/_doc?pretty' \
    --data-raw '{
      "timestamp": "2020-04-11T12:34:56.789Z", 
      "service": "XYZ", 
      "host_ip": "10.0.2.15", 
      "port": "NONE", 
      "message": "I am not well!" 
    }' | jq
    ```

    You will receive an exception. Elasticsearch tries to interpret the value, but since `NONE` is not a valid integer, it throws a `document_parsing_exception`.

    ```json
    {
      "error": {
        "root_cause": [
          {
            "type": "document_parsing_exception",
            "reason": "[5:11] failed to parse field [port] of type [integer] in document with id 'kQq76pMBk-O02Q_R4OKr'. Preview of field's value: 'NONE'"
          }
        ],
        "type": "document_parsing_exception",
        "reason": "[5:11] failed to parse field [port] of type [integer] in document with id 'kQq76pMBk-O02Q_R4OKr'. Preview of field's value: 'NONE'",
        "caused_by": {
          "type": "number_format_exception",
          "reason": "For input string: \"NONE\""
        }
      },
      "status": 400
    }      
    ```


## Ignore Malformed Data

There is no single solution to solve exceptions, but here is a method to handle the issue:

1. Close the index:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPOST 'https://localhost:9200/microservice-logs/_close' | jq
    ```

    Output:

    ```json
    {
      "acknowledged": true,
      "shards_acknowledged": true,
      "indices": {
        "microservice-logs": {
          "closed": true
        }
      }
    } 
    ```

2. Change the setting to allow malformed data:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPUT 'https://localhost:9200/microservice-logs/_settings' \
    --data-raw '{
      "index.mapping.ignore_malformed": true
    }' | jq
    ```

3. Reopen the index:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPOST 'https://localhost:9200/microservice-logs/_open' | jq
    ```

4. Now try rerunning the previous erroneous command. It will now be accepted:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPOST 'https://localhost:9200/microservice-logs/_doc?pretty' \
    --data-raw '{
      "timestamp": "2020-04-11T12:34:56.789Z", 
      "service": "XYZ", 
      "host_ip": "10.0.2.15", 
      "port": "NONE", 
      "message": "I am not well!" 
    }' | jq
    ```

    Output:

    ```json
    {
      "_index": "microservice-logs",
      "_id": "kgrC6pMBk-O02Q_Rn-JN",
      "_version": 1,
      "result": "created",
      "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
      },
      "_seq_no": 1,
      "_primary_term": 5
    }      
    ```

## `ignore_malformed` Limitation

The `ignore_malformed` setting cannot handle JSON input that doesn't match the expected structure. Even with this setting enabled, Elasticsearch will still throw an error if the data doesn't align with the field's definition.

1. Run the following command to attempt indexing the document:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPOST 'https://localhost:9200/microservice-logs/_doc?pretty' \
    --data-raw '{
        "timestamp": "2020-04-11T12:34:56.789Z", 
        "service": "ABC", 
        "host_ip": "10.0.2.15", 
        "port": 12345, 
        "message": {
          "data": {
            "received":"here"
            }
          }
      }' | jq
    ```

2. The input is rejected because the `message` field, which is defined as a `text` type, receives an object (`{data={received=here}}`) instead of a string.

    ```json
    {
      "error": {
        "root_cause": [
          {
            "type": "document_parsing_exception",
            "reason": "[10:7] failed to parse field [message] of type [text] in document with id 'kwrK6pMBk-O02Q_RpeJS'. Preview of field's value: '{data={received=here}}'"
          }
        ],
        "type": "document_parsing_exception",
        "reason": "[10:7] failed to parse field [message] of type [text] in document with id 'kwrK6pMBk-O02Q_RpeJS'. Preview of field's value: '{data={received=here}}'",
        "caused_by": {
          "type": "illegal_argument_exception",
          "reason": "Expected text at 6:16 but found START_OBJECT"
        }
      },
      "status": 400
    } 
    ```

## Payload Exception

This example shows how an unexpected structure in the payload causes a mapping exception in Elasticsearch.

1. Add a document with a payload field:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPOST 'https://localhost:9200/microservice-logs/_doc?pretty' \
    --data-raw '{
      "timestamp": "2020-04-11T12:34:56.789Z", 
      "service": "ABC", 
      "host_ip": "10.0.2.15", 
      "port": 12345, 
      "message": "Received...", 
      "payload": {
        "data": { 
          "received":"here"
          }
      }
    }' | jq
    ```

    Output:

    ```json
    {
      "_index": "microservice-logs",
      "_id": "lArT6pMBk-O02Q_RVuLZ",
      "_version": 1,
      "result": "created",
      "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
      },
      "_seq_no": 2,
      "_primary_term": 5
    } 
    ```


2. Check the mapping to verify how the `payload` field is mapped:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XGET 'https://localhost:9200/microservice-logs/_mapping?pretty' 
    ```

    The mapping shows the `payload` field as an object with nested properties:

    ```json
      "payload" : {
        "properties" : {
          "data" : {
            "properties" : {
              "received" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword",
                    "ignore_above" : 256
                  }
                }
              }
            }
          }
        }
      }, 
    ```

3. Attempt to index another document, this time with a different structure for `received`:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPOST 'https://localhost:9200/microservice-logs/_doc?pretty' \
    -d '{
      "timestamp": "2020-04-11T12:34:56.789Z", 
      "service": "ABC", 
      "host_ip": "10.0.2.15", 
      "port": 12345, 
      "message": "Received...", 
      "payload": {
        "data": {
          "received": {"even": "more"}
        }
      }
    }' | jq
    ```


4. This causes an exception because the `received` field is expected to be of type `text`, but an object is provided instead:

    ```json
    {
      "error": {
        "root_cause": [
          {
            "type": "document_parsing_exception",
            "reason": "[9:34] failed to parse field [payload.data.received] of type [text] in document with id 'lQrY6pMBk-O02Q_REOIG'. Preview of field's value: '{even=more}'"
          }
        ],
        "type": "document_parsing_exception",
        "reason": "[9:34] failed to parse field [payload.data.received] of type [text] in document with id 'lQrY6pMBk-O02Q_REOIG'. Preview of field's value: '{even=more}'",
        "caused_by": {
          "type": "illegal_argument_exception",
          "reason": "Expected text at 9:19 but found START_OBJECT"
        }
      },
      "status": 400
    } 
    ```

## Field Limit 

By default, Elasticsearch limits the number of fields to 1000 in an index, which means that if you attempt to index more than 1000 fields, Elasticsearch will reject the document and throw an error.

To test the field limit:

1. Generate a JSON payload with more than 1000 fields:

    ```bash
    thousandone_fields_json=$(echo {1..1001..1} | jq -Rn '( input | split(" ") ) as $nums | $nums[] | . as $key | [{key:($key|tostring),value:($key|tonumber)}] | from_entries' | jq -cs 'add') 
    ```

2. Create the index:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPUT 'https://localhost:9200/big-objects' 
    ```

3. Try to import the data with over 1000 fields:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPOST 'https://localhost:9200/big-objects/_doc?pretty' \
    -d "$thousandone_fields_json"
    ```

4. Expected error due to exceeding the field limit:

    ```json
    {
      "error" : {
        "root_cause" : [
          {
            "type" : "document_parsing_exception",
            "reason" : "[1:9795] failed to parse: Limit of total fields [1000] has been exceeded while adding new fields [1001]"
          }
        ],
        "type" : "document_parsing_exception",
        "reason" : "[1:9795] failed to parse: Limit of total fields [1000] has been exceeded while adding new fields [1001]",
        "caused_by" : {
          "type" : "illegal_argument_exception",
          "reason" : "Limit of total fields [1000] has been exceeded while adding new fields [1001]"
        }
      },
      "status" : 400
    }
    ```

5. Increase the field limit (with caution due to potential performance implications):

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPUT 'https://localhost:9200/big-objects/_settings' \
    -d '{
        "index.mapping.total_fields.limit": 1001
    }' | jq
    ```

6. Reindex the data, which should now be allowed:

    ```bash
    curl -s -u elastic:<password> \
    -H 'Content-Type: application/json' \
    -XPOST 'https://localhost:9200/big-objects/_doc?pretty' \
    -d "$thousandone_fields_json"
    ```

    Output (Successful import):

    ```json
    {
      "_index" : "big-objects",
      "_id" : "mQrm6pMBk-O02Q_Rm-Jy",
      "_version" : 1,
      "result" : "created",
      "_shards" : {
        "total" : 2,
        "successful" : 1,
        "failed" : 0
      },
      "_seq_no" : 0,
      "_primary_term" : 1
    }
    ```