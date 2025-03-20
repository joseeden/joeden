---
title: "Data Preparation"
description: "Data Preparation"
tags: 
- Machine Learning
- MLOps
sidebar_position: 13
last_update:
  date: 5/12/2023
---

## Data Preparation  

Data preparation involves applying EDA insights to identify and perform data-cleaning steps. This ensures that the data is well-structured and suitable for training an accurate model.

## Handling Missing Values  

Missing values can affect model performance and need to be addressed. There are two main ways to handle missing values: 

- **Dropping Missing Data**  
  - Remove rows or columns with too many missing values.  
  - Use `dropna()` to remove sparse entries.  
  - Apply `drop()` to eliminate unnecessary columns.  

      ```python
      df = df.dropna(axis=0)                      # Drop rows with missing values
      df = df.dropna(how='all')                   # Drop all empty or sparse rows
      df = df.drop(columns=["unneeded_column"])   # Drop specific columns
      ```

- **Imputing Missing Values**  
  - Can be used if columns cannot be dropped entirely.
  - Fill missing values using the mean, median, or mode.  
  - Use forward-fill for time series data (using previous value).
  - Apply ML-based imputation for complex cases.  

      ```python
      df["age"].fillna(df["age"].median(), inplace=True)  # Fill with median
      df["cholesterol"].fillna(method="ffill", inplace=True)  # Forward fill
      ```

## Removing Duplicates  

Duplicates can distort model accuracy and should be removed.  

- **Identifying Duplicates**  
  - Check for duplicate rows in the dataset.  
  - Compare across all columns or a subset.  
  - Consider time-based uniqueness in time series data.  

      ```python
      duplicates = df.duplicated()
      df[duplicates]  # View duplicate rows
      ```

- **Dropping Duplicates**  
  - Use `drop_duplicates()` to remove identical rows.  
  - Specify columns to check for duplicates.  
  - Keep the first or last occurrence as needed.  

      ```python
      df = df.drop_duplicates()  # Remove duplicate rows
      df = df.drop_duplicates(subset=["id"], keep="first")  # Drop by ID
      ```

## Iterative Data Cleaning  

Data cleaning may need multiple iterations for best results.  

- Adjust cleaning steps as data evolves.  
- Reassess missing values after imputation.  
- Validate processed data before model training.  