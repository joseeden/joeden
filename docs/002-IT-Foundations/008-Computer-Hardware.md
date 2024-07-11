---
title: "Computer Hardware"
description: "A deeper view on the different components of a computer"
sidebar_position: 8
tags: [IT Fundamentals, Computers, Operating Systems]
last_update:
  date: 3/28/2023
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

## CPU

The **Central Processing Unit** (CPU) is often referred to as the brain of the computer. It performs all the calculations and data processing needed to run applications and execute commands. The CPU handles instruction sets, which are collections of commands that it can execute to perform operations on data.

<div class="img-center">

![](/img/docs/Intel-CPU1.jpg)

</div>

## Instruction Sets

An **instruction set** is a list of instructions that the CPU can execute. These instructions include basic operations like adding, subtracting, and copying data. Every program on your computer, regardless of its complexity, is ultimately broken down into these simple instructions. Instruction sets are hard-coded into the CPU, meaning they are built into the hardware itself. Different CPU manufacturers may use different instruction sets, but they generally provide similar functionalities.

<div class="img-center">

![](/img/docs/8085-instruction-set.png)

</div>

## Motherboard

When you select your CPU, you need to make sure it's compatible with your **motherboard** - the circuit board that connects all your components together. 

The **motherboard** is the main circuit board that connects all the components of the computer. It houses the CPU, RAM, and storage devices, and provides connectors for other peripherals. The motherboard includes a chipset that manages data flow between the CPU, memory, and peripheral devices, ensuring efficient communication and operation.

<div class="img-center">

![](/img/docs/the-motherboard-diagram.jpg)

</div>

It's important to note that you can't simply purchase a collection of parts and expect them to work together seamlessly. CPUs are designed to fit into motherboards using specific socket types, and these sockets can vary. Some CPUs have numerous small pins that protrude, while others have contact points that resemble dots.


### Expansion Cards

Motherboards enable us to enhance our computer's capabilities by adding expansion cards. They distribute power from the power supply and facilitate communication between various computer components.

<div class="img-center">

  ![](/img/docs/comphwexpansioncards.png)

</div>

### Chipsets

Motherboards have several essential features, one of which is the chipset. The chipset determines how the components interact with each other within the system. It typically comprises two main chips:

  - **Northbridge chip**: Connects high-speed components such as RAM and video cards.
  - **Southbridge chip**: Manages input/output (IO) controllers, including hard drives and USB devices.

In many modern CPUs, the Northbridge is integrated directly into the CPU, eliminating the need for a separate Northbridge chip.

<div class="img-center">

  ![](/img/docs/comphwchipsets.png)
  
</div>


The chipset is crucial for managing data flow between the CPU, RAM, and peripherals. Peripherals are external devices like a mouse, keyboard, and monitor that connect to the computer.


### Expansion Slots

Motherboards also feature expansion slots, which allow us to further enhance the computer's functionality. For instance, if you want to upgrade your graphics card, you can simply install a new one in an available expansion slot. The current standard for expansion slots is **PCI Express** (Peripheral Component Interconnect Express). A PCIe bus appears as a slot on the motherboard, and a PCIe expansion card resembles a small circuit board.

<div class="img-center">

  ![](/img/docs/PCI-slot.jpg)
  
</div>


<div class="img-center">

  ![](/img/docs/PCI-e-slotx16-600x450.jpg)
  
</div>





### CPU Sockets

The compatibility of your CPU with your motherboard depends on the CPU socket type. There are two major types of CPU sockets:

- **Land Grid Array (LGA)**: Pins are located on the motherboard.
- **Pin Grid Array (PGA)**: Pins are on the processor itself.

The socket size can vary, so it's essential to ensure compatibility between the CPU and the motherboard. The type of socket will be indicated on the packaging of the CPU and motherboard, and detailed compatibility information can also be found on the manufacturer's website.

<div class="img-center">

  ![](/img/docs/comphwcpusocket.png)

</div>

### Form Factor

Motherboards come in various sizes known as form factors, which determine the number of components that can be installed and the available space. The most common form factor is **ATX** (Advanced Technology Extended), which itself has several size variations. In desktop systems, the full-sized ATX is prevalent.

Alternatively, you might choose an **ITX** (Information Technology Extended) form factor, which is much smaller than ATX boards. For example, the Intel NUC uses a variation of the ITX board, available in mini-ITX, nano-ITX, and pico-ITX sizes.

