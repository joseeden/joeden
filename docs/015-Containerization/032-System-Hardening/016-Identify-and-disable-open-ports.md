---
title: "Disable open ports"
description: "Disable open ports"
tags: 
    - Cloud
    - DevOps
    - Containers
    - Containerization
    - Kubernetes
    - Cybersecurity
sidebar_position: 16
last_update:
  date: 7/7/2022
---



## Check open ports 

Use the netstat command to see the open ports:

```bash
netstat -an | grep -w LISTEN 
```

<div class='img-center'>

![](/img/docs/check-open-ports-using-netstat.png)

</div>


Once we have the list of open ports, determine what they are use for. To do this, check the `/etc/services` file. The command below is applicable on Ubuntu systems.

<div class='img-center'>

![](/img/docs/check-the-services-file-ubuntu.png)

</div>


## Ports used by Kubernetes 

Kubernetes requires specific ports for communication between its components. 

<div class='img-center'>

![](/img/docs/disable-open-ports-retain-only-ports-used-by-Kubernetes.png)

</div>



 