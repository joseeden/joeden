---
title: "Error Pages"
description: "Error Pages"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 13
last_update:
  date: 2/5/2023
---

## Overview

Errors happen sometimes, and it's good to handle them nicely.

- You Can Set Up A Middleware To Show Custom Error Pages
- Custom Pages Improve User Experience For Errors Like 404 Or 500
- You Can Show Helpful Links Or Support Info On Error Pages

Custom error pages make visitors feel better when something goes wrong. They can see a friendly message and find their way back instead of just a plain error.

## How It Works

The middleware watches for errors on your service or Traefik itself.

- You Define Which Error Codes To Catch (Single Or Range)
- You Link The Middleware To The Service That Shows The Custom Page
- When An Error Happens, The Middleware Shows The Right Error Page

For example, if a 500 error happens, Traefik serves a specific 500 error page you configured.

## Configuration Example

Here is a simple setup for error page middleware:

```yaml
http:
  middlewares:
    test-error-page:
      errors:
        status:
          - "404-404"
          - "500-500"
        service:
          name: error-service
          port: 80
```

This tells Traefik to use the `error-service` to serve pages for 404 and 500 errors.


## Lab: Using Error Pages in Middleware

This lab shows how to use middleware to handle error pages.

- Enable the error middleware to catch all errors
- Middleware detects error type like 404, 401, 500
- Middleware serves a custom error page based on the error

The middleware works like a filter that catches errors from any service. It checks the error and shows a matching error page instead of a plain message.

### Using a Custom Error Page Service

Instead of simple text errors, we'll use a custom Docker image that shows nice error pages.

- Use a special Docker image with designed error pages for many error codes
- Add an error service in the configuration using this image
- Link the middleware to redirect all errors (400 to 599) to this error service

This gives a better look to error pages for all services behind the middleware. The error service automatically picks the right page to show.

For reference, we'll use the code samples from this repo:

- [guillaumebriday/traefik-custom-error-pages](https://github.com/guillaumebriday/traefik-custom-error-pages)
- [tarampampam/error-pages](https://github.com/tarampampam/error-pages) 


### Clone the Repository 

To try out the lab, clone the project repository from GitHub. 

- Github repo: [joseeden/labs-traefik](https://github.com/joseeden/labs-traefik/tree/master)

Clone and move into the project directory:

```bash
git clone https://github.com/joseeden/labs-traefik.git 
cd labs-traefik/05-middleware/03-error-pages
```

Project structure:

```bash
05-middleware
├── 03-error-pages
│   ├── .gitignore
│   ├── docker-compose.error.yml
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
htpasswd -nb johnsmith 'Thr3@tl3u3lw!dN!QHt' | sed 's/\$/\$\$/g'
```

You should see output like:

```
johnsmith:$$apr1$$cipim6NJ$$LK11Xtf0t92UvxjKCV8ii0
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


### Configure the Docker Compose File 

In the cloned repository, the `docker-compose.error.yml` file sets up error handling. It redirects all error responses to the error-service, which shows custom error pages.

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

  # Catapp service
  catapp:
    image: mikesir87/cats:1.0
    labels:
      - "traefik.enable=true"
      # Routers
      - "traefik.http.routers.catapp.rule=Host(`catapp.localhost`)"
      - "traefik.http.routers.catapp.service=catapp"
      - "traefik.http.routers.catapp.entrypoints=web"
      - "traefik.http.routers.catapp.middlewares=test-auth,test-compress,test-errorpages"
      # Services
      - "traefik.http.services.catapp.loadbalancer.server.port=5000"
      # Middleware BasicAuth using usersfile
      - "traefik.http.middlewares.test-auth.basicauth.usersfile=/usersfile"
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

This setup sends errors from the main app to the error service for handling and display.



### Deploying and Testing

Deploy the Docker stack using this command:

```bash
docker stack deploy -c docker-compose.error.yml traefik
```

Output:

```bash
Creating network traefik_default
Creating service traefik_traefik
Creating service traefik_catapp
Creating service traefik_error
```

Open the dashboard in your browser:

```bash
http://localhost:8080/dashboard/#/ 
```

Go to **Services** and confirm you see both the error and catapp services listed.

<div class="img-center"> 

![](/img/docs/08102025-mw-errorpages-1.PNG)

</div>


Next, go to **Routers** and select the `catapp@docker` router. You should see three middlewares attached there.

<div class="img-center"> 

![](/img/docs/08102025-mw-errorpages-2.PNG)

</div>

Finally, test the application by opening it in the browser.

If you enter a wrong URL, you will see a professional-looking 404 error page from the custom error service instead of a simple text error.

<div class="img-center"> 

![](/gif/docs/08102025-catapp-mw-5.gif)

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

