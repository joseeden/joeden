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

## Detecting Language 

The City Council wants to know if creating a Spanish version of the Get It Done app is worthwhile. There is a significant Spanish-speaking population, but it’s unclear how much they would use the app. Adding multi-language support increases complexity and needs justification.

They asked you to determine how many requests are submitted in Spanish.

The CSV has been loaded into the `dumping_df` variable and filtered it to the relevant columns:

<div class='img-center'>

![](/img/docs/aws-boto3-translatre-detect-language.png)

</div>

Figure out how many requesters use Spanish and print the final result.sn

```bash
import boto3
import pandas as pd


comprehend = boto3.client(
    'comprehend',
    region_name='us-east-1',
    aws_access_key_id=AWS_KEYID,
    aws_secret_access_key=AWS_SECRET
)

# Assume dumping_df is already loaded and filtered
# dumping_df = pd.read_csv('requests.csv')  # example

# For each dataframe row
for index, row in dumping_df.iterrows():
    description =dumping_df.loc[index, 'public_description']
    if description != '':
        resp = comprehend.detect_dominant_language(Text=description)
        dumping_df.loc[index, 'lang'] = resp['Languages'][0]['LanguageCode']
        
# Count the total number of spanish posts
spanish_post_ct = len(dumping_df[dumping_df.lang == 'es'])
print("{} posts in Spanish".format(spanish_post_ct)) 
```

Output:

```bash
9 posts in Spanish 
```

## Translating Requests

Sometimes, the requests coming in the `GetItDone` app are written in different languages, making it hard for city teams to review them. Teams often rely on translators or staff who happen to know the language.

The Streets Director asked you for help. He wanted to automatically translate all requests at the end of each day.

The CSV file has been loaded into the `dumping_df` variable and only the needed columns are kept for translation.

<div class='img-center'>

![](/img/docs/aws-boto3-translate-translate-requests.png)

</div>

Translate the requests to Spanish by running them through the AWS translate service.

```python
import boto3
import pandas as pd

translate = boto3.client('translate')

# Example: load your CSV (already done earlier, shown for completeness)
# dumping_df = pd.read_csv('requests.csv')

# Iterate through each row and translate descriptions
for index, row in dumping_df.iterrows():
    description = row['public_description']

    if description and isinstance(description, str):
        resp = translate.translate_text(
            Text=description,
            SourceLanguageCode='auto',
            TargetLanguageCode='en'
        )

        dumping_df.loc[index, 'original_lang'] = resp['SourceLanguageCode']
        dumping_df.loc[index, 'translated_desc'] = resp['TranslatedText']

dumping_df = dumping_df[['service_request_id', 'original_lang', 'translated_desc']]
print(dumping_df.head())
```

This script detects the source language, translates it to English, and stores both the detected language and translated text for easy review.

```python
   service_request_id original_lang               translated_desc
0               12345            es   Garbage not collected today
1               12346            tl   There is a broken streetlight
2               12347            zh   Illegal dumping behind house
3               12348            en   Pothole near main intersection
4               12349            es   Trash pile beside dumpster
```

## Getting Request Sentiment

After successfully translating the cases received through the Citizen's help app, the Cit council  wants to understand how people in the City feel about their department's work. This can be achieved through sentiment analysis of the requests. 

The CSV file is already loaded into the `dumping_df` variable and only the needed columns are kept for translation.

<div class='img-center'>

![](/img/docs/aws-boto3-sentiment-analysis-1.png)

</div>

The goal is to analyze the mood of people submitting reports through the city’s mobile app and determine whether their interactions with the City start out positive or negative.

```python
import boto3
import pandas as pd

comprehend = boto3.client('comprehend')

for index, row in dumping_df.iterrows():
    description = dumping_df.loc[index, 'public_description']
    if description != '':
        response = comprehend.detect_sentiment(
          Text=description, 
          LanguageCode='en')
        dumping_df.loc[index, 'sentiment'] = response['Sentiment']
dumping_df.head()
```

Output:

