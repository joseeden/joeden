---
title: "Project 004 Ecommerce LAMP"
description: "Project 004 Ecommerce LAMP"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 50
last_update:
  date: 1/17/2021
---

## Overview

This project contains supporting files for the LAMP e-commerce final project.

The project walks through a manual single-node deployment before converting the flow into automation.

## Files

| File                 | Purpose                                   |
| -------------------- | ----------------------------------------- |
| `db-load-script.sql` | Creates the sample product table and data. |
| `ec2-startup.sh`     | EC2 startup helper script.                 |

## Deployment Flow

The final project builds a LAMP-style stack:

- Install and start `firewalld`.
- Install and start MariaDB.
- Open port `3306`.
- Create the `ecomdb` database and user.
- Load product data from `db-load-script.sql`.
- Install Apache, PHP, and PHP MySQL packages.
- Open port `80`.
- Clone or deploy the application code under `/var/www/html`.
- Update the application database connection.
