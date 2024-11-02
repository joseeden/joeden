---
title: "Jenkins Plugins"
description: "Enhancing Jenkins functionality using add-ons"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 25
last_update:
  date: 7/7/2022
---



## Overview 

From the [official Jenkins documentation](https://www.jenkins.io/doc/book/managing/plugins/)

> Plugins are the primary means of enhancing the functionality of a Jenkins environment to suit organization- or user-specific needs.
>
> Plugins can be automatically downloaded, with their dependencies, from the Update Center. The Update Center is a service operated by the Jenkins project which provides an inventory of open source plugins which have been developed and maintained by various members of the Jenkins community.


## Install through the Plugin Manager

You can simply install the plugins through the Jenkins console. Just click the following tabs:

```bash
Manage Jenkins --> Manage Plugins ---> Available 
```

As an example, let's install the Ansible plugin. Just search for "Ansible" and then check the box for that plugin. At the bottom, you'll see two options:

- Install without restart
- Download now and install without restart

<div class='img-center'>

![](/img/docs/tjenplugins2choice.png)

</div>

:::info[So what's the difference between this two?]

The main difference between 'with restart' and 'without restart' plugin installation is that you cannot upgrade or uninstall plugins without restart (because of the architectural choice made in Jenkins).

So, new plugin can be installed without restart (and when other builds are running as well).

Reference: [Stackoverflow link](https://stackoverflow.com/questions/53910252/jenkins-plugin-installation-with-and-without-restart-difference#:~:text=1%20Answer&text=The%20main%20difference%20between%20'with,builds%20are%20running%20as%20well)

:::

You could also read more about it through these links:

- [It isn't clear if you should restart Jenkins after installing a plugin](https://issues.jenkins.io/browse/JENKINS-18718)

- [Install Jenkin's Plugin without Restart](https://stackoverflow.com/questions/24184475/install-jenkins-plugin-without-restart/27785711)

Going back to our example, we'll just choose **Install without restart** for now. Once the install is done, go back to the plugins page. You should now see the Ansible plugin under the **Installed** tab.

```bash
Manage Jenkins --> Manage Plugins ---> Installed
```


## Install by uploading the hpi file

Let's say we want to install the **Maven integration** plugin. When we search for it, we see that the available version is the latest one which is 3.16. Notice that there is no option to select older releases here.

<div class='img-center'>

![](/img/docs/tjenmaven1.png)

</div>

To select older releases of this plugin, click the plugin name. It should open a new window for the plugin documentation site. Here, click the **Releases** tab. This will show all the previous versions of the plugin.

<div class='img-center'>

![](/img/docs/tjenmaven2.png)

</div>

<div class='img-center'>

![](/img/docs/tjenmaven3.png)

</div>

To install the version 3.15.1 since its a stable version, just click the version number and it will download an hpi file to your machine. Going back to the main dashboard, click the following:

```bash
Manage Jenkins --> Manage Plugins ---> Advanced
```

Scroll down to the **Upload Plugin** section. Click *Choose File** and select the hpi file you just downloaded. Click **Upload**

<div class='img-center'>

![](/img/docs/tjenmaven4.png)

</div>

<div class='img-center'>

![](/img/docs/tjenmaven5.png)

</div>

Going back to the **Plugin Manager**, you should now see the plugin under the **Installed** tab.


## Install from the CLI 

You can also install the plugin from the commandline. As an example, you can install the Docker plugin by running:

```bash
java -jar jenkins-cli.jar \
  -s http://localhost:8085 \
  -auth 'admin:Adm!n321' \
  install-plugin docker-plugin 
```

## Update the plugin

To update the plugin, simply go to the **Plugin Manager**. in the Updates tab, you should see all the plugins that has a new release

```bash
Manage Jenkins --> Manage Plugins ---> Updates
```

In our example, let's say that the Maven integration 3.16 were confirmed to be a stable version and we want to update it to the most recent one. Mark the box for the plugin and hit **Download now and install after restart**. 

<div class='img-center'>

![](/img/docs/tjenmaven6.png)

</div>



## Uninstall the plugin

To uninstall a plugin, go back to the **Plugin Manager** then on the **Installed** tab, mark the box for the plugin and hit **Uninstall**

```bash
Manage Jenkins --> Manage Plugins ---> Installed
```

<div class='img-center'>

![](/img/docs/tjenmavenuninstall.png)

</div>



