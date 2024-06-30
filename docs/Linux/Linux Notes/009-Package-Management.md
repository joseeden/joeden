---
title: Package Management
tags: [Linux, Red Hat, Certifications]
sidebar_position: 9
last_update:
  date: 12/30/2021
---

## Package Managers 

In Linux, package managers are essential tools for installing, updating, and managing software. Each Linux distribution has its own package management system, tailored to handle its specific needs and software ecosystem.

Ubuntu and Debian:

- apt-get 
- dpkg 
- aptitude
- dselect

RHEL and CentOS:

- yum 
- rpm 

## Using apt-get

`apt-get` is a command-line tool for handling packages, providing a straightforward way to install, update, and remove software.

To install a package:

```bash
sudo apt-get install -y <package>
```

To view repositories:

```bash
cat /etc/apt/sources.list 
```

To update repositories:

```bash
sudo apt-get update
```

To search for a package in the cache:

```bash
apt-cache search <package>
```

To clean up packages:
```bash
sudo apt-get clean
```

To clean up packages that are no longer available:
```bash
sudo apt-get autoclean
```

To simulate installation:
```bash
sudo apt-get install -s -y <package>
```

To download source file of a package:
```bash
apt-get source <package>
```

To upgrade installed packages:
```bash
sudo apt-get upgrade
```

To update the kernel for the specific distro:
```bash
sudo apt-get dist-upgrade
```

To display statistics about available packages:
```bash
apt-cache stats
```

To query a package's dependencies:
```bash
apt-cache depends <package>
```

To list package names available in the repository:
```bash
apt-cache pkgnames
```

To count available packages:
```bash
apt-cache pkgnames | wc -l
```

To list packages with unmet dependencies:
```bash
apt-cache unmet
```

## Using dpkg

`dpkg` or the Debian package manager is used to install, remove, and provide information about .deb packages.

1.  Download .deb file from link by: 

    ```bash
    wget <link>
    ```

2.  Get package from .deb file by: 

    ```bash
    dpkg -i app.deb 
    ```
        
    NOTE: this may fail if app have some dependencies.
    If it fails, dependencies are registered as NEEDED TO BE FIXED

3.  Do an update:   

    ```bash
    apt-get update -year
    ```

4.  Upgrade and install registered dependencies:

    ```bash
    apt-get -f upgrade
    ```
        
        
To display all installed packages:
```bash
dpkg --get-selections
```

To display all files installed for a package:
```bash
dpkg -L <package>
```

To remove a package (excluding configuration files):
```bash
dpkg --remove <package>
```

To remove a package including configuration files:
```bash
dpkg --purge <package>
```

## Using aptitude

`aptitude` is a high-level interface to the package manager, offering a text-based user interface as well as command-line capabilities.

To check if aptitude is installed:
```bash
which aptitude
```

To search for aptitude in repositories:
```bash
apt-get update
apt-cache search aptitude
```

To install a package with aptitude:
```bash
aptitude install <package>
```

To open aptitude GUI:
```bash
aptitude

# to open GUI                         aptitude 
#   to navigate                         ?
#   to go back/existing                 q
```

## Using dselect

`dselect` is an older interface for managing packages, now largely obsolete but still available. To use `dselect`, follow these steps:

1. **Install dselect** (if not already installed):
   ```bash
   sudo apt-get install dselect
   ```

2. **Run dselect**:
   ```bash
   sudo dselect
   ```

3. **Navigate through the interface** to update the package list, select packages for installation or removal, and apply changes.

While `dselect` provides a comprehensive interface for package management, it is largely considered obsolete and has been replaced by more modern tools like `aptitude` and `apt`.

## Using yum

### yum

`yum` is the default package manager for RHEL and CentOS, used to install, update, and remove packages as well as manage repositories.

To see all installed packages:
```bash
yum list installed
```

To install a package:
```bash
sudo yum install -y <package>
```

To search if a package is available in repositories:
```bash
yum search <package>
```

To check repositories:
```bash
ls /etc
```

To update packages:
```bash
sudo yum update -y
```

To upgrade packages:
```bash
sudo yum upgrade -y 
```

To list all repositories:
```bash
ll /etc/yum.repos.d
```

To check if updates are available:
```bash
yum check-update
```

To check updates for a specific package:
```bash
yum check-update http
```

To remove a package:
```bash
yum remove -y <package>
```

To list repositories:
```bash
yum repolist
yum repolist all
```

To display info about a package:
```bash
yum list <package>
```

To display more info about a package:
```bash
yum info <package>
```

To get a list of dependencies of a package:
```bash
yum deplist <package>
```

To clean packages:
```bash
yum clean packages
```

