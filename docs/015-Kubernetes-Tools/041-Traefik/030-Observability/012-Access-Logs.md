---
title: "Access Logs"
description: "Access Logs"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
- Observability
sidebar_position: 12
last_update:
  date: 2/5/2023
---


## Overview

Access logs record details about who uses your service and what happens during their requests.

- They show if requests succeed or fail.
- These logs help track user activity and build web analytics.

They capture informatioon such as:

- Visitor’s IP address
- Requested path
- Response status (like 200 or 404)


## Configuring Access Logs

You can set access logs similarly to Traefik logs by adjusting:

- File path and log format.
- Buffer size to control performance.
- Filters to log only certain status codes, retries, or slow requests.

For example, filter out all 200 status logs and only show errors like 404 or 500 to quickly find problems.

## Managing Access Logs

Good log management keeps your logs clean and useful.

- Limit or include **specific header** fields to reduce clutter.
- Use **log rotation** to prevent large log files from filling storage.
- Adjust **time zone settings** from default UTC to your preferred zone.


## Lab: Enabling Access Logs

This lab shows how to enable access logs in Traefik.

### Clone the Repository 

> Github repo: [joseeden/labs-traefik](https://github.com/joseeden/labs-traefik/tree/master)

Login to the public cloud VM and clone the project repository from GitHub. 

```bash
git clone https://github.com/joseeden/labs-traefik.git
cd labs-traefik/05-middleware/06-observability/01-traefik-logs
```

Project structure:

```bash
06-observability
└── 01-traefik-logs
    ├── docker-compose.access-log.yml
    ├── traefik.access-log.yml
```


### Create the Usersfile 

:::info 

The `usersfile` will be used for testing access logs when basic authentication is active.

:::

To create hashed passwords, install the tool `htpasswd`:

```bash
sudo apt install -y apache2-utils
```


Generate a hash with this command:

```bash
htpasswd -nb your-username 'add-password-here'
```

For example:

```bash
htpasswd -nb michaelscarn 'thatswhatshesaid'
```

Expected output:

```
michaelscarn:$$apr1$$FAa3Qsw4$$uQ8qtFNTfLLmG6ohrK.qS.
```

Next, create the `users_file` in the same folder as the Docker compose file. Put all hashed credentials here, one user per line:

```bash
echo "michaelscarn:$$apr1$$FAa3Qsw4$$uQ8qtFNTfLLmG6ohrK.qS." >> users_file
```

Add `users_file` to your `.gitignore` file to keep it out of Git:

```bash 
echo "users_file" >> .gitignore
```

Your directory should now contain all these files:

```bash
06-observability
└── 01-traefik-logs
    ├── .gitignore
    ├── docker-compose.log.yml
    ├── traefik.yml
    └── users_file
```

### Review the Files 

:::info 

We'll start with testing access logs without authentication first.

:::

The `traefik.yml` file sets up Traefik with access logging enabled. 

```yaml
api:
  dashboard: true
  insecure: true

providers:
  docker:
    exposedByDefault: false

# enable Access logs
accessLog: {}

log:                  # DEBUG, PANIC, FATAL, ERROR, WARN, and INFO
  level: INFO     

entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"
```


To view logs, we will also deploy a `catapp` service using the `docker-compose.log` file..

```yaml
version: "3"

services:
  traefik:
    image: traefik:v2.3
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./traefik.access-log.yml:/etc/traefik/traefik.yml

  catapp:
    image: mikesir87/cats:1.0
    labels:
      - "traefik.enable=true"
      # Routers
      - "traefik.http.routers.catapp.rule=Host(`catapp.localhost`)"
      - "traefik.http.routers.catapp.service=catapp"
      - "traefik.http.routers.catapp.entrypoints=web"
      - "traefik.http.routers.catapp.middlewares=test-compress,test-errorpages"
      # Services
      - "traefik.http.services.catapp.loadbalancer.server.port=5000"
      # Compress Middleware
      - "traefik.http.middlewares.test-compress.compress=true"
      # Error Pages Middleware
      - "traefik.http.middlewares.test-errorpages.errors.status=400-599"
      - "traefik.http.middlewares.test-errorpages.errors.service=error"
      - "traefik.http.middlewares.test-errorpages.errors.query=/{status}.html"

  # Error Page service
  error:
    image: guillaumebriday/traefik-custom-error-pages
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.error.rule=Host(`error.localhost`)"
      - "traefik.http.routers.error.service=error"
      - "traefik.http.services.error.loadbalancer.server.port=80"
      - "traefik.http.routers.error.entrypoints=web"
```


### Deploy the Stack 

Deploy the stack using:

```bash
docker stack deploy -c docker-compose.access-log.yml traefik
```

Expected output:

```bash
Creating network traefik_default
Creating service traefik_traefik
Creating service traefik_catapp
Creating service traefik_error
```

### Testing the App 

Access the `catapp` application on your browser and refresh a few times.

```bash
http://catapp.localhost/
```

<div class="img-center"> 

![](/gif/docs/08102025-logs-access-1.gif)

</div>


View logs with:

```bash
docker service logs traefik_traefik
```

The logs will show request details including IP, HTTP method, response code, destination, and response time.

```bash
| 10.0.0.2 - - [11/Aug/2022:02:06:44 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 1 "catapp@docker" "http://10.0.1.6:5000" 14ms
| 10.0.0.2 - - [11/Aug/2022:02:06:44 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 2 "catapp@docker" "http://10.0.1.6:5000" 2ms
| 10.0.0.2 - - [11/Aug/2022:02:06:46 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 3 "catapp@docker" "http://10.0.1.6:5000" 2ms
| 10.0.0.2 - - [11/Aug/2022:02:06:46 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 4 "catapp@docker" "http://10.0.1.6:5000" 2ms
| 10.0.0.2 - - [11/Aug/2022:02:06:47 +0000] "GET / HTTP/1.1" 200 664 "-" "-" 5 "catapp@docker" "http://10.0.1.6:5000" 2ms
```

### Invalid URLs

Try causing a 404 error by requesting a missing page.

```bash
http://catapp.localhost/parkour
http://catapp.localhost/nowhere
```

<div class="img-center"> 

![](/gif/docs/08102025-logs-access.gif)

</div>


Back in the terminal, check logs to see the 404 error recorded.

```bash
docker service logs traefik_traefik
```

Output:

```bash
| 10.0.0.2 - - [11/Aug/2022:02:10:18 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 9 "catapp@docker" "http://10.0.1.6:5000" 2ms
| 10.0.0.2 - - [11/Aug/2022:02:10:18 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 10 "catapp@docker" "http://10.0.1.6:5000" 1ms
| 10.0.0.2 - - [11/Aug/2022:02:10:19 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 11 "catapp@docker" "http://10.0.1.6:5000" 2ms
| 10.0.0.2 - - [11/Aug/2022:02:10:27 +0000] "GET /parkour HTTP/1.1" 404 5093 "-" "-" 12 "catapp@docker" "http://10.0.1.8:80" 5ms
| 10.0.0.2 - - [11/Aug/2022:02:10:36 +0000] "GET /nowhere HTTP/1.1" 404 5093 "-" "-" 13 "catapp@docker" "http://10.0.1.8:80" 3ms
| 10.0.0.2 - - [11/Aug/2022:02:10:41 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 14 "catapp@docker" "http://10.0.1.6:5000" 2ms
| 10.0.0.2 - - [11/Aug/2022:02:10:52 +0000] "GET /michaelscarn HTTP/1.1" 404 5093 "-" "-" 15 "catapp@docker" "http://10.0.1.8:80" 5ms
| 10.0.0.2 - - [11/Aug/2022:02:10:56 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 16 "catapp@docker" "http://10.0.1.6:5000" 3ms 
```

### Authentication Enabled

Now we’ll test how access logs work when authentication is turned on.

- Uses the users_file for credentials
- Requires entering valid username and password
- Logs also capture failed authentication attempts

Here’s the configuration file:

```yaml title="docker-compose.auth-log.yml"
version: "3"

services:
  traefik:
    image: traefik:v2.3
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./traefik.access-log.yml:/etc/traefik/traefik.yml
      - ./users_file:/users_file:ro # <-- mount your users file here

  catapp:
    image: mikesir87/cats:1.0
    labels:
      - "traefik.enable=true"
      # Routers
      - "traefik.http.routers.catapp.rule=Host(`catapp.localhost`)"
      - "traefik.http.routers.catapp.service=catapp"
      - "traefik.http.routers.catapp.entrypoints=web"
      # - "traefik.http.routers.catapp.middlewares=test-compress,test-errorpages"
      - "traefik.http.routers.catapp.middlewares=test-auth,test-compress,test-errorpages"
      # Services
      - "traefik.http.services.catapp.loadbalancer.server.port=5000"
      # Middleware BasicAuth using users_file
      - "traefik.http.middlewares.test-auth.basicauth.usersfile=/users_file"
      # Compress Middleware
      - "traefik.http.middlewares.test-compress.compress=true"
      # Error Pages Middleware
      - "traefik.http.middlewares.test-errorpages.errors.status=400-599"
      - "traefik.http.middlewares.test-errorpages.errors.service=error"
      - "traefik.http.middlewares.test-errorpages.errors.query=/{status}.html"

  # Error Page service
  error:
    image: guillaumebriday/traefik-custom-error-pages
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.error.rule=Host(`error.localhost`)"
      - "traefik.http.routers.error.service=error"
      - "traefik.http.services.error.loadbalancer.server.port=80"
      - "traefik.http.routers.error.entrypoints=web"
```

Before starting, ensure the following files are present:

```bash
├── docker-compose.access-log.yml     # not needed for this step
├── docker-compose.auth-log.yml
├── traefik.access-log.yml
└── users_file
```

Stop any previous stack:

```bash
docker stack rm traefik
```

Make sure the `rm` command returns the output below. 
You might need to wait a few minutes or try running it a few times.

```bash
Nothing found in stack: traefik 
```

Then deploy the new stack:

```bash
docker stack deploy -c  docker stack deploy -c docker-compose.auth-log.yml traefik
```

Open the browser once again. Enter the credentials when prompted. You can also try entering an invalid user.

<div class="img-center"> 

![](/gif/docs/08102025-logs-access-2.gif)

</div>


In your terminal, check the logs:

```bash
docker service logs traefik_traefik
```

You should see output showing both failed and successful login attempts:

```bash
| 10.0.0.2 - - [11/Aug/2022:03:17:29 +0000] "GET / HTTP/1.1" 401 17 "-" "-" 1 "catapp@docker" "-" 0ms
| 10.0.0.2 - - [11/Aug/2022:03:17:29 +0000] "GET / HTTP/1.1" 401 17 "-" "-" 2 "catapp@docker" "-" 0ms
| 10.0.0.2 - hackerman [11/Aug/2022:03:17:37 +0000] "GET / HTTP/1.1" 401 17 "-" "-" 3 "catapp@docker" "-" 0ms
| 10.0.0.2 - toby [11/Aug/2022:03:17:42 +0000] "GET / HTTP/1.1" 401 17 "-" "-" 4 "catapp@docker" "-" 0ms
| 10.0.0.2 - micahelscarn [11/Aug/2022:03:18:06 +0000] "GET / HTTP/1.1" 401 17 "-" "-" 5 "catapp@docker" "-" 0ms
| 10.0.0.2 - michaelscarn [11/Aug/2022:03:18:12 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 6 "catapp@docker" "http://10.0.1.3:5000" 10ms
| 10.0.0.2 - michaelscarn [11/Aug/2022:03:18:12 +0000] "GET /favicon.ico HTTP/1.1" 404 5093 "-" "-" 7 "catapp@docker" "http://10.0.1.6:80" 7ms       
| 10.0.0.2 - michaelscarn [11/Aug/2022:03:18:17 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 8 "catapp@docker" "http://10.0.1.3:5000" 2ms
| 10.0.0.2 - michaelscarn [11/Aug/2022:03:18:18 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 9 "catapp@docker" "http://10.0.1.3:5000" 2ms
| 10.0.0.2 - michaelscarn [11/Aug/2022:03:18:18 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 10 "catapp@docker" "http://10.0.1.3:5000" 2ms 
```

### Filtering Access Logs

You can also filter logs to only show certain status codes, like 404 errors.

In the `traefik.filter-log.yml` below, we are filtering...

```yaml title="traefik.filter-log.yml"
api:
  dashboard: true
  insecure: true

providers:
  docker:
    exposedByDefault: false


# Configuring Multiple Filters
accessLog:
  filters:    
    statusCodes:
      - "404"
    retryAttempts: true
    minDuration: "10ms"

log:                 
  level: INFO     

entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"
```


Delete the previous stack:

```bash
docker stack rm traefik
```

Re-run the `rm` command until it returns;

```bash
Nothing found in stack: traefik
```

Then deploy the stack using `docker-compose.filter-log.yml`:

```bash
docker stack deploy -c docker-compose.filter-log.yml traefik
```

:::info 

The `docker-compose.filter-log.yml` is similar with the previous DOcker compose file but it is configured to use the `traefik.filter-log.yml`

:::

Open the browser again and try these steps:

- Enter an invalid credentials
- Enter a valid credentials
- Refresh the page a few times
- Add `/photos` to the URL to trigger a 404

These steps create a mix of failed logins, successful logins, and missing page errors:

<div class="img-center"> 

![](/gif/docs/08102025-logs-access-3.gif)

</div>

Checking the logs:

```bash
docker service logs traefik_traefik
```

Now the output only shows entries that match the configured filters (`404` status, retry attempts, and requests taking at least `10ms`):

```bash
| 10.0.0.2 - michaelscarn [11/Aug/2022:03:34:58 +0000] "GET / HTTP/1.1" 200 659 "-" "-" 3 "catapp@docker" "http://10.0.1.6:5000" 10ms   
| 10.0.0.2 - michaelscarn [11/Aug/2022:03:34:58 +0000] "GET /favicon.ico HTTP/1.1" 404 5093 "-" "-" 4 "catapp@docker" "http://10.0.1.8:80" 4ms
| 10.0.0.2 - michaelscarn [11/Aug/2022:03:35:14 +0000] "GET /photos HTTP/1.1" 404 5093 "-" "-" 9 "catapp@docker" "http://10.0.1.8:80" 5ms 
```


### Cleanup

Delete the deployed stack:

```bash
docker stack rm traefik 
```

You can also delete the `users_file`:

```bash
rm -f users_file
```
