---
title: "Outer Joins"
description: "Advanced SQL"
tags:
- Data Engineering
- Databases
- SQL
sidebar_position: 4
last_update:
  date: 8/28/2019
---



## Sample Tables

Here is the schema for the sample **leaderships** table:

<div class='img-center'>

![](/img/docs/sample-database-schemaaa.png)

</div>

To download the actual files, you can get them from my Github repository

- [states.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/states.csv)
- [presidents.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/presidents.csv)
- [prime_ministers.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/prime_ministers.csv)
- [prime_minister_terms.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/prime_minister_terms.csv)
- [monarchs.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/monarchs.csv)




## `LEFT JOIN` 

`LEFT JOIN` lets you retrieve records from both tables even if there’s no match on the joining field. It returns all records from the left table and the matching records from the right table.

<div class='img-center'>

![](/img/docs/sample-diagram-left-joinnn.png)

</div>

From the example above, we can see that the result of a `LEFT JOIN` on the `id` field shows that it includes all records from the left table. On the other hand, an `INNER JOIN` will only return the records with matches.

Syntax:

```sql
SELECT *
FROM left_table
LEFT JOIN right_table
ON left_table.id = right_table.id;
```

Using the tables in the **leadership** database, if we want to include all countries with prime ministers and optionally presidents, `LEFT JOIN` is appropriate. The syntax is similar to `INNER JOIN`, just replace INNER with LEFT. `LEFT JOIN` can also be written as LEFT OUTER JOIN.

- The syntax is similar to `INNER JOIN`; use LEFT instead of INNER.
- It returns null values for missing matches.
- `LEFT JOIN` can also be written as  `LEFT OUTER JOIN`.


Query:

```sql
SELECT p1.country, prime_minister, president
FROM prime_ministers AS p1
LEFT JOIN presidents AS p2 
USING (country);
```

Output: 

| prime_minister          | president                |
|-------------------------|--------------------------|
| United Kingdom          | NULL                     |
| Canada                  | NULL                     |
| Australia               | NULL                     |
| India                   | Ram Nath Kovind          |
| Japan                   | NULL                     |
| Germany                 | Frank-Walter Steinmeier  |
| Italy                   | Sergio Mattarella        |
| South Africa            | NULL                     |
| New Zealand             | NULL                     |
| Spain                   | NULL                     |
| Belgium                 | NULL                     |
| Sweden                  | NULL                     |


## `RIGHT JOIN`

`RIGHT JOIN` is less commonly used compared to `LEFT JOIN`. `RIGHT JOIN` keeps all records from the right table, even if there are no matches in the left table.

- `RIGHT JOIN` includes all records from the right table.
- Null values are returned for unmatched records from the left table.
- `RIGHT JOIN` can also be written as  `RIGHT OUTER JOIN`.

The syntax for `RIGHT JOIN` follows a similar pattern to `LEFT JOIN` but reverses the roles of the tables. It can also be written as RIGHT OUTER JOIN.

![](/img/docs/sample-diagram-left-joinnnnn.png)

Syntax:

```sql
SELECT *
FROM left_table
RIGHT JOIN right_table
ON left_table.id = right_table.id;
```

In the **leadership** table example, performing a `RIGHT JOIN` between prime ministers and presidents will include null values where countries have presidents but no prime ministers.


Query:

```sql
SELECT p1.country, prime_minister, president
FROM prime_ministers AS p1
RIGHT JOIN presidents AS p2 
USING (country);
```

Output: 

| country        | prime_minister          | president                |
|----------------|-------------------------|--------------------------|
| USA            | NULL                    | Joe Biden                |
| France         | NULL                    | Emmanuel Macron          |
| South Korea    | NULL                    | Moon Jae-in              |
| India          | Narendra Modi           | Ram Nath Kovind          |
| Germany        | Angela Merkel           | Frank-Walter Steinmeier  |
| Italy          | Mario Draghi            | Sergio Mattarella        |
| Brazil         | NULL                    | Jair Bolsonaro           |
| Mexico         | NULL                    | Andrés Manuel López Obrador|
| China          | NULL                    | Xi Jinping               |
| Russia         | NULL                    | Vladimir Putin           |


