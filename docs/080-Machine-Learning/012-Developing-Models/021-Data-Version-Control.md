---
title: "Data Version Control"
description: "Data Version Control"
tags: 
- Machine Learning
- MLOps
sidebar_position: 21
last_update:
  date: 5/13/2023
---

## Overview 

**DVC**, or **Data Version Control**, is an open source tool for dataset versioning. It works together with Git.

- Git tracks code changes
- DVC tracks dataset changes
- Both work together in one workflow

DVC helps manage large datasets without storing them directly inside Git repositories.

<div class='img-center'>

![](/img/docs/all-things-ml-dvc.png)

</div>


## DVC Storage

DVC stores dataset metadata in Git while keeping the actual files in separate storage, which keeps repositories lightweight. It supports various storage backends:

- Local storage
- SSH storage
- Cloud storage

You can use `pip` to install DVC into the Python environment.

```bash
pip install dvc
```

## Getting Started  

### Initializing DVC

DVC works together with Git, so Git must be initialized first.

```bash
git init
dvc init
```

Expected result:

```bash
Initialized empty Git repository
Initialized DVC repository
```

This creates a `.dvc` directory which contains important configuration files.

```bash
.dvc
├── .gitignore
├── config
└── tmp
```

| File/Directory | Purpose                              |
| -------------- | ------------------------------------ |
| `.gitignore`   | Ignores DVC cache files              |
| `config`       | Stores DVC settings                  |
| `tmp`          | Stores temporary logs and cache data |


### Adding Files to DVC

To track large datasets and files, use `dvc add`. 

- Creates `.dvc` metadata files
- Stores cached files inside `.dvc/cache`

In the example below, `data.csv` is added to DVC tracking.

```bash
dvc add data.csv
```

Expected result:

```bash
Adding...
Creating data.csv.dvc
```

The actual dataset remains outside Git tracking while metadata is stored inside Git.

### `.dvc` Metadata Files

A `.dvc` file stores metadata about tracked datasets.

- `outs` defines tracked outputs
- `md5` stores the file checksum
- `size` stores the file size in bytes
- `hash` defines the hash type
- `path` stores the dataset location

Example `data.csv.dvc` file:

```yaml
outs:
- md5: 3f786850e387550fdab836ed7e6dc881
  size: 28
  hash: md5
  path: data.csv
```

**Note**: `md5` changes when file contents change.

These metadata values allow DVC to detect dataset changes reliably.
