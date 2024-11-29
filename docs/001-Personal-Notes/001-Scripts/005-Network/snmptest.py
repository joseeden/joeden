#!/usr/bin/env python

# Script that tests snmp from devices in list to peers

import csv

dictdev = {}
listdev = []

# csv file of the devices to be tested on all peers
path_devices = 'C:\\Users\\EDENJ011\\Downloads\\SevOne-WIFI-WC-JAN-07.csv'

devices = open(path_devices, 'r', encoding="UTF-8")

list_dev = csv.reader(devices)

# Makes a dictionary of hostname:ip mapping.
for row in list_dev:
    Host, ip = row[:2]
    dictdev[Host] = ip

print(dictdev)

for host, ip in dictdev.items():
    print(ip)