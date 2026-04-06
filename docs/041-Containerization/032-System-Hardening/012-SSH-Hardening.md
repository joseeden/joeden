---
title: "SSH Hardening "
description: "SSH Hardening "
tags: 
   - Cloud
   - DevOps
   - Containers
   - Containerization
   - Kubernetes
   - Cybersecurity
sidebar_position: 12
last_update:
  date: 3/11/2022
---


## SSH Access Control

Control who can connect and how they authenticate.

| Practice           | Key Points                                  | Example / Config                                  |
| ------------------ | ------------------------------------------- | ------------------------------------------------- |
| Limit SSH Access   | Only allow users who require admin access   | `/etc/ssh/sshd_config` → `AllowUsers user1 user2` |
| Disable root login | Use sudo with non-root accounts             | `/etc/ssh/sshd_config` → `PermitRootLogin no`     |
| IP whitelisting    | Restrict SSH access to specific IPs         | Firewall rules or Kubernetes Network Policies     |
| Use bastion hosts  | Route external access through a jump server | N/A                                               |

## Authentication and Keys

Ensure secure login methods and key management.

| Practice                  | Key Points                            | Example / Config                                     |
| ------------------------- | ------------------------------------- | ---------------------------------------------------- |
| Use SSH keys              | Prefer public-key auth over passwords | `ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa`         |
| Disable password auth     | Prevent password logins               | `/etc/ssh/sshd_config` → `PasswordAuthentication no` |
| Key management            | Secure private keys; use strong keys  | `ssh-keygen -t ed25519`                              |
| Rotate keys regularly     | Especially for admin accounts         | N/A                                                  |
| Two-factor authentication | Add extra verification layer          | Google Authenticator or Duo integration              |

## SSH Configuration Hardening

Improve security through SSH server settings by editing `/etc/ssh/sshd_config`.

| Practice              | Key Points                      | Example / Config                 |
| --------------------- | ------------------------------- | -------------------------------- |
| Change default port   | Avoid port 22 to reduce attacks | `Port 2222`                      |
| Use strong encryption | Disable weak algorithms         | `Ciphers aes256-gcm@openssh.com` |
| SSH banner            | Display login policy messages   | `Banner /etc/issue`              |
| Logging and auditing  | Monitor access and review logs  | `LogLevel VERBOSE`               |

Additional: Implementing idle timeout.

```bash
## /etc/ssh/sshd_config 
ClientAliveInterval 300
ClientAliveCountMax 0
```   

## Container and Host Security

Protect underlying systems and container environments.

| Practice                | Key Points                                                     | Example / Config |
| ----------------------- | -------------------------------------------------------------- | ---------------- |
| Avoid SSH in containers | Use native tools instead                                       | `kubectl exec`   |
| Host hardening          | Keep nodes updated, minimal installs, disable unused services  | N/A              |
| Regular security audits | Test access controls and configs                               | N/A              |
| Use security tools      | Implement tools like Fail2Ban or OSSEC for intrusion detection | N/A              |

 
