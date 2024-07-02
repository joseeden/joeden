---
title: "IPTables and Firewall"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 16
last_update:
  date: 7/8/2022
---


## IPTables

### IPTables Commands

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


### Types of Chains

iptables uses three different chains: input, forward, and output.

- **Input** – This chain is used to control the behavior for incoming connections. For example, if a user attempts to SSH into your PC/server, iptables will attempt to match the IP address and port to a rule in the input chain.

- **Forward** – This chain is used for incoming connections that aren’t actually being delivered locally. Think of a router – data is always being sent to it but rarely actually destined for the router itself; the data is just forwarded to its target. Unless you’re doing some kind of routing, NATing, or something else on your system that requires forwarding, you won’t even use this chain.

- **Output** – This chain is used for outgoing connections. For example, if you try to ping howtogeek.com, iptables will check its output chain to see what the rules are regarding ping and howtogeek.com before making a decision to allow or deny the connection attempt.

### DROP vs. REJECT

To filter incoming ping/ICMP requests from another host/server, use `DROP` or `REJECT` with iptables. This prevents the other server from being able to ping the host.

- **DROP**
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

- **REJECT**
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
