---
title: "The Basics"
description: "Notes from DataCamp's Understanding Engineering Course"
tags: [Data Engineering, Data Science]
sidebar_position: 1
last_update:
  date: 9/26/2019
---


## Data Workflow

Data flows through four main steps in an organization.

- **Step 1: Data Collection and Ingestion**

    - First, data is collected and ingested from various sources.
    - Source include web traffic, surveys, or media consumption.

- **Step 2: Data Storage and Preparation**

    - Initially, data is stored in its raw format. 
    - The next step involves preparing the data.
    - Involves cleaning it (finding and handling missing or duplicate values) 
    - Then converting it into a more organized format.

- **Step 3: Data Exploration and Visualization**

    - Once the data is clean and organized, it can be analyzed. 
    - Exploring the data, visualizing it.
    - building dashboards to track changes or compare data sets.

- **Step 4: Data Experimentation and Modeling**

    - Experiments can be conducted,.
    - evaluating which article title gets the most hits.
    - Building predictive models to forecast stock prices.

## Key Players

Data engineers are essential for collecting and storing data. They set the stage for data analysts, data scientists, and machine learning engineers. If the data is messy or hard to access, it makes the later steps of preparation, exploration, and experimentation tough.

## Why Data Engineers Matter

Data engineers make sure the right data gets to the right people in the right format. They pull in data from various sources, optimize databases for analysis, and manage data corruption. They also build, test, and maintain systems like databases and large-scale processing setups to handle huge amounts of data.

## Data Engineers and Data Scientists 

### Differences 

- **Data Engineers**
    
    - Data engineers focus on the first part of the workflow: ingesting and storing data to ensure it's easily accessible and ready for analysis.

- **Data Scientists**
    
    - Data scientists handle the rest of the workflow: preparing, exploring, and visualizing data, and then running experiments or building predictive models. Data engineers lay the groundwork that makes these activities possible.

### Collaboration 

As an example, we can use data engineers and data scientists in streaming platform companies.

- **Enabling Data Scientists**

    - Data engineers collects and stores data about customers, artists, and songs in databases. 
    - Data scientists then uses these databases to analyze listening patterns and build recommendation engines.

- **Optimizing and Accessing Data**

    - Data engineers ensure databases are structured and optimized for analysis, making it easy for data scientists to retrieve and use the data without extensive preparation. 
    - Data engineers builds data pipelines, ensuring that scientists' analyses are always up to date with the latest data.

- **Skill Sets**

    - Data engineers are software experts, often using languages like Python, Java, and SQL for database management and transformation. 
    - Data scientists are analytics experts, using Python, R, and SQL to query databases and extract insights.



## Handling Big Data

With the rise of big data, data engineers are in high demand. Big data is so large that it can't be processed with traditional methods. It mainly comes from sensors and devices, social media, enterprise data, and VoIP data. Its growth is significant and ongoing.

### The Five Vs of Big Data

Big data is characterized by five Vs:

1. **Volume:** Amount of data points.
2. **Variety:** Types and nature of the data (text, image, video, audio).
3. **Velocity:** Speed at which data is generated and processed.
4. **Veracity:** Trustworthiness of the data sources.
5. **Value:** Actionability of the data.


