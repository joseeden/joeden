---
title: "Testing with FastAPI Endpoints"
description: "Testing with FastAPI Endpoints"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
sidebar_position: 16
last_update:
  date: 7/7/2022
---


## Lab Environment

This lab tests a Kong API Gateway deployment using a FastAPI endpoint. To simplify, both the containerized Kong API Gateway and the FastAPI endpoint are installed locally on a Windows 10 machine. A Docker Compose file is used to deploy Kong, along with other applications like Prometheus, Zipkin, the ELK Stack, and more.

To setup a containerized Kong, please see [Containerized Kong and Other Applications.](/docs/021-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)


:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::


## Pre-requisites 

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Postman](https://www.postman.com/downloads/)
- [Setup Kong API Gateway](/docs/021-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)

## Setup the API Endpoint 

The source code for the FastAPI application can be found here: [test-fastapi-simple-app](https://github.com/joseeden/test-fastapi-simple-app)

```bash
git clone https://github.com/joseeden/test-fastapi-simple-app.git
cd test-fastapi-simple-app.
pip install -r requirements.txt
python main.py
```

Output:

```bash
INFO:     Uvicorn running on http://localhost:5000 (Press CTRL+C to quit)
INFO:     Started reloader process [5367] using StatReload
INFO:     Started server process [5370]
INFO:     Waiting for application startup.
INFO:     Application startup complete 
```

Open a web browser and navigate to the endpoint:

```bash
http://localhost:5000/healthy 
```

It should return:

![](/img/docs/11182024-fastapi-endpoint-working.png)

Checking the docs:

```bash
http://localhost:5000/docs
```

![](/img/docs/11182024-fastapi-endpoint-docs-working.png)

Back in the terminal, you should see the logs:

```bash
INFO:     127.0.0.1:57982 - "GET /healthy HTTP/1.1" 200 OK
INFO:     127.0.0.1:45662 - "GET /docs HTTP/1.1" 200 OK
INFO:     127.0.0.1:39750 - "GET /openapi.json HTTP/1.1" 200 OK
``` 

## Testing with Postman 

Open Postman and create a new workspace by clicking the **My Workspaces** and select New. Enter "Api Testing" as the name of the workspace and click **Create Workspace**.

<div class='img-center'>

![](/img/docs/11182024-fastapi-postman-create-workspace.png)

</div>


Click **+ New Collection** and add "Kong" as collection name. Click Create.

<div class='img-center'>

![](/img/docs/11182024-fastapi-postman-new-collection-kong-2.png)

</div>


Click **Add requests** and then enter:

<div class='img-center'>

![](/img/docs/11182024-fastapi-postman-new-request.png)

</div>

In the request field, enter the endpoint URL and hit **Send**. It should return "healthy" in the output body.

```bash
http://localhost:5000/healthy 
```

<div class='img-center'>

![](/img/docs/11182024-fastapi-postman-get-request-healthy.png)

</div>

## Configure Gateway Service 

Go to Kong Manager > Gateway Services > New Gateway Service.

Enter the Name and then choose Protocol, Host, Port and Path. Enter the details below:

| Field     | Value                 |
|-----------|-----------------------|
| Name      | fastapi-service       |
| Protocol  | http                  |
| Host      | `host.docker.internal`  |
| Path      | `/healthy`            |
| Port      | 5000                  |

![](/img/docs/12022024-kong-gw-services.png)

The new service should now appear in the Gateway Services list.

![](/img/docs/12022024-kong-gw-services-list.png)


## Configure Route 

Go to Kong Manager > Routes > New Route 

| Field                     | Value                                 |
|---------------------------|---------------------------------------|
| Name                      | fastapi-route                         |
| Service                   | Select fastapi-service from dropdown  |

For `HTTP/HTTPs Routing Rules`, enter the following paths:

- `/kong/healthy`
- `/kong-test/healthy`

For Methods, toggle:

- `GET`

Click Save.

![](/img/docs/12022024-kong-gw-route.png)


## Test New Service via Postman 

Open Postman and add a new request. Click Send. It should return a healthy status.

![](/img/docs/12022024-kong-gw-testing-via-postman-healthy.png)

Similarly, it should return healthy for the second path.

![](/img/docs/12022024-kong-gw-testing-via-postman-healthy-kong-test.png)

To save the request, click the Save button and enter the name "Testing FastAPI via Kong".

 
## Troubleshooting 

If the request is timing out:

```bash
{
    "message": "The upstream server is timing out",
    "request_id": "f787c81401190c7d156fea21e3c9ef5b"
} 
```

Check the service from the CLI:

```bash
curl http://localhost:8001/services | jq 
```

Output:

```bash
{
  "data": [
    {
      "read_timeout": 60000,
      "tls_verify": null,
      "tls_verify_depth": null,
      "id": "5f8cb8d1-18ca-49cf-8c79-b23593e648d9",
      "protocol": "http",
      "tags": null,
      "retries": 5,
      "path": "/healthy",
      "port": 5000,
      "enabled": true,
      "client_certificate": null,
      "ca_certificates": null,
      "name": "fastapi-service",
      "host": "host.docker.internal",
      "created_at": 1733107301,
      "updated_at": 1733109379,
      "connect_timeout": 60000,
      "write_timeout": 60000
    }
  ],
  "next": null
}
```

Similarly, check the routes:

```bash
curl http://localhost:8001/routes | jq 
```

Output:

```bash
{
  "data": [
    {
      "paths": [
        "/kong/healthy",
        "/kong-test/healthy"
      ],
      "request_buffering": true,
      "sources": null,
      "snis": null,
      "protocols": [
        "http",
        "https"
      ],
      "destinations": null,
      "hosts": null,
      "methods": [
        "GET"
      ],
      "regex_priority": 0,
      "response_buffering": true,
      "created_at": 1733107937,
      "path_handling": "v0",
      "headers": null,
      "strip_path": true,
      "name": "fastapi-route",
      "https_redirect_status_code": 426,
      "preserve_host": false,
      "updated_at": 1733107937,
      "service": {
        "id": "5f8cb8d1-18ca-49cf-8c79-b23593e648d9"
      },
      "id": "08baf234-06fb-4f32-9e8a-0f30fd0f0ef1",
      "tags": []
    }
  ],
  "next": null
} 
```

Test if Kong can reach the FastAPI service:

```bash
curl http://host.docker.internal:5000/healthy 
```

If this fails, Kong cannot access your FastAPI app. Consider using `localhost` with port binding or checking your Docker network settings.

```bash
curl: (28) Failed to connect to host.docker.internal port 5000: Connection timed out 
```

Check the container logs for Kong. Find the container first:

```bash
docker ps -a --format "table {{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Names}}"
```

In my case, the container name is ` kong-1`. Check the logs:

```bash
docker logs  kong-1
```

Output:

```bash
2024/12/02 03:22:47 [error] 1370#0: *6954 upstream timed out (110: Connection timed out) while connecting to upstream, client: 172.1.1.1, server: kong, request: "GET /kong/healthy HTTP/1.1", upstream: "http://192.168.255.22:5000/healthy", host: "127.0.0.1:8000", request_id: "f787c81401190c7d156fea21e3c9ef5b"
2024/12/02 03:23:47 [error] 1370#0: *6954 upstream timed out (110: Connection timed out) while connecting to upstream, client: 172.1.1.1, server: kong, request: "GET /kong/healthy HTTP/1.1", upstream: "http://192.168.255.22:5000/healthy", host: "127.0.0.1:8000", request_id: "f787c81401190c7d156fea21e3c9ef5b"
2024/12/02 03:24:47 [error] 1370#0: *6954 upstream timed out (110: Connection timed out) while connecting to upstream, client: 172.1.1.1, server: kong, request: "GET /kong/healthy HTTP/1.1", upstream: "http://192.168.255.22:5000/healthy", host: "127.0.0.1:8000", request_id: "f787c81401190c7d156fea21e3c9ef5b"
172.1.1.1 - - [02/Dec/2024:03:24:47 +0000] "GET /kong/healthy HTTP/1.1" 504 102 
"-" "PostmanRuntime/7.43.0" kong_request_id: "f787c81401190c7d156fea21e3c9ef5b" 
172.1.1.1 - - [02/Dec/2024:03:25:37 +0000] "GET /services HTTP/1.1" 200 416 "-" 
"curl/7.68.0"
172.1.1.1 - - [02/Dec/2024:03:25:57 +0000] "GET /routes HTTP/1.1" 200 538 "-" "curl/7.68.0" 
```

The log messages indicate that Kong is unable to connect to the upstream FastAPI application, resulting in a 504 Gateway Timeout. 

```bash
upstream timed out (110: Connection timed out) while connecting to upstream, upstream: "http://192.168.255.22:5000/healthy"
```

