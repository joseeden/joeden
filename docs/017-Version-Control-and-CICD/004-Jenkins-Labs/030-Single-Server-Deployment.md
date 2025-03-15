---
title: "Single Server Deployment"
description: "Deploying an App on a Single Server"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 30
last_update:
  date: 5/15/2020
---




## Lab Environment

In this lab, we have the following Linux machines, and we will use a local computer (laptop) to connect to each of them. The code is stored in a remote GitHub repository, which will be clone locally for development and testing.

- jenkinsmaster
- prodserver

You can choose to set up a virtual machine on your computer or create instances in the cloud. In this case, EC2 instances are used.

<div class='img-center'>

![](/img/docs/jenkins-lab-diagram-jenkinsmaster-prodserver.png)

</div>


:::info[main.pem]

I'm using a single keypair or pem file to access all servers. This pem file will also be used when configuring the pipeline.

:::

## Setting Up Jenkins

If you have your Jenkins server already setup, you can skip this section. There's an option to manually install Jenkins on a Linux machine or you can also use Ansible playbooks to perform the entire installation of Jenkins on this machine.

To setup Jenkins:

- [Install Jenkins on Linux](/docs/017-Version-Control-and-CICD/004-Jenkins-Labs/004-Installing-Jenkins.md)
- [Setting up Ansible and Jenkins.](/docs/017-Version-Control-and-CICD/004-Jenkins-Labs/005-Setup-Ansible-and-Jenkins.md)

## Pre-requisites 

Pre-requisites: 

- A Github account.
- Install the following on the the servers:

    - Python

        ```bash
        ## These commands are for Ubuntu Linux
        sudo apt-get update
        sudo apt-get install python3.6 
        ```

    - Python Virtual Environment 

        ```bash
        sudo apt install -y python3.12-venv 
        ```

    - Pip

        ```bash
        sudo apt install -y python3-pip
        ```

    - Zip

        ```bash
        sudo apt update
        sudo apt install zip -y
        ```

If you're using EC2 instances, make sure the security group:

- Allows SSH from within the subnet
- Allows SSH from your IP 
- Allows 5000 from your IP 
- Allows 8080 from `0.0.0.0/0`

You may encounter some network connectivity issues when connecting to the Linux machines and when attempting to trigger the webhook. 

- SSH connections (from local to Linux machines) - uses port 22
- Access Jenkins UI (from local to Jenkins) - uses port 8080 
- Access application UI (from local to Prod) - uses port 5000 
- Trigger webhook (from Github to Jenkins) - uses port 8080  

If specifying your IP doesn't work, you can use a wider range like `0.0.0.0`.



## Pre-Deployment Steps 

Perform the following in the production server:

1. Create a directory for the application and go to the project directory.

    ```bash
    mkdir /tmp/app 
    cd /tmp/app 
    ```

2. Create a python virtual environment. This is to ensure the application will not interfere with other applications running inside the produserver.

    ```bash
    python3 -m venv venv
    ls -la /tmp/app/venv    ## Verify
    ```

3. Depending on the machine you're using, you need configure firewall to allow port 500. If you're using a virtual machine in the cloud, you need to allow the port in the security group.


4. Create a systemd unit file. This will be used to start and stop the service. If you're using a containerized Jenkins or if `systemctl` is not working, proceed to the [Without Systemd](#without-systemd) section.

    ```bash
    vi /etc/systemd/system/flaskapp.service
    ```
    ```bash
    [Unit]
    Description=flask app
    After=network.target
    # Service will only start after network is initialized.

    [Service]
    User=ubuntu
    Group=ubuntu
    WorkingDirectory=/tmp/app/
    Environment=PATH=/tmp/app/venv/bin
    ExecStart=/tmp/app/venv/bin/python3 /tmp/app/app.py

    [Install]
    WantedBy=multi-user.target
    ```

5. Reload the systemd configuration manager. Then enable service on start on boot and start service. At this point, it will still fail because the application is not yet copied to the directory.

    ```bash
    sudo systemctl daemon-reload
    susdo systemctl enable flaskapp.service  
    sudo systemctl status flaskapp.service  
    ```


## Without Systemd 

If you're in an environment without systemd (like many Docker containers), many of the commands will not work because because there’s no systemd process managing services. As an alternative, you can run the following:

1. Create the Init script. This will be similar to the Systemd unit file.

    ```bash
    sudo nano /etc/init.d/flaskapp
    ```

    ```bash
    #!/bin/bash
    # /etc/init.d/flaskapp
    # Init script for managing Flask app

    ### BEGIN INIT INFO
    # Provides:          flaskapp
    # Required-Start:    $network
    # Required-Stop:     $network
    # Default-Start:     2 3 4 5
    # Default-Stop:      0 1 6
    # Short-Description: Start flask app at boot
    # Description:       Enable service for Flask app
    ### END INIT INFO

    APP_PATH="/tmp/app"
    APP_USER="Ubuntu"
    APP_GROUP="Ubuntu"
    VENV_PATH="/tmp/app/venv/bin"
    PYTHON_EXEC="$VENV_PATH/python3"
    APP_SCRIPT="$APP_PATH/app.py"

    start() {
        echo "Starting flaskapp..."
        su -c "cd $APP_PATH && PATH=$VENV_PATH:$PATH $PYTHON_EXEC $APP_SCRIPT &" $APP_USER
    }

    stop() {
        echo "Stopping flaskapp..."
        pkill -f "$PYTHON_EXEC $APP_SCRIPT"
    }

    status() {
        if pgrep -f "$PYTHON_EXEC $APP_SCRIPT" > /dev/null; then
            echo "flaskapp is running."
        else
            echo "flaskapp is not running."
        fi
    }

    case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        stop
        start
        ;;
    status)
        status
        ;;
    *)
        echo "Usage: /etc/init.d/flaskapp {start|stop|restart|status}"
        exit 1
        ;;
    esac

    exit 0
    ```

