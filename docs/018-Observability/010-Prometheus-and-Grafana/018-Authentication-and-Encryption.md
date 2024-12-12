---
title: "Authentication and Encryption"
description: "Authentication and Encryption in  Prometheus"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 18
last_update:
  date: 11/20/2022
---


## Overview

Prometheus does not have built-in authentication mechanisms by default/ If authentication is not configured, Prometheus can freely scrape metrics from target nodes. However, this also means that unauthorized or rogue servers can scrape metrics from those nodes, potentially exposing sensitive information. 

To mitigate this, it's important to implement security measures such as authentication and encryption to restrict access and secure the data flow.

## Lab Environment 

<div class='img-center'>

![](/img/docs/prometheus=lab-environment.png) 

</div>


## Pre-requisites  

- [Setup Prometheus](/docs/018-Observability/010-Prometheus-and-Grafana/011-Installation.md)
- [Setup Node Exporter on the nodes](/docs/018-Observability/010-Prometheus-and-Grafana/017-Setting-up-Exporters.md)


## Generate the Certificate
 
This can be done through `openssl`:

```bash
sudo  openssl req -new \
-newkey rsa:2048 -x509 -nodes \
-days 365  \
-keyout node_exporter.key \
-out node_exporter.crt \
-subj "/C=SG/ST=Singapore/L=Singapore/O=MyOrg/CN=localhost" \
-addext "subjectAltName=DNS:localhost"
```

## Enable TLS on Node Exporter 

1. Create a `config.yml` file:

    ```yaml
    tls_server_config:
      cert_file: node_exporter.crt  
      key_file: node_exporter.key  
    ```

    To test if it works, run:

    ```bash
    node_exporter --web.config=/path/to/config.yml 
    ```

    :::info 

    To make this work, make sure you have installed the `node_exporter` on the target nodes and havae moved the `node_exporter` binary to `/usr/local/bin`.

    :::


2. Next, create the directory in the target nodes and then move the files.

    ```bash
    sudo mkdir /etc/node_exporter
    mv node_exporter.crt node_exporter.key config.yml /etc/node_exporter
    ```

3. Set the permissions:

    ```bash
    sudo chown -R node_exporter:node_exporter /etc/node_exporter 
    ```

4. Update the systemd unit file of the Node Exporter service:

   ```bash
   [Unit]
   Description=Node Exporter
   Wants=network.target
   After=network.target

   [Service]
   User=node_exporter
   Group=node_exporter
   Type=simple
   ExecStart=/usr/local/bin/node_exporter --web.config=/etc/node_exporter/config.yml

   [Install]
   WantedBy=multi-user.target
   ```  

5.  Restart the exporter:  

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl restart node_exporter
    sudo systemctl status node_exporter
    ```  

6. To test, run a `curl` command:

    ```bash
    curl -k https://localhost:9100/metrics 
    ```

## Enable TLS on Prometheus

1. Copy the `node_exporter.crt` to the Prometheus server. We can use SCP for this.

    ```bash
    scp username:password@node:/etc/node_exporter/node_exporter.crt /etc/prometheus 
    ```

2. Login to the Prometheus server and change the pwnership of the copied file.

    ```bash
    sudo chown prometheus:prometheus node_exporter.crt
    ```
3. Update the Prometheus configuration file. Edit the `/etc/prometheus/prometheus.yml`

    ```yaml
    scrape_configs:
    - job_name: "node_exporter"
      scheme: https
      tls_config: 
        ca_file: /etc/prometheus/node_exporter.crt
        insecure_skip_verify: true          
        # If selft-signed cert, set to true
        # If maanged cert, set to false 
        static_configs:
          - targets: ["<node1_ip>:9100", "<node2_ip>:9100"]
    ```  

4. Restart Prometheus.

   ```bash
   sudo systemctl start prometheus
   sudo systemctl status prometheus
   ```  



## Enable Encryption on Node Exporter 

1. Generate the hash of the password. This can done through a couple of ways:

    a. Using `apache2-utils` or `httpd-tools' 

      Install the utility first.

      ```bash
      sudo apt install -y apache2-utils 
      ```
      
      Generate the hash. When prompted, enter the password.

      ```bash 
      htpasswd -nbC 12 "" | tr -d ':\n'
      ```

    b. Using your preferred language:

      Install the library first:

      ```bash
      pip install bcrypt
      ```

      Copy the code below:

      ```python 
      import bcrypt
      import getpass

      # Prompt user to enter a password
      password = getpass.getpass("Enter your password: ")

      salt = bcrypt.gensalt()
      hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

      print(f"Hashed password: {hashed_password.decode('utf-8')}")
      ```

2. Update the `/etc/node_exporter/config.yml` on the target nodes.

    ```yaml
    tls_server_config:
      cert_file: node_exporter.crt  
      key_file: node_exporter.key  
    basic_auth_users:
      prometheus: *****************
    ```

    Note that this is the username and the hashed password. If you're using a different user, change the `prometheus` to your user.

    ```bash
    prometheus: *****************
    ```

3.  Restart Prometheus to apply the configuration:  

    ```bash
    sudo systemctl restart node_exporter
    sudo systemctl status node_exporter
    ```  


## Enable Encryption on Prometheus Server

From the Prometheus Server, run a `curl` to the target nodes. It will now show **Unauthorized**.

```bash
$ curl http://node01:9100/metrics

Unauthorized 
```

To resolve this, we also need to update the Prometheus server:

1. Update the `/etc/prometheus/prometheus.yml`:

    ```yaml
    scrape_configs:
    - job_name: "node_exporter"
      scheme: https
      basic_auth:
        username: prometheus 
        password: mypassword   ## in plain text.
    ```  

2.  Restart Prometheus to apply the configuration:  

      ```bash
      sudo systemctl restart prometheus
      sudo systemctl status prometheus
      ```  

3. Access the Prometheus console and go to Status > Targets. The targets should now show "up".

    ![](/img/docs/12112024-observability-prometheus-targets-up-enabled-encryption.png)
