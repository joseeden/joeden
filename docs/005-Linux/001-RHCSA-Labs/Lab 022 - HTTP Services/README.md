---
title: HTTP Services
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 22
last_update:
  date: 3/27/2021
---

## Tasks

1. Configure Apache to serve a basic website that shows "Hello RHCSA!".
2. Use this basic HTML file:

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello RHCSA!</title>
    </head>
    <body>
        <h1>Hello RHCSA!</h1>
        <p>Welcome to my Apache server.</p>
    </body>
    </html>
    ```


## Solution


### 1. Install Apache Web Server

On Red Hat-based systems like CentOS or RHEL, you can install Apache using `yum`:

```bash
sudo yum install httpd
```

### 2. Start and Enable Apache

Start the Apache service and enable it to start automatically on boot:

```bash
sudo systemctl start httpd
sudo systemctl enable httpd
```


### 3. Create a Basic HTML File

Create a simple HTML file that contains the desired content. For this task, create a file named `index.html` with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello RHCSA!</title>
</head>
<body>
    <h1>Hello RHCSA!</h1>
    <p>Welcome to my Apache server.</p>
</body>
</html>
```


### 4. Move to Apache's Document Root

The default document root for Apache on CentOS/RHEL is `/var/www/html/`. Copy or move the `index.html` file to this directory:

```bash
sudo mv index.html /var/www/html/
```

### 5. Set Permissions (optional)

Ensure that Apache has permissions to read the files in `/var/www/html/`. Usually, Apache runs as the `apache` or `httpd` user and group. Set the correct permissions if needed:

```bash
sudo chown -R apache:apache /var/www/html/
sudo chmod -R 755 /var/www/html/
```

### 6. Configure Firewall (optional)

If the firewall is enabled, allow HTTP traffic (port 80):

```bash
sudo firewall-cmd --zone=public --add-service=http --permanent
sudo firewall-cmd --reload
```

### 7. Access the Website

Open a web browser and enter your server's IP address or hostname in the address bar:

```
http://your_server_ip_address/
```

You should see the webpage displaying "Hello RHCSA!".