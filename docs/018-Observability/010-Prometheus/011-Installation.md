---
title: "Installing Prometheus"
description: "Installing Prometheus on virtual machines"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 11
last_update:
  date: 11/20/2022
---

## Overview

Prometheus can be installed on a virtual machine (VM) to monitor system performance and applications.

## Pre-requisites  

- A Linux-based VM with internet access
- Basic understanding of Linux
- Sufficient disk space to store metrics data.  

## Steps  

Login to the Prometheus server as **root** user and follow the steps below:

1. Download the Prometheus tar file from the Prometheus [official download page](https://prometheus.io/download/).

   ```bash
   wget https://github.com/prometheus/prometheus/releases/download/v2.40.1/prometheus-2.40.1.linux-amd64.tar.gz
   ```  

3. Extract the downloaded file using `tar`:  

   ```bash
   tar xvf prometheus-2.40.1.linux-amd64.tar.gz
   cd prometheus-2.40.1.linux-amd64
   ```  

4. For security, create a dedicated user to run Prometheus:  

   ```bash
   useradd --no-create-home --shell /bin/false prometheus
   ```  

5. Create directories for Prometheus data:

    ```bash
    mkdir -p /etc/prometheus
    mkdir /var/lib/prometheus 
    ```

6. Copy files to `/usr/local/bin` or a custom directory:  

   ```bash
   cp prometheus promtool /usr/local/bin/
   cp prometheus.yml /etc/prometheus/
   ```  

7. Copy the directories `consoles` and `console_libraries`:

    ```bash
    cp -r consoles /etc/prometheus
    cp -r console_libraries /etc/prometheus 
    ```

8. Assign the correct permissions:  
   
   ```bash
   chown prometheus:prometheus /usr/local/bin/prometheus
   chown prometheus:prometheus /usr/local/bin/promtool
   chown prometheus:prometheus /var/lib/prometheus
   chown -R prometheus:prometheus /etc/prometheus
   ```  

9.  Define a systemd unit file to manage Prometheus as a service:  
   
   ```bash
   vi /etc/systemd/system/prometheus.service
   ```  
   
   Add the following content:  
   
   ```ini
   [Unit]
   Description=Prometheus 
   Wants=network.target
   After=network.target

   [Service]
   User=prometheus
   Group=prometheus
   Type=simple
   ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

   [Install]
   WantedBy=multi-user.target
   ```  

10. Reload systemd, start Prometheus, and enable it on boot:  

   ```bash
   systemctl daemon-reload
   systemctl enable --now prometheus
   systemctl status prometheus
   ```  

11. Open a web browser and navigate to the link below:

    ```bash
    http://<your_vm_ip>:9090`
    ```
    
    To ensure it is working correctly, we can type `up` in the expression field and then hit **Execute.** It should return the following output, and a value of 1 at the right side. By default, Prometheus is configured to scrape and monitor its own metrics.

    ![](/img/docs/12102024-observability-prometheus-working-now-up-1.png)