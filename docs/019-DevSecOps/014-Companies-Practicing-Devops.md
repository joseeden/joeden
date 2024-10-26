---
title: "Companies practicing DevOps"
tags: [DevOps, Cloud, Automation, DevSecOps]
sidebar_position: 14
last_update:
  date: 3/21/2021
---


## Etsy

Etsy, a marketplace for handmade and vintage items, serves over 54 million users, including 1.4 million sellers and nearly 20 million buyers. Etsy deploys code around 50 times daily.

<div class='img-center'>

![](/img/docs/012-devopscompetsy.png)

</div>

**Deployment vs. Release**:
- **Deployment**: Pushing code changes to a production environment.
- **Release**: Making a feature accessible to end users.

Starting with a tech stack that required bi-weekly, four-hour maintenance windows, Etsy shifted to a DevOps model, introducing **Deployinator** for one-click deployments, even for new engineers on their first day. They also adopted Chef for configuration management.

<div class='img-center'>

![](/img/docs/012-devopsdeployinator.png)

</div>

By moving to frequent, small code changes, Etsy improved issue detection. They implemented a MySQL Cluster with master-master replication and an ORM, prioritizing stability over cutting-edge tools. Today, their core tech stack remains a reliable LAMP stack with Memcached for database caching.

<div class='img-center'>

![](/img/docs/012-etsychef.png)

</div>

Etsy’s transformation into a high-frequency deployment environment highlights the power of DevOps to streamline operations and improve deployment efficiency.



## Netflix 

Netflix recently completed a full migration to the cloud, utilizing a tech stack largely based on Java, with Git, Jenkins, and Nebula for continuous integration.

- Developers test locally with **Nebula**; after successful tests, they commit to **Git**.
- **Jenkins** handles builds, tests, and bundles using Nebula.

<div class='img-center'>

![](/img/docs/012-netflixtools.png)

</div>

**Application Deployment**:
- Nebula creates an OS package, storing it in the repository upon successful testing.
- Jenkins then triggers **Spinnaker**, adhering to an immutable server model that pre-bakes OS and app code without later modifications.

Spinnaker uses **Aminator** to bake an AMI with the artifact, deploying to staging for review. For production, Netflix uses Spinnaker’s blue-green deployment model for smooth transitions.

In a large-scale, failure-prone environment, Netflix uses **Simian Army** tools like **Chaos Monkey** to test system resilience by randomly terminating services to ensure redundancy.

The Simian Army also includes **Janitor Monkey** for resource cleanup and **Conformity Monkey** to ensure all instances follow best practices, making failure handling a core part of Netflix’s strategy.