---
title: "Maven-based Job"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins, Maven]
sidebar_position: 12
last_update:
  date: 7/7/2022
---


## Phases in Maven Build Lifecycle

Maven's build lifecycle outlines the stages for building and managing projects.

- **Default lifecycle**: compile, test, package, and install for building and testing.
- **Clean lifecycle**: Removes build artifacts.
- **Site lifecycle**: Generates project documentation.

In the default lifecycle, the phases are executed sequentially. To execute, we just need to call the last build phase.

- **Validate** - Ensure the project is correct and complete.  
- **Compile** - Compile the project's source code.  
- **Test** - Test the compiled code with a unit testing framework.  
- **Package** - Package the compiled code into a distributable format.  
- **Verify** - Run checks on integration test results for quality assurance.  
- **Install** - Install the package into the local repository for other projects.  
- **Deploy** - Copy the final package to a remote repository for sharing.  


## Setting up a Maven-based Job 

Steps 

1. Check out source code from Github.
2. Compile the code.
3. Run the test.
4. Package the application.

## Install Maven 

First, we will need to install Maven. Since this is for labbing purposes only, we'll install it the same Jenkins server. The steps can be found in this [link.](https://tecadmin.net/install-apache-maven-on-centos/). 

 
```yaml title="install-maven-others.yml"
# installs maven and git - needed for Jenkins lab
---

- name: Install maven and git
  hosts: jenkins
  become: true
  tasks:

    - name: Download files for Maven
      get_url:
        url: https://www-eu.apache.org/dist/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
        dest: /opt
    
    - name: Extract downloaded archive
      ansible.builtin.unarchive:
        src: /opt/apache-maven-3.6.3-bin.tar.gz
        dest: /opt
        remote_src: yes        

    - name: Create symbolic link 
      file:
        src: "apache-maven-3.6.3"
        dest: "/opt/maven"
        state: link

    - name: Create file
      ansible.builtin.blockinfile:
        path: /etc/profile.d/maven.sh
        create: yes
        mode: '0755'
        insertbefore: BOF
        block: |
          export M2_HOME=/opt/maven
          export PATH=${M2_HOME}/bin:${PATH}

    - name: Source the maven script
      shell: "source /etc/profile.d/maven.sh"
      
    - name: Installs git
      yum:  
        name: 
          - git
        state: present
```
 

To run the playbook:

```bash
ansible-playbook playbooks/install-maven-others.yml -i inventories/edenjen.inv 
```


## Clone the git repo
 
