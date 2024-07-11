---
title: "Web Fundamentals"
tags: [IT Fundamentals, Web]
sidebar_position: 50
last_update:
  date: 12/28/2022
---



## Client and Servers 

<div class="img-center"> 

![](/img/docs/web-funda-client-server.png)


</div>

### Client-Server Model

The client-server model is a computing architecture that separates the functions of a computer program into two essential components: the client, which makes requests, and the server, which fulfills those requests.

- **Clients**
  - Devices (e.g., computers, smartphones) that access the internet and make requests.
  - Common browsers include Chrome, Safari, and Edge.

- **Servers**
  - Specialized hardware designed to host web applications and websites.
  - Respond to client requests and provide the necessary information.

Key Differences:

- **Functionality:** Clients make requests; servers fulfill requests.
- **Software:** Servers run web service software; clients use browsers.
- **Power:** Servers are more powerful, designed to handle concurrent requests.
- **Specialization:** Servers are dedicated to hosting and responding to requests.


### Accessing Websites

To access specific websites, a Uniform Resource Locator (URL) is used. The URL is a web address that directs the browser to a specific resource on the internet.

- **Components of a URL:**
  - **Protocol:** Indicates the method of access, such as HTTP or HTTPS.
  - **Domain Name:** The main address of the website (e.g., www.example.com).
  - **Path:** Specifies the exact resource or page on the website (e.g., /about-us).

- **Example:**
  - URL: `https://www.example.com/about-us`
  - **Protocol:** HTTPS
  - **Domain Name:** www.example.com
  - **Path:** /about-us

The URL tells the browser where to find the resource, and the browser uses the protocol to establish the type of connection.

### Request-Response Cycle 

The request-response cycle is a fundamental process that describes how clients and servers communicate over the internet.

1. **Client Request:**
   - The client makes a request by entering a URL in the browser.
   - The browser sends an HTTP request to the server hosting the website.

2. **Server Response:**
   - The server processes the request.
   - It sends back the requested information, typically in the form of a web page, to the client.

3. **Displaying Information:**
   - The browser receives the response and renders the web page for the user.

This cycle is repeated for each new request made by the client, enabling seamless browsing and interaction with web applications.

### Server Software

Server software plays a critical role in handling and responding to client requests. This software is designed to manage web traffic, process requests, and deliver content efficiently.

Examples of Server Software:
  - **Apache HTTP Server:** One of the most popular web server software, known for its flexibility and wide usage.
  - **Nginx:** Known for its high performance and ability to handle a large number of simultaneous connections.
  - **Microsoft IIS (Internet Information Services):** A web server software for Windows Server, offering a robust platform for hosting web applications.

Servers run this software to handle HTTP requests from clients, ensuring that web pages and resources are delivered promptly and reliably.

### Handling Demand

Popular websites, like Google.com, face high demand, requiring exceptionally powerful servers to manage the influx of requests. While any computer could be set up as a server, dedicated servers are often highly specialized for performance.


