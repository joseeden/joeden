---
title: "Limit Node Access"
description: "Limit Node Access"
tags: 
 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 11
last_update:
  date: 7/7/2022
---


## Best practices

- Limit exposure of controlplane and nodes to the internet.
- Access cluster via VPN or through authorized networks 
- Limit SSH access to internal users (e.g. developers, end users)

Control the accounts:

<div class='img-center'>

![](/img/docs/Limit-node-access-accoutn-types.png)

</div>


To check user details:


<div class='img-center'>

![](/img/docs/limit-node-access-control-accoutns.png)

</div>


We can disable logins for users, or simply delete user account:


<div class='img-center'>

![](/img/docs/limit-node-access-disable-lgoin-or-delete.png)

</div>


Similarly, we can also remove users from groups: 


<div class='img-center'>

![](/img/docs/limit-node-access-remove-users-from-groups.png)

</div>






 

 
