---
title: "Tracking Domains"
description: "Tracking Domains"
sidebar_position: 15
last_update:
  date: 5/5/2024
---


## DomainMod 

DomainMod is an open-source tool for tracking domain names and SSL certificates. It helps organize, monitor, and manage all domain-related details in one dashboard.

### Run as Container

Go to:
[https://hub.docker.com/r/domainmod/domainmod](https://hub.docker.com/r/domainmod/domainmod)

To run as a container, create a Docker Compose file:

```yaml
## docker-compose-domainmod.yaml
services:
  app:
    image: domainmod/domainmod:latest
    container_name: domainmod_app
    depends_on:
      - db
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Vancouver
      - DOMAINMOD_WEB_ROOT=
      - DOMAINMOD_DATABASE_HOST=db
      - DOMAINMOD_DATABASE=domainmod
      - DOMAINMOD_USER=domainmod
      - DOMAINMOD_PASSWORD=password1
    volumes:
      - ./application:/var/www/html
    ports:
      - 8080:80
    restart: unless-stopped

  db:
    image: ghcr.io/linuxserver/mariadb:alpine
    container_name: domainmod_db
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Vancouver
      - MYSQL_DATABASE=domainmod
      - MYSQL_USER=domainmod
      - MYSQL_PASSWORD=password1
      - MYSQL_ROOT_PASSWORD=password2
    volumes:
      - ./database:/config
    ports:
      - 3306
    restart: unless-stopped
```

Run:

```bash
docker-compose -f docker-compose-domainmod.yaml up -d
```

Example output:

```bash
 ✔ Network domainmod_default  Created
 ✔ Container domainmod_db     Created
 ✔ Container domainmod_app    Created
```

Access the dashboard:

```
http://localhost:8080
```


### Installation Process

Go through the installation wizard.

In the **Software requirements** step, make sure all items show **Passed**:

![](/img/docs/08092025-domainmod-1.PNG)

Next steps:

- Select currency
- Select your time zone
- Enter **Administrator Email Address** (used for the first admin account)
- Enter **System Email Address** (used for notifications such as domain expiry alerts)
- Click **Proceed with installation**

Once installed, you’ll see:

```bash
Success
DomainMOD has been successfully installed and you should now delete the /install/ folder

The default username and password are "admin", and you'll be prompted to change the password after logging in.
```


### Login

After installation, log in using the default credentials:

![](/img/docs/08092025-domainmod-2.PNG)

You’ll be prompted to change your password:

![](/img/docs/08092025-domainmod-3.PNG)

Once logged in, all added domains and SSL certificates will appear in the dashboard:

![](/img/docs/08092025-domainmod-4.PNG)



### Adding a Domain Registrar and Account

Before adding domains, you must add at least:

- One domain registrar
- One domain registrar account

Example of adding a registrar:

![](/img/docs/08092025-domainmod-5.PNG)

For example, add Namecheap if you have domains there:

![](/img/docs/08092025-domainmod-6.PNG)


