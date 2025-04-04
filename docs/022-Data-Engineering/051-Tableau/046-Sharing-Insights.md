---
title: "Sharing Insights"
description: "Sharing Insights"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 46
last_update:
  date: 5/22/2024
---


import ReactPlayerWrapper from '@site/src/components/documentation/ReactPlayerWrapper';



## Story Points   

Story Points provide a **flexible way to present data** while staying connected to live data. This allows real-time answers to stakeholder questions, reduces delays, and improves decision-making.  


## Structuring Your Presentation  

1. **State the Main Question**  
   - Clearly define what you're analyzing or solving.  
   - Example: *"What factors influence customer churn?"*  

2. **Provide Context & Data Assumptions**  
   - Explain the available data and any limitations.  
   - Example: *"Data covers the last 12 months, excluding incomplete records."*  

3. **Share Insights & Recommendations**  
   - Present key findings with supporting observations.  
   - Example: *"Churn rates are highest among users with inactive support tickets."*  

## Story Points Tools  

- **Formatting**  
  - Adjust colors, shading, and branding for clarity.  
  - Example: *Add company logos or consistent color schemes.*  

- **Local Annotations**  
  - Add text comments to highlight key insights.  
  - Example: *"Revenue dip in Q2 due to supply chain issues."*  

- **Tooltips & Additional Features**  
  - Use interactive elements like **tooltips** to provide extra details.  
  - Example: *Hover over a bar chart to see exact sales numbers.*  

## Sharing on Mobile

Dashboards can be shared via the Tableau mobile app or exported in different formats.  If users view reports on mobile devices, the layout should be adjusted for small screens to ensure readability and clarity.  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-12-184530.png)

</div>

The app makes it easy to access data with sections like:  

- **Favorites & Recents** – Quick access to frequently used dashboards.  
- **Explore & Projects** – Browse available reports.  
- **Workbook & Sheet Selector** – Navigate reports efficiently.  

To optimize visualizations for mobile, you can preview and adjust layouts accordingly.


<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-12-184635.png)

</div>

## Customize for Mobile Devices  

Tableau allows you to adjust visualizations for specific devices like phones and tablets. By default, Tableau generates a **Phone** layout automatically.  

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-40.gif)

</div>

To hide a part of the visualization in mobile view, right-click the item and select **Remove Zone from Phone**.

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-41.gif)

</div>

## Adding Navigation

Navigation buttons make it easy to switch between dashboards, especially on mobile devices.  

#### Example: Adding Navigation to the `Incident` Dashboard

In this example, we have an workbook that has an **Incident**, **Requests**, and **Problems** dashboard. The incident dashboard needs to have a button that will allow the user to navigate to the other dashboards.

**Download the workbook here:** 

- [5_1_basics_navigation.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/002-Creating-Dashboards/Workbooks)
- [5_1_basics_navigation_complete.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/002-Creating-Dashboards/Workbooks)


#### Steps

1. Drag the **Navigation** object from the **Objects** panel.  
2. Set the following for the **Requests** button:  
   - **Navigate to**: Requests  
   - **Title**: Go to Requests  
   - **Background**: Light Blue  
   - **Tooltip**: Tap to go to Requests  
3. Add another navigation button for **Problems**:  
   - **Navigate to**: Problems  
   - **Title**: Go to Problems  
   - **Background**: Light Green  
   - **Tooltip**: Tap to go to Problems  
4. Click **Presentation Mode** in the toolbar.  
5. Preview and test the navigation.


#### Solution

<ReactPlayerWrapper 
    controls
    url='https://youtu.be/sf517MMPVW0' 
/>  


## Exporting Visualizations  

You can export your Tableau visualizations in different formats:  

- **Images** – PNG, JPG, or BMP  
- **Documents** – PowerPoint or PDF  
- **Sharing** – Publish to a private or public server  

Note that exporting image is only available from **Tableau Desktop**, not Tableau Public.

1. Go to **Dashboard**.
2. Click **Export Image**

You can still export images from **Tableau Public**, but it requires a slightly different process than with Tableau Desktop. 

1. On Tableau Public, go to **File** > **Save to Tableau Public.**
2. YOu'll be prompted to sign-in with an account.
3. After publishing, you can access the "Download" button at the bottom.

    <div class="img-center"> 

    ![](/gif/docs/snowflake-create-query-sampleee-42.gif)

    </div>