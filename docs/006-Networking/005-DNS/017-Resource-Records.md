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


## SOA Record (Start of Authority)

The SOA record marks the start of a DNS zone and defines the primary information about that zone.

- Only one SOA record per zone
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

- On Windows with `nslookup`:

    ```bash
    nslookup -type=soa example.com
    ```

    Expected output includes primary server, admin email, serial number, and TTL values.

    ```bash
    Server:  dlinkrouter.local
    Address:  192.168.0.1

    Non-authoritative answer:
    example.com
            primary name server = ns.icann.org       
            responsible mail addr = noc.dns.icann.org
            serial  = 2017011748
            refresh = 7200 (2 hours)
            retry   = 3600 (1 hour)
            expire  = 1209600 (14 days)
            default TTL = 3600 (1 hour) 
    ```

- On Linux with `dig`:

    ```bash
    dig -t soa example.com +short
    ```

    Or for cleaner output:

    ```bash
    dig -t soa example.com +short | tr " " '\n'
    ```

    Sample output:

    ```bash
    ns.icann.org.
    noc.dns.icann.org.
    2017011748
    7200
    3600
    1209600
    3600
    ```


## NS Records

NS records identify the authoritative name servers for a domain, which makes it accessible on the internet.

- Every zone should at least two NS records for redundancy
- NS records point to main servers holding the DNS information
- Name servers are usually on separate networks for better reliability

If a domain (such as `example.com`) doesn't have any DNS records configured in its zone:

1. There will be no references to its name servers
2. The `.com` TLD server cannot return a list of name servers for `example.com`
3. DNS queries will fail to find the servers
4. Users will be unable to access the domain

This is why **every zone should at least have to NS records for redundancy**, with each one pointing to a different name server. This ensures that if one name server goes down, DNS queries can still be resolved by another.

When you register a domain, most DNS-as-a-service providers automatically assign three to four name servers, which are typically listed in a format like this:

```bash
ns1.digitalocean.com
ns2.digitalocean.com
ns3.digitalocean.com
```

### NS Record Syntax

The format is simple:

```bash
example.com. 3600 IN NS ns1.example.com.
example.com. 3600 IN NS ns2.example.com. 
```

Where: 

- `example.com.` is the domain
- `3600` is the TTL (time to live)
- `IN` is the class (Internet)
- `NS` is the record type
- `ns1.example.com.` is the hostname of the name server

### Querying NS Records

- On Windows:

    ```bash
    nslookup -type=ns securityzone.com
    ```

    Expected output:

    ```bash
    Server:  resolver.local
    Address:  192.168.1.1

    Non-authoritative answer:
    securityzone.com  nameserver = ns1.securityzone.com
    securityzone.com  nameserver = ns2.securityzone.com
    ```

- On Linux:

    ```bash
    dig -t ns securityzone.com
    ```

    Expected output:

    ```bash
    ;; ANSWER SECTION:
    securityzone.com.  3600  IN  NS  ns1.securityzone.com.
    securityzone.com.  3600  IN  NS  ns2.securityzone.com.
    ```

## Address Records

Address records connect domain names to their IP addresses so users can reach the correct server.

- `A` records link domains to IPv4 addresses
- `AAAA` records link domains to IPv6 addresses

It is possible for both an `A` record and an `AAAA` record to point to the same domasin in cases where dual stack is required.


### A Record 

An `A` record holds a domain name and its IPv4 address. 

```bash
example.com. 3600 IN A 192.0.2.10
```

### AAAA Record 

An AAAA record holds a domain name and its IPv6 address, which is larger (128 bits vs 32 bits). 

```bash
example.com. 3600 IN AAAA 2001:db8::10
```

The reason why its represented as `AAAA` record is to signify that the value stored in it is four times as big as the one stored in the `A` record.





### Querying Address Records

- On Windows:

    ```bash
    nslookup -type=A example.com
    nslookup -type=AAAA example.com
    ```

    Expected output (example):

    ```bash
    Name:    example.com
    Address: 192.0.2.10

    Name:    example.com
    Address: 2001:db8::10
    ```

- On Linux:

    ```bash
    dig -t A example.com +short
    dig -t AAAA example.com +short
    ```

    Expected output (example):

    ```bash
    192.0.2.10
    2001:db8::10
    ```

## Pointer Records

Pointer records map an IP address back to its domain name, allowing reverse lookups.

- Used for reverse DNS lookups
- Works with both IPv4 and IPv6 addresses
- Found in reverse lookup zones


### PTR Records Format

A PTR record contains the following in this order:

- IP address in reverse format
- A special reverse DNS domain
- Record class
- Record type (PTR)
- Fully qualified domain name it points to. 

For IPv4, the reverse domain ends with `.in-addr.arpa`:

```text
8.1.1.10.in-addr.arpa. IN PTR server.example.net.
```

For IPv6, it ends with `.ip6.arpa`.

```text
0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa. IN PTR server.example.net.
```

### Querying PTR Records

- On Windows:

    ```bash
    nslookup -type=PTR 10.1.1.8
    nslookup 10.1.1.8
    ```

    Expected output:

    ```text
    Name:    server.example.net
    Address: 10.1.1.8
    ```

    To query IPv6 records:

    ```bash
    nslookup -type=ptr 2600:: 
    nslookup 2600:: 
    ```

- On Linux:

    ```bash
    dig -x 10.1.1.8 +short
    ```

    Expected output:

    ```text
    server.example.net
    ```

    To query IPv6 records:

    ```bash
    dig -x 2600:: 
    dig -x 2600:: +short +answer
    ```

## CNAME Records

CNAME records, or Canonical Name records, map one domain name (alias) to another domain name (the real or canonical name).

- Used to point an alias to another domain
- Common for subdomains, redirects, and domain verification
- Must point to another domain, never to an IP address

A CNAME record contains:

- Alias
- Record class (usually `IN`)
- Record type (`CNAME`)
- TTL value,
- Canonical name it points to. 

They are useful for making one domain behave exactly like another.


### Querying CNAME Records

- On Windows:

    ```bash
    nslookup -type=CNAME ns1.example.net
    ```

    Expected output:

    ```text
    ns1.example.net   canonical name = nameserver.example.net
    ```

- On Linux:

    ```bash
    dig -t CNAME ns1.example.net +short
    ```

    Expected output:

    ```text
    nameserver.example.net
    ```

### Common Uses

In addition to proving domain ownership during service setup, CNAMEs has other use cases:

- Pointing subdomains to main domains

  ```bash
  `www.example.com` → `example.com`
  ```

- Map subdomains to their main domain

  ```bash
  `blog.example.net` → `example.net`
  ```

- Redirect multiple TLDs to one main domain

  ```bash
  `mydomain.com` and `mydomain.co` → `mydomain.net`
  ```
  

### Restrictions

CNAME records make domain management flexible, but they work best when kept simple and direct.

- Cannot point to an IP address
- Cannot point to NS or MX records
- Cannot coexist with another record of the same name

Chaining CNAMEs (one CNAME pointing to another) is possible but discouraged due to slower lookups.

