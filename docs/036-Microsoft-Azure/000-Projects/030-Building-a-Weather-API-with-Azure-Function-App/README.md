---
title: "Building a Restaurant API"
description: "Building a Restaurant API using Azure Function Apps"
tags:
- Cloud
- Microsoft Azure
- DevOps
- API Design
- API Management
sidebar_position: 30
# last_update:
#   date: 9/11/2023
---


## Overview

This project creates a set of **restaurant APIs** using Azure Function Apps. These APIs provide key functionality for a restaurant system and can be extended later to connect to databases or external services.

| API Name                   | Description                                                           |
| -------------------------- | --------------------------------------------------------------------- |
| Demo API                   | A simple HTTP-triggered function that returns a personalized greeting.|
| Restaurant Menu API        | Returns the restaurant’s menu with categories and items.              |
| Restaurant Orders API      | Allows creating or viewing orders from customers.                     |
| Restaurant Reservation API | Handles table reservations and booking requests.                      |
| Restaurant Info API        | Provides restaurant details such as address, hours, and contact info. |

Azure Function Apps are ideal for this project because they:

- Deploy APIs quickly with minimal setup  
- Automatically scale to handle traffic spikes  
- Keep costs low when demand is quiet  


## Create the Azure Function App

1. Navigate to **Function App** in the Azure portal and click **Create**.

    <div class='img-center'>  

    ![](/img/docs/Screenshot2026-03-19215836.png)  

    </div>  

2. Choose **Consumption** plan and confirm when prompted.

    <div class='img-center'>  

    ![](/img/docs/Screenshot2026-03-19220002.png)  

    </div>  

3. Fill in the required details:

    - **Name** for your Function App
    - **Runtime stack**: NodeJS
    - **Region**: East US  

    A few notes:

    - If you choose Windows as OS, you can use NodeJS as runtime stack. 
    - If you choose Linux as OS, you can use Python as runtime stack. 

    Click **Review + create**, then **Create**. 
    
    The resource may take a few moments to provision.

    <div class='img-center'>  

    ![](/img/docs/Screenshot2026-03-20005059.png)  

    </div>  

4. Once the app is deployed, go to the app and click **Browse.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-320005849.png)

    </div>

    This should open the app in a new tab.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20005933.png)

    </div>

## Demo API

### Create a Simple Demo API

1. Open your Function App and click **Create in Azure portal**.

    <div class='img-center'>  

    ![](/img/docs/Screenshot2026-03-20010025.png)  

    </div>  

2. Select **HTTP trigger** ➔ **Next**.

    <div class='img-center'>  

    ![](/img/docs/Screenshot2026-03-20010135.png)  

    </div>  

3. Provide a name for the function and click **Create**.

    For example: `demo-function`

    <div class='img-center'>  

    ![](/img/docs/Screenshot2026-03-20011320.png)  

    </div>  

4. Opening the function, you should see the code.

    Note: This would be the code if your App is in Node.js. 
    You might see a different one if you are using Python.

    ```js
    module.exports = async function (context, req) {
        context.log('JavaScript HTTP trigger function processed a request.');

        const name = (req.query.name || (req.body && req.body.name));
        const responseMessage = name
            ? "Hello, " + name + ". This HTTP triggered function executed successfully."
            : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };
    }
    ```

  <div class='img-center'>
  
  ![](/img/docs/Screenshot2026-03-20011411.png)
  
  </div>
  


### Test the Demo API

1. Click **Get function URL** at the top.

    <div class='img-center'>  

    ![](/img/docs/Screenshot2026-03-20011456.png)  

    </div>  

2. Copy any of the URL and open it in a browser. 

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20011530.png)

    </div>

    Example URL:

    ```
    https://restaurant-services-ghc9huftbndwgjhd.eastus-01.azurewebsites.net/api/demo-function?code=TC9S-Cm4w2jWcBTKE_CXfee8Nql2sx13tUUvp5M5DKPiAzFugCV4Ag==
    ```

    If the function works correctly, you should see:

    ```plaintext
    This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.
    ```

    <div class='img-center'>  

    ![](/img/docs/Screenshot2026-03-20011625.png)  

    </div>  

