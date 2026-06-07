from multiprocessing import Process
import time


def brew_tea(name):
    print(f"Start brewing {name}")
    time.sleep(2)
    print(f"End brewing {name}")


if __name__ == "__main__":
    processes = []

    # Start processes to brew tea
    for i in range(5):
        p = Process(target=brew_tea, args=(f"Tea {i + 1}",))
        processes.append(p)
        p.start()

    # Wait for all processes to finish
    for p in processes:
        p.join()

    print("All tea served!")
