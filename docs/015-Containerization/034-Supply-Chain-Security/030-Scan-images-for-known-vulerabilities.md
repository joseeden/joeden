---
title: "Scan Images for Known Vulnerabilities"
description: "Detect security vulnerabilities in container images."
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 30
last_update:
  date: 3/11/2022
---


## Vulnerability

A vulnerability is a weakness in software, hardware, or network systems that attackers can exploit to breach security. Common sources of vulnerabilities include:

- Human error  
- Design flaws  
- Configuration issues  
- Third-party components  
- Unpatched software  
- Zero-day vulnerabilities

For more information, please see [Vulnerabilities.](/docs/007-Cybersecurity/011-Threats-and-Attacks/010-Vulnerabilities.md)


## CVE

CVE (Common Vulnerabilities and Exposures) is a system for identifying known vulnerabilities in software and hardware.

- Provides unique vulnerability identifiers.  
- Helps prioritize and track security issues.

### Identifier 

A CVE identifier has three parts:

- **CVE**: Common Vulnerabilities and Exposures.  
- **YEAR**: The year the CVE was assigned or made public.  
- **NUMBER**: Unique number for the specific vulnerability.

<div class='img-center'>

![](/img/docs/cve-identifier-format.png)

</div>

<div class='img-center'>

![](/img/docs/cve-identifier-format.png)

</div>


### Severity Rating 

CVE vulnerabilities are given severity ratings to indicate their impact and help prioritize fixes.

- Assesses risk based on potential damage.  
- Helps organizations focus on critical vulnerabilities first.

<div class='img-center'>

![](/img/docs/cve-severity-scoresss.png)

</div>


### Common Vulnerability Scoring System

The Common Vulnerability Scoring System (CVSS) assigns scores to CVEs based on their severity. It includes the following components:

- **Base Score**:  
  - Based on impact, exploitability, and complexity.  
  - Reflects the severity of a vulnerability.  
  - Helps prioritize vulnerabilities based on risk.

- **Vector String**:  
  - Summarizes metrics used to calculate the Base Score.  
  - Factors: confidentiality, integrity, and availability.  
  - Concise view of the vulnerability's characteristics.

## CVE Scanners 

CVE scanners for containers detect vulnerabilities in the execution environment, including applications inside containers. More packages usually mean more potential vulnerabilities.

Some popular CVE scanning tools for containers and Kubernetes:

1. **Trivy**  
   - Open-source scanner for containers and OS packages.  
   - Supports multiple formats.
   - Integrates with CI/CD pipelines.  
   - **GitHub:** [aquasecurity/trivy](https://github.com/aquasecurity/trivy)

2. **Clair**  
   - Open-source scanner for container vulnerabilities.  
   - Integrates with container registries.
   - Provides detailed reports.  
   - **GitHub:** [quay/clair](https://github.com/quay/clair)

3. **Kube-bench**  
   - Scans configurations against CIS security benchmarks.  
   - Checks for security configurations and vulnerabilities.  
   - **GitHub:** [aquasecurity/kube-bench](https://github.com/aquasecurity/kube-bench)

4. **Kube-hunter**  
   - Actively scans Kubernetes clusters for vulnerabilities.  
   - Identifies potential attack vectors.  
   - **GitHub:** [aquasecurity/kube-hunter](https://github.com/aquasecurity/kube-hunter)

5. **Kubeaudit**  
   - Scans Kubernetes manifests for issues and best practices.  
   - Focuses on misconfigurations.  
   - **GitHub:** [kubeaudit/kubeaudit](https://github.com/kubeaudit/kubeaudit)

6. **Tranchess**  
   - Scans containers for vulnerabilities
   - Checks misconfigurations and license compliance.  
   - Provides security posture insights.  
   - **GitHub:** [tranchess/tranchess](https://github.com/tranchess/tranchess)

7. **Kritis**  
   - Policy engine for Kubernetes 
   - Enforces container image signing.  
   - Ensures only signed images are deployed.  
   - **GitHub:** [kritis-compliance/kritis](https://github.com/kritis-compliance/kritis)

8. **Gatekeeper (OPA Gatekeeper)**  
   - Enforces policies on Kubernetes resources using OPA
   - Ensures security and operational compliance.  
   - **GitHub:** [open-policy-agent/gatekeeper](https://github.com/open-policy-agent/gatekeeper)

Make sure to integrate these tools into your CI/CD pipeline or regular security scans. 


## Trivy 

Trivy is a comprehensive security scanner that detects vulnerabilities across various targets and identifies security issues.

Targets (what Trivy can scan):

- Container Image
- Filesystem
- Git Repository (remote)
- Virtual Machine Image
- Kubernetes
- AWS

Scanners (what Trivy can find there):

- OS packages and software dependencies in use (SBOM)
- Known vulnerabilities (CVEs)
- IaC issues and misconfigurations
- Sensitive information and secrets
- Software licenses

To use Trivy to scan an image:

```bash
trivy image <image-name> 
```

<div class='img-center'>

![](/img/docs/trivy-running-how-to-run.png)

</div>


We can pass other flags to filter the severities:

```bash
trivy image --severity CRITICAL nginx:1.18.0 
trivy image --severity CRITICAL,HIGH nginx:1.18.0
trivy image --ignore-unfixed nginx:1.18.0
```

We can also scan images that are in archive format:

```bash
docker save nginx:1.18.0 > nginx.tar 
trivy image --input archive.tar 
```

For more information, please see the [official Trivy Github repository.](https://github.com/aquasecurity/trivy) 

## Best Practices

To ensure container security, follow these best practices:

- Rescan images regularly  
- Integrate with Kubernetes Admission Controllers  
- Use a repository with pre-scanned images  
- Include scanning in your CI/CD pipeline  


 

 
