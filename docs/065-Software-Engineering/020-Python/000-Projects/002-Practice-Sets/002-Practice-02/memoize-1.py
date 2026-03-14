import time

def memoize(func):
    """
    Store the results of the decorated function for a fast lookup
    """

    cache = {}

    def wrapper(*args):
        if args in cache:
            return cache[args]
        result = func(*args)
        cache[args] = result
        return result
    return wrapper

@memoize
def slow_sum(a, b):
    time.sleep(5)
    return a + b

print(slow_sum(6, 2))  # Takes 5 seconds
print(slow_sum(6, 2))  # Returns immediately