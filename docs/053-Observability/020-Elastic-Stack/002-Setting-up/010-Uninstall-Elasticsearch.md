---
title: "Uninstall Elasticsearch"
description: "Uninstall Elasticsearch"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 10
last_update:
  date: 12/30/2022
---

## Uninstall 

To completely uninstall Elasticsearch from your system, including all configurations and data:

1. Stop the Elasticsearch Service

    ```bash
    sudo systemctl stop elasticsearch
    sudo systemctl status elasticsearch
    ```

2. Uninstall Elasticsearch using the package manager:

    ```bash
    sudo apt-get purge --auto-remove elasticsearch
    ```

3. Remove all Elasticsearch configuration files and directories:

    ```bash
    sudo rm -rf /etc/elasticsearch
    ```

4. By default, Elasticsearch stores data in the following directories. Remove them to ensure complete uninstallation:

    ```bash
    sudo rm -rf /var/lib/elasticsearch
    sudo rm -rf /var/log/elasticsearch
    ```

6. If Elasticsearch was manually installed (e.g., via `.tar.gz` or `.deb` files), locate and remove the installation directory:

    ```bash
    sudo rm -rf /usr/share/elasticsearch
    ```

7. Check if any Elasticsearch-related files remain:

    ```bash
    sudo find / -name "*elasticsearch*"
    ```

    Manually remove any residual files or directories.

    ```bash
    sudo rm -rf /var/cache/apt/archives/elasticsearch_8.17.0_amd64.deb
    sudo rm -rf /run/systemd/propagate/elasticsearch.service
    sudo rm -rf /usr/share/keyrings/elasticsearch-keyring.gpg 
    ```

8. To remove any cached Elasticsearch packages:

    ```bash
    sudo apt-get autoremove
    sudo apt-get clean
    ```

9. To confirm Elasticsearch is completely uninstalled, run:

    ```bash
    curl -X GET "localhost:9200"
    ```