To clean all:
```bash
yum clean all
```

### yumdownloader

`yumdownloader` is a command-line utility for downloading RPM packages from the YUM repositories without installing them. It is particularly useful when you need to obtain specific files from a package or wish to store the RPM for later use.

To download a package:
```bash
yumdownloader <package>
```

To resolve dependencies and download:
```bash
yumdownloader --resolve <package>
```

To extract and send to standard output:
```bash
rpm2cpio <full-package-name>
```

To view contents:
```bash
rpm2cpio <package.rpm> | cpio -t
```

To extract and redirect output to a file:
```bash
rpm2cpio <package.rpm> > <filename>
```

### Modules and Application Streams

![](/img/docs/sv-yum-modules.png)
![](/img/docs/sv-yum-modules-2.png)

### yum groups

To list grouped packages:
```bash
yum grouplist | more
```

## Using rpm

The rpm (Red Hat Package Manager) command is used for managing packages on Red Hat-based systems such as RHEL and CentOS. It allows you to install, update, query, verify, and remove packages. Unlike other package managers, rpm does not handle dependencies, so you might need to resolve them manually.

![](/img/docs/sv-rpm-1.png)


To download and install a package using rpm:
```bash
wget https://downloads.redhat.com/redhat/rhel/rhel-8-beta/baseos/x86_64/Packages/nano-2.9.8-1.el8.x86_64.rpm
rpm -i nano-2.9.8-1.el8.x86_64.rpm
rpm -ivh nano-2.9.8-1.el8.x86_64.rpm  # Optional with progress and verbose
```

## Setting Up Repository Access

### Listing and Adding Repos

To see all repositories:
```bash
sudo dnf repolist
```

To see the directory listing:
```bash
ll /etc/yum.repos.d/
```

To create a new repository entry:
```bash
sudoedit /etc/yum.repos.d/newapp.repo

[appname]
name=Name of the application 
mirrorlist=https://place-url-here
baseurl=https://place-mirrorlist-here
enabled=0
```

### Modules and Application Streams

RHEL8 introduces application streams and modules to enhance package management. 

- Application streams separate user space packages from core kernel operations
- Base packages are provided through the BaseOS repository
- Appstream is provided as a separate repository

**Modules**
- Application streams are delivered in 2 formats
  - traditional RPMs
  - new modules
- Modules can contain streams to make multiple versions of applications availble
- Enabling a module stream gives access to RPM packages in that stream
- Modules can also have profiles - a list of packages that belong to a specific use-case
- The package list of a module can contain packages outside the module stream
- You can use the **yum** module to manage modules


### rpm Commands

rpm queries by default are against the database of installed packages, add '-p' to query package files

![](/img/docs/sv-rpm-queries.png)
![](/img/docs/sv-rpm-queries-2.png)

Query the RPM database to check if the specified package is installed. It returns the package name and version if found.
```bash
rpm -q <package>
```

Display detailed information about the specified installed package, including the name, version, release, size, and a description.
```bash
rpm -qi <package>
```

List all files installed by the specified package.

```bash
rpm -q --list <package>
rpm -ql <package>
```

List all installed packages in the order they were installed, with the most recently installed packages listed first.

```bash
rpm -qa --last
```

Display the dependencies required by the specified RPM package file (not the installed package).

```bash
rpm -qpR <pkg-name>
```

Rebuild the RPM database. This can be useful if the database is corrupted.

```bash
rpm --rebuilddb
```

List all documentation files for the specified installed package.

```bash
rpm -qdf <path-to-package>
```

Verify all installed packages against their RPM database entries. It checks file sizes, permissions, types, owners, groups, and MD5 checksums.

```bash
rpm -Va
```

Installing a package using the RPM file.

```bash
# -ivh vsersus -Uvh
# i means install package
# U means update package
# If package doesnt exist, -Uvh installs package
# If package exists, -Uvh updates the current package
rpm -Uvh <package.rpm>
```

## Red Hat Subscription Manager

Red Hat Subscription Manager (RHSM) is a tool that helps manage system entitlements and subscriptions for Red Hat products. It provides an interface for registering systems, attaching subscriptions, and managing repositories, ensuring that your systems have access to the necessary software and updates.

### Key Features

1. **System Registration**:
   - Register your system with Red Hat to gain access to subscriptions and repositories.
   - Ensure compliance and receive the latest updates and patches.

2. **Subscription Management**:
   - Attach and manage subscriptions to ensure that the system is entitled to the correct Red Hat products.
   - View and manage the details of your subscriptions.

3. **Repository Management**:
   - Enable and disable repositories to control which packages are available for installation.
   - Customize the repositories based on your subscription entitlements.


### Common Commands

