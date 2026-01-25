---
title: Dig Failed on WSL2 Ubuntu 22.04
tags: 
- Linux
sidebar_position: 10
last_update:
  date: 6/8/2024
---




## `dig` command failed due to libuv version mismatch

This KB covers the investigation and resolution steps taken when `dig` failed with a fatal libuv version error inside Ubuntu 22.04 LTS running on WSL2.


## Environment 

- OS: Ubuntu 22.04 LTS (Jammy Jellyfish) on WSL2
- Kernel: Linux TOWER-1 6.6.87.2-microsoft-standard-WSL2
- `libuv` installed version: 1.43.0
- `libdns-export1110` and `libisc-export1105` versions: 1:9.11.19+dfsg-2.1ubuntu3
- `dig` from `dnsutils` package


## Problem 

Running the following command produces a fatal error:

```bash
dig NS joeden.com
```

Output:

```
netmgr/netmgr.c:232:isc__netmgr_create(): fatal error: libuv version too new: running with libuv 1.43.0 when compiled with libuv 1.34.2 will lead to libuv failures
Aborted (core dumped)
```

This indicates a mismatch between the `libuv` version installed on the system (1.43.0) and the version with which the ISC libraries (`libdns-export1110`, `libisc-export1105`) were compiled (1.34.2).


## Steps Taken

### 1. Verified OS and package versions

OS release info:

```bash
lsb_release -a
uname -a
```

Output: Showed Ubuntu 22.04 LTS running on WSL2.

```bash
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 22.04 LTS
Release:        22.04
Codename:       jammy
Linux TOWER-1 6.6.87.2-microsoft-standard-WSL2 #1 SMP PREEMPT_DYNAMIC Thu Jun  5 18:30:46 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux
```

Checked installed ISC packages:

```bash
dpkg -l | grep isc
```

Output: Confirmed `libdns-export1110` and `libisc-export1105` installed at version 1:9.11.19+dfsg-2.1ubuntu3.

```bash
ii  base-files                            12ubuntu4                               amd64        Debian base system miscellaneous files
ii  debianutils                           5.5-1ubuntu2                            amd64        Miscellaneous utilities specific to Debian
ii  isc-dhcp-client                       4.4.1-2.3ubuntu2                        amd64        DHCP client for automatically obtaining an IP address
ii  isc-dhcp-common                       4.4.1-2.3ubuntu2                        amd64        common manpages relevant to all of the isc-dhcp packages
ii  libbdplus0:amd64                      0.2.0-1                                 amd64        implementation of BD+ for reading Blu-ray Discs
ii  libbluray2:amd64                      1:1.3.1-1                               amd64        Blu-ray disc playback support library (shared library)
ii  libisc-export1105:amd64               1:9.11.19+dfsg-2.1ubuntu3               amd64        Exported ISC Shared Library
ii  libxext6:amd64                        2:1.3.4-1build1                         amd64        X11 miscellaneous extension library
ii  libxfixes3:amd64                      1:6.0.0-1                               amd64        X11 miscellaneous 'fixes' extension library
ii  libxmu6:amd64                         2:1.1.3-3                               amd64        X11 miscellaneous utility library
ii  libxmuu1:amd64                        2:1.1.3-3                               amd64        X11 miscellaneous micro-utility library
rc  open-iscsi                            2.0.874-7.1ubuntu6.4                    amd64        iSCSI initiator tools
ii  psmisc                                23.4-2build3                            amd64        utilities that use the proc file system
ii  python3-pkg-resources                 59.6.0-1.2                              all          Package Discovery and Resource Access using pkg_resources
ii  python3-zeroconf                      0.38.3-2                                all          Pure Python implementation of multicast DNS service discovery (Python3)
ii  util-linux                            2.37.2-4ubuntu3                         amd64        miscellaneous system utilities
```

Checked installed `libuv` version:

```bash
dpkg -l | grep libuv
ldconfig -p | grep libuv
```

Output: Installed `libuv1:amd64` version 1.43.0.

```bash
ii  libuv1:amd64                          1.43.0-1                                amd64        asynchronous event notification library - runtime library
ii  libuv1-dev:amd64                      1.43.0-1                                amd64        asynchronous event notification library - development files
        libuv.so.1 (libc6,x86-64) => /lib/x86_64-linux-gnu/libuv.so.1
        libuv.so (libc6,x86-64) => /lib/x86_64-linux-gnu/libuv.so
```

### 2. Tried updating the ISC packages and system

No newer versions available, and packages already at latest.

```bash
sudo apt update
sudo apt install libdns-export1110 libisc-export1105
sudo apt full-upgrade
```

Output:

```bash
Get more security updates through Ubuntu Pro with 'esm-apps' enabled:
  [list of packages...]
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded. 
```


### 3. Attempted reinstalling ISC packages

Did not resolve the libuv mismatch issue.

```bash
sudo apt remove libdns-export1110 libisc-export1105
sudo apt install libdns-export1110 libisc-export1105
```



### 4. Verified no leftover sources from older Ubuntu versions

Found some commented lines referencing Ubuntu 20.04 focal, but no active focal repositories that could cause version mismatch.

```bash
grep -r 'focal' /etc/apt/sources.list*
```


### 5. Tried installing `bind9` from snap for a newer dig binary

Installed... 

```bash
sudo snap install bind9 --classic
```

Failed with error:

```
error: snap "bind9" not found
```

### 6. Tested alternative DNS client: `drill`

Installed `drill` via:

```bash
sudo apt install dnsutils
```

Ran:

```bash
drill NS joeden.com
```

Output:

```
;; ->>HEADER<<- opcode: QUERY, rcode: NOERROR, id: 23573
;; flags: qr rd ; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 0
;; QUESTION SECTION:
;; joeden.com.  IN      NS

;; ANSWER SECTION:
joeden.com.     0       IN      NS      ns3bgq.name.com.
joeden.com.     0       IN      NS      ns4qxz.name.com.
joeden.com.     0       IN      NS      ns1stv.name.com.
joeden.com.     0       IN      NS      ns2hkt.name.com.

;; Query time: 1 msec
;; SERVER: 172.25.144.1
;; WHEN: Sun Aug 10 00:29:58 2024
;; MSG SIZE  rcvd: 154
```

The `drill` command successfully returned the NS records without error.


## Root Cause

The `dig` tool was linked against older ISC libraries compiled with `libuv` 1.34.2, but the system had `libuv` 1.43.0 installed. This ABI mismatch caused `dig` to fail with a fatal error.


## Resolution

Use the `drill` command from `dnsutils` as a working alternative DNS lookup tool on Ubuntu 22.04 WSL2, since it works correctly with the newer `libuv` library.


## Summary

| Step                              | Outcome                                         |
| --------------------------------- | ----------------------------------------------- |
| Check system and package versions | Ubuntu 22.04 with latest ISC and libuv packages |
| Upgrade / reinstall ISC libs      | No effect; mismatch remains                     |
| Snap install bind9                | Not available                                   |
| Run `dig`                         | Fails due to libuv version mismatch             |
| Run `drill`                       | Works perfectly, provides expected results      |


## Notes 

Recommendations:

- Until the ISC packages or `dig` get rebuilt for newer `libuv` versions on WSL2, prefer `drill` as DNS querying tool.
- Alternatively, run `dig` inside a container or on a native Linux environment with compatible library versions.
- Monitor package updates from Ubuntu for fixes.

