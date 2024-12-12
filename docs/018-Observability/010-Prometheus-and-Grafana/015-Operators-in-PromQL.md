---
title: "Operators in PromQL"
description: "Operators in PromQL"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 15
last_update:
  date: 11/20/2022
---



## Arithmetic Operators 

PromQL supports arithmetic operators for performing calculations on time series data. These operators can be used to manipulate values or combine multiple expressions mathematically.

| **Operator** | **Description**       | **Example**                               |
|--------------|-----------------------|-------------------------------------------|
| `+`          | Addition              | `node_cpu_seconds_total + node_memory_Active_bytes` |
| `-`          | Subtraction           | `node_memory_Active_bytes - node_memory_Inactive_bytes` |
| `*`          | Multiplication        | `node_filesystem_avail_bytes * 2`         |
| `/`          | Division              | `node_network_receive_bytes_total / 1024` |
| `%`          | Modulus (remainder)   | `up % 2`                                  |
| `^`          | Exponentiation        | `up ^ 2`                                  |

Note that when you manipulate the metric, e.g. changing the value of the metric, the metric name will be dropped in the output. 

```json
node_network_receive_bytes_total / 1024
```

Sample output:

```json
{instance="node1", job="worker"}   2157896
{instance="node1", job="worker"}   2152241
```

## Comparison Operators 

Comparison operators in PromQL are used to compare values of time series data. These operators return results based on conditions, either matching or filtering data based on the comparison.

| **Operator** | **Description**                | **Example**                                           |
|--------------|--------------------------------|-------------------------------------------------------|
| `==`         | Equal to                      | `up == 1` (returns series where the value is 1)       |
| `!=`         | Not equal to                  | `up != 1` (returns series where the value is not 1)   |
| `>`          | Greater than                  | `node_cpu_seconds_total > 10`                        |
| `<`          | Less than                     | `node_memory_Active_bytes < 500000`                  |
| `>=`         | Greater than or equal to      | `node_network_receive_bytes_total >= 1024`           |
| `<=`         | Less than or equal to         | `node_filesystem_avail_bytes <= 1000000`             |


Consider the following timeseries:

```json
$ node_network_flags

node_network_flags{device="eth0", instance="node1"} 120  
node_network_flags{device="eth1", instance="node1"} 80  
node_network_flags{device="wlan0", instance="node1"} 150  
node_network_flags{device="eth0", instance="node2"} 95  
node_network_flags{device="eth1", instance="node2"} 200  
```

To show only those timeseries that return a value greater than 100:

```json
$ node_network_flags > 100

node_network_flags{device="eth0", instance="node1"} 120  
node_network_flags{device="wlan0", instance="node1"} 150  
node_network_flags{device="eth1", instance="node2"} 200  
```


## Bool Operators

The `bool` operator in PromQL is used to return a true or false value instead of filtering time series based on a condition. It allows checking conditions without excluding any data. It;s also mostly used for generating alerts.

Consider the following timeseries:  

```json
$ node_filesystem_avail_bytes

node_filesystem_avail_bytes{device="/dev/sda1", instance="node1"} 500  
node_filesystem_avail_bytes{device="/dev/sda2", instance="node1"} 1500  
node_filesystem_avail_bytes{device="/dev/sda3", instance="node1"} 1200  
node_filesystem_avail_bytes{device="/dev/sda1", instance="node2"} 900  
node_filesystem_avail_bytes{device="/dev/sda2", instance="node2"} 2000  
```  

We can use the **bool** operator to find which filesystems have less than 1000 bytes available:  

```json
$ node_filesystem_avail_bytes < bool 1000

node_filesystem_avail_bytes{device="/dev/sda1", instance="node1"} 1  
node_filesystem_avail_bytes{device="/dev/sda2", instance="node1"} 0  
node_filesystem_avail_bytes{device="/dev/sda3", instance="node1"} 1  
node_filesystem_avail_bytes{device="/dev/sda1", instance="node2"} 1  
node_filesystem_avail_bytes{device="/dev/sda2", instance="node2"} 0  
```

## Logical Operators 

