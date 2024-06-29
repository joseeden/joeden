---
title: Package Management
tags: [Linux, Red Hat, Certifications]
# sidebar_position: 1 
last_update:
  date: 2/27/2022
---

## Tasks

1. Ensure your system is using **yum** repo for base packages and application streams.
2. Find the package the contains the **sepolicy** program file and install it.
3. Install previous version of **PHP**
4. Download **http** package from repo without installing it. Query to see if there are any scripts in it.


## Solution

### 1. Using yum repositories

Check current repositories:

```sh
sudo yum repolist
```

Ensure base repositories are enabled:

```sh
sudo yum-config-manager --enable base
sudo yum-config-manager --enable appstream
```

If they are not listed, you might need to create or modify the repository configuration files. For RHEL-based distributions, the repository configuration files are typically located in `/etc/yum.repos.d/`.

### 2. Install sepolicy


Find the package:

```sh
sudo yum provides */sepolicy
```

Once you identify the package (likely `policycoreutils-python-utils`), install it:

```sh
sudo yum install policycoreutils-python-utils
```


### 3. Install specific PHP version

List available PHP versions:

```sh
sudo yum list php --showduplicates | sort -r
```

Identify the previous version from the list and install it (replace `previous_version` with the actual version number, e.g., `7.4`):

```sh
sudo yum install php-previous_version
```


### 4. Download http package

Download the package without installing it:

```sh
sudo yumdownloader httpd
```

Query the downloaded package to check for scripts:

```sh
rpm -qpl httpd*.rpm
rpm -qp --scripts httpd*.rpm
```
