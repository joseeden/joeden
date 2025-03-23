---
title: "Setting up New Development Laptop"
tags: 
- DevOps
- Personal Notes
- Development
description: "Steps to setup development laptop for new work projects."
sidebar_position: 10
last_update:
  date: 11/22/2023
---


## Create new Admin account in Windows Laptop 

Create a new user account in your laptop. 

Link: [Create a local user or administrator account in Windows](https://support.microsoft.com/en-us/windows/create-a-local-user-or-administrator-account-in-windows-20de74e0-ac7f-3502-a866-32915af2a34d#:~:text=check%20your%20version.-,Create%20a%20local%20user%20account,user%20without%20a%20Microsoft%20account.)

If your account was created by another, change the password:

```bash
Start > Settings > Accounts > Sign-in options > Password > Change and follow directions 
```

## Tools  

- Visual Studio Code IDE 
- Windows Terminal 
    - Ubuntu
    - CentOS
    - Azure Shell 
    - Powershell  (with admin privileges)
- Drawio
- Wireshark 
- Winrar
- Adobe Acrobat Reader DC
- WSL
- Messaging (Optional)
    - Slack
    - WhatsApp 

### Install via Microsoft Store 

- Visual Studio Code 
- Windows Terminal 
- Adobe Acrobat Reader DC 

### Install via Website 

- Drawio: https://www.drawio.com/ 
- Wireshark: https://www.wireshark.org/download.html
- Winrar: https://www.win-rar.com/download.html?&L=0 


## Set Admin Privileges for Powershell in Windows Terminal 

As best practice, create a new profile by opening Windows Terminal > Settings > Add a new profile.

You should see a **Duplicate a profile** with a dropdown menu next to it. Select the profile that you want to duplicate and click **Duplicate > Save.**

Configure the new profile to run as administrator.

```bash
Settings > Profiles > Windows Powershell > Run this profile as Administrator > Turn On 
```

Make sure to save it and then click the main dropdown bar at the top and verify that the profile is added.

:::info 

When you select the profile with elevated privileges, it will open a User Account Control (UAC) window asking you to confirm. After you click yes, it will open another instance of Windows Terminal with the privileged profile. It is currently impossible to open an elevated session in another tab in the same Windows Terminal.

Based on this [Megathread: sudo, runas, mixed elevation of tabs, etc](https://github.com/microsoft/terminal/issues/1032):

*If you want something running as administrator, a new process is required.*

:::

## Organize profiles in Windows Terminal 

To organize the ordering of the profiles on the dropdown bar, open Windows Terminal, click the dropdown bar, and then click Settings. At the bottom of the right menu, click **Open JSON File**. Edit the JSON file to change the ordering of the profiles and then save. 

```json
"profiles": 
{
    "defaults": {},
    "list": 
    [
        {
            "colorScheme": "Campbell Powershell",
            "commandline": "%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
            "experimental.rightClickContextMenu": false,
            "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
            "hidden": false,
            "name": "Windows PowerShell"
        },
        {
            "commandline": "%SystemRoot%\\System32\\cmd.exe",
            "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
            "hidden": false,
            "name": "Command Prompt"
        }
        .....
    ]
}            
```

## Install WSL 

Install WSL through Windows Terminal. Open Powershell as Administrator.
Link: [How to install Linux on Windows with WSL](https://learn.microsoft.com/en-us/windows/wsl/install) 


1. Choose the distro 

    ```powershell 
    wsl --list --online
    ```

    Sample output:

    ```powershell 
    NAME                            FRIENDLY NAME
    Ubuntu                          Ubuntu
    Debian                          Debian GNU/Linux
    kali-linux                      Kali Linux Rolling
    Ubuntu-18.04                    Ubuntu 18.04 LTS
    Ubuntu-20.04                    Ubuntu 20.04 LTS
    Ubuntu-22.04                    Ubuntu 22.04 LTS
    Ubuntu-24.04                    Ubuntu 24.04 LTS
    OracleLinux_7_9                 Oracle Linux 7.9
    OracleLinux_8_7                 Oracle Linux 8.7
    OracleLinux_9_1                 Oracle Linux 9.1
    openSUSE-Leap-15.6              openSUSE Leap 15.6
    SUSE-Linux-Enterprise-15-SP5    SUSE Linux Enterprise 15 SP5
    SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
    openSUSE-Tumbleweed             openSUSE Tumbleweed
    ```  

2. Then choose which distro to install:

    ```powershell 
    wsl --install Ubuntu-20.04
    ```     

3. If the install is stuck at 0%, you may need to update WSL and specify the complete installation command:

    ```powershell 
    wsl --update --web-download
    wsl --install -d Ubuntu-20.04 --web-download
    ```     

4. Reboot computer. After reboot, search for Ubuntu and click it. You'll be prompted to enter a new UNIX username and password. 

    ```bash
    Ubuntu is already installed.
    Launching Ubuntu...
    Installing, this may take a few minutes...
    Please create a default UNIX user account. The username does not need to match your Windows username.
    For more information visit: https://aka.ms/wslusers
    Enter new UNIX username: johnsmith
    New password:
    Retype new password:
    passwd: password updated successfully
    Installation successful!
    To run a command as administrator (user "root"), use "sudo <command>".
    See "man sudo_root" for details.

    Welcome to Ubuntu 22.04.2 LTS (GNU/Linux 5.15.133.1-microsoft-standard-WSL2 x86_64)

    * Documentation:  https://help.ubuntu.com
    * Management:     https://landscape.canonical.com
    * Support:        https://ubuntu.com/advantage


    This message is shown once a day. To disable it please create the
    /home/johnsmith/.hushlogin file. 
    ```


## Customize bashrc file

Add the following in the ~/.bashrc file.

```bash

##########################################################################
#### Any added parameters by admin should be placed below.

#### E: Sets the color of the symlinks to yellow text
LS_COLORS+=':ow=01;33'
#LS_COLORS+=:ow=

#### E: Virtual Env
export WORKON_HOME="~/.virtualenvs"
[[ -x "/usr/local/bin/virtualenvwrapper.sh" ]] && source "/usr/local/bin/virtualenvwrapper.sh"

#### E: Setting bash prompt
PS1='\[\e]0;\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\W\[\033[00m\]\$ '

#### E: Aliases
alias ld='ll -d */'
alias lf='ll -p | grep -v /'
alias cl='clear'
alias histgrep='history | grep'
alias gitacp='git add -A; git commit; git push'
alias gitac='git add -A; git commit'
alias gitst='git status'
# alias prodeks='export AWS_PROFILE=specify-name-here'  
alias addalias='vi ~/.bashrc'
alias sr='source ~/.bashrc'
alias dtop='cd /mnt/c/Users/johnsmith/Desktop'
alias dloads='cd /mnt/c/Users/johnsmith/Downloads'
alias gitdir='cd /mnt/c/Users/johnsmith/Desktop/Git'
alias awscreds="sudo vi ~/.aws/credentials"
alias k="kubectl"

# SSH Key
eval `ssh-agent`
ssh-add ~/.ssh/id_rsa
# ssh-add ~/.ssh/add-another-key-here

# NodeJS. NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# kubectl, terraform, ansible, aws
source <(kubectl completion bash)
complete -C '/usr/local/bin/aws_completer' aws
complete -C /usr/bin/terraform terraform
complete -C /usr/local/bin/terraform terraform 
```

## Add Timestamps Permanently 

By default, timestamps are not preserved when the shell session ends. To make timestamps persistent across sessions, append the following to `.bashrc` or `.zshrc`:

```bash
export HISTTIMEFORMAT='%F %T '
export HISTSIZE=10000          # Adjust the number of commands to keep
export HISTFILESIZE=20000      # Adjust the size of the history file
shopt -s histappend            # Append history instead of overwriting
```

## Add SSH Keys 

Majority of systems will require some sort of keys, instead of using a username and password. Generate the SSH key:

```bash
ssh-keygen -t ed25519
```

## Sync VS Code Settings

Use built-in **Settings Sync** in VS Code. 

For the account, use Github account. 

Link: [Settings Sync](https://code.visualstudio.com/docs/editor/settings-sync#:~:text=You%20can%20turn%20on%20Settings,and%20UI%20State%20are%20supported)


## Set Default Browser 

Set Google Chrome as default browser. 

Link: [Make Chrome your default browser](https://support.google.com/chrome/answer/95417?hl=en&co=GENIE.Platform=Desktop)
