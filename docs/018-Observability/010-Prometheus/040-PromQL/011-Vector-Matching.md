---
title: "Vector Matching"
description: "Vector Matching in PromQL"
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

PromQL supports operations between an instant vector and scalars, as well as between two vectors. This allows for powerful querying and mathematical operations over metrics.

We normally perform operations between an instant vector and scalars:

```json
node_filesystem_avail_bytes < 100
```

However, we can also perform operations between two vectors. Consider the two metrics below:

```json
node_filesystem_avail_bytes{instance="node1", job="worker", mountpoint="/home"}         512
node_filesystem_avail_bytes{instance="node1", job="worker", mountpoint="/var"}          875
node_filesystem_size_bytes{instance="node1", job="worker", mountpoint="/home"}          1024
node_filesystem_size_bytes{instance="node1", job="worker", mountpoint="/var"}           2048
```

To calculate the percentage of available filesystem, we can divide `node_filesystem_avail_bytes` by `node_filesystem_size_bytes`, and then multiply by 100:

```json
node_filesystem_avail_bytes / node_filesystem_size_bytes * 100
```

Output:

```json
{instance="node1", job="worker", mountpoint="/home"} 50
{instance="node1", job="worker", mountpoint="/var"}  42.67578125
```

## Rules for Vector Matching 

Vector matching in PromQL allows you to combine metrics using labels as the basis for matching. Operations between vectors require their labels to align in specific ways.


- Samples with exact same labels get matched together.

    ```json
    metric_1{label1="A", label2="B"} 10
    metric_2{label1="A", label2="B"} 20
    ```

- All labels must be the same for the samples to match.

    - **NO MATCH** due to label mismatch:

        ```json
        metric_1{label1="A", label2="B"} 10
        metric_2{label1="A", label3="C"} 20
        ```

    - Two samples where one has an extra label (**NO MATCH**):

        ```json
        metric_1{label1="A", label2="B"} 10
        metric_2{label1="A", label2="B", label3="C"} 20
        ```

    - Two samples that match (**MATCH**):

        ```json
        metric_1{label1="A", label2="B"} 10
        metric_2{label1="A", label2="B"} 20
        ```

## Using `ignoring` 

When two vectors have differing labels, you can use the `ignoring` keyword to exclude specific labels from the matching criteria. This is useful for performing operations on metrics that share a subset of labels.


Example: Consider the two metrics below.

```json
$ http_errors

http_errors{method="GET", code="500"} 5
http_errors{method="GET", code="404"} 3
http_errors{method="POST", code="500"} 7
http_errors{method="POST", code="404"} 4
http_errors{method="PUT", code="500"} 2
http_errors{method="PUT", code="404"} 1
```

```json
$ http_requests

http_requests{method="GET"} 100
http_requests{method="POST"} 150
http_requests{method="PUT"} 50
http_requests{method="DELETE"} 20
```


To see what percentage of the requests are errors, we can divide `http_errors` by `http_requests`. However, since they don't have exactly matching labels, we use `ignoring` to exclude the `code` label:

```json
http_errors{code="500"} / ignoring(code) http_requests
```

Output:

```json
http_errors{method="GET", code="500"} 0.05
http_errors{method="POST", code="500"} 0.04666666666666667
http_errors{method="PUT", code="500"} 0.04
```

## Using `on` 

Unlike `ignoring`, the `on` keyword in PromQL explicitly specifies which labels should be used for matching metrics during operations. This is useful when you want to perform calculations based on specific label alignment.

Using the previous sample vectors:

```json
$ http_errors

http_errors{method="GET", code="500"} 5
http_errors{method="GET", code="404"} 3
http_errors{method="POST", code="500"} 7
http_errors{method="POST", code="404"} 4
http_errors{method="PUT", code="500"} 2
http_errors{method="PUT", code="404"} 1
```

```json
$ http_requests

http_requests{method="GET"} 100
http_requests{method="POST"} 150
http_requests{method="PUT"} 50
http_requests{method="DELETE"} 20
```

We can calculate the percentage of requests that are errors using the `ignoring` keyword. However, the `on` keyword allows matching specifically by the `method` label to focus on what we are looking for:

```json
http_errors{code="500"} / on(method) http_requests
```

Output:

```json
http_errors{method="GET", code="500"} 0.05
http_errors{method="POST", code="500"} 0.04666666666666667
http_errors{method="PUT", code="500"} 0.04
```

## One-to-One

One-to-One vector matching occurs when two vectors have exactly matching labels and the same number of samples. The samples from each vector are aligned by label, and operations are performed on the corresponding pairs.

Consider the two vectors below:

```json
node_filesystem_avail_bytes{instance="node1", mountpoint="/home"} 512
node_filesystem_avail_bytes{instance="node1", mountpoint="/var"} 875
```

```json
node_filesystem_size_bytes{instance="node1", mountpoint="/home"} 1024
node_filesystem_size_bytes{instance="node1", mountpoint="/var"} 2048
```

One-to-one vector matching simply checks for matching labels between vectors, performing the operation for each matching pair. The following query divides the available bytes by the total bytes for each mount point:

```json
node_filesystem_avail_bytes / node_filesystem_size_bytes
```

Sample output:

```json
node_filesystem_avail_bytes{instance="node1", mountpoint="/home"} 0.5
node_filesystem_avail_bytes{instance="node1", mountpoint="/var"} 0.42724609375
```

:::info 

All the operations discussed in the previous sections involve **one-to-one vector matching**. This means that for each label, the samples from the two vectors must match exactly, and the operation is performed on corresponding samples from both vectors.

:::

## Many-to-One

Many-to-One vector matching involves matching multiple elements from one vector to a single element in another. This type of operation requires the use of explicit grouping keywords such as `group_left` or `group_right` to handle situations where one side has multiple values for the same label.

Consider the following sample vectors:

```json
http_errors{error=400, path=/dine}      3
http_errors{error=500, path=/dine}      5
http_errors{error=400, path=/hotel}     1
http_errors{error=500, path=/hotel}     8
```

```json
http_requests{paths=/dine}     3
http_requests{paths=/dine}     8
```

When we use the `on` to match just the `path` label, we encounter an issue because `http_errors` has multiple samples for the same path. If we execute:

```json
http_errors + on(path) http_requests
```

We get the error:

```
Error executing query: multiple matches for labels: many-to-one matching must be explicit (group_left/group_right)
```

To resolve this, we can use the `group_left` keyword, which allows the elements on the left side to match with multiple elements on the right side:

```json
http_errors + on(path) group_left http_requests
```

Sample output:

```json
http_errors{error="400", path="/dine"}      6
http_errors{error="500", path="/dine"}      13
http_errors{error="400", path="/hotel"}     9
http_errors{error="500", path="/hotel"}     16
```

Using `group_right` will allow the elements on the right side to match with multiple elements on the left side:

```json
http_errors + on(path) group_right http_errors
```

Sample output:

```json
http_errors{error="400", path="/dine"}      6
http_errors{error="500", path="/dine"}      13
http_errors{error="400", path="/hotel"}     9
http_errors{error="500", path="/hotel"}     16
```