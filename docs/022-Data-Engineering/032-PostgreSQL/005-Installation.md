---
title: "Installation"
description: "PostgreSQL"
tags: [Data Engineering, Databases, SQL, PostgreSQL]
sidebar_position: 5
last_update:
  date: 2/27/2022
---


## Install PostgreSQL on Windows

1. Go to the site [Enterprisedb PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) and download the version that's compatible with your Windows machine. There are installers for both 32-bit and 64-bit systems.

    ![](/img/docs/postgresql-install-on-windows-using-edb.png)

2. If you are unsure if your Windows machine is 32 bit or 64 bit, you can check it in the Settings.

    ```plaintext
    Settings >  System > About 
    ```

    You should see:

    ```plaintext
    System type:  64-bit operating system, x64-based processor
    ```

3. Navigate to the location where you downloaded the installer file, right-click, and run as administrator. Select Yes in the UAT Prompt box.

4. Click Next in the welcome page. 

    ![](/img/docs/postgresql-install-on-windows-using-edb-welcom-page.png)

5. You'll be asked to specify the installation directory where you want to install PostgreSQL and the data directory (you can leave this as default). Click next after each step.

    ![](/img/docs/postgresql-install-on-windows-using-edb-install-dir.png)

    You might also get asked to select the components that you want to install. You can leave it as default.

    ![](/img/docs/postgresql-install-on-windows-using-edb-select-components.png)

    ![](/img/docs/postgresql-install-on-windows-using-edb-data-dirr.png)

6. Provide a password to protect your database and click Next. Then specify the port that you want to use. PostgreSQL's services will run on port (default port is 5432).

    ![](/img/docs/postgresql-install-on-windows-using-edb-provide-passwordd.png)

    ![](/img/docs/postgresql-install-on-windows-using-edb-specify-port.png)

7. Click Next thrice.

    ![](/img/docs/postgresql-install-on-windows-using-edb-default-locale.png)

    ![](/img/docs/postgresql-install-on-windows-using-edb-sumarrry.png)

    ![](/img/docs/postgresql-install-on-windows-using-edb-finisssh.png)

8. After the installation is done, you should see the **Completing the PostgreSQL Setup Wizard** step. Uncheck the `Launch Builder at exit?` and click Finish.

    ![](/img/docs/postgresql-install-on-windows-using-edb-finish-last-steppsss.png)


<!-- ## Install PostgreSQL on Ubuntu 22.04

