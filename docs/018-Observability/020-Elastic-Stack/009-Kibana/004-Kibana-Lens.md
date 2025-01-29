---
title: "Kibana Lens"
description: "Kibana Lens"
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
sidebar_position: 4
last_update:
  date: 3/28/2023
---

## Overview

This guide explains how to use Kibana Lens to monitor and visualize EC2 performance under stress. 

- Install Metricbeat on a Linux EC2 instance  
- Connect Metricbeat to an Elastic Cloud deployment  
- Run a stress test on the EC2 instance  
- Create visualizations for EC2 metrics in Kibana Lens  

## Pre-requisites 

This guide uses Elastic Cloud for the hosted Elasticsearch cluster and Kibana.

- [Sign up for Elastic Cloud account](https://www.elastic.co/cloud/elasticsearch-service/signup) 
- [Create a hosted deployment](https://www.elastic.co/guide/en/cloud/current/ec-create-deployment.html)
- [Set up a Linux VM for testing](https://aws.amazon.com/getting-started/launch-a-virtual-machine-B-0/)

You can use either a cloud-based instance or a local virtual machine for the Linux setup.

## Install Metricbeat 

Login to your EC2 instance and perform the following.

1. Verify your VM can connect to the Elastic endpoint:  

   ```bash  
   curl -u elastic:add-password-here -XGET https://add-elastic-endpoint-here:443  
   ```  

   If successful, you’ll see a JSON response with Elasticsearch details. 

    ```bash
    {
      "name" : "instance-0000000000",
      "cluster_name" : "dfkhsfkjhdfksdkfjshdfkhsdfkjh",
      "cluster_uuid" : "QMwQk4tIQyidcGrNoJyp0A",
      "version" : {
        "number" : "8.17.1",
        "build_flavor" : "default",
        "build_type" : "docker",
        "build_hash" : "fldjkajdflkajklsdjflkjdasflkajlkjalkdsjas",
        "build_date" : "2023-01-10T10:08:26.972230187Z",
        "build_snapshot" : false,
        "lucene_version" : "9.12.0",
        "minimum_wire_compatibility_version" : "7.17.0",
        "minimum_index_compatibility_version" : "7.0.0"
      },
      "tagline" : "You Know, for Search"
    } 
    ```

2. Install Metricbeat based on your operating system. More about it [here](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation-configuration.html).  

    For Ubuntu, use:  

    ```bash
    curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-8.17.1-amd64.deb
    sudo dpkg -i metricbeat-8.17.1-amd64.deb 
    ```

3. Modify the `metricbeat.yml`.

    ```bash
    sudo vi /etc/metricbeat/metricbeat.yml
    ```

    Specify the `cloud.id` of your Elasticsearch Service, and set `cloud.auth` to a user who is authorized to set up Metricbeat. 

    ```bash
    cloud.id: "environment:xxxxxxxxxxxxxxxxxx"
    cloud.auth: "elastic:YOUR_PASSWORD"  
    ```

    :::info 
      
    **Note:** Avoid hardcoding passwords. Use [the secrets keystore](https://www.elastic.co/guide/en/beats/metricbeat/8.17/keystore.html) for sensitive values.  

    :::

4. Identify the modules you need to enable.

    ```bash
    metricbeat modules list 
    ```

    Metricbeat uses modules to collect metrics. Each module defines the basic logic for collecting data from a specific service, such as Redis or MySQL. A module consists of metricsets that fetch and structure the data. If you accept the default configuration without enabling additional modules, Metricbeat collects system metrics only.

    Enable the Linux module.

    ```bash
    metricbeat modules enable linux 
    ```

5. Metricbeat comes with predefined assets for parsing, indexing, and visualizing your data. To load these assets:

    ```bash
    metricbeat setup -e  
    ```

    :::info 

    Make sure to setup the Elasticsearch endpoint and credentials in the configuration file (see step 3).

    :::

    If successful, you should see:

    ```bash
    Loading dashboards (Kibana must be running and reachable)
    {"log.level":"info","@timestamp":"2023-01-26T13:21:27.495Z","log.logger":"kibana","log.origin":{"function":"github.com/elastic/elastic-agent-libs/kibana.NewClientWithConfigDefault","file.name":"kibana/client.go","file.line":181},"message":"Kibana url: https://12345678asdfghjkkl.asia-southeast1.gcp.elastic-cloud.com:443","service.name":"metricbeat","ecs.version":"1.6.0"}
    {"log.level":"info","@timestamp":"2023-01-26T13:21:28.523Z","log.logger":"kibana","log.origin":{"function":"github.com/elastic/elastic-agent-libs/kibana.NewClientWithConfigDefault","file.name":"kibana/client.go","file.line":181},"message":"Kibana url: https://12345678asdfghjkkl.asia-southeast1.gcp.elastic-cloud.com:443","service.name":"metricbeat","ecs.version":"1.6.0"}
    {"log.level":"info","@timestamp":"2023-01-26T13:23:30.849Z","log.origin":{"function":"github.com/elastic/beats/v7/libbeat/cmd/instance.(*Beat).loadDashboards","file.name":"instance/beat.go","file.line":1306},"message":"Kibana dashboards successfully loaded.","service.name":"metricbeat","ecs.version":"1.6.0"}
    Loaded dashboards      
    ```

6. Enable and start Metricbeat.

    ```bash
    sudo systemctl enable --now metricbeat 
    sudo systemctl status metricbeat 
    ```

## Run Load Testing 

To generate system metrics, use the `stress` tool:  

1. Install the stress tool.

    ```bash
    sudo apt install -y stress 
    ```


2. Before running the test, check your system resources.

    Find the number of CPU cores of your virtual machine:

    ```bash
    nproc  
    ```

    Check available memory: 

    ```bash
    free -h 
    ```

    For example, if 2 GB of memory is free, you can allocate it during testing.

    ```bash
                  total        used        free      shared  buff/cache   available
    Mem:           3.8Gi       284Mi       2.0Gi       0.0Ki       1.5Gi       3.3Gi
    Swap:             0B          0B          0B
    ```

3. Run the load tests. 
  
    The first load will spin up a worker that will max out the CPU core for 2 minutes

    ```bash
    stress --cpu 1 --timeout 120  
    ```

    Next, use 5 workers to consume 256 MB of memory each for 3 minutes:  

    ```bash
    stress --vm 5 --timeout 160 
    ```

## Visualize Top Processes

1. Login to your ELastic Cloud account and go to Stack Management > Kibana > Data Views > Create data view. Use the details below and click Save data view in Kibana.

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat.png)

2. Go to Analytics > Visualize Library > Create new visualization > Select Lens.

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-2.png)

3. Set the data view at the upper left to `metricbeat`. In the search bar below it, look for `process.cpu.total.pct` and drag it to the main area at the middle. Set the vertical axis to use `Maximum`, as shown below.

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-3.png)

4. On the left search bar, look for `process.executable` and drag it to the main area. Then set the timeframe on the upper right ot 15 minutes. Finally, click **Breakdown** and set the number of values to 10. 

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-8.png)

