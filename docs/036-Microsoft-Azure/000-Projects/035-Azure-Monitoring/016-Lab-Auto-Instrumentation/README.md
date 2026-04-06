---
title: "Auto-Instrumentation"
description: "Auto-Instrumentation"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Monitoring 
- Observability
- APM
- Certifications
sidebar_position: 16
# sidebar_custom_props: { "labs": true }
# last_update:
#   date: 9/11/2023
---

## Overview 

This lab demonstrates how to monitor the performance and availability of a web application. By deploying the app with Application Insights auto-instrumentation enabled, you can automatically collect telemetry data, such as response times, dependencies, and errors, without adding manual instrumentation code.

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

    Refresh the page a few times to generate traffic.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-19000510.png)

    </div>

3. Go back to your web app in Azure portal and go to **Monitoring** ➔ **Application Insights**

    Click the linked application insights. 

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-19001425.png)

    </div>

  
4. In the Application Insights resource, go to **Investigate** ➔ **Performance.**

    Here we can se the request counts, duration of each operation, and the performance timeline.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-19001753.png)

    </div>

5. Go to **Investigate** ➔ **Live Metrics** and view the real-time telemetry.

    Here, we can see the request rates, response times, server health, etc.

    **Note:** To generate more traffic, go back to the web page and refresh for a couple more times.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-19002226.png)

    </div>

6. Go back to **Performance** and click **Drill intro...samples**.

    These are example requests or transactions that have been captured by Application Insights. They show real or simulated telemetry for the app.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-19002428.png)

    </div>

7. You can select any of the sample operations here. 

    Clicking a sample operation lets you drill into a specific request or transaction to see:

    - Duration / response time
    - Dependencies and their performance
    - Any exceptions thrown
    - Call stack or operation details
    - Timeline of events for that request

    Example: 
    
    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-19002626.png)

    </div>

8. You should see the **End-to-end transaction details** for the specific operation.

    This view shows a detailed trace of a single request, including all its dependencies and timings.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-19003105.png)

    </div>

9. Click **View all** to see the traces and events for the operation.

    The traces, dependencies, and events captured for that operation provides you a full picture of how the request flowed through your app.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-19003252.png)

    </div>

