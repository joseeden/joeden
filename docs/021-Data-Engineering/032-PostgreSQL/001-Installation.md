---
title: "Installation"
description: "PostgreSQL"
tags: [Data Engineering, Databases, SQL, PostgreSQL]
sidebar_position: 1
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

## Connect to PostgreSQL using SQL Shell 

In your Windows machine, search for **SQL Shell (psql)**. Click to open. You should see a terminal similar to your command prompt. If the SQL Shell doesn't appear, simply click Start and find the PostgreSQL folder. Open this folder and click SQL Shell.

<div class='img-center'>

![](/img/docs/postgresql-install-on-windows-using-edb-open-sql-shellll.png)

</div>

If you used the default values during the installation steps, you can simply hit Enter four times and then provide the password for your PostgreSQL database.

<div class='img-center'>

![](/img/docs/postgresql-install-on-windows-using-edb-sql-shell-login.png)

</div>


## Connect to PostgreSQL using pgAdmin 

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
