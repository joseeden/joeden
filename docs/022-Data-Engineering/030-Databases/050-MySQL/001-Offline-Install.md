---
title: "Offline Install"
description: "Offline Install"
tags: 
- Data Engineering
- Databases
- MySQL
sidebar_position: 1
last_update:
  date: 1/15/2024
---


## Overview 

This lab covers the offline installation of MySQL. This is suitable for private networks where nodes doesn't have internet access. 

Virtual machine used:

```bash
$ cat /etc/os-release

PRETTY_NAME="Ubuntu 22.04.5 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.5 LTS (Jammy Jellyfish)"
VERSION_CODENAME=jammy
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=jammy 
```

## Download the Packages 

On a computer with internet access:

1. Go to [MySQL Community Downloads](https://dev.mysql.com/downloads/repo/apt/), select the correct bundle package and click Download.

    ![](/img/docs/12242024-database-mysql-install-2.png)

3. When prompted to sign up, click **No thanks, just start my download.**

4. Open a terminal and download the other pre-requisites package.

    ```bash
    mkdir mysql-prerequisites
    cd mysql-prerequisites
    apt download libmecab2 libc6 \
    mecab-ipadic-utf8 mecab-ipadic mecab-utils \
    libcrypt1 libgcc-s1 libmecab2 libstdc++6 gcc-12-base
    ```

5. Copy the files to the [local folder mapped to a fileshare in you VM](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare).


## Install on Air-gapped Server

On the MySQL VM:

1. Copy the file from the fileshare to `/tmp`. Untar the file. 

    ```bash
    cp /mnt/fileshare/mysql-* /tmp
    cd /tmp
    ```

2. The bundle will contain the following packages.

    ```bash
    $ ls -la

    total 507328
    drwxrwx--- 1 root vboxsf      8192 Dec 24 10:36 .
    drwxrwx--- 1 root vboxsf      4096 Dec 24  2024 ..
    -rwxrwx--- 1 root vboxsf    232656 Feb 26  2020 libmecab2_0.996-10build1_amd64.deb
    -rwxrwx--- 1 root vboxsf  31335066 Sep 24 12:47 libmysqlclient-dev_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf   1527862 Sep 24 12:47 libmysqlclient24_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf     58814 Sep 24 12:47 mysql-client_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf     60100 Sep 24 12:47 mysql-common_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf   1855698 Sep 24 12:47 mysql-community-client-core_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf   1529908 Sep 24 12:46 mysql-community-client-plugins_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf   2264810 Sep 24 12:46 mysql-community-client_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf  30789560 Sep 24 12:47 mysql-community-server-core_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf  37223286 Sep 24 12:47 mysql-community-server-debug_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf     68838 Sep 24 12:47 mysql-community-server_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf  15793946 Sep 24 12:47 mysql-community-test-debug_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf 396606298 Sep 24 12:47 mysql-community-test_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf     58808 Sep 24 12:47 mysql-server_9.1.0-1ubuntu22.04_amd64.deb
    -rwxrwx--- 1 root vboxsf     58818 Sep 24 12:46 mysql-testsuite_9.1.0-1ubuntu22.04_amd64.deb
    ```

3. Install the packages at once.

    ```bash
    sudo apt update
    sudo dpkg -i *.deb 
    ```

4. Provide root password when prompted.

    ![](/img/docs/12242024-database-mysql-provide-root-pw.png)


5. Enable and verify if MySQL is installed and running.

    ```bash
    sudo systemctl enable --now mysql 
    sudo systemctl status mysql 
    ```