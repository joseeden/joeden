---
title: "Lab: Auto-Instrumentation"
description: "Lab: Auto-Instrumentation"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Monitoring 
- Observability
- APM
- Certifications
sidebar_position: 22
last_update:
  date: 9/11/2023
---

## Overview 

This lab demonstrates how to monitor the performance and availability of a web application. By deploying the app with Application Insights auto-instrumentation enabled, you can automatically collect telemetry data, such as response times, dependencies, and errors—without adding manual instrumentation code.

## Deploy the Web App 

1. Navigate to App Services in Azure Portal

2. Click **Create** ➔ **Web App**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-18234943.png)

    </div>

3. Provide a unique name for your web app and fill in the details.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-18235352.png)

    </div>

    **Optional:** You can also set the pricing plan to use at the bottom of the page.

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-03-19001000.png)
    
    </div>
    

4. Under **Monitor + secure**, enable Application Insights to automatically collect telemetry data.

    Click **Review + create** then **Create.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-18235515.png)

    </div>

5. Once deployment completes, navigate to the newly created web app.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-19000054.png)

    </div>

## Exploring Metrics 

1. Open you web app and copy the defaul domain URL.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-19000403.png)

</div>

2. Open the web app URL in a separate tab.

You should see something like:

<div class='img-center'>

![](/img/docs/Screenshot2026-03-19000510.png)

</div>
