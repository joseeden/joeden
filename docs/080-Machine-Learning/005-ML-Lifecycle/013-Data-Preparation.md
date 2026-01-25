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

### Dropping Missing Data

If some rows or columns have too many missing values, they should be removed to avoid negatively impacting the model's performance.  

- Use `dropna()` to remove rows with missing data.  
- Use `drop()` to remove specific columns.  

Example:

```python
df = df.dropna(axis=0)                      # Drop rows with missing values
df = df.dropna(how='all')                   # Drop all empty or sparse rows
df = df.drop(columns=["unneeded_column"])   # Drop specific columns
```

### Imputing Missing Values

When columns cannot be dropped entirely, imputing missing values ensures that no crucial data is lost.  

- Fill missing values with the mean, median, or mode.  
- For time series, use forward-fill (previous value).  
- For complex cases, apply ML-based imputation techniques.

Example:

```python
df["age"].fillna(df["age"].median(), inplace=True)      # Fill with median
df["cholesterol"].fillna(method="ffill", inplace=True)  # Forward fill
```

### Advanced Imputation

In cases where basic imputation doesn't work, advanced techniques like K-nearest neighbors or SMOTE can be used to predict missing values based on other features in the dataset.  

- Use KNN imputer for more accurate imputation.  
- Apply `fit_transform()` to impute missing values.  

Example:

```python
from sklearn.impute import KNNImputer

imputer = KNNImputer(n_neighbors=2, weights="uniform")
df_imputed = imputer.fit_transform(df)  # Impute missing values using KNN
```

## Removing Duplicates  

Duplicates can distort model accuracy and should be removed to ensure the data is clean and reliable.  .

### Identifying Duplicates

Check for duplicate rows in the dataset to identify any redundancy.  

- Compare across all columns or a subset.  
- For time series data, check for uniqueness based on time.  

Example:

```python
duplicates = df.duplicated()
df[duplicates]    # View duplicate rows
```

### Dropping Duplicates

Removing duplicates ensures that each row in the dataset is unique and doesn't introduce bias.  

- Use `drop_duplicates()` to remove identical rows.  
- Specify columns to check for duplicates.  
- Keep the first or last occurrence as needed.  

Example:

```python
df = df.drop_duplicates()  # Remove duplicate rows
df = df.drop_duplicates(subset=["id"], keep="first")  # Drop by ID
```

## Iterative Data Cleaning  

Data cleaning may need multiple iterations for best results.  

- Adjust cleaning steps as data evolves.  
- Reassess missing values after imputation.  
- Validate processed data before model training.  