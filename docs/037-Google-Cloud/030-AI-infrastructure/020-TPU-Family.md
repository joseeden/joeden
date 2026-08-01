---
title: "TPU Family"
description: "Overview of the Cloud TPU family"
tags:
- Cloud
- Google
- Google Cloud
- DevOps
- AI
- Machine Learning
sidebar_position: 20
last_update:
  date: 11/09/2024
---

## Overview

The Cloud TPU family includes different generations optimized for different AI workloads.

- Some generations focus on large-scale inference.
- Some focus on distributed training performance.
- Each generation has different topology, memory, and scaling characteristics.

Use this page to compare the main TPU generations and choose the right fit for your workload.

<div class='img-center'>

![](/img/docs/Rise-AIHypercomputerArchitecture_GoogleTPUevolution.png)

</div>

## Ironwood: Inference acceleration

Ironwood is designed for high-performance, scalable, and energy-efficient inference.

It supports the shift from reactive AI outputs to proactive AI agents that retrieve, generate, and interpret data at scale.

<div class='img-center'>

![](/img/docs/ironwood6.png)

</div>

Ironwood is built for advanced model workloads, including LLMs, Mixture of Experts (MoEs), and reasoning workloads, while reducing on-chip data movement and latency.

**Key performance metrics:**

- Peak compute per chip: 4,614 TFLOPs.
- HBM capacity per chip: 192 GB.
- HBM bandwidth per chip: 7.37 TB/s.
- Inter-Chip Interconnect (ICI) bandwidth: 1.2 TBps bidirectional.

**Scalability and power efficiency:**

- Pod scale: Up to 9,216 liquid-cooled chips.
- Aggregate compute: 42.5 exaflops for a 9,216-chip pod.
- Power efficiency: 2x performance per watt versus Trillium, and about 30x better power efficiency than Cloud TPU v2 (2018).

Ironwood is a strong fit for large inference fleets that need both performance and efficiency.

## Cloud Trillium

Trillium (v6e) is a newer Cloud TPU generation designed for high performance and efficiency.

Each Trillium chip has one TensorCore, and each TensorCore includes two Matrix Multiply Units (MXUs), a vector unit, and a scalar unit. A TPU Trillium VM can have 1, 4, or 8 chips, and slices with 4 chips or fewer use the same NUMA node.

<div class='img-center'>

![](/img/docs/T-AIHYPE_Rise_m3_mw-17copy-2x-2.png)

</div>


Trillium shares core architecture ideas with v5e, while delivering major improvements.

How to specify Trillium:

| API         | Example                                                                         |
| ----------- | ------------------------------------------------------------------------------- |
| **TPU API** | Use the `AcceleratorType` parameter, such as `v6e-8` for an 8-TensorCore slice. |
| **GKE API** | Use the `--machine-type` flag, such as `t6e-standard-8t`.                       |


### Key benefits

Trillium improves performance, memory behavior, and model flexibility.

- Higher peak compute and bandwidth per chip.
- 2x HBM capacity and 2x HBM bandwidth per chip versus v5e.
- SparseCore support for embedding-heavy models, including recommendation systems.
- Optimized for transformer, text-to-image, and CNN training, fine-tuning, and serving.

Trillium is a practical choice when you need newer-generation training and serving efficiency.

## Cloud TPU v5p

Cloud TPU v5p is a high-performance generation focused on scale and 3D interconnect topology.

Each v5p chip includes one TensorCore, with four MXUs, one vector unit, and one scalar unit.

v5p adds reliability features for large-scale distributed workloads.

- ICI resiliency is enabled by default for one-cube-or-larger slices, such as `v5p-128` or `4x4x4`.
- This improves fault tolerance and scheduling availability.

Cloud TPU v5p is a strong option for very large distributed training jobs.

<div class='img-center'>

![](/img/docs/TPU_v5L_Pod_-_Front_View_-_Web-max-2600x2600.jpg)

</div>

### Topology and scale

The v5p generation is designed for large topologies and high chip-count training.

- All 4x4x4 (one cube) and larger v5p slices use full 3D torus connectivity.
- Smaller-than-cube slices are 3D connected, but they do not include torus wrap-around links.
- A v5p pod contains 8,960 chips with flexible high-speed networking.

Scaling workloads: 

- Single-slice training scales up to 6,144 chips.
- Multislice can scale up to 18,432 chips.

### Specifications

You can select v5p through both TPU API and GKE API options.

| API         | Example                                                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| **TPU API** | Use `AcceleratorType` with format `v$VERSION_NUMBERp-$CORES_COUNT`, such as `v5p-256` for 256 TensorCores (128 chips). |
| **GKE API** | Use machine type `ct5p-hightpu-4t` for v5p TPU VMs.                                                                    |


## TPU v4

Cloud TPU v4 provides strong distributed performance with flexible 3D topology options.

Each TPU v4 chip has two TensorCores, and each TensorCore includes four MXUs, one vector unit, and one scalar unit.

<div class='img-center'>

![](/img/docs/T-AIHYPE_Rise_m3_mw-17-copy-2-2x.png)

</div>

### Improvements 

Compared to v3, v4 improves both compute and memory behavior.

| Improvement              | Description                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **NUMA locality**        | Bind training scripts to NUMA node 0 for better throughput in CPU-heavy paths.                                         |
| **Unified HBM**          | A unified 32-GiB HBM space across both TensorCores improves coordination.                                              |
| **Improved HBM and DMA** | Better memory throughput and improved direct memory access for high-performance striding.                              |
| **TensorCore updates**   | More MXU capacity, higher clock rates, greater transposition and permutation bandwidth, and faster MXU weight loading. |

### Topology specifications

Cloud TPU v4 supports multiple topology options for different communication patterns.

| Topology     | Description                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| **3D mesh**  | Chips connect to their nearest neighbors across three dimensions.                                                    |
| **3D torus** | Certain dimensions, such as `2A=B=C` or `2A=2B=C`, can be configured as a torus for better communication efficiency. |

The diagram below shows common Cloud TPU v4 topology layouts.

<div class='img-center'>

![](/img/docs/T-AIHYPE_Rise_M3_74_1.png)

</div>