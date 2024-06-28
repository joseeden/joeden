---
title: Practice Test 01
tags: [Linux, Red Hat, Certifications]
sidebar_position: 1
last_update:
  date: 7/8/2022
---

<!-- ***************************************************************************************************************************** -->

<!-- NOTE: If you're going to update this, make sure to comment out "last_update" and "date" in the first few lines. -->

<!-- ***************************************************************************************************************************** -->

This labs are based on [Sander Van Vugt's O'Reailly course, "Red Hat Certified System Administrator (RHCSA), 3/e"](https://www.oreilly.com/videos/red-hat-certified/9780135656495/)


## Lab 01 - Users and Groups

**Tasks:**

1. Set password expiration to 90 days.
2. Set password minimum length to 6
3. Ensure a new file called "newfile" is created on the user's home directory.
4. Create users: ted, robin, barney, mars, lily
5. Set password of ted and robin to 'himym'.
6. Disable password for lily, mars, and barney.
7. Make sure Ted and Robin are in group **profs** and lily, mars, and barney are in group **students**.
8. Ensure ted is a member of the group 'wheel'
9. Verify.

<details>
  <summary> **Solution** </summary>

Start with the settings for new users, for 1 and 2.


```bash
$ sudo vim /etc/login.defs

PASS_MAX_DAYS   90
PASS_MIN_DAYS   0
PASS_MIN_LEN    6
PASS_WARN_AGE   7
```

For 5, create the file in the /etc/skel.


```bash
$ sudo touch /etc/skel/newfile
```

Create users: 


```bash
$ sudo useradd ted
$ sudo useradd robin
$ sudo useradd barney
$ sudo useradd mars 
$ sudo useradd lily
```

Set password for ted and robin to 'himym'

```bash
sudo echo himym | passwd --stdin ted
sudo echo himym | passwd --stdin robin
```

Disable password for lily, mars, and barney. To disable passwords, we can "lock" them by using the '-l' flag.

```bash
passwd -l lily
passwd -l mars
passwd -l barney
```

Make sure Ted and Robin are in group **profs** and lily, mars, and barney are in group **students**. Create the group first.
```groupadd profs
groupadd profs
groupadd students
```

Add the users to their approriate groups.

```bash
usermod -aG profs ted
usermod -aG profs robin
usermod -aG students lily
usermod -aG students mars
usermod -aG students barney
```

Verify.

```bash
$ id ted
uid=1001(ted) gid=1001(ted) groups=1001(ted),10(wheel),1006(profs)

$ id robin
uid=1002(robin) gid=1002(robin) groups=1002(robin),1006(profs)

$ id lily
uid=1005(lily) gid=1005(lily) groups=1005(lily),1007(students)

$ id mars
uid=1004(mars) gid=1004(mars) groups=1004(mars),1007(students)

$ id barney
uid=1003(barney) gid=1003(barney) groups=1003(barney),1007(students)
```

</details>

## Lab 02 - Permissions

**Tasks:**

1. Set others as DENY default permissions to any file that user 'ted' creates.
2. We have new directories below. Members of the group should have RW access to their respective directories. Files should also be writable for all members of the group
    - /data/profs
    - /data/students
3. Users can only delete files they have created.
4. User Ted as headmaster should be able to delete everything in both /data/profs and  /data/students.
5. Finally, members of group **profs** should be able to read all files in /data/students/

<details>
  <summary> **Solution** </summary>

Set user-specific umask 007 for the user 'ted'. This ensures that the User and Group has access to any files that the user creates, but Others don't have access to it.

```bash
$ sudo vim /home/ted/.bash_profile

umask 007
```

Test this.

```bash
$ su - ted
$ touch others-cant-access-this.txt
$ ll others-cant-access-this.txt
-rw-rw----. 1 ted ted 0 Mar 12 15:26 others-cant-access-this.txt
```

Create the new directories.

```bash
$ mkdir -p /data/{profs,students}
$ ll /data/
total 0
drwxr-xr-x. 2 root root 6 Mar 12 15:28 profs
drwxr-xr-x. 2 root root 6 Mar 12 15:28 students
```

Change permissions for the two directories. Note that the **sticky bit** restricts who can delete files in a directory.

```bash
$ sudo chmod 3770 /data/profs
$ sudo chmod 3770 /data/students
$ ll /data
total 0
drwxrws--T. 2 root root 6 Mar 12 15:28 profs
drwxrws--T. 2 root root 6 Mar 12 15:28 students
```

At this point, the members have RW access to files inside their respective directories. In the next step, we need to grant user 'ted' rights to delete all files inside both directory.

To do this with sticky bit enabled for both directories (recall that the sticky bits only allow members to delete the files that they have created), we need to give user 'Ted' ownership of both directories.

```bash
$ sudo chown ted:students /data/students/
$ sudo chown ted:profs /data/profs
$ ll /data/
total 0
drwxrws--T. 2 ted profs    6 Mar 12 15:28 profs
drwxrws--T. 2 ted students 6 Mar 12 15:28 students
```

Finally, to provide members of the group **profs** read access to all the files in /data/students, we need configure ACLs.

```bash
$ setfacl -m d:g:profs:rx /data/students/
```

To verify,

```bash
$ cd /data/students
$ getfacl .

# file: .
# owner: ted
# group: students
# flags: -st
user::rwx
group::rwx
other::---
default:user::rwx
default:group::rwx
default:group:profs:r-x
default:mask::rwx
default:other::---

```

</details>



## Lab 03 - Processes 

**Tasks:**

1. Run a background 'dd'job thrice.
2. Change the niceness of the first job to "-5". Observe what will happen.
3. Still for 'top', send a sigkill 9 to the "top" process.
4. Finally, kill all background 'dd' jobs.

<details>
  <summary> **Solution** </summary>

Run the command below, hit Ctrl-z then type **bg** to run the job in the background.

```bash
$ dd if=/dev/zero of=/dev/null
^Z
[1]+  Stopped                 dd if=/dev/zero of=/dev/null

$ bg
[1]+ dd if=/dev/zero of=/dev/null &
```

To verify that it's running,

```bash
$ jobs

[1]+  Running                 dd if=/dev/zero of=/dev/null &
```

Repeat this two more times.

```bash
$ dd if=/dev/zero of=/dev/null
^Z
[2]+  Stopped                 dd if=/dev/zero of=/dev/null

$ bg
[2]+ dd if=/dev/zero of=/dev/null &

$ dd if=/dev/zero of=/dev/null
^Z
[3]+  Stopped                 dd if=/dev/zero of=/dev/null

$ bg
[3]+ dd if=/dev/zero of=/dev/null &
```

Verify.

```bash
$ jobs

[1]   Running                 dd if=/dev/zero of=/dev/null &
[2]-  Running                 dd if=/dev/zero of=/dev/null &
[3]+  Running                 dd if=/dev/zero of=/dev/null &
```

To change the niceness of the first job, run **top** then hit **r** to renice the value to "-5".

![](/img/docs/plabsrenice.png)

![](/img/docs/plabsrenice2.png)

We can now see that the cpu utilization of the first job has increased to 50%.

![](/img/docs/plabsrenice3.png)

Still from 'top', send a sigkill signal by pressing 'k' and enter the process ID of 'top' then on the next, enter '9'.

![](/img/docs/plabsrenice4.png)

Press enter multiple times. We'll see that the screen didn't immediately cleared.

![](/img/docs/plabsrenice5.png)
![](/img/docs/plabsrenice6.png)

Finally, kill all background 'dd' jobs.

```bash
$ jobs
[1]   Running                 dd if=/dev/zero of=/dev/null &
[2]-  Running                 dd if=/dev/zero of=/dev/null &
[3]+  Running                 dd if=/dev/zero of=/dev/null &

$ killall dd
$ jobs
[1]   Terminated              dd if=/dev/zero of=/dev/null
[2]-  Terminated              dd if=/dev/zero of=/dev/null
[3]+  Terminated              dd if=/dev/zero of=/dev/null

```

</details>



## Lab 04 - SSH

**Tasks:**
 
1. Generate a new RSA key and copy it to the localhost using root.

<details>
  <summary> **Solution** </summary>

Generate the keygen.

```bash
$ ssh-keygen
```

Before we can copy it to the localhost, we must first enable key-based authentication temporarily. Edit the /etc/ssh/sshd_config and add the **AllowUsers**. Restart sshd afterwards.

```bash
$ sudoedit /etc/ssh/sshd_config

AllowUsers root
```

```bash
$ sudo systemctl restart sshd
```

You should now be able to copy the recently generated RSA key to the localhost.

```bash
$ ssh-copy-id localhost
```

</details>



## Lab 05 - HTTPD and Systemd

**Tasks:**

1. Install httpd and enable it.
2. Configure the service to restart after 5 seconds of being stopped.

<details>
  <summary> **Solution** </summary>

Install and enable httpd.

```bash
$ sudo yum install -y httpd
$ sudo systemctl enable --now httpd
$ sudo systemctl status httpd
```

Configure the service to restart after 5 seconds of being stopped.

```bash
$ systemctl edit httpd

[service]
Restart=always
RestartSec=5s
```

Reload the daemon.

```bash
$ systemctl daemon-reload
```

Enable and restart httpd again. Verify status.

```bash
$ sudo systemctl enable --now httpd
$ sudo systemctl status httpd
```

Kill the httpd service and verify status. The **Active** line should now show 'activatin' which means systemd is waiting for the 5 seconds timeout before it restarts the service.

```bash
$ killall httpd
$ sudo systemctl status httpd

● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)
  Drop-In: /etc/systemd/system/httpd.service.d
           └─override.conf
   Active: activating (auto-restart) since Sat 2022-03-12 17:02:32 UTC; 1s ago

```

</details>



## Lab 06 - Allow HTTP on Firewall

**Tasks:**

1. Ensure firewall is running.
2. Configure Firewall to allow http and https. This should persist across reboots.

<details>
  <summary> **Solution** </summary>

Check the firewall.

```bash
$ firewall-cmd --list-all
```

Configure Firewall to allow http. This should persist across reboots.

```bash
$ firewall-cmd --add-service={http,https}
$ firewall-cmd --add-service={http,https} --permanent
```

Verify.

```bash
firewall-cmd --list-all
public (active)
  target: default
  icmp-block-inversion: no
  interfaces: eth0
  sources:
  services: cockpit dhcpv6-client http https ssh
  ports:
  protocols:
  forward: no
  masquerade: no
  forward-ports:
  source-ports:
  icmp-blocks:
  rich rules:
```

Restart firewall and verify again.

```bash
$ sudo systemctl restart  firewalld.service
```

```bash
$ firewall-cmd --list-all
public (active)
  target: default
  icmp-block-inversion: no
  interfaces: eth0
  sources:
  services: cockpit dhcpv6-client http https ssh
  ports:
  protocols:
  forward: no
  masquerade: no
  forward-ports:
  source-ports:
  icmp-blocks:
  rich rules:
```

</details>

