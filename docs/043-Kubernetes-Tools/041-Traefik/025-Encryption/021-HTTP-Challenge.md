---
title: "HTTP Challenge"
description: "Using Let's Encrypt HTTP Challenge"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 21
last_update:
  date: 2/5/2023
---


## Using Let's Encrypt - HTTP Challenge

In this lab, we’ll use **Let’s Encrypt with the HTTP challenge** to automatically get TLS certificates for your app.

- Let’s Encrypt will verify your domain using an HTTP request
- Traefik will handle all the communication and certificate setup
- You just need to update a few values in the config files


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
sudo systemctl enable docker
sudo systemctl start docker
sudo systemctl status docker

# Configure DOcker
sudo usermod -aG docker ec2-user && newgrp docker

# Install Docker compsoe
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
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

After getting a domain, update its registrar settings so it points to your chosen DNS provider. If you're also using DigitalOcean, you can follow the steps here: [Adding a Domain in DigitalOcean](/docs/001-Personal-Notes/020-Homelab/010-Hosting/040-DigitalOcean.md#adding-a-domain)

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

| Type | Hostname                     | Value                   | TTL (seconds) |
| ---- | ---------------------------- | ----------------------- | ------------- |
| A    | `*.joeden.site`              | points to 34.201.50.100 | 30            |
| A    | `www.joeden.site`            | points to 34.201.50.100 | 30            |
| A    | `dashboard.joeden.site`      | points to 34.201.50.100 | 30            |
| A    | `joeden.site`                | points to 34.201.50.100 | 30            |

The IP `34.201.50.100` is my test machine's public IP. Point the DNS records to your machine's public IP.

The `dashboard.joeden.site` is used to access the Traefik dashboard.

You can also use shorthand names since they mean the same:

| Type | Hostname          | Value                   | TTL (seconds) |
| ---- | ----------------- | ----------------------- | ------------- |
| A    | `*.joeden.site`   | points to 34.201.50.100 | 30            |
| A    | `www`             | points to 34.201.50.100 | 30            |
| A    | `dashboard`       | points to 34.201.50.100 | 30            |
| A    | `@`               | points to 34.201.50.100 | 30            |

If you set this up in DigitalOcean, your DNS records should look like this:

| Type | Hostname            | Value                          | TTL (seconds) |
| ---- | ------------------- | ------------------------------ | ------------- |
| NS   | `joeden.site`     | points to ns1.digitalocean.com | 30            |
| NS   | `joeden.site`     | points to ns2.digitalocean.com | 30            |
| NS   | `joeden.site`     | points to ns3.digitalocean.com | 30            |
| A    | `*.joeden.site`   | points to 34.201.50.100        | 30            |
| A    | `www.joeden.site` | points to 34.201.50.100        | 30            |
| A    | `dashboard.joeden.site`      | points to 34.201.50.100 | 30            |
| A    | `joeden.site`     | points to 34.201.50.100        | 30            |


<!-- ### If you're testing on your Windows Machine 

You might get a timeout error when deploying the stack in a later step. To fix this, temporarily allow incoming traffic on ports 80 and 443:

1. Open **Windows Defender Firewall with Advanced Security**:
   * Press `Win + R`, type `wf.msc`, press Enter.

2. In the left pane, click **Inbound Rules**.
3. In the right pane, click **New Rule...**.
4. Choose **Port**, click **Next**.
5. Select **TCP**, specify ports: `80,443`, click **Next**.
6. Choose **Allow the connection**, click **Next**.
7. Choose where to apply the rule (Domain, Private, Public). 
8. For testing, select all three, then click Next.
9. Name the rule `000-DELETE-LATER-Allow HTTP and HTTPS inbound`.
10. Click **Finish**. -->


### Clone the Repository 

To try out the examples, clone the project repository from GitHub. 

