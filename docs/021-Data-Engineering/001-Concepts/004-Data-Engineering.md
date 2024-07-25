---
title: "Data Engineering"
description: "Notes from DataCamp's Understanding Engineering Course"
tags: [Data Engineering]
sidebar_position: 4
last_update:
  date: 2/27/2022
---



## Overview

Data engineering is all about designing, developing, and maintaining systems to collect, store, and process data. It's essential for building the infrastructure and architecture needed for effective data management.

- Ensures efficient data collection
- Supports data storage solutions
- Facilitates seamless data processing


## Roles 

### Data Engineer

A data engineer is a professional responsible for building, testing, and maintaining the architecture (such as databases and large-scale processing systems) that allows for the efficient handling of data.

- Develop scalable data architecture 
- Streamline data acquisition
- Set up processes to bring together data
- Processing large amounts of data 
- Clean corrupt data
- Use of cluster of machines
- Well-versed in cloud technology 

### Data Scientist 

A data scientist is a professional who analyzes and interprets complex data sets to inform business decision-making.

- Mining data for patterns 
- Statistical modeling
- Build predictive models using machine learning
- Monitor business processes 
- Clean outliers in data 

## Tools of the Data Engineer

Data engineers move data from various sources, process it, and load it into an analytical database. They use multiple tools for these tasks.

### Databases

Data engineers are expert users of database systems. The data engineer's primary task revolves around databases.

- Hold and organizes large amounts of data
- SQL or NoSQL databases
- Retrieve/search data through DBMS
- Other databases are used for analysis 

### Processing

Data engineers use tools for processing data quickly, cleaning, aggregating, or joining it from different sources.

- Clean data
- Aggregate data 
- Join data

Example: 

Parallel processing frameworks like PySpark are used behind the scenes for operations that may resemble simple pandas operations.

Parallel processing with clusters of machines:

<p align=center>
<img src='../../Images/data-engineering-parallel-processing.png'>
</p>


### Scheduling

Scheduling tools ensure data moves correctly and timely.

- Manage jobs to run in the right order
- Resolve dependency requirements of jobs

###  Existing Tools

Databases:

- MySQL 
- PostgreSQL 

Processing:

- Apache Spark 
- Apache Hive 

Scheduling:

- Apache Airflow 
- Oozie 

## Data Pipeline

The data engineering pipeline involves extracting data from various sources, processing it with a cluster computing framework, and loading it into an analytical database.
- Scheduling frameworks like Airflow ensure tasks run in a specific order.
- External APIs or other file formats can also serve as data sources.
<br>

<p align=center>
<img width=700 src='../../Images/data-pipeliness.png'>
</p>

## Cloud Providers

Data engineers are heavy users of the cloud. As mentioned in the previous sections, data processing requires cluster of machines. This can be done on self-hosted machines in on-premise datacenters. 

Considerations for datacenters:

- Electrical and maintenance costs 
- Labor overhead for operators 
- Optimizing peaks and quiet moments 

As a solution, data engineers opt to use cloud providers.

- Cost: optimization and resource utilization
- Storage: Database reliability and disaster preparedness

Services: 

- **Storage**

   - Used for uploading files to the cloud.
   - Examples of storage services: AWS S3, Azure Blob Storage, Google Cloud Storage.

- **Computation**

   - Used for performing tasks on the cloud.
   - Examples of computation services: AWS EC2, Azure Virtual Machines, Google Compute Engine.

- **Databases**

   - Used for hosting databases.
   - Examples of database services: AWS RDS, Azure SQL Database, Google Cloud SQL.


