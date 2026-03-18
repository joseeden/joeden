---
title: "API Management"
description: "API Management in Azure"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
- API Design
- API Management
sidebar_position: 10
last_update:
  date: 11/16/2020
---

## Overview

APIs let applications talk to each other without knowing how the other works. REST APIs are one way to do this over the internet.

- API stands for Application Programming Interface
- REST stands for Representational State Transfer
- REST APIs use HTTP methods to perform actions

REST methods include:

| HTTP Method | Purpose               |
| ----------- | --------------------- |
| GET         | Retrieves data        |
| POST        | Creates new data      |
| PUT         | Updates existing data |
| DELETE      | Removes data          |

These methods let apps perform operations like fetching weather data, saving favorites, updating locations, or removing entries. Every request is independent, and responses are usually in JSON or XML.

## Using APIs in a Weather App

Imagine checking the weather in Paris. The app does not store all weather data locally. Instead, it calls a weather API. 

- Apps rely on APIs to fetch external data
- APIs process requests and return structured responses
- The app then displays the result to you

In the example below, we are fetching weather data for London and Paris and combining them into a single JSON payload. The `get_weather` function simulates retrieving data from an API.

**Note**: The code below is an excerpt. To see the full, working version, please check out the [Jupyter Notebook.](/docs/065-Software-Engineering/021-Jupyter-Notebooks/030-API-Management-in-Azure/Fetch-Weather-Data-using-OpenWeatherMap.ipynb)

```python
london_weather = get_weather('London')
paris_weather = get_weather('Paris')

payload = {'weather': [london_weather, paris_weather]}

print("Current weather report:")
respond(payload)
```

Output:

```json
Current weather report:
{
  "weather": [
    {
      "city": "London",
      "temp_c": 18,
      "condition": "Cloudy",
      "humidity": 72
    },
    {
      "city": "Paris",
      "temp_c": 21,
      "condition": "Sunny",
      "humidity": 55
    }
  ]
}
```

The example shows how a GET request retrieves and combines data from multiple sources.

## Hosting REST APIs in Azure

REST APIs can be hosted in Azure using:

- **App Services** for web apps
- **Container Apps** for containerized services
- **Function Apps** for serverless APIs

Azure API Management (APIM) can manage all these APIs.

## Azure API Management 

Azure API Management (APIM) makes managing multiple APIs easier. It helps secure APIs, monitor usage, and enforce policies like rate limits.

- APIM acts as a gateway between clients and APIs
- It handles authentication, authorization, and request transformations
- It monitors performance and usage statistics

To set up APIM:

1. Create an API Management instance in Azure
2. Import your APIs, whether hosted in Azure or elsewhere
3. Define policies like requiring API keys or limiting requests per minute

APIM supports more than REST APIs. It can also manage WebSockets, gRPC, and multiple APIs from different sources under a single instance.
