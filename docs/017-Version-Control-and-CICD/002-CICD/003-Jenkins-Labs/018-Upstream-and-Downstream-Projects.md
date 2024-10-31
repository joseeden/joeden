---
title: "Upstream and Downstream Projects"
description: "Running upstream and downstream projects in Jenkins"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Maven, Git, Github]
sidebar_position: 18
last_update:
  date: 7/7/2022
---



## Lab Environment

In this lab, we have the following machines, and we will use a local computer (laptop) to connect to them.

- jenkinsmaster

You can choose to set up a virtual machine on your computer or create instances in the cloud. In this case, EC2 instances are used.

<div class='img-center'>

<div class='img-center'>

![](/img/docs/ansible-lab-diagram-4.png)

</div>

</div>

Note that for this lab, we'll only be using **jenkinsmaster** and you can disregard the other **tstsvrs** and **jenkinsslave1** for now.


## Setting Up Jenkins

If you have your Jenkins server already setup, you can skip this section. There's an option to manually install Jenkins on a Linux machine or you can also use Ansible playbooks to perform the entire installation of Jenkins on this machine.

To setup Jenkins:

- [Install Jenkins on Linux](/docs/017-Version-Control-and-CICD/002-CICD/003-Jenkins-Labs/004-Installing-Jenkins.md)
- [Setting up Ansible and Jenkins.](/docs/017-Version-Control-and-CICD/002-CICD/003-Jenkins-Labs/005-Setup-Ansible-and-Jenkins.md)



## Create the Folder for the Builds

Create a simple test job that will echo out a text. Also create a folder named **Test-builds**. To create the folder

```bash 
New Item > enter a folder name > Folder > Ok
```

<div class='img-center'>

![](/img/docs/orlab7createfolder.png)

</div>

<div class='img-center'>

![](/img/docs/orlab7createfolderdescription.png)

</div>

Back on the dashboard, you should now see the new folder created.

<div class='img-center'>

![](/img/docs/orlab7newfolercreated.png)

</div>


## Create the Upstream Project

Create a simple upstream job that will trigger the second job when it the upstream job is done.

```bash
New Item --> Enter an item name --> Freestyle project --> Ok 
```

<div class='img-center'>

![](/img/docs/lalab08ud.png)

</div>

In the **Build** section, click:

```bash
Add Builds Step --> Execute shell
```

In the Command field, enter:

```bash
echo 'I am the upstream project'
```

Then hit **Save**.

<div class='img-center'>

![](/img/docs/lalab08ud2.png)

</div>

Click **Build Now** to make sure it works. Open the most recent build under **Build History** in the left panel then open **Console Output**.

<div class='img-center'>

![](/img/docs/lalab08ud3.png)

</div>



## Create the Downstream Project

Create the downstream job the same way you created the upstream job.

```bash
New Item --> Enter an item name --> Freestyle project --> Ok 
```

<div class='img-center'>

![](/img/docs/lalab08dp1.png)

</div>

In the **Build Triggers** section, click:

```bash
Build after other projects are built --> Projects to watch: --> job-upstream
```

<div class='img-center'>

![](/img/docs/lalab08pd2.png)

</div>

In the **Build** section, click:
```bash
Add Builds Step --> Execute shell
```

In the Command field, enter:
```bash
echo 'I am the downstream project, triggered by the first one'
```

Then hit **Save**.

<div class='img-center'>

![](/img/docs/lalab08pd3.png)

</div>

Going back to the folder **Test-builds** page, we now have two

<div class='img-center'>

![](/img/docs/lalab08pd4.png)

</div>

Click the **job-stream** and then **Build Now**. Then click the latest build under the **Build History** in the left panel and click the **Console Output**.

You should see this line:
```bash
Triggering a new build of Test-builds » job-downstream 
```

<div class='img-center'>

![](/img/docs/lalab08updp1.png)

</div>

Exit out to the folder and here we'll see that the **job-downstream** now has a green checkmark beside it. This means it was triggered and the build was successful.

<div class='img-center'>

![](/img/docs/lalaobupdp2.png)

</div>

Click **job-downstream** then select the latest build under the **Build History** in the left panel. Click the **Console Output**.

<div class='img-center'>

![](/img/docs/lalab08updp3.png)

</div>

