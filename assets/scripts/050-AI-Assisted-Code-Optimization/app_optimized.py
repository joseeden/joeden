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
