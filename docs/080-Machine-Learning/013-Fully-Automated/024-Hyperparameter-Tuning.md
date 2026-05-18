---
title: "Hyperparameter Tuning"
description: "Hyperparameter Tuning"
tags: 
- Machine Learning
- MLOps
sidebar_position: 24
last_update:
  date: 5/15/2023
---


## Overview

**Hyperparameters** are values set before training starts and they control how a model learns. They have a strong impact on model performance, so they need to be chosen carefully. 

- Set before training begins
- Control how the model learns
- Strongly affect model performance

Examples include:

- Learning rate
- Number of layers in neural networks
- Tree depth or number of branches in decision trees
- Model architecture choices

:::info 

Unlike model parameters such as weights and biases, hyperparameters are not learned from data during training.

::: 

**Hyperparameter tuning** improves model performance by testing different parameter combinations. It is usually one of the first steps in model optimization because it helps identify the most effective setup for training.

- Improves model performance through experimentation
- Searches parameter space and evaluates multiple configurations
- Focuses on settings like learning rate, depth, or number of layers

This process helps ensure the model is trained under the most effective conditions before it is passed to the training stage. This separates experimentation from final model training while still keeping them connected.

## Training Code Adjustments

Instead of hardcoding values, training scripts can load parameters from a file. This allows tuning jobs to update configuration without changing training code.

- Parameters are externalized into files
- Training script consumes config
- Model behavior changes dynamically

This makes training more flexible and reusable.

## Hyperparameter Tuning Methods

Different strategies are used depending on compute budget and search complexity.

- Grid Search
- Random Search
- Bayesian Search

### Grid Search 

Grid search exhaustively tests all combinations of predefined hyperparameter values.It is often combined with cross-validation to ensure stable evaluation.

- Defines a fixed search space (e.g., learning rate, depth, etc.)
- Tries every possible combination
- Uses cross-validation for evaluation
- Computationally expensive but reliable

Each configuration is evaluated using k-fold cross-validation:

- The dataset is split into `k` folds
- The model is trained on `k-1` folds and validated on the remaining fold
- Process is repeated `k` times, each time using a different validation fold
- The final score is computed as the average across all folds

This makes grid search robust but computationally expensive for large search spaces.

**Example:**

In the example below, we use 5-fold cross-validation (`cv=5`) to evaluate all hyperparameter combinations. The best configuration is then saved for use in the training stage.

```python
import json
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

# Load hyperparameter search space
with open("config/parameters.json", "r") as f:
    param_grid = json.load(f)

# Define model
model = RandomForestClassifier()

# Grid search with 5-fold cross-validation
grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=5)
grid_search.fit(X_train, y_train)

# Save best hyperparameters for training stage
best_params = grid_search.best_params_

with open("config/best_parameters.json", "w") as f:
    json.dump(best_params, f)
```

### Random Search 

Random search samples hyperparameter combinations randomly from the search space.

- Randomly selects configurations instead of trying all combinations
- More efficient than grid search in large search spaces
- Can discover good configurations faster
- May miss optimal combinations due to randomness

Unlike grid search, it does not guarantee coverage of all parameter combinations, but it is often more practical when the search space is large or continuous.

**Example:**

Here, `RandomizedSearchCV` samples a fixed number of hyperparameter combinations (`n_iter=20`) and evaluates each using 5-fold cross-validation. The best-performing configuration is then selected.

```python
from sklearn.model_selection import RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier()

random_search = RandomizedSearchCV(
    estimator=model,
    param_distributions=param_grid,
    n_iter=20,
    cv=5,
    random_state=42
)

random_search.fit(X_train, y_train)
best_params = random_search.best_params_
```

### Bayesian Search 

Bayesian optimization uses past evaluation results to guide future hyperparameter selection.

- Builds a probabilistic model of performance
- Chooses next parameters based on expected improvement
- Learns from previous trials
- More efficient in high-cost training scenarios

Instead of blindly sampling, it focuses on promising regions of the search space, making it ideal for expensive training workflows.

**Example (Optuna-style):**

In the example below, Optuna is used to perform Bayesian optimization. The search process learns from previous trials and progressively selects better hyperparameter combinations to maximize model performance under 5-fold cross-validation.

```python
import optuna
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

def objective(trial):
    n_estimators = trial.suggest_int("n_estimators", 50, 200)
    max_depth = trial.suggest_int("max_depth", 3, 20)

    model = RandomForestClassifier(
        n_estimators=n_estimators,
        max_depth=max_depth
    )

    score = cross_val_score(model, X_train, y_train, cv=5).mean()
    return score

study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=30)

best_params = study.best_params 
```

## Automated Hyperparameter Tuning

Manually finding the best hyperparameter combination is time-consuming. Automating this process helps find the best set of hyperparameters efficiently.

- Saves time and effort
- Leads to better-performing models
- Ensures optimal hyperparameter selection

## Steps for Automated Tuning

These steps guide the automated tuning process to find the best model parameters.

1. Define hyperparameters to tune
2. Set search space (discrete values or ranges)
3. Choose a performance metric (e.g., recall, precision)
4. Set stopping criteria (e.g., maximum trials)

<div class="img-center"> 

![](/img/docs/all-things-data-Page-34a.png)

</div>

## Environment Symmetry

Consistent settings across environments lead to reliable model performance.

- Ensures model behaves consistently across environments
- Prevents unexpected behavior when deploying models

## Tracking Experiments

Automated tracking logs all tuning details to help manage experiments.

- Automate tracking of hyperparameter experiments
- Record all hyperparameter combinations explored
- Store metadata for later reference

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-20-202643.png)

</div>


## Hyperparameter Visualization

Visualization helps in interpreting the effects of hyperparameter changes.

- Understand the impacts of different hyperparameters
- Helps analyze performance variations with different values


<div class="img-center"> 

![](/img/docs/all-things-data-Page-34b.png)

</div>
