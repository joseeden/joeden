---
title: "Mapping Data"
description: "Mapping Data"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 20
last_update:
  date: 5/19/2024
---


## Geographic Data  

Maps help visualize location-based data, which makes it easier to spot patterns and make informed decisions. Tableau supports different types of geographic visualizations.  

## Types of Maps  

### Filled Maps
  
Colors entire geographic regions based on data. For example, different states in a country can be shaded according to population density.  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-09-175441.png)

</div>

### Symbol Maps
 
Uses symbols placed at the center of regions to represent data points. For instance, a circle in each state can indicate the number of hospitals.  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-09-175519.png)

</div>

## Recognized Geographic Types  

Tableau automatically assigns coordinates (geocoding) to various geographic data types, including:  

- Countries, states, and provinces worldwide  
- US counties and congressional districts  
- Cities and postal codes  
- US area codes  

## Creating a Symbol Map 

In this example, we’ll use a dataset from the World Health Organization (WHO) to analyze past global health statistics.  

**Download the workbook here:** [0_0_creating_a_symbol_map.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/001-Introduction-to-Tableau/Workbooks)

We'll start with mapping the lung cancer cases by country.

1. **Add Geographic Data**  
  
    - Drag the **Country** field to the view. 
    - Tableau automatically add it to `Details` card in the **Marks** shelf.
    - It also generates latitude and longitude.  

        <div class="img-center"> 

        ![](/gif/docs/snowflake-create-query-sampleee-16.gif)

        </div>

2. **Filter by Year**  
  
    - Add the `Year` field to the **FIlters** shelf.
    - Set the filter to **2008** to focus on the latest data.  

        <div class="img-center"> 

        ![](/gif/docs/snowflake-create-query-sampleee-17.gif)

        </div>

3. **Size by Measure**  
  
    - Drag **Lung Cancer Cases** to **Size** on the Marks card. 
    - Larger circles indicate more cases.  
    - To increase circle size, click **Size** and adjust slider. 

        <div class="img-center"> 

        ![](/gif/docs/snowflake-create-query-sampleee-18.gif)

        </div>

4. **Color by Population Growth**  
  
    - Drag **Population Growth** to **Color** .
    - Change aggregation to **Average**.  
    - Take note of the following: 
      - Positive growth: Blue  
      - Negative growth: Orange  

        <div class="img-center"> 

        ![](/gif/docs/snowflake-create-query-sampleee-19.gif)

        </div>

5. **Improve Visibility**  
  
    - Click **Color**, add a black border, and remove the halo for clarity.  
    - Adjust the map: Open **Map Layers**, deselect **Land Cover**, and select **Coastline**.  

        <div class="img-center"> 

        ![](/gif/docs/snowflake-create-query-sampleee-20.gif)

        </div>

