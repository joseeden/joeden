---
title: "Reshaping Data"
description: "Reshaping Data with Pandas"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
- Data Analysis
- Data Visualization
sidebar_position: 50
last_update:
  date: 6/13/2020
---


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


## Using `.melt()`

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


## Controlling Columns

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


## Renaming Columns 

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


