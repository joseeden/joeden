---
title: "API Lifecycle"
description: "Automating API Lifecycle & Observability"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
- API Design
- API Management
sidebar_position: 20
last_update:
  date: 2/4/2025
---



## API Versioning

Versioning lets you release new updates while keeping the current API available.

| Type      | Purpose                            |
| --------- | ---------------------------------- |
| Versions  | Handle breaking changes            |
| Revisions | Handle minor fixes or improvements |

In Azure API Management (APIM), versions live in a "version set," and revisions let you safely update an API and mark it as "current" when ready.

## Version Signposting

APIM provides different ways for clients to specify which API version to use. 

| Versioning method       | How it works                             | Example          |
| ----------------------- | ---------------------------------------- | ---------------- |
| URL path versioning     | Includes the version in the URL path     | `/v2/orders`     |
| Header versioning       | Specifies the version in request headers | `Api-Version: 2` |
| Query-string versioning | Adds the version as a query parameter    | `?api-version=2` |

Make sure to choose one versioning strategy for all APIs in a version set to keep usage consistent and predictable.

## Canary releases

A canary release tests updates with a small audience before a full rollout.

- Create a new revision and test it privately
- Expose it to a limited group or pilot users
- Use a revision-specific URL if needed
- Roll forward when ready or roll back instantly if issues arise


