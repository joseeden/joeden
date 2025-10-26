---
title: "DNS Tree"
description: "DNS Tree"
tags: 
- Networking
- Cybersecurity
sidebar_position: 11
last_update:
  date: 1/19/2018
---

## Centralized Systems

A single database for all domain names would create major challenges.

- Administrative Overhead
- Poor Scalability
- Uniqueness Issues

These limitations led DNS to adopt a distributed system, allowing better management and global uniqueness.

## Hierarchical 

DNS organizes names like a tree, with multiple levels representing different domains and subdomains.

- Distributed collection of databases forms a tree
- Each domain name is a path in this tree
- Organizations manage their own domains
- Subdomains can be delegated to others

Domains can also can be divided and delegated to improve management.

- Each domain can be split into subdomains
- Delegated organizations can modify data freely
- This allows scalability and easier administration

Delegation makes DNS flexible, scalable, and ensures uniqueness across the global namespace.

## DNS Tree Structure

The DNS system has multiple levels of servers that maintain the hierarchy.

- **Root Name Servers**

  - At the top of the tree
  - Direct queries to appropriate top-level domain servers

- **Top-Level Domain Servers**

  - Handle domains like `.com`, `.org`, `.net`
  - Forward requests to authoritative servers

- **Authoritative Name Servers**

  - Hold the actual data for specific domains

<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns-hierarchy-1.png)

</div>


## Root Servers

Root servers is the first point of contact of any DNS reqeust. They handle the initial  queries and guide them to the correct top-level domain server.

- Sit at the top of the DNS hierarchy
- Receive the first DNS request from a user
- Refer the query to the correct top-level domain server

When a user looks up a domain name, the root server sends the query to the TLD server based on the domain extension. For example, a query for `example.com` is directed to a `.com` TLD server.


:::info 

There are 13 root servers named from A to M, but each has many copies worldwide to handle traffic.

Details about each server are available at [root-servers.org](https://root-servers.org)

:::

## Top-Level Domain Name Servers (TLD)

TLD name servers get referrals from root servers and help move DNS queries closer to the site’s server.

- Provide the next level of authority
- Forward referrals to the authoritative server
- Only know what is needed to guide the query
- Keep each query moving toward resolution

There are several types of top-level domains that indicate the type or location of an organization.

- **Generic TLDs (gTLDs)**

  - Show the type of organization or industry
  - Examples: `.com`, `.edu`, `.gov`, `.org`, `.info`

- **Country Code TLDs (ccTLDs)**

  - Represent specific countries
  - Examples: `.gr` for Greece, `.jp` for Japan, `.pl` for Poland

- **Organizational Subdomains in ccTLDs**

  - Countries can create subdomains for companies
  - Examples: `co.uk` for UK companies, `com.au` for Australian companies


<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns-tlds.png)

</div>


## Authoritative Name Servers

Authoritative name servers provide the final answer in the DNS process. They hold the IP addresses for specific domains and complete the query.

- Hold the DNS records for a domain
- Provide the IP address for requested sites
- Complete the resolution without further referrals

After referrals from root and TLD servers, the authoritative server gives the final response, allowing users to reach the website.

:::info 

Authority in DNS means control over a domain and responsibility to answer queries about it. 

:::