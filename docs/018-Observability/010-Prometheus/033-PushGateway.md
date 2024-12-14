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

## Examples: Sending HTTP Requests  

1. Push metric "example_metric 1234" with a job label of `{job="db_backup"}.

    ```bash
    echo "example_metric 1234" | curl --data-binary @-http://prometheus:9001/metrics/job/db_backup
    ```

    In this example, the metric has to be passed as a binary data. The `@-` then tells curl to read the binary data from standard input.

2. Pushing multiple metrics.

    ```bash
    cat << EOF | curl --data-binary @-http://prometheus:9001/metrics/job/job1/instance/instance1

    # TYPE metric_one gauge
    metric_one{label="value1"}  23 
    # TYPE metric_two counter 
    # HELP metric_two Another example
    metric_two  41
    EOF
    ```

## Grouping 

The URL path `job_name + labels` acts as a grouping key in PushGateway. Groups allow you to update or delete multiple metrics at once. All metrics sent to the same URL path are part of the same group.

```bash
http://<push-gateway-address>:<port>/metrics/job/<job-name>/<label1>/<value1>/<label2>/<value2>
```

### Sending Metrics to Groups

The following example sends metrics for the `backup` job:

```bash
cat << EOF | curl --data-binary @- http://prometheus:9001/metrics/job/backup/db/psql
# TYPE metric_one counter
metric_one{label="value1"}  11
# TYPE metric_two gauge
# HELP metric_two Another example
metric_two  100
EOF
```

Here:
- The job name is `backup`, and the URL represents one group:
  ```bash
  /job/backup/db/psql
  ```
- Metrics in this group:
  - `metric_one{label="value1"}  11`
  - `metric_two  100`

Now, send another request for the `backup` job, but with a different URL:

```bash
cat << EOF | curl --data-binary @- http://prometheus:9001/metrics/job/backup/app/web
# TYPE metric_one counter
metric_one{label="value1"}  22
# TYPE metric_two gauge
# HELP metric_two Another example
metric_two  100
EOF
```

Since the URL is different, this creates a new group:
```bash
/job/backup/app/web
```

Metrics in this group:
- `metric_one{label="value1"}  22`
- `metric_two  100`

### Viewing the Metrics

When filtering for the `backup` job on the Prometheus server, metrics are grouped by their respective URLs:

```bash
$ curl prometheus-ip:9091/metrics | grep backup

metric_one{db="psql", instance="", job="backup", label="value1"}  11
metric_two{db="psql", instance="", job="backup"}  100
metric_one{app="web", instance="", job="backup", label="value1"}  22
metric_two{app="web", instance="", job="backup"}  100
```


## Using `POST`

When sending a `POST` request, only metrics with the same name in the same group are replaced. Other metrics remain unaffected.

Consider the initial metrics for the `backup` job: 

```bash
$ curl prometheus-ip:9091/metrics | grep backup 

metric_one{db="psql", instance="", job="backup", label="value1"}  11
metric_two{db="psql", instance="", job="backup"}  100
metric_one{app="web", instance="", job="backup", label="value1"}  22
metric_two{app="web", instance="", job="backup"}  100
```

Send a new request to update a metric in the `/job/backup/app/web` group:

```bash
cat << EOF | curl --data-binary @-http://prometheus:9001/metrics/job/backup/app/web
# TYPE metric_one counter
metric_one{label="value1"}  44
EOF
```

After the update, only the specified metric in the group is replaced:

```bash
$ curl prometheus-ip:9091/metrics | grep backup 

metric_one{db="psql", instance="", job="backup", label="value1"}  11
metric_two{db="psql", instance="", job="backup"}  100
metric_one{app="web", instance="", job="backup", label="value1"}  44
metric_two{app="web", instance="", job="backup"}  100
```


## Using `PUT` 

When sending a `PUT` request, all metrics within a specific group are replaced by the new metrics being pushed. This operation removes all pre-existing metrics in the group and replaces them entirely.

Consider the initial metrics for the `archive` job which includes multiple metrics across different groups:

```bash
$ curl prometheus-ip:9091/metrics | grep archive

