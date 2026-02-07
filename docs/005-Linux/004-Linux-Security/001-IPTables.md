---
title: "IPTables"
tags: 
- Linux
- Red Hat
- Certifications
sidebar_position: 1
last_update:
  date: 5/29/2021
---


**Iptables** is a command-line firewall utility that uses policy chains to allow or block traffic. When a connection tries to establish itself on your system, iptables looks for a rule in its list to match it to. If it doesn’t find one, it resorts to the default action.

iptables almost always comes pre-installed on any Linux distribution. To update/install it, just retrieve the iptables package:

```bash
# Before installing and using iptables services on CentOS and Red Hat 7 systems, its recommended to disable firewalld service.
sudo systemctl stop firewalld
sudo systemctl mask firewalld
sudo systemctl status firewalld

# search for iptables
sudo yum search iptables

# Might need to update
sudo yum update -y

# Install
sudo yum install -y iptables-services
```

After installing, you may now checkout the rules. Note that you have to be **root**.

```bash
$ sudo iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```

By default, chain policy accepts FORWARDING connections. We can modify this:

```bash
$ sudo iptables -L | grep FORWARD
Chain FORWARD (policy ACCEPT)
```

To disable, e can change the ACCEPT to DROP: 

```bash 
$ sudo iptables -P FORWARD DROP
$ sudo iptables -L | grep FORWARD
Chain FORWARD (policy DROP)
```

We can also flush the entire iptables rule set. This basically resets/removes rules and IPs.

```bash
sudo iptables --flush
```


## Types of Chains

iptables uses three different chains: input, forward, and output.

- **Input** – This chain is used to control the behavior for incoming connections. For example, if a user attempts to SSH into your PC/server, iptables will attempt to match the IP address and port to a rule in the input chain.

- **Forward** – This chain is used for incoming connections that aren’t actually being delivered locally. Think of a router – data is always being sent to it but rarely actually destined for the router itself; the data is just forwarded to its target. Unless you’re doing some kind of routing, NATing, or something else on your system that requires forwarding, you won’t even use this chain.

- **Output** – This chain is used for outgoing connections. For example, if you try to ping howtogeek.com, iptables will check its output chain to see what the rules are regarding ping and howtogeek.com before making a decision to allow or deny the connection attempt.

## DROP vs. REJECT

To filter incoming ping/ICMP requests from another host/server, use `DROP` or `REJECT` with iptables. This prevents the other server from being able to ping the host.

### DROP
When you use `DROP`, the host will not respond to the requests of the external server. This way, the external server isn't certain if the IP address or interface on the host exists.

- Adding a DROP rule for ICMP packets on `eth0` interface:
    
    ```bash
    ### " -A INPUT " means add policy
    $ sudo iptables -A INPUT --protocol icmp --in-interface eth0 -j DROP
    ```

- Verifying the DROP rule:

    ```bash
    $ sudo iptables -L -v | grep DROP
    46  3864 DROP       icmp --  eth0   any     anywhere             anywhere
    ```

- From an external server trying to ping the host (no reply from host):

    ```bash
    $ ping  172.31.33.29
    PING 172.31.33.29 (172.31.33.29) 56(84) bytes of data.

    ^C
    --- 172.31.33.29 ping statistics ---
    10 packets transmitted, 0 received, 100% packet loss, time 9217ms
    ```

### REJECT
When you specify `REJECT`, the host will respond to the external server's request by rejecting it.

- Adding a REJECT rule for ICMP packets on `eth0` interface:

    ```bash
    $ sudo iptables -A INPUT --protocol icmp --in-interface eth0 -j REJECT
    ```

- Verifying the REJECT rule:

    ```bash
    $ sudo iptables -L -v
    Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
    pkts bytes target     prot opt in     out     source               destination
        0     0 REJECT     icmp --  eth0   any     anywhere             anywhere             reject-with icmp-port-unreachable
    ```

- From an external server trying to ping the host (host returns "Destination Port Unreachable" error):

    ```bash
    $ ping  172.31.33.29
    PING 172.31.33.29 (172.31.33.29) 56(84) bytes of data.
    From 172.31.33.29 icmp_seq=1 Destination Port Unreachable
    From 172.31.33.29 icmp_seq=2 Destination Port Unreachable
    From 172.31.33.29 icmp_seq=3 Destination Port Unreachable
    From 172.31.33.29 icmp_seq=4 Destination Port Unreachable
    ^C
    --- 172.31.33.29 ping statistics ---
    4 packets transmitted, 0 received, +4 errors, 100% packet loss, time 3057ms
    ```


## IPTables examples 

### Blocking Incoming HTTP Traffic

In this example, we're blocking incoming TCP traffic with source port range 1024-65535 and destination port 80 (HTTP).