```yaml
   service_request_id original_lang                                                                                                                                                                                public_description sentiment
0  93494               es            The residents keep throwing stuff away                                                                                                                                                            MIXED   
1  101502              en            Couch, 4 chairs, mattress, carpet padding. this is a on going problem                                                                                                                             POSITIVE
2  101520              NaN           NaN                                                                                                                                                                                               NEUTRAL 
3  101576              en            On the South Side of Paradise Valley Road near the intersection with Jester St. Stuff in trash bags, rolling suitcases, and shopping carts. I suspect possessions of folk camping in the canyon.  NEUTRAL 
4  101616              es            There is a fridge on the street    
```

## Case Study: Scooter Problem in the City

The city has seen a sudden rise in scooters on the streets. While many enjoy using them, some residents are unhappy about scooters being left on sidewalks and blocking paths.

- Many residents find scooters convenient
- Elderly and disabled residents face blocked sidewalks
- The City Council faces pressure to act

The dataset has been filtered to only include useful details for analysis.

- Image URLs stored in an S3 bucket
- Case descriptions with public comments
- Latitude and longitude for location mapping

Steps:

1. Since the citizens' requests come from many languages, you must first translate all descriptions into English.

2. Use image recognition to confirm which images actually contain scooters.

3. Before sentiment analysis, all descriptions are translated into English.

4. Next, check how people feel when submitting these reports.

    - Negative sentiment may mean blocked sidewalks
    - Positive sentiment may mean scooter appreciation

5. Filter the data to find where scooters block sidewalks.

    - Scooter detected in image
    - Sentiment marked as negative

6. Finally, build a notification system to dispatch crews to impound scooters from sidewalks based on sentimaent and image recognition.

    <div class='img-center'>

    ![](/img/docs/aws-boto3-recognition-case-study-1.png)

    </div>


Final code:

```python
import pandas as pd
import boto3

scooter_requests = pd.read_csv("scooter_requests.csv")
scooter_requests = scooter_requests[['public_description', 'lat', 'long', 'img_scooter']]

comprehend = boto3.client('comprehend')
sns = boto3.client('sns')

# Step 1–4
for index, row in scooter_requests.iterrows():
    desc = scooter_requests.loc[index, 'public_description']
    
    if desc != '':

        ## Detect dominant language
        lang_resp = comprehend.detect_dominant_language(Text=desc)
        lang_code = lang_resp['Languages'][0]['LanguageCode']
        scooter_requests.loc[index, 'lang'] = lang_code

        ## Determine sentiment
        sent_resp = comprehend.detect_sentiment(
            Text=desc, 
            LanguageCode=lang_code
        )
        scooter_requests.loc[index, 'sentiment'] = sent_resp['Sentiment']

# Step 5
counts = scooter_requests.groupby(['sentiment', 'lang']).count()

# Step 6
topic_arn = sns.create_topic(Name='scooter_notifications')['TopicArn']

for index, row in scooter_requests.iterrows():
    if (row['sentiment'] == 'NEGATIVE') & (row['img_scooter'] == 1):
        message = "Please remove scooter at {}, {}. Description: {}".format(
            row['long'], row['lat'], row['public_description']
        )

        sns.publish(
            TopicArn=topic_arn,
            Message=message,
            Subject="Scooter Alert"
        )

divider = "*" * 80

print(divider)
print("Sentiment by groups")
print(divider)
print(counts.head())

```

Output:

```python
********************************************************************************
Sentiment by groups
********************************************************************************
                public_description  lat  long  img_scooter
sentiment lang                                            
NEGATIVE  en                     12   12   12           12
          es                      3    3    3            3
          tl                      5    5    5            5
MIXED     en                      2    2    2            2
POSITIVE  en                      4    4    4            4
```

Sample SNS notifications that would be published:

```bash
TopicArn: arn:aws:sns:us-east-1:123456789012:scooter_notifications
Message: Please remove scooter at 32.7157, -117.1611. Description: Scooter blocking my driveway
Subject: Scooter Alert
```

```bash
TopicArn: arn:aws:sns:us-east-1:123456789012:scooter_notifications
Message: Please remove scooter at 32.7170, -117.1630. Description: The scooter is on the sidewalk again!
Subject: Scooter Alert
```

```bash
TopicArn: arn:aws:sns:us-east-1:123456789012:scooter_notifications
Message: Please remove scooter at 32.7190, -117.1650. Description: El scooter bloquea la acera
Subject: Scooter Alert
```