---
title: "Install Kong on Containers"
description: "Introduction to Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - Kong API Gateway
sidebar_position: 11
last_update:
  date: 7/7/2022
---

## Kong Installation  

Kong can be installed across various environments to suit your infrastructure needs.

- **Container**  
    - Using Docker or Kubernetes for containerized environments.  

- **Bare Metal**  
    - Deploy directly on physical or virtual machines.  

- **Cloud Providers**  
    - Install from cloud platforms like AWS, Azure, or GCP.  

- **Helm Chart**  
    - Use Helm to deploy Kong in Kubernetes clusters.  

- **Package Manager**  
    - Using package managers like apt (Debian/Ubuntu) or yum (RHEL/CentOS).  


## Install Kong Gateway on Docker

Kong can be installed on Docker with a PostgreSQL database. There is also an option to use Kong without a database.

For more information, please see [Install Kong Gateway on Docker](https://docs.konghq.com/gateway/latest/install/docker/)

## Containerized Kong and Other Applications

Reference: [joseeden/test-kong-gateway](https://github.com/joseeden/test-kong-gateway/tree/master)

This guide shows how to install a containerized Kong along with the other applications locally in your computer. Make sure to install the following first:

- [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) 
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/standalone/)  
- [Docker Desktop (Optional)](https://docs.docker.com/desktop/)

Clone the repository and go inside the folder. Run `docker-compose`.

```bash
git clone https://github.com/joseeden/test-kong-gateway.git
cd test-kong-gateway

## Build
docker-compose up -d --build 
```

The build shuold take a few minutes. Once done, it should return:

```bash
[+] Running 12/12
 ✔ Network test-kong-gateway_kong-net                Created                               2.1s 
 ✔ Container elasticsearch                           Started                               7.4s 
 ✔ Container kibana                                  Started                              10.5s 
 ✔ Container logstash                                Started                              10.4s 
 ✔ Container zipkin                                  Started                               9.1s 
 ✔ Container test-kong-gateway-grafana-1             Started                               9.0s 
 ✔ Container test-kong-gateway-kong-database-1       Started                               8.0s 
 ✔ Container test-kong-gateway-kong-1                Started                               8.2s 
 ✔ Container prometheus                              Started                               9.4s 
 ✔ Container test-kong-gateway-kong-migrations-1     Started                               6.7s 
 ✔ Container test-kong-gateway-kong-migrations-up-1  Started                               6.4s 
 ✔ Container konga_web                               Started                               6.9s 
```

To check the images used:

```bash
$ docker images

REPOSITORY          TAG         IMAGE ID       CREATED         SIZE
postgres            16-alpine   9ff53a21c37a   2 days ago      251MB
prom/prometheus     latest      4f7c13071e39   2 days ago      292MB
grafana/grafana     latest      c048ea6f48b7   4 days ago      485MB
openzipkin/zipkin   latest      3bd3d5c9013e   5 weeks ago     183MB
kong                3.7.1       084144a5b676   4 months ago    299MB
logstash            8.11.3      a97f65931a6d   11 months ago   770MB
elasticsearch       8.11.3      ac1eef415132   11 months ago   1.41GB
kibana              8.11.3      bb428a138a34   11 months ago   1.03GB
hello-world         latest      d2c94e258dcb   18 months ago   13.3kB
pantsel/konga       latest      113950dafdbb   4 years ago     409MB
```

To check the running containers:

```bash
$ docker ps -a

CONTAINER ID   IMAGE                      COMMAND                  CREATED          STATUS                             PORTS                                                                                                                             NAMES
aaf14e1dd5ce   pantsel/konga              "/app/start.sh"          49 seconds ago   Up 43 seconds                      0.0.0.0:1337->1337/tcp, :::1337->1337/tcp                                                                                         konga_web
b5427200f5ba   kong:3.7.1                 "/docker-entrypoint.…"   49 seconds ago   Exited (0) 21 seconds ago                                                                                                                                            test-kong-gateway-kong-migrations-1
f07f291e9a8a   kong:3.7.1                 "/docker-entrypoint.…"   49 seconds ago   Up 18 seconds (health: starting)   8000-8001/tcp, 8443-8444/tcp                                                                                                      test-kong-gateway-kong-migrations-up-1
aa101b1c8ada   kibana:8.11.3              "/bin/tini -- /usr/l…"   53 seconds ago   Up 44 seconds                      0.0.0.0:5601->5601/tcp, :::5601->5601/tcp                                                                                         kibana
d63ee6af0977   logstash:8.11.3            "/usr/local/bin/dock…"   53 seconds ago   Up 44 seconds                      0.0.0.0:5044->5044/tcp, :::5044->5044/tcp, 0.0.0.0:9600->9600/tcp, :::9600->9600/tcp, 0.0.0.0:5555->5555/udp, :::5555->5555/udp   logstash
c6ac131840c8   prom/prometheus:latest     "/bin/prometheus --c…"   53 seconds ago   Up 45 seconds                      0.0.0.0:9090->9090/tcp, :::9090->9090/tcp                                                                                         prometheus
8f2640a6c393   grafana/grafana:latest     "/run.sh"                53 seconds ago   Up 46 seconds                      0.0.0.0:3000->3000/tcp, :::3000->3000/tcp                                                                                         test-kong-gateway-grafana-1
92a11ea62c1d   postgres:16-alpine         "docker-entrypoint.s…"   53 seconds ago   Up 47 seconds (healthy)            5432/tcp                                                                                                                          test-kong-gateway-kong-database-1
a1707db325ef   elasticsearch:8.11.3       "/bin/tini -- /usr/l…"   53 seconds ago   Up 47 seconds                      0.0.0.0:9200->9200/tcp, :::9200->9200/tcp, 0.0.0.0:9300->9300/tcp, :::9300->9300/tcp                                              elasticsearch
```

To filter the columns:

```bash
docker ps -a --format "table {{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Names}}" 
```

It should now return the selected columns:

```bash
CONTAINER ID   IMAGE                      STATUS                             NAMES
aaf14e1dd5ce   pantsel/konga              Up 4 minutes                       konga_web
b5427200f5ba   kong:3.7.1                 Exited (0) 3 minutes ago           test-kong-gateway-kong-migrations-1
f07f291e9a8a   kong:3.7.1                 Up 12 seconds (health: starting)   test-kong-gateway-kong-migrations-up-1
aa101b1c8ada   kibana:8.11.3              Up 4 minutes                       kibana
d63ee6af0977   logstash:8.11.3            Up 4 minutes                       logstash
c6ac131840c8   prom/prometheus:latest     Up 4 minutes                       prometheus
8f2640a6c393   grafana/grafana:latest     Up 4 minutes                       test-kong-gateway-grafana-1
92a11ea62c1d   postgres:16-alpine         Up 4 minutes (healthy)             test-kong-gateway-kong-database-1
a1707db325ef   elasticsearch:8.11.3       Up 4 minutes                       elasticsearch
9b8b2464a76e   kong:3.7.1                 Up 4 minutes (healthy)             test-kong-gateway-kong-1
8a253ce5e570   openzipkin/zipkin:latest   Up 4 minutes (healthy)             zipkin 
```



## Test using an API 


```bash
git clone https://github.com/joseeden/test-kong-gateway.git
cd test-kong-gateway
pip install -r requirements.txt
python main.py
```


## Remove Containers 

To remove the containers:

```bash
$ docker-compose down

[+] Running 12/12
 ✔ Container test-kong-gateway-kong-migrations-up-1  Removed                                                                                                                                                        0.4s 
 ✔ Container prometheus                              Removed                                                                                                                                                        0.3s 
 ✔ Container logstash                                Removed                                                                                                                                                        2.2s 
 ✔ Container test-kong-gateway-grafana-1             Removed                                                                                                                                                        0.4s 
 ✔ Container prometheus                              Removed                                                                                                                                                        0.3s 
 ✔ Container logstash                                Removed                                                                                                                                                        2.2s 
 ✔ Container test-kong-gateway-grafana-1             Removed                                                                                                                                                        0.4s 
 ✔ Container test-kong-gateway-kong-migrations-1     Removed                                                                                                                                                        0.5s 
 ✔ Container test-kong-gateway-grafana-1             Removed                                                                                                                                                        0.4s 
 ✔ Container test-kong-gateway-kong-migrations-1     Removed                                                                                                                                                        0.5s 
 ✔ Container test-kong-gateway-kong-migrations-1     Removed                                                                                                                                                        0.5s 
 ✔ Container zipkin                                  Removed                                                                                                                                                        0.3s 
 ✔ Container elasticsearch                           Removed                                                                                                                                                        1.9s 
 ✔ Container zipkin                                  Removed                                                                                                                                                        0.3s 
 ✔ Container elasticsearch                           Removed                                                                                                                                                        1.9s 
 ✔ Container kibana                                  Removed                                                                                                                                                        1.7s 
 ✔ Container konga_web                               Removed                                                                                                                                                        1.7s 
 ✔ Container test-kong-gateway-kong-database-1       Removed                                                                                                                                                        1.3s 
 ✔ Container test-kong-gateway-kong-1                Removed                                                                                                                                                        2.9s 
 ✔ Network test-kong-gateway_kong-net                Removed 
```

To verify:

```bash
$ docker ps -a

CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```