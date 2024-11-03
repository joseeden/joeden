---
title: "Post Deployments"
description: "Product is live. What's next?"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 14
last_update:
  date: 7/7/2022
---



## Product is Released, What's Next?

Once a product is launched, the next stage in its lifecycle is **maintenance**. 

- Product adapts to customer feedback and new technology
- New features and tools may be added
- Structure and functionality evolve over time
- Application architecture remains dynamic, constantly adapting

## Extensibility over Flexibility

In the maintenance phase, managing multiple simple, focused services (like microservices) is generally more efficient than adding complexity to support new functionalities (often necessary in monoliths). 

Here are common operations you may perform after launch:

<div class='img-center'>

![](/img/docs/udacity-suse-2-edgecase.png)

</div>

These actions help ensure that the application continues to deliver value to users while remaining manageable for the technical team.

- **Split**
  - Breaks complex services into smaller units
  - Eases maintenance and management
  - Improves clarity and focus

- **Merge**
  - Combines related granular services
  - Simplifies development processes
  - Example: merging logging services

- **Replace**
  - Identifies more efficient solutions
  - Example: rewriting services in Go
  - Enhances performance and resource use

- **Deprecate**
  - Phases out outdated services
  - Removes low-value functionality
  - Useful for one-time tasks like migrations

 
