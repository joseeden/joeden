---
title: Users and Groups
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 31
last_update:
  date: 3/27/2021
---

## Tasks

1. Set passwords for users to expire after 90 days. New passwords must also minimum of 6 characters.
2. Ensure empty file *tulip* is created on the home directries when new users are created.
3. Create users **peter** and **walter**.  Make them a member of group **fringe** as secondary group membership.
4. Create users **anna** and **anna**. Make them a member of group **mdynamic** as secondary group membership.


## Solution


### 1. Set Password Policies

Edit `/etc/login.defs` file:
```bash
sudo vi /etc/login.defs
```

Ensure the following settings are configured or adjusted:
```plaintext
PASS_MAX_DAYS   90
PASS_MIN_DAYS   0
PASS_MIN_LEN    6
```

Note:

- `PASS_MAX_DAYS`: Specifies the maximum number of days a password is valid.
- `PASS_MIN_DAYS`: Minimum number of days allowed between password changes.
- `PASS_MIN_LEN`: Minimum length of the password.


To ensure these policies are enforced for existing users, you can force a password change:
```bash
sudo chage -M 90 <username>
```


### 2. File Creation on User Creation


Edit `/etc/skel/.bashrc` (or create it if it doesn't exist):
```bash
sudo vi /etc/skel/.bashrc
```

Add the following line to ensure `tulip` is created:
```bash
touch ~/tulip
```

### 3. Create Users peter and walter

Create Users and Assign Secondary Group Membership:

```bash
sudo useradd -m peter -G fringe
sudo useradd -m walter -G fringe
```


Set passwords for each user:
```bash
sudo passwd peter
sudo passwd walter
```

### 4. Create Users anna and anna

Create Users and Assign Secondary Group Membership:

```bash
sudo useradd -m anna -G mdynamic
sudo useradd -m elsa -G mdynamic
```

Set passwords for each user:
```bash
sudo passwd anna
sudo passwd elsa
```
