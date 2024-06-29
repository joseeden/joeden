---
title: Processes
tags: [Linux, Red Hat, Certifications]
<!-- sidebar_position: 1 -->
last_update:
  date: 2/27/2022
---


## Tasks

1. Type the command below. Change it from foreground to a background job. 

	```bash
	dd if=/dev/zero of-/dev/null
	```
	
2. Run the command above for three more times as a background job immediately.
3. Display information about the current background jobs.
4. Change the niceness of one of the **dd** processes to '-5'.
5. Send a **sigkill** signal to **top**.
6. Terminate all **dd** processes from the command line.


## Solution

### 1. Setting as a background job 

Run the command in the foreground:

```bash
dd if=/dev/zero of=/dev/null
```

Suspend the command by pressing `Ctrl+Z`. Move the suspended job to the background:

```bash
bg
```

### 2. Run as a background job

Run the command above for three more times as a background job immediately.

```bash
dd if=/dev/zero of=/dev/null &
dd if=/dev/zero of=/dev/null &
dd if=/dev/zero of=/dev/null &
```


### 3. Display job details

Display information about the current background jobs.

```bash
jobs
```

### 4. Set the niceness

Find the process ID (PID) of one of the `dd` processes:

```bash
ps aux | grep dd
```

Change the niceness of the process to `-5` (replace `<PID>` with the actual PID):

```bash
sudo renice -5 -p <PID>
```

### 5. Kill a job

Send a **sigkill** signal to **top**. Run `top` in the foreground:

```bash
top
```

Find the PID of the `top` process from another terminal:

```bash
pgrep top
```

Send a `SIGKILL` signal to the `top` process (replace `<PID>` with the actual PID):

```bash
kill -9 <PID>
```


### 6. Kill processes

Find all `dd` process IDs:

```bash
pgrep dd
```

Terminate all `dd` processes:

```bash
pkill dd
```
