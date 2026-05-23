---
title: "Loading Data"
description: "Loading Data"
tags: 
- Snowflake
- Data Engineering
- Data Analytics
- Data Warehouse
- Data Modelling
sidebar_position: 18
# last_update:
#   date: 1/14/2022
--- 

## Overview

Snowflake loads data using a two-step process:

1. Files are first uploaded into a staging area
2. Data is loaded into target tables. 

This workflow separates storage from ingestion logic, which keeps the  pipelines organized and reliable for both manual uploads and automated workflows.

Snowflake natively supports a variety of formats:

- CSV
- JSON
- Parquet
- Avro


## Option 1: Quick Uploads via Snowsight UI

A simple way to start is by uploading local CSV files directly through the Snowsight user interface. 

The UI wizard supports:

- Different delimiters like commas and tabs
- Error logs for failed rows
- Automated uploads using SQL commands

This method is ideal for quick testing, demos, or small manual tasks. 

Steps:

1. Prepare the local CSV file.
2. Create the destination table in Snowflake.
3. In Snowsight, go to **Data ➜ Load Data**.
4. Select the CSV file.
5. Choose the database, schema, and table.
6. Complete the upload process.
7. Verify the imported data.

See below:

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-2.gif)

</div>

**UPDATE:** There are some updates to the Snowsight UI, but the overall process remains the same. The main difference is that options for loading data can now be found in the **Ingestion** tab.

<div class='img-center'>

<!-- ![](/img/docs/Screenshot2026-05-23204209.png) -->

![](/gif/docs/23052026-snowflake-loading-data.gif)

</div>


## Option 2: The Core Staging Workflow

Snowflake does not load files directly from your computer into tables. Instead, files must live in a **stage**, which acts as a temporary storage location before ingestion.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23202819.png)

</div>

Stages come in two types:

| Type            | Description                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------- |
| Internal Stages | Storage spaces fully managed by Snowflake                                                          |
| External Stages | Secure connections to cloud storage such as Amazon S3, Google Cloud Storage, or Azure Blob Storage |

To create a basic internal stage using SQL:

```sql
CREATE STAGE raw_stage;
```

To create an external stage using SQL:

```sql
CREATE STAGE my_external_stage
URL = 's3://my-bucket/data/'
STORAGE_INTEGRATION = my_s3_integration;
```


## Loading Data from a Cloud Provider  

For larger datasets or automated pipelines, loading data from cloud storage is more efficient. The process involves:

1. Store files in cloud storage.
2. Create a storage integration.
3. Create an external stage.
4. Refresh or inspect the stage.
5. Load data into a table.
6. Verify imported records.

This process allows Snowflake to securely access external files without manually uploading them.

### Setting Up the Stage

Snowflake needs permission to access cloud storage.

- Grant storage access permissions
- Use storage integrations securely
- Create stages pointing to cloud folders

In the example below:

- `my_s3_integration` stores AWS access settings
- `my_stage` points to the S3 bucket location

```sql
CREATE STORAGE INTEGRATION my_s3_integration
TYPE = EXTERNAL_STAGE
STORAGE_PROVIDER = 'S3'
STORAGE_AWS_ROLE_ARN = 'arn:aws:iam::123456789012:role/my-s3-role';

CREATE STAGE my_stage
STORAGE_INTEGRATION = my_s3_integration
URL = 's3://my-bucket/data/';
```

### Checking Files in a Stage

Before loading data, verify that the uploaded files exist inside the stage.

In the example below, the `LIST` command checks files stored inside `my_stage`.

```sql
LIST @my_stage;
```

The `@` symbol tells Snowflake that the object is a stage. The output will show file names, sizes, and timestamps.

### Loading Data with `COPY INTO`

Once verified, use the `COPY INTO` command to bulk load the staged data into the target table.

First, ensure the target table exists. For example:

```sql  
CREATE TABLE customer_signups (
  id INT,
  name STRING,
  signup_date DATE
);
```

Next, the `COPY INTO` command can be used to load CSV files from `my_stage` into the `customer_signups` table.

```sql
COPY INTO customer_signups
FROM @my_stage
FILE_FORMAT = (TYPE = 'CSV');
```

Note that most loading issues stem from mismatched file format configurations, such as incorrect delimiters or unexpected header rows.

In this example, the `FILE_FORMAT` option specifies that the files are CSV. If the CSV files have a header row, you would also need to specify `SKIP_HEADER = 1` in the file format definition to avoid loading the header as data.

```sql
CREATE OR REPLACE FILE FORMAT my_csv_format
  TYPE = 'CSV'
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1;

COPY INTO orders
FROM @my_stage/orders/june2024.csv
FILE_FORMAT = (FORMAT_NAME = 'my_csv_format');
```


### Loading Semi-Structured Data 

Snowflake also supports semi-structured formats using the `VARIANT` data type.

- Stores JSON without fixed schema
- Supports nested data
- Allows flexible querying

In the example below, we create a table with a `VARIANT` column to hold JSON data, then load a JSON file from the stage. 

```sql
CREATE TABLE raw_json_table (
  data VARIANT
);

COPY INTO raw_json_table
FROM @my_stage/events.json
FILE_FORMAT = (TYPE = JSON);
```


### Querying JSON Data

JSON fields stored in `VARIANT` columns use special query syntax.

- Colon (`:`) accesses JSON fields
- Double colon (`::`) converts data types

In the example below:

- `data` is the `VARIANT` column
- `user_name` is the JSON field being accessed
- `signup_date` is the JSON field being accessed

This returns the `user_name` field as a string and the `signup_date` field as a date from the JSON data.

```sql
SELECT 
  data:user_name::STRING AS user_name
  data:signup_date::DATE AS signup_date
FROM raw_json_table;
```

This syntax makes it possible to query nested JSON data directly in SQL.


### Verifying the Data

After loading data, run a quick query to confirm that the rows imported correctly and that the table structure looks as expected.

In the example below, the query checks the first five rows of the table `customer_signups`.

```sql
SELECT * 
FROM customer_signups
LIMIT 5;
```

Verifying the data helps confirm that the loading process completed successfully.
