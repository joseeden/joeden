---
title: "Apache Hadoop"
description: "Apache Hadoop"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Apache Hadoop
sidebar_position: 1
# last_update:
#   date: 3/28/2023
---

## Overview 

When handling petabytes of data, Hadoop enables efficient processing by utilizing multiple computers to process data in parallel.  

- Expand storage capacity as data grows  
- Each computer added enhances the **Hadoop Distributed Filesystem (HDFS)**  
- Built to continue operations even if some computers fail  
- Distributes data across separate hardware  

This lab demonstrates how to integrate Elasticsearch with Apache Hadoop to process large datasets. 

- Use an Apache access log as an example of big data.  
- Write a simple MapReduce job to ingest the file with Hadoop  
- Index the ingested data into Elasticsearch  

## Lab Environment 

| Node    | Hostname       | IP Address       | 
|---------|----------------|------------------|
| Node 1  | elasticsearch  |  192.168.56.101  |
| Node 2  | logstash       |  192.168.56.102  |
| Node 3  | kibana         |  192.168.56.103  |
| Node 4  | hadoop         |  192.168.56.104  |

Setup details:

- The nodes are created in VirtualBox using Vagrant.
- An SSH key is generated on the Elasticsearch node
- The SSH key is shared to the Logstash node.

## Pre-requisites 

