def run_n_times(n):
  def decorator(func): 
    def wrapper(*args, **kwargs):
      for i in range(n):
        func(*args, **kwargs)
    return wrapper
  return decorator 

@run_n_times (7)
def print_sum(a, b):
  print(a + b) 

@run_n_times (4)
def print_greeting(greet):
  print(greet)
  
print_sum(6, 9)
print_greeting("Hola!")

run_two_times = run_n_times(2)
run_three_times = run_n_times(3)

@run_two_times 
def print_greeting(greet):
  print(greet)
print_greeting("Obrigado!")

@run_three_times 
def print_greeting(greet):
  print(greet)
print_greeting("Salamat!")