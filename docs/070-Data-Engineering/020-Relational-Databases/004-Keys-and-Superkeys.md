---
title: "Keys and Superkeys"
description: "Relational Database"
tags:
- Data Engineering
- Databases
- SQL
sidebar_position: 4
last_update:
  date: 10/5/2019
---



## Overview

Keys in a database are attributes or combinations of attributes that uniquely identify records. While the entire table can act as a superkey, a true key is a minimal superkey, which means it cannot have any attributes removed without losing its unique identification ability. This minimal superkey is what we refer to as a "key."

- Keys uniquely identify records.
- Superkeys can have redundant attributes.
- Minimal superkeys are the true keys.

## Example: Keys

Below table listing six different cars. All the table's attributes combined form a superkey. 

| License No  | Serial No    | Model     | Make  | Year |
|-------------|--------------|-----------|-------|------|
| AB123CDE    | SN1234567890 | Civic     | Honda | 2020 |
| CD456EFG    | SN0987654321 | Accord    | Honda | 2019 |
| EF789GHI    | SN5678901234 | Model S   | Tesla | 2021 |
| GH012JKL    | SN3456789012 | Mustang   | Ford  | 2018 |
| IJ345MNO    | SN2345678901 | Corolla   | Toyota| 2017 |
| IJ345MNO    | SN2546464789 | Corolla   | Toyota| 2021 |
| KL678PQR    | SN6789012345 | Camry     | Toyota| 2022 |
| MN901STU    | SN8901234567 | Explorer  | Ford  | 2019 |
| OP234VWX    | SN9012345678 | Altima    | Nissan| 2020 |
| QR567YZA    | SN0123456789 | Rogue     | Nissan| 2021 |
| ST890BCD    | SN3450123456 | A4        | Audi  | 2018 |


If remove the `year` attribute, the records are still unique thus it still a superkey. There are other potential superkeys, each capable of uniquely identifying records. Among the various superkeys, there are four minimal superkeys: 

- `license_no`
- `serial_no`
- `model`
- Combination of `make` and `year` 

These minimal superkeys, also known as **candidate keys**, are sets of attributes that can uniquely identify each record in the table. None of these attributes can be removed without losing their uniqueness. Eventually one of these candidate keys will be selected as the primary key for the table.

## Identifying Keys 

There's a very basic way of finding out what qualifies for a key in an existing, populated table:

1. Count the distinct records for all possible combinations of columns. If the resulting number x equals the number of all rows in the table for a combination, you have discovered a superkey.

2. Then remove one column after another until you can no longer remove columns without seeing the number x decrease. If that is the case, you have discovered a (candidate) key.

## Example: Identifying Keys

We'll use the **languages** table. The dataset can be downloaded from my Github repository:

- [languages.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/languages.csv)

A preview of the table:

```sql
SELECT * 
FROM languages 
LIMIT 10; 
```

| lang_id | code | name        | percent | official |
|---------|------|-------------|---------|----------|
| 1       | AFG  | Dari        | 50      | True     |
| 2       | AFG  | Pashto      | 35      | True     |
| 3       | AFG  | Turkic      | 11      | False    |
| 4       | AFG  | Other       | 4       | False    |
| 5       | ALB  | Albanian    | 98.8    | True     |
| 6       | ALB  | Greek       | 0.5     | False    |
| 7       | ALB  | Other       | 0.6     | False    |
| 8       | ALB  | unspecified | 0.1     | False    |
| 9       | DZA  | Arabic      | NULL    | True     |
| 10      | DZA  | French      | NULL    | False    |


The steps are below:

1.  Find the number of records. We will use this value as the reference. Any combinations that return "995" is considered a superkey.

    ```sql
    SELECT COUNT(*)
    FROM languages; 
    ```

    Output:

    |count|
    |-----|
    | 955 |


2. Start by checking distinct combinations of all columns.

    ```sql
    SELECT COUNT(DISTINCT(lang_id, code, name, percent, official))
    FROM languages;
    ```

    Output:

    |count|
    |-----|
    | 955 |

    This combination is a superkey

