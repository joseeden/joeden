---
title: "Deploy to Staging Environment"
description: "Deploying code to a Staging Environment"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Tomcat]
sidebar_position: 20
last_update:
  date: 7/7/2022
---


## Lab Environment

We are utilizing Amazon EC2 instances as our machines:

- jenkinsmaster

You can opt for a virtual machine in your computer or you could also setup instances in the cloud. I prefer to utilize Amazon EC2 instances which is what I use in almost all of my labs.

<div class='img-center'>

![](/img/docs/ansible-lab-diagram-4.png)

</div>

Note that for this lab, we'll only be using **jenkinsmaster** and you can disregard the other **tstsvrs** and **jenkinsslave1** for now.

## Setting Up Jenkins using Ansible

If you have your Jenkins server already setup, you can skip this section. For this one, we'll just run the following Ansible playbook/s on **jenkinsmaster**. The playbook will perform the entire installation of Jenkins on this machine.

To setup Jenkins using Ansible, please see [Setting up Ansible and Jenkins.](/docs/017-Version-Control-and-CICD/002-CICD/003-Jenkins-Labs/005-Setup-Ansible-and-Jenkins.md)


## Tomcat as Staging Environment

Apache Tomcat can serve as an effective staging environment for testing applications before production. By deploying to Tomcat, teams can evaluate application functionality in a controlled setting, ensuring it meets quality standards before full release. 

To install Tomcat, please see [Setup Tomcat.](/docs/017-Version-Control-and-CICD/002-CICD/003-Jenkins-Labs/006-Setup-Tomcat.md)


## Install Plugins 

After installing and making sure the Tomcat server is accesible, the next step is to deploy our application. But first, we need to install two plugins. Go to **Manage Jenkins > Manage Plugins**. Then find these two:

- Copy artifact
- Deploy to container

Select both plugin and hit **Install without restart**.

<div class='img-center'>

![](/img/docs/deplart1.png)

</div>

## Validate the Artifact

Going back to our landing page, select **test-maven-project** and click **Rename** in the left panel to rename it to **test-maven-package**. 

<div class='img-center'>

![](/img/docs/mvnrename.png)

</div>

This will serve as the first step - validating the artifact. We have done this in the archiving artifacts lab.

We will also need to configure this job to trigger the second job that we will create the next. To do this, add another post-build action in **Post-build Actions** section. From the dropdown bar, select **Build other projects**. Enter **test-maven-deploy** then hit **Save**.

<div class='img-center'>

![](/img/docs/mvnjob1trigger2nd.png)

</div>


## Create the Second Job

Next, create a second Jenkins job that will deploy our application. Click **New Item** and enter **test-maven-deploy**. Select **Freestyle project** then **ok**.

<div class='img-center'>

![](/img/docs/mvdeplapp1.png)

</div>

Add a description.

<div class='img-center'>

![](/img/docs/mvndeplapp2.png)

</div>

In the **Build** section, click the dropdown menu and select **Copy artifacts from another project**. Then we enter the following values

