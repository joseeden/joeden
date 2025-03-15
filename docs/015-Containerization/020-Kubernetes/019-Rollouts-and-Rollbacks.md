---
title: "Rollouts and Rollbacks"
description: "Rollouts and Rollbacks"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 19
last_update:
  date: 4/7/2022
---


## Rollouts

Kubernetes uses **rollouts** to update deployments by replacing replicas based on the new deployment template.

- Includes changes to environment variables, labels, or code
- Triggers whenever the deployment template changes

<div class='img-center'>  

![](/img/docs/rolloutrevision.png)  

</div>

## Rollout Strategies

- **Rolling Updates**
  - Default strategy in Kubernetes
  - Updates replicas in batches, not all at once
  - Allows uninterrupted service during updates
  - Both old and new versions may run temporarily
  - Scaling is not part of the rollout

    <div class='img-center'>  

    ![](/img/docs/rolloutnodowntime.png)  
    
    </div>

- **Recreate**
  - Deletes old Pods before rolling out new versions
  - Forces downtime during updates

    <div class='img-center'>  

    ![](/img/docs/rolloutupdatesrecreate.png)  

    </div>

## Rollbacks

**Rollbacks** revert to a previous revision of a deployed application.

- Useful when an update causes issues
- Restores the last stable version

To perform a rollback:

```bash
kubectl rollout undo deployment/myapp-deployment
```

<div class='img-center'>  

![](/img/docs/rollbacksundo.png)  

</div>



 

 
