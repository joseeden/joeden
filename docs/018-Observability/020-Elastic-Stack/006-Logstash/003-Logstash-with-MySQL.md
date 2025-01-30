---
title: "Logstash with MySQL"
description: "Logstash with MySQL"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Logstash
sidebar_position: 3
last_update:
  date: 3/28/2023
---

## Overview

This lab focuses on integrating Logstash with MySQL to ingest data into Elasticsearch.

- Set up the MySQL server and the movie database from the dataset
- Install the JDBC connector on Logstash
- Configure Logstash to ingest data from MySQL
- Verify successful indexing in Elasticsearch
- Query the indexed data

## Lab Environment 

| Node    | Hostname       | IP Address       | Port  |
|---------|----------------|------------------|-------|
| Node 1  | elasticsearch  |  192.168.56.101  | 9200  |
| Node 2  | logstash       |  192.168.56.102  |       |
| Node 4  | mysql          |  192.168.56.104  | 3306  |

Setup details:

- The nodes are running Ubuntu Linux 22.04
- The nodes are created in VirtualBox using Vagrant.
- An SSH key is generated on the Elasticsearch node
 
- The Logstash node can reach Elasticsearch node via port 9200 
- The Logstash node can reach MySQL node via port 3306

## Pre-requisites 

- [Create the nodes in VirtualBox](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#setup-the-virtual-machines)
- [Setup fileshare on the Virtual Machines](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare)
- [Install Elasticsearch on node 1](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#install-elasticsearch-817)
- [Install Logstash on node 2](/docs/018-Observability/020-Elastic-Stack/006-Logstash/001-Installing-Logstash.md)
- [Configure SSL on Elasticsearch](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/003-SSL-Configuration.md)
- [Share Elasticsearch CA cert to Logstash](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#share-the-certificate-to-other-vms-optional)
- [Install jq on Elasticsearch node](https://www.scaler.com/topics/linux-jq/)

## Install MySQL on Node 4 

For the entire installation steps, please see [Offlne Install - MySQL](/docs/022-Data-Engineering/035-MySQL/001-Offline-Install.md).

## Download the Dataset 

1. This guide uses a dataset of film reviews. Download the dataset from the link below:

    - [ml-100k.zip](@site/assets/elastic-stack/ml-100k.zip)

2. Unzip the file and move the folder to `/tmp`

    ```bash
    unzip ml-100k.zip
    cp -r ml-100k /tmp
    cd /tmp/ml-100k/
    ```

3. Verify the folder contains the datasets:

    ```bash
    ls -la
    ```

    Output:

    ```bash
    total 15784
    drwxr-x---  2 root root    4096 Dec 24 17:17 .
    drwxrwxrwt 11 root root    4096 Dec 24 17:17 ..
    -rwxr-x---  1 root root    6750 Dec 24 17:17 README
    -rwxr-x---  1 root root     716 Dec 24 17:17 allbut.pl
    -rwxr-x---  1 root root     643 Dec 24 17:17 mku.sh
    -rwxr-x---  1 root root 1979173 Dec 24 17:17 u.data
    -rwxr-x---  1 root root     202 Dec 24 17:17 u.genre
    -rwxr-x---  1 root root      36 Dec 24 17:17 u.info
    -rwxr-x---  1 root root  236344 Dec 24 17:17 u.item
    -rwxr-x---  1 root root     193 Dec 24 17:17 u.occupation
    -rwxr-x---  1 root root   22628 Dec 24 17:17 u.user
    -rwxr-x---  1 root root 1586544 Dec 24 17:17 u1.base
    -rwxr-x---  1 root root  392629 Dec 24 17:17 u1.test
    -rwxr-x---  1 root root 1583948 Dec 24 17:17 u2.base
    -rwxr-x---  1 root root  395225 Dec 24 17:17 u2.test
    -rwxr-x---  1 root root 1582546 Dec 24 17:17 u3.base
    -rwxr-x---  1 root root  396627 Dec 24 17:17 u3.test
    -rwxr-x---  1 root root 1581878 Dec 24 17:17 u4.base
    -rwxr-x---  1 root root  397295 Dec 24 17:17 u4.test
    -rwxr-x---  1 root root 1581776 Dec 24 17:17 u5.base
    -rwxr-x---  1 root root  397397 Dec 24 17:17 u5.test
    -rwxr-x---  1 root root 1792501 Dec 24 17:17 ua.base
    -rwxr-x---  1 root root  186672 Dec 24 17:17 ua.test
    -rwxr-x---  1 root root 1792476 Dec 24 17:17 ub.base
    -rwxr-x---  1 root root  186697 Dec 24 17:17 ub.test 
    ```


## Create User Account 

Login to the MySQL node and switch to **root** user:

1. Connect to MySQL database.

    ```bash
    mysql -u root -p
    ```

2. Create the user in MySQL. The IP Address is here the Logstash node.

    ```sql
    CREATE USER 'operator'@'192.168.56.103' IDENTIFIED BY 'enter-password-here';  
    ```

3. Grant full privileges to the user on all databases and tables. 

    ```sql
    GRANT ALL PRIVILEGES ON *.* TO 'operator'@'192.168.56.103';
    FLUSH PRIVILEGES;
    ```

This MySQL user will be specified in the [Logstash configuration file.](#configure-logstash)

## Create the Database 

1. Login to the MySQL node and edit the MySQL configuration file:

    ```bash
    sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
    ```

    Add or update the following line under the `[mysqld]` section:

    ```bash
    local_infile=1
    ```

    :::info

    The dataset will be loaded into MySQL using the `LOAD DATA` command on a later step.
    `LOAD DATA` is disabled by default. To enable this feature:

    - On the server side: Modify `mysqld.cnf`.
    - On the client side: Use the `--local-infile` flag when connecting to MySQL.

    :::

2. Restart MySQL to apply the changes:

    ```bash
    sudo systemctl restart mysql
    ```

3. Verify that `local_infile` is enabled:

    ```sql
    SHOW VARIABLES LIKE 'local_infile';
    ```

    It should return:

    ```
    +---------------+-------+
    | Variable_name | Value |
    +---------------+-------+
    | local_infile  | ON    |
    +---------------+-------+
    ```


4. Connect to MySQL with the `--local-infile` option. Provide the root password when prompted.

    ```bash
    mysql --local-infile -u root -p
    ```

5. Create a database for the dataset.

    ```sql
    CREATE DATABASE movielens; 
    ```

6. Create a table to store the data and define the schema.

    ```sql
    CREATE TABLE movielens.movies (
      movieID INT PRIMARY KEY NOT NULL,
      title TEXT,
      releaseDATE DATE
    );
    ```

## Import Dataset into MySQL

1. Load the dataset into the table.

    ```sql
    LOAD DATA LOCAL INFILE 'u.item'
    INTO TABLE movielens.movies
    FIELDS TERMINATED BY '|'
    LINES TERMINATED BY '\n'
    (movieID, title, @var3)
    SET releaseDATE = STR_TO_DATE(@var3, '%d-%b-%Y');
    ```

    Expected output:

    ```bash
    Query OK, 1682 rows affected, 1683 warnings (0.03 sec)
    Records: 1682  Deleted: 0  Skipped: 0  Warnings: 1683
    ```

    If you encounter the error below, proceed to step 2. 
    If there is no error, skip to step 4.

    ```bash
    ERROR 1300 (HY000): Invalid utf8mb4 character string: '' 
    ```



2. (Optional) Look for special symbols like `^M`, `\r`, or non-printable characters.

    ```bash
    cat -A u.item | less
    ```

    Remove Hidden Characters: Use `tr` or `sed` to clean the file:

    ```bash
    tr -cd '\11\12\15\40-\176' < u.item > u_cleaned.item
    ```

    Alternatively, remove specific carriage returns:

    ```bash
    sed -i 's/\r//g' u_cleaned.item
    ```

3. (Optional) After cleaning the file, try loading the new dataset.

    ```sql
    LOAD DATA LOCAL INFILE 'u_cleaned.item'
    INTO TABLE movielens.movies
    FIELDS TERMINATED BY '|'
    LINES TERMINATED BY '\n'
    (movieID, title, @var3)
    SET releaseDATE = STR_TO_DATE(@var3, '%d-%b-%Y');
    ```

    It should return...

    ```bash
    Query OK, 1682 rows affected, 1683 warnings (0.03 sec)
    Records: 1682  Deleted: 0  Skipped: 0  Warnings: 1683
    ```


4. Additonal check: Ensure the movies table matches the data.

    ```sql
    DESCRIBE movielens.movies;
    ```

    Output:

    ```sql
    +-------------+------+------+-----+---------+-------+
    | Field       | Type | Null | Key | Default | Extra |
    +-------------+------+------+-----+---------+-------+
    | movieID     | int  | NO   | PRI | NULL    |       |
    | title       | text | YES  |     | NULL    |       |
    | releaseDATE | date | YES  |     | NULL    |       |
    +-------------+------+------+-----+---------+-------+
    3 rows in set (0.01 sec)
    ```


5. Validate Data.

    ```sql
    SELECT * FROM movielens.movies LIMIT 10;  
    ```

    Output:

    ```sql 
    +---------+------------------------------------------------------+-------------+
    | movieID | title                                                | releaseDATE |
    +---------+------------------------------------------------------+-------------+
    |       1 | Toy Story (1995)                                     | 1995-01-01  |
    |       2 | GoldenEye (1995)                                     | 1995-01-01  |
    |       3 | Four Rooms (1995)                                    | 1995-01-01  |
    |       4 | Get Shorty (1995)                                    | 1995-01-01  |
    |       5 | Copycat (1995)                                       | 1995-01-01  |
    |       6 | Shanghai Triad (Yao a yao yao dao waipo qiao) (1995) | 1995-01-01  |
    |       7 | Twelve Monkeys (1995)                                | 1995-01-01  |
    |       8 | Babe (1995)                                          | 1995-01-01  |
    |       9 | Dead Man Walking (1995)                              | 1995-01-01  |
    |      10 | Richard III (1995)                                   | 1996-01-22  |
    +---------+------------------------------------------------------+-------------+
    ```

6. Check for errors or warnings.

    ```sql
    SHOW WARNINGS;
    ```

7. Test another query.

    ```sql
    SELECT * FROM movielens.movies WHERE title LIKE 'Star%';  
    ```

    Output:

    ```sql
    +---------+------------------------------------------------+-------------+
    | movieID | title                                          | releaseDATE |
    +---------+------------------------------------------------+-------------+
    |      50 | Star Wars (1977)                               | 1977-01-01  |
    |      62 | Stargate (1994)                                | 1994-01-01  |
    |     222 | Star Trek: First Contact (1996)                | 1996-11-22  |
    |     227 | Star Trek VI: The Undiscovered Country (1991)  | 1991-01-01  |
    |     228 | Star Trek: The Wrath of Khan (1982)            | 1982-01-01  |
    |     229 | Star Trek III: The Search for Spock (1984)     | 1984-01-01  |
    |     230 | Star Trek IV: The Voyage Home (1986)           | 1986-01-01  |
    |     271 | Starship Troopers (1997)                       | 1997-01-01  |
    |     380 | Star Trek: Generations (1994)                  | 1994-01-01  |
    |     449 | Star Trek: The Motion Picture (1979)           | 1979-01-01  |
    |     450 | Star Trek V: The Final Frontier (1989)         | 1989-01-01  |
    |    1068 | Star Maker, The (Uomo delle stelle, L') (1995) | 1996-03-01  |
    |    1265 | Star Maps (1997)                               | 1997-01-01  |
    |    1293 | Star Kid (1997)                                | 1998-01-16  |
    |    1464 | Stars Fell on Henrietta, The (1995)            | 1995-01-01  |
    +---------+------------------------------------------------+-------------+
    15 rows in set (0.00 sec)
    ```


## Install the JDBC Driver 

On a computer with internet access: 

1. Go to MySQL Community Downloads > Select operating system > Ubuntu Linux.

3. Select the version compatible with your OS and download.

    :::info

    This lab is using Ubuntu Linux 22.04.

    :::

    ![](/img/docs/12252024-es-logstash-jdbc-driver-download.png)

4. When prompted to sign up, click **No thanks, just start my download.**

5. Copy the files to a [local folder mapped to a fileshare in you VM](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare).

    :::info 

    For this lab, I've mapped a local folder to `/mnt/fileshare` on all VMs.

    :::


## Configure Logstash 

Login to the Logstash node and switch to **root** user:

1. Access the transferred file and copy JDBC Connector files to `/tmp`.

    ```bash
    cp /mnt/fileshare/mysql/mysql-connector-j_9.1.0-1ubuntu22.04_all.deb /tmp/  
    cd /tmp
    ```

2. Install the package.

    ```bash
    dpkg -i mysql-connector-j_9.1.0-1ubuntu22.04_all.deb
    ```

3. Check if the JAR file is installed in the expected directory.

    ```bash
    find /usr/share/java -name "mysql-connector-java*.jar"
    ```

    Output:

    ```bash
    /usr/share/java/mysql-connector-java-9.1.0.jar 
    ```

4. Verify that the Logstash node can reach MySQL node via port 3306

    ```bash
    $ telnet 192.168.56.104 3306

    Trying 192.168.56.104...
    Connected to 192.168.56.104.
    Escape character is '^]'. 
    ```

5. Create the `mysql.conf` file.

    ```bash
    sudo vi /etc/logstash/conf.d/mysql.conf 
    ```

    Use the configuration file below:

    ```bash
    input {
        jdbc {
            jdbc_driver_library => "/usr/share/java/mysql-connector-java-9.1.0.jar"
            jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
            jdbc_connection_string => "jdbc:mysql://192.168.56.104:3306/movielens"  ## address of database
            jdbc_user => "operator"
            jdbc_password => "enter-password-here"
            #schedule => "* * * * *"  # Adjust as needed
            statement => "SELECT * FROM movies"
        }
    }

    output {
        stdout { codec => json_lines }
        elasticsearch {
            hosts => ["$ELASTIC_ENDPOINT:9200"]    ## address of elasticsearch node
            index => "movielens-sql"
            user => "elastic"
            password => "enter-password-here"
            ## password => enter-password-here
            ssl => true
            cacert => "/usr/share/ca-certificates/elastic-ca.crt"   ## Shared Elasticsearch CA certificate path
        }
    }
    ```

    This configuration:
    
    - Retrieves data from the movies table in a MySQL database 
    - Sends data to Elasticsearch 
    - JDBC input plugin connects to the database using the credentials 
    - Output plugin sends data to `movielens-sql` index with SSL encryption.


6. Start Logstash with the updated configuration:

    ```bash
    /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/mysql.conf
    ```

    If there are no errors, the output will display the dataset being ingested into Elasticsearch. Once done, you should see the following: 

    ```bash
    [INFO ] 2024-12-24 21:09:21.947 [[main]-pipeline-manager] javapipeline - Pipeline terminated {"pipeline.id"=>"main"}
    [INFO ] 2024-12-24 21:09:21.964 [Converge PipelineAction::Delete<main>] pipelinesregistry - Removed pipeline from registry successfully {:pipeline_id=>:main}
    [INFO ] 2024-12-24 21:09:21.997 [LogStash::Runner] runner - Logstash shut down.      
    ```

## Verify Data in Elasticsearch

Login to the Elasticsearch node and switch to **root** user:

1. First, store the Elasticsearch endpoint and credentials in variables:  

    ```bash
    ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
    ELASTIC_USER="your-username"
    ELASTIC_PW="your-password"
    ```  

2. Verify that the `movielens-sql` index has been created.

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/_cat/indices?v
    ```

    Output:

    ```bash
    health status index              uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
    yellow open   movielens-sql      GhfPWKYBQgumzbDiBPONTQ   1   1       1682            0    282.8kb        282.8kb      282.8kb
    yellow open   shakespeare        umINGu-cQGykbRmDb4BmZQ   1   1     111396            0       19mb           19mb         19mb
    yellow open   shakespeare-sample Z1Akxga4SqKT8mmrhScvyw   1   1          0            0       249b           249b         249b 
    ```

3. To search for a specific movie, run the following:

    ```bash
    curl -s -u $ELASTIC_USER:$ELASTIC_PW \
    -H 'Content-Type: application/json' \
    -XGET $ELASTIC_ENDPOINT:9200/movielens-sql/_search?q=title:Terminator&pretty | jq
    ```

    Sample output:

    ```bash
    {
      "took": 7,
      "timed_out": false,
      "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
      },
      "hits": {
        "total": {
          "value": 2,
          "relation": "eq"
        },
        "max_score": 7.205778,
        "hits": [
          {
            "_index": "movielens-sql",
            "_id": "qBqA-pMBWFPC_Q3Dto7V",
            "_score": 7.205778,
            "_source": {
              "movieid": 195,
              "@version": "1",
              "releasedate": "1984-01-01T00:00:00.000Z",
              "@timestamp": "2024-12-24T21:09:17.277354657Z",
              "title": "Terminator, The (1984)"
            }
          },
          {
            "_index": "movielens-sql",
            "_id": "JBqA-pMBWFPC_Q3Dt4-Y",
            "_score": 5.8547363,
            "_source": {
              "movieid": 96,
              "@version": "1",
              "releasedate": "1991-01-01T00:00:00.000Z",
              "@timestamp": "2024-12-24T21:09:17.092565174Z",
              "title": "Terminator 2: Judgment Day (1991)"
            }
          }
        ]
      }
    } 
    ```