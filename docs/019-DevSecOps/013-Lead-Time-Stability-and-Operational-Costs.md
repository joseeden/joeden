---
title: "Lead Time, Stability, and Operational Costs"
tags: [DevOps, Cloud, Automation, DevSecOps]
sidebar_position: 13
last_update:
  date: 2/5/2023
---



## Improving Lead Time

DevOps helps stabilize software development by addressing issues caused by frequent updates. Automating early error detection prevents minor issues from becoming major production problems.

<div class='img-center'>
<img src="/img/docs/012-failfastttttttt.png">
</div>  

Detecting issues early saves time and reduces costs, as fixing them in production is much more expensive. Lead time in DevOps refers to the period from idea generation to release.

### Case Study: Acme Products Unlimited (APU)

APU moved from monthly to daily deployments but still faced challenges with rising traffic on their marketplace. 

<div class='img-center'>
<img src="/img/docs/012-usecasedevopsapu.png">
</div>  

They wanted to add features like user forums and new products but were cautious due to past deployment issues causing long downtimes.

- **Development Cycle**: 

    - Code created over weeks and then reviewed by QA
    - Code is handed to operations for scheduled Saturday deployment

- **Deployment Process**: 

    - Operations updated one server at a time
    - Often facing errors without specific diagnostics

Manual troubleshooting by multiple teams slowed deployment and lacked automation, which hindered efficiency.

<div class='img-center'>
<img src="/img/docs/012-usecaseapu500error.png">
</div>  



### DevOps Transformation

Under a new CTO, APU embraced DevOps. Key changes included:

1. **Baseline Metrics**: Lead time, uptime, deployment frequency, MTTD, and MTTR were tracked.
2. **Cross-Functional Teams**: Developers, QA, security, and operations worked together with no hand-offs.
3. **Full Ownership**: Each team managed its product from development through production.

<div class='img-center'>
<img src="/img/docs/012-usecase-nosilos.png">
</div>  

### Continuous Integration

With Jenkins, APU implemented continuous integration:

- Code was automatically built and tested
- Code is marked successful if all tests passed
- QA and security teams helped set up load and security tests.

<div class='img-center'>
<img src="/img/docs/012-usecase-jenkins.png">
</div>  

**Feature Toggles** allowed safe deployment of unfinished features without affecting production, keeping the main branch as the main code source.

<div class='img-center'>
<img src="/img/docs/012-usecaseapu-featuretoggle.png">
</div>  

This new approach enabled multiple stable deployments per day.

- Developer and operations collaboration improved code quality
- Improved code reduces server usage.
- Supported elastic scaling, adding servers based on demand.

<div class='img-center'>
<img src="/img/docs/012-usecaseapuelastic.png">
</div>  

Autoscaling triggered new servers built with Spinnaker, and the blue-green deployment model allowed quick rollbacks when needed.

<div class='img-center'>
<img src="/img/docs/012-usecaseapu-bluegreen.png">
</div>  

### Key Takeaways on Lead Time Improvement

Optimizing lead time requires reducing constraints in the entire pipeline. DevOps enables efficient delivery from idea to release, creating a structured path for improvements in speed and reliability.

- **Continuous Deployment**: Enables multiple daily deployments, eliminating major delays.
- **Focused Development**: Developers focus on new features, not troubleshooting.
- **Steps Taken**:
   - Measured progress with baseline metrics.
   - Shifted to a collaborative, automated DevOps culture.
   - Automated continuous delivery.

