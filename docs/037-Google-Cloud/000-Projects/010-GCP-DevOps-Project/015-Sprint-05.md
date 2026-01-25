---
title: "Sprint 05"
tags: 
- Google Cloud
- DevOps
- Cloud
sidebar_position: 15
last_update:
  date: 9/21/2020
---


## Todo

Todo:

✔️ Create the namespace in the GKE cluster
✔️ Create the deployment manifest 
✔️ Expose the application via endpoint
✔️ Update the Cloud Build code for deployment
✔️ Validate the deployment


## Steps 

1. In the Cloud Build menu, select your clsuter and connect to it via Cloudshell. Create the namespace.

    ```bash
    kubectl create ns gcp-devops-prod
    kubectl get ns 
    ```

    From the GCP console, go to Workloads > SHOW SYSTEM WORKLOADS > Namespace dropdown bar.

    ![](/img/docs/gcp-devops-proj-create-namspace-gcp-devops-prod.png)


2. Back in your local terminal, create another branch. 

    ```bash
    git checkout -b "minor/deployment-file"
    git branch
    ```

3. Create the deployment file. 

    ```yaml
    
    ```

4. Update the cloudbuild.yaml file. 

    ```yaml
    
    ```

5. Commit the code to Github repo. 

    ```bash
    git add .
    git commit -m "Update the manifest with deployment and service." 
    gt push 
    ```

6. Switch to the Github UI and then to the branch. Create a PR and then merge it. Once the changes get merged to the master branch, it will trigger the Cloud Build.


7. Refresh the Github page then click on the left commit message. We should see the notification that the Cloud Build has been triggered. Click Details > View more details on Google CLoud Build. It should open a new tab. 


    Once successful, we should see all green check marks. 



9. From the GKE console, go to Workloads > Namespace: gcp-devops-prod > Click the deployment name. 


    Go to Services & Ingress. We should see the endpoint here. This is an external loadbalancer provisioned by GCP.
    
    
    
    Click the public IP address to open the application in a new tab. 



    Connect to the GKE cluster using Cloudshell and check the pods. 

    ```bash
    kubectl get po  
    ```

