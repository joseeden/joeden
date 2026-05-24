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
