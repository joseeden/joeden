---
title: "Database Design and Optimization"
description: "Using AI to assist in database design, schema mapping, duplicate detection, and query optimization"
tags:
- Artificial Intelligence
- Machine Learning
- Prompt Engineering
sidebar_position: 25
# last_update:
#   date: 7/15/2023
--- 

## Overview

Modern applications rely heavily on databases, and most of the real complexity comes from keeping data consistent, fast, and aligned with how the application evolves. 

AI can help in this space by supporting schema design, query creation, data validation, and performance tuning.

## Project Setup: Simple Postgres Environment

For this guide, we will use a simple Postgres database running in Docker to simulate real database workflows. This allows us to experiment with schema mapping, duplicate detection, and query optimization in a consistent environment.

See files here: Github

Steps:

1. Before anything else, make sure you have Docker installed.

    To setup docker, see [Docker Installation Guide](https://docs.docker.com/get-docker/).

2. First, create a virtual environment and activate it:

    ```bash
    python -m venv ~/venv
    source ~/venv/bin/activate
    ```

3. After activation, install dependencies from requirements.txt. 

This keeps all libraries in one place and ensures consistent setup across machines.

Start a local Postgres container.

```bash id="dbsetup01"
docker run --name tourism-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=tourism \
  -p 5432:5432 \
  -d postgres:16
```

Confirm the database is running:

```bash
docker ps
```

Output:

```bash
ONTAINER ID   IMAGE                            COMMAND                  CREATED         STATUS         PORTS                             NAMES
77a3d25ae2b8   postgres:16                      "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:5432->5432/tcp            tourism-db
```

Next, use the `setup_schema.py` script connects to the Postgres database and creates the initial schema.




## Schema Mismatch Problem

In real systems, the application and database can drift out of sync. The code expects one structure while the database uses another. Some common issues include:

- Table names do not match
- Columns are structured differently
- Application queries fail at runtime

For example, the application expects a table like `activity_events`, but the database contains a similar table with a different name such as `activities_event`.

To confirm what exists in the database, we can inspect the schema using Python.

This script connects to Postgres and lists available tables. The connection is handled through `psycopg2`:

```python 
import psycopg2

conn = psycopg2.connect(
    dbname="tourism",
    user="postgres",
    password="postgres",
    host="localhost",
    port=5432
)

cur = conn.cursor()
cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
print(cur.fetchall())
```

The output confirms that the table exists but under a different name. This shows the issue is not missing data, but schema mismatch between application expectations and database structure.

## AI Schema Mapping

Instead of manually adjusting tables and columns, AI can be used to map one schema to another.

- AI Matches Source And Target Schemas
- AI Suggests Column Mappings
- AI Generates Migration Steps

A common approach is to provide both schemas and ask the model to align them.

Example prompt:

> Given two database schemas, generate a mapping between tables and suggest migration steps to align them.

AI produces a mapping plan that aligns table names and resolves column differences. This reduces manual effort and helps standardize schema changes across systems.

## Real World Data Updates

In production systems, data is constantly changing through external integrations and event streams.

- Duplicate Records Are Common
- Corrections Modify Existing Entries
- Multiple Providers Send Overlapping Data

Tourism platforms often receive booking events from multiple partners. This creates duplicates unless the system validates data before inserting it.

To handle this, incoming data must be checked before being stored in the database.

## AI Assisted Duplicate Detection

AI can help design rules and queries that detect duplicates in incoming data batches.

- AI Identifies Duplicate Patterns
- AI Generates SQL Detection Logic
- AI Improves Data Quality Checks

Instead of writing manual rules for every scenario, we ask AI to generate a reusable SQL query.

Example prompt:

> Create a SQL query that detects duplicate booking events based on user_id, event_id, and timestamp.

AI produces a query like this:

This SQL checks for duplicate records in a Postgres table:

```sql id="dup01"
SELECT user_id, event_id, COUNT(*)
FROM bookings
GROUP BY user_id, event_id
HAVING COUNT(*) > 1;
```

This query can be reused in every ingestion process to ensure duplicates are detected before data is inserted.

## Query Performance Optimization

As datasets grow, query performance becomes a major concern. Queries that worked early can become slow and expensive.

- Queries Become Slower With Scale
- Joins Increase Execution Cost
- Indexing Becomes Critical

A common example is calculating metrics like conversion rate by city over time. As data increases, execution time grows significantly.

AI can be used to analyze and improve these queries.

Example prompt:

> Optimize this SQL query and suggest indexing strategies for better performance.

AI may suggest rewriting joins, reducing scan size, and adding indexes on frequently filtered columns. These improvements help maintain performance without changing business logic.

## AI Driven Database Design

At a higher level, AI can assist in structuring databases as systems scale.

- Data Models Evolve Over Time
- Tables Need Normalization
- Large Datasets Require Partitioning

Instead of manually deciding structure changes, AI can propose design improvements based on usage patterns.

This includes separating large tables, normalizing repeated fields, and suggesting partition strategies for high-volume data.

The goal is to keep the database scalable, maintainable, and efficient as the system grows.

## CI/CD And Data Safety (Closing Concept)

Database changes should be treated like application code changes. Schema updates, validation rules, and query logic should all pass through automated checks before deployment.

- CI Validates Schema Changes
- CI Blocks Invalid Data Structures
- CI Ensures Safe Database Updates

A simple CI step can run validation before merging changes.

This is how the workflow is typically enforced in real systems:

```yaml id="cicd01"
name: Database Validation

on:
  pull_request:

jobs:
  validate-db:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.10"

      - name: Install dependencies
        run: pip install psycopg2

      - name: Run validation
        run: python validator.py
```

If validation fails, the pipeline stops and the change is blocked from merging or deploying. This ensures database consistency is enforced continuously, not manually.
