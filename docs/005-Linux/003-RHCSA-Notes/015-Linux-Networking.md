---
title: "Linux Networking"
tags: 
- Linux
- Red Hat
- Certifications
sidebar_position: 15
last_update:
  date: 3/21/2021
---


## NIC Naming

Network Interface Card (NIC) naming in Linux can be identified using commands like `ip link` and `ip addr show`. These commands provide information about the state, configuration, and attributes of network interfaces.

- IP address configuration needs to be connected to a specific network device. 
- Every system has an `lo` device, which is for internal networking. 
- The name of the real network device is presented as a BIOS name. 
- If the driver doesn't reveal network device properties, classical naming is used.
- Classical naming is using device names like `eth0`, `eth1`, and so on. 

BIOS naming is based on hardware properties to give more specific information in the device name: 

- `em[1-N]` for embedded NICs 
- `eno[nn]` for embedded NICs 
- `p[slotp]p[port]` for NICs on the PCI bus 


Sample output: 

```bash
$ ip link

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9001 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 06:57:3b:26:42:56 brd ff:ff:ff:ff:ff:ff
```
```bash
$ ip addr show

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9001 qdisc mq state UP group default qlen 1000
    link/ether 06:57:3b:26:42:56 brd ff:ff:ff:ff:ff:ff
    inet 172.31.33.29/20 brd 172.31.47.255 scope global dynamic noprefixroute eth0
       valid_lft 3065sec preferred_lft 3065sec
    inet6 fe80::457:3bff:fe26:4256/64 scope link
       valid_lft forever preferred_lft forever
```


## Runtime Configurations

Runtime configurations are temporary settings that are not persistent across reboots. These configurations can be set using the `ip` command to manage and display network interface parameters.

- `ip` replaces the legacy `ifconfig` tool. 
- It can be used to manage all aspects of IP networking.
- Use `ip addr` to manage address properties. 
- Use `ip link` to show linke properties. 

Sample output: 

```bash
$ ip link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9001 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 06:57:3b:26:42:56 brd ff:ff:ff:ff:ff:ff
```
```bash
$ ip -s link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    RX: bytes  packets  errors  dropped missed  mcast
    2309540    576      0       0       0       0
    TX: bytes  packets  errors  dropped carrier collsns
    2309540    576      0       0       0       0
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9001 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 06:57:3b:26:42:56 brd ff:ff:ff:ff:ff:ff
    RX: bytes  packets  errors  dropped missed  mcast
    302018206  275609   0       0       0       0
    TX: bytes  packets  errors  dropped carrier collsns
    40401188   124646   0       0       0       0
```

## Routing IP Traffic

### Static Routing

Static routing involves manually configuring routes in a routing table. This method is typically used when the network topology is simple or when specific paths need to be defined for traffic. Useful when routing traffic from one IP address to another using a non-default route.

Display available routes. 
The first one is typically the default gateway and the first hop in traceroute.

```bash
$ netstat -rn
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         172.31.0.1      0.0.0.0         UG        0 0          0 eth0
172.31.0.0      0.0.0.0         255.255.240.0   U         0 0          0 eth0
```

A newer way to display IP routes:

```bash
$ ip route show
default via 172.31.0.1 dev eth0 proto dhcp metric 100
172.31.0.0/20 dev eth0 proto kernel scope link src 172.31.3.65 metric 100
```

Adding routes using the old method:

```bash
route add -net <network> netmask 255.255.255.0 gw <gw-addr> dev <interface>
```

Adding routes using the new method:

```bash
ip route add <dest-ip-addr> via <gw-addr> dev <interface>
```

Deleting routes:

```bash
sudo ip route delete <route-entry>
```

### Dynamic Routing

Dynamic routing allows routers to communicate with each other to dynamically update routing tables based on network changes. This method is more adaptive to network changes and is commonly used in larger, more complex networks.

For detailed information on dynamic routing with RedHat and Linux, refer to the following resources:

