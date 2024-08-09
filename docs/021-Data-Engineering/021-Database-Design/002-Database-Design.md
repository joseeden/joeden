---
title: "Database Design"
description: "Database Design"
tags: [Data Engineering, Databases, Database Design]
sidebar_position: 2
last_update:
  date: 2/27/2022
---



## Overview 

Database design defines how data is logically organized within a database. It influences data retrieval and updates, and involves key concepts like models and schemas.

- **Database models**: High-level specifications like relational models.
- **Schemas**: Define the database structure and must be followed for structured data.

## Data Modeling

Data modeling is the initial step in database design and outlines a data model at three levels. These levels define the entities, relationships, and physical storage, ensuring a consistent framework for database implementation.

- **Conceptual model**

    - Identifies entities, relationships, and attributes
    - Data structure diagrams, e.g. entity-relational diagrams
    - UML diagrams

- **Logical model**

    - Maps entities to tables and relationships
    - Database models and schemas
    - Relational model and star schema

- **Physical model**

    - Details physical data storage.
    - Partitions, CPUs, indexes, backup systems, and tablespaces


## Translating to Example 

An example of database design involves storing song information, with entities like songs, albums, and artists represented as tables. 

<center>Conceptual Model</center>


<div class='img-center'>


![](/img/docs/database-design-sample-creating-songs-table.png)

</div>

<center>Logical Model</center>

<div class='img-center'>

![](/img/docs/database-design-sample-creating-songs-table-logicall.png)

</div>

While translating entities directly into tables is quick, exploring alternative methods can optimize performance and maintain data integrity.


## Alternative Design

Alternative design choices can reduce complexity or enhance data integrity. For instance, a single table can simplify access, while separate tables for shared attributes like genre and label can maintain data consistency.

- **Single table**: Simplifies joins but may complicate data integrity.

    <div class='img-center'>

    ![](/img/docs/database-design-sample-creating-songs-table-single-table.png)

    </div>

- **Additional tables**: Improve integrity by centralizing shared attributes.

    <div class='img-center'>

    ![](/img/docs/database-design-sample-creating-songs-table-multiple-tablesss.png)

    </div>



## Dimensional Models 

Dimensional modeling adapts the relational model for data warehouses, focusing on OLAP queries. It uses the **star schema**, which is straightforward and flexible for analytical tasks, enhancing usability for data analysts. Dimensional models include these two models which serve distinct purposes. 

- **Fact tables**: Hold metrics and change often, with foreign keys to dimension tables.
- **Dimension tables**: Describe attributes, changing less frequently.

In a song analysis scenario, the fact table could list songs, while dimension tables detail albums and artists.

<div class='img-center'>

![](/img/docs/database-design-sample-creating-songs-table-facts-dimensions.png)

</div>

## Running Example