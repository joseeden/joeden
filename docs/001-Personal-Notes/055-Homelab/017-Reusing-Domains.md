---
title: "Reusing Domains"
description: "Reusing Domains"
sidebar_position: 17
last_update:
  date: 5/5/2024
---




## Overview

You can use the same domain for your real website and for labs, as long as you keep DNS records organized.

## Using subdomains for labs

You don’t need to use the root domain for everything — subdomains are safer and easier to manage.

Examples:

- `aws-lab.randomdomainforsite.co`
- `traefik-test.randomdomainforsite.co`
- `test1.randomdomainforsite.co`

Each subdomain has its own DNS records, so changes won’t affect your main site

- You can point different subdomains to different locations (AWS, local IP, production server)
- DNS managers like Cloudflare let you add or remove records without impacting others

**Tip:** Never change the root domain’s A/AAAA/CNAME unless you want to move your main site. Many labs only require TXT records, which don’t affect your site.

**Common workflow:**

1. Buy a domain
2. Point nameservers to Cloudflare
3. Manage subdomains in Cloudflare
4. Use subdomains for all labs


## Reusing Root Domains

If a lab requires the root domain, changes will affect where your main site points — so be careful.

**If the root domain is not hosting a site**

- You can freely change root DNS records for labs
- Restore the original records when finished

**If the root domain has a live site**

- Risky, because DNS changes could break your site
- Options:

  - Temporary changes during off-hours, then restore
  - Buy a cheap second domain just for root-domain labs
  - Try a wildcard subdomain (`*.example.com`) if the lab allows

**Why some labs require the root domain**

- Certain tools (AWS Certificate Manager, Let’s Encrypt DNS-01) validate the naked domain
- Often, only TXT records are needed, so your site can stay online while doing the lab


## Practical tips for test domains

Since it’s for labs only, you can freely switch nameservers whenever needed.

- Keep records of old DNS settings in case they need to be restored.
- Expect DNS propagation delays when switching
- Sometimes it’s almost instant, sometimes you wait a few hours.

## Best practices

- Keep your main site on `www.example.com`
- Leave the root (`example.com`) free for labs
- This way, root DNS changes won’t take your main site down

