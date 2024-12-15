---
sidebar_position: 11
title: Vagrant 
---



## VirtualBox 

VirtualBox releases updates every couple of years so it's best  to rely on the official documentation on how to install VirtualBox.

For more information, please see [Download VirtualBox](https://www.virtualbox.org/wiki/Downloads)

## WSL2 

### Install WSL2 

Some of the projects and labs will performed using WSL2 as terminal. 

For more information, please see [How to install Linux on Windows with WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

### Install Vagrant on WSL2

> Reference: [How to run Vagrant + VirtualBox on WSL 2 (2021)](https://thenets.org/how-to-run-vagrant-on-wsl-2/)

This tutorial will guide you to install Vagrant on Windows using WSL 2 (Windows Subsystem for Linux) with VirtualBox provider.

- VirtualBox must be installed on Windows. Windows will handle the VirtualBox process which will create the VM through the Virtualization Type 2. For more information, please see [Virtualization.](https://www.ibm.com/cloud/learn/hypervisors)

- Vagrant must be installed on Linux (WSL 2). The Linux binary is required because the Windows version is not compatible with WSL 2.

![](/img/docs/12152024-install-vagrant-virtualbox.png)

Assuming you're using Ubuntu 20.04, run:

```bash
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install vagrant 
```

Then, you must enable WSL 2 support. To do that, append two lines into the ~/.bashrc file:

```bash
# append those two lines into ~/.bashrc
echo 'export VAGRANT_WSL_ENABLE_WINDOWS_ACCESS="1"' >> ~/.bashrc
echo 'export PATH="$PATH:/mnt/c/Program Files/Oracle/VirtualBox"' >> ~/.bashrc

# now reload the ~/.bashrc file
source ~/.bashrc 
```


### Install PowerShell Preview

Depending on your Windows version, you may need to install the PowerShell Preview version. If that's the case, go to your current PowerShell version and run the following command:

```powershell
Invoke-Expression "& { $(Invoke-Restmethod https://aka.ms/install-powershell.ps1) } -UseMSI -Preview" 
```

This should open an installation wizard. Go through all the steps and finish the installation process. 


### Install virtualbox_WSL2 plugin

Since December 2024, vagrant starts to fail with an error like this one:

```bash
==> default: Waiting for machine to boot. This may take a few minutes...
    default: SSH address: 127.0.0.1:2222
    default: SSH username: vagrant
    default: SSH auth method: private key
    default: Warning: Connection refused. Retrying...
    default: Warning: Connection refused. Retrying...
    default: Warning: Connection refused. Retrying...
    default: Warning: Connection refused. Retrying...
    default: Warning: Connection refused. Retrying...
    default: Warning: Connection refused. Retrying.. 
```

In order to fix it, an older solution from the community still solves the problem:

```bash
vagrant plugin install virtualbox_WSL2 
```


## Windows 

### Install Vagrant on Windows 

**Install Vagrant:**

- Download Vagrant: https://developer.hashicorp.com/vagrant/install
- Install Vagrant with the default settings
- Reboot Windows

**Install Vagrant Plugins:**

- Open your Git Bash or your Powershell, which should also work
- For fast NFS shares

    ```powershell
    vagrant plugin install vagrant-winnfsd
    ```

- For automatic VirtualBox guest addition updates

    ```powershell
    vagrant plugin install vagrant-vbguest 
    ```

## Troubleshooting 


### The executable `cmd.exe` Vagrant is trying to run was not found in the PATH variable.

**Error:**

```bash
$ vagrant up

Vagrant failed to initialize at a very early stage:

The executable 'cmd.exe' Vagrant is trying to run was not
found in the PATH variable. This is an error. Please verify
this software is installed and on the path. 
```

**Reason:**

The error indicates that Vagrant is unable to locate cmd.exe, a key Windows system component required for running Vagrant commands on WSL2. This usually happens if cmd.exe is missing from the PATH in your WSL environment.

**Solution:**

- In WSL, find the path of the vagrant executable:

    ```bash
    which vagrant
    ```

- In WSL, check if Windows system paths are included. 
- Look for entries like ``/mnt/c/Windows/System32`. If it's missing, proceed to the next step.

    ```bash
    echo $PATH
    ```

- Add the following line at the end of the `~/.bashrc` file:

    ```bash
    $ vi ~/.bashrc

    export PATH=$PATH:/mnt/c/Windows/System32
    ```

- Save and close the file, then reload it:

    ```bash
    source ~/.bashrc
    ```
- Retry the command:

    ```bash
    vagrant up
    ```

### Failed to locate the powershell executable on the available PATH

**Error:** 

```bash
$ vagrant up

Vagrant failed to initialize at a very early stage:

Failed to locate the powershell executable on the available PATH. Please
ensure powershell is installed and available on the local PATH, then
run the command again. 
```

**Reason:**

The error indicates that Vagrant is unable to find the PowerShell executable in your system's PATH. Vagrant relies on PowerShell for certain operations on Windows.

**Solution:**

- PowerShell is typically located in this path. Verify.

    ```
    C:\Windows\System32\WindowsPowerShell\v1.0\
    ```

- Add this path to your PATH environment variable if it's missing:
    - Press `Win + S` and search for "Environment Variables."
    - In **System Properties**, go to **Advanced** > **Environment Variables**.
    - In the **System variables** section, find and select `Path`, then click **New**.
    - Add the above PowerShell path (`C:\Windows\System32\WindowsPowerShell\v1.0\`) if it's not already listed.
    - Click **OK** to save.

- Open a Command Prompt or PowerShell window and run:

    ```cmd
    powershell -Command "Write-Host 'PowerShell is accessible'"
    ```

- In WSL, Add this to your `~/.bashrc` or `~/.zshrc` file for persistence:

    ```bash
    echo 'export PATH=$PATH:/mnt/c/Windows/System32/WindowsPowerShell/v1.0' >> ~/.bashrc
    source ~/.bashrc
    ```    

- Retry the command:

    ```bash
    vagrant up
    ```

### Vagrant is unable to use the VirtualBox provider from the Windows Subsystem for Linux    

**Error:** 

```bash
$ vagrant up

Vagrant failed to initialize at a very early stage:

Vagrant is unable to use the VirtualBox provider from the Windows Subsystem for
Linux without access to the Windows environment. Enabling this access must be
done with caution and an understanding of the implications. For more information
on enabling Windows access and using VirtualBox from the Windows Subsystem for
Linux, please refer to the Vagrant documentation:

  https://www.vagrantup.com/docs/other/wsl.html 
```

**Reason:**

The error you're encountering indicates that Vagrant cannot use VirtualBox from within WSL2 directly, as it requires access to the Windows environment to interact with VirtualBox. To fix this, you'll need to enable access between WSL2 and the Windows environment to allow VirtualBox to work. Here's how to resolve the issue:

**Solution:**

- In WSL, allow WSL2 to access Windows executables

```bash
echo "[interop]\nenable-interop = true\nappend-window-pid = false" | sudo tee -a /etc/wsl.conf
```

- In Command Prompt or PowerShell, run:

    ```bash
    wsl --shutdown
    ```

