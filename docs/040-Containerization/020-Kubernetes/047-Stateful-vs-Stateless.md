---
title: "Stateless and Stateful"
description: "Stateless and Stateful"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 47
last_update:
  date: 4/7/2022
---

## Stateless Applications 

This means application that doesn't have a state and doesn't write any local files.

- Scales horizontally 
- Also cannot keep local session 
- If same app is ran multiple times, it won't change state
- Session management is done outside the container
- Files cannot be saved locally on the container

## Stateful Applications

Includes traditional databases such as PostgreSQL and MySQL which have database files that can't be split over multiple instances.

- Cannot horizontally scale
- Can be ran on a single container and scale vertically
- Use volumes to save data



 

 
