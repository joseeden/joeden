---
title: "Restrict Network Access "
description: "Restrict Network Access "
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 18
last_update:
  date: 7/7/2022
---

- [Network-wide Security](#network-wide-security)
- [Server-Level Security](#server-level-security)
- [Uncomplicated Firewall (UFW)](#uncomplicated-firewall-ufw)
- [Basic UFW Commands](#basic-ufw-commands)
- [Usage Examples](#usage-examples)
- [Installing UFW](#installing-ufw)
- [Sample UFW Rules](#sample-ufw-rules)
- [Deleting UFW Rules](#deleting-ufw-rules)




## Network-wide Security 

We can apply network-wide security using external appliances like Cisco, Fortinet, etc. 

<div class='img-center'>

![](/img/docs/restrict-network-access-using-appliances.png)

</div>



## Server-Level Security

In addition to network security, server-level security can be enforced using tools like:

- `iptables`
- `ufw`

## Uncomplicated Firewall (UFW)

UFW is a simple command-line interface for managing iptables, Linux's default firewall tool.

- Integrates with system applications.
- Supports logging to monitor and detect firewall activity.
- Default `DENY ALL` for incoming connections unless explicitly allowed.


## Basic UFW Commands

- Enable UFW:
  ```bash
  sudo ufw enable
  ```

- Disable UFW:
  ```bash
  sudo ufw disable
  ```

- Check Status:
  ```bash
  sudo ufw status
  ```

- Allow Traffic to a Specific Port:
  ```bash
  sudo ufw allow 22/tcp   # Allow SSH traffic
  ```

- Deny Traffic to a Specific Port:
  ```bash
  sudo ufw deny 80/tcp   # Deny HTTP traffic
  ```

- Allow Traffic from Specific IP Address:
  ```bash
  sudo ufw allow from 192.168.1.2
  ```

- Delete a Rule:
  ```bash
  sudo ufw delete allow 80/tcp
  ```


## Usage Examples

1. Allow SSH and deny everything else:

   ```bash
   sudo ufw default deny incoming
   sudo ufw allow ssh
   ```

2. Allow HTTP and HTTPS traffic:

   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

3. Enable UFW logging:

   ```bash
   sudo ufw logging on
   ```  

## Installing UFW

Installing and setting up UFW is simple:

- **1. Check UFW Availability**
  
  UFW is typically pre-installed on Debian-based systems. Check if it's already installed:

  ```bash
  sudo ufw status
  ```

  If UFW is not installed, proceed to the next step.

- **2. Install UFW**
  
  Install UFW using your package manager. For Ubuntu/Debian, use:

  ```bash
  sudo apt update
  sudo apt install ufw
  ```

- **3. Enable UFW**
  
  After installation, enable UFW:

  ```bash
  sudo ufw enable
  ```

  Confirm the action, as enabling UFW may interrupt existing SSH connections.

- **4. Check UFW Status**
  
  Verify if UFW is active:

  ```bash
  sudo ufw status
  ```

  You should see that the firewall is active.

- **5. Basic UFW Configuration**
  
  Set basic rules, like allowing SSH and HTTP:

  ```bash
  sudo ufw allow 22/tcp    # Allow SSH
  sudo ufw allow 80/tcp    # Allow HTTP
  ```

- **6. Enable Logging (Optional)**

  To enable logging, use:

  ```bash
  sudo ufw logging on
  ```

- **7. Adjust Default Policies (Optional)**
  
  Set default policies for incoming and outgoing traffic. For example, to deny incoming traffic:

  ```bash
  sudo ufw default deny incoming
  sudo ufw default allow outgoing
  ```

- **8. Verify UFW Configuration**
  
  Check your current rules:

  ```bash
  sudo ufw status
  ```

- **9. Restart Services (If Needed)**

  Restart affected services after significant changes.

- **10. Additional Configuration**

  Continue to configure UFW based on your needs, such as adding rules for other services or IP addresses.

## Sample UFW Rules 

- Default rules:

  ```bash
  sudo ufw default allow outgoing
  sudo ufw default deny incoming
  ```

- Allow inbound connections to port 22 from a specific source IP 10.1.2.3.

  ```bash
  ufw allow fromn 10.1.2.3 to any port 22 proto tcp  
  ```

- Allow inbound connections to port 80 from a specific source CIDR 10.1.2.3/24.

  ```bash
  ufw allow fromn 10.1.2.3/24 to any port 80 proto tcp  
  ```

- Deny port 8080.

  ```bash
  ufw deny 8080 
  ```

## Deleting UFW Rules 

We can use the **delete** command to remove a rule, or we can also specify the rule number.

<div class='img-center'>

![](/img/docs/deleting-ufw-rules-optiobs.png)

</div>



 

 