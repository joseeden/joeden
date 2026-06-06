# sample-anthropic-api-request.py
import os
import anthropic
from dotenv import load_dotenv

load_dotenv()

# Initialize the connection client
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# Send a message to the model
response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=150,
    messages=[
        {"role": "user", "content": "Write a one-sentence summary of cloud computing."}
    ]
)

# Extract text from the response object
clean_output = response.content[0].text
print(clean_output)
