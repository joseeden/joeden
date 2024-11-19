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

This lab tests a Kong API Gateway deployment using a FastAPI Endpoint. To simplify, both the Kong API Gateway and the FastAPI Endpoint is installed locally in a Winodws 10 machine.

To setup a containerized Kong, please see [Containerized Kong and Other Applications.](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)

## Pre-requisites 

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Kong API Gateway](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Postman](https://www.postman.com/downloads/)


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





