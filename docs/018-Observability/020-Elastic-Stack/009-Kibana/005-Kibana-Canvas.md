---
title: "Kibana Canvas"
description: "Kibana Canvas"
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
sidebar_position: 5
last_update:
  date: 3/28/2023
---

## Overview 

Kibana Canvas is a tool for creating dynamic, live infographic dashboards. It allows users to design visually rich presentations with real-time data.  

- Similar to a PowerPoint presentation  
- Can generate bar charts, plots, and other visualizations  

Canvas can pull data from multiple sources for flexible and dynamic visualizations. 

- **Elasticsearch SQL queries** – Retrieve data using SQL-like queries  
- **Timelion expressions** – Perform time-series analysis and visualizations  
- **Raw documents** – Use raw data directly from Elasticsearch

## Components  

Kibana Canvas consists of three main components:  

- **Workpad**  
  - A workspace where graphical representations are built  
  - Single page or multiple pages, similar to visualization panels  

- **Pages**  
  - Contain graphical elements that display data  
  - Allow organizing and structuring the presentation of data  

- **Elements**  
  - **Charts** – Area, bubble, coordinate, bar charts  
  - **Shapes** – Shapes and textboxes, formatted with Markdown  
  - **Images** – Static or dynamic images based on data  
  - **Supporting Elements** – Dropdown filters, time filters  

## Piping Functions  

Kibana allows chaining functions by piping results, known as **contexts**, from one function to another for further processing.

## Pre-requisites  

This guide uses Elastic Cloud for the hosted Elasticsearch cluster and Kibana.

- [Sign up for Elastic Cloud account](https://www.elastic.co/cloud/elasticsearch-service/signup) 
- [Create a hosted deployment](https://www.elastic.co/guide/en/cloud/current/ec-create-deployment.html)
- [Install jq](https://www.scaler.com/topics/linux-jq/)


## Importing the Data 

We'll use an Nginx log file as our dataset. Download the files here:  

- [nginx_json_logs](@site/assets/elastic-stack/kibana-canvas/nginx_json_logs)
- [nginx_json_logs_bulk](@site/assets/elastic-stack/kibana-canvas/nginx_json_logs)

First, we need to convert the log file into a format compatible with the Elasticsearch Bulk API. This can be done using `awk`:  

```bash
awk '{print "{\"index\":{}}\n" $0}' nginx_json_logs > nginx_json_logs_bulk
```

Next, store the Elasticsearch endpoint and credentials in variables:  

```bash
ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
ELASTIC_USER="your-username"
ELASTIC_PW="your-password"
```  

Create the index and define mappings, ensuring the Nginx timestamp is correctly formatted:  

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-X PUT "$ELASTIC_ENDPOINT/nginx" \
-H "Content-Type: application/json" \
-d '{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    "properties": {
      "time": { "type": "date", "format": "dd/MMM/yyyy:HH:mm:ss Z" },
      "response": { "type": "keyword" }
    }
  }
}'
```  

Finally, index the data using the Bulk API:  

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-X POST "$ELASTIC_ENDPOINT/nginx/_bulk" \
-H "Content-Type: application/x-ndjson" \
--data-binary "@nginx_json_logs_bulk" | jq '.errors'
```

If there are no errors during indexing, it should return `false`.

## Create the Canvas Workpad 

Follow these steps to build a Canvas workpad in the Elastic console.  

1. In the Elastic console, go to **Analytics > Dashboard** and click **Create Workpad**.  
2. In the Workpad, click **Add element > Shape**.  
3. On the right panel, set the **Fill** color to `#0b974d`.  
4. Click **Add element** again and select **Chart > Metric**.  
5. Click the **Data** tab on the left, select **Demo data > Elasticsearch SQL**, and click **Select**.  
6. Enter the following query and click **Save**:  

    ```sql
    SELECT COUNT(*) AS count_documents FROM nginx
    ```  

7. Click the **Display** tab and set:  
    - **Value** to `Value` and `count_documents`  
    - **Label** to `Logs`  

    ![](/img/docs/01302025-elastic-cloud-canvas-1.png)  

8. Clone the metric element four times using `Ctrl+C` and `Ctrl+V`.  

    ![](/img/docs/01302025-elastic-cloud-canvas-2.png)  

9. For the second metric, update the **Data** tab with the following query:  

    ```sql
    SELECT SUM(bytes) AS bytes FROM nginx
    ```  

    - Set **Value** to `Value` and `bytes`  
    - Set **Label** to `Bytes Transferred`  

10. For the third metric, update the **Data** tab with this query:  

    ```sql
    SELECT COUNT(DISTINCT remote_ip) AS remote_ip FROM nginx
    ```  

    - Set **Value** to `Value` and `remote_ip`  
    - Set **Label** to `Unique IPs`  