metric_one{db="psql", instance="", job="archive", label="value1"}  11
metric_two{db="psql", instance="", job="archive"}  100
metric_one{app="web", instance="", job="archive", label="value1"}  22
metric_two{app="web", instance="", job="archive"}  100
metric_three{app="web", instance="", job="archive"}  300
```

To update metrics in the `/job/archive/app/web` group, send a `PUT` request with the new data:

```bash
cat << EOF | curl -X PUT --data-binary @- http://prometheus:9001/metrics/job/archive/app/web
# TYPE metric_one counter
metric_one{label="value1"}  53
EOF
```

After the `PUT` request, only the new metric is retained in the `/job/archive/app/web` group. All pre-existing metrics in this group are removed:

```bash
$ curl prometheus-ip:9091/metrics | grep archive

metric_one{db="psql", instance="", job="archive", label="value1"}  11
metric_two{db="psql", instance="", job="archive"}  100
metric_one{app="web", instance="", job="archive", label="value1"}  53
```

The metrics `metric_two` and `metric_three` from the `/job/archive/app/web` group are deleted and replaced by the newly pushed `metric_one`.


## Using `DELETE` 

When you send a `DELETE` request, all metrics within the specified group are removed.

Let's use the same `archive` job from the previous example.

```bash
$ curl prometheus-ip:9091/metrics | grep archive

metric_one{db="psql", instance="", job="archive", label="value1"}  11
metric_two{db="psql", instance="", job="archive"}  100
metric_one{app="web", instance="", job="archive", label="value1"}  22
metric_two{app="web", instance="", job="archive"}  100
metric_three{app="web", instance="", job="archive"}  300
```

To delete all metrics in the `/job/archive/app/web` group, send a `DELETE` request:

```bash
curl -X DELETE http://prometheus:9001/metrics/job/archive/app/web
```

After the `DELETE` request, all metrics in the `/job/archive/app/web` group are removed, leaving only metrics from other groups:

```bash
$ curl prometheus-ip:9091/metrics | grep archive

metric_one{db="psql", instance="", job="archive", label="value1"}  11
metric_two{db="psql", instance="", job="archive"}  100
```

Metrics `metric_one`, `metric_two`, and `metric_three` from the `/job/archive/app/web` group are successfully deleted.

## Using Client Libraries

Client libraries can be used to push metrics to PushGateway. The table below summarizes the key functions available in the client library:

| **Function** | **Description**                                                                 | **Equivalent HTTP Request** |
|--------------|---------------------------------------------------------------------------------|-----------------------------|
| `push`       | Removes existing metrics for a job and adds the new metrics pushed             | `PUT`                      |
| `pushadd`    | Pushes metrics, overriding only metrics with the same name. Others remain unchanged | `POST`                     |
| `delete`     | Deletes all metrics in a specified group                                       | `DELETE`                   |

Below is an example of how to use these functions in Python with the `prometheus_client` library:

```python
from prometheus_client import CollectorRegistry, Counter, push_to_gateway, delete_from_gateway

registry = CollectorRegistry()
c = Counter('example_metric', 'An example metric', registry=registry)

c.inc()

# Push metrics using `push` (replaces the entire group)
push_to_gateway('http://localhost:9091', job='example_job', registry=registry)
print("Metrics pushed using 'push'")

# Push metrics using `pushadd` (overrides only metrics with the same name)
push_to_gateway('http://localhost:9091', job='example_job', registry=registry, method='POST')
print("Metrics pushed using 'pushadd'")

# Delete metrics for the specified job
delete_from_gateway('http://localhost:9091', job='example_job')
print("Metrics deleted for 'example_job'")
```

Explanation:

1. **Initialize Registry and Metric**:
   - A `CollectorRegistry` is created to store the metrics.
   - A `Counter` metric (`example_metric`) is defined and incremented using `c.inc()`.

2. **Using `push`**:
   - Metrics are pushed to the PushGateway using the `push_to_gateway` function. 
   - This replaces all existing metrics for the specified job with the new metrics in the registry.

3. **Using `pushadd`**:
   - The same `push_to_gateway` function is used, but with `method='POST'`.
   - This adds or updates only the metrics in the registry while leaving other metrics in the same group unchanged.

4. **Using `delete`**:
   - Metrics for the specified job are deleted from PushGateway using `delete_from_gateway`.