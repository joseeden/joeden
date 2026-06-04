# validator.py

def validate_config(config):
    if "pipeline" not in config:
        raise ValueError("Missing pipeline section")

    pipeline = config["pipeline"]

    if "defaults" not in pipeline:
        raise ValueError("Missing defaults section")

    defaults = pipeline["defaults"]

    if not isinstance(defaults["retries"], int):
        raise ValueError("retries must be an integer")

    return True
