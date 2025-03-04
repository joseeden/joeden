---
title: "Using the Kong Admin API"
description: "Using the Kong Admin API"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
sidebar_position: 18
last_update:
  date: 7/7/2022
---

## Overview

The Kong Admin API allows administrators to configure and manage Kong Gateway programmatically.

- Provides endpoints for managing services, routes, consumers, and plugins.  
- Enables automation of tasks like scaling, monitoring, and applying updates.  

## Lab Environment

This lab tests a Kong API Gateway deployment using a FastAPI endpoint. To simplify, both the containerized Kong API Gateway and the FastAPI endpoint are installed locally on a Windows 10 machine. A Docker Compose file is used to deploy Kong, along with other applications like Prometheus, Zipkin, the ELK Stack, and more.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::


## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/021-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Setup the FastAPI Endpoint](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint)
- [Kong Manager OSS Access](/docs/021-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Configure the Routes and Services](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md)

## Import the Postman Collection 

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Click the hamburger menu on the upper left and click File > Import > Click the Select Files.
The Kong API collection can be found here:

- [Kong CE Admin API V2.0](https://github.com/joseeden/joeden/tree/master/assets/postman-collections/kong)

Once imported, you should see the entire collection.

![](/img/docs/12022024-kong-gw-import-kong-api-collection.png)


## Checking Node Health

To check the health status of Kong and the underlying node, go to Health Routes folder > Retrieve Node Status > Send.

![](/img/docs/12022024-kong-gw-kong-admin-api-retrieve-node-status.png)


## Creating a Service

To create a service, go to Service Object > Add Service > Create Service. Right click on Create Service-201 and then click Duplicate. Rename the service as **Create Service - FastAPI**

![](/img/docs/12022024-kong-gw-kong-admin-api-duplicate-create-service.png)

Click the Body tab and paste the details below. You can customize this. Click Try/Send.

```bash
{
    "host": "host.docker.internal",
    "connect_timeout": 60000,
    "protocol": "http",
    "name": "test-fastapi-service",
    "read_timeout": 60000,
    "port": 443,
    "path": "/healthy",
    "retries": 5,
    "write_timeout": 60000,
    "tags": null,
    "client_certificate": null
} 
```

It should return:

![](/img/docs/12022024-kong-gw-kong-admin-api-new-service-correct.png)

To retrieve the service, go to Service Object > Retrieve Service > Retrieve Service.

Specify the service ID in the value for the `serviceNameOrID` key. The service ID can be found in the output above.

```bash
de0d8bbd-8446-4019-b6f1-1163f13ac1a5 
```

Click Send.

![](/img/docs/12022024-kong-gw-kong-admin-api-new-service-retrieve.png)

Go to the Kong Manager UI > Gateway Services. The new service should now appear here.

![](/img/docs/12022024-kong-gw-kong-admin-api-new-service-appear-in-kong-manager-ui.png)

## Creating a Route 

Go to Route Object > Add Route > Create Route > Duplicate. Rename it to **Create Route - Test**.

Open the Body tab and [aste the details below. You can customize it.

```json
{
	"name": "test-fastapi-route",
	"protocols": [
		"http",
		"https"
	],
	"methods": [
		"GET",
		"POST"
	],
	"paths": [
		"/thisisatest"
	],
	"headers": {
		"x-another-header": [
			"bla"
		],
		"x-my-header": [
			"foo",
			"bar"
		]
	},
	"https_redirect_status_code": 426,
	"regex_priority": 0,
	"strip_path": true,
	"path_handling": "v0",
	"preserve_host": false,
	"tags": [
		"user-level",
		"low-priority"
	],
	"service": {
		"id": "de0d8bbd-8446-4019-b6f1-1163f13ac1a5"
	}
} 
```

![](/img/docs/12022024-kong-gw-kong-admin-api-add-new-route.png)

The new route should now appear in the Kong Manager UI. 

![](/img/docs/12022024-kong-gw-kong-admin-api-add-new-route-APPEAR-IN-kong-manager-ui.png)


## Deleting a Service

To delete a service, go to Service Object > Delete Service > Delete Service. 

Right click on any of the requests inside the folder and click duplicate. Rename it to **Delete Service - Test**

Enter the service ID from the previous example. Click Try/Send.

```bash
de0d8bbd-8446-4019-b6f1-1163f13ac1a5 
```

You should see the `204 No Content` message. 

![](/img/docs/12022024-kong-gw-kong-admin-api-delete-new-service.png)

Go to Service Object > Retrieve Service > Retrieve Service. Specify the same service ID. 

![](/img/docs/12022024-kong-gw-kong-admin-api-delete-new-service-not-found.png)

