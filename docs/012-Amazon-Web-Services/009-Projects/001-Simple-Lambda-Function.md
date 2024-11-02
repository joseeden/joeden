---
title: Simple Lambda Function
tags: [Linux, AWS, Labs]
sidebar_position: 1
# last_update:
#   date: 11/2/2024
---


## Pre-requisites 

- An AWS account 
- A Github account 

## Create the Lambda Function 

Login to your AWS account and go to **Lambda** then **Create Function**.

In the **Create function** page, enter the details below. Once done, click the Create function at the bottom.

<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function.png)

</div>

You should now see the Function overview and the Code source sections.

<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function-done-creating.png)

</div>

## Testing the Function

We can test the Lambda function directly by clicking the **Test** button then select **Create new test event**.

<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function-create-new-test-event.png)

</div>

Enter the test name and under **Template**, click the dropdown bar and select **APPI Gateway AWS Proxy.**

<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function-select-test-template.png)

</div>

Click Save and then Invoke.

<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function-save-test-and-invoke.png)

</div>

You should see the complete response and logs:

```bash
Status: Succeeded
Test Event Name: (unsaved) test event

Response:
{
  "statusCode": 200,
  "body": "\"Hello from Lambda!\""
}

Function Logs:
START RequestId: 3ab4d326-d4eb-413e-ab2a-859370555567 Version: $LATEST
END RequestId: 3ab4d326-d4eb-413e-ab2a-859370555567
REPORT RequestId: 3ab4d326-d4eb-413e-ab2a-859370555567	Duration: 13.35 ms	Billed Duration: 14 ms	Memory Size: 128 MB	Max Memory Used: 68 MB	Init Duration: 175.55 ms

Request ID: 3ab4d326-d4eb-413e-ab2a-859370555567 
```

## Adding Changes to the Code 

Modify the code by printing out the event.

```JavaScript
export const handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
    event: event
  };
  return response;
};
```

Whenever you make changes to the code, you need to Save and Deploy. It will commonly be set to Auto Save, but to check, you can click the menu button > Auto Save

<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function-auto-save.png)

</div>

You will also a message at the left: "You have undeployed changes". 
Click the Deploy button then click the Invoke once again.
<!-- 
<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function-make0-change-deploy.png) 

</div> -->

<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function-make0-change-deploy-2.png)

</div>

It will return more details in the output response:

```bash
Status: Succeeded
Test Event Name: (unsaved) test event

Response:
{
  "statusCode": 200,
  "body": "\"Hello from Lambda!\"",
  "event": 
  {
    "body": "eyJ0ZXN0IjoiYm9keSJ9",
    "resource": "/{proxy+}",
    "path": "/path/to/resource",
    "httpMethod": "POST",
    "isBase64Encoded": true,
    "queryStringParameters": {
      "foo": "bar"
    },
    "multiValueQueryStringParameters": {
      "foo": [
        "bar"
      ]
    },
    "pathParameters": {
      "proxy": "/path/to/resource"
    },
    "stageVariables": {
      "baz": "qux"
    }
}

....

Function Logs:
START RequestId: c6c8cfb6-afdc-4b46-ac4a-f4cad9c87a96 Version: $LATEST
END RequestId: c6c8cfb6-afdc-4b46-ac4a-f4cad9c87a96
REPORT RequestId: c6c8cfb6-afdc-4b46-ac4a-f4cad9c87a96	Duration: 103.55 ms	Billed Duration: 104 ms	Memory Size: 128 MB	Max Memory Used: 68 MB

Request ID: c6c8cfb6-afdc-4b46-ac4a-f4cad9c87a96 
```


## Monitoring the Function 

Click the Monitor tab to see the metrics of your Lambda function. 

Click **View CloudWatch logs**.

<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function-monitor-function.png)

</div>

Select the latest log stream. The log events will be displayed here. You can click each event to see more details about the event

<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function-cloudwatch-select-latest-logstream.png)

</div>

<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function-cloudwatch-logstream-log-events.png)

</div>


## Deleting the Function

To delete the function, click Actions then 

<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function-delete-function.png)

</div>

<div class='img-center'>

![](/img/docs/1102-aws-sample-lambda-function-delete-function-yes.png)

</div>