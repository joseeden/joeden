---
title: "Redirect Scheme"
description: "Redirect Scheme"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 15
last_update:
  date: 2/5/2023
---


## Overview

When users visit your site with Http, the **redirect scheme** middleware sends them to the secure Https version. 

- Permanent redirects tell search engines this change is final. 
- Temporary redirects mean it might change later.

Redirects protect user data by forcing secure connections. They also help SEO by telling search engines which version to index.


## Setting up Redirect Scheme 

Set up a middleware with a name like `test-redirect-scheme`. Configure it to always use Https.

Example:

```yaml
  - "traefik.http.middlewares.test-redirectscheme.redirectscheme.scheme=https"
  - "traefik.http.middlewares.test-redirectscheme.redirectscheme.permanent=true"
```

This means all Http requests get redirected to Https with a permanent redirect status.


## Lab: From Http to Https

In this lab, we will set up a redirect so users always connect to our app through the secure Https entry point.

- Redirect one app service from Http to Https
- Use separate routers for Http and Https
- Apply middlewares like auth and rate limit only on the Https router

This redirect applies only to one service, keeping other services on Http. It gives more control and keeps traffic changes safe and focused.

## Pre-requisites 

### Setup a Public Cloud VM 

It is recommended to perform this lab on a a VM with a public IP because you need to open port 80 to the internet.

- Your DNS records must point to the VM’s public IP.
- Let’s Encrypt can verify your site via HTTP without problems.

If you do this lab in your local Windows machine, it is likely that your machine has a private LAN IP like `192.168.x.x` behind NAT. 

You can definitely tweak your Windows machine’s firewall to allow inbound connections on port 80 (and 443), but this alone won’t fix the main problem if your router or network blocks/doesn’t forward that traffic.

To create a public cloud VM, you can use:

