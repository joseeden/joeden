import signal 
from functools import wraps 

"""
timeout-decorator.py

This module provides a timeout decorator that stops a function if it runs longer than the allowed time.

Usage:
    python3 timeout-decorator.py

Expected output:
Function call timed out!
Running for 10 seconds!
"""

def raise_timeout(signum, frame):
  raise TimeoutError("Function call timed out!")

def timeout(n_seconds):
  def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
      signal.signal(signal.SIGALRM, raise_timeout)
      signal.alarm(n_seconds)
      
      try:
        return func(*args, **kwargs)
      except TimeoutError as e:
        print(e)
      finally: 
        signal.alarm(0)
        
    return wrapper
  return decorator  

@timeout(5) 
def five_sec():
  import time 
  time.sleep(7) 
  print("Running for 7 seconds!")

@timeout(10) 
def ten_sec():
  import time 
  time.sleep(9) 
  print("Running for 10 seconds!")


five_sec()  
ten_sec()  
  