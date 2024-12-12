---
title: "PromQL"
description: "Prometheus Query Language"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 14
last_update:
  date: 11/20/2022
---

## Overview 

PromQL, or Prometheus Query Language, is used to query and analyze metrics stored in Prometheus. It provides a powerful syntax to filter, aggregate, and compute data from time series.  

- Precise querying of specific metrics and labels.  
- Supports math operations and functions for data analysis.  
- Data returned can be visualized in dashboards
- Used to build alerting rules to notify administrators
Here's a varied version of your section with adjusted bullet points:


## Data Types  

A PromQL expression can be evaluated to the following types:

- **String**  
  - Represents textual data.  
  - Can be used for label values or information extraction.  
  - Example: This returns a string representation of the job name.

    ```json
    up{job="api"}
    ```

    Sample output:

    ```json
    job="api"
    ```

- **Scalar**  
  - A single numeric value.  
  - Useful for simple arithmetic calculations.  
  - Commonly used in thresholds or single-value expressions.  
  - Example: This evaluates a scalar value.

    ```json
    5 * 2
    ```

    Sample output:

    ```json
    10
    ```

- **Instant Vector**  
  - A set of time series at a single point in time.  
  - Used in most PromQL queries for direct evaluation.  
  - Example: This retrieves the CPU idle time for nodes.

    ```json
    node_cpu_seconds_total{mode="idle"}
    ```

    Sample output:

    ```json
    node_cpu_seconds_total{mode="idle", instance="node1"} 12345
    node_cpu_seconds_total{mode="idle", instance="node2"} 67890
    ```

- **Range Vector**  
  - A set of time series over a time range.  
  - Used for aggregation or trend analysis over time.  
  - Includes historical data for specified ranges.  
  - Example: This calculates the request rate over the last 5 minutes.

    ```json
    rate(http_requests_total[5m])
    ```

    Sample output:

    ```json
    http_requests_total{instance="web1"} 15
    http_requests_total{instance="web2"} 20
    ```


## Selectors and Matchers  

**Selectors** allow you to filter and retrieve specific time series data in PromQL. They can be used to query metrics and focus on the desired datasets by applying constraints or patterns. 

As an example, see the expression below:

```json
node_filesystem_avail_bytes
```

This will return all the time series with this metric.

```json
node_filesystem_avail_bytes{device="/dev/sda1", instance="server1"} 123456789
node_filesystem_avail_bytes{device="/dev/sda2", instance="server2"} 987654321
add 5 more lines
```

On the other hand, **label matchers** are used to refine selectors by applying conditions on labels. Matchers allow you to include or exclude time series based on specific criteria. 

Examples of matchers include:

| Matcher | Description                      | Example                                  |
|---------|----------------------------------|------------------------------------------|
| `=`     | Equality matcher                 | Returns time series with exact matches.  |
| `!=`    | Negative equality matcher        | Excludes time series with specific labels. |
| `=~`    | Regular expression matcher       | Matches time series with labels matching a regex. |
| `!~`    | Negative regular expression matcher | Excludes time series matching a regex. |


## Using Matchers 

Let's use the following as example data:

```json
node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node1", mountpoint="/boot/efi"} 34567890
node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node2", mountpoint="/boot/efi"} 45678901
node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node1", mountpoint="/"} 98765432
node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node2", mountpoint="/"} 12345678
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run"} 56789012
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/lock"} 23456789
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/snapd/ns"} 89012345
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/user/1000"} 12398765
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node2", mountpoint="/run"} 67890123
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node2", mountpoint="/run/lock"} 78901234
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node2", mountpoint="/run/snapd/ns"} 34567812
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node2", mountpoint="/run/user/1000"} 45678923
```

Using the various matchers:

- Using Equality Matcher:

  ```json
  node_filesystem_avail_bytes{instance="node1"} 
  ```

  Output:

  ```json
  node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node1", mountpoint="/boot/efi"} 34567890
  node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node1", mountpoint="/"} 98765432
  node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run"} 56789012
  node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/lock"} 23456789
  node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/snapd/ns"} 89012345
  node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/user/1000"} 12398765
  ```

- Using Negative Equality Matcher:

  ```json
  node_filesystem_avail_bytes{fstype!="tmpfs"} 
  ```

  Output:

  ```json
  node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node1", mountpoint="/boot/efi"} 34567890
  node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node2", mountpoint="/boot/efi"} 45678901
  node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node1", mountpoint="/"} 98765432
  node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node2", mountpoint="/"} 12345678
  ```

