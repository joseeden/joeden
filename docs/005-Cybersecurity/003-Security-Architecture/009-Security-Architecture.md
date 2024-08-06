---
title: "Security Architecture"
description: "Different types of secure architectures"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 9
last_update:
  date: 1/30/2024
---



## Overview

Design, structure and behavior of an organization's information security environment.

- **On-Premise**
    - Local infrastructure.
    - Data processed and stored on-site.
    - Direct control over hardware and software.

- **Cloud**
    - Internet-based services.
    - Hosted and managed by third-party providers.
    - Pay-per-use model.

- **Hybrid**
    - Combination of on-premise and cloud.
    - Integrates local infrastructure with cloud services.
    - Offers flexibility and scalability.


## On-Premises Data Centers

When it comes to data centers, there are two primary options: organizations can outsource the data center or own the data center. If the data center is owned, it will likely be built on premises. A place, like a building for the data center is needed, along with power, HVAC, fire suppression and redundancy.



<div class="img-center">

![](/img/docs/security-on-premises-datacenters.png)


</div>



## Heating, Ventilation and Air Conditioning (HVAC) 

Ensure adequate cooling for high-density and enclosed space equipment.

- Follow temperature standards for optimized hardware life.
- Use temperature sensors at various rack levels for precise monitoring.
- Implement contaminant controls for dust and noxious fumes.
- Monitor for water or gas leaks, sewer overflow, and HVAC failure.
- Prioritize critical systems in contingency planning.

### Expanded Envelope

The "expanded envelope" approach involves broadening the acceptable range of temperature and humidity to improve overall efficiency.

- **Broader Temperature Range**: 
  - Allows for higher operational temperatures.
  - Reduces cooling energy needs.

- **Humidity Control**: 
  - Maintains a wider humidity range.
  - Prevents static discharge and condensation.
  
- **Optimized Cooling**: 
  - Utilizes free cooling when possible.
  - Reduces reliance on traditional air conditioning.

### Humidity Problems

Managing humidity levels in data centers is important to prevent damage to sensitive electronic equipment. Proper humidity control helps avoid problems like condensation and static electricity, which can negatively affect equipment performance and lifespan.

- **High Humidity**: 
  - Can cause condensation, damaging electronic components.
  - Increases the risk of corrosion and short circuits.

- **Low Humidity**: 
  - Raises the chance of static electricity, which can harm electronic components.
  - May lead to data loss and equipment failure due to static discharge.

### Dew Point Range

Humidity in data centers is often measured using the dew point, which is the temperature at which air becomes saturated with moisture.

- The recommended dew point range for data centers is 41.9 - 50 degrees Fahrenheit.
- Staying within this range helps protect equipment from moisture-related problems.
- Proper management helps balance cooling and humidity systems, improving energy efficiency.

### Hot Aisle/Cold Aisle 

The hot aisle/cold aisle configuration is a data center design strategy that optimizes cooling efficiency by managing airflow. This setup involves arranging server racks in alternating rows, where the fronts of the racks (cold aisles) face each other and the backs of the racks (hot aisles) face each other.

- **Cold Aisle**: 
  - Front of server racks draws in cold air.
  - Aligned with air conditioning vents for maximum cooling.

- **Hot Aisle**: 
  - Back of server racks expels hot air.
  - Overhead return vents remove warm air to prevent mixing.

To implement the hot aisle/cold aisle configuration effectively:

  - Position racks with cold aisles and hot aisles facing each other.
  - Use barriers like doors or curtains to separate airflows.
  - Regularly check temperature and airflow for optimal performance. 

This configuration helps data centers improve cooling efficiency, reduce energy costs, and maintain a stable environment for equipment.

<div class='img-center'>

![](/img/docs/hot-aisle-cold-aisle-sample-diagramaaa.png)

</div>


## Closets

Protect access to the physical layer for information system security.

- House critical components such as servers and network connections.
- Address security challenges related to data centers and wiring closets.
- Safeguard against intentional or unintentional damage.

## Power

Ensure constant and consistent power delivery to data centers.

- Mitigate wide fluctuations in power quality to preserve system lifespan.
- Size backup generators for the critical load and use battery backups for stabilization.
- Regularly test alternate power sources for effective failover.

Key terms:

- **Surges**
    - Small and unexpected increase in the amount of voltage being provided.
    - Utilize a surge protector or line conditioner.

- **Spikes**
    - Short transient voltage that is usually caused  by a short circuit, a power outage, or a lightning strike.
    - Utilize a surge protector or line conditioner.

- **Sags**
    - Small and unexpected decrease in the amount of voltage being provided.
    - Usually occurs for short period of time.
    - During a sag, computer can still remain operational but hardware components may be damaged over time. 
    - Utilize a surge protector or line conditioner.

- **Undervoltage events**
    - Usually referred to as "brownouts".
    - Voltage is reduced to lower levels; occurs for longer period of time.

- **Full power loss events**
    - Usually referred to as "blackouts".
    - Total loss of power for a given period of time.
    - When power is restored, it can cause a power spike.

## Fire Suppression

Choose appropriate fire detection/suppression considering room size and equipment risks.

- Be cautious of water-based suppression's potential harm to electronic components.
- Consider gas-based systems for electronics-friendly suppression, but be mindful of potential human toxicity.

## Using Robust Systems

- **Line Conditioners**
  - Overcome minor fluctuations in the power being received.
  - Stabilize voltage levels; filter out electrical noise.
  - Protect against power surges, but not from a complete failure event.

- **Uninterruptible Power Supply (UPS) Systems**
  - Provide backup power during outages and protect against power fluctuations.
  - Prevent data loss by allowing safe shutdown.
  - Most UPS only provides 15-60 minutes of power; not for long-term outage.

- **Generators**
  - Convert mechanical energy into electrical energy for use.
  - Supply power during extended outages.
  - Automatically start when primary power fails.
  - Support critical systems for prolonged periods.
  - Usual types:
    - Portable gas-engine 
    - Permanently installed 
    - Battery-inverter

- **Power Distribution Centers**
  - Central hub that distribute electrical power efficiently.
  - Integrated circuit protection, monitoring, and loadbalancing.

