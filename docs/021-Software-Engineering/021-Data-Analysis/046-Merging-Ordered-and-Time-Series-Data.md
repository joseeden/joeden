---
title: "Merging Ordered and Time-Series Data"
description: "Merging Ordered and Time-Series Data"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
- Data Analysis
- Data Visualization
sidebar_position: 46
last_update:
  date: 6/13/2020
---



## Using `merge_ordered()`

The `merge_ordered()` method is used for merging time-series or ordered data. This method merges two tables while maintaining their order and sorting the result. It's similar to the standard **merge()**, but designed for ordered data like time-series.  

- **Default join**: "outer" (includes all records, fills missing values with NaN).  
- **Sorted output**: Ensures the merged data is in order. 

![](/img/docs/02112025-mergin-timeseries-data.png)

Comparison between `merge()` and `merge_ordered()`:

| **Feature**               | **merge()**                               | **merge_ordered()**                        |
|---------------------------|-------------------------------------------|-------------------------------------------|
| **Column(s) to Join On**  | `on`, `left_on`, and `right_on`           | `on`, `left_on`, and `right_on`           |
| **Type of Join**          | `how` (left, right, inner, outer)         | `how` (left, right, inner, outer)         |
|                           | Default: `inner`                          | Default: `outer`                          |
| **Overlapping Columns**   | `suffixes`                                | `suffixes`                                |
| **Calling the Method**    | `df1.merge(df2)`                          | `pd.merge_ordered(df1, df2)`              |


### Example of `merge_ordered()`

Consider the stock data for Apple and McDonald's below.

```python
import pandas as pd

# Apple stock data
apple = pd.DataFrame({
    'date': ['2007-02-01', '2007-03-01', '2007-04-01'],
    'price': [90, 92, 95]
})

# McDonald's stock data
mcd = pd.DataFrame({
    'date': ['2007-01-01', '2007-03-01', '2007-05-01'],
    'price': [60, 62, 65]
})
```

To merge the two data: 

```python 
merged = pd.merge_ordered(apple, mcd, on='date', suffixes=('_apple', '_mcd'))
print(merged)
```

Output:

```
         date  price_apple  price_mcd
0  2007-01-01          NaN       60.0
1  2007-02-01         90.0        NaN
2  2007-03-01         92.0       62.0
3  2007-04-01         95.0        NaN
4  2007-05-01          NaN       65.0
```

### Forward Fill  

Missing values can be filled using **forward fill** (`'ffill'`), which fills gaps by using the last known value.  

![](/img/docs/02112025-mergin-forward-fill.png)

```python
merged_ffill = pd.merge_ordered(apple, mcd, on='date', 
                                suffixes=('_apple', '_mcd'), 
                                fill_method='ffill')
print(merged_ffill)
```

Without forward filling:

```python
         date  price_apple  price_mcd
0  2007-01-01          NaN       60.0
1  2007-02-01         90.0        NaN
2  2007-03-01         92.0       62.0
3  2007-04-01         95.0        NaN
4  2007-05-01          NaN       65.0 
```

After applying forward fill:

```python
         date  price_apple  price_mcd
0  2007-01-01          NaN         60
1  2007-02-01         90.0         60
2  2007-03-01         92.0         62
3  2007-04-01         95.0         62
4  2007-05-01         95.0         65
```

Notice that the stock price of Apple is still showing `NaN` because there is no row preceding it.



## Using `merge_asof()`

The `merge_asof()` method is used to merge tables on the nearest matching values in an ordered dataset. It’s similar to an ordered left join, but instead of matching exact values, it looks for the nearest value. 

![](/img/docs/02112025-mergin-asof.png)

It's useful when you have time-series or ordered data where the exact match might not be available.

- **Merges on nearest value**, not exact match.
- **Requires sorted columns** to work properly.
- **Useful for time-series data** or when values don’t align exactly.

When to Use `merge_asof()`:

- When merging time-series data where exact matches aren't always available.
- When you don’t want to pull future data before the current point in time (like in financial data analysis).


### Example of `merge_asof()` 

Consider the stock data for both Visa and IBM below:

