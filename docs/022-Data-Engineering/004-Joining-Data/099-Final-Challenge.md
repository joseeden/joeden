---
title: "Putting it all together"
description: "Advanced SQL"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 99
last_update:
  date: 8/28/2019
---


:::info[Final challenge]

This is the final challenge in the **Joining Data in SQL** course in Datacamp.

:::

## Tables 

Below are the tables used for this challenge. 

- [populations.csv](@site/docs/021-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/populations.csv)
- [currencies.csv](@site/docs/021-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/currencies.csv)
- [cities.csv](@site/docs/021-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/cities.csv)
- [countries.csv](@site/docs/021-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/countries.csv)
- [languages.csv](@site/docs/021-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/languages.csv)
- [economies.csv](@site/docs/021-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/economies.csv)

## Instructions 

Your task is to determine the top 10 capital cities in Europe and the Americas by city_perc, a metric you'll calculate. city_perc is a percentage that calculates the "proper" population in a city as a percentage of the total population in the wider metro area, as follows:

```bash
city_proper_pop / metroarea_pop * 100
```

Note: 

- Do not use table aliasing in this exercise.
- From `cities`, select the city name, country code, proper population, and metro area population, as well as the field `city_perc`, which calculates the proper population as a percentage of metro area population for each city (using the formula provided).
- Filter city name with a subquery that selects `capital` cities from `countries` in 'Europe' or continents with 'America' at the end of their name.
- Exclude `NULL` values in `metroarea_pop`.
- Order by `city_perc` (descending) and return only the first 10 rows.


## Solution 


<details>
    <summary>See solution</summary>


```sql
SELECT 
    name, 
    country_code, 
    city_proper_pop,
    metroarea_pop,
    (city_proper_pop / metroarea_pop * 100) AS city_perc
FROM cities
WHERE name IN (
    SELECT capital
    FROM countries
    WHERE continent = 'Europe'
    UNION
    SELECT capital
    FROM countries
    WHERE continent LIKE '%America'
)
AND metroarea_pop IS NOT NULL
ORDER BY city_perc DESC
LIMIT 10;
```

Output (some records might not shown):

| Name       | Country Code | City Proper Pop | Metro Area Pop | City Perc (%) |
|------------|--------------|-----------------|----------------|---------------|
| Lima       | PER          | 8,852,000       | 10,750,000     | 82.34         |
| Bogota     | COL          | 7,878,783       | 9,800,000      | 80.40         |
| Moscow     | RUS          | 12,197,596      | 16,170,000     | 75.43         |
| Vienna     | AUT          | 1,863,881       | 2,600,000      | 71.69         |
| Montevideo  | URY          | 1,305,082       | 1,947,604      | 67.01         |
| Caracas    | VEN          | 1,943,901       | 2,923,959      | 66.48         |
| Rome       | ITA          | 2,877,215       | 4,353,775      | 66.09         |
| Brasilia   | BRA          | 2,556,149       | 3,919,864      | 65.21         |
| London     | GBR          | 8,673,713       | 13,879,757     | 62.49         |
| Budapest   | HUN          | 1,759,407       | 2,927,944      | 60.09         |

</details>
