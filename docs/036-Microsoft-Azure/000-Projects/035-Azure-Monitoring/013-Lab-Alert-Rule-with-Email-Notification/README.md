---
title: "Alert Rule with Email Notification"
description: "Alert Rule with Email Notification"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Monitoring 
- Observability
- APM
- Certifications
sidebar_position: 13
# sidebar_custom_props: { "labs": true }
last_update:
  date: 3/29/2021
---

## Overview

In this lab, we will create an Azure Monitor alert for a storage account that sends an email when availability drops below 99%.

- Use an existing storage account
- Configure an alert rule for availability
- Create an action group with email notification

This ensures you are notified automatically if the storage account has issues.


## Open Storage Account

Go to your **Storage account** in the Azure portal.

**Note:** If you don’t have one, follow [Create an Azure storage account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal).

<div class='img-center'>

![](/img/docs/Screenshot2026-03-15234708.png)

</div>

## Create Availability Alert Rule

Navigate to **Monitoring → Alerts → Create alert rule**.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-15234857.png)

</div>

Configure the alert condition:

- Choose **Availability** as the signal
- Set condition to **Less than 99%**
- Set **Evaluation frequency** to every 5 minutes
- Set **Lookback period** to 5 minutes

This configuration avoids false positives from brief fluctuations.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16004053.png)

</div>

## Create Action Group for Alerts

Go to the **Actions** section and click **Create action group**.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16000127.png)

</div>

Fill in the required details and go to **Notifications**.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16000317.png)

</div>

Add a new email notification, enter your email address, and click **OK**

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16000639.png)

</div>

Provide an action group name, then click **Revew + create** and **Create**.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16000920.png)

</div>

You will see the new action group in the list. 
Go to the **Details** tab.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16001012.png)

</div>

## Configure Alert Rule Details

Fill in the severity, alert rule name, and description. 

Then click **Revew + create** and **Create**.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16001233.png)

</div>

## Verify Email Notification

Check your inbox for the alert notification. 

You’ve been added to the Azure Monitor action group and will receive alerts automatically.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16001602.png)

</div>


## Create Transaction Alert Rule

Navigate to **Storage account → Alerts → Create → Alert rule**.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16002526.png)

</div>

Configure the alert rule as follows: 

- Select **Transactions** as the signal
- Set condition: **Total transactions > 1000 in 15 minutes**
- Set **Evaluation frequency** to every 5 minutes
- Then go to **Actions**

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16003929.png)

</div>

Click **Select action groups**, choose your action group, and click **Select**

Then proceed to the **Details** tab.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16003032.png)

</div>

Provide A **Severity**, **Name**, and **Description**

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16003337.png)

</div>

## Verify All Alert Rules

Back in your storage account, go to **Alert rules** to see all alerts created.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16003500.png)

</div>

Both the **Availability** and **Transaction** alert rules should be listed here.

You are now set to receive email notifications automatically for both availability and transaction issues.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-16003655.png)

</div>



