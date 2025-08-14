---
title: "Resource Records"
description: "Resource Records"
tags: 
- Networking
- Cybersecurity
sidebar_position: 17
last_update:
  date: 1/16/2018
---


## Overview

Resource records are the building blocks of DNS zones. They store all the necessary information for a domain or IP.

- Each record stores specific data about a domain or IP
- Examples include A records for IPv4 and AAAA records for IPv6

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


## Start of Authority (SOA) Record

The SOA record marks the start of a DNS zone and defines the primary information about that zone.

- Each zone can have only one SOA record
- It must be the first record in the zone file
- It defines the primary server and administrative contact

The SOA record ensures that DNS servers know which server is authoritative for a zone and who to contact for updates.


### SOA Record Fields

These fields define key information for managing a DNS zone, handling updates, and controlling caching.

| Field                  | Description                                                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Domain Name            | The domain this SOA record belongs to                                                                                         |
| TTL                    | Time the record is cached                                                                                                     |
| Class                  | Usually IN for Internet                                                                                                       |
| Type                   | SOA                                                                                                                           |
| Primary Name Server    | The main authoritative server for the zone                                                                                    |
| Admin Email            | Contact email of the zone administrator (without @, e.g., info.example.com means [info@example.com](mailto:info@example.com)) |
| Serial Number          | Version of the zone, incremented with each change                                                                             |
| Refresh, Retry, Expire | Controls synchronization between primary and secondary servers                                                                |
| Minimum                | TTL for negative caching                                                                                                      |



### Querying the SOA Record

You can check the SOA record using common tools:

On Windows with `nslookup`:

```bash
nslookup -type=soa example.com
```

Expected output includes primary server, admin email, serial number, and TTL values.

On Linux with `dig`:

```bash
dig -t soa example.com +short
```

Or for cleaner output:

```bash
dig -t soa example.com +short | tr -d '\n'
```

Querying the SOA record helps verify zone configuration and ensures that the primary server and administrative info are correct.
