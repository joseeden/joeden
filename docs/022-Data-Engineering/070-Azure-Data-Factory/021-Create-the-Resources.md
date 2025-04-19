---
title: "Create the Resources"
description: "Create the Resources"
tags: 
- Data Engineering
- Databases
- Microsoft Azure
- Azure Data Factory
sidebar_position: 21
last_update:
  date: 10/14/2021
---


## Overview

This page shows how to set up your environment in Microsoft Azure for the [BikeCo case study](/docs/022-Data-Engineering/070-Azure-Data-Factory/020-Case-Study-BikeCo.md). You can sign up for a free trial to get started.

- [Create Your Azure Free Account or Pay As You Go](https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account)

## Create the Resource Group

Create a resource group where all related resources will be organized.

1. Sign in to Microsoft Azure  
2. Go to **Resource Groups** → **Create**  
3. Enter the following details:

    | Field            | Value                         |
    |------------------|-------------------------------|
    | Subscription     | Azure Subscription 1          |
    | Resource group   | hcpdatagroup                  |
    | Region           | (Asia Pacific) Southeast Asia |

4. Add the following tags:

    | Key     | Value       |
    |---------|-------------|
    | Project | HCP         |
    | Group   | Data Group  |

5. Click **Next** → **Create**

## Create the Storage Account

Now create a storage account where you’ll store files and data.

1. Go to **Storage accounts** → **Create**  
2. Enter the following details:

    | Field            | Value                         |
    |------------------|-------------------------------|
    | Subscription     | Azure Subscription 1          |
    | Resource group   | hcpdatagroup                  |
    | Storage account  | hcpdevsstore                  |
    | Region           | (Asia Pacific) Southeast Asia |

3. Add the same tags:

    | Key     | Value       |
    |---------|-------------|
    | Project | HCP         |
    | Group   | Data Group  |

4. Go to **Review + Create**, wait for validation  
5. Click **Create**

The storage account may take a few minutes to deploy.

## Create the Azure SQL Database

Next, create a SQL database where your structured data will go.

1. Go to **SQL databases** → **Create SQL database**  
2. Enter the following details:

    | Field            | Value                         |
    |------------------|-------------------------------|
    | Subscription     | Azure Subscription 1          |
    | Resource group   | hcpdatagroup                  |
    | Database name    | hcpdevdb                      |
    | Server           | Create New                    |

3. On the **Create SQL Database Server** page, fill in:

    | Field                   | Value                         |
    |-------------------------|-------------------------------|
    | Server name             | hcpdevdvsvr                   |
    | Location                | (Asia Pacific) Southeast Asia |
    | Authentication method  | SQL authentication            |
    | Admin login             | hcpdevdbop1                   |
    | Password                | (Enter your password)         |
    | Confirm password        | (Re-enter your password)      |

4. Back on the main database page:

    | Field                  | Value        |
    |------------------------|--------------|
    | Use elastic pool?      | No           |
    | Workload environment   | Development  |

5. Go to **Networking** and set the following:

    | Setting                                   | Value           |
    |-------------------------------------------|-----------------|
    | Connectivity method                       | Public endpoint |
    | Allow Azure services to access this server| Yes             |
    | Add current client IP address             | Yes             |

6. Go to **Additional settings** and choose:

    | Setting           | Value   |
    |-------------------|---------|
    | Use existing data | Sample  |

This installs a sample version of the Adventure Works database.

7. Go to **Tags** and add:

    | Key     | Value       |
    |---------|-------------|
    | Project | HCP         |
    | Group   | Data Group  |

8. Click **Review + Create** → **Create**.


## Create the Data Factory

Finally, create the Azure Data Factory instance.

1. Go to **Data Factories (V2)** → **Create**

2. Enter the following details:

    | Field              | Value                |
    |--------------------|----------------------|
    | Subscription       | Azure Subscription 1 |
    | Resource group     | hcpdatagroup         |
    | Name               | hcpdevadf            |
    | Region             | Southeast Asia       |
    | Version            | V2                   |

3. Click **Review + Create** → **Create**.

Once the Data Factory is ready, click **Launch Studio** to open Azure Data Factory Studio in a new tab. You can also open it directly by visiting:

```bash
https://adf.azure.com/
```

Inside ADF Studio, click **Pipeline templates** to view the built-in templates provided by Azure.  
You can also create and save your own custom templates.

<div class="img-center">  

<img src="/img/docs/Screenshot-2025-04-20-050718.png" alt="ADF Pipeline Templates">  

</div>