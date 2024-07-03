---
title: Firewalld
tags: [Linux, Red Hat, Certifications]
sidebar_position: 16
last_update:
  date: 11/29/2021
---


Firewalld is a Linux management tool that provides a simpler alternative to the low-level and complex `nftables`, which replaced `iptables` in modern Linux kernels. It offers an easier way to manage firewall rules and configurations on Linux systems.

![](/img/docs/sv-fw.png)


## Firewalld Components

Firewalld consists of the following key components:

- **Services**
   - Main component, contains one or more ports, as well as optional kernel modules.
   - Predefined configurations for specific network services (e.g., HTTP, SSH).
   - Groups rules relevant to a service under one configuration.

- **Zones**
   - Defines the trust level of network connections.
   - Default config to which network cards can eb assigned to apply specific settings.
   - Contains predefined rules that dictate how incoming and outgoing traffic is treated.

- **Ports** 
   - IP and Port Forwarding, optional elements to allow access to specific ports.
   - Redirects traffic from one IP address and port combination to another.
   - Useful for exposing services running on internal networks to external clients.

There are other additional components,but are not frequently used in a base firewall configuration. 

- **Source and Destination NAT (Network Address Translation)**
   - Allows mapping of IP addresses and ports from one network to another.
   - Useful for scenarios like load balancing, routing internal traffic to external networks, or masking internal addresses.


- **Masquerading**
   - A form of dynamic NAT where outgoing packets are rewritten to appear as if they come from the firewall itself.
   - Protects internal network structure by hiding the actual source of outbound traffic.

- **Rich Rules**
   - Advanced firewall rules using complex filtering criteria beyond simple ports and addresses.
   - Allows for fine-grained control over traffic based on various packet attributes.

- **Lockdowns**
   - Restricts access to specific services or ports based on defined criteria.
   - Enhances security by limiting potential attack vectors and reducing exposure of critical services.

- **Logging and Auditing**
   - Records firewall activities for monitoring and troubleshooting.
   - Provides visibility into traffic patterns, firewall rule matches, and potential security incidents.


## firewall-cmd

`firewall-cmd` is a command line tool that interfaces with firewalld, a dynamic firewall management tool with a D-Bus interface in Linux.

- Manages firewall zones, IPv4 and IPv6 configurations.
- Supports network bridges and ipsets.
- Allows for timed firewall rules within zones.
- Logs denied packets for monitoring and troubleshooting.
- Automatically loads kernel modules based on configuration changes.
- Provides both runtime and permanent configuration options.

To install:

```bash
# Check RHEL version
$ cat /etc/redhat-release

Red Hat Enterprise Linux release 8.5 (Ootpa)
```

Install firewalld: 

```bash 
sudo yum install -y firewalld
```

Start service and check the status: 

```bash 
sudo systemctl start firewalld
sudo systemctl status firewalld
```

Another way to check the status: 

```bash
$ sudo firewall-cmd --state
running
```



## Configuring firewall-cmd

Firewall manage the access through **zones**. Each of these zones have different level of permissions assign to them. However, one of this is the default zone.

### Basic commands

- To get a list of the available zones: 

  ```bash
  $ firewall-cmd --get-zones

  block dmz drop external home internal nm-shared public trusted work
  ```

- To get the default zone:  

  ```bash
  $ firewall-cmd --get-default-zone

  public
  ```

- To see the interfaces belonging to the active/default zone:

  ```bash
  $ firewall-cmd --get-active-zones

  public
    interfaces: eth0
  ```

- To list the ports/rules alowed in the active zone:

  ```bash
  $ firewall-cmd --list-all
  public (active)
    target: default
    icmp-block-inversion: no
    interfaces: eth0
    sources:
    services: cockpit dhcpv6-client ssh
    ports:
    protocols:
    forward: no
    masquerade: no
    forward-ports:
    source-ports:
    icmp-blocks:
  ```

### Creating/modifying zones

- To create a new zone:

  ```bash
  sudo firewall-cmd --new-zone=edenzone --permanent
  sudo firewall-cmd --reload
  ```

  Note that commands run on the CLI are not persistent and will be removed when system boots up. To make this persistent, add the `--permanent` flag and then reload.

- Checking the zones again:

  ```bash
  $ firewall-cmd --get-zones
  block dmz drop edenzone external home internal nm-shared public trusted work
  ```

- To set a zone as a default:

  ```bash
  sudo firewall-cmd --set-default-zone=edenzone
  ```

- To get the list of services with rules already mapped out/defined:

  ```bash
  firewall-cmd --get-services
  ```

- An interface is mapped to a zone. To move it to another zone:

  ```bash
  firewall-cmd --zone=<destination_zone> --change-interface=<interface>
  ```

### Example

Let's say we want to open the firewall for ftp using firewall-cmd.

```bash
$ firewall-cmd --list-all | grep services
  services: cockpit dhcpv6-client ssh

$ firewall-cmd --add-service ftp
success

$ firewall-cmd --list-all | grep services
  services: cockpit dhcpv6-client ftp ssh
```

After reloading the firewall, the output shows that FTP service is no longer listed under services. This is because any dynamically added services like FTP will only be written to runtime and wille be removed from the active configuration when the firewall is restarted. 

```bash
$ firewall-cmd --reload
success
$ firewall-cmd --list-all | grep services
  services: cockpit dhcpv6-client ssh
```

## Firewall rules are non-persistent

After some searching, I've learned that my problem was really easy and it would always be solved by simply restarting the system. This is a bit difficult if you're on an enterprise setup, more so for production, but since I own the dummy EC2 instances, I can simply restart them anytime.

