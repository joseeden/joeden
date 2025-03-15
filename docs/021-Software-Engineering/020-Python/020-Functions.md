---
title: "Functions"
description: "Python Functions"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 20
last_update:
  date: 10/28/2019
---


## Check Disk and CPU Usage 

Get the script here: [Sample python scripts.](https://github.com/joseeden/joeden/tree/master/assets/code/python/basics)


This Python script checks disk and CPU usage using the `shutil` and `psutil` modules:

- **shutil**: `disk_usage()` to return disk statistics (total, used, and free space).
  
- **psutil**: `cpu_percent()` function retrieves the current CPU usage percentage.

Make sure to install `psutil` first:

```python
pip3 install psutil 
```

To run the script:

```bash
./check-disk-cpu-usage.py
```

If you encounter a "permission denied" error, it indicates the script lacks execute permissions. Fix this by updating the permissions:

```bash
sudo chmod +x check-disk-cpu-usage.py
```

Another way to run it is:

```bash
python3 check-disk-cpu-usage.py
```

