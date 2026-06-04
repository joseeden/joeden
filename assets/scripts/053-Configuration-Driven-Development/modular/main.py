# main.py

import yaml
from pipeline import run_pipeline

with open("config.yaml", "r") as file:
    config = yaml.safe_load(file)

result = run_pipeline(config)
print(result)
