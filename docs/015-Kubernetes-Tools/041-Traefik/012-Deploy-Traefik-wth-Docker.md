---
title: "Deploy Traefik with Docker"
description: "Deploy Traefik with Docker"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 12
last_update:
  date: 2/5/2023
---

## Overview 

This lab shows how to deploy Traefik using Docker Compose and test its automatic service discovery and routing.

- Deploy Traefik as a Docker container  
- Add a simple service called "Whoami"  
- See how Traefik detects and routes traffic automatically

## Lab Environment

Before starting, ensure you have the following tools installed:

- [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) 
- [Git](https://git-scm.com/downloads) 

If you're using **Windows**, make sure to switch Docker to use **Linux containers** after installation. This is required for compatibility with the labs. See 


#### Use Browser-Based Docker (Optional)

If Docker doesn’t work on your machine, try the web-based option:

- Visit [Play with Docker](https://labs.play-with-docker.com/)
- It lets you run Docker in your browser
- You can still follow the labs, although with some limitations

This option is a good backup when local setup isn’t possible.


## Clone the Repository 

To try out the examples in the succeeding sections, clone the project repository from GitHub. 

- Github repo: [joseeden/labs-traefik](https://github.com/joseeden/labs-traefik/tree/master)

Clone and move into the project directory:

```bash
git clone https://github.com/joseeden/labs-traefik.git 
cd labs-traefik/01-overview
```


## Start with Traefik 

Deploy the Traefik container using a Docker Compose file.

- Use Docker Compose to define and run Traefik  
- Enable the Traefik dashboard  
- Mount Docker socket so Traefik can monitor container events

Here's a sample `docker-compose.yml` snippet:

```yaml
version: '3'

services:
  traefik:
    image: traefik:v2.3
    command:
      - --api.insecure=true       # Enables the Traefik Dashboard
      - --providers.docker=true
      - --log.level=INFO
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"                   # Exposes port 80 for incoming web requests
      - "8080:8080"               # The Web UI port http://0.0.0.0:8080
    volumes:                      
      - /var/run/docker.sock:/var/run/docker.sock     # Allow Traefik to listen on Docker events
````

Run the following to start Traefik and run it in the background:

```bash
docker compose up -d
```

Output:

```bash
[+] Running 5/5
 ✔ traefik Pulled                                                                                                                                                            14.1s 
   ✔ 0a6724ff3fcd Pull complete                                                                                                                                               2.6s 
   ✔ 64d0c2f48fed Pull complete                                                                                                                                               3.6s 
   ✔ 00390834f324 Pull complete                                                                                                                                               8.7s 
   ✔ 059f159f3940 Pull complete                                                                                                                                               8.8s 
[+] Running 2/2
 ✔ Network 01-overview_default      Created                                                                                                                                   0.1s 
 ✔ Container 01-overview-traefik-1  Started 
```

Check that it's running:

```bash
docker compose ps
```

Output:

```bash
NAME                    IMAGE          COMMAND                  SERVICE   CREATED              STATUS              PORTS
01-overview-traefik-1   traefik:v2.3   "/entrypoint.sh --ap…"   traefik   About a minute ago   Up About a minute   0.0.0.0:80->80/tcp, 0.0.0.0:8080->8080/tcp
```

Review the logs:

```bash
docker compose logs traefik
```

You should see logs showing that Traefik started, loaded configuration, and is watching Docker for new containers.

```bash
traefik-1  | time="2022-08-02T21:10:13Z" level=info msg="Configuration loaded from flags."
traefik-1  | time="2022-08-02T21:10:13Z" level=info msg="Traefik version 2.3.7 built on 2021-01-11T18:03:02Z"
traefik-1  | time="2022-08-02T21:10:13Z" level=info msg="\nStats collection is disabled.\nHelp us improve Traefik by turning this feature on :)\nMore details on: https://doc.traefik.io/traefik/contributing/data-collection/\n"
traefik-1  | time="2022-08-02T21:10:13Z" level=info msg="Starting provider aggregator.ProviderAggregator {}"
traefik-1  | time="2022-08-02T21:10:13Z" level=info msg="Starting provider *traefik.Provider {}"
traefik-1  | time="2022-08-02T21:10:13Z" level=info msg="Starting provider *docker.Provider {\"watch\":true,\"endpoint\":\"unix:///var/run/docker.sock\",\"defaultRule\":\"Host(`{{ normalize .Name }}`)\",\"exposedByDefault\":true,\"swarmModeRefreshSeconds\":15000000000}" 
```


## Add the “Whoami” Service

Add a basic test service that prints connection info for confirming Traefik’s routing.

- Add a “Whoami” container
- Apply a label so Traefik knows how to route traffic
- Access it through a browser or terminal

Add this section in your compose file:

```yaml
  whoami:
    image: containous/whoami
    labels:
      - "traefik.http.routers.whoami.rule=Host(`whoami.docker.localhost`)"
```

:::info 

Traefik uses labels to discover and configure routing automatically. This makes it powerful and flexible for containerized apps.

:::

The `docker-compose.yml` should now look like this:

```yaml
version: "3"

services:
  traefik:
    image: traefik:v2.3
    command:
      - --api.insecure=true # Enables the Traefik Dashboard
      - --providers.docker=true
      - --log.level=INFO
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80" # Exposes port 80 for incoming web requests
      - "8080:8080" # The Web UI port http://0.0.0.0:8080
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock # Allow Traefik to listen on Docker events

  whoami:
    image: containous/whoami
    labels:
      - "traefik.http.routers.whoami.rule=Host(`whoami.docker.localhost`)"
```

Then restart the deployment:

```bash
docker compose up -d
```

Check the services again:

```bash
docker compose ps
```

You should now see both services are running:

```bash
NAME                    IMAGE               COMMAND                  SERVICE   CREATED          STATUS          PORTS
01-overview-traefik-1   traefik:v2.3        "/entrypoint.sh --ap…"   traefik   6 minutes ago    Up 6 minutes    0.0.0.0:80->80/tcp, 0.0.0.0:8080->8080/tcp
01-overview-whoami-1    containous/whoami   "/whoami"                whoami    54 seconds ago   Up 54 seconds   80/tcp
```


Now open your browser and go to:

```
http://whoami.docker.localhost
```

You should see a response showing network info from the Whoami container. This means Traefik saw the container, picked up its routing rule, and sent traffic to it correctly.

```bash
Hostname: 91bdfc0231fe  
IP: 127.0.0.1  
IP: 172.20.5.12
RemoteAddr: 172.18.0.1:50314
GET / HTTP/1.1
Host: whoami.docker.localhost
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36
X-Real-Ip: 172.18.0.1
X-Forwarded-For: 172.18.0.1
X-Forwarded-Host: whoami.docker.localhost
X-Forwarded-Port: 80
X-Forwarded-Proto: http
X-Forwarded-Server: 42efc1a512b3
```



## Test with Curl

You can also test it from the terminal:

```bash
curl -H "Host: whoami.docker.localhost" http://127.0.0.1
```

Expected output:

```bash
Hostname: 91bdfc0231fe  
IP: 127.0.0.1  
IP: ::1  
IP: 172.20.5.12
RemoteAddr: 172.18.0.1:50314
GET / HTTP/1.1
Host: whoami.docker.localhost
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36
X-Real-Ip: 172.18.0.1
X-Forwarded-For: 172.18.0.1
X-Forwarded-Host: whoami.docker.localhost
X-Forwarded-Port: 80
X-Forwarded-Proto: http
X-Forwarded-Server: 42efc1a512b3
```

This shows the same response you’d get in a browser, proving that routing works with host-based rules.

**NOTE:** If you are using WSL, you may get a `404 page not found` error when you try to curl the host. This is because in WSL, the `localhost` refers to **WSL itself**, not thr **Windows host** where Traefik is listening.

Test it in Powershell using the same command:

```powershell
curl -H "Host: whoami.docker.localhost" http://127.0.0.1
```

## Scaling and Loadbalancing

Now that Traefik is detecting services and routing requests, the next step is to **scale** the `whoami` service.

- Scale the service by adding more containers
- Uses **round-robin** for loadbalancing by default
- See all traffic visually on the Traefik dashboard

Verify the services first:

```bash
$ docker compose ps

NAME                    IMAGE               COMMAND                  SERVICE   CREATED          STATUS          PORTS
01-overview-traefik-1   traefik:v2.3        "/entrypoint.sh --ap…"   traefik   14 minutes ago   Up 14 minutes   0.0.0.0:80->80/tcp, 0.0.0.0:8080->8080/tcp
01-overview-whoami-1    containous/whoami   "/whoami"                whoami    15 minutes ago   Up 14 minutes   80/tcp
```

Scale `whoami` to 3 containers:

```bash
docker compose scale whoami=3 
```

Output:

```bash
[+] Running 3/3
 ✔ Container 01-overview-whoami-1  Running                                                                                                                                      0.0s 
 ✔ Container 01-overview-whoami-3  Started                                                                                                                                      1.0s 
 ✔ Container 01-overview-whoami-2  Started   
```

You should now see three `whoami` contianers listed:

```bash
$ docker compose ps

NAME                    IMAGE               COMMAND                  SERVICE   CREATED          STATUS          PORTS
01-overview-traefik-1   traefik:v2.3        "/entrypoint.sh --ap…"   traefik   15 minutes ago   Up 15 minutes   0.0.0.0:80->80/tcp, 0.0.0.0:8080->8080/tcp
01-overview-whoami-1    containous/whoami   "/whoami"                whoami    16 minutes ago   Up 16 minutes   80/tcp
01-overview-whoami-2    containous/whoami   "/whoami"                whoami    16 seconds ago   Up 16 seconds   80/tcp
01-overview-whoami-3    containous/whoami   "/whoami"                whoami    16 seconds ago   Up 15 seconds   80/tcp
```

In your terminal (or Powershell), run the curl command:

```powershell
> curl -H "Host: whoami.docker.localhost" http://127.0.0.1

Hostname: a8c2f1b0e5cd  
IP: 127.0.0.1  
IP: ::1  
IP: 172.20.5.11
```

If you run the curl command a few more times, you will see that it is cycling through the three `whoami` instances.

```powershell
> curl -H "Host: whoami.docker.localhost" http://127.0.0.1

Hostname: d3f84c78e9ab  
IP: 127.0.0.1  
IP: ::1  
IP: 172.20.5.13
```

```powershell
> curl -H "Host: whoami.docker.localhost" http://127.0.0.1

Hostname: 91bdfc0231fe  
IP: 127.0.0.1  
IP: ::1  
IP: 172.20.5.12
```


To scale down:

```bash
docker compose scale whoami=1
```

Then verify the services:

```bash
$ docker compose ps

NAME                    IMAGE               COMMAND                  SERVICE   CREATED          STATUS          PORTS
01-overview-traefik-1   traefik:v2.3        "/entrypoint.sh --ap…"   traefik   20 minutes ago   Up 20 minutes   0.0.0.0:80->80/tcp, 0.0.0.0:8080->8080/tcp
01-overview-whoami-1    containous/whoami   "/whoami"                whoami    21 minutes ago   Up 21 minutes   80/tcp
```

Traefik automatically detects when the other two whoami instances are no longer available and routes all incoming requests to the remaining container. You can confirm this by running the curl command multiple times. Each response will now display the same hostname.

```bash
curl -H "Host: whoami.docker.localhost" http://127.0.0.1
```