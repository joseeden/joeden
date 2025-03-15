---
title: "Restrict Kernel Modules"
description: "Restrict Kernel Modules"
tags:
    - Cloud
    - DevOps
    - Containers
    - Containerization
    - Kubernetes
    - Cybersecurity
sidebar_position: 15
last_update:
  date: 3/11/2022
---



## Kernel Modules 


In Linux, the kernel handles core system functions and manages hardware. To keep the kernel compact, additional features can be added dynamically through **kernel modules**.

<div class='img-center'>

![](/img/docs/kernel-modules-in-linux.png)

</div>


Kernel modules are pieces of code that extend the kernel’s capabilities without needing a system reboot.


## Use Cases

1. **Hardware Support**  
   - Device drivers for different hardware components.
   - Provide support for virtualized hardware, e.g. in the cloud

2. **Filesystem Support**  
   - Modules for supporting various file system formats.
   - Support for specialized filesystems like ZFS, Btrfs, or NTFS.

3. **Network Protocols**  
   - TCP/IP stack and other network protocol modules.

4. **Security Modules**  
   - Enhancing security with modules like SELinux and AppArmor.

## Security Considerations

1. **Unauthorized Modules**  
   - Loaded unauthorized modules can create security risks.
   - Restrict and control module loading to mitigate these risks.

2. **Regular Updates**  
   - Keep modules, especially third-party ones, updated.

3. **Monitoring**  
   - Regularly check for unexpected or unauthorized changes.
   - se monitoring tools to alert on new module loads or changes

## Example Commands

- Load a module:
  ```bash
  sudo modprobe <module-name>
  ```

- Unload a module:
  ```bash
  sudo rmmod <module-name>
  ```

- List loaded modules:
  ```bash
  lsmod
  ```

- View module information:
  ```bash
  modinfo <module-name>
  ```


## Restricting Kernel Modules

To enhance security, restrict kernel module loading to prevent unauthorized modules from being loaded.

**Methods:**

1. **sysctl Configuration**  
   Use `sysctl` to disable module loading.

   Edit `/etc/sysctl.conf`:
   ```bash
   kernel.modules_disabled = 1
   ```
   Apply changes:
   ```bash
   sudo sysctl -p
   ```

2. **modprobe Configuration**  
   Configure `modprobe` to restrict specific modules.

   Example `modprobe.conf`:
   ```bash
   install usb-storage /bin/true
   ```
   Apply changes:
   ```bash
   sudo modprobe -r <module-name>
   ```

3. **Blacklisting Modules**  
   Prevent specific modules from loading by editing `/etc/modprobe.d/blacklist.conf`.

   Example blacklist.conf:
   ```bash
   blacklist <module-name>
   ```
   Apply changes:
   ```bash
   sudo update-initramfs -u
   ```

   Reboot and check:
   ```bash
   shutdown -r now 
   lsmod | grep <module>
   ```


**Caution:**

- Modifying kernel module loading can affect system functionality.
- Review and update module restrictions regularly.
- Document changes and test before applying to production.


## Disable Loading of USB Storage Modules

1. Edit `/etc/sysctl.conf` or create a new file in `/etc/sysctl.d/`:
   ```bash
   # Disable loading of kernel modules
   kernel.modules_disabled = 1
   ```

   Apply changes:
   ```bash
   sudo sysctl -p
   ```

2. Create or edit `/etc/modprobe.d/blacklist-usb-storage.conf`:
   ```bash
   # Blacklist USB storage modules
   blacklist usb-storage
   ```

   Apply changes:
   ```bash
   sudo update-initramfs -u
   ```

## Disable Loading of DCCP Module   

Another module that we can disabled is the Datagram Congestion Control Protocol (DCCP) Module.

1. Edit `/etc/modprobe.d/blacklist.conf`:
   ```bash
   blacklist dccp
   ```
2. Reboot and verify:
   ```bash
   shutdown -r now 
   lsmod | grep dccp
   ```

 

 