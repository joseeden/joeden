#!/usr/bin/env python3
import shutil
import psutil
from custom_network_module import *

def check_disk_usage(disk):
    """Verifies that there's enough free space on disk"""
    du = shutil.disk_usage(disk)
    free = du.free / du.total * 100
    return free > 20

def check_cpu_usage():
    """Verifies that there's enough unused CPU"""
    usage = psutil.cpu_percent(1)
    return usage < 75

# Not enough disk/CPU, print an error
if not check_disk_usage('/') or not check_cpu_usage():
    print("ERROR!")
elif check_localhost() and check_connectivity():
    print("Everything ok")