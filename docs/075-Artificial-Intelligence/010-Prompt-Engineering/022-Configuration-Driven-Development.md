---
title: "Configuration-Driven Development"
description: "Making systems flexible with configuration files"
tags:
- Artificial Intelligence
- Machine Learning
- Prompt Engineering
sidebar_position: 22
# last_update:
#   date: 7/15/2023
--- 

## Overview

**Configuration-driven development** is an approach where application logic stays in code while runtime behavior is controlled through external configuration files. 

- Code defines what the system does
- Configuration defines how it behaves

In this model, application code handles execution logic, while configuration files control parameters such as retries, timeouts, or feature toggles. This makes systems easier to maintain, update, and extend.

**Where does AI fit in?**

AI can further enhance configuration-driven development in several ways. It can assist in:

-  Design configuration structures
-  Validate schemas
-  Suggest safe migration strategies during system changes




## Sample Codebase

For this lab, we'll use a simple project that simulates a configurable execution pipeline. It does not do heavy computation, but it demonstrates this engineering pattern:

> Running the same logic while changing behavior through configuration instead of code changes.

Examples in real systems:

- Data pipelines (ETL jobs in analytics systems)
- CI/CD pipelines (build, test, deploy steps)
- ML training pipelines (hyperparameters, retries, datasets)
- Background job workers (queue processing systems)

In all of these, the core logic stays stable, but behavior changes frequently.

The code files can be found here: Github

- `pipeline.py` contains the core logic

    The pipeline contains only execution logic and reads all variable settings from configuration.

    <details>
      <summary> See code </summary>
    
        ```python 
        # pipeline.py

        import time

        def run_pipeline(config):
            name = config["pipeline"]["name"]
            retries = config["pipeline"]["retries"]

            print(f"Starting pipeline: {name}")

            for attempt in range(retries):
                print(f"Running attempt", attempt + 1)
                time.sleep(1)

            print("Pipeline completed successfully")

            return {"status": "success", "pipeline": name}
        ```

    </details>

    The goal is to avoid hardcoding values so behavior can be changed externally


- `config.yaml` defines runtime settings

    The configuration defines runtime behavior without touching code.

    <details>
      <summary> See code </summary>
    
        ```yaml 
        pipeline:
            name: tourism_pipeline
            retries: 3
            timeout: 120
        ```
    </details>



- `main.py` runs the application

    The entry point loads configuration and passes it into the pipeline.

    This cleanly separates execution from configuration.

    <details>
      <summary> See code </summary>

        ```python 
        # main.py

        import yaml
        from pipeline import run_pipeline

        with open("config.yaml", "r") as file:
            config = yaml.safe_load(file)

        result = run_pipeline(config)
        print(result)
        ```
        
    </details>

Before running the code, create a Python virtual environment and activate it.

```bash
python3 -m venv ~/venv  
source ~/venv/bin/activate
```

Install the required dependencies.

```bash
pip install pyyaml
```

Now run the program.

```bash
python main.py
```

Output:

```
Starting pipeline: tourism_pipeline
Running attempt 1
Running attempt 2
Running attempt 3
Pipeline completed successfully
{'status': 'success', 'pipeline': 'tourism_pipeline'}
```

The program prints the pipeline execution steps, then returns a final result dictionary. 


## Using AI to Design the Configuration Approach

AI can help define what should be configurable versus what should remain in code.

Sample prompt: 

You are a software architect designing a configuration-driven pipeline system. 

Given this pipeline code, identify which parameters should be moved into configuration and propose a clean modular config structure with validation rules.

Include the following:

- Suggested module boundaries for config vs code
- Recommended parameter grouping in config files
- Validation strategy to ensure config safety
- Minimal example config structure

AI typically responds with:

- Suggested config structure
- Recommended parameter grouping
- Validation strategy for safety

This helps avoid over-configuring or under-configuring the system.

## AI-assisted config strategy generation

Instead of guessing architecture, AI can propose a full configuration strategy.

Sample prompt: 

“Design a configuration-driven architecture for this pipeline. Keep logic in code but externalize all tunable parameters and include validation rules.”

This usually results in:

- Clear separation of logic and config
- Defined schema for config files
- Validation rules for safety

This makes the system easier to implement correctly from the start.

## Choosing a config format

Selecting a config format affects readability, tooling, and long-term maintainability.

- Impacts how easily teams can edit configs
- Affects validation and schema tooling
- Influences integration with CI/CD systems

Sample prompt: 

“Compare YAML, JSON, and TOML for a Python pipeline system and recommend the best option based on readability, tooling, and validation support.”

In most pipeline systems, YAML is commonly chosen due to readability and structure support.

## Configuration validation (AI-assisted improvement)

Configuration systems fail when values drift or become inconsistent. AI can help detect these issues.

Sample prompt: 

“Here is my config and schema. Identify mismatches, missing validations, and risky type assumptions.”

Validation ensures:

- Required fields exist
- Data types are correct
- Structure stays consistent

This prevents runtime failures caused by bad configuration.

## Preventing configuration drift

Configuration drift happens when different parts of a system evolve inconsistently.

Common issues include:

- Renamed keys not updated everywhere
- Wrong data types introduced
- Missing fields in new environments

A validation layer ensures all environments follow the same structure.

## Configuration validation layer

We add a validator to ensure config correctness before execution.

```python id="p1val"
# validator.py

def validate_config(config):
    if "pipeline" not in config:
        raise ValueError("Missing pipeline section")

    pipeline = config["pipeline"]

    if not isinstance(pipeline["retries"], int):
        raise ValueError("retries must be an integer")

    return True
```

This protects the pipeline from invalid configuration inputs.

## Updated execution with validation

We validate config before running the pipeline.

```python id="p1main2"
# main.py

import yaml
from pipeline import run_pipeline
from validator import validate_config

with open("config.yaml", "r") as file:
    config = yaml.safe_load(file)

validate_config(config)

result = run_pipeline(config)
print(result)
```

This ensures only valid configurations are executed.

## CI/CD integration for config safety

Configuration changes should be treated like production code. CI/CD can enforce validation automatically.

```yaml id="p1ci"
steps:
  - name: validate config
    run: python validator.py
```

This prevents invalid configuration changes from reaching production.

## Final idea

Configuration-driven development separates logic, configuration, and validation into clear layers. With AI assistance, we can design better config structures, validate them automatically, and reduce mistakes across the system while keeping everything flexible and maintainable.
