---
title: "Dependencies"
description: "Dependencies in Docker Compose"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 2
last_update:
  date: 7/7/2022
---

## Overview

Dependencies in Docker Compose define the order in which resources, such as containers, start up. Some containers require others to be available first to function properly.  

Example: A web application with three resources.  

- **Database container**: Runs PostgreSQL and must start first to avoid errors.  
- **Python application**: Manages communication between the web and database.  
- **Nginx container**: Starts last to serve web content.  

## `depends_on`

The `depends_on` attribute specifies basic dependencies between resources.  

```yaml
services:
  database:
    image: postgres
  python_app:
    image: python-app
    depends_on:
      - database
  nginx:
    image: nginx
    depends_on:
      - python_app
```

Key points: 

- Dependencies can be chained or listed per resource.  
- Resource order in the `compose.yaml` file doesn’t matter once dependencies are defined.  

## Shutting Down Applications

When shutting down, resources stop in reverse order. Using the previous example: 

- **Nginx** stops first.  
- Then **Python application** is removed.  
- Finally, **PostgreSQL** shuts down when no other containers need it.  

## Other Dependency Options

Docker Compose provides additional attributes for managing dependencies.  

- **`condition` attribute**: Controls when a dependency is considered ready.  
  - `service_started`: Default behavior, starts normally.  
  - `service_completed_successfully`: Resource must run to completion (e.g., setup or validation tasks).  
  - `service_healthy`: Resource passes a healthcheck before being ready.  

- **Healthchecks**:  
  - Defined methods, like verifying a webpage or TCP port.  
  - Specified in Dockerfiles or Compose files.  
  - Not covered in this course but usable with existing configurations.  

## Troubleshooting Tools

Docker Compose includes tools for diagnosing issues in applications.  

- `docker compose logs`: 
  - Collects output from all resources.  
  - Example: `docker compose logs web` for specific resource logs.  

- `docker compose top`: 
  - Shows the status of resources in an application.  
  - Example: Displays resources in the `composetest` application.  
