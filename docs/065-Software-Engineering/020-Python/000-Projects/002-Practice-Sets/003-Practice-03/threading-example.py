import threading
import time


def take_orders():
    for i in range(1, 4):
        print(f"Taking order {i}...")
        time.sleep(1)  # Simulate time to take an order


def brew_tea():
    for i in range(1, 4):
        print(f"Brewing tea {i}...")
        time.sleep(2)  # Simulate time to brew tea


# Create threads
order_thread = threading.Thread(target=take_orders)
brew_thread = threading.Thread(target=brew_tea)

# Trigger threads
order_thread.start()
brew_thread.start()

# Wait for threads to finish
order_thread.join()
brew_thread.join()

print("All orders taken and brewed!")
