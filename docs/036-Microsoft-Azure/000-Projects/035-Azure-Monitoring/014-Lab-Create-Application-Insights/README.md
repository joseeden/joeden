---
title: "Create Application Insights"
description: "Create Application Insights"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Monitoring 
- Observability
- APM
- Certifications
sidebar_position: 14
last_update:
  date: 9/3/2023
---

## Overview

In this lab, we'll set up **Application Insights** to collect telemetry and monitor a **Function App** application. This helps detect performance issues early and ensures users can access the app without delays.

## Preparation 

I've already created the resources in the lab, but you can follow these steps to replicate them manually.

- Create a resource group
- Create a Log Analytics workspace
- Use same region for all resources

In the example below, `myResourceGroup` and `myWorkspace` are used.

```bash
az group create \
  --name myResourceGroup \
  --location southeastasia
```

```bash
az monitor log-analytics workspace create \
  --resource-group myResourceGroup \
  --workspace-name myWorkspace \
  --location southeastasia
```

## Create Application Insights

Create an Application Insights resource and link it to the workspace.

1. In Application Insights, click **Create**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-16095011.png)

    </div>

2. Fill in the necessary details for the Application Insights resource, such as the name, region, and resource group. 

    Make sure to select your Log Analytics Workspace.

    Click **Review + create**, and then **Create.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-16095255.png)

    </div>


## Create Function App with Monitoring

Create a Function App and connect it to Application Insights during setup.

1. Navigate to **Function App** in the Azure Portal.

2. Click **Create** to begin creating a new function app.

    Select **Consumption plan** (Serverless) as the plan. 

    Confirm selection if prompted.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-18222244.png)

    </div>


3. Under **Basics**, fill in the necessary details for the Function app.

    Then move to the **Monitoring** tab.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-18222508.png)

    </div>

4. In the **Monitoring** tab, enable Application Insights.

    Select the Application Insights resource you created in the previous step.

    Click **Review + create**, and then **Create.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-18222612.png)

    </div>

## Verify Connection

Open the new function app and go to **Monitoring** ➔ **Application Insights.**

Verify the connection to your Application Insights resource is active.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-18222857.png)

</div>

This confirms telemetry is being collected successfully.

## Why Enable Monitoring Early

Connecting Application Insights during creation ensures full visibility from the start.

- Telemetry starts immediately
- No data is missed during deployment
- Easier troubleshooting and performance checks

Adding it later can miss early failures and performance issues, which makes debugging harder.
