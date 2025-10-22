---
title: "Pattern-Recognition"
description: "Pattern-Recognition"
tags: 
- Amazon Web Services
- Labs
sidebar_position: 13
last_update:
  date: 7/29/2020
---

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

## Cat Detector

After testing the Cat Detector, the Animal Control team realized it was inefficient to track one cat at a time. They suggested it would be more effective to identify groups of cats.

<div class='img-center'>

![](/img/docs/aws-boto3-rekog-cat-detector.png)

</div>


They requested to update the alert messages to include the total number of cats detected. They also asked to lower the confidence threshold, even if it meant more false positives.


```python
import boto3

rekog = boto3.client(
    'rekognition',
    region_name='us-east-1',
    aws_access_key_id=AWS_KEYID,
    aws_secret_access_key=AWS_SECRET
)

response = rekog.detect_labels(
    Image={'S3Object': {'Bucket': 'city-images', 'Name': 'image.jpg'}},  
    MaxLabels=10,
    MinConfidence=70  
)

cats_count = 0

# Iterate over labels
for label in response['Labels']:
    if label['Name'] == 'Cat':  
        for instance in label.get('Instances', []):  
            if instance['Confidence'] > 70:  
                cats_count += 1

print(f"Total cats detected: {cats_count}")
```

**Results:** The City's cat rescue rate has significantly increased. Feral cats are being taken off the street, fed, cuddled, then adopted by happy humans!


## Parking Sign Reader 

City planners have millions of truck camera images. Extracting parking rules from these images helps planners understand regulations and make better decisions.

<div class='img-center'>

![](/img/docs/aws-boto3-rekog-parking-sign-reader.png)

</div>

The goal is to extract text from the images using AWS Rekognition.

```python
import boto3

rekog = boto3.client(
    'rekognition',
    region_name='us-east-1',
    aws_access_key_id=AWS_KEYID,
    aws_secret_access_key=AWS_SECRET
)

response = rekog.detect_text(
    Image={'S3Object': {'Bucket': 'city-images', 'Name': 'image.jpg'}}
)

words = []
lines = []

# Separate words and lines from detected text
for text_detection in response['TextDetections']:
    if text_detection['Type'] == 'WORD':
        words.append(text_detection['DetectedText'])
    elif text_detection['Type'] == 'LINE':
        lines.append(text_detection['DetectedText'])

print(f"Words: {words}")
print(f"Lines: {lines}")
```

Output:

```python
Words: ['NO', 'PARKING', '7', 'AM', 'TO', '12', 'NOON', 'MONDAY']
Lines: ['NO PARKING', '7 AM', 'TO', '12 NOON', 'MONDAY']
```

**Results:** You have now used computer vision to detect parking signs, extract text, and provide valuable information to city planners.