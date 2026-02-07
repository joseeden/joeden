---
title: "Pipeline Options"
description: "Main options inside a Pipeline"
tags:
- CICD
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
- Jenkins
sidebar_position: 20
last_update:
  date: 5/13/2020
---


## Overview

Jenkins provides pipeline options that allow you to customize the behavior of your pipeline.

- Control execution time with timeouts
- Skip the default checkout step if not needed
- Retry stages on failure to improve resilience

Several options can be configured inside a pipeline, but here are three main ones:

- `timeout()`
- `skipDefaultCheckout()`
- `retry()`

Below is a sample Jenkinsfile:

```groovy title="Jenkinsfile"
pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'HOURS')        
        skipDefaultCheckout()                  
        retry(3)                               
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                // Add build steps here
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                // Add testing steps here
            }
        }
    }
}
```

In this example, the options 

- `timeout(time: 1, unit: 'HOURS')` means the pipeline will be aborted if it runs longer than 1 hour.

- `skipDefaultCheckout()` means the default checkout step for source code is skipped, allowing for manual control over when to perform checkouts.

- `retry(3)` means the stage will be retried up to 3 times if it fails, improving resilience against transient issues.

If the build ran for more than one hour, it will fail and it will considered an aborted build because it exceeded the defined timeout period.