---
title: "REST APIs"
description: "REST APIs"
tags:
- Computer Science
- Application Development
- Software Development
- APIs
sidebar_position: 10
last_update:
  date: 8/2/2021
---



## Overview

An API lets one software talk to another. It defines how a programmer can use an application’s features or build new applications.

- Allows software to communicate
- Can use web protocols or proprietary methods
- Controls what data and features are exposed securely

For example, a restaurant app can use a **map API** instead of building mapping from scratch. The API defines what actions are possible and how to access them. Only the data and functions exposed by the API are available to others.

<div class='img-center'>

![](/img/docs/devnet-apis.png)

</div>

Think of it like car dashboard buttons. Press the start button and the engine runs. You don’t see the ignition or pistons; the car only exposes what it wants you to use.

## Why use APIs

APIs make tasks easier, allow apps to share data, and extend functionality. They are mainly for other programs, but humans can interact with them too.

- **Automate tasks**

    You can write a script to do repetitive work. For example, download employee timecards automatically and calculate total hours instead of doing it manually.

- **Integrate data**

    Apps can use data from other apps. For example, e-commerce sites use payment APIs to process transactions without handling credit card data directly.

- **Extend functionality**

    Apps can embed features from other apps. For example, Yelp or Uber use Google Maps API to show routes and maps within their own apps.

## How APIs work

APIs allow your software to interact with other services automatically.

**Example**: Your website schedules client appointments. You want clients to add them to Google Calendar automatically.

- Your server sends a request to Google’s API with appointment details
- Google responds with a confirmation
- Your website shows a confirmation message to the user

<div class='img-center'>

![](/img/docs/acme-how-api-works.png) 

</div>

You can create an API that lets your website automate event creation without the user doing anything extra. Sometimes, the browser can even talk directly to the API, skipping your server.

```python
# Example: Python request to Google Calendar API
import requests

data = {
    "summary": "Meeting with client",
    "start": {"dateTime": "2021-01-30T10:00:00-07:00"},
    "end": {"dateTime": "2021-01-30T11:00:00-07:00"}
}

response = requests.post("https://www.googleapis.com/calendar/v3/calendars/primary/events",
                         json=data,
                         headers={"Authorization": "Bearer ACCESS_TOKEN"})

print(response.json())  # Shows confirmation of created event
```


## API Design Styles

APIs can be synchronous or asynchronous. Each design has its purpose and trade-offs. A product may include both types, but the logic should be consistent across APIs.


### Synchronous APIs

Synchronous APIs respond to a request immediately and usually provide data or an appropriate response.

- Data is returned directly and instantly
- Best for requests where data is readily available
- Application waits for the response before continuing

Synchronous APIs are common when the data is stored in a database or in memory. If the API is designed well, the response is fast and the application performs efficiently. If the API is designed poorly, the application may be blocked while waiting, which creates a bottleneck.

<center><small>Tickets are sold in a first-come, first-served order. This is a synchronous process.</small></center>

<div class='img-center'>

![](/img/docs/devnet-apisync.png)

</div>

**Client-side processing**

The application making the request must wait for the response before executing further code.

### Asynchronous APIs

Asynchronous APIs acknowledge a request immediately but do not provide the actual data right away. The server processes the request and later sends the data using a notification or callback.

- Request is accepted instantly
- Data is returned after processing
- Application can continue executing other tasks

Asynchronous APIs are useful when the server needs more time to process the request or the data is not immediately available. For example, the server may need to fetch data from a remote service. The client can continue executing other tasks while waiting for the response.

<div class='img-center'>

![](/img/docs/devnet-apiasync.png)

</div>


**Client-side processing**

The client may use:

- A listener or callback to handle data when it arrives
- A queue to maintain request order
- A polling mechanism to check request status

Proper use of asynchronous APIs improves performance, but overuse or poor design can reduce efficiency.


## SOAP vs. REST 

<div class='img-center'>

![](/img/docs/acme-soap-vs.rest.png)

</div>


## Representational State Transfer

REST (REpresentational State Transfer) is an architectural style that standardizes communication between web systems, facilitating easier interaction.

- Stateless design where each request contains all necessary information
- Separation of concerns between client and server roles
- RESTful systems promote interoperability and scalability

Reference: [Codecademy's site](https://searchapparchitecture.techtarget.com/definition/REST-REpresentational-State-Transfer)

## Resources and Representation

REST is about resource state manipulation through their representations on the top of stateless communication between client and server.

When designing REST over HTTP, URLs are used to locate the resources, HTTP methods are used to express the operations over the resources and representations such as JSON and/or XML documents are used to represent the state of the resource.

- **What is a resource?**
    Understand resource as the concept of a user. Don't think about the table in your database, think about an abstraction of a user with their set of attributes.

- **What is a representation?**
    A JSON document can be used to represent the state of a particular resource. A resource can have many representations, such as JSON and/or XML documents, and the client can use content negotiation to request different representations of the same resource.

- **What is a state transfer and when does this happens?**
    The state of a given resource can be retrieved and manipulated using representations.

A GET request, for example, allows you to retrieve a representation of the state of a resource, sent in the response payload. A PUT request, for example, allows you to replace the state of a resource with the state defined by the representation enclosed in the request payload.

When the client and server exchange messages; the client server architectural style is the first of the architectural constraints in the REST architectural style.

Reference: [StackOverflow discussion](https://stackoverflow.com/questions/48116321/what-is-representation-state-and-transfer-in-representational-state-trans).


## Data Format

Representational state that you may receive from a database could be in the form of a row from a database. You can then write a logic ot convert this row to another forms:

- XML
- JSON
- HTML
- JPEG, PDF, TXT, etc


## When is API "RESTful"?

An API is RESTful when:

- It's built using the RESTful Architectural Style.
- It follows the set of principles for RESTful APIs


## Types of API based on Consumers

Here's an excerpt from [Stoplight's article on API](https://stoplight.io/api-types/):

- **Open APIs**  
  - Publicly available with minimal restrictions.  
  - May require registration or an API key.  
  - Allows external developers to access data/services (e.g., UK government data).

- **Internal APIs**  
  - Designed for internal use within a company.  
  - Shares resources between teams.  
  - Offers security, access control, and an audit trail.

- **Partner APIs**  
  - Similar to open APIs but with restricted access.  
  - Often controlled via a third-party API gateway.  
  - Typically used for specific purposes, like paid services.  
