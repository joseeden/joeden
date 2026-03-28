---
title: "Notes on APIs"
description: "Notes on APIs"
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

**Client-side processing**

The application making the request must wait for the response before executing further code.


<center><small>Tickets are sold in a first-come, first-served order. This is a synchronous process.</small></center>

<div class='img-center'>

![](/img/docs/devnet-apisync.png)

</div>

### Asynchronous APIs

Asynchronous APIs acknowledge a request immediately but do not provide the actual data right away. The server processes the request and later sends the data using a notification or callback.

- Request is accepted instantly
- Data is returned after processing
- Application can continue executing other tasks

Asynchronous APIs are useful when the server needs more time to process the request or the data is not immediately available. For example, the server may need to fetch data from a remote service. The client can continue executing other tasks while waiting for the response.

**Client-side processing**

The client may use:

- A listener or callback to handle data when it arrives
- A queue to maintain request order
- A polling mechanism to check request status

Proper use of asynchronous APIs improves performance, but overuse or poor design can reduce efficiency.

<div class='img-center'>

![](/img/docs/devnet-apiasync.png)

</div>


## Common API Architectural Styles

The three most popular API styles are **RPC**, **SOAP**, and **REST**. Each style has its own way of structuring requests and responses, and each has different trade-offs for client and server design.

### RPC 

**RPC (Remote Procedure Call)** allows one application (client) to call a procedure on another application (server) as if it were local. The server application is typically located on another system within the network. The client does not need to know that the procedure runs remotely.

- Request-response model, usually synchronous
- Client sees calls as simple methods with arguments

RPC can be implemented over multiple transport protocols. 

- XML-RPC
- JSON-RPC
- NFS (Network File System)
- Simple Object Access Protocol (SOAP)

With RPC, the client makes a synchronous request to the server and is blocked while the server processes the request. When the server responds, the client is unblocked and continues the execution. RPC simplifies remote communication but can create a bottleneck if requests take too long.

<div class='img-center'>

![](/img/docs/devnet-apirpc.png)

</div>

### SOAP

**SOAP (Simple Object Access Protocol)** is an XML-based messaging protocol for communicating across different platforms and programming languages. 

- **Independent** - Works across platforms and languages          
- **Extensible** - Can add features like security and reliability
- **Neutral** - Can be used over HTTP, SMTP, TCP, UDP, or JMS 

A SOAP message is an XML document containing:

| Element  | Description                                           |
| -------- | ----------------------------------------------------- |
| Envelope | Root element indicating a SOAP message                |
| Header   | Optional metadata such as authorization or attributes |
| Body     | Has the main data (with own namespace) to be sent     |
| Fault    | Optional child element for errors or status           |

Sample SOAP message: 

```xml
<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Header/>
    <soap:Body>
        <soap:Fault>
            <faultcode>soap:Server</faultcode>
            <faultstring>Query request too large.</faultstring>
        </soap:Fault>
    </soap:Body>
</soap:Envelope>
```

SOAP is ideal for applications that require formal contracts, strict standards, and reliable communication between heterogeneous systems.

### REST 

**Representational State Transfer (REST)** is an architectural style that defines constraints to make web services simple, scalable, and stateless. RESTful APIs operate over standard protocols like HTTP and focus on resources.

For more information, please see [REST APIs.](/docs/065-Software-Engineering/080-APIs/020-Securing-your-API-Endpoint.md)

<div class='img-center'>

![](/img/docs/acme-soap-vs.rest.png)

</div>

