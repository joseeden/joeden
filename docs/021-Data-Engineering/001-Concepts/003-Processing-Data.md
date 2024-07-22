---
title: "Processing Data"
description: "Notes from DataCamp's Understanding Engineering Course"
tags: [Data Engineering]
sidebar_position: 3
last_update:
  date: 2/27/2022
---


## Data Processing 

Data processing is essential for transforming raw data into useful information. It involves converting unprocessed data into formats that are easier to analyze and use. 

- **Data Conversion**
   - Raw data is converted into structured formats.
   - For example, large audio files are compressed to reduce size while maintaining quality.

- **Cost Efficiency**
   - Processing reduces the amount of storage and network bandwidth needed.
   - Compressed data is smaller and more manageable than uncompressed data.

### Processing Data 

In music streaming platforms, data is processed to optimize performance and reduce costs. For instance, high-quality audio files are converted into a lighter format for streaming.

- **File Conversion**
   - Master files (e.g., wav, flac) are converted to smaller .ogg files.
   - This reduces network costs while streaming.

- **Metadata Extraction**
   - Metadata from music files is extracted and stored in a database.
   - Allows for easy access and analysis by data scientists.

### Responsibilities of Data Engineers

Data engineers handle various aspects of data processing to ensure it is clean, well-structured, and optimized for analysis.

- **Data Manipulation and Cleaning**
   - Tasks that can be automated.
   - Remove corrupted files and handle missing metadata.
   - Decide on actions for incomplete data, like default values.

- **Data Structuring**
   - Ensure data is stored in an organized format within databases.
   - Create views for combining data from multiple tables for easier analysis.

- **Performance Optimization**
   - Index data to improve retrieval speed and efficiency.

## Scheduling 

Scheduling is essential for managing data processing tasks. It ensures that tasks are executed in the correct order and dependencies are resolved efficiently. 

- Organizes tasks to work together smoothly.
- Manages execution order and dependency resolution.

### Types of Scheduling

There are several methods for scheduling tasks, each with its own use cases.

- **Manual Scheduling**
   - Tasks are executed by human intervention.
   - Not automated
   - Example: Updating an employee record manually when someone changes offices.

- **Time-Based Scheduling**
   - Tasks are set to run at specific times.
   - Example: Updating the employee database every morning at 6 AM.

- **Sensor-Based Scheduling**
   - Tasks run based on specific conditions.
   - Sounds like best option, but requires sensors always listening.
   - More sensors means more resources required.
   - Example: Updating the departments table only if a new employee is added.

### Batch and Stream Processing

Data ingestion methods affect how data is processed and used.

- **Batch Processing**
   - Data is collected and processed in groups at set intervals.
   - Typically more cost-effective and scheduled during off-peak hours.
   - Example: Updating employee data every morning, or processing songs in batches every ten minutes.

- **Stream Processing**
   - Data is processed individually as it arrives.
   - Individual records are sent though the pipeline as soon as they are updated.
   - Necessary for real-time applications where immediate updates are required.
   - Example: Immediate updates to user profiles upon signup or streaming songs for online listening.

### Scheduling Tools

Various tools assist in scheduling and managing data workflows.

- **Apache Airflow**
   - A tool for managing and scheduling complex workflows.
   
- **Luigi**
   - A tool for batch processing and pipeline management.


## Parallel Computing 

Parallel computing or Parallel Processing is fundamental to modern data processing tools, primarily addressing memory and processing power challenges. It involves breaking down a large processing task into smaller subtasks, which are then distributed across multiple computers.

- Manages memory more efficiently by distributing data.
- Enhances processing power by using multiple computers.

To understand parallel computing, consider an analogy involving folding t-shirts in a store.

- One senior sales assistant can fold 100 shirts in 15 minutes.
- Junior sales assistants need 30 minutes for the same amount.
- Using one assistant, it takes 2 hours and 30 minutes to fold 1000 shirts.
- Splitting the task into 250 shirts per assistant, four junior assistants can fold all shirts in 1 hour and 15 minutes.

### Benefits and Risks

Parallel computing offers significant advantages but also comes with trade-offs.

- **Benefits**
   - Increases processing power by using multiple units.
   - Reduces memory load by partitioning data across computers.

- **Risks**
   - Data movement and communication between processes can incur costs.
   - Combining subtasks into a final result can add extra time.

### Additional Considerations

In the t-shirt folding analogy, organizing shirts into piles and recombining them adds extra time to the overall process.

- Separating into piles takes 10 minutes.
- Recombining folded shirts takes another 5 minutes.
- Total time becomes 1 hour and 30 minutes, instead of 1 hour and 15 minutes.

Music streaming platforms utilizes parallel computing to enhance efficiency in data processing.

- Converts songs from lossless formats to .ogg.
- Distributes processing tasks to multiple computers to handle large volumes efficiently.