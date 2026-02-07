---
title: "Managing Views"
description: "Database Design"
tags:
- Data Engineering
- Databases
- Database Design
sidebar_position: 7
last_update:
  date: 10/15/2019
---


## Creating More Complex Views

Views in SQL can be as simple or complex as needed, incorporating aggregations, joins, and conditional logic. When designing a view, keep in mind that complex queries might have longer execution times.

For more information, please see [Database Views.](./006-Database-Views.md)




## Updating a View

Users with the right privileges can update views. When updating a view, you are actually modifying the underlying tables. Not all views are updatable though; typically, they must be based on a single table and not use complex functions.

Here's an example of the `UPDATE` command:

```sql
UPDATE films SET kind = "Dramatic" WHERE kind = "Drama"
```

Criteria for updating views:

- View is made up of one table 
- Doesn't use a window or aggregate function


## Inserting into a View    

Inserting into a view works similarly to updating, targeting the underlying table. However, it's best practice to treat views as read-only to avoid complications.

Sample SQL command:

```sql
INSERT INTO films (
    code,
    title,
    did,
    date_prod,
    kind 
)
VALUES (
    "STAR-268",
    "Faleno",
    "268",
    "2021-05-14",
    "Comedy"
) 
```

## Dropping a View

To remove a view, use the `DROP` command. Be aware of dependencies, as views can be part of a chain in larger databases.

  - **RESTRICT**: Prevents dropping if dependencies exist.
  - **CASCADE**: Drops the view and any dependent objects.

Sample command:

```sql
DROP VIEW view_name CASCADE
DROP VIEW view_name RESTRICT
```

## Redefining a View

You can change a view's query with `CREATE OR REPLACE`. The new query must maintain the same structure as the existing one. 
```sql
CREATE OR REPLACE VIEW view_name AS new_query;
```

Note: 

- If a view with `view_name` exists, it is replaced
- `new_query` must generate the same column names, order, and data types as the old query
- The column output may be different
- New columns may be added at the end

If these criterias isn't possible, drop the existing view and create a new one.


## Altering a View

Auxiliary properties of a view, such as name, owner, or schema, can be modified using the `ALTER VIEW` command.

```sql
ALTER VIEW [ IF EXISTS ] name ALTER [ COLUMN ] column_name SET DEFAULT expression
ALTER VIEW [ IF EXISTS ] name ALTER [ COLUMN ] column_name DROP DEFAULT
ALTER VIEW [ IF EXISTS ] name OWNER TO new_owner
ALTER VIEW [ IF EXISTS ] name RENAME TO new_name
ALTER VIEW [ IF EXISTS ] name SET SCHEMA new_schema
ALTER VIEW [ IF EXISTS ] name SET ( view_option_name [= view_option_value] [,...] )
ALTER VIEW [ IF EXISTS ] name RESET ( view_option_name [, ...] )
```


## More Examples 

### Sample Dataset 

We will use a database of Pitchfork reviews sourced from Kaggle. Pitchfork is a music magazine known for publishing reviews. 

<div class='img-center'>

![](/img/docs/database-view-sample-tables-pithfork-from-kaggleeee.png)

</div>

The database schema includes a main table named `Reviews`, which contains:

- URL of the review
- The title of the work being reviewed
- score. 
- Details about the author and the publication date. 

The `reviewid` field acts as a foreign key linking to several other tables: 

- `content` 
- `genres` 
- `artist`  
- `labels`

The `content` table holds the text of the review.

### Download the dataset 

You can download the dataset here: https://www.kaggle.com/nolanbconaway/pitchfork-data
It will download an archive.zip file. Unzip it and check that you have a database.sqlite file inside. You can rename the sqlite file to pitchfork.sqlite. 

Then go to [SQLite Viewer](https://inloop.github.io/sqlite-viewer/) and upload the file.
You can now view the tables and even test some queries from your browser.

<div class='img-center'>

![](/img/docs/sqlite-view-it-online-just-upload-sqlite-file.png)

</div>

### Create the views 

Create the required views:

- `top_15_2017`
- `artist_title`
- `long_reviews`

<details>
    <summary>Solution</summary>

Create the first one:

```sql
CREATE VIEW top_15_2017 AS 
SELECT 
  reviews.reviewid,
  reviews.title,
  reviews.score
FROM reviews
WHERE (reviews.pub_year = 2017)
ORDER BY reviews.score DESC
LIMIT 15;

SELECT * FROM top_15_2017;
```

![](/img/docs/pitchfork-create-view-top_15_2017.png)


Create the second view:

```sql
CREATE VIEW artist_title AS 
SELECT 
  reviews.reviewid,
  reviews.title,
  artists.artist
FROM (
  reviews
  JOIN artists 
  ON ((
    artists.reviewid = reviews.reviewid
    ))
  );
```

Note that if you try to run view this second view using `SELECT`, it may take a long time as there are a lot of records in the table. 

```sql
SELECT * FROM artist_title; 
```

![](/img/docs/pitchfork-create-view-artist_title.png)


Create the `long_reviews` view:

```sql
CREATE VIEW  AS 

SELECT 
  content.reviewid,
  content.content
FROM content
WHERE (length(content.content) > 4000);

SELECT * FROM long_reviews; 
```

![](/img/docs/pitchfork-create-view-long_reviews.png)


</details>


### Creating view from other views

To-dos:

1. Create a view called `top_artists_2017` with `artist` from `artist_title`.
2. To only return the highest scoring artists of 2017, join the views `top_15_2017` and `artist_title` on `reviewid`.
3. Output `top_artists_2017`.

<details>
    <summary>Solution</summary>

```sql
-- Create a view with the top artists in 2017
CREATE VIEW top_artists_2017 AS 

SELECT artist_title.artist
FROM artist_title
INNER JOIN reviewid
ON top_artists_2017.reviewid = artist_title.reviewid;

-- Output the new view
SELECT * FROM top_artists_2017; 
```

![](/img/docs/pitchfork-create-view-top_artists_2017.png)

</details>




### Redefining a View

To-dos:

1. Use CREATE OR REPLACE to redefine the artist_title view.
2. Respecting artist_title's original columns of reviewid, title, and artist, add a label column from the labels table.
3. Join the labels table using the reviewid field.

<details>
    <summary>Solution</summary>

The correct query is:

```sql
CREATE OR REPLACE VIEW artist_title AS

SELECT 
    reviews.reviewid, 
    reviews.title, 
    artists.artist, 
    labels.label
FROM reviews

INNER JOIN artists
ON artists.reviewid = reviews.reviewid

INNER JOIN labels
ON labels.reviewid = reviews.reviewid;

SELECT * FROM artist_title; 
```

![](/img/docs/pitchfork-redefining-view-artist_title.png)

We're able to successfully redefine the `artist_title` using the CREATE OR REPLACE statement. Note that if we want change the column orders, we will need to drop the table and create a new one with the same name.

</details>
