# sample-api-temperature.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=100,
    temperature=0.2,
    top_p=0.3,
    messages=[{
        "role": "user",
        "content": "Generate a database connection string template."
    }]
)

print(response.content[0].text)
