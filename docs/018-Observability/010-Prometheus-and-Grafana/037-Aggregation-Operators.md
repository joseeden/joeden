---
title: "Aggregation Operators"
description: "Aggregation Operators in PromQL"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 37
last_update:
  date: 11/20/2022
---


## Overview 

Aggregation operators in PromQL are used to combine multiple time series into a single time series, allowing us to calculate statistics such as sums, averages, or counts over a set of data. These operators help in reducing complexity and focusing on broader metrics across different dimensions.

| Operator      | Description                                                       |
|---------------|-------------------------------------------------------------------|
| **sum**       | Returns the sum of values in a set of time series.               |
| **min**       | Returns the minimum value in a set of time series.               |
| **max**       | Returns the maximum value in a set of time series.               |
| **avg**       | Returns the average value in a set of time series.               |
| **group**     | Groups time series by specified labels.                          |
| **stddev**    | Returns the standard deviation of values in a set of time series.|
| **stdvar**    | Returns the variance of values in a set of time series.          |
| **count**     | Counts the number of time series in the set.                     |
| **count_values** | Returns the count of unique values in a set of time series.    |
| **bottomk**   | Returns the lowest `k` time series by value.                     |
| **topk**      | Returns the highest `k` time series by value.                    |
| **quantile**  | Calculates the `k`-th percentile (quantile) of a set of time series. |

Consider the sample vector below:

```json
$ http_requests

http_requests{method="GET", path="/home"}  120
http_requests{method="POST", path="/home"} 150
http_requests{method="GET", path="/about"} 100
http_requests{method="POST", path="/about"} 180
http_requests{method="GET", path="/contact"} 200
http_requests{method="POST", path="/contact"} 130
http_requests{method="GET", path="/shop"} 140
http_requests{method="POST", path="/shop"} 160
http_requests{method="GET", path="/checkout"} 250
http_requests{method="POST", path="/checkout"} 190
http_requests{method="GET", path="/profile"} 230
http_requests{method="POST", path="/profile"} 210
```

To sum up all requests:

```json
$ sum(http_requests)

http_requests  2820
```

To get the max request count:

```json
$ max(http_requests)

http_requests{method="GET", path="/checkout"}  250
```

To get the average request count:

```json
$ avg(http_requests)

http_requests  170
```

## Using `by` clause 

The `by` clause in PromQL allows you to group time series by specific labels to perform aggregation operations on subsets of data. It helps in summarizing or comparing metrics based on different dimensions, like method or instance.

For example, consider the following sample vector with an additional label `node`:

```json
$ http_requests

http_requests{method="GET", path="/home", node="node1"}  120
http_requests{method="POST", path="/home", node="node1"} 150
http_requests{method="GET", path="/about", node="node1"} 100
http_requests{method="POST", path="/about", node="node1"} 180
http_requests{method="GET", path="/contact", node="node1"} 200
http_requests{method="POST", path="/contact", node="node1"} 130
http_requests{method="GET", path="/shop", node="node1"} 140
http_requests{method="POST", path="/shop", node="node1"} 160
http_requests{method="GET", path="/checkout", node="node1"} 250
http_requests{method="POST", path="/checkout", node="node1"} 190
http_requests{method="GET", path="/profile", node="node1"} 230
http_requests{method="POST", path="/profile", node="node1"} 210
```

To get the sum of requests for each `path`, use the query:

```json
$ sum by(path) (http_requests)

http_requests{path="/home"} 270
http_requests{path="/about"} 280
http_requests{path="/contact"} 330
http_requests{path="/shop"} 300
http_requests{path="/checkout"} 440
http_requests{path="/profile"} 440
```

To get the sum of requests grouped by the `method` label, use the query:

```json
$ sum by(method) (http_requests)

http_requests{method="GET"} 1140
http_requests{method="POST"} 1140
```

You can also group by multiple labels, such as `instance` and `method`:

```json
$ sum by(instance, method) (http_requests)

http_requests{instance="node1", method="GET"} 1140
http_requests{instance="node1", method="POST"} 1140
```

## Using `without` 

## Using `without`

The `without` keyword allows you to aggregate metrics while excluding certain labels. This is useful when you want to group data by all labels except a specific one.

Consider the following sample vector:

```json
$ http_requests

http_requests{method="GET", path="/home", node="node1"}  120
http_requests{method="POST", path="/home", node="node1"} 150
http_requests{method="GET", path="/about", node="node1"} 100
http_requests{method="POST", path="/about", node="node1"} 180
http_requests{method="GET", path="/contact", node="node1"} 200
http_requests{method="POST", path="/contact", node="node1"} 130
http_requests{method="GET", path="/shop", node="node1"} 140
http_requests{method="POST", path="/shop", node="node1"} 160
http_requests{method="GET", path="/checkout", node="node1"} 250
http_requests{method="POST", path="/checkout", node="node1"} 190
http_requests{method="GET", path="/profile", node="node1"} 230
http_requests{method="POST", path="/profile", node="node1"} 210
```

To aggregate the `http_requests` metric while excluding the `path` label, use the `without` keyword:

```bash
$ sum without(path) (http_requests)

http_requests{method="GET", node="node1"} 1340
http_requests{method="POST", node="node1"} 1280
```

In this example, the requests are summed by the `method` and `node` labels, but the `path` label is excluded from the aggregation.