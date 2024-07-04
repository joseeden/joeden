---
title: "Apache Configuration"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 50
last_update:
  date: 7/8/2022
---


## Apache Configuration

Apache is a widely used web server software that allows you to serve web content over HTTP and HTTPS protocols. It is highly configurable, secure, and supports a wide range of features, making it a popular choice for web hosting.

- Apache (httpd) is the leading web server on Linux. 
- Nginx is another leading web server. 
- The main httpd config file is `/etc/httpd/conf/httpd.conf `
- Additional snap-in files can be stored in `/etc/httpd/conf.d`
- The default DocumentRoot is `/var/www/htdocs`
- Apache looks for a file with the name `index.html` in this directory.


## Installing Apache

To install Apache, use the package manager to download and install the `httpd` package. This command installs Apache and its dependencies:

```bash
yum install -y httpd
```

## Starting the service

After installing Apache, you need to enable and start the service. Enabling the service ensures it starts automatically at boot, and starting it launches the service immediately. You can also check the status to confirm that Apache is running correctly.

To enable Apache to start at boot and start the service immediately:

```bash
$ systemctl enable --now httpd
Created symlink /etc/systemd/system/multi-user.target.wants/httpd.service → /usr/lib/systemd/system/httpd.service.
```

To start the Apache service:

```bash
systemctl start httpd
```

To check the status:

```bash
$ systemctl status httpd
● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)
   Active: active (running) since Mon 2022-01-03 15:39:07 UTC; 19s ago
```

## Testing Apache

To verify that Apache is installed and running correctly, use the `curl` command to make an HTTP request to `localhost`. If Apache is running, it should respond with the default web page.

```bash
curl http://localhost
```

If Apache is correctly installed and running, this command will return the content of the default web page.

## HTTPD Config File

The main configuration file for Apache is located at `/etc/httpd/conf/httpd.conf`. This file contains numerous directives that control the behavior of the web server. You can view and edit it using:

```bash
$ ll /etc/httpd/conf/httpd.conf
-rw-r--r--. 1 root root 11899 Oct 26 18:15 /etc/httpd/conf/httpd.conf
```

```bash
vim /etc/httpd/conf/httpd.conf
```


### Important Parameters in HTTPD Config File

- **Listen Directive**: Specifies the port where Apache will listen for incoming requests. By default, it listens on port 80 for HTTP requests. This example shows Apache listening on port 80.

    ```bash
    Listen 80
    ```

- **DocumentRoot Directive**: Defines the directory out of which you will serve your documents. The default directory is `/var/www/html`.

    ```bash
    DocumentRoot "/var/www/html"

    <Directory "/var/www">
        AllowOverride None
        # Allow open access:
        Require all granted
    </Directory>
    ```


## Creating a Website

To create a simple website, you need to place your HTML files in the document root directory. Here’s how to create a basic `index.html` file:

```bash
vim /var/www/html/index.html
```
```html
hello world!
```

After creating the `index.html` file, restart Apache to apply any changes and test the website using `curl`:

```bash
systemctl restart httpd
```

```bash
$ curl localhost
hello world!
```
