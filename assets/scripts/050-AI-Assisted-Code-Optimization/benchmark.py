# benchmark.py
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

for i in range(100000):
    _ = orders.get(i)

end = time.time()

print("Dictionary version:", end - start)
