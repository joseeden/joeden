---
title: "ETL and ELT"
description: "ETL and ELT"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
sidebar_position: 36
last_update:
  date: 11/30/2021
---


## Overview

ETL and ELT both deal with extracting, transforming, and loading data, but the order of operations is different. 

## ETL

ETL stands for **Extract, Transform, Load**. In this approach, the **data is transformed first** before being loaded into the data warehouse.

**Pros**:

  - Cleaned and transformed data is directly loaded, reduces storage costs.
  - Easier to manage compliance and security, as sensitive data can be excluded before loading.

**Cons**:

  - Requires separate systems for transformation, increases complexity and costs.
  - Cannot easily reprocess data without going back to the source system.


## ELT

ELT stands for **Extract, Load, Transform**. In this approach, the **data is loaded into the warehouse first** and then transformed.

**Pros**:

  - No need for a separate transformation system; uses the resources of the data warehouse.
  - Easier to rerun transformations without impacting source systems.
  - Good for near real-time processing since loading data is faster.

**Cons**:

  - Requires more storage as full copies of data are stored.
  - More attention is needed to meet compliance standards for sensitive data.

## The Cloud and ELT

The growth of **cloud data warehouses** has made ELT even more popular.

- **Cloud storage** offers nearly unlimited space for data.
- **Parallel computing power** speeds up transformations, makes ELT more efficient.

In the cloud, you can store and transform vast amounts of data quickly, without worrying about hardware limitations.

