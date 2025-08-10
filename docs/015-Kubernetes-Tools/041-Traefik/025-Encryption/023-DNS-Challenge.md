---
title: "DNS Challenge"
description: "Using Let's Encrypt DNS Challenge"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 23
last_update:
  date: 2/5/2023
---


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
│   ├── docker-compose.dns.yml
│   └── traefik.dns.yml
├── challenge-http
│   ├── docker-compose.http.yml
│   └── traefik.http.yml
├── challenge-tls
│   ├── docker-compose.tls.yml
│   └── traefik.tls.yml
├── letsencrypt
```

**Note:** Make sure the `letsencrypt` folder is next to the `challenge` folders, not inside any of them. The Docker compose files expect it there. If you move the `letsencrypt` folder, remember to update the Docker compose files accordingly.

## Using Let's Encrypt - DNS Challenge

In this lab, we’ll set up **Traefik with Let’s Encrypt DNS challenge**, which allows automatic creation of wildcard certificates, meaning you can secure all subdomains (like `app.yourdomain.com`, `api.yourdomain.com`) with a single certificate.

- Wildcard certs cover many subdomains
- DNS challenge updates DNS records automatically
- Works without exposing HTTP port (uses DNS + HTTPS only)

This method is fully automated and gives you more flexibility with subdomains.


### Prepare Your DNS Provider

If you followed the Lab pre-requisites section, you should already have wildcard DNS records added which are pointing to your server.

- A`*.yourdomain.com` record 
- An `@` (root) record 

This allows Traefik to request certificates for any subdomain you choose later; no need to manually add DNS entries every time.

For more information, please see [Setup your DNS Records.](#set-up-dns-records)


### Create an API Token (DigitalOcean)

To allow Traefik to update DNS records automatically, you’ll need a token from your DNS provider.

1. Go to your DNS provider’s dashboard (e.g., DigitalOcean)
2. Generate a new API token with DNS access
3. Copy the token. This will be added to the Docker compose

This token is used by Traefik to prove domain ownership via the DNS challenge.

To generate the token in DigitalOcean please see [Generate an API Token.](/docs/001-Personal-Notes/020-Homelab/040-DigitalOcean.md#generate-api-token)


### Add API Token in Docker Compose

Now configure the Docker Compose file with the token and labels.

To do this securely, create a `.env` file not tracked by Git (make sure to add `.env` to `.gitignore)`):

```bash
DO_AUTH_TOKEN=your_real_token_here
```

**Optional:** You can keep your `.env` but manually load it before running the deploy:

```bash
set -a
source ./challenge-dns/.env
set +a
```

Then update the `docker-compose.dns.yml`:

```yaml
# docker-compose.dns.yml
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
      - ./traefik.dns.yml:/etc/traefik/traefik.yml  
    environment:
      - DO_AUTH_TOKEN=${DO_AUTH_TOKEN}
    env_file:
      - .env

  catapp:
    image: mikesir87/cats:1.0
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.catapp.rule=Host(`anything.yourdomain.com`)"  ## you can set this to anysubdomain
      - "traefik.http.routers.catapp.service=catapp"
      - "traefik.http.services.catapp.loadbalancer.server.port=5000"
      - "traefik.http.routers.catapp.entrypoints=websecure"
      - "traefik.http.routers.catapp.tls.certresolver=myresolver"
```

As a recap, the DNS records that we have are:

| Type | Hostname                   | Value                | TTL(seconds) |
| ---- | -------------------------- | -------------------- | ------------ |
| A    | `*.yourdomain.com`         | directs to  (add ip) | 30           |
| A    | `www.yourdomain.com`       | directs to  (add ip) | 30           |
| A    | `dashboard.yourdomain.com` | directs to  (add ip) | 30           |
| A    | `yourdomain.com`           | directs to  (add ip) | 30           |


In the Docker Compose file, the rule `*.yourdomain.com` matches `anything.yourdomain.com`. So, Traefik will get a wildcard certificate for `*.yourdomain.com` using the DNS challenge. This lets Traefik secure all subdomains automatically with one certificate.

### Set Up Static Traefik Config (DNS Challenge)

The `traefik.dns.yml` sets the static config for the DNS challenge and the right provider.


```yaml
# traefik.dns.yml
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
      email: your_email@example.com 
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

**Note:** 

- Replace `email:` with your real address
- Set `provider:` to match your DNS provider name (e.g., `digitalocean`)
- The `myresolver` name must match the Docker Compose labels later

This config tells Traefik to request certificates using DNS, with your provider’s API.



### Deploy the New Stack

Make sure no other stack is running before deployment:

```bash
docker stack rm traefik
```

Now deploy your updated setup:

```bash
docker stack deploy -c ./challenge-dns/docker-compose.dns.yml traefik
```

Check the logs to verify that the certificate was issued:

```bash
docker service logs traefik_traefik
```

You should see messages about the DNS challenge and a successful certificate request.


### Test in Browser

Open your browser and visit:

```
https://anything.yourdomain.com
```

You should see the app running with a valid HTTPS certificate. No DNS config was needed manually.

<div class="img-center"> 

![](/gif/docs/08102025-catapp-dns.gif)

</div>

To test further, update the Compose file to use a new subdomain:

```
- "traefik.http.routers.catapp.rule=Host(`michaelscarn.yourdomain.com`)"
```

Re-deploy the stack and Traefik will request a new certificate using the same wildcard.

```bash
docker stack deploy -c ./challenge-dns/docker-compose.dns.yml traefik
```

Now visit:

```bash
https://michaelscarn.yourdomain.com
```

It should load securely, using the wildcard certificate.


<div class="img-center"> 

![](/gif/docs/08102025-catapp-dns-2.gif)

</div>



### Store Certificates Safely

To avoid rate limits and protect your certs:

- Always mount the `/letsencrypt` directory outside the container
- Backup your `acme.json` file which stores certs
- Avoid deleting containers without saving this file

```bash
# Store and check certificate file
ls ./letsencrypt/acme.json
```

If the cert file is lost and you request too many new ones, Let’s Encrypt may block further requests temporarily.


### Use Secrets for Tokens (Best Practice)

Instead of writing your DNS API token directly in the file:

- Use Docker secrets to keep it hidden
- Avoid exposing sensitive tokens in version control

This helps keep your system secure while still allowing full automation.

1. Create the secret:

    ```bash
    echo -n "your_digitalocean_api_token" | docker secret create do_auth_token -
    ```

2. Update your `docker-compose.dns.yml`:

    ```yaml
    version: "3.8"

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
          - ./traefik.dns.yml:/etc/traefik/traefik.yml
        secrets:
          - do_auth_token
        environment:
          - DO_AUTH_TOKEN_FILE=/run/secrets/do_auth_token

    secrets:
      do_auth_token:
        external: true
    ```

3. Deploy:

    ```bash
    docker stack deploy -c ./challenge-dns/docker-compose.dns.yml traefik
    ```

    Traefik will then read the token from `/run/secrets/do_auth_token`.


### Cleanup

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