| Project Name | Artifacts to copy |
| --- | --- |
| test-maven-package | **/*.war |

<div class='img-center'>

![](/img/docs/mvndeplcpart.png)

</div>

<div class='img-center'>

![](/img/docs/mvndeplcpartwar.png)

</div>

In the **Post-build Actions**, click the dropdown menu and select **Deploy war/ear to a container**. Then enter the values:

| WAR/EAR files | `**/*.war` |
| :--- | :--- |
| **Containers** | Select the highest version of Tomcat | 
| **Tomcat URL** | http://13.228.99.157:8081 |

<div class='img-center'>

![](/img/docs/mvnpb1.png)

</div>

<div class='img-center'>

![](/img/docs/mvnpb2.png)

</div>

Then in the **Credentials**, click Add > Jenkins. 

A new window should appear. Enter the tomcat username and password that we defined on the playbook previously. Afterwards, click **Add** at the bottom. You'll now return to the **Configure** page. Click **Save** at the bottom.

<div class='img-center'>

![](/img/docs/mvnpb3.png)

</div>

In the main landing page, trigger the **test-maven-package** job by clicking the icon at the right (highlighted in yellow). Once this job is done, it should trigger the second job, **test-maven-deploy**.

<div class='img-center'>

![](/img/docs/mvnpb4.png)

</div>

Now to test if the application was successfully deployed, go to the IP of the tomcat servers, followed by "/webapp"

```bash
http://13.228.99.157:8081/webapp 
```

:::info[NOTE]

If ever you get an error when you try to trigger the second job that will deploy the application, you may check out this error section below.

:::


## Error when triggering second job 

Reference: [ERROR: Build step failed with exception](https://www.programmerall.com/article/4885370730/)

I've been getting this issue even though I entered the correct Tomcat URL and the correct credentials

 
```bash
org.codehaus.cargo.container.ContainerException: Failed to redeploy [/var/lib/jenkins/workspace/test-maven-deploy/webapp/target/webapp.war]
    at org.codehaus.cargo.container.tomcat.internal.AbstractTomcatManagerDeployer.redeploy(AbstractTomcatManagerDeployer.java:176)
    at hudson.plugins.deploy.CargoContainerAdapter.deploy(CargoContainerAdapter.java:81)
    at hudson.plugins.deploy.CargoContainerAdapter$DeployCallable.invoke(CargoContainerAdapter.java:167)
    at hudson.plugins.deploy.CargoContainerAdapter$DeployCallable.invoke(CargoContainerAdapter.java:136)
    at hudson.FilePath.act(FilePath.java:1171)
    at hudson.FilePath.act(FilePath.java:1154)
    at hudson.plugins.deploy.CargoContainerAdapter.redeployFile(CargoContainerAdapter.java:133)
    at hudson.plugins.deploy.PasswordProtectedAdapterCargo.redeployFile(PasswordProtectedAdapterCargo.java:95)
    at hudson.plugins.deploy.DeployPublisher.perform(DeployPublisher.java:113)
    at jenkins.tasks.SimpleBuildStep.perform(SimpleBuildStep.java:123)
    at hudson.tasks.BuildStepCompatibilityLayer.perform(BuildStepCompatibilityLayer.java:78)
    at hudson.tasks.BuildStepMonitor$3.perform(BuildStepMonitor.java:47)
    at hudson.model.AbstractBuild$AbstractBuildExecution.perform(AbstractBuild.java:806)
    at hudson.model.AbstractBuild$AbstractBuildExecution.performAllBuildSteps(AbstractBuild.java:755)
    at hudson.model.Build$BuildExecution.post2(Build.java:178)
    at hudson.model.AbstractBuild$AbstractBuildExecution.post(AbstractBuild.java:699)
    at hudson.model.Run.execute(Run.java:1913)
    at hudson.model.FreeStyleBuild.run(FreeStyleBuild.java:43)
    at hudson.model.ResourceController.execute(ResourceController.java:99)
    at hudson.model.Executor.run(Executor.java:432)
Caused by: java.net.ConnectException: Connection timed out (Connection timed out)
    at java.base/java.net.PlainSocketImpl.socketConnect(Native Method)
    at java.base/java.net.AbstractPlainSocketImpl.doConnect(AbstractPlainSocketImpl.java:412)
    at java.base/java.net.AbstractPlainSocketImpl.connectToAddress(AbstractPlainSocketImpl.java:255)
    at java.base/java.net.AbstractPlainSocketImpl.connect(AbstractPlainSocketImpl.java:237)
    at java.base/java.net.Socket.connect(Socket.java:609)
    at java.base/java.net.Socket.connect(Socket.java:558)
    at java.base/sun.net.NetworkClient.doConnect(NetworkClient.java:182)
    at java.base/sun.net.www.http.HttpClient.openServer(HttpClient.java:474)
    at java.base/sun.net.www.http.HttpClient.openServer(HttpClient.java:569)
    at java.base/sun.net.www.http.HttpClient.<init>(HttpClient.java:242)
    at java.base/sun.net.www.http.HttpClient.New(HttpClient.java:341)
    at java.base/sun.net.www.http.HttpClient.New(HttpClient.java:362)
    at java.base/sun.net.www.protocol.http.HttpURLConnection.getNewHttpClient(HttpURLConnection.java:1253)
    at java.base/sun.net.www.protocol.http.HttpURLConnection.plainConnect0(HttpURLConnection.java:1187)
    at java.base/sun.net.www.protocol.http.HttpURLConnection.plainConnect(HttpURLConnection.java:1081)
    at java.base/sun.net.www.protocol.http.HttpURLConnection.connect(HttpURLConnection.java:1015)
    at org.codehaus.cargo.container.tomcat.internal.TomcatManager.invoke(TomcatManager.java:567)
    at org.codehaus.cargo.container.tomcat.internal.TomcatManager.list(TomcatManager.java:882)
    at org.codehaus.cargo.container.tomcat.internal.TomcatManager.getStatus(TomcatManager.java:895)
    at org.codehaus.cargo.container.tomcat.internal.AbstractTomcatManagerDeployer.redeploy(AbstractTomcatManagerDeployer.java:161)
    ... 19 more
