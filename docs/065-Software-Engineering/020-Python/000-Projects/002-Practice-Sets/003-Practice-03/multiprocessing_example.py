# multiprocessing_example.py
from multiprocessing import Process
import time


def brew_tea(name):
    print(f"Start brewing {name}")
    time.sleep(3)
    print(f"End brewing {name}")


if __name__ == "__main__":
    processes = []

    for i in range(3):
        p = Process(target=brew_tea, args=(f"tea-{i+1}",))
        processes.append(p)
        p.start()

    for p in processes:
        p.join()

    print("All tea served")
