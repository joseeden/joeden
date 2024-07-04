---
title: "Securing Linux"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 4
last_update:
  date: 7/8/2022
---

## The Need for SELinux

![](/img/docs/sv-selinux.png)

### SELinux States and Modes

![](/img/docs/sv-selinux-2.png)
![](/img/docs/sv-selinux03.png)

There are basically just two states: **enabled** and **disabled**.
- To disable or enable, reboot.
- in enabled mode, there are two modes
    - **enforcing** - blocks those that doesnt match a rule
    - **permissive** - will log, but will not block; should be temporary
- to switch between enforcing and permissive: **setenforce <mode>modes</mode>

As an example:

```bash
$ getenforce
Enforcing
$ setenforce permissive
$
$ getenforce
Permissive
```

To see the status,
```bash
sestatus
```

Another awesome command to see the SElinux information inside a directory.
```bash
ls -lZ
```

To disable SElinux, edit the config file and change **enforcing** to **disabled**. Then reboot.
```bash
$ vim /etc/sysconfig/selinux

# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
SELINUX=enforcing
# SELINUXTYPE= can take one of these three values:
#     targeted - Targeted processes are protected,
#     minimum - Modification of targeted policy. Only selected processes are protected.
#     mls - Multi Level Security protection.
SELINUXTYPE=targeted

```

Note that when selinux is set to disabled, **Setenforce will not work**.
```bash
$ setenforce permissive
setenforce: SELinux is disabled
```


---

### Context Labels and Booleans

![](/img/docs/sv-selinux-labels.png)
![](/img/docs/sv-selinux-booleans.png)

As example, we can add selinux info to the **ps** output by adding uppercase **Z**.
```bash
ps auxZ
```

In the exam below, we see the contaxt label of ssh in the first few characters. The important part here is the context type, which is **sshd_t**.
![](/img/docs/sv-selinux-labels-2.png)

Similarly, we can check for httpd
```bash
$ ps auxZ | grep httpd
system_u:system_r:httpd_t:s0    root         994  0.0  0.0 275980 10956 ?        Ss   16:02   0:00 /usr/sbin/httpd -DFOREGROUND
system_u:system_r:httpd_t:s0    apache      1036  0.0  0.0 289864  8140 ?        S    16:02   0:00 /usr/sbin/httpd -DFOREGROUND
system_u:system_r:httpd_t:s0    apache      1037  0.0  0.0 2789524 17984 ?       Sl   16:02   0:00 /usr/sbin/httpd -DFOREGROUND
system_u:system_r:httpd_t:s0    apache      1038  0.0  0.0 2527312 15940 ?       Sl   16:02   0:00 /usr/sbin/httpd -DFOREGROUND
system_u:system_r:httpd_t:s0    apache      1039  0.0  0.0 2592848 15940 ?       Sl   16:02   0:00 /usr/sbin/httpd -DFOREGROUND
unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023 root 1844 0.0  0.0 12136 1044 pts/0 S+ 16:06   0:00 grep --color=auto httpd
$
```

![](/img/docs/sv-selinux-labels-4.png)


---

### Booleans

```bash
$ getsebool -a
abrt_anon_write --> off
abrt_handle_event --> off
abrt_upload_watch_anon_write --> on
antivirus_can_scan_system --> off
antivirus_use_jit --> off
auditadm_exec_content --> on
authlogin_nsswitch_use_ldap --> off
authlogin_radius --> off
authlogin_yubikey --> off
awstats_purge_apache_log_files --> off
boinc_execmem --> on
```

As an example, if I want to allow web server to access home directories, I can set the following parameter to 'on'.
```bash
$ getsebool -a | grep http | grep homedir
httpd_enable_homedirs --> off
$
$ setsebool -P httpd_enable_homedirs on
$
$ getsebool -a | grep http | grep homedir
httpd_enable_homedirs --> on
```

---

### Using File Context Labels 

![](/img/docs/sv-seinux-filecontextlabels.png)

From the man page,
![](/img/docs/sv-selinux-labelsman.png)


### SELinux Log Message
![](/img/docs/sv-selinux-log.png)

Here we can see **Access Vector Cache (AVC)** message is logged to the /var/log/audit/audit.log

```bash
$ ll /var/log/audit/
total 1216
-rw-------. 1 root root 996305 Jan  3 16:17 audit.log
$
$ grep AVC /var/log/audit/audit.log
type=USER_AVC msg=audit(1641131903.482:81): pid=901 uid=81 auid=4294967295 ses=4294967295 subj=system_u:system_r:system_dbusd_t:s0-s0:c0.c1023 msg='avc:  denied  { send_msg } for msgtype=method_return dest=:1.21 spid=944 tpid=2299 scontext=system_u:system_r:systemd_logind_t:s0 tcontext=system_u:system_r:cloud_init_t:s0 tclass=dbus permissive=0  exe="/usr/bin/dbus-daemon" sauid=81 hostname=? addr=? terminal=?'UID="dbus" AUID="unset" SAUID="dbus"
type=USER_AVC msg=audit(1641131928.383:125): pid=901 uid=81 auid=4294967295 ses=4294967295 subj=system_u:system_r:system_dbusd_t:s0-s0:c0.c1023 msg='avc:  denied  { send_msg } for msgtype=err
```
```bash
$ journalctl | grep sealert
$
```

---

### Resetting Root Password and Selinux

This lab goes through the exact same process in resetting the root password.
But here we'll deep dive on what's actually happening.
![](/img/docs/sv-chrootse1.png)
![](/img/docs/sv-chrootse2.png)

If we check the shadow file, we see the context is set to '?'.
This is because SElinux is still not loaded at this point.
![](/img/docs/sv-chrootse4.png)

To load selinux.
Note that this command should only be used on tshooting mode.
```bash
load_policy -i
```
![](/img/docs/sv-chrootse5.png)

If we check the shadow file again,
![](/img/docs/sv-chrootse7.png)

Here we can see that the shadow file is set to **unlabeled_t**.
To fix this,
```bash
restorecon -v /etc/shadow
```
![](/img/docs/sv-chrootse8.png)

To make sure every change will eb applied and labelled,
```bash
touch /.autorelabel
```
