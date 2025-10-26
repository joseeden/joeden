---
title: "Domain Name Format"
description: "Domain Name Format"
tags: 
- Networking
- Cybersecurity
sidebar_position: 11
last_update:
  date: 1/19/2018
---



## Domain Name Format 

Domain names are interpreted by DNS from **right to left**, unlike how we type them in a browser (left to right).

For example, we type the address from left to right, starting with `www`:

```bash
## Typed from left to right -----> 
www.example.com
```

However, DNS resolves it starting from the rightmost part (`com`) and works its way left:

```bash
## <------ Resolved from "com", then to "example"...
www.example.com
```


## DNS Hierarchy 

DNS is organized in a hierarchical structure:

<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns-hierarchy-1.png)

</div>

In practice, we usually interact with domain names through URLs, like:

```bash
https://www.example.com
```


## Components of a Domain Name


<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns.png)

</div>


1. **Root**

   - A special dot (`.`) at the rightmost position.
   - Cannot be replaced; the dot is unique.
   - This is the top of the hierarchy 

      :::info 

      The trailing dot in a domain name, representing the root, is often invisible because it's implied and not necessary for most user applications.

      This is the reason why we write:

      ```bash
      www.cats.example.com  
      ```

      and not:

      ```bash
      www.cat.example.com. 
      ```

2. **Top-Level Domain (TLD)**

   - Comes after the root (e.g., `com`, `net`, `org`, `io`).
   - Indicates the type of domain (commercial, organization, etc.).

3. **Second-Level Domain (SLD)**

   - Example: The `example` in `www.example.com`.
   - SLD + TLD form the **zone apex**
   - Also called the **naked** or **apex domain**.

4. **Third-Level Domain**

   - Usually `www`, but can be any label like `bbb` or `abc`.
   - Primarily a naming convention, not required.

## Labels and Subdomains

The components of a domain name are called **labels**, with the **root label** being **null**. Each label is a **subdomain** of its parent:

For example:

```bash
cats.example.com 
```

- `cats` is a subdomain of `example.com`
- `example` is a subdomain of `com`

## FQDN and PQDN

The **FQDN (Fully Qualified Domain Name)** is the complete domain from root to specific subdomain.
The **PQDN (Partially Qualified Domain Name)** starts with a hostname but may not include the root.

:::info 

FQDN is not equal to the URL, as URLs include protocol and path (e.g., `https://www.example.com/path`).

:::


<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns-long-dns.png)

</div>



## Domain Name Syntax Rules

- **Labels**
  - Max 63 characters
  - Can use letters (A-Z), digits (0-9), and hyphen.
  - Cannot start or end with a hyphen.

- **Domains**
  - TLDs cannot be all numeric.
  - Unlimited number of subdomains allowed.
  - Entire domain name: max 255 characters, including dots.
