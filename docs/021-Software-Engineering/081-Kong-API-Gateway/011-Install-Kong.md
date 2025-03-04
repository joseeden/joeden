---
title: "Install Kong"
description: "Install Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
sidebar_position: 11
last_update:
  date: 8/11/2024
---

## Installation Methods

Kong can be installed across various environments to suit your infrastructure needs.

- **Container**  
    - Using Docker or Kubernetes for containerized environments.  

- **Bare Metal**  
    - Deploy directly on physical or virtual machines.  

- **Cloud Providers**  
    - Install from cloud platforms like AWS, Azure, or GCP.  

- **Helm Chart**  
    - Use Helm to deploy Kong in Kubernetes clusters.  

- **Package Manager**  
    - Using package managers like apt (Debian/Ubuntu) or yum (RHEL/CentOS).  


## Install Kong Gateway on Docker

Kong can be installed on Docker with a PostgreSQL database. There is also an option to use Kong without a database.

For more information, please see [Install Kong Gateway on Docker](https://docs.konghq.com/gateway/latest/install/docker/)



## Install Konga 

Konga is a third-party UI for managing Kong API Gateway which supports monitoring and troubleshooting APIs.

To install Kong, you need to [install NPM first.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


:::info[NOTE]

As of May 2024, the [official Github repository for Konga](https://github.com/pantsel/konga) has been archived. This usually happens when the development has been continued

Other options:

- [Konga on Docker](https://hub.docker.com/r/pantsel/konga) 
- [Kong Enterprise (Free Edition)](https://konghq.com/)
- [KrakenD](https://www.krakend.io/)
- [Tyk](https://tyk.io/)

:::