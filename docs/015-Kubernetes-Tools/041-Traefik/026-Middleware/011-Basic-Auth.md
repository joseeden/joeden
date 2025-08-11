---
title: "Basic Auth"
description: "Basic Auth"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 11
last_update:
  date: 2/5/2023
---


## Overview

Basic authentication middleware protects services by requiring a username and password before granting access.

- Connects to the router
- Checks username and password
- Allows or blocks requests based on credentials

This ensures that only authorized users can access the service.

## How It Works

When a request reaches the router, the basic authentication middleware intercepts it.

- If the credentials match, the request continues to the service
- If they are incorrect, the middleware responds with a 401 Unauthorized

This adds a security layer for services without built-in authentication.

<div class="img-center"> 

![](/img/docs/all-things-devops-traefik-basic-auth.png)

</div>


## Configuring Basic Authentication

Basic authentication in Traefik is set up using labels.

- Define middleware name
- Use `basicAuth` with hashed passwords
- Attach middleware to a router

Example:

```yaml
labels:
  - "traefik.http.middlewares.test-auth.basicauth.users=traffic:$$apr1$$xyz123$$abc456, user2:$$apr1$$def789$$ghi012"
  - "traefik.http.routers.cat-app.middlewares=test-auth"
```

Here:

- `test-auth` is the middleware name
- `traffic` and `user2` are usernames
- Passwords are stored as hashes

## Creating Password Hashes

Passwords must be hashed before adding them to the middleware.

- Use the `htpasswd` command in Linux
- Escape dollar signs by doubling them (`$` becomes `$$`)

Example:

```bash
htpasswd -nb traffic mypassword | sed 's/\$/\$\$/g'
```

Expected output:

```
traffic:$$apr1$$xyz123$$abc456
```

This output can be placed directly into the middleware label.


## Lab: Using Basic Auth 

This lab shows how to secure an application by adding a username and password directly through Traefik middleware. With this setup, the application will require credentials before granting access.

### Clone the Repository 

To try out the lab, clone the project repository from GitHub. 

