---
title: "UDP Logs and ELK Stack"
description: "UDP Logs and ELK Stack Integration"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
  - Elasticsearch
  - Logstash
  - Kibana
  - ELK Stack
sidebar_position: 53
last_update:
  date: 7/7/2022
---



## Overview

This guide covers the integration of UDP logs with the ELK Stack for efficient log collection and analysis.

- Collect and forward UDP logs
- Parse and index log data using ELK

Individual Components of ELK Stack:

- **Elasticsearch**: Centralized search and analytics engine for storing and querying log data.
- **Logstash**: Collects, processes, and transforms log data before sending it to Elasticsearch.
- **Kibana**: Visualization tool to explore and create dashboards from log data in Elasticsearch.

## Lab Environment

This lab tests a Kong API Gateway deployment using a FastAPI endpoint. To simplify, both the containerized Kong API Gateway and the FastAPI endpoint are installed locally on a Windows 10 machine. A Docker Compose file is used to deploy Kong, along with other applications like Prometheus, Zipkin, the ELK Stack, and more.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::

## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Setup the FastAPI Endpoint](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint)
- [Kong Manager OSS Access](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Create the Routes and Services](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md)
- [Create the Consumer](/docs/006-Networking/060-Kong-API-Gateway/017-Consumers-Plugins-Upstreams.md#create-the-kong-consumer)
- [Setup the ELK Stack](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md#lab-environment)

## Setup Kibana 

On your terminal, run the command below to get Kibana enrollment token: 

```bash
docker exec -ti elasticsearch /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token --scope kibana 
```

Next, get Kibana verification code:

```bash
docker exec -ti kibana /usr/share/kibana/bin/kibana-verification-code 
```

Finally, reset the credentials to get a new password:

```bash
docker exec -ti elasticsearch /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
```

On a web browser, navigate to the Kibana UI:

```bash
http://localhost:5601 
```

Provide the enrollment token when prompted:

![](/img/docs/12072024-kibana-enrollment-token.png)

Next, provide the verification code:

![](/img/docs/12072024-kibana-verification-code.png)

Once done with the configuration setup, the login page will appear. Enter the admin credentials with the new password:

![](/img/docs/12072024-kibana-login-page.png)

The dashboard should now appear:

![](/img/docs/12072024-kibana-dashboard.png)


## Update the Logstash Password 

Go to the logstash directory and update the password in the `pipeline.conf`. Use the same password as the `elastic` user credentials:

```bash
output {
  elasticsearch {
    hosts => ["https://172.1.1.21:9200"] 
    cacert => "/usr/share/logstash/certs/http_ca.crt"
	index => "kong-logs"
	user => "elastic"
	
	# change the password, between quote, e.g. "your-elasticsearch-password"
    password => "xxxxxxxxxxxxxxxxxxxxx"
  }
} 
```

Restart the logstash container:

```bash
docker restart logstash 
```

<!-- 
Go to the Logstash UI and verify that it is accessible:

```bash
http://localhost:5044 
``` -->



## Copy the Certificate

First, find the self-signed SSL certificate and copy it to the container files:

```bash
docker exec -it elasticsearch sh -c "ls /usr/share/elasticsearch/config/certs/*.crt"
```

You will get the output indicating a file `.crt`.

```bash
/usr/share/elasticsearch/config/certs/http_ca.crt
```

Copy self-signed Elasticsearch certificate to current folder.

```bash
docker cp elasticsearch:/usr/share/elasticsearch/config/certs/http_ca.crt . 
```

Create the directory in the logstash container to store the certificate:
```bash
docker exec -it logstash mkdir -p /usr/share/logstash/certs 
```

Finally, copy the crt file to logstash container:

```bash
docker cp http_ca.crt logstash:/usr/share/logstash/certs/
```


## Enable the UPD Logs Plugin

To enable the plugin, we can do it in the Kong Manager console or we can also run the `curl` command in your terminal:

```bash
curl -i -X POST http://localhost:8001/plugins \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    --data '{
        "name": "udp-log",
        "config": {
            "host": "logstash",
            "port": 5555
        }
    }'

```

Login to the Kong Manager and confirm that the plugin is enabled:

![](/img/docs/12072024-udp-logs-plugin.png)


## Generate Logs 

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Open Postman and create a folder called **Logstash**. Right-click on the this folder and create a new `GET` request called **FastAPI Endpoint**. Use this URL for the API request:

```bash
http://localhost:8000/kong/healthy 
```

![](/img/docs/12052024-prometheus-postman-request.png)

Right-click on the **Logstash** folder > Run folder. Then set **Iterations** to 1000. Click **Run Kong**.

![](/img/docs/12052024-prometheus-postman-request-run.png)

This will automatically create a loop and run the API requests 1000 times.

![](/img/docs/12052024-prometheus-postman-request-run-1000.png)


:::info[Setup Postman]

For this to work, you need to have the [FastAPI Endpoint setup](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint) and the [routes and gateway services must be configured](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md).

:::


## Create the Dashboard in Kibana

Go back to the Kibana dashboard, click the hamburger menu on the left > Analytics > Discover > Create data view.

The kong logs should appear on the right side as a log source. Specify the details below and clcik Save data view to Kibana.

| Field           | Value           |
|-----------------|-----------------|
| Name            | Kong            |
| Index pattern   | `kong*`         |
| Timestamp field | `@timestamp`    |

![](/img/docs/12072024-kong-logs-kibana-source-2.png)

You should see the data coming in. Re-run the log generation in Postman in the previous step or change the iteration to a much higher number like 5000 to generate more traffic.

![](/img/docs/12072024-kong-logs-kibana-more-data-coming-in.png)
