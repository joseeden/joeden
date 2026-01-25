---
title: "Jenkins REST API"
description: "Using REST API methods to interact with Jenkins"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 27
last_update:
  date: 5/13/2020
---

## Overview 


Jenkins provides a machine consumable REST style API for programmatically interacting with the Jenkins server. The documentation can be located on the Jenkins server itself at:

```bash 
http://server-address/api
```

You can send REST methods to the Jenkins URL. For example, you can build a job using:

```bash 
curl jenkinsurl:8080/jobs/jobname/buildnumber, -user username:password
```

This is an example of sending JSON values for a parametrized build:

```bash 
curl jenkinsurl:8080/jobs/jobname/buildnumber, \
-user username:password \
-data-urlencode json='{
    "parameter": [
      {"name":"id"},
      {"somevalue":"abcd"},
    ]
}'
```

## Why Use the API?

The API enables efficient job management and monitoring in Jenkins.

- Create jobs as code for easy version control  
- Copy and reproduce standardized pipelines  
- Monitor build queue status and server load  
- Restart Jenkins without SSH access  