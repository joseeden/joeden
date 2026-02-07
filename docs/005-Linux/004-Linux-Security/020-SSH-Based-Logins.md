---
title: SSH-Based Logins
tags: 
- Linux
- Red Hat
- Certifications
sidebar_position: 20
last_update:
  date: 7/8/2022
---


SSH key-based login is a method to securely connect to remote systems without using a password. Instead, it uses a pair of cryptographic keys: a private key, kept on your local machine, and a public key, placed on the remote server. This enhances security by eliminating the need for password-based authentication.

![](/img/docs/sv-sshkey1.png)


## Setting up SSH Key-Based Login

To set up SSH key-based login, follow these steps:

1. Generate SSH Key Pair:

    ```bash
    ssh-keygen -t rsa
    ```

    ![](/img/docs/sv-sshkey3.png)

2. Copy Public Key to Remote Server:

    ```bash
    ssh-copy-id user@remote_server
    ```
    
    ![](/img/docs/sv-sshkey4.png)

    If the `ssh-copy-id` command doesn't work, manually copy the public key to the remote server.


3. Test SSH Key-Based Login:

    ```bash
    ssh user@remote_server
    ```

    ![](/img/docs/sv-sshkey5.png)

4. Cache the SSH Key:

    ```bash
    ssh-add
    ```

    ![](/img/docs/sv-sshkey6.png)

## Example Scenario

In this example, I'll connect my local VM from VirtualBox to my EC2 instance.

- EC2 instance - tst-rhel-a1

- Local VM - tst-rhel-local


On my local VM, I generated the key and tried to copy it to my remote EC2 instance.

![](/img/docs/sv-sshkey10.png)

![](/img/docs/sv-sshkey11.png)

If automatic copying fails, manually copy the contents of the RSA public key of the local VM:

1. Locate and Display Public Key:

    ```bash
    [root@localhost ~]# ll .ssh/
    total 12
    -rw-------. 1 root root 2655 Jan  3 22:01 id_rsa
    -rw-r--r--. 1 root root  580 Jan  3 22:01 id_rsa.pub
    -rw-r--r--. 1 root root  174 Jan  3 22:03 known_hosts

    [root@localhost ~]# cat .ssh/id_rsa.pub
    ssh-rsa AAAAB3Nza... root@tst-rhel-local
    ```

2. Paste Public Key into `authorized_keys` on Remote Server:

    ```bash
    $ vim .ssh/authorized_keys
    ssh-rsa AAAAB3Nza... root@tst-rhel-local
    ```

3. Connect to Remote Server:

    ```bash
    ssh user@remote_server
    ```
    
    ![](/img/docs/sv-sshkey-20.png)


## Changing Common SSH Server Options

To enhance security and configure SSH server settings, edit the `sshd_config` file:

1. View SSH Configuration Files:

    ```bash
    $ ll /etc/ssh/ssh*
    -rw-r--r--. 1 root root     1770 Jul 12 08:41 /etc/ssh/ssh_config
    -rw-------. 1 root root     4268 Jan  2 13:58 /etc/ssh/sshd_config
    ```

    Note: 

    - Server options are set in `/etc/ssh/sshd_config`.
    - Client options are set in `/etc/ssh/ssh_config`.

2. Edit `sshd_config` File:

    ```bash
    $ sudo vi /etc/ssh/sshd_config
    ```

3. Important Parameters:

    ```bash
    # If server is internet-facing, good to set this to NO
    PermitRootLogin yes

    # You can also specify the users that are allowed to login
    AllowUsers johnsmith janedoe

    # If you want to disable passwords and allow only keypair you can set this to NO. Note that this is convenient.
    PasswordAuthentication no
    ```

4. Apply Changes:

    ```bash
    $ sudo systemctl restart sshd
    ```


## Changing the SSH Port

Enhance security by changing the default SSH port from 22 to another port:

1. Edit `sshd_config` File:

    ```bash
    $ sudo vi /etc/ssh/sshd_config
    # If you want to change the port on a SELinux system, you have to tell
    # SELinux about this change.
    # semanage port -a -t ssh_port_t -p tcp #PORTNUMBER
    #
    #Port 22
    Port 2222
    ```

2. Allow New Port in Firewall and SELinux:

    ```bash
    $ sudo firewall-cmd --add-port=2222/tcp
    $ sudo firewall-cmd --add-port=2222/tcp --permanent
    $ sudo semanage port -a -t ssh_port_t -p tcp 2222
    ```

3. Restart SSH Service:

    ```bash
    $ sudo systemctl restart sshd
    ```
