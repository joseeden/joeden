---
title: "Terminal"
description: "Notes on Terminal and CLI Tools"
sidebar_position: 5
tags: 
- Development
- Terminal
- IDE
- Visual Studio Code
- DevOps
last_update:
  date: 11/22/2023
---



## Useful Aliases

```bash
alias ld='ll -d */'
alias lf='ll -p | grep -v /'
alias cl='clear'
alias histgrep='history | grep' 
alias addalias='vi ~/.bashrc'
alias sr='source ~/.bashrc'
alias myip='export TF_VAR_my_ip="$(curl ifconfig.me)/32"'
alias awscreds='sudo vi ~/.aws/credentials'
```
```bash
alias gitacp='git add -A; git commit; git push'
alias gitac='git add -A; git commit'
alias gitst='git status' 
```

## CLI Completion 

Enable completion for some of the available CLIs.

```bash
# Enable autocompletion for the Kubernetes cluster manager utility kubectl:
source <(kubectl completion bash)

# Enable autocompletion for Helm
source <(helm completion bash) 
```

## VIM Shortcuts 

Go to top of the file (first line of the file).

```bash
gg 
```

Go to bottom of the file (last line of the file).

```bash
Shift + g  
```

Copy an entire line.

```bash
yy 
```

Paste after a line.

```bash
p 
```

Insert an empty line below a line.

```bash
o 
```

Set line numbers.

```bash
:set number 
```

Go to a line (like line 10).

```bash
:10 
```

## Powershell and CMD

Checking the IP configurations:

```bash
ipconfig 
```

Checking all entries in the ARP cache.
ARP maps IP addresses to their respective MAC addresses.
Just simply means it checks the connected devices.

```bash
arp -a 
```

![](/img/docs/powershell-command-arp-a.png)

Find applications or services listening on a certain port, e.g. 3389.
Add a "-p" flag to specify protocol, e.g. tcp.

```bash
netstat -p tcp -n | find '443'          # Command Prompt
netstat -p tcp -n | findstr '443'       # Powershell
```

To display all the routing table entries:

```bash
route print 
```

![](/img/docs/sec+-routee-print-output.png)

To show the "hops" or router that a connection will go through to reach a specified target. Add "-d" flag to show just the IP address of each hop.

```bash
tracert -d youtube.com
```

![](/img/docs/sec+-tracert-diagram-sample.png)

Combination of ping and tracert:

```bash
pathping youtube.com 
```

![](/img/docs/sec+-pathping-example.png)

To resolve a DNS name. Basically you can provide a DNS name and it will resolve the IP address. Below is a **forward DNS lookup**.

```bash
nslookup youtube.com 
```

![](/img/docs/sec+-nslookup-1.png)

"Non-authoritative" means that the local DNS Server cannot resolve the DNS name but its able to find a DNS Server that could resolve it.

**Reverse lookup** is when you have the IP address and you want to find the DNS name. To do this, set the type to PTR.

```bash
nslookup 
set type=PTR 
8.8.8.8
```

![](/img/docs/sec+-reverse-lookup.png)


To view or modify the file system permissions in Windows.
Use "icacls", followed by the directory path. The "." means current directory.

![](/img/docs/sec+-icacls-example-22.png)


To refresh DHCP lease:

```bash
ipconfig /release
ipconfig /renew 
```

To empty DNS cache:

```bash
ipconfig /flushdns 
```


