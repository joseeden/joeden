---
title: "Compress"
description: "Compress"
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

Compression is a common way to speed up websites by reducing the size of content before sending it to users.

- Connects middleware to the router
- Compresses responses before sending
- Makes pages load faster and improves performance

Compressing content helps sites load quickly, which users and search engines like.

## How Compression Works

When a request hits the router, the compression middleware compresses the response data.

- Router receives the request
- Middleware compresses the response
- Compressed data is sent back to the user

This process saves bandwidth and speeds up loading times.

<div class="img-center"> 

![](/img/docs/all-things-devops-traefik-compress.png)

</div>



## Enabling Compression

Turning on compression in Traefik is simple with one label.

- Name your middleware (e.g., `test-compress`)
- Use Traefik’s built-in `compress` middleware
- Set the compress option to `true`

Example:

```yaml
labels:
  - "traefik.http.middlewares.test-compress.compress=true"
  - "traefik.http.routers.myapp.middlewares=test-compress"
```

Here, `test-compress` is the user-defined middleware name linked to the router.


## Lab: Enable Gzip Compression

This lab shows how to turn on gzip compression to make your app’s content smaller and faster to load.

- Use a special compression config file
- Add compression middleware with one simple label

### Clone the Repository 

To try out the lab, clone the project repository from GitHub. 

- Github repo: [joseeden/labs-traefik](https://github.com/joseeden/labs-traefik/tree/master)

Clone and move into the project directory:

```bash
git clone https://github.com/joseeden/labs-traefik.git 
cd labs-traefik/05-middleware/02-compress
```

Project structure:

```bash
05-middleware
├── 02-compress
│   ├── .gitignore
│   ├── docker-compose.compress.yml
│   ├── traefik.yml
│   └── usersfile
```


### Creating Passwords

For this lab, we'll use basic authentication, so we need a safe way to store user passwords. Passwords must be hashed before adding them to the users file.

To create hashed passwords, install the tool `htpasswd`:

```bash
sudo apt install -y apache2-utils
```

Here are example user credentials. You can change them if you want:

| Username  | Password              |
| --------- | --------------------- |
| johnsmith | `Thr3@tl3u3lw!dN!QHt` |
| janedoe   | `@Ll!$szM3lLiND@h0oD` |

Generate a hash with this command:

```bash
htpasswd -nb johnsmith 'Thr3@tl3u3lw!dN!QHt''
```

You should see output like:

```
johnsmith:$apr1$cipim6NJ$LK11Xtf0t92UvxjKCV8ii0
```

Do the same for each user.

Next, create a file named `usersfile` in the same folder as your Docker compose file. Put all hashed credentials here, one user per line:

```bash
johnsmith:$apr1$cipim6NJ$LK11Xtf0t92UvxjKCV8ii0
janedoe:$apr1$t65c7tuF$Qscp40RYl.Tq02pUnSv5r1
```

Add `usersfile` to your `.gitignore` file to keep it out of version control:

```bash title=".gitignore"
usersfile
```

This `usersfile` will be used in the Docker compose setup next.



### Prepare the Files 

The compression setup is straightforward in the `docker-compose.compress.yml` file.

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
      - ./usersfile:/usersfile:ro # <-- mount your users file here

  catapp:
    image: mikesir87/cats:1.0
    labels:
      - "traefik.enable=true"
      # Routers
      - "traefik.http.routers.catapp.rule=Host(`catapp.localhost`)"
      - "traefik.http.routers.catapp.service=catapp"
      - "traefik.http.routers.catapp.entrypoints=web"
      - "traefik.http.routers.catapp.middlewares=test-auth,test-compress"
      # Services
      - "traefik.http.services.catapp.loadbalancer.server.port=5000"
      # Middleware BasicAuth using usersfile
      - "traefik.http.middlewares.test-auth.basicauth.usersfile=/usersfile"
      # Compress Middleware
      - "traefik.http.middlewares.test-compress.compress=true"
```

This enables compression alongside other middlewares like basic auth. 

:::info 

This lab uses the same `usersfile` and `traefik.yml` as the ones in the [Basic Auth lab.](/docs/043-Kubernetes-Tools/041-Traefik/026-Middleware/011-Basic-Auth.md)

:::



### Deploying the Compression

If you did the previous labs, make sure to delete them first:

```bash
docker stack rm traefik
```

Deploy the Docker compose file for this lab.

```bash
docker stack deploy -c docker-compose.compress.yml traefik
```


### Testing 

Access the dashboard and go to **Routers** > Click `catapp@docker`.

```bash
http://localhost:8080/dashboard/#/ 
```

You should see the two middlewares ("compress" and "basicauth") attached to this router

<div class="img-center"> 

![](/img/docs/08102025-mw-compress.PNG)

</div>


**What to expect:** Once enabled, gzip compresses the response before it reaches the user. This saves bandwidth and should make pages load faster, especially if the content includes large images or files.

To test, access the `catapp` application on your browser and referesh it a couple of times. In theory, it should load much faster.

<div class="img-center"> 

![](/gif/docs/08102025-catapp-mw-4.gif)

</div>

### Cleanup

Delete the deployed stack:

```bash
docker stack rm traefik 
```

You can also delete the `usersfile`:

```bash
rm -f usersfile
```

