---
title: "Console Templates"
description: "Visualization using Console Templates"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 23
last_update:
  date: 11/20/2022
---


## Overview 

Console templates enable you to create custom HTML dashboards for visualizing Prometheus metrics. They offer flexibility by allowing tailored displays of collected data and can be designed using the Go templating language. In this lab, we'll set up a `node-stats.html` console template which displays:

- `memory size` and `memory utilization` of the nodes
- `CPU stats` and `cpu utilization` of the nodes
- Graph of the `cpu utilization`
- Graph of the `received bytes`

## Lab Environment 

<div class='img-center'>

![](/img/docs/prometheus=lab-environment.png) 

</div>


## Pre-requisites  

- [Setup Prometheus](/docs/018-Observability/010-Prometheus-and-Grafana/020-Installation.md)
- [Setup Node Exporter on the nodes](/docs/018-Observability/010-Prometheus-and-Grafana/021-Setting-up-Exporters.md)

## Steps 

1. Create the `/etc/prometheus/consoles/node-stats.html` with the standard header and footer.

    ```html
    {{template "head" .}}
    {{template "prom_content_head" .}}

    <h1>Node Stats</h1>

    {{template "prom_content_tail" .}}
    {{template "tail"}} 
    ```

2. Open the web browser and proceed to the page below. At the moment, it is still currently empty.

    ```bash
    https://<prometheus-url>/consoles/node-stats.html 
    ```

    ![](/img/docs/12112024-Observability-prometheus-console-template-custom-10.png)


3. Update the template and add `memory stats` of the nodes

    ```html
    {{template "head" .}}
    {{template "prom_content_head" .}}

    <h1>Node Stats</h1>

    <h3>Memory</h3>
    <strong>Memory utilization:</strong> {{template "prom_query_drilldown" (args
    "100- (node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes*100)" "%") }}

    {{template "prom_content_tail" .}}
    {{template "tail"}} 
    ```

4. Refresh the Prometheus console and see the `memory` added.

    ![](/img/docs/12112024-Observability-prometheus-console-template-custom-11.png)


5. Update the template once again and add `memory size`.

    ```html
    {{template "head" .}}
    {{template "prom_content_head" .}}

    <h1>Node Stats</h1>

    <h3>Memory</h3>
    <strong>Memory utilization:</strong> {{template "prom_query_drilldown" (args
    "100- (node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes*100)" "%") }}
    <br/>

    <strong>Memory Size:</strong> {{template "prom_query_drilldown" (args "node_memory_MemTotal_bytes/1000000" "Mb") }}

    {{template "prom_content_tail" .}}
    {{template "tail"}} 
    ```

6. We now have two metrics printed in the console.

    ![](/img/docs/12112024-Observability-prometheus-console-template-custom-12.png)


7. Now add the CPU-based stats:

    ```html
    {{template "head" .}}
    {{template "prom_content_head" .}}

    <h1>Node Stats</h1>

    <h3>Memory</h3>
    <strong>Memory utilization:</strong> {{template "prom_query_drilldown" (args
    "100- (node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes*100)" "%") }}
    <br/>

    <strong>Memory Size:</strong> {{template "prom_query_drilldown" (args "node_memory_MemTotal_bytes/1000000" "Mb") }}
    <br/>

    <h3>CPU</h3>
    <strong>CPU Count:</strong> {{template "prom_query_drilldown" (args
    "count(node_cpu_seconds_total{mode='idle'})") }}

    {{template "prom_content_tail" .}}
    {{template "tail"}} 
    ```

8. Refresh the Prometheus console once again to show both CPU and memory metrics.

    ![](/img/docs/12112024-Observability-prometheus-console-template-custom-13.png)


