def counter(func):
  def wrapper(*args, **kwargs):
    wrapper.count += 1
    return func(*args, **kwargs)
  wrapper.count = 0
  return wrapper

@counter 
def my_webapp_func_a():
  print('calling my_webapp_func_a()')
  
my_webapp_func_a()
my_webapp_func_a()

print('my_webapp_func_a() was called {} times.'.format(my_webapp_func_a.count))