---
title: "GetItDone: Monthly Reports"
description: "GetItDone: Monthly Reports"
tags: 
- Amazon Web Services
- Labs
sidebar_position: 11
last_update:
  date: 7/29/2020
---

## Overview

Each month, you are required to generate a report showing the number of requests made through the GetItDone app, categorized by case type.

- The client requests monthly reports for analysis
- The report must include request counts by category
- Council members should view and access charts on a web page

This setup helps automate report delivery and allows the council to easily visualize the data.

## Pre-requisites

Required: 

- [Create an AWS Account](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md) 
- [Create the IAM Policy](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#create-the-iam-policy) 
- [Create the IAM User](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#iam-users)
- [Create the IAM Access Keys](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#access-keys)

**Note on the IAM Policy**: The IAM policy attached to your IAM must have the following permissions:

- `AmazonS3FullAccess`
- `AmazonSNSFullAccess`
- `AmazonRekognitionFullAccess`
- `TranslateFullAccess`
- `ComprehendFullAccess`

## Steps: Building the Report

To create the full report and publish it online, follow these steps.

1. Download raw CSV files from S3
2. Merge them into one complete dataset
3. Create an aggregated DataFrame for analysis
4. Write the output to CSV and HTML
5. Generate visual charts using Bokeh
6. Upload all files to S3 for online viewing

## 1. Collect Raw Data

The raw data comes from the `gid-requests` bucket. Each file represents daily GetItDone requests.

- Retrieve all CSVs for the target month
- Filter files using the `Prefix` argument in `list_objects`
- Access files through S3 directly, not via URL, since they are private

To start with, upload new reports for February and update the file listing.

```python
import boto3
s3 = boto3.client('s3')

df_list = []

for file in response['Contents']:
    s3_day_reqs = s3.get_object(Bucket='gid-requests', Key=file['Key'])
    day_reqs = pd.read_csv(s3_day_reqs['Body'])
    df_list.append(day_reqs)
```

This loads all daily files into memory for aggregation.

## 2. Combine and Aggregate Data

Now merge the individual datasets into one. 

```python
all_reqs = pd.concat(df_list)
all_reqs.head()
```

Output:

```bash
   service_request_id  service_request_parent_id  sap_notification_number   requested_datetime  case_age_days  ...         comm_plan_name park_name          case_origin referred_department  \
0             2553572                        NaN                      NaN  2019-04-03T08:58:00            0.0  ...            Kearny Mesa       NaN               Mobile                 NaN   
1             2553573                        NaN                      NaN  2019-04-03T08:58:00            0.0  ...  Mid-City:City Heights       NaN  Crew/Self Generated                 NaN   
2             2553570                        NaN                      NaN  2019-04-03T08:55:00            0.0  ...          Mission Beach       NaN                Phone                 NaN   
3             2553568                  2.538e+06                      NaN  2019-04-03T08:54:00            0.0  ...            Tierrasanta       NaN                  Web                 NaN   
4             2553565                        NaN                      NaN  2019-04-03T08:53:00            0.0  ...               Downtown       NaN               Mobile                 NaN   

                                  public_description  
0                           72hr plus tire violation  
1            Graffiti Reported at 3927 El Cajon Blvd  
2                                       Missed trash  
3  ALL 4 STREET LIGHTS ON THE SIGNAL STANDARDS AR...  
4                                                NaN  

[5 rows x 18 columns]
```

For this sample, we need to aggregate the February reports.

```python
# Write to a CSV and HTML file with no border
agg_df.to_csv('./feb_final_report.csv', index=False)
agg_df.to_html('./feb_final_report.html', border=0)
```

## 3. Create and Upload Reports Bucket

As an additional step, we need to create a bucket to store and share the final reports.

```python
s3.create_bucket(Bucket='gid-reports')

s3.upload_file(
    Filename='./feb_final_report.csv', 
    Key='2019/feb/final_report.html', 
    Bucket='gid-reports',
    ExtraArgs={'ACL': 'public-read'}
)

s3.upload_file(
    Filename='./feb_final_report.html', 
    Key='2019/feb/final_report.html', 
    Bucket='gid-reports',
    ExtraArgs={
        'ContentType': 'text/html',
        'ACL': 'public-read'
    }
)
```


## 4. Create an Index Page

The client requested that all reports be viewable through the directory listing

```python
objects_list = s3.list_objects(Bucket='gid-reports', Prefix='2019/')
objects_df = pd.DataFrame(objects_list['Contents'])
base_url = "http://gid-reports.s3.amazonaws.com/"
objects_df['Link'] = base_url + objects_df['Key']

# Preview the resulting DataFrame
objects_df.head()
```

Output:

```bash
0  2019/feb/final_chart.html  2025-10-20 21:18:26+00:00  "ed175e887c447df1ec5932ac7fa67cc2"  7697  STANDARD      
1  2019/feb/final_report.csv  2025-10-20 21:18:26+00:00  "1519c57b81bb9257756c04dee24dd728"  209   STANDARD      
2  2019/feb/final_report.html 2025-10-20 21:18:26+00:00  "03baa6b325d75dff02ef83af39a8205f"  536   STANDARD      
3  2019/jan/final_chart.html  2025-10-20 21:18:26+00:00  "ed175e887c447df1ec5932ac7fa67cc2"  7697  STANDARD      
4  2019/jan/final_report.csv  2025-10-20 21:18:26+00:00  "1519c57b81bb9257756c04dee24dd728"  209   STANDARD      

                                                                                                  Owner                                                            Link  
0  {'DisplayName': 'webfile', 'ID': '75aa57f09aa0c8caeab4f8c24e99d10f8e7faeebf76c078efc7c6caea54ba06a'}  http://gid-reports.s3.amazonaws.com/2019/feb/final_chart.html   
1  {'DisplayName': 'webfile', 'ID': '75aa57f09aa0c8caeab4f8c24e99d10f8e7faeebf76c078efc7c6caea54ba06a'}  http://gid-reports.s3.amazonaws.com/2019/feb/final_report.csv   
2  {'DisplayName': 'webfile', 'ID': '75aa57f09aa0c8caeab4f8c24e99d10f8e7faeebf76c078efc7c6caea54ba06a'}  http://gid-reports.s3.amazonaws.com/2019/feb/final_report.html  
3  {'DisplayName': 'webfile', 'ID': '75aa57f09aa0c8caeab4f8c24e99d10f8e7faeebf76c078efc7c6caea54ba06a'}  http://gid-reports.s3.amazonaws.com/2019/jan/final_chart.html   
4  {'DisplayName': 'webfile', 'ID': '75aa57f09aa0c8caeab4f8c24e99d10f8e7faeebf76c078efc7c6caea54ba06a'}  http://gid-reports.s3.amazonaws.com/2019/jan/final_report.csv 
```

## 5. Upload the New Index

Create the HTML index page that links directly to each report and chart. 

Next, upload the index file so everyone can view it. Uploading the new file will overwrite the index.html.

```python
objects_df.to_html('report_listing.html',
    render_links=True,
    columns=['Link','LastModified','Size'])

s3.upload_file(
  Filename='./report_listing.html', Key='index.html', 
  Bucket='gid-reports',
  ExtraArgs = {
    'ContentType': 'text/html', 
    'ACL': 'public-read'
  })
```

You now have a live report site where the client and council members can view and interact with all monthly results. By automating these steps, you can keep reports up-to-date, improve transparency, and make GetItDone’s performance easy to monitor.
