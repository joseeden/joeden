---
title: "MPLS
description: "Networking Technologies"
tags: [Networking, Networking Technologies]
sidebar_position: 10
last_update:
  date: 1/30/2024
---

## MPLS 

Add simple explanation intro 

- add more info
- add more info
- add more info

MPLS uses fixed paths determined by the first router in the path. The first MPLS router that encounters the packet will attach a label to the packet that corresponds to a fixed path to the final destination. Other routers in the path simply reads the label on the packet and use that label to determine where the packet should go next without performing any lookups. 


## MPLS as Tunnels 

Add simple explanation intro 

- Label Edge Router (LER) is the first router, and is in charged of ...
- Label Switching Router (LSR) ...
- There could be multiple LSRs...
- The final destination router is known as the Egress Node, removes labels...  

The MPLS tunnel between LER and the Egress Node is actually comprised of one or more LSRs that are selected by the LER when it attaches the label. These LSRs don't need to know much and they simply need to look at the label in the packet and then send the label to the next, until it reaches the EGress node. 


## MPLS Routing Protocols 


Add simple explanation intro ..... There are two MPLS routing protocols: 

- Label Distribution Protocol 

    - add more info
    - add more info
    - add more info 

- Reservation Resource Protocol - Traffic Engineering (RSVP-TE)

    - add more info
    - add more info
    - add more info 