- [Create the nodes in VirtualBox](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#setup-the-virtual-machines)
- [Install Elasticsearch on node 1](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md#install-elasticsearch-817)
- [Install Logstash on node 2](/docs/018-Observability/020-Elastic-Stack/006-Logstash/001-Installing-Logstash.md)
- [Configure SSL on Elasticsearch](/docs/018-Observability/020-Elastic-Stack/002-Setting-up/003-SSL-Configuration.md)
- [Install jq on the nodes](https://www.scaler.com/topics/linux-jq/)

## Choosing the Right Tool

Hadoop, Elasticsearch, and Logstash each have unique strengths for data management and analysis.  

- **Hadoop**  
  - Handles large-scale data ingestion from billions of sources  
  - Processes data in parallel across clusters  
  - Suitable for initial collection and raw data processing  

- **Elasticsearch**  
  - Stores and indexes data for fast retrieval  
  - Optimized for full-text searches and complex queries  
  - Ideal for quick data access and user-friendly search results  

- **Logstash**  
  - Collects and processes real-time data  
  - Converts raw data into structured formats  
  - Acts as a bridge between data sources and Elasticsearch  

Working together, Hadoop collects and processes vast amounts of data, Logstash organizes and forwards it, and Elasticsearch stores and retrieves it quickly for user searches.

## How MapReduce Works  

MapReduce processes data through three stages: map, shuffle, and reduce. It allows fine-tuned customization and optimization for efficient data processing.  

![](/img/docs/01052025-logstash-hadoop-mapreduce.png)  

Initially, the data is split into smaller chunks that are distributed across different computing nodes.  

1. Nodes map the data into key-value pairs.  
2. Values with the same keys are grouped together during the shuffle stage.  
3. Shuffled data is simplified for processing in the reduce stage.  
4. The output is the final aggregated result.  

## Offline Installation 

In a production enterprise setup, Hadoop nodes are typically placed in a private network to enhance security and control access. Offline installation is generally recommended for such setups.

1. On a computer with internet access, download the latest Hadoop version.

    ```bash
    wget https://dlcdn.apache.org/hadoop/common/hadoop-3.4.1/hadoop-3.4.1.tar.gz 
    ```

    For more information, please see [Hadoop downloads.](https://www.apache.org/dyn/closer.cgi/hadoop/common/)

2. Copy the files to the virtual machine. [If you are using VirtualBox in your computer, you can map local folder to a fileshare in you VM](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare).

3. Login to your VM and create the `hadoop` user and add it to the sudoers group.

    ```bash
    sudo useradd hadoop
    sudo passwd hadoop
    sudo usermod -aG sudo hadoop 
    ```

4. Proceed to the directory where the Hadoop package is stored and unzip the file.

    ```bash
    cd /mnt/fileshare/hadoop
    cp hadoop* /tmp
    tar -xvzf hadoop-3.4.1.tar.gz -C /usr/local
    mv /usr/local/hadoop-3.4.1 /usr/local/hadoop
    ```

8. Change the ownership  of the Hadoop directory.

    ```bash
    sudo chown -R hadoop:hadoop /usr/local/hadoop 
    ```

9. Before anything else, verify the required packages on the VM.

    - Check if Java is installed.

      ```bash
      java -version
      dpkg -l | grep openjdk
      ```

      If Java is installed, you'll see output similar to:

      ```bash
      openjdk version "11.0.25" 2024-10-15
      OpenJDK Runtime Environment (build 11.0.25+9-post-Ubuntu-1ubuntu122.04)
      OpenJDK 64-Bit Server VM (build 11.0.25+9-post-Ubuntu-1ubuntu122.04, mixed mode, sharing)
      ```

      If Java is not installed, you can install it:

      ```bash
      sudo apt install -y openjdk-11-jdk
      sudo apt install -y openjdk-8-jdk   # (Optional) Install Java 8 if needed
      ```

      You can choose between installed Java versions if multiple are available.

      ```bash
      sudo update-alternatives --config java
      ```

      Output:

      ```bash
      There is only one alternative in link group java (providing /usr/bin/java): /usr/lib/jvm/java-11-openjdk-amd64/bin/java
      Nothing to configure. 
      ```

    - Check if `libsnappy` is installed:

      ```bash
      dpkg -l | gxrep libsnappy
      ```    

      If not installed, you can install it:

      ```bash
      sudo apt install -y libsnappy-dev
      ```

    - Check if `zlib` is installed:

      ```bash
      dpkg -l | grep zlib
      ```

      If not installed, you can install it:

      ```bash
      sudo apt install zlib1g-dev 
      ```

    - Verify Python installation.

      ```bash
      python3 --version
      ```

      You can install Python 3 on Ubuntu using:

      ```bash
      sudo apt update
      sudo apt install python3 
      ``` 

10. After installing the pre-requisites, proceed with the installation. 

11. Add the following to `~/.bashrc` or `/etc/profile`:

    ```bash
    cat >>  ~/.bashrc
    ```

    Enter the following: 

    ```bash
    export HADOOP_HOME=/usr/local/hadoop
    export HADOOP_INSTALL=$HADOOP_HOME 
    export HADOOP_MAPRED_HOME=$HADOOP_HOME
    export HADOOP_COMMON_HOME=$HADOOP_HOME
    export HADOOP_HDFS_HOME=$HADOOP_HOME
    export YARN_HOME=$HADOOP_HOME
    export HADOOP_COMMON_LIB_BNTIVE_DIR=$HADOOP_HOME/lib/native
    export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
    export HADOOP_OPTS="-Djava.library.path=$HADOOP_HOME/lib/native"
    export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
    ```

12. Reload the shell.

    ```bash
    source ~/.bashrc
    ```

13. Verify Installation:

    ```bash
    hadoop version 
    ```

    Output:

    ```bash
    Hadoop 3.4.1
    Source code repository https://github.com/apache/hadoop.git -r 4d7825309348956336b8f06a08322b78422849b1
    Compiled by mthakur on 2024-10-09T14:57Z
    Compiled on platform linux-x86_64
    Compiled with protoc 3.23.4
    From source with checksum 7292fe9dba5e2e44e3a9f763fce3e680
    This command was run using /usr/local/hadoop/share/hadoop/common/hadoop-common-3.4.1.jar 
    ```

<!-- 8. Run a simple test, such as starting the Hadoop services or using hdfs commands

    ```bash
    hdfs dfs -ls /
    ```

    Output:

    ```bash
      
    ``` -->


## Download the Sample Log File 

A sample log file will be used to simulate big data for this project. This file will be imported into Elasticsearch for further processing. The log file will serve as the input for the MapReduce job.

Download the file here: [hadoop-apache-access.log](@site/assets/elastic-stack/sample-logs/hadoop-apache-access.log)

After you download the log file, you can transfer the file to your node. [If you are using VirtualBox in your computer, you can map local folder to a fileshare in you VM](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare).


## MapReduce Project 

:::info 

This section covers the theory behind the MapReduce project.

To save time, you can clone the GitHub repository that contains the sample source code.

For more information, please see [Clone the Project Repository](#clone-the-project-repository).

::: 

To compile the MapReduce code into a JAR file, we'll need throws use Maven. In a real-world scenario, there are additional steps:

1. Use an IDE to create the project and write the code.
2. Compile the code into a JAR file with Maven on your local machine.
3. Transfer the JAR file to the Hadoop instance.

**Maven Setup**

1. Create an empty Maven project using your IDE.
2. Skip the archetype selection since you only need an empty project.
3. After the project is created, modify the `pom.xml` file with the following properties:

    ```xml
    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-client</artifactId>
            <version>3.2.1</version>
        </dependency>
        <dependency>
            <groupId>org.elasticsearch</groupId>
            <artifactId>elasticsearch-hadoop-mr</artifactId>
            <version>7.8.0</version>
        </dependency>
        <dependency>
            <groupId>commons-httpclient</groupId>
            <artifactId>commons-httpclient</artifactId>
            <version>3.1</version>
        </dependency>
    </dependencies>
    ```

    **Notes:**
    - Update the version numbers based on your setup.
    - The `elasticsearch-hadoop-mr` library is used to write to Elasticsearch.
    - The `commons-httpclient` library allows Hadoop to make REST calls to the Elasticsearch server.

4. Define the access log mapper class and override the default map method with the logic you need:

    ```java
    import org.apache.hadoop.mapreduce.Mapper;
    import java.io.IOException;

    public class AccessLogIndexIngestion {

        public static class AccessLogMapper extends Mapper<Object, Object, Text, IntWritable> {
            @Override
            protected void map(Object key, Object value, Context context) throws IOException, InterruptedException {
                // Implement your map logic here
            }
        }

        public static void main(String[] args) {
            // Main method logic
        }
    }
    ```


## Build the JAR File

Github repository: [test-maven-project](https://github.com/joseeden/test-maven-project)

1. On a computer with internet access, clone the repository:

    ```bash
    git clone https://github.com/joseeden/test-maven-project.git
    ```

2. Install Maven:

    ```bash
    sudo apt install -y maven 
    ```

3. Proceed to the project directory and build the JAR file.

    ```bash
    mvn clean package 
    ```

4. If successful, you should see a build success message:

    ```bash
    [INFO] ------------------------------------------------------------------------
    [INFO] BUILD SUCCESS
    [INFO] ------------------------------------------------------------------------
    [INFO] Total time:  36.095 s
    [INFO] Finished at: 2025-01-05T17:03:43+08:00
    [INFO] ------------------------------------------------------------------------
    ```

5. Copy the JAR file onto the Hadoop node. [If you are using VirtualBox in your computer, you can map local folder to a fileshare in you VM](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare).


## Create the Elasticsearch Index 

Login to the Elasticsearch node and run the following command to create an Elasticsearch index. Make sure to change the password and the IP address for your Elasticsearch node.

```bash
curl -s -u elastic:elastic \
-H 'Content-Type: application/json' \
-X PUT "https://192.168.56.101:9200/logs?pretty" -d'  
{
  "mappings": {
    "properties": {
      "ip": { "type": "keyword" },
      "dateTime": { "type": "date", "format": "dd/MMM/yyyy:HH:mm:ss" },
      "httpstatus": { "type": "keyword" },
      "url": { "type": "keyword" },
      "responseCode": { "type": "keyword" },
      "size": { "type": "integer" }
    }
  }
}' | jq
```

The `dateTime` field is defined as a date, which allows us to visualize various metrics using Kibana. The date format is also specified to ensure that values passed to Elasticsearch are parsed correctly.

If the index is created correctly, you should see:

```json
{
  "acknowledged": true,
  "shards_acknowledged": true,
  "index": "logs"
} 
```

Another way it to check the indices:

```bash 
curl -u elastic:elastic --insecure \
-X GET "https://192.168.56.101:9200/_cat/indices?v"
```

Output:

```bash 
health status index uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
yellow open   logs  wpxLIsW1TCOqAnpUl2SGKg   1   1          0            0       227b           227b         227b
```

## Running the Hadoop Job

Login to the Hadoop node.

1. Switch to `hadoop` user. Ensure both the sample log file and the JAR file is copied over.

    ```bash
    su - hadoop
    mkdir /tmp/hadoop
    cp /mnt/fileshare/logs/hadoop-apache-access.log /tmp/hadoop/
    cp /mnt/fileshare/hadoop/test-maven-project-1.0.jar /tmp/hadoop/
    cd /tmp/hadoop
    ```

    In this step, I created the `/tmp/hadoop` directory and copied over both files.

2. Execute the Hadoop JAR file with the log file as input.  

    ```bash
    hadoop jar test-maven-project-1.0.jar hadoop-apache-access.log
    ```

## Verify the Index 

Login to the Elasticsearch node and switch to **root**. 

Verify the index is created:

```bash
curl -u elastic:elastic --insecure \
-X GET "https://192.168.56.101:9200/_cat/indices?v"
```

Output:

```bash
health status index uuid                   pri rep docs.count docs.deleted store.size pri.store.size dataset.size
yellow open   logs  wpxLIsW1TCOqAnpUl2SGKg   1   1      10000                       0        805.2kb      805.2kb     
```

## Visualize in Kibana 

TODO....



## Cleanup 

Use the command below to delete the indices after the lab. Make sure to replace `enter-name` with the index name.

```bash
curl -s -u elastic:<password>  \
-H 'Content-Type: application/json' \
-XDELETE "https://127.0.0.1:9200/enter-name" | jq
```