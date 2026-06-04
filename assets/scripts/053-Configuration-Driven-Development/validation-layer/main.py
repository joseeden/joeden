# main.py

import yaml
from pipeline import run_pipeline
from validator import validate_config

with open("config.yaml", "r") as file:
    config = yaml.safe_load(file)

validate_config(config)
result = run_pipeline(config)
print(result)