## `LEFT JOIN` vs. `RIGHT JOIN`

While both `LEFT JOIN` and `RIGHT JOIN`s are useful, `RIGHT JOIN` is less common because it can always be converted to a `LEFT JOIN`. 

- `LEFT JOIN` is often more intuitive
- Due to the natural left-to-right flow of writing and reading queries.
- `RIGHT JOIN` is less commonly used as `LEFT JOIN` can achieve the same results.

## More Examples 

The **World Economies** database contain the tables below. To limit the number of results in the examples, each table only has 20 records.


<details>
    <summary>`countries` table</summary>

| code | name            | continent    | region                     | surface_area | indep_year | local_name                     | gov_form                       | capital       | cap_long | cap_lat |
|------|-----------------|--------------|----------------------------|--------------|------------|--------------------------------|---------------------------------|---------------|----------|---------|
| AFG  | Afghanistan     | Asia         | Southern and Central Asia  | 652090       | 1919       | Afganistan/Afqanestan          | Islamic Emirate                | Kabul         | 69.1761  | 34.5228 |
| NLD  | Netherlands     | Europe       | Western Europe             | 41526        | 1581       | Nederland                      | Constitutional Monarchy        | Amsterdam     | 4.89095  | 52.3738 |
| ALB  | Albania         | Europe       | Southern Europe            | 28748        | 1912       | Shqiperia                      | Republic                       | Tirane        | 19.8172  | 41.3317 |
| DZA  | Algeria         | Africa       | Northern Africa            | 2381740      | 1962       | Al-Jazair/Algerie             | Republic                       | Algiers       | 3.05097  | 36.7397 |
| ASM  | American Samoa  | Oceania      | Polynesia                  | 199          | null       | Amerika Samoa                  | US Territory                   | Pago Pago     | -170.691 | -14.2846|
| AND  | Andorra         | Europe       | Southern Europe            | 468          | 1278       | Andorra                        | Parliamentary Coprincipality   | Andorra la Vella | 1.5218 | 42.5075 |
| AGO  | Angola          | Africa       | Central Africa             | 1246700      | 1975       | Angola                         | Republic                       | Luanda        | 13.242   | -8.81155|
| ATG  | Antigua and Barbuda | North America | Caribbean              | 442          | 1981       | Antigua and Barbuda            | Constitutional Monarchy        | Saint John's  | -61.8456 | 17.1175 |
| ARE  | United Arab Emirates | Asia   | Middle East                | 83600        | 1971       | Al-Imarat al-´Arabiya al-Muttahida | Emirate Federation           | Abu Dhabi     | 54.3705  | 24.4764 |
| ARG  | Argentina       | South America| South America              | 2780400      | 1816       | Argentina                      | Federal Republic               | Buenos Aires  | -58.4173 | -34.6118|
| ARM  | Armenia         | Asia         | Middle East                | 29800        | 1991       | Hajastan                       | Republic                       | Yerevan       | 44.509   | 40.1596 |
| ABW  | Aruba           | North America| Caribbean                  | 193          | null       | Aruba                          | Nonmetropolitan Territory of The Netherlands | Oranjestad | -70.0167 | 12.5167 |
| AUS  | Australia       | Oceania      | Australia and New Zealand  | 7741220      | 1901       | Australia                      | Constitutional Monarchy, Federation | Canberra | 149.129 | -35.282 |
| AZE  | Azerbaijan      | Asia         | Middle East                | 86600        | 1991       | Azarbaycan                     | Federal Republic               | Baku          | 49.8932  | 40.3834 |
| BHS  | Bahamas         | North America| Caribbean                  | 13878        | 1973       | The Bahamas                    | Constitutional Monarchy        | Nassau        | -77.339  | 25.0661 |
| BHR  | Bahrain         | Asia         | Middle East                | 694          | 1971       | Al-Bahrayn                     | Monarchy (Emirate)             | Manama        | 50.5354  | 26.1921 |
| BGD  | Bangladesh      | Asia         | Southern and Central Asia  | 143998       | 1971       | Bangladesh                     | Republic                       | Dhaka         | 90.4113  | 23.7055 |
| BRB  | Barbados        | North America| Caribbean                  | 430          | 1966       | Barbados                       | Constitutional Monarchy        | Bridgetown    | -59.6105 | 13.0935 |
| BEL  | Belgium         | Europe       | Western Europe             | 30518        | 1830       | Belgie/Belgique                | Constitutional Monarchy, Federation | Brussels | 4.36761 | 50.8371 |
| BLZ  | Belize          | North America| Central America            | 22696        | 1981       | Belize                         | Constitutional Monarchy        | Belmopan      | -88.7713 | 17.2534 |


