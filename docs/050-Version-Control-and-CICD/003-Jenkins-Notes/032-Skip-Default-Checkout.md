---
title: "Skip Default Checkout"
description: "Jenkins automatically pulls the code"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 32
last_update:
  date: 5/13/2020
---


## Checkout Code

If you define a checkout stage in your Jenkinsfile, then Jenkins will first checks out the code on its own, and then it will follow the Jenkinsfile and pull the code for a second time. 

```groovy title="Jenkinsfile"
pipeline {
    agent any
    stages {

        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/joseeden/test-project.git', branch: 'main'
                sh "ls -lrt"
            }
        }

        stage('Set Up Environment') {
            steps {
                sh "pip install -r requirements.txt"
            }
        }
    }
}  
```

This is because by default, Jenkins will pull the code for you. This means that it will connect to your code repository and checks it, before it proceeds to go through the instructions in the Jenkinsfile.

## `skipDefaultCheckout`

If we don't want Jenkins to do a pre-checkout of the code, we can add the `skipDefaultCheckout` in the Jenkinsfile:

```groovy title="Jenkinsfile"
pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    stages {

        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/joseeden/test-project.git', branch: 'main'
                sh "ls -lrt"
            }
        }

        stage('Set Up Environment') {
            steps {
                sh "pip install -r requirements.txt"
            }
        }
    }
}  
```

This way it will proceed with the instructions on the Jenkinsfile without performing a pre-checkout of the code. You can also customize what Jenkins can pull from the code repository.


## Remove any Checkout Stage 

A more recommended way is to remove any checkout stage in the Jenkinsfile and let Jenkins perform the pre-checkout.


```groovy title="Jenkinsfile"
pipeline {
    agent any
    stages {

        stage('Set Up Environment') {
            steps {
                sh "pip install -r requirements.txt"
            }
        }
    }
}  
```
