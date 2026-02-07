---
title: SSH
tags: 
- Linux
- Red Hat
- Certifications
- Labs
sidebar_position: 21 
last_update:
  date: 3/27/2021
---


## Tasks

1. Configure SSH keys for password-less login to the SSH process listening on localhost.
2. Configure SSH such that only **mary** and **root** can log in.

----

## Solution

### 1. Password-less login

Generate SSH key pair (if not already done)

```bash
ssh-keygen -t rsa
```

Follow the prompts to generate the key pair. This will create `~/.ssh/id_rsa` (private key) and `~/.ssh/id_rsa.pub` (public key).

Use `ssh-copy-id` or manually append the public key to the server's `authorized_keys` file. Assuming SSH is listening on localhost (127.0.0.1):

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub localhost
```

You can also manually append the content of `~/.ssh/id_rsa.pub` to `~/.ssh/authorized_keys` on the server.

Next, test SSH login to localhost without password:

```bash
ssh localhost
```

You should now be logged in without entering a password.



### 2. Only specific users can login

Edit `/etc/ssh/sshd_config`:

```bash
sudo nano /etc/ssh/sshd_config
```

Modify the `AllowUsers` directive and specify the users allowed to log in.

```ssh
AllowUsers mary root
```

Apply the changes by restarting the SSH service:

```bash
sudo systemctl restart sshd
```