3. To personalize the response, append a query parameter.

    As an example, to add the name "Max":

    ```bash
    &name=Max 
    ```

    If the function URL is like this:

    ```bash
    https://restaurant_menu_items-axb7bxfxgwg6g4dd.eastus-01.azurewebsites.net/api/restaurant_menu_items?code=HNb7pRQ== 
    ```

    Then appending the query parameter will look like this:

    ```bash
    https://restaurant_menu_items-axb7bxfxgwg6g4dd.eastus-01.azurewebsites.net/api/restaurant_menu_items?code=HNb7pRQ==&name=Max 
    ```

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20011711.png)

    </div>


4. You can also test this function using **Postman** or **cURL** by sending a POST request with JSON body:

    ```bash
    APP_URL="<add-app-url-here>"

    curl -X POST $APP_URL \
    -H "Content-Type: application/json" \
    -d '{"name":"Max"}'; echo
    ```

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-03-20012418.png)
    
    </div>
    


## Restaurant Menu API 

This API provides the full restaurant menu organized by categories like starters, mains, and desserts. It is a read-only endpoint for now.

### Adding the Menu API Endpoint

Add a REST API endpoint to provide a static restaurant menu. This endpoint can later be extended to fetch live data from a database, but for now it returns a fixed JSON object representing menu items.

Start with creating a new HTTP Trigger Function:

1. In your Function App, click **Create** to add another function.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20012535.png)

    </div>

2. Select **HTTP trigger** → **Next**.

3. Name the function `restaurant_menu_items` and click **Create**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20012643.png)

    </div>

4. **If your Azure Function App is in Python:** Open the function and replace the default code with the following code.

    This is the endpoint code that will return the menu data when invoked

    **Note:** Make sure to click **Save.**

    ```python 
    import azure.functions as func
    import json

    app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

    MENU = {
        "starters": ["Tomato Soup", "Garlic Bread"],
        "mains": ["Margherita Pizza", "Pasta Carbonara"],
        "desserts": ["Tiramisu", "Gelato"]
    }

    @app.route(route="restaurant_menu_items", methods=["GET"])
    def get_menu(req: func.HttpRequest) -> func.HttpResponse:
        return func.HttpResponse(
            body=json.dumps(MENU),
            mimetype="application/json",
            status_code=200
        )
    ```

    This code defines and exposes an HTTP endpoint for the function:

    - `@app.route(...)` is a decorator that registers the function as an HTTP-triggered Azure Function.
    - `route="restaurant_menu_items"` specifies the URL path where the function is accessible (e.g., `/restaurant_menu_items`).
    - `methods=["GET"]` restricts the endpoint to only accept GET requests.
    - `def get_menu(req: func.HttpRequest) -> func.HttpResponse` defines the function that runs when the endpoint is called.
    - `func.HttpResponse(...)` constructs and returns the HTTP response to the client.


5. **If your Azure Function App is in NodeJS:** Open the function and replace the default code with the following code.

    This is the endpoint code that will return the menu data when invoked.

    **Note:** Make sure to click **Save.**

    ```javascript
    module.exports = async function (context, req) {
        context.log('Restaurant menu API called');

        // Define the static menu
        const MENU = {
            starters: ["Tomato Soup", "Garlic Bread"],
            mains: ["Margherita Pizza", "Pasta Carbonara"],
            desserts: ["Tiramisu", "Gelato"]
        };

        // Send the menu as a JSON response
        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(MENU)
        };
    };
    ```
    
    **Additional:** In Node.js, you don't need to create an `app` object or set `http_auth_level` in code to reference the Azure Function. This configuration is handled by Azure through either:

    - The function settings (UI / portal)
    - Or the `function.json` file (behind the scenes)

    Instead of code like Python, Node.js uses config like this (auto-generated):

    ```json
    {
      "bindings": [
        {
          "authLevel": "function",
          "type": "httpTrigger",
          "direction": "in",
          "name": "req",
          "methods": ["get", "post"]
        }
      ]
    }      
    ```

    You usually **don’t edit this manually** when using the Azure Portal, it’s set when you create the function.

### Testing the Menu API 

