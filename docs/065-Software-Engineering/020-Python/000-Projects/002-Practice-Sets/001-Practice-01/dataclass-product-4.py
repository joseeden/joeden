from dataclasses import dataclass 

@dataclass 
class Product:
    name: str 
    quantity: int
    unit_size: int

    @property 
    def total_items(self):
        return self.quantity * self.unit_size

box_1 = Product(
    name="Pen Box",
    quantity=3,
    unit_size=10
)    

print(box_1.total_items)