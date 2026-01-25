---
title: Schell scripts
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 20
last_update:
  date: 3/27/2021
---

## Tasks

Write a bash script for the following:

- Evaluate an argument provided when script is ran.
- If argument is "yes", the script should return "That's great!"
- If argument is "no", the script should return "Why not? Go for it!"
- If argument is anythign else, the script should return "What's that again?"


## Solution


Create the bash script:

```bash
#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 <argument>"
    exit 1
fi

case "$1" in
    "yes")
        echo "That's great!"
        ;;
    "no")
        echo "Why not? Go for it!"
        ;;
    *)
        echo "What's that again?"
        ;;
esac

exit 0
```


Make the script executable:

```bash
chmod +x eval_arg.sh
```

Run the script with different arguments:

```bash
./eval_arg.sh yes
# Output: That's great!

./eval_arg.sh no
# Output: Why not? Go for it!

./eval_arg.sh maybe
# Output: What's that again?
```