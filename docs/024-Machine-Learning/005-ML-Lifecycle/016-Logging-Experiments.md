---
title: "Logging Experiments"
description: "Logging Experiments in MLFlow"
tags: 
- Machine Learning
- MLOps
sidebar_position: 16
last_update:
  date: 5/17/2023
---

## Logging Experiments with MLflow  

MLflow is a tool for managing the machine learning lifecycle. It helps track experiments, compare models, and ensure reproducibility.

- Log parameters, metrics, and results.
- Makes the process more organized and manageable.
- Use a web UI to compare different experiment outcomes.

## Create an Experiment

To start, set the experiment name using `mlflow.set_experiment()`. This defines a workspace to store all experiments for a specific project.

```python
import mlflow 

# Set experiment name 
mlflow.set_experiment("Health Stats Classification")
```

## Run an Experiment

Once the experiment is set, we can start a new run using `mlflow.start_run()`. This represents a single execution of the code. We can log parameters and metrics during this run.

- **Log Parameters** – Use `mlflow.log_param()` to log any model parameter.
- **Log Metrics** – Use `mlflow.log_metric()` to track model performance.

Each run is linked to the active experiment. We can call `mlflow` methods multiple times during a run to log various metrics or record the same metric more than once.

```python
# Start new run 
with mlflow.start_run():
  logistical_model = LogisticRegression()

  # Log paramenter and model performance
  mlflow.log_param("n_estimators", logistic_model.n_estimators)
  mlflow.log_metric("accuracy", logistic_model.accuracy)

  # Print metrics 
  print("Model accuracy: %.3f" % accuracy)
```

Sample output:

```python
Model accuracy: 0.94
```

## Retrieve Experiments

Fetch experiment data by using `mlflow.get_run(run_id)` or get data for multiple runs with `mlflow.search_runs()`. This returns all parameters, metrics, and tags in a pandas DataFrame.

```python
# Fetch run data 
run_data = mlflow.get_run(run_id)
print(run_data.data.params)
print(run_data.data.metrics)

# Search all runs 
exp_id = run_data.info.experiment_id
runs_df = mlflow.search_runs(exp_id)
```

Sample output:

```python
{'epochs': '30', 'accuracy': 0.94} 
```

## MLflow UI

MLflow’s web UI allows you to compare experiments, sort and filter runs, and view detailed information. This helps identify the best-performing models.

- Compare experiments by viewing multiple runs side by side
- View detailed metrics, parameters, and other run information
- Manage all experiments in one centralized location
- Streamline your workflow and identify successful models