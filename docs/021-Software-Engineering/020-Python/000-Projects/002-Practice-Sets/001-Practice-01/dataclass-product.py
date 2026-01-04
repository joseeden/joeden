from dataclasses import dataclass

@dataclass
class Product:
    name: str
    quantity: int = 0

item = Product(name="Notebook")
print(item)