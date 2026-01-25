---
title: "ABRT and SOS Reports"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 46
last_update:
  date: 3/21/2021
---

## Automatic Bug Reporting Tool

From [Red Hat Deployment Guide,](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/ch-abrt):

> *The Automatic Bug Reporting Tool, commonly abbreviated as ABRT, consists of the abrtd daemon and a number of system services and utilities to process, analyze, and report detected problems. The daemon runs silently in the background most of the time, and springs into action when an application crashes or a kernel oops is detected. The daemon then collects the relevant problem data such as a core file if there is one, the crashing application's command-line parameters, and other data of forensic utility.*

### Install ABRT 

To install ABRTD:

```bash
sudo dnf install -y abrt
sudo dnf install -y abrt-cli
sudo dnf install -y abrt-tui
```

Enable and start the service:

```bash
sudo systemctl enable --now abrtd
```

To check the status: 

```bash
sudo systemctl status abrtd
```


### Reports and Events

Note that the bug reports are collected on the system and it's up to the administrators to configure it to send to other places. The config file for the bug reports can be found and managed here:

```bash
$ ll /etc/libreport/

total 16
drwxr-xr-x. 2 root root    6 Aug 19  2020 events
drwxr-xr-x. 2 root root  134 Feb 27 22:25 events.d
-rw-r--r--. 1 root root  294 Aug 19  2020 forbidden_words.conf
-rw-r--r--. 1 root root  900 Aug 19  2020 ignored_words.conf
-rw-r--r--. 1 root root  290 Aug 19  2020 libreport.conf
drwxr-xr-x. 2 root root   49 Feb 27 22:25 plugins
-rw-r--r--. 1 root root 2408 Aug 19  2020 report_event.conf
drwxr-xr-x. 2 root root    6 Aug 19  2020 workflows.d
```

The important config file here is the **report_event.conf**. It defines the actions that should be taken when a crash or problem is detected on the system:

- The file specifies which events should trigger actions. 
- Administrators can customize the file to tailor the response to different types of crashes. 
- It can be used to set up integration with external bug tracking or reporting systems.
- The file can be used to define rules for redacting or ignoring sensitive information

To see a list of crash events:

```bash
sudo abrt-cli list
```

Sample output: 

```bash
id 33cdcc0c40a653724d6e3b65d27427fa9bba60a6
reason:         /usr/bin/python3 killed by SIGSEGV
time:           Tue 2024-07-02 10:32:46 AM UTC
cmdline:        python3 script.py
package:        python3-3.9.5-1.fc34
uid:            1000
count:          1
Directory:      /var/spool/abrt/ccpp-2024-07-02-10:32:46-98765

id 879fe4e8b4f8f7e4b5739aab0d7e3e2e4c4c3a12
reason:         /usr/bin/httpd killed by SIGABRT
time:           Mon 2024-07-01 02:15:30 PM UTC
cmdline:        /usr/sbin/httpd -DFOREGROUND
package:        httpd-2.4.48-1.fc34
uid:            0 (root)
count:          1
Directory:      /var/spool/abrt/ccpp-2024-07-01-14:15:30-12345 
```

### Autoreporting 

Autoreporting in ABRT allows for the automatic submission of crash reports without requiring user intervention. This can be especially useful in environments where timely reporting and resolution of issues are critical.

Note that autoreporting is not enabled by default. To enable it: 

```bash
sudo abrt-auto-reporting enabled
sudo systemctl restart abrtd
```

### Testing ABRT

Let's test the ABRT tool by running a fake crash. The test below will generate a segmentation fault.

Sleep for 100 seconds at the background:

```bash
sleep 100 &
```

Kill the process:

```bash 
$ sudo kill -s SEGV 4408

[3]   Segmentation fault      (core dumped) sleep 100
```

Check the bug report:

```bash
sudo abrt-cli list
```


## SOS Reports

These are built-in feature in RHEL which allows you to generate SOS reports which the tech supports need. These are genrally useful when you'e having issues with your RHEL machine/s and you send a report to the RHEL support. You can simply generate the SOS report, upload to the RHEL site, and the tech support will take care of the navigating and troubleshooting.

Note that this is also useful to the administrators who could be managing thousands of machines.

### Install SOS 

To install the SOS generator:

```bash
sudo dnf install -y sos
```

### Generate the report 

To start generating report, run the command below. It will start grabbing data from the system and it will then present you with questions that you need to answer. The report will be dumped in the **/var/tmp/** directory.

```bash
sudo sosreport
```
```bash
$ ll /var/tmp/
total 13848
drwxrwxrwt. 2 root root        6 Mar  6 10:39 cloud-init
-rw-------. 1 root root 14176180 Mar  6 10:49 sosreport-tstrhel8-2022-03-06-offtnfu.tar.xz
-rw-r--r--. 1 root root       65 Mar  6 10:49 sosreport-tstrhel8-2022-03-06-offtnfu.tar.xz.sha256
drwx------. 3 root root       17 Mar  6 10:39 systemd-private-c38ab52516ea4487a4adfeee0b53261f-chronyd.service-bpXRsg
```

We can also restrict the report being generated by specifying parameters. In the example below, we can skip the plugins from being included in the sos report.

```bash
sudo sosreport --skip-plugins
```

Use the man pages to see more details about sosreport.

```bash
man sosreport
```

