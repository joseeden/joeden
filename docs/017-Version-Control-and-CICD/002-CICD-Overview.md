---
title: "CICD Overview"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment]
sidebar_position: 2
last_update:
  date: 2/5/2023
---


## Continuous Integration

Continuous Integration (CI) is the practice of frequently merging developers’ code into a shared repository to catch issues early and improve build quality.

- Developers push code to a repository (CodeCommit)
- A testing/build server checks the code as soon as it’s pushed (CodeBuild)
- Developers receive immediate feedback on build and test results

Continuous Integration helps:

- Catch and fix bugs early
- Enable faster delivery with built-in testing
- Support frequent deployments

<div class='img-center'>

![](/img/docs/1027-jenkins-cicd-continuous-integration.png)

</div>


## Continuous Delivery

Continuous Delivery (CD) ensures that code is always in a deployable state, ready for release anytime with minimal effort.

- Allows reliable releases whenever needed
- Enables frequent, quick deployments
- Moves from “one release every few months” to “multiple releases a day”
- Achieved through automated deployment tools (CodeDeploy)

The main difference of Continuous Delivery with Continuous Deployment is that **Continuous Delivery requires manual approval** before deploying the code to staging or production environment.

<div class='img-center'>

![](/img/docs/1027-jenkins-cicd-continuous-delivery.png)

</div>


## Continuous Deployment

Continuous Deployment (CD) automatically releases every change that passes tests to production, enabling rapid delivery of features and bug fixes.

- Changes are deployed to production after passing automated tests.
- Reduces time between code completion and deployment.
- This allows for quick user feedback.

<div class='img-center'>

![](/img/docs/1027-jenkins-cicd-continuous-deployment.png)

</div>


## Build Steps and Build Triggers

Build steps define the actions taken during a build process, while build triggers determine when builds are initiated.

- **Build Steps**  
   - Specify actions like compiling code and running tests.  
   - Can include scripts, commands, or plugins.  

- **Build Triggers**  
   - Automate build initiation based on events, such as code commits.  
   - Supports scheduled builds and manual triggers.  


## Artifacts and Repositories

Artifacts are the files produced from a build process, while repositories store these files for access and version control.

- **Artifacts**  
   - Generated outputs, such as compiled code and packages.  
   - Can be stored for future deployment or reference.  

- **Repositories**  
   - Centralized storage for artifacts and versioned code.  
   - Facilitates collaboration and access across teams. 


## Build Tools

Build tools automate the process of compiling and packaging code for deployment.

- **Automation**  
   - Streamlines the building process to improve efficiency.  
   - Reduces manual errors and speeds up delivery.  

- **Integration**  
   - Works seamlessly with Jenkins to manage builds.  
   - Supports various programming languages and frameworks.  

## Testing and Notifications

Testing ensures that code quality is maintained, while notifications keep the team informed about build statuses.

  - Verifies that the code functions as intended through automated tests.  
  - Helps catch bugs early in the development cycle.  

Notifications provide real-time updates on build statuses, ensuring the team is informed.

  - Alerts the team about successful or failed builds.  
  - Can be sent via email, messaging apps, or dashboards.  

## Types of Tests

- **Unit Test**  
   - Validates individual components of the code.  
   - Ensures each unit functions correctly in isolation.  

- **Smoke Test**  
   - A preliminary test to check if the basic functionalities work.  
   - Identifies major issues before deeper testing.  

- **Functional Test**  
   - Assesses the software against functional requirements.  
   - Ensures that the application behaves as expected.  

- **Acceptance Test**  
   - Confirms that the software meets business needs and user requirements.  
   - Often performed by end users to validate functionality.  