```bash
$ iptables -A INPUT -p tcp \
  -s 0/0 --sport 1024:65535 \
  -d 0/0 --dport 80 \
  -j REJECT
```

### Blocking Outgoing HTTP Traffic

Similarly, this command blocks outgoing TCP traffic with source port range 1024-65535 and destination port 80 (HTTP).

```bash
$ iptables -A OUTPUT -p tcp \
  -s 0/0 --sport 1024:65535 \
  -d 0/0 --dport 80 \
  -j REJECT
```

### What if I DROP and ACCEPT the same IP address? 

**What will take precedence?**
The rules will be processed in line order of the file. If there is a match for a rule no other rules will be processed for that IP packet in your case.

In this setup, since the REJECT is seen first, iptables will use REJECT, and then disregards DROP.

```bash
$ sudo iptables -L -v
Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
    4   336 REJECT     icmp --  eth0   any     anywhere             anywhere             reject-with icmp-port-unreachable
    0     0 DROP       icmp --  eth0   any     anywhere             anywhere
```

In this setup, since the DROP is seen first, iptables will use DROP, and then disregards REJECT.

```bash 
$ sudo iptables -L -v
Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
   11   924 DROP       icmp --  eth0   any     anywhere             anywhere
    0     0 REJECT     icmp --  eth0   any     anywhere             anywhere             reject-with icmp-port-unreachable
```

## Saving Firewall Rules

:::warning[NOTE]
This is the old method.
:::

If you want to save your firewall rules configuration (like a backup) when you flush or restart `firewalld`, you can follow these steps.

### Adding a non-persistent rule

- Add a rule to reject incoming TCP traffic with source port range 1024-65535 and destination port 80 (HTTP).

    ```bash
    $ sudo iptables -A INPUT -p tcp -s 0/0 --sport 1024:65535 -d 0/0 --dport 80 -j REJECT
    ```

- Verify the rule is added:

    ```bash
    $ sudo iptables -L -v
    Chain INPUT (policy ACCEPT 3653 packets, 582K bytes)
    pkts bytes target     prot opt in     out     source               destination
        0     0 REJECT     tcp  --  any    any     anywhere             anywhere             tcp spts:1024:65535 dpt:http reject-with icmp-port-unreachable
    ```

- Restart `firewalld` to apply the changes:

    ```bash
    sudo systemctl restart firewalld
    ```

- After restarting `firewalld`, verify that the rule is still active:

    ```bash
    $ sudo iptables -L -v
    Chain INPUT (policy ACCEPT 8 packets, 612 bytes)
    pkts bytes target     prot opt in     out     source               destination
    ```

### Creating a persistent rule

- Add the same rule (from previous example) which rejects incoming TCP traffic with source port range 1024-65535 and destination port 80 (HTTP).

    ```bash
    $ sudo iptables -A INPUT -p tcp -s 0/0 --sport 1024:65535 -d 0/0 --dport 80 -j REJECT
    ```

- Verify the rule is added:

    ```bash
    $ sudo iptables -L -v
    Chain INPUT (policy ACCEPT 3653 packets, 582K bytes)
    pkts bytes target     prot opt in     out     source               destination
        0     0 REJECT     tcp  --  any    any     anywhere             anywhere             tcp spts:1024:65535 dpt:http reject-with icmp-port-unreachable
    ```

- To persist these firewall rules across reboots, save them to the iptables configuration file.

    ```bash
    sudo iptables-save > /etc/sysconfig/iptables
    ```

- After saving, restart `firewalld` to ensure the rules are applied on reboot:

    ```bash
    sudo systemctl restart firewalld
    ```

- Verify that the rules are now saved and will be restored after a reboot:

    ```bash
    $ sudo iptables -L -v
    Chain INPUT (policy ACCEPT 44 packets, 3340 bytes)
    pkts bytes target     prot opt in     out     source               destination

    Chain FORWARD (policy ACCEPT 0 packets, 0 bytes)
    pkts bytes target     prot opt in     out     source               destination

    Chain OUTPUT (policy ACCEPT 26 packets, 2716 bytes)
    pkts bytes target     prot opt in     out     source               destination
    ```

### Restoring the previous rule

- To restore the rules, we just load the rules previously saved. We can see that  the same rule is back.

    ```bash 
    $ sudo iptables-restore < /etc/sysconfig/iptables
    $ sudo iptables -L -v
    Chain INPUT (policy ACCEPT 6 packets, 432 bytes)
    pkts bytes target     prot opt in     out     source               destination
        0     0 REJECT     tcp  --  any    any     anywhere             anywhere             tcp spts:1024:65535 dpt:http reject-with icmp-port-unreachable
    ```

## iptables Configuration File

