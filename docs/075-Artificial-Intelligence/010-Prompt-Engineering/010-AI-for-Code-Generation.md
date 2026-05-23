---
title: "AI for Code Generation"
description: "Using AI models to assist in writing and understanding code"
tags:
- Machine Learning
- Artificial Intelligence
- Prompt Engineering
sidebar_position: 10
last_update:
  date: 7/12/2023
--- 

## Overview

AI models can help with software development by reducing the time spent on writing and maintaining documentation. One of the most useful areas is generating and summarizing code documentation.

## Docstring Generation

A simple prompt like the one below often produces a short and generic docstring. It usually describes the function at a high level, but it often misses important details such as parameters, return values, and internal logic.

```python
Write a docstring for this function:

def monthly_sales(self):
    ... 
    if increasing < decreasing:
        return "Sales are decreasing"
    else:
        return "Sales are increasing"
```

Sample output:

```python
def monthly_sales(self):
    """Returns whether sales are increasing or decreasing."""
    ... 
    if increasing < decreasing:
        return "Sales are decreasing"
    else:
        return "Sales are increasing"  
```

A better approach is to break the request into clear parts so the model knows what to include.

- Function purpose
- Parameters and their types
- Return value and type
- Optional examples or notes

```python
Generate a docstring for this function.  

Explain what the function does in simple terms.  
Describe each parameter and its type.  
Describe the return value and its type.  
Include an example if possible.  

The function:

def monthly_sales(self):
    ... 
    if increasing < decreasing:
        return "Sales are decreasing"
    else:
        return "Sales are increasing"
```

Sample output:

```python
def monthly_sales(self):
    """
    Compares increasing and decreasing sales values and returns a trend.

    This method evaluates sales movement based on internal metrics and
    determines whether sales are increasing or decreasing.

    Returns:
        str: A message indicating the sales trend ("Sales are increasing" or "Sales are decreasing").
    """
    ... 
    if increasing < decreasing:
        return "Sales are decreasing"
    else:
        return "Sales are increasing" 
```


## Adapting Documentation Styles

Different projects use different documentation standards, and AI can follow these formats when instructed clearly.

- Google style docstrings
- NumPy style docstrings
- Sphinx-compatible documentation

Example prompts: 

```plaintext
Generate a docstring for this function using Google style format.
```

```plaintext
Generate a docstring for this function using NumPy style format.
```

This makes it easier to maintain consistency across a codebase without manually rewriting documentation formats.

## Class-Level Documentation and API References

AI can also document entire classes instead of just single functions. This is useful for generating API references.

- Method names and descriptions
- Parameter details
- Class-level behavior overview

Example prompt: 

```plaintext
Analyze this class and generate an API reference.  
Include method names, descriptions, and parameter details.  
Format the output in Markdown.
```

This helps create structured documentation for larger systems without manually writing each section.

## README Generation

AI can turn code into project documentation by summarizing it into a README file. This is useful for onboarding and sharing code with others.

- Explains what the class or project does
- Describes how to use it
- Includes example usage

Example prompt: 

```plaintext
Generate a README file in Markdown.  
Explain the `SalesAnalysis` class and its methods.  
Include a simple code example showing how to analyze sales trends.
```

This makes the code easier to understand and use without reading every line.

## Commit Messages and Code Changes

AI can also generate commit messages by analyzing code differences. This works best when changes are provided clearly, often using `git diff`.

- Summarizes what changed
- Explains why changes were made

Example prompt: 

```plaintext
Generate a commit message based on the following code changes.

- Fix sales calculation function where decreasing values were not handled correctly.
- Update logic to compare increasing and decreasing sales trends.
- Improve return messages for clarity.
```


## Release Notes and Changelogs

The same idea can be extended to release documentation. Instead of commit messages, AI can generate changelogs. The changes can be grouped into features, fixes, and improvements to create a clear summary of what’s new in a release.

Example prompt: 

```plaintext
Generate a changelog entry from the following code changes.

- Added caching to improve performance of API response handling.
- Fixed a bug where user authentication failed for expired tokens.
- Updated error messages to be more descriptive and user-friendly.
```

## Other Documentation Tasks

Beyond the examples mentioned here, AI can help with many other documentation tasks in development workflows. This includes the following:

- Summaries
- Onboarding guides
- Internal documentation updates

It is useful to explore where documentation can be simplified or automated, especially in repetitive or structured tasks.
