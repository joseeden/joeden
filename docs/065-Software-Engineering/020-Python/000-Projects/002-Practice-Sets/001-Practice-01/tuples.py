top_pairs = [ ('Chips Ahoy', 'Treat'), 
              ('Oreo', 'Hide & Seek'), 
              ('Nilla', 'Oreo') ] 

# for us_cookie, in_cookie in top_pairs:
#     print(us_cookie, in_cookie)

for index, item in enumerate(top_pairs):
    us_cookie, in_cookie = item
    print(index, us_cookie, in_cookie)