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


## Response Codes

When something fails, DNS uses response codes (RCODES) to explain what happened.

- RCODEs show if a query was successful or failed
- Each RCODE is a number linked to a condition
- A value of zero means no error and success

If the query works, the status shows **no error** and records are returned. Any other value means there was a problem that needs troubleshooting.

| Code | Name            | Meaning                                          |
| ---- | --------------- | ------------------------------------------------ |
| 0    | No error        | Query successful, records returned               |
| 1    | Format error    | Server could not understand the query            |
| 2    | Server failure  | Server had a problem processing the query        |
| 3    | NXDOMAIN        | The domain name does not exist                   |
| 4    | Not implemented | Server does not support the requested query type |
| 5    | Refused         | Server rejected the query for policy reasons     |

:::info

Every DNS response includes an RCODE. Success is only shown with zero, while all other codes point to different types of failure. 

::: 




## DNS Header 

The DNS header contains several fields that control how queries and responses are handled.

- **Transaction ID** links queries to their responses
- **Flags** show details about query type and behavior
- **Count** fields show how many records are included

<div class="img-center"> 

![](/img/docs/08172025_DNS-Header.png)

</div>

Each field plays a role in making sure the client and server understand each other during a DNS transaction.

| Field                    | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| Transaction ID           | Unique number to match query with response               |
| QR bit                   | 0 for query, 1 for response                              |
| Opcode                   | Type of DNS query being made                             |
| AA (Authoritative)       | Indicates the server is authoritative for the domain     |
| TC (Truncated)           | Set when the message is too long (over 512 bytes in UDP) |
| RD (Recursion Desired)   | Client requests the server to resolve recursively        |
| RA (Recursion Available) | Server confirms it supports recursion                    |
| Z                        | Reserved for future use, always set to zero              |
| AD (Authentic Data)      | Marks data as authentic (DNSSEC related)                 |
| CD (Checking Disabled)   | Skips DNSSEC validation checks                           |
| RCODE                   | Response code indicating success or type of error        |
| Query Count              | Number of questions in the query                         |
| Answer Count             | Number of answers in the response                        |
| NS Count                 | Number of authority records in the response              |
| Additional Count         | Number of additional records in the response             |


