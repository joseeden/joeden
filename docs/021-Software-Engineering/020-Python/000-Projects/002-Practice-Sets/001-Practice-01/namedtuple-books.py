from collections import namedtuple
from pprint import pprint

Book = namedtuple("Book", ["title", "author", "year"])

library_books = [
    ("Dune", "Frank Herbert", 1965),
    ("Neuromancer", "William Gibson", 1984),
    ("Harry Potter", "J.K. Rowling", 1997)
]

books_list = [Book(*book) for book in library_books]

for book in books_list[:3]:
    pprint((book.title, book.author, book.year))