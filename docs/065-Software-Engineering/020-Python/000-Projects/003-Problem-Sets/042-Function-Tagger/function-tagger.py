from functools import wraps

"""
function-tagger.py 

This module provides a decorator to add tags to Python functions. 
Tags can be used to label functions as:

- Experimental, released, etc 
- Assign ownership
- Mark for future removal

Usage: 
    python3 function-tagger.py 
    
Expected output:
  ('app_update_id', 'experimental')
  ('app_update_id', 'platform_team')

"""

def tag(*tags):
  def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
      return func(*args, **kwargs)
    wrapper.tags = tags
    return wrapper
  return decorator

@tag('app_update_id', 'experimental')
def foo():
  pass

@tag('app_update_id', 'platform_team')
def bar():
  pass

print(foo.tags)
print(bar.tags)