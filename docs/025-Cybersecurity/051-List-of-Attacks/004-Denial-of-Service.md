---
title: "DoS Attacks"
tags: 
- Cybersecurity
sidebar_position: 4
last_update:
  date: 1/30/2024
---



## Overview

Denial of Service (DoS) attacks attempts to overload a network or website with traffic to make it unavailable.

**Mitigations:**

- **Load Balancers**: Distribute traffic across multiple servers.
- **Rate Limiting**: Limit requests per user or IP address.
- **CDNs**: Disperse network traffic.
- **DDoS Protection**: Use specialized services for DDoS mitigation.
- **Firewalls and IPS**: Detect and block DoS patterns.

## Flood Attack 

A specialized type of of DoS which attempts to send more packets to a single serve or host than it can handle.

**Variations:**

- **Ping Flood**

  - A server is sent with too many pings (ICMP request packet).
  - Many organizations are now blocking echo replies.
  - Firewall could be configured to drop these requests.

- **SYN Flood**

  - Attacker initiates multiple TCP sessions but never complete the 3-way handshake.
  - SYN packets could be sent with made-up IP addresses.
  - Server replies to establish the 3-way handshake but no one responds.
  - Server reserves resouces to wait for these acknowledgements from these clients.
  - With enough requests, server will run out of resources.
  - Mitigations:
    - *Flood guards* - detect SYN floods and block request at the network boundary.
    - *Timeouts* - stop connections after a period of time, e.g. 10, 15, 30 seconds
    - *IPS* - can detect and respond to SYN floods.

## Permanent DoS

An attack which exploits a security flaw by reflashing a firmware, permanently breaking the device.

- Device is unable to reboot itself because the OS is overwritten.
- Its permanent, because a quick reboot won't bring it back online.
- Device has to be taken offline and have a full firmware reload.

## Fork Bomb 

A large number of processes is created to use up a computer's available processing power.

- The process is called **fork**
- Process can be forked into more processes until it eats up all resources.
- **Not a worm**, they don't infect programs and don't spread in the network.
- Instead they spread to the processor's cache on a single computer.

## Distributed DoS (DDoS)

With DDoS, more machines are used to launch an attack simultaneously against a single server to create a denial of service condition.

- Usually the machines don't also know they're part of the attack.
- Machines can become zombies or bots inside a large botnet

## Smurf Attack 

When a device sends a ping command to another device, it sends an ICMP echo request, similar to asking "Hey are you there?". The device receiving the system then sends an ICMP echo reply, similar to replying "Yes, I am".

<div class='img-center'>

![](/img/docs/networking-basics-ping-commandddd.png)

</div>

In a smurf attack, the attacker sends large amounts of ICMP (ping) traffic ato the victim's IP address.

- Attacker sends ICMP requests with a spoofed source address, which is the victim's IP.
- The network devices respond, creating a flood of replies that overwhelm the victim.
- Causes network congestion and service disruption. 

As an example, a bot can send ICMP (ping) requests with the victim's IP address as the source. These requests are sent to third-party servers, which then send the ICMP replies back to the victim. Since many servers respond at once, the victim is overwhelmed by the flood of responses, leading to network congestion or disruption.

<div class='img-center'>

![](/img/docs/networking-basics-smurf-attack-fake-ip-flood-dns-servers.png)

</div>


## Amplified DDoS

Also known as **DNS Amplification**, Amplified DDoS is a specialized attack that allows an attacker to initiate DNS requests from a spoof IP address to flood a website.

- Unusually high DNS traffic, traffic originating from multiple sources.
- Response from the DNS server takes up a lot of bandwidth.
- Leads to service outages, network congestion, degraded performance.

An attacker carefully chooses requests that will have very large responses. The attacker can then sends very small requests to the DNS servers using the victim's IP address as the source of the request. The DNS servers then returns the large replies to the actual victim.

<div class='img-center'>

![](/img/docs/networking-basics-ddos-amplified-ddosss.png)

</div>


**Mitigations:**

- Configure DNS servers to prevent recursion for unauthorized users.
- Rate limiting on DNS requests and anomaly detection mechanisms.
- Use Anycast networks to distribute and manage traffic load.


## Amplification Factor 

The amplification factor is the degree to which the attack increases in size.

- If response is twice the size of reqeust, then amplification factor is 2.
- If the designed request is 64 bytes and AF is 8, then reply will be in 512 bytes.

In form:

<div class='img-center'>

![](/img/docs/networking-basics-ddos-amplified-ddosss-amplification-factor.png)

</div>
 

## Stopping DDoS 

- **Blackhole/Sinkhole**

  - Identifies the attacking IP addresses and routes traffic to non-existent server.
  - Effectively stops attack, but attackers can still move to new IP.

- **IDS/IPS**

  - Identify and respond to DoS attacks.
  - Works for small-scale attacks but not large-scale, not enough processing power.

- **Elastic Cloud Infrastructure**

  - Builds the infrastructure in a scalable way,
  - Cloud providers charge you based on resources used.
  - No return on investment, these traffic are wasted, they don't generate revenue.
  - There are specialized cloud providers for DDoS protection:
 
  - CloudFlare 
    - Akamai
