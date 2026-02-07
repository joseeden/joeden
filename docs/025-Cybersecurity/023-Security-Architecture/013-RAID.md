---
title: "RAID"
description: "Redundant Array of Independent Disks"
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
sidebar_position: 13
last_update:
  date: 1/30/2024
---


RAID (Redundant Array of Independent Disks) combines multiple physical disks into a single logical unit to improve performance, reliability, and data redundancy.

## RAID Classifications 

There are multiple ways to setup RAID disks, depending on the level of resilience that we will want to aim for.

**Failure-resistant**

- Systems designed to withstand certain hardware malfunctions without losing data.
- Achieved through redundancy of storage devices by **mirroring** the data.
- RAID 1 and RAID 10.

**Fault-resistant**

- Designed for continued operation in the event of hardware failure without any downtime.
- Quickly rebuild any lost data from the remaining healthy storage devices.
- Achieve through mirroring or striping with parity.
- RAID 1, RAID 5, RAID 6, and RAID 10.

**Disaster-resistant**

- Broader level of protection from catastrophic events.
- Utilize two independent zones that always have full access to all the data.
- RAID 1 and RAID 10, "full mirrors".



## RAID 0

- "**Striping**"
- Stripes data across multiple disks for higher performance but no redundancy.
- Faster read and write speeds; data is split across multiple drives.
- Focus is performance, but no fault tolerance.


  
<div class="img-center">

  ![](/img/docs/secplus-raid-0.png)
  

</div>


## RAID 1

- "**Mirroring**"
- Mirrors data across two disks for redundancy .
- One disk can fail without data loss.


  
<div class="img-center">

  ![](/img/docs/secplus-raid-1.png)
  

</div>


## RAID 5

- "**Striping with parity**"
- Stripes data and parity information across three or more disks.
- Balances performance and redundancy.
- In case of failed disk, there will be slower speed in retrieving.
- Slower speed because its calculating the missing data on the fly.
- Can only lose one storage device, if more than that, it'll be difficult to rebuild missing data.


  
<div class="img-center">

  ![](/img/docs/secplus-raid-5.png)
  

</div>


## RAID 6

- "**Striping with double parity**"
- Similar to RAID 5 but with additional parity, allowing two disks to fail.
- Uses two identical pieces of parity data.
- Requires at least four storage devices.
- Can lose two disks and still be able to rebuild the data without suffering downtime.


  
<div class="img-center">

  ![](/img/docs/secplus-raid-6.png)
  

</div>



## RAID 10 


- Combines mirroring and striping for high performance and redundancy
- Requires at least four disks.
- Faster speed because of the striping of data across two arrays.
- Can lose two disks and still be able to rebuild the data without any downtime, as long as they're not in the same RAID 1 array.


  
<div class="img-center">

  ![](/img/docs/secplus-raid-10.png)
  

</div>

