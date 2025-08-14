---
title: "DNS Caching"
description: "DNS Caching"
tags: 
- Networking
- Cybersecurity
sidebar_position: 14
last_update:
  date: 1/16/2018
---


## Overview

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
```

Sample output:

```bash
hosts cache:

    yes  cache is enabled
    yes  cache is persistent
    yes  cache is shared
    211  suggested size
  216064  total data pool size
    120  used data pool size
    3600  seconds time to live for positive entries
      20  seconds time to live for negative entries
      0  cache hits on positive entries
      0  cache hits on negative entries
      1  cache misses on positive entries
      0  cache misses on negative entries
      0% cache hit rate
      1  current number of cached values
      1  maximum number of cached values
      0  maximum chain length searched
      0  number of delays on rdlock
      0  number of delays on wrlock
      0  memory allocations failed
    yes  check /etc/hosts for changes 
```

We can also check cached domains directly:

```bash
sudo strings /var/cache/nscd/hosts 
```

This may return something like:

```bash
www.npr.org
www.google-analytics.l.google.com 
www.google-analytics.google.com 
```

To clear the DNS host cache: 

```bash 
sudo nscd -i hosts
```

By clearing the cache, the cache count resets, and the next domain lookup will trigger a fresh DNS query.

There are also other Linux DNS caching services you can try:

- `dnsmasq` 
- `systemd-resolved`
- `unbound`



## Cache Hits and Miss

DNS cache performance can be measured by whether the needed data is already stored locally.

- **Cache hits** refer to finding the requested DNS information in the cache
- **Cache miss** are when the requested DNS information is not in the cache

A high cache hit rate speeds up lookups, while a cache miss means the resolver must query external servers.


## Negative Caching

Caching can also store failed lookups to prevent repeated failed requests, also called as **Negative caching**. Since DNS records change, cached entries expire after their time-to-live (TTL) to avoid outdated or incorrect results.

The main point is that DNS caching improves speed and efficiency by reusing recent results, but it must expire to keep data accurate.

## Not All Queries Are Cached

Some DNS lookups are never stored in cache.

- Reverse queries are not cached
- Returned data that is unreliable or corrupted is not cached

This ensures that invalid or untrustworthy DNS information is never reused, keeping results accurate and reliable.
