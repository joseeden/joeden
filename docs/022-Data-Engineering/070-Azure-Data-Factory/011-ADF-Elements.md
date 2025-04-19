---
title: "ADF Elements"
description: "ADF Elements"
tags: 
- Data Engineering
- Databases
- Microsoft Azure
- Azure Data Factory
sidebar_position: 11
last_update:
  date: 10/14/2021
---

## Overview

Azure Data Factory (ADF) is made up of small pieces that work together to move and process data. Each element has a clear role and helps define how your data flows.

- **Pipeline**
  - A group of steps or actions
  - Pipelines group `activities` together 
  - Holds and organizes tasks

- **Activity**
  - A single task that does something
  - Can copy, move, change, or control data

- **Dataset**
  - Describes the data you're working with
  - Can point to files or database tables
  - Helps activities know what data to use

- **Linked Service**
  - Connects ADF to data sources
  - Works like a connection string
  - Needed for every dataset

- **Trigger**
  - Starts a pipeline
  - Can run on schedule or based on an event

- **Integration Runtime**
  - The engine that runs the tasks
  - Provide the compute power for ADF 
  - Can be in the cloud or on your own machine
  - Needed for every activity

Each of these elements works with the others to create a full pipeline. ADF uses them to control data in a reliable and repeatable way. An example flow:

1. Copying data from one place to another is an activity.
2. The trigger can run that task every morning at 8 AM. 
3. The integration runtime handles the actual work behind the scenes.
