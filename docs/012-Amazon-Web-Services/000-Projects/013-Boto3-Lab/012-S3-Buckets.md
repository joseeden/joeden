---
title: S3 Buckets
tags: 
- Amazon Web Services
- Labs
sidebar_position: 15
last_update:
  date: 7/29/2020
---


## Overview

Buckets are the main containers in S3 where we store files. 

- We can create, list, and delete buckets
- Buckets store objects, not other buckets
- Managing buckets is essential before working with files

## Creating the S3 Client

Before interacting with S3, we create a client using Boto3.

- The client lets us perform operations on buckets and objects
- Assign the client to a variable, often called `s3`
- The client handles authentication with your AWS key and secret

Creating the client is the first step before uploading, downloading, or listing files.

```python
import boto3

s3 = boto3.client(
    's3',
    region_name='us-east-1',
    aws_access_key_id='YOUR_KEY',
    aws_secret_access_key='YOUR_SECRET'
)
```


## Creating a Bucket

Creating a bucket is simple using Boto3.

- Use a Boto3 client to interact with S3
- Call `create_bucket` with a unique bucket name
- Bucket names must be unique across all of AWS

```python
import boto3

s3 = boto3.client('s3')
s3.create_bucket(Bucket='city-reports')
```

**Expected result:** The bucket `city-reports` is created and visible in the S3 console.


## Listing Buckets

We can see all the buckets in our account with Boto3.

- Call `list_buckets` on the S3 client
- The response includes metadata and a `Buckets` dictionary
- Iterate through the dictionary to see bucket names and creation dates


```python
buckets = s3.list_buckets()
for bucket in buckets['Buckets']:
    print(bucket['Name'], bucket['CreationDate'])
```

**Expected result:** 

```
city-reports 2025-10-20 09:00:00
```



## Deleting a Bucket

Buckets can be removed when no longer needed.

- Use `delete_bucket` with the bucket name
- If the bucket doesn’t exist, Boto3 will raise an error
- The bucket disappears from the console as well

```python
s3.delete_bucket(Bucket='city-reports')
```

**Expected result:** The `city-reports` bucket is deleted from S3.


## Other Bucket Operations

S3 supports more actions beyond create, list, and delete.

- You can configure bucket policies, ACLs, and versioning
- You can enable logging or replication for buckets
- Always check the Boto3 documentation for full capabilities


## Upload and Retrieve Files

Objects are the files stored in S3 buckets. They can be images, videos, CSVs, logs, or any type of file. Managing objects is a key part of data pipelines.

- Objects live in buckets, which act like folders
- Each object has a key, which is its path in the bucket
- Bucket names are unique across all S3, object keys are unique within a bucket

### Uploading Files

We can upload local files to S3 using the client.

- Use `upload_file` with `Filename`, `Bucket`, and `Key` parameters
- `Filename` is the local path, `Bucket` is the target bucket, `Key` is the object name in S3
- If an error occurs, an exception is thrown

```python
s3.upload_file('local/report.csv', 'city-data', 'reports/report.csv')
```

**Expected result:** The file `report.csv` appears in the `city-data` bucket.

### Listing Objects in a Bucket

We can see all objects in a bucket using `list_objects`.

- Pass the `Bucket` name to the method
- Use `MaxKeys` to limit results or `Prefix` to filter by key name
- The response dictionary has a `Contents` key with object info

```python
response = s3.list_objects(Bucket='city-data', MaxKeys=5)
for obj in response.get('Contents', []):
    print(obj['Key'], obj['LastModified'], obj['Size'])
```

**Expected result:** 

```
reports/report.csv 2025-10-20 08:30:00 1024
images/map.png 2025-10-19 12:45:00 20480
```


### Getting Object Metadata

For a single object, we can check metadata without listing all objects.

- Use `head_object` with the bucket name and object key
- The response dictionary contains metadata like size and modified date

```python
meta = s3.head_object(Bucket='city-data', Key='reports/report.csv')
print(meta['ContentLength'], meta['LastModified'])
```

**Expected result:** 

```
1024 2025-10-20 08:30:00
```

Metadata allows us to inspect files before downloading or processing them.


### Downloading Files

Files can be downloaded from S3 to local storage.

- Use `download_file` with local filename, bucket name, and object key
- The local path is where the file will be saved

```python
s3.download_file('city-data', 'reports/report.csv', 'local/report.csv')
```

**Expected result:** The file `report.csv` is downloaded to your local machine.


### Deleting Objects

Objects that are no longer needed can be removed.

- Use `delete_object` with bucket name and object key
- The object disappears from the bucket immediately

```python
s3.delete_object(Bucket='city-data', Key='reports/report.csv')
```

**Expected result:** `report.csv` is removed from the `city-data` bucket.
