---
title: "GitOps Basics"
description: "GitOps Basics"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - GitOps
  - ArgoCD
sidebar_position: 15
last_update:
  date: 8/19/2022
---

## Overview 

GitOps is a framework that uses Git as the single source of truth for infrastructure and application deployments. It automates updates, ensures consistency, and enables rollbacks.  

- **Version Control with Git**  
  - All infrastructure and application configurations are stored in Git.  
  - Changes are made in feature branches before merging into the main repository.  

- **Continuous Integration (CI)**  
  - New code is automatically built and tested.  
  - Changes are reviewed and merged into the central repository.  

- **Continuous Deployment (CD)**  
  - Changes are automatically deployed to the cluster.  
  - A GitOps operator ensures the actual state matches the desired state in Git.  

## Push vs. Pull Deployment  

Deployment tools use **push-based** or **pull-based** approaches. Push-based relies on CI/CD pipelines to deploy changes, while pull-based uses an operator inside Kubernetes to fetch updates.  

- **Push-Based** - CI/CD system deploys changes.
- **Pull-Based** - GitOps operator pulls updates inside Kubernetes.

### Push-Based Deployment

Push-based deployment relies on CI/CD pipelines to send updates directly to the cluster.

- CI/CD pushes updates to the cluster.  
- Requires Kubernetes credentials in the CI system.  
- Cluster access is stored externally, raising security risks.  

    ```sh
    kubectl apply -f deployment.yaml
    ```

**Pros:**  

  - Works with different CI/CD tools (e.g., Jenkins, Azure DevOps).  
  - Secrets can be managed in CI pipelines.  
  - Supports Helm chart deployments easily.  

**Cons:**  

  - Tied to a specific CI system.  
  - Cluster credentials must be exposed.  
  - Migration to a new CI/CD tool requires changes.  


### Pull-Based Deployment (GitOps)

Pull-based deployment uses an operator inside Kubernetes to fetch and apply updates.

- Operator runs inside Kubernetes and fetches updates.  
- CI/CD only interacts with the container registry.
- Cluster credentials are not exposed externally.

**Pros:**  

- Deployment is **independent of CI/CD pipelines**.  
- **No external users** can modify the cluster.  
- Supports **multi-tenant deployments** (e.g., different teams using separate namespaces).  
- Can **auto detect and deploy new images** from registries.  

**Cons:**  

- Managing **secrets is more complex** than push-based.  
- Secrets must be **encrypted** before storing in Git.  
- Use **HashiCorp Vault** or **Sealed Secrets** for decryption.  

    ```sh
    kubeseal < my-secret.yaml > my-encrypted-secret.yaml
    ```

## Declarative and Automated Deployment

GitOps uses Git as a single source of truth for managing infrastructure and applications.  

- Everything is stored in a Git repository.  
- Git history tracks all changes and rollbacks.  
- Ensures automation and consistency across deployments.  
- Can easily rollback to a working version. 

<div class="img-center"> 

![](/img/docs/2023-argocd-simple-diagram.png)

</div>

## Key Features

- **Single Source of Truth**  
  - The Git repository defines the desired state.  
  - Any changes are made through Git commits.  

- **Automated Continuous Deployment**  
  - Applications are auto-deployed based on the Git state.  
  - Ensures consistency between Git and the Kubernetes cluster.  

- **Infrastructure as Code**  
  - Kubernetes resources are managed declaratively.  
  - Applies the same process to infrastructure as applications.  

- **Auto-Reconciliation**  
  - Constantly compares the cluster state with Git.  
  - Reverts unauthorized changes to maintain consistency.  

- **Drift Detection**  
  - Identifies unexpected changes in cluster configurations.  
  - Helps prevent misconfigurations before they cause issues.  

- **Multi-Cluster Deployment**  
  - A single GitOps operator can manage multiple clusters.  
  - No need for separate setups on each cluster.  


## Challenges of GitOps

GitOps simplifies deployments but comes with challenges.  

- **Secret Management**  
  - Secrets must be stored in Git, which is risky.  
  - Sealed Secrets or HashiCorp Vault are needed.  

    ```sh
    kubeseal < my-secret.yaml > sealed-secret.yaml  # Encrypt secret before storing in Git
    ```

- **Repository Management**  
  - More applications mean more Git repositories.  
  - Single repo or multiple repos for source code and manifests.  

- **Frequent Updates & Merge Conflicts**  
  - Continuous updates create frequent Git commits.  
  - Conflicts arise when multiple pipelines modify the same repository.  
  - Manual intervention may be needed to resolve conflicts.  

- **Governance & Compliance**  
  - GitOps uses pull requests for approvals.  
  - Once approved, no built-in policy enforcement exists.  
  - Malformed YAML files can cause deployment failures.  

## GitOps Tools

GitOps tools help automate deployments and manage Kubernetes clusters declaratively. Here are some popular options:  

- **ArgoCD** – Continuous deployment tool for Kubernetes.  
- **FluxCD** – Progressive delivery and automation for Kubernetes.  
- **Helm Operator** – Automates Helm chart releases using GitOps.  
- **Flagger** – Supports canary, A/B testing, and blue/green deployments.  
- **Atlantis** – Automates Terraform execution via pull requests.  
- **Autoapply** – Applies Git repository changes to Kubernetes automatically.  
- **GitKube** – Deploys Docker images to Kubernetes via `git push`.  
- **Jenkins X** – CI/CD platform with built-in GitOps and preview environments.  
- **KubeStack** – Uses Terraform for Kubernetes infrastructure management.  
- **Weave GitOps** – Provides automation and policy enforcement for Kubernetes.  
- **PipeCD** – Supports Kubernetes, serverless, and infrastructure deployments.  

**Example: Deploying an app with ArgoCD**  

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
spec:
  destination:
    namespace: default
    server: https://kubernetes.default.svc
  source:
    repoURL: https://github.com/example/my-app.git
    path: manifests
    targetRevision: HEAD
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

ArgoCD will automatically sync the application with the Git repository, and ensure the cluster always matches the desired state.