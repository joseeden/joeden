---
title: "Setting up Prometheus Exporters"
description: "Setting up Prometheus Exporters"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 17
last_update:
  date: 11/20/2022
---


## Overview 

Exporters are installed on target nodes to expose metrics that Prometheus can scrape. They act as intermediaries that translate system or application data into Prometheus-compatible formats.  

## Lab Environment 

<div class='img-center'>

![](/img/docs/prometheus=lab-environment.png) 

</div>


## Pre-requisites  

- [Setup Prometheus](/docs/018-Observability/010-Prometheus/011-Installation.md)
- Two Linux nodes to be configured as targets

## Steps  

Login to the individual nodes as **root** user and follow the steps below:

1. Identify the Node Exporter (for system metrics) or application-specific exporters like MySQL Exporter.  

2. On each target node, download the relevant exporter from the [Prometheus exporter repository](https://prometheus.io/docs/instrumenting/exporters/).  

   ```bash
   wget https://github.com/prometheus/node_exporter/releases/download/v1.4.0/node_exporter-1.4.0.linux-amd64.tar.gz
   ```  

3. Extract the tar file and move the binary to a directory in the system's `PATH`:  

   ```bash
   tar xvf node_exporter-1.4.0.linux-amd64.tar.gz
   cd node_exporter-1.4.0.linux-amd64 
   cp node_exporter /usr/bin/
   ```  

4. Test it by running the exporter:

    ```bash
    node_exporter
    ```

    Output:

    ```bash
   caller=node_exporter.go:199 level=info msg="Listening on" address=:9100
   caller=tls_config.go:195 level=info msg="TLS is disabled." http2=false
    ```

5. Open another terminal and run a `curl` command:

    ```bash
    curl localhost:9100/metrics 
    ```

    It should show a long list of metrics:

    ```bash
    # HELP promhttp_metric_handler_requests_total Total number of scrapes by HTTP status code.
    # TYPE promhttp_metric_handler_requests_total counter
    promhttp_metric_handler_requests_total{code="200"} 5
    promhttp_metric_handler_requests_total{code="500"} 0
    promhttp_metric_handler_requests_total{code="503"} 0
    ```


6. For security, create a dedicated user and group:  

   ```bash
   groupadd -f node_exporter
   useradd --no-create-home --shell /bin/false -g node_exporter node_exporter
   ```  


7. Change permissions of the binary:

   ```bash
   chown node_exporter:node_exporter /usr/bin/node_exporter 
   ```

8. Create a systemd service for the exporter  

   ```bash
   vi /etc/systemd/system/node_exporter.service
   ```  

   Add the following content:  

   ```bash
   [Unit]
   Description=NodeExporter
   Wants=network.target
   After=network.target

   [Service]
   User=node_exporter
   Group=node_exporter
   Type=simple
   ExecStart=/usr/bin/node_exporter

   [Install]
   WantedBy=multi-user.target
   ```  

9. Update permissions of the systemd unit file.

    ```bash
    chmod 664 /etc/systemd/system/node_exporter.service
    ```

10. Start the exporter and enable it to run at boot:  

    ```bash
    systemctl daemon-reload
    systemctl enable --now node_exporter
    systemctl status node_exporter
    ```  

11. Open a browser and navigate to `http://<node_ip>:9100/metrics` to confirm the exporter is running and exposing metrics.  

    ![](/img/docs/12102024-observability-prometheus-node-exporter-1-2.png)

12. Login to the Prometheus server. Add the node IP and port to Prometheus's `/etc/prometheus/prometheus.yml` file under `scrape_configs`:  

      ```yaml
      scrape_configs:
      - job_name: "node_exporter"
         static_configs:
            - targets: 
               - <node1_ip>:9100
               - <node2_ip>:9100
      ```  

    Restart Prometheus to apply the configuration:  

      ```bash
      systemctl restart prometheus
      systemctl status prometheus
      ```  

13. Check Prometheus’s web interface to verify the targets are listed and metrics are being collected.  

    ```bash
    http://<your_vm_ip>:9090`
    ```

    In the expression field, type `up` and click **Execute**. If the value on the right are all zeroes, it means the metrics are not being scraped. If the valueis `1`, then metrics are successfully scraped.

    ![](/img/docs/12102024-observability-prometheus-node-exporter-1-2-working.png)

14. Click Status > Targets to see the scrape status. You may need to refresh it to reflect all the targets.

   ![](/img/docs/12102024-observability-prometheus-node-exporter-targets-scrape-status.png)