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

## DNS Caching

DNS caching is the process of temporarily storing DNS query results so future lookups for the same domain are faster.

- Stores previously resolved DNS data
- Reduces repeated network lookups
- Uses a time limit called TTL to keep data fresh

When a domain is resolved, the answer is saved in a cache on the client, server, or both. If the same domain is requested again before the cache expires, the stored data is used instead of performing the full DNS resolution process. This speeds up responses, reduces bandwidth use, and lowers server load.


<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns-caching.png)

</div>


Example on Windows:

```powershell
ipconfig /displaydns   # View DNS cache  
ipconfig /flushdns     # Clear DNS cache
```

After flushing, the cache will only contain static entries like those from the host file.

Example on Linux with `nscd`:

```bash
sudo nscd -g   # Show cache stats
sudo nscd -i hosts   # Clear DNS host cache
```

By clearing the cache, the cache count resets, and the next domain lookup will trigger a fresh DNS query.

## Negative Caching

Caching can also store failed lookups to prevent repeated failed requests, also called as **Negative caching**. Since DNS records change, cached entries expire after their TTL to avoid outdated or incorrect results.

The main point is that DNS caching improves speed and efficiency by reusing recent results, but it must expire to keep data accurate.