5. Click the Legend tab and modify the settings.

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-9.png)

6. Click Save on the upper right corner and enter "VM Top 5 processes" as the name. Select new for Dashboard and click Save and go to Dashboard.

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-10.png)

7. To save the dashboard, click Save and enter "Kibana Examples" as the dashbaord name. Click Save.

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-11.png)


## Visualize Memory 

1. Click  Create new visualization > Select Lens again. Make sure the data view is set to `metricbeat`. In the search bar below it, look for `memory.actual.used.bytes` and `memory.actual.free`, and drag both to the main area at the middle. 

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-13.png)
 
2. Set the vertical axis to use `Average` for both metrics. Click `@timestamp` under `Horizontal axis` and set **Minimum interval** to `10s`

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-12.png)

3. Click Save and save this as "VM Memory Utilization" in the same dashboard as the top processes in the previous example.

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-14.png)


## Stacked Charts

1. Create a new Lens visualization and use the `metricbeat` data view. Search for `socket.summary.all.count` and drag it to the main area. On the right, change Bar chart to a Line chart. Set Vertical axis to use `Average`.

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-16.png)

2. Set timeframe to `Last 15 minutes` and click `@timestamp` under `Horizontal axis` and set **Minimum interval** to `1m`

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-17.png)

3. Click the `+` button at the lower right to add a new visualization layer. Select Visualization > Bar chart. Set Horizontal axis to `@timestamp` and Vertical axis to `Average` for:

      - `system.socket.summary.tcp.all.listening`
      - `system.socket.summary.tcp.all.established` 
      - `system.socket.summary.tcp.all.close_wait` 
      - `system.socket.summary.udp.all.count`

    Finally, click Horizontal axis (for this layer) and set Minimum interval to `1m`.

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-18.png)

4. Click the Legend tab and modify the settings, as shown below.

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-19.png)

5. Click Save to Library and save it as "VM Sockets". We should now have three visualization panels in our dashboard. Click Save.

    ![](/img/docs/01262025-elastic-cloud-create-data-view-metricbeat-20.png)