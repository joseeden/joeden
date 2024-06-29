---
title: Cockpit
tags: [Linux, Red Hat, Certifications]
sidebar_position: 29
last_update:
  date: 7/8/2022
---


Cockpit is a server administration tool sponsored by Red Hat, focused on providing a modern-looking and user-friendly interface to manage and administer servers.

Here are some of the more important features of Cockpit:
- Graphical and interface designers are involved in the project.
- Cockpit is modular and can be extended by installing extra modules. You can even develop modules of your own.
- It can support multiple servers from a single dashboard.
- It is not intrusive. This means Cockpit works alongside other management tools without causing issues.
- Cockpit uses a systemd socket, and it doesn’t use any memory when it is not in use.
- Cockpit builds upon existing functionality; it doesn’t require a configuration by default.
- Cockpit doesn’t store the state or data of servers anywhere. It utilizes the same API command-line tools use.
- Cockpit has no special privileges and doesn’t run as root. It creates a session as the logged in user and has the same permissions as that user. So, to perform administrative tasks, the user needs permission to use sudo or PolicyKit to escalate privileges.
- It’s free!

```bash
$ sudo yum install -y cockpit cockpit-dashboard
$ sudo systemctl enable --now cockpit.socket

Created symlink /etc/systemd/system/sockets.target.wants/cockpit.socket → /usr/lib/systemd/system/cockpit.socket.
```

Allow cockpit in firewall.
```bash
$ sudo firewall-cmd --add-port=9090/tcp
$ sudo firewall-cmd --permanent --add-port=9090/tcp
```

```bash

$ sudo systemctl status cockpit.socket

● cockpit.socket - Cockpit Web Service Socket
   Loaded: loaded (/usr/lib/systemd/system/cockpit.socket; enabled; vendor preset: disabled)
   Active: active (listening) since Thu 2021-12-23 23:54:30 PST; 1min 29s ago
     Docs: man:cockpit-ws(8)
   Listen: [::]:9090 (Stream)
  Process: 27262 ExecStartPost=/bin/ln -snf active.motd /run/cockpit/motd (code=exited, status=0/SUCCESS)
  Process: 27254 ExecStartPost=/usr/share/cockpit/motd/update-motd  localhost (code=exited, status=0/SUCCESS)
    Tasks: 0 (limit: 100840)
   Memory: 4.0K
   CGroup: /system.slice/cockpit.socket

Dec 23 23:54:30 tst-rhel systemd[1]: Starting Cockpit Web Service Socket.
Dec 23 23:54:30 tst-rhel systemd[1]: Listening on Cockpit Web Service Socket.
```

![](/img/docs/sv-cockpit.png)
![](/img/docs/sv-cockpit-2.png)


