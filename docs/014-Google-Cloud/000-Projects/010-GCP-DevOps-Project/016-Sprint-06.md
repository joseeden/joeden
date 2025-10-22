---
title: "Sprint 06"
tags: 
- Google Cloud
- DevOps
- Cloud
sidebar_position: 16
last_update:
  date: 9/21/2020
---


## Todo

Todo:

✔️ Create the development branch
✔️ Create the development Cloud Build YAML file
✔️ Create the Cloud Build trigger for the development branch
✔️ Create the development namespace 
✔️ Push changes to development 


## Steps 

1. Do a git pull for the main branch.

    ```bash
    git checkout master 
    git pull 
    ```

2. Create a new branch.

    ```bash
    git checkout -b development
    git branch  
    ```

3. Update the Cloud Build YAML file. 

    ```yaml
    
    ```

4. Go to Cloud Build > Trigger > CREATE TRIGGER. Specify the following:

    - Name: gcp-devops-project-dev 
    - Description: This is the Cloud Build trigger for the development branch.
    - Event: Push to a branch
    - Repository: gcp-devops-project 
    - Branch: <code>^development$</code>
    - Configuration: Cloud Build configuration file (yaml or json)


5. Go to GKE > Connect to your GKE cluster using Cloudshell. Create the namespace.

    ```bash 
    kubectl create ns gcp-devops-dev 
    ```

6.  Update the gke.yaml to point the image and namespace to the correct one. 

    ```yaml
    
    ```


7. Push the change to Github. 

    ```bash
    git add . 
    git commit -m "Add deployment files for dev environment."
    git push 
    ```

8. Go to Cloud Build to see the running job.


    We should see all green check marks.


9. Back at the GKE console, go to Workloads > Namespace: gcp-devops-dev 


    Go to Services & Ingress > Namespace: gcp-devops-dev 


    Click the endpoint and verify that you can access the application.

</details>



