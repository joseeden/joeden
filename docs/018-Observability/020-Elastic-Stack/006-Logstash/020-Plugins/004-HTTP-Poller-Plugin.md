---
title: "HTTP Poller Plugin"
description: "HTTP Poller Plugin"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Logstash
sidebar_position: 3
last_update:
  date: 12/30/2022
---

## Overview 

The HTTP Poller Input Plugin in Logstash allows you to pull data from an HTTP endpoint at regular intervals. It can be used to collect data from REST APIs or web services and process it in Logstash.

- It supports multiple HTTP methods like GET and POST.
- Can handle JSON, XML, or other content types.

This lab focuses on testing input plugins in Logstash and integrating them with Elasticsearch for log processing and data visualization.

## Lab Environment 

| Node    | Hostname       | IP Address       | 
|---------|----------------|------------------|
| Node 1  | elasticsearch  |  192.168.56.101  |
| Node 2  | logstash       |  192.168.56.102  |

Setup details:

- The nodes are created in VirtualBox using Vagrant.
- An SSH key is generated on the Elasticsearch node
- The Logstash node can reach Elasticsearch node via port 9200 
- The Logstash node needs to have internet access for this lab.

## Pre-requisites 

- [Create the nodes in VirtualBox](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#setup-the-virtual-machines)
- [Install Elasticsearch on node 1](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#install-elasticsearch-817)
- [Install Logstash on node 2](/docs/018-Observability/020-Elastic-Stack/006-Logstash/001-Installing-Logstash.md)
- [Configure SSL on Elasticsearch](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/003-SSL-Configuration.md)
- [Share Elasticsearch CA cert to Logstash](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#share-the-certificate-to-other-vms-optional)
- [Install jq on both nodes](https://www.scaler.com/topics/linux-jq/)

## Testing the APIs

In this step, we will use a free online API to test sending requests and receiving responses. For example, we can make a POST request to **jsonplaceholder**, which is a free site for mock API for testing.

:::info

The Logstash node needs to have internet access for this lab.

:::

From the Logstash node, run:

```bash
curl -i -s -X POST https://jsonplaceholder.typicode.com/posts \
-H "Content-Type: application/json" \
-d '{"title": "foo", "body": "bar", "userId": 1}'
```

This request will create a record in the remote database and return the record's details, including its ID.

```bash
HTTP/2 201
date: Sat, 04 Jan 2023 12:29:34 GMT
content-type: application/json; charset=utf-8
content-length: 65
location: https://jsonplaceholder.typicode.com/posts/101
report-to: {"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1735993774&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=OZM1m1CB%2BC2lTfy2pAG70mYabnHWVOpiVhrExdTsGzc%3D"}]}
reporting-endpoints: heroku-nel=https://nel.heroku.com/reports?ts=1735993774&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=OZM1m1CB%2BC2lTfy2pAG70mYabnHWVOpiVhrExdTsGzc%3D
nel: {"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}
x-powered-by: Express
x-ratelimit-limit: 1000
x-ratelimit-remaining: 999
x-ratelimit-reset: 1735993799
vary: Origin, X-HTTP-Method-Override, Accept-Encoding
access-control-allow-credentials: true
cache-control: no-cache
pragma: no-cache
expires: -1
access-control-expose-headers: Location
x-content-type-options: nosniff
etag: W/"41-GDNaWfnVU6RZhpLbye0veBaqcHA"
via: 1.1 vegur
cf-cache-status: DYNAMIC
server: cloudflare
cf-ray: 8fcb3c1d0f9f8956-SIN
alt-svc: h3=":443"; ma=86400
server-timing: cfL4;desc="?proto=TCP&rtt=32666&min_rtt=16439&rtt_var=17041&sent=8&recv=10&lost=0&retrans=0&sent_bytes=3410&recv_bytes=927&delivery_rate=255489&cwnd=184&unsent_bytes=0&cid=f1b1f1ad2fb73012&ts=685&x=0"

{
  "title": "foo",
  "body": "bar",
  "userId": 1,
  "id": 101
} 
```

Next, we can test the Elasticsearch API by checking the health of the cluster. Send a `GET` request to retrieve the cluster health information.

:::info 

Store the Elasticsearch endpoint and credentials in variables:  

```bash
ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
ELASTIC_USER="your-username"
ELASTIC_PW="your-password"
```  

:::

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW --insecure -XGET $ELASTIC_ENDPOINT:9200/_cluster/health | jq 
```

Output:

```bash
{
  "cluster_name": "elasticsearch",
  "status": "yellow",
  "timed_out": false,
  "number_of_nodes": 1,
  "number_of_data_nodes": 1,
  "active_primary_shards": 6,
  "active_shards": 6,
  "relocating_shards": 0,
  "initializing_shards": 0,
  "unassigned_shards": 3,
  "unassigned_primary_shards": 0,
  "delayed_unassigned_shards": 0,
  "number_of_pending_tasks": 0,
  "number_of_in_flight_fetch": 0,
  "task_max_waiting_in_queue_millis": 0,
  "active_shards_percent_as_number": 66.66666666666666
}  
```



## Using the Plugin

To configure Logstash to interact with both APIs, you need to set up the `external_api` and `es_health_status` sections in the `plugin-http-poller.conf`.

- [plugin-http-poller.conf](@site/docs/018-Observability/020-Elastic-Stack/006-Logstash/Logstash-config-files/plugin-http-poller.conf)

This configuration sets up two `http_pollers`: one for the external API and one for the Elasticsearch API. For the Elasticsearch Poller, ensure you specify the IP address of the Elasticsearch node.

- Each poller is tagged to easily identify the response from each.
- The external API is polled every 5 seconds.
- Elasticsearch health check is scheduled with cron to run every minute.
- `metadata_target` ensures response headers are stored in the specified metadata.
- These `metadata_target` help in storing the metadata in Elasticsearch.
- The output specifies the index based on the tag.

:::info

SSL is enabled on Elasticsearch. The input section employs the `Basic` header with your username and password encoded in Base64, while the output section utilizes the username, password, and a CA certificate in `jks` format. 

To get the Base64 encoding, run the command below. 

```bash
echo -n "elastic:enter-password-here" | base64
```

:::

Run the configuration using Logstash:

```bash
/usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/plugin-http-poller.conf
```

Logstash will continue running unless manually stopped with `Ctrl-C`. Let it run for 5 minutes, then stop it. 

To verify the indexed data in Elasticsearch:

```bash
curl -u $ELASTIC_USER:$ELASTIC_PW --insecure \
-X GET "$ELASTIC_ENDPOINT:9200/_cat/indices?v"
```

Output:

```bash
health status index                 uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
yellow open   http-poller-es-health 0JsCvA5hSbmqKSV3idFL0Q   1   1         16            0    304.4kb        304.4kb      304.4kb
yellow open   http-poller-api       aTMDXr4iS4qstbra9Siv3A   1   1        805            0      2.1mb          2.1mb        2.1mb
```

Next, to inspect the external API data:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/http-poller-api/_search?pretty=true -d'
{
  "query": {
    "match_all": {}
  },
  "sort": [{
    "@timestamp": {
      "order": "desc"
    }
  }]
  "size": 1,
}' | jq
```


You can also check the Elasticsearch cluster health:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/http-poller-es-health/_search?pretty=true -d'
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "@timestamp": {
        "order": "desc"
      }
    }
  ],
  "size": 1
}'
```

Output:

```bash
{
  "took" : 13,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 7,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [
      {
        "_index" : "http-poller-es-health",
        "_id" : "EyTyMZQBoqYOKoM-XYG8",
        "_score" : null,
        "_ignored" : [
          "event.original.keyword"
        ],
        "_source" : {
          "number_of_pending_tasks" : 0,
          "number_of_nodes" : 1,
          "status" : "yellow",
          "relocating_shards" : 0,
          "cluster_name" : "elasticsearch",
          "active_shards_percent_as_number" : 80.0,
          "task_max_waiting_in_queue_millis" : 0,
          "unassigned_primary_shards" : 0,
          "number_of_data_nodes" : 1,
          "tags" : [
            "es_health"
          ],
          "delayed_unassigned_shards" : 0,
          "initializing_shards" : 0,
          "@version" : "1",
          "@timestamp" : "2025-01-04T15:52:00.580609424Z",
          "active_shards" : 4,
          "unassigned_shards" : 1,
          "timed_out" : false,
          "active_primary_shards" : 4,
          "event" : {
            "original" : "{\"cluster_name\":\"elasticsearch\",\"status\":\"yellow\",\"timed_out\":false,\"number_of_nodes\":1,\"number_of_data_nodes\":1,\"active_primary_shards\":4,\"active_shards\":4,\"relocating_shards\":0,\"initializing_shards\":0,\"unassigned_shards\":1,\"unassigned_primary_shards\":0,\"delayed_unassigned_shards\":0,\"number_of_pending_tasks\":0,\"number_of_in_flight_fetch\":0,\"task_max_waiting_in_queue_millis\":0,\"active_shards_percent_as_number\":80.0}"
          },
          "number_of_in_flight_fetch" : 0,
          "http_poller_metadata" : {
            "input" : {
              "http_poller" : {
                "request" : {
                  "name" : "es_health_status",
                  "host" : {
                    "hostname" : "node2"
                  },
                  "original" : {
                    "url" : "$ELASTIC_ENDPOINT:9200/_cluster/health",
                    "headers" : {
                      "Authorization" : "Basic ZWxhc3RpYzplbGFzdGlj",
                      "Accept" : "application/json"
                    },
                    "method" : "get"
                  },
                  "retry_count" : 0
                },
                "response" : {
                  "status_message" : "OK",
                  "status_code" : 200,
                  "headers" : {
                    "x-elastic-product" : "Elasticsearch",
                    "content-length" : "419",
                    "content-type" : "application/json"
                  },
                  "elapsed_time_ns" : 16070
                }
              }
            }
          }
        },
        "sort" : [
          1736005920580
        ]
      }
    ]
  }
}
```


## Cleanup 

Use the command below to delete the indices after the lab. Make sure to replace `enter-name` with the index name.

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW  \
-H 'Content-Type: application/json' \
-XDELETE "$ELASTIC_ENDPOINT:9200/enter-name" | jq
```