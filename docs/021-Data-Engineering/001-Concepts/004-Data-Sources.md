---
title: "Data Sources"
description: "Notes from DataCamp's Understanding Engineering Course"
tags: [Data Engineering, Data Science]
sidebar_position: 4
last_update:
  date: 2/27/2022
---



## Overview

Every day, we generate tons of data just by browsing the internet, tracking our workouts, or paying with a card. Companies collect this data internally to make informed decisions. Additionally, there are many free, open data sources available for anyone to use and share. Some companies even share parts of their data with the public. 

## Company Data

Common company data sources include web events, surveys, customer interactions, logistics, and financial transactions. 

### Web Data

When you visit a webpage or click on a link, companies often track this information to calculate conversion rates or monitor content popularity. The captured data includes:

- event name (like the URL or clicked element identifier)
- timestamp
- user identifier.

### Survey Data

Companies also collect data by asking people for their opinions through surveys. 

- Face-to-face interviews
- Online questionnaires
- Focus groups

Below is an example of Net Promoter Score (NPS), a common survey method used by companies.A common question that user's answer is "How likely are you to recommend this product to a friend?".

|![](/img/docs/data-engineering-survey-data-nps-score.png)|
|-|

## Open Data

Open data can be accessed in multiple ways, including APIs and public records.

## Public APIs

APIs, or Application Programming Interfaces, are an easy way to request data from a third party over the internet. Many companies provide public APIs, such as Twitter, Wikipedia, Yahoo! Finance, and Google Maps.

For example, we can use the Twitter API to track Tweets with a specific hashtag. We can analyze the sentiment of these Tweets, track hashtag frequency, or correlate positive Tweets with podcast downloads.

## Public Records

Public records are another great data source. They can be shared by international organizations like the World Bank or the UN, national statistical offices, and government agencies. In the US, Data.gov offers free access to health, education, and commerce data, while the EU has similar data available at data.europa.eu.

|![](/img/docs/data-engineering-public-records.png)|
|-|


## Data Types

Different data types have specific storage requirements and certain visualizations and analyses are only suitable for particular data types. 

Data can be broadly categorized into two types: quantitative and qualitative. Quantitative data is numerical and can be counted or measured. Qualitative data is descriptive and conceptual, observed but not measured. Let’s explore these types with real-world examples.

- **Quantitative Data**
  - Expressed in numbers.
  - Example: A fridge that is 60 inches tall, contains two apples, and costs 1000 dollars.

- **Qualitative Data**
  - Includes observations that can’t be measured.
  - Example: A red fridge built in Italy that might need cleaning because it smells like fish.

- **Image Data**
  - Composed of pixels, each containing information about color and intensity.
  - Example: Digital images that, when zoomed in, reveal individual pixels.

- **Text Data**
  - Found in emails, documents, reviews, social media posts, and more.
  - Example: A restaurant review.

- **Geospatial Data**
  - Includes location information and tracks various elements in a specific region.
  - Example: Data used in navigation apps like Waze and Google Maps to show roads, buildings, and vegetation.

- **Network Data**
  - Depicts relationships within a network, shown as nodes (circles) connected by edges (lines).
  - Example: A social network map showing who is connected to whom.