```python
import pandas as pd

visa = pd.DataFrame({
    'date_time': pd.to_datetime(['2017-11-11 01:45:00', '2017-11-11 02:30:00', '2017-11-11 03:05:00', '2017-11-11 04:50:00']),
    'Visa_stock': [100, 105, 110, 115]
})

ibm = pd.DataFrame({
    'date_time': pd.to_datetime(['2017-11-11 00:05:00', '2017-11-11 01:15:00', '2017-11-11 03:25:00', '2017-11-11 04:05:00']),
    'IBM_stock': [150, 149.11, 151, 152]
})

print(visa)
print(ibm)
```

Tables:

```python
            date_time  Visa_stock
0 2017-11-11 01:45:00         100
1 2017-11-11 02:30:00         105
2 2017-11-11 03:05:00         110
3 2017-11-11 04:50:00         115
            date_time  IBM_stock
0 2017-11-11 00:05:00     150.00
1 2017-11-11 01:15:00     149.11
2 2017-11-11 03:25:00     151.00
3 2017-11-11 04:05:00     152.00
```

Merge using `merge_asof()`, specifying `date_time` as the column to merge on.

```python
result = pd.merge_asof(visa, ibm, on='date_time', suffixes=('_visa', '_ibm'))
print(result)
```

As we can see, the `merge_asof()` method selects the IBM stock prices closest to the Visa stock price, but always from a **time before or equal** to the left table's time.

```python
            date_time  Visa_stock  IBM_stock
0 2017-11-11 01:45:00         100     149.11
1 2017-11-11 02:30:00         105     149.11
2 2017-11-11 03:05:00         110     149.11
3 2017-11-11 04:50:00         115     152.00
```

### Using `direction` :

You can change the behavior with the `direction` argument:

| Direction  | Description                                                                                  |
|------------|----------------------------------------------------------------------------------------------|
| **"backward" (default)** | Select the closest row from the right table with a value **less than or equal** to the left table. |
| **"forward"** | Select the first row in the right table where the value is **greater than or equal** to the left table. |
| **"nearest"** | Select the closest row, regardless of whether it's before or after the left table’s row. |

Using `direction="forward"`:

```python
result_forward = pd.merge_asof(visa, ibm, on='date_time', direction='forward')
print(result_forward)
```

Here, the **forward direction** picks the **next available IBM price** that’s greater than or equal to the Visa time.

```python
            date_time  Visa_stock  IBM_stock
0 2017-11-11 01:45:00         100      151.0
1 2017-11-11 02:30:00         105      151.0
2 2017-11-11 03:05:00         110      151.0
3 2017-11-11 04:50:00         115        NaN  
```


## Selecting wth `.query()`

The `.query()` method in pandas is a simple way to filter rows in a DataFrame using string-based conditions. It's similar to SQL's `WHERE` clause but does not require SQL knowledge.

- Takes a string condition to filter rows  
- Works similarly to SQL but is simpler  
- Supports numerical and text-based conditions  

Example: Selecting rows where Nike's stock price is **90 or higher**.

| Date       | Disney | Nike  |
|------------|--------|-------|
| 2023-01-01 | 135    | 88    |
| 2023-01-02 | 138    | 92    |
| 2023-01-03 | 140    | 97    |
| 2023-01-04 | 142    | 89    |
| 2023-01-05 | 137    | 91    |

Importing the data:

```python
import pandas as pd 

stocks = pd.DataFrame({
    "Date": ["2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04", "2023-01-05"],
    "Disney": [135, 138, 140, 142, 137],
    "Nike": [88, 92, 97, 89, 91]
})
```

Running the queries:

- **Query 1**: Select rows where Nike is 90 or higher

    ```python
    result1 = stocks.query("Nike >= 90")
    print("Query 1 Output:\n", result1, "\n")
    ```

    Output:

    ```python

            Date  Disney  Nike
    1  2023-01-02     138    92
    2  2023-01-03     140    97
    4  2023-01-05     137    91 
    ```

- **Query 2**: Select rows where Nike is over 90 AND Disney is below 140

    ```python
    result2 = stocks.query("Nike > 90 and Disney < 140")
    print(result2)
    ```

    Output:

    ```python
            Date  Disney  Nike
    1  2023-01-02     138    92
    4  2023-01-05     137    91      
    ```