Logical operators are used to combine conditions or evaluate boolean expressions. They help filter time series data based on logical relationships such as equality or negation.

| Operator | Description                        | Example                                |
|----------|------------------------------------|----------------------------------------|
| `and`    | Returns the time series where both operands are true | `up and http_requests_total`           |
| `or`     | Returns the time series where at least one operand is true | `up or http_requests_total`            |
| `unless` | Excludes series that match the second operand | `up unless http_requests_total`        |

Consider the following timeseries:

```json
$ node_filesystem_avail_bytes

node_filesystem_avail_bytes{device="/dev/sda1", instance="node1", mountpoint="/"} 3200
node_filesystem_avail_bytes{device="/dev/sda2", instance="node2", mountpoint="/home"} 5400
node_filesystem_avail_bytes{device="/dev/sda3", instance="node1", mountpoint="/var"} 1250
node_filesystem_avail_bytes{device="/dev/sda4", instance="node2", mountpoint="/tmp"} 2500
node_filesystem_avail_bytes{device="/dev/sda5", instance="node1", mountpoint="/usr"} 4200
node_filesystem_avail_bytes{device="/dev/sda6", instance="node2", mountpoint="/mnt"} 600
node_filesystem_avail_bytes{device="/dev/sda7", instance="node1", mountpoint="/opt"} 3900
```

To return all time series greater than 1600 bytes and less than 4200 bytes:

```json
node_filesystem_avail_bytes{value>1600, value<4200}
```

Output:

```json
node_filesystem_avail_bytes{device="/dev/sda1", instance="node1", mountpoint="/"} 3200
node_filesystem_avail_bytes{device="/dev/sda4", instance="node2", mountpoint="/tmp"} 2500
node_filesystem_avail_bytes{device="/dev/sda7", instance="node1", mountpoint="/opt"} 3900
```

To return all time series less than 1800 bytes or greater than 3560 bytes:

```json
node_filesystem_avail_bytes{value<1800 or value>3560}
```

Output:

```json
node_filesystem_avail_bytes{device="/dev/sda3", instance="node1", mountpoint="/var"} 1250
node_filesystem_avail_bytes{device="/dev/sda2", instance="node2", mountpoint="/home"} 5400
node_filesystem_avail_bytes{device="/dev/sda5", instance="node1", mountpoint="/usr"} 4200
node_filesystem_avail_bytes{device="/dev/sda7", instance="node1", mountpoint="/opt"} 3900
```

To return all vectors greater than 1560 bytes unless they are greater than 11000:

```json
node_filesystem_avail_bytes{value>1560 unless value>11000}
```

Output:

```json
node_filesystem_avail_bytes{device="/dev/sda1", instance="node1", mountpoint="/"} 3200
node_filesystem_avail_bytes{device="/dev/sda4", instance="node2", mountpoint="/tmp"} 2500
node_filesystem_avail_bytes{device="/dev/sda7", instance="node1", mountpoint="/opt"} 3900
```


## Binary Operator Precedence

When you have more than one operator in a PromQL query, they are evaluated in a specific order of precedence. The order is as follows:

| **Precedence** | **Operators**                  | **Description**              |  
|-----------------|--------------------------------|------------------------------|  
| 1               | `^`                            | Exponentiation               |  
| 2               | `*` `/` `%` `atan2`            | Multiplication, division, modulo, and arctangent |  
| 3               | `+` `-`                        | Addition and subtraction     |  
| 4               | `<` `>` `<=` `>=` `==` `!=`    | Comparison operators         |  
| 5               | `and` `unless`                | Logical set operators        |  
| 6               | `or`                          | Logical disjunction          |  


Operators on the same level are **left-associative**, which means they are evaluated from left to right if there is no explicit grouping using parentheses.

```json
1 + 2 * 3 - 4
```

This will be evaluated in this order:

```json
2 * 3 = 6 
1 + 6 = 7 
7 - 4 = 3 
```

However, using `^` is **right-associative**, which means the operator is evaluated from right to left.

```json
2 ^ 3 ^ 2
```

This will be evaluated in this order:

```json
3 ^ 2 = 9
2 ^ 9 = 512
```

