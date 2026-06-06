
```python
import anthropic
import math


def calculate_circle_area(radius: float) -> float:
    """
    Calculate the area of a circle using Claude as an AI backbone for validation.
    
    Args:
        radius: The radius of the circle
        
    Returns:
        The area of the circle
        
    Raises:
        ValueError: If radius is negative or not a valid number
    """
    # Validate input using Claude
    client = anthropic.Anthropic()
    
    # First, check if radius is a valid number
    try:
        radius = float(radius)
    except (TypeError, ValueError):
        raise ValueError(f"Radius must be a valid number, got {type(radius).__name__}")
    
    # Use Claude to validate the input and provide context
    message = client.messages.create(
        