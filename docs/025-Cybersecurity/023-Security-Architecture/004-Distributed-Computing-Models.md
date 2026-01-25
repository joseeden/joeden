---
title: "Distributed Computing Models"
description: "Large-scale parallel and distributed systems"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 4
last_update:
  date: 1/30/2024
---



## Client-based System

These are systems where applications execute entirely on a single user device. 

- Devices include workstations or smartphones  
- Does not require network resources  
- Easy to install and use since all resources are local  
- Limited sharing and collaboration capabilities  

## N-tier Architecture

An N-tier architecture divides applications into multiple layers, each responsible for a specific function. 

- Layered architecture with multiple computing components  
- Applications are distributed among these components  
- Includes presentation, business logic, and data storage  
- Easier updates and system scaling without affecting other layers  

## Client/Server Model  

The client/server model is a common computing architecture where a central server processes requests from multiple client machines.

- Central server handles client requests  
- Clients request actions like data retrieval or calculations  
- Example: web browsers (clients) requesting web pages from servers  

## Web Portals

A web portal provides a single point of access to information and services from multiple systems.

- Aggregates content and apps in one interface
- Uses portlets as modular UI components
- Each portlet offers a small interactive service

:::info 

Web portals relate to distributed computing, as they integrate multiple backend systems and present them through portlets.

:::

## Distributed Computing 

In distributed computing, many systems share the responsibility of processing large tasks by working on smaller pieces simultaneously.

- Divides tasks among multiple systems  
- Efficient for solving large-scale problems  
- Example: SETI project using home computers to search for extraterrestrial life  

Security concerns with distributed computing:

- Risk of sharing sensitive information with untrusted nodes  
- Malicious users could gain control of participant systems  
- P2P networks may expose users to illegal activities  


## Grid Computing  

Grid computing uses a centralized system to coordinate the resources of many individual computers to work on a single task.

- Creates a virtual supercomputer  
- Centralized controller assigns tasks to grid members  
- Useful for large data processing  

## Peer-to-Peer (P2P) Computing  

P2P computing is a distributed model where systems collaborate to offer services to each other, often without a central controller.

- No central authority, all nodes are equal  
- Examples: BitTorrent, Bitcoin, Tor network  

