---
title: "Computer Programs"
description: "Understanding how computer programs work"
sidebar_position: 20
tags: [IT Fundamentals, Computers, Operating Systems]
last_update:
  date: 2/26/2017
---


## Programs 

Computers communicate exclusively in binary, utilizing ones and zeroes, which form the fundamental language of computing. While humans speak languages like English, Spanish, or Mandarin, computers rely on this binary system. To bridge this gap, we use programs, which act as translators enabling us to interact with our machines effectively.

- **Programs**: These are sets of instructions that direct the computer on what tasks to perform. Stored primarily in RAM (Random Access Memory), programs enable efficient and quick access for the CPU (Central Processing Unit).

- **RAM**: Acts as the computer's short-term memory, facilitating rapid access to instructions and data compared to slower storage options like hard drives. 

## Instructions 

As analogy, let' say we have a chef and we want her to make a peanut butter and jelly sandwich. We can send the steps to her:

1. Get two slices of bread. 
2. Put peanut butter on one slice. 
3. Put jelly on another slice. 
4. Combine the two slices of bread. 

Our chef can only interact with us using only ones and zeroes. Instead of conveying readable instructions, such as a recipe for a peanut butter and jelly sandwich, we can transmit instructions in binary format like this:

```
00110001 00101110 00100000 01000111 01100101 01110100 00100000 01110100 01110111 01101111 00100000 01110011 
```

However, the process is more complex than this simplified example suggests. The CPU continuously receives and executes these binary instructions. But how exactly do these instructions traverse throughout the computer system?

## External Data Bus 

In our computer system, we utilize a critical component known as the **External Data Bus** or **EDB**. This is analogous to the veins in our body, connecting various parts of the computer.

![External Data Bus](/img/docs/comphwedb.png)

The EDB consists of a series of wires. When a voltage is applied to these wires, they switch states: 

- on, represented by a 1, and 
- off, represented by a 0. 

This mechanism allows us to transmit binary information throughout the computer system. This method of transmitting signals through the EDB is similar to how transistors operate, facilitating the movement of voltages within the computer. EDBs can vary in size, commonly found in configurations such as:

- 8-bit
- 16-bit
- 32-bit
- 64-bit


## Registers

Now, as our CPU receives a byte of data, it's time for it to swing into action. Deep within the CPU are components known as **Registers**.

Registers serve as storage units for data that the CPU manipulates. For instance, if our CPU needs to perform an addition operation, it might store one number in register A and another in register B, with the result stored in register C.

<div class="img-center"> 

![](/img/docs/compprogramsregisters.png)

</div>

Think of registers as analogous to worktables for our chef. With designated places to work, she can efficiently begin preparing meals. Just as she uses a recipe book to interpret instructions into actionable tasks, registers allow the CPU to translate binary data into operations it can execute.

It's important to note that when programs are loaded into the CPU's active memory, they reside in **RAM (Random Access Memory)**. RAM enables the CPU to swiftly retrieve data from any location, as opposed to sequential access methods like hard drives. However, contrary to the EDB, RAM doesn't directly transmit data across wires because that would be too much stuff - millions, even billions, of data rows.

## Memory Controller Chip 

In our earlier analogy with sandwiches, we simplified the idea of recipes. But in reality, most of our computer programs are far more complex and often spanning thousands of lines of instructions. To efficiently process these instructions which aren't necessarily in sequential order, we rely on a component known as the **Memory Controller Chip** or **MCC**.

![](/img/docs/compprogrammcc3.png)

The **MCC** acts as a vital link between the CPU and the RAM, similar to a nerve connecting our brain to memories. When the CPU needs specific data or instructions, such as fetching step three of a recipe, it communicates with the MCC:

```
"Hey, I need the instructions for step number three of this recipe."
```

Upon receiving this request, the MCC locates the corresponding data within the RAM, retrieves it, and then facilitates its transmission through the External Data Bus (EDB) to the CPU for processing. This seamless interaction between the CPU, MCC, and RAM ensures that the instructions and data needed for computation are swiftly accessed and delivered.

## Address Bus 

In addition to the External Data Bus (EDB), another important component in our computer architecture is the **Address Bus**. While the EDB transfers actual data between components, the Address Bus serves a different yet equally vital function—it transmits addresses.

![](/img/docs/compprogramaddressbus.png)

The **Address Bus** connects the CPU directly to the Memory Controller Chip (MCC). Rather than transferring data, it sends specific memory addresses. These addresses indicate where in the RAM the desired data or instructions are located, without actually sending the data itself.



## Cache 

While RAM serves as the main memory for our computer, it's not the quickest way to deliver data to the CPU. Enter **Cache**, a smaller but incredibly fast memory storage located directly on the CPU.

![](/img/docs/compprogramaddrbus.png)


**Cache** acts like a high-speed storage area for frequently accessed data and instructions. Imagine RAM as a refrigerator full of food—it's spacious but takes time to retrieve items. In contrast, Cache is more like the essentials we keep in our pockets, readily accessible for quick use. Modern CPUs feature multiple levels of cache (L1, L2, and L3), with L1 being the fastest and smallest.


## Clock Wires

Understanding how our CPU interacts with RAM is one thing, but how does it know when to start and stop processing instructions? This is where the **Clock wire** comes into play.

The CPU operates on a synchronized internal clock that governs its activities. The Clock wire carries signals to the CPU, indicating the timing for operations. When data is sent or received, a voltage signal on the Clock wire triggers the CPU to initiate calculations and execute instructions. 

## Clock Cycles 

Imagine the Clock wire as the ticking of a clock in your CPU. Each tick represents a **clock cycle**, which is the basic unit of operation for the CPU.

For every clock cycle, the CPU performs a specific operation—fetching, decoding, executing, and storing data. The speed at which these cycles occur is crucial for computing performance, especially when handling large amounts of data or complex tasks.

  [](/img/docs/rsflipflopholdone.png)


## Clock Speed 

When you see a CPU labeled with something like 3.4 GHz, it refers to the **Clock speed**, which indicates how many clock cycles the CPU can execute per second under optimal conditions.

[](/img/docs/1850-front.small.jpg)

3.40 gigahertz means the CPU can perform 3.4 billion cycles per second. However, it's important to note that this speed represents the maximum capability of the CPU, not necessarily its continuous operational speed. Actual performance can vary based on workload and system conditions.

## Overclocking

For those seeking additional performance from their CPU, there's a practice called **Overclocking**. This involves increasing the clock speed beyond the manufacturer's specifications to boost computational power.

Overclocking is often used by enthusiasts, gamers, and professionals seeking enhanced performance, especially in resource-intensive applications like gaming or video editing. However, it comes with risks, such as increased heat generation and potential hardware instability, which can damage the CPU if not managed properly.
