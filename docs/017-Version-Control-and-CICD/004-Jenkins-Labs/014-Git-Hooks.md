---
title: "Git Hooks"
description: "Using hooks to trigger Jenkins for new commits"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Maven, Git, Github]
sidebar_position: 14
last_update:
  date: 5/15/2020
---



:::info[UPDATE]

A working lab on Git SCM Polling can be found in [Single-server Deployment.](/docs/017-Version-Control-and-CICD/004-Jenkins-Labs/030-Single-Server-Deployment.md)

:::



## Lab Environment

In this lab, we have the following Linux machines, and we will use a local computer (laptop) to connect to them.

- jenkinsmaster

You can choose to set up a virtual machine on your computer or create instances in the cloud. In this case, EC2 instances are used.

<div class='img-center'>

![](/img/docs/ansible-lab-diagram-4.png)

</div>

Note that for this lab, we'll only be using **jenkinsmaster** and you can disregard the other **tstsvrs** and **jenkinsslave1** for now.

## Setting Up Jenkins

If you have your Jenkins server already setup, you can skip this section. There's an option to manually install Jenkins on a Linux machine or you can also use Ansible playbooks to perform the entire installation of Jenkins on this machine.

To setup Jenkins:

- [Install Jenkins on Linux](/docs/017-Version-Control-and-CICD/004-Jenkins-Labs/004-Installing-Jenkins.md)
- [Setting up Ansible and Jenkins.](/docs/017-Version-Control-and-CICD/004-Jenkins-Labs/005-Setup-Ansible-and-Jenkins.md)


## Using Git Hooks

As a recap of the previous lab on [Source Control Polling](/docs/017-Version-Control-and-CICD/004-Jenkins-Labs/013-Source-Control-Polling.md), SCM polling provides a more efficient way than periodically checking for updates in the source code. Another option is to use **git hooks**

With Git Hooks, our feedback loop is much shorter, thus we can deploy builds much faster.


## Using the Git Plugin

Fork the test-repo which we will use for this lab. Once forked, copy the HTTPS link which you can get by clicking the green **Code** button.

```bash
https://github.com/joseeden/testrepo-1-static-site
```

You will also need to clone your repo down to your local machine since we'll be pushing changes later on. Note than when cloning, you will need to copy the **SSH** link instead of the **HTTPS** link.

```bash
git clone git@github.com:<your-username></your-username>/testrepo-1-static-site.git
```

<div class='img-center'>

![](/img/docs/lalab04forkgit.png)

</div>


:::info[Password authentication disabled]

Password authentication has been disabled by Github starting August 2021 so you would need to* *[generate SSH keys and add them to your Github account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh).

:::


To start off, create the **Test-builds** folder which will contian all the builds. 

```bash
New Item --> Enter an item name --> Folder --> Ok
```

Inside the folder, create a job named **test-git-hooks**.

```bash
New Item --> Enter an item name --> Freestyle project
```

<div class='img-center'>

![](/img/docs/lalab04githooks.png)

</div>

Under **Source Code Management**, mark **Git** and paste the HTTP link you copied earlier.

```bash
https://github.com/joseeden/testrepo-1-static-site.git 
```

<div class='img-center'>

![](/img/docs/lalab04scmlink.png)

</div>

Under **Build Trigger**, mark **Poll SCM**. Leave the Schedule field empty since our build will not be triggered based on the schedule. It will be triggered by hooks from Github. Afterwards, click **Save**.

<div class='img-center'>

![](/img/docs/lalab04pollscmsave.png)

</div>

Going back to your forked repo, click the tabs:

```bash
Settings --> Webhooks --> Add webhook 
```

<div class='img-center'>

![](/img/docs/lalab04addwebhook.png)

</div>

On the **Payload URL** field, enter the URL of your Jenkins server. Let the other default settings. Scroll down to the bottom and click **Add webhook**.

```bash
http:/1.2.3.4:8080
```

<div class='img-center'>

![](/img/docs/lalab04webhookjenurl8080.png)

</div>


Open a terminal and go to the cloned repo.

```bash
$ ll
total 4
drwxr-xr-x 1 joseeden joseeden  512 Feb  1 13:48 ./
drwxr-xr-x 1 joseeden joseeden  512 Feb  1 13:48 ../
drwxr-xr-x 1 joseeden joseeden  512 Feb  1 13:48 .git/
-rw-r--r-- 1 joseeden joseeden  284 Feb  1 13:48 Jenkinsfile
-rw-r--r-- 1 joseeden joseeden 1062 Feb  1 13:48 LICENSE
-rw-r--r-- 1 joseeden joseeden  133 Feb  1 13:50 README.md
-rw-r--r-- 1 joseeden joseeden  239 Feb  1 13:48 index.html 
```

Edit the README.md, commit the changes, and then do a git push.

```bash
$ cat >> README.md
Pushing simple change to test git hooks. 
```
```bash
git add -A 
git commit -m "Pushing simple change to test git hooks."
git push
```

I've been having issues triggering the build here. I checked the webhook in Github and it is showing an error.

<div class='img-center'>

![](/img/docs/githookerrorcantconecttohost.png)

</div>

I've tried cloning the repo on the Jenkins master then push chnages from master too github repo and push succeeds. Tried the polling scm and it also works. Somehow when Jenkins polls the Github repo, it works. But when the Github repo "pushes" updates down to Jenkins, it fails.

In addition to this, I also ensured Jenkins is accessible from the internet, but still failing.


> *Pausing on this lab for now.**

:::info[UPDATE]

A working lab on Git SCM Polling can be found in [Single-server Deployment.](/docs/017-Version-Control-and-CICD/004-Jenkins-Labs/030-Single-Server-Deployment.md)

:::
