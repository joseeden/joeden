---
title: "PushGateways"
description: "Batch Jobs and PushGateways"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 33
last_update:
  date: 11/20/2022
---

## Overview 

Batch jobs are short-lived and do not stay active long enough to be scraped at regular intervals. Instead of relying on scraping, these jobs push their metrics to a PushGateway, which allows Prometheus to collect the data for monitoring.

![](/img/docs/12132024-Observability-prometheus-pushgw.png)

This setup is useful for jobs that run intermittently or for a short duration, ensuring that their metrics are still available for Prometheus to scrape.


## Install PushGateway

To install PushGateway, follow these steps:

1. Download PushGateway from the [official download page](https://prometheus.io/download/#pushgateway) using `wget` or `curl`.
  
   ```bash
   wget https://github.com/prometheus/pushgateway/releases/download/v1.4.0/pushgateway-1.4.0.linux-amd64.tar.gz
   ```

2. After downloading, extract the files:
  
   ```bash
   tar -xvzf pushgateway-1.4.0.linux-amd64.tar.gz
   cd pushgateway-1.4.0.linux-amd64
   ```

3. Start PushGateway by running the command below. By default, PushGateway will start listening on port `9091`.
  
   ```bash
   ./pushgateway
   ```

4. Open a browser or use `curl` to verify that PushGateway is running:

   ```bash
   curl http://localhost:9091
   ```

5. To run PushGateway as a service, create a systemd unit file in `/etc/systemd/system/pushgateway.service`:

  ```bash
    [Unit]
    Description=PushGateway
    After=network.target

    [Service]
    ExecStart=/path/to/pushgateway/pushgateway
    WorkingDirectory=/path/to/pushgateway
    Restart=always

    [Install]
    WantedBy=multi-user.target
  ```

6. Enable and start the PushGateway service.


  ```bash
  sudo systemctl enable pushgateway
  sudo systemctl start pushgateway
  sudo systemctl status pushgateway
  ```


## Configure Prometheus to Scrape PushGateway

After PushGateway is installed and running, you need to configure Prometheus to scrape it.

1. Open `/etc/prometheus/prometheus.yml` and add:

   ```yaml
   scrape_configs:
     - job_name: 'batch_jobs'
       honor_labels: true
       static_configs:
         - targets: ['pushgateway:9091']
   ```

   The `honor_labels` ensures that the metric labels from the batch job are retained and not overwritten by those of PushGateway.

2. Restart Prometheus to apply the changes:

   ```bash
   sudo systemctl restart prometheus
   ```

   Or, if you're running Prometheus manually:

   ```bash
   ./prometheus --config.file=/etc/prometheus/prometheus.yml
   ```



## Push Metrics from Batch Jobs

Once Prometheus is configured to scrape PushGateway, you can push metrics from batch jobs using any of the following methods:

- Send HTTPs requests to PushGateway
- Use Prometheus Client Libraries

### Sending HTTP Requests 

Send the following HTTP `POST` request using the following URL:

```bash
http://<push-gateway-address>:<port>/metrics/job/<job-name>/<label1>/<value1>/<label2>/<value2>
```

The `job-name` is the job label of the metrics pushed, while the `label` and `value`is used as **grouping key** - allows for grouping metrics together to update/delete multiple metrics at once. 

### Using Client Libraries

Follow the steps below:

1. Install the client library (depending on the language of your batch job)
2. Use the library to push metrics to PushGateway.

Example in Python:

```python
from prometheus_client import CollectorRegistry, Gauge, push_to_gateway

registry = CollectorRegistry()
g = Gauge('batch_job_duration_seconds', 'Job duration in seconds', registry=registry)
g.set(3.14)  # Set the metric value
push_to_gateway('pushgateway:9091', job='batch_jobs', registry=registry)
```

This will push the metric `batch_job_duration_seconds` with a value of `3.14` to the PushGateway.


## Verify Push in Prometheus

Prometheus should now scrape the metrics from the PushGateway and make them available for monitoring and alerting.

1. After the batch job pushes metrics to PushGateway, go to the Prometheus web UI.
2. Use the Prometheus query interface to query for metrics from the batch job, such as `batch_job_duration_seconds`.



## Examples: Sending HTTP Requests  

1. Push metric "example_metric 1234" with a job label of `{job="db_backup"}.

    ```bash
    echo "example_metric 1234" | curl --data-binary @-http://prometheus:9001/metrics/job/db_backup
    ```

    In this example, the metric has to be passed as a binary data. The `@-` then tells curl to read the binary data from standard input.

2. Pushing multiple metrics.

    ```bash
    cat << EOF | curl --data-binary @-http://prometheus:9001/metrics/job/job1/instance/instance1

    # TYPE first_metric gauge
    first_metric{label="value1"}  23 
    # TYPE second_metric counter 
    # HELP second_metric Another example
    second_metric  41
    EOF
    ```
