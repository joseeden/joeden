---
title: Format of `/etc/passwd`
tags: 
- Linux
- Red Hat
- Certifications
sidebar_position: 6
last_update:
  date: 3/21/2021
---


The `/etc/passwd` file stores user account information. Each line in this file represents a single user and contains seven fields separated by colons (`:`). This is a sample `/etc/passwd` file:

```plaintext
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
john:x:1001:1001:John Doe:/home/john:/bin/bash
jane:x:1002:1002:Jane Smith:/home/jane:/bin/zsh
```

The format: 

```plaintext
username:password:UID:GID:full_name:home_directory:shell
```

### Field Descriptions 

1. **username**: 
   - This is the name the user types when logging in.
   - It must be unique and typically contains 1-32 characters.

2. **password**: 
   - Historically, this field contained the hashed password, but for security reasons, modern systems store the hashed passwords in the `/etc/shadow` file, and an "x" is placed in this field to indicate that.

3. **UID (User ID)**: 
   - This is a unique identifier for the user.
   - The root user typically has a UID of 0.
   - Regular users usually start with a UID of 1000 or 500, depending on the system.

4. **GID (Group ID)**: 
   - This is the primary group ID associated with the user.
   - The group details can be found in the `/etc/group` file.

5. **full_name**: 
   - This field can contain the user's full name or other descriptive information.
   - It can include multiple comma-separated values for additional info, but typically it's just the full name.

6. **home_directory**: 
   - This is the path to the user's home directory.
   - It's where the user is placed upon logging in and where user-specific files and directories are stored.

7. **shell**: 
   - This is the path to the user's default shell.
   - Common shells include `/bin/bash`, `/bin/sh`, `/bin/zsh`, etc.
   - If set to "/sbin/nologin", user will not be able to loginn through SSH. If user tries to login, connection is closed.
   - If user is currently logged-in when shell is changed to nologin his connection will continue but if he logs out, he wont be log back again.