<div class="img-center">

  ![](/img/docs/comphwformfactor.png)

</div>

When building a computer, consider the form factor that suits your needs. A smaller form factor may limit the workload capacity, whereas a larger form factor can accommodate more functionality. The form factor also influences the types of expansion slots available.

Understanding motherboards and their features is advantageous when addressing hardware issues, as components like RAM modules and processors must fit the specific motherboard type. For example, if you're responding to a support ticket about video problems, you wouldn't want to arrive at the user's desk only to find that the replacement graphics card is incompatible with their motherboard.


## RAM

The **Random Access Memory** (RAM) is a type of volatile memory that the CPU uses to store data temporarily while processing instructions. Unlike storage devices like hard drives or SSDs, RAM provides fast access to data, enabling quick read and write operations. This speed is crucial for the smooth operation of applications and the overall system.

<div class="img-center">

![](/img/docs/comphwram.png)

</div>

We use RAM to store data that we want to access quickly. This data changes all the time so it isn't permanent. Almost all RAM is volatile, which means that once we power off our machines, the data stored in RAM is cleared.


### DRAM

There are many types of RAM, with **DRAM** (Dynamic Random Access Memory) being a common type found in computers. DRAM stores each bit of data in a tiny capacitor that holds a charge or discharges, representing a one or zero. These semiconductors are housed in chips on the RAM modules that store our data. There are also various types of memory sticks that DRAM chips can be mounted on.

### DIMM

Modern RAM sticks, known as **DIMM** (Dual Inline Memory Module), come with different pin configurations. When purchasing RAM, it's typically labeled by its capacity, such as an 8GB stick of RAM, rather than the number of DRAM chips it contains.

### SDRAM

After the creation of DRAM, manufacturers developed **SDRAM** (Synchronous DRAM). This type of RAM is synchronized with the system's clock speed, allowing for faster data processing.

### DDR

In modern systems, another type of RAM used is **DDR SDRAM** (Double Data Rate Synchronous DRAM), commonly referred to as **DDR**. There have been several iterations of DDR:

- DDR1
- DDR2
- DDR3
- DDR4

Each iteration of DDR is faster, more power-efficient, and has greater capacity than the previous versions. The latest version, **DDR4**, is currently the fastest type of short-term memory available for computers. Faster RAM means programs can run more quickly, and more programs can run simultaneously. 

It's important to ensure that the RAM sticks you use are compatible with your motherboard, as they have a different number of pins that must align with the motherboard's RAM slots.

## Storage

In addition to RAM, computers use storage devices like **Hard Disk Drives** (HDDs) or **Solid State Drives** (SSDs) to store data persistently. HDDs use spinning disks to read and write data, while SSDs use flash memory for faster performance and greater durability. The storage device holds the operating system, applications, and user data, retaining information even when the computer is turned off.

<div class="img-center">

![](/img/docs/ssd-vs-hdd-hero-1688630547197.jpeg)

</div>

## Peripherals

Peripherals are external devices that connect to the computer to extend its functionality. Common peripherals include:

- **Input Devices**: Keyboards, mice, and webcams.
- **Output Devices**: Monitors, printers, and speakers.
- **Storage Devices**: External hard drives and USB flash drives.

These peripherals communicate with the computer through various ports and interfaces, allowing users to interact with the system and access additional features.

### USB

**USB (Universal Serial Bus)** devices are the most common connections for our gadgets. USB has evolved significantly since its inception:

- **USB 2.0:** Transfer speeds of 480 megabits per second.
- **USB 3.0:** Transfer speeds of 5 gigabits per second.
- **USB 3.1:** Transfer speeds of 10 gigabits per second.

It's important to note the difference between units. **Mb/s** (megabits per second) is a measure of data transfer rate, while **MB** (megabytes) is a unit of data storage. One byte equals 8 bits, so to transfer 1 megabyte of data in a second, you need an 8 megabits per second connection. For example, transferring 40 megabytes of data per second requires a 320 megabits per second connection.

Your USB ports also need to match the device capabilities to achieve maximum transfer speeds. Plugging a USB 2.0 device into a USB 3.0 port won't give you 3.0 speeds, but the device will still work because USB is backward compatible. Generally, USB 2.0 ports are black, USB 3.0 ports are blue, and USB 3.1 ports are teal, though this may vary by manufacturer. The latest USB connector is **Type-C**, designed to replace many peripheral connections.

### Displays

