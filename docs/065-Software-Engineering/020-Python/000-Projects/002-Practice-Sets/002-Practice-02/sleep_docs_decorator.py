from functools import wraps
import time

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print("Elapsed: ", (end - start))
        return result
    return wrapper

@timer
def sleep_in_seconds(n):
    """Pause execution for n seconds"""
    time.sleep(n)

print(sleep_in_seconds.__doc__)
print(sleep_in_seconds.__name__)

original_func = sleep_in_seconds.__wrapped__
print(original_func.__name__)


print("original function executed without timer")

original_func(2)