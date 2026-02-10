---
title: "Setting up the Lab"
description: "Setting up the Lab"
tags: 
- Networking
- DevNet
- CCNA
- Cloud
- DevOps
sidebar_position: 5
last_update:
  date: 5/25/2020
---


## Overview

This guide shows how to set up the DEVASC virtual machine (VM) in Oracle VirtualBox and prepare it for the labs. 

- Install the VM
- Create necessary accounts
- Set up Webex Teams for communication.

## Requirements 

Before starting, ensure you have the following:

- Host computer with at least 4 GB RAM and 15 GB free disk space
- high-speed internet to download VirtualBox and the DEVASC VM

## Download VirtualBox

Start by installing the virtualization software and importing the DEVASC VM. 

1. Download VirtualBox from [https://www.virtualbox.org](https://www.virtualbox.org)
2. Choose the correct installation file for your operating system
3. Run the installer and accept default settings
4. Open VirtualBox after installation


## Import the DEVASC VM

Next, import the DEVASC VM into VirtualBox.

1. Download the pre-build OVA file: Google Drive
2. In VirtualBox, go to File > Import Appliance

    <div class='img-center'>

    ![](/img/docs/vbox-import-appliance.png)

    </div>

3. Select Local File System and browse to the downloaded VM.

    <div class='img-center'>

    ![](/img/docs/vbox-import-virtual-click-browser-to-select.png)

    </div>


4. Review the details, then click **Finish**

    <div class='img-center'>

    ![](/img/docs/vbox-devnet-import-review.then-click-finish.png)

    </div>


5. Wait a few minutes for the VM to finish importing

6. Select the VM and click **Start** to launch the VM.

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-09-213722.png)

    </div>


7. Continue starting the virtual machine and accept the Cisco Packet Tracer license to proceed.

    - Use arrow keys to scroll the license text
    - Press Right Arrow to select `<OK>` after reading
    - Press Space Bar to move to the Agreement screen
    - Press Left Arrow to select `<I Agree>`

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-10-122749.png)

    </div>

8. The Ubuntu image will continue to load. Close any popup messages. 

    After the desktop loads, the VM is ready is to use for the labs.

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-10-122824.png)

    </div>


