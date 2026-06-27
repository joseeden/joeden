---
title: "Configuration, Errors, and References"
description: "Configuration, Errors, and References"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 70
last_update:
  date: 1/24/2021
---

## Adding more on the ansible.cfg

```bash
[defaults]
# E: variables for my personal lab
inventory = ~/proj-ansible/one/inventories/edendev.inv
remote_user = eden
private_key_file = ~/.ssh/id_rsa
host_key_checking = False
retry_files_enabled = False
```


## Errors Encountered

### Proxy error. Reason: DNS lookup failure

<details>
<summary>Read more...</summary>
 
Got this particular error when I was trying to check if the loadbalancer is proxying the requests to the four backend webservers.

```bash
Proxy Error

The proxy server received an invalid response from an upstream server.
The proxy server could not handle the request GET /app1.

Reason: DNS lookup failure for: tstsvr1
```

**Findings**:
- When I try to refresh the page, it's still the same error but I see that **tstsvr1** change from tstsvr2, then tstsvr3, athen tstsvr4.
- This means it's going through the list correctly.
- Tried clearing the cache of my browser and reopening it but still same error
- Checked the IP inside the browser in my mobile phone and it's still returning the same error

**Steps I did**:
- Logged-in to the loadbalancer and checked the logs. Had the same error. Copied this **AHxxxx** plus the error messaged and searched Google.

![](/img/docs/accfproxyerr.png)

- Checked the config copied from controller (my PC) to the */etc/httpd/conf.d/lb.conf* of the loadbalancer. The hostnames of the webservers were auto-populate there.
```bash
ProxyRequests off
<Proxy balancer://webcluster >
      BalancerMember http://tstsvr1
      BalancerMember http://tstsvr2
      BalancerMember http://tstsvr3
      BalancerMember http://tstsvr4
      ProxySet lbmethod=byrequests
</Proxy>
```

- Checked status of httpd service

```bash
[root@tstlb1 eden]# systemctl status httpd
● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)
   Active: active (running) since Thu 2022-01-13 11:34:54 UTC; 5h 7min ago

# Got this error:
httpd[12274]: AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 
```

- Solved this one (details in the next section) but there's still *Proxy Error* 

- Changed the inventory file to use IPs instead of hostnames and ran the **setup-lb.yml** again. It now returned a new error:

![](/img/docs/accfperdeniedbackend.png)

- Solved this one (details in the next section) and *Proxy Error* have disappeared. Yay!

**Conclusion**

