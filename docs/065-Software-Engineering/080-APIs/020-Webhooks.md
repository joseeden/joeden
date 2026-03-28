---
title: "Webhooks"
description: "Working with webhooks"
tags:
- Computer Science
- Application Development
- Software Development
- APIs
sidebar_position: 20
last_update:
  date: 8/2/2021
---


## Working with Webhooks

Webhooks send real-time notifications to your application when specific events happen. They avoid repeated polling and make applications more efficient.

- Send HTTP POST requests to a registered URL
- Triggered by specific events
- Allow multiple applications to subscribe

Webhooks are sometimes called **reverse APIs** because the server calls your application instead of your application requesting data. You register a URI with the webhook provider, and when the event occurs, the provider sends an HTTP request to that URI. 

<div class='img-center'>  

![](/img/docs/webhook-example.png)

</div>  

**Examples:**

- Cisco DNA Center can send a webhook to your app when a network device becomes unreachable. Your app receives the outage details in JSON format and can act immediately.
- Cisco Webex Teams can notify your app whenever a new message is posted in a room. Your app receives the message automatically instead of polling the Teams API.

## Consuming a Webhook

To use a webhook, your application must meet basic requirements:

- The application must be running to receive HTTP POST requests
- The application must provide a registered URI to the webhook provider

Your application must also handle incoming notifications properly. This includes validating the request, processing the payload, and responding with a 2xx HTTP status to acknowledge receipt.

There are free online tools called **webhook testers** that help you check if your application can receive and process webhook requests. These tools also let you preview the notification content, which is useful during development and testing.