---
title: "Schema and Handler"
description: "Schema and Handler"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - Postman
sidebar_position: 71
last_update:
  date: 2/26/2023
---


## Overview

Custom plugins in Kong allow you to extend Kong’s functionality by adding tailored logic for specific use cases. These plugins integrate seamlessly into the Kong API Gateway and can handle requests, responses, and transformations.

- Custom plugins enhance API management.
- They allow precise control over API workflows.

To create custom plugins, it is recommended to learn the Lua programming language, as Kong plugins are primarily written in Lua.

For more information, please see [Develop Custom Plugins.](https://docs.konghq.com/gateway/latest/plugin-development/)

## Lab Environment

This lab deploys Kong API Gateway and other applications in a Windows 10 machine using a docker compose file. 

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::

## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/065-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Setup the FastAPI Endpoint](/docs/065-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint)
- [Kong Manager OSS Access](/docs/065-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Create the Routes and Services](/docs/065-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md)


## Configure the Service and Route

Run the command below to create the `request-service`:

```bash
curl -X POST http://localhost:8001/services \
-H "Content-Type: application/json" \
-d '{
  "name": "request-service",
  "protocol": "http",
  "host": "host.docker.internal",
  "port": 5000,
  "path": "/healthy"
}'

```

Next, create the `request-route`:

```bash
curl -X POST http://localhost:8001/routes \
-H "Content-Type: application/json" \
-d '{
  "name": "request-route",
  "methods": ["GET", "POST"],
  "paths": ["/prod"],
  "service": {
    "name": "request-service"
  }
}'
```

Open a web browser and access the Kong Manager UI:

```bash
http://localhost:8002/ 
```

Verify that the service and route are created.

![](/img/docs/12072024-new-service-testing.png)

![](/img/docs/12072024-new-route-testing.png)


Back on the terminal run the command below. It should return a healthy status.

```bash
$ curl --location 'http://localhost:8000/prod'

{"status":"Healthy"} 
```

:::info

To make this work, make sure the [FastAPI Endpoint is set up on your local machine.](/docs/065-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)

:::


## Create the Custom Plugin 

In this example, we will create a plugin named **check_header**, which verifies if a specific header exists in incoming API requests. 
Create the necessary folder and files:

```bash
$ ls -la check_header/

total 2
drwxrwxrwx 1 johnsmith johnsmith 512 Dec  7 18:52 .
drwxrwxrwx 1 johnsmith johnsmith 512 Dec  7 19:05 ..
-rwxrwxrwx 1 johnsmith johnsmith 506 Nov 19 02:29 handler.lua
-rwxrwxrwx 1 johnsmith johnsmith 602 Nov 19 02:29 schema.lua 
```

The `schema.lua` file defines the parameters that users will provide.

```lua
local typedefs = require "kong.db.schema.typedefs"


local PLUGIN_NAME = "check_header"


local schema = {
  name = PLUGIN_NAME,
  fields = {
    { consumer = typedefs.no_consumer },
    { protocols = typedefs.protocols_http },
    { config = {
        type = "record",
        fields = {
          { request_header = typedefs.header_name {
              required = true,
              default = "accesstoken" } }
        },
        entity_checks = {
          { at_least_one_of = { "request_header" }, },
          { distinct = { "request_header"} },
        },
      },
    },
  },
}

return schema
```

The `handler.lua`  file contains the logic for processing API requests.

```lua
local plugin = {
    PRIORITY = 1000,
    VERSION = "0.1",
  }
  
  function plugin:init_worker()
  
    kong.log.debug("Check Header Plugin: init_worker")
  
  end
  
  
  function plugin:access(plugin_conf)
    kong.log.inspect(plugin_conf)
    local headers = kong.request.get_headers()[plugin_conf.request_header]
    if headers == nil then
      kong.response.exit(403, { message = "No " .. tostring(plugin_conf.request_header) .." header found in the request" })
    end
  end
  
  
  return plugin  
```

Finally, create the `kong.conf`:

```bash
plugins = bundled, check_header
log_level = debug  
```

## Deploy the Custom Plugin 

:::info

Make sure you've [setup the containerized Kong first](/docs/065-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md).

:::


First, verify the container names.

```bash
$ docker ps -a --format "table {{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Names}}" 

CONTAINER ID   IMAGE                      STATUS                        NAMES
e49b5348f0a0   pantsel/konga              Up 59 seconds                 konga_web
c12e11fe189b   dpage/pgadmin4:latest      Up 59 seconds                 pgadmin
afc9c93a904f   kong:3.7.1                 Exited (0) 52 seconds ago     kong-migrations-up
912503b7f7b2   kong:3.7.1                 Exited (0) 52 seconds ago     kong-migrations
bfb66d2826d7   logstash:8.11.3            Up 18 seconds                 logstash
e342e92d006d   prom/prometheus:latest     Up About a minute             prometheus
ffa0ba3405eb   postgres:16-alpine         Up About a minute (healthy)   konga-database
8105d9fdbeff   elasticsearch:8.11.3       Up About a minute             elasticsearch
b23d39ef273e   kong:3.7.1                 Up About a minute (healthy)   kong-gateway
83d545085ec0   kibana:8.11.3              Up About a minute             kibana
bd31a989f7b5   ealen/echo-server          Up About a minute             echo-server
63960d29315e   grafana/grafana:latest     Up About a minute             grafana
17c48a410159   openzipkin/zipkin:latest   Up About a minute (healthy)   zipkin

```
Copy the plugin folder ("check_header") to Kong’s container in docker via the below command.

```bash
docker cp /path/to/check_header kong-gateway:/usr/local/share/lua/5.1/kong/plugins
```

Next, copy the `kong.conf` to the Kong container as well.

```bash
docker cp /path/to/kong.conf kong-gateway:/etc/kong/kong.conf 
```

Restart the container:

```bash
docker restart kong-gateway 
```



## Run the Custom Plugin 

Login to the Kong Manager UI > Plugins > Scroll to the bottom.

![](/img/docs/12072024-custom-plugin-check_header.png)

Click the plugin. On the **Request Header** field, specify any header name. This will be the header that the plugin will look for in every API request. Click Save.

![](/img/docs/12072024-custom-plugin-check_header-enable.png)

Back on the terminal, run the command below. It should now fail.

```bash
$ curl --location 'http://localhost:8000/prod'

{"message":"No randomtoken header found in the request"} 
```

Now add the required token. It should now succeed.

```bash
$ curl --location 'http://localhost:8000/prod' \
> -H "randomtoken: justputanytoken"

{"status":"Healthy"} 
```
