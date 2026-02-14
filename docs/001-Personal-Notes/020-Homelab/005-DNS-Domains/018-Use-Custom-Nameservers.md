---
title: "Use Custom Nameservers"
description: "Use Custom Nameservers"
sidebar_position: 18
last_update:
  date: 5/5/2024
---


## Overview

When you buy a domain, your registrar lets you choose where its DNS is hosted. To use another DNS provider, simply update the nameservers at your registrar to match the new provider’s.

The steps are similar across most registrars. DigitalOcean provides [detailed guides for many registrars](https://docs.digitalocean.com/products/networking/dns/getting-started/dns-registrars/#update-your-domains-delegation).


## How Often You Can Change 

You can technically change your nameservers as often as you like, but there are practical limits:

- **Propagation time** - Changes can take minutes to up to 48 hours to be seen everywhere
- **Possible downtime** - Some users may reach the old provider, others the new one, during propagation
- **Registrar delays** - Some registrars take a few minutes before pushing changes to the root DNS

For lab work, it’s best to:

- Change them no more than once per day
- Use short TTLs (around 300 seconds) so DNS record changes take effect faster


## Multiple Providers 

If you switch between providers often, set up everything ahead of time to reduce downtime.

**Preparation**

- Add your domain to providers you’ll use (e.g., DigitalOcean, Cloudflare, Route 53)
- Create the same records (A, CNAME, etc.) in each provider before switching
- Set TTL to 300 seconds in all providers for faster updates

**Switching at Your Registrar**

1. Log in to your registrar (e.g., Namecheap)

2. Go to **Domain List → Manage → Nameservers**

3. Select **Custom DNS** and enter the target provider’s nameservers:

    - DigitalOcean

        ```
        ns1.digitalocean.com
        ns2.digitalocean.com
        ns3.digitalocean.com
        ```

    - Cloudflare *(unique per domain)*

        ```
        alice.ns.cloudflare.com
        bob.ns.cloudflare.com
        ```

    - Route 53 *(unique per hosted zone)*

        ```
        ns-123.awsdns-45.com
        ns-678.awsdns-90.org
        ns-234.awsdns-56.net
        ns-345.awsdns-78.co.uk
        ```

4. Save changes, propagation begins immediately


## Propagation and Downtime

With TTL set to 300 seconds, changes inside the DNS provider update quickly, but nameserver changes still depend on TLD root servers and can take hours to a day.

**To monitor changes:**

```bash
dig NS yourdomain.com
dig A yourdomain.com
```

Or use [whatsmydns.net](https://www.whatsmydns.net).

**To reduce downtime:**

- Stage all DNS records in the next provider before switching
- Temporarily run services on both providers during propagation

For private labs, skip global propagation and update `/etc/hosts` locally:

```
203.0.113.10  yourdomain.com
```

## Bypass DNS Delays via `hosts` file 

Nameserver changes can take up to 48 hours to update worldwide. For private lab testing, you can skip this wait by adding your domain and Docker server’s IP directly to your computer’s /etc/hosts file.

This forces your computer to resolve the domain immediately to your lab server.

1. **Find Your Server’s Public IP**

    If it’s a **cloud VM** (DigitalOcean droplet, AWS EC2, etc.):

    ```bash
    curl ifconfig.me
    ```

    or

    ```bash
    dig +short myip.opendns.com @resolver1.opendns.com
    ```

    If it’s your **home lab** with port forwarding, use your router’s **WAN IP** (check at [https://whatismyip.com](https://whatismyip.com)).


2. **Edit `/etc/hosts`**

    On your **local machine** (not the server), open `/etc/hosts` as root:

    ```bash
    sudo vi /etc/hosts
    ```

    Add a line mapping your domain to the server’s public IP:

    ```
    <your_public_IP>  yourdomain.com
    ```

    Example:

    ```
    192.0.2.55  example.com
    ```

    <!-- If your Traefik lab uses multiple domains/subdomains, add them too: -->

    If you need multiple subdomains:
    
    ```
    192.0.2.55  yourdomain.com
    192.0.2.55  test.yourdomain.com
    ```


3. **Save & Test**

    After saving the file:

    ```bash
    ping yourdomain.com
    ```

    You should see it resolve directly to your server’s IP, **even if DNS hasn’t updated globally**.

    In your browser, go to:

    ```
    http://yourdomain.com
    ```

    or for HTTPS labs:

    ```
    https://yourdomain.com
    ```


**Important Notes**

- `/etc/hosts` only affects **your machine**, other devices won’t see this mapping.
- Remove or update these entries later to avoid confusion when switching DNS providers.
