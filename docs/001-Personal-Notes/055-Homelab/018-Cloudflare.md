---
title: "Cloudflare"
description: "Cloudflare"
sidebar_position: 18
last_update:
  date: 5/5/2024
---


## Manage DNS in Cloudflare

Cloudflare can handle your domain’s DNS, security, and performance features even if your domain is registered elsewhere.

1. **Buy the domain**

    - Purchase the domain from a registrar (e.g., Namecheap).
    - The registrar is just the place you bought and renew your domain.

2. **Point it to Cloudflare**

    - Sign up for Cloudflare and add your domain.
    - Cloudflare gives you two nameservers (e.g., `ns1.cloudflare.com`, `ns2.cloudflare.com`).
    - In your registrar dashboard, replace your domain’s current nameservers with the Cloudflare ones.

3. **Manage DNS in Cloudflare**

    - After nameservers update (minutes to 24h), Cloudflare becomes your DNS manager.
    - The registrar only handles domain ownership; DNS changes are done in Cloudflare.


#### If using a different registrar (e.g., Porkbun)

- Keep the domain with your current registrar, no transfer needed.
- Change the domain’s nameservers there to the Cloudflare ones.
- Once updated, Cloudflare becomes the authoritative DNS provider.

#### What you can manage in Cloudflare

- DNS records: A, CNAME, MX, TXT, etc.
- SSL certificates: Free HTTPS provided automatically.
- Security: Firewall, WAF, rate limiting, bot management.
- Performance: CDN, caching, image optimization.

#### Important notes

- The registrar still manages renewal and contact details.
- Cloudflare handles DNS and related services.
- This is a common setup for using Cloudflare without transferring your domain.



## How Cloudflare SSL Proxy Works

When **Cloudflare proxy (orange cloud)** is enabled, all traffic to your domain goes through Cloudflare first.

- Cloudflare gives the browser its own SSL certificate and ends HTTPS at their edge.
- It then makes a separate connection to your server, which can be:

  - **Encrypted** (Full SSL or Full SSL Strict)
  - **Unencrypted** (Flexible SSL)

## Using Self-Signed Certificates on Your Server

Cloudflare can work with self-signed certs, depending on SSL mode:

- **Full SSL** – Accepts any cert, including self-signed (no validation).
- **Full SSL Strict** – Needs a valid CA-signed cert (self-signed not allowed).
- **Flexible SSL** – Connects over HTTP (no TLS) but still serves HTTPS to browsers; may break apps expecting direct HTTPS.

Self-signed certs in your lab won’t affect what browsers see, since Cloudflare shows its own cert.

## Key Lab Considerations

If your lab must **directly control TLS certificates** (e.g., test client certs or custom certs), Cloudflare’s proxy will block that by terminating SSL before traffic reaches your server.

To keep full control:

- Disable the proxy (grey cloud in DNS) so browsers connect directly to your server.
- Use **DNS-only mode** for domains where you want to serve your own cert.

## Common Lab Scenarios

| Scenario                     | Works with Proxy?     | Notes                                                 |
| ---------------------------- | --------------------- | ----------------------------------------------------- |
| Self-signed cert on server   | Yes, in Full SSL mode | Browsers see Cloudflare cert, not the self-signed one |
| Testing custom SSL cert      | No                    | Proxy ends SSL, preventing direct cert validation     |
| Full control over SSL in lab | Use DNS-only mode     | Self-signed cert is sent directly to browsers         |