The iptables configuration file (`/etc/sysconfig/iptables`) contains the saved firewall rules. You can check its existence and permissions using:

```bash
$ ls -lrt /etc/sysconfig/iptables*
-rw-------. 1 root root 2116 Aug 13 01:24 /etc/sysconfig/iptables-config
-rw-------. 1 root root  550 Aug 13 01:24 /etc/sysconfig/iptables
```

This file (`/etc/sysconfig/iptables`) stores the rules in a format that can be restored using `iptables-restore` command. Below is a sample config file. This file includes options for saving and restoring iptables rules, as well as controlling how the status output is formatted.

```bash
# Load additional iptables modules (nat helpers)
# Default: -none-
# Space-separated list of nat helpers (e.g. 'ip_nat_ftp ip_nat_irc'), which
# are loaded after the firewall rules are applied. Options for the helpers are
# stored in /etc/modprobe.conf.
IPTABLES_MODULES=""

# Save current firewall rules on stop.
# Value: yes|no, default: no
# Saves all firewall rules to /etc/sysconfig/iptables if firewall gets stopped
# (e.g. on system shutdown).
IPTABLES_SAVE_ON_STOP="no"

# Save current firewall rules on restart.
# Value: yes|no, default: no
# Saves all firewall rules to /etc/sysconfig/iptables if firewall gets
# restarted.
IPTABLES_SAVE_ON_RESTART="no"

# Save (and restore) rule and chain counter.
# Value: yes|no, default: no
# Save counters for rules and chains to /etc/sysconfig/iptables if
# 'service iptables save' is called or on stop or restart if SAVE_ON_STOP or
# SAVE_ON_RESTART is enabled.
IPTABLES_SAVE_COUNTER="no"

# Numeric status output
# Value: yes|no, default: yes
# Print IP addresses and port numbers in numeric format in the status output.
IPTABLES_STATUS_NUMERIC="yes"

# Verbose status output
# Value: yes|no, default: yes
# Print info about the number of packets and bytes plus the "input-" and
# "outputdevice" in the status output.
IPTABLES_STATUS_VERBOSE="no"

# Status output with numbered lines
# Value: yes|no, default: yes
# Print a counter/number for every rule in the status output.
IPTABLES_STATUS_LINENUMBERS="yes"

# Reload sysctl settings on start and restart
# Default: -none-
# Space-separated list of sysctl items which are to be reloaded on start.
# List items will be matched by fgrep.
#IPTABLES_SYSCTL_LOAD_LIST=".nf_conntrack .bridge-nf"

# Set wait option for iptables-restore calls in seconds
# Default: 600
# Set to 0 to deactivate the wait.
#IPTABLES_RESTORE_WAIT=600

# Set wait interval option for iptables-restore calls in microseconds
# Default: 1000000
# Set to 100000 to try to get the lock every 100000 microseconds, 10 times a
# second.
# Only usable with IPTABLES_RESTORE_WAIT > 0
#IPTABLES_RESTORE_WAIT_INTERVAL=1000000 
```

## Save on Stop and Restart

In the **/etc/sysconfig/iptables-config** file, there are three parameters that are commonly checked or modified.

### IPTABLES_SAVE_ON_STOP

If this is set to "yes," the state of the firewall rules will be preserved when the firewall is stopped. This will create a file with all the iptables rules in it.
- For testing and development, where you're flushing rules often, this is typically set to "no".
- For production use, this is normally set to "yes".

```bash
# Save current firewall rules on stop.
# Value: yes|no, default: no
# Saves all firewall rules to /etc/sysconfig/iptables if the firewall gets stopped
# (e.g., on system shutdown).
IPTABLES_SAVE_ON_STOP="no"
```

### IPTABLES_SAVE_ON_RESTART

If this is set to "yes," the state of the firewall rules will be preserved when the firewall is restarted. This will create a file with all the iptables rules in it.
- For testing and development, where you're flushing rules often, this is typically set to "no".
- For production use, this is normally set to "yes".

```bash
# Save current firewall rules on restart.
# Value: yes|no, default: no
# Saves all firewall rules to /etc/sysconfig/iptables if the firewall gets
# restarted.
IPTABLES_SAVE_ON_RESTART="no"
```

### IPTABLES_SAVE_COUNTER
If this is set to "yes," the rule and chain counters will be saved and restored. This will preserve the packet and byte counts for each rule and chain.

```bash
# Save (and restore) rule and chain counter.
# Value: yes|no, default: no
# Save counters for rules and chains to /etc/sysconfig/iptables if
# 'service iptables save' is called or on stop or restart if SAVE_ON_STOP or
# SAVE_ON_RESTART is enabled.
IPTABLES_SAVE_COUNTER="no"
```