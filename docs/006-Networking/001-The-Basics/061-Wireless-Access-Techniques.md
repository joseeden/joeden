---
title: "Wireless Access Techniques"
description: "wireless Access Techniques"
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
- Wireless
sidebar_position: 61
last_update:
  date: 1/16/2018
---

## FDMA 

**FDMA (Frequency Division Multiple Access)** assigns separate frequency bands to each user to avoid interference.

- Each user gets a unique frequency
- Simple and easy to implement
- Limited capacity for many users

FDMA is a basic method for separating users in frequency, but it doesn’t scale well for large networks.

:::info 

FDMA was the earliest multiple access technology put into practice. 

:::

## TDMA

**TDMA (Time Division Multiple Access)** splits access into time slots so users take turns using the channel.

- Users share the same frequency over different time slots
- More efficient than FDMA
- Reduces interference between users

TDMA allows multiple users to share a channel efficiently by organizing access over time.

:::info 

Global System for Mobile Communication (GSM) uses TDMA as its frequency access technology. GSM is a second-generation technology and, although generally replaced by newer technologies such as 4G LTE and 5G, is still used in some parts of the world. 

:::

## DSSS 

**DSSS (Direct Sequence Spread Spectrum)** spreads a signal over a wider frequency using a code for better reliability.

- Signal is spread using a unique code
- Resistant to interference and noise
- Provides some security benefits

DSSS improves communication reliability by spreading the signal and reducing the chance of interference.



## CDMA 

**CDMA (Code Division Multiple Access)** allows multiple users to share the same frequency using unique codes.

- Each user has a unique code to separate signals
- Supports many users at the same time
- Resistant to interference

CDMA makes efficient use of spectrum by allowing many users to coexist without collisions.



## OFDM 

**OFDM (Orthogonal Frequency Division Multiplexing)** is a **modulation technique** used to transmit data efficiently over multiple subcarriers.

- Splits a channel into many narrow, orthogonal subcarriers
- Each subcarrier carries a part of the data
- Reduces interference and multipath fading

OFDM is used in Wi-Fi, LTE, and digital TV to send high-speed data reliably. It **does not assign subcarriers to different users** by itself.


## OFDMA 

**OFDMA (Orthogonal Frequency Division Multiple Access)** is a **multiple access technique** based on OFDM, allowing multiple users to share the same channel.

- Assigns different subcarriers or resource blocks to different users
- Each user can transmit simultaneously without interference
- Used in LTE and 5G for uplink and downlink

OFDMA builds on OFDM but adds **multi-user allocation**, making it suitable for cellular networks.

**Key difference:**

- OFDM = just a way to send data on multiple orthogonal subcarriers
- OFDMA = uses OFDM but also **splits subcarriers among multiple users**

Think of OFDM as a single highway with many lanes (subcarriers), and OFDMA as letting multiple cars (users) drive on specific lanes at the same time.




## SC-FDMA 

**SC-FDMA (Single Carrier Frequency Division Multiple Access)** is a single-carrier version of OFDMA, used mainly in uplink channels.

- Uses single-carrier modulation
- Reduces peak-to-average power ratio
- Commonly used for LTE uplink

SC-FDMA is energy-efficient for mobile devices and ensures reliable uplink transmission.


## FHSS

**FHSS (Frequency Hopping Spread Spectrum)** takes the total amount of bandwidth (spectrum) and splits it into smaller subchannels. 

- Changes the transmission frequency in a known sequence
- Signal hops between multiple frequencies
- Reduces interference and jamming
- Used in Bluetooth and older Wi-Fi (802.11b)

FHSS improves reliability and security by making the signal harder to intercept or disrupt.

## DFS

**DFS (Dynamic Frequency Selection)** allows devices to switch frequencies automatically to avoid interference.

- Detects radar or other high-priority signals
- Moves to a different channel when needed
- Required in some Wi-Fi bands (5 GHz) for compliance

DFS ensures Wi-Fi devices do not interfere with radar systems and maintains smooth operation across shared spectrum.
