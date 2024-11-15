---
title: "Remove Obsolete Packages"
description: "Remove Obsolete Packages and Services"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 14
last_update:
  date: 7/7/2022
---

## Remove Unwanted Packages

To reduce security risks, remove unnecessary packages and services from Kubernetes nodes.

**Steps:**

1. **Install Required Packages Only**  
   Only install the necessary software.

      <div class='img-center'>

      ![](/img/docs/nstall-only-required-packages.png)

      </div>

2. **Identify Obsolete Packages**  
   - List installed packages using package managers (e.g., `apt`, `yum`).
   - Find packages that are no longer needed.

3. **Remove Obsolete Packages**  
   - Uninstall unnecessary packages.
     - For Debian/Ubuntu:
       ```bash
       sudo apt-get autoremove
       ```
     - For Red Hat/CentOS:
       ```bash
       sudo yum autoremove
       ```

4. **Audit and Disable Unneeded Services**  
   - Use `systemctl` to list running services.
   - Stop and disable unnecessary services.
     ```bash
     sudo systemctl stop <service-name>
     sudo systemctl disable <service-name>
     ```

5. **Review systemd Units**  
   - Check `/etc/systemd/system/` for unused unit files.
   - Mask unnecessary units.
     ```bash
     sudo systemctl mask <unit-name>
     ```

6. **Check for Unused Configuration Files**  
   - Look for obsolete config files and remove or archive them.

7. **Reboot Nodes**  
   - Reboot may be required to apply changes.
   - Plan reboots to minimize disruption.

**Caution:**  
- Be careful when removing packages and services.
- Test changes in a controlled environment before applying them to production.

## Remove Unwanted Services

Ensure only necessary services are running:

- List installed services:
  ```bash
  systemctl list-units --type service
  ```

- Stop and disable unused services:
  ```bash
  systemctl stop <service-name>
  systemctl disable <service-name>
  ```

- Remove unnecessary services:
  ```bash
  apt remove <service-name>
  ```