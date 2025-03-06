---
title: "Setting up a Standalone Cluster"
description: "Setting up a Standalone Cluster"
tags: 
- Data Engineering
- Big Data
- Apache Flink
sidebar_position: 16
last_update:
  date: 2/27/2022
---


## Pre-requisites

- Unix-like environment (Linux, MacOS, Cygwin)
- Java 1.8.x or higher installed on all machines
- Configure JAVA_HOME environment variable
- SSH installed and running
- Passwordless SSH


## Overview 

In this lab, we'll setup Flink in a fully distributed standalone cluster. The setup will be **static but heterogenouds**, which means the machines in the cluster can have different specifications like instance type.

We'll construct a fairly simple cluster :

- one master node - where the jobmanager runs
- two worker nodes - where taskmanager processes run

Since the jobmanager schedules the tasks on the worker nodes, it is necessary that all worker nodes should be able to talk to the master node.
