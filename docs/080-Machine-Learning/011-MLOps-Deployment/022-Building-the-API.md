---
title: "Building the API"
description: "Building the API"
tags: 
- Machine Learning
- MLOps
sidebar_position: 22
last_update:
  date: 5/14/2023
---


## Exposing the Model  

To make our model accessible, we expose it through an API (Application Programming Interface). APIs let applications communicate, just like user interfaces let humans interact with software.  

- **Server** – Hosts the model and handles requests  
- **Client** – Sends data to the server and receives predictions  
- **API Types** – REST, RPC, SOAP, and others  

APIs allow clients to run procedures (like sentiment analysis) or access remote data (like news articles).  

## API Example  

Below is a sample API for a navigation app that estimates arrival time.  

- Takes velocity and distance as input  
- Runs them through the model  
- Returns estimated arrival time  

A simple API using FastAPI in Python:  

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/estimate")
def estimate_time(velocity: float, distance: float):
    if velocity <= 0 or distance <= 0:
        return {"error": "Velocity and distance must be positive numbers"}
    time = distance / velocity
    return {"estimated_time": round(time, 2)}
```

Example request:

```sh
curl "http://127.0.0.1:8000/estimate?velocity=60&distance=120"
```

Expected response:

```json
{"estimated_time": 2.0}
```

## Input Validation  

To prevent errors, we validate input data before processing it.  

- **Ensure required fields** – Check for missing inputs  
- **Verify data types** – Ensure numbers are used where expected  
- **Reject invalid values** – Prevent negative or zero values  

If a client provides invalid input, the API should return a clear error message.  

## Output Validation  

We also validate the model’s output to prevent unexpected behavior.  

- **Check for logical errors** – Example: No negative arrival times  
- **Format responses properly** – Ensure consistency  
- **Provide error messages** – Help clients understand failures  

This ensures that clients always receive valid and reliable responses.  

## Request and Response Models  

To enforce both the input and output validations, we need to define request and response models.  

- **Request model** – Specifies expected input fields, types, and constraints  
- **Response model** – Ensures structured, consistent output  

These models help standardize communication between clients and the API.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-20-092754.png)

</div>


## Security and Rate Limiting  

To protect our API, we restrict access and limit requests. The following measures ensure stability and prevent overuse.  

- **Authentication** – Only allow authorized users  
- **Rate limiting/Throttling** – Control requests made to prevent abuse  

FastAPI is a great tool for building APIs efficiently which provides built-in validation, security, and documentation features.