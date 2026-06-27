---
title: "Application Networking"
description: "Application networking"
tags: 
- Networking
- DevNet
- Cloud
- Security
sidebar_position: 25
last_update:
  date: 5/25/2020
---


## Overview

Most deployed applications depend on network services. Firewalls, load balancers, DNS, and reverse proxies control how users reach the application and how application components reach each other.

## Firewalls

A firewall accepts or rejects traffic based on rules. Rules commonly evaluate source address, destination address, protocol, and port.

For a web application, a restrictive firewall policy might allow HTTPS and deny direct access to SSH or a database port.

<div class='img-center'>

![](/img/docs/devnetadf2.png)

</div>

Example policy:

- Deny all inbound access by default.
- Allow TCP port `443` from users.
- Allow TCP port `22` only from a jump box.
- Allow database traffic only from the application tier.

<div class='img-center'>

![](/img/docs/devnetadfw2.png)

</div>

A jump box is an intermediate system that administrators connect through before reaching sensitive hosts.

<div class='img-center'>

![](/img/docs/devnetadfw3.png)

</div>

## Load Balancers

A load balancer receives client requests and distributes them across multiple servers.

For more information, please see [LoadBalancers](/docs/020-Networking/001-Fundamentals/016-LoadBalancers.md) page.

<div class='img-center'>

![](/img/docs/devnetadlb.png)

</div>

Common load-balancing behaviors include:

| Method             | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| Persistent session | Keeps a user tied to the server that owns their session state.  |
| Round robin        | Sends each request to the next server in the list.              |
| Least connections  | Sends new traffic to the server with the fewest active sessions. |
| IP hash            | Uses a hash of the client IP to choose a consistent backend.     |

Load balancers also support release strategies such as blue-green and canary deployment by shifting traffic between old and new application versions.

<div class='img-center'>

![](/img/docs/devnetlbrr.png)

</div>

## DNS

DNS maps human-readable names to routable IP addresses. In deployments, DNS can point applications to different resources without changing application code.

For more information, please see [Domain Name System DNS](/docs/020-Networking/001-Fundamentals/020-Domain-Name-System-DNS.md) page.

<div class='img-center'>

![](/img/docs/devnetaddns.png)

</div>

Example:

- Production `database.example.com` resolves to the production database.
- Development `database.example.com` can resolve to a development database when the development environment uses its own DNS server.
- The application code still uses the same hostname.

<div class='img-center'>

![](/img/docs/devnetaddns3.png)

</div>

**Note**: DNS can help shift traffic, but DNS caching and propagation delay make it less precise than a load balancer for fast rollbacks.

## Reverse Proxies

A forward proxy makes many clients appear as one client. A reverse proxy makes many internal servers appear behind one public endpoint.

For more information, please see [Proxy Servers](/docs/020-Networking/001-Fundamentals/017-Proxy-Servers.md) page.

<div class='img-center'>

![](/img/docs/devnetrevp1.png)

</div>

Reverse proxies can route requests, terminate TLS, apply filtering, and hide internal server details from users.

<div class='img-center'>

![](/img/docs/devnetrevp2.png)

</div>