You can test the API by retrieving the function URL and opening it in a browser, or by using the **Test/Run** tool in the Azure portal.

1. Click **Get function URL** and copy any of the URLs.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20012821.png)

    </div>

2. Open a new tab and paste the URL. It should return restaurant menu data.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20003110.png)

    </div>

3. Go back to the function and click **Test/Run** ➔ `HTTP method: GET`

    You can choose any of the URL in the **Key** dropdown. 

    Then click **Run**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20003334.png)

    </div>

4. The response should return a `200 OK` status code along with the menu data in the response body.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-20012903.png)

    </div>

    Testing using cURL:

    ```bash
    APP_URL="<add-app-url-here>"  
    curl -sX GET $APP_URL | jq
    ```

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-03-20013133.png)
    
    </div>
    
### Create the other APIs
 
Follow the same steps to set up the other APIs.

After completing them, your Azure Function App should display all the functions like this:

<div class='img-center'>

![](/img/docs/Screenshot2026-03-20021917.png)

</div>


## Restaurant Orders API

This API manages customer orders. It allows clients to submit new orders and view existing orders. Currently, it returns a static set of sample orders.

Follow the same steps to create an HTTP trigger function as before.

If you are using Python:

```python
import azure.functions as func
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

ORDERS = [
    {"id": 1, "item": "Margherita Pizza", "quantity": 2},
    {"id": 2, "item": "Pasta Carbonara", "quantity": 1}
]

@app.route(route="restaurant_orders", methods=["GET"])
def get_orders(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        body=json.dumps(ORDERS),
        mimetype="application/json",
        status_code=200
    )
```

If you are using Node.js:

```javascript
module.exports = async function (context, req) {
    const ORDERS = [
        { id: 1, item: "Margherita Pizza", quantity: 2 },
        { id: 2, item: "Pasta Carbonara", quantity: 1 }
    ];

    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ORDERS)
    };
};
```

Using **Test/Run** to confirm the API is working:

<div class='img-center'>

![](/img/docs/Screenshot2026-03-20015658.png)

</div>


## Restaurant Reservation API

This API handles table reservations. Clients can view available slots or submit reservation requests. For now, it returns static sample reservation data.

Follow the same steps to create an HTTP trigger function as before.

If you are using Python:

```python
import azure.functions as func
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

RESERVATIONS = [
    {"table": 1, "time": "18:00", "status": "available"},
    {"table": 2, "time": "19:00", "status": "reserved"}
]

@app.route(route="restaurant_reservations", methods=["GET"])
def get_reservations(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        body=json.dumps(RESERVATIONS),
        mimetype="application/json",
        status_code=200
    )
```

If you are using Node.js:

```javascript
module.exports = async function (context, req) {
    const RESERVATIONS = [
        { table: 1, time: "18:00", status: "available" },
        { table: 2, time: "19:00", status: "reserved" }
    ];

    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(RESERVATIONS)
    };
};  
```

Testing using the function URL in a browser:

<div class='img-center'>

![](/img/docs/Screenshot2026-03-20020955.png)

</div>


## Restaurant Info API

This API provides basic restaurant information such as the address, opening hours, and contact details. It is useful for displaying restaurant details in a mobile or web app.

Follow the same steps to create an HTTP trigger function as before.

If you are using Python:

```python
import azure.functions as func
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

INFO = {
    "name": "Hapag Kainan",
    "address": "123 Main Street",
    "hours": "10:00 - 22:00",
    "contact": "123-456-7890"
}

@app.route(route="restaurant_info", methods=["GET"])
def get_info(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        body=json.dumps(INFO),
        mimetype="application/json",
        status_code=200
    )  
```

If you are using Node.js:

```javascript
module.exports = async function (context, req) {
    const INFO = {
        name: "Hapag Kainan",
        address: "123 Main Street",
        hours: "10:00 - 22:00",
        contact: "123-456-7890"
    };

    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(INFO)
    };
};
```

Testing using cURL:

```bash
APP_URL="<add-app-url-here>"
curl -sX GET $APP_URL | jq
```

<div class='img-center'>

![](/img/docs/Screenshot2026-03-20021649.png)

</div>