11. For the fourth metric, update the **Data** tab with this query:  

    ```sql
    SELECT COUNT(DISTINCT agent) AS agents FROM nginx
    ```  

    - Set **Value** to `Value` and `agents`  
    - Set **Label** to `Unique Agents`  

12. Adjust the elements and their positions as needed.  

    ![](/img/docs/01302025-elastic-cloud-canvas-4.png)  

13. Click **Add element > Image > Image repeat**.  
14. In the **Display** tab, set **Image size** to `20`.  
15. Click **Import** and select the desired icon.  

    :::info  
    You can use any icon. For this example, download the [agent icon here.](@site/assets/elastic-stack/kibana-canvas/white-globe-icon-24.jpg)  
    :::  

16. Update the **Data** tab with the following query:  

    ```sql
    SELECT COUNT(DISTINCT agent) AS agents FROM nginx
    ```  

    - Adjust **Value** to `Value` and `agents`  

    ![](/img/docs/01302025-elastic-cloud-canvas-5.png)  

17. Add the NGINX logo:  
    - Click **Add element > Image > Image**  
    - In the **Display** tab, click **Import** and select the NGINX icon  

    :::info  
    Download the [NGINX logo here.](@site/assets/elastic-stack/kibana-canvas/Nginx-Logo.wine.png)  
    :::  

    ![](/img/docs/01302025-elastic-cloud-canvas-6.png)  

18. Click **Add element > Text** twice to create two text elements. Use the following markdown for each:  

    ```plaintext
    ## REQUEST STATISTICS - NUMBER OF REQUESTS
    ```  

    ```plaintext
    ## TOP 5 IP ADDRESSES - TRANSFERRED BYTES
    ```  

    ![](/img/docs/01302025-elastic-cloud-canvas-7.png)  

19. Add a data table:  
    - Click **Add element > Chart > Data table**  
    - In the **Data** tab, use the following query:  

      ```sql
      SELECT request, COUNT(*) AS count_requests
      FROM nginx 
      GROUP BY request
      ORDER BY count_requests DESC
      ```  

    - In the **Display** tab, untoggle **Show pagination controls**  
    - Untoggle **Show the header row**  

    ![](/img/docs/01302025-elastic-cloud-canvas-8.png)  

20. Add a bar chart:  
    - Click **Add element > Chart > Horizontal bar** and place it next to the data table  
    - In the **Data** tab, use the same query as the data table  
    - Configure the **Display** settings as shown below  

    ![](/img/docs/01302025-elastic-cloud-canvas-9.png)  

21. Add another data table below the second text element:  
    - Click **Add element > Chart > Data table**  
    - In the **Data** tab, use the following query:  

      ```sql
      SELECT remote_ip, SUM(bytes) AS total_transferred
      FROM nginx 
      GROUP BY remote_ip
      ORDER BY total_transferred DESC NULLS LAST LIMIT 5
      ```  

    - In the **Display** tab, untoggle **Show pagination controls**  
    - Untoggle **Show the header row**  

    ![](/img/docs/01302025-elastic-cloud-canvas-10.png)  

22. Add a gauge chart next to this data table:  
    - Click **Add element > Progress > Gauge**  
    - Open the **Expression Editor** and enter the following expression, then click **Run**  

      ```sql
      filters
      | essql
          query="SELECT SUM(bytes) AS total_transferred_5 
                FROM nginx 
                GROUP BY remote_ip 
                ORDER BY total_transferred_5 DESC NULLS LAST LIMIT 5"
      | math {string "sum(total_transferred_5)/" {filters | essql query="
              SELECT SUM(bytes) AS total_transferred 
              FROM nginx 
              GROUP BY remote_ip 
              ORDER BY total_transferred DESC NULLS LAST" 
          | math "sum(total_transferred)"}}
      | progress shape="gauge" label={formatnumber "0%"}
          font={font size=24 family="'Open Sans', Helvetica, Arial, sans-serif" color="#000000" align="center"}
      | render
      ```  

      ![](/img/docs/01302025-elastic-cloud-canvas-11.png)  

23. Adjust positions and colors as needed. The final workpad should provide a dynamic visualization of your data.  

    ![](/img/docs/01302025-elastic-cloud-canvas-12.png)

## Cleanup  

1. To delete the Workpad, go to Canvas, select your workpad, and click **Delete**.  

   ![](/img/docs/01302025-elastic-cloud-canvas-13.png)  

2. To delete the `nginx` index, go to **Elasticsearch > Indices**, find the index, and click the **delete** icon.  

   ![](/img/docs/01302025-elastic-cloud-canvas-14.png)