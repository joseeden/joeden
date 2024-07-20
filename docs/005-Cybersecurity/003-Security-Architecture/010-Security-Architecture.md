---
title: "Security Architecture"
description: "Different types of secure architectures"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 10
last_update:
  date: 1/30/2024
---



## Overview

Design, structure and behavior of an organization's information security environment.

- **On-Premise**
    - Local infrastructure.
    - Data processed and stored on-site.
    - Direct control over hardware and software.

- **Cloud**
    - Internet-based services.
    - Hosted and managed by third-party providers.
    - Pay-per-use model.

- **Hybrid**
    - Combination of on-premise and cloud.
    - Integrates local infrastructure with cloud services.
    - Offers flexibility and scalability.


## On-Premises Data Centers

When it comes to data centers, there are two primary options: organizations can outsource the data center or own the data center. If the data center is owned, it will likely be built on premises. A place, like a building for the data center is needed, along with power, HVAC, fire suppression and redundancy.



<div class="img-center">

![](/img/docs/security-on-premises-datacenters.png)


</div>




### Heating, Ventilation and Air Conditioning (HVAC) / Environmental

Ensure adequate cooling for high-density and enclosed space equipment.

- Follow temperature standards for optimized hardware life.
- Use temperature sensors at various rack levels for precise monitoring.
- Implement contaminant controls for dust and noxious fumes.
- Monitor for water or gas leaks, sewer overflow, and HVAC failure.
- Prioritize critical systems in contingency planning.

### Data Center/Closets

Protect access to the physical layer for information system security.

- House critical components such as servers and network connections.
- Address security challenges related to data centers and wiring closets.
- Safeguard against intentional or unintentional damage.

### Power

Ensure constant and consistent power delivery to data centers.

- Mitigate wide fluctuations in power quality to preserve system lifespan.
- Size backup generators for the critical load and use battery backups for stabilization.
- Regularly test alternate power sources for effective failover.

Key terms:

- **Surges**
    - Small and unexpected increase in the amount of voltage being provided.
    - Utilize a surge protector or line conditioner.

- **Spikes**
    - Short transient voltage that is usually caused  by a short circuit, a power outage, or a lightning strike.
    - Utilize a surge protector or line conditioner.

- **Sags**
    - Small and unexpected decrease in the amount of voltage being provided.
    - Usually occurs for short period of time.
    - During a sag, computer can still remain operational but hardware components may be damaged over time. 
    - Utilize a surge protector or line conditioner.

- **Undervoltage events**
    - Usually referred to as "brownouts".
    - Voltage is reduced to lower levels; occurs for longer period of time.

- **Full power loss events**
    - Usually referred to as "blackouts".
    - Total loss of power for a given period of time.
    - When power is restored, it can cause a power spike.

### Fire Suppression

Choose appropriate fire detection/suppression considering room size and equipment risks.

- Be cautious of water-based suppression's potential harm to electronic components.
- Consider gas-based systems for electronics-friendly suppression, but be mindful of potential human toxicity.

### Using Robust Systems

- **Line Conditioners**
  - Overcome minor fluctuations in the power being received.
  - Stabilize voltage levels; filter out electrical noise.
  - Protect against power surges, but not from a complete failure event.

- **Uninterruptible Power Supply (UPS) Systems**
  - Provide backup power during outages and protect against power fluctuations.
  - Prevent data loss by allowing safe shutdown.
  - Most UPS only provides 15-60 minutes of power; not for long-term outage.

- **Generators**
  - Convert mechanical energy into electrical energy for use.
  - Supply power during extended outages.
  - Automatically start when primary power fails.
  - Support critical systems for prolonged periods.
  - Usual types:
    - Portable gas-engine 
    - Permanently installed 
    - Battery-inverter

- **Power Distribution Centers**
  - Central hub that distribute electrical power efficiently.
  - Integrated circuit protection, monitoring, and loadbalancing.

## Cloud Computing

Cloud computing involves accessing and utilizing computing resources and services over the internet, provided by third-party vendors. It offers scalability, flexibility, and reduced dependency on on-premise hardware.

- Servers 
- Storage 
- Databases 
- Networking
- Software Analytics 
- Intelligence

For more information, please see [The Basics.](../../006-Cloud-Computing/001-Cloud-Foundations/001-The-Basics.md)

