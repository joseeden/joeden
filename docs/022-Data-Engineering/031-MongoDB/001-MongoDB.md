---
title: "MongoDB"
description: "The Humongous Database"
tags: [Data Engineering, Databases, MongoDB, NoSQL]
sidebar_position: 1
last_update:
  date: 2/27/2022
---


## Overview

MongoDB gets its name from "humongous," meaning big and enormous. It's a NoSQL database designed to handle large volumes of data. Instead of spreading data across multiple tables with strict schemas, MongoDB keeps unstructured data together without enforcing a schema.

This "no schema" approach can lead to messy data, so it's up to developers to keep things organized.

<div class="img-center"> 

![](/img/docs/mongodb.png)

</div>

With no rigid schema, managing relations across collections is simpler. Embedded documents allow data to be stored in a single document. This means an application can fetch all the data it needs from one place, instead of combining data from multiple collections.

## Features

In MongoDB, you create multiple model databases within the environment, similar to how other databases use tables.

<div class="img-center"> 

![](/img/docs/01db-mongodbbasics.png)

</div>

<center><small>Photo courtesy of [Studio3T](https://studio3t.com/academy/lessons/mongodb-basics/)</small></center>

In MongoDB, collections are like tables, and documents within those collections are where you store the actual data. Unlike SQL databases, MongoDB lets you store completely different types of data: one document can have a schema, while another can be schemaless.

## Storing Data 

Data is stored in JSON (BSON) format documents, surrounded by curly braces and made up of key-value pairs. Values can be strings, booleans, and even nested data. This flexibility allows you to create complex data structures and store them in a single document.

Here's an example of a document inside a collection. MongoDB converts JSON into a Binary JSON format, known as BSON.

```json 
{
    "name": "Max",
    "age": 29,
    "address": { "city": "Singapore" },
    "hobbies": [
        { "name": "Cooking" },
        { "name": "Sports" }
    ]
}
```

## The MongoDB Ecosystem

### The Company 

[MongoDB, Inc.](https://en.wikipedia.org/wiki/MongoDB_Inc.) is an American company that develops and supports the MongoDB database. For more info, visit their [official website.](https://www.mongodb.com/company)

### Database Options

The core NoSQL database is available as:

- Self-managed
- Enterprise

They also offer **Cloud Manager/OpsManager** for deploying, monitoring, backing up, and scaling MongoDB. More details are on the [Cloud Manager](https://www.mongodb.com/cloud/cloud-manager) site.

### MongoDB Atlas

[MongoDB Atlas](https://www.mongodb.com/atlas) is a multi-cloud data platform that simplifies building data-driven applications. As a managed service, it handles system admin tasks, so you can focus on your data and logic.

### MongoDB Compass

[MongoDB Compass](https://www.mongodb.com/products/compass) is a graphical user interface (GUI) that lets developers connect to and manage their database from a dashboard.

### MongoDB Stitch

[MongoDB Stitch](https://www.mongodb.com/collateral/mongodb-stitch-serverless-platform) is a serverless backend solution for building apps quickly without setting up server infrastructure. Built on top of MongoDB Atlas, Stitch includes features like:

- Serverless Functions
- Database Triggers
- Real-Time Sync

This setup allows you to query the database directly from client-side apps, making development smoother and faster.