In addition to USB peripherals, display peripherals are essential to understand. Common input standards include:

- **DVI (Digital Visual Interface):** Primarily outputs video.
- **HDMI (High-Definition Multimedia Interface):** Outputs both video and audio, and is common in modern televisions and computers.
- **DisplayPort:** Also outputs both video and audio, becoming increasingly popular.

### Projectors

Projectors are useful for sharing information with a group in the same location. They function similarly to other display devices and can experience similar issues like dead pixels or image burn-in.

### Connectors and Cables

Connecting a computer to a projector involves using a display cable like VGA, DVI, HDMI, or DisplayPort. The computer's operating system will detect the new display, allowing it to be extended or mirrored like a second monitor:

- [Windows - How to connect to a projector or PC](https://support.microsoft.com/help/27911/windows-10-connect-to-a-projector-or-pc)
- [MacOS - How to connect a display, TV, or projector to Mac](https://support.apple.com/guide/mac-help/mchl5fdd37ce/mac)
- [Ubuntu - How to connect another monitor to your computer](https://help.ubuntu.com/stable/ubuntu-help/display-dual-monitors.html)

Frequent connections and disconnections can wear out or damage projector cables and connectors, so check these first if the display flickers or disappears.

### Device Driver

If your computer doesn't recognize the projector's display resolution, it may default to a low resolution like 640x480 or 1024x768. In this case, you may need a device driver from the projector manufacturer's support website.

### Lighting

Projectors often use bright, hot incandescent bulbs, which can cause overheating. If a projector gets too hot, it will shut down to protect the lamp. LED projectors are becoming more common, as they have fewer overheating issues and longer lifespans than incandescent bulbs.

### Calibration

Projectors may need calibration when first installed, reset, or moved. Calibration adjusts the image for distance and angle, ensuring it's square and aligned with the projection surface. This involves focusing the image and making geometric adjustments. Refer to the projector's vendor documentation for specific calibration instructions.


## Cooling Systems

As computers process data, they generate heat. Effective cooling systems, such as fans and heatsinks, are crucial for maintaining optimal operating temperatures and preventing overheating. Advanced cooling solutions like liquid cooling systems are used in high-performance and gaming computers to manage the heat generated by powerful components.


<div class="img-center">

![](/img/docs/comphwcpuheatsinkandfan.png)

</div>

## Power Supply

The **Power Supply Unit** (PSU) converts electrical power from an outlet into a usable form for the computer's components. It provides the necessary voltages and currents to power the CPU, motherboard, storage devices, and peripherals. A reliable PSU is essential for the stable operation of the computer.

There are two types of electricity:

- **DC (Direct Current):** Flows in one direction.
- **AC (Alternating Current):** Changes direction constantly.

Our computers use DC voltage, so the PSU converts the AC voltage from our power company into usable DC voltage.

### Fans

Most power supplies have a fan to keep them cool. They also provide voltage information, usually listed underneath or on the side, and cables to power the motherboard.

### Voltage (220v and 110v)

Understanding electricity can be simplified with a water pipe analogy. Imagine our sinks connected to a pressurized water tank. When we turn on the faucet, water flows out, similar to how electricity works. 

<div class="img-center">

![](/img/docs/comphwvoltsampwatts.png)

</div>

If we increase the pressure in the water tank, more water flows out. In electricity terms, this pressure is referred to as **voltage**. 

**Example:** If you plug a 120-volt appliance into a 220-volt outlet, it will overload and fry the appliance. Conversely, a 220-volt appliance in a 120-volt outlet will work, but inefficiently, similar to a half-pressurized water tank. Using the proper voltage for your electronics is crucial to avoid damage.

### Amps

The amount of electricity flowing is called **current** or **amperage**, measured in amps. Amps are like pulling electricity, whereas voltage pushes it. Amps pull as much electricity as needed, while voltage provides everything available.

**Example:** Look at your device chargers; they may show something like 1 or 2.1 amps. Charging with 2.1 amps will charge a device faster than using a 1 amp charger.

### Watts

**Wattage** is the product of volts and amps, indicating the total power a device needs. A PSU with too low wattage won't power your computer effectively, so it's important to have enough wattage.

**Insight:** Having a larger PSU doesn't mean you'll overpower your computer. PSUs only supply the amount of power your system needs. It's better to have a larger PSU than a smaller one. A basic desktop can usually run on a 500-watt PSU, but more demanding tasks like high-resolution gaming or video production may require a higher wattage.



