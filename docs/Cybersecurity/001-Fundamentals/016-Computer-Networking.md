---
title: "Networking Basics"
tags: [Cybersecurity]
sidebar_position: 1
last_update:
  date: 1/30/2024
---


## Network 

A network refers to the connection of two or more computers for the purpose of sharing data, information, or resources.

### Types of Networks

- **Local Area Network (LAN)**
   - Typically spans a single floor or building.
   - Limited geographical area.

- **Wide Area Network (WAN)**
   - Encompasses long-distance connections between geographically remote networks.

### Ethernet

Ethernet (IEEE 802.3) is a standard that defines wired connections of networked devices. This standard defines the way data is formatted over the wire to ensure disparate devices can communicate over the same cables.

### Device Address

**Media Access Control (MAC) Address** -
- Assigned to every network device.
- Example: 00-13-02-1F-58-F5.
- First 3 bytes (24 bits) denote the vendor or manufacturer of the physical network interface.
- No two devices can have the same MAC address in the same local network.

**Internet Protocol (IP) Address** -
- Logical address associated with a unique network interface.
- MAC addresses are assigned in the firmware, while IP addresses are logical.
- Helps maintain communications when physical devices are swapped.
- Examples: 192.168.1.1 and 2001:db8::ffff:0:1.


### Internet Protocol (IPv4 and IPv6)

IP is currently deployed and used worldwide in two major versions. IPv4 provides a 32-bit address space, which by the late 1980s was projected to be exhausted. IPv6 was introduced in December 1995 and provides a 128-bit address space along with several other important features. 

