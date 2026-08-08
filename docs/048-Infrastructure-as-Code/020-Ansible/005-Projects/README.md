---
title: "Projects and Labs"
description: "Projects and Labs"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 1
last_update:
  date: 1/24/2021
---

## Overview

This folder contains Ansible labs, project files, templates, inventories, roles, and supporting application examples.

The folders are grouped by purpose so each lab can be opened without searching through the full old notes tree.

## Project Index

| Project                     | Purpose                                                                  |
| --------------------------- | ------------------------------------------------------------------------ |
| Lab Setup Templates         | CloudFormation templates used to create Ansible lab hosts.                |
| Project 001 Ansible Basics  | Core inventories, sample playbooks, two-tier app labs, and user labs.     |
| Project 002 Ansible Roles   | Role-based web server examples and vault playbook samples.                |
| Project 003 Confluent Cloud | Playbooks for Confluent Cloud user and deployment tasks.                  |
| Project 004 Ecommerce LAMP  | SQL, startup files, and walkthrough notes for the LAMP e-commerce project. |
| Project 005 Maven Sample    | Maven sample application used by the Jenkins and deployment labs.         |
| Lab 001 to Lab 038          | Individual Ansible lab walkthroughs and exercises.                        |

## Lab Series

The lab walkthroughs are split into 38 individual folders so each exercise can be opened and reviewed on its own.

| Lab | Topic |
| --- | ----- |
| [Lab 001](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-001-Playbook-on-Ping/README.md) | Playbook on Ping |
| [Lab 002](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-002-Playbook-on-Uname/README.md) | Playbook on Uname |
| [Lab 003](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-003-Copying-gitconfig-onto-the-Nodes/README.md) | Copying gitconfig onto the Nodes |
| [Lab 004](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-004-Doing-a-dry-run-using-check/README.md) | Doing a dry-run using 'check' |
| [Lab 005](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-005-Playbook-on-sending-gitconfig/README.md) | Playbook on sending .gitconfig |
| [Lab 006](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-006-Two-tier-Design-Part-1-Package-Management/README.md) | Two-tier Design Part 1: Package Management |
| [Lab 007](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-007-Two-tier-Design-Part-2-Install-services/README.md) | Two-tier Design Part 2: Install services |
| [Lab 008](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-008-Two-tier-Design-Part-3-Upload-application-to-Web-Servers/README.md) | Two-tier Design Part 3: Upload application to Web Servers |
| [Lab 009](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-009-Two-tier-Design-Part-4-Configure-the-LoadBalancer/README.md) | Two-tier Design Part 4: Configure the LoadBalancer |
| [Lab 010](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-010-Two-tier-Design-Part-5-Health-Check-Status/README.md) | Two-tier Design Part 5: Health Check Status |
| [Lab 011](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-011-Two-tier-Design-Part-6-Using-Prompts/README.md) | Two-tier Design Part 6: Using Prompts |
| [Lab 012](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-012-Two-tier-Design-Part-6-Consolidate-into-One-Playbook/README.md) | Two-tier Design Part 6: Consolidate into One Playbook |
| [Lab 013](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-013-Two-tier-Design-Using-Include/README.md) | Two-tier Design: Using Include |
| [Lab 014](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-014-Two-tier-Design-Using-Variables/README.md) | Two-tier Design: Using Variables |
| [Lab 015](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-015-Two-tier-Design-Using-Local-Variables/README.md) | Two-tier Design: Using Local Variables |
| [Lab 016](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-016-Two-tier-Design-Using-Registered-Variables/README.md) | Two-tier Design: Using Registered Variables |
| [Lab 017](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-017-Two-tier-Design-Using-Ansible-Roles/README.md) | Two-tier Design: Using Ansible Roles |
| [Lab 018](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-018-Using-Ansible-Vault/README.md) | Using Ansible Vault |
| [Lab 019](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-019-Creating-Users/README.md) | Creating Users |
| [Lab 020](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-020-Using-host-vars-and-group-vars/README.md) | Using host_vars and group_vars |
| [Lab 021](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-021-Creating-Users-with-Passwords-stored-in-Ansible-Vault/README.md) | Creating Users with Passwords stored in Ansible Vault |
| [Lab 022](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-022-Creating-Users-with-Conditionals-and-Variables/README.md) | Creating Users with Conditionals and Variables |
| [Lab 023](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-023-Using-Jinja2-Templates-to-Deploy-motd/README.md) | Using Jinja2 Templates to Deploy motd |
| [Lab 024](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-024-Using-Jinja2-Templates-to-Deploy-etc-hosts-file/README.md) | Using Jinja2 Templates to Deploy /etc/hosts file |
| [Lab 025](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-025-Creating-Users-using-Ansible-Roles/README.md) | Creating Users using Ansible Roles |
| [Lab 026](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-026-Installing-gitconfig-Role-from-Ansible-Galaxy/README.md) | Installing gitconfig Role from Ansible Galaxy |
| [Lab 027](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-027-Installing-CentOS-Apache-Role-from-Ansible-Galaxy/README.md) | Installing CentOS-Apache Role from Ansible Galaxy |
| [Lab 028](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-028-Execute-Script-Install-httpd-and-Edit-a-File/README.md) | Execute Script, Install httpd, and Edit a File |
| [Lab 029](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-029-Conditionals/README.md) | Conditionals |
| [Lab 030](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-030-Loops/README.md) | Loops |
| [Lab 031](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-031-Playbooks/README.md) | Playbooks |
| [Lab 032](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-032-Deploying-LAMP-Server-TBC/README.md) | Deploying LAMP Server (TBC) |
| [Lab 033](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-033-Deploying-a-Web-Application-TBC/README.md) | Deploying a Web Application (TBC) |
| [Lab 034](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-034-Deploying-Jenkins/README.md) | Deploying Jenkins |
| [Lab 035](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-035-Installing-Maven/README.md) | Installing Maven |
| [Lab 036](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-036-Install-and-Configure-Tomcat-as-the-Staging-Environment/README.md) | Install and Configure Tomcat as the Staging Environment |
| [Lab 037](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-037-Creating-a-Basic-Ansible-Playbook/README.md) | Creating a Basic Ansible Playbook |
| [Lab 038](/docs/048-Infrastructure-as-Code/020-Ansible/005-Projects/Lab-038-Deploying-a-LAMP-Stack-and-Python-Application/README.md) | Deploying a LAMP Stack and Python Application |

## Running Labs

Most Ansible examples assume you are inside the project folder that contains `ansible.cfg`.

```bash
ansible --list-hosts all
ansible-playbook playbooks/sample-ping.yml
```

:::warning

Review inventories and credentials before running any playbook. Several files were originally written for temporary lab hosts.

:::
