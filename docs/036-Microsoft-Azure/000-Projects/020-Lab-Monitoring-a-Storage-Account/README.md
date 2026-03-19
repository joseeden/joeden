---
title: "Lab: Monitoring a Storage Account"
description: "Lab: Monitoring a Storage Account"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Monitoring 
- Observability
- APM
- Certifications
sidebar_position: 20
last_update:
  date: 3/29/2021
---

## Overview 

In this lab, we will generate activity on a storage account and use Azure Monitor to track how it is being used. 

## Steps 

1. Login to Azure portal and create a storage account.

    **Note:** I've already created a storage account prior to this lab. 
    For more information, please see [Create an Azure storage account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal)


2. Navigate to your Storage account and create a new container.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15172542.png)

    </div>

3. Open the container and upload at least three files. 

    This generates ingress metrics for the storage account.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15172802.png)

    </div>

4. Download each uploaded file to generate egress metrics.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15172852.png)

    </div>

5. In your Storage account, go to **Monitoring > Metrics**. 

    Select "Transactions" as the metric to view recent storage activity.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15173159.png)

    </div>


6. Add "Ingress" as a second metric to track uploaded data.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15173430.png)

    </div>

7. Add "Egress" as a third metric to track downloaded data.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15173648.png)

    </div>

8. Adjust the time range to "Last 30 minutes" for clearer visibility.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15173856.png)

    </div>

Based on the metrics, you can identify trends such as high download activity, which may indicate increased user access or a potential data exfiltration risk. Monitoring these metrics regularly helps maintain storage performance and security.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-15215226.png)

</div>
