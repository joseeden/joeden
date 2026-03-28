---
title: "Troubleshooting"
description: "Troubleshooting REST API Requests"
tags:
- Computer Science
- Application Development
- Software Development
- APIs
sidebar_position: 30
last_update:
  date: 8/2/2021
---



## Overview

When working with REST APIs, things don’t always go as expected. Troubleshooting involves checking both client-side and server-side issues. Always have the **API reference guide** and authentication details in hand.

- Check client-side errors first
- Verify server-side functionality if the client is fine
- Read HTTP status codes to identify issues

Start by analyzing the error messages or tracebacks. They often point directly to the root cause.

## No Response from the API Server

Not every API request returns a status code. If the server is unreachable, you get no response.

### Client-side Errors

Check these first, since they are easier to fix.

1. **User error** - Mistyped URI or missing parameters

2. **Invalid URI** - Ensure the URL includes the scheme (`http://` or `https://`)

    Example of a missing scheme in Python:

    ```python
    import requests
    uri = "sandboxapi.example.com/v1/devices"
    resp = requests.get(uri, verify=False)
    ```

    Error output:

    ```python
    requests.exceptions.MissingSchema: Invalid URL 'sandboxapi.example.com/v1/devices': No schema supplied
    ```

3. **Wrong domain** - The hostname may be incorrect

    ```python
    import requests
    url = "https://wrongapi.example.com/v1/devices"
    resp = requests.get(url, verify=False)
    ```

    Error:

    ```python
    requests.exceptions.ConnectionError: Failed to establish a new connection
    ```

4. **Connectivity issues** - Proxy, firewall, VPN, or SSL errors

5. **Invalid certificate** - For HTTPS, use `verify=False` in Python if certificates aren’t valid

    ```python
    resp = requests.get(url, verify=False)
    ```


**Resolution**: Analyze client errors from tracebacks and logs. They are usually easy to fix.


### Server-side Errors

If the client is correct, check the server:

1. **Server status** - Is the API server powered on and accessible?

2. **Network issues** - IP or domain might be unreachable

    Test connectivity with Python:

    ```python
    import requests
    url = "https://203.0.113.10/v1/devices"
    resp = requests.get(url, verify=False)
    ```

    Error if unreachable:

    ```python
    requests.exceptions.ConnectionError: Failed to establish a new connection
    ```

3. **Communication issues** - Responses may be blocked or lost between server and client


**Resolution**: Contact the server administrator for server-side issues.

## Reading Status Codes

HTTP status codes indicate the result of a request. The first digit shows the class of response:

| Status Code | Meaning       | Description                                                   |
| ----------- | ------------- | ------------------------------------------------------------- |
| **1xx**     | Informational | Request received and continuing to process                    |
| **2xx**     | Success       | Request successfully received, understood, and accepted       |
| **3xx**     | Redirection   | Further action needed to complete the request                 |
| **4xx**     | Client error  | Bad request or unauthorized; issue on the client side         |
| **5xx**     | Server error  | Server failed to fulfill a valid request; issue on the server |

Always check the **response body** along with the status code to find the cause of errors.

## Common `2xx` and `4xx` Codes

### `2xx` – Success

The request succeeded, but verify the action actually completed.When the client receives a 2xx response code, it means the client's request was successfully received and accepted. However, you should always verify that the response indicates success of the right action and that the script is doing what you think it should.


### `4xx` – Client errors

A **4xx** response means the request has a problem on the client side. Some servers may include a message explaining the error. Here’s a simplified guide for common 4xx codes.

1. **400 Bad Request** - Syntax or missing data

    This happens when the request has a malformed URL, missing parameters, or a JSON syntax issue. Always check the API endpoint and payload.

    Example:

    ```python
    import requests
    url = "http://api.example.com/v1/items/id/"
    resp = requests.get(url, auth=("user","pass"), verify=False)
    print(resp.status_code, resp.text)
    ```

    The server responds with 400 and a message like "No id field provided" because id is required. Correct the URI or payload:

    ```python
    import requests
    url = "http://myservice/api/v1/resources/house/rooms/id/1001001027331"
    resp = requests.get(url,auth=("person2","super"),verify = False)
    print (resp.status_code)
    print (resp.text)
    ```

2.  **401 Unauthorized** - Missing or wrong credentials

    The server could not authenticate your request. Check username, password, API key, or token.

    Example:

    ```python 
    import requests
    url = "http://myservice/api/v1/resources/house/rooms/all"
    resp = requests.get(url,verify = False)
    print (resp.status_code)
    print (resp.text)
    ```

    This returns 401 because credentials are missing. Add them:
    
    ```python
    import requests
    url = "http://myservice/api/v1/resources/house/rooms/all"
    resp = requests.get(url,auth=("person1","great"),verify = False)
    print (resp.status_code)
    print (resp.text)
    ```

