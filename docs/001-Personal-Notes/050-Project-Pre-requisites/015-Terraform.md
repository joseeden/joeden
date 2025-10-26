---
sidebar_position: 15
title: Terraform  
last_update:
  date: 6/11/2022
---


## Install Terraform on WSL 

To install Terraform locally (assuming you're running WSL on a Windows computer), follow the steps below.

Run an update first.

```bash
sudo apt-get update 
sudo apt-get upgrade  
```

Navigate to the Terraform download page and scroll down to **Binary download for Linux**. Choose the version you need and click **Download**

<div class='img-center'>

![](/img/docs/install-terraform-on-wsl.png)

</div>

In WSL, go to the directory where the zip file was downloaded. 
Unzip the file and move to `/usr/local/bin`. Remove the zip file afterwards.

```bash
sudo mv terraform /usr/local/bin; 
rm terraform*.zip; 
```

Verify installation.

```bash
terraform -version
```

You should see output similar to below:

```bash
Terraform v1.6.3
on linux_386 
```

Reference: https://techcommunity.microsoft.com/t5/azure-developer-community-blog/configuring-terraform-on-windows-10-linux-sub-system/ba-p/393845

## Install Terraform on Linux

To install Terraform, we have these options:

- Use the [official documentation from Hashicorp](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- Install Terraform through [WSL](003-Install-Terraform-on-WSL.md)
- Run the [setup-terraform.sh](../../../scripts/run-setup-terraform.sh) script

After installing, verify.
```bash
terraform -v 
```
