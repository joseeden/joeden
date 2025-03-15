---
title: "Environment Variables"
description: "Using variables for different environments"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 17
last_update:
  date: 5/13/2020
---


## Environment Variables 

Environment variables in Jenkins provide dynamic data for builds, storing essential configuration details that can be reused across jobs.

- Can store values like paths, build information, and system configurations
- Make scripts flexible by avoiding hardcoding of values
- Allow customized environments for specific job requirements

<div class='img-center'>

![](/img/docs/1027-jenkins-env-varsss.png)

</div>


## Variables in Jenkins

Jenkins supports both system and job-specific environment variables, making it adaptable to a wide range of needs.

- Useful for sharing data between stages and scripts
- Simplify maintenance by centralizing frequently used settings

There are two types of environment variables in Jenkins:

- **System environment variables**
    - Include operating system and Java-based variables available to all jobs
    - Defined by the OS or Java runtime, accessible across Jenkins

- **Jenkins-specific variables**
    - Defined by Jenkins to provide job-specific information
    - Includes variables like `BUILD_NUMBER`, `JOB_NAME`, and more


## Defining Variables 

Variables can be defined globally, within a job, or in a pipeline script to meet different scopes and needs.

- **Globally**
    - Accessible across all jobs, set in Jenkins configuration
    - Ideal for variables used by multiple projects or jobs

- **Within a Job**
    - Defined directly in job configurations, accessible only to that job
    - Useful for job-specific settings or one-time builds

- **In a Pipeline Script**
    - Defined within a script to be used in specific pipeline stages
    - Enables dynamic and conditional variable handling



## Global Variables

Environment variables can be set directly in the Jenkinsfile to be used across stages in the pipeline.

```groovy title="Jenkinsfile"
pipeline {
    agent any
    environment {
        SAMPLE_VAR = "Hello, Jenkins!"
    }
    stages {
        stage('Print Variable') {
            steps {
                echo "The value of SAMPLE_VAR is: ${env.SAMPLE_VAR}"
            }
        }
    }
}
```

This example sets an environment variable `SAMPLE_VAR` and then echoes its value in the "Print Variable" stage.


## Variables in Build Stages 

In Jenkins, environment variables defined within a specific stage are not automatically accessible in subsequent stages of the pipeline. In the example below, the **Test stage will fail** because it will not be able to find the `IP_ADDRESS` and `PORT` variables. 

```groovy title="Jenkinsfile"
pipeline {
    agent any
    stages {
        stage('Build') {
            environment {
                PORT = "8080"
                IP_ADDRESS = "192.168.1.1"
            }
            steps {
                echo "Build stage is using IP: ${IP_ADDRESS} on PORT: ${PORT}"
            }
        }
        stage('Test') {
            steps {
                echo "Test stage accessing IP: ${IP_ADDRESS} on PORT: ${PORT}"
            }
        }
    }
}
```

When you run the build using the Jenkinsfile above, you may encounter an error in the Console Output like this:

```bash
Also: org.jenkinsci.plugins.workflow.steps.FlowInterruptedException: 
java.lang.IllegalArgumentException: 
    No such property: IP_ADDRESS for class: groovy.lang.Binding
    Possible solutions: IP_ADDRESS, P
    ...
Caused by: groovy.lang.MissingPropertyException: No such property: PORT for class: groovy.lang.Binding
```

To use variables across multiple stages, they need to be defined globally at the pipeline level.


```groovy title="Jenkinsfile"
pipeline {
    agent any
    environment {
        PORT = "8080"
        IP_ADDRESS = "192.168.1.1"
    }
    stages {
        stage('Build') {
            steps {
                echo "Build stage is using IP: ${IP_ADDRESS} on PORT: ${PORT}"
            }
        }
        stage('Test') {
            steps {
                echo "Test stage accessing IP: ${IP_ADDRESS} on PORT: ${PORT}"
            }
        }
    }
}
```

## Built-in Environment Variables 

Jenkins provides several built-in environment variables that allows users to reference specific job and build details directly within the scripts and pipeline stages.

| Variable           | Purpose                                | Example                       |
|--------------------|----------------------------------------|-------------------------------|
| `BUILD_ID`         | Unique identifier for the build        | `123`                         |
| `BUILD_NUMBER`     | Build number assigned by Jenkins       | `45`                          |
| `JOB_NAME`         | Name of the job being run              | `MyPipelineJob`               |
| `WORKSPACE`        | Path to the job workspace              | `/var/lib/jenkins/workspace`  |
| `JENKINS_HOME`     | Jenkins home directory path            | `/var/lib/jenkins`            |
| `BUILD_URL`        | URL of the build in Jenkins            | `http://jenkins/job/45/`      |
| `GIT_COMMIT`       | Commit hash of the Git revision        | `a1b2c3d4e5f6`                |
| `NODE_NAME`        | Name of the node running the build     | `master` or `agent1`          |

Below is an example of a simple Jenkinsfile that accesses these environment variables during the build process:

```groovy title="Jenkinsfile"
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Accessing built-in environment variables
                    echo "Building ${JOB_NAME} (Build #${BUILD_NUMBER})"
                    echo "Workspace: ${WORKSPACE}"
                    echo "Build URL: ${BUILD_URL}"
                    echo "Current Git Commit: ${GIT_COMMIT}"
                    echo "Running on Node: ${NODE_NAME}"
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Running tests
                    echo "Running tests for ${JOB_NAME} (Build ID: ${BUILD_ID})"
                    // Add test commands here
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deployment logic
                    echo "Deploying build #${BUILD_NUMBER} to production..."
                    // Add deployment commands here
                }
            }
        }
    }
}
```

## Best Practices 

When working with environment variables in Jenkins, following best practices can enhance security, consistency, and maintainability. 

- **Keep them secure**  
  Use Jenkins credentials for sensitive data and restrict access to authorized users.

- **Keep them consistent across projects**  
  Standardize naming conventions for easier understanding and maintenance.

- **Maintain documentation of the variables**  
  Document variables, their purposes, and expected values for quick reference and onboarding.