I think the real issue here is the inventory file using hostnames instead of the public IP addresses. Note that I'm using EC2 instances for the Nodes and these Nodes are not Contained inside a VPC, so they are not aware of each other and are relying to the public IP addresses. Now, i don't have a proper DNS resolution setup. I'm not using DNS servers not Route53, thus even if I've changed the hostnames of the Nodes and added them to the */etc/hosts* file in the testlb1 (which I've read should not be done), they would still resolve back to their original *public DNS names*.

The rest of the other errors encountered along the way were probably irrelevant but it is still good to resolve them early on adn possibly add the solution to the Ansible automation.

</details>


### AH00558: httpd: Could not reliably determine the server's fully qualified domain name

<details>
<summary>Read more...</summary>
 
Checked the other servers and they had the same error. Googled this, found a solution form this [link.](https://www.digitalocean.com/community/tutorials/apache-configuration-error-ah00558-could-not-reliably-determine-the-server-s-fully-qualified-domain-name) Modified the config file, then reloaded httpd
```bash
# RHEL and CentOS
sudo vim /etc/httpd/conf/httpd.conf
```
```bash
sudo systemctl reload httpd
```
```bash
echo "ServerName 127.0.0.1" >> /etc/httpd/conf/httpd.conf
```

To test this,
```bash
$ sudo apachectl configtest

Output
Syntax OK
```

This eliminated the *AH00558* error but not the *Proxy error*.
Still good. One problem at a time.

</details>


### (13)Permission denied: AH00957: HTTP: attempt to connect to (ip-address) failed

<details>
<summary>Read more...</summary>
 
Searched this online, and found [this.](https://stackoverflow.com/questions/23948527/13-permission-denied-while-connecting-to-upstreamnginx)

Prior to this, I've changed the inventory to use the elastic IPs instead of the hostnames. When I did that, plus the solution below,  it solved the problem.

```bash
$ setsebool -P httpd_can_network_connect 1
```

</details>


### Failed to connect to repository : Error performing command

<details>
<summary>Read more...</summary>


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

</details>


### Cannot run program "mvn" (in directory : error=2, No such file or directory

<details>
<summary>Read more...</summary>

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

After some researc, I found [this](http://13.228.99.157:8080/job/test-maven-project/4/console). 

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

![](/img/docs/mavenhome.png)

Going back to the failing job in the dashboard, click **Configure**. In the **Build** section, select the variable you set in the **Maven version** field.

![](/img/docs/mavenhome2.png)

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
</details>


### NB: JAVA_HOME should point to a JDK not a JRE

<details>
<summary>Read more...</summary>

Found this [link online.](https://stackoverflow.com/questions/16031515/java-home-is-not-defined-correctly-only-from-jenkins?lq=1).

First, I went to **Manage Jenkins > Configure System**. You can also go to this link:

```bash
http://13.228.99.157:8080/configure
```

![](/img/docs/javahome.png)

In the  **Global properties** section, add a **JAVA_HOME** variable. Hit **Save** afterwards.

![](/img/docs/javahome2.png)


</details>


### To know where JDK is installed in RHEL 8

<details>
<summary>Read more...</summary>

```bash
$ readlink -f $(which java)

/usr/lib/jvm/java-11-openjdk-11.0.14.0.9-2.el8_5.x86_64/bin/java
 
```

</details>


## References


- [Solved: No match for argument: python-pip](https://forums.centos.org/viewtopic.php?t=76065)

- [Getting "Permission Denied" when running pip as root on my Mac](https://stackoverflow.com/questions/15028648/getting-permission-denied-when-running-pip-as-root-on-my-mac)

- [How to install alternative version of Python beside distro supplied?](https://superuser.com/questions/686980/how-to-install-alternative-version-of-python-beside-distro-supplied)

- [Do not run pip as root](https://www.getpagespeed.com/server-setup/do-not-run-pip-as-root#:~:text=So%20when%20you%20invoke%20pip,and%20pip%20installed%20Python%20modules.)

- [Is `sudo pip install` still a broken practice?](https://askubuntu.com/questions/802544/is-sudo-pip-install-still-a-broken-practice)

- [Stop using sudo pip install](https://dev.to/elabftw/stop-using-sudo-pip-install-52mn)

- [How do I install pip without root?](https://quick-adviser.com/how-do-i-install-pip-without-root/)

- [Managing Python packages the right way](https://opensource.com/article/19/4/managing-python-packages)

- [Cannot install MySQL-python package](https://stackoverflow.com/questions/54856508/cannot-install-mysql-python-package)

- [Ansible + Ubuntu 18.04 + MySQL = "The PyMySQL (Python 2.7 and Python 3.X) or MySQL-python (Python 2.X) module is required."](https://stackoverflow.com/questions/56313083/ansible-ubuntu-18-04-mysql-the-pymysql-python-2-7-and-python-3-x-or-mys/56314713)

- [Ansible, python and mysql… untangling the mess](https://www.rollnorocks.com/2018/12/ansible-python-and-mysql-untangling-the-mess/)

- [Ansible FAILED: python mysqldb module is required](https://superuser.com/questions/1462030/ansible-failed-python-mysqldb-module-is-required)

- [community.mysql.mysql_db – Add or remove MySQL databases from a remote host](https://docs.ansible.com/ansible/latest/collections/community/mysql/mysql_db_module.html#id3)
