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

To switch between spaces, just click the same green icon at the upper left and select your space.

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

When you log in to Kibana, you are automatically placed in the `default` space. You can move saved objects between spaces either by copying them directly or exporting and importing them as files.  

#### Copying Saved Objects to Another Space  

1. In the `default` space, go to **Stack Management > Saved Objects**.  
2. Select the object, click the three dots under **Actions**, then choose **Copy to spaces**.  
3. Under **Select spaces**, choose the target space and click **Copy to 1 Space**.  

    ![](/img/docs/01292025-elastic-cloud-importing-object-4.png)  

4. Once the import is complete, click **Finish**.  

    ![](/img/docs/01292025-elastic-cloud-importing-object-5.png)  

5. Switch to the target space and go to **Stack Management > Saved Objects**.  
6. The copied object should now be visible.  

    ![](/img/docs/01292025-elastic-cloud-importing-object-6.png)  

#### Exporting and Importing Saved Objects  

1. In the `default` space, go to **Stack Management > Saved Objects**.  
2. Select the object and click **Export**. This will download an `export.ndjson` file.  

    ![](/img/docs/01292025-elastic-cloud-importing-object.png)  

3. Switch to the target space by clicking the green icon at the top left. In this example, the second space is **Platform Engineering**.  

    ![](/img/docs/01262025-elastic-cloud-managing-space-2.png)  

4. In the second space, go to **Stack Management > Saved Objects > Import**.  
5. Select the downloaded file from step 2 and click **Import**.  

    ![](/img/docs/01292025-elastic-cloud-importing-object-2.png)  

6. Once the import is complete, click **Done**.  

    ![](/img/docs/01292025-elastic-cloud-importing-object-3.png)  