---
title: "Name Registration"
description: "Name Registration"
tags: 
- Networking
- Cybersecurity
sidebar_position: 15
last_update:
  date: 10/21/2019
---


## Overview

Domain name registration is the process of reserving a unique name on the internet that points to a computer or website. This ensures that no two websites use the same domain.

- Domains provide a public identity for websites
- Registration must follow global rules to prevent conflicts
- The process is managed through a hierarchical system

The domain registration hierarchy works like this:

- **ICANN** 
  - International non-profit that manages the global domain system
  - Including generic and country code TLDs, root servers, and IP addresses

- **Regional Internet Registries (RIRs)** 
  - Five organizations that get IP ranges from ICANN
  - Allocate the IP ranges to ISPs in their regions

- **Registrars** 
  - ICANN-accredited companies that register domain names
  - Example: GoDaddy, Namecheap, and Bluehost

- **Resellers** 
  - Third-party companies that register domains through registrars, 
  - AWS Route 53, which resells through Amazon Registrar (generic TLDs)
  - AWS Route53 also resells through Gandi for all other TLDs

- **Registrants** 
  - Individuals or organizations that register domains through a registrar or reseller

This hierarchy ensures that domain names are unique, organized, and properly allocated across the internet. Every domain passes through this chain, from ICANN down to the registrant, before it becomes active.

<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns-reg-hierarchy.png)

</div>


## Name Registration Process

Domain registration is the process of claiming a unique name on the internet and linking it to your website or service.

1. Registrant chooses a domain name
2. Request is submitted to a registrar or reseller
3. Registrar checks availability 
4. Regisrtar creates a WHOIS record
5. Registry files the information 
6. Domain is added to master servers
7. This makes it publicly accessible

The WHOIS record includes details like the registrant's name, registrar contact, registration and expiration dates, and the domain's name servers. Once registered, this information ensures the domain is recognized globally.


## Choosing a Top-Level Domain (TLD)

Choosing a TLD means picking the ending of your domain, like `.com`, `.io`, or `.gov`. The right choice depends on your goals and audience.

- What type to choose? 
- Is there support for DNSSEC or privacy protection?
- Who are the target audience?

When selecting a TLD, consider your audience, security needs, privacy requirements, and the purpose of your website. 

## Choosing a Second-Level Domain

Your second-level domain is the main part of your website name. Picking the right one helps users remember and find your site.

- Use keywords related to your industry or location
- Keep it short, easy to spell, pronounce, and remember
- Avoid hyphens, numbers, or long acronyms unless necessary

After picking a name, check if it is available and affordable at a registrar like Namecheap or Porkbun. 

For example, go to Namecheap.com and search for "dnspedia.com"

You can also check its availability by running this command:

```bash
whois dnspedia.com
```

If available, you can purchase the domain and also consider registering other TLDs like `.net` or `.info` to protect your brand.

- Buy common misspellings to prevent typosquatting
- Consider security and brand protection when registering multiple variations


## Choosing a Domain Registrar

Registering a domain is like buying a car. The product is the same, but different providers offer different packages and services. 

- **Consider pricing**

  - Look at registration fees, renewal fees
  - Any extra charges such as transfers
  - Check for discounts, or bulk options
  - Check for promotions for multi-year registrations

- **Evaluate add-on services**

  - Web hosting, email hosting, SSL, or website builders
  - Consider what services you may need now or in the future

- **Check supported TLDs**

  - Not all registrars can sell every top-level domain
  - Make sure your chosen TLD is available

- **Review policies**

  - Domain transfer rules, expiration handling, and grace periods
  - Avoid registrars that might claim expired domains aggressively

- **Look at customer support**

  - 24/7 support may be important if issues arise
  - Read reviews to see other users’ experiences


:::info 

As a best practice, register your domain with one registrar but host it with another. This makes switching hosting providers easier while keeping ownership secure.

:::


## EPP Domain Status Codes

EPP (Extensible Provisioning Protocol) status codes show the current state of a domain. They help with domain management, troubleshooting, and transfers.

- Every domain has at least one status code
- Codes are split into client and server types
- They guide operations like renewals, updates, and transfers

**Client codes** are set by registrars and often appear when registering a domain or requesting changes. 

**Server codes** are set by registries and take priority over client codes because registries sit higher in the domain hierarchy. 

### Common Client Status Codes

Client codes are controlled by registrars and indicate restrictions on a domain.

| Client Status Code         | Description                                      |
| -------------------------- | ------------------------------------------------ |
| `clientHold`               | Domain is not active in DNS and will not resolve |
| `ClientTransferProhibited` | Domain cannot be moved to another registrar      |
| `clientUpdateProhibited`   | Domain cannot be updated                         |

These codes usually appear during legal disputes, unpaid domains, or deletion processes. They help ensure domains are secure from unauthorized changes.

### Common Server Status Codes

Server codes are set by registries and override client codes.

| Server Status Code         | Description                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| `ok`                       | Domain has no restrictions or pending operations                     |
| `autoRenewPeriod`          | Domain is in a grace period after expiration, automatically extended |
| `serverTransferProhibited` | Domain cannot be transferred to another registrar                    |


Server codes protect domains during legal disputes or redemption periods and ensure smooth renewal and transfer processes.

### Checking EPP Codes

You can check a domain’s EPP codes with a WHOIS lookup.

- Use any online Whois tool, like `lookup.icann.org`
- Enter the domain name
- View client and server status codes in the results

Example: Checking `google.com`:

<div class="img-center"> 

![](/img/docs/basics-dns-sample-icann-lookup.PNG)

</div>
