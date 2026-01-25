---
title: "Redundancy Options"
description: "From locally-redundant to geo-zone-redundant storage"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 7
last_update:
   date: 11/16/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::



## Redundancy Options 

Azure Storage provides six redundancy options, ranging from locally-redundant to read-access geo-zone-redundant storage. Each option offers different levels of redundancy and pricing. 

![](/img/docs/azure-redundancy-options-complete-diagram.png)

Note that not all of these options are available in every region or for every type of data.


### Locally-Redundant Storage (LRS)

- **Replication:** Across racks in the same data center.
- **Disaster Consideration:** Data could be lost in a data center disaster.
- **Recommendation:** Use only if data reconstruction is easily achievable.

   ![](/img/docs/azure-redundancy-lrs.png)

### Zone-Redundant Storage (ZRS)

- **Replication:** Across three zones within one region.
- **Disaster Consideration:** Ensures data availability even if an entire zone goes down.

   ![](/img/docs/azure-redundancy-zrs.png)

### Geo-Redundant Storage (GRS)

- **Replication:** Across two regions.
- **Disaster Consideration:** Requires geo-failover in the event of a regional disaster to access data in the secondary region.

   ![](/img/docs/azure-redundancy-grs.png)

### Read-Access Geo-Redundant Storage (RA-GRS)

- **Replication:** Same as GRS.
- **Additional Feature:** Allows reading data immediately from the secondary region in case of a disaster in the primary region.
- **Write Access:** Not available until Microsoft restores availability in the primary region.

   ![](/img/docs/azure-redundancy-grs.png)

### Geo-Zone-Redundant Storage (GZRS)

- **Replication:** Across three availability zones in the primary region.
- **Difference from GRS:** Combines zone-redundant storage and geo-redundant storage.

   ![](/img/docs/azure-geo-zone-gzrs.png)

### Read-Access Geo-Zone-Redundant Storage (RA-GZRS)

- **Replication:** Same as GZRS.
- **Additional Feature:** Allows immediate reading from the secondary region in case of a disaster in the primary region.
- **Write Access:** Not available until Microsoft restores availability in the primary region.

   ![](/img/docs/azure-redundancy-zrs.png)



## Redundancy Pricing 

Naturally, each of these redundancy options has a different price. 

- Locally-redundant storage being the cheapest and 
- Read-access geo-zone-redundant storage being the most expensive. 
- RA-GRS is actually more expensive than GZRS even though it’s less redundant because it provides instant access to your data in the secondary region. 

![](/img/docs/azure-cost-redundancy-options-complete.png)

 
