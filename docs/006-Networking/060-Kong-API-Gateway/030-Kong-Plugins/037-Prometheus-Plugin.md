---
title: "Prometheus Plugins"
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
sidebar_position: 37
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

This lab tests a Kong API Gateway deployment using a FastAPI Endpoint. To simplify, both the Kong API Gateway and the FastAPI Endpoint is installed locally in a Windows 10 machine.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::

## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Setup the Prometheus](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md#lab-environment)
- [Setup the Grafana](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md#lab-environment)
- [Setup the FastAPI Endpoint](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint)
- [Kong Manager OSS Access](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Create the Routes and Services](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md)
<!-- - [Create the Consumer](/docs/006-Networking/060-Kong-API-Gateway/017-Consumers-Plugins-Upstreams.md#create-the-kong-consumer) -->

## Enable the Prometheus Plugin 

Login to the Kong Manager OSS UI and go to Plugins > New Plugin > Analytics & Monitoring > Prometheus. 
Enable the following and click Save.

- Bandwidth Metrics
- Latency Metrics
- Per Consumer
- Status Code Metrics
- Upstream Health Metrics

![](/img/docs/12052024-prometheus-plugin.png)

## Generate Logs 

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

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

For this to work, you need to have the [FastAPI Endpoint setup](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint) and the [routes and gateway services must be configured](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md).

:::


## Check Logs in Prometheus

Open a web browser and nvaigate to the Prometheus page:

```bash
http://localhost:9090/
```

Click the gear icon on the right and make sure the following settings are enabled.

![](/img/docs/12052024-prometheus-grafana-enabled-toggles.png)

On the query field, enter the metric below and click Execute. Click on the Graph tab. At the moment, there's not much data showing in the dashboard.

```bash
kong_request_latency_ms_count 
```


Click on the Graph tab. At the moment, there's not much data showing in the dashboard.





## Create the Grafana Dashboard

Follow the steps below to add the data source and create the dashboard:


1. On another browser tab, open the Grafana page:

    ```bash
    http://localhost:300    
    ```

    ![](/img/docs/12052024-prometheus-grafana-landing-page.png)

2. Click **Add your first data source** > Choose **Prometheus** as data source.

    ![](/img/docs/12052024-prometheus-grafana-add-data-source.png)

3. In the **Connection** settings, specify the server URL:

    ![](/img/docs/12052024-prometheus-grafana-add-server-url.png)

4. Under **Alerting**, set the following intervals.

    ![](/img/docs/12052024-prometheus-grafana-set-intervals.png)

5. Click **Save & test**. Once its done, you should see the Success message.

    ![](/img/docs/12052024-prometheus-grafana-run-and-test.png)

6. Click Dashboard on the left panel > Create dashboard

    ![](/img/docs/12052024-prometheus-grafana-left-panel-create-dashboard.png)

7. Add a name to your dashboard then click Save.

    ![](/img/docs/12052024-prometheus-grafana-name-dashboard.png)

8. Click the **Import dashboard** once again. 

    ![](/img/docs/12052024-prometheus-grafana-add-new-dashboard-2.png)

9. Go to [Kong (official) - Grafana Labs](https://grafana.com/grafana/dashboards/7424-kong-official/) and copy the dashboard ID.

    ![](/img/docs/12052024-prometheus-grafana-copy-id.png)

10. Enter the dashboard code `7424` and click **Load**.

    ![](/img/docs/12052024-prometheus-grafana-load-7424.png)


11. Select Prometheus as the data source and click **Import**

    ![](/img/docs/12052024-prometheus-grafana-imported-7424.png)





