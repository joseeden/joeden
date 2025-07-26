import time

# Prompt user for expiration time in seconds
try:
    EXPIRATION_SECONDS = int(input("Enter the maximum expiration time in seconds: "))
except ValueError:
    print("Invalid input! Please enter a number.")
    exit(1)

# Generate iat and exp
iat = int(time.time())          # Current epoch time
exp = iat + EXPIRATION_SECONDS  # Expiration time

# Print iat and exp
print("\nGenerated Timestamps:")
print("iat (Issued At):", iat)
print("exp (Expiration):", exp)
