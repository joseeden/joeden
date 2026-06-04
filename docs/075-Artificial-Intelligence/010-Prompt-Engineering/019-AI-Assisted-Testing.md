---
title: "AI-assisted Testing"
description: "AI-assisted techniques for improving software testing"
tags:
- Artificial Intelligence
- Machine Learning
- Prompt Engineering
sidebar_position: 19
# last_update:
#   date: 7/15/2023
--- 

## Overview

AI can speed up testing by finding missing cases and weak areas in a codebase. It is especially useful when the system is large or unfamiliar.

It can: 

- Find missing test paths
- Detect edge cases early
- Highlight weak test coverage

For this page, we will use a simple task tracking system as an example to see how AI can help improve testing. 

<!-- This program stores tasks and their statuses, but has limited tests and coverage. -->

See the scripts here: [Github](https://github.com/joseeden/joeden/tree/master/assets/scripts/051-AI-Assisted-Testing)

Project structure:

```
project/
├── initial
│   ├── app.py
│   ├── task_store.py
```

`task_store.py` contains the main class that manages tasks. It stores tasks in a list and provides basic operations. This file represents the “data layer” of the system and is intentionally simple so testing issues are easy to observe.

```python
## task_store.py
class TaskStore:
    def __init__(self):
        self.tasks = []

    def add_task(self, task_id, name, done=False):
        self.tasks.append({
            "id": task_id,
            "name": name,
            "done": done
        })

    def get_task(self, task_id):
        for task in self.tasks:
            if task["id"] == task_id:
                return task
        return None

    def mark_done(self, task_id):
        for task in self.tasks:
            if task["id"] == task_id:
                task["done"] = True
                return True
        return False
```

`app.py` uses `TaskStore` to simulate a small workflow. This acts as the “runner” that exercises the system. It adds tasks, retrieves them, and marks them as done. 

```python
## app.py
from task_store import TaskStore

def run_app():
    store = TaskStore()

    for i in range(1000):
        store.add_task(i, f"Task {i}")

    store.get_task(10)
    store.mark_done(10)

    return store

if __name__ == "__main__":
    run_app()
    print("App finished")
```

Run the app:

```bash
python3 initial/app.py  
```

Output:
```bash
App finished 
```

Even though output is simple, the system does a lot of work under the hood. It inserts 1000 tasks, retrieves one, and marks it as done. This creates many potential paths and edge cases that may not be fully tested.


## Testing Maturity

We can use AI to evaluate testing quality using a simple scoring system. This makes the output structured and easy to act on.

- Critical paths get a score
- Edge cases are measured
- Automation level is assessed

Sample prompt: 

> You are a senior QA Engineer.  
> 
> Evaluate the testing quality of this codebase and identify the high-risk areas. Score them based on a 0-5 scale:
> 
> - Coverage of critical paths
> - Handling of edge cases
> - Regression protection
> - CICD automation
>
> Lastly, identify the test types currently present and any major gaps in the testing strategy.

The model reviews the code and assigns scores for each area, which helps reveal where testing is weak or incomplete. 

Sample output:

```text
Testing Quality Scores:

* Coverage of critical paths — 1 / 5
* Handling of edge cases — 0 / 5
* Regression protection — 0 / 5
* CI/CD automation — 0 / 5

Test Types Currently Present:

* Manual execution (script-based smoke testing)

Major Gaps in Testing Strategy:

* No automated test suite (no pytest/unittest)
* No assertions or validation checks
* No edge case or failure testing
* No regression protection
* No CI/CD pipeline integration
```

Based on this, we can see that critical paths are barely tested, edge cases are not tested at all, and there is no automation or regression protection. This gives us a clear starting point for improving the testing strategy.

## Coverage Analysis

Coverage tools show which parts of the code were actually executed during tests. This helps identify hidden gaps where code runs in production but is never validated.

Install the coverage tool:

```bash
pip install coverage
```

In the example below, we measure execution coverage:

```bash
coverage run initial/app.py
coverage report -m
```

After running the tool, we get a report similar to this:

```bash
Name                    Stmts   Miss  Cover   Missing
-----------------------------------------------------
initial/app.py             11      0   100%
initial/task_store.py      16      2    88%   16, 23
-----------------------------------------------------
TOTAL                      27      2    93%
```

This shows that the `app.py` is fully covered, but `task_store.py` has some missing lines. Specifically, lines 16 and 23 are not executed during tests, which means those paths are not validated. 

<!-- We can connect the coverage results back to the actual functions in the codebase:

`task_store.py`

- `add_task()` → usually covered (called from app.py)
- `get_task()` → executed but not asserted
- `mark_done()` → executed but not validated

`app.py`

- `process_tasks()` → fully executed loop
- No assertions → no verification layer exists

Based on this, we can see that while some code is executed, there are no assertions or checks to confirm that it behaves correctly. This highlights the need for better test design, not just execution. -->

## Building a Test Strategy

Different types of testing can be combined to fully protect the system. 

| Test Type           | Purpose / Description      |
| ------------------- | -------------------------- |
| Exploratory testing | Finds unexpected behavior  |
| Functional testing  | Checks expected outputs    |
| Regression testing  | Protects existing features |
| Automated testing   | Ensures fast feedback      |


## Generating a Test Suite

A **test suite** is a collection of structured tests that verify system behavior over time. AI can generate these tests step by step based on the code. Using the coverage report, we can focus on areas with low coverage to maximize impact.

Sample prompt:

> You are a senior software engineer with expertise in testing and quality assurance. 
>
> Generate unit and integration tests for this codebase. They should include:
>
> - Normal cases
> - Edge cases 
> - Error cases 
> - Clear assertions 
>
> List each generated tests in a table format and provide a one-line description for each. 


The model generates tests that cover normal operations, edge cases, and error conditions. In my case, it generated a new script. 

**UPDATE:** During this lab, I have updated the codebase. To keep the original files, I created another folder called "optimized" which contains the updated code. The "initial" folder contains the original code. 

```bash
project/
|
├── initial
│   ├── app.py
│   └── task_store.py
|
├── optimized
│   ├── app.py
│   └── task_store.py
|
└── tests
    └── test_task_store.py   ← NEW FILE (all tests go here)
```

See the scripts here: [Github](https://github.com/joseeden/joeden/tree/master/assets/scripts/051-AI-Assisted-Testing)

The test summary table:

| Test Name                   | Type             | Description                                                                |
| --------------------------- | ---------------- | -------------------------------------------------------------------------- |
| test_add_task               | Unit test        | Checks if a task is added correctly                                        |
| test_get_task_missing       | Unit test        | Ensures missing task returns None                                          |
| test_mark_done              | Unit test        | Validates task status updates to done                                      |
| test_mark_done_missing_task | Unit test        | Ensures safe handling of invalid task IDs                                  |
| test_get_task_not_found     | Unit test        | Confirms missing task lookup safely returns None                           |
| test_mark_done_not_found    | Unit test        | Confirms marking a non-existent task returns False                         |
| test_main                   | Unit test        | Ensures application entrypoint executes without errors and returns success |
| test_run_app_integration    | Integration test | Verifies full workflow from add → update → done                            |
| test_run_app_large          | Integration test | Checks system behavior through full application workflow                   |
| test_process_tasks          | Integration test | Validates batch processing flow using process_tasks function               |

Before running the test, make sure you have `pytest` installed:

```bash
pip install pytest
``` 

Run the tests with coverage (this runs the tests on the code in the "optimized" folder):

```bash
PYTHONPATH=optimized coverage run -m pytest -vv
```

Output:

```bash
============================================================================ test session starts ============================================================================

platform linux -- Python 3.10.4, pytest-9.0.3, pluggy-1.6.0 -- /usr/bin/python3
cachedir: .pytest_cache
rootdir: /mnt/c/Git/joeden/assets/scripts/051-AI-Assisted-Testing
collected 10 items                                                                                                                                                          

tests/test_task_store.py::test_add_task PASSED                                                                                                                        [ 10%]
tests/test_task_store.py::test_get_task_missing PASSED                                                                                                                [ 20%]
tests/test_task_store.py::test_mark_done PASSED                                                                                                                       [ 30%]
tests/test_task_store.py::test_mark_done_missing_task PASSED                                                                                                          [ 40%]
tests/test_task_store.py::test_get_task_not_found PASSED                                                                                                              [ 50%]
tests/test_task_store.py::test_mark_done_not_found PASSED                                                                                                             [ 60%]
tests/test_task_store.py::test_main PASSED                                                                                                                            [ 70%]
tests/test_task_store.py::test_run_app_integration PASSED                                                                                                             [ 80%]
tests/test_task_store.py::test_run_app_large PASSED                                                                                                                   [ 90%]
tests/test_task_store.py::test_process_tasks PASSED                                                                                                                   [100%]

============================================================================ 10 passed in 0.51s =============================================================================
```

This confirms that all generated tests are passing and the system behaves as expected under the tested conditions.


## Improving Coverage Results

After adding tests, coverage is re-run to measure how much of the code is executed by the test suite. Since tests were executed with coverage enabled, the report can be generated directly.

```bash
coverage report -m
```

Output:

```bash
Name                       Stmts   Miss  Cover   Missing
--------------------------------------------------------
optimized/app.py              21      1    95%   34
optimized/task_store.py       13      0   100%
tests/test_task_store.py      54      0   100%
--------------------------------------------------------
TOTAL                         88      1    99%
```

The results show that `task_store.py` is fully covered, and most of `app.py` is also covered by tests. Only one line remains untested.

If we review the `optimized/app.py` file, the missing line is the script entrypoint:

```python
if __name__ == "__main__":
    main() 
```

This block is not executed during testing because the module is imported by `pytest` instead of being run directly. As a result, it is commonly excluded from coverage unless explicitly tested through script execution.

In practice, this is expected behavior, and coverage close to 100% usually indicates that the actual application logic is fully tested even if small entrypoint sections remain unexecuted.


