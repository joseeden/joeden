---
title: "REST APIs"
description: "REST APIs"
tags:
- Computer Science
- Application Development
- Software Development
- APIs
sidebar_position: 11
last_update:
  date: 8/2/2021
---




## Overview

REST is an architectural style that defines constraints to make web services simple, scalable, and stateless. RESTful APIs operate over standard protocols like HTTP and focus on resources.

- Each request contains all information needed (stateless)
- Clients and servers are independent
- RESTful systems support scalability and interoperability

An API is condiered **RESTful** when:

- It's built using the RESTful Architectural Style.
- It follows the set of principles for RESTful APIs

Reference: [Codecademy's site](https://searchapparchitecture.techtarget.com/definition/REST-REpresentational-State-Transfer)

## Resources and Representation

REST focuses on managing resources by exchanging their representations while keeping client-server communication stateless.

- **Resource** – An abstract concept, like a user with attributes, not just a database table row
- **Representation** – A JSON or XML document showing the resource’s current state
- **State transfer** – Clients retrieve or modify a resource’s state via representations

When designing REST over HTTP:

- URLs locate the resources
- HTTP methods define operations on those resources
- Representations show the current state of the resource

Example: 

- A `GET` request retrieves a resource representation
- A `PUT` request updates the resource with the data in the request

Reference: [StackOverflow discussion](https://stackoverflow.com/questions/48116321/what-is-representation-state-and-transfer-in-representational-state-trans).


## Data Formats

REST allows resources to be represented in multiple formats depending on the client’s needs:

- JSON
- XML
- HTML
- Images (JPEG, PNG) or documents (PDF, TXT)


## REST Architectural Constraints

RESTful APIs follow six constraints defined in [Roy Fielding's dissertation.](https://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm)

1. Client-Server
2. Stateless
3. Cache
4. Uniform Interface
5. Layered System
6. Code-On-Demand

These six constraints can be applied to any protocol, and when they are applied, you will often hear that it is RESTful.

### Client-Server

In a client-server design, the client and server operate independently. This allows the client to work on different platforms and keeps the server simpler.

The figure shows the client on the left and the server on the right, connected by a line representing communication.

<div class='img-center'>

![](/img/docs/devnet-clisvrmodel.png)

</div>

### Stateless

Every client request must include all the information the server needs to process it. The server does not store session state.

<div class='img-center'>

![](/img/docs/devnet-statlessmdl.png)

</div>

### Cache

Responses from the server must state whether the response is cacheable or non-cacheable. If it is cacheable, the client can use the data from the response for later requests.

<div class='img-center'>

![](/img/docs/devnet-cachemdl.png)

</div>

### Uniform interface

The communication between the client and the server must follow four rules:

| No. | Constraint                                        | Description                                                                                                                                                                                                                               |
| --- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Identification of resources                       | <ul><li>The request must specify the exact resource to access or modify.</li><li>Resources can be documents, users, images, or collections.</li><li>Example: To change a user's password, identify the user.</li></ul>                    |
| 2   | Manipulation of resources through representations | <ul><li>The client gets a resource representation from the server.</li><li>The representation must provide enough data to work with the resource.</li><li>Example: To update a profile, send full profile data, not just an ID.</li></ul> |
| 3   | Self-descriptive messages                         | <ul><li>Each message must include all info the server or client needs.</li><li>Examples: protocol type, data format, requested operation.</li></ul>                                                                                       |
| 4   | Hypermedia as the engine of application state     | <ul><li>Server responses include links or actions the client can take.</li><li>Clients can navigate or act on resources dynamically.</li></ul>                                                                                            |

### Layered system

The architecture can have hierarchical layers. Each layer provides services to the layer above and uses services from the layer below.

<div class='img-center'>

![](/img/docs/devnet-apilayered.png)

</div>

### Code-on-Demand (Optional)

This constraint allows a server to provide executable code to extend client functionality.

- Servers can include scripts, such as JavaScript, in responses.
- Clients can download and run this code if it is trusted.
- This reduces maintenance and avoids dependency issues.

Example: A payment service can provide JavaScript libraries to handle transactions, so clients do not need to write their own payment code.

This feature is optional because running third-party code can create **security risks** and may be blocked by firewalls or other security tools.

## API Types by Consumers

REST APIs can be categorized based on who uses them:

| Type          | Description                                                                                                           | Example                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Open APIs     | <ul><li>Public APIs with minimal restrictions</li><li>May require API key or registration</li></ul>                   | UK government data            |
| Internal APIs | <ul><li>Used within a company to share resources between teams</li><li>Includes security and access control</li></ul> | Internal reporting tools      |
| Partner APIs  | <ul><li>Restricted APIs for external partners</li><li>Often managed via API gateways</li></ul>                        | Paid services or partner apps |
