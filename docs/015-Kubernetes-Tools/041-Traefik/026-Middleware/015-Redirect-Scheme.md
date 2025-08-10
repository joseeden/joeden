---
title: "Redirect Scheme"
description: "Redirect Scheme"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
sidebar_position: 15
last_update:
  date: 2/5/2023
---


## Overview

When users visit your site with Http, the **redirect scheme** middleware sends them to the secure Https version. 

- Permanent redirects tell search engines this change is final. 
- Temporary redirects mean it might change later.

Redirects protect user data by forcing secure connections. They also help SEO by telling search engines which version to index.


## Setting up Redirect Scheme 

Set up a middleware with a name like `test-redirect-scheme`. Configure it to always use Https.

Example:

```yaml
  - "traefik.http.middlewares.test-redirectscheme.redirectscheme.scheme=https"
  - "traefik.http.middlewares.test-redirectscheme.redirectscheme.permanent=true"
```

This means all Http requests get redirected to Https with a permanent redirect status.


## Lab: From Http to Https

In this lab, we will enable this redirect to make sure users always use the secure Https entry point on our app.