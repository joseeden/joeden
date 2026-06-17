---
title: "Codex Usage and Billing"
sidebar_position: 45
description: "Codex Usage and Billing"
tags: 
- Artificial Intelligence
- OpenAI
- ChatGPT
# last_update:
#   date: 06/17/2026
---


## Overview

Codex usage can feel confusing because OpenAI has two separate billing areas:

- ChatGPT billing
- OpenAI API billing

For most Codex usage from ChatGPT, the Codex app, VS Code ChatGPT extension, or similar ChatGPT product surfaces, usage is usually tied to the ChatGPT plan.

For API usage, usage is tied to the OpenAI Platform account and API billing.


## Quick Answer

Check ChatGPT billing first when Codex is used from ChatGPT or the Codex product experience.

Check OpenAI API usage only when Codex or another tool is using an API key.

| Usage path                         | Where to check            |
| ---------------------------------- | ------------------------- |
| ChatGPT web                        | ChatGPT billing settings  |
| Codex app                          | ChatGPT billing settings  |
| VS Code ChatGPT or Codex extension | ChatGPT billing settings  |
| OpenAI API key                     | OpenAI Platform usage     |
| API organization billing           | OpenAI Platform billing   |

**Note**: ChatGPT billing and OpenAI API billing are separate. A ChatGPT subscription does not automatically mean API credits are being used, and API top-ups do not manage ChatGPT subscription usage.


## Why It Was Confusing

Codex can appear in several places.

- It can run inside ChatGPT.
- It can appear through a VS Code extension.
- It can be available through a desktop app.
- It can also be used from a CLI or automation that may support API-key login.

Because of this, the word `Codex` does not always tell you which billing system is being used.

The important question is:

```text
Am I authenticated through ChatGPT, or am I using an OpenAI API key?
```


## Check ChatGPT Billing

Use this path when Codex is part of the ChatGPT product experience.

1. Open [ChatGPT](https://chatgpt.com/).
2. Open **Settings**.
3. Select **Billing**.
4. Check the active plan and billing history.

OpenAI lists Codex as a ChatGPT plan feature on the [ChatGPT pricing page](https://chatgpt.com/pricing/).

The pricing page shows Codex access by plan. Free and Go have limited Codex access, Plus includes Codex, and Pro expands Codex usage.


## Check API Usage

Use this path when a tool is configured with an OpenAI API key.

Open:

```text
https://platform.openai.com/usage
```

Use this for:

- API usage
- API billing
- API credits
- API organization spend
- API keys used by scripts, apps, labs, or external tools

:::warning

Do not assume Codex is using API credits just because it is an OpenAI product.

ChatGPT product usage and API platform usage are billed separately.

:::


## Local CLI Check

The Codex CLI can support different login paths.

To check the local CLI status:

```powershell
codex login status
```

If it returns:

```text
Not logged in
```

Then the standalone CLI is not currently authenticated.

In the conversation that created this KB, the local `codex.exe` was coming from the OpenAI ChatGPT VS Code extension path:

```text
C:\Users\joseeden\.vscode\extensions\openai.chatgpt-...\codex.exe
```

That made ChatGPT billing the first place to check.


## Practical Decision Table

| Question                                     | Likely answer                       | Check here                 |
| -------------------------------------------- | ----------------------------------- | -------------------------- |
| Am I using Codex from ChatGPT?               | ChatGPT plan usage                  | ChatGPT billing settings   |
| Am I using Codex from the VS Code extension? | Usually ChatGPT product usage       | ChatGPT billing settings   |
| Did I configure `OPENAI_API_KEY`?            | API usage may apply                 | OpenAI Platform usage      |
| Did I top up API credits?                    | Only affects OpenAI API billing     | OpenAI Platform billing    |
| Do I see no API usage but Codex still works? | It is probably using ChatGPT access | ChatGPT billing settings   |


## References

- [ChatGPT pricing](https://chatgpt.com/pricing/)
- [Managing Billing Settings on ChatGPT Web and Platform](https://help.openai.com/en/articles/9039756-billing-settings-in-chatgpt-vs-platform)
- [OpenAI Platform usage](https://platform.openai.com/usage)
- [OpenAI Platform billing overview](https://platform.openai.com/account/billing/overview)
