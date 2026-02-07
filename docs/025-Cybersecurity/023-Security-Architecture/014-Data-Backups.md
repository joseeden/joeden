---
title: "Data Backups"
description: "Backup Types and Considerations"
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
sidebar_position: 14
last_update:
  date: 1/30/2024
---



## Considerations

Data Backup involves creating duplicate copies of critical data and storing them off-site. These backups serve as a safeguard in case the primary data becomes unavailable due to a disaster or incident.

- On-premises 
  - Tape 
  - Network-Attached Storage (NAS) 
  - Storage Area Network (SAN)
- Offsite 
  - Cloud
- Frequency
  - Daily 
  - Weekly 
  - Bi-monthly 
  - Monthly
- Compression 
- Encryption 
- Type of Backup
- Virtual Machines  
  - Snapshots 
  - Custom images

## Data Recovery Process 

1. **Selection of Backup**
   - Identify the most recent and relevant backup.
   - Ensure backup integrity and completeness.
   - Choose the appropriate backup type (full, incremental, differential).

2. **Initiating the Recovery Process**
   - Load the backup data onto the recovery system.
   - Follow the recovery protocol for the specific backup software.
   - Monitor the progress to identify any issues early.

3. **Data Validation**
   - Verify the completeness of the recovered data.
   - Check for any corruption or missing files.
   - Compare the restored data with the original backup.

4. **Testing and Validation**
   - Test the recovered data in a controlled environment.
   - Ensure all applications and services function correctly.
   - Confirm data integrity and usability.

5. **Documentation and Reporting**
   - Record the recovery process steps and outcomes.
   - Document any issues encountered and their resolutions.
   - Generate a comprehensive report for stakeholders.

6. **Notification**
   - Inform relevant parties of the recovery completion.
   - Provide details on the restored data and any discrepancies.
   - Communicate any follow-up actions required.

## Data Backup Strategies 

Effective data backup strategies help organizations recover from data loss incidents and minimize downtime.

- **Robotic Tape Changers**
  - Automate the process of managing and swapping tape storage.
  - Increase efficiency in data backup and retrieval processes.

- **Offsite Backups**
  - Store backup data at a geographically separate location.
  - Protect data from local disasters, such as fire or flooding.

- **Hot Backups**
  - Also known as **quiescent or snapshots**.
  - Data is backed up while system remains operational; less downtime.

- **On-demand Backups**
  - Initiated manually or based on specific user requests.
  - Provide flexibility for immediate data protection when needed.

- **Disk-to-disk Backups**
  - Transfer data directly from one disk to another, speeds up process.
  - Facilitate faster recovery times compared to tape backups.

- **Remote Journalling**

  - Log shipping for database recovery
  - Only transaction information is captured, not the whole copy.
  - Quick recovery of recent transactions in case of data loss.

- **Electronic Vaulting**

  - Data is backed up locally to a tape, then copied to a remote site.
  - The backup could be copied electronically over the internet.
  - Uses a lot of internet resources and bandwidth.
  - Encryption (VPN) must be used while transferring over internet.
  - Ensures data is regularly updated and protected from loss.


## Data Backup Types

- **Normal/Full Backup**

  - Copies all selected files and data.
  - Provides a complete snapshot at a specific point in time.
  - Archive bit is reset to indicate each file has been backup.

- **Incremental Backup**

  - Copies only the data that has changed since the last backup.
  - All sets are used to restore the data; **fast to backup but slow to restore.**
  - Efficient in terms of storage space but may require multiple backups for a complete restore.
  - Archive bit is reset to indicate each file has been backup.

- **Differential Backup**

  - Copies all the data that has changed since the last full backup.
  - Requires two sets to restore the data; **slow to backup but faster to restore.**
  - Requires less time for restoration compared to incremental backups.
  - Archive bit is NOT reset - differential don't reset bit.

- **Mirror Backup**

  - Creates an exact copy of the source data.
  - Ensures a one-to-one replica of the original but may not offer versioning.

- **Snapshot Backup**

  - Captures the state of the system or data at a specific point in time.
  - Provides a consistent view for backup purposes without affecting ongoing operations.

- **Cloud Backup**

  - Involves storing data in an offsite cloud environment.
  - Enhances data accessibility and provides a secure offsite backup solution.


## Validating Backups

Validating backups is important to ensure they are completed successfully and that critical business operations can continue in the event of a disaster. Without proper validation, backups may fail unnoticed, risking data loss and downtime.

- **Built-in Backup Verification Mechanisms**
  - Use software's built-in verification
  - Enable it, if it is not on by default.
  - Review backup logs for errors or warnings.
  - Log any backup failures as incidents in the ITSM system for follow-up.

- **Regularly Test Backups**
  - Perform simple restoration tests to verify backup integrity.
  - Schedule regular full restore drills to ensure backups work in real scenarios.
  - Document and analyze test results to improve future processes.

## Resources 

- [What are the 3 types of backup?](https://iosafe.com/data-protection-topics/3-types-of-backup/)
- [How to Back Up Your Computer](https://www.nytimes.com/wirecutter/guides/how-to-back-up-your-computer/)