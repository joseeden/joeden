---
title: "Error Pages"
description: "Error Pages"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 13
last_update:
  date: 2/5/2023
---

## Overview

Errors happen sometimes, and it's good to handle them nicely.

- You Can Set Up A Middleware To Show Custom Error Pages
- Custom Pages Improve User Experience For Errors Like 404 Or 500
- You Can Show Helpful Links Or Support Info On Error Pages

Custom error pages make visitors feel better when something goes wrong. They can see a friendly message and find their way back instead of just a plain error.

## How It Works

The middleware watches for errors on your service or Traefik itself.

- You Define Which Error Codes To Catch (Single Or Range)
- You Link The Middleware To The Service That Shows The Custom Page
- When An Error Happens, The Middleware Shows The Right Error Page

For example, if a 500 error happens, Traefik serves a specific 500 error page you configured.

## Configuration Example

Here is a simple setup for error page middleware:

```yaml
http:
  middlewares:
    test-error-page:
      errors:
        status:
          - "404-404"
          - "500-500"
        service:
          name: error-service
          port: 80
```

This tells Traefik to use the `error-service` to serve pages for 404 and 500 errors.
