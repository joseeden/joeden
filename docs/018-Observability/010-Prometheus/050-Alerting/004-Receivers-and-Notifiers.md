---
title: "Receiver and Notifiers"
description: "Receiver and Notifiers in Prometheus"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 4
last_update:
  date: 11/20/2022
---

## Overview 

Receivers are components that define where and how alerts are sent, and they contain various **notifiers** which send the alerts to the desired destination.

Below is a sample `alertmanager.yml` configuration:

```yaml title="alertmanager.yml"
global:
  resolve_timeout: 5m
  myproject_api_key: xxxxxxxxxxxxxxx
route:
  receiver: staff
  group_by: ['alertname', 'job']
  routes:
    - match_re:
        job: '(node|windows)'
      receiver: infra-email

    - matchers:
        job: 'kubernetes'
        team: 'devops'
      receiver: devops-slack
      routes:
        - matchers:  
            severity: 'page'
          receiver: devops-pager

receivers:
  - name: infra-email
    email_configs:
      - to: "infra-team@example.com"
        from: "alert-bot@example.com"
        smarthost: 'mail.example.com:25'
        auth_username:
        auth_identity:
        auth_password:
        send_resolved: true

  - name: devops-slack
    slack_configs:
      - channel: "#alerts"
        api_url: https://hook.slack.com/services/abc
        text: "Check the alert details at https://example.com/alerts/{{ .GroupLabels.app }}"

  - name: devops-pager
    myproject_configs:
      - routing_key: "your-myproject-integration-key"
        send_resolved: true
```

In the `receiver` section, there are three receivers configured:

1. `infra-email`: Sends alerts to the "infra-team@example.com" email address using SMTP configuration.
2. `devops-slack`: Sends alerts to the Slack channel `#alerts` using the provided `api_url` and custom text format.
3. `devops-pager`: Sends alerts to the PagerDuty service using the `myproject_configs` integration, which uses a specified `routing_key`.

## Global Config 

If some of the receivers have the same settings, you can define those settings globally and reuse them across multiple receivers. This helps avoid redundancy and keeps the configuration more maintainable.

In this example, global settings are used to define common configurations for myproject_configs which are then reused in multiple receivers:

```yaml title="alertmanager.yml"
global:
  resolve_timeout: 5m
  myproject_api_key: xxxxxxxxxxxxxxx

receivers:
  - name: devops-pager-1
    myproject_configs:
      - routing_key: "your-myproject-integration-key-1"
        send_resolved: true

  - name: devops-pager-2
    myproject_configs:
      - routing_key: "your-myproject-integration-key-2"
        send_resolved: true
```

In the second example below, the configuration demonstrates how to set up SMTP settings for Alertmanager to send email notifications to different teams. Each receiver is configured to send alerts to specific email addresses:

```yaml
global:
  smtp_smarthost: 'smtp.office365.com:587'
  smtp_from: 'alerts@company.com'
  smtp_auth_username: 'user123'
  smtp_auth_identity: 'identity_xyz'
  smtp_auth_password: 'password_456'

receivers:
  - name: 'infra-team'
    email_configs:
      - to: 'infra@company.com'

  - name: 'frontend-team'
    email_configs:
      - to: 'frontend@company.com'

  - name: 'k8s-team'
    email_configs:
      - to: 'k8s@company.com'
```


## Notification Templates 

Messages from notifiers can be configured by using Go templating, which allows dynamic insertion of alert-related data into the message.

Key template variables:

| **Template Variable** | **Description**                                                                 |
|-----------------------|---------------------------------------------------------------------------------|
| `GroupLabels`          | Labels used to group alerts together.                                           |
| `CommonLabels`         | Labels common to all alerts in the group.                                       |
| `CommonAnnotations`    | Annotations common to all alerts in the group.                                  |
| `ExternalURL`          | The URL where more information about the alert can be found.                    |
| `Status`               | The current status of the alert (e.g., "firing" or "resolved").                 |
| `Receiver`             | The name of the receiver handling the alert.                                    |
| `Alerts`               | A list of all alerts in the group.                                              |

The `Alerts` field contains more detailed information about each alert:

- **Labels**: Key-value pairs that identify the alert's metadata.
- **Annotations**: Additional information about the alert, such as descriptions or links.
- **Status**: The status of the alert, indicating whether it is currently firing or resolved.
- **StartsAt**: The timestamp when the alert first started firing.
- **EndsAt**: The timestamp when the alert was resolved or dismissed.