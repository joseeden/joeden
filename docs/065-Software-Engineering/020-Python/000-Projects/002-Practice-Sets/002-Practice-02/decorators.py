import time

def timer(func):

    """
    A decorator that prints how long a function took to run.

    Args:
      func (callable): The function being decorated.add()

    Returns:
      callable: The decorated function.
    """

    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        total = time.time() - start
        print("{} took {} seconds".format(func.__name__, total))
        return result
    return wrapper


@timer
def sleep_in_seconds(n):
    time.sleep(n)

sleep_in_seconds(10)
