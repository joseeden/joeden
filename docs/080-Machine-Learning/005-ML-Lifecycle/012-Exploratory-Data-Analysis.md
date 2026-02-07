---
title: "Exploratory Data Analysis"
description: "Exploratory Data Analysis"
tags: 
- Machine Learning
- MLOps
- Pandas
sidebar_position: 12
last_update:
  date: 5/12/2023
---


## Overview  

**Exploratory Data Analysis (EDA)** is the process of analyzing data to identify patterns, trends, and potential issues. It provides insights to guide further steps in a project, such as building a machine learning model.

## Steps in the EDA Process  

EDA begins by exploring the dataset to get a better understanding of its structure and content. 

1. Examine and analyze the dataset
2. Identify missing or unusual values  
3. Visualize the dataset 
4. Characterize/classify the dataset

## Inspecting Data  

To better understand the data, start by looking at its structure. You can quickly access key information like data types and missing values.

- `head()` displays the first few rows of data  
- `info()` gives a summary, including data types and non-null counts  

Example:

```python
import pandas as pd
df = pd.read_csv('data.csv')
print(df.head())  # Shows the first 5 rows
print(df.info())  # Shows summary info about the DataFrame
```

## Checking Class Imbalance  

**Class imbalance** refers to situations where one category of data is underrepresented. This can affect model performance.

- `value_counts()` - to inspect distribution of different classes  
- Calculate the proportion of each class to identify imbalances  

Example:

```python
# Print class imbalance
print(df['sex'].value_counts(normalize=True))
```

Sample outputL

```python
sex
1    0.691
0    0.309
Name: proportion, dtype: float64 
```

## Handling Missing Values  

Missing data can introduce bias into a model, so it's important to identify and handle it properly.

- Use `isnull()` to detect missing values  
- Decide how to handle missing data: remove, impute, or leave as is  

Example:

```python
print(df['age'].isnull().sum())  # Counts missing values in 'age' column
```

## Identifying Outliers  

**Outliers** are data points that are far outside the typical range. These can affect model accuracy and need to be addressed.

- Rare events, caused by measurement or data entry errors
- Detect outliers using *box plots* or the *interquartile range (IQR)*  
- Remove outliers or keep them based on context  

Outliers can skew the model's performance by focusing on extreme values that don't reflect the overall trend. Sometimes, though, they can be useful if they represent rare but important cases.


## Visualizing Data  

Visualizations help reveal trends, patterns, and potential issues in the data. They are essential for gaining deeper insights.

- Visualizations include histograms or scatter plots  
- Identify trends, distributions, and relationships between variables  

To create basic visualizations, we can use `plot()` :

```python
# Creates a histogram for the 'age' column
df['age'].plot(kind='hist', bins=10) 
```

To set the graph title and axis labels:

```python
plt.title('This is the graph title')
plt.xlabel('Years')                     ## X-axis
plt.ylabel('Frequency')                 ## Y-axis
plt.show
```

## Goals of EDA  

The purpose of EDA is to explore the dataset, uncover patterns, and prepare for further analysis. 

- Understand data characteristics and trends  
- Detect outliers or unexpected values  
- Form hypotheses and check assumptions  
- Inform decisions on feature selection and modeling