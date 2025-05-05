---
title: "Eclipse"
description: "Eclipse"
tags: 
- Computer Science
- Application Development
- Software Development
- DevOps
- Cloud
- Java
sidebar_position: 20
last_update:
  date: 9/26/2023
---



## Overview

Eclipse is a tool for writing and managing code. It’s built using Java, so it needs Java to run.

- Requires Java to work
- Same version across Windows, macOS, and Linux
- Uses your machine’s Java version by default

When you open Eclipse, it uses whatever Java version is already installed. You can change this later, but the default matters during the first setup.


## Workspaces 

A workspace is where Eclipse stores all your projects. It’s just a folder on your computer.

- One workspace per Eclipse session
- Workspace holds many projects
- Projects share settings inside a workspace

Each workspace has hidden files and folders for storing configuration and logs. Inside each project, there’s:

- `.settings` folder 
- `.classpath`
- `.project`

These files manage how Eclipse handles each project. You don’t need to edit these manually.


## Setting Up Eclipse

Before using Eclipse, you need to download and install it properly.

1. Go to the official Eclipse site: [https://eclipse.org](https://eclipse.org)
2. Choose “Eclipse IDE for Java Developers” (64-bit)
3. Use either the installer or direct package download

:::info 

In my case, I downloaded the "Eclipse IDE for Enterprise Java and Web Developers".

:::


For this setup, use the Java Developers edition. It comes with tools for Java, web, and XML development. Version names like “Oxygen” or “Photon” change every year with a new release. Eclipse is updated every June.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-05-05-204050.png)

</div>

Extract the zip file and run the `eclipse.exe` to install the application. Enter a  directory for the workspace and click Launch. 

<div class="img-center"> 

![](/img/docs/Screenshot-2025-05-05-205047.png)

</div>

If you encounter the **Microsoft Defender Exclusion Check**, select **Keep Eclipse IDE being scanned by Microsoft Defender** and click **Proceed**.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-05-05-205148.png)

</div>