</details>


<details>
    <summary>`cities` table</summary>

| name          | country_code | city_proper_pop | metroarea_pop | urbanarea_pop |
|---------------|--------------|-----------------|---------------|---------------|
| Abidjan       | CIV          | 4765000         | null          | 4765000       |
| Abu Dhabi     | ARE          | 1145000         | null          | 1145000       |
| Abuja         | NGA          | 1235880         | 6000000       | 1235880       |
| Accra         | GHA          | 2070463         | 4010054       | 2070463       |
| Addis Ababa   | ETH          | 3103673         | 4567857       | 3103673       |
| Ahmedabad     | IND          | 5570585         | null          | 5570585       |
| Alexandria    | EGY          | 4616625         | null          | 4616625       |
| Algiers       | DZA          | 3415811         | 5000000       | 3415811       |
| Almaty        | KAZ          | 1703481         | null          | 1703481       |
| Ankara        | TUR          | 5271000         | 4585000       | 5271000       |
| Auckland      | NZL          | 1495000         | 1614300       | 1495000       |
| Baghdad       | IRQ          | 7180889         | null          | 7180889       |
| Baku          | AZE          | 3202300         | 4308740       | 3202300       |
| Bandung       | IDN          | 2575478         | 6965655       | 2575478       |
| Bangkok       | THA          | 8280925         | 14998000      | 8280925       |
| Barcelona     | ESP          | 1604555         | 5375774       | 1604555       |
| Barranquilla  | COL          | 1386865         | 2370753       | 1386865       |
| Basra         | IRQ          | 2750000         | null          | 2750000       |
| Beijing       | CHN          | 21516000        | 24900000      | 21516000      |
| Belo Horizonte | BRA          | 2502557         | 5156217       | 2502557       |

</details>



<details>
    <summary>`economies` table</summary>