To learn more, check out [IP address](https://en.wikipedia.org/wiki/IP_address)


### Wifi 

Widely adopted for its easy deployment and cost-effectiveness, wireless networking provides versatility, enabling devices to roam freely within signal range. 

- **Wi-Fi Evolution**
    - Evolving over time with faster updated versions, Wi-Fi continues to improve its performance.

- **Security Considerations**
    - Despite its benefits, wireless networks introduce additional vulnerabilities. Unlike wired networks, intrusions can occur remotely, without physical access to the network.


![](/img/docs/security-wifi.png)


### Virtual Local Network

**VLANs** are created by switches to logically segments a network without altering physical topology. 
**VLAN Trunking** is when you have VLANs spanning multiple switches to extend the reach of that VLAN.

- Corporate Network:
    - Departments like HR, Finance, and IT each on separate VLANs.
- Guest Wi-Fi:
    - Isolate guest devices from internal network using a dedicated VLAN.
- Voice over IP (VoIP):
    - Separate VLAN for VoIP traffic to prioritize voice communication.
- Server Farm:
    - Different VLANs for web servers, database servers, ensuring segmentation.



Sample diagram:

<div class="img-center">

![](/img/docs/security-vlan-simplifieddd.png)


</div>


### Quality of Service 

Quality of Service (QoS) refers to the technology that allows the network to prioritize certain types of traffic over others. 

- Prioritizes critical traffic like VoIP or video conferencing.
- Uses mechanisms like classes of service (CoS), packet classification, and traffic shaping.

### Network Address Translation (NAT)

Network Address Translation (NAT) translates private IP addresses to a public IP address, allowing multiple devices on a local network to access the internet using a single public IP.

- Conserves public IP addresses.
- Hides internal network structure.
- Provides a basic level of security.
- Enables internal IP address management.
- Supports dynamic and static NAT configurations.

Sample diagram:


<div class="img-center">

![](/img/docs/all-things-devops-NAT-3.png)


</div>



### Port Address Translation (PAT)

Port Address Translation (PAT), a subset of NAT, maps multiple private IP addresses to a single public IP address using different ports, allowing multiple devices to share one public IP address simultaneously.

- Can be a hardware or software configuration.
- Normally enabled on the router, PAT hides the internal IPs.
- Enables multiple connections from different devices.
- Uses port numbers to differentiate traffic.
- Supports large-scale networks with limited public IPs.
- Often referred to as "NAT overload", or "NAT Gateway"

Almost similar to a forward proxy, but their differences are:

- PAT is Layer 4, while Forward Proxy is Layer 7 of the OSI Model.
- Forward proxy can cache the retrieved content from the internet, PAT doesn't.
- Forward proxy can force users to authenticate before fetching requests.

Sample diagram:


<div class="img-center">

![](/img/docs/all-things-devops-PAT.png)


</div>



### Networking Tools 

- **Ping Sweep**

  - Common method to map live hosts in a network.
  - Involves sending ping messages (ICMP Echo Requests) to a range of IP addresses.
  - Online hosts respond, allowing mapping of live hosts on the network.
  - *Reference:* ISC2 Study Guide, Chapter 4, Module 3.

- **Geolocation**

  - Determines a device or user's physical location based on IP or MAC address.

- **Traceroute**

  - Maps network topology and diagnoses connectivity/routing issues by tracing packet hops to an IP address.

- **Wireshark**

  - Network protocol analyzer tool for viewing and analyzing packet contents, including IP addresses and host names.


## Proxy 

A proxy server acts as an intermediary between a client and the internet.

- Allows clients to make requests to servers while hiding their IP addresses.
- Receives client requests, forwards them to the server, and returns server responses.
- Provides additional anonymity by masking the client's IP address during internet access.

### Forward Proxy

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



### Reverse Proxy

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


### Transparent Proxy

A **transparent proxy**, also known as an intercepting proxy, inline proxy, or forced proxy, is a type of forward proxy that intercepts and redirects client requests without requiring any client-side configuration or awareness. 

- Internal clients point to proxy server's IP address as their default gateway.
- You can have proxy configurations on an actual router or server.

Sample diagram from Wallarm:


<div class="img-center">

![](/img/docs/sec+-transparent-proxy-diagram.png)


</div>



## Networking Models

Various models, architectures, and standards facilitate the interconnection of hardware and software systems for sharing information and coordinating activities. The integration includes communication devices, storage, processing, security, input/output devices, operating systems, software, services, data, and people.

1. **Provide Reliable Communications** -
   - Ensure dependable communication between hosts and users.

2. **Isolate Functions in Layers** -
   - Segment functions into distinct layers for better organization and management.

3. **Packets as Communication Basis** -
   - Use packets as the fundamental unit of communication.

4. **Standardize Routing, Addressing, and Control** -
   - Implement standardized protocols for routing, addressing, and control.

5. **Allow Additional Layer Functionality** -
   - Enable flexibility for layers beyond internetworking to add functionality.

6. **Vendor-Agnostic, Scalable, and Resilient** -
   - Ensure compatibility across vendors, scalability, and resilience in network design.

In the most basic form, a network model has at least two layers:


<div class="img-center">

![](/img/docs/security-tcp-ip-osi-model.png)


</div>



- **Upper Layer**
    - Also known as the host or application layer
    - Manages connection integrity
    - Controls sessions
    - Handles communication session establishment, maintenance, and termination
    - Transforms data into a universally understandable format
    - Facilitates communication between applications
    - Checks availability and accessibility of remote communication partners

- **Lower Layer**
    - Often referred to as the media or transport layer
    - Receives bits from the physical connection medium
    - Converts bits into standardized frames
    - Frames function like buckets holding water (bits)
    - Ensures controlled transportation of data within standardized frames
    - Adds route data to frames to create packets
    - Preparation for further management and processing by the upper layer

### OSI Model

The Open Systems Interconnection (OSI) Model is a conceptual framework for describing the communication structure of interconnected computer systems, comprising seven layers. 

- **Application, Presentation, and Session Layers (5-7)** - Commonly referred to as data; potential for encapsulation.
  
  - SNMP (Layer 7)

- **Transport Layer (4)** - Manages protocols like TCP/UDP.

- **Network Layer (3)** - Handles routing and packet transmission.

  - ICMP 
  - IGMP 
  - IP

- **Data Link Layer (2)** - Manages frames and devices like switches.

- **Physical Layer (1)** - Converts data into binary for transmission.

**Encapsulation and De-encapsulation**
Encapsulation occurs as data descends, and de-encapsulation happens as it ascends. The OSI Model aids in understanding networking terminology and processes.

The encapsulation/de-encapsulation process is best depicted visually below: 

![](/img/docs/security-encap-deencap-diagram.png)


### TCP/IP

Transmission Control Protocol/Internet Protocol (TCP/IP) is platform-independent but resource-intensive and designed for ease of use rather than security. It predates the OSI model.

  - **Application Layer** - Defines transport layer protocols.

    - **Telnet** - Allows terminal emulation over the Internet.
    - **File Transfer Protocol (FTP)** - Facilitates file transfers between devices.
    - **Simple Mail Transport Protocol (SMTP)** - Manages email transmission.
    - **Domain Name Service (DNS)** - Resolves domain names to IP addresses.


  - **Transport Layer** - Facilitates data movement.

    - **TCP (Transmission Control Protocol)** - Full-duplex, connection-oriented protocol.
    - **UDP (User Datagram Protocol)** - Simplex, connectionless protocol.

  - **Internet Layer** - Handles packet creation and insertion.

    - **Internet Control Message Protocol (ICMP)** - Determines network or link health. Used by tools like ping and traceroute.

    - The **ping** utility employs ICMP echo packets to assess:

        - Online status of a remote system.
        - Prompt responsiveness of the remote system.
        - Support for communications by intermediary systems.
        - Level of performance efficiency in communication among intermediary systems.

      
<div class="img-center">

      ![](/img/docs/security-tcp-ip-protocol.png)
      

</div>



  - **Network Interface Layer** - Manages data flow in the network.




### SYN, SYN-ACK, ACK Handshake

The SYN, SYN-ACK, and ACK handshake is a process used in the TCP (Transmission Control Protocol) to establish a connection between two devices on a network. 

- **SYN (Synchronize)** -
  - Initiates the connection request.
  - The sender indicates its intention to establish a connection.
  - The sender picks an initial sequence number.

- **SYN-ACK (Synchronize-Acknowledge)** -
  - Acknowledges the receipt of the SYN packet.
  - Indicates acceptance of the connection request.
  - The receiver also selects an initial sequence number.

- **ACK (Acknowledge)** -
  - Confirms the acknowledgment of the SYN packet.
  - Establishes the connection.
  - Data transfer can begin after the ACK is received.

This three-step handshake ensures that both the sender and receiver are ready to exchange data and have agreed upon initial sequence numbers for reliable communication.


<div class="img-center">

![](/img/docs/security-syn-ack-syn.png)


</div>



## Network Appliance 

A network appliance is a dedicated hardware device with pre-installed software that is designed to provide specific networking services.

### Common Network Devices

- **Hubs**
  - Connect multiple devices in a network, commonly found in home networks.
  - Less intelligent compared to switches or routers.

- **Switches**
  - Also known as intelligent hubs.
  - Know the addresses of connected devices and route traffic efficiently.
  - Wired devices.

- **Routers**
  - Control traffic flow on networks.
  - Connect similar networks and manage traffic between them.
  - Wired or wireless and can connect multiple switches.
  - Determine the most efficient route for network traffic.

- **Firewalls**
  - Essential for managing and controlling network traffic.
  - Filter traffic based on predefined rules.
  - Deployed between private networks and the internet or within segmented networks in an organization.

- **Server**
  - Provides information to other computers on a network.
  - Common types include web servers, email servers, print servers, database servers, and file servers.
  - Secured differently than workstations.

- **Endpoints**
  - Ends of a network communication link.
  - One end often at a server with a resource, the other end a client making a request.
  - Can be servers, desktops, laptops, tablets, mobile phones, or other end-user devices.

- **Load Balancers**
  - Distribute incoming network traffic across multiple servers.
  - Provide high availability by redirecting traffic during server failures.
  - Balance loads based on various algorithms, such as round-robin or least connections.
  - Improve response times and optimize resource usage.
  - More details found here: [Load Balancing](./008-Disaster-recovery.md#load-balancing)

- **Application Delivery Controllers**
  - Advanced form of a loadBalancer; can optimize application delivery.
  - Load balancing, SSL termination, content caching, and HTTP compression
  - Integrated firewall and DDoS protection.

- **Proxy Servers**
  - Act as intermediaries between clients and servers, hiding client IP addresses.
  - Cache content to improve load times and reduce bandwidth usage.
  - Filter web traffic to enforce organizational policies.
  - Implement user authentication protocols and secure tunnels

- **Network Sensors**
  - Monitor network traffic and detect anomalies and potential threats in real-time.
  - Collect data for analysis and reporting.
  - Integrate with other security systems to automate alerts and responses.

- **Jump Servers**
  - Also known as "Jump box", it serves as secure access points for admin tasks.
  - Isolate administrative activities from regular network traffic.
  - Log and monitor all administrative actions for auditing purposes.
  - Usually hosts a wide range of tools and scripts that system administrators can use.


### SD-WAN

Software-Defined Wide Area Network (SD-WAN) is a virtualized network architecture that allows enterprises to leverage any combination of transport services, including MPLS, LTE, and broadband internet services, to securely connect users to applications.

- Cuts reliance on expensive MPLS circuits.
- Optimizes traffic for better user experience.
- Simplifies WAN management with a single interface.
- Includes encryption, firewalls, and secure tunneling.

### SASE

Secure Access Service Edge (SASE) is a network architecture that combines WAN capabilities with comprehensive security functions, such as SWG, CASB, FWaaS, and ZTNA, into a single, cloud-delivered service model.

- Uses the cloud for scalability and performance.
- Provides consistent security policies everywhere.
- Eliminates the need for multiple security solutions.


## Network Tools 

### Network Protocol Analyzers 

## Network Tools

### Network Protocol Analyzers

Network Protocol Analyzers capture data packets transmitted over the network, decode them, and present the information in a human-readable format. These tools to diagnose issues, ensure optimal network performance, and detect malicious activities by providing detailed insights into network traffic.

- Physical, wireless, or software installed on desktop or obile phones.
- Network placement is crucial, recommended to put them your internal network and router.
- Packet captures can be saved for a later analysis. 
- View packet headers (addressing) and packet payload (data).
- Features like TCP stream and filter to view and display the entire packet.

Below are some available network analyzers:

- tcpdump 
- NetFlow 
- SFlow 
- IPFIX 

Note that the packet captures can be forged, with tools like hping3. This tools can spoof headers and payload just like in a legitimate traffic.  


### SPAN Mode

Switch Port Analyzer (SPAN) mode is a feature on network switches that allows the monitoring of network traffic by mirroring the traffic from one or more source ports or VLANs to a designated destination port. 

- Laptop can be plugged into a switch configured in SPAN Mode.
- All traffic going through the switch can be copied over to the device running the analyzer.
- Useful for analyzing the mirrored traffic without disrupting the network’s normal operation. - Particularly useful for troubleshooting network issues and monitoring network performance.

### tcpdump

tcpdump is a powerful command-line packet analyzer tool used for capturing and analyzing network traffic on Unix-like operating systems. 

Sample Commands:

- Capture packets on a specific interface:
  ```sh
  tcpdump -i eth0
  ```

- Capture only TCP traffic:
  ```sh
  tcpdump tcp
  ```

- Save captured packets to a file:
  ```sh
  tcpdump -w capture.pcap
  ```

- Read packets from a file:
  ```sh
  tcpdump -r capture.pcap
  ```

- Capture packets from a specific host:
  ```sh
  tcpdump host 192.168.1.1
  ```

- Capture packets on a specific port:
  ```sh
  tcpdump port 80
  ```

- Capture packets on a specific port, from a specific source:

  ```sh
  tcpdump src 10.10.10.10 and port 514 and udp
  ```

- Capture packets going to a specific destination, and save to a file:

  ```bash
  tcpdump -X dst www.cnn.com -w cnn-traffic 
  ```

- Run packet capture in the background:

  ```bash
  tcpdump -X dst www.cnn.com -w cnn-traffic &
  ```
 
- See packet captures running in the background:

  ```bash
  jobs 
  ```

- To bring the background job to foreground, use 'fg' then specify the number.

  ```bash
  fg 1 
  ```

- Read a packet capture file:

  ```bash
  tcpdump -r cnn-traffic.log 
  ```

### nmap

nmap (Network Mapper) is a widely-used open-source tool for network discovery and security auditing. It can quickly scan large networks to determine which hosts are up, what services they are offering, and what operating systems and versions they are running.

Sample Commands:

- Scan a single IP address:
  ```sh
  nmap 192.168.1.1
  ```

- Scan a single IP address in verbose mode:
  ```sh
  nmap -v 192.168.1.1
  ```

- Scan a range of IP addresses:
  ```sh
  nmap 192.168.1.1-254
  ```

- Perform a ping scan to check which hosts are up:
  ```sh
  nmap -sn 192.168.1.0/24
  ```

- Detect service versions on open ports:
  ```sh
  nmap -sV 192.168.1.1
  ```

- Perform a stealth scan:
  ```sh
  nmap -sS 192.168.1.1
  ```

- Scan for open ports and OS detection:
  ```sh
  nmap -A 192.168.1.1
  ```

- Save scan results to a file:
  ```sh
  nmap -oN output.txt 192.168.1.1
  ```

- OS fingerprinting, getting details about the OS.

  ```bash
  nmap -O 192.168.1.1
  ```

### Wireshark

Wireshark provides a comprehensive suite of tools for capturing and interactively analyzing network traffic.

Capture traffic on a specific interface (using the GUI):
  1. Open Wireshark.
  2. Select the network interface you want to capture from.
  3. Click the "Start" button to begin capturing packets.

Common filters:

- Apply a display filter to show only HTTP traffic:
  ```sh
  http
  ```

  ![](/img/docs/sec+-wireshark-sample-http.png)

- Capture traffic from a specific IP address:
  ```sh
  ip.addr == 192.168.1.1
  ```

- Filter traffic to a specific port, such as port 80 (HTTP):
  ```sh
  tcp.port == 80
  ```

To find packets containing specific keywords:
  1. Edit > Find Packet
  2. Enter the keyword that you want to search > Find

      ![](/img/docs/sec+-wireshark-find-keyword-in-packet.png)
  
  3. To see the entire stream, click Analyze > Follow.

      ![](/img/docs/sec+-wirehsark-follow-tcp-stream.png)

Save captured packets to a file (using the GUI):
  1. After capturing traffic, go to "File" > "Save As".
  2. Choose the desired file format and location.
  3. Click "Save".

Read packets from a file (using the GUI):
  1. Go to "File" > "Open".
  2. Select the capture file you want to analyze.
  3. Click "Open".







