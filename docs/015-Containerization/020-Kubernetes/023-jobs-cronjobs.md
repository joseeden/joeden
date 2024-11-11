---
title: "Jobs and CronJobs"
description: "Jobs and CronJobs "
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 1
last_update:
  date: 7/7/2022
---


## Overview

Jobs ensure a specific number of Pods run to completion, retrying on failure.

- Runs multiple Pods in parallel and completes when the target is met.
- Keeps Pods for log and status review; delete manually with kubectl.
- CronJobs schedule Jobs at set intervals, like Unix cron.

To learn more about Jobs:

```bash
kubectl explain job.spec  
```

## Sample Lab: One-off Job

Here is an example manifest, **jobs.yml**, which creates a namespace called **jobs** and a Job named **one-off** within that namespace. Each resource definition is separated by "---".

```yaml title="jobs.yml"
apiVersion: v1
kind: Namespace
metadata:
  name: jobs 
---
apiVersion: batch/v1
kind: Job
metadata:
  name: one-off
  namespace: jobs
  labels:
    job-name: one-off
spec:
  backoffLimit: 6
  completions: 1
  parallelism: 1
  template:
    metadata:
      labels:
        job-name: one-off
    spec:
      restartPolicy: Never
      containers:
      - name: one-off
        image: alpine
        imagePullPolicy: Always
        command:
        - sleep
        - "30"
```

Some key properties defined in the Job manifest:

- **backoffLimit**: Sets how many times the Job retries before marking it as failed
- **completions**: Specifies the number of Pod completions needed for Job success
- **parallelism**: Limits the number of Pods running concurrently for the Job
- **spec.template.spec.restartPolicy**: Default is set to "never" for Pod restarts, with the Job managing restarts for failed Pods

The Job also includes a selector to track its Pods.


To create the job: 

```bash 
kubectl apply -f jobs.yaml
```

Wait until the **Completion** changes to "1/1".

```bash
$ watch kubectl get jobs

NAME      COMPLETIONS   DURATION   AGE
one-off   1/1           36s        2m48s
```

We can also see the status in the **Events** when we try to **describe** the job.

```bash
$ kubectl describe job | grep Events -A 10

Events:
  Type    Reason            Age    From            Message
  ----    ------            ----   ----            -------
  Normal  SuccessfulCreate  5m39s  job-controller  Created pod: one-off-vqj8s
  Normal  Completed         5m3s   job-controller  Job completed
```

To create the same job through the command line:

```bash
kubectl create job one-off --image=alpine -- sleep 30 
```


## Sample Lab: Pod that always fail

We’ll use **pod-fail.yml** to create a Pod that always fails after sleeping for 20 seconds, due to the `exit 1` command. Remember, a non-zero exit code signals a failure.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pod-fail
spec:
  backoffLimit: 3
  completions: 6
  parallelism: 2
  template:
    spec:
      containers:
      - image: alpine
        name: fail
        command: ['sleep 20 && exit 1']
      restartPolicy: Never 
```

Create the job.

```bash
kubectl apply -f pod-fail.yml 
```

One of the events shows that the "Job has reached the specified backoff limit," meaning the job-controller has automatically attempted to provision new Pods as previous ones failed. However, once the Job reaches the backoff limit, it stops retrying.

```bash
$ kubectl describe jobs pod-fail | grep Events -A 10

Events:
  Type     Reason                Age    From            Message
  ----     ------                ----   ----            -------
  Normal   SuccessfulCreate      3m47s  job-controller  Created pod: pod-fail-whrt8
  Normal   SuccessfulCreate      3m47s  job-controller  Created pod: pod-fail-krbq9
  Normal   SuccessfulCreate      3m43s  job-controller  Created pod: pod-fail-sbcqr
  Normal   SuccessfulCreate      3m41s  job-controller  Created pod: pod-fail-66hwk
  Warning  BackoffLimitExceeded  3m37s  job-controller  Job has reached the specified backoff limit 
```

## Sample Lab: CronJob that runs every minute

We'll create a CronJob using `cronjob.yml` to run a Job every minute.

```bash title="cronjob.yml"
apiVersion: batch/v1
kind: CronJob
metadata:
  name: cronjob-example
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - image: alpine
            name: fail
            command: ['date']
          restartPolicy: Never 
```

Apply the CronJob with:

```bash
kubectl apply -f cronjob.yml 
```

Each minute, a new `cronjob-example-` Pod will appear, remaining until manually deleted or until the Job associated with it is removed. Setting a Job's `ttlSecondsAfterFinished` can automate cleanup of completed Pods.

```bash
$ watch kubectl get pods 

NAME                             READY   STATUS       RESTARTS   AGE
cronjob-example-27873064-kbds2   0/1     Completed    0          86s
cronjob-example-27873065-8jwwl   0/1     Completed    0          26s
one-off-kplgg                    0/1     Completed    0          10m
pod-fail-66hwk                   0/1     StartError   0          7m54s
pod-fail-krbq9                   0/1     StartError   0          8m
pod-fail-sbcqr                   0/1     StartError   0          7m56s
pod-fail-whrt8                   0/1     StartError   0          8m 
```

To monitor job completions:

```bash
$ watch kubectl get jobs 

NAME                       COMPLETIONS   DURATION   AGE
cronjob-example-27873077   1/1           4s         65s
cronjob-example-27873078   1/1           4s         5s
one-off                    1/1           37s        3m46s
pod-fail                   0/6           2m54s      2m54s
```

## Resource

- [Kubernetes Pod Design for Application Developers: Jobs and CronJobs](https://cloudacademy.com/lab/kubernetes-pod-design-application-developers-jobs-and-cronjobs/?context_id=888&context_resource=lp)



 

 
