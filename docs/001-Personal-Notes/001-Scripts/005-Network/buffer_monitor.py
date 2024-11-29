from cli import cli
import re
import time
import threading
from syslog import syslog

slice_pattern = re.compile(r'Slice\:\s*(?P<slice>\d)')
instance_pattern = re.compile(r'Instance\s(?P<slice>\d)')
def tah_buffer_counter (pkt_stats_driven, instance=None):
    buff_counters = cli('slot 1 show hardware internal tah buffer counters').split('\n')
    j = 0
    for i,line in enumerate(buff_counters):
        if 'Slice' in line:
            slice = slice_pattern.search(line).group('slice')
        if 'Output Pool-Group drops' in line:
            j = i + 3
        if i == j and re.match(r'Occupancy\sdrops\s*\d+\s*\d+\s*[1-9]',line):
            if pkt_stats_driven and instance == slice:
                syslog(2,'Non-zero hit for CPU-PG pkt-stats and Occupancy Drops on slice %s' % slice)
                break
            syslog(2, 'Non-zero hit for CPU-PG Occupancy drops on slice %s' % slice)
        if re.search(r'OPG\s.*\:\s*[1-9]',line) and not pkt_stats_driven:
            if pkt_stats_driven and instance == slice:
                syslog(2,'Non-zero hit for CPU-PG pkt-stats and descriptor drops on slice %s' % slice)
                break
            syslog(2, 'Non-zero hit for CPU descriptor drops  on slice %s' % slice)

def tah_pkt_stats (recheck):
    if not recheck:
        time.sleep(10)
    pkt_stats = cli('show hardware internal buffer info pkt-stats').split('\n')

    j = 0
    for i,line in enumerate(pkt_stats):
        if 'Instance' in line:
            slice = instance_pattern.search(line).group('slice')
        if 'Output Pool-Group Buffer Utilization' in line:
            j = i + 3
        if i == j and re.match(r'Total\sInstant\sUsage\s\(cells\)\s*\d+\s*\d+\s*[1-9]',line):
            #non-zero hit for pkt-stats on cpu-pg, sleep 10 and check again then alert
            if re.match(r'Total Instant Usage\s\(cells\)\s*0\s*0\s*[1-9]',line) and recheck:
                t = threading.Thread(target=tah_pkt_stats, args=(False,))
                t.start()
                t.join()
            elif re.match(r'Total Instant Usage\s\(cells\)\s*0\s*0\s*[1-9]',line) and not recheck:
                syslog(2,'Non-zero hit for CPU-PG pkt-stats usage on slice %s, checking buffer counters' % slice)
                tah_buffer_counter(True, slice)

def main ():
    '''
    This script does the two following operations:
    1. it will check output of slot 1 show hardware internal tah buffer counters
        It will look for the following conditions:
            a. check for non-zero occupancy drops for cpu-pg opccupancy drops and syslog for non-zero value
               any drops here are concerning as this is cpu-pg
            b. check for non-zero cpu descriptor drops and syslog for non-zero value
               again any drops here are concerning as this is cpu-pg
    2. it will check output of show hardware internal buffer info pkt-stats
        It will look for the following condition:
            a. if non-zero value is seen for cpu-pg it will do a second read after sleeping 10 seconds
               the goal of this sleep is to reduce false positive, but is still possible, if we get a double hit
               we will double check tah_buffer_counter to see if there is any non-zero value otherwise it is maybe false positive
               
    Sample scheduler config. This will run script every 30 minutes
    
    With AAA, additional config is needed for command authorization:
    
    scheduler aaa-authentication username newuser password Z98y76X54b
           
   	feature scheduler


	scheduler job name buffer_mon
	  python bootflash:/buffer_monitor.py
  
	end-job

	scheduler schedule name buffer
	  job name buffer_mon
	  time start 2020:09:10:18:45 repeat 0:0:30
    '''

    tah_buffer_counter(False)
    tah_pkt_stats(True)



if __name__ == "__main__":
    main()
