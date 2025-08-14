---
title: "Name Resolution"
description: "Name Resolution"
tags: 
- Networking
- Cybersecurity
sidebar_position: 13
last_update:
  date: 1/16/2018
---


## DNS Name Resolution Process

DNS name resolution is the process of finding the IP address for a given domain name.

1. User enters a domain name in a browser.
2. The system checks the operating system's local DNS cache and host table
3. If no record is found, browser sends the request to a DNS resolver.
4. The DNS resolver first checks its DNS cache
5. The DNS resolver also checks its root hints file
6. If no record is found, resolver contacts a root DNS server.
7. DNS resolver selects the name servers and sends an iterative query.
8. TLD server returns the authoritative server for the domain.
9. DNS resolvers sends an iterative query to the authoritative server
10. Authoritative server returns the IP address of the domain
11. Resolver caches the answer, then sends the IP to the client.
12. Client caches the data and passes data to the browser.
13. The browser may put the result name in its own cache too.


## Local Name Resolution

Local name resolution allows a computer to resolve hostnames to IP addresses without using external DNS servers. It relies on a simple file called the hosts file.

- Works entirely on the local machine
- Uses a hosts file with static IP-to-name mappings
- No root or TLD servers are involved

In Windows, the `hosts` file is located at

```bash
C:\Windows\System32\drivers\etc\hosts
```

In Linux: 

```bash
/etc/hosts 
```

Each line maps an IP address to one or more hostnames. Comments start with `#` and blank lines are ignored.

Example: 

```text
192.168.1.1   home-router
192.168.1.6   home-printer printer
127.0.0.1     localhost
```

This setup allows you to reach devices by name instead of typing IP addresses. For example:

```bash
ping home-router
```

This resolves to `192.168.1.1` and works immediately without restarting the system.

**Common Use Cases**

- Small local networks without internet
- Speed up access to frequently used sites by overriding DNS
- Test websites or redirect domains for development
- Basic URL filtering, e.g., mapping a site to `127.0.0.1`
- Ensure critical hosts are accessible when DNS is unavailable

**Best Practices**

- Avoid unnecessary entries to keep lookups fast
- Multiple aliases can share a single IP
- Organize mappings with comments by purpose
- Keep a backup of the hosts file before editing
- Restrict write access to prevent unauthorized changes


## DNS Resolvers

DNS resolvers act as the middle layer between a client and the DNS system, helping translate domain names into IP addresses.

- Receive queries from clients for domain resolution
- Check their cache to answer directly if possible
- Contact root servers and follow the resolution path if needed
- Return the final IP address to the client

Resolvers know about root servers through a **root hints file**, which contains the IP addresses of all root servers. This allows them to start the resolution process for any domain.

<div class="img-center"> 

![](/img/docs/dns_record_request_sequence_recursive_resolver.png)

</div>


**Example:**

On Windows, you can see your DNS resolver with:

```bash
ipconfig /all
```

On Linux, check the resolver with:

```bash
cat /etc/resolv.conf
```

This shows the IP addresses of resolvers like your router or public DNS services such as Google (8.8.8.8, 8.8.4.4) or Cloudflare (1.1.1.1).


**Notes**

- Resolvers can be local (like a router) or public (like Google DNS)
- Google DNS resolver is `8.8.8.8` and `8.8.4.4`
- Some support features like **EDNS0** or **negative caching**
- Resolver selection methods may vary: lowest latency or random choice


## Iterative Resolution

Iterative resolution is a DNS process where the client does most of the work to find an answer.

- Server checks its own data for the answer
- If not found, server sends a referral with other name server addresses
- Client chooses the next server to query
- Process repeats until the authoritative server responds

In this method, each server either gives the answer or points the client to another server. The client keeps sending new queries until it reaches the server that holds the correct information.

<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns-iterative.png)

</div>

This approach works because the client takes responsibility for contacting each server in turn, following the chain until the final answer is found.


## Recursive Resolution

Recursive resolution is a DNS process where the server does all the work to get the answer for the client.

- Client sends a single query to the server
- Server checks its own data first
- If not found, server queries other DNS servers on behalf of the client
- Process continues until the final answer is found and returned

In this method, the client only sends one request. The server then takes over, following the DNS chain from the root down to the authoritative server. The client simply waits for the complete answer without handling referrals.

<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns-recursive.png)

</div>

The key idea is that in recursive resolution, **the server is responsible for finding** and delivering the requested DNS information.



## Reverse Name Resolution (rDNS)

Reverse name resolution is the process of finding the domain name that belongs to a given IP address.

- Used to find a domain name from an IP address
- Works with a special `in-addr.arpa` domain for IPv4
- Often used in troubleshooting, spam filtering, and logging

Reverse resolution uses a parallel hierarchy to the normal DNS name system, but arranged for IP addresses.

The IP octets are reversed in the lookup because DNS works from the least specific part to the most specific part, while IP addresses are structured in the opposite way.

Example on Linux using `dig`:

```bash
dig -x 69.171.250.35 +noall +answer
```

Expected result:

```
35.250.171.69.in-addr.arpa.  3600  IN  PTR  example-domain.com.
```

Example on Windows using `ping`:

```bash
ping -a 69.171.250.35
```

Expected result:

```
Pinging example-domain.com [69.171.250.35] with 32 bytes of data:
```

Reverse lookups are not guaranteed to work because they are not required for the internet to function. Some IP addresses may not have reverse DNS entries. However, when they do exist, they can be very helpful for identifying hosts, improving email security, and making logs more readable.
