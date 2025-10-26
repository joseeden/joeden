---
title: "Analyzing DNS"
description: "Analyzing DNS"
tags: 
- Networking
- Cybersecurity
sidebar_position: 20
last_update:
  date: 1/19/2018
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


## Lab: Capturing Network Traffic

There are two main ways to capture network traffic. Both depend on where and how you want to observe the data.

- **Passive capture** uses tools like tcpdump directly on the client or server
- **Active capture** places a proxy or a tap in the path if direct access is not possible

For this example, we'll use the lab environment that was setup for the [DNS Lab.](/docs/006-Networking/005-DNS/018-DNS-Lab.md)

<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns-lab-config.png)

</div>


### Setting Up Capture Point

Once the method is chosen, the next step is deciding where to capture the traffic.

- The capture point is the exact location where traffic is recorded
- A client interface is a simple place to start for DNS queries

For our example, we'll setup our capture point at the client device which will contact the DNS resolver directly for its recursive queries.

<!-- insert photo -->

### Configuring DNS Resolver

To capture DNS traffic, the client must use a known resolver.

- Edit `/etc/resolv.conf` to set the DNS resolver
- Example: use `192.168.1.1` as the resolver

```bash
sudo vi /etc/resolv.conf
# Add this line at the bottom
nameserver 192.168.1.1
```

This ensures all DNS lookups go through the resolver we want to monitor.

### Installing Tcpdump

Check if tcpdump is installed with

```bash
dpkg -s tcpdump
```

If missing, install it with

```bash
sudo apt-get install tcpdump -y
```


### Building a Capture Filter

Filters help capture only useful traffic.

- Capture on specific interface (e.g. `enp0s3`)
- Specify port 53 for DNS
- Save output to a file for later analysis

In the example below, it captures only DNS packets and stores them in a file for review.

```bash
sudo tcpdump -i ens3 port 53 -s0 -w /var/log/dns_traffic.pcap
```


### Generating DNS Traffic

To create DNS packets for capture, simply browse a website.

- Open a browser and visit a domain
- Stop tcpdump with `Ctrl+C`

The capture file now contains DNS traffic for the visited domain.

### Analyzing With Wireshark

Wireshark is used to analyze captured traffic.

- Install Wireshark if needed

    ```bash
    sudo apt install wireshark -y
    ```

- Allow non-root users to run it

    ```bash
    sudo usermod -aG wireshark $(whoami)
    ```

- Reboot and open Wireshark

    ```bash
    sudo reboot
    ```

Captured files can now be inspected in detail with display filters.

### Filtering DNS Queries in Wireshark

Filters make it easier to focus on specific DNS lookups.

- To filter by domain:

    ```bash
    dns.qry.name == "example.com"
    ```

- To filter by transaction ID:

    ```bash
    dns.id == 0xD1C3
    ```

These filters isolate exact queries and responses for review.
