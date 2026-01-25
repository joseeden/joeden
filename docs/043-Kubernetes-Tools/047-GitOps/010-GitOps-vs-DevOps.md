---
title: "GitOps vs. DevOps"
description: "Introduction to GitOps"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - GitOps
  - ArgoCD
sidebar_position: 10
last_update:
  date: 8/19/2022
---

<!-- 
## Scenario: Massive Dynamic’s DevOps Journey  

Massive Dynamic, a software vendor, wants to move its services to the cloud using container technologies. Their **Platform Team** sets up the project from scratch, following best practices.  

- **Multi-cloud infrastructure**  
  - Uses Docker for containerization and Kubernetes for orchestration.  
- **Infrastructure as Code (IaC)**  
  - Manages infrastructure using code instead of manual setups.  
  - Uses Terraform or Ansible with YAML configuration files.   -->

## Problems in DevOps Workflow  

1. **Manual Configuration & Execution**  
   - Team members manually executed scripts on their machines.  
   - No centralized automation for provisioning infrastructure.  

2. **Lack of Version Control & Reviews**  
   - All configurations were stored in a single Git branch.  
   - No code reviews or automated tests for validation.  

3. **Security Risks**  
   - Push-based CI/CD required exposing credentials.  
   - Manual CLI changes led to potential security issues.  

4. **Configuration Drift**  
   - Changes made outside of Git (via CLI) caused inconsistencies.  
   - Difficult to track modifications in case of failures.  

5. **Disaster Recovery Issues**  
   - Infrastructure recovery relied on outdated Git configurations.  
   - Manual changes weren’t logged, making recovery time-consuming.  

## Example: Push-Based CI/CD Issues  

```yaml
# Kubernetes Deployment Config (Example)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: app
          image: my-app:v1
```

If this deployment is modified directly in Kubernetes (`kubectl apply`), Git won’t reflect the actual state. Over time, this leads to **configuration drift** and **uncertain rollback procedures**.  

## Enter GitOps  

GitOps solves these problems by:  

- **Keeping the entire infrastructure and app state in Git**  
- **Automating deployments based on Git changes**  
- **Ensuring the actual cluster state always matches Git**  

With GitOps, teams can recover infrastructure faster, track all changes, and improve security.  

## What is GitOps?  

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

## Example: GitOps Workflow  

1. **Developer Updates Code**  
   - A developer updates a Kubernetes deployment file.  

      ```yaml
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: my-app
      spec:
        replicas: 3
        template:
          spec:
            containers:
              - name: app
                image: my-app:v2 
      ```

2. **GitOps Operator Detects Changes**  
   - It compares the Git repository with the cluster state.  
   - If there’s a difference, it applies the update.  

3. **Automatic Rollback (If Needed)**  
   - If the update causes issues, a simple `git revert` command restores the previous version.  

   ```sh
   git revert HEAD
   git push origin main
   ```

   - The GitOps operator detects the rollback and restores the cluster state.  

## GitOps Principles  

GitOps follows four key principles to automate deployments and maintain system consistency.  

1. **Declarative Over Imperative**  

    - Everything is defined declaratively.  
    - This includes infrastructure and applications.
    - Imperative approach (relies on direct commands) is discouraged.  
    - Storing system states ensures easy reconciliation and consistency.  

2. **Git as the Source of Truth**  

    - All configuration files are stored in a Git repository.  
    - Version control ensures immutability and traceability.  
    - Changes to the system must be recorded in Git before applying.  

3. **Automation with GitOps Operators**  

    - Software agents pull the desired state from Git.  
    - Changes are applied automatically to one or more clusters.  
    - Operators can push updates to multiple environments.  

4. **Continuous Reconciliation**  

    - The system continuously monitors and fixes drift.  
    - The process follows three steps:  

      - **Observe** - Detects changes in Git.
      - **Diff** - Compares the Git state with the cluster.
      - **Act** - Applies changes to match the desired state.


## Example: GitOps Operator in Action  

1. **Declare the desired state in Git**  

      ```yaml
      apiVersion: apps/v1
      kind: Deployment
      metadata:
      name: my-app
      spec:
      replicas: 2
      ```

2. **Operator detects drift and reconciles**  

      ```sh
      git commit -m "Increase replicas to 3"
      git push origin main
      ```

3. **Cluster updates automatically**  
   
   - The GitOps operator applies the changes, ensuring the system is always in sync.  

## GitOps vs. DevOps  

GitOps and DevOps share similar goals but have key differences. DevOps works for any application, while GitOps is mainly used with Kubernetes and containerized environments.  

- **DevOps** → Push changes to the cluster  
- **GitOps** → Operator pulls changes from Git


## DevOps and GitOps Workflows 

- **DevOps Workflow**

    - Developers write and commit code.  
    - CI builds, tests, and creates artifacts.  
    - The image is published to a container registry.  
    - CD applies **kubectl** commands to update clusters.  

    ```sh
    kubectl apply -f deployment.yaml
    ```

- **GitOps Workflow**

    - Uses two Git repositories:  
      - One for application code.  
      - One for Kubernetes manifests.  
    - CI process remains the same until publishing the image.  
    - The manifest repo is updated with the new image.  
    - A pull request (PR) is raised and reviewed.  
    - Once merged, the GitOps operator pulls changes and syncs the cluster.  


      <div class="img-center"> 

      ![](/img/docs/2023-argocd-simple-diagram.png)

      </div>

