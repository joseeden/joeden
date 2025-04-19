---
title: "Preparing the Environment"
description: "Preparing the Environment"
tags: 
- Data Engineering
- Databases
- Microsoft Azure
- Azure Data Factory
sidebar_position: 13
last_update:
  date: 10/14/2021
---

## Overview

add short simple intro of what this page is...using microft azure for environment...you can sign up for the free trial...

- [Create Your Azure Free Account Or Pay As You Go](https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account)

## Create the Resource Group  

add simple short intro...

1. Sign-in to Microsoft Azure.
2. Go to **Resource Groups** --> **Create**
3. Provide the resource group details:

format to table...

Subscription: Azure Subscription 1
Resource group name: hcpdatagroup
Region: (Asia Pacific) Southeast Asia

4. Add tags..

format to table..
Project: HCP 
Group: Data Group

5. Click **Next** --> **Create**

## Create the Storage Account 

add simple short intro...

1. Go to Storage Account --> Create sTORAGE account
2. Provide details..

format to table...

Subscription: Azure Subscription 1
Resource group: hcpdatagroup 
Storage account name: hcpdevsstore
Region: (Asia Pacific) Southeast Asia

3. Go to tags and add the same tags:

format to table..
Project: HCP 
Group: Data Group

4. Go to Review + Create tab and wait for validation to finish 
5. Click Create 

The storgae account creation will take a few minutes to finish.


## Create the Azure SQL Database  

add simple short intro...


1. Go to SQL Databases --> Create SQL database
2. Provide details..

format to table...

Subscription: Azure Subscription 1
Resource group: hcpdatagroup 
Storage account name: hcpdevsstore
Region: (Asia Pacific) Southeast Asia

3. Go to tags and add the same tags:

format to table..
Project: HCP 
Group: Data Group