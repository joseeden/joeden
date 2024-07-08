---
title: "Network Traffic Flow"
tags: [Cybersecurity]
sidebar_position: 34
last_update:
  date: 1/30/2024
---


## Packet Captures

**Full Packet Captures**, captures the entire packet, including the header and the payload for all traffic entering and leaving a network.

- Takes up too much storage space, wasting a lot of resources.
- Instead, we can use flow analysis to collect important details. 

In the example below, we can see the source and destination IP, as well as the sequence of packets targeting different ports over time which suggests a port scanning activity.

```bash
10:00:01.000000 IP 192.168.1.100 > 192.168.1.200: ICMP echo request, id 1234, seq 1, length 64
10:00:02.000000 IP 192.168.1.100 > 192.168.1.200: ICMP echo request, id 1234, seq 2, length 64
10:00:03.000000 IP 192.168.1.100 > 192.168.1.200: ICMP echo request, id 1234, seq 3, length 64
10:00:04.000000 IP 192.168.1.100 > 192.168.1.200: ICMP echo request, id 1234, seq 4, length 64
10:00:05.000000 IP 192.168.1.100 > 192.168.1.200: ICMP echo request, id 1234, seq 5, length 64
10:00:06.000000 IP 192.168.1.100 > 192.168.1.200: ICMP echo request, id 1234, seq 6, length 64
10:00:07.000000 IP 192.168.1.100 > 192.168.1.200: ICMP echo request, id 1234, seq 7, length 64
10:00:08.000000 IP 192.168.1.100 > 192.168.1.200: ICMP echo request, id 1234, seq 8, length 64
```

Note that the specific ports being targeted might not be visible in the packet data itself, as ICMP echo requests do not contain port information, unless the scanning technique involves sending packets directly to specific ports.

Below is another example which shows a possible DoS and DDoS attack. The packet captures show the same source IP sending packets but are not receiving any ACK from the client.

```bash
10:00:01.000000 IP 203.0.113.10 > 198.51.100.20: TCP [SYN] Seq=12345, Win=1024, Length=0
10:00:02.000000 IP 203.0.113.10 > 198.51.100.20: TCP [SYN] Seq=23456, Win=1024, Length=0
10:00:03.000000 IP 203.0.113.10 > 198.51.100.20: TCP [SYN] Seq=34567, Win=1024, Length=0
10:00:04.000000 IP 203.0.113.10 > 198.51.100.20: TCP [SYN] Seq=45678, Win=1024, Length=0
10:00:05.000000 IP 203.0.113.10 > 198.51.100.20: TCP [SYN] Seq=56789, Win=1024, Length=0
10:00:06.000000 IP 203.0.113.10 > 198.51.100.20: TCP [SYN] Seq=67890, Win=1024, Length=0
10:00:07.000000 IP 203.0.113.10 > 198.51.100.20: TCP [SYN] Seq=78901, Win=1024, Length=0
10:00:08.000000 IP 203.0.113.10 > 198.51.100.20: TCP [SYN] Seq=89012, Win=1024, Length=0
```

DDoS would look similar but the difference is that the attack will be coming from different source IPs.

```bash
10:00:01.000000 IP 192.0.2.10 > 198.51.100.20: TCP [SYN] Seq=12345, Win=1024, Length=0
10:00:02.000000 IP 192.0.2.11 > 198.51.100.20: TCP [SYN] Seq=23456, Win=1024, Length=0
10:00:03.000000 IP 192.0.2.12 > 198.51.100.20: TCP [SYN] Seq=34567, Win=1024, Length=0
10:00:04.000000 IP 192.0.2.13 > 198.51.100.20: TCP [SYN] Seq=45678, Win=1024, Length=0
10:00:05.000000 IP 192.0.2.14 > 198.51.100.20: TCP [SYN] Seq=56789, Win=1024, Length=0
10:00:06.000000 IP 192.0.2.15 > 198.51.100.20: TCP [SYN] Seq=67890, Win=1024, Length=0
10:00:07.000000 IP 192.0.2.16 > 198.51.100.20: TCP [SYN] Seq=78901, Win=1024, Length=0
10:00:08.000000 IP 192.0.2.17 > 198.51.100.20: TCP [SYN] Seq=89012, Win=1024, Length=0
```


## Flow Analysis

**Flow analysis** relies on a flow collector, which records metadata and statistics rather than recording each frame that passes through the network. 

- By collecting just the metadata, we can save a lot of storage space.
- Minimizes processing costs as well. 
- Generates visualizations to map network cconnections, traffic types, etc.
- Downside: it does not provide actual content.

## NetFlow, Zeek, and MRTG 

**NetFlow** is a Cisco-developed means of reporting network flow information to a structured database. 

- Became a standard under the name **IP Flow Information Export (IPFIX)**
- Define traffic flow based on different packets that share same characteristics.
- Example, traffic flow based on same source and destination IP.

Information that we can find in a NetFlow:

- Network Protocol 
- IP Version/Type 
- Source/Destination IP
- Source/Destination Port
- IP Service Type

**Zeek** is a hybrid tool that passively monitors a network like a sniffer, but only logs full packet capture data of potential interest. 

- Samples the data just like NetFlow and uses a flow collector. 
- Logs the full packet capture whenever it finds something interesting.
- Uses filters or signatures for collectin g full packet capture.
- Performs normalization of data and stores it as tab-delimited or JSON-formatted.
- Normalized files can be imported to other tools for visualization and analysis.

**Multi Router Traffic Grapher (MRTG)** creates graphs showing traffic flows through the network interfaces of routers and switches by polling the appliances using SNMP.

- We can see patterns emerging based on the traffic being sent or received.
- Spikes or drops in traffic can be seen in the graphs.
