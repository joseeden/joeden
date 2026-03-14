---
title: "Azure Monitor"
description: "Azure Monitor"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 5
last_update:
  date: 3/29/2021
---

## Overview

Azure Monitor keeps cloud apps reliable and reduces customer impact. It gathers metrics and logs, raises alerts, and lets you fix issues before users report them.

- Silent failures come from missing monitoring
- You can lose money when failures stay hidden
- App health is part of ongoing operations

## Capabilities

Azure Monitor provides three key capabilities in one workflow:

- **Metrics** for real-time health.
- **Logs** for detailed diagnostics.
- **Alerts** for automatic response.

## Examples 

### Metrics 

In the example below, the metric `cpuPercentage` tracks CPU load for a VM. You can use this to detect overload quickly.

```bash
az monitor metrics list \
  --metric CPUPercentage \
  --resource /subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Compute/virtualMachines/<vm>
```

**Expected result:** A JSON response with `CPUPercentage` values over time and the measurement timestamps.

```json
{
  "cost": 0,
  "timespan": "2021-03-14T22:00:00Z/2021-03-14T22:10:00Z",
  "interval": "PT1M",
  "value": [
    {
      "id": "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Compute/virtualMachines/<vm>/providers/microsoft.insights/metrics/CPUPercentage",
      "type": "Microsoft.Insights/metrics",
      "name": {
        "value": "Percentage CPU",
        "localizedValue": "CPU Percentage"
      },
      "unit": "Percent",
      "timeseries": [
        {
          "metadatavalues": [],
          "data": [
            {"timeStamp": "2021-03-14T22:00:00Z", "average": 12.1},
            {"timeStamp": "2021-03-14T22:01:00Z", "average": 15.0},
            {"timeStamp": "2021-03-14T22:02:00Z", "average": 18.9},
            {"timeStamp": "2021-03-14T22:03:00Z", "average": 23.4},
            {"timeStamp": "2021-03-14T22:04:00Z", "average": 27.8}
          ]
        }
      ]
    }
  ]
}
```

### Logs

Logs show the exact request and error details to find root cause fast.

Example: The command below queries the **Log Analytics** workspace for failed requests (non-`200` status codes) and shows the top 10 by time.

```bash
az monitor log-analytics query \
  --workspace <workspace-id> \
  --query "AppRequests | where ResultCode != 200 | top 10 by TimeGenerated"
```

**Expected result:** Response shows rows of failed requests, result codes, and operation names.

```json
[
  {
    "TimeGenerated": "2021-03-14T22:05:21.0000000Z",
    "RequestId": "12345678-90ab-cdef-1234-567890abcdef",
    "ResultCode": "500",
    "OperationName": "GET /api/checkout",
    "ClientIpAddress": "203.0.113.45"
  },
  {
    "TimeGenerated": "2021-03-14T22:06:03.0000000Z",
    "RequestId": "23456789-01bc-def0-2345-678901bcdef0",
    "ResultCode": "404",
    "OperationName": "GET /api/product/999",
    "ClientIpAddress": "203.0.113.46"
  }
]
```

### Alerts

Here, we're creating an alert rule in Azure Monitor so we can be notified when the VM is under heavy load.

```bash
az monitor metrics alert create \
  --name "HighCpu" \
  --resource-group <rg> \
  --scopes /subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Compute/virtualMachines/<vm> \
  --condition "avg CPUPercentage > 80" \
  --window-size 5m \
  --evaluation-frequency 1m \
  --action /subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Insights/actionGroups/<ag>
```

**Expected result:** Alert rule is created and returns an object with rule details and state.

```json
{
  "name": "HighCpu",
  "type": "Microsoft.insights/metricAlerts",
  "id": "/subscriptions/<sub>/resourceGroups/<rg>/providers/microsoft.insights/metricAlerts/HighCpu",
  "location": "global",
  "properties": {
    "enabled": true,
    "scopes": [
      "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Compute/virtualMachines/<vm>"
    ],
    "condition": {
      "odata.type": "Microsoft.Azure.Management.Insights.Models.ThresholdRuleCondition",
      "dataSource": {
        "resourceUri": "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Compute/virtualMachines/<vm>",
        "metricName": "CPUPercentage"
      },
      "operator": "GreaterThan",
      "threshold": 80,
      "windowSize": "PT5M"
    },
    "evaluationFrequency": "PT1M",
    "actions": [
      {
        "actionGroupId": "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Insights/actionGroups/<ag>"
      }
    ],
    "autoMitigate": false
  }
}
```

