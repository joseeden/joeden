---
title: "Data Anomalies"
description: "Database Design"
tags: [Data Engineering, Databases, Database Design]
sidebar_position: 5
last_update:
  date: 10/15/2019
---



## Overview

Data anomalies occur when a database isn't well-organized, leading to issues with data integrity. Normalization helps prevent these issues by organizing data efficiently.

To learn more about Normalization and Normal Forms, see the links below:

- [Schemas and Normalization](./003-Schemas-and-Normalization.md)
- [Normal Forms](./004-Normal-Forms.md)


## Types of Data Anomalies 

Databases that aren't sufficiently normalized can experience three main types of anomalies: 

- Update
- Insertion
- Deletion

### Update Anomaly

An update anomaly arises from data inconsistency due to redundant data. Updating data stored in multiple places can lead to errors if not all instances are updated.

<div class='img-center'>

![](/img/docs/eliminate-redundancy-denormalized-database.png)

</div>

As an example, if we want to change the state "New York" to "NY", we will have to update multiple records. It may sound risky but it is actually risky and missing any instance can lead to inconsistent data. The more redundant records there are, the harder it is to track them and update them.


### Insertion Anomaly

An insertion anomaly occurs when it's impossible to add data due to missing required information. This often results from table design that requires all fields to have values.

<div class='img-center'>

![](/img/docs/eliminate-redundancy-normalized-database.png)

</div>

In the example above, we can't add a new Canada address because Canada is not a state but rather an entirely different country. The `city_id` needs to allow null values if we want to add an address outside US.


### Deletion Anomaly

A deletion anomaly happens when removing a record causes unintended data loss. This occurs when crucial information is stored with deletable data.

<div class='img-center'>

![](/img/docs/eliminate-redundancy-normalized-database.png)

</div>

Using the previous example, if we delete "New York" from the **dim_state_sf** table, it could impact the records from **dim_city_sf** and **dim_store_sf** tables that have a dependency on the "New York" record.


## Mitigating Data Anomalies

Normalization, especially up to the Third Normal Form (3NF), helps prevent these anomalies by ensuring:

- Data consistency across the database.
- Clear dependencies between data, minimizing redundancy.
- Safe and straightforward data changes, reducing the risk of accidental data loss.

Normalization reduces anomalies and enhances the database's reliability, though it may increase query complexity. Balancing these factors is key to effective database design.