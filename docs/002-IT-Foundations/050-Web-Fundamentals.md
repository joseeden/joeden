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

Components of a URL:

  - **Protocol:** Indicates the method of access, such as HTTP or HTTPS.
  - **Domain Name:** The main address of the website (e.g., www.example.com).
  - **Path:** Specifies the exact resource or page on the website (e.g., /about-us).

Example:

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

  - **Apache HTTP Server:** 
    - One of the most popular web server software.
    - Known for its flexibility and wide usage.

  - **Nginx:** 
    - High performance, can handle a large number of simultaneous connections.

  - **Microsoft IIS (Internet Information Services):** 
    - A web server software for Windows Server.
    - Offers a robust platform for hosting web applications.

Servers run this software to handle HTTP requests from clients, ensuring that web pages and resources are delivered promptly and reliably.


### Handling Demand

Popular websites, like Google.com, face high demand, requiring exceptionally powerful servers to manage the influx of requests. While any computer could be set up as a server, dedicated servers are often highly specialized for performance.


## URLs

Uniform Resource Locators (URLs) are essential for the web's hypertext system. They provide the information a browser needs to send a request to a server and specify the desired resource. URLs are divided into two main parts separated by a colon: the scheme and the path.

- **Scheme:** Specifies the protocol the browser should use to retrieve the resource. Examples include:
  - HTTP
  - HTTPS
  - FTP
  - Email protocols like POP3 and IMAP

- **Path:** Provides the location of the server and the specific resource.

Example URL

```
https://www.qa.com/web-development-fundamentals-html-and-css-qahtmlcss
```

Where: 

- Scheme: HTTPS
- Path: www.qa.com/web-development-fundamentals-html-and-css-qahtmlcss

### Simplified URL Entry

When entering URLs into browsers, it's common not to type the scheme. Browsers often add the default scheme (usually HTTP or HTTPS) automatically.

As common practice, many users omit the scheme (HTTP or HTTPS) when entering URLs directly into browsers. This simplifies the entry process and is commonly seen when typing addresses like www.qa.com instead of specifying http://www.qa.com explicitly.

Browsers will then automatically prepend the default scheme (typically HTTP or HTTPS) if it's omitted. This practice reduces the burden on users to remember and type out the full URL scheme.


### HTTP URL Syntax

HTTP and HTTPS URLs have their own syntax, which includes the hostname, port, and document path.

Syntax: 

```
hostname:port/document-path
```

where: 

- **Hostname:** 
  - Represents the name of the accessed website. 
  - Commonly starts with "www," but this is not mandatory.

- **Port:** 
  - Follows the hostname and may include a port number (e.g., www.example.com:80).
  - If no port is specified, HTTP defaults to port 80 and HTTPS to port 443.

- **Document Path:** 
  - The location of the resource in the web service directory.

### Importance of Port Numbers

Port numbers act as gateways, allowing or rejecting data based on firewall settings. Common port numbers include:

- **Port 80:** HTTP
- **Port 443:** HTTPS
- **Port 25:** Email

### Document Path

The document path indicates where the resource is located within the web service directory. If the document path is omitted from the URL, it defaults to the site's home page, which is server and configuration dependent (e.g., index.html or default.html).

<div class="img-center"> 

![](/img/docs/010urlsandfirewalls.png)

</div>



## HTTP and its Interactions    

The client-server model operates under the Hypertext Transfer Protocol (HTTP). 

- HTTP is a lightweight application-level protocol established in 1990, currently at version 1.1.
- Built on top of the Transmission Control Protocol (TCP), HTTP ensures reliable handling of large volumes of data.
- HTTP operates in a stateless manner, treating each request independently without storing persistent information about the client or server.

Despite its simplicity in handling document requests, HTTP presents challenges for applications requiring identity tracking. When a client accesses a website, it sends a request to the server that includes:

- The method of the request (e.g., GET, POST).
- The Uniform Resource Identifier (URI) specifying the resource location.
- The HTTP protocol version.

Additionally, the client may send headers specifying the content type and other metadata relevant to the request. 

<div class="img-center"> 

![](/img/docs/010httpuriinteractions.png)

</div>


Upon receiving the request, the server responds to the client with:

- A status line indicating the HTTP protocol version and an internet standard error code, if applicable.
- A message containing the requested resource or an appropriate response.

## Request Formats

HTTP defines three primary methods for client requests: GET, HEAD, and POST.

- **GET:** Retrieves information identified by the URI.
- **HEAD:** Fetches header information about the URI.
- **POST:** Submits a stream of information to the URI's identified resource.

## Client Requests

HTTP client requests consist of a method, URI, HTTP version, and a MIME-like message, which are essential for the functionality of HTTP in handling client requests.

<div class="img-center"> 

![](/img/docs/010clienrequestsformats.png)

</div>


### URIs

URIs, or Uniform Resource Identifiers, are formatted strings used to identify networked resources.

- **Absolute URIs:** Contain all necessary information, including scheme, host name, and port number.
- **Relative URIs:** Begin with the path, with other elements relative to the hosting page.
- **Best Practice:** Use relative URIs when referring to resources within your site to maintain flexibility amid changes in scheme or host name.