2. After saving the script, make it executable:

    ```bash
    sudo chmod +x /etc/init.d/flaskapp 
    ```

3. Then, manage it with:.

    ```bash
    sudo service flaskapp start
    sudo service flaskapp stop
    sudo service flaskapp restart
    sudo service flaskapp status
    ```


## Fork the Repository 

The sample project can be found here: 

```bash
https://github.com/joseeden/test-jenkins-project 
```

:::info[Use git credentials when cloning]

In August 2021, Github removed support for using your account password from the cli.
You can either use [Personal Access Tokens (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) or [SSH keys.](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

:::

After you sign in to Github, fork the repo and confirm the details.


<div class='img-center'>

![](/img/docs/1029-jenkins-single-server-deployment-fork-repository.png)

</div>


Clone it to your local computer. 

## Configure Web Hook 

On your Github repository, go to **Settings** > **Webhooks** > **Add webhook**. Specify the payload URL as:

```bash
http://jenkins-ip:8080/github-webhook/ 
```

Specify the details and click **Update webhook**.

<div class='img-center'>

![](/img/docs/1101-jenkins-single-server-deployment-config-webhook-on-github-repo.png)

</div>

Once you configure the pipeline in the succeeding steps, you can check the **Recent Deliveries**.

![](/img/docs/1101-jenkins-single-server-deployment-recent-Deliveries.png)





## Configuration Steps

The pipeline steps:

1. Checkout code 
2. Install dependencies
3. Test code 
4. Package code
5. Copy code to server
6. Install dependencies on the server
7. Restart flask app

Note that the Jenkins server will need SSH access to the production server. 

## Setup Credentials

Configure the following as credentials that will be pulled by the Jenkinsfile.

- ssh-key 
- prod-server-ip 

On the Jenkins dashboard, go to:

```
Manage Jenkins > Credentials > global > Add credentials
```

Configure the following details. For the **Secret** field, enter the public IP address of the production server.

![](/img/docs/1029-jenkins-single-server-deployment-configure-credentials-on-jenkins.png)

Add a second credentials with the following details. Change the username based on the username in your production server. in my case, the **Ubuntu** user is the default user in my production server.

![](/img/docs/1101-jenkins-single-server-deployment-configure-credentials-on-jenkins-ssh-key.png)

![](/img/docs/1029-jenkins-single-server-deployment-configure-credentials-on-jenkins-ssh-key.png)

For the SSH key, you can use the same keypair or .pem file you used to access the servers.


## Setup the Pipeline

Back on the Jenkins dashboard, click New Item and enter "single-server-pipeline" for the Item name. Select **Pipeline** and click **OK**.

<div class='img-center'>

![](/img/docs/1029-jenkins-single-server-deployment-pipeline.png) 

</div>


Check the box for the following and then click Save.

```
Build Triggers > Github hook trigger for GITScm polling
```

<div class='img-center'>

![](/img/docs/1101-jenkins-single-server-deployment-github-hook-trigger-gitscm-polling.png)

</div>


Next, configure the pipeline section. Note the branch name. The common name is **main** but your branch could be using **master**. You can also specify a different branch name here.

Click **Create** afterwards.


```
Pipeline > Pipeline script from SCM > SCM > Git > Repository URL > Enter URL
Set the branch to main
Set the ScriptPath > Jenkinsfile
```

<div class='img-center'>

![](/img/docs/1101-jenkins-single-server-deployment-configure-pipeline-triggers-using-main.png)

<!-- ![](/img/docs/1101-jenkins-single-server-deployment-configure-pipeline-triggers-etc.png) -->

<!-- ![](/img/docs/1029-jenkins-single-server-deployment-configure-pipeline-triggers-etc.png) -->

</div>


## Create the Jenkinsfile 

Create the Jenkinsfile inside the project directory. Note that if you're not using `systemd`, change the `systemd` command to `sudo service flaskapp restart'. **DO NOT** push yet.

See file here: [Jenkinsfile](https://github.com/joseeden/test-jenkins-project/blob/main/Jenkinsfile)


## Commit and Push 

Back in your local machine, commit and push the changes you did.

```bash
git add .
git commit -m "Added changes" 
git push 
```

Go to the your job in the Jenkins dashboard. You should now see a job getting triggered.

![](/img/docs/1101-jenkins-single-server-deployment-triggeringgg.png)

If successful, you should see a green check mark. 

![](/img/docs/1101-jenkins-single-server-deployment-successsss.png)

## Test the App 

Copy the server IP and open it a web browser. You should be able to access the sample application. Try adding a new task by clicking the "Add Task".

![](/img/docs/1101-jenkins-single-server-deployment-working-apppp-added-taskss.png)

## Verify Triggers 

Go back to the project directory in your local machine and modify the templates/index.html file.  Add a `V2` in the line:

```bash
<title>Todo App: V2</title> 
```

Commit and push.

```bash
git add .
git commit -m "Updated to v2" 
git push 
```

Back in the pipeline, a second build should be triggered. Once done, click the build number to view the details.

![](/img/docs/1101-jenkins-single-server-deployment-updated-to-v2.png)


Open the web browser and refresh. It should now show version 2.

![](/img/docs/1101-jenkins-single-server-deployment-app-version-2.png)
