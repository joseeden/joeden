---
title: "Jenkins Credentials"
description: "Using sensitive information in Jenkins"
tags:
- CICD
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
- Jenkins
sidebar_position: 18
last_update:
  date: 5/13/2020
---

## Jenkins Credentials 

Jenkins credentials help manage sensitive information securely. Here are key points to consider:

- Store passwords, SSH keys, and tokens securely.
- Use credentials in jobs without exposing them in logs.
- Assign appropriate permissions to manage access.

## Scope of Credentials

Understanding the scope of credentials helps ensure proper usage:

- **Global scope**  
  - Available to all jobs and pipelines.  
  - Suitable for shared resources.

- **System scope**  
  - Restricted to specific jobs or folders.  
  - Ideal for sensitive project-specific data.


## Create the Credentials 

To create credentials, go to **Manage Jenkins** and click **Credentials**.

<div class='img-center'>

![](/img/docs/1027-jenkins-creating-credentials.png)

</div>

In the next page, choose **global** to create a global credentials that can be accessed within the Jenkins pipeline.

<div class='img-center'>

![](/img/docs/1027-jenkins-creating-gloabl-credentialssss.png)

</div>

Click **Add Credentials**.

<div class='img-center'>

![](/img/docs/1027-jenkins-add-credentials-step.png)

</div>

In the **New credentials**, you can select the kind of credentials in the dropdown bar. Choose **Username with password**.

<div class='img-center'>

![](/img/docs/1027-jenkins-new-credentials-choose-kind.png)

</div>

Then fill in the fields using the details below. Note that the user depends on the user configured on the Jenkins server. Click **Create** afterwards.

| **Scope** | Global                            |
|-----------|-----------------------------------|
| **Username** | ec2-user                       |
| **Password** | Enter a secure password here   |
| **ID**       | server-creds                   |

<div class='img-center'>

![](/img/docs/1027-jenkins-create0server-credsss.png)

</div>

## Access Credentials using Variables

To access the credentials, you can define the credential name as a variable in the Jenkinsfile. The good thing is that when the build is run, the credentials will not be printed out in the logs.

In the example below, we attempt to print out the credentials using `echo`:

```groovy title="Jenkinsfile"
pipeline {
    agent any
    environment {
        PROD_SERVER = credentials('server-creds')
    }

    stages {
        stage('Build') {
            steps {
                echo "${PROD_SERVER}"
                echo "${PROD_SERVER_USR}"
                echo "${PROD_SERVER_PSW}"
            }
        }

    }
}
```

Based on the [Using a Jenkinsfile](https://www.jenkins.io/doc/book/pipeline/jenkinsfile/) documentation, we can use the following variables to access the username and password:

- `PROD_SERVER_USR`
- `PROD_SERVER_PSW`


When you run this Jenkinsfile, you may see Console Output similar to the following:

```bash
[Pipeline] envVarsForTool
[Pipeline] withEnv
[Pipeline]
[Pipeline] echo

Warning: A secret was passed to "echo" using Groovy String interpolation, which is insecure.
Affected argument(s) used the following variable(s): [PROD_SERVER_PSW, PROD_SERVER]
See https://jenkins.io/redirect/groovy-string-interpolation for details.
[Pipeline] echo
user1
[Pipeline] echo
Warning: A secret was passed to "echo" using Groovy String interpolation, which is insecure.
Affected argument(s) used the following variable(s): [PROD_SERVER_PSW]
See https://jenkins.io/redirect/groovy-string-interpolation for details.

[Pipeline]
[Pipeline] // withEnv
[Pipeline]
[Pipeline] // stage
[Pipeline] stage
```

These warnings indicate that secrets are being passed to `echo`, which can expose sensitive information in the logs.


## Access Credentials using a Plugin

Another way to access credentials is through the **Credential Bindings Plugin**. This plugin allows you to bind credentials to environment variables in a secure manner, making them available for use in your pipeline stages.

In the example below, we are using **usernamePassword** credentials. The `withCredentials` block binds the credentials specified by `credentialsId: 'server-creds'` to the environment variables `MY_USERNAME` and `MY_PASSWORD`. 

```groovy title="Jenkinsfile"
pipeline {
    agent any
    stages {
        stage("Build") {
            steps {
                withCredentials(
                    [usernamePassword(credentialsId: 'server-creds', 
                                      usernameVariable: 'MY_USERNAME', 
                                      passwordVariable: 'MY_PASSWORD')]) {
                        sh '''
                            echo $MY_USERNAME
                            echo $MY_PASSWORD
                        '''
                    }
            }
        }
    }
}
```



## `sshUserPrivateKey` Credential

The `sshUserPrivateKey` credential in Jenkins allows secure management of SSH keys for authenticating with remote servers. This method enables Jenkins pipelines to connect via SSH without exposing sensitive information.

```groovy title="Jenkinsfile"
pipeline {
    agent any
    stages {
        stage("Build") {
            steps {
                withCredentials(
                    [sshUserPrivateKey(credentialsId: 'ssh-credentials-id', 
                                       keyFileVariable: 'SSH_KEY', 
                                       usernameVariable: 'SSH_USER')]) {
                    sh '''
                        echo "Using SSH user: $SSH_USER"

                        # Use SSH_KEY securely here (e.g., for an SSH command)
                        # Example: ssh -i $SSH_KEY user@host "command"

                        ssh -i $SSH_KEY -o StrictHostKeyChecking=no ${SSH_USER}@19.215.192.15
                    '''
                }
            }
        }
    }
}
```


## Best Practices 

Following best practices enhances credential management:

- Regularly rotate credentials for security.
- Limit credential access to necessary users.
- Document credentials and their purposes for clarity.