3. **403 Forbidden** - Credentials correct, but insufficient privileges

    In this case, the server knows who you are but blocks access because your account lacks permissions.

    Example:

    ```python
    import requests
    url = "http://myservice/api/v1/resources/house/rooms/id/1"
    resp = requests.get(url,auth=("person1","great"),verify = False)
    print (resp.status_code)
    print (resp.text)
    ```

    This fails because `person1` doesn’t have access. Use an account with proper privileges:

    ```python
    import requests
    url = "http://myservice/api/v1/resources/house/rooms/id/1"
    resp = requests.get(url,auth=("person2","super"),verify = False)
    print (resp.status_code)
    print (resp.text)
    ```

4. **404 Not Found** - Resource or URI doesn’t exist

    The server cannot find the requested resource. Always double-check the URI.

    If the code used to work, you may want to check the latest API reference guide, as an API's syntax can change over time.

    ```python
    import requests
    url = "http://myservice/api/v1/resources/house/room/all"
    resp = requests.get(url,auth=("person1","great"),verify = False)
    print (resp.status_code)
    print (resp.text)
    ```

    The actual URI is `/api/v1/resources/house/rooms/all`. Fix the URI:

    ```python
    import requests
    url = "http://myservice/api/v1/resources/house/rooms/all"
    resp = requests.get(url,auth=("person1","great"),verify = False)
    print (resp.status_code)
    print (resp.text)
    ```


5. **405 Method Not Allowed** - HTTP method not supported 

    In this case, the server recognizes the URI but rejects the HTTP method. Check allowed methods. The response from server may also include an `Allow` header containing a list of valid methods for the requested resource.

    For example, if you mistakenly use the `POST` method for an API that expects the `GET` method, you will receive a `405` error.

    ```python
    import requests
    url = "http://myservice/api/v1/resources/house/rooms/id/1"
    resp = requests.post(url,auth=("person2","super"),verify = False)
    print (resp.status_code)
    print (resp.text)
    ```


6. **406 Not Acceptable** - Resource cannot provide content type requested

    The server has the data, but cannot represent it using any of the options listed in the client's `Accept` headers.

    For example, the client is asking for SVG images: `Accept: image/svg+xml`

    ```python
    import requests
    headers = {'Accept': 'image/svg+xml'}
    url = "http://myservice/api/v1/resources/house/rooms/id/1"
    resp = requests.get(url,headers=headers,auth=("person2","super"),verify = False)
    print (resp.status_code)
    print (resp.text)
    ```

    In this case, the server does not support the requested resource (`image/svg+xml`) so it responds with a 406 error.


7. **407 Proxy Authentication Required** - Must authenticate with proxy

    This is like a `401` error, but it means the client must authenticate with a proxy server first. The `407` status indicates there’s a proxy between the client and server, and the proxy requires credentials before forwarding the request.

8. **409 Conflict** - Resource conflict, retry later

    The request can’t be completed because the target resource is in a conflicting state.

    For example, if multiple users are editing the same resource at the same time, a 409 error may occur. Trying the request again later may succeed once the conflict is resolved on the server.

9.  **415 Unsupported Media Type**: Sent body format not supported

    In this case, the client sent a request body in a format that the server does not support. For example, if the client sends XML to a server that only accepts JSON, the server would return a `415` error.

    ```python
    import requests
    headers = {"content-type":"application/xml"}
    url = "http://myservice/api/v1/resources/house/rooms/id/1"
    resp = requests.get(url,headers=headers,auth=("person2","super"),verify = False)
    print (resp.status_code)
    print (resp.text)
    ```

    To fix this, omit the header or add a header (`"content-type":"application/json"`):

    ```python
    import requests
    headers = {"content-type":"application/json"}

    url = "http://myservice/api/v1/resources/house/rooms/id/1"
    resp = requests.get(url,headers=headers,auth=("person2","super"),verify = False)
    print (resp.status_code)
    print (resp.text)
    ```

## `5xx` Status Codes

A **5xx** response indicates a server side error.

**Resolution**: For 500/501, check your request. For other 5xx errors, contact the server administrator.

| Status Code | Name                  | Description                                                                                     |
| ----------- | --------------------- | ----------------------------------------------------------------------------------------------- |
| **500**     | Internal Server Error | Server encountered an unexpected condition and could not complete the request                   |
| **501**     | Not Implemented       | Server does not support the functionality required to fulfill the request, e.g., unknown method |
| **502**     | Bad Gateway           | Server acting as a gateway received an invalid response from an upstream server                 |
| **503**     | Service Unavailable   | Server cannot handle the request due to overload or maintenance; usually temporary              |
| **504**     | Gateway Timeout       | Server acting as a gateway did not get a timely response from an upstream server                |


