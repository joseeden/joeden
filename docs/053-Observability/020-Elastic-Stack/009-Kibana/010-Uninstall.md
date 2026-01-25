---
title: "Uninstall Kibana"
description: "Uninstall Kibana"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Kibana
sidebar_position: 10
last_update:
  date: 12/30/2022
---

## Overview 

To completely uninstall Kibana, you need to remove all related files, configurations, and packages from your system.

1. **Stop Kibana Service**
   Before uninstalling Kibana, stop the Kibana service to ensure it is not running during the uninstallation process:

   ```bash
   sudo systemctl stop kibana
   ```

2. **Disable Kibana Service**
   Disable Kibana from starting on boot:

   ```bash
   sudo systemctl disable kibana
   ```

3. **Uninstall Kibana Package**
   Depending on the package manager used to install Kibana (e.g., `apt`, `yum`, or `rpm`), use the corresponding command to uninstall Kibana.

   - **For Debian/Ubuntu-based systems (using `apt`):**
     ```bash
     sudo apt-get remove --purge kibana
     sudo apt-get autoremove --purge
     ```

   - **For Red Hat/CentOS-based systems (using `yum` or `dnf`):**
     ```bash
     sudo yum remove kibana
     # or for newer distributions
     sudo dnf remove kibana
     ```

   - **For RPM-based systems (using `rpm`):**
     ```bash
     sudo rpm -e kibana
     ```

4. **Delete Kibana Configuration and Data Files**
   Kibana may leave behind configuration files and data directories. To ensure a complete removal, delete these directories:

   - **Delete Kibana configuration directory:**
     ```bash
     sudo rm -rf /etc/kibana/
     ```

   - **Delete Kibana data directory:**
     ```bash
     sudo rm -rf /var/lib/kibana/
     ```

   - **Delete Kibana logs directory:**
     ```bash
     sudo rm -rf /var/log/kibana/
     ```

5. **Clean up Kibana User and Group (Optional)**
   If Kibana created a user and group during installation, you can delete them as well:

   ```bash
   sudo deluser kibana
   sudo delgroup kibana
   ```

6. **Remove Kibana from System Services (Optional)**
   If Kibana was manually added to system services, you may want to remove those files as well. Check for any lingering service files:

   ```bash
   sudo rm /etc/systemd/system/kibana.service
   sudo systemctl daemon-reload
   ```

7. **Verify Kibana is Completely Removed**
   - Check if Kibana is still installed by running:
     ```bash
     kibana --version
     ```
     This should return a "command not found" message if Kibana was successfully removed.
   
   - Check that there are no Kibana-related processes running:
     ```bash
     ps aux | grep kibana
     ```

8. **Reboot the System (Optional)**
   It’s a good practice to reboot your system to ensure that all changes are properly applied:

   ```bash
   sudo reboot
   ```

After these steps, Kibana should be completely uninstalled from your system.