from functools import wraps

"""
html-generator.py

This module is a flexible HTML decorator that wraps 
function outputs with any HTML tags.

Usage:
    python3 html-generator.py

Expected output:
<b>Hello Alice!</b>
<i>Goodbye Alice.</i>
<div>
<b>Hello Alice!</b>
<i>Goodbye Alice.</i>
</div>
"""

def html(open_tag, close_tag):
  def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
      msg = func(*args, **kwargs)
      return '{}{}{}'.format(open_tag, msg, close_tag)
    return wrapper
  return decorator

# Return bolded text
@html('<b>', '</b>')
def hello(name):
  return 'Hello {}!'.format(name)
print(hello('Alice'))

# Return italicized text
@html('<i>', '</i>')
def goodbye(name):
  return 'Goodbye {}.'.format(name)
print(goodbye('Alice'))

# Wrap with <div>
@html('<div>', '</div>')
def hello_goodbye(name):
  return '\n{}\n{}\n'.format(hello(name), goodbye(name))
print(hello_goodbye('Alice'))