## Virtualization 

Virtualization involves creating virtual instances of computing resources, such as servers, storage devices, or networks, to maximize resource utilization and flexibility.

For more information, please see [Virtualization](../../002-IT-Foundations/040-Virtualization.md)


## Containerization 

Containerization is a lightweight form of virtualization that encapsulates an application and its dependencies into a standardized unit known as a container. Containers can be easily deployed and run consistently across different computing environments.

- Docker 
- Kubernetes 
- Red Hat OpenShift 

**Advantages:**

- **Efficiency**
    - Optimizes resource usage.
    - Fast startup times.

- **Speed**
    - Rapid deployment.
    - Quick application scaling.

- **Portability**
    - Consistent across environments.
    - Easily deployable anywhere.

- **Scalability**
    - Dynamic resource allocation.
    - Horizontal scaling capabilities.

- **Isolation**
    - Ensures application separation.
    - Minimizes impact of failures.

- **Consistency**
    - Standardized deployment process.
    - Reproducible builds and deployments.

## Serverless 

Serverless is an approach where cloud providers manage the infrastructure, allowing developers to focus solely on writing and deploying code.

- Resources are provisioned dynamically and automatically scale based on demand.
- Billed based on actual usage rather than pre-provisioned capacity.
- Eliminates the need for managing servers, operating systems, or infrastructure components.
- Enable faster development and deployment cycles.

### Vendor Lock-in

It is a situation where a customer becomes dependent on a particular vendor's products or services to an extent that switching to another vendor becomes impractical or costly..

- Developers heavily utilize proprietary services or features provided by a specific cloud provider.
- This makes it challenging to migrate to another provider in the future.

Mitigation:

- Using open standards
- Implementing abstraction layers
- Designing applications for portability to reduce dependency on specific vendor offerings.


## Microservices 

Microservices is an architectural approach where applications are composed of small, independently deployable services. Each service is focused on a specific business function and communicates with others through APIs. This allows for modularity, flexibility, and scalability, enabling teams to develop, deploy, and maintain services independently.

### Monolithic vs Microservices 

- **Monolithic**
    - Single, unified codebase and application.
    - Components tightly integrated and deployed together.
    - Scaling involves replicating the entire application.
    - Development, testing, and deployment are typically done as a single unit.
    - Changes and updates require redeploying the entire application.
    - Simple to develop and initially deploy.
    - Can become complex and difficult to maintain as the application grows.

- **Microservices**
    - Application divided into small, independently deployable services.
    - Each service focuses on a specific business function.
    - Services communicate through APIs or message queues.
    - Scaling is done at the service level, allowing for more efficient resource utilization.
    - Development, testing, and deployment can be done independently for each service.
    - Enables continuous deployment and faster iteration.
    - Additional overhead for managing service communication and orchestration.

### Benefits

- **Scalability**
    - Enables scaling individual components independently based on demand.
    - Optimizes resource usage by allocating resources where needed most.
    - Allows for horizontal scaling of specific services without affecting others.

- **Flexibility**
    - Provides freedom to choose different technologies and programming languages for each service.
    - Allows teams to use the most appropriate tools and frameworks for specific tasks.
    - Facilitates experimentation and innovation by enabling the adoption of new technologies as needed.

- **Resilience**
    - Isolates failures to individual services, preventing them from affecting the entire system.
    - Enhances fault tolerance by ensuring that failures in one service do not propagate to others.
    - Supports **graceful degradation**, where the system continues to function despite partial failures.

- **Faster Deployment and Updates**
    - Enables continuous deployment by allowing changes to be deployed independently for each service.
    - Reduces time-to-market by facilitating rapid iteration and experimentation.
    - Enhances agility and responsiveness to customer feedback by enabling quick updates and feature releases.

### Challenges 

- **Complexity**
  - Increased complexity in development, deployment, and maintenance.
  - Requires effective coordination between teams.

- **Data Management**
  - Handling data consistency and synchronization challenges.
  - Requires careful management of data storage and retrieval.

- **Network Latency**
  - Service-to-service communication introduces latency.
  - Requires optimization of network communication.

- **Security**
  - Distributed nature raises security concerns.
  - Requires robust authentication and encryption mechanisms.




