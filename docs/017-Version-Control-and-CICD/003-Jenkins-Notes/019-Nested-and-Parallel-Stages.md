---
title: "Nested and Parallel Stages"
description: "Using sensitive information in Jenkins"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 19
last_update:
  date: 7/7/2022
---


## Nested Stages 

Nested stages in Jenkins allow you to organize your pipeline into sub-stages, improving readability and structuring complex workflows.

- Helps separate different phases of the build process
- Makes it easier to handle errors and outputs
- Provides a hierarchical structure for better organization
- The nested stages are run in **sequential order**

You can set nested stages inside the Jenkinsfile as shown below:

```groovy title="Jenkinsfile"
pipeline {
    agent any
    stages {
        stage("Lint and Testing") {
            stages {
                stage('Lint') {
                    steps {
                        // Add the lint steps here
                    }
                }
                stage('Unit Test') {
                    steps {
                        // Add the tests here
                    }
                }
            }
        }
    }
}
```


## Parallel Stages 


Parallel stages allow you to execute multiple stages simultaneously, improving the efficiency of your Jenkins pipeline.

- Reduces overall build time by running tasks concurrently
- Useful for tasks that are independent and can be performed in parallel

The main difference between parallel stages and nested stages is the use of the `parallel` keyword. All stages defined inside the parallel block will run at the same time.

```groovy title="Jenkinsfile"
pipeline {
    agent any
    stages {
        stage('Lint and Testing') {
            parallel {
                stages {
                    stage('Lint') {
                        steps {
                            // Add the lint steps here
                        }
                    }
                    stage('Unit Test') {
                        steps {
                            // Add the tests here
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Add deployment steps here 
            }
        }
    }
}
```