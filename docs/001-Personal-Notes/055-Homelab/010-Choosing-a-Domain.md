---
title: "Choosing a Domain"
description: "Choosing a Domain"
sidebar_position: 10
last_update:
  date: 5/5/2024
---


## Choosing a Registrar

Before buying a domain, you need to decide where to register it. A registrar is the company where you purchase and renew your domain name.

Some popular registrars include:

- [Namecheap](#)
- [Porkbun](#)
- [Cloudflare](#)
- [Name.com](#)
- [GoDaddy](#)
- [Vercel DNS](#)

Note: GoDaddy has received some negative feedback from users.

For my own use, I’ve chosen:

- Namecheap
- Porkbun
- Name.com



## Choosing your Domain 

After picking a registrar, choose the domain name you want. Prices vary by registrar and by TLD (e.g., `.com`, `.org`).

Examples:

```bash
myrandomdomain.com
myrandomdomain.org
myrandomdomain.net
```

You can use the `whois` command before searching on a registrar’s website to avoid price-hike issues.

Example:

```bash
whois myrandomdomain.com
```

**If registered**, you’ll see ownership details. 


```bash
The Registry database contains ONLY .COM, .NET, .EDU domains and
Registrars.
Domain Name: myrandomdomain.com
Registry Domain ID: 2720917821_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.squarespace.domains
......
Updated Date: 2023-08-11T08:22:16.499930Z
Creation Date: 2021-08-26T05:48:09Z
Registrar Registration Expiration Date: 2024-08-26T05:48:09Z
......
Registry Registrant ID:
Registrant Name: REDACTED FOR PRIVACY
Registrant Organization:
Registrant Street: REDACTED FOR PRIVACY
Registrant City: REDACTED FOR PRIVACY
......
```

**If available**, you’ll see something like:

```bash
No match for domain "JOEDEN.CC".
```


:::info 

**Tip:** Searching on some registrar sites may cause them to reserve the name and increase the price. Checking via `whois` first is safer.

:::


Next, check the domain price at different registrars and compare. You might find the same name with different TLDs. Also, compare costs for 1-year versus 3-year registration terms.


## Choosing the Term 

When registering, you can choose how many years to buy upfront. Common options:

- 1 year
- 2 years
- 3 years
- 5 years
- 10 years

#### Considerations

- **Cost**

  - Longer terms usually cost the same per year, but protect against price increases.
  - Some registrars offer first-year promos but revert to normal rates afterward.

- **Renewal price risk**

  - Renewal prices can change anytime. Buying for multiple years can lock in the current price.

- **Flexibility**

  - Shorter terms are better if you may transfer or drop the domain soon.
  - Transfers carry over remaining term anyway.

- **Security & stability**

  - Important domains (brands, businesses) → register for 5–10 years to avoid accidental expiration.


#### Recommendation

- Labs/testing → 1 year for flexibility.
- Personal projects → 2–3 years for balance.
- Business-critical → 5–10 years with auto-renew enabled.



## Domain TLDs

The TLD (Top-Level Domain) is the last part of the domain name. It indicates the type of organization or purpose of the domain.

Example:

```bash
www.example.net
```

Here, `.net` is the TLD, and `www` is the subdomain.

Common TLDs:

```bash
.com
.org
.io
.net
.co
.dev
```

Other TLDs:

```bash
.cars
.xyz
.shop
.tech
.store
.online
```

Some TLDs are on the **HSTS preload list**, meaning browsers always force HTTPS for them.

```bash
.app 
.dev 
.foo 
.google
```

This means these domains are built into browsers to always use HTTPS. The browser automatically changes any request to use HTTPS before contacting the server

Example: If you try to type `http://joeden.app` manually, the browser will:

- Automatically change it to `https://joeden.app`
- Refuse to connect if there is no HTTPS endpoint with a valid certificate


### Should I Get a Domain on the HSTS Preload List?

Yes, definitely. Domains on the HSTS preload list ensure your site always uses secure HTTPS connections. This adds an extra layer of protection and trust for your visitors. This helps prevent attacks that try to downgrade security and keeps data safe.

**Pros**

- Guarantees HTTPS for extra security.

**Cons**

- Not suitable for HTTP-only labs or testing.

**Browsers that enforce this:** 

- Chrome
- Firefox
- Edge
- Safari
- Brave
- Opera
- Other Chromium-based browsers.



### Can You Bypass HTTPS Enforcement?

Only in very specific test setups, and it’s not safe or reliable for real use. Here are some options and their limits:

1. **Build a custom browser**

   - Compile Chromium or Firefox without HSTS preload.
   - Not practical or safe for most users.

2. **Access by IP instead of domain**

   - Only works if you control the server.
   - Won’t work with `.app` because browsers apply HSTS to the domain, not the IP.

3. **Use proxy tools or browser flags (advanced)**

   - For example, `--disable-hsts` in Chromium disables HSTS completely (very risky).
   - Many browsers ignore these flags for `.app` and similar domains.

4. **Use a domain not on the HSTS preload list**

   - Much safer and easier for testing HTTP.
   - Good options: `.test`, `.local`, `.xyz`, `.site`, `.dev.local`.

There is **no safe or supported way** to bypass HTTPS for HSTS-preloaded domains (like `.app`). Even dev tools block HTTP requests before they’re sent.

If you need to test HTTP, use a non-HSTS domain like `.xyz`.


### When `.app` Domains Are NOT Suitable for Labs

1. **Legacy cybersecurity / hacking labs**

   - Testing plain HTTP attacks (e.g., MITM, header tweaks).
   - CTF challenges using unencrypted protocols.
   - Vulnerability scans without HTTPS interception.

2. **Network protocol / IoT labs**

   - Testing legacy REST APIs or devices that only support HTTP.
   - Capturing or simulating HTTP-only traffic.

3. **AI / ML model serving labs**

   - APIs or models without native HTTPS support.
   - Early prototypes without TLS configured.

4. **Cloud and DevOps labs**

   - Testing plain HTTP microservices or APIs.
   - CI/CD pipelines with HTTP-only endpoints.
   - Kubernetes or Traefik demos showing HTTP vs HTTPS.

5. **Linux / Web development labs**

   - Teaching basic HTTP server setup without SSL.
   - Local HTTP testing environments.
   - Docker or containers without HTTPS certificates.


**Why `.app` Doesn’t Work Here**

- Browsers force HTTPS, blocking plain HTTP tests.
- Let’s Encrypt HTTP validation still works, but users can’t access the site via HTTP.
- Tools that don’t support HTTPS or need HTTP-only access won’t work well.

**Solution**

Use TLDs **not on the HSTS preload list**, such as:

- `.co`
- `.site`
- `.test`
- `.local`

These let you freely use and test plain HTTP without browser blocks.




## Buying the Domain Name 


1. Go to the registrar's website.
2. Search for your desired domain name.
3. If available, add it to your cart.
4. Proceed to checkout and provide the necessary information. 
5. Complete the payment process.
6. Get the confirmation email with the details of your purchase.

For more information, please see [Buying a Domain.](/docs/001-Personal-Notes/055-Homelab/011-Buying-a-Domain.md)


## Manage DNS in Cloudflare  

Cloudflare can manage your DNS, security, and performance features even if your domain is registered somewhere else.

For more inforrmation, please see [Cloudflare.](/docs/001-Personal-Notes/055-Homelab/020-Cloudflare.md)
