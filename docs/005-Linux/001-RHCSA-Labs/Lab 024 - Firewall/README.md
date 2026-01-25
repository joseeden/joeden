---
title: Firewall
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 24
last_update:
  date: 3/27/2021
---

## Tasks

1. Block remote access to SSH and Apache processes.


## Solution


### 1. Blocking Remote Access to SSH

To prevent remote access to SSH, you can configure your firewall to block incoming connections to the SSH port (typically port 22) or adjust SSH configuration to only allow local connections.

**1. Update SSH Configuration (Optional)**

   If you want to allow SSH only for local connections (localhost), edit the SSH daemon configuration file:

   ```bash
   sudo nano /etc/ssh/sshd_config
   ```

   Ensure the following line is present or uncommented:

   ```
   ListenAddress 127.0.0.1
   ```

   This restricts SSH to listening only on the localhost IP address (IPv4).

**2. Restart SSH Service**

    After making changes, restart the SSH service for the changes to take effect:

    ```bash
    sudo systemctl restart sshd
    ```

**3. Block SSH Port in Firewall**

   Use `firewall-cmd` (for firewalld) or `iptables` (for iptables-based firewalls) to block incoming connections to the SSH port (default: 22):

   ```bash
   sudo firewall-cmd --zone=public --remove-service=ssh --permanent
   sudo firewall-cmd --reload
   ```

   Replace `public` with your appropriate firewall zone.

   Using iptables:

   ```bash
   sudo iptables -A INPUT -p tcp --dport 22 -j DROP
   sudo iptables-save > /etc/sysconfig/iptables
   ```

   This drops incoming TCP traffic to port 22. Adjust `--dport` if your SSH server is running on a different port.


### 2. Blocking Remote Access to Apache

To block remote access to Apache, you can configure firewall rules or Apache itself to restrict access to localhost.

**1. Update Apache Configuration**

   Edit the Apache configuration file (`/etc/httpd/conf/httpd.conf` or `/etc/apache2/apache2.conf` depending on your distribution) to bind Apache to localhost only:

   ```apache
   Listen 127.0.0.1:80
   ```

   This restricts Apache to listening only on the localhost IP address (IPv4).

**2. Restart Apache Service**

   After making changes, restart the Apache service:

   ```bash
   sudo systemctl restart httpd    # For CentOS/RHEL
   sudo systemctl restart apache2  # For Ubuntu/Debian
   ```

**3. Block Apache Port in Firewall**

   Similarly, use firewall-cmd or iptables to block incoming connections to the Apache port (default: 80):
    
   Using firewalld (replace `public` with your appropriate firewall zone.):

   ```bash
   sudo firewall-cmd --zone=public --remove-service=http --permanent
   sudo firewall-cmd --reload
   ```

   Using iptables:

   ```bash
   sudo iptables -A INPUT -p tcp --dport 80 -j DROP
   sudo iptables-save > /etc/sysconfig/iptables
   ```

   This drops incoming TCP traffic to port 80. Adjust `--dport` if your Apache server is running on a different port.
