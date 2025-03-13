---
title: "Divvy Bikes Usage"
description: "Divvy Bikes Usage"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 4
# last_update:
#   date: 5/21/2024
---


import ReactPlayerWrapper from '@site/src/components/documentation/ReactPlayerWrapper';

## Workbook  

In this lab, we'll create a dashboard to optimize bike resource allocation across Divvy stations. By analyzing ride data, we can determine where more bikes and docks are needed. Annotations will also be added to provide context and guidance for users.  

**Download the workbook here:**  

- [2_1_divvy_bikes_annotation.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/002-Creating-Dashboards/Workbooks)  
- [2_2_divvy_bikes_annotation_complete.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/002-Creating-Dashboards/Workbooks)  



## Adding Annotations  

#### Problem

1. The day with the highest traffic in downtown Chicago.  


#### Steps

1. Open the workbook.  
2. Right-click on the visualization > **Annotate** > **Area** > **OK**.  
3. Right-click again > **Format**.  
4. Set shading to none, use a dotted orange border, and round the corners.  
5. Create a new dashboard named **Traffic Dashboard**.  
6. Drag `Traffic Map` onto the dashboard.  
7. Set the dashboard size to **Automatic**.  
8. Remove the legend showing different circle sizes by clicking the cross.  
9. Drag "Text" from the **Objects** section to the right.  
10. Add the following text in the **Edit Text** window:  

    ```plaintext
    Explanation: This dashboard shows downtown Chicago Divvy Bikes usage patterns for each day in 1H 2019.
    ```  

11. Set the font to **Tableau Bold** and click **OK**.  
12. Add another text box with the following text:  

    ```plaintext
    Monitor for peak traffic (inner circles turn red).
    ```  

13. Change "red" to red color, set the font to **Tableau Bold**, size 10, and center-align the text.  
14. Click **OK**.  
15. Click the text object, then select the down arrow > **Floating**.  
16. Position the text at the bottom right of the visualization.  
17. Hover over the largest circle to view traffic details.  


#### Solution

<!-- <div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-35.gif)

</div> -->


<ReactPlayerWrapper 
    controls
    url='https://youtu.be/ILHFIFpE4TY' 
/>



#### Findings

Traffic peaked on **June 30, 2019**, in downtown Chicago. Divvy may need to add more docks at the busiest stations during June.


## Adding Dynamic titles

Dynamic titles update based on filter selections.

#### Problem

Find the total number of trips taken on **June 16** during the weekend.  

#### Steps

1. Create a worksheet named **Date Time Titles**.  
2. Set **Fit** to **Fit Width**.  
3. Drag `Trips(Count)` to the text card in the **Marks** section.  
4. Click the text, select **"..."**, then click **OK**.  
5. Right-click `Weekday or Weekend` > **Show Filter**.  
6. Drag `Start Time` to the **Pages** shelf.  
7. Click `Start Time` and select the second **Day** option.  
8. Right-click the worksheet title > **Edit Title** > **Insert** > Add `Page Name` and `Weekday or Weekend`.  
9. Click **Format** > **Shading** and set the worksheet color to **None**.  
10. In the dashboard, add the **Date Time Titles** worksheet.  
11. Click the down arrow and select **Floating**.  
12. Right-click the dashboard title and select **Hide Title**.  
13. In the **Weekday or Weekend** filter, select only **Weekend**.  
14. Under **Click to Animate Dates**, set the date to 16 June 2019. 


#### Solution
<!-- 
<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-36.gif)

</div> -->

<ReactPlayerWrapper 
    controls
    url='https://youtu.be/i_qTHD-yMEc' 
/>


#### Findings

There are 9,478 trips taken on June 16 during the weekend.