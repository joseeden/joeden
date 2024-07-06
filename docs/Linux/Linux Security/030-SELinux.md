---
title: "SELinux"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 30
last_update:
  date: 7/8/2022
---


## The Need for SELinux

SELinux (Security-Enhanced Linux) is a security module that provides mechanisms for supporting access control security policies, including mandatory access controls (MAC). It is an essential component in securing Linux systems by ensuring that applications and processes have only the necessary permissions.

- Linux security is built on UNIX security. 
- SELinux provides a complete and mandatory security solution.
- Most of the security solutions focus on a part of the OS.
- If it is not specifically allowed, it will be denied. 

Due to the strict implementation of SELinux, "unknown" services will always require additional configuration to enable them in an environment where SELinux is enabled.

## SELinux States and Modes

SELinux operates in different states and modes to control its behavior and the level of security enforcement.

![](/img/docs/sv-selinux-2.png)


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

- Every object is labeled with a context label. 

  - `user`: user specific context
  - `role`: role specific context
  - `type`: flags which type of operation is allowed on this object.

- Many commands support a `-Z` option to show current context information. 
- Context types are used in the rules in the policy to define which source object has access to which target object.


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

SELinux booleans allow you to enable or disable certain SELinux policy settings without requiring a policy rebuild. 

- A Bollean is an on/off switch. 
- Use it to enable or disable specific categories of functionality.

To list all SELinux booleans: 


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

$ setsebool -P httpd_enable_homedirs on

$ getsebool -a | grep http | grep homedir
httpd_enable_homedirs --> on
```


## Using File Context Labels

File context labels are used to assign security contexts to files and directories. These contexts are essential for SELinux to apply the correct security policies.

- Use `semanage fcontext` to set file context label. 
- This command will write the context to the SELinux policy. 
- To enforce policy setting, use `restorecon`. 
- Allternatively, use `touch /.autorelablel` to relable all files to the context that is specified in the policy. 

From the man page:

![](/img/docs/sv-selinux-labelsman.png)


## SELinux Log Messages

SELinux logs messages to track policy violations and other significant events. These logs are useful for troubleshooting and monitoring SELinux activities.

- SELinux uses `auditd` to write lof messages to the audit log. 
- Messages in the audit log may be hard to interpret. 
- Ensure that `sealert` is available, it interprets messages from the audit log.

### sealert 

`sealert` is a command-line utility used to interpret and provide detailed explanations of SELinux audit logs. It helps users understand why a certain action was denied by SELinux and provides suggestions for resolving issues.

To use `sealert`, first ensure you have the `setroubleshoot` package installed:

```bash
sudo yum install setroubleshoot -y
```

Then, you can use `sealert` to analyze SELinux audit logs. Here’s an example of how to use it:

```bash
sudo sealert -a /var/log/audit/audit.log
```

Sample Output:

```bash
SELinux is preventing /usr/bin/httpd from read access on the file /var/www/html/index.html.

*****  Plugin httpd_read_content (89.3 confidence) suggests   ******************

If you want to allow httpd to read the content
Then you need to change the label on /var/www/html/index.html
Do
# semanage fcontext -a -t httpd_sys_content_t '/var/www/html/index.html'
# restorecon -v '/var/www/html/index.html'

*****  Plugin catchall (11.6 confidence) suggests   **************************

If you believe that httpd should be allowed read access on the index.html file by default.
Then you should report this as a bug.
You can generate a local policy module to allow this access.
Do
# ausearch -c 'httpd' --raw | audit2allow -M my-httpd
# semodule -i my-httpd.pp

Additional Information:
Source Context                system_u:system_r:httpd_t:s0
Target Context                unconfined_u:object_r:user_home_t:s0
Target Objects                /var/www/html/index.html [ file ]
Source                        httpd
Source Path                   /usr/bin/httpd
Port                          <Unknown>
Host                          <Hostname>
Source RPM Packages           httpd-2.4.6-90.el7.centos.1.x86_64
Target RPM Packages           
Policy RPM                    selinux-policy-3.13.1-229.el7_6.15.noarch
Selinux Enabled               True
Policy Type                   targeted
Enforcing Mode                Enforcing
Host Name                     <Hostname>
Platform                      Linux <Hostname> 3.10.0-957.21.3.el7.x86_64 #1 SMP Mon Jun 10 16:01:17 UTC 2019 x86_64 x86_64
Alert Count                   1
First Seen                    2024-07-04 13:28:18
Last Seen                     2024-07-04 13:28:18
Local ID                      7a2a68b8-2e6a-4e9a-a93a-b4b5c6d3b1b3

Raw Audit Messages
type=AVC msg=audit(1641131928.383:125): avc:  denied  { read } for  pid=1056 comm="httpd" name="index.html" dev="sda1" ino=123456 scontext=system_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:user_home_t:s0 tclass=file

Hash: httpd,httpd_t,user_home_t,file,read
```

Explanation:

- **Issue Description**: SELinux is preventing the `httpd` process from reading the file `/var/www/html/index.html`.
- **Suggestions**: Provides suggestions for resolving the issue, such as changing the file's label or generating a local policy module.
- **Additional Information**: Details about the source and target contexts, source and target paths, and policy information are provided to help understand the issue better.
- **Raw Audit Messages**: The raw audit message shows the exact log entry from the audit log that triggered the alert.

To check for SELinux alerts using `journalctl`:

```bash
journalctl | grep sealert
```


### AVC Messages

AVC (Access Vector Cache) messages are logs generated by SELinux when an access attempt is denied based on the security policy. These messages are recorded in the audit logs and can be analyzed to understand and resolve permission issues.


These messages are logged to the `/var/log/audit/audit.log` file. To view these logs:

```bash
$ ll /var/log/audit/
total 1216
-rw-------. 1 root root 996305 Jan  3 16:17 audit.log

$ grep AVC /var/log/audit/audit.log
type=USER_AVC msg=audit(1641131903.482:81): pid=901 uid=81 auid=4294967295 ses=4294967295 subj=system_u:system_r:system_dbusd_t:s0-s0:c0.c1023 msg='avc:  denied  { send_msg } for msgtype=method_return dest=:1.21 spid=944 tpid=2299 scontext=system_u:system_r:systemd_logind_t:s0 tcontext=system_u:system_r:cloud_init_t:s0 tclass=dbus permissive=0  exe="/usr/bin/dbus-daemon" sauid=81 hostname=? addr=? terminal=?'UID="dbus" AUID="unset" SAUID="dbus"
type=USER_AVC msg=audit(1641131928.383:125): pid=901 uid=81 auid=4294967295 ses=4294967295 subj=system_u:system_r:system_dbusd_t:s0-s0:c0.c1023 msg='avc:  denied  { send_msg } for msgtype=err
```

To resolve AVC denials, you can use tools like `sealert` to get more detailed explanations and suggestions. This will analyze the audit log and provide detailed suggestions on how to resolve the denials, such as changing file contexts or modifying SELinux policies.

```bash
sudo sealert -a /var/log/audit/audit.log
```


If `httpd` is denied access to `/var/www/html/index.html`, you might need to change the file's SELinux context:

```bash
# semanage fcontext -a -t httpd_sys_content_t '/var/www/html/index.html'
# restorecon -v '/var/www/html/index.html'
```

Alternatively, if a custom policy is needed, you can generate one using `audit2allow`:

```bash
# ausearch -c 'httpd' --raw | audit2allow -M my-httpd
# semodule -i my-httpd.pp
```

These commands will create and install a custom policy module to allow the specific action that was denied.


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