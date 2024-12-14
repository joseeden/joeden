---
title: "Alertmanager"
description: "Alertmanager Architecture"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 2
last_update:
  date: 11/20/2022
---

## Overview 

**Alertmanager** is a component of the Prometheus ecosystem responsible for managing alerts. It receives alerts from Prometheus, groups them, and sends notifications to various channels like email, Slack, SSN, or webhooks.

- Alertmanager manages, groups, and sends alerts to various channels.
- It routes notifications based on predefined rules.
- It can receive alerts from multiple Prometheus servers.

![](/img/docs/12142024-Observability-prometheus-Alertmanager-2.png)

## How it works 

The Prometheus server sends alerts to the Alertmanager API. From there, it goes through several stages:

- **Dispatcher**: Receives and routes alerts.
- **Inhibition**: Prevents unnecessary alerts by suppressing certain notifications.
- **Silencing**: Temporarily disables alerts for specified conditions.
- **Routing**: Directs alerts to the appropriate receivers based on configuration.
- **Notifications**: Sends alerts via channels like email, Slack, or others.

![](/img/docs/12142024-Observability-prometheus-Alertmanager-3.png)


## Installing Alertmanager

Login to the Prometheus server as **root** user and follow the steps below:

1. Download Alertmanager from the [official download page](https://prometheus.io/download/#alertmanager) using `wget` or `curl`.
  
   ```bash
   wget https://github.com/prometheus/alertmanager/releases/download/v0.21.0/alertmanager-0.21.0.linux-amd64.tar.gz
   ```

2. After downloading, extract the files:

   ```bash
   tar xzf alertmanager-0.21.0.linux-amd64.tar.gz
   cd alertmanager-0.21.0.linux-amd64/
   ```

3. Add a dedicated user for the Alertmanager service.

    ```bash
    groupadd -f alertmanager
    useradd --no-create-home --shell /bin/false -g alertmanager alertmanager
    ```

4. Create the directory where the Alertmanager data will be stored.

    ```bash
    mkdir /var/lib/alertmanager
    mkdir -p /etc/alertmanager/templates
    ```

5. Copy over the required files and change the permissions.

    ```bash
    cp alertmanager.yml /etc/alertmanager 
    cp alertmanager /usr/bin
    cp amtool /usr/bin
    chown -R alertmanager:alertmanager /etc/alertmanager 
    chown -R alertmanager:alertmanager /var/lib/alertmanager 
    chown alertmanager:alertmanager /usr/bin/alertmanager
    chown alertmanager:alertmanager /usr/bin/amtool
    ```

7. Start Alertmanager by running the command below. 
  
   ```bash
   alertmanager
   ```

   By default, Alertmanager will start listening on port `9093`.

    ```bash
    level=info ts=2024-12-14T08:41:15.448Z caller=main.go:216 msg="Starting Alertmanager" version="(version=0.21.0, branch=HEAD, revision=4c6c03ebfe21009c546e4d1e9b92c371d67c021d)"
    level=info ts=2024-12-14T08:41:15.448Z caller=main.go:217 build_context="(go=go1.14.4, user=root@dee35927357f, date=20200617-08:54:02)"
    level=info ts=2024-12-14T08:41:15.452Z caller=cluster.go:161 component=cluster msg="setting advertise address explicitly" addr=192.168.81.10 port=9094
    level=info ts=2024-12-14T08:41:15.453Z caller=cluster.go:623 component=cluster msg="Waiting for gossip to settle..." interval=2s
    level=info ts=2024-12-14T08:41:15.478Z caller=coordinator.go:119 component=configuration msg="Loading configuration file" file=alertmanager.yml
    level=info ts=2024-12-14T08:41:15.478Z caller=coordinator.go:131 component=configuration msg="Completed loading of configuration file" file=alertmanager.yml
    level=info ts=2024-12-14T08:41:15.480Z caller=main.go:485 msg=Listening address=:9093
    level=info ts=2024-12-14T08:41:17.453Z caller=cluster.go:648 component=cluster msg="gossip not settled" polls=0 before=0 now=1 elapsed=2.000108213s
    ```

8. Open a browser or use `curl` to verify that Alertmanager is running:

   ```bash
   http://localhost:9093
   ```

    ![](/img/docs/12142024-Observability-prometheus-alertmanager-up.png)

9. To run Alertmanager as a service, create a systemd unit file in `/etc/systemd/system/alertmanager.service`:

    ```bash
    [Unit]
    Description=Alertmanager
    Wants=network-online.target
    After=network-online.target

    [Service]
    User=alertmanager
    Group=alertmanager
    Type=simple
    ExecStart=/usr/bin/alertmanager \
        --config.file=/etc/alertmanager/alertmanager.yml \
        --storage.path=/var/lib/alertmanager \
        --log.level=info
    Restart=always

    [Install]
    WantedBy=multi-user.target
    ```

10. Update permissions of the systemd unit file.

    ```bash
    chmod 664 /etc/systemd/system/alertmanager.service
    ```

11. Enable and start the Alertmanager service.

    ```bash
    systemctl daemon-reload
    systemctl enable --now alertmanager
    systemctl status alertmanager
    ```

12. Verify that the Alertmanager server is running. 

    ```bash
    $ curl localhost:9093
    ```

13. Go back to the Alertmanager console and append the `/metrics` to the site URL.

    ```bash
    http:localhost:9091/metrics 
    ```

    ![](/img/docs/12142024-Observability-prometheus-pushgw-metricsss.png) 


## Configure Prometheus 

After Alertmanager is installed and running, you need to configure Prometheus to use it.

```yaml
# Global configuration
global:
  scrape_interval: 15s      
  evaluation_interval: 15s  

# Alerting configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets: 
            - localhost:9093 

# Scrape configurations
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 15s      
    scrape_timeout: 5s        
    sample_limit: 1000        
    static_configs:
      - targets: ['localhost:9090']
```

If you have multiple Alertmanagers:

```yaml
alerting:
  alertmanagers:
    - static_configs:
        - targets: 
            - alertmanager1-ip:9093 
            - alertmanager2-ip:9093 
            - alertmanager3-ip:9093 
```

Restart Prometheus:

```bash
systemctl restart prometheus 
systemctl status prometheus 
```