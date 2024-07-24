---
title: "Dynamic Data Masking"
description: "Dynamic Data Masking in Azure SQL"
tags: [Cloud, Microsoft Azure, DevOps, Security, Certifications]
sidebar_position: 5
last_update:
  date: 7/18/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::




## Overview

Dynamic Data Masking (DDM) is a technology supported by Azure SQL Database, Azure SQL Managed Instance, and Azure Synapse Analytics. 

- Limits exposure to sensitive data by dynamically masking it for users who lack the necessary permissions
- DDM operates as a policy-based security feature, concealing specific sensitive data returned from database queries 
- DDM hides sensitive data without altering the data stored in the database.

## Use Case

An example scenario for DDM involves a call center employee who needs to identify a caller by confirming the last four digits of their social security number. 

- The employee doesn't require access to the entire social security number 
- DDM allows the definition of masking rules to hide sensitive data in query result sets
- Enables employees to perform tasks without unnecessary data exposure

## Configuration

### Accessing Dynamic Data Masking

- **For SQL Database**
    - Use the Dynamic Data Masking blade under Security in the SQL Database configuration pane.

    ![](/img/docs/azure-sql-dynamic-data-masking.png)
    

- **For SQL Managed Instance** 
    - Configuration is performed using PowerShell or REST API.
    - Not available in the Portal.

### Settings to Configure

- **Excluded Users**
    - Specifies SQL users or Azure AD identities excluded from masking.
    - Users with administrator privileges are always excluded.
    
- **Masking Rules**
    - Defines fields to be masked using schema name, table name, and column name.
    - Specifies the masking function for each rule.

- **Masking Functions**
    - Determines how data is exposed under specific conditions.



## Masking Functions

| Function                  | Description                                                   |
|---------------------------|---------------------------------------------------------------|
| Default                   | Reveals a default value for masked data.                      |
| Email                     | Shows the first character and replaces the rest with '*' for email addresses. |
| Custom String             | Reveals a specified prefix and replaces the rest with '*' for strings. |
| Random                    | Randomly masks a portion of the data.                         |
| Credit Card               | Shows the last four digits of a credit card number.           |
| Social Security Number    | Shows the last four digits of a social security number.       |
| Number                    | Shows a random portion of a number.                           |


For more information: [Azure Official Documentation](https://docs.microsoft.com/azure/sql-database/sql-database-dynamic-data-masking-get-started).


## Resources 

- [Learning About Azure](https://cloudacademy.com/learning-paths/learning-about-azure-5663/) -->
