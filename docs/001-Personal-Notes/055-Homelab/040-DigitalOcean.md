---
title: "DigitalOcean for Labs"
description: "Using DigitalOcean for Labs"
tags: 
- Cloud
- DevOps
sidebar_position: 40
last_update:
  date: 2/5/2023
---


## Overview

You can use DigitalOcean to create and manage cloud resources for your lab work.

1. Go to [DigitalOcean](https://cloud.digitalocean.com/registrations/new) and sign up for an account
2. Add a payment method
3. Follow the on-screen setup steps
4. Complete any additional verification if required


## Create a Project

A project helps you organize related resources in DigitalOcean.

1. Go to **Projects** in your DigitalOcean dashboard
2. Click **New Project**
3. Enter a name and description
4. Click **Create Project**

![](/img/docs/08052025-digitalocean-project.PNG)


## Adding a Domain

You can add your domain to manage DNS records in DigitalOcean.

Note: You need to already own a domain or purchase one first.

1. Go to **Networking** > **Domains**
2. Enter your domain name
3. Click **Add Domain**

![](/img/docs/08052025-digitalocean-networkign.PNG)


## Use DO Name Servers

To manage your domain’s DNS with DigitalOcean, you need to point it to DigitalOcean’s name servers. This is done by updating your domain’s settings at your registrar (where you bought your domain).

:::info 

DigitalOcean is not a domain registrar and does not sell domains.

:::

Update your registrar’s name server settings to:

```bash
ns1.digitalocean.com
ns2.digitalocean.com
ns3.digitalocean.com 
```

This process is often called “using custom name servers”. For step-by-step instructions, see [Update Your Domain’s Delegation](https://docs.digitalocean.com/products/networking/dns/getting-started/dns-registrars/#update-your-domains-delegation) 


:::info 

You can change your domain’s custom nameservers at the registrar as many times as you want. There’s no hard limit from registrars like Namecheap, GoDaddy, etc.

:::