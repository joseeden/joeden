from collections import namedtuple
from pprint import pprint

# Empty list
animals = []

# Source data as tuples
animal_data = [
    ("Buddy", "Dog", 4),
    ("Mittens", "Cat", 4),
    ("Goldie", "Fish", 0),
    ("Polly", "Parrot", 2),
    ("Slither", "Snake", 0),
    ("Speedy", "Turtle", 4),
]

# Create the namedtuple
Animal = namedtuple("Animal", ["name", "species", "legs"])

for name, species, legs in animal_data:
    animals.append(Animal(name, species, legs))

pprint(animals[:5])