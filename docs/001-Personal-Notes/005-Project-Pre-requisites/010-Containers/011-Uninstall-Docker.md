---
title: "Uninstall Docker"
description: "Uninstall Docker"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 11
last_update:
  date: 7/7/2022
---


## Remove Docker

### WSL2 

These are the steps I followed when uninstalling Docker in WSL2.

```bash
sudo systemctl stop docker
sudo apt-get purge docker-ce docker-ce-cli containerd.io
sudo apt-get purge docker docker-engine docker.io containerd runc
```

If you get this error, please see [Packages no longer required.](#packages-no-longer-required)

```bash
The following packages were automatically installed and are no longer required:
  docker-buildx-plugin docker-ce-rootless-extras docker-compose-plugin libltdl7 libslirp0 pigz slirp4netns 
```

Check for Docker directories and files. This needs root privileges.

```bash
# ls -la /var/lib/docker

total 52
drwx--x--- 12 root root 4096 Jun 18 12:18 ./
drwxr-xr-x 31 root root 4096 Jun 15 09:42 ../
drwx--x--x  4 root root 4096 Jun 15 09:42 buildkit/
drwx--x---  2 root root 4096 Jun 15 09:44 containers/
-rw-------  1 root root   36 Jun 15 09:42 engine-id
drwx------  3 root root 4096 Jun 15 09:42 image/
drwxr-x---  3 root root 4096 Jun 15 09:42 network/
drwx--x---  4 root root 4096 Jun 18 12:18 overlay2/
drwx------  4 root root 4096 Jun 15 09:42 plugins/
drwx------  2 root root 4096 Jun 18 12:18 runtimes/
drwx------  2 root root 4096 Jun 15 09:42 swarm/
drwx------  2 root root 4096 Jun 18 12:18 tmp/
drwx-----x  2 root root 4096 Jun 18 12:18 volumes/ 
```

```bash
# ls -la /var/lib/containerd

total 40
drwx--x--x 10 root root 4096 Jun 15 09:42 ./
drwxr-xr-x 31 root root 4096 Jun 15 09:42 ../
drwxr-xr-x  4 root root 4096 Jun 15 09:44 io.containerd.content.v1.content/
drwx--x--x  2 root root 4096 Jun 15 09:42 io.containerd.metadata.v1.bolt/
drwx--x--x  2 root root 4096 Jun 15 09:42 io.containerd.runtime.v1.linux/
drwx--x--x  3 root root 4096 Jun 15 09:44 io.containerd.runtime.v2.task/
drwx------  2 root root 4096 Jun 15 09:42 io.containerd.snapshotter.v1.btrfs/
drwx------  3 root root 4096 Jun 15 09:42 io.containerd.snapshotter.v1.native/
drwx------  3 root root 4096 Jun 15 09:42 io.containerd.snapshotter.v1.overlayfs/
drwx------  2 root root 4096 Jun 15 09:42 tmpmounts/ 
```

Delete them:

```bash
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd 
```

If you get this error, please see [Cannot remove docker directory](#Cannot-remove-docker-directory).

```bash
rm: cannot remove '/var/lib/docker': Device or resource busy 
```

Optionally, remove other Docker dependencies.

```bash
sudo apt autoremove 
```

If you created a Docker group and want to remove it:

```bash
ls -la /etc/passwd | grep docker
ls -la /etc/group | grep docker 
```

To delete them:

```bash
sudo groupdel docker 
```

Remove configuration files.

```bash
sudo rm -f /etc/systemd/system/docker.service.d
sudo rm -f /etc/systemd/system/docker.socket.d 
```

### Windows 

1. Uninstall Docker Desktop:

    - Go to "Settings" > "Apps" in Windows.
    - Find Docker Desktop in the list of applications.
    - Click on Docker Desktop and select "Uninstall".
    - Remove Docker data (optional):

2. You might also want to delete Docker's storage directories manually, typically found in your user profile under C:\Users\[YourUsername]\.docker or the location specified in Docker settings.

### Verify 

Confirm that Docker has been removed.

```bash
$ docker -v

The command 'docker' could not be found in this WSL 2 distro.
We recommend to activate the WSL integration in Docker Desktop settings. 
```

## Troubleshooting

### Packages no longer required

If you get this error while uninstalling Docker:

```bash
The following packages were automatically installed and are no longer required:
  docker-buildx-plugin docker-ce-rootless-extras docker-compose-plugin libltdl7 libslirp0 pigz slirp4netns 
```

Run:

```bash
sudo apt autoremove 
```


### Cannot remove docker directory

If you get this error while trying to remove the Docker directoryes:

```bash
rm: cannot remove '/var/lib/docker': Device or resource busy 
```

Then you might need to check which processes are using it:

```bash
sudo lsof | grep /var/lib/docker 
```

In the example output below, we see that the process with PID 205035 is keeping the directory busy.

```bash
$ sudo lsof | grep /var/lib/docker

dockerd   205035                             root  DEL-W     REG               8,32                        30178 /var/lib/docker/buildkit/history.db
dockerd   205035                             root  DEL-W     REG               8,32                        30177 /var/lib/docker/buildkit/cache.db
dockerd   205035                             root  DEL-W     REG               8,32                        30175 /var/lib/docker/buildkit/metadata_v2.db
dockerd   205035                             root  DEL-W     REG               8,32                        30174 /var/lib/docker/buildkit/snapshots.db 
```

Kill the process. Note that your PID may be different.

```bash
sudo kill -9 205035
```

If you still got this error:

```bash
$ sudo rm -rf /var/lib/docker

sudo rm -rf /var/lib/containerd
rm: cannot remove '/var/lib/docker': Device or resource busy 
```

Try to force unmount the directory and then delete them again.

```bash
sudo umount /var/lib/docker
sudo rm -rf /var/lib/containerd
sudo rm -rf /var/lib/docker 
```