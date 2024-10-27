---
title: "Build Pipeline"
description: "Automate software development using pipelines"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 21
last_update:
  date: 7/7/2022
---


## Overview

A Jenkins build pipeline automates the software development process from code commit to deployment. It streamlines workflow, ensuring consistent builds and testing for efficient delivery.

- Series of stages for specific tasks like building and testing.
- Easy visualization of the development process to identify issues.
- Supports plugins for integration with testing and reporting tools.


<div class='img-center'>

![](/img/docs/jenbuildpipeline.png)

</div>


## Build Pipeline Plugin 

Go to **Manage Jenkins > Manage Plugins** then search for build pipeline. Once it's installed, go back to the landing page, and select the "+" beside "All"


<div class='img-center'>

![](/img/docs/addbplview.png)

</div>

Enter a view name, tick **Build pipeline view** then **ok**.


<div class='img-center'>

![](/img/docs/bplnewview.png)

</div>

In the **Upstream / downstream config > Select Initial Job**, we can select the job that will kick in or start the pipeline. In our previous lab, we use the **test-maven-package** as the initial job which will trigger the second job, **test-maven-deploy**.


<div class='img-center'>

![](/img/docs/usdsconfig.png)

</div>

You'll now be brought to the pipeline view. To trigger the pipeline, click **Run**. Running jobs will be in yellow while pending jobs are blue.


<div class='img-center'>

![](/img/docs/bplrunningpluspending.png)

</div>

Once a job is done, it will turn to green.


<div class='img-center'>

![](/img/docs/bpljob1donegreen.png)

</div>


<div class='img-center'>

![](/img/docs/bpljob1donejob2yellow.png)

</div>

 
## Parallel Pipeline

A parallel pipeline in Jenkins allows multiple tasks to run simultaneously, enhancing efficiency and reducing overall build time.

- Enables running different stages at the same time, speeding up the pipeline.
- Ideal for testing and building across various environments or configurations.

For instance, a parallel stage could run a Checkstyle analysis alongside unit tests, ensuring code quality checks occur without delaying other processes.


<div class='img-center'>

![](/img/docs/samplparallelpipeline.png)

</div>


## Full Continuous Delivery Pipeline

A full continuous delivery (CD) pipeline automates the process of deploying code changes to production, ensuring that software can be released quickly and reliably.

- Integrates all stages from code commit to deployment.
- Automated testing, ensures code quality before deployment.

This approach reduces the risk of errors during deployment and allows for faster feature releases, improving overall software delivery.


<div class='img-center'>

![](/img/docs/1026-jenkins-full-continuous-pipelineee.png)

</div>