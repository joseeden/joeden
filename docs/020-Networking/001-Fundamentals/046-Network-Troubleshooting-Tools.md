---
title: "Network Troubleshooting Tools"
description: "Network troubleshooting tools"
tags: 
- Networking
- DevNet
- CCNA
sidebar_position: 46
last_update:
  date: 5/25/2020
---


## Overview

Troubleshooting application connectivity is easier when you move layer by layer. Start with local network state, confirm routing, test name resolution, and then test the application port.

## Troubleshooting Flow

Use this order when the problem is unclear:

1. Check the local interface and IP address.
2. Check the default gateway.
3. Check routing to the destination.
4. Check DNS resolution.
5. Check the application port.
6. Check firewalls, load balancers, proxies, and application health.

If a web service returns an HTTP `500` response, the network path is likely working and the next step is application or server troubleshooting.

## Interface Checks

Use `ifconfig` or `ip address` on Linux to inspect interface state, IP addresses, MAC addresses, and traffic counters.

```bash
ifconfig
ip address
```

Common checks:

- Confirm the interface is up.
- Confirm the IP address and subnet are correct.
- Confirm the expected MAC address is present.
- Review transmit and receive counters.
- Check the MTU when fragmentation or large packet issues are suspected.

**Note**: Some Linux distributions have deprecated `ifconfig`. Prefer `ip address` on modern Linux systems.

## Ping

`ping` tests basic IP reachability with ICMP echo requests and replies.

```bash
ping -c 5 www.cisco.com
```

Ping can show:

- Whether replies are received.
- Round-trip latency.
- Packet loss.
- TTL values.
- IPv4 or IPv6 reachability.

**Note**: A failed ping does not always mean the host is down. Firewalls often block ICMP while allowing application ports such as TCP `443`.

## Traceroute

`traceroute` and Windows `tracert` show the path packets take toward a destination.

```bash
traceroute www.cisco.com
tracert www.cisco.com
```

Traceroute helps identify:

- Routing loops.
- Unexpected paths.
- The hop where traffic stops.
- Latency between hops.

Linux traceroute commonly uses UDP probes by default, while some platforms use ICMP. Firewalls can affect the output.

## DNS Checks

Use `nslookup` or `dig` to confirm that a name resolves to the expected address.

```bash
nslookup www.cisco.com
dig www.cisco.com
```

DNS checks help identify:

- Missing records.
- Unexpected IP addresses.
- Incorrect DNS servers.
- Cached stale records.

For more information, please see [Analyzing DNS](/docs/020-Networking/005-DNS/020-Analyzing-DNS.md) page.

## Application Port Checks

After IP reachability works, test the actual application port.

```bash
curl -I https://example.com
telnet example.com 443
```

If the port is blocked, check:

- Host firewalls.
- Network firewalls.
- Security groups or network ACLs.
- Load balancer listeners and health checks.
- Proxy and reverse proxy rules.

## Performance Checks

Some problems only appear under load. Tools such as `iperf` can generate traffic to test throughput, delay, and packet loss.

When performance is the issue, also check:

- Bandwidth saturation.
- QoS policy.
- Packet drops.
- Load balancer health.
- Backend database or application latency.
