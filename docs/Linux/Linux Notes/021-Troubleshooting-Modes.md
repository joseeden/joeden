---
title: "Troubleshooting Modes"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 21
last_update:
  date: 11/29/2021
---

## Interrupting Bootup

There are many stages in the bootup process where you can interrupt to perform troubleshooting. If you can't reach GRUB, you can use a **boot-cd**.

1. **GRUB Boot Menu**:
   Troubleshooting can start at the GRUB boot menu, where you can pass kernel parameters or arguments like `rhgb`(Red Hat Graphical Boot) and `quiet` (suppresses most boot messages).

   Steps: 
   - During boot, access the GRUB menu by pressing a specific key (usually `Esc`, `Shift`, or `F2`).
   - Edit the boot parameters by pressing `e` on the selected boot entry.
   - Add or modify parameters like `rhgb` and `quiet` to control the verbosity of the boot process.
   - Press `Ctrl+X` or `F10` to boot with the modified parameters.

2. **Intervening After Kernel Loading**:
   If your kernel is loading but you want to break in as early as possible after the loading of the kernel, interfere right after the `initramfs`. This stage is ideal for troubleshooting since the system is still at the temporary file system and hasn't switched to the real operating system.

   Steps: 
   - Edit the GRUB entry as described above.
   - Add `rd.break` to the end of the kernel line.
   - This interrupts the boot process after the initramfs is loaded, giving you a root shell.
   - Use this shell to inspect and fix issues within the temporary filesystem.

3. **Using `init=/bin/bash`**:
   This allows you to replace systemd with a basic shell for troubleshooting. This gives you early access to the system for troubleshooting before any services are started.

   Steps: 
   - Edit the GRUB entry as described above.
   - Replace the default init process with `/bin/bash` by adding `init=/bin/bash` to the kernel line.
   - This boots the system into a minimal shell environment.
   - Use this shell to perform low-level troubleshooting and repairs.

4. **Systemd Targets**:
   After systemd is loaded, if something goes wrong in the loading of systemd units, you need to determine if the units relate to the base OS or to the services. Here you'll need to decide which target to use.

    - **systemd.unit=emergency.target**: For issues during the base OS loading.
    - **systemd.unit=rescue.target**: For issues occurring at the very last stage, stopping before the services are loaded.

   Steps: 
   - Edit the GRUB entry as described above.
   - Add `systemd.unit=emergency.target` or `systemd.unit=rescue.target` to the kernel line.
   - `emergency.target` boots the system into a minimal environment with only essential services running, suitable for fixing critical issues.
   - `rescue.target` boots the system into a single-user mode with more services running, useful for troubleshooting issues with services.
   

## Troubleshooting Scenarios 

### 1. Changing the Root Password

To change the root password, you can break into the system early using the **rd.break** parameter at the GRUB menu.


1. Add `rd.break` at GRUB:

  - Enter Grub menu while booting. 
  - Find the line that loads the Linux kernel and add `rd.break` to end of line. 

    ![](/img/docs/sv-chgrootpw-2.png)
    ![](/img/docs/sv-root-pw-1.png)

2. Enter Root Shell. You'll then be brought to the root shell.

    ![](/img/docs/sv-root-shell.png)

3. Remount `/sysroot` with Read-Write Access:

    ```bash
    mount -o remount,rw /sysroot
    ```

4. Change Root Directory:

    ```bash
    chroot /sysroot
    ```

    ![](/img/docs/sv-root-chroot.png)

5. Reset Root Password:

    ```bash
    echo <new-pw> | passwd --stdin root
    ```

    ![](/img/docs/sv-rootpw-reset.png)

6. Create Autorelabel File:

    ```bash
    touch /.autorelabel
    ```

7. Exit and Reboot:

    To exit, hit Ctrl-D. The system will then reboot.
    After this, you'll be brought to the login page. Select Not listed, and enter root.
    
    ![](/img/docs/sv-chroot-login-10.png)
    
    ![](/img/docs/sv-chroot-login-11.png)  

    ![](/img/docs/sv-chroot-login-12.png)


### 2. Filesystem Issues

To prevent any storage issues at bootup, it's better to run `mount -a` so that errors will immediately appear on the command line.

- Real corruption can occur, but it can also be automatically fixed. 
- Problems occur when making typo errors in `/etc/fstab`.
- To fix, remount filesystem in read/write state and edit `/etc/fstab`.
- Different tools can be used to fix fragmentation issues: 

  - **xfs_fsr**: the XFS File System Reorganizer, optimizes XFS filesystems. 
  - **e4defrag**: can be used to defragment Ext4. 


### 3. Networking Issues

For networking issues, common commands include:
- ip`: To manage network interfaces and routing.
- ping`: To check connectivity.

If "Unreachable" errors occur when running `ping', it might be a routing issue. Check the routing table:

```bash
ip route show
```

To delete an IP Entry:

```bash
ip a d <ip>/<mask> dev <interface>
```

To add an IP Address: 

```bash
ip a a dev <interface> <ip>/<mask>
```

To add Default Route:

```bash
ip route add default via <ip>
```

To make routing changes persistent, use **nmtui**. If the IP address is set to automatic, ensure the client gets an IP from a DHCP server:

```bash
dhclient
ip a
```


### 4. Performance Issues

For performance issues, the best tool to use is **top**.

- **Check RAM**: Ensure there is enough free RAM.

  ![](/img/docs/sv-tshootperf-ram.png)

- **Check CPU**: Ensure there is sufficient CPU capacity.

  ![](/img/docs/sv-tshootperf-cpu.png)

- **Identify High CPU Usage**: Find processes consuming high CPU resources.

  ![](/img/docs/sv-tshootperf-pid.png)

You can kill the process by sending a **kill** signal or, if the process is important, **renice** it to a lower priority.

### 5. Software Issues

For software issues, installing packages using **yum** is recommended. This ensures proper installation and handling of dependencies.

- Depency issues in RPM, can be resolved by using repositories. 
- Library cache can be update dby running `ldconfig`. 

### 6. Memory Issues

For memory issues, the best tool to use is **top**.

- **Check Available RAM:**  In the example below, we can see the available RAM. If the system is suffering from bad memory performance:

  ![](/img/docs/sv-tshootmem.png)

- **Check Swap Space:** Ensure there is sufficient swap space available. If there is enough swap space, consider shutting down some processes or rebooting the system.

### Consulting Red Hat Website

For further troubleshooting, consult the Red Hat website and log in for additional resources and support.

![](/img/docs/sv-tshoot-rhlogin.png)

![](/img/docs/sv-tshoot-rhwebsite.png)
