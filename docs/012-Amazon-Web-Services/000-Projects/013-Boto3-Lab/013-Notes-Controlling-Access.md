---
title: "Notes: Controlling Access"
description: "Controlling access to S3 resources"
tags: 
- Linux
- Amazon Web Services
- Labs
sidebar_position: 15
last_update:
  date: 7/29/2020
---


## Overview

AWS provides several ways to control who can access S3 resources

- IAM controls access across all AWS services
- Bucket Policies control access to buckets and everything inside them
- ACLs (Access Control Lists) manage access to specific files or objects
- Presigned URLs give temporary access to files

In small setups, where only one person manages everything, we don’t need complex permission systems.

- IAM and Bucket Policies are better for multi-user setups
- For single-user environments, ACLs and presigned URLs are simpler and faster

## How AWS Decides Access

When a request is made for an S3 object, AWS checks permissions step by step.

- If it’s a presigned URL, access is granted temporarily
- If not, AWS checks IAM and bucket policies
- If nothing allows it, access is denied by default

## ACLs

ACLs define who can access specific objects in your S3 bucket.

- Each object can have its own ACL
- The two common types are `private` and `public-read`
- By default, all uploaded files are private

### Changing ACLs on Existing Files

We can change a file’s access using the Boto3 `put_object_acl` method.

- Default ACL is private when uploaded
- Changing to `public-read` allows anyone to download it

```python
import boto3

s3 = boto3.client('s3')
s3.put_object_acl(Bucket='my-bucket', Key='data.csv', ACL='public-read')
```

**Expected result::** The file `data.csv` in `my-bucket` can now be accessed publicly.

### Setting ACLs During Upload

You can make an object public at the time of upload using the `ExtraArgs` parameter.

- Add `ACL: 'public-read'` to `ExtraArgs`
- Simplifies workflow by avoiding a second ACL call

```python
s3.upload_file(
    'local-data.csv',
    'my-bucket',
    'uploads/data.csv',
    ExtraArgs={'ACL': 'public-read'}
)
```

**Expected result::** The file uploads with a `public-read` ACL, ready for public download immediately.


### Accessing Public Objects

Once an object has a public-read ACL, anyone can view it using a simple URL format.

- Format: `https://<bucket-name>.s3.amazonaws.com/<object-key>`
- Example: `https://reports-bucket.s3.amazonaws.com/2024/traffic.csv`

You can now share this link, and anyone can open or download the file directly.

## Accessing Public Files

We can easily create public URLs with Python’s `format()` method.

- Define a URL string with placeholders for bucket and key
- Use `format(bucket, key)` to fill in values dynamically

```python
bucket = 'reports-bucket'
key = '2024/traffic.csv'
url = "https://{}.s3.amazonaws.com/{}".format(bucket, key)
print(url)
```

**Expected result:**

```
https://reports-bucket.s3.amazonaws.com/2024/traffic.csv
```

## Accessing Private Files

Files in S3 are private by default unless we explicitly make them public. To read private files, we need special methods.

- Private files cannot be accessed via public URLs directly
- Attempting to read a private file publicly gives a `403 Forbidden` error

### Download Private Files 

We can download private files to local storage before processing them.

- Use `download_file` from Boto3
- Once downloaded, read the file locally with Pandas
- This works well for files that do not change frequently

```python
s3.download_file('city-data', 'reports/private.csv', 'local/private.csv')
import pandas as pd
df = pd.read_csv('local/private.csv')
print(df.head())
```

### Access Files Directly from S3

We can also read private files directly without downloading them.

- Use `get_object` with the bucket name and object key
- Response contains metadata and a `Body` key
- The `Body` is a `StreamingBody` object that streams content without downloading fully

This method lets us work with private files efficiently without storing local copies.

```python
response = s3.get_object(Bucket='city-data', Key='reports/private.csv')
df = pd.read_csv(response['Body'])
print(df.head())
```


### Using Pre-signed URLs

Pre-signed URLs provide temporary access to private files in S3.

- Generate a URL that expires after a set time (e.g., 1 hour)
- The URL can be opened in Pandas or a browser
- Useful for sharing files without making them public

```python
url = s3.generate_presigned_url(
    ClientMethod='get_object',
    Params={'Bucket': 'city-data', 'Key': 'reports/private.csv'},
    ExpiresIn=3600
)
print(url)
```

**Expected result:** A temporary URL that anyone can use for 1 hour to access `private.csv`.


### Loading Multiple Files into One DataFrame

We can combine multiple CSVs from S3 into a single DataFrame.

- Create a list to store individual DataFrames
- Use `list_objects` with a prefix to find all relevant files
- Loop through the files, read each into a DataFrame, and append to the list
- Use `pd.concat` to combine all DataFrames into one

```python
files = s3.list_objects(Bucket='city-data', Prefix='2019/')['Contents']
dfs = []
for f in files:
    obj = s3.get_object(Bucket='city-data', Key=f['Key'])
    dfs.append(pd.read_csv(obj['Body']))

combined_df = pd.concat(dfs, ignore_index=True)
print(combined_df.head())
```