java.net.ConnectException: Connection timed out (Connection timed out)
    at java.base/java.net.PlainSocketImpl.socketConnect(Native Method)
    at java.base/java.net.AbstractPlainSocketImpl.doConnect(AbstractPlainSocketImpl.java:412)
    at java.base/java.net.AbstractPlainSocketImpl.connectToAddress(AbstractPlainSocketImpl.java:255)
    at java.base/java.net.AbstractPlainSocketImpl.connect(AbstractPlainSocketImpl.java:237)
    at java.base/java.net.Socket.connect(Socket.java:609)
    at java.base/java.net.Socket.connect(Socket.java:558)
    at java.base/sun.net.NetworkClient.doConnect(NetworkClient.java:182)
    at java.base/sun.net.www.http.HttpClient.openServer(HttpClient.java:474)
    at java.base/sun.net.www.http.HttpClient.openServer(HttpClient.java:569)
    at java.base/sun.net.www.http.HttpClient.<init>(HttpClient.java:242)
    at java.base/sun.net.www.http.HttpClient.New(HttpClient.java:341)
    at java.base/sun.net.www.http.HttpClient.New(HttpClient.java:362)
    at java.base/sun.net.www.protocol.http.HttpURLConnection.getNewHttpClient(HttpURLConnection.java:1253)
    at java.base/sun.net.www.protocol.http.HttpURLConnection.plainConnect0(HttpURLConnection.java:1187)
    at java.base/sun.net.www.protocol.http.HttpURLConnection.plainConnect(HttpURLConnection.java:1081)
    at java.base/sun.net.www.protocol.http.HttpURLConnection.connect(HttpURLConnection.java:1015)
    at org.codehaus.cargo.container.tomcat.internal.TomcatManager.invoke(TomcatManager.java:567)
    at org.codehaus.cargo.container.tomcat.internal.TomcatManager.list(TomcatManager.java:882)
    at org.codehaus.cargo.container.tomcat.internal.TomcatManager.getStatus(TomcatManager.java:895)
    at org.codehaus.cargo.container.tomcat.internal.AbstractTomcatManagerDeployer.redeploy(AbstractTomcatManagerDeployer.java:161)
    at hudson.plugins.deploy.CargoContainerAdapter.deploy(CargoContainerAdapter.java:81)
    at hudson.plugins.deploy.CargoContainerAdapter$DeployCallable.invoke(CargoContainerAdapter.java:167)
    at hudson.plugins.deploy.CargoContainerAdapter$DeployCallable.invoke(CargoContainerAdapter.java:136)
    at hudson.FilePath.act(FilePath.java:1171)
    at hudson.FilePath.act(FilePath.java:1154)
    at hudson.plugins.deploy.CargoContainerAdapter.redeployFile(CargoContainerAdapter.java:133)
    at hudson.plugins.deploy.PasswordProtectedAdapterCargo.redeployFile(PasswordProtectedAdapterCargo.java:95)
    at hudson.plugins.deploy.DeployPublisher.perform(DeployPublisher.java:113)
    at jenkins.tasks.SimpleBuildStep.perform(SimpleBuildStep.java:123)
    at hudson.tasks.BuildStepCompatibilityLayer.perform(BuildStepCompatibilityLayer.java:78)
    at hudson.tasks.BuildStepMonitor$3.perform(BuildStepMonitor.java:47)
    at hudson.model.AbstractBuild$AbstractBuildExecution.perform(AbstractBuild.java:806)
    at hudson.model.AbstractBuild$AbstractBuildExecution.performAllBuildSteps(AbstractBuild.java:755)
    at hudson.model.Build$BuildExecution.post2(Build.java:178)
    at hudson.model.AbstractBuild$AbstractBuildExecution.post(AbstractBuild.java:699)
    at hudson.model.Run.execute(Run.java:1913)
    at hudson.model.FreeStyleBuild.run(FreeStyleBuild.java:43)
    at hudson.model.ResourceController.execute(ResourceController.java:99)
    at hudson.model.Executor.run(Executor.java:432)
Build step 'Deploy war/ear to a container' marked build as failure
Finished: FAILURE 
```

Since it was taking too much time, I tried a different approach. I went to the manager URL then looked for the **War file to deploy** section. Clicked **Choose file** and selected **webapp.war** which I previously downloaded to my laptop. After that, I clicked **Deploy**.

```bash
http://13.228.99.157:8081/manager/html
```

<div class='img-center'>

![](/img/docs/warfiletodepl.png)

</div>

There was a simple "OK" message at the beginning. You could also see the **/webapp** at the bottom of the list in the **Applications** table.

<div class='img-center'>

![](/img/docs/warfiletodepl2.png)

</div>

I then went to the link and checked if application is indeed deployed.

```bash
http://13.228.99.157:8081/webapp/ 
```

<div class='img-center'>

![](/img/docs/warhelloworld.png)

</div>

Going back to the Tomcat Web Application Manager, I clicked the **Undeploy** for /webapp.

<div class='img-center'>

![](/img/docs/warhelloworldundeploy.png)

</div>

The webapp should disappear from the table:

<div class='img-center'>

![](/img/docs/undeplsuccess.png)

</div>

Then checked the /webapp link again.

<div class='img-center'>

![](/img/docs/warundepl404.png)

</div>

