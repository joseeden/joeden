---
title: "Lab: Securing and Optimizing APIs"
description: "Lab: Securing and Optimizing APIs"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Monitoring 
- Observability
- APM
- Certifications
sidebar_position: 49
# last_update:
#   date: 3/29/2021
---


## Overview 

This lab demonstrates how to secure Azure Functions APIs, manage access with API keys, and apply APIM policies to improve reliability and performance.

## Pre-requisites 

- [Create a Azure Function App application](https://learn.microsoft.com/en-us/azure/azure-functions/functions-create-function-app-portal)
- [Create an API Management instance](https://learn.microsoft.com/en-us/azure/api-management/get-started-create-service-instance)

**Note:** If you're using the **Consumption** SKU for Function App, you may get an error when [adding the ratelimit policy](#rate-limiting) and [setting up usage quotas.](#setting-usage-quotas)

## Using API Keys 

API keys control access to APIs and ensure only authorized applications can make requests. Without the key, the API cannot be accessed and unauthorized users are blocked from retrieving sensitive or business-critical information.

### Function Authorization Level

Function keys are tied to individual functions, similar to a key for a specific door. Host and master keys work across all functions.

1. Open your **Function App** ➔ **Overview** ➔ **Functions** ➔ **Create in Azure Portal**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20230326.png)

    </div>

2. Select **HTTP trigger** ➔ **Next**. 

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20230433.png)

    </div>

3. Provide a name for the trigger and set **Authorization Level** to **Function.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20230548.png)

    </div>

4. Open the function ➔ **Get function URL** ➔ Copy the URL labelled *Function key*.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20230654.png)

    </div>

5. Verify that the URL works in the browser and returns a valid response.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20230739.png)

    </div>

### Admin Authorization Level 

1. Create another HTTP trigger but set **Authorization Level** to **Admin.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20230939.png)

    </div>

2. Open the function ➔ **Get function URL** ➔ Copy the URL with the *Function key* label.

3. Opening it in a browser, it returns a `401` response. 

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20231106.png)

    </div>

4. Try the other URL with *default (Host key)* label and check in the browser.
    
    It also returns a `401` response.

5. Finally, try the URL with *_master (Host key)* label and check in the browser.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20231208.png)

    </div>


:::info 

Admin-level functions can only be accessed by the host-level key. Master-level key is equivalent to the Host-level key and should also work.

:::

### Anonymous Authorization Level

1. Create another HTTP trigger but  set **Authorization Level** to **Anonymous.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20231348.png)

    </div>

2. Open the function ➔ **Get function URL** ➔ Copy any of the URL

3. All three URLs should work without a valid key.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20231510.png)

    </div>


## Managing API Keys 

Regularly updating keys reduces the risk of compromise, and creating new keys allows additional services or applications to access the API safely without exposing existing keys.

1. Navigate to your Function App and go to **Functions** ➔ **App keys**.

    You should see the two host keys here.

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-03-20231731.png)
    
    </div>
    

2. For both keys, click **Renew key value** ➔ **Renew and save**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20231837.png)

    </div>

3. Click **New host key** to create a new key.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20232000.png)

    </div>

4. Provide a name and value for the key,then click **Add**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20232111.png)

    </div>

5. You should now see three host keys.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20232157.png)

    </div>

5. Go back to **Overview** and click any non-anonymous function.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20232327.png)

    </div>

6. Click **Get function URL** and copy the URL with the `host2` label.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20232429.png)

    </div>

6. Open it in a browser. As you can see, the value for the host key is visible in the URL.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20232535.png)

    </div>

7. If you change the API key in the URL, it will return a `401` response.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20232643.png)

    </div>



Rotate keys periodically (e.g., monthly) to reduce the risk of compromise. Avoid rotating too often, which can disrupt clients.

## Add the APIs to APIM 

Import your Function App into APIM for centralized management.

1. Navigate to your Function app and confirm the three functions

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20233212.png)

    </div>

2. Now go to **API Management service** and open your APIM instance.

3. Go to **APIs** ➔ **APIs** ➔ **Create from Azure resource** ➔ **Function App**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20233556.png)

    </div>

    Click **Browse.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20233706.png)

    </div>

4. Choose your Function App ➔ **Select**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20233836.png)

    </div>

5. The two non-admin functions will appear here. Click **Select**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-234010.png)

    </div>

6. Review the details then click **Create**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20234136.png)

    </div>


After adding the API mapping, you will be directed to the management page where policies are configured. A policy will be added in the next section to validate requests before they reach the backend.