As said, this is not enabled by default but there is an option to enable it.

```bash
sudo iptables-save
```

Of course, if you locked yourself out before you're able to run the command above then it means any rules that locked you out will not persist and will be flushed out when you restart the system.

Other useful references:

- [How to fix iptables if i have blocked all incoming and outgoing connections?](https://askubuntu.com/questions/909984/how-to-fix-iptables-if-i-have-blocked-all-incoming-and-outgoing-connections)
- [Should you use iptables with EC2 instances?](https://serverfault.com/questions/88086/should-you-use-iptables-with-ec2-instances)
- [Why do iptables rules disappear when restarting my Debian system?](https://unix.stackexchange.com/questions/52376/why-do-iptables-rules-disappear-when-restarting-my-debian-system)
- [Saving Iptables Firewall Rules Permanently](https://www.thomas-krenn.com/en/wiki/Saving_Iptables_Firewall_Rules_Permanently)
- [Saving iptables firewall rules permanently on Linux](https://www.cyberciti.biz/faq/how-to-save-iptables-firewall-rules-permanently-on-linux/)
- [How to save iptables firewall rules permanently on Linux](https://www.cyberciti.biz/faq/how-to-save-iptables-firewall-rules-permanently-on-linux/)
- [How to make iptables rules persistent after reboot on Linux](https://linuxconfig.org/how-to-make-iptables-rules-persistent-after-reboot-on-linux)


## Make firewall rules persistent

To make firewall rules persistent across reboots in firewalld, you need to ensure that changes are applied permanently. To do this, you need to run both `--add-service`  commands.

As an example, here are the current rules: 

```bash
$ sudo firewall-cmd --list-all | grep services
  services: cockpit dhcpv6-client ssh
```

On both commands, specify the `ftp` rule that we want to add:

```bash 
$ sudo firewall-cmd --add-service ftp --permanent
success

$ sudo firewall-cmd --add-service ftp
success
```

Verify before reloading: 

```bash
$ firewall-cmd --list-all | grep services
  services: cockpit dhcpv6-client ftp ssh
```

Reload and verify again:

```bash
$ firewall-cmd --reload
success

$ firewall-cmd --list-all | grep services
  services: cockpit dhcpv6-client ftp ssh
```

## Configuration files for Services

Firewalld in Red Hat manages firewall rules for various services. Each service has a configuration file defining its specific rules. To see the list of predefined services, run:

```bash
firewall-cmd --get-services
```

These predefined service configurations can be found in the following directory:

```bash
$ ll /usr/lib/firewalld/services/
total 704
-rw-r--r--. 1 root root  399 Jul 30  2021 amanda-client.xml
-rw-r--r--. 1 root root  427 Jul 30  2021 amanda-k5-client.xml
-rw-r--r--. 1 root root  283 Jul 30  2021 amqps.xml
-rw-r--r--. 1 root root  273 Jul 30  2021 amqp.xml
-rw-r--r--. 1 root root  285 Jul 30  2021 apcupsd.xml
-rw-r--r--. 1 root root  301 Jul 30  2021 audit.xml
<output omitted>
```

For example, to view the configuration file for the HTTPS service:

```bash
$ ll /usr/lib/firewalld/services/http*
-rw-r--r--. 1 root root 448 Jul 30  2021 /usr/lib/firewalld/services/https.xml
-rw-r--r--. 1 root root 353 Jul 30  2021 /usr/lib/firewalld/services/http.xml
```

```bash
$ cat /usr/lib/firewalld/services/https.xml

<?xml version="1.0" encoding="utf-8"?>
<service>
  <short>Secure WWW (HTTPS)</short>
  <description>HTTPS is a modified HTTP used to serve Web pages when security is important. Examples are sites that require logins like stores or web mail. This option is not required for viewing pages locally or developing Web pages. You need the httpd package installed for this option to be useful.</description>
  <port protocol="tcp" port="443"/>
</service>
```

Note that you should not modify these files directly as they are managed by Red Hat and can be overwritten during updates. Instead, create custom service files in:

```bash
$ sudo cd /etc/firewalld/services
```

## Using Firewall Configuration GUI

Firewalld provides a graphical user interface (GUI) called `firewall-config` for managing firewall rules. This tool offers an easy-to-use interface for configuring firewall settings without needing to use command-line instructions.

### Install

To install the `firewall-config` tool, run:

```bash
sudo yum install -y firewall-config
```

### Exploring the GUI

To start the `firewall-config` GUI, execute:

```bash
firewall-config
```

![](/img/docs/sv-fwconfig.png)


Once launched, the `firewall-config` window provides several tabs and options:

1. **Zones**: Allows you to configure different zones with specific rules for different network interfaces.
2. **Services**: Lets you add or remove predefined services that should be allowed or blocked.
3. **Ports**: Enables you to manually specify ports that should be opened or closed.
4. **ICMP Filters**: Provides options to configure ICMP message filtering.
5. **Rich Rules**: Allows for the creation of complex firewall rules with more detailed specifications.

### Adding a Service

To add a service using the `firewall-config` GUI:

1. Open `firewall-config`.
2. Select the desired zone from the **Zones** tab.
3. Navigate to the **Services** tab.
4. Click on the **Add** button.
5. Choose the service you want to allow from the list.
6. Click **OK** to apply the changes.

### Opening a Port

To open a specific port using the `firewall-config` GUI:

1. Open `firewall-config`.
2. Select the desired zone from the **Zones** tab.
3. Navigate to the **Ports** tab.
4. Click on the **Add** button.
5. Enter the port number and select the protocol (TCP/UDP).
6. Click **OK** to apply the changes.
