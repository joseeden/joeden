---
title: "CIS Security Benchmarks"
description: "CIS Security Benchmarks"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 11
last_update:
  date: 7/7/2022
---


## Using Security Benchmarks 

Security benchmarks provide guidelines and best practices for securing systems, networks, and applications, helping establish a secure baseline.

- Reduce vulnerabilities through standardized configurations.
- Improve overall security posture.
- Benchmarks for operating systems, databases, web servers, etc.

Common benchmarks come from organizations like **CIS** and **NIST**.

<div class='img-center'>

![](/img/docs/cis-cat-cis-benchmarks.png)

</div>



## CIS-CAT Pro Assessor

CIS-CAT Pro Assessor v4 helps assess systems based on CIS Benchmark recommendations and other formats like SCAP and OVAL.

- Command-line and graphical interfaces for assessments.
- Assesses systems against security automation standards.

Links:

- [User Guide](https://github.com/CISecurity/CCPA-Docs/blob/master/docs/User%20Guide%20-%20Assessor.md)
- [Supported CIS Benchmarks](https://www.cisecurity.org/cybersecurity-tools/cis-cat-pro/cis-benchmarks-supported-by-cis-cat-pro/)
- [CIS-CAT Lite](https://learn.cisecurity.org/cis-cat-lite)

Below is an example script that runs the CIS-CAT Pro Assessor Tool.

```bash
## Assessor-CLI.sh 

#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
JAVA=java
MAX_RAM_IN_MB=2048
DEBUG=0

which $JAVA 2>&1 > /dev/null

if [ $? -ne "0" ]; then
        echo "Error: Java is not in the system PATH."
        exit 1
fi

JAVA_VERSION_RAW=`$JAVA -version 2>&1`
echo $JAVA_VERSION_RAW | grep 'version\s*\"\(\(1\.8\.\)\|\(9\.\)\|\([1-9][0-9]\.\)\)' 2>&1 > /dev/null

if [ $? -eq "1" ]; then
        echo "Error: Java version not compatible."
        exit 1;
fi

if [ $DEBUG -eq "1" ]; then
        $JAVA -Xmx${MAX_RAM_IN_MB}M -jar $SCRIPTPATH/Assessor-CLI.jar "$@" --verbose
else
        $JAVA -Xmx${MAX_RAM_IN_MB}M -jar $SCRIPTPATH/Assessor-CLI.jar "$@"
fi
```

To run:

```bash
./Assessor-CLI.sh -i -rd /var/www/html/ -nts -rp index  
```

This generates a report (`index.html`) in `/var/www/html`.

<div class='img-center'>

![](/img/docs/cis-cat-assessor.png)

</div>



Select benchmarks to use:


<div class='img-center'>

![](/img/docs/cis-cat-choose-benchmarks-profile.png)

</div>


Download the report for a full system assessment:

<div class='img-center'>

![](/img/docs/cis-cat-assessor-done-running.png)

</div>


## Kube-bench

Kube-bench is a tool to assess the security configuration of Kubernetes clusters. It can be deployed as:

- A Docker container
- A pod in Kubernetes
- By installing binaries
- By compiling from source

For more information, please see [Kube-bench GitHub.](https://github.com/aquasecurity/kube-bench)
