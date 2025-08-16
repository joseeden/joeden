---
title: "Analyzing DNS"
description: "Analyzing DNS"
tags: 
- Networking
- Cybersecurity
sidebar_position: 20
last_update:
  date: 1/16/2018
---


## How DNS Communicates

DNS lets clients find servers and exchange information using structured messages. Each exchange between client and server is called a **transaction**.

- Each DNS request from a client is called a **query**
- Each reply from a server is called a **response**
- Every **transaction** has a unique transaction ID
- Transaction IDs help match responses to the correct queries

This process ensures accurate tracking of requests and is useful for troubleshooting or analyzing network traffic.

<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns-analysis.png)

</div>



## Transport Protocols

DNS relies on transport protocols to move messages between client and server. It uses both UDP and TCP depending on the situation.

- **When it uses UDP**:

  - Used for quick name resolution
  - Clients handle retries if responses are delayed
  - Retries are usually every 2 to 5 seconds

- **When it uses TCP**:

  - Used when reliable delivery is needed 
  - When responses exceed 512 bytes
  - For Zone transfers and large queries 

By using both, DNS stays fast for everyday lookups while still handling large or critical transfers reliably.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-08-17-012412.png)

</div>


## Message Size and Handling

DNS messages have size limits that affect how they are sent and retried.

- UDP messages are limited to 512 bytes
- If a response is larger, the message is truncated
- A special header bit signals truncation
- This prompts the client to retry over TCP

This ensures that large DNS responses are delivered correctly without overwhelming the network.

## Ports and Special Messages

DNS uses standard ports and has additional message types for specific operations.

- Servers listen on **port 53**
- Clients use temporary ephemeral ports for requests
- **Notify messages** tell slave servers about zone changes
- **Update messages** add or remove records 
- Can use UDP or TCP depending on size
