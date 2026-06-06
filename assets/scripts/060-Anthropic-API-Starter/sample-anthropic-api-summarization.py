# sample-anthropic-api-summarization.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

text = """
To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles
And by opposing end them.
"""

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=120,
    system="You are a literary analyst. Summarize briefly and list key themes.",
    messages=[{"role": "user", "content": text}]
)

print(response.content[0].text)
