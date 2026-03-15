---
title: "Lab: Create a Monitoring Dashboard"
description: "Lab: Create a Monitoring Dashboard"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Monitoring 
- Observability
- APM
- Certifications
sidebar_position: 8
last_update:
  date: 3/29/2021
---

## Overview

In this lab, you will create an Azure Dashboard and add metrics from a Storage account and Application Insights to monitor resource health in one place.

## Creating the Dashboard 

1. From the Azure Portal menu, navigate to **Dashboard hub.**

    Create a new custom dashboard named "Resource Monitoring Dashboard".

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15215926.png)

    </div>

2. Select **Custom** to create a custom dashboard.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15220045.png)

    </div>


3. Provide a name, such as "Resource Monitoring Dashboard", and click **Save**.
    
    **Note:** If the **Save** button does not appear, close the Tile Gallery and try again.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15220437.png)

    </div>

## Storage Account Metrics

1. Go to **Storage account** ➔ select your storage account ➔ Metrics.

    Display the "Transactions" metric.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15221009.png)

    </div>

    **Note:** I've already created a storage account prior to this lab. 
    For more information, please see [Create an Azure storage account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal)


2. Click **Save to dashboard** ➔ **Pin to dashboard**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15221125.png)

    </div>

3. Select your dashboard and ensure it is set to private, then click **Pin**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15221242.png)

    </div>

4. Create another chart to track storage availability.

    In **Metrics Explorer** ➔ **New chart**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15221405.png)

    </div>

5. Select the **Availability** metric. 

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15221508.png)

    </div>

6. Pin the chart to the **Resource Monitoring Dashboard**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15221557.png)

    </div>

## App Service Metrics 

1. Create an App Service with Application Insights

    Navigate to **App Services** and click **Create**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15223941.png)

    </div>

2. Fill in the required details for your App Service.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15224042.png)

    </div>

3. Enable Application Insights during deployment.

    - Go to the **Monitoring** tab
    - Enable **Application Insights**
    - Click **Review + create** and then **Create**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15224311.png)

    </div>

    Azure will create or connect an Application Insights resource automatically.

4. Open a web browser and navigate to your deployed web application. 

    In the example below, `<appname>` represents your App Service name.

    ```bash
    https://<appname>.azurewebsites.net
    ```

    Refresh the page **10–20 times**.

    Each refresh generates request telemetry events that Application Insights will collect and analyze.


## Application Insights Metrics

1. Go to **Application Insights** and access your resource.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15221724.png)

    </div>

2. Pin a chart to your dashboard by clicking the pin icon.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15224639.png)

    </div>

3. Select your dashboard and click **Pin**. 

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-15225253.png)

    </div>

## Organize the Dashboard 

Return to your **Resource Monitoring Dashboard** and verify that all tiles appear.

- Confirm Storage and Application Insights metrics are visible
- Rearrange and resize tiles for better visibility
- Save the dashboard layout

With these tiles combined, the dashboard provides a unified monitoring view across multiple Azure resources.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-15225719.png)

</div>
