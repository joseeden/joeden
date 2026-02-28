---
title: "Installation Checklist"
description: "Installation Checklist"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 10
last_update:
  date: 9/15/2023
---

## Overview

This guide provides a simplified checklist for installing OpenStack in virtual or bare metal environments. 

## Passwords

| Description                  | Parameter         | Value     |
| ---------------------------- | ----------------- | --------- |
| SQL Database `root` password | `MYSQL_ROOT`      | openstack |
| `admin` user password        | `ADMIN_PASS`      | openstack |
| Cinder database password     | `CINDER_DBPASS`   | openstack |
| `cinder` user password       | `CINDER_PASS`     | openstack |
| Horizon database password    | `DASH_DBPASS`     | openstack |
| `demo` user password         | `DEMO_PASS`       | openstack |
| Glance database password     | `GLANCE_DBPASS`   | openstack |
| `glance` user password       | `GLANCE_PASS`     | openstack |
| Keystone database password   | `KEYSTONE_DBPASS` | openstack |
| Metadata secret              | `METADATA_SECRET` | openstack |
| Neutron database password    | `NEUTRON_DBPASS`  | openstack |
| `neutron` user password      | `NEUTRON_PASS`    | openstack |
| Nova database password       | `NOVA_DBPASS`     | openstack |
| `nova` user password         | `NOVA_PASS`       | openstack |
| `placement` user password    | `PLACEMENT_PASS`  | openstack |
| RabbitMQ password            | `RABBIT_PASS`     | openstack |

## Firewall and Common Ports

| Service                      | Port            |
| ---------------------------- | --------------- |
| Horizon Dashboard (HTTP)     | 80              |
| SSL Enabled Services (HTTPS) | 443             |
| Block Storage iSCSI Target   | 3260            |
| MariaDB                      | 3306            |
| RabbitMQ                     | 5672            |
| Cinder Endpoints             | 8776            |
| Nova Endpoints               | 8774-8775, 8773 |
| Nova VM Consoles             | 5900-5999       |
| Nova VNC Proxy (browsers)    | 6080            |
| Nova VNC Proxy (clients)     | 6081            |
| Nova HTML5 Console           | 6082            |
| Keystone Admin Endpoint      | 35357           |
| Keystone Public Endpoint     | 5000            |
| Glance API                   | 9292            |
| Glance Registry              | 9191            |
| Neutron API                  | 9696            |

## Host Addresses

| Name       | IPv4 Address | Netmask       | DNS     |
| ---------- | ------------ | ------------- | ------- |
| controller | 10.0.0.11    | 255.255.255.0 | 8.8.8.8 |
| compute1   | 10.0.0.31    | 255.255.255.0 | 8.8.8.8 |
| compute2   | 10.0.0.32    | 255.255.255.0 | 8.8.8.8 |
| block1     | 10.0.0.41    | 255.255.255.0 | 8.8.8.8 |

## Host SSH Users

| Host       | Username | Password  |
| ---------- | -------- | --------- |
| controller | `jmeden` | openstack |
| compute1   | `jmeden` | openstack |
| compute2   | `jmeden` | openstack |
| block1     | `jmeden` | openstack |

Commands to check or disable firewall:

```bash
sudo ufw status verbose
sudo ufw disable
```
