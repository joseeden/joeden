---
title: "Devices and Tools"
tags: [Networking,Cybersecurity]
sidebar_position: 4
last_update:
  date: 1/30/2024
---



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
  - For more information, please see [Load Balancing](../005-Security-Architecture/001-HA-and-DR.md#load-balancing)

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







