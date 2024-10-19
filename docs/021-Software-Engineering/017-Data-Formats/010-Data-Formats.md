---
title: "Data Formats"
description: "Parsing and serializing different data formats"
tags: [Computer Science, Application Development, Software Development]
sidebar_position: 9
last_update:
  date: 3/14/2022
---


## Data Formats

Rest APIs enable information exchange with remote services and devices. Interfaces built on these APIs, like command-line tools and SDKs, facilitate this process. When interacting with APIs through software, it’s essential to use standard, machine-readable formats for efficient data handling.

Benefits of using standard formats include:

- **Seamless Integration**  
  - Convert messages into language-specific structures for easy manipulation.  
  - Ensure compatibility with various software tools.

- **Message Composition**  
  - Simplify code for composing understandable messages.  
  - Improve communication efficiency.

- **Message Interpretation**  
  - Verify received messages for correct handling.  
  - Create test messages manually.

- **Error Detection**  
  - Quickly identify malformed messages from transmission issues.  
  - Enhance troubleshooting processes.

The three most popular formats for API communication are XML, JSON, and YAML. YAML, a superset of JSON, allows easy conversion, while XML is more complex and less compatible.

Interacting with APIs often follows this pattern:

1. **Authenticate**  
   - Send credentials via POST to receive a token.  
   - Secure further requests with the token.

2. **Retrieve Resource**  
   - Execute a GET request for XML, JSON, or YAML output.  
   - Access the current state of a resource.

3. **Modify Data**  
   - Adjust the received data as needed.  
   - Prepare data for further processing.

4. **Update Resource**  
   - Use POST (or PUT) to send changes back.  
   - Confirm success through the response.



## Parsing and Serializing

**Parsing** involves analyzing a message to break it into components for understanding. Messages are transmitted as strings and need to be converted into structured data types for processing.

- Breaks down strings into recognized types.
- Enables applications to interpret data correctly.
- Essential for data handling in communication.

**Serializing** is the reverse process. When using a REST interface, it often requires converting locally stored data into string formats like JSON, YAML, or XML to share with remote resources.

- Transforms data structures (e.g., dictionaries) into strings.
- Prepares data for transmission via APIs.
- Facilitates interaction with remote services.

#### Example

Suppose you want to check the status of running services from a remote REST API. First, you need to authenticate using your username (email) and a permission key. You might store these in a Python dictionary like this:

```json
auth = {
  "user": {
    "username": "myemail@mydomain.com",
    "key": "90611ff87219461aebcf1234567"
  }
}
```

However, the REST API requires these values in XML format as part of your query:

```bash
https://myservice.com/status/services?auth=<XML string containing username and key>
```

The XML itself might need to take this format, with Python key values converted to same-name tag pairs, enclosing data values:

```xml
<user>
  <username>myemail@mydomain.com</username>
  <key>90823ff08409408aebcf4320384</key>
</user>
```

You can use a serialization function from a Python library to convert your dictionary to an XML string and include it in your request:

```python
import dicttoxml    # serialization library
import requests     # http request library
auth = {            # Python dict, containing authentication info
  "user": {
    "username": "myemail@mydomain.com",
    "key": "90823ff08409408aebcf4320384"
  }
}
get_services_query = "https://myservice.com/status/services"
xmlstring = dicttoxml(auth)       # convert dict to XML in string form
myresponse = requests.get(get_services_query,auth=xmlstring)  # query service
```

At this point, the service might reply, setting the variable myresponse to contain a string like the following, containing service names and statuses in XML format:

```xml
<services>
  <service>
    <name>Service A</name>
    <status>Running</status>
  </service>
  <service>
    <name>Service B</name>
    <status>Idle</status>
  </service>
</services>
```

You would then need to parse the XML to extract information into a form that Python could access conveniently.

```python
import untangle     # xml parser library
myreponse_python = untangle.parse(myresponse)
print myreponse_python.services.service[1].name.cdata,myreponse_python.services.service[1].status.cdata
```

In this case, the `untangle` library converts the XML into a dictionary format, allowing easy access to service details. The above code would print:

```bash
Service B  Idle
```

Popular programming languages like Python offer user-friendly parsing functions that convert data from I/O operations into internal data structures with valid types. They also include serializers that transform these internal structures back into formatted strings for output.