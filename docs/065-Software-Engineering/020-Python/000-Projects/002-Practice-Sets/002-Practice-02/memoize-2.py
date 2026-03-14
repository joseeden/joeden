import time

def memoize(func):
    """
    Store the results of the decorated function for a fast lookup
    """

    cache = {}

    def wrapper(*args, **kwargs):
        kwargs_key = tuple(sorted(kwargs.items()))
        if (args, kwargs_key) not in cache:
            cache[(args, kwargs_key)] = func(*args, **kwargs)
        return cache[(args, kwargs_key)]
    return wrapper

@memoize
def slow_sum(a, b):
    time.sleep(5)
    return a + b

print(slow_sum(6, 2))  # Takes 5 seconds
print(slow_sum(a=6, b=2))  # Returns immediately