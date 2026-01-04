from dataclasses import dataclass, asdict, astuple

@dataclass
class Product:
    name: str
    quantity: int = 0

item = Product(name="Notebook", quantity=5)

print(asdict(item))
print(astuple(item))