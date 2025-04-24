---
title: "Integration Runtimes"
description: "Integration Runtimes"
tags: 
- Data Engineering
- Databases
- Microsoft Azure
- Azure Data Factory
sidebar_position: 12
last_update:
  date: 10/14/2021
---

## Overview

Azure Data Factory uses integration runtimes (IR) to move and transform data.

- There are 3 types of integration runtimes
- Each is designed for specific scenarios
- You choose one based on where your data lives and how you want to process it

Integration runtimes are the compute engines behind ADF. Picking the right one depends on whether your data is in the cloud, on-premises, or requires special tools.

## Azure Integration Runtime

This runtime is used for cloud-based data movement and transformation.

- Works for public cloud data (Azure, AWS, Google Cloud, etc.)
- Supports cloud connectors like Salesforce, SAP, and others
- Automatically created when you set up ADF

Azure IR is serverless. You only pay for what you use, measured in Data Integration Units (DIUs), which combine CPU, memory, and network.

Use this when your data sources and destinations are public and cloud-based.

## Self-Hosted Integration Runtime

Use this when working with private data sources or internal networks.

- Used for on-premises data or VMs inside a private Azure network
- Requires installing an agent on a local Windows machine
- Communicates with ADF through secure outbound HTTP only

To set it up:
- Download and install the integration runtime agent
- Use a Windows machine (64-bit) and make sure Java is installed
- You can scale by installing the agent on more machines

This runtime lets you connect to private data without exposing it to the internet.

## Azure SSIS Integration Runtime

This is used for running existing SSIS packages in Azure.

- Ideal for lift-and-shift scenarios
- Only runs SSIS packages (not ADF pipelines or data flows)
- Requires setting up a virtual machine during creation

Configuration includes:
- VM size and number of nodes
- SQL Server edition (Standard or Enterprise)
- Optional custom scripts or your own license (Azure Hybrid Benefit)

Once deployed (takes ~20 mins), you can manage SSIS packages using the usual tools like SQL Server Management Studio (SSMS).

Choose this if you're migrating existing SSIS workflows to Azure without rewriting them.

## Which Runtime Should You Use?

Choosing the right IR depends on your needs.

- Use **Azure IR** if your data is cloud-based and publicly accessible
- Use **Self-hosted IR** if your data is on-premises or inside a private network
- Use **Azure SSIS IR** only if you need to run SSIS packages in Azure

Start with Azure IR when possible—it’s easier, cheaper, and fully managed.