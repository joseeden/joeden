---
title: "Authentication and Encryption"
description: "Authentication and Encryption in  Prometheus"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 22
last_update:
  date: 3/28/2023
---


## Overview

Prometheus, by default, does not have built-in authentication mechanisms. If authentication is not configured, Prometheus can freely scrape metrics from target nodes. However, this also means that unauthorized or rogue servers can scrape metrics from those nodes, potentially exposing sensitive information. 

To mitigate this, it's important to implement security measures such as authentication and encryption to restrict access and secure the data flow.


## Lab Environment 

<div class='img-center'>

![](/img/docs/prometheus=lab-environment.png) 

</div>


## nabling TLS on Node Exporter 


## Enabling TLS on Prometheus


## Prometheus Encryption


## Pre-requisites  

- [Setup Prometheus](/docs/018-Observability/010-Prometheus-and-Grafana/020-Installation.md)
- [Setup Node Exporter on the nodes](/docs/018-Observability/010-Prometheus-and-Grafana/021-Setting-up-Exporters.md)
