from functools import wraps
import time

def check_everything(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result
    return wrapper

@check_everything
def duplicate(my_list):
    """Return a new list that repeats the input twice"""
    return my_list + my_list

#################### TEST CASES #################### 

# Measure decorated function
start = time.time()
duplicated_list = duplicate(list(range(50_000_000)))  # make it slow enough to see time
end = time.time()
decorated_time = end - start

# Measure undecorated function 
start = time.time()
duplicated_list = duplicate.__wrapped__(list(range(50_000_000))) # make it slow enough to see time
end = time.time()
undecorated_time = end - start

print('Decorated time: {:.5f}s'.format(decorated_time))
print('Undecorated time: {:.5f}s'.format(undecorated_time))