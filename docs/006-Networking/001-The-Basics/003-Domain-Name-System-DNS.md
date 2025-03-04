---
title: "Domain Name System (DNS)"
description: "Domain Name System (DNS)"
tags: [Networking,Cybersecurity]
sidebar_position: 3
last_update:
  date: 1/16/2019
---


## Overview

The Domain Name System (DNS) is a hierarchical system that translates human-readable domain names (like `example.com`) into IP addresses (like `192.168.1.1`) that computers use to identify each other on a network.

- DNS makes it easier for users to access websites without remembering numerical IP addresses
- It consists of a distributed database that is queried to resolve domain names into IP addresses
- DNS functions over UDP port 53, allowing quick and efficient queries

As an example, when you type `www.wikipedia.org` into your browser, DNS translates this domain name into the IP address needed to reach Wikipedia's servers.

## How DNS Works

1. A user enters a domain name (e.g., `www.wikipedia.org`) into their web browser.
2. The browser sends a request to the DNS resolver, often provided by the user's ISP.
3. The DNS resolver queries the root DNS server to find the top-level domain (TLD) server (e.g., `.org`).
4. The TLD server directs the resolver to the authoritative DNS server for `wikipedia.org`.
5. The authoritative DNS server provides the IP address for `www.wikipedia.org`.
6. The resolver returns the IP address to the browser, which then connects to the website.

## DNS Servers

DNS servers are critical components of the DNS infrastructure, responsible for storing domain name records and resolving queries.

- **Root Servers:** The top level of the DNS hierarchy, directing queries to the appropriate TLD servers
- **TLD Servers:** Responsible for handling top-level domains (like `.com`, `.org`) and directing queries to authoritative servers
- **Authoritative Servers:** Store the actual DNS records for a domain, providing the IP addresses when queried

## `dig`

The `dig` (Domain Information Groper) command is a tool used to query DNS servers and troubleshoot DNS issues. It provides detailed information about DNS queries and responses.

**Example:** Running `dig wikipedia.org` will query the DNS for the domain `wikipedia.org` and return detailed information.

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

Explanation:

- Header: Displays general information like query type and status
- Question Section: Shows the query made (e.g., `wikipedia.org` for an A record)
- Answer Section: Provides the IP address associated with the domain
- Query Time: The time it took to receive a response
- Server: The DNS server that responded to the query