3. Check distinct combinations of 4 columns.

    ```sql
    SELECT 
        COUNT(DISTINCT(lang_id, code, name, percent)),
        COUNT(DISTINCT(lang_id, code, name, official)),
        COUNT(DISTINCT(lang_id, code, percent, official)),	
        COUNT(DISTINCT(lang_id, name, percent, official)),
        COUNT(DISTINCT(code, name, percent, official))
    FROM languages;
    ```

    Output:

    | count | count | count | count | count |
    |-------|-------|-------|-------|-------|
    | 955   | 955   | 955   | 955   | 955   |

    These combinations are superkeys.

4. Check distinct combinations of 3 columns.

    ```sql
    SELECT 
        COUNT(DISTINCT(lang_id, code, name)),
        COUNT(DISTINCT(lang_id, code, percent)),
        COUNT(DISTINCT(lang_id, code, official)),
        COUNT(DISTINCT(lang_id, name, percent)),
        COUNT(DISTINCT(lang_id, name, official)),
        COUNT(DISTINCT(lang_id, percent, official)),
        COUNT(DISTINCT(code, name, percent)),
        COUNT(DISTINCT(code, name, official)),
        COUNT(DISTINCT(code, percent, official)),
        COUNT(DISTINCT(name, percent, official))
    FROM languages;     
    ```

    Output:

    | count | count | count | count | count | count | count | count | count | count |
    |-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|
    | 695   | 695   | 695   | 695   | 695   | 695   | 695   | 695   | 695   | 695   |

    These combinations are **NOT** superkeys

5. Check distinct combinations of 2 columns.

    ```sql
    SELECT 
        COUNT(DISTINCT(lang_id, code)),
        COUNT(DISTINCT(lang_id, name)),
        COUNT(DISTINCT(lang_id, percent)),
        COUNT(DISTINCT(lang_id, official)),
        COUNT(DISTINCT(code, name)),
        COUNT(DISTINCT(code, percent)),
        COUNT(DISTINCT(code, official)),
        COUNT(DISTINCT(name, percent)),
        COUNT(DISTINCT(name, official)),
        COUNT(DISTINCT(percent, official))
    FROM world.languages;
    ```

    Output:

    | count | count | count | count | count | count | count | count | count | count |
    |-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|
    | 273   | 273   | 273   | 273   | 273   | 273   | 273   | 273   | 273   | 273   |   

    These combinations are **NOT** superkeys
    
6. Check distinct combinations of single columns.

    ```sql
    SELECT 
        COUNT(DISTINCT(lang_id)),
        COUNT(DISTINCT(code)),
        COUNT(DISTINCT(name)),
        COUNT(DISTINCT(percent)),
        COUNT(DISTINCT(official))
    FROM world.languages;
    ```

    Output:

    | count | count | count | count | count |
    |-------|-------|-------|-------|-------|
    | 2   | 2   | 2   | 2   | 2   |
    
    Since these combinations returned the smallest, they're not superkeys and also not considered as candidate keys.


Based on the outputs, the following combinations are **superkeys**:

- `lang_id, code, name, percent, official`
- `lang_id, code, name, percent`
- `lang_id, code, name, official`
- `lang_id, code, percent, official`
- `lang_id, name, percent, official`
- `code, name, percent, official`

To find the **candidate keys**, we need to minimize the columns while still maintaining the unique identification of each row. The smallest combination from the superkeys list would be the candidate key. Since the distinct count dropped for three columns combinations, we can conclude that removing any one column from the four-column superkeys results in losing the uniqueness.

Thus, the **candidate keys** are the combinations of any four columns out of the five columns listed in the superkeys:

- `lang_id, code, name, percent`
- `lang_id, code, name, official`
- `lang_id, code, percent, official`
- `lang_id, name, percent, official`
- `code, name, percent, official`