---
title: "AppArmor"
description: "Linux security module for application access control."
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 21
last_update:
  date: 3/11/2022
---


## Overview

AppArmor (Application Armor) is a Linux security module providing **Mandatory Access Control (MAC)** for applications. It enhances system security by restricting programs to predefined rules, controlling access to resources.

This is installed by default in most Linux distribution systems. To check:

```bash
systemctl status apparmor 
```

To use AppArmor, the AppArmor kernel module must first be loaded on all the nodes where the containers will run. To check:

<div class='img-center'>

![](/img/docs/check-if-apparmor-is-loaded-or-not.png)

</div>



Check the loaded profiles:

```bash
sudo aa-status
```

To apply AppArmor, we also use a profile which must be loaded into the kernel. To check the profiles loaded:

<div class='img-center'>

![](/img/docs/check-apparmor-profiles-loaded-onto-the-kernel.png)

</div>




## Installing AppArmor

Install AppArmor if not already present:

- For Ubuntu:  

   ```bash
   sudo apt-get install -y apparmor-utils
   ```

- Load a Profile:  

   ```bash
   apparmor_parser /etc/apparmor.d/my-profile.json
   ```

- Disable a Profile:  

   ```bash
   apparmor_parser -R /etc/apparmor.d/my-profile.json
   ln -s /etc/apparmor.d/my-profile.json /etc/apparmor.d/disable/
   ```




## Examples: Restricting Write Access

### Deny Writes to Entire Filesystem  

Create a profile denying write access to all files:

```bash
# /etc/apparmor.d/apparmor-deny-write
profile deny_all_writes flags=(attach_disconnected,mediate_deleted) {
  deny /** w,
}
```

Reload AppArmor to apply:  

```bash
sudo systemctl reload apparmor
```

### Deny Writes to Specific Directory  

Restrict writes to `/proc`: 
 
```bash
# /etc/apparmor.d/apparmor-deny-proc-write
profile deny_proc_writes flags=(attach_disconnected) {
  deny /proc/* w,
}
```

Reload and verify: 
 
```bash
sudo systemctl reload apparmor
sudo aa-status
```



## AppArmor Modes

1. **Enforce Mode**:  
   - Blocks actions violating policies.  
   - Suitable for production.  
      
      ```bash
      sudo aa-enforce /etc/apparmor.d/my_profile
      ```

2. **Complain Mode**:  
   - Logs violations but allows actions.  
   - Useful for testing.  
   
      ```bash
      sudo aa-complain /etc/apparmor.d/my_profile
      ```

3. **Unconfined Mode**:  
   - No restrictions or logging.  

Switch between modes using `aa-enforce` or `aa-complain`.


## AppArmor in Kubernetes

Kubernetes supports AppArmor starting from version 1.4. Prerequisites:

- AppArmor kernel module enabled on nodes.
- Profiles loaded in the kernel.
- Supported container runtime.

**Example**: Apply a profile to a container:

1. Create an AppArmor profile:
   ```bash
   # /etc/apparmor.d/apparmor-deny-write
   profile apparmor-deny-write flags=(attach_disconnected) {
     deny /** w,
   }
   ```

2. Verify AppArmor on the node:
   ```bash
   sudo aa-status
   ```

   <div class='img-center'>

   ![](/img/docs/apparmor-verify-if-profile-is-loaded-before-running.png)

   </div>




3. Add an annotation in the Pod manifest:
   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: ubuntu-sleeper
     annotations:
       container.apparmor.security.beta.kubernetes.io/ubuntu-sleeper: localhost/apparmor-deny-write
   spec:
     containers:
     - name: ubuntu-container
       image: ubuntu:latest
       command: ["sleep", "3600"]
   ```

4. Deploy and test:
   ```bash
   kubectl apply -f ubuntu-sleeper.yml
   kubectl exec -it ubuntu-sleeper -- touch /tmp/testing
   # Output: Permission denied
   ```