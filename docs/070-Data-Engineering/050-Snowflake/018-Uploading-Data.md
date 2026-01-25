---
title: "Uploading Data"
description: "Uploading Data"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
- Data Analysis
- Data Modelling
- Snowflake
sidebar_position: 15
# last_update:
#   date: 1/14/2022
--- 


## Uploading CSV Data 

In this guide, we’ll upload a CSV file from a local computer to Snowflake.  

**Steps:** 

1. Prepare the CSV file.
2. Create a table in Snowflake to store the data.  
3. Upload the file: 

    - Go to **Snowsight** → **Data** → **Load Data**.  
    - Select the CSV file from your computer.  
    - Choose the target database, schema, and table.  
    - Follow the steps to complete the upload.  

4. Check if the data was loaded successfully.  

**Additional Features:**  

- **File formats**: Snowflake supports different delimiters (e.g., commas, tabs).  
- **Error handling**: Review error logs if any rows fail to load.  
- **Automate uploads**: Use Snowflake's `PUT` and `COPY INTO` commands for bulk uploads.  

See below:

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-2.gif)

</div>


## Loading Data from a Cloud Provider  

Snowflake can connect to cloud storage services to load data for analysis. This process involves setting up an external stage, granting permissions, and loading data into a table.  

### High-Level Workflow

1. Data is stored in a cloud provider's folder.  
2. Create the storage integration.
3. Create the stage to access the folder.  
4. Refresh the stage.
5. Reference the stage when creating the table.
6. Load data into table.

### Setting Up Stage Permissions  

- **Grant access**: The cloud provider must allow Snowflake to read files.  
- **Storage integration**: Snowflake uses this to store cloud credentials securely.  
- **Create a stage**: The stage references the storage integration and folder URL.  

Example (AWS S3):  

```sql
CREATE STORAGE INTEGRATION my_s3_integration
  TYPE = EXTERNAL_STAGE
  STORAGE_PROVIDER = 'S3'
  STORAGE_AWS_ROLE_ARN = 'arn:aws:iam::123456789012:role/my-s3-role';

CREATE STAGE my_stage
  STORAGE_INTEGRATION = my_s3_integration
  URL = 's3://my-bucket/data/';
```

### Using the External Stage  

- **Refresh the stage**: View available files in Snowsight.  
- **Check stage details**: See cloud region, file path, and owner.  
- **Load data into a table**:  

```sql
CREATE TABLE customer_signups (
    id INT,
    name STRING,
    signup_date DATE
);

COPY INTO customer_signups
FROM @my_stage
FILE_FORMAT = (TYPE = 'CSV');
```

### Verifying the Data  

Run a query to check the imported records:  

```sql
SELECT * FROM customer_signups LIMIT 5;
```
