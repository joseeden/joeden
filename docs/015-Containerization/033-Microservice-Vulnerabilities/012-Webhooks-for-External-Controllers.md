---
title: "Webhooks for External Admission Controllers"
description: "Webhooks for validation and modification policies."
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 12
last_update:
  date: 3/11/2022
---




## External Admission Controllers

External admission controllers use webhooks to enforce custom admission policies. Kubernetes provides two webhook controllers:

- Mutating Admission Webhook
- Validating Admission Webhook

Webhooks are configured to point to an **Admission Webhook Server**, running custom logic on either internal or external servers.


## Configuring Admission Webhook 

Setting up an admission webhook involves:

- **Webhook Server**: Hosts custom logic.
- **TLS Certificates**: Ensures secure communication.
- **Webhook Configuration**: Defines rules and endpoints.

## Sample Webhooks Configuration

Validating Webhook Configuration:

```yaml 
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: my-validating-webhook
webhooks:
- name: validating.pods.example.com
  clientConfig:
    url: "https://<your-webhook-service>/validate"
    caBundle: "<your-ca-bundle>"
  rules:
  - operations: ["CREATE"]
    apiGroups: [""]
    apiVersions: ["v1"]
    resources: ["pods"]
  failurePolicy: Ignore
```


Mutating Webhook Configuration:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingWebhookConfiguration
metadata:
  name: my-mutating-webhook
webhooks:
- name: mutating.pods.example.com
  clientConfig:
    url: "https://your-webhook-service/mutate"
    caBundle: "<your-ca-bundle>"
  rules:
  - operations: ["CREATE"]
    apiGroups: [""]
    apiVersions: ["v1"]
    resources: ["pods"]
  failurePolicy: Ignore
```


## Registration

Webhooks register with the Kubernetes API to receive admission requests:

1. Run the admission controller on a webhook server.
2. Registers its URL and admission type with the Kubernetes API.
3. Provide webhook details, like URL and type (validating or mutating).
4. Receives admission control requests during API processing.


## AdmissionReview Object  

The AdmissionReview object facilitates communication between the API server and the external admission controller:  

1. A user request triggers the admission control process.  
2. The API server generates an **AdmissionReview** object.  
3. The object contains the request and an empty response.  
4. The API server sends it to the webhook's URL.  
5. The admission controller processes the object.  
6. The controller applies custom logic based on its type.  


## Validating Admission Controller Logic

Validating controllers enforce policies:

- Check if external admission controller is a validating controller
- It inspects the admission request and applies custom validation policies.
- It then decides whether to accept or reject the request.
- If accepted, the controller may not modify the object 
- It can include relevant information in the response.

## Mutating Admission Controller Logic

Mutating controllers modify requests:

- Check if external admission controller is a mutating controller
- It can modify the admission request. 
- It can add, remove, or modify fields in the object.
- Controller returns modified object in the admission response.


## `AdmissionResponse` Object

The `AdmissionResponse` conveys the controller's decision to the API server:

1. `AdmissionResponse` includes a decision (allow or deny).
2. Mutating controllers return a modified object.

Returning `AdmissionResponse` to API Server:

1. The AdmissionResponse is sent back to the API server.
2. If allowed, the request proceeds, and the object is saved.
3. If denied, the API server rejects the request.

