---
title: "Data Warehouse"
description: "Basics of Data Warehouses"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
sidebar_position: 10
last_update:
  date: 11/27/2021
---


## Overview 

A data warehouse is a system that stores and analyzes large amounts of data for an organization. It collects, integrates, and stores data from different parts of a company, and makes it available for analysis.  

- Gathers data from departments like Sales, HR, and Finance  
- Organizes and stores the data for future use  
- Helps analysts find patterns and insights  

Think of it like a physical warehouse storing goods—only here, it stores valuable business data.  

## Why is a Data Warehouse Valuable?  

It supports business intelligence and helps with decision-making.  

- Provides data for reports and performance tracking  
- Helps analysts, managers, and executives make informed decisions  
- Enables companies to innovate based on insights  

## Case Study: FourTwenty Furniture Store

FourTwenty Furniture Store is a company selling home office furniture. Here's how its data warehouse helps:  

- **Product Forecasting** → Uses past sales data to predict future demand  
- **Regulatory Compliance** → Stores financial data for audits and reporting  
- **Business Growth** → Tracks sales trends to plan hiring and production  

## Ways to Store Data 

### Databases: The Daily Logbook  

Databases store everyday transactions in neat tables.  

- Tracks sales, customers, and payments  
- Uses rows and columns for structured storage  
- Think of it as a **receipt keeper** for businesses  

Example: A store sells a laptop, and the sale is instantly recorded.  

### Data Warehouse: The Big Brain  

A data warehouse pulls in data from everywhere to make sense of it.  

- Combines data from multiple departments (Sales, HR, Finance)  
- Uses **ETL (Extract, Transform, Load)** to clean and organize info  
- Huge—usually **100 GB+**  
- Changing it is like **rearranging a skyscraper**  

**Why Not Just Use Databases?**  

Running giant reports on transactional databases slows them down. A data warehouse keeps analysis separate from daily operations.  

### Data Mart: The VIP Section  

A **data warehouse lite**, a smaller version, for just one team.  

- Focused on **one department** (Finance, HR, Sales)  
- Smaller, faster, and under **100 GB**  
- Often a **spinoff** of a data warehouse  

Example: Finance tracks revenue without digging through HR data.  

### Data Lake: The Junk Drawer (But Smart)  

A data lake holds everything—structured or not.  

- Stores text, images, videos, and logs  
- Works for multiple departments  
- Perfect for **"we don’t know yet, but it might be useful"** data  

Example: AI scans factory footage to spot production issues.  

**Warehouse vs. Lake: What’s the Deal?**  

- **Warehouse** = Neatly labeled storage, perfect for reports.  
- **Lake** = A giant pile of raw data waiting for a purpose.