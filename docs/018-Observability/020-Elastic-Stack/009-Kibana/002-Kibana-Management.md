---
title: "Kibana Management"
description: "Kibana Management"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Kibana
sidebar_position: 2
last_update:
  date: 3/28/2023
---

## Overview 

Kibana is a tool for managing and visualizing Elasticsearch data. It provides an intuitive interface for administering Elasticsearch clusters.  

## Spaces  

Spaces help organize dashboards, visualizations, and saved objects into separate, manageable areas.  

- Access can be restricted to specific users for better control.  
- Saved objects can be transferred across spaces.
- Objects can be exported as JSON for use in other Kibana instances; ideal for multi-cluster setups.  

## Managing Spaces 

To modify the spaces, click the green icon with `D` and click Manage spaces. To create a space, click Create space. Provide a name and description for the space, You may also adjust which features will be visible to users belonging to this space. Afterwards, click Create space.

![](/img/docs/01262025-elastic-cloud-managing-space.png)

To switch between spaces, just click the same green icon at th eupper left and select your space.

![](/img/docs/01262025-elastic-cloud-managing-space-2.png)

## API Access 

You can also access the space via API. You can run the command below in your terminal to see details about the space.

```bash
curl -s -u elastic:add-password-here \
https://kibana-endpoint-link/api/spaces/space/platform-engineering | jq
```

Output:

```bash
{
  "id": "platform-engineering",
  "name": "Platform Engineering",
  "description": "Space for Platform Engineering Team",
  "color": "#54B399",
  "initials": "PE",
  "imageUrl": "",
  "disabledFeatures": [],
  "solution": "classic"
}
```

To get your endpoint link, login to your Elastic Cloud console and click the hamburger menu at the upper left > Manage this deployment.

![](/img/docs/01262025-elastic-cloud-managing-space-3.png)


## Migrating Saved Objects 