- Register a system with Red Hat:
  ```bash
  sudo subscription-manager register --username=<your-username> --password=<your-password>
  ```

- With an activation key:
  ```bash
  sudo subscription-manager register --activationkey=<activation-key> --org=<organization-id>
  ```

- List available subscriptions:
  ```bash
  sudo subscription-manager list --available
  ```

- Attach a subscription to the system:
  ```bash
  sudo subscription-manager attach --pool=<pool-id>
  ```

- Remove a subscription from the system:
  ```bash
  sudo subscription-manager remove --serial=<serial-number>
  ```

- List consumed subscriptions:
  ```bash
  sudo subscription-manager list --consumed
  ```

### Managing Repositories

- List all available repositories:
  ```bash
  sudo subscription-manager repos --list
  ```

- Enable a repository:
  ```bash
  sudo subscription-manager repos --enable=<repo-id>
  ```

- Disable a repository:
  ```bash
  sudo subscription-manager repos --disable=<repo-id>
  ```

### Examples

1. Registering a System:
   ```bash
   sudo subscription-manager register --username=johndoe --password=password123
   ```

2. Attaching a Subscription:
   ```bash
   sudo subscription-manager attach --pool=8a85f9833e8b4e37013e8b4e38e9001a
   ```

3. Enabling a Repository:
   ```bash
   sudo subscription-manager repos --enable=rhel-7-server-rpms
   ```

4. Listing Consumed Subscriptions:
   ```bash
   sudo subscription-manager list --consumed
   ```



## Setting up Webmin YUM repository

In this lab, we'll set up the Webmin YUM repository on your system. **Webmin** is a web-based interface for system administration for Unix. Using any modern web browser, you can set up user accounts, Apache, DNS, file sharing, and much more. By setting up the YUM repository, you can easily install and update Webmin through your package manager.

To setup the Webmin YUM repo, go to their [official webpage > Webmin Installation > 
Installing the RPM](https://www.webmin.com/rpm.html).

Download and install Webmin:
```bash
wget http://prdownloads.sourceforge.net/webadmin/webmin-1.984-1.noarch.rpm
yum -y install perl perl-Net-SSLeay openssl perl-IO-Tty perl-Encode-Detect
rpm -U webmin-1.984-1.noarch.rpm
```

![](/img/docs/webminpage.png)

Similarly, you can install and update Webmin via yum by creating a repo file.
```bash
$ sudoedit /etc/yum.repos.d/webmin.repo

[Webmin]
name=Webmin Distribution Neutral
#baseurl=https://download.webmin.com/download/yum
mirrorlist=https://download.webmin.com/download/yum/mirrorlist
enabled=1
gpgkey=https://download.webmin.com/jcameron-key.asc
gpgcheck=1
```

You'll also see the new repo file.
```bash
$ ll
total 32
-rw-r--r--. 1 root root 4782 Nov 16 13:18 redhat-rhui-beta.repo.disabled
-rw-r--r--. 1 root root  482 Feb 26 06:52 redhat-rhui-client-config.repo
-rw-r--r--. 1 root root 7145 Feb 26 06:52 redhat-rhui.repo
-rw-r--r--. 1 root root 5768 Feb 26 06:49 redhat-rhui.repo.rpmsave
-rw-r--r--. 1 root root  228 Feb 27 06:33 webmin.repo
```

To disable the Webmin repository:
```bash
sudoedit /etc/yum.repos.d/webmin.repo

[Webmin]
name=Webmin Distribution Neutral
mirrorlist=https://download.webmin.com/download/yum/mirrorlist
enabled=0
gpgkey=https://download.webmin.com/jcameron-key.asc
gpgcheck=1
```

If we check the repolist again, we'll see that the webmin repo is now removed.
```bash
$ sudo dnf repolist
Updating Subscription Management repositories.
Unable to read consumer identity

This system is not registered with an entitlement server. You can use subscription-manager to register.

repo id                                                    repo name
ansible-2-for-rhel-8-rhui-rpms                             Red Hat Ansible Engine 2 for RHEL 8 (RPMs) from RHUI
rhel-8-appstream-rhui-rpms                                 Red Hat Enterprise Linux 8 for x86_64 - AppStream from RHUI (RPMs)
rhel-8-baseos-rhui-rpms                                    Red Hat Enterprise Linux 8 for x86_64 - BaseOS from RHUI (RPMs)
rhui-client-config-server-8                                Red Hat Update Infrastructure 3 Client Configuration Server 8
```

To temporarily enable the repo for a one-time install/update, run the command below. Note that when you list the repos, it is back to beign disabled.
```bash
$ sudo dnf install webmin --enablerepo=Webmin
```