---
title: File Permissions
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 8
last_update:
  date: 2/27/2022
---


## Tasks

1. Ensure that others is denied default permissions to any file user ted creates
2. Create a shared group directory structure:
	- /data/teamted
	- /data/teamrobin
3. The shared group directory should meet the following conditions:
	- Members should have full read+write access to their directories, others has no permissions at all
	- Files created in these directories are writeable for all members of the group
	- Users can only delete files they have created themselves
	- Members of group teamted have read access to everything in /data/teamrobin
	- User ted is headmaster and should be able to delete everything in both directories under /data.


## Solution

### 1. Set default deny permissions

Ensure that others is denied default permissions to any file user ted creates. Edit /home/ted/.bashrc to include a umask setting:

```bash
echo "umask 027" >> /home/ted/.bashrc
source /home/ted/.bashrc
```

This sets the default permissions for new files created by ted to 750 (rwxr-x---).


### 2. Create a shared group directory

Create a shared group directory structure:

- /data/teamted
- /data/teamrobin

Run:

```bash
sudo mkdir -p /data/teamted
sudo mkdir -p /data/teamrobin
```

### 3. Configuring the shared group directory

The shared group directory should meet the following conditions:

- Members should have full read+write access to their directories, others has no permissions at all.

	```bash
	sudo chown :teamted /data/teamted
	sudo chown :teamrobin /data/teamrobin

	sudo chmod 770 /data/teamted
	sudo chmod 770 /data/teamrobin
	```

- Files created in these directories are writeable for all members of the group.

	```bash
	sudo chmod g+s /data/teamted
	sudo chmod g+s /data/teamrobin
	```

- Users can only delete files they have created themselves.

	```bash
	sudo chmod +t /data/teamted
	sudo chmod +t /data/teamrobin 
	```

- Members of group teamted have read access to everything in /data/teamrobin.

	```bash
	sudo setfacl -m g:teamted:rx /data/teamrobin
	```
- User ted is headmaster and should be able to delete everything in both directories under /data.

	```bash
	sudo setfacl -m u:ted:rwx /data/teamted
	sudo setfacl -m u:ted:rwx /data/teamrobin
	```



----

As always, be creative and happy learning! 😀

----

