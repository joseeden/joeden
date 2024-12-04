import time
import jwt  # Install with `pip install pyjwt`

# Prompt user for inputs
try:
    EXPIRATION_SECONDS = int(input("Enter the maximum expiration time in seconds: "))
except ValueError:
    print("Invalid input! Please enter a valid number for expiration time.")
    exit(1)

SECRET_KEY = input("Enter the secret key: ")
if not SECRET_KEY:
    print("Secret key cannot be empty.")
    exit(1)

ISSUER = input("Enter the issuer: ")
if not ISSUER:
    print("Issuer cannot be empty.")
    exit(1)

# Generate iat and exp
iat = int(time.time())          # Current epoch time
exp = iat + EXPIRATION_SECONDS  # Expiration time

payload = {
    "iat": iat,
    "exp": exp,
    "iss": ISSUER
}

# Generate JWT token
token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

if isinstance(token, bytes):
    token = token.decode('utf-8')


print("---------------------------------")
print("Generated Timestamps:")
print("iat (Issued At):", iat)
print("exp (Expiration):", exp)
print("---------------------------------")
print("Generated JWT Token:")
print(token)

