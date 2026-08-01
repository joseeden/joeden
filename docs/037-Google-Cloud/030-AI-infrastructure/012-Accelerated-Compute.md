---
title: "Accelerated Compute"
description: "CPU, GPU, and TPU roles for AI training and inference"
tags:
- Cloud
- Google
- Google Cloud
- DevOps
- AI
- Machine Learning
sidebar_position: 12
last_update:
  date: 11/09/2024
---

## Overview

Performance-optimized AI infrastructure depends on three core hardware layers: networking, storage, and compute.

This page focuses on compute, and how CPU, GPU, and TPU architectures affect AI training and inference performance.

| Accelerator | Primary Strength                          | Typical AI Role                                    | Main Constraint                                       |
| ----------- | ----------------------------------------- | -------------------------------------------------- | ----------------------------------------------------- |
| CPU         | Flexibility and general-purpose execution | Preprocessing, orchestration, and lighter serving  | Sequential memory access can limit matrix throughput. |
| GPU         | Massive parallel arithmetic throughput    | Large-scale training and high-throughput inference | Frequent memory and register access overhead.         |
| TPU         | Specialized matrix acceleration           | Tensor-dominant training and inference at scale    | Best results require TPU-aligned frameworks and ops.  |

## Why Compute Choice Matters

Modern AI workloads are dominated by matrix operations, and especially multiply-accumulate operations.

- General-purpose processors can run AI workloads, but often less efficiently.
- Parallel/specialized designs can improve throughput by an order of magnitude.
- Data movement patterns often decide real-world performance.

In practice, AI performance is shaped by both raw compute capability and memory-access behavior.

## CPU: Central Processing

Central processing units (CPUs) are general-purpose processors and are still important in AI systems.

- Handle data preprocessing and orchestration tasks.
- Manage control flow for ML programs.
- Support lighter inference and lower-cost serving.

At a high level, CPUs follow a von Neumann architecture pattern.

- Load values from memory.
- Perform arithmetic operations.
- Store results back to memory.

This model is highly flexible, and it allows CPUs to support a wide range of software from business systems to scientific applications.

<div class='img-center'>

![](/img/docs/T-AIHYPE_Rise_Mod2-5.png)

</div>

However, the sequential memory access, often called the **Von Neumann bottleneck,** can limit a CPU's overall processing speed, as memory access is significantly slower than the calculation itself.

<div class='img-center'>

![](/img/docs/T-AIHYPE_vonNeumannbottleneck2.png)

</div>

## GPU: Parallel Processing

GPUs were originally built for graphics workloads, and they are now a primary accelerator for deep learning.

Their main advantage is high parallel throughput.

- Include thousands of arithmetic logic units (ALUs).
- Run many multiply-add operations in parallel.
- Perform well on neural network matrix math.

Modern GPUs commonly expose tens of thousands of ALUs in one processor footprint. 
GPUs' parallel processing model often delivers much higher deep learning training throughput than CPUs.

<div class='img-center'>

![](/img/docs/cpuversusgpu.png)

</div>

Note that GPUs remain general-purpose processors, and they still need frequent register and shared-memory access.

- Intermediate tensor values are fetched and stored repeatedly.
- Efficiency depends on memory hierarchy behavior.

Newer GPU architectures have tried to improve this pattern with specific optimizations but they still rely on general-purpose memory access patterns.

## TPU: Tensor Processing

Tensor Processing Units (TPUs) are application-specific integrated circuits (ASICs) designed by Google for machine learning workloads.

Their key architectural advantage is the systolic array.

- Thousands of multiply-accumulate units connect in a physical matrix.
- Matrix operations flow through the array without repeated memory round trips.
- The design is optimized for tensor-dominant workloads.

For example, a Trillium TPU processor includes two Matrix Multiply Units (MXUs) and a scalar unit.

## TPU Data Flow Model

The TPU execution path is designed to reduce memory overhead during core math operations.

1. Stream input data from host to infeed queue.
2. Stage data in high-bandwidth memory (HBM).
3. Load parameters and tensors into MXUs.
4. Forward intermediate multiply results across the systolic array.
5. Emit results through an outfeed queue to the host.

Because partial results move directly between compute elements, matrix multiplication avoids repeated memory access during the core operation.

:::tip

TPUs are often the best fit when your workload is large, parallel, and dominated by dense tensor math.

:::


## Choosing the Right Accelerator

Use workload shape, software stack, and operational goals to choose compute.

- Choose CPU-first paths for flexibility and low-cost control.
- Choose GPU-first paths for broad ecosystem support and parallel performance.
- Choose TPU-first paths for tensor throughput and large-scale efficiency.

**Note**: Most production AI systems combine these accelerators, with CPUs handling orchestration and data paths while GPUs or TPUs run the dominant model math.
