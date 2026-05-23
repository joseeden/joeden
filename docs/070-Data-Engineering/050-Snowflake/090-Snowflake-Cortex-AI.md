---
title: "Snowflake Cortex AI"
description: "Snowflake Cortex AI features and functions"
tags: 
- Snowflake
- Data Engineering
- Data Analytics
- Data Warehouse
- Data Modelling
sidebar_position: 11
# last_update:
#   date: 1/14/2022
---

## Overview

Snowflake Cortex provides built-in AI functions and large language models inside Snowflake. It runs AI close to data, so there is no need to move data out of the platform or manage external API keys.

Supported large language model providers:

- Anthropic
- Meta
- Mistral
- OpenAI
- Google
- Snowflake's own models

For more information, please see the official documentation: [Snowflake Cortex](https://www.snowflake.com/en/product/features/cortex/).

## Parsing Documents

Parsing converts raw files like PDFs into structured data that Snowflake can query. The result is usually returned as `VARIANT`, which can be queried like JSON.

This step is needed because Snowflake cannot directly query raw documents like PDFs or images in a stage.

In the example below, a PDF file is parsed into structured output.

```sql id="6qv1xk"
SELECT SNOWFLAKE.CORTEX.PARSE_DOCUMENT(
  @my_stage,
  'invoice.pdf',
  {
    'mode': 'LAYOUT'
  }
):content::STRING AS parsed_text
```

The output can then be queried using JSON-style syntax. This makes it possible to extract text and use it in SQL or AI functions.

## Cortex SQL Functions

Cortex provides simple text functions that run directly in SQL for common AI tasks.

- `CLASSIFY_TEXT` assigns labels based on input categories

    The result is a label indicating the severity level based on the input text.

    ```sql
    SELECT SNOWFLAKE.CORTEX.CLASSIFY_TEXT(
      'Heavy snow caused road closures',
      ['low', 'medium', 'high']
    ) AS severity;
    ```

- `TRANSLATE` converts text using language codes.

    For example, translate a book review to Spanish:

    ```sql
    SELECT SNOWFLAKE.CORTEX.TRANSLATE(
      book_review,
      'en',
      'es'
    ) AS translated_text;
    ```

- `COMPLETE` generates responses from prompts

    ```sql
    SELECT SNOWFLAKE.CORTEX.COMPLETE(
      `gemini-2.0-pro`,
      'What is the theory of relativity?'
    ) AS response;
    ```

- `SUMMARIZE` shortens longer text.

    ```sql
    SELECT SNOWFLAKE.CORTEX.SUMMARIZE(
      'Severe weather caused delays in transport and affected multiple delivery routes across the region.'
    ) AS summary;
    ```

    The result is a shorter version of the input text, useful for reporting and dashboards.

## Cortex Search and Cortex Analyst

**Cortex Search** finds data based on meaning instead of exact keyword matches. It is used when similar concepts need to be retrieved even if the wording is different.

- Finds meaning-based matches in documents
- Converts natural language into SQL
- Works on structured and unstructured data

**Cortex Analyst** converts plain English questions into SQL queries. It is used when users want to ask questions without writing SQL.

In the example below, a natural language question is processed.

```text 
Which resorts had the most incidents last winter
```

This is converted into SQL internally and results are returned without manual query writing.

For more information, please see the official documentation: [Cortex Search and Analyst](https://www.snowflake.com/en/blog/engineering/cortex-analyst-cortex-search-integration/).

## Snowflake ML Lifecycle


Snowflake ML supports building and running predictive models directly inside Snowflake.

- Builds models using Snowflake data
- Separates training and prediction

Models are created first, then used later for forecasting or predictions. This keeps model management more organized and easier to maintain.

In the example below, a forecasting model named `my_model` is created using data from the `sales_table` table.

```sql
CREATE OR REPLACE SNOWFLAKE.ML.FORECAST my_model (
  INPUT_DATA => 'sales_table',
  TARGET_COL => 'revenue',
  TIMESTAMP_COL => 'date'
);
```

After the model is created, it can be used for forecasting.

Here, `my_model` generates predictions for the next 30 periods.

```sql id="j7x2pw"
CALL my_model!FORECAST(30);
```

Snowflake ML keeps training and prediction inside the platform, which simplifies data access and workflow management.