- [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)
- [Azure virtual machine](https://learn.microsoft.com/en-us/azure/virtual-machines/windows/quick-create-portal) 
- [GCP Compute Engine](https://cloud.google.com/products/compute)
- [DigitalOcean droplet](https://docs.digitalocean.com/products/droplets/how-to/create/) 
- [Linode instance](https://www.linode.com/docs/guides/create-a-linode/)

Make sure your EC2 security group allows inbound TCP traffic on:

- Port 80 (HTTP)
- Port 443 (HTTPS)
- Port 8080 (Traefik dashboard)

After launching your VM, install the necessary tools. For example, on my EC2 instance, I run:

```bash
# Install Git 
sudo yum update -y && sudo yum install -y git

# Install Docker 
sudo amazon-linux-extras enable docker
sudo yum install -y docker

# Start Docker service
sudo systemctl enable --now docker
sudo systemctl status docker

# Configure DOcker
sudo usermod -aG docker ec2-user && newgrp docker

# Install Docker compsoe
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Configure permission
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

# Initialize Docker Swarm (needed for docker stack deploy):
docker swarm init
```

### Prepare your Domain 

Before using HTTPS with Traefik, make sure you have:

- A domain name for testing
- DNS records pointing to your DNS provider
- A DNS provider supported by TraefikA DNS provider supported by Traefik

heck the supported providers list here: [Traefik DNS Provider Integrations](https://docs.traefik.io/v2.3/https/acme/#providers)**

For example, my setup uses:

- Domain from Namecheap
- DNS hosted on DigitalOcean

After getting a domain, update its registrar settings so it points to your chosen DNS provider. If you're also using DigitalOcean, you can follow the steps here: [Adding a Domain in DigitalOcean](/docs/001-Personal-Notes/020-Homelab/040-DigitalOcean.md#adding-a-domain)

**NOTE:** Make sure your domain is fully set up and pointing to your server before proceeding with the labs. Propagation can take up to 24–48 hours, sometimes longer depending on the registrar and TLD.

To verify, you can run:

```bash
dig NS yourdomain.com
dig A yourdomain.com
```

If you are using DigitalOcean name servers, you should see:

```bash
;; ANSWER SECTION:
yourdomain.com.     1800    IN      NS      ns1.digitalocean.com.
yourdomain.com.     1800    IN      NS      ns2.digitalocean.com.
yourdomain.com.     1800    IN      NS      ns3.digitalocean.com.

;; ANSWER SECTION:
yourdomain.com.     300     IN      A       192.0.2.123
```

### Set Up DNS Records

Once you've changed your domain’s nameservers to your DNS provider, the next step is to add your DNS records there. 

Here are the DNS records I used. You can copy them but make sure to replace with your own domain details.

| Type | Hostname                | Value                   | TTL (seconds) |
| ---- | ----------------------- | ----------------------- | ------------- |
| A    | `*.joeden.site`         | points to 34.201.50.100 | 30            |
| A    | `www.joeden.site`       | points to 34.201.50.100 | 30            |
| A    | `dashboard.joeden.site` | points to 34.201.50.100 | 30            |
| A    | `joeden.site`           | points to 34.201.50.100 | 30            |

The IP `34.201.50.100` is my test machine's public IP. Point the DNS records to your machine's public IP.

The `dashboard.joeden.site` is used to access the Traefik dashboard.

You can also use shorthand names since they mean the same:

| Type | Hostname        | Value                   | TTL (seconds) |
| ---- | --------------- | ----------------------- | ------------- |
| A    | `*.joeden.site` | points to 34.201.50.100 | 30            |
| A    | `www`           | points to 34.201.50.100 | 30            |
| A    | `dashboard`     | points to 34.201.50.100 | 30            |
| A    | `@`             | points to 34.201.50.100 | 30            |

If you set this up in DigitalOcean, your DNS records should look like this:

| Type | Hostname                | Value                          | TTL (seconds) |
| ---- | ----------------------- | ------------------------------ | ------------- |
| NS   | `joeden.site`           | points to ns1.digitalocean.com | 30            |
| NS   | `joeden.site`           | points to ns2.digitalocean.com | 30            |
| NS   | `joeden.site`           | points to ns3.digitalocean.com | 30            |
| A    | `*.joeden.site`         | points to 34.201.50.100        | 30            |
| A    | `www.joeden.site`       | points to 34.201.50.100        | 30            |
| A    | `dashboard.joeden.site` | points to 34.201.50.100        | 30            |
| A    | `joeden.site`           | points to 34.201.50.100        | 30            |


### Clone the Repository 

> Github repo: [joseeden/labs-traefik](https://github.com/joseeden/labs-traefik/tree/master)

Login to the public cloud VM and clone the project repository from GitHub. 

```bash
git clone https://github.com/joseeden/labs-traefik.git
cd labs-traefik/05-middleware/05-redirects
```

Project structure:

```bash
05-middleware
└── 05-redirects
    ├── .env
    ├── .gitignore
    ├── docker-compose.redirect.yml
    ├── traefik.dns.yml
    └── usersfile
```

<!-- **Note:** Make sure the `letsencrypt` folder is next to the `challenge` folders, not inside any of them. The Docker compose files expect it there. If you move the `letsencrypt` folder, remember to update the Docker compose files accordingly -->


## Create an API Token 

To allow Traefik to update DNS records automatically, you’ll need a token from your DNS provider. In my setup, I'm using DigitalOcean as my DNS provider.

1. Go to your DNS provider’s dashboard (e.g., DigitalOcean)
2. Generate a new API token with DNS access
3. Copy the token. This will be added to the Docker compose

This token is used by Traefik to prove domain ownership via the DNS challenge.

:::info 

To generate the token in DigitalOcean please see [Generate an API Token.](/docs/001-Personal-Notes/020-Homelab/040-DigitalOcean.md#generate-api-token)

:::

## Create the `.env` file

Once you have the API token, create a `.env`:

```bash title=".env"
DO_AUTH_TOKEN=your_real_token_here
```

## Create the Passwords

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


## Configure the Docker Compose File

In the Docker compose file:

- The Http router listens on port 80 and only redirects requests to Https
- The Https router listens on port 443 and handles the app service with full middlewares
- Redirect middleware is set to permanent and forces Http to Https
- TLS and letsencrypt are enabled on the Https router

This config sends all Http requests to the secure Https service, where all middleware runs.

:::info 

Update your domain and DNS with your provider tokens

:::

```yaml title="docker-compose.redirect.yml
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
      - ./letsencrypt:/letsencrypt
      - ./traefik.dns.yml:/etc/traefik/traefik.yml
      - ./usersfile:/usersfile:ro # <-- mount your users file here
    environment:
      - DO_AUTH_TOKEN=${DO_AUTH_TOKEN}
    env_file:
      - .env

  # Catapp service
  catapp:
    image: mikesir87/cats:1.0
    labels:
      - "traefik.enable=true"
      # Routers - Catapp HTTP
      - "traefik.http.routers.catapp.rule=Host(`lab.yourdomain.com`)"
      - "traefik.http.routers.catapp.entrypoints=web"
      - "traefik.http.routers.catapp.middlewares=test-redirectscheme"
      # Routers - Catapp HTTP Secure
      - "traefik.http.routers.catapp-secure.rule=Host(`lab.yourdomain.com`)"
      - "traefik.http.routers.catapp-secure.entrypoints=websecure"
      - "traefik.http.routers.catapp-secure.tls.certresolver=myresolver"
      - "traefik.http.routers.catapp-secure.middlewares=test-auth,test-compress,test-errorpages,test-ratelimit"
      # Services - Catapp HTTP Secure
      - "traefik.http.services.catapp-secure.loadbalancer.server.port=5000"
      # Middleware - Redirect Scheme HTTP -> HTTPS
      - "traefik.http.middlewares.test-redirectscheme.redirectscheme.scheme=https"
      - "traefik.http.middlewares.test-redirectscheme.redirectscheme.permanent=true"
      # Middleware BasicAuth using usersfile
      - "traefik.http.middlewares.test-auth.basicauth.usersfile=/usersfile"
      # Compress Middleware
      - "traefik.http.middlewares.test-compress.compress=true"
      # Error Pages Middleware
      - "traefik.http.middlewares.test-errorpages.errors.status=400-599"
      - "traefik.http.middlewares.test-errorpages.errors.service=error"
      - "traefik.http.middlewares.test-errorpages.errors.query=/{status}.html"
      # Rate Limit Middleware
      - "traefik.http.middlewares.test-ratelimit.ratelimit.average=2"

  # Error Page service
  error:
    image: guillaumebriday/traefik-custom-error-pages
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.error.rule=Host(`error.localhost`)"
      - "traefik.http.routers.error.service=error"
      - "traefik.http.services.error.loadbalancer.server.port=80"
      # - traefik.frontend.rule=PathPrefixStrip:/wait
      - "traefik.http.routers.error.entrypoints=web"
```

We also have the Traefik configuration in the `traefik.dns.yml`. Make sure to use your own email in the `email:` section.

```yaml
api:
  dashboard: true
  insecure: true

providers:
  docker:
    exposedByDefault: false

log:
  level: INFO

entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"
  traefik:
    address: ":8080"   

# Challenge DNS
certificatesResolvers:
  myresolver:
    acme:
      email: josemanuelitoeden@gmail.com
      storage: /letsencrypt/acme.json
      dnsChallenge:
        provider: digitalocean
        delayBeforeCheck: 0

# Dashboard router
http:
  routers:
    traefik:
      rule: Host(`dashboard.joeden.site`)  # or use your domain + a subdomain
      entryPoints:
        - traefik
      service: api@internal
      # middlewares:                       # DO NOT DO IN PRODUCTION
      #   - auth                           # Disables the authentication
```


## Deploy the Config

Before applying changes, make sure these files are in place:

```bash
└── 05-redirects
    ├── .env
    ├── .gitignore
    ├── docker-compose.redirect.yml
    ├── letsencrypt
    │   └── test
    ├── traefik.dns.yml
    └── usersfile
```

Manually load the `.env` before deploying:

```bash
set -a
source .env
set +a
```

Deploy the stack with the redirect config:

```bash
docker stack deploy -c docker-compose.redirect.yml traefik
```

Output:

```bash
Creating network traefik_default
Creating service traefik_error
Creating service traefik_traefik
Creating service traefik_catapp
```

Check running services:

```bash
docker service ls
```

Expected output:

```bash
ID             NAME              MODE         REPLICAS   IMAGE                                               PORTS
m02cx2dcaegp   traefik_catapp    replicated   1/1        mikesir87/cats:1.0
zaero8i61mnf   traefik_error     replicated   1/1        guillaumebriday/traefik-custom-error-pages:latest
t3fscw3uvxg9   traefik_traefik   replicated   1/1        traefik:v2.3 
```

Check the logs to verify that the certificate was issued:

```bash
docker service logs traefik_traefik
```

Look for DNS challenge messages and a successful certificate request:

```bash
Testing certificate renew..." providerName=myresolver.acme 
```

## Testing 

Open the dashboard in your browser:

```bash
http://dashboard.yourdomain.com:8080
```

Go to **Services** and make sure you see the `catapp-secure` service listed.

<div class="img-center"> 

![](/img/docs/2025-08-11-catapp.png)

</div>


Click on the `catapp-secure` service and scroll down to **Used by Routers**. You should see two routers attached, with only the first router having TLS enabled.

<div class="img-center"> 

![](/img/docs/08112025-mw-catapp.PNG)

</div>


Click on `catapp@docker`. This router has only the `redirectscheme` middleware and routes to `catapp-service`.

<div class="img-center"> 

![](/img/docs/08112025-mw-catapp-2.PNG)

</div>


Go back to **HTTP Routers** and select `catapp-secure@docker`.

<div class="img-center"> 

![](/img/docs/2025-08-11-catapp-secure.png)

</div>

You should see the `catapp-secure` router with TLS enabled and multiple middlewares applied.

<div class="img-center"> 

![](/img/docs/08112025-mw-catapp-3.PNG)

</div>


Finally, test the application in your browser. Use the HTTP address:

```bash
http://lab.yourdomain.com/ 
```

You will see it automatically redirect from HTTP to HTTPS, showing the **Redirect middleware** works. 

Next, try entering invalid credentials. It should fail, confirming the **BasicAuth middleware** works.

<div class="img-center"> 

![](/gif/docs/08102025-catapp-all-1.gif)

</div>

Now use valid credentials. The login should succeed as expected.

<div class="img-center"> 

![](/gif/docs/08102025-catapp-all-2.gif)

</div>

Refresh the page several times. After a few refreshes, you will hit the rate limit and see the error page. This confirms the **Rate Limit middleware** and **Error Page middleware** work.

<div class="img-center"> 

![](/gif/docs/08102025-catapp-all-3.gif)

</div>

Finally, enter an invalid URL to see a professional 404 error page.

<div class="img-center"> 

![](/gif/docs/08102025-catapp-all-4.gif)

</div>



## Cleanup

Delete the deployed stack:

```bash
docker stack rm traefik 
```

You can also delete the `.env`:

```bash
rm -f .env 
```

Go to your DNS provider and delete the API token.

<div class="img-center"> 

![](/img/docs/2025-08-10.png)

</div>


