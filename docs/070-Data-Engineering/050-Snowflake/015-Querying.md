---
title: "Querying"
description: "Querying"
tags: 
- Snowflake
- Data Engineering
- Data Analytics
- Data Warehouse
- Data Modelling
sidebar_position: 15
# last_update:
#   date: 1/14/2022
--- 


## Creating a Legacy Notebook 

> Legacy notebooks will be replaced by Workspace in the future, but they are still available for use.

Before you can create a notebook, you will need to create a database, schema, and warehouse in Snowflake. See [Using Snowflake](/docs/070-Data-Engineering/050-Snowflake/013-Using-Snowflake.md) for instructions on how to do this.

Oncen you have those set up, you can create a legacy notebook:

1. Go to **Projects** ➜ **Legacy Notebooks** ➜ **+ Legacy Notebooks**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-23135654.png)

    </div>

2. Provide a name for the notebook and select the notebook location and schema. 
<div class='img-center'>

![](/img/docs/Screenshot2026-05-23141211.png)

</div>


## Features in Snowsight

Snowsight provides several features to help interact with data.

| Feature         | Description                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| Visualize Data  | Automatically converts query results into charts to help quickly identify patterns and trends           |
| Ask Copilot     | Lets you ask questions about your data in natural language and explore results without writing full SQL |
| Query Shortcuts | Keyboard shortcuts like `Cmd + Shift + Enter` help run queries faster and improve workflow speed        |
| Format Query    | Automatically formats SQL queries to improve readability and make complex queries easier to understand  |

Snowsight ALSO has a "Code Versions" feature to track the queries you’ve run over time.

- Every time you run a query, Snowsight saves the version and time.
- You can go back to previous versions of your queries if needed.


## Executing a Query 

In the SQL editor, you can write and execute queries against your Snowflake data. 

In this example, we query the `in_app_purchases` table in the `product` database.

```sql
SELECT * FROM product.in_app_purchases;
```

After running the query, the results show below the query editor.

<div class='img-center'>

![](/gif/docs/23052026-snowflake-querying-1st-time.gif)

</div>


You can also download the results as a CSV or TSV file using the download icon. Click **Chart** to see the visualized data. 

To view all the queries ran, click **Code Versions**. 

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee.gif)

</div>
