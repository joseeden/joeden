---
title: "Project 005 Maven Sample"
description: "Project 005 Maven Sample"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 60
last_update:
  date: 1/22/2021
---

## Overview

This is the Maven sample application used by related build, Jenkins, and deployment labs.

The nested `.git` repository from the original project was intentionally not copied.

## Structure

| Path       | Purpose                          |
| ---------- | -------------------------------- |
| `pom.xml`  | Parent Maven project file.       |
| `server`   | Java server module.              |
| `webapp`   | Web application module.          |

## Build

```bash
mvn clean package
```

Generated Maven outputs are ignored by the local `.gitignore`.
