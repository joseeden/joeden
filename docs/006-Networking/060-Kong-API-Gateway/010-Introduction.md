---
title: "Introduction to Kong"
description: "Introduction to Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - Kong API Gateway
sidebar_position: 10
last_update:
  date: 7/7/2022
---


## Kong API Gateway  

Kong API Gateway is an open-source platform for managing, securing, and optimizing API traffic.  

- Handles high-performance API routing.  
- Provides security features like authentication and rate limiting.  
- Supports on-prem, cloud, and container deployments.  
- Extensible with plugins for monitoring and caching.  

For more information, please see [Kong API Gateway.](https://konghq.com/)

## The Kong Way 

The diagram contrasts traditional API management with Kong's streamlined method for handling API functionality.  

<div class='img-center'>

![](/img/docs/11172024-the-kong-way-2.png)

</div>

<!-- 
- **The Redundant Old Way**
    - Duplicates common functionality across services.  
    - Monolithic systems are hard to maintain.  
    - Scaling impacts other services.  
    - Productivity is constrained.  

- **The Kong Way**
    - Centralizes common functionality.  
    - Enables scalable, distributed architectures.  
    - Expands easily from a single control point.  
    - Lets developers focus on products while Kong handles APIs.  -->


## Integration 

- **Kubernetes**  
    - Manages ingress traffic for clusters.  
    - Works with Kubernetes-native tools.  
    - Streamlines API deployment and control.  

- **Microservices Architecture**  
    - Supports service discovery and communication.  
    - Optimizes performance with load balancing.  

- **Programming Languages and Frameworks**  
    - Works with frameworks like Flask and Spring Boot.  
    - Supports Python, Java, Node.js, and more.  
    - Allows custom plugins and integrations.  

## Security Capabilities  

- **Authentication and Authorization**  
    - Supports OAuth2, JWT, and API keys.  
    - Enforces API access control.  

- **Encryption and Data Protection**  
    - Uses TLS for secure transmission.  
    - Secures sensitive API data.  

- **API Security Best Practices**  
    - Prevents abuse with rate limiting.  
    - Monitors threats with logging.  

## Required Ports

The following port must be opened:

| **Port** | **Service**           | **Description**                                                                 |
|----------|-----------------------|---------------------------------------------------------------------------------|
| 5432     | PostgreSQL            | Used by PostgreSQL. If a running server is present, it must be stopped for Docker PostgreSQL. |
| 8000     | Kong Gateway (HTTP)   | Kong gateway via plain HTTP.                                                    |
| 8443     | Kong Gateway (HTTPS)  | Kong gateway via HTTPS.                                                        |
| 8001     | Kong Admin API        | Kong Admin API interface.                                                       |
| 8002     | Kong Manager UI       | Kong Manager UI interface.                                                      |

## Kong Manager 

Kong Manager is a web-based GUI for managing and monitoring Kong API Gateway.  

- Simplifies API configuration and management.  
- Provides insights into API traffic and performance.  
- Allows quick setup of routes, services, and plugins.  


## Kong Admin API 

Kong Admin API is a RESTful interface for programmatically managing Kong.  

- Enables automation of API configurations.  
- Provides full control over routes, services, and plugins.  
- Integrates with CI/CD pipelines for dynamic deployments.  


## Postman 

Postman is not part of the Kong ecosystem, but it can be used to interact with APIs managed by Kong.  

- Tests APIs by sending HTTP requests to Kong Gateway.  
- Helps debug and validate API configurations.  
- Simplifies workflow testing for developers. 

## Konga

Konga is a third-party UI for managing Kong API Gateway.  

- Offers an alternative interface for managing Kong.  
- Simplifies setting up services, routes, and plugins.  
- Supports monitoring and troubleshooting APIs. 

## Kong Plugins 

Kong Plugins extend Kong's functionality with additional features.  

- Provide security, logging, and traffic control enhancements.  
- Can be customized or developed to meet specific needs.  
- Support seamless integration with Kong Gateway.  

<div class='img-center'>

![](/img/docs/11172024-kong-pluginss.png)

</div>


## Kong Ingress Controller 

The Kong Ingress Controller is a Kubernetes-native API gateway designed to manage traffic and security for containerized applications. As part of Kong’s ecosystem, it integrates seamlessly within the **Data Plane** alongside the Kong Gateway and Kong Mesh, providing robust traffic control for microservices running in Kubernetes. 

<div class='img-center'>

![](/img/docs/11172024-kong-ingress-controller.png)

</div>