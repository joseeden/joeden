---
title: "DNS Storage"
description: "DNS Storage"
tags: 
- Networking
- Cybersecurity
sidebar_position: 16
last_update:
  date: 1/19/2018
---


## Overview

DNS servers need a way to store information so they can respond to queries. This data is organized in zones and structured as resource records.

## DNS Zones

DNS servers organize their data into zones so they can respond to queries efficiently.

- **Forward lookup zones** map domain names to IP addresses
- **Reverse lookup zones** map IP addresses back to domain names

Zones allow DNS to handle both normal and reverse queries consistently across the network.


## Resource Records (RRs)

Resource records are the building blocks of DNS zones. They store all the necessary information for a domain or IP.

- Each record stores specific data about a domain or IP
- Examples include A records for IPv4 and AAAA records for IPv6

Common Record Fields/Format:

| Field         | Description                                 |
| ------------- | ------------------------------------------- |
| Name          | The domain or IP the record refers to       |
| Type          | Specifies the record type (e.g., A=1, NS=2) |
| Class         | Usually `IN` for Internet                   |
| TTL           | Time the record stays cached                |
| Data Length   | Size of the resource data                   |
| Resource Data | The actual information stored               |

:::info 

Zones and resource records are the backbone of DNS, which allows resolvers to retrieve both forward and reverse mappings efficiently. 

:::


## Resource Record Types

DNS uses different types of resource records (RRs) to store information about domains and IP addresses. Each type serves a specific purpose in resolving names or providing additional data.


| Record Type | Purpose                                              | Example                                                 |
| ----------- | ---------------------------------------------------- | ------------------------------------------------------- |
| A           | Maps a domain to an IPv4 address                     | example.com → 93.184.216.34                             |
| AAAA        | Maps a domain to an IPv6 address                     | example.com → 2606:2800:220:1:248:1893:25c8:1946        |
| CNAME       | Aliases one domain to another                        | [www.example.com](http://www.example.com) → example.com |
| MX          | Mail exchange server for email                       | example.com → mail.example.com                          |
| NS          | Authoritative name server for the domain             | example.com → ns1.example.net                           |
| PTR         | Maps an IP address back to a domain (reverse lookup) | 93.184.216.34 → example.com                             |
| TXT         | Stores arbitrary text data                           | SPF record for email verification                       |


For more information, please see [Resource Records.](/docs/006-Networking/005-DNS/017-Resource-Records.md)