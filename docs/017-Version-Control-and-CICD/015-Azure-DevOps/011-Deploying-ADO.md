---
title: "Deploying ADO Server"
tags: 
- CICD
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
- Azure DevOps
sidebar_position: 11
last_update:
  date: 9/5/2022
---

## Deployment Options

- **Single Server Deployment**

  - All components (SQL Server and Azure DevOps Server) run on one machine.  
  - Suitable for small teams (up to 50 users, though it can support over 100).  
  - Requires Windows Server 2019+, SQL Server 2017+ (not SQL Express).  
  - Minimum specs: dual-core CPU, 4GB RAM, SSD.  
  - Double the specs if using the code search engine.  

    ![](/img/docs/02022025-ado-single-server.png)

- **Two Server Deployment**

  - SQL Server runs on separate hardware/VM
  - Optimized database and application performance.  
  - Recommended for 50-1,000 users.  
  - Reduces downtime risk and simplifies backup.  

    ![](/img/docs/02022025-ado-two-server.png)

- **Scaled-Out Deployment**

  - Multiple application servers handle requests.  
  - Database runs on a SQL cluster or Azure SQL DB for high availability.  
  - Azure SQL DB offers a 99.99% SLA but requires low latency between VMs and the database.  

    ![](/img/docs/02022025-ado-scaled-out.png)

