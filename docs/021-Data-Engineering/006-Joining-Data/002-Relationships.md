---
title: "Relationships"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 2
last_update:
  date: 2/27/2022
---



## One-to-Many 

The most common type of relationship in databases is the one-to-many relationship, where a single entity can be linked to multiple other entities. 

For example, Malcolm Gladwell has authored several books. We can put his book on a "books" table along with other books by other authors. We can then have a second table called "authors" which will contain several famous authors.

![](/img/docs/db-rs-one-to-many.png)

We could join the "books" table with the "authors" table using an "author_id" field that can be found in both tables.

```sql
SELECT authors.last_name, title
FROM authors
INNER JOIN books 
ON authors.author_id = books.author_id;
```

Output:

| last_name     | title                                                                             |
|----------|------------------------------------------------------------------------------------|
| Gladwell | The Tipping Point: How Little Things Can Make a Big Difference                     |
| Gladwell | Blink: The Power of Thinking Without Thinking                                      |
| Gladwell | Outliers: The Story of Success                                                     |
| Gladwell | What the Dog Saw: And Other Adventures                                             |
| Gladwell | David and Goliath: Underdogs, Misfits, and the Art of Battling Giants              |
| Gladwell | Talking to Strangers: What We Should Know about the People We Don’t Know           |
| Gladwell | The Bomber Mafia: A Dream, a Temptation, and the Longest Night of the Second World War |


## One-to-One 

A one-to-one relationship involves a unique pairing between entities, making it less common. An example is fingerprints: each fingerprint is unique to one person. 

![](/img/docs/db-rs-one-to-one-colored-image.png)

In the context of an airport's border control, a database might have a "people" table and a "fingerprints" table. Each person’s fingerprint is linked to their record in the "people" table via their passport number. 

![](/img/docs/db-rs-one-to-one.png)

Even though an individual has multiple fingerprints, they can be stored as different fields in a single record, maintaining a one-to-one relationship between a person and their set of fingerprints.


## Many-to-Many 

Many-to-many relationships occur when multiple entities can be associated with multiple other entities. An example is languages and countries. 

![](/img/docs/db-rs-many-to-many-colored-diagram.png)

Consider Germany, Belgium, and the Netherlands: each country can have multiple official languages, and a language can be official in multiple countries. For example, Belgium's official languages are French, German, and Dutch, while Dutch is also official in the Netherlands.