## Policies 

### Validate JWT Token 

Validating JWT tokens ensures that only clients with a legitimate token issued by an identity provider can access the API. This prevents unauthorized users from calling your services, protects sensitive data, and enforces access control at the API level.

1. Go to **API Management service** and open your APIM instance.

2. Proceed to **APIs** ➔ **APIs** ➔ Select the linked Function App 

3. You will see all endpoints that the Function App exposes.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21000138.png)

    </div>

4. Select the `POST` endpoint for `demo-anonymous-key`.

5. In the **Inbound processing** box, click **Add policy**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21000316.png)

    </div>

6. It will return all the available inbound policies. 

    Scroll down to the bottom and select the **Validate JWT** option.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21000427.png)

    </div>

7. Next, configure the policy as shown below:

    | Setting                         | Value                                   |
    | ------------------------------- | --------------------------------------- |
    | Header name                     | Authorization                           |
    | Failed validation HTTP code     | 401 - Unauthorized                      |
    | Failed validation error message | You are not allowed to use this service |
    | Audiences                       | example.com                             |

    The `Authorization` header is used because it is the standard way to send JWT tokens in API requests. This ensures all incoming requests include a valid token.

    Click **Save.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21000612.png)

    </div>

8. To test the policy, go to the **Test** tab. 

    Select the endpoint, enter the request payload below, and then click **Send**.

    ```bash
    {
        "name": "your name"
    }
    ```

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21000753.png)

    </div>

9.  After sending the request, go to the **HTTP response** section to see the result.

    ```bash
    {
        "statusCode": 401,
        "message": "You are not allowed to use this service"
    }
    ```

    Because the request does not include a valid JWT, it is rejected with a `401` response. This shows that only clients presenting a token issued by a trusted identity provider can access the API.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21000842.png)

    </div>

10. After completing this section, make sure to delete the policy and save.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21013340.png)

    </div>


### Rate-Limiting

APIs can be overwhelmed by sudden traffic spikes, misconfigured clients, or abusive requests. Implementing rate limiting protects the service, ensures consistent performance, and maintains reliable access for all authorized users.

1. Select the `POST` endpoint for `demo-function-key`.

2. Go to **Inbound processing** ➔ **Add policy**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21001317.png)

    </div>

3. View the available options, and select the **Limit call rate** card.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21001421.png)

    </div>

4. Configure the rate limiting policy.

    | Setting                  | Value            |
    | ------------------------ | ---------------- |
    | Number of calls          | 5                |
    | Renewal period (seconds) | 15               |
    | Counter key              | API subscription |
    | Increment condition      | Any request      |

    Click **Save.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21011557.png)

    </div>


5. Review the XML policy configuration and click **Save.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21011643.png)

    </div>

    **Note:** If you're using the **Consumption** SKU for Function App, you may get an error:

    ```bash
    One or more fields contain incorrect values:
    Error in element 'rate-limit-by-key' on line 11, column 10: Policy is not allowed in 'Consumption' sku
    ```

    <div>

    ![](/img/docs/Screenshot2026-03-21011717.png)

    </div>

6. Go to **Test** tab and click **Send** several times in a row.

    After sending too many requests in the configured period, you will get the following response: 

    ```bash
    {
        "statusCode": 429,
        "message": "Rate limit is exceeded. Try again in 9 seconds."
    }
    ```

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21012014.png)

    </div>

7. Wait for at least 15 seconds, the send the request again. This time, it should return a `200 OK` response.

8. After completing this section, remove the policy to ensure the endpoint remains fully accessible for later steps.


### Payload Transofrmation 

Payload transformation allows APIs to adapt request and response formats to meet client requirements. In this example, the Azure Function accepts JSON and returns plain text, but the client only supports XML. 

The goal is to apply an inbound policy that converts incoming XML requests into JSON for the backend and transforms the plain-text response into XML before returning it to the client.

1. Select the `POST` endpoint for `demo-anonymous-key` ➔ **Test**

2. Populate the **Request Body** and click **Send.**

    ```bash
    {
    "name": "Your name"
    }
    ```

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21013555.png)

    </div>

4. Scroll to the **HTTP Response** section to verify that the response returns plain text.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21013723.png)

    </div>

5. Go to the **Design** tab and make sure the correct `POST` HTTP endpoint is selected.

    In the **Inbound processing** card, click the `</>` icon (Policy code editor).

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21014021.png)

    </div>

