---
title: "Uninstall MySQL"
description: "Uninstall MySQL"
tags: 
- Data Engineering
- Databases
- MySQL
sidebar_position: 10
last_update:
  date: 1/15/2024
---

## Uninstall 

1. Remove the installed MySQL packages, including the server and client packages:

    ```bash
    sudo apt-get purge -y mysql-server mysql-client mysql-common mysql-server-core-* mysql-client-core-*
    ```

2. To remove any leftover dependencies that are no longer needed after removing MySQL:

    ```bash
    sudo apt-get autoremove -y
    ```

3. Clear any cached packages that are stored on your system to free up space:

    ```bash
    sudo apt-get clean
    ```

4. To completely remove MySQL's configuration and data files, which are not removed by the above commands, delete the following directories manually:

    ```bash
    sudo rm -rf /etc/mysql /var/lib/mysql /var/log/mysql /var/log/mysql.* /var/run/mysqld
    ```

5. If there are still MySQL packages on your system, you can list them and remove any remaining MySQL packages:

    ```bash
    dpkg -l | grep mysql
    ```

    If you find any packages, remove them manually using:

    ```bash
    sudo dpkg --purge <package-name>
    ```

    Sample:

    ```bash
    sudo apt-get purge --auto-remove -y mysql-client mysql-common mysql-community-client mysql-community-client-core mysql-community-client-plugins mysql-community-server mysql-community-server-core mysql-community-server-debug mysql-community-test mysql-community-test-debug
    ```

    Check again:

    ```bash
    dpkg -l | grep mysql
    ```


6. If you get an error deleting `mysql-common`, inspect and edit the Post-Removal Script:

    ```bash
    sudo vi /var/lib/dpkg/info/mysql-common.postrm
    ```

    Run the purge command again:

    ```bash
    sudo dpkg --purge mysql-common
    ```

