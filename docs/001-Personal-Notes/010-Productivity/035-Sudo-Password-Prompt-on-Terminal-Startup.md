---
title: "Disable Sudo Password Prompt on Terminal Startup"
description: "How to disable sudo password prompt on terminal startup in Linux"
sidebar_position: 35
tags: 
- Development
- Terminal
- IDE
- Visual Studio Code
# last_update:
#   date: 11/22/2023
---


## Problem 

If Bash immediately asks for your sudo password, it usually means your `.bashrc` is running `sudo` commands automatically during shell startup.

In my case, I had a block in `.bashrc` that automatically started Docker using `sudo` every time a new terminal opened.

```bash id="k7u6xw"
sudo chgrp docker "$DOCKER_DIR"

/mnt/c/Windows/System32/wsl.exe -d $DOCKER_DISTRO sh -c "nohup sudo -b dockerd < /dev/null > $DOCKER_DIR/dockerd.log 2>&1"
```

Because `.bashrc` runs every time a new interactive shell starts, these commands execute automatically. This causes the sudo password prompt to appear whenever a terminal is opened.

## Solution 

The specific section in `~/.bashrc`.

```bash id="g3d0m2"
##Create Launch Script for Dockerd
DOCKER_DISTRO="Ubuntu-20.04"
DOCKER_DIR=/var/run
DOCKER_SOCK="$DOCKER_DIR/docker.sock"
export DOCKER_HOST="unix://$DOCKER_SOCK"

if [ ! -S "$DOCKER_SOCK" ]; then
   mkdir -pm o=,ug=rwx "$DOCKER_DIR"
   sudo chgrp docker "$DOCKER_DIR"
   /mnt/c/Windows/System32/wsl.exe -d $DOCKER_DISTRO sh -c "nohup sudo -b dockerd < /dev/null > $DOCKER_DIR/dockerd.log 2>&1"
fi

if ! pgrep -x "dockerd" > /dev/null; then
    echo "Dockerd is not running. To start docker, run 'sudo dockerd'"
fi
```

I replaced the Docker section with this simplified configuration.

```bash id="dxm0j4"
## Docker
DOCKER_SOCK="/var/run/docker.sock"
export DOCKER_HOST="unix://$DOCKER_SOCK"

if ! pgrep -x "dockerd" > /dev/null; then
    echo "Dockerd is not running"
fi
```

This keeps Docker environment variables available without triggering sudo.

After saving the file, reload Bash:

```bash id="0u2r4h"
source ~/.bashrc
```

The terminal should now open without asking for a password.



## Start Docker manually when needed

Instead of auto-starting Docker during shell startup, create a simple alias.

Add this to `.bashrc`:

```bash id="h4q4ol"
alias startdocker='sudo dockerd'
```

Then start Docker manually only when needed.

```bash id="g2yr4q"
startdocker
```

This keeps terminal startup fast and avoids unnecessary sudo prompts.



## Other sudo commands to check

Some aliases may also use sudo.

Example:

```bash id="4ldlmb"
alias awscreds="sudo vi ~/.aws/credentials"
```

This is fine because it only runs when manually executed.

Only commands that execute automatically during shell startup will cause terminal login prompts.

## Recommended Bash organization

Large `.bashrc` files become difficult to maintain over time.

- Keep `.bashrc` minimal
- Move aliases into separate files
- Split tool configurations by category

Example structure:

```bash id="0lw6v6"
~/.bash_aliases
~/.bash_docker
~/.bash_node
~/.bash_k8s
```

Then source them from `.bashrc`.

```bash id="pwz4kq"
source ~/.bash_aliases
source ~/.bash_docker
source ~/.bash_node
```

This makes troubleshooting and maintenance much easier.
