---
title: "TPU Runtime and Interoperability"
description: "TPU runtime version choices and practical TPU and GPU interoperability patterns"
tags:
- Cloud
- GCP
- Google
- Google Cloud
- DevOps
- Certifications
- AI
- Machine Learning
sidebar_position: 40
last_update:
  date: 08/01/2026
---

## Overview

Runtime selection and accelerator portability affect both delivery speed and model performance.

This page covers TPU software versions and practical strategies for switching between TPU and GPU paths.

## TPU Software Version

When creating TPU resources, choose a TPU software version that matches your hardware generation and framework plan.

- Includes the base OS image and runtime dependencies.
- Selected by CLI flags or Cloud Console settings.
- Supports frameworks such as JAX and PyTorch on top of the TPU runtime.

<div class='img-center'>

![](/img/docs/TPUsoftwareversion_screenshot.png)

</div>

<div class='img-center'>

![](/img/docs/Screenshot2026-08-01181007.png)

</div>

**Note**: Runtime mismatches can block launches or degrade performance, so validate runtime and framework compatibility before provisioning large slices.

## Interoperability Between TPU and GPU

Many teams use both TPU and GPU to balance performance, cost, and availability.

### Path 1: Start from TPU-optimized code

- Deploy on TPU when TPU capacity is available.
- Evaluate GPU compatibility if TPU is constrained.
- Estimate conversion effort before changing hardware plans.

<div class='img-center'>

![](/img/docs/Screenshot2026-08-01181138.png)

</div>

### Path 2: Start from GPU-optimized code

- Deploy on GPU when GPU capacity is available.
- Evaluate smaller or alternate GPU options when constrained.
- Assess TPU compatibility and conversion effort when needed.

<div class='img-center'>

![](/img/docs/Screenshot2026-08-01181336.png)

</div>

### Switching with vLLM on GKE

A practical pattern uses custom compute classes and dual container images so the right server starts for the available accelerator.

- Prioritize TPU pools for performance-sensitive workloads.
- Fall back to GPU pools for availability and cost control.
- Use scheduling policies to scale across pools as demand changes.

**Note**: Interoperability is useful, but hardware-specific optimization can still outperform generic portability paths.
