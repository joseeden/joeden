---
title: "Jenkins Parameters"
description: "Customize the Pipeline using Parameters"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 21
last_update:
  date: 7/7/2022
---


## Overview

Jenkins parameters allow users to pass inputs into a pipeline, enabling more dynamic and flexible builds.

- Can be defined in the Jenkinsfile and used in different stages
- Common types include string, boolean, choice, and file parameters

As an example, you can define the parameter `ENVIRONMENT`, allows you to specify the target deployment environment., and `RUN_TESTS`, which  controls whether tests are executed based on the user's input.

![](/img/docs/1027-jenkins-parameters-sample-diagrams.png)

In the example below...explain the code

```groovy title="Jenkinsfile"
pipeline {
    agent any
    parameters {

        string(name: 'ENVIRONMENT', 
               defaultValue: 'dev', 
               description: 'Specify the environment for deployment'
               )

        booleanParam(name: 'RUN_TESTS', 
                     defaultValue: true, 
                     description: 'Run Tests in pipeline')
    }

    stages {

        stage('Test') {
            when {
                expression { params.RUN_TESTS == true }
            }
            steps {
                echo 'Testing application'
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying to ${params.ENVIRONMENT} environment"
            }
        }
    }
}
```

## Build Parameters 

To use paramters, we can select the **Build with Parameters** from the Jenkins UI.

![](/img/docs/1027-jenkins-build-with-parametersss.png)

You can then pass the input that you want in the parameter:

<!-- ![](/img/docs/1027-jenkins-pass-the-parameter-in-the-input.png) -->

![](/img/docs/1027-jenkins-pass-the-parameter-in-the-input-2.png)

## Other Parameters

There are other parameters you can configure in Jenkins to enhance your pipeline's interactivity and flexibility. Below are some common parameter types:

- `string`: A simple text input
- `text`: A larger text input for multi-line entries
- `booleanParam`: A checkbox to enable or disable a feature
- `choice`: A dropdown menu to select from predefined options
- `password`: A masked input for sensitive information

Sample Jenkinsfile:

```groovy title="Jenkinsfile"
pipeline {
    agent any
    parameters {
        string(name: 'PROJECT_NAME', 
               defaultValue: 'MyProject', 
               description: 'Enter the name of the project')
        text(name: 'DESCRIPTION', 
              defaultValue: 'Project description goes here.', 
              description: 'Enter a detailed description of the project')
        booleanParam(name: 'ENABLE_FEATURE', 
                     defaultValue: false, 
                     description: 'Enable the new feature')
        choice(name: 'ENVIRONMENT', 
               choices: ['Development', 'Staging', 'Production'], 
               description: 'Select the deployment environment')
        password(name: 'SECRET_TOKEN', 
                 defaultValue: '', 
                 description: 'Enter the secret token (masked input)')
    }

    stages {
        stage('Build') {
            steps {
                echo "Building project: ${params.PROJECT_NAME}"
                echo "Description: ${params.DESCRIPTION}"
                echo "Feature enabled: ${params.ENABLE_FEATURE}"
                echo "Deployment Environment: ${params.ENVIRONMENT}"
            }
        }
    }
}
```

In the example above, the following paramters are:

- The `string` parameter, which allows users to input the project name.
- The `text` parameter, which provides a larger field for entering a project description.
- The `booleanParam`, which allows users to enable or disable a specific feature.
- The `choice` parameter, which provides a dropdown for selecting the environment.
- The `password` parameter, which masks the input for sensitive information like tokens. 
