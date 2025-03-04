---
title: "Prometheus Plugin"
description: "Using Prometheus Plugin in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
  - Serverless
  - Prometheus
  - Grafana
sidebar_position: 51
last_update:
  date: 7/7/2022
---


## Overview 

Prometheus is an open-source monitoring and alerting tool designed to collect and store time-series data.  

- Developed by SoundCloud and part of the CNCF.  
- Tracks system metrics like CPU, memory, and custom application metrics.  
- Supports powerful querying with PromQL for real-time insights.  

The Prometheus plugin integrates Prometheus with Kong Gateway to monitor API traffic and performance.  

- Exposes Kong metrics like request counts, latencies, and error rates.  
- Metrics are made available at `/metrics` for Prometheus scraping.  
- Helps analyze and optimize API performance with Kong-specific insights.  

## Lab Environment

This lab tests a Kong API Gateway deployment using a FastAPI endpoint. To simplify, both the containerized Kong API Gateway and the FastAPI endpoint are installed locally on a Windows 10 machine. A Docker Compose file is used to deploy Kong, along with other applications like Prometheus, Zipkin, the ELK Stack, and more.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::

## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/021-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Setup Prometheus](/docs/021-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md#lab-environment)
- [Setup Grafana](/docs/021-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md#lab-environment)
- [Setup the FastAPI Endpoint](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint)
- [Kong Manager OSS Access](/docs/021-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Create the Routes and Services](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md)
<!-- - [Create the Consumer](/docs/021-Software-Engineering/081-Kong-API-Gateway/017-Consumers-Plugins-Upstreams.md#create-the-kong-consumer) -->

## Enable the Prometheus Plugin 

Login to the Kong Manager OSS UI and go to Plugins > New Plugin > Analytics & Monitoring > Prometheus. 
Enable the following and click Save.

- Bandwidth Metrics
- Latency Metrics
- Per Consumer
- Status Code Metrics
- Upstream Health Metrics

![](/img/docs/12052024-prometheus-plugin-2.png)

## Generate Logs 

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Open Postman and create a folder called **Logstash**. Right-click on the this folder and create a new `GET` request called **Prometheus Plugin**. Use this URL for the API request:

```bash
http://localhost:8000/kong/healthy 
```

![](/img/docs/12052024-prometheus-postman-request.png)

Right-click on the **Logstash** folder > Run folder. Then set **Iterations** to 1000. Click **Run Kong**.

![](/img/docs/12052024-prometheus-postman-request-run.png)

This will automatically create a loop and run the API requests 1000 times.

![](/img/docs/12052024-prometheus-postman-request-run-1000.png)


:::info[Setup Postman]

For this to work, you need to have the [FastAPI Endpoint setup](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint) and the [routes and gateway services must be configured](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md).

:::


## Check Logs in Prometheus

Open a web browser and navigate to the Prometheus page:

```bash
http://localhost:9090/
```

Click the gear icon on the right and make sure the following settings are enabled. 

![](/img/docs/12052024-prometheus-grafana-enabled-toggles.png)

On the query field, type in 'kong` to show the available metrics. Select the correct one and click Execute.

```bash
kong_nginx_requests_total
```


![](/img/docs/12052024-prometheus-grafana-autocomplete-kong-metrics.png)


:::info 

If you don't see the Kong metrics, please see [troubleshooting section](#troubleshooting).

:::


Click on the Graph tab. At the moment, there's not much data showing in the dashboard.

![](/img/docs/12052024-prometheus-grafana-autocomplete-kong-metrics-graph-2.png)



## Create the Grafana Dashboard

Follow the steps below to add the data source and create the dashboard:

1. Go to [Kong (official) - Grafana Labs](https://grafana.com/grafana/dashboards/7424-kong-official/) and copy the dashboard ID. This will be used for later steps.

    ![](/img/docs/12052024-prometheus-grafana-copy-id.png)


2. On another browser tab, open the Grafana page:

    ```bash
    http://localhost:300    
    ```

    ![](/img/docs/12052024-prometheus-grafana-landing-page.png)

3. Click **Add your first data source** > Choose **Prometheus** as data source.

    ![](/img/docs/12052024-prometheus-grafana-add-data-source.png)

4. In the **Connection** settings, specify the server URL:

    ```bash
    http://prometheus:9090 
    ```

    ![](/img/docs/12052024-prometheus-grafana-add-server-url-2.png)


5. Under **Alerting**, set the following intervals.

    ![](/img/docs/12052024-prometheus-grafana-set-intervals.png)

6. Click **Save & test**. Once its done, you should see the Success message.

    ![](/img/docs/12052024-prometheus-grafana-run-and-test.png)

7. Click Dashboard on the left panel > Create dashboard

    ![](/img/docs/12052024-prometheus-grafana-left-panel-create-dashboard.png)

8. If prompted, discard any unsaved dashboard for now. 

9. Enter the dashboard code from step 1. This code will be `7424`. Click **Load**.

    ![](/img/docs/12052024-prometheus-grafana-load-7424.png)

10. Select Prometheus as the data source. You may also change the dashboard name to "Kong Metrics". Click **Import**.

    ![](/img/docs/12052024-prometheus-grafana-imported-7424-2.png)

11. You should see more data coming in now:

    ![](/img/docs/12052024-prometheus-grafana-data-coming-in.png)



## Troubleshooting

Verify that the config file is being moutned correctly:

```bash
$ docker inspect prometheus | grep -A 10 "Mounts"

        "Mounts": [
            {
                "Type": "bind",
                "Source": "/path/to/config/prometheus.yml",
                "Destination": "/etc/prometheus/prometheus.yml",
                "Mode": "ro",
                "RW": false,
                "Propagation": "rprivate"
            },
            {
                "Type": "volume", 
```

The config file should also be pointing to the correct container name for Kong. In the docker-compose file, the container name is `test-kong-gateway_kong_1`.

```bash
$ docker exec -it prometheus cat /etc/prometheus/prometheus.yml

global:
  scrape_interval: 30s

scrape_configs:
  - job_name: kong-prometheus
    static_configs:
      - targets: ['test-kong-gateway_kong_1:8001'] 
```