### HTTP Versions

HTTP version numbers consist of a major and a minor part, indicating advancements or changes in message format handling. Higher minor numbers indicate iterative advancements without altering how requests are processed.

<div class="img-center"> 

![](/img/docs/010httpversions1-2.png)

</div>

Note that major number changes reflect changes in message format.

- **Version 1.1:** Most widely adopted, supporting common browsers and websites.
- **Version 0.9:** The original HTTP version supporting only the GET method without MIME usage.
- **Version 2.0:** Widely supported, enhancing efficiency and security in data transfer.
- **Version 3.0:** Currently under development, aiming to further optimize data transfer capabilities.

    <div class="img-center"> 

    ![](/img/docs/010httpv0923.png)

    </div>

### MIME-like Messages

MIME-like messages in HTTP requests include modifiers and form data.

- These messages enable the transfer of various types of data, such as audio, video, images, and applications, as part of the request.
- They are crucial for transmitting attachments and enhancing the versatility of HTTP requests.


## Server Response

After receiving an HTTP request from a client, the server can issue either a simple or a full response. A simple response occurs when the server supports only HTTP 0.9 and provides a file or data.

<div class="img-center"> 

![](/img/docs/010svrresponsesimpleresponse.png)

</div>

For servers using HTTP 1.0 and above, a full response includes a status line as its first part. The status line consists of:

- The HTTP version,
- A standard status code, and
- A reason phrase.

    <div class="img-center"> 

    ![](/img/docs/010svrresponsefullresponse.png)

    </div>

### Components of a Full Response

A full HTTP response comprises several key components that provide essential information about the response:

- **HTTP Version:** Can be 1.0, 1.1, or 2.0.
- **Status Code:** A standard three-digit internet server format.
- **Reason Phrase:** A textual representation of the status code.

Diagram:

<div class="img-center"> 

![](/img/docs/010httpstatuscodefixedphoto.png)

</div>

### Common HTTP Status Codes

- **404 Not Found:** Indicates that the requested resource could not be found.
- **200 OK:** Signifies that the request was successful.
- **304 Not Modified:** Indicates that the resource has not been modified since the last requested.
- **403 Forbidden:** Indicates that the server understood the request but refuses to authorize it.
- **503 Service Unavailable:** Indicates that the server is currently unable to handle the request due to temporary overload or maintenance.

### MIME-like Message

The second part of a full HTTP response is the MIME-like message generated by the server. This message includes various header fields separated from the message body by a carriage return line feed (CRLF) pair.

- **HTTP Header Information**

    - Provides contextual information about the response.
    - Content type (e.g., text/plain, application/JSON), expiry date, and server software.
    - Enhances security measures.

- **Message Body and MIME**

    - Contains the requested resource.
    - Can be dynamically generated, especially for backend server scripts.
    - Interacts with other programs or resources on the web server.

An example includes creating new information in a database, ensuring the response contains a valid MIME message with appropriate header fields.

<div class="img-center"> 

![](/img/docs/010examplehttpserverresponsedatabase.png)

</div>

## MIME and HTTP

Originally designed for email and adapted for HTTP in web applications, MIME enables the sending of rich media, such as images and videos, through websites.

Resource Delivery in Web Applications:

- Modern web applications utilize various resources like images, videos, and animations.
- These assets need to be attached to HTTP requests to deliver a complete interactive experience.

MIME Features in HTTP:

- Adapted from email MIME format for HTTP use.
- No requirement for the message body to be seven-bit ASCII data, unlike some email systems.

MIME Message Components:

- Consists of a header with colon-separated fields.
- Simplest document includes a content-type line followed by a CRLF pair and the message body.

Content-Type Header Line:

- Identifies the data in the body.
- Comprises type and subtype fields, such as content-type: text/html.
- Used by the browser to select the appropriate application for displaying returned data.

Official Content Types:

- Defined by the Internet Assigned Numbers Authority (IANA).
- Growing list of content types to accommodate various data formats.

Some of the most common types are application, or JSON, plain, or text, and image, maybe PNG, for instance. 

<div class="img-center"> 

![](/img/docs/0101commontypeofapps.png)

</div>

Experimental content types are normally preceded by letters although as browsers and servers can negotiate acceptable types, this is not enforced. MIME also allows the server to send multipart messages. The message body can contain multiple MIME messages, each with a header specifying the type of body data. 

<div class="img-center"> 

![](/img/docs/010mimesenddifftypeofappdata.png)

</div>


## HTTP Usage vs. Email

In HTTP, each submessage can contain a comprehensive set of HTTP header fields, unlike email, which typically focuses on the content field alone. This allows for more detailed and specific communication between clients and servers.


**Example Scenario: File Upload**
Consider the process of uploading multiple photos to a website. The typical steps include:

- Selecting multiple files via a web interface.
- Each file is uploaded as a separate part within the HTTP message.
- Each part clearly defines the file data, ensuring proper handling and identification.

Importance of Multipart Messages:

- Multipart messages enable the uploading of multiple files simultaneously.
- Without this feature, users would be limited to uploading one file at a time.
