---
title: "Hardware Security"
description: "Securing hardware memory and interfaces"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 64
last_update:
  date: 1/30/2024
---


## Device Encryption

Device encryption protects data by converting it into a code that can only be accessed with the correct encryption key. 

- Encrypt sensitive data stored on devices to prevent unauthorized access.
- Use full-disk encryption to secure the entire device, not just specific files or folders.
- Ensure encryption keys are stored securely, separate from the device, for added protection.

Encrypting the device ensures that even if a device is lost or stolen, the data remains secure. For more information, please see the links below:

- [Data Encryption.](/docs/007-Cybersecurity/022-Asset-Security/006-Data-Encryption.md)
- [Symmetric Encryption](/docs/007-Cybersecurity/025-Cryptography/009-Symmetric-Encryption.md)
- [Asymmetric Encryption](/docs/007-Cybersecurity/025-Cryptography/010-Asymmetric-Encryption.md)
- [Encryption Tools](/docs/007-Cybersecurity/025-Cryptography/014-Encryption-Tools.md)


## Self-Encrypting Drives (SEDs)

Self-Encrypting Drives (SEDs) automatically encrypt all data on the drive using built-in hardware.  
They protect against data theft if a device is lost or stolen, with minimal user impact.

- Encryption and decryption are handled transparently by the drive
- No need for separate software or user action
- Ideal for organizations with low user inconvenience tolerance


## Portable Devices

Portable devices, such as laptops and smartphones, are highly vulnerable to theft and financial loss due to their mobility. 

- Enable remote wipe capabilities to erase data from lost or stolen devices.
- Use multi-factor authentication to secure access to portable devices.
- Stolen devices increases the risk of data breaches if not properly secured.

### Cable Locks

To prevent devices from being stolen, cable locking devices can be attached to laptops and desktops. These locks physically secure the device to a fixed object and deter thiefs.

- Attach cable locks to anchor points such as desks or tables.
- Ensure the lock mechanism is robust and difficult to tamper with.
- The only way to unlock it is by using the corresponding key.
  
NOTE: Remember to secure the other end of the locking cable to an immovable object to fully protect the device.

<div class='img-center'>

![](/img/docs/networking-basics-portable-devices-using-cable-locks-secured-to-table.png)

</div>


### Safes and Cabinets

You can use vaults to protect devices that are not in use. Safes can provide protection against both theft and environmental damage like water or fire.

- Offers additional protection in the event of a disaster
- Place high-value or critical devices in secure safes when they are not in use

If you don’t need the level of protection offered by a safe, you can simply store devices inside secure laptop cabinets, which offer basic physical security.

<div class='img-center'>

![](/img/docs/networking-basics-portable-devices-using-safes-and-cabinetsss-2.png)

</div>


### Security Tags

You can use security tags under the devices to track and monitor their location. These tags help with asset management and can assist in recovery if a device is stolen.

- Use RFID or GPS-enabled security tags for real-time location tracking.
- Security tags can alert you if a device is moved from its designated area.

Security tags can also include clear instructions on how to return a device if it is found and leave an indellible tattoo on the device if someone attempts to remove them.

![](/img/docs/networking-basics-portable-devices-using-security-tagsss.png)

<center><small> Reference: [STOP Security Plate](https://www.stoptheft.com/sp) </small></center>



## Memory Management

Memory management is an important aspect of operating system functionality, ensuring that applications and processes operate efficiently. The operating system manages memory allocation and access to optimize performance and prevent conflicts.

- Tracks which applications use each segment of memory.
- Grants requests for additional memory.
- Frees up memory that is no longer needed.

The operating system also protects memory by enforcing access rules, ensuring that processes do not access memory segments outside their designated areas.

### Segmentation Fault

A segmentation fault indicates a program's illegal access to memory, often due to programming errors or misconfigurations.

- Results in the termination of the program by the operating system.
- Commonly associated with programming bugs, such as accessing uninitialized pointers.
- Can be debugged using tools like gdb to trace memory access violations.

### Memory Leaks

Memory leaks occur when a program does not release memory that is no longer needed, which can lead to inefficient use of system resources.

- Detected using memory profiling tools like Valgrind.
- Often caused by failing to free dynamically allocated memory.
- Can impact system performance by exhausting available memory over time.

## Interfaces

Interfaces in computing facilitate communication between systems and components. The primary types are:

- **Physical Interface**

  - Tangible connections like USB ports or network cards.
  - Ports for devices such as HDMI or Ethernet.
  - Interaction points for peripherals like keyboards and printers.

- **Virtual Interface**

  - Software connections like APIs or virtual network adapters.
  - Interfaces in virtual machines for network communication.
  - Software-based interaction points for application integration.

## Covert Channel

Covert channels transmit information secretly to bypass security measures: These are interfaces that weren't planned by the developers but may be exploited by malicious users to exfiltrate information from a sensitive system to the outside world.

- **Covert storage Channels**

  - Placing data in an unexpected location where it may be read by another individual/system.
  - Encode data in shared storage like files or memory.
  - Hide information in unused file attributes or metadata.
  - Example: 
    - The ICMP echo request packet may allow the sender to include arbitrary data in the packet payload
    - This packet is usually left blank.
    - If a network allows outbound ICMP packets, a user can send modified ping packets to remote system.
    - The echo request payload can then be used to transmit data covertly.

- **Covert timing Channels**

  - Use timing variations to encode and transfer data.
  - Exploit process delays for hidden communication.
  - May include the use of a network or changing a system's electicity use.
  - Example:
    - **Port knocking** allows a user to send data to a remote system.
    - This will proble different network ports in a specific order to transmit information slowly.

- **Resource Usage Channels**

  - Manipulate resource usage to transfer information.
  - Create patterns in system resources for covert data transfer.