- **Query 3**: Select rows where Nike is over 96 OR Disney is below 98

    ```python
    result3 = stocks.query("Nike > 96 or Disney < 98")
    print(result3)
    ```

    Output:

    ```python
            Date  Disney  Nike
    2  2023-01-03     140    97  
    ```

Updating the sample data with `stocks_updated`, adding text values:

```python
stocks_updated = pd.DataFrame({
    "Date": ["2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04", "2023-01-05"],
    "Stock": ["Disney", "Nike", "Nike", "Disney", "Nike"],
    "Close": [135, 92, 89, 142, 87]
})

print(stocks_updated)
```

Output:

```python
         Date   Stock  Close
0  2023-01-01  Disney    135
1  2023-01-02    Nike     92
2  2023-01-03    Nike     89
3  2023-01-04  Disney    142
4  2023-01-05    Nike     87 
```

To select rows where Stock is "Disney" OR Stock is "Nike" AND Close is below 90

```python
result4 = stocks_updated.query('Stock == "Disney" or (Stock == "Nike" and Close < 90)')
print(result4)
```    

Output:

```python
         Date   Stock  Close
0  2023-01-01  Disney    135
2  2023-01-03    Nike     89
3  2023-01-04  Disney    142
4  2023-01-05    Nike     87  
```




## Wide vs. Long Data

Data can be stored in two formats:  

- **Wide format** – One row per subject, with multiple columns for attributes  
- **Long format** – One subject appears in multiple rows, each row represents an attribute  

Wide format is easier to read, while long format is better for analysis.  

<div class="img-center"> 

![](/img/docs/02112025-mergin-1.png)

</div>


We can use the `melt()` method to transform a wide format data to a long format.

<div class="img-center"> 

![](/img/docs/02112025-mergin-2.png)

</div>


### Using `.melt()`

The `.melt()` method converts wide-format data into a long-format, making it more useful for analysis.  

- Converts wide data to long format  
- Moves selected columns into rows  
- Keeps identifier columns unchanged  

Consider a dataset containing financial metrics for two companies:  

```python
import pandas as pd

social_fin = pd.DataFrame({
    "Company": ["Facebook", "Twitter"],
    "2016": [27, 3.5],
    "2017": [40, 5.0],
    "2018": [56, 7.2],
    "2019": [70, 8.5]
})

print(social_fin)
```


Output in wide form:

```
    Company  2016  2017  2018  2019
0  Facebook  27.0  40.0  56.0  70.0
1   Twitter   3.5   5.0   7.2   8.5
```

Now, we use `.melt()` to transform this data.  

```python
social_long = social_fin.melt(id_vars=["Company"])
print(social_long)
```

Output in Long Form:

```
    Company variable  value
0  Facebook     2016   27.0
1   Twitter     2016    3.5
2  Facebook     2017   40.0
3   Twitter     2017    5.0
4  Facebook     2018   56.0
5   Twitter     2018    7.2
6  Facebook     2019   70.0
7   Twitter     2019    8.5
```


### Controlling Columns

We can choose which columns to unpivot using `value_vars`. In the example below, we'll onlu unpivot the 2017 and 2018 columns.

```python
social_long = social_fin.melt(id_vars=["Company"], value_vars=["2017", "2018"])

print(social_long)
```

Output:

```
    Company variable  value
0  Facebook     2017   40.0
1   Twitter     2017    5.0
2  Facebook     2018   56.0
3   Twitter     2018    7.2
```


### Renaming Columns 

We can also rename the columns for better readability.  

```python
social_long = social_fin.melt(id_vars=["Company"], 
                              var_name="Year", 
                              value_name="Revenue")

print(social_long)
```

Output:

```
    Company  Year  Revenue
0  Facebook  2016     27.0
1   Twitter  2016      3.5
2  Facebook  2017     40.0
3   Twitter  2017      5.0
4  Facebook  2018     56.0
5   Twitter  2018      7.2
6  Facebook  2019     70.0
7   Twitter  2019      8.5
```


