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

Parsing means analyzing a message, breaking it into its component parts, and understanding their purposes in context. When messages are transmitted between computers, they travel as a stream of characters, which is effectively a string. This needs to be parsed into a semantically-equivalent data-structure containing data of recognized types (such as integers, floats, strings, etc.) before the application can interpret and act upon the data.

Serializing is roughly the opposite of parsing. To communicate information with a REST interface, for example, you may be called upon to take locally-stored data (e.g., data stored in Python dictionaries) and output this as equivalent JSON, YAML, or XML in string form for presentation to the remote resource.

### An Example

For example, imagine you wanted to send an initial query to some remote REST endpoint, inquiring about the status of running services. To do this, typically, you would need to authenticate to the REST API, providing your username (email), plus a permission key obtained via an earlier transaction. You might have stored username and key in a Python dictionary, like this:
```json
auth = {
  "user": {
    "username": "myemail@mydomain.com",
    "key": "90823ff08409408aebcf4320384"
  }
}
```

But the REST API requires these values to be presented as XML in string form, appended to your query as the value of a key/value pair called "auth":
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

You would typically use a serialization function (from a Python library) to output your auth data structure as a string in XML format, adding it to your query:
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

In this case, the untangle library would parse the XML into a dictionary whose root element (services) contains a list (service[]) of pairs of key/value object elements denoting the name and status of each service. You could then access the 'cdata' value of elements to obtain the text content of each XML leaf node. The above code would print:
```bash
Service B  Idle
```

Popular programming languages such as Python generally incorporate easy-to-use parsing functions that can accept data returned by an I/O function and produce a semantically-equivalent internal data structure containing valid typed data. On the outbound side, they contain serializers that do the opposite, turning internal data structures into semantically-equivalent messages formatted as character strings.
