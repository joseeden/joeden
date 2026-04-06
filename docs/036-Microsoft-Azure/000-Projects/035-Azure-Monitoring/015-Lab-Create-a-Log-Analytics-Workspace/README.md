---
title: "Create a Log Analytics Workspace"
description: "Create a Log Analytics Workspace"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Monitoring 
- Observability
- APM
- Certifications
sidebar_position: 15
last_update:
  date: 9/3/2023
---


## Overview

In this lab, we'll set up a Log Analytics Workspace to centralize logs and improve visibility across Azure resources.

## Create the Log Analytics Workspace

1. Go to **Log Analytics workspaces** in the Azure Portal

    Click **Create**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-18230235.png)

    </div>

2. Provide a unique workspace name and set the Region to `East US`.

    Click **Review + create** then **Create.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-18230356.png)

    </div>

This creates the workspace where all logs will be stored and analyzed.

## Connect Function App to Workspace

Connect your Function App to the Log Analytics workspace to start collecting logs.

<!-- **Note:** I've created a Function app prior to this lab. You can follow the steps in [Lab: Create Application Insights.](/docs/036-Microsoft-Azure/005-Azure-Monitoring/055-Lab-Create-Application-Insights.md#create-application-insights) -->

**Note:** I've created a Function app prior to this lab. You can follow the steps in [Lab: Create Application Insights.](/docs/036-Microsoft-Azure/000-Projects/035-Azure-Monitoring/014-Lab-Create-Application-Insights/README.md#create-application-insights)

1. Navigate to your Function App and go to **Monitoring** ➔ **Diagnostic settings**

    Click **Add diagnostic setting.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-18230942.png)

    </div>

2. Provide a name for the setting and fill in the details.
    
    Under **Logs**:

    - Select **Function Application Logs**
    - Select **Send to Log Analytics workspace** 
    - Choose your newly created workspace.

    Once you're done, click **Save.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-18231213.png)

    </div>

3. Go back to the **Diagnostic Settings** view and confirm the new settings.

    **Note:** Wait for a 3-5 minutes before proceeding to the next step.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-18231341.png)

    </div>

## Verify Data Collection

Navigate back to Log Analytics workspaces and open your workspace.

Go to **Logs** and verify the connections.

**Note:** It may take several minutes for `FunctionAppLogs` data to appear after configuring diagnostic settings.
