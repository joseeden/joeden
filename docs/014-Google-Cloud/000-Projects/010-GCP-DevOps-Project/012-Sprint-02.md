---
title: "Sprint 02"
tags: 
- Google Cloud
- DevOps
- Cloud
sidebar_position: 12
last_update:
  date: 9/21/2020
---

## Todo

Todo:

✔️ Setting up a GKE cluster.
✔️ Verify connection to the GKE cluster.


## Steps 

1. Login to your GCP account and go to the GKE menu. Click CREATE > Standard: You manage your cluster > CONFIGURE. 

    ![](/img/docs/gcp-devops-project-create-gke-cluster.png)

2. Provide the following specifics for the cluster:

    Basics: 

    - Name: cluster-1
    - Location type: Zonal 
    - Zone: asia-southeast1-a

    ![](/img/docs/gcp-devops-project-create-gke-cluster-clsuter-1-asia.png)


3. The cluster creation may take up 5-10 mins. Once done, it should appear in the Clusters menu. Click the clsuter name to see details of the cluster. 

    ![](/img/docs/gcp-devops-project-cluster-1-created-yeyy.png)

4. **Maintenance window**. For production environments, it is recommended to change the maintenance window from Any time to xx.  

<!-- Clusters > select cluster > Details > Automation -->


5. To connect to the cluster, click CONNECT. It will show the available options to connect to the cluster. Click RUN IN CLOUD SHELL. This will open a Linux terminal.

    ![](/img/docs/gcp-devops-project-connect-the-gke-cluster-cluster-1.png)

    In the "Authorize Cloud Shell" window, click AUTHORIZE. A kubeconfig will then be generated.  



    Run some kubectl commands to test.

    ```bash
    kubectl get ns  
    kubectl get po -n kube-system  
    ```

    **Note:** These information can also be seen from the GCP console.

