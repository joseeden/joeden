import datetime

# Get the current UTC time in RFC 1123 format
current_date = datetime.datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')
print(current_date)
