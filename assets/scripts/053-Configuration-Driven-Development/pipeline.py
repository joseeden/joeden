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