| econ_id | code | year | income_group          | gdp_percapita | gross_savings | inflation_rate | total_investment | unemployment_rate | exports | imports |
|---------|------|------|-----------------------|---------------|---------------|----------------|------------------|-------------------|---------|---------|
| 1       | AFG  | 2010 | Low income            | 539.667       | 37.133        | 2.179          | 30.402           | null              | 46.394  | 24.381  |
| 2       | AFG  | 2015 | Low income            | 615.091       | 21.466        | -1.549         | 18.602           | null              | -49.11  | -7.294  |
| 3       | AGO  | 2010 | Upper middle income   | 3599.27       | 23.534        | 14.48          | 14.433           | null              | -3.266  | -21.076 |
| 4       | AGO  | 2015 | Upper middle income   | 3876.2        | -0.425        | 10.287         | 9.552            | null              | 6.721   | -21.778 |
| 5       | ALB  | 2010 | Upper middle income   | 4098.13       | 20.011        | 3.605          | 31.305           | 14                | 10.645  | -8.013  |
| 6       | ALB  | 2015 | Upper middle income   | 3943.22       | 13.84         | 1.896          | 24.598           | 17.1              | 1.827   | 0.574   |
| 7       | ARE  | 2010 | High income           | 34628.63      | 27.073        | 0.878          | 27.372           | null              | 3.843   | -0.981  |
| 8       | ARE  | 2015 | High income           | 38649.91      | 34.106        | 4.07           | 27.477           | null              | 7.32    | 2.17    |
| 9       | ARG  | 2010 | Upper middle income   | 10412.95      | 17.361        | 10.461         | 17.706           | 7.75              | 13.931  | 39.877  |
| 10      | ARG  | 2015 | Upper middle income   | 14643.92      | 14.111        | null           | 16.89            | null              | -1.658  | 3.105   |
| 11      | ARM  | 2010 | Lower middle income   | 3121.78       | 15.797        | 7.274          | 29.419           | 19                | 30.183  | 4.09    |
| 12      | ARM  | 2015 | Lower middle income   | 3520.95       | 18.306        | 3.731          | 20.956           | 18.5              | 15.729  | -9.647  |
| 13      | ATG  | 2010 | High income           | 13531.78      | 13.398        | 3.37           | null             | null              | -3.241  | -14.113 |
| 14      | ATG  | 2015 | High income           | 15155.16      | 18.754        | 0.969          | null             | null              | 6.026   | -24.307 |
| 15      | AUS  | 2010 | High income           | 56362.84      | 23.584        | 2.863          | 27.089           | 5.208             | 5.782   | 15.208  |
| 16      | AUS  | 2015 | High income           | 51363.9       | 22.111        | 1.461          | 26.304           | 6.058             | 6.022   | 1.99    |
| 17      | AUT  | 2010 | High income           | 46757.13      | 25.521        | 1.694          | 22.654           | 4.8               | 13.84   | 11.989  |
| 18      | AUT  | 2015 | High income           | 43749.55      | 25.353        | 0.81           | 23.507           | 5.75              | 3.558   | 3.382   |
| 19      | AZE  | 2010 | Upper middle income   | 5847.26       | 46.567        | 5.666          | 18.532           | 6.048             | -1.792  | -1.459  |
| 20      | AZE  | 2015 | Upper middle income   | 5396.41       | 26.4          | 4.049          | 26.783           | 6.048             | 4.08    | 0.186   |

</details>





To download the actual files, you can get them from my Github repository:

- [countries.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/countries.csv)
- [cities.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/cities.csv)
- [economies.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/economies.csv)


### Left Join 

1. Perform an inner join with cities AS c1 on the left and countries as c2 on the right. Use code as the field to merge your tables on.

    <details>
        <summary>Solution</summary>


        Run the command below:

        ```sql
        SELECT 
            c1.name AS city,
            code,
            c2.name AS country,
            region,
            city_proper_pop
        FROM cities AS c1
        INNER JOIN countries AS c2 
        ON c1.country_code = c2.code
        ORDER BY code DESC; 
        ```

        Output (some records may not shown):

        | city             | code | country          | region                     | city_proper_pop |
        |------------------|------|------------------|----------------------------|-----------------|
        | Harare           | ZWE  | Zimbabwe         | Eastern Africa             | 1606000         |
        | Lusaka           | ZMB  | Zambia           | Eastern Africa             | 1742979         |
        | Cape Town        | ZAF  | South Africa     | Southern Africa            | 3740026         |
        | Johannesburg     | ZAF  | South Africa     | Southern Africa            | 4434827         |
        | Durban           | ZAF  | South Africa     | Southern Africa            | 3442361         |
        | Ekurhuleni       | ZAF  | South Africa     | Southern Africa            | 3178470         |
        | Sana'a           | YEM  | Yemen            | Middle East                | 1937451         |
        | Ho Chi Minh City | VNM  | Vietnam          | Southeast Asia             | 7681700         |
        | Hanoi            | VNM  | Vietnam          | Southeast Asia             | 6844100         |
        | Caracas          | VEN  | Venezuela        | South America              | 1943901         |
        | Maracaibo        | VEN  | Venezuela        | South America              | 1599940         |
        | Tashkent         | UZB  | Uzbekistan       | Southern and Central Asia  | 2309600         |
        | Chicago          | USA  | United States    | North America              | 2695598         |
        | Los Angeles      | USA  | United States    | North America              | 3884307         |
        | Philadelphia     | USA  | United States    | North America              | 1567872         |
        | Phoenix          | USA  | United States    | North America              | 1563025         |


    </details>


