---
title: "Configuration"
description: "Alertmanager Configuration"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 3
last_update:
  date: 11/20/2022
---


## Overview 

The `alertmanager.yml` configuration file is used to define how alerts are handled and routed in Alertmanager. It contains sections for global settings, routing rules, and receivers.  

```yaml
global:
  smtp_smarthost: 'mail.example.com:25'
  smtp_from: 'johnsmith@example.com'
  resolve_timeout: 5m

route:
  receiver: staff
  group_by: ['alertname', 'job']
  routes:
    - match_re:
        job: '(node|windows)'
      receiver: infra-email

    - matchers:
        job: "kubernetes"
        severity: ticket
      receiver: k8s-slack

receivers:
  - name: infra-email
    email_configs:
      - to: "infra-team@example.com"
        send_resolved: true

  - name: k8s-slack
    slack_configs:
      - channel: "#alerts"
        text: "Check the alert details at https://example.com/alerts/{{ .GroupLabels.app }}"
```

## Sections 

There are three sections in the configuration file:

- **`global`**: Defines global settings like timeout for resolving alerts and API URLs for receivers.  

- **`route`**: Specifies how alerts are matched and routed to appropriate receivers. Includes conditions like regex (`match_re`) and label matchers (`match`).  

- **`receiver`**: Configures where alerts are sent, such as Slack, email, or other integrations.


## Route 

### Top-Level Route 

At the `route` section, we defined a fallback route that groups unmatched alerts by `alertname` and `job` labels and sends them to the `staff` receiver.

```yaml title="alertmanager.yml"
route:
  receiver: staff
  group_by: ['alertname', 'job']
```

### `matchers`

The `matchers` filters alerts based on specified labels:

- `job` label set to "kubernetes" 
- `severity` label set to "ticket," 

Matched alerts will then be routed to the `k8s-slack` receiver.

```yaml title="alertmanager.yml"
- matchers:
    job: "kubernetes"
    severity: ticket
  receiver: k8s-slack
```

### `match_re`

The `match_re` uses a regular expression to filter alerts; in this example, it matches alerts where the `job` label is either "node" or "windows" and routes them to the `infra-email` receiver. 

```yaml title="alertmanager.yml"
- match_re:
    job: '(node|windows)'
  receiver: infra-email
```

## Sub-Routes 

Sub-routes define additional routing logic for specific alert patterns under the main route. These sub-routes allow fine-grained control over how alerts are categorized and routed to specific receivers.

We modified the sample `alertmanager.yml` from the previous examples:

```yaml title="alertmanager.yml"
global:
  smtp_smarthost: 'mail.example.com:25'
  smtp_from: 'johnsmith@example.com'
  resolve_timeout: 5m

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
        - matchers:  
            severity: 'email'
          receiver: devops-mail

receivers:
  - name: infra-email
    email_configs:
      - to: "infra-team@example.com"
        send_resolved: true

  - name: devops-slack
    slack_configs:
      - channel: "#alerts"
        text: "Check the alert details at https://example.com/alerts/{{ .GroupLabels.app }}"

  - name: devops-pager
    pagerduty_configs:
      - routing_key: "your-pagerduty-integration-key"
        send_resolved: true

  - name: devops-mail
    email_configs:
      - to: "devops-team@example.com"
        send_resolved: true
```
  
In the example above, we have sub-routes under the `devops-slack` route:

- Alerts with `severity: 'page'` are routed to `devops-pager`.
- Alerts with `severity: 'email'` are routed to `devops-mail`.

Alerts that match the sub-route criteria will be forwarded to their respective receivers.

## Using `continue`

By default, the first matching route wins, and the specific alert stops going down the route tree once it matches. If we want an alert to match two or more routes, we can use the `continue` directive. This will allow the alert to be forwarded to additional receivers even after matching the first route.

```yaml title="alertmanager.yml"
route:
  routes:
    - receiver: platform-logs 
      continue: true
    - match_re:
        job: database
      receiver: database-email
```

In the example above, the alert will first be sent to `platform-logs`, and because of `continue: true`, it will also be forwarded to `database-email` if it matches the `job: database` label.

## Grouping

Alertmanager groups all alerts for a route into a single group based on the labels specified. Grouping reduces alert fatigue. by sending a single notification that includes multiple alerts, reducing alert fatigue.

```yaml
route:
  receiver: default-pager
  group_by: [project]
  routes:
    - match:
        project: backend
      group_by: [region, env]
      receiver: backend-email
      routes:
        - match:
            severity: urgent
          receiver: backend-pager
    - match:
        project: frontend
      group_by: [region]
      receiver: frontend-email
      routes:
        - match:
            severity: high
          receiver: frontend-pager
```

Explanation:

- Alerts are grouped by the `project` label and sent to `default-pager`.
- `project: backend` alerts are grouped by `region` and `env`, and sent to `backend-email`.
- `severity: urgent` alerts are routed to `backend-pager`.
- `project: frontend` alerts are grouped by `region`, and sent to `frontend-email`.
- `severity: high` alerts are routed to `frontend-pager`.