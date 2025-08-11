---
title: "Observability"
description: "Observability"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
- Observability
sidebar_position: 10
last_update:
  date: 2/5/2023
---

## Overview

Observability helps us understand what is happening with our traffic and services using logs, metrics, monitoring, and tracing.

- Logs show detailed information about traffic events.
- Access logs record who accessed the services and when.
- Metrics collect data on performance and system health.
- Tracing follows the path of requests through the system to help troubleshoot.

These tools give us insight into how our systems work and help us find and fix problems.

## Logging Traffic

Logging helps us track events and diagnose issues clearly.

- Enable traffic logs to see what is happening in detail.
- Adjust log levels to control how much information is stored.
- Store logs in specific paths for easy access.


## Access Logs

Access logs give a clear picture of user activity on services.

- Record who is accessing each service.
- Show IP addresses and services accessed.
- Work like standard web access logs.

## Monitoring and Metrics

Metrics help us keep the system running smoothly by spotting issues early.

- Collect data about system health and traffic performance.
- Use tools like Prometheus to monitor metrics.
- Watch for problems like slow responses or service failures.


## Tracing Requests

Tracing reveals how requests move through the system.

- Follow the flow of requests from traffic to services.
- Understand where delays or errors occur.
- Make troubleshooting faster and more effective.


## Planning for Observability

Good observability lets us be prepared and respond quickly.

- Think of operations as a software problem to solve.
- Use logging, access logs, metrics, and tracing together.
- Plan ahead to avoid relying on luck when problems happen.


## Using Alerts and Tickets

This system helps teams react properly and manage issues efficiently.

- Alerts tell us when immediate action is needed.
- Tickets track less urgent issues to handle later.
- Logs support diagnosing problems after they happen.


## Operational Models 

add simple short intro...we want to be somewhere between reactive and proactive...

- Have metrics collected
- Observability installed between Traefik and applciatiosn
- Be able to have a granular view


## User Perspective

Focusing on availability, latency, and reliability helps create a better user experience.

- Users care if the system is available to them.
- Monitor availability and health of services.
- Measure latency to see if services respond quickly.
- Protect reliability to keep user trust.


## Goal for Observability

With strong observability, we understand and control our infrastructure better.

- Aim for a balance between reacting to problems and preventing them.
- Collect good metrics and tracing data.
- Use labs and demos to learn how to set this up effectively.


