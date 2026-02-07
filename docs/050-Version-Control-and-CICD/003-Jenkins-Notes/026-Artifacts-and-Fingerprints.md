---
title: "Artifacts and Fingerprints"
description: "Securing build outputs with fingerprints"
tags:
- CICD
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
- Jenkins
sidebar_position: 26
last_update:
  date: 5/13/2020
---


## Artifacts

Artifacts are immutable files created during a build or pipeline run.

- Provide compiled projects to end users  
- Facilitate testing and create classes  
- Prevent unnecessary rebuilding of stable code  
- Serve as versioning for software  

Artifacts are stored in a repository, with fingerprinting used to identify the build that produced them.  

On the Jenkins master, the default location for the archive repository is:  

```bash
Jenkins root/jobs/buildname/builds/lastSuccessfulBuild/archive
```  

## Fingerprints

Fingerprints are unique hashes used to track artifacts or entities across pipelines and projects.

- Stored in the Jenkins home directory under the fingerprints directory  
- Must be enabled on the project configuration screen  
- Specify which artifacts to archive and fingerprint  

![](/img/docs/1026-jenkins-fingerprints.png)

The fingerprints are organized in a hierarchy based on the checksum's initial characters:  

```bash
/var/lib/jenkins/fingerprints/98/b3
  ```  

Sample XML contents of a fingerprint file:  

```xml
<?xml version='1.1' encoding='UTF-8'?>
<fingerprint>
  <timestamp>2018-09-19 19:20:02.644 UTC</timestamp>
  <original>
    <name>TestProject</name>
    <number>4</number>
  </original>
  <md5sum>98b83a060946bed8952ff73e263a78be</md5sum>
  <fileName>jout.txt</fileName>
  <usages>
    <entry>
      <string>TestProject</string>
      <ranges>4</ranges>
    </entry>
  </usages>
  <facets/>
</fingerprint>
```