- Using Regex Matcher:

  ```json
  node_filesystem_avail_bytes{instance=~"node[1-2]", mountpoint=~"/run.*"} 
  ```

  Output:

  ```json
  node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run"} 56789012
  node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/lock"} 23456789
  node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/snapd/ns"} 89012345
  node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/user/1000"} 12398765
  node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node2", mountpoint="/run"} 67890123
  node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node2", mountpoint="/run/lock"} 78901234
  node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node2", mountpoint="/run/snapd/ns"} 34567812
  node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node2", mountpoint="/run/user/1000"} 45678923
  ```

- Using Negative Regex Matcher:

  ```json
  node_filesystem_avail_bytes{mountpoint!~"/run.*"} 
  ```

  Output:

  ```json
  node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node1", mountpoint="/boot/efi"} 34567890
  node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node2", mountpoint="/boot/efi"} 45678901
  node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node1", mountpoint="/"} 98765432
  node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node2", mountpoint="/"} 12345678
  ```

- Combining multiple selectors:

  ```json
  node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node1", mountpoint="/boot/efi"} 34567890
  node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node1", mountpoint="/"} 98765432
  ```


## Range Vector Selectors 

Range vector selectors are used to retrieve data over a time range, enabling you to access the values of a specific metric across multiple time points. This allows you to analyze how a metric changes over a specified duration. 

As en example, we can use the expression below to return all the values for a specific metric over a period of time:

```json
node_arp_entries{instance="node1"}[2m]
```

Sample output:

```json
node_arp_entries{instance="node1", device="eth0"} 10 1671067200
node_arp_entries{instance="node1", device="eth0"} 11 1671067260
node_arp_entries{instance="node1", device="eth0"} 13 1671067320
node_arp_entries{instance="node1", device="eth1"} 15 1671067380
node_arp_entries{instance="node1", device="eth1"} 14 1671067440
node_arp_entries{instance="node1", device="eth1"} 16 1671067500
```

## Offset Modifier

The offset modifier allows you to shift the evaluation of a query by a specific duration of time, making it useful for comparing current data with past data. This helps analyze trends, detect anomalies, or compare metrics at different time intervals. It can be applied to both instant and range vector queries.

As an example, adding `offset 5m' to the expression below will give the value of the expression 5 minutes ago.

```bash
node_memory_Active_bytes{instance="node1"}  offset 5m       
```

Sample output:

```bash
node_memory_Active_bytes{instance="node1"} 8456789120 1671067500
```

We can use the following time units:

| **Unit** | **Meaning**         | **Example**             |
|----------|---------------------|-------------------------|
| `ms`     | Milliseconds        | `offset 500ms`         |
| `s`      | Seconds             | `offset 30s`           |
| `m`      | Minutes             | `offset 5m`            |
| `h`      | Hours               | `offset 2h`            |
| `d`      | Days                | `offset 1d`            |
| `w`      | Weeks               | `offset 1w`            |
| `y`      | Years (approximate) | `offset 1y`            |

For values that are not exact, we can combine them:

```bash
node_memory_Active_bytes{instance="node1"}  offset 1h17m       
```

## `@modifier`

To go back to a specific timestamp, we can use `@modifier` where `modifier` is the Unix timestamp:

```bash
node_memory_Active_bytes{instance="node1"} @1663265188
```

Similarly, we can combine the `@modifier` and the offset modifier:

```bash
node_memory_Active_bytes{instance="node1"} @1663265188 offset 5m
```

In this example, the value at the exact timestamp specified by `@` (1663265188) will be evaluated, and then the `offset 5m` will shift the evaluation to 5 minutes before that specified timestamp. Note that the order doesn't matter, so we can shift the places and it will still display the same output.

```bash
node_memory_Active_bytes{instance="node1"} offset 5m @1663265188 
```

The `@modifier` and offset modifier can also work with range vectors. In the example below, the query retrieves values for the range 12 minutes before the timestamp 1663265188 and evaluates data for the preceding 3-minute period.

```bash
node_memory_Active_bytes{instance="node1"}[3m] offset 12m @1663265188 
```

In simple terms, this query retrieves 3 minutes' worth of data, starting 12 minutes before the specified timestamp (`1663265188`).