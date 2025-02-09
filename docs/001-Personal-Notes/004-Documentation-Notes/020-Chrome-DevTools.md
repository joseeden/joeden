---
title: "Chrome DevTools"
tags: 
- DevOps
- Personal Notes
- Development
- Github
description: "Chrome DevTools"
sidebar_position: 20
last_update:
  date: 11/22/2023
---

## Simulating Phone Display

To simulate phone display in Google Chrome, add a custom device in Chrome DevTools:  

1. Open **DevTools** (`F12` or `Ctrl + Shift + I`).  
2. Click the **device toolbar** (`Ctrl + Shift + M`).  
3. Click the **"Dimensions" dropdown** → **Edit**.  
4. Click **"Add custom device"** and enter details, example:
   - **Device Name**: Samsung S24+  
   - **Width**: 412  
   - **Height**: 915  
   - **Device Pixel Ratio (DPR)**: 3.0  
   - **User Agent String**: (Optional, leave default or use one from your device).  

Below is the approximate **CSS viewport size** (the size used in Chrome DevTools), when Chrome DevTools zoom is set to 100%.

| **Device**             | **Width (px)** | **Height (px)** | **Device Pixel Ratio (DPR)** |  
|------------------------|---------------|---------------|----------------------|  
| Samsung Galaxy S24+    | 412           | 915           | 3.0                  |  
