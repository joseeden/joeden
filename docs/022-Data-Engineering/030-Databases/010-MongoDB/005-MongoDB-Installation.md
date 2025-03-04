---
title: "MongoDB Installation"
description: "MongoDB Installation"
tags: [Data Engineering, Databases, MongoDB, NoSQL]
sidebar_position: 5
last_update:
  date: 2/27/2022
---


## Pre-requisites

- Three EC2 instances running RedHat Linux

## Basic Installation

We could follow the [official MongoDB Community Installation Guide](https://www.mongodb.com/docs/manual/administration/install-community/) which describes how to install MongoDB on Linux, MacOS, and Windows.

In our setup, we'll download the RPM file to our instance and then install the package using yum. To check out the current releases, check out this [page](https://www.mongodb.com/download-center/community/releases).

Connect to your EC2 instance using SSH and download the RPM file.

```bash
wget https://repo.mongodb.org/yum/redhat/8/mongodb-org/6.0/x86_64/RPMS/mongodb-org-server-6.0.1-1.el8.x86_64.rpm 
```

Install the package using yum.

```bash
sudo yum install -y mongodb-org-server-6.0.1-1.el8.x86_64.rpm 
```

Create a directory for the log and data. We can create this at the root.

```bash
cd /
sudo mkdir -p /data/mongodb/log  
sudo mkdir -p /data/mongodb/data
```

A **mongod** user should also be created when we installed the package. Change the ownership of the <code>/data/</code>.

```bash
sudo chown -R mongod:mongod /data/ 
```

Edit the configuration file and replace the **path** and **dbPath** with the new directories that we just created.

```bash
vim /etc/mongod.conf 
```
```bash
# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  #path: /var/log/mongodb/mongod.log
  path: /data/mongodb/log/mongod.log

# Where and how to store data.
storage:
  #dbPath: /var/lib/mongo
  dbPath: /data/mongodb/data/
  journal:
    enabled: true
```

```bash
mongod --dbpath " " 
sudo mongod --dbpath " " 
sudo mongod --fork --dbpath " " 
```

```bash
mongo 
```