- Github repo: [joseeden/labs-traefik](https://github.com/joseeden/labs-traefik/tree/master)

Clone and move into the project directory:

```bash
git clone https://github.com/joseeden/labs-traefik.git 
cd labs-traefik/04-https-tls
```

Project structure:

```bash
04-https-tls
├── challenge-dns
│   ├── .env
│   ├── .gitignore
│   ├── docker-compose.dns.yml
│   └── traefik.dns.yml
├── challenge-http
│   ├── docker-compose.http.yml
│   └── traefik.http.yml
├── challenge-tls
│   ├── docker-compose.tls.yml
│   └── traefik.tls.yml
└── letsencrypt
```

**Note:** Make sure the `letsencrypt` folder is next to the `challenge` folders, not inside any of them. The Docker compose files expect it there. If you move the `letsencrypt` folder, remember to update the Docker compose files accordingly.



## Prepare the Files 

Inside the lab directory, we'll use' `traefik.http.yml` to enable Let's Encrypt with HTTP challenge. This config tells Traefik to request and manage certificates using HTTP.

```yaml
# traefik.http.yml 
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

# Challenge HTTP
certificatesResolvers:
  myresolver:
    acme:
      email: your_email@example.com 
      storage: acme.json
      httpChallenge:
        entryPoint: web

# Dashboard router
http:
  routers:
    traefik:
      rule: Host(`dashboard.yourdomain.com`) 
      entryPoints:
        - traefik
      service: api@internal
      # middlewares:                       # DO NOT DO IN PRODUCTION
      #   - auth                           # Disables the authentication        
```

:::info 

Make sure to replace the email address with your real email and the domain with your domain.
 
:::


In the `docker-compose.http.yml`, we'll set up our app with HTTPS using Traefik labels.

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
      - ../letsencrypt:/letsencrypt
      - ./traefik.http.yml:/etc/traefik/traefik.yml

  catapp:
    image: mikesir87/cats:1.0
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.catapp.rule=Host(`yourdomain.com`)"
      - "traefik.http.routers.catapp.service=catapp"
      - "traefik.http.services.catapp.loadbalancer.server.port=5000"
      - "traefik.http.routers.catapp.entrypoints=websecure"
      - "traefik.http.routers.catapp.tls.certresolver=myresolver"
```

:::info 

Change `yourdomain.com` to your actual domain

::::

With these labels, Traefik will route HTTPS traffic and get certificates automatically.


## Deploy and Test

To deploy the stack:

```bash
docker stack deploy -c ./challenge-http/docker-compose.http.yml traefik
```

Output:

```bash
Creating network traefik_default 
Creating service traefik_traefik
Creating service traefik_catapp
```

Then check the logs to verify the certificate process:

```bash
docker service logs traefik_traefik
```

Look for lines like:

```
level=info msg="Configuration loaded from file: /etc/traefik/traefik.yml"
level=info msg="Traefik version 2.3.7 built on 2021-01-11T18:03:02Z"
.....
level=info msg="Testing certificate renew..." providerName=myresolver.acme
```

If successful, visit your domain using HTTPS. You should see the secure padlock icon in the browser. 

```bash
https://joeden.site/ 
```

<div class="img-center"> 

![](/gif/docs/08102025-catapp-http.gif)

</div>

Click the lock icon (in some browsers, its a different icon) to see more details about the certificate. It will show **Let’s Encrypt** as the issuer.

<div class="img-center"> 

![](/gif/docs/08102025-catapp-http-2.gif)

</div>


## Confirm in Traefik Dashboard

Open the dashboard:

```bash
http://dashboard.yourdomain.com:8080
```

**NOTE:** The Traefik config exposes the dashboard on a separate entry point that listens on port 8080 using plain HTTP without TLS (no HTTPS). If you want to use HTTPS, you need to update your Traefik YAML to use the secure `websecure` (port 443) entry point.

Go to **Routers**, and locate the `catapp@docker` application.

- TLS is marked as **enabled**
- The router uses `websecure` as the entry point
- The certificate resolver is set to `myresolver`

<div class="img-center"> 

![](/img/docs/08102025-traefik-catapp-http.PNG)

</div>

Click the `catapp@docker` to see the router's details:

- TLS is marked as **enabled**
- The router uses `websecure` as the entry point
- The certificate resolver is set to `myresolver`

<div class="img-center"> 

![](/img/docs/08102025-traefik-catapp-http-2.PNG)

</div>


Go to **HTTP Services** and click `catapp@docker`. In the **Used by Routers** section, it will show TLS is enabled for the application.

<div class="img-center"> 

![](/img/docs/08102025-traefik-catapp-http-3.PNG)

</div>


## Cleanup

Before proceeding to the next lab, make sure to delete the deployed stack first:

```bash
docker stack rm traefik 
```


