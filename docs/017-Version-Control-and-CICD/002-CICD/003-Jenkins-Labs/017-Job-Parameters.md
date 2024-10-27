---
title: "Job Parameters"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Maven, Git, Github]
sidebar_position: 17
last_update:
  date: 7/7/2022
---




## Lab Environment

We are utilizing Amazon EC2 instances as our machines:

- jenkinsmaster1

You can opt for a virtual machine in your computer or you could also setup instances in the cloud. I prefer to utilize Amazon EC2 instances which is what I use in almost all of my labs.

<div class='img-center'>

![](/img/docs/ansible-lab-diagram-4.png)

</div>

Note that for this lab, we'll only be using **jenkinsmaster1** and you can disregard the other **tstsvrs** and **jenkinsslave1** for now.

## Setting Up Ansible and Jenkins

If you have your Jenkins server already setup, you can skip this section. For this one, we'll just run the following Ansible playbook/s on **jenkinsmaster1**. The playbook will perform the entire installation of Jenkins on this machine.

To setup Jenkins using Ansible, please see [Setting up Ansible and Jenkins.](/docs/017-Version-Control-and-CICD/002-CICD/003-Jenkins-Labs/005-Setup-Ansible-and-Jenkins.md)


## Create the Job with Parameters

Create a simple test job that will echo out a text. Also create a folder named **Test-builds**. To create the folder

```bash 
New Item > enter a folder name > Folder > Ok
```

Inside the folder, repeat the same process by clicking the **New item** then entering a project name but this time select **Freestyle project**.

<div class='img-center'>

![](/img/docs/jtlab5ni.png)

</div>

<div class='img-center'>

![](/img/docs/jtlab5ni2.png)

</div>

In the next page, configure the job. Enter a description then check the box for **This prooject is parameterized**. Click **Add parameter** then in the dropdown menu, select **String parameter**.

<div class='img-center'>

![](/img/docs/jtlab5ni3.png)

</div>

On the name field, let's set a variable called **FIRST_NAME**. Add a second parameter by clicking the **Add parameter** again. In the second one, set a variable called **LAST_NAME**.

<div class='img-center'>

![](/img/docs/jtlab5ni4.png)

</div>

Scroll down to the **Build** section then click **Add build step**. Select **Execute shell**.

<div class='img-center'>

![](/img/docs/jtlab5ni5.png)

</div>

In the **Command** field, enter the following line. Click **Save** afterwards.

```bash
echo "Hello there, $FIRST_NAME $LAST_NAME"
```

<div class='img-center'>

![](/img/docs/jtlab5ni6.png)

</div>

Back on the job page, you should now see a new tab on the left panel, **Build with Parameters**. Click this tab. Here we can specify any "first name" and "last name" before running the job. When the job is ran, this parameters are passed to the variables we set and then used by the job.

Set the names to "John Smith" then click **Build**.

<div class='img-center'>

![](/img/docs/jtlab5ni7.png)

</div>

Under the **Build History** section on the left panel, select the most recent build which will always be the first one on the list.

<div class='img-center'>

![](/img/docs/jtlab5ni8.png)

</div>

Click **Console Output** on the left panel.

<div class='img-center'>

![](/img/docs/jtlab5ni81.png)

</div>

Repeat the steps by going to the job page again and selecting **Build withh Parameters**. This time, use the names "Jane" and "Doe" then click **Build**.

<div class='img-center'>

![](/img/docs/jtlab5ni9.png)

</div>

On the console output, you should now see a new name printed.

<div class='img-center'>

![](/img/docs/jtlab5n1.png)

</div>

<div class='img-center'>

![](/img/docs/jtlab5n2.png)

</div>


## List Parameter


On the job page, click **Configure** on the left panel.

<div class='img-center'>

![](/img/docs/jtlab5new1.png)

</div>

Click **Add parameter** to add a third one then select **Choice parameter**.

<div class='img-center'>

![](/img/docs/jtlab5new2.png)

</div>

In the **Choices** field, enter the days of the week. 

<div class='img-center'>

![](/img/docs/jtlab5new3.png)

</div>

Next, let's modify our shell command. Afterwards, click **Save**.

```bash
echo "Hello there, $FIRST_NAME $LAST_NAME"
echo "How was your $WEEK?"
```

<div class='img-center'>

![](/img/docs/jtlab5howwasyourweek.png)

</div>

Back on the job page, click **Build with Parameters**. Enter any name for the `FIRST_NAME` and `LAST_NAME`. We now see a third one named **WEEK** which has a dropdown menu of the days of the week. Select a day then hit **Build**.

<div class='img-center'>

![](/img/docs/jtlab5new4.png)

</div>

In the console output of the most recent job, we now see a new message.

<div class='img-center'>

![](/img/docs/jtlab5new5.png)

</div>


## Basic Logic and Boolean

Click **Configure** and **Add parameter**. From the dropdown menu, select **Boolean Parameter**.

<div class='img-center'>

![](/img/docs/jtlab5bool1.png)

</div>

Set the variable `DISPLAY` for this parameter.

<div class='img-center'>

![](/img/docs/jtlab5bool2.png)

</div>

On the **Build** section, replace the command with this:

```bash
if [ "$DISPLAY" = "true" ]; then 
      echo "Hello $FIRST_NAME $LAST_NAME. How was your $WEEK?"
else 
     echo "Can't display message, please ensure you enabled display"
fi 
```

<div class='img-center'>

![](/img/docs/jtlab5bool3.png)

</div>

Click **Save** afterwards. 

Back on the job page, click **Build with Parameters**. Set the following values and let the box for **Display** unchecked. Hit **Build**.

<div class='img-center'>

![](/img/docs/jtlab5bool4.png)

</div>

On the console output of the latest build, you should see the "error" message saying it can't display the message.

<div class='img-center'>

![](/img/docs/jtlab5bool5.png)

</div>

Go back to the job page and click **Build with Parameters** again. This time, check the box for **Display** then click **Build**.

<div class='img-center'>

![](/img/docs/jtlab5bool6.png)

</div>

Checking the console output of the latest build, we now see the names displayed.

<div class='img-center'>

![](/img/docs/jtlab5bool7.png)

</div>


## Reference 

- [Jenkins, From Zero To Hero: Become a DevOps Jenkins Master](https://www.udemy.com/course/jenkins-from-zero-to-hero/)




