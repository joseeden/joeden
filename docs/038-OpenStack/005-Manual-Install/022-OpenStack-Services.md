---
title: "OpenStack Services"
description: "Install the OpenStack Services"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 20
last_update:
  date: 9/15/2023
---


## Overview

Each service requires configuration updates in its configuration files. These files are edited manually using a text editor.

| Node(s)                | OpenStack Service            |
| ---------------------- | ---------------------------- |
| Controller             | Keystone identity service    |
| Controller             | Glance image service         |
| Controller             | Horizon dashboard            |
| Controller and Compute | Nova compute service         |
| Controller and Compute | Neutron networking service   |
| Controller and Storage | Cinder block storage service |
