---
title: "Notes: Recognition"
description: "Notes: Recognition"
tags: 
- Amazon Web Services
- Labs
sidebar_position: 24
last_update:
  date: 7/29/2020
---

## AWS Rekognition

AWS Rekognition is a computer vision service. It allows you to analyze images without building your own model. 

- Works with familiar boto3 patterns
- Can detect objects like bicycles or cars
- Can extract text from signs or documents

If you create your own model, you would need training data and maintenance.

- It would only work for a specific task
- Rekognition is general-purpose and ready to use
- This makes it easy for data engineers to get results quickly.

<div class='img-center'>

![](/img/docs/aws-boto3-rekognition.png)

</div>


### Object Detection

As example, we'll use the image below:

<div class='img-center'>

![](/img/docs/aws-boto3-rekog-sample-phoo-bike.png)

</div>


Before detection, upload your image to an S3 bucket.

```python
import boto3
s3 = boto3.client(
    's3',
    region_name='us-east-1',
    aws_secret_key_id=AWS_KEYID,
    aws_secret_access_key=AWS_SECRET
    )

s3.upload_file(
    Filename='bike.jpg',
    Bucket='city-images',
    Key='bike.jpg'
)
```

The next step is to construct the Boto3 Rekognition client. You can use the Rekognition attributes to detect objects like bicycles.

```python
rekog = boto3.client(
    'rekognition',
    region_name='us-east-1',
    aws_secret_key_id=AWS_KEYID,
    aws_secret_access_key=AWS_SECRET
    )

response = rekog.detect_labels(
    Image={'S3Object': {
        'Bucket': 'city-images', 
        'Name': 'bike.jpg'
        }},
    MaxLabels=10,
    MinConfidence=90
)
```

Optionally, we can specify the maximum amount of labels to return and the minimum confidence in the match that we are willing to accept. Rekognition returns a list of labels with instances and confidence scores.

<div class='img-center'>

![](/img/docs/aws-boto3-reko-response.png)

</div>

In this image, Rekognition sees 1 bicycle and many cars.

<div class='img-center'>

![](/img/docs/aws-boto3-rekog-sample-phoo-bike-2.png)

</div>


### Text Detection

Text detection works in the same way...Detect text in images, such as signs or documents.

```python
text_response = rekog.detect_text(
    Image={'S3Object': {
        'Bucket': 'city-images', 
        'Name': 'sign.jpg'
        }}
)
```

The response returns a list of dictionaries. Detections can be of 2 types: 

- **Line detections** combine adjacent words

    <div class='img-center'>
    
    ![](/img/docs/aws-boto3-rekog-detect-line.png)
    
    </div>
    
- **Word detections** show individual words.

    <div class='img-center'>
    
    ![](/img/docs/aws-boto3-rekog-detect-word.png)
    
    </div>
    


## AWS Translate

AWS Translate lets you convert text between languages easily.

<div class='img-center'>

![](/img/docs/aws-boto3-translate-1.png)

</div>


Using Boto3: 

- Initialize a boto3 client for Translate
- Call `translate_text` with the text and target language
- Use `'auto'` for `SourceLanguageCode` to detect the source language automatically

```python
import boto3

translate = boto3.client('translate')

response = translate.translate_text(
    Text="Hello, learner!",
    SourceLanguageCode='auto',
    TargetLanguageCode='es'
)

print(response['TranslatedText'])
```

AWS returns the translated text, detected source language, and target language.

```bash
Hola aprendiz!
```


### Detecting Language

You can identify the language of a text using AWS Comprehend.

- Initialize a boto3 client for Comprehend
- Call `detect_dominant_language` with the text
- Response includes languages with confidence scores

```python
comprehend = boto3.client('comprehend')

response = comprehend.detect_dominant_language(Text="Hola aprendiz")
print(response['Languages'])
```

Expected output:

```bash
## "es" refers to Spanish 
[{'LanguageCode': 'es', 'Score': 0.99}]
```

<div class='img-center'>

![](/img/docs/aws-boto3-translate-2.png)

</div>




### Detecting Sentiment

AWS Comprehend can also analyze the sentiment of text.

- Call `detect_sentiment` with your text
- Response includes `Sentiment` key and confidence scores for Positive, Negative, Neutral, and Mixed

```python
response = comprehend.detect_sentiment(Text="I love this product!", LanguageCode='en')
print(response['Sentiment'])
```

Expected output:

```bash
Positive
```

Sentiment detection helps understand user feedback or social media posts at scale.

<div class='img-center'>

![](/img/docs/aws-boto3-translate-3.png)

</div>
