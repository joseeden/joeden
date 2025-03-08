---
title: "Calculated Fields"
description: "Calculated Fields"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 18
last_update:
  date: 5/18/2024
---


## Overview

Calculated fields let you create new data using existing fields. This helps in transforming, categorizing, or performing calculations without altering the original dataset.  

Examples:

- **Currency Conversion** – Convert sales from USD to Euros using a fixed exchange rate.  
- **Data Cleaning** – Round gas prices or check if an email contains "@gmail.com".  
- **Date Extraction** – Extract the year from a full date field for easier grouping.  
- **Custom Metrics** – Calculate the price-to-earnings (P/E) ratio by dividing price by earnings.  

## Creating a Calculated Field  


## Functions in Calculated Fields  

Functions help perform operations inside calculated fields. They use parentheses to hold arguments, like this:  

```sql
ROUND([Gas Price], 2)
```
