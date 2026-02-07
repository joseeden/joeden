---
title: "Initial Testing"
description: "Initial Testing"
tags: 
- Amazon Web Services
- Labs
- Pandas
sidebar_position: 10
last_update:
  date: 7/29/2020
---


## Overview

GetItDone is an app used by residents to report public issues.

- Residents report potholes or broken streetlights
- The data is sent to city systems through AWS
- Use Boto3 and other AWS tools to analyze and visualize reports


## Pre-requisites

Required: 

- [Create an AWS Account](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md) 
- [Create the IAM Policy](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#iam-policy) 
- [Create the IAM User](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#iam-user)
- [Create the IAM Access Keys](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#access-keys)

**Note on the IAM Policy**: The IAM policy attached to your IAM must have the following permissions:

- `AmazonS3FullAccess`
- `AmazonSNSFullAccess`
- `AmazonRekognitionFullAccess`
- `TranslateFullAccess`
- `ComprehendFullAccess`


## 1. Create Multiple AWS Clients

Create a client for S3 and SNS.

```python
import boto3

s3 = boto3.client('s3', region_name='us-east-1',
                  aws_access_key_id=AWS_KEY_ID,
                  aws_secret_access_key=AWS_SECRET)

sns = boto3.client('sns', region_name='us-east-1',
                   aws_access_key_id=AWS_KEY_ID,
                   aws_secret_access_key=AWS_SECRET)

buckets = s3.list_buckets()
topics = sns.list_topics()

print(buckets)
print(topics)
```

## 2. Create S3 Buckets

Create S3 buckets to organize your data for different parts of your project.

- `gid-staging`
- `gid-processed`
- `gid-test`

```python
import boto3

s3 = boto3.client('s3', region_name='us-east-1',
                  aws_access_key_id=AWS_KEY_ID,
                  aws_secret_access_key=AWS_SECRET)

response_staging = s3.create_bucket(Bucket='gid-staging')
response_processed = s3.create_bucket(Bucket='gid-processed')
response_test = s3.create_bucket(Bucket='gid-test')

print(response_staging)
```

Next, list all buckets in your AWS account to confirm your setup.

```python
response = s3.list_buckets()
for bucket in response['Buckets']:
    print(bucket['Name'])
```

Sample output:

```
gid-staging
gid-processed
gid-test
```

## 3. Clean Up Buckets

When a bucket is no longer needed, delete it to stay organized.
Delete the `gid-test` bucket.

```python
s3.delete_bucket(Bucket='gid-test')

response = s3.list_buckets()
for bucket in response['Buckets']:
    print(bucket['Name'])
```

Sample output:

```
gid-staging
gid-processed
```


## 4. Rename Buckets

If your project name changes, update your bucket names to match.
In our case, we need to change the bucket prefix from `gim-` to `gid-`.

```python
response = s3.list_buckets()
for bucket in response['Buckets']:
    if 'gim' in bucket['Name']:
        s3.delete_bucket(Bucket=bucket['Name'])

s3.create_bucket(Bucket='gid-staging')
s3.create_bucket(Bucket='gid-processed')

response = s3.list_buckets()
for bucket in response['Buckets']:
    print(bucket['Name'])
```

## 5. Upload and Retrieve Files

Once the buckets are ready, upload the files.
Make sure to confirm that the upload is successful.

```python
s3.upload_file(Bucket='gid-staging',
               Filename='final_report.csv',
               Key='2019/final_report_01_01.csv')

response = s3.head_object(Bucket='gid-staging',
                          Key='2019/final_report_01_01.csv')
print(response['ContentLength'])
```

Expected output:

```
209
```


## 6. Delete Files with Prefix

Record retention has been a huge issue, so we need to ensure that records are not kept past the mandated retention dates. Remove all files from 2018 to stay compliant. 

```python
response = s3.list_objects(Bucket='gid-staging', Prefix='2018/final_')

if 'Contents' in response:
    for obj in response['Contents']:
        s3.delete_object(Bucket='gid-staging', Key=obj['Key'])

response = s3.list_objects(Bucket='gid-staging')
for obj in response['Contents']:
    print(obj['Key'])
```

Sample output:

```
2019/final_report_01_00
2019/final_report_01_01
2019/final_report_01_02
2019/final_report_01_03
2019/final_report_01_04
```

## 7. Upload Public Reports

To ensure transparency, publish the aggregate reports and make them publicly available.

```python
s3.upload_file(
  Filename='./final_report.csv',
  Key='2019/final_report_2019_02_20.csv',
  Bucket='gid-staging',
  ExtraArgs={'ACL': 'public-read'}
)
```

Additionally, make all aggregated reports since the beginning of 2019 public as well.

```python
response = s3.list_objects(Bucket='gid-staging', Prefix='2019/final_')

for obj in response['Contents']:
    s3.put_object_acl(Bucket='gid-staging', Key=obj['Key'], ACL='public-read')
    print("https://{}.s3.amazonaws.com/{}".format('gid-staging', obj['Key']))
```

Sample output:

```
https://gid-staging.s3.amazonaws.com/2019/final_report_01_00.csv
https://gid-staging.s3.amazonaws.com/2019/final_report_01_01.csv
https://gid-staging.s3.amazonaws.com/2019/final_report_01_02.csv
```

This lets anyone access your reports directly through their browsers.

## 8. Share Private Files 

As a special request, the client asked to prioritize and keep reports from a specific district confidential, as they want to review them before the information goes public. 

To handle this, we need to share the private report securely and only for a short time.

```python
share_url = s3.generate_presigned_url(
  ClientMethod='get_object',
  ExpiresIn=3600,
  Params={'Bucket': 'gid-staging', 'Key': 'final_report.csv'}
)
print(share_url)
```

Sample output:

```
https://gid-staging.s3.amazonaws.com/final_report.csv?AWSAccessKeyId=FakeKey&Signature=ExampleSignature&Expires=1760943615
```


## 9. Read Private Files into Pandas

Add up all requests starting from 2019 to identify the overall trend. To achieve this, you’ll need to read the daily CSV files stored in the `gid-requests` bucket and combine them into one dataset.

The files in `gid-requests` are private, meaning only you can access them through your credentials, while they remain hidden from the public.

The boto3 S3 client is already initialized and stored in the `s3` variable, and the list of objects in `gid-requests` is available in the `response` variable.

```python
df_list = []

for file in response['Contents']:
    obj = s3.get_object(Bucket='gid-requests', Key=file['Key'])
    obj_df = pd.read_csv(obj['Body'])
    df_list.append(obj_df)

df = pd.concat(df_list)
df.head()
```

Sample output:

```
        service_name  request_count
0  72 Hour Violation              8
1   Graffiti Removal              2
2  Missed Collection             12
3   Street Light Out             21
4            Pothole             33
```

## 10. Generate HTML Tables from Pandas

The client asked to generate a table of all the services in the system. The system is dynamic and grows on a weekly basis, adding additional services. The DataFrame of available services are loaded into the `services_df` variable:

<div class='img-center'>

![](/img/docs/getitdone.png)

</div>

```python
## HTML table with no border and selected columns
services_df.to_html('./services_no_border.html',
                    columns=['service_name', 'link'],
                    border=0)

## HTML table with border and all columns
services_df.to_html('./services_border_all_columns.html', border=1)
```


## 11. Hosts HTML Dashboards on S3

A dashboard html file was generated to be used tro schedule the client's staff accordingly. 

<div class='img-center'>

![](/img/docs/getitdone-2.png)

</div>

Make sure the generated HTML File is continuously updated and serve it as a website.

```python
s3.upload_file(Filename='dashboard.html',
               Bucket='getitdone-public',
               Key='index.html',
               ExtraArgs={'ContentType': 'text/html', 'ACL': 'public-read'})

print("http://{}.s3.amazonaws.com/{}".format('getitdone-public', 'index.html'))
```

Sample output:

```
http://getitdone-public.s3.amazonaws.com/index.html
```