2. Change the code to perform a `LEFT JOIN` instead of an `INNER JOIN`. After executing this query, have a look at how many records the query result contains.

    <details>
        <summary>Solution</summary>

        Run the command below:

        ```sql
        SELECT 
            c1.name AS city, 
            code, 
            c2.name AS country,
            region, 
            city_proper_pop
        FROM cities AS c1
        LEFT JOIN countries AS c2 
        ON c1.country_code = c2.code
        ORDER BY code DESC;
        ```

        Output (some records may not shown):

        | city             | code | country             | region                     | city_proper_pop |
        |------------------|------|---------------------|----------------------------|-----------------|
        | Taichung         | null | null                | null                       | 2752413         |
        | Tainan           | null | null                | null                       | 1885252         |
        | Kaohsiung        | null | null                | null                       | 2778918         |
        | Bucharest        | null | null                | null                       | 1883425         |
        | Taipei           | null | null                | null                       | 2704974         |
        | New Taipei City  | null | null                | null                       | 3954929         |
        | Harare           | ZWE  | Zimbabwe            | Eastern Africa             | 1606000         |
        | Lusaka           | ZMB  | Zambia              | Eastern Africa             | 1742979         |
        | Cape Town        | ZAF  | South Africa        | Southern Africa            | 3740026         |
        | Ekurhuleni       | ZAF  | South Africa        | Southern Africa            | 3178470         |
        | Durban           | ZAF  | South Africa        | Southern Africa            | 3442361         |
        | Johannesburg     | ZAF  | South Africa        | Southern Africa            | 4434827         |

    </details>


3. Order the result set by the average GDP per capita from highest to lowest. Return only the first 10 records in your result.

    <details>
        <summary>Solution</summary>

        Run the command below:

        ```sql
        SELECT region, AVG(gdp_percapita) AS avg_gdp
        FROM countries AS c
        LEFT JOIN economies AS e
        USING(code)
        WHERE year = 2010
        GROUP BY region
        ORDER BY avg_gdp DESC 
        LIMIT 10; 
        ```

        Output (some records may not shown):

        | Region                   | Avg_GDP           |
        |--------------------------|-------------------|
        | Western Europe           | 58130.96149553572 |
        | Nordic Countries         | 57073.99765625    |
        | North America            | 47911.509765625   |
        | Australia and New Zealand| 44792.384765625   |
        | British Islands          | 43588.330078125   |
        | Eastern Asia             | 24962.8076171875  |
        | Southern Europe          | 22926.410910866478|
        | Middle East              | 18204.641515395222|
        | Baltic Countries         | 12631.029947916666|
        | Caribbean                | 11413.339454064002|

    </details>


### Right Join 

1. Write a new query using RIGHT JOIN that produces an identical result to the LEFT JOIN provided.


    <details>
        <summary>Solution</summary>

        Run the command below:

        ```sql
        SELECT countries.name AS country, languages.name AS language, percent
        FROM languages
        RIGHT JOIN countries
        USING(code)
        ORDER BY language;
        ```

        Output (some records may not shown):


        | Country                | Language         | Percent |
        |------------------------|------------------|---------|
        | Ethiopia               | Afar             | 1.7     |
        | Djibouti               | Afar             | null    |
        | Eritrea                | Afar             | null    |
        | Namibia                | Afrikaans        | 10.4    |
        | South Africa           | Afrikaans        | 13.5    |
        | Ghana                  | Akyem            | 3.2     |
        | Albania                | Albanian         | 98.8    |
        | Macedonia              | Albanian         | 25.1    |
        | Switzerland            | Albanian         | 3       |
        | France                 | Alsatian         | null    |
        | Honduras               | Amerindian       | null    |

    </details>
