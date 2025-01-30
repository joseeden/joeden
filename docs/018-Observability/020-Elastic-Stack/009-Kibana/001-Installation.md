---
title: "Installation"
description: "Installation"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Kibana
sidebar_position: 1
last_update:
  date: 3/28/2023
---


### Overview  

Kibana is a visualization tool for Elasticsearch, offering an easy way to explore, analyze, and visualize data. It's a key part of the ELK stack, used to create dashboards and monitor log data.  

- Provides real-time data visualization and analysis.  
- Helps track and troubleshoot system performance and security issues.  

## Lab Environment 

| Node    | Hostname       | IP Address       | 
|---------|----------------|------------------|
| Node 1  | elasticsearch  |  192.168.56.101  |
| Node 2  | logstash       |  192.168.56.102  |
| Node 3  | kibana         |  192.168.56.103  |

Setup details:

- The nodes are created in VirtualBox using Vagrant.
- An SSH key is generated on the Elasticsearch node

## Installation 

Follow these steps to install Kibana on your system.

1. Use the package manager to install Kibana.

    ```bash
    sudo apt-get install kibana  
    ```

2. Modify the `kibana.yml` file to specify Elasticsearch host and other settings:  

     ```bash
     sudo vi /etc/kibana/kibana.yml
     ```  

     Change `server.host` to `0.0.0.0`.

     ```bash
     server.host: "0.0.0.0"  
     ```
     
     If Kibana is not running on the same node as Elasticsearch, you will need to specify the Elasticsearch nodes as well.

     ```bash
     elasticsearch.hosts: ["$ELASTIC_ENDPOINT:9200"] 
     ```

     **Note:** SSL is enabled on Elasticsearch node, so I used `https` here.

3. Reload system settings:

     ```bash
     sudo systemctl daemon-reload 
     ```

4. Enable and start Kibana.

     ```bash
     sudo systemctl enable --now kibana
     sudo systemctl start kibana
     sudo systemctl status kibana
     ```  

5. Open a web browser and navigate to `http://<your-server-ip>:5601`.

     You may be prompted to enter the enrolmen token. Please see [Configure Elastic.](#configure-elastic)


## Offline Installation 

Offline installation is useful in pproduction environments with restricted internet access.

1. Get the Kibana package (e.g., `.tar.gz` or `.deb`) from the [official Elasticsearch downloads page](https://www.elastic.co/downloads/kibana) on a system with internet access.  

2. Copy the downloaded package to the offline system using a USB drive or other file transfer methods. 
    [If you are using a VirtualBox, you can map local folder to a fileshare in you VM](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare).
 

3. Install Kibana.

   - For `.tar.gz`:  

     ```bash
     tar -xzf kibana-<version>-linux-x86_64.tar.gz
     cd kibana-<version>
     ```  

   - For `.deb`:  

     ```bash
     sudo dpkg -i kibana-<version>.deb
     ```  

4. Edit the `kibana.yml` file to specify Elasticsearch host and other settings:  

     ```bash
     sudo vi /etc/kibana/kibana.yml
     ```  

     Change `server.host` to `0.0.0.0`.

     ```bash
     server.host: "0.0.0.0"
     ```

     If Kibana is not running on the same node as Elasticsearch, you will need to specify the Elasticsearch nodes as well.

     ```bash
     elasticsearch.hosts: ["$ELASTIC_ENDPOINT:9200"] 
     ```

     **Note:** SSL is enabled on Elasticsearch node, so I used `https` here.

5. Reload system settings:

     ```bash
     sudo systemctl daemon-reload 
     ```
6. Enable and start Kibana.

     ```bash
     sudo systemctl enable --now kibana
     sudo systemctl start kibana
     sudo systemctl status kibana
     ```  

7. Access Kibana in a web browser at `http://<your-server-ip>:5601`.
     
     You may be prompted to enter the enrolmen token. Please see [Configure Elastic.](#configure-elastic)



## Configure Elastic

...short intro..why we need this..

1. Login to your Elasticsearch node and switch to **root.**
2. Run the command below. A ...will be printed...copy and note it down..

     ```bash
     /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token --scope kibana 
     ```

3. Login to your Kibana node, switch to **root**, and get the verification code..copy it and note it down..

     ```bash
     /usr/share/kibana/bin/kibana-verification-code 
     ```

     Output:

     ```bash
     Your verification code is:  123 456 
     ```


4. Go back to the Kibana dashboard in your web browser and paste the enrollment token. Click **Configure Elastic.** It will then ask for a verification code.

     ![](/img/docs/01062025-kibana-configure.png)

     
5. Enter the verification code from step 3 and click verify.

     ![](/img/docs/01062025-kibana-configure-2.png)


## Configure Elastic Manually 

If you failed configuring Elastic using the enrolment token, you can try to configure it manually.

1. On the enrolment page, click **Configure manually** and then provide the address of the Elasticsearch node. Click **Check address.**

![](/img/docs/01062024-configure-kiubana0elastic.png)
