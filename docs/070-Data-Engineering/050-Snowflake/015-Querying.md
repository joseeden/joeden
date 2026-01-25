---
title: "Querying"
description: "Querying"
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



## Using Features in Snowsight

Snowsight provides several features to help interact with data.

- **Visualize data**: Snowsight can automatically generate a chart of the query results.
- **Ask CoPilot**: Use this feature to ask more questions about the data you're viewing.
- **Query shortcuts**: Use keyboard shortcuts like `Cmd + Shift + Enter` to run queries faster.
- **Format query**: Improve readability by formatting the SQL query.

## Tracking Query Versions

Snowsight has a "Code Versions" feature to track the queries you’ve run over time.

- Every time you run a query, Snowsight saves the version and time.
- You can go back to previous versions of your queries if needed.


## Executing a Query 

Steps:

1. Click Create > SQL Worksheet
2. Choose the database.
3. Expand the schema to see tables.
4. Query the  table to fetch data.

    Example: 

    ```sql
    SELECT SUM(amount)
    FROM "Sales_transactions";
    ```

5. Click the Run button.
6. After running the query, the results show below the query editor.
7. You can also download the results as a CSV or TSV file using the download icon.
8. Click **Chart** to see the visualized data. 
9. To improve readability, click the three dots beside the worksheet name > **Format Query**.  
10. To view the queries ran, click **Code Versions**. 

See below:

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee.gif)

</div>