Reference: [Github repo](https://github.com/jleetutorial/maven-project). 

Make sure that you have created the Github account first. Fork the Github repo above.

Once you've forked it, we can now copy the SSH link under the **Code** tab. It used to be that we can use the HTTPs but starting August 2021, support for password authentication was removed and you will need to [generate an SSH key and add it to your Github account.](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys).

Next, [make sure you have git installed on your local machine.](https://git-scm.com/downloads). Then create a **~/.ssh/config** file with the following contents so Github will know where to look for the SSH keys.

```bash
Host github.com
 IdentityFile ~/.ssh/id_rsa 
```

You may also append this at the bottom of your **~/.bashrc** file. After this, your SSH Key-based authentication to Github is all setup.

```bash
# E: Use script below to enter passphrase only at the beginning

#### SSH AGENT ####
if [[ ! -v SSH_AGENT_PID ]]; then
        eval `ssh-agent`
        ssh-add ~/.ssh/id_rsa
fi 
```

Going back to the forked repo, click **Code** then **SSH** then copy the link.


<div class='img-center'>

![](/img/docs/mavenprojgitfork.png)

</div>

On your local machine, go one level up to the projects collections folder. This is where our project **one** is located. Currently, I have the project **one** folder along with two more projects.

```bash
4-Projects$ ll
total 0
drwxrwx--- 1 joseeden joseeden 512 Jan 26 21:30 ./
drwxr-xr-x 1 joseeden joseeden 512 Jan 23 19:11 ../
drwxr--r-- 1 joseeden joseeden 512 Jan 14 22:55 confluent-cloud/
drwxr--r-- 1 joseeden joseeden 512 Jan 23 20:53 one/
drwxr--r-- 1 joseeden joseeden 512 Jan 15 00:47 two/ 
```

Clone the **maven-project** folder here. Note that we're now using SSH to clone 

```bash
$ git clone git://github.com/joseeden/maven-project.git

Cloning into 'maven-project'...
remote: Enumerating objects: 108, done.
remote: Counting objects: 100% (3/3), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 108 (delta 0), reused 1 (delta 0), pack-reused 105
Receiving objects: 100% (108/108), 14.85 KiB | 271.00 KiB/s, done.
Resolving deltas: 100% (24/24), done.
```
```bash
4-Projects$ ll
total 0
drwxrwx--- 1 joseeden joseeden 512 Jan 26 21:35 ./
drwxr-xr-x 1 joseeden joseeden 512 Jan 23 19:11 ../
drwxr--r-- 1 joseeden joseeden 512 Jan 14 22:55 confluent-cloud/
drwxr-xr-x 1 joseeden joseeden 512 Jan 26  2022 maven-project/
drwxr--r-- 1 joseeden joseeden 512 Jan 23 20:53 one/
drwxr--r-- 1 joseeden joseeden 512 Jan 15 00:47 two/ 
```

Our **maven-project** folder looks like this:

![](/img/docs/maventree.png)


An important file is the **pom.xml**.

- This file describes the software being built
- Shows the dependencies on external modules
- Shows directory structure and required plugins
- Predefined targets for certain tasks


Now let's test an empty commit and push.

```bash
$ git commit --allow-empty -m 'Test commit'
[master 74e0ea0] Test commit
```
```bash
$ git push
Enumerating objects: 1, done.
Counting objects: 100% (1/1), done.
Writing objects: 100% (1/1), 186 bytes | 11.00 KiB/s, done.
Total 1 (delta 0), reused 0 (delta 0)
To github.com:joseeden/maven-project.git
   fb28e6b..35714aa  master -> master
```

Once that's done, install the Github plugin in Jenkins. Select **Manage Jenkins** in the Jenkins landing page and then select **Manage Plugins**.


<div class='img-center'>

![](/img/docs/setupgitplugin.png)

</div>

Select the **Available** tab and search for Github. Note that the results may differ. For this one we're selecting **Github integration** and then **Install without restart**.


<div class='img-center'>

![](/img/docs/setgit1.png)

</div>


## Create the Jenkins job
 
Back in the Jenkins landing page, select New item and put in the job name and description. Then select Freestyle project, and hit Ok.


<div class='img-center'>

![](/img/docs/maven1.png)

</div>

In the Source code section, paste the same link you used to clone the maven-project.

```bash
https://github.com/joseeden/maven-project.git 
```


<div class='img-center'>

![](/img/docs/maven2.png)

</div>

In the Build section, click **Add build step** and then select **Invoke top-level Maven targets**.


<div class='img-center'>

![](/img/docs/maven3.png)

</div>

In the **Goals** field, put "clean package*. This is the last phase of a Maven Build lifecycle (which I'll include in this notes). Finally, click **Save**.


<div class='img-center'>

![](/img/docs/maven4.png)

</div>



## Manual trigger 

Once we've setup the job, it's time to trigger it. Select the job and click **Build Now** at the left panel.


<div class='img-center'>

![](/img/docs/mavenbuild10.png)

</div>

Once it's done, it should create a new tab called **Workspace** which should contain the directories and files for the project folder **maven-project**.


<div class='img-center'>

![](/img/docs/mavenwrkspace.png)

</div>

> *Note: I encountered errors when running this lab. Details on the errors and the steps to resolve them can be found in the succeeding sections.*



## Errors 


### Failed to connect to repository : Error performing command

Got this error on on the maven-project lab.

```bash
Failed to connect to repository : Error performing command: C:\Git\bin ls-remote -h https://github.com/jleetutorial/maven-project.git HEAD  
```

Another one:
```bash
Failed to connect to repository : Error performing command: C:\Users\mks7kor\AppData\Local\Programs\Git\cmd ls-remote -h https://github.com/jleetutorial/maven-project.git HEAD 
```

**Solution:**

- Step 1: Find out where GIT is installed on your laptop (For Linux/Mac Users, you can run which git to find out the full path of GIT)

- Step 2: In the Path to Git executable  field on the below Global Tool Configuration  section, put the full path to GIT.

If you are using Windows, you might need to add exe extension to the end of git as well ( use git.exe  instead of git )


### Cannot run program `mvn` in directory : error=2, No such file or directory

Another issue I encountered when running the maven project lab was that the build was failing with the error message (from the console output)

```bash
[test-maven-project] $ mvn clean package
FATAL: command execution failed
java.io.IOException: error=2, No such file or directory
    at java.base/java.lang.ProcessImpl.forkAndExec(Native Method)
    at java.base/java.lang.ProcessImpl.<init>(ProcessImpl.java:340)
    at java.base/java.lang.ProcessImpl.start(ProcessImpl.java:271)
    at java.base/java.lang.ProcessBuilder.start(ProcessBuilder.java:1107)
Caused: java.io.IOException: Cannot run program "mvn" (in directory "/var/lib/jenkins/workspace/test-maven-project"): error=2, No such file or directory
```

First, I made sure that [maven is installed in Jenkins server.](https://tecadmin.net/install-apache-maven-on-centos/). To test, log-in to your Jenkins server, switch to **jenkins** user (it is required that you have changed /bin/false to /bin/bash for the jenkins user in /etc/passwd to allow login and that you have set the password for the jenkins user beforehand) and check the maven version.

```bash
$ mvn -v
Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)
Maven home: /opt/maven
Java version: 11.0.14, vendor: Red Hat, Inc., runtime: /usr/lib/jvm/java-11-openjdk-11.0.14.0.9-2.el8_5.x86_64
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "4.18.0-348.12.2.el8_5.x86_64", arch: "amd64", family: "unix" 
```

Next, I configured the Jenkins server by going to **Manage Jenkins > Global Tool Configuration**, or going to this link: 

```bash
http://13.228.99.157:8080/configureTools/
```

At the maven installation section at the bottom, I added this.


<div class='img-center'>

![](/img/docs/mavenhome.png)

</div>

Going back to the failing job in the dashboard, click **Configure**. In the **Build** section, select the variable you set in the **Maven version** field.


<div class='img-center'>

![](/img/docs/mavenhome2.png)

</div>

Run the **Build Now** again. This time it showed a new error, but that's okay. It means the first issue is resolved. The new error message in the console output is:

```bash
/var/lib/jenkins/tools/hudson.tasks.Maven_MavenInstallation/MAVEN_HOME on Jenkins
[test-maven-project] $ /var/lib/jenkins/tools/hudson.tasks.Maven_MavenInstallation/MAVEN_HOME/bin/mvn clean package
The JAVA_HOME environment variable is not defined correctly
This environment variable is needed to run this program
NB: JAVA_HOME should point to a JDK not a JRE
Build step 'Invoke top-level Maven targets' marked build as failure
Finished: FAILURE 
```

### NB: `JAVA_HOME` should point to a JDK not a JRE

Reference: [Stackoverflow](https://stackoverflow.com/questions/16031515/java-home-is-not-defined-correctly-only-from-jenkins?lq=1).

First, I went to **Manage Jenkins > Configure System**. You can also go to this link:

```bash
http://13.228.99.157:8080/configure
```


<div class='img-center'>

![](/img/docs/javahome.png)

</div>

In the  **Global properties** section, add a **JAVA_HOME** variable. Hit **Save** afterwards.


<div class='img-center'>

![](/img/docs/javahome2.png)

</div>


### To know where JDK is installed in RHEL 8

Run command below to find the JDK package:

```bash
$ readlink -f $(which java)

/usr/lib/jvm/java-11-openjdk-11.0.14.0.9-2.el8_5.x86_64/bin/java
```