9. Add one more CPU metric which calculates CPU Utilization.

    ```html
    {{template "head" .}}
    {{template "prom_content_head" .}}

    <h1>Node Stats</h1>

    <h3>Memory</h3>
    <strong>Memory utilization:</strong> {{template "prom_query_drilldown" (args
    "100- (node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes*100)" "%") }}
    <br/>

    <strong>Memory Size:</strong> {{template "prom_query_drilldown" (args
    "node_memory_MemTotal_bytes/1000000" "Mb") }}

    <h3>CPU</h3>
    <strong>CPU Count:</strong> {{template "prom_query_drilldown" (args
    "count(node_cpu_seconds_total{mode='idle'})") }}
    <br/>

    <strong>CPU Utilization:</strong>
    {{template "prom_query_drilldown" (args
    "sum(rate(node_cpu_seconds_total{mode!='idle'}[2m]))*100/8" "%") }}

    {{template "prom_content_tail" .}}
    {{template "tail"}}
    ```

10. On the Prometheus console, click refresh to reflect all four metrics.

    ![](/img/docs/12112024-Observability-prometheus-console-template-custom-15.png)


11. Finally, graph out the CPU Utilization on the nodes:


    ```html
    {{template "head" .}}
    {{template "prom_content_head" .}}

    <h1>Node Stats</h1>

    <h3>Memory</h3>
    <strong>Memory utilization:</strong> {{template "prom_query_drilldown" (args
    "100- (node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes*100)" "%") }}
    <br/>

    <strong>Memory Size:</strong> {{template "prom_query_drilldown" (args
    "node_memory_MemTotal_bytes/1000000" "Mb") }}

    <h3>CPU</h3>
    <strong>CPU Count:</strong> {{template "prom_query_drilldown" (args
    "count(node_cpu_seconds_total{mode='idle'})") }}
    <br/>

    <strong>CPU Utilization:</strong>
    {{template "prom_query_drilldown" (args
    "sum(rate(node_cpu_seconds_total{mode!='idle'}[2m]))*100/16" "%") }}

    <div id="cpu"></div>
    <script>
    new PromConsole.Graph({
        node: document.querySelector("#cpu"),
        expr: "sum(rate(node_cpu_seconds_total{mode!='idle'}[2m]))*100/2",
    });
    </script>

    {{template "prom_content_tail" .}}
    {{template "tail"}}
    ```

12. We're now getting more details with the graph after reloading the Prometheus console.

    ![](/img/docs/12112024-Observability-prometheus-console-template-custom-16.png)


13. Let's just add one more graph for a new metric that tracks all received bytes on all interfaces:

    ```html
    {{template "head" .}}
    {{template "prom_content_head" .}}

    <h1>Node Stats</h1>

    <h3>Memory</h3>
    <strong>Memory utilization:</strong> {{template "prom_query_drilldown" (args
    "100- (node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes*100)" "%") }}
    <br/>

    <strong>Memory Size:</strong> {{template "prom_query_drilldown" (args
    "node_memory_MemTotal_bytes/1000000" "Mb") }}

    <h3>CPU</h3>
    <strong>CPU Count:</strong> {{template "prom_query_drilldown" (args
    "count(node_cpu_seconds_total{mode='idle'})") }}
    <br/>

    <strong>CPU Utilization:</strong>
    {{template "prom_query_drilldown" (args
    "sum(rate(node_cpu_seconds_total{mode!='idle'}[2m]))*100/8" "%") }}

    <div id="cpu"></div>
    <script>
    new PromConsole.Graph({
        node: document.querySelector("#cpu"),
        expr: "sum(rate(node_cpu_seconds_total{mode!='idle'}[2m]))*100/2",
    });
    </script>

    <h3>Network</h3>
    <div id="network"></div>

    <script>
    new PromConsole.Graph({
        node: document.querySelector("#network"),
        expr: "rate(node_network_receive_bytes_total[2m])",
    });
    </script>

    {{template "prom_content_tail" .}}
    {{template "tail"}}
    ```

14. Refresh the Prometheus console page:

    ![](/img/docs/12112024-Observability-prometheus-console-template-custom-19.png)