---
title: "On-Premise Architecture"
description: "Securing on-premise datacenters"
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

When it comes to data centers, there are two primary options: 

- Organizations can outsource the data center
- They can own the data center. 

If the data center is owned, it will likely be built on premises. A place, like a building for the data center is needed, along with power, HVAC, fire suppression and redundancy.


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


### Positive Pressurization

Positive pressurization is a strategy used to maintain a controlled environment within datacenters. It is used to allow air to go out an open door instead of going in. This is helpful in a fire situation, as smoke must go out of the building.

- Prevents dust and pollutants from entering
- Ensures consistent distribution of cool air
- Enhances airflow for better cooling efficiency

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

### Key terms

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

### Power Sources

A dependable electrical source is essential in datacenters to prevent disruptions and ensure continuous operation of critical systems.

- **Primary power source**

  - Supplies regular, uninterrupted power for daily operations
  - Separate, dedicated feeders from two utility substations for redundancy

- **Alternate power source**

  - Activates when the primary source fails
  - Power lines should handle inrush as recharge begins
  - Includes a properly sized generator with adequate fuel supply
  - Uses UPS systems as immediate backup power.

### UPS Systems

Uninterruptible Power Supply (UPS) Systems provide immediate backup power during outages to protect equipment from power disruptions.

- Allow safe shutdown to avoid data loss.
- Typically last 15–60 minutes; not for long outages.

Types:

- **Inline UPS**

  - Continuously supplies conditioned power to devices
  - Provides instant power transfer during an outage

- **Standby UPS**

  - Remains idle until a power failure occurs
  - Switches on during power loss, with a slight delay


### Line Conditioners

Devices that improve the quality of incoming power.

- Fix small power fluctuations.
- Keep voltage steady and reduce electrical noise.
- Protect against power surges but not full outages.


### Generators

Machines that produce electricity during long power failures.

- Turn mechanical energy into electrical power.
- Run automatically when main power stops.
- Support important equipment for extended periods.

Common types:

- Portable gas-powered
- Permanently installed
- Battery-inverter


### Power Distribution Centers (PDC)

Central units that manage electrical power for a facility.

- Distribute power efficiently to various systems.
- Include circuit protection, monitoring, and load balancing.


### Power Distribution Units (PDU)

Devices that distribute and manage power at the rack or equipment level.

- Managed PDUs let you control and monitor power remotely.
- Disable unused outlets to stop unauthorized devices from plugging in.
- Help manage power without reducing outlet availability.



### Electrical Interference

- **Electromagnetic Interference (EMI)**

    - Line noise from external magnetism.
    - Often caused by lighting or electrical motors.
    - Caused by difference in wires or improper wiring.

- **Radio Frequency Interference (RFI)**

    - Line noise from flourescent lighting and electrical cables.
    - Could be cause by components within an electrical system. 

- **Transient Noise**

    - Disturbance imposed on a power line by something starting.
    - Could be cause by a large motor or a piece of a heavy equipment.










## Fire Protection

### Elements 

Fire poses a significant threat to data centers, where even a small fire can cause extensive damage to sensitive equipment and lead to costly downtime. The three key ingredients that fire needs to ignite and continue burning are heat, fuel, and oxygen.

- **Heat** 
  - initial energy source that raises temperature of materials to their ignition point.
  - Can originate from electrical equipment failures, overheating, or sparks.

- **Fuel** 
  - Any combustible material that feeds the fire, e.g. paper, plastics, etc.
  - In data centers, cables, and other components can act as fuel.

- **Oxygen** 
  - Supports the chemical reactions that sustain a fire.
  - Generally abundant unless actively controlled by suppression systems.

### Suppression

Choose appropriate fire detection/suppression considering room size and equipment risks.

- Water-based suppression can harm electronic components.
- Consider gas-based systems for electronics-friendly suppression.
- Be mindful of potential human toxicity.

### Fire Extinguishers 

Fire extinguishers are classified based on the type of fire they are designed to extinguish. Knowing the right type of extinguisher to use for different fire classes ensures effective fire suppression and minimizes damage.

- **Class A**: 
  - Designed for fires involving ordinary combustibles such as wood, paper, and textiles.
  - Uses water or foam to cool and quench the flames.

- **Class B**: 
  - Targets fires fueled by flammable liquids like gasoline, oil, and grease.
  - Extinguishers contain foam, carbon dioxide, or dry chemical agents to smother the fire.

- **Class C**: 
  - Used for fires involving electrical equipment, which may pose an electrocution risk.
  - Employs non-conductive extinguishing agents like carbon dioxide or dry chemicals.

- **Class D**: 
  - Specifically for fires involving combustible metals such as magnesium, titanium, and sodium.
  - Utilizes specialized dry powder agents to absorb heat and prevent the fire from spreading.

- **Class K**: 
  - Designed for kitchen fires involving cooking oils and fats.
  - Uses wet chemical extinguishers that cool and create a barrier between the fuel and oxygen.

### Water-Based Fire Suppression

Water-based fire suppression systems are effective for controlling fires in various environments, including data centers. These systems use water to cool the fire and prevent it from spreading. 

- **Wet Pipe System**
  - Pipes are filled with water, ready for immediate discharge when a fire is detected.
  - Best for environments where pipes won't freeze, allowing quick response to fires.

- **Dry Pipe System**
  - Pipes contain pressurized air; water is released when a fire triggers the system.
  - Suitable for areas where freezing might occur, as water enters the pipes only when needed.


