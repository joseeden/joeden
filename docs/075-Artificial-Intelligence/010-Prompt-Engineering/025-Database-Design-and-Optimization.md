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

See files here: [Github](https://github.com/joseeden/joeden/tree/master/assets/scripts/055-DB-Design-and-Optimization)

Project structure:

```
├── docker
│   ├── app.py
│   ├── docker-compose.yaml
│   └── dockerfile
│
├── requirements.txt
│
└── scripts
    ├── seed_data.py
    ├── setup_schema.py
    ├── verify_data.py
    └── verify_schema.py
```


Steps:

1. Before anything else, make sure you have Docker and Docker Compose installed.

    - [Docker Installation Guide](https://docs.docker.com/get-docker/).
    - [Docker Compose Installation Guide](https://docs.docker.com/compose/install/).

2. First, create a virtual environment and activate it.

    ```bash
    python -m venv ~/venv
    source ~/venv/bin/activate
    ```

3. After activation, install dependencies from `requirements.txt`. 

    This keeps all libraries in one place and ensures consistent setup across machines.

    ```bash
    pip install -r requirements.txt  
    ```


<!-- 4. Next, we will start a local Postgres container to host our tourism dataset. 

    This simulates a real database environment where we can test schema mapping and query optimization.

    ```bash id="dbsetup01"
    docker run --name tourism-db \
      -e POSTGRES_PASSWORD=postgres \
      -e POSTGRES_DB=tourism \
      -p 5432:5432 \
      -d postgres:16
    ``` -->

4. Start the Postgres and application container using Docker Compose.

    Go to the `docker` directory:
        
    ```bash
    cd docker 
    ```

    Run:

    ```bash
    docker-compose up -d --build
    ```

    Output:

    ```bash
    [+] Running 3/3
    ✔ Network docker_default  Created                                                                                                                             0.1s 
    ✔ Container postgres_db   Started                                                                                                                             0.6s 
    ✔ Container docker-app-1  Started  
    ```

    Confirm both containers are created:

    ```bash
    docker ps -a 
    ```
    
    Output:

    ```bash
    CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS                      PORTS                                            NAMES
    f9fb9381e708   docker-app     "python app.py"          35 seconds ago   Exited (1) 34 seconds ago                                                    docker-app-1
    64a6f2cd6a46   postgres:15    "docker-entrypoint.s…"   35 seconds ago   Up 35 seconds               0.0.0.0:5432->5432/tcp                           postgres_db      
    ```

    **Note**: The `docker-app-1` will fail because it is trying to query the wrong table name. This is intentional to demonstrate the schema mismatch problem later.

5. Connect to the Postgres database and create the initial schema.

    Go to the `scripts` directory:

    ```bash
    cd scripts
    ``` 

    Run the `setup_schema.py` script to initialize the database schema:

    ```bash
    python setup_schema.py
    ```

    Use the `verify_schema.py` script to confirm the schema state:

    ```bash
    python verify_schema.py
    ``` 

    Output:

    ```bash
    Tables in database:
    - activity_events      
    ```


    **Alternative**: use the verify_data.py to query the table (it should return zero rows since we haven't added data yet):

    ```bash
    python verify_data.py
    ```

6. Add the seed data so queries have something to work with.

    ```bash
    python seed_data.py
    ```

    Output:

    ```bash
    34 seed records inserted (including duplicates)
    ```

    Use the `verify_data.py` script again to confirm data is present:

    ```bash
    python verify_data.py
    ```

    Output:

    ```bash
    Row count: 34
    ```

## Schema Mismatch Problem

In real systems, the application and database can drift out of sync. The code expects one structure while the database uses another. Some common issues include:

- Table names do not match
- Columns are structured differently
- Application queries fail at runtime

For example, we can see that the application container fails to start:

```bash
$ docker ps -a 

CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS                      PORTS                                            NAMES
f9fb9381e708   docker-app     "python app.py"          35 seconds ago   Exited (1) 34 seconds ago                                                    docker-app-1
64a6f2cd6a46   postgres:15    "docker-entrypoint.s…"   35 seconds ago   Up 35 seconds               0.0.0.0:5432->5432/tcp                           postgres_db      
```


After inspecting the logs for the app container, we see an error indicating a missing table:

```bash
$ docker logs docker-app-1

Connecting to Postgres... attempt 2
Database connection established

SCHEMA ERROR DETECTED
Table does not exist in current database schema.
Details: relation "activities_event" does not exist
LINE 1: SELECT * FROM activities_event
```

The application expects a table like `activity_events`, but the database contains a similar table with a different name (`activities_event`). Here, the issue is not missing data, but a schema mismatch between application expectations and database structure. 

## Schema Mapping using AI

Instead of manually adjusting tables and columns, AI can be used to map one schema to another.

- AI can match source and target schemas
- AI suggests column mappings
- AI generates migration steps

This is especially useful in large systems where hundreds of tables and columns may need to be compared during troubleshooting or migrations.

:::info 

If you connected AI (like GitHub Copilot) to your IDE and allow it to access your codebase, you can set it to **Agent** mode and ask it to analyze the error and suggest fixes directly in your code. 

::: 

For this example, the updated code files are in the "docker-fixed" folder.

```
├── docker
│   ├── app.py
│   ├── docker-compose.yaml
│   └── dockerfile
│
├── docker-fixed
│   ├── app.py
│   ├── docker-compose.yaml
│   └── dockerfile
│
├── requirements.txt
│
└── scripts
    ├── seed_data.py
    ├── setup_schema.py
    ├── verify_data.py
    └── verify_schema.py
```

Go to the `docker-fixed` directory:

```bash
cd docker-fixed
```

To rebuild and recreate only the app container with the fixed code, you can run:

```bash
docker-compose up -d --build app
```

Output:

```bash
✔ Container postgres_db         Running                                                                                                                                                     0.0s 
✔ Container docker-fixed-app-1  Started
```

Checking the containers again, we see that the app still exits out, but this time it shows `Exit (0)` (previously it was `Exit (1)`) which means it ran successfully and then stopped.

Exit code `0` means the container did not crash. It finished successfully and exited normally.

If we check the logs again, we see that the schema error is resolved and the application can now query the database successfully:

```bash
$ docker logs docker-fixed-app-1

Connecting to Postgres... attempt 1
Database connection established
Data:
(1, 'City Tour', 'Singapore')
(2, 'Museum Visit', 'Singapore')
(3, 'Marina Bay Walk', 'Singapore')
(4, 'Night Safari', 'Singapore')
(5, 'Food Tour', 'Singapore')
(6, 'Eiffel Tower Visit', 'Paris')
(7, 'Louvre Museum Tour', 'Paris')
(8, 'Seine River Cruise', 'Paris')
(9, 'Montmartre Walk', 'Paris')
(10, 'Paris Food Tasting', 'Paris')
(11, 'Statue of Liberty Tour', 'New York')
(12, 'Central Park Walk', 'New York')
(13, 'Met Museum Visit', 'New York')
(14, 'Brooklyn Bridge Walk', 'New York')
(15, 'Times Square Night Tour', 'New York')
(16, 'Colosseum Tour', 'Rome')
(17, 'Vatican Museum Visit', 'Rome')
(18, 'Trevi Fountain Stop', 'Rome')
(19, 'Roman Food Tour', 'Rome')
(20, 'Ancient Ruins Walk', 'Rome')
```


## AI-Assisted Duplicate Detection

In real-world systems, data is constantly being inserted and processed by various services. Without strict controls, duplicate data naturally slips into the database.

Our current Docker environment mirrors this production reality:

- **`postgres_db`**: A PostgreSQL container storing all activity data.
- **`docker-fixed-app-1`**: An application container that connects to and queries the database.

Data is populated using `seed_data.py` and read live by the application. However, because data can be re-run or reloaded (especially during development, retries, or pipeline failures), the system remains vulnerable to duplication.

You can view the current state of the database at any time by running the helper script:


```bash
$ python3 scripts/query_table.py 

ACTIVITY EVENTS TABLE

----+-------------------------+-----------
 id | activity_name           | city      
----+-------------------------+-----------
 1  | City Tour               | Singapore 
 2  | Museum Visit            | Singapore 
 3  | Marina Bay Walk         | Singapore 
 4  | Night Safari            | Singapore 
 5  | Food Tour               | Singapore 
 6  | Eiffel Tower Visit      | Paris     
 7  | Louvre Museum Tour      | Paris     
 8  | Seine River Cruise      | Paris     
 9  | Montmartre Walk         | Paris     
 10 | Paris Food Tasting      | Paris     
 11 | Statue of Liberty Tour  | New York  
 12 | Central Park Walk       | New York  
 13 | Met Museum Visit        | New York  
 14 | Brooklyn Bridge Walk    | New York  
 15 | Times Square Night Tour | New York  
 16 | Colosseum Tour          | Rome      
 17 | Vatican Museum Visit    | Rome      
 18 | Trevi Fountain Stop     | Rome      
 19 | Roman Food Tour         | Rome      
 20 | Ancient Ruins Walk      | Rome      
 21 | City Tour               | Singapore 
 22 | City Tour               | Singapore 
 23 | Museum Visit            | Singapore 
 24 | Night Safari            | Singapore 
 25 | Food Tour               | Singapore 
 26 | Eiffel Tower Visit      | Paris     
 27 | Eiffel Tower Visit      | Paris     
 28 | Seine River Cruise      | Paris     
 29 | Central Park Walk       | New York  
 30 | Met Museum Visit        | New York  
 31 | Met Museum Visit        | New York  
 32 | Colosseum Tour          | Rome      
 33 | Vatican Museum Visit    | Rome      
 34 | Vatican Museum Visit    | Rome      
----+-------------------------+-----------  
```

As shown above, identical activities like "City Tour" in "Singapore" appear multiple times with different IDs.

Instead of writing detection logic from scratch, we can leverage AI to generate a duplicate detection query based on our schema. 

Sample prompt:

> Given a PostgreSQL table `activity_events(activity_name, city)`, generate a SQL query to detect duplicate activity records.

The AI generates the following query:

```sql
SELECT activity_name, city, COUNT(*)
FROM activity_events
GROUP BY activity_name, city
HAVING COUNT(*) > 1;

```

In a production pipeline, you can integrate this SQL query to automatically flag or block duplicates before they corrupt downstream analytics, dashboards, or APIs. It can be implemented as:

1. A **pre-insert validation step** during ingestion.
2. A **post-load data quality check** inside the pipeline container.

For instance, this SQL logic can be executed directly within our validation scripts. We can implement this in `scripts/verify_data_duplicates.py` to automatically check the database after a data load and raise an alarm if duplicates are found.

Run the script:

```bash
python3 scripts/verify_data_duplicates.py
```

Output:

```bash
❌ DATA QUALITY ALERT: Duplicates detected in activity_events!
 - Eiffel Tower Visit in Paris appears 6 times
 - City Tour in Singapore appears 6 times
 - Vatican Museum Visit in Rome appears 6 times
 - Trevi Fountain Stop in Rome appears 2 times
 - Times Square Night Tour in New York appears 2 times
 - Colosseum Tour in Rome appears 4 times
 - Food Tour in Singapore appears 4 times
 - Ancient Ruins Walk in Rome appears 2 times
 - Louvre Museum Tour in Paris appears 2 times
 - Montmartre Walk in Paris appears 2 times
 - Brooklyn Bridge Walk in New York appears 2 times
 - Statue of Liberty Tour in New York appears 2 times
 - Met Museum Visit in New York appears 6 times
 - Paris Food Tasting in Paris appears 2 times
 - Night Safari in Singapore appears 4 times
 - Roman Food Tour in Rome appears 2 times
 - Central Park Walk in New York appears 4 times
 - Seine River Cruise in Paris appears 4 times
 - Museum Visit in Singapore appears 4 times
 - Marina Bay Walk in Singapore appears 2 times
```

By adding this step to your workflow, if `seed_data.py` accidentally runs twice, running the  `python3 scripts/verify_data_duplicates.py` will immediately catch the error and fail the pipeline before the bad data can spread.



## Query Performance Optimization

As datasets grow, querying the database table can become slow and expensive, especially when generating analytics.

Using the `activity_events` table from our setup:

- Simple aggregations on text columns like `city` scale poorly when processing millions of rows.
- Without optimization, PostgreSQL must perform a full-table scan for every single analytics query.

A common example is calculating the distribution of activities across different cities. As historical data increases, execution time grows significantly. AI can be used to analyze and improve these queries based on your actual schema. 

Sample prompt:

> Optimize this SQL query for the `activity_events` table and suggest indexing strategies for better performance:
> 
> SELECT city, COUNT(*) FROM activity_events GROUP BY city;


AI might suggest adding a B-tree index to the table to speed up lookup times. We can then ask the model to apply the optimization by creating an optimization script, `scripts/optimize_performance.py`. 

To run the script:

```bash
python scripts/optimize_performance.py 
```

Output:

```bash
--- [BEFORE INDEXING] ---
HashAggregate  (cost=2.02..2.06 rows=4 width=15) (actual time=0.094..0.097 rows=4 loops=1)
  Group Key: city
  Batches: 1  Memory Usage: 24kB
  ->  Seq Scan on activity_events  (cost=0.00..1.68 rows=68 width=7) (actual time=0.013..0.024 rows=68 loops=1)
Planning Time: 0.805 ms
Execution Time: 0.437 ms

Applying optimization...
Index 'idx_activity_events_city' created successfully.

--- [AFTER INDEXING] ---
HashAggregate  (cost=2.02..2.06 rows=4 width=15) (actual time=0.043..0.045 rows=4 loops=1)
  Group Key: city
  Batches: 1  Memory Usage: 24kB
  ->  Seq Scan on activity_events  (cost=0.00..1.68 rows=68 width=7) (actual time=0.007..0.013 rows=68 loops=1)
Planning Time: 0.224 ms
Execution Time: 0.076 ms
```

As we can see here, Postgres uses sequential scan before indexing, which is inefficient for larger datasets. 

```bash
Planning Time: 0.805 ms
Execution Time: 0.437 ms
```

After adding the index (using index only scan), Postgres is now completely bypassing the sequential scan and instead uses the index to quickly retrieve results, which is much faster.

```bash
Planning Time: 0.224 ms
Execution Time: 0.076 ms
```

**NOTE:** Since the seed dataset that we are using is small, the performance difference is not significant. However, as the dataset grows to millions of rows, the performance improvement from indexing becomes much more pronounced.


## AI Driven Database Design

At a higher level, AI can assist in evolving our database design from a simple single-table setup to a highly scalable architecture.

- Repeating text like Paris wastes storage
- Repeating text can also cause typos (e.g. "Pari")
- Typo errors can  corrupt analytics and searches

A relational design fixes this by separating data into dedicated tables linked by foreign keys

Instead of manually mapping out schema refactoring, AI can propose a normalized design based on your current `setup_schema.py`. We can feed our current table structure to the AI with the following prompt:

> Normalize the `activity_events` table to reduce redundancy and enforce data integrity.

The AI will recommend splitting your monolithic table into a relational model. Again, we can ask the model to implement this updated design through a `setup_schema_v2.py` script.

Run the script: 

```bash
python scripts/setup_schema_v2.py
```

The script safely handles the execution by creating two brand new, empty tables in the `tourism` database:

- `cities`
- `normalized_activity_events`

The existing `activity_events` table and its seed data remains completely untouched and safe.

**Note:** While the script runs without errors, it only sets up the empty structures for the new database design. It does not automatically migrate the existing seed data into them. 

To complete the transition, we can ask the model to generate a data migration script.

Sample prompt:

> Generate a data migration script that reads from the existing `activity_events` table and populates the new `cities` and `normalized_activity_events` tables according to the normalized design.

The model then generates the the `migrate_data.py` script which will allow us to safely migrate data from the old structure to the new one without any risk of data loss or corruption.

Run the migration script:

```bash
python migrate_to_v2.py
```

Output:

```bash
Checking for existing data to migrate...
Found 68 records to normalize. Running migration...
✅ Data migration completed successfully.
   - Unique cities extracted and saved.
   - Activity records successfully normalized and linked.
```

To verify that the data actually moved and structured itself correctly into the new relational model, we can check three things:

1. The unique cities were extracted correctly.
2. The activities were assigned the correct numeric city IDs.
3. A quick join query brings back the original view of the data.

We can ask the model to generate another script for verifying the migration.

Sample prompt:

> Write a Python script `verify_migration.py` to verify that our data migration to the normalized schema was successful. Check the unique cities, the structural foreign keys, and run a relational join query to confirm accuracy.

After the AI generates the script, we can review it to ensure it targets our newly created relational tables and correctly checks database integrity. If all is good, we can run the script:

```bash
python verify_migration.py 
```

Output:

```bash
--- 1. VERIFYING UNIQUE CITIES ---
City ID: 1 | Name: Paris
City ID: 2 | Name: Rome
City ID: 3 | Name: New York
City ID: 4 | Name: Singapore

--- 2. VERIFYING NORMALIZED ACTIVITIES ---
Activity ID: 1 | Name: City Tour | City ID (Foreign Key): 4
Activity ID: 2 | Name: Museum Visit | City ID (Foreign Key): 4
Activity ID: 3 | Name: Marina Bay Walk | City ID (Foreign Key): 4
Activity ID: 4 | Name: Night Safari | City ID (Foreign Key): 4
Activity ID: 5 | Name: Food Tour | City ID (Foreign Key): 4

--- 3. VERIFYING RELATIONAL JOIN ---
ID: 1 | Activity: City Tour | City: Singapore
ID: 2 | Activity: Museum Visit | City: Singapore
ID: 3 | Activity: Marina Bay Walk | City: Singapore
ID: 4 | Activity: Night Safari | City: Singapore
ID: 5 | Activity: Food Tour | City: Singapore
```

Based on the output, our data migration was a complete success.

- Each city is now stored once in a lookup table with its own identifier. 
- Repeated text entries are successfully replaced with clean numeric foreign keys. 

Finally, the `join` query proves the database can dynamically link these separate tables to reconstruct our original data smoothly on demand.

## CI/CD And Data Safety

Database changes should be treated like application code changes. Schema updates, validation rules, and query logic should all pass through automated checks before deployment.

- CI Validates Schema Changes
- CI Blocks Invalid Data Structures
- CI Ensures Safe Database Updates

A simple CI step can run validation before merging changes.

This is how the workflow is typically enforced in real systems:

```yaml
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
