from dataclasses import dataclass 

@dataclass(frozen=True)
class Product:
  name: str 
  quantity: int 
  
box_2 = Product("Juice", 15)

box_2.quantity = 23