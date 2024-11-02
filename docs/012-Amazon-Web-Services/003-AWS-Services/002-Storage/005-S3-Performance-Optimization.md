---
title: "S3 Performance Optimization"
description: "Optimize your S3 Buckets"
tags: [Cloud, AWS, DevOps, Certifications]
sidebar_position: 5
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Baseline Performance

Amazon S3 automatically scales to high request rates, having latency of 100-200ms to get the first byte out of S3

- 3500 PUT/COPY/POST/DELETE requests per second per prefix in a bucket.
- 5500 GET/HEAD requests per second per prefix in a bucket.

Prefix explained:

- Example of a file in a bucket: `my-bucket/folder/subfolder/file`.
- Prefix in this case is: `/folder/subfolder/`.
- Request performance will apply to each prefix separately.

## Single PUT Upload

- Objects uploaded to S3 are sent as a single stream by default.
- If the stream fails, the upload fails and requires a restart of the transfer.
- Single PUT upload up to 5GB.

## Multipart Upload

- Data is broken up into smaller parts and uploaded in parallel.
- Recommended to be used for files bigger than 100MB.
- Mandatory for files bigger than 5GB.
- Upload can be split into maximum of 10,000 parts.
    - Each part can range between 5MB and 5GB.
    - Last leftover part can be smaller than 5MB as needed.
- Parts can fail in isolation and restart in isolation.
- The risk of uploading large amounts of data is reduced.
- Improves transfer rate to be the speed of all parts.

        ![](/img/docs/aws-s3-multi-part-upload.png)


## S3 Accelerated Transfer

- Off by default.
- Uses tAWS edge locations to speed up transfer.
- Compatible with multi-part upload.
- Bucket name cannot contain periods.
- Name must be DNS compatible.
- Benefits improve the larger the location and distance.
    - The worse the start, the better the performance benefits.

        ![](/img/docs/aws-s3-transfer-acceleration.png)


## S3 Byte-Range Fetches


- Can be used to speed up downloads by parallelizing GET requests. 
- Can be used to retrieve only a part of the file

        ![](/img/docs/aws-s3-byte-range-fetches.png)


## KMS Limitation

- S3 Performance can be affected by KMS limits.
- If encryption is enabled using SSE-KMS, we get additional requests to KMS which will apply to our KMS quota.
- KMS could throttle performance, as of today we can not request a quota increase for it.