- Github repo: [joseeden/labs-traefik](https://github.com/joseeden/labs-traefik/tree/master)

Clone and move into the project directory:

```bash
git clone https://github.com/joseeden/labs-traefik.git 
cd labs-traefik/05-middleware/01-basic-auth
```

Project structure:

```bash
05-middleware
├── 01-basic-auth
│   ├── .gitignore
│   ├── basicauth_users
│   ├── docker-compose.auth.yml
│   ├── docker-compose.secrets.yml
│   ├── docker-compose.usersfile.yml
│   ├── traefik.yml
│   └── usersfile
```


### Creating the Passwords

Passwords must be hashed before being added to the configuration.

- Use the `htpasswd` command to generate credentials
- Escape dollar signs by replacing `$` with `$$`
- Optionally use an online tool for Windows

To use `htbpassword`, you need to install it first:

```bash
sudo apt install -y apache2-utils
```

Below are the credentials that we want to use:

| Username  | Password              |
| --------- | --------------------- |
| johnsmith | `Thr3@tl3u3lw!dN!QHt` |
| janedoe   | `@Ll!$szM3lLiND@h0oD` |

Generate the hashes using the command:

```bash
htpasswd -nb johnsmith 'Thr3@tl3u3lw!dN!QHt' | sed 's/\$/\$\$/g'
```

Expected output:

```
johnsmith:$$apr1$$cipim6NJ$$LK11Xtf0t92UvxjKCV8ii0
```

Repeat for other users as needed.

```bash
htpasswd -nb janedoe '@Ll!$szM3lLiND@h0oD' | sed 's/\$/\$\$/g'
```

Expected output:

```
janedoe:$$apr1$$t65c7tuF$$Qscp40RYl.Tq02pUnSv5r1
```


### Updating Middleware Configuration

The hashed passwords are added to the middleware definition.

```yaml title="docker-compose.auth.yml"
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

  # Add the catapp service
  catapp:
    image: mikesir87/cats:1.0
    labels:
      - "traefik.enable=true"
      # Routers
      - "traefik.http.routers.catapp.rule=Host(`catapp.localhost`)"
      - "traefik.http.routers.catapp.service=catapp"
      - "traefik.http.routers.catapp.entrypoints=web"
      - "traefik.http.routers.catapp.middlewares=test-auth"
      # Services
      - "traefik.http.services.catapp.loadbalancer.server.port=5000"
      # Middleware BasicAuth
      - "traefik.http.middlewares.test-auth.basicauth.users=johnsmith:$$apr1$$cipim6NJ$$LK11Xtf0t92UvxjKCV8ii0,janedoe:$$apr1$$t65c7tuF$$Qscp40RYl.Tq02pUnSv5r1"
```

Where: 

- `test-auth` is the middleware name
- Router references the middleware by its exact name

### Deploying and Testing

Once configured, deploy and test the authentication.

```bash
docker stack deploy -c docker-compose.auth.yml traefik
```

Output:

```bash
Creating network traefik_default
Creating service traefik_traefik
Creating service traefik_catapp
```

Open the Traefik dashboard:

```bash
http://localhost:8080/ 
```

Go to **Routers** > **HTTP Routers** > Click `catapp@docker`. Confirm the middleware is linked to the router.

<div class="img-center"> 

![](/img/docs/08102025-mw-1.PNG)

</div>

Access the application in a browser. When prompted, enter the configured username and password.

If credentials are correct, the request is allowed.

<div class="img-center"> 

![](/gif/docs/08102025-catapp-mw-1.gif)

</div>

Now try entering incorrect credentials. For now, access will be blocked, but we’ll add a custom error page in later labs.

<div class="img-center"> 

![](/gif/docs/08102025-catapp-mw-2.gif)

</div>


### Storing Credentials Safely

Keep sensitive login details out of your codebase.

- Do not place credentials directly in `docker-compose.yml`
- Save them in a separate file excluded from Git
- Use **environment variables** loaded from a `.env` file (also excluded from Git)
- For production, store them in a **secrets manager** like Vault, AWS Secrets Manager, or Docker secrets

This way, passwords stay secure and never end up in the repository.

### Using a separate file 

This method uses a separate file to store credentials, keeping them out of the main configuration.

1. Create a `usersfile` file in the same directory as your Docker compose file. This file will contain the hashed credentials, one per line.

    ```env
    johnsmith:$apr1$cipim6NJ$LK11Xtf0t92UvxjKCV8ii0
    janedoe:$apr1$t65c7tuF$Qscp40RYl.Tq02pUnSv5r1
    ```

2. Add `usersfile` to `.gitignore`:

    ```gitignore
    usersfile
    ```

3. Delete the existing service first:

    ```bash
    docker stack rm traefik
    ```

4. We'll use the `docker-compose.usersfile.yml` for this example:

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
          - "traefik.http.routers.catapp.middlewares=test-auth"
          # Services
          - "traefik.http.services.catapp.loadbalancer.server.port=5000"
          # Middleware BasicAuth using usersfile
          - "traefik.http.middlewares.test-auth.basicauth.usersfile=/usersfile"
    ```

5. Deploy the stack:

    ```bash
    docker stack deploy -c docker-compose.usersfile.yml traefik
    ```

The credentials will be pulled from `usersfile` at runtime, never stored in Git. To verify if it works, access the `catapp.localhost` in your browser, and try the other credential.

<div class="img-center"> 

![](/gif/docs/08102025-catapp-mw-3.gif)

</div>

### Using Docker Secrets

Using Docker secrets is a safe way to manage your Basic Auth credentials without exposing them in your images or compose files.

1. Create the secret file (`basicauth_users`) locally:

    ```bash
    htpasswd -nb johnsmith 'Thr3@tl3u3lw!dN!QHt' > basicauth_users
    htpasswd -nb janedoe '@Ll!$szM3lLiND@h0oD' >> basicauth_users
    htpasswd -nb michaelscarn 'n0g0DNN0!h@t3t08y' >> basicauth_users
    echo "basicauth_users" >> .gitignore
    ```

2. Create the Docker secret:

    ```bash
    docker secret create basicauth_users ./basicauth_users
    ```

3. Use the `docker-compose.secrets.yml` that references the file inside the container:

    **Important notes:**

    - Secrets appear inside containers at `/run/secrets/<secret_name>` by default
    - Use the secret file path like `usersfile=/run/secrets/basicauth_users`
    - Your Docker setup must support secrets (Compose file version 3.1 or higher)
    - Mark secrets as external if created outside Compose with `docker secret create`

    Example `docker-compose.secrets.yml`:
    
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
        secrets:
          - basicauth_users

      catapp:
        image: mikesir87/cats:1.0
        labels:
          - "traefik.enable=true"
          # Routers
          - "traefik.http.routers.catapp.rule=Host(`catapp.localhost`)"
          - "traefik.http.routers.catapp.service=catapp"
          - "traefik.http.routers.catapp.entrypoints=web"
          - "traefik.http.routers.catapp.middlewares=test-auth"
          # Services
          - "traefik.http.services.catapp.loadbalancer.server.port=5000"
          # Middleware BasicAuth using usersfile
          - "traefik.http.middlewares.test-auth.basicauth.usersfile=/run/secrets/basicauth_users"

    secrets:
      basicauth_users:
        external: true
    ```


5. Deploy the stack:

    ```bash
    docker stack deploy -c docker-compose.secrets.yml traefik
    ```

Note that in step 1, a third user was added. Use this user to test access and verify your setup.

<div class="img-center"> 

![](/gif/docs/08102025-catapp-mw-4.gif)

</div>


### Cleanup

Delete the deployed stack:

```bash
docker stack rm traefik 
```

You can also delete the `usersfile` and `basicauth_users` :

```bash
rm -f usersfile
rm -f basicauth_users 
```

