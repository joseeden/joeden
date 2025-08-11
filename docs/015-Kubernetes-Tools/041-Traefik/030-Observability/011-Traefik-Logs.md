---
title: "Traefik Logs"
description: "Traefik Logs"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
- Observability
sidebar_position: 11
last_update:
  date: 2/5/2023
---

## Overview

Traffic logging tracks network traffic, not the services themselves. Logs can show the following:

- Traffic info
- Startup
- Events
- Certificates
- Shutdowns 
- Service connections

## Log Storage 

You can also set where logs are saved to keep them after restarts.

- Using the `filePath` configuration 
- Logs should persist even after container dies

## Log Format 

Log format decides how your logs are written and read.

- Log format can be common (default) or JSON.
- Choose based on how you want to use or read the logs.
- Different formats help with easier log processing or viewing.

## Log Level 

Log level controls how much detail is recorded in logs.

- `Panic`
- `Fatal`
- `Error` (default)
- `Warn`
- `Info`
- `Debug`

Use debug level only for troubleshooting because it creates large logs. Remember to turn it off when done. 

## Lab: Configure Logging

This lab shows how to enable traffic logs and change log levels.

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
    ├── docker-compose.log.yml
    └── traefik.yml
```


### Create the Usersfile 

:::info 

This step is not required for the entire lab, but it helps ensure secure testing. Basic authentication is enabled, yet storing passwords in plain text within the Docker compose file is unsafe since the file is pushed to Git.

To address this, all labs in the **Observability** directory use a `users_file` to store user credentials securely.

:::

To create hashed passwords, install the tool `htpasswd`:

```bash
sudo apt install -y apache2-utils
```


Generate a hash with this command:

```bash
htpasswd -nb your-username 'add-password-here' | sed 's/\$/\$\$/g'
```

For example:

```bash
htpasswd -nb michaelscarn 'thatswhatshesaid' | sed 's/\$/\$\$/g'
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

The `traefik.yml` file sets up Traefik with debug logging enabled. 

```yaml
api:
  dashboard: true
  insecure: true

providers:
  docker:
    exposedByDefault: false

log:                  # DEBUG, PANIC, FATAL, ERROR, WARN, and INFO
  # level: INFO     
  level: DEBUG

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
      - ./traefik.yml:/etc/traefik/traefik.yml
      - ./users_file:/users_file:ro # <-- mount your users file here

  catapp:
    image: mikesir87/cats:1.0
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.catapp.rule=Host(`catapp.localhost`)"
      - "traefik.http.routers.catapp.service=catapp"
      - "traefik.http.routers.catapp.entrypoints=web"
      - "traefik.http.routers.catapp.middlewares=test-auth,test-compress,test-errorpages"
      # Services
      - "traefik.http.services.catapp.loadbalancer.server.port=5000"
      # Middleware BasicAuth using users_file
      - "traefik.http.middlewares.test-auth.basicauth.usersfile=/users_file"
      # Compress Middleware
      - "traefik.http.middlewares.test-compress.compress=true"
      - "traefik.http.middlewares.test-errorpages.errors.status=400-599"
      - "traefik.http.middlewares.test-errorpages.errors.service=error"
      - "traefik.http.middlewares.test-errorpages.errors.query=/{status}.html"
      # Rate Limit Middleware
      - "traefik.http.middlewares.test-ratelimit.ratelimit.average=2"

  error:
    image: guillaumebriday/traefik-custom-error-pages
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.error.rule=Host(`error.localhost`)"
      - "traefik.http.routers.error.service=error"
      - "traefik.http.services.error.loadbalancer.server.port=80"
      - "traefik.http.routers.error.entrypoints=web"
```

### Deploy and Test 

Deploy with this command:

```bash
docker stack deploy -c docker-compose.log.yml traffic
```

Expected output:

```bash
Creating network traefik_default
Creating service traefik_traefik
Creating service traefik_catapp
Creating service traefik_error
```

Check the running service:

```bash
docker service ls  
```

Expected output:

```bash
ID             NAME              MODE         REPLICAS   IMAGE                                               PORTS
rud7wu53wfsz   traefik_catapp    replicated   1/1        mikesir87/cats:1.0
hmgu7p6f7jye   traefik_error     replicated   1/1        guillaumebriday/traefik-custom-error-pages:latest
lsz3z7dpekjc   traefik_traefik   replicated   1/1        traefik:v2.3                                        *:80->80/tcp, *:443->443/tcp, *:8080->8080/tcp
```

Once running, view logs with:

```bash
docker service logs traefik_traefik 
```


Debug logs give a lot of detail about traffic setup, connections, and middlewares. This helps with troubleshooting but can quickly use up disk space if left on too long.

```bash
level=debug msg="Creating middleware" middlewareName=traefik-internal-recovery entryPointName=traefik middlewareType=Recovery
level=debug msg="Creating middleware" entryPointName=web routerName=error@docker serviceName=error middlewareName=pipelining middlewareType=Pipelining
level=debug msg="Creating load-balancer" entryPointName=web routerName=error@docker serviceName=error
level=debug msg="Creating server 0 http://10.0.1.8:80" entryPointName=web routerName=error@docker serviceName=error serverName=0
level=debug msg="Added outgoing tracing middleware error" routerName=error@docker entryPointName=web middlewareName=tracing middlewareType=TracingForwarder
level=debug msg="Creating middleware" middlewareName=pipelining middlewareType=Pipelining routerName=catapp@docker entryPointName=web serviceName=catapp
level=debug msg="Creating load-balancer" entryPointName=web serviceName=catapp routerName=catapp@docker
level=debug msg="Creating server 0 http://10.0.1.6:5000" routerName=catapp@docker entryPointName=web serviceName=catapp serverName=0
level=debug msg="Added outgoing tracing middleware catapp" middlewareType=TracingForwarder middlewareName=tracing 
entryPointName=web routerName=catapp@docker
level=debug msg="Creating middleware" entryPointName=web routerName=catapp@docker middlewareName=test-errorpages@docker middlewareType=customError
level=debug msg="Creating middleware" routerName=catapp@docker serviceName=error middlewareName=pipelining middlewareType=Pipelining entryPointName=web
level=debug msg="Creating load-balancer" entryPointName=web routerName=catapp@docker serviceName=error
level=debug msg="Creating server 0 http://10.0.1.8:80" routerName=catapp@docker serviceName=error serverName=0 entryPointName=web
level=debug msg="Adding tracing to middleware" entryPointName=web routerName=catapp@docker middlewareName=test-errorpages@docker
level=debug msg="Creating middleware" routerName=catapp@docker middlewareName=test-compress@docker middlewareType=Compress entryPointName=web
level=debug msg="Adding tracing to middleware" entryPointName=web routerName=catapp@docker middlewareName=test-compress@docker
level=debug msg="Creating middleware" entryPointName=web routerName=catapp@docker middlewareName=test-auth@docker 
middlewareType=BasicAuth
traefik_traefik.1.2qo77nb9y4mr@docker-desktop    | time="2022-08-11T01:22:26Z" level=error msg="read /users_file: is a directory" entryPointName=web routerName=catapp@docker
level=debug msg="Creating middleware" entryPointName=web middlewareName=traefik-internal-recovery middlewareType=Recovery
level=debug msg="No default certificate, generating one"
```

After checking logs, edit the `traefik.yml` again to change the log level to `info`:

```yaml
log:                  
  level: INFO     
```

Stop the stack:

```bash
docker stack rm traffic
```

Make sure the `rm` command returns the output below. 
You might need to wait a few minutes or try running it a few times.

```bash
Nothing found in stack: traefik 
```

Then re-deploy:

```bash
docker stack deploy -c docker-compose-log.yaml traffic
```

:::info 

We need to delete the stack and redeploy because the logging settings are applied only at startup.

:::


Check logs again to see less output but still useful info.

```bash
docker service logs traefik_traefik 
```

Output:

```bash
level=info msg="Configuration loaded from file: /etc/traefik/traefik.yml"
level=info msg="Traefik version 2.3.7 built on 2021-01-11T18:03:02Z"
level=info msg="\nStats collection is disabled.\nHelp us improve Traefik by turning this feature on :)\nMore details on: https://doc.traefik.io/traefik/contributing/data-collection/\n"
level=info msg="Starting provider aggregator.ProviderAggregator {}"
level=info msg="Starting provider *docker.Provider {\"watch\":true,\"endpoint\":\"unix:///var/run/docker.sock\",\"defaultRule\":\"Host(`{{ normalize .Name }}`)\",\"swarmModeRefreshSeconds\":15000000000}"
level=info msg="Starting provider *traefik.Provider {}"
```


To test if the application works, access the `catapp` application on your browser.

```bash
http://catapp.localhost/
```

<div class="img-center"> 

![](/gif/docs/08102025-logs-access-1.gif)

</div>


### Cleanup

Delete the deployed stack:

```bash
docker stack rm traefik 
```

You can also delete the `users_file`:

```bash
rm -f users_file
```

