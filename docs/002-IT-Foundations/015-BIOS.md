---
title: "BIOS"
description: "How do devices talk to each other?"
sidebar_position: 15
tags: [IT Fundamentals, Computers, Operating Systems]
last_update:
  date: 3/28/2023
---

## Overview

Now that we've explored all the key components necessary to get our computer running, let's delve into how our devices communicate with each other. We understand how programs execute, from our hard drive to our CPU, but what about basic actions like a mouse click or a keyboard press? These seemingly simple inputs need to be processed by the CPU to perform meaningful actions, but how does the CPU know what to do with them?

## Services and Drivers

Basic devices like keyboards, mice, or webcams don't contain instructions that the CPU can directly interpret. Instead, they rely on intermediary programs called **services** or **drivers**. These drivers provide the necessary instructions that enable the CPU to understand and interact with external devices effectively. Whether it's translating keystrokes into actions or managing data from a webcam, these drivers ensure seamless communication between devices and the CPU.

## BIOS and UEFI

Before the CPU can interact with any devices, it needs to initialize the hardware and start the operating system. This crucial task is managed by the **BIOS** (Basic Input/Output System) or more modernly, **UEFI** (Unified Extensible Firmware Interface). The BIOS/UEFI software is stored on a special type of memory chip known as **ROM** (Read-Only Memory) directly on the motherboard. 

![](/img/docs/mobilebios.png)

Unlike RAM, ROM is non-volatile, meaning it retains its data even when the computer is powered off. The BIOS/UEFI performs essential tasks like hardware initialization and booting up the operating system.

## POST (Power-On Self Test)

When you power on your computer, it undergoes a series of checks known as the **Power-On Self Test** (POST). This diagnostic process ensures that all hardware components are functioning correctly before the operating system starts loading. If any issues are detected during POST, the BIOS/UEFI may emit a series of audible beep codes to indicate the problem. Different beep patterns correspond to specific hardware errors, helping technicians diagnose and resolve issues during the boot process.

**Example Beep Codes:**

  - One beep: Successful POST
  - Two beeps: POST error (specific error code varies by manufacturer)

Understanding these beep codes can be invaluable for troubleshooting hardware problems, though not all computers have built-in speakers to emit these signals.

## CMOS Settings

Embedded within the motherboard is a specialized chip called the **CMOS** (Complementary Metal-Oxide Semiconductor), which stores essential system configuration data. This includes settings such as the system date, time, and startup preferences. Users can access and modify these settings through the BIOS/UEFI setup menu, typically by pressing a designated key during the initial boot process. 

Adjusting these settings can influence how the computer boots and which devices are prioritized during startup.

## Reimaging Computers

In IT environments, a common task involves **reimaging** computers. This process refers to wiping and reinstalling an operating system using a disk image—a snapshot of a fully configured system. Reimaging is often necessary to restore a computer to a known, stable state or to deploy a standardized software configuration across multiple machines. 

<div class="img-center"> 

![](/img/docs/mobiledevicereimage.png)

</div>

To initiate a reimaging process, technicians typically boot the computer from an external device such as a USB drive or CD-ROM containing the disk image. This boot sequence is configured through the BIOS/UEFI settings to prioritize external boot devices over internal storage.


For more details, check [How To Reimage A Computer On Windows?](https://www.technewstoday.com/reimaging-computer/)
