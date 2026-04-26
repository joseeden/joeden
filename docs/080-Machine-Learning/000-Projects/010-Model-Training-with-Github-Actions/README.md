---
title: "Model Training with Github Actions"
description: "Integrating model training into a CI/CD pipeline using Github Actions."
tags: 
- Machine Learning
- Github Actions
sidebar_position: 1
last_update:
  date: 8/15/2023
---


## Overview

This project demonstrates how to integrate model training into a CI/CD pipeline using GitHub Actions. By automating the training process, we can ensure that every code change is tested and validated before merging.

- Automate training on pull requests
- Track model performance automatically
- Share results directly in GitHub

This page covers the dataset, modeling workflow, and how to set up GitHub Actions with CML for automated training and reporting. 

:::info 

To see the actual code and files, please check out the Github repo here: [Model Training with Github Actions](https://github.com/joseeden/ML-Model-Training-with-Github-Actions)

:::


## Dataset

We use a weather dataset to predict whether it will rain the next day. It contains records from different locations in Australia and is commonly used for classification tasks.

The dataset includes features such as:

- Location
- Wind direction
- Rainfall
- Temperature.

The goal is to predict a simple yes or no outcome for rain.

## Modeling Workflow

The model follows a simple pipeline from raw data to evaluation.

1. Convert categorical to numerical
2. Handle missing values
3. Scale the features
4. Train the model
5. Evaluate results

Each step prepares the data so the model can learn properly and produce reliable predictions.

**Note**: This is a basic workflow. In practice, you may need to add more steps like feature engineering or hyperparameter tuning for better performance.


## Modeling Concepts

### Preparing the Data

Before training, the dataset must be transformed into a format suitable for machine learning using the following steps:

- Target encoding for categorical features
- Imputation for missing values
- Feature scaling for numerical stability

Categorical features are encoded into numerical values using **target encoding**, where each category is replaced with the average value of the target variable.

- Useful for features with many unique values
- Avoids creating too many columns
- Works well for high-cardinality data

For example, if "Location" is a feature, each location is replaced with the average rain outcome for that location. This keeps the data compact and useful.

Missing values are then handled through **imputation**, where numerical fields are filled using the mean. After that, **feature scaling** is applied to standardize the data so all features have a similar range. This helps improve model performance and stability.

- Data is scaled to zero mean and unit variance
- Prevents features with larger ranges from dominating the model
- Improves convergence during training

In practice, these steps are often combined into reusable preprocessing functions:

```python
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler

def impute_and_scale_data(X):
    imputer = SimpleImputer(strategy="mean")
    scaler = StandardScaler()
    
    X_imputed = imputer.fit_transform(X)
    X_scaled = scaler.fit_transform(X_imputed)
    
    return X_scaled
```

This ensures all features are complete and on the same scale before training.



### Training the Model

Finally, the dataset is split into two sets: 

- Training dataset
- Testing dataset

The model is trained on the training data using a Random Forest classifier, which is effective for handling different feature types and reducing overfitting.

In the example below, `X` is features and `y` is the target.

```python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier()
model.fit(X_train, y_train)
``` 

### Evaluating the Model 

To get a comprehensive view of model performance, we report the standard metrics such as accuracy, precision, recall, and F1 score.

- **Accuracy** shows overall correctness
- **Precision** shows correctness of positive predictions
- **Recall** shows how many positives were found
- **F1 score** balances precision and recall

In the example below, `model`, `X_test`, and `y_test` are used to compute metrics.

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

y_pred = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred))
print("Recall:", recall_score(y_test, y_pred))
print("F1 Score:", f1_score(y_test, y_pred))
```

Expected output will look like:

```text
Accuracy: 0.85
Precision: 0.83
Recall: 0.81
F1 Score: 0.82
``` 

These metrics give a complete view of model performance.

### Confusion Matrix

In this step, predictions are visualized using a confusion matrix.

- Shows correct and incorrect predictions
- Helps understand model errors
- Displays counts of predictions

In the example below, `y_test` and `y_pred` are used to create the plot.

```python
from sklearn.metrics import ConfusionMatrixDisplay
import matplotlib.pyplot as plt

ConfusionMatrixDisplay.from_predictions(y_test, y_pred)
plt.show()
```

The diagonal represents correct predictions, which makes it easier to assess overall model performance and identify where mistakes occur.

## Project Description 

Model training is automated using GitHub Actions and runs whenever a pull request is created from a feature branch to main.

- Trigger training on pull request
- Run full training pipeline
- Report results in pull request

We use **Continuous Machine Learning (CML)** to handle training, evaluation, and reporting inside the CI environment.

- Run training inside CI
- Generate metrics and visual reports
- Post results as comments in pull request

CML provisions the environment, runs the training code, evaluates the model, and shares results automatically in the pull request so changes can be reviewed before merging.

<div class='img-center'>

![](/img/docs/all-things-ml-model-training-with-gh-actions.png)

</div>

In the example below, the GitHub Actions workflow uses `setup-cml` and runs the training script `train.py`.

```yaml
name: train-model

