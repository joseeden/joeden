---
title: "Proxy"
description: "Learn what proxy is"
tags: [Networking,Cybersecurity]
sidebar_position: 2
last_update:
  date: 1/30/2024
---


## Overview 

A proxy server acts as an intermediary between a client and the internet.

- Allows clients to make requests to servers while hiding their IP addresses.
- Receives client requests, forwards them to the server, and returns server responses.
- Provides additional anonymity by masking the client's IP address during internet access.

## Forward Proxy

A **forward proxy** acts as an intermediary that sits between clients and the external servers. It forwards client requests to the internet and returns the server's response to the client.

- Hides IP address of internal client station.
- After internet content is fetched, the content can be cached on the proxy.
- Cached content speeds up subsequent requests.

Direction:

```bash
Client -> Forward Proxy -> Internet -> Server 
```

Sample diagram from [Security Boulevard](https://securityboulevard.com/2023/04/what-is-reverse-proxy-how-does-it-works-and-what-are-its-benefits/):



<div class="img-center">

![](/img/docs/sec+-forward-proxy-diagram.png)


</div>



## Reverse Proxy

A **reverse proxy** sits in front of one or more servers and forwards client requests to the appropriate server. The client interacts with the reverse proxy as if it were the server.

- Protecting the servers, not the client devices, thereby hiding the identity of the server.
- Proxy server is configured with a public IP address and a port number.
- Can support loadbalancing and SSL/TLS offloading or termination.

Direction:

```bash
Client -> Reverse Proxy -> Internal Network -> Server(s) 
```

Sample diagram from [Security Boulevard](https://securityboulevard.com/2023/04/what-is-reverse-proxy-how-does-it-works-and-what-are-its-benefits/):



<div class="img-center">

![](/img/docs/sec+-reverse-proxy-diagram.png)


</div>


## Transparent Proxy

A **transparent proxy**, also known as an intercepting proxy, inline proxy, or forced proxy, is a type of forward proxy that intercepts and redirects client requests without requiring any client-side configuration or awareness. 

- Internal clients point to proxy server's IP address as their default gateway.
- You can have proxy configurations on an actual router or server.

Sample diagram from Wallarm:


<div class="img-center">

![](/img/docs/sec+-transparent-proxy-diagram.png)


</div>