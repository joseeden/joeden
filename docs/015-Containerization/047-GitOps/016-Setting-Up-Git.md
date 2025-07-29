---
title: "Setting Up Git"
description: "Setting Up Git"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - GitOps
  - ArgoCD
  - Git
sidebar_position: 16
last_update:
  date: 8/19/2022
---

## Overview

This is a simple guide to install Git, set your preferences, and enable SSH authentication.

* Git install steps are different for Windows, Mac, and Linux
* You must set your name, email, and preferred text editor
* SSH lets you connect securely to remote Git servers

These steps will help you get Git ready to use, no matter what system you're on.

## Install Git

Installing Git depends on the operating system you're using.

- **Windows**: Go to [gitforwindows.org](https://gitforwindows.org) and run the installer
- **Mac**: Use Homebrew
- **Ubuntu**: Use APT package manager

On Mac:

```bash
brew install git
```

On Ubuntu:

```bash
sudo apt update
sudo apt install git -y
```

After that, run:

```bash
git --version
```

to check if Git is installed correctly. The goal is to ensure Git is ready for use on your computer.

## Configure Git 

You need to set your name and email so Git knows who you are.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

You can also set your preferred text editor:

```bash
git config --global core.editor "vim"
```

Replace `"vim"` with `nano`, `code` (for VS Code), or `subl` (for Sublime), depending on what you use.

## Set Up SSH Authentication

SSH allows Git to connect securely to remote repositories.

### Step 1: Create SSH Key

You’ll be asked to name the key and optionally set a passphrase. Skip the passphrase if you want.

```bash
ssh-keygen -t ed25519 -C "you@example.com"
```


### Step 2: Start SSH Agent and Add Your Key

This keeps the key in memory so Git can use it automatically.

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```


### Step 3: Copy Public Key and Add It to Git Host

Show your public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Then:

* Log into GitLab, GitHub, or Bitbucket
* Go to your user profile settings
* Find **SSH Keys** and paste the public key
* Give it a title, set expiration (or leave blank), and save

Now Git uses this SSH key every time it connects to the repo. No need to enter your username and password each time.

