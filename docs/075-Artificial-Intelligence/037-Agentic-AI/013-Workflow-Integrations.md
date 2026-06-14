---
title: "Workflow Integrations"
description: "Integrating AI workflows with external systems and tools."
tags: 
- Artificial Intelligence
- AI Agents
- Agentic Systems
- Large Language Models
sidebar_position: 13
--- 


## Overview 

AI workflows do not always need to run only on your local machine. They can also connect to external services through APIs.

- External services can expand what a workflow can do
- APIs allow workflows to send messages, check data, or trigger actions
- Authentication is usually required before using external services
- Human review is useful before publishing or sending anything important

This makes workflows more useful because they can interact with real tools outside the application.

## Common Integration Examples

<!-- A workflow can connect to many external services depending on what the application needs to do. -->

| Service Type                | Example Workflow Action                               |
| --------------------------- | ----------------------------------------------------- |
| Slack                       | Send a notification when a task is completed          |
| Email                       | Check incoming messages and process their contents    |
| Social Media                | Publish a generated post after approval               |
| Database or Business System | Store workflow results for later use                  |
| API Endpoint                | Trigger another application or workflow automatically |


<!-- These integrations turn a workflow from a local script into something that can interact with real business tools. -->

## Authentication

Most external APIs require authentication. This proves that the application is allowed to access the service.

| Recommendation                         | Reason                                                       |
| -------------------------------------- | ------------------------------------------------------------ |
| Use OAuth tokens                       | Provides secure access to protected APIs                     |
| Store secrets in environment variables | Keeps credentials separate from application code             |
| Do not hardcode tokens                 | Reduces the risk of credential leaks and unauthorized access |

Authentication matters because external services need to know who is making the request and what the application is allowed to do.

## Human Review Before Actions

Some workflow actions can affect real users or real systems. For example, publishing a post or sending a message should not always happen automatically.

1. Review content before posting
2. Confirm important actions before sending
3. Add approval steps for public or sensitive output
4. Avoid fully automated publishing unless it is safe

Human-in-the-loop review helps prevent unwanted results from being sent to external systems.

## Read the API Documentation

Every third-party service has its own API rules. Slack, LinkedIn, email providers, and other tools all use different endpoints and authentication methods.

- Read the official API documentation
- Check the required authentication method
- Check the required request format
- Test with a small example first
- Add error handling before using it in a real workflow

There is no single API pattern that works for every service, so the documentation is always the starting point.

## Slack Setup 

To send Slack messages from a workflow, the Slack app must have the correct permissions.

1. Create a Slack app
2. Add the `chat:write` permission
3. Install the app into the workspace
4. Add the app to the target channel
5. Copy the bot token and channel ID
6. Store the values in a `.env` file

The workflow can only send messages to channels where the Slack app has access.

## Slack Notification 

In the example below, the workflow sends a message to a Slack channel after a task is completed.

The code uses `SLACK_BOT_TOKEN` for authentication and `SLACK_CHANNEL_ID` to choose where the message should be sent.

```python
import os
import requests
from dotenv import load_dotenv

load_dotenv()

SLACK_BOT_TOKEN = os.getenv("SLACK_BOT_TOKEN")
SLACK_CHANNEL_ID = os.getenv("SLACK_CHANNEL_ID")


def send_slack_notification(message: str):
    url = "https://slack.com/api/chat.postMessage"

    headers = {
        "Authorization": f"Bearer {SLACK_BOT_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "channel": SLACK_CHANNEL_ID,
        "text": message
    }

    response = requests.post(url, headers=headers, json=payload)
    result = response.json()

    if result.get("ok"):
        print("Slack notification sent.")
    else:
        print("Failed to send Slack notification.")
        print(result)


send_slack_notification("The AI workflow has finished successfully.")
```

Before running the script, store the Slack token and channel ID in a `.env` file.

```bash
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
SLACK_CHANNEL_ID=C0123456789
```

Run the script with Python.

```bash
python slack_notification.py
```

Expected output:

```bash
Slack notification sent.
```

The message should also appear in the Slack channel that the app has access to.