6. Add the inbound payload transformation in the `inbound` section:

    ```xml
    <set-body>@{
        var doc = context.Request.Body
                .As<XDocument>(preserveContent: true);
        var name = doc.Root
                .Element("name")?
                .Value
                ?? string.Empty;
        var result = new JObject();
        result["name"] = name;
        return result.ToString();
    }</set-body>  
    ```

    Your code should resemble the example below:

    **Note**: Do not copy this code directly, as it does not include the function ID.

    ```xml
    <policies>
    <inbound>
        <base />
        <set-backend-service id="apim-generated-policy" backend-id="function-name" />
        <set-body>@{
            var doc = context.Request.Body
                    .As<XDocument>(preserveContent: true);
            var name = doc.Root
                    .Element("name")?
                    .Value
                    ?? string.Empty;
            var result = new JObject();
            result["name"] = name;
            return result.ToString();
        }</set-body>  
    </inbound>
    <backend>
        <base />
    </backend>
    <outbound>
        <base />
    </outbound>
    <on-error>
        <base />
    </on-error>
    </policies>
    ```

    **NOTE:** Do not save yet.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21014907.png)

    </div>


    This C# script converts an incoming XML request into JSON for the backend. The XML payload is stored in the `doc` variable, and the `<name>` element is extracted into the `name` variable. A JSON object is created in `result`, the `name` field is added, and the object is converted to a string to form the request payload sent to the backend.

    The `inbound` section defines request policies, and the `set-body` element handles the payload transformation to match the backend’s expected format.


7. Add the outbound payload transformation in the `outbound` section:

    ```xml
    <set-body>@{
        var text = context.Response.Body
                .As<string>(preserveContent: true);
        return new XElement("response", text).ToString();
    }</set-body>
    ```

    Click **Save.**

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-03-21015543.png)
    
    </div>
    
    The backend returns a plain-text response, which is stored in the `text` variable. This value is then wrapped in an XML element called `<response>`, creating a new XML structure. 
    
    Finally, the XML is converted to a string and returned as the API response.


8. Go to **Test** tab, add the following to the **Request body**, and click **Send.**

    ```bash
    <root>
    <name>your name</name>
    </root> 
    ```

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21015858.png)

    </div>

9. Check the **HTTP Response** to confirm the payload is wrapped in the `<response>` XML tag.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21020029.png)

    </div>


### CORS Policy 

CORS (Cross-Origin Resource Sharing) is a browser security feature that controls how a web page from one domain (like `example.com`) can request resources from another domain (like `api.example.org`). 

By default, browsers block cross-site requests to protect users from malicious sites accessing private data. With CORS, the API explicitly allows certain domains to make requests, enabling safe cross-domain communication.

This section demonstrates how to apply a CORS policy in APIM.

1. Select the `GET` endpoint for `demo-function-key`.

2. Go to **Inbound processing** ➔ **Add policy**.

3. Select **Allow cross-origin resource sharing (CORS) card**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21020547.png)

    </div>

4. Next, configure the CORS policy. 

    | Setting         | Value      |
    | --------------- | ---------- |
    | Allowed origins | `*`        |
    | Allowed methods | Select all |
    | Allowed headers | `*`        |

    Click **Save.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21020955.png)

    </div>

    The wildcard `*` allows any origin and method. This ensures browsers can call your API from any allowed domain safely.

Because CORS only affects browsers, testing with tools like curl or Postman does not fully reflect policy enforcement. To test effectively:

1. Copy the **Request URL** from the **Test** tab for the endpoint.

    Make sure to note it down. We'll use it later.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21030458.png)

    </div>


2. On your APIM instance, go to **APIs** ➔ **Subscriptions**.

    For the Built-in all-access subscription, click the three dots on the right and select **Show/hide keys**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21025308.png)

    </div>

    :::info 

    The **Built-in all-access** subscription is automatically created for every APIM instance. It provides a default key so you can test your APIs without creating a new subscription.

    :::

    When prompted, click **OK.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21025430.png)

    </div>

3. Copy the primary key and note it down.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21025545.png)

    </div>

4. Open a terminal and save the request URL and subscription key to variables:

    ```bash
    APIM_URL="https://you-apim-url"
    SUBSC_KEY="your-subsc-key"
    ```

    Use `cURL` to send a `GET` request to your APIM endpoint, including the `Origin` header:

    ```bash
    curl -i \
    -H "Ocp-Apim-Subscription-Key: $SUBSC_KEY" \
    -H "Origin: https://example.com" \
    $APIM_URL;echo
    ```

    To confirm CORS is working, check for this header in the response:

    ```bash
    Access-Control-Allow-Origin: *
    ```

    This confirms that the API allows cross-origin requests from any origin.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21031118.png)

    </div>

Note that this test isn’t fully accurate because `curl` and other non-browser clients ignore CORS. Even if you delete the CORS policy, the request will still succeed.

CORS only affects browsers. It controls whether JavaScript on a page from one origin can access an API on another origin. To test it correctly, you need to make a request from a web page hosted on a different origin than your API.

1. Create a local HTML file called `test-cors.html` on your computer.

    **Note:** Make sure to set your APIM URL in `apiURL` and subscription key in `subKey`.

    ```html
    <!DOCTYPE html>
    <html>

    <head>
    <title>CORS Test</title>
    </head>

    <body>
    <h3>APIM CORS Test</h3>
    <script>
        // Replace with your APIM endpoint
        const apiUrl = "https://YOUR-API-URL";

        // Replace with your subscription key
        const subKey = "YOUR-SUBSCRIPTION-KEY";

        fetch(apiUrl, {
        method: "GET",
        headers: {
            "Ocp-Apim-Subscription-Key": subKey
        }
        })
        .then(response => response.text())
        .then(data => {
            console.log("API Response:", data);
            document.body.innerHTML += "<p>Success! Check console for response.</p>";
        })
        .catch(error => {
            console.error("CORS error:", error);
            document.body.innerHTML += "<p>CORS blocked the request. See console.</p>";
        });
    </script>
    </body>

    </html>
    ```

2. Double-click `test-cors.html` to open it in Chrome, Edge, or Firefox.

    Since the CORS policy is enabled, you should see a `Success` message.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21032413.png)

    </div>

    If you open **Developer Tools** ➔ **Console**, you should see no errors.

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-03-21033552.png)
    
    </div>
    
3. Go back to the endpoint and delete the CORS policy.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21032454.png)

    </div>


4. Double-click `test-cors.html` again to reopen it. 

    You should now see that CORS have blocked the request.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21033226.png)

    </div>

    Checking **Developer Tools**, you should now see error...with..

    ```bash
    Access to fetch at 'https://YOUR-APIM-URL' from origin 'null' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.      
    ```

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-03-21033737.png)
    
    </div>

## Caching and Usage Quotas 

### Enabling Response Caching 

Response caching helps improve API performance and reduces load on backend services by temporarily storing responses. Instead of invoking the backend for every request, APIM can serve repeated requests from the cache, which makes APIs faster and more efficient.

This section shows how to add a response caching policy to an HTTP endpoint in APIM and where to configure it.

1. Choose the `GET` endpoint for `demo-function-key`

2. Proceed to **Inbound procesing** ➔ **Add policy**

3. From the available policies, select the **Cache responses** option.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21034635.png)

    </div>

4. Set the cache duration to 15 seconds. 

    This means that each cached response will be removed after 15 seconds and will need to be created again.

    Click **Save.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21034950.png)

    </div>

5. The `cache-lookup` and `cache-store` policies should now appear in inbound and outbound repsectively.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21052500.png)

    </div>

6. Go to **Test** and hit **Send** to verify the API works. 

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21052727.png)

    </div>

    :::info 

    There’s no fully accurate way to verify response caching just by sending requests to the APIM URL, even with curl. 

    APIM caching works outside the backend, so even if the function generates dynamic values like timestamps or random IDs, these will not reflect whether the response is being served from the cache. 
    
    To verify that caching is working correctly, you need to review APIM’s **Trace** or **Cache Hit** metrics, which show whether repeated requests are being returned from the cache without invoking the backend.

    :::

7. After completing this section, make sure to delete the policy. 

### Setting Usage Quotas

Usage quotas help control how many times an API can be called within a specific period. This protects your backend from overuse, ensures fair usage across clients, and prevents accidental or abusive traffic from affecting other users.

1. Select the `POST` endpoint for `demo-function-key`

2. Go to **Inbound procesing** ➔ **Add policy**

3. From the policies, select the **Set usage quota by key** option.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21053144.png)

    </div>

4. Configure the usage quota policy:

    | Setting                     | Value            |
    | --------------------------- | ---------------- |
    | Limited by                  | Number of Calls  |
    | Number of Calls             | 5                |
    | Renewal period (in seconds) | 15               |
    | Counter key                 | API subscription |

    Click **Save**

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-03-21053821.png)
    
    </div>

5. Review the generated XML configuration and save.

    **UPDATE:** The usage quotas can only be configured on premium APIM tier, so I didn't proceed with saving and testing this.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-21053935.png)

    </div>
