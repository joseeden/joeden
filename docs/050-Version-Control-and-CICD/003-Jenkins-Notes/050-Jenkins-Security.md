---
title: "Jenkins Security"
description: "Securing Jenkins Configurations and Deployments"
tags:
- CICD
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
- Jenkins
sidebar_position: 50
last_update:
  date: 5/13/2020
---


## Using Reverse Proxy 

If you're using a reverse proxy, you may need to enable proxy compatibility to make your Jenkins application accessible.


```bash
Dashboard > Manage Jenkins > Security > 
CSRF Protection > Check Enable proxy compatibility
```

![](/img/docs/1101-jenkins-security-enable-proxy-compatibility.png)