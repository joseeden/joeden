---
title: "Routers"
description: "Routers"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 18
last_update:
  date: 2/5/2023
---


## Router Labels 

Routers in Traefik connect incoming requests to backend services. To do that, we define rules using **labels** on containers or services.

- Labels are key-value pairs that guide how Traefik is handled.
- Routers use these labels to match requests to services.
- Includes details like protocol, router type, name, and options.

Here’s the basic structure of a router label:

```bash
traefik.http.routers.<ROUTER_NAME>.rule
```

Where:

- `traefik` - Refers to the Traefik service in Docker.
- `http` - Protocol being used (could be `http`, `tcp`, or `udp`).
- `routers` - Type of config (can also be `services` or `middlewares`).
- `<ROUTER_NAME>` - A name you choose (user-defined).
- `rule` - The option you’re setting on the router (like matching a path or host).

Example Label:

```yaml
labels:
  - "traefik.http.routers.myapp.rule=Host(`example.com`)"
```

This means:

> "Create an HTTP router named `myapp`, and match requests where the host is `example.com`."

## Router Rules 

Routers are how Traefik decides where to send incoming traffic. To control this, we use **router rules** and define them with **labels** on your services or containers.

- Rules tell Traefik what to match 
- Labels help configure routers automatically 
- Routers direct requests to services 

Each request comes through an **entry point** (like port 80 or 443), and routers decide how to handle it based on labels you define. These labels can match hostnames, paths, or other request details.

Here’s a basic router rule label:

```yaml
labels:
  - "traefik.http.routers.myrouter.rule=Host(`myapp.localhost`)"
```

This label means:

- Protocol: `http`
- Router name: `myrouter`
- Rule: Only match requests with host `myapp.localhost`

The **backticks** ("` `") are required because Traefik is written in Go, and Go uses backticks to safely wrap string values like URLs or domains.


## Default Router Behavior

When you attach a container to Traefik without defining any labels:

- A router and service are created automatically
- The router uses a default rule
- All entry points (like :80, :443) are assigned by default

This might not be ideal. Traefik may expose services unintentionally. 

That’s why it’s **best to define your own rules**, especially for security and clarity.


## Limiting Entry Points

By default, routers accept all entry points unless you specify otherwise. 

![](/img/docs/all-things-devops-traefik-entrypoint.png)


You can control which ports are used by setting the `entrypoints` option:

```yaml
labels:
  - "traefik.http.routers.myrouter.entrypoints=web"
```

This ensures the router listens **only on the `web` entry point**, which is usually port 80.


## Router Configurations

You can fine-tune router behavior further using these labels:

- **Router Rule** 

  Rules tells Traefik what to match:

  ```yaml
  - "traefik.http.routers.myrouter.rule=Host(`abc.com`)"
  ```

- **Entrypoints**

  Controls which port the router listens to:

  ```yaml
  - "traefik.http.routers.myrouter.entrypoints=ep1,ep2"
  ```


- **Define Service**

  If needed, specify the backend service name:

  ```yaml
  - "traefik.http.routers.myrouter.service=myservice"
  ```

- **Enable TLS**

  Control HTTPS usage:

  ```yaml
  - "traefik.http.routers.myrouter.tls=true"
  ```

  When TLS is enabled, the router will **only accept secure connections**.


## Clone the Repository 

To try out the examples, clone the project repository from GitHub. 

- Github repo: [joseeden/labs-traefik](https://github.com/joseeden/labs-traefik/tree/master)

Clone and move into the project directory:

```bash
git clone https://github.com/joseeden/labs-traefik.git 
cd labs-traefik/03-routers-and-services
```

Project structure:

```bash
03-routers-and-services
.
├── docker-compose.yml
└── traefik.yml 
```


## Lab: Cat App Router

Inside the lab directory, we have the `docker-compose.yml` file. It contains sample router setup for an app that runs on port 5000:

```yaml
version: "3"

services:
  traefik:
    image: traefik:v2.3
    ports:
      - "80:80" # web requests
      - "8080:8080" # Traefik dashboard
      - "443:443" # HTTPS requests
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./traefik.yml:/etc/traefik/traefik.yml

  catapp:
    image: mikesir87/cats:1.0
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.catapp.rule=Host(`catapp.localhost`)"
      - "traefik.http.routers.catapp.entrypoints=web"
      - "traefik.http.routers.catapp.service=catapp"
      - "traefik.http.services.catapp.loadbalancer.server.port=5000"
```

This configuration tells Traefik:

- Only handle requests for `catapp.localhost`
- Use the `web` entry point (port 80)
- Forward traffic to the `app` service
- Use port 5000 inside the container

Apply the files:

```bash
docker stack deploy -c docker-compose.yml traefik  
```

Output:

```bash
Creating network traefik_default
Creating service traefik_traefik
Creating service traefik_catapp
```

After deploying, you can access the app at:

```bash
http://catapp.localhost
```

<div class="img-center"> 

![](/gif/docs/08072025-catapp-svc.gif)

</div>


You can also check your setup in the Traefik dashboard. 

```bash
http://localhost:8080
```

It will show:

- The router name (`catapp`)
- The matched host rule
- The assigned service and entry point

This helps confirm everything is working as expected.

<div class="img-center"> 

![](/img/docs/080372025-traefik-dashboard-2.PNG)

</div>



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


## Resources

Traefik’s documentation has two key places to check:

- Routers (General)
  For basic routing examples and behavior:
  [https://doc.traefik.io/traefik/routing/routers/](https://doc.traefik.io/traefik/routing/routers/)

- Routers for Docker Provider
  For Docker-specific label usage:
  [https://doc.traefik.io/traefik/providers/docker/#router-configuration](https://doc.traefik.io/traefik/providers/docker/#router-configuration)
