---
title: "Matplotlib"
description: "Data visualization with Matplotlib"
tags:
- Computer Science
- Application Development
- Software Development
- Python
- Matplotlib
- Data Analysis
- Data Visualization
sidebar_position: 30
last_update:
  date: 8/17/2021
---



## Overview 

Data visualization is a key part of data analysis. It helps you explore datasets, extract insights, and share findings effectively.  

- Helps you understand data better.  
- Makes sharing insights with others easier.  

## Using Matplotlib  

Matplotlib is the foundation of Python's visualization libraries. Its `pyplot` subpackage is essential.  

- Import `pyplot` as `plt`.  
- Use `plt.plot()` to create a plot.  
- Use `plt.show()` to display it.  

Example: World Population Growth  

- Use a `year` list for years (e.g., 1970).  
- Use a `pop` list for populations (e.g., 3.7 billion).  
- Pass `year` and `pop` to `plt.plot()` to create a line chart.  
- Call `plt.show()` to display the chart.  

Implementing it 

```python
import matplotlib.pyplot as plt
year = [1970, 1980, 1990, 2000, 2010, 2020]
pop = [3.7, 4.4, 5.3, 6.1, 6.9, 7.8]

plt.plot(year, pop)
plt.show()
```

**Note:** The `plt.plot()` sets up the chartm while `plt.show()` displays it. Add titles and labels before calling `plt.show()`.

## Running in VS Code 

> Code can be viewed here: [001-sample_matplotlib.ipynb](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/001-Using-Pandas)

If you are using Visual Studio Code, you must first do the following:

- [Install the Jupyter Notebook extension ](https://code.visualstudio.com/docs/datascience/jupyter-notebooks)
- [Install Python in VS Code](https://code.visualstudio.com/docs/python/python-tutorial)
- [Click `Ctrl + Shift + r` to create a Python notebook.](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_create-or-open-a-jupyter-notebook) 

Before anything else, make sure to [choose your kernel.](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_create-or-open-a-jupyter-notebook) 

In the notebook, add the following in the first cell:

```python
!pip install matplotlib 
```

In the second cell, add this:

```python
import matplotlib.pyplot as plt
year = [1970, 1980, 1990, 2000, 2010, 2020]
pop = [3.7, 4.4, 5.3, 6.1, 6.9, 7.8]

plt.plot(year, pop)
plt.show() 
```

Click `Run All` to run the cells. It will go through each cell, installing the `matplotlib` library first, before running the code in the second cell. The result should be the plotted values. 

![](/img/docs/01092025-sample-python-matplotlib.png)


## Scatter Plot 

When you have a time scale along the horizontal axis, the line plot is useful. But in many other cases, when you're trying to assess if there's a correlation between two variables, for example, the scatter plot is the better choice.

Using the previous example:

```python
import matplotlib.pyplot as plt
year = [1970, 1980, 1990, 2000, 2010, 2020]
pop = [3.7, 4.4, 5.3, 6.1, 6.9, 7.8]

plt.scatter(year, pop)
plt.show
```

Output:

![](/img/docs/01092025-sample-python-matplotlib-scatter-plot.png)


## Histograms  

Histograms are a great way to explore data distributions. They divide data into equal-sized chunks, called bins, and show how many data points fall into each bin. This provides a clear picture of the distribution.  

**How a Histogram Works:**

1. Imagine 12 values between 0 and 6.  

   ```python
   data = [0.5, 1.0, 1.8, 1.9, 2.5, 2.9, 3.2, 3.8, 4.1, 4.7, 5.5, 5.9]
   ```  

2. Split the number line into equal chunks (bins). For example, 3 bins of width 2:  

   - Bin 1: 0–2  
   - Bin 2: 2–4  
   - Bin 3: 4–6  

3. Next, count the data points in each bins: 

   - Bin 1: 4 points  
   - Bin 2: 6 points  
   - Bin 3: 2 points  

4. Each bin gets a bar whose height corresponds to the count of points in that bin.

    ![](/img/docs/01092025-python-matplotlib-histograms.png)

## Create Histograms in Matplotlib  

You can use Matplotlib's `pyplot.hist()` function to create histograms. Consider the example below:  

```python
import matplotlib.pyplot as plt
data = [0,0.6,1.4,1.6,2.2,2.5,2.6,3.2,3.5,3.9,4.2,6]
plt.hist(data, bins=6)
plt.show()
```  

Key arguments in the `plt.hist`: 

- `x`: The data to plot.  
- `bins`: Number of bins (default is 10).  

Output:

![](/img/docs/01092025-python-matplotlib-histograms-2.png)


## Customizing the Plot

Customizing plots involves adjusting elements like colors, shapes, and labels, depending on the data and the story you want to tell. Although line plots are informative, we can enhance them by adding labels and a clearer focus on the population explosion. Consider the example below:

```python
import matplotlib.pyplot as plt

years = [1950, 2000, 2050, 2100]
pop = [2.5, 6.1, 9.0, 10.5]

plt.plot(years, pop)
plt.show()
```

Output:

![](/img/docs/01092025-python-matplotlib-3.png)


### Labels 

To customize this, you can add axis labels using `xlabel` and `ylabel`. This step helps people quickly understand what the axes represent. 

```python
import matplotlib.pyplot as plt

years = [1950, 2000, 2050, 2100]
pop = [2.5, 6.1, 9.0, 10.5]

plt.plot(years, pop)
plt.xlabel('Year')
plt.ylabel('Population (Billions)')
plt.title('World Population Projections')
plt.show()
```

Output:

![](/img/docs/01092025-python-matplotlib-4.png)


### Axis Ticks 

After adding labels, you can also adjust the y-axis ticks for clarity, ensuring they reflect billions by modifying tick names.

```python
import matplotlib.pyplot as plt

years = [1950, 2000, 2050, 2100]
pop = [2.5, 6.1, 9.0, 10.5]

plt.plot(years, pop)
plt.xlabel('Year')
plt.ylabel('Population (Billions)')
plt.title('World Population Projections')
plt.yticks([0, 2, 4, 6, 8, 10], ['0', '2B', '4B', '6B', '8B', '10B'])
plt.show()
```

Output:

![](/img/docs/01092025-python-matplotlib-5.png)


### Adding Data points

To provide a fuller picture of population trends, you can also add historical data points (e.g., years 1800, 1850, 1900) and append them to the existing lists. This creates a more comprehensive visual representation of the population explosion over time.

```python
import matplotlib.pyplot as plt

years = [1950, 2000, 2050, 2100]
pop = [2.5, 6.1, 9.0, 10.5]

years = [1800, 1850, 1900] + years
pop = [1.0, 1.3, 1.6] + pop

plt.plot(years, pop)
plt.xlabel('Year')
plt.ylabel('Population (Billions)')
plt.title('World Population Projections')
plt.yticks([0, 2, 4, 6, 8, 10], ['0', '2B', '4B', '6B', '8B', '10B'])
plt.show()
```

Output:

![](/img/docs/01092025-python-matplotlib-6.png)