on:
  pull_request:

jobs:
  train:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: iterative/setup-cml@v1
      - name: Train model
        run: python train.py
```

This workflow runs automatically on every pull request and executes the model training pipeline.

After training, CML reads the output files and posts the results back to the pull request. In this example, `results.txt` contains metrics and `plot.png` contains a visualization.

```bash
echo "## Model Results" > report.md
cat results.txt >> report.md
echo "![Confusion Matrix](plot.png)" >> report.md

cml comment create report.md
```

This creates a comment in the pull request with metrics and plots.

- Model is trained automatically
- Metrics are calculated
- Results appear in pull request

This setup makes model training consistent, visible, and easy to review before merging changes.

### Prerequisites 

To follow along with the project, you need:

1. [Install Python 3.8 or higher.](https://www.python.org/downloads/)

    For Ubuntu, you can install Python 3.10 using the following command:

    ```bash
    sudo apt update
    sudo apt install -y python3.10
    sudo apt install -y python3.10-venv 
    ```

2. [Create a GitHub account.](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github) 


### Clone the repository 

To get started, clone the repository to your local machine. This will give you access to the code and files needed for the project.

```bash
git clone
```

Then navigate to the project directory:

```bash
cd 010-Model-Training-with-Github-Actions
```

Project structure:

```
010-Model-Training-with-Github-Actions
├── README.md
├── outputs/
├── processed_dataset/
├── raw_dataset/
│   └── weather.csv
├── requirements.txt
└── scripts/
    ├── metrics_and_plots.py
    ├── model.py
    ├── preprocess_dataset.py
    ├── train.py
    └── utils_and_constants.py
```

### Create a Python Virtual Environment 

As best practice, create a Python virtual environment to manage dependencies for the project. This ensures that the required libraries are installed and isolated from other projects.

Windows:

```bash
python -m venv venv
venv\Scripts\activate 
```

macOS/Linux:

```bash
python3 -m venv venv
source venv/bin/activate 
```

Then install your packages:

```bash
pip install -r requirements.txt
```


### Data Preprocessing 

Before training the model, we must preprocess the dataset. The `preprocess_dataset.py` script contains helper functions to clean and transform the raw data. 

```bash
python3 scripts/preprocess_dataset.py
```

This will create the processed dataset file in the `/processed_dataset` directory. This will be used by the training script to train the model (next step).

```bash
processed_dataset/
└── weather.csv 
```

### Train the Classification Model

> **Note:** Always run the preprocessing step before training. If you skip preprocessing or run training first, the model may fail or use outdated data, and `metrics.json` may not reflect the correct results.

Once preprocessing is complete and the processed dataset exists, we can train the model using `train.py`. This script loads the processed data, splits it into training and test sets, trains the model, evaluates it, and saves the results.

```bash
python3 scripts/train.py
```

Output:

```bash
====================Test Set Metrics==================
{
  "accuracy": 0.9378,
  "precision": 0.994,
  "recall": 0.7292,
  "f1_score": 0.8412
}
======================================================
```

The script will also generates `metrics.json` with the latest evaluation metrics and create a confusion matrix plot (e.g., `confusion_matrix.png`) in the `outputs` directory.

```bash
outputs/
├── confusion_matrix.png
└── metrics.json
...
```

The confusion matrix shows the number of true positives, true negatives, false positives, and false negatives. This helps you better understand how the model is performing.

<div class='img-center'>

![](/img/docs/confusion_matrix.png)

</div>

In some cases, the model may use a prediction threshold that is too high. This can make it more conservative when predicting positive outcomes. Lowering the threshold can improve recall, but it may reduce precision.


### Setup Model Training using CML

In this step, we will use CML with GitHub Actions to train a Random Forest classifier that predicts rainfall. CML helps automate training, evaluation, and reporting for machine learning workflows.

Training is triggered when a pull request is opened against the main branch. The workflow uses the same weather dataset, and the `preprocess_dataset.p`y script prepares the data as before.

After running `train.py`, the process produces a `metrics.json` file with evaluation metrics and a `confusion_matrix.png` file that shows the confusion matrix.

```yaml
name: model-training

on:
  pull_request:
    branches: main

permissions: write-all

jobs:
  train_and_report_eval_performance:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 
        uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: 3.9

      # Setup CML GitHub Action
      - name: Setup CML
        uses: iterative/setup-cml@v1
          
      - name: Train model
        run: |
          python3 preprocess_dataset.py
          python3 train.py

      - name: Write CML report
        env:
          REPO_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Add metrics data to markdown
          cat metrics.json >> model_eval_report.md
          
          # Add confusion matrix plot to markdown
          echo "![confusion matrix plot](./confusion_matrix.png)" >> model_eval_report.md

          # Create comment from markdown report
          cml comment create model_eval_report.md
```

Each time the workflow runs, it updates the existing comment instead of creating a new one. This keeps the pull request clean and ensures that only the latest results are shown.