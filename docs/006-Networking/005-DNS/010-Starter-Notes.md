---
title: "Starter Notes"
description: "Starter Notes"
tags: 
- Networking
- Cybersecurity
sidebar_position: 10
last_update:
  date: 1/16/2018
---


## Overview

The Domain Name System (DNS) converts easy-to-remember domain names (like `example.com`) into IP addresses (like `192.168.1.1`) that computers use to locate each other.

- Lets users access websites without remembering IP numbers
- Uses a distributed database to map names to addresses
- Works mainly over UDP port 53 for fast lookups

Example: Typing `www.wikipedia.org` in a browser triggers DNS to find the IP address for Wikipedia’s servers.

## How DNS Works

1. User enters a domain name in a browser.
2. Browser sends the request to a DNS resolver (usually from the ISP).
3. Resolver contacts a root DNS server to find the TLD server (e.g., `.org`).
4. TLD server points to the authoritative server for the domain.
5. Authoritative server returns the IP address.
6. Resolver sends the IP to the browser, which connects to the website.

## DNS Servers

DNS servers store records and answer queries.

- **Root servers**

  - Top of the DNS hierarchy
  - Point to TLD servers

- **TLD servers**

  - Manage top-level domains (e.g., `.com`, `.org`)
  - Point to authoritative servers

- **Authoritative servers**

  - Store DNS records for domains
  - Provide IP addresses when asked


## `dig`

The `dig` (Domain Information Groper) is used to query DNS servers and troubleshoot DNS issues. It provides detailed information about DNS queries and responses.

**Example: Runn**ing `dig wikipedia.org` will query the DNS for the domain `wikipedia.org` and return detailed information.

```shell
$ dig wikipedia.org

; <<>> DiG 9.16.1-Ubuntu <<>> wikipedia.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 62636
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;wikipedia.org.               IN      A

;; ANSWER SECTION:
wikipedia.org.        3600    IN      A       208.80.154.224

;; Query time: 22 msec
;; SERVER: 192.168.1.1#53(192.168.1.1)
;; WHEN: Tue Aug 27 12:34:56 UTC 2024
;; MSG SIZE  rcvd: 65
```

**Explanation:**

- **Header**: Displays general information like query type and status
- **Question Section**: Shows the query made (e.g., `wikipedia.org` for an A record)
- **Answer Section**: Provides the IP address associated with the domain
- **Query Time**: The time it took to receive a response
- **Server**: The DNS server that responded to the query


## Three Main Functions of DNS

- **Name resolution**

  - Translates domain names into IP addresses
  - Enables devices to locate each other
  - Most common use of DNS

- **Namespace**

  - Organizes how domain names are structured
  - Defines valid formats and characters
  - Guides how names are interpreted

- **Name registration**

  - Assigns unique domain names
  - Prevents duplication of names
  - Managed by registration authorities
