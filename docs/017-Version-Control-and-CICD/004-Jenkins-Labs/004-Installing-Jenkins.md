---
title: "Installing Jenkins"
description: "The Manual Way"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Ansible]
sidebar_position: 4
last_update:
  date: 7/7/2022
---


## Lab Environment 

In this lab, we have the following Linux machines, and we will use a local computer (laptop) to connect to each of them. 

- jenkinsmaster
- prodserver

You can choose to set up a virtual machine on your computer or create instances in the cloud. In this case, EC2 instances are used.

<div class='img-center'>

![](/img/docs/jenkins-lab-diagram-jenkinsmaster-prodserver.png)

</div>

For this lab, we'll only use the **jenkinsmaster.** Note that the VM has a public IP address so we can access them a local machine.
 
## Install Jenkins 

Update and install the pre-requisites:

```bash
sudo apt update -y 
sudo apt install -y openjdk-11-jdk
```

Add the repository key to your system:

```bash
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key |sudo gpg --dearmor -o /usr/share/keyrings/jenkins.gpg  
```

Next, append the Debian package repository address to the server’s `sources.list`:

```bash
sudo sh -c 'echo deb [signed-by=/usr/share/keyrings/jenkins.gpg] http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'  
```

Run an update again:

```bash
sudo apt update -y
```

Install Jenkins: 

```bash
sudo apt install -y jenkins
```

If you get this error when you try to install Jenkins, this means that the Jenkins package is not included in the default Ubuntu repositories. 

```bash
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Package jenkins is not available, but is referred to by another package.
This may mean that the package is missing, has been obsoleted, or
is only available from another source

E: Package 'jenkins' has no installation candidate  
```

Instead, you'll need to add the official Jenkins repository, then install Jenkins from there. You can follow the steps below:

```bash
sudo apt update -y
sudo apt install -y openjdk-11-jdk
```

```bash
curl -fsSL https://pkg.jenkins.io/debian/jenkins.io-2023.key | sudo tee \
/usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
```

Try installing Jenkins again.

```bash
sudo apt update -y
sudo apt install -y jenkins 
```

Enable and start Jenkins.

```bash
sudo systemctl enable jenkins --now 
sudo systemctl status jenkins
```

In the status output, you should see something like this:

```bash
jenkins[6159]: *************************************************************
jenkins[6159]: *************************************************************
jenkins[6159]: Jenkins initial setup is required. An admin user has been created and a password generated.
jenkins[6159]: Please use the following password to proceed to installation:
jenkins[6159]: 2d9cb87b05eb4c86b666c4c7ae2d7931
jenkins[6159]: This may also be found at: /var/lib/jenkins/secrets/initialAdminPassword
jenkins[6159]: *************************************************************
jenkins[6159]: ************************************************************* 
```

Switch to root user and go to the provided path. Copy the password.

```bash
sudo su 
cat /var/lib/jenkins/secrets/initialAdminPassword
```

## Error Starting Jenkins 

If you are using Ubuntu 24.04 LTS and you get an error when starting Jenkins:

```bash
$ sudo systemctl star jenkins 

Job for jenkins.service failed because the control process exited with error code.
See "systemctl status jenkins.service" and "journalctl -xeu jenkins.service" for details. 
```

Then you can try to check `journalctl`:

```bash
$ journalctl -u jenkins
Oct 31 15:03:47 ip-172-31-28-214 systemd[1]: Starting jenkins.service - Jenkins Continuous Integration Server.>
Oct 31 15:03:48 ip-172-31-28-214 jenkins[3729]: Running with Java 11 from /usr/lib/jvm/java-11-openjdk-amd64, >
Oct 31 15:03:48 ip-172-31-28-214 jenkins[3729]: Supported Java versions are: [17, 21]
Oct 31 15:03:48 ip-172-31-28-214 jenkins[3729]: See https://jenkins.io/redirect/java-support/ for more informa>
Oct 31 15:03:48 ip-172-31-28-214 systemd[1]: jenkins.service: Main process exited, code=exited, status=1/FAILU>
Oct 31 15:03:48 ip-172-31-28-214 systemd[1]: jenkins.service: Failed with result 'exit-code'.
Oct 31 15:03:48 ip-172-31-28-214 systemd[1]: Failed to start jenkins.service - Jenkins Continuous Integration  
```

Based on the logs, there is some incompatiblity with the JDK version:

```bash
Running with Java 11 from /usr/lib/jvm/java-11-openjdk-amd64
Supported Java versions are: [17, 21]
```

As a solution, install OpenJDK  17:

```bash
sudo apt update
sudo apt install -y openjdk-17-jdk
```

You can also edit `/etc/default/jenkins`:

```bash
sudo vi /etc/default/jenkins 
```

Update JAVA_HOME to:

```bash
JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

If the configuration file above doesn't exit, you can also check:

```bash
sudo vi /lib/systemd/system/jenkins.service 
```

After updating the configuration, restart Jenkins:

```bash
sudo systemctl restart jenkins
sudo systemctl status jenkins
```


## Open Firewall 

Run the commands below to allow port 8080. If you're system doesnt have `ufw` then you can skip this.

```bash
sudo ufw allow 8080 
```

The `ufw` may also be inactive, so no need to activate it.

```bash
$ sudo ufw status

Status: inactive 
```

## Access the Jenkins UI  

Get the public IP Address of the VM. Open a web browser on your local computer and navigate to the public IP address:

```bash
http://3.10.172.215:8080/
```

You should see this landing page. Enter the password that was copied in the installation step and press continue

![](/img/docs/1031-jenkins-ui-access.png)

Click **Install suggested plugins** for now. Wait for it to finish. 

![](/img/docs/1031-jenkins-ui-access-install-suggested-pluginss.png)

Next, create a user.

![](/img/docs/1031-jenkins-ui-access-install-create-a-userr.png)

For the instance configuration, we can enter a DNS name. We could also leave it as is. Click **Save and finish** > **Start using Jenkins**

![](/img/docs/1031-jenkins-ui-access-start-using-jenkinss.png)


![](/img/docs/1031-jenkins-ui-access-homepage.png)