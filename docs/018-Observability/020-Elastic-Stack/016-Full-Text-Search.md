---
title: "Full-Text Search"
description: "Using Analyzers to Cotrol Full-Text Search"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Elasticsearch
- DevOps
sidebar_position: 16
last_update:
  date: 3/28/2023
---

## Overview

Analyzers in Elasticsearch help to control how text is indexed and searched. They can be customized for exact or partial matches to improve search accuracy and relevance.

- **Exact Match**
    - Matches the exact text.
    - Use keyword mapping instead of text.
    - Ideal for precise searches like product IDs.

- **Partial Match**
    - Matches parts of the text.
    - Useful for flexible searches like titles or descriptions.

## Searching Keywords 

