---
title: Networking
tags: [Linux, Red Hat, Certifications]
<!-- sidebar_position: 1 -->
last_update:
  date: 2/27/2022
---

## Tasks

1. Set your server to a fixed IP address that matches your current network configuration.
2. Also set a second IP address 10.0.0.10/24 on the same network interface.
3. Reboot and verify your network is still working with the new settings.

----

## Solutions

### 1. Set a fixed IP address

Set your server to a fixed IP address that matches your current network configuration.
Look for the interface that is currently in use, typically something like eth0 or enp0s3.

```bash
ip a  
```
Edit the /etc/netplan/ configuration file:

```bash
sudo nano /etc/netplan/01-netcfg.yaml
```

Edit the file to match your current network configuration. Replace INTERFACE_NAME with your actual network interface name and CURRENT_IP, GATEWAY, and DNS_SERVERS with your current settings.

```bash
network:
  version: 2
  renderer: networkd
  ethernets:
    INTERFACE_NAME:
      dhcp4: no
      addresses:
        - CURRENT_IP/24
      gateway4: GATEWAY
      nameservers:
        addresses:
          - DNS_SERVERS
```

### 2. Set the second IP Address

Also set a second IP address 10.0.0.10/24 on the same network interface. In the same netplan configuration file, add another address line for the secondary IP:

```bash
network:
  version: 2
  renderer: networkd
  ethernets:
    INTERFACE_NAME:
      dhcp4: no
      addresses:
        - CURRENT_IP/24
        - 10.0.0.10/24
      gateway4: GATEWAY
      nameservers:
        addresses:
          - DNS_SERVERS
```

### 3. Reboot and verify

Reboot and verify your network is still working with the new settings.

```bash
sudo netplan apply
sudo reboot
```

After the server reboots, check that both IP addresses are configured:

```bash
ip a  
```

Check that the network is functioning correctly by pinging an external address and both configured IPs.

```bash
ping -c 4 8.8.8.8
ping -c 4 CURRENT_IP
ping -c 4 10.0.0.10
```