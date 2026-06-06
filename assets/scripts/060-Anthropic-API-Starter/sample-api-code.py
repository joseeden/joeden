# sample-anthropic-api-code.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=200,
    messages=[{
        "role": "user",
        "content": (
            "Write a Python function to calculate the area of a circle. "
            "Include error handling for negative inputs. "
            "Return only the function code, no explanation."
        )
    }]
)

generated_code = response.content[0].text

# Save output to a separate Python file
with open("circle_area.py", "w") as f:
    f.write(generated_code)

print("Code saved to circle_area.py")
