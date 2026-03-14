def print_return_type(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)

        # Convert args, kwargs to strings
        args_str = ",".join([str(a) for a in args])
        kwargs_str = ",".join([f"{k}={v}" for k, v in kwargs.items()])
        all_args = ",".join(filter(None, [args_str, kwargs_str]))

        print("{}({}) returned type: {}".format(
          func.__name__,
          all_args,
          type(result)
        ))
        return result
    return wrapper


@print_return_type
def my_func(value):
    return value


my_func(24)
my_func([16, 18, 31])
my_func({'Tom': 36})
