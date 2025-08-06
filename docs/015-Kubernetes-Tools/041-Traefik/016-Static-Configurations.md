---
title: "Static Configurations"
description: "Static Configurations"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 16
last_update:
  date: 2/5/2023
---


## Overview 

Static configuration sets up how Traefik should start and behave initially.

- Needed to enable features like dashboard and logs
- Used to define entry points (e.g. HTTP, HTTPS)
- Includes provider details (like Docker, file, etc.)

Static config is essential for starting Traefik and enabling core features. Once Traefik is running, changing static config needs a restart.


## Clone the Repository 

To try out the examples in the succeeding sections, clone the project repository from GitHub. 

- Github repo: [joseeden/labs-traefik](https://github.com/joseeden/labs-traefik/tree/master)

Clone and move into the project directory:

```bash
git clone https://github.com/joseeden/labs-traefik.git 
cd labs-traefik/02-configuration
```

Project structure:

```bash
02-configuration
.
├── docker-compose.cli.yml
├── docker-compose.configuration.yml
├── docker-compose.env.yml
├── docker-compose.file.yml
├── traefik-entrypoints.yml
└── traefik.yml 
```


## Setting Static Configuration 

Before running Traefik, you need to set up its **static configuration**. This tells Traefik how to start and what core features to enable. There are three methods:

* Use **file-based config** for easier manual editing
* Use **command-line flags** for direct, quick control
* Use **environment variables** for automation and CI/CD

**Traefik only accepts one static config source at a time.** This means you can only pick one method; mixing methods can sometimes cause issues.

:::info 

For modern workflows, environment variables are often the most flexible and easy to maintain.

:::


### Using a Configuration File

You can define static settings in a YAML or TOML file.

- File should be named `traefik.yaml` or `traefik.toml`
- Traefik checks the `/etc/traefik/` folder by default
- You can override the path if needed

Consider the sample `traefik.yaml` file below: 

```yaml
# traefik.yaml
api:
  dashboard: true

entryPoints:
  web:
    address: ":80"
```

Traefik will look for this file when it starts. If found, it loads the settings from there.


### Using Command Line Arguments

You can also set static config directly in the command line or in a Docker Compose file.

- Use `command:` section in Compose
- All settings must go inside this section
- Clean and easy for small setups

This method is useful for quick testing or small container setups.

```yaml
## Docker compose file
version: "3.3"

services:
  traefik:
    image: traefik:v2.9
    command:
      - "--api.dashboard=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
```


### Using Environment Variables

Static config can also be set through environment variables.

- Use `environment:` in Docker Compose
- Good for automation and scripting
- Variables must start with `TRAEFIK_` and use underscores

Environment variables are helpful when you want to change settings depending on where you deploy.

```yaml
## Docker compose file
version: "3.3"

services:
  traefik:
    image: traefik:v2.9
    environment:
      - "TRAEFIK_API_DASHBOARD=true"
      - "TRAEFIK_ENTRYPOINTS_WEB_ADDRESS=:80"
```

## Docker Provider 

Traefik supports Docker as a provider. You can connect it directly to your Docker environment to auto-discover services and route traffic to them.

- Only one provider should be used at a time
- Docker services are auto-detected 

You configure Traefik to use Docker so that it can watch running containers and automatically route traffic to them.

### Setting Up 

Start simple with just the basic settings to avoid confusion.

- Use only a few settings at first
- Add more only if needed
- Keep config changes small and easy to test

Start with a minimal setup like this so you can test each setting clearly and avoid unnecessary issues.

```yaml
api:
  dashboard: true

providers:
  docker:
    watch: true
    exposedByDefault: false
    swarmMode: true

log:
  level: INFO
```

This configuration enables the dashboard, watches for Docker events, and disables automatic exposure of all containers.


### How Networking Works

When Docker containers start, Traefik automatically connects to those exposing ports.

- Traefik uses the container’s published port (e.g. port 80)
- It routes internal traffic to that port
- If no port exists, use a label to choose the correct one
- If there are multiple ports, use a label as well

You can specify the port like this:

```yaml
labels:
  - "traefik.http.services.myapp.loadbalancer.server.port=8080"
```

This tells Traefik exactly which port to route traffic to. It's helpful for multi-port containers or when no port is exposed.

### Secure Integration

Security is very important when using Docker with Traefik.

- Enable TLS between Traefik and orchestrator (Docker)
- Do not expose the Docker API to the public
- Use best practices for securing Docker

Example: Mounting Docker like this gives Traefik full access:

```yaml
volumes:
  - "/var/run/docker.sock:/var/run/docker.sock"
```

This can be risky. It’s best to follow Docker’s security recommendations and only allow what’s truly needed.

You can also use Docker Bench to scan your system:

```bash
docker run -it --net host --pid host --cap-add audit_control \
  --security-opt apparmor=unconfined \
  --security-opt seccomp=unconfined \
  docker/docker-bench-security
```

This tool checks for common security issues in your Docker setup.


## EntryPoints in Traefik

EntryPoints define which ports Traefik listens on for incoming requests.

- Used to define ports like `80` for HTTP and `443` for HTTPS
- Can redirect traffic from one EntryPoint to another
- Supports TLS and headers for secure communication

EntryPoints control what traffic is allowed into Traefik, and how it should be handled from the start.

![](/img/docs/all-things-devops-traefik-entrypoint.png)

### Defining EntryPoints

You can define EntryPoints in YAML, TOML, or via command line.

- Name each EntryPoint (like `web` or `websecure`)
- Assign a port using `address`
- Add redirect rules if needed

Here’s an example in YAML:

```yaml
entryPoints:
  web:
    address: ":80"

  websecure:
    address: ":443"
```

This setup tells Traefik to listen on port 80 for HTTP and 443 for HTTPS.

### Redirecting HTTP to HTTPS

You can redirect HTTP traffic to HTTPS using a simple setting.

```yaml
entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https

  websecure:
    address: ":443"
```

This setup helps enforce secure connections for all incoming traffic.

### Adding TLS and Headers

You can add TLS settings directly in the EntryPoint.

- Use custom certificates
- Apply forwarded headers

Here’s an example with TLS and forwarded headers:

```yaml
entryPoints:
  websecure:
    address: ":443"
    http:
      tls:
        certResolver: myresolver
      forwardedHeaders:
        insecure: true
```

This allows Traefik to apply security settings to all services using that EntryPoint.

### How It Appears in the Dashboard

Once set, Traefik’s dashboard will show all configured EntryPoints.

- `web` for HTTP (port 80)
- `websecure` for HTTPS (port 443)
- Internal EntryPoints like the dashboard itself may also be listed

<div class="img-center"> 

![](/img/docs/08062025-traefik-dashboard-config-svc.PNG)

</div>


## Labs 

### Lab 1: Using a Configuration File

This method reads settings from a file inside the Traefik container.

Here’s a sample setup using `docker-compose.file.yml`:

```yaml
version: '3'

services:
  traefik:
    image: traefik:v2.3
    ports:
      - "80:80"         # web requests
      - "8080:8080"     # dashboard
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./traefik.yml:/etc/traefik/traefik.yml
```

The `traefik.yml` is the static configuration file for Traefik.

```yaml
# API and dashboard configuration
api:
  # Dashboard
  #
  #
  dashboard: true
  insecure: true
# Docker configuration backend
providers:
  docker: 
    watch: true
    exposedByDefault: false
    swarmMode: true
# Traefik Logging
log:
  level: INFO
```

This sample configuration enables the dashboard (insecure mode), configures Docker as a provider in Swarm mode, and sets the log level to INFO.

Run it:

```bash
docker-compose -f docker-compose.file.yml up -d
```

Output:

```bash
✔ Network 02-configuration_default      Created                                                                                                                                                 0.1s 
✔ Container 02-configuration-traefik-1  Started 
```

Check logs:

```bash
docker-compose -f docker-compose.file.yml logs
```

The logs confirms that Traefik successfully read the static configuration from the traefik.yml file.

```bash
traefik-1  | Configuration loaded from file: /etc/traefik/traefik.yml
```

Stop the service:

```bash
docker-compose -f docker-compose.file.yml stop
```


### Lab 2: Using CLI Arguments

This method defines settings directly in the Docker Compose `command` section.

Consider `docker-compose.cli.yml`:

```yaml
version: '3'

services:
  traefik:
    image: traefik:v2.3
    command:
      - "--api.insecure=true"
      - "--providers.docker"
      - "--log.level=INFO"
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

Run it:

```bash
docker-compose -f docker-compose.cli.yml up -d
```

Now check the logs:

```bash
docker-compose -f docker-compose.cli.yml logs
```

The logs show Traefik was configured successfully using CLI flags instead of a config file.

```bash
traefik-1  | Configuration loaded from flags.
```

Stop the service:

```bash
docker-compose -f docker-compose.cli.yml stop
```


### Lab 3: Using Environment Variables

This method sets Traefik settings using environment variables.

The `docker-compose.env.yml`:

```yaml
version: '3'

services:
  traefik:
    image: traefik:v2.3
    environment:
      - TRAEFIK_API_INSECURE=true
      - TRAEFIK_PROVIDERS_DOCKER=true
      - TRAEFIK_LOG_LEVEL=INFO
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

Run it:

```bash
docker-compose -f docker-compose.env.yml up -d
docker-compose -f docker-compose.env.yml logs
```

The output confirms that the configuration is using the environment variables.

```
traefik-1  | Configuration loaded from environment variables.
```

Stop the service:

```bash
docker-compose -f docker-compose.cli.yml stop
```


### Lab 4: Providers and Entrypoints 

:::info 

**Pre-requisites:** 

You need to setup a Docker Swarm to test this lab. A simple one-node setup is enough.
For more information, please see [Using Docker Swarm.](/docs/001-Personal-Notes/050-Project-Pre-requisites/010-Containers/012-Using-Docker-Swarm.md)

:::

This lab shows how to set up Traefik using Docker Swarm with custom entry points and services like a simple cat GIF generator.

- Uses Docker Swarm as the orchestrator
- Sets up custom entry points (`web` and `websecure`)
- Deploys a test app (cat GIF generator) behind Traefik

We have the following files:

- `docker-compose.configuration.yml`

    ```yaml
    version: '3'

    services:
      traefik:
        image: traefik:v2.3
        ports:
          - "80:80"
          - "443:443"
          - "8080:8080"
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock
          - ./traefik-entrypoints.yml:/etc/traefik/traefik.yml

      catapp:
        image: mikesir87/cats:1.0
        labels:
          - "traefik.enable=true"
          - "traefik.http.routers.catapp.rule=Host(`catapp.localhost`)"
          - "traefik.http.routers.catapp.entrypoints=web"
          - "traefik.http.services.catapp.loadbalancer.server.port=5000"
    ```

- `traefik-entrypoints.yml`

    ```yaml
    api:
      dashboard: true
      insecure: true

    providers:
      docker:
        exposedByDefault: false

    log:
      level: DEBUG

    entryPoints:
      web:
        address: ":80"
      websecure:
        address: ":443"
    ```

These configurations define Traefik’s behavior and how it connects to the app using HTTP on port 80. Use Docker Swarm to deploy the stack.

```bash
docker stack deploy -c docker-compose.configuration.yml traefik
```

Expected output:

```bash
Creating network traefik_default
Creating service traefik_traefik
Creating service traefik_catapp
```

Check the status of the services:

```bash
docker stack ps traefik
```

If everything works, both Traefik and the `catapp` service will be running.

```bash
ID             NAME                IMAGE                NODE             DESIRED STATE   CURRENT STATE            ERROR     PORTS
2wysrf2dlxxy   traefik_catapp.1    mikesir87/cats:1.0   docker-desktop   Running         Running 22 minutes ago
wbnfo6n1kmmi   traefik_traefik.1   traefik:v2.3         docker-desktop   Running         Running 23 minutes ago 
```

Open your browser and go to:

```
http://localhost:8080
```

You should see the Traefik dashboard.

<div class="img-center"> 

![](/img/docs/08062025-traefik-catapp-1.PNG)

</div>


Go to **Routers** and click **Explore**. You should see the `Host(catapp.localhost)` rule.

This new route is using the `web` entry point (port 80) and routes traffic to the `catapp` service.

<div class="img-center"> 

![](/img/docs/08062025-traefik-routers-explore.PNG)

</div>


Click the router for more details:

<div class="img-center"> 

![](/img/docs/08062025-traefik-routers-click-see-more-details.PNG)

</div>


Go to **HTTP Services**, select `catapp@docker`, and confirm it’s using:

- Load balancer
- Port 5000 inside the container

<div class="img-center"> 

![](/img/docs/08062025-traefik-svc-catapp.PNG)

</div>


Finally, to verify that everything correctly, open a web browser and navigate to:

```
http://catapp.localhost/
```

You’ll see the random cat GIF generator:

<div class="img-center"> 

![](/gif/docs/08062025-catapp-svc.gif)

</div>


This confirms the router, entry point, and service are working together correctly through Traefik.


To stop and delete the stack:

```bash
docker stack rm traefik
```


## Cleanup

To remove the resources:

```bash
docker compose -f <CONFIG_FILE_PATH> down
```

To check all stacks in your Swarm:

```bash
docker stack ls
```

To **remove the specific stack**:

```bash
docker stack rm <STACK_NAME>
```

To **remove all stacks** currently deployed in your Swarm:

```bash
docker stack ls --format '{{.Name}}' | xargs -r docker stack rm
```
