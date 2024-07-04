---
title: "Securing Linux"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 4
last_update:
  date: 7/8/2022
---


## The Need for SELinux

SELinux (Security-Enhanced Linux) is a security module that provides mechanisms for supporting access control security policies, including mandatory access controls (MAC). It is an essential component in securing Linux systems by ensuring that applications and processes have only the necessary permissions.

![](/img/docs/sv-selinux.png)

## SELinux States and Modes

SELinux operates in different states and modes to control its behavior and the level of security enforcement.

![](/img/docs/sv-selinux-2.png)
![](/img/docs/sv-selinux03.png)

### States
There are two primary states:
- **Enabled**: SELinux is active and enforcing security policies.
- **Disabled**: SELinux is turned off and not enforcing any policies.

To disable or enable SELinux, a system reboot is required.

### Modes
When SELinux is enabled, it can operate in one of two modes:
- **Enforcing**: Enforces SELinux policies, blocking any actions that do not comply with the policies.
- **Permissive**: SELinux policies are not enforced; instead, violations are logged. This mode is useful for troubleshooting and should be temporary.

To switch between enforcing and permissive modes, use the `setenforce` command:

```bash
$ getenforce
Enforcing

$ setenforce permissive

$ getenforce
Permissive
```

To check the current status of SELinux, use:

```bash
sestatus
```

To view SELinux information inside a directory, use:

```bash
ls -lZ
```

To disable SELinux permanently, edit the configuration file and change **enforcing** to **disabled**, then reboot:

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

When SELinux is set to disabled, the `setenforce` command will not work:
```bash
$ setenforce permissive
setenforce: SELinux is disabled
```



## Context Labels and Booleans

SELinux uses context labels and booleans to manage access controls and permissions for processes and files.

![](/img/docs/sv-selinux-labels.png)
![](/img/docs/sv-selinux-booleans.png)

### Context Labels

You can add SELinux information to the `ps` output by using the uppercase **Z** option:
```bash
ps auxZ
```

For example, checking the context label of SSH:

![](/img/docs/sv-selinux-labels-2.png)

To check the context labels for HTTPD (Apache):

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

### Booleans

SELinux booleans allow you to enable or disable certain SELinux policy settings without requiring a policy rebuild. To list all SELinux booleans:

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

To allow a web server to access home directories, set the following parameter to 'on':

```bash
$ getsebool -a | grep http | grep homedir
httpd_enable_homedirs --> off
$
$ setsebool -P httpd_enable_homedirs on
$
$ getsebool -a | grep http | grep homedir
httpd_enable_homedirs --> on
```


## Using File Context Labels

File context labels are used to assign security contexts to files and directories. These contexts are essential for SELinux to apply the correct security policies.

![](/img/docs/sv-seinux-filecontextlabels.png)

From the man page:
![](/img/docs/sv-selinux-labelsman.png)


## SELinux Log Messages

SELinux logs messages to track policy violations and other significant events. These logs are useful for troubleshooting and monitoring SELinux activities.

![](/img/docs/sv-selinux-log.png)

**Access Vector Cache** (AVC) messages are logged to the `/var/log/audit/audit.log` file.

To view these logs:

```bash
$ ll /var/log/audit/
total 1216
-rw-------. 1 root root 996305 Jan  3 16:17 audit.log
$
$ grep AVC /var/log/audit/audit.log
type=USER_AVC msg=audit(1641131903.482:81): pid=901 uid=81 auid=4294967295 ses=4294967295 subj=system_u:system_r:system_dbusd_t:s0-s0:c0.c1023 msg='avc:  denied  { send_msg } for msgtype=method_return dest=:1.21 spid=944 tpid=2299 scontext=system_u:system_r:systemd_logind_t:s0 tcontext=system_u:system_r:cloud_init_t:s0 tclass=dbus permissive=0  exe="/usr/bin/dbus-daemon" sauid=81 hostname=? addr=? terminal=?'UID="dbus" AUID="unset" SAUID="dbus"
type=USER_AVC msg=audit(1641131928.383:125): pid=901 uid=81 auid=4294967295 ses=4294967295 subj=system_u:system_r:system_dbusd_t:s0-s0:c0.c1023 msg='avc:  denied  { send_msg } for msgtype=err
```

To check for SELinux alerts using `journalctl`:

```bash
$ journalctl | grep sealert
$
```


## Resetting Root Password and SELinux

This section explains the process of resetting the root password in an SELinux-enabled system and the specific steps to ensure SELinux labels are correctly applied.

![](/img/docs/sv-chrootse1.png)
![](/img/docs/sv-chrootse2.png)

When checking the shadow file, the context might be set to '?' because SELinux is not yet loaded:

![](/img/docs/sv-chrootse4.png)

To load SELinux, use the `load_policy` command (this should be used only in troubleshooting mode):

```bash
load_policy -i
```

![](/img/docs/sv-chrootse5.png)

After loading SELinux, the shadow file context should change:

![](/img/docs/sv-chrootse7.png)

To fix the context:

```bash
restorecon -v /etc/shadow
```

![](/img/docs/sv-chrootse8.png)

To ensure all changes are applied and labeled correctly, create a file that triggers a full relabel on the next reboot:

```bash
touch /.autorelabel
```