---
title: "AI-assisted Code Optimization"
description: "AI-assisted techniques for improving performance of applications"
tags:
- Artificial Intelligence
- Machine Learning
- Prompt Engineering
sidebar_position: 18
# last_update:
#   date: 7/15/2023
--- 


## Overview

AI can help find slow parts of code and improve data structures. This makes applications faster and easier to scale. We can use AI to: 

1. Profile code to find slow functions
2. Explain bottlenecks
3. Review data structures for scalability
4. Benchmark changes to confirm improvements

For the rest of this page, we will use a simple order tracking program as an example to see how performance problems appear in real code. 

See the scripts here: [Github](https://github.com/joseeden/joeden/tree/master/assets/scripts/050-AI-Assisted-Code-Optimization)

```python 
## app.py 
import time

class OrderSystem:
    def __init__(self):
        self.orders = []  # simple list storage (slow for lookups)

    def add_order(self, order_id, status):
        self.orders.append((order_id, status))

    def find_order(self, order_id):
        for o in self.orders:
            if o[0] == order_id:
                return o
        return None

    def update_status(self, order_id, status):
        for i, o in enumerate(self.orders):
            if o[0] == order_id:
                self.orders[i] = (order_id, status)

def process_orders(system, n):
    for i in range(n):
        system.add_order(i, "pending")

    for i in range(n):
        system.find_order(i)

    for i in range(n):
        system.update_status(i, "done")


if __name__ == "__main__":
    system = OrderSystem()
    process_orders(system, 5000)
    print("Done processing orders")
```

**Note:** This program is intentionally inefficient to show how to find and fix performance issues. To run the program, save it as `app.py` and execute it with Python.

```bash
python3 app.py 
```

Output:

```text
Done processing orders
```

While it seems like its just printing "Done processing orders", the program is actually doing a lot of work behind the scenes. It adds 5000 orders, searches for each order, and updates their status.

<!-- **Current issue:** All operations depend on scanning the entire list, which becomes slow as data grows. -->

## Profiling the Program with cProfile

`cProfile` measures how much CPU time is spent inside Python functions. It shows which functions run, how often they run, and how long they take.

It can used to: 

- Find slow/expensive functions
- Track execution time
- Help locate bottlenecks

In this case, we profile `app.py`.

```bash 
python3 -m cProfile app.py
```

Output:

```bash
Done processing orders
         20008 function calls in 3.330 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    3.330    3.330 app.py:1(<module>)
     5000    0.812    0.000    0.812    0.000 app.py:11(find_order)
     5000    2.502    0.001    2.502    0.001 app.py:17(update_status)
        1    0.011    0.011    3.330    3.330 app.py:22(process_orders)
        1    0.000    0.000    0.000    0.000 app.py:4(OrderSystem)
        1    0.000    0.000    0.000    0.000 app.py:5(__init__)
     5000    0.005    0.000    0.005    0.000 app.py:8(add_order)
        1    0.000    0.000    0.000    0.000 {built-in method builtins.__build_class__}
        1    0.000    0.000    3.330    3.330 {built-in method builtins.exec}
        1    0.000    0.000    0.000    0.000 {built-in method builtins.print}
     5000    0.001    0.000    0.001    0.000 {method 'append' of 'list' objects}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
```

Notes:

- `ncalls` = how many times the function was called
- `tottime` = time spent inside the function itself
- `percall` = average time per function call
- `cumtime` = total time including sub-functions

Zooming in on the `find_order` function, we see it is called 5000 times and takes a total of 0.812 seconds. This is a significant portion of the total time.

```bash
ncalls  tottime  percall  cumtime  percall filename:lineno(function)
    1     0.000    0.000    3.330    3.330 app.py:1(<module>)
  5000    0.812    0.000    0.812    0.000 app.py:11(find_order)
  5000    2.502    0.001    2.502    0.001 app.py:17(update_status)
```

Checking the Python code, we see that this function scans the full list every time to find an order. This means that as the number of orders increases, the time taken will grow significantly.

- Order 1 scans a small list
- Order 5 scans a larger list
- Order 10 scans an even larger list
- Order 5000 scans almost the whole list

## Improving the Data Structure

The profiling results show that most of the time is spent searching and updating orders stored in a list. This happens because each operation requires scanning the entire dataset. This suggests the current structure is not suitable for fast access.

We can use AI to confirm the bottleneck and suggest a better approach based on the profiling results.

Prompt:

> Review this code and identify performance bottlenecks. Suggest a better data structure for faster lookups and updates, and explain why it improves performance.

AI typically suggests switching from a list to a dictionary for constant-time access. If the AI confirms this, we can proceed with the implementation.

Update the `OrderSystem` class to use a dictionary:

```python id="order_system_dict"
class OrderSystem:
    def __init__(self):
        self.orders = {}  # dictionary for fast lookup

    def add_order(self, order_id, status):
        self.orders[order_id] = status

    def find_order(self, order_id):
        return self.orders.get(order_id)

    def update_status(self, order_id, status):
        if order_id in self.orders:
            self.orders[order_id] = status
```

This change removes the need to scan through all orders for every operation.

For reference, we duplicated the file and made the changes in `app_optimized.py` to keep the original for comparison.

<details>
  <summary> See full code </summary>

    ```python
    # app.py
    import time

    class OrderSystem:
        def __init__(self):
            self.orders = {}

        def add_order(self, order_id, status):
            self.orders[order_id] = status

        def find_order(self, order_id):
            return self.orders.get(order_id)

        def update_status(self, order_id, status):
            if order_id in self.orders:
                self.orders[order_id] = status

    def process_orders(system, n):
        for i in range(n):
            system.add_order(i, "pending")

        for i in range(n):
            system.find_order(i)

        for i in range(n):
            system.update_status(i, "done")

    if __name__ == "__main__":
        system = OrderSystem()
        process_orders(system, 5000)
        print("Done processing orders")
      
    ```
 
</details>

Running `cProfile` on the optimized version will show a significant reduction in time spent on both `find_order` and `update_status`:

```bash
$ python3 -m cProfile app_optimized.py 

ncalls  tottime  percall  cumtime  percall filename:lineno(function)
    1    0.000    0.000    0.010    0.010 app_optimized.py:1(<module>)
  5000    0.001    0.000    0.002    0.000 app_optimized.py:12(find_order)
  5000    0.001    0.000    0.001    0.000 app_optimized.py:15(update_status)
```

## Benchmarking the Improvement

After changing the data structure, we can benchmark the new version to see the performance improvement. To do this accurately, we can create a `benchmark.py` which uses the `time` module to measure how long the operations take in both versions.

**Note:** Benchmarks are typically optional. A separate benchmark is usually added when developers want more controlled performance testing. 

In this example, the benchmark will simply test the lookup speed without running the full application workflow.

```python 
## benchmark.py 
import time

# slow version (list scan)
orders = [(i, "pending") for i in range(100000)]
start = time.time()

for i in range(10000):
    for o in orders:
        if o[0] == i:
            break

end = time.time()

print("List version:", end - start)


# fast version (dictionary lookup)
orders = {i: "pending" for i in range(100000)}
start = time.time()

for i in range(10000):
    _ = orders.get(i)

end = time.time()

print("Dictionary version:", end - start)
```

Run the benchmark:

```bash
python3 benchmark.py
```

Output:

```text 
List version: 4.348643779754639
Dictionary version: 0.015194892883300781
```

The list version is slower because every lookup scans items one by one.

The dictionary version is faster because it uses the index to directly access the order, regardless of how many orders there are.