- [Dynamic routing with RedHat](https://carroll.net/blog/dynamic-routing-with-redhat/)
- [Linux - how to turn on the the RIP (dynamic routing)](https://www.unix.com/unix-for-dummies-questions-and-answers/242159-linux-how-turn-rip-dynamic-routing.html)
- [Understand the basics of Linux routing](https://www.techrepublic.com/article/understand-the-basics-of-linux-routing/)
- [How To Add Route In Linux](https://arstech.net/add-route-linux/)
- [How to Add Persistent Static Routes on RHEL 6/CentOS 6](https://webhostinggeeks.com/howto/how-to-add-persistent-static-routes-on-rhel-6centos-6/)

## DNS

DNS settings are crucial for resolving domain names to IP addresses. Note that every time the network manager restarts, the **resolv.conf** is recreated.

```bash
$ cat /etc/resolv.conf

# Generated by NetworkManager
search ap-southeast-1.compute.internal
nameserver 172.31.0.2
```


## Network Manager

Network Manager is a daemon that manages network connections and configurations. For the majority of RHEL installations, Network Manager is installed by default.

To check if Network Manager is installed:

```bash
$ which NetworkManager

/usr/bin/NetworkManager
```

To check the status: 

```bash
sudo systemctl status NetworkManager
```

If it's not installed yet, run the following command:

```bash
sudo dnf install -y NetworkManager
sudo systemctl enable --now NetworkManager
sudo systemctl status NetworkManager
```

Configuration files for each NIC can be found in the following directory:

```bash
$ ll /etc/sysconfig/network-scripts/

total 8
-rw-r--r--. 1 root root 244 May  5  2021 ifcfg-ens3
-rw-r--r--. 1 root root 159 Nov 29 03:55 ifcfg-eth0
```

To edit configuration files for the NICs, you can use either **nmcli** or **nmtui**, which will interact with the Network Manager to recreate the config files.

![](/img/docs/sv-nic-3.png)


## Network Configuration Files

Network configuration files contain settings for each network interface. These files can be found in the `/etc/sysconfig/network-scripts/` directory.

```bash
$ ll /etc/sysconfig/network-scripts/
total 8
-rw-r--r--. 1 root root 244 May  5  2021 ifcfg-ens3
-rw-r--r--. 1 root root 159 Nov 29 03:55 ifcfg-eth0
```
```bash
$ cat ifcfg-ens3

TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=dhcp
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
NAME=ens3
UUID=14724ada-5aff-43e2-a0f7-c3f3c3f03151
DEVICE=ens3
ONBOOT=yes
```
```bash 
$ cat ifcfg-eth0
# Created by cloud-init on instance boot automatically, do not edit.
#
BOOTPROTO=dhcp
DEVICE=eth0
HWADDR=06:57:3b:26:42:56
ONBOOT=yes
TYPE=Ethernet
USERCTL=no
```


## nmcli 

`nmcli` is a command-line client for Network Manager. It allows controlling Network Manager and reporting its status.

- An nmcli connection is a configuration added to a network interface. 
- Connections are stored in configuration files. 
- The NetworkManager service must be running to manage these files. 


### Install bash-completion

To use `nmcli` efficiently, install the **bash-completion RPM package**. Follow the link [RHEL / CentOS Linux install and activate Bash completion](https://www.cyberciti.biz/faq/fedora-redhat-scientific-linuxenable-bash-completion/) for instructions.

```bash
sudo yum install -y bash-completion
```

To verify installation:

```bash
$ rpm -qa | grep bash-completion
bash-completion-2.7-5.el8.noarch
```

To activate bash-completion, log out and log back in.


### Using nmcli

Run the following command to interact with Network Manager:

```bash
nmcli
```

To see the status of devices:

```bash
$ nmcli device status

DEVICE  TYPE      STATE      CONNECTION
eth0    ethernet  connected  System eth0
eth1    ethernet  connected  Wired connection 1
lo      loopback  unmanaged  --
```


To see man pages for nmcli:

```bash
$ man 7 nmcli-examples

NMCLI-EXAMPLES(7)                                        Examples                                       NMCLI-EXAMPLES(7)

NAME
       nmcli-examples - usage examples of nmcli

SYNOPSIS
       nmcli [OPTIONS...]

DESCRIPTION
       nmcli is a command-line client for NetworkManager. It allows controlling NetworkManager and reporting its status.
       For more information please refer to nmcli(1) manual page.

       The purpose of this manual page is to provide you with various examples and usage scenarios of nmcli.

EXAMPLES
       Example 1. Listing available Wi-Fi APs

           $ nmcli device wifi list
           *  SSID               MODE    CHAN  RATE       SIGNAL  BARS  SECURITY
              netdatacomm_local  Infra   6     54 Mbit/s  37      ▂▄__  WEP
           *  F1                 Infra   11    54 Mbit/s  98      ▂▄▆█  WPA1
              LoremCorp          Infra   1     54 Mbit/s  62      ▂▄▆_  WPA2 802.1X
              Internet           Infra   6     54 Mbit/s  29      ▂___  WPA1
              HPB110a.F2672A     Ad-Hoc  6     54 Mbit/s  22      ▂___  --
              Jozinet            Infra   1     54 Mbit/s  19      ▂___  WEP
              VOIP               Infra   1     54 Mbit/s  20      ▂___  WEP
              MARTINA            Infra   4     54 Mbit/s  32      ▂▄__  WPA2
              N24PU1             Infra   7     11 Mbit/s  22      ▂___  --
              alfa               Infra   1     54 Mbit/s  67      ▂▄▆_  WPA2
              bertnet            Infra   5     54 Mbit/s  20      ▂___  WPA1 WPA2
```

To see auto-completion for nmcli, type `nmcli` and press **Tab** twice:

```bash
$ nmcli
agent       connection  device      general     help        monitor     networking  radio
```

To see details of a specific interface:

```bash
$ nmcli device show eth1

GENERAL.DEVICE:                         eth1
GENERAL.TYPE:                           ethernet
GENERAL.HWADDR:                         0A:C4:B3:6D:CE:CE
GENERAL.MTU:                            9001
GENERAL.STATE:                          100 (connected)
GENERAL.CONNECTION:                     Wired connection 1
GENERAL.CON-PATH:                       /org/freedesktop/NetworkManager/ActiveConnection/3
WI

RED-PROPERTIES.CARRIER:               on
IP4.ADDRESS[1]:                         172.31.32.88/20
IP4.GATEWAY:                            172.31.32.1
IP4.DNS[1]:                             172.31.0.2
IP6.ADDRESS[1]:                         fe80::8c4:b3ff:fe6d:cece/64
```



### Adding a New Address 

To add a new ip address onto a NIC: 

```bash
nmcli connection add type ethernet ifname eth1 con-name eth1
```
```bash
nmcli connection add ifname <interface> \
  ipv4.addresses <ip address> \
  ipv4.gateway <ip-address of gateway> \
  ipv4.dns <ip-address of dns> \
  type <ethernet or wifi>
```

To activate new connection:
 
```bash
nmcli connection up <interface>
```

To see current connections:

```bash
$ nmcli connection show
NAME         UUID                                  TYPE      DEVICE
System eth0  5fb06bd0-0bb0-7ffb-45f1-d6edd65f3e03  ethernet  eth0
ens3         14724ada-5aff-43e2-a0f7-c3f3c3f03151  ethernet  --
```

To modify an existing connection:

```bash
nmcli connection modify eth1 ipv4.addresses 192.168.1.100/24 ipv4.method manual
```

To delete a connection:

```bash
nmcli connection delete eth1
```


### Setting a Static IP

To edit the adapter setting, we can enter an interface prompt in nmcli to change more than one setting. As an example, let's say we will edit eth0. Notice that after you run the command, it will return a new prompt.

```bash
$ sudo nmcli connection edit <adapter-name>

nmcli>
```

To change the settings:

```bash
nmcli> set ipv4.method manual
nmcli> set ipv4.addr 10.0.0.5/24
nmcli> set ipv4.dns 8.8.8.8
nmcli> set ipv4.gateway 10.0.0.10
```

To save the settings temporarily (it will not persist after reboot):
 
```bash
nmcli> save temporary
```

To make the changes persistent: 
```bash
nmcli> save persistent
```

To apply the changes, we can reboot.
```bash
reboot
```

We can also restart NetworkManager but note that this will restart your entire network stack. This means even if you change and restart just one adapter, this will restart the rest of the other adapters as well.

```bash
sudo systemctl restart NetworKManager
```

Similarly, the command below also reloads all adapter configurations. But with this command, the adapters doesn't go offline.

```bash
sudo nmcli connection reload
```

The best approach is to reload just the connection we changed.

```bash
sudo nmcli connection down <conn-name>
sudo nmcli connection up <conn-name>
```


## nmtui

`nmtui` is a text user interface for Network Manager, providing a simple and intuitive way to configure network settings from the terminal.

```bash
$ nmtui
```

![](/img/docs/sv-nmtui.png)


### Editing a Connection

To edit a connection, use the arrow keys to navigate and select **Edit a connection** > **OK** > select the interface 

![](/img/docs/sv-nmtui2.png)

In this case, we want to edit **enp0s3** > **Edit...**

![](/img/docs/sv-nmtui3.png)

We want to change the following:

Settings        | old       | new
----------------|-----------|---------
 ipv4 address   | 10.0.2.17 | 10.0.2.15
 gateway        | 10.0.2.4  | 10.0.2.2
 DNS servers    | 8.8.8.8   | 8.8.8.8, 4.4.4.4

![](/img/docs/sv-nmtui41.png)

![](/img/docs/sv-nmtui42.png)

Go down to the bottom and hit **OK**.

![](/img/docs/sv-nmtui43.png)

It will return to the interface page. Hit **Back** to return to the first page.

![](/img/docs/sv-nmtui44.png)

To apply the changes, select **Activate a connection** > **OK**

![](/img/docs/sv-nmtui45.png)

On the next page, press enter on **Deactivate** to deactivate the connection. Once it changes to **Activate**, press enter to load the connection back up. Hit **Back** afterwards.

![](/img/docs/sv-nmtui46.png)

![](/img/docs/sv-nmtui47.png)

On the main page, hit **OK** to exit out of nmtui.

![](/img/docs/sv-nmtui48.png)

Verify.

![](/img/docs/sv-nmtui49.png)


## Testing Network Connections

Testing network connections is essential to ensure proper connectivity and diagnose issues.

- `ping` is used to test connectivity, 
- `ip addr show` shows current configuration. 
- `ip route show` shows current routing table. 
- `dig` can test DNS nameserver working. 


### Utilities Not Found

If network utilities such as `dig` and `nslookup` are not found, you can install them using the `bind-utils` package. Follow the instructions in this link: [How Do You Install dig and nslookup on a CentOS/RHEL/Fedora Server?](http://www.continualintegration.com/miscellaneous-articles/how-do-you-install-dig-and-nslookup-on-a-centos-rhel-fedora-server/)

To install `bind-utils`, run:

```bash
sudo yum -y install bind-utils
```

### `dig`

`dig` is a network administration command-line tool for querying the Domain Name System (DNS).

To query DNS for the domain `google.com`:

```bash
$ dig google.com

; <<>> DiG 9.11.26-RedHat-9.11.26-6.el8 <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 44609
;; flags: qr rd ra; QUERY: 1, ANSWER: 6, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;google.com.                    IN      A

;; ANSWER SECTION:
google.com.             184     IN      A       142.251.12.138
google.com.             184     IN      A       142.251.12.139
google.com.             184     IN      A       142.251.12.100
google.com.             184     IN      A       142.251.12.101
google.com.             184     IN      A       142.251.12.102
google.com.             184     IN      A       142.251.12.113

;; Query time: 0 msec
;; SERVER: 172.31.0.2#53(172.31.0.2)
;; WHEN: Sat Dec 25 16:27:12 PST 2021
;; MSG SIZE  rcvd: 135
```

If we query a non-existent domain:

```bash
$ dig jkljjk.kl

; <<>> DiG 9.11.26-RedHat-9.11.26-6.el8 <<>> jkljjk.kl
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 58161
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;jkljjk.kl.                     IN      A

;; AUTHORITY SECTION:
.                       300     IN      SOA     a.root-servers.net. nstld.verisign-grs.com. 2021122500 1800 900 604800 86400

;; Query time: 53 msec
;; SERVER: 172.31.0.2#53(172.31.0.2)
;; WHEN: Sat Dec 25 16:29:04 PST 2021
;; MSG SIZE  rcvd: 113
```

### `dig` output 

Let's use the same example from above:

```bash
$ dig google.com

; <<>> DiG 9.11.26-RedHat-9.11.26-6.el8 <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 44609
;; flags: qr rd ra; QUERY: 1, ANSWER: 6, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;google.com.                    IN      A

;; ANSWER SECTION:
google.com.             184     IN      A       142.251.12.138
google.com.             184     IN      A       142.251.12.139
google.com.             184     IN      A       142.251.12.100
google.com.             184     IN      A       142.251.12.101
google.com.             184     IN      A       142.251.12.102
google.com.             184     IN      A       142.251.12.113

;; Query time: 0 msec
;; SERVER: 172.31.0.2#53(172.31.0.2)
;; WHEN: Sat Dec 25 16:27:12 PST 2021
;; MSG SIZE  rcvd: 135
```

Explanation:

- This indicates the version of `dig` being used and the query target (`google.com`):

  ```bash
  ; <<>> DiG 9.11.26-RedHat-9.11.26-6.el8 <<>> google.com
  ```

- Shows global options set for the `dig` command:

  ```bash
  ;; global options: +cmd
  ```

- Indicates that an answer was received:

  ```bash
  ;; Got answer:
  ```

- This header shows the query type, the status (`NOERROR` meaning no error), and the unique query ID:

  ```bash
  ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 44609
  ```

- These flags indicate various details about the query and response:

  ```bash
  ;; flags: qr rd ra; QUERY: 1, ANSWER: 6, AUTHORITY: 0, ADDITIONAL: 1
  ```

  Where: 

  - `qr`: query response.
  - `rd`: recursion desired.
  - `ra`: recursion available.
  - `QUERY: 1`: One query was made.
  - `ANSWER: 6`: Six answers were returned.
  - `AUTHORITY: 0`: No authority records were returned.
  - `ADDITIONAL: 1`: One additional record was returned:

- This section shows the EDNS (Extension mechanisms for DNS) version and UDP payload size:

  ```bash
  ;; OPT PSEUDOSECTION:
  ; EDNS: version: 0, flags:; udp: 4096
  ```

- This section shows the question asked:

  ```bash
  ;; QUESTION SECTION:
  ;google.com.                    IN      A
  ```

- This section shows the answer to the query, listing the IP addresses associated with `google.com`:

  ```bash
  ;; ANSWER SECTION:
  google.com.             184     IN      A       142.251.12.138
  google.com.             184     IN      A       142.251.12.139
  google.com.             184     IN      A       142.251.12.100
  google.com.             184     IN      A       142.251.12.101
  google.com.             184     IN      A       142.251.12.102
  google.com.             184     IN      A       142.251.12.113
  ```

- The query took 0 milliseconds:

  ```bash
  ;; Query time: 0 msec
  ```

- The DNS server used for the query:

  ```bash
  ;; SERVER: 172.31.0.2#53(172.31.0.2)
  ```

- The date and time when the query was made:

  ```bash
  ;; WHEN: Sat Dec 25 16:27:12 PST 2021
  ```

- The size of the response message:

  ```bash
  ;; MSG SIZE  rcvd: 135
  ```


### `ping`

The `ping` command is a basic networking utility used to test the reachability of a host on an IP network. It works by sending ICMP Echo Request packets to the target host and waiting for ICMP Echo Reply packets in response.

When you run the ping command, it typically produces output similar to the following:

```bash
PING google.com (142.250.183.206) 56(84) bytes of data.
64 bytes from 142.250.183.206: icmp_seq=1 ttl=116 time=12.3 ms
64 bytes from 142.250.183.206: icmp_seq=2 ttl=116 time=11.8 ms
64 bytes from 142.250.183.206: icmp_seq=3 ttl=116 time=11.9 ms
64 bytes from 142.250.183.206: icmp_seq=4 ttl=116 time=12.1 ms
64 bytes from 142.250.183.206: icmp_seq=5 ttl=116 time=11.8 ms

--- google.com ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4002ms
rtt min/avg/max/mdev = 11.824/11.984/12.338/0.205 ms
```

Where:

- `64 bytes from 142.250.183.206`: Packet size and source IP.
- `icmp_seq=1`: Sequence number of the ICMP packet.
- `ttl=116`: Time-to-Live value of the packet.
- `time=12.3 ms`: Round-trip time (RTT) for the packet.
- `5 packets transmitted, 5 received`: Number of packets sent and received.
- `0% packet loss`: Percentage of packets lost during transmission.
- `time 4002ms`: Total time taken for the ping operation.

## Monitor Network Performance

### netstat and ss

Both `netstat` and `ss` are command-line tools used to display network connections, routing tables, interface statistics, masquerade connections, and multicast memberships. They provide insights into network activity and configuration on a system.

The older distributions use `netstat` (network statistics) but most modern ones start to use `ss` (socket statistics).

Examples: 

- List the various in-use ports and the process using it: 

  ```bash
  sudo netstat -pan | grep LISTEN
  ```

- Checks all tcp ports that are open: 

  ```bash
  $ ss -t -a
  State         Recv-Q        Send-Q               Local Address:Port                   Peer Address:Port        Process
  LISTEN        0             128                        0.0.0.0:sunrpc                      0.0.0.0:*
  LISTEN        0             128                        0.0.0.0:ssh                         0.0.0.0:*
  ESTAB         0             64                     172.31.3.65:ssh                  180.190.56.162:54565
  LISTEN        0             128                           [::]:sunrpc                         [::]:*
  LISTEN        0             128                           [::]:ssh                            [::]:*
  ```

- Displays the number of seconds that the next expected probe will be sent.

  ```bash 
  $ ss -t -o
  State        Recv-Q        Send-Q               Local Address:Port                  Peer Address:Port         Process
  ESTAB        0             64                     172.31.3.65:ssh                 180.190.56.162:54565         timer:(on,344ms,0)
  ```

- Filter by socket/port:

  ```bash 
  $ ss -tn sport :22
  State        Recv-Q        Send-Q               Local Address:Port                  Peer Address:Port         Process
  ESTAB        0             64                     172.31.3.65:22                  180.190.56.162:54565
  ```


### nmap

`nmap` (Network Mapper) is a powerful open-source tool used for network exploration and security auditing. It scans hosts and services on a network, discovering vulnerabilities and generating useful network maps.

Examples: 

- Scans the OS and provides a traceroute of everything that's running on the system: 

  ```bash
  $ nmap -A localhost
  Starting Nmap 7.70 ( https://nmap.org ) at 2021-11-29 04:00 UTC
  Nmap scan report for localhost (127.0.0.1)
  Host is up (0.00078s latency).
  Other addresses for localhost (not scanned): ::1
  Not shown: 997 closed ports
  PORT    STATE    SERVICE VERSION
  22/tcp  open     ssh     OpenSSH 8.0 (protocol 2.0)
  | ssh-hostkey:
  |   3072 ec:2e:91:af:0b:dc:ac:3d:b2:75:86:6f:2d:93:fb:cc (RSA)
  |   256 5d:a0:e8:60:81:d3:05:56:f8:3d:22:fe:c2:9c:aa:16 (ECDSA)
  |_  256 7c:08:2d:69:6d:38:21:dc:0d:da:a9:20:1b:cd:02:74 (ED25519)
  80/tcp  filtered http
  111/tcp open     rpcbind 2-4 (RPC #100000)
  | rpcinfo:
  |   program version   port/proto  service
  |   100000  2,3,4        111/tcp  rpcbind
  |_  100000  2,3,4        111/udp  rpcbind

  Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
  Nmap done: 1 IP address (1 host up) scanned in 7.77 seconds
  ```

- Scan without leaving any trace: 

  ```bash
  $ nmap -A -sS localhost
  You requested a scan type which requires root privileges.
  QUITTING!
  $
  $ sudo nmap -A -sS localhost
  Starting Nmap 7.70 ( https://nmap.org ) at 2021-11-29 04:05 UTC
  Nmap scan report for localhost (127.0.0.1)
  Host is up (0.000011s latency).
  Other addresses for localhost (not scanned): ::1
  Not shown: 997 closed ports
  PORT    STATE    SERVICE VERSION
  22/tcp  open     ssh     OpenSSH 8.0 (protocol 2.0)
  | ssh-hostkey:
  |   3072 ec:2e:91:af:0b:dc:ac:3d:b2:75:86:6f:2d:93:fb:cc (RSA)
  |   256 5d:a0:e8:60:81:d3:05:56:f8:3d:22:fe:c2:9c:aa:16 (ECDSA)
  |_  256 7c:08:2d:69:6d:38:21:dc:0d:da:a9:20:1b:cd:02:74 (ED25519)
  80/tcp  filtered http
  111/tcp open     rpcbind 2-4 (RPC #100000)
  | rpcinfo:
  |   program version   port/proto  service
  |   100000  2,3,4        111/tcp  rpcbind
  |_  100000  2,3,4        111/udp  rpcbind
  Device type: general purpose
  Running: Linux 3.X
  OS CPE: cpe:/o:linux:linux_kernel:3
  OS details: Linux 3.7 - 3.10
  Network Distance: 0 hops

  OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
  Nmap done: 1 IP address (1 host up) scanned in 10.59 seconds
  ```

### iptraf

`iptraf` (IP Traffic Monitor) is a console-based network monitoring tool for monitoring network traffic in real-time. It captures and displays various IP traffic statistics, including TCP info, UDP counts, ICMP, OSPF information, and more.

To install: 

```bash
sudo yum install -y iptraf
```

Run: 

```bash 
sudo iptraf-ng
```

![](/img/docs/iptraf.png)

Capture and display real-time network traffic statistics in interactive mode:

```bash
sudo iptraf-ng -i all
```

![](/img/docs/iptraf-2.png)


### dstat

`dstat` is used to retrieve information or statistics form components of the system such as network connections, IO devices, or CPU, etc. It is generally used by system administrators to retrieve a handful of information about the above-mentioned components of the system.

To install: 

```bash
sudo yum install -y dstat
```

Run: 

```bash 
dstat
```

![](/img/docs/dstat.png)

Examples: 

- To monitor CPU statistics including system, user, idle, and wait times in real-time:

    ```bash
    dstat --cpu
    ```

- To monitor read and write operations per second on all disks:

    ```bash
    dstat --disk
    ```

- To monitor network traffic:

    ```bash
    dstat --net
    ```

- To monitor memory statistics including used, free, buffered, and cached memory:

    ```bash
    dstat --mem
    ```

- To display system load average over 1, 5, and 15 minutes:

    ```bash
    dstat --load
    ```

- To monitor process-related statistics:

    ```bash
    dstat --top-cpu --top-bio
    ```

- To specify custom interval and count:

    ```bash
    ## Runs `dstat` every 5 seconds (`-cd 5`) for a total of 10 times (`10`)
    dstat -tcd 5 10
    ```



