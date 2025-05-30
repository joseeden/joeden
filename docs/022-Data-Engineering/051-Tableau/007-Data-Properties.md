---
title: "Data Properties"
description: "Data Properties"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 7
last_update:
  date: 5/26/2024
---



import ReactPlayerWrapper from '@site/src/components/documentation/ReactPlayerWrapper';


## Overview

Tableau automatically assigns fields as **dimensions** or **measures**, but sometimes you may need to adjust them. You can modify field types, names, aliases, and default properties to enhance your data visualizations.

- Change field types  
- Rename columns and use aliases  
- Set default properties  

## Dimension vs. Measures  

Tableau categorizes fields as dimensions or measures based on their values.  

- **Dimensions** contain qualitative data, like names or dates.  
- **Measures** contain numeric data, like price or duration.  

To change a field from a dimension to a measure, simply drag it from the Measures section to the Dimensions section. The icon will switch from green to blue.

<div class="img-center"> 

![](/gif/docs/tableau-change-dimension-to-measure.gif)

</div>

Remember:

- Measures: Green
- Dimensions: Blue


<!-- <div class="img-center"> 

![](/img/docs/Screenshot-2025-03-14-204615.png)

</div> -->


## Column Names and Aliases  

You can modify column names and set aliases to make the data more meaningful.  

- Rename columns without altering the source data.  
- Use aliases to provide more understandable value names for analysis.  

## Data Types  

Data types define the nature of data. Tableau supports several data types, including:  

| **Data Type**         | **Example**                         |
|-----------------------|-------------------------------------|
| String                | "Product Name", "City"             |
| Number (Integer)      | 123, 45.67                          |
| Date and Time         | "2021-12-01", "10:30 AM"            |
| Boolean               | TRUE, FALSE                         |
| Geographic            | "New York", "USA"                   |
| Cluster or Mixed      | Mix of the above                    |

After uploading a dataset in Tableau, the data fields appear on the Data Source page. While Tableau usually detects them correctly, there may be instances where adjustments are needed.

To modify the data type, right-click the field, select **Change Data Type**, and then choose the desired type.

<div class="img-center"> 

![](/gif/docs/tableau-change-data-type.gif)

</div>


<!-- <div class="img-center"> 

![](/img/docs/Screenshot-2025-03-14-205122.png)

</div> -->

## Setting Aliases

To set an alias, right-click on the field, choose **Aliases...**, and double-click the value you want to change.


<div class="img-center"> 

![](/gif/docs/tableau-set-alias.gif)

</div>


## Geographic Data  

Tableau can identify geographic fields like country or city, but sometimes the column names might not match the expected format.  

- You may need to manually assign geographic roles.  
- This is useful when column names don’t match common location titles.  

<div class="img-center"> 

![](/gif/docs/maps_getstarted6.gif)

</div>


## Default Properties  

You can set default properties to maintain consistency across your workbooks.  

- Adjust aggregation, formatting, colors, and more.  

To set default properties, right-click on the field, select **Default Properties**, and choose the property you want to modify.

<div class="img-center"> 

![](/gif/docs/tableau-set-default.gif)

</div>


## Renaming a Table 

Right-click -> Rename

<div class="img-center"> 

![](/gif/docs/tableau-rename-table.gif)

</div>

## Assign a Geo Role

If Tableau doesn't recognize location names, you can assign the correct geographic role for accurate mapping.

**Right-click the field → Geographic Role → Choose the appropriate role (e.g., Country, State, City).**

<div class="img-center"> 

![](/gif/docs/tableau-assign-geo-role.gif)

</div>

You can also move geographic fields into existing hierarchies to enable drill-down functionality.

## Create a Hierarchy 

Hierarchies help organize data for easy drill-down analysis. While location hierarchies are common, you can also create hierarchies for products, dates, or other categories.  

In this example, we’ll create a **Productline** hierarchy with the following fields:  

- Category  
- Sub-category  
- Manufacturer  
- Product Name  
- Product ID  

To create the hierarchy: **Right-click on `Category` → Hierarchy → Create Hierarchy.** Then, drag the remaining fields into the hierarchy.

<ReactPlayerWrapper 
    controls
    url='https://youtu.be/ZQfNFxV9oSs' 
/>



