---
title: "Computer Hardware"
description: "A deeper view on the different components of a computer"
sidebar_position: 8
tags: [IT Fundamentals, Computers, Operating Systems]
last_update:
  date: 2/26/2017
---



## Overview

Computers are everywhere. From the moment you wake up to the time you go to bed, you interact with computers in various forms. At home, at work, in the airport, or even at the grocery store, computers are there, helping to process transactions, manage data, and provide information. The device you're using to read this is a computer, and there's likely another one in your pocket right now. 

Despite their complexity, computers fundamentally calculate, process, and store data. Let's explore the components of a typical desktop setup to better understand how they work.

## Desktops and Laptops

Desktops are powerful computers designed to fit on or under a desk. A typical desktop setup includes a monitor, a keyboard, a mouse, and the desktop tower itself.

<div class="img-center">

![](/img/docs/comphwdesktops2.png)

</div>

In addition to these core components, you might also find peripherals like a webcam, speakers, or a printer. These physical components are collectively known as **hardware**.

At the back of the desktop tower, you'll find various connectors and ports. The power outlet connects the computer to an electrical power source. Common ports include USB ports for connecting devices like keyboards, mice, and external drives, HDMI or VGA ports for the monitor, and audio jacks for speakers or headphones. These ports extend the functionality of your computer by allowing you to connect various devices.

<div class="img-center">

![](/img/docs/backpanel.jpg)

</div>

Laptops are portable computers that integrate the components of a desktop into a single, compact case. They include a built-in monitor, keyboard, and touchpad (which serves as a mouse). Despite their smaller size, laptops contain many of the same internal components as desktops, including a CPU, RAM, and storage. The primary difference is that laptops are designed for mobility, with components optimized for low power consumption and compactness.

<div class="img-center">

![](/img/docs/basics-laptop-sample-photo-parts.png)

</div>

### CPU

The **Central Processing Unit** (CPU) is often referred to as the brain of the computer. It performs all the calculations and data processing needed to run applications and execute commands. The CPU handles instruction sets, which are collections of commands that it can execute to perform operations on data.

<div class="img-center">

![](/img/docs/Intel-CPU1.jpg)

</div>

### Instruction Sets

An **instruction set** is a list of instructions that the CPU can execute. These instructions include basic operations like adding, subtracting, and copying data. Every program on your computer, regardless of its complexity, is ultimately broken down into these simple instructions. Instruction sets are hard-coded into the CPU, meaning they are built into the hardware itself. Different CPU manufacturers may use different instruction sets, but they generally provide similar functionalities.

<div class="img-center">

![](/img/docs/8085-instruction-set.png)

</div>

### Motherboard

When you select your CPU, you need to make sure it's compatible with your **motherboard** - the circuit board that connects all your components together. 

The **motherboard** is the main circuit board that connects all the components of the computer. It houses the CPU, RAM, and storage devices, and provides connectors for other peripherals. The motherboard includes a chipset that manages data flow between the CPU, memory, and peripheral devices, ensuring efficient communication and operation.

<div class="img-center">

![](/img/docs/the-motherboard-diagram.jpg)

</div>

It's important to note that you can't simply purchase a collection of parts and expect them to work together seamlessly. CPUs are designed to fit into motherboards using specific socket types, and these sockets can vary. Some CPUs have numerous small pins that protrude, while others have contact points that resemble dots.

For more information, please see [Motherboards](./009-Motherboard.md)

### RAM

The **Random Access Memory** (RAM) is a type of volatile memory that the CPU uses to store data temporarily while processing instructions. Unlike storage devices like hard drives or SSDs, RAM provides fast access to data, enabling quick read and write operations. This speed is crucial for the smooth operation of applications and the overall system.

<div class="img-center">

![](/img/docs/comphwram.png)

</div>

We use RAM to store data that we want to access quickly. This data changes all the time so it isn't permanent. Almost all RAM is volatile, which means that once we power off our machines, the data stored in RAM is cleared.

For more information, please see [RAM](./010-RAM.md)


### Storage

In addition to RAM, computers use storage devices like **Hard Disk Drives** (HDDs) or **Solid State Drives** (SSDs) to store data persistently. HDDs use spinning disks to read and write data, while SSDs use flash memory for faster performance and greater durability. The storage device holds the operating system, applications, and user data, retaining information even when the computer is turned off.

<div class="img-center">

![](/img/docs/ssd-vs-hdd-hero-1688630547197.jpeg)

</div>

For more information, please see [Storage.](./011-Storage.md)


### Peripherals

Peripherals are external devices that connect to the computer to extend its functionality. Common peripherals include:

- **Input Devices**: Keyboards, mice, and webcams.
- **Output Devices**: Monitors, printers, and speakers.
- **Storage Devices**: External hard drives and USB flash drives.

These peripherals communicate with the computer through various ports and interfaces, allowing users to interact with the system and access additional features.

For more information, please see [Peripherals](./012-Peripherals.md)

### Cooling Systems

As computers process data, they generate heat. Effective cooling systems, such as fans and heatsinks, are crucial for maintaining optimal operating temperatures and preventing overheating. Advanced cooling solutions like liquid cooling systems are used in high-performance and gaming computers to manage the heat generated by powerful components.


<div class="img-center">

![](/img/docs/comphwcpuheatsinkandfan.png)

</div>

### Power Supply

The **Power Supply Unit** (PSU) converts electrical power from an outlet into a usable form for the computer's components. It provides the necessary voltages and currents to power the CPU, motherboard, storage devices, and peripherals. A reliable PSU is essential for the stable operation of the computer.

There are two types of electricity:

- **DC (Direct Current):** Flows in one direction.
- **AC (Alternating Current):** Changes direction constantly.

Our computers use DC voltage, so the PSU converts the AC voltage from our power company into usable DC voltage.

For more information, please [Power supplies](./013-Power-Supply.md)


