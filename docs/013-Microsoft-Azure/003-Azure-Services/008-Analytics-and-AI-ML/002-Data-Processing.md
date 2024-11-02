---
title: "Data Processing"
description: "Data Processing in Azure"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 2
last_update:
  date: 7/18/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::


## Real-time vs Batch Processing

When choosing a data processing service, it's crucial to decide whether you need real-time or batch processing. Real-time processing allows you to access data immediately for analysis, while batch processing is more suited for scheduled or ad-hoc tasks.

- Real-time: Immediate data access for analysis
- Batch: Scheduled or ad-hoc analytics tasks

Here's an example to make it clearer. Real-time processing is essential for a hospital's emergency department that needs live patient data, such as heart-rate monitoring. On the other hand, batch processing works well for updating a weekly inventory management dashboard in a hospital. Both methods have different infrastructure needs and costs.

- Real-time: Hospital patient data dashboards
- Batch: Inventory management dashboards

## ETL Processes

ETL (Extract, Transform, Load) is a process used for data integration. It starts with extracting data from various sources, then transforming it to meet business needs, and finally loading it into a target system.

### Extract

The Extract phase is all about gathering data from different sources. This can be a one-time task or happen regularly.

- Pulls data from diverse sources like databases and files
- Handles various data types, including structured and unstructured
- Sets up data for the transformation phase

### Transform

In the Transform phase, the extracted data is cleaned, enriched, and reshaped to fit the analysis requirements.

- Removes duplicates and cleanses data
- Applies business rules for consistency
- Converts data formats to the required structure

### Load

The Load phase involves loading the transformed data into the target system, such as a data warehouse, for analysis and reporting.

- Loads data into data warehouses, lakes, or databases
- Ensures data is ready for querying and reporting
- Optimizes data for efficient storage and retrieval

## Processing Tools

Azure provides various tools for data processing, each suited for different tasks. These include Synapse Analytics, Stream Analytics, Databricks, Data Factory, and HDInsight.

### Azure Synapse Analytics

Azure Synapse Analytics is part of Microsoft's analytics suite. It combines big data systems and data warehouses into a single service, offering a seamless experience for data handling and analysis. It supports both real-time insights and batch processing.

- Unified analytics service
- Supports both real-time and batch processing

### Azure Stream Analytics

Azure Stream Analytics is perfect for real-time data analytics. It allows you to set up queries for data streaming from various sources, such as mobile services and sensors. It's great for scenarios that need instant insights, like fraud detection or dynamic pricing.

- Real-time data analytics
- Ideal for immediate insights

### Azure Databricks

Azure Databricks, a collaboration between Microsoft and Databricks, is an analytics platform optimized for Azure. It offers a unified environment for data engineering, analytics, and machine learning, and integrates with various Azure tools for seamless workflows.

- Unified platform for data tasks
- Real-time and batch analytics

### Azure Data Lake Storage

Azure Data Lake Storage is designed for storing and analyzing large volumes of data. It combines Blob Storage's large-scale capabilities with a hierarchical file system for efficient data organization and access, handling petabytes of structured and unstructured data.

- Large-scale data storage and analysis
- Suitable for big data projects