Virtual machine:

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
``` -->



## Offline Install on Ubuntu 22.04

Offline install is useful when you need to install PostgreSQL on a server that doesn't have internet access. For the example below, PostgreSQL will be installed on a virtual machine running on VirtualBox. 

Virtual machine:

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

Local computer installed with WSL2:

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


### Download the Packages 

On a computer with internet access:

1. If your system is not configured to use Ubuntu 22.04 repositories, you can add them explicitly.

    ```bash
    echo "deb http://archive.ubuntu.com/ubuntu jammy main restricted universe multiverse" | sudo tee /etc/apt/sources.list.d/ubuntu-jammy.list
    sudo apt update
    ```

2. Download the PostgreSQL repository key:

   ```bash
   wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor > postgresql.gpg
   ```

3. Move the key to a trusted location:

   ```bash
   sudo mv postgresql.gpg /etc/apt/trusted.gpg.d/
   ```

4. Add the PostgreSQL repository:

   ```bash
   echo "deb http://apt.postgresql.org/pub/repos/apt/ jammy-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list
   ```

5. Update package lists:

   ```bash
   sudo apt update
   ```

6. Download the PostgreSQL 16 package and its dependencies:

    ```bash
    mkdir postgresql-16
    cd postgresql-16
    sudo apt-get download postgresql-16 \
    postgresql-client-16  \
    postgresql-common libpq5 \
    libpq5 ssl-cert libjson-perl \
    libipc-run-perl libio-pty-perl libllvm15 \
    postgresql-client-common=267.pgdg22.04+1
    ```

7. Copy the files to the virtual machine. [You can map local folder to a fileshare in you VM](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#setup-fileshare).




### Install PostgreSQL on Ubuntu 

On the airgapped server, switch to **root** user :

1. Update the system’s default applications and packages.

    ```bash
    sudo apt update && sudo apt upgrade -y 
    ```

2. Navigate to the directory containing the `.deb` files. Install all packages using `dpkg`.

    ```bash
    cp -r /mnt/database/postgres* /tmp/postgresql-packages
    cd /tmp/postgresql-packages
    sudo dpkg -i *.deb
    ```
3. If there are any missing dependencies, use `dpkg` to list them.

    ```bash
    sudo apt-get install -f
    ```

4. Enable and start the service.

    ```bash
    sudo systemctl enable --now postgresql 
    sudo systemctl status postgresql 
    ```

5. Verify version.

    ```bash
    $ psql --version
    ```

    Output:

    ```bash 
    psql (PostgreSQL) 16.6 (Ubuntu 16.6-1.pgdg22.04+1) 
    ```

6. PostgreSQL runs under a dedicated system user named `postgres`. Switch to this user:

    ```bash
    sudo -i -u postgres
    ```

7. Launch the psql command-line interface:

    ```bash
    psql 
    ```

8. Set a password for the default `postgres` superuser account:

    ```sql
    ALTER USER postgres PASSWORD 'your_secure_password';
    ```

    To exit the shell:

    ```bash
    \q 
    ```


### Edit the Configuration Files

Two key files determine PostgreSQL's behavior:

- **`postgresql.conf`:** Controls database server settings.
- **`pg_hba.conf`:** Manages client authentication.

Steps: 

1. Find the configuration files, usually under `/etc/postgresql/<version>/main/`:

   ```bash
   sudo find /etc -name postgresql.conf
   sudo find /etc -name pg_hba.conf
   ```

2. Modify as needed, for example, to change the listening address:

   ```bash
   sudo vi /etc/postgresql/<version>/main/postgresql.conf
   ```

   Set:

   ```plaintext
   listen_addresses = '0.0.0.0'  # Use 127.0.0.1 - only listeni on the local loopback interface.
   ```

3. Configure client access rules:

   ```bash
   sudo vi /etc/postgresql/<version>/main/pg_hba.conf
   ```

   Common settings:

   ```plaintext
   # TYPE  DATABASE        USER            ADDRESS                 METHOD
   host    all             all             127.0.0.1/32           md5
   host    all             all             0.0.0.0/0              md5
   ```

4. Apply the changes by restarting the service:

   ```bash
   sudo systemctl restart postgresql
   ```

5. Create a new database and a user with appropriate permissions.

   ```bash
   sudo -i -u postgres
   createdb mydatabase
   psql
   ```

6. Create a User:


   ```sql
   CREATE USER operator WITH PASSWORD 'mypassword';
   ```

   Grant Permissions:

   ```sql
   GRANT ALL PRIVILEGES ON DATABASE mydatabase TO operator;
   ```

   Exit the shell:
   ```sql
   \q
   ```

7. Test the Connection from the same machine:

   ```bash
   psql -U operator -d mydatabase -h 127.0.0.1
   ```


### Troubleshooting 

#### No version information available

If you get this error when running `systemctl` commands, your airgapped Ubuntu system is using an older version of `libstdc++.so.6`, and the required version `GLIBCXX_3.4.29` is missing.

```bash
systemctl: /lib/x86_64-linux-gnu/libselinux.so.1: no version information available (required by systemctl) 
```

Solution:

1. Verify the installed version on the airgapped system.

    ```bash
    strings /lib/x86_64-linux-gnu/libstdc++.so.6 | grep GLIBCXX
    ```

    Look for `GLIBCXX_3.4.29` in the output. If it’s missing, proceed with step 2.

    ```bash
    GLIBCXX_3.4
    GLIBCXX_3.4.1
    GLIBCXX_3.4.2
    GLIBCXX_3.4.3
    GLIBCXX_3.4.4
    GLIBCXX_3.4.5
    GLIBCXX_3.4.6
    GLIBCXX_3.4.7
    GLIBCXX_3.4.8
    GLIBCXX_3.4.9
    GLIBCXX_3.4.10
    GLIBCXX_3.4.11
    GLIBCXX_3.4.12
    GLIBCXX_3.4.13
    GLIBCXX_3.4.14
    GLIBCXX_3.4.15
    GLIBCXX_3.4.16
    GLIBCXX_3.4.17
    GLIBCXX_3.4.18
    GLIBCXX_3.4.19
    GLIBCXX_3.4.20
    GLIBCXX_3.4.21
    GLIBCXX_3.4.22
    GLIBCXX_3.4.23
    GLIBCXX_3.4.24
    GLIBCXX_3.4.25
    GLIBCXX_3.4.26
    GLIBCXX_3.4.27
    GLIBCXX_3.4.28
    GLIBCXX_DEBUG_MESSAGE_LENGTH 
    ```

2.  Check the GCC version on the airgapped server:

    ```bash
    gcc --version
    ```

    For Ubuntu 22.04, you should have at least GCC 11 to support `GLIBCXX_3.4.29`.

    ```bash
    gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0
    Copyright (C) 2021 Free Software Foundation, Inc.
    This is free software; see the source for copying conditions.  There is NO
    warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOS 
    ```

3. On a machine with internet access, download the necessary GCC or `libstdc++` package. 

    ```bash
    sudo apt update
    sudo apt-get download gcc-11        ## ignore if GCC-11 already installed.
    sudo apt-get download libstdc++6
    ```

4. Transfer the package to your airgapped server.
5. On the airgapped server, navigate to the directory where the .deb files are stored and install.

```bash
sudo dpkg -i libstdc++6*.deb 
```

## Connect using SQL Shell 

In your Windows machine, search for **SQL Shell (psql)**. Click to open. You should see a terminal similar to your command prompt. If the SQL Shell doesn't appear, simply click Start and find the PostgreSQL folder. Open this folder and click SQL Shell.

<div class='img-center'>

![](/img/docs/postgresql-install-on-windows-using-edb-open-sql-shellll.png)

</div>

If you used the default values during the installation steps, you can simply hit Enter four times and then provide the password for your PostgreSQL database.

<div class='img-center'>

![](/img/docs/postgresql-install-on-windows-using-edb-sql-shell-login.png)

</div>


## Connect using pgAdmin 

:::info 

If you're running PostgreSQL on a virtual machine in VirtualBox, you will need to [enable port forwarding](/docs/001-Personal-Notes/005-Project-Pre-requisites/011-VirtualBox.md#enable-port-forwarding) to access PostgreSQL from your local computer.

:::

We can also pgAdmin to connect to the PostgreSQL database. Search for pgAdmin and click to open. You should see this:

<div class='img-center'>

![](/img/docs/postgresql-install-on-windows-using-edb-pgadmin-open-welcome.png)

</div>

Provide the password:

<div class='img-center'>

![](/img/docs/postgresql-install-on-windows-using-edb-pgadmin-passworddd.png)

</div>

You should see the **Server connected** message at the bottom.

<div class='img-center'>

![](/img/docs/postgresql-install-on-windows-using-edb-pgadmin-server-connected.png)

</div>

To disconnect from the database, right-click on Postgresql, and click **Disconnect from server**. 

<div class='img-center'>

![](/img/docs/postgresql-install-on-windows-using-edb-pgadmin-disconnect.png)

</div>
