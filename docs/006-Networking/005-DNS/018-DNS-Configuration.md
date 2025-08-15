---
title: "DNS Lab"
description: "DNS Lab"
tags: 
- Networking
- Cybersecurity
sidebar_position: 18
last_update:
  date: 1/16/2018
---



## Overview

This lab simulates a typical DNS infrastructure. It includes:

- A client machine to send DNS queries
- A cache-only DNS server that forwards queries to public resolvers
- A public DNS resolver for external lookups
- Two authoritative DNS servers for internal domains

This setup mirrors real DNS infrastructures for practicing both private and public name resolution.

<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns-lab-config.png)

</div>


## Recommended Hardware

Recommended:

- 16GB RAM
- 200GB disk space

VirtualBox is used to create virtual machines for this lab

## Install VirtualBox

VirtualBox is a free hypervisor used to run virtual machines for the lab.

1. Download VirtualBox from Oracle's website
2. Choose the package for your operating system
3. Follow the installation wizard and accept default settings
4. Reboot the system after installation

