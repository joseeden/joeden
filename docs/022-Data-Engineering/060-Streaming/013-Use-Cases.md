---
title: "Use Cases"
description: "Use Cases"
tags: 
- Data Engineering
- Data Integration
- System Design 
- Big Data 
- ETL
sidebar_position: 13
last_update:
  date: 10/07/2020
---

## Streaming Music

Streaming systems often focus on how users interact rather than the actual music content. 

- Focus on user actions instead of song data
- Track behavior, preferences, and interactions
- Analyze what information users provide versus what is streamed

### 1. Interactions

User interactions tell us how people use the app. Analytics teams often focus on what, when, and where actions happen.

- Actions like liking, skipping, or changing songs
- Selecting or removing channels and playlists
- Tracking when and where in the app each action occurs


### 2. How To Store Data

Collected data needs to be stored efficiently. A log-based format works well for recording user actions.

- Logs are easy to manage and scalable
- Different users have different activity levels
- Data can be analyzed later for trends

Example:

```bash
{'user_id': 10, 'action': 'skip_song', 'timestamp': '2025-10-27T14:03:00'}
```

Logs make it easier to analyze user actions later without interrupting the live stream.


### 3. Analytics

Once data is stored, analytics can extract insights such as preferences and usage patterns.

- Identify favorite artists and genres
- Discover peak usage times
- Analyze devices, platforms, and app versions


## Sensor Data

Sensor data comes from devices that automatically monitor the environment. These devices send readings to central systems for analysis.

- Common sensors include temperature, light, and motion detectors
- Devices send data continuously or at set intervals
- Systems can manage data from a few to millions of sensors

Consider a connected doorbell. It combines several sensors and features for home monitoring.

- Detects button presses and motion
- Streams audio and video for live interaction
- Uses temperature and light sensors for added context
- Monitor visitors and receive alerts remotely.

### 1. What Are We Monitoring

Monitoring focuses on what actions or events are most important.

- Send instant alerts when the button is pressed
- Stream movement or sound events for quick detection
- Process audio or video for deeper analysis

Each type of data can have different speed or priority requirements, depending on importance.


### 2. Data Handling

Data from devices must be stored and processed based on urgency and purpose.

- Button press events need fast storage and processing
- Sensor readings can be processed with slightly less urgency
- Audio and video files are stored for later review

Example:

```python
data = [
  {"event": "button_press", "priority": "high"},
  {"event": "motion_detected", "priority": "medium"},
  {"event": "video_upload", "priority": "low"}
]
```

Each part of the product can have its own SLA. This ensures the most important data is handled first.




## Vaccination Clinic

A vaccination clinic is a good example of a system with multiple moving parts.

- Patients arrive, register, and receive vaccines
- Different stations handle different steps
- Each step can represent a separate data process

Each area of the clinic can map to a different data process.

- Arrival: Check temperature and symptoms (single entry)
- Registration: Validate patient data (multiple workers)
- Vaccination: Administer shots (parallel stations)
- Monitoring: Watch for reactions (timed waiting)
- Departure: Log patient exit

Example mapping:

```yaml
arrival: batch
registration: queue
vaccination: stream
monitoring: batch
departure: stream
```
