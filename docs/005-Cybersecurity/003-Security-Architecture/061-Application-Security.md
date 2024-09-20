---
title: "Application Security"
description: "Securing software applications"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 61
last_update:
  date: 1/30/2024
---


## Overview

Application security focuses on protecting software applications from security threats by implementing measures to prevent, detect, and respond to vulnerabilities and attacks.

## Misuse Case Testing

Misuse case testing focuses on identifying and addressing potential security vulnerabilities by simulating how a system might be misused. It helps in detecting weaknesses that attackers could exploit.

- Simulates malicious or unintended uses to find vulnerabilities.
- Complements traditional testing by focusing on misuse scenarios.
- Helps improve system resilience against abuse.

The most critical step in misuse case testing is defining the test cases. Testers need to think like attackers and figure out all the ways that someone might try to undermine the security of a system. 

- Ask developers: How could someone break into the system?
- Developers who worked on the sofwtare bring an in-depth understanding.
- Others who are not involved in the project brings fresh eyes and perspectives.

Misuse case examples: 

- Unexpected input (in size or format)
- Missing input
- Injection attacks
- Unavailable funds

## Input Validation

Input validation is crucial for protecting applications from malicious data by ensuring that only safe and expected inputs are processed.

- Serves as quality control of data to ensure every piece of information is valid and secure.
- Prevents common vulnerabilities like SQL injection and cross-site scripting (XSS).
- Ensures data integrity and application stability, early in the process.

**Validation Rules** delineate acceptable and unacceptable inputs.

- Any input not conforming to the validation rules will be flagged and detected.
- System might also prompt the user to input the data again.

## Secure Cookies

**Cookies** are small pieces of data stored in the user's computer by the web browser while browsing a website.

- Used to maintain stateful information between the web server and the client.
- If not properly secured, cookies can be exploited to hijack user sessions.
- Refrain from using persistent cookies for session validation.
- Always generate a fresh cookie each time the user authenticates.

**Secure cookies** enhance session security by protecting the data stored in cookies from unauthorized access and tampering. 

- Uses secure attributes to protect cookie transmission over HTTPS
- Use **HttpOnly** to secure cookies from client-side.
- Use **SameSite** to control which origin can access a given cookie.
- Both HttpOnly and SameSite attributes to prevent XSS and CSRF attacks.
- Limits the lifespan of cookies to minimize potential risks.



## Static Code Analysis

Static code analysis, also known as **Static Application Security Testing (SAST)**, involves examining the source code for vulnerabilities without executing the program, helping to identify security flaws early in the development process.

- Scans source code for potential security vulnerabilities.
- Detects issues like buffer overflows, injection flaws, and insecure data handling.
- Supports compliance with security standards and best practices.
- Usually performed using software analyzers, such as Sonarqube. Veracode, Semgrep.

## Dynamic Code Analysis

Dynamic code analysis, also known as **Dynamic Application Security Testing (DAST)**, tests the running application to identify vulnerabilities that may not be apparent in static analysis.

- Analyzes an application during execution to find runtime vulnerabilities.
- Identifies issues such as memory leaks, improper error handling, and authentication flaws.
- Provides insights into the application’s behavior under different conditions.

### Synthetic Transactions

Synthetic transactions are scripted sets of inputs and instructions that are given to code when the testers know what output the code should produce for each input. The testing software can cycle through these synthetic transactions to verify that the code is functioning properly.

### Fuzzing 

Fuzzing is a software testing technique used to identify vulnerabilities and bugs by inputting random or unexpected data into a program. The goal is to discover errors that could lead to crashes or security issues. 

- Tests the robustness of software by feeding it various types of inputs.
- Can identify vulnerabilities such as buffer overflows, crashes, and memory leaks.
- Often automated to systematically cover a wide range of input scenarios.

Fuzzing can use different input sources:
 
- **Developer-supplied input** - The developer can supply a long or short input value.
- **Developer-supplied script** - Tester can write a script that generate input values 
- **Generation Fuzzing** - Fuzz testing software can generate input values randomly
- **Mutation Fuzzing** - Tester can analyze real input and modify them

### Stress Testing

Stress testing evaluates how a system performs under extreme conditions to determine its stability and behavior under high loads. This testing helps identify the system's breaking points and ensures it can handle unexpected spikes in usage.

- Assesses system performance under maximum or peak load conditions.
- Helps identify bottlenecks and weaknesses in the system's capacity.
- Ensures the system can recover from high-load scenarios without crashing or losing data.


## Test Coverage Analysis

Test coverage analysis evaluates how much of the software’s code or functionality is tested by existing test cases. It helps identify areas of the software that may need additional testing to ensure comprehensive validation.

- Measures the extent to which the codebase is exercised by tests.
- Identifies untested parts of the application, revealing gaps in coverage.
- Helps improve the effectiveness of testing efforts by highlighting areas needing more focus.

**Test Coverage** is defined as the the percentage of software that was evaluated during a given test set. To compute the test coverage:

<div class='img-center'>

![](/img/docs/app-sec-computing-test-coverage-analysis.png)

</div>


As an example, if there are 10,000 possible test cases and your testing evaluated 9000 of them, you have 90% test coverage. There are many variables that you can plug in to the formula to evaluate test coverage: 

- Variables based on use cases 
- Based on functions in a piece of software
- A more detailed approach is to compute based on the lines of code
- Conditional branching ensures all conditionals was tested with all possible conditions

## Code Review

Code reviews involve examining the source code to identify and address security vulnerabilities and coding errors.

- Ensures that code adheres to security best practices and standards.
- Detects potential vulnerabilities before the code is deployed.
- Improves code quality and reduces the risk of security flaws.

Mature organizations integrate peer-based code reviews into their software promotion and release processes. They also use design reviews to vet development plans prior to creating code.

### Fagan Inspections

Fagan Inspections are a formal review process used to identify defects in software early in the development cycle. This process involves a structured examination of work products such as requirements, design documents, and code by a team of reviewers to ensure quality and correctness. It also ocuses on early detection of issues to reduce costs and improve final product quality.

<div class='img-center'>

![](/img/docs/app-sec-fagan-inspections.png)

</div>


Fagan Inspections follow a structured six-step process:

1. **Planning**

   - Set goals and define the inspection scope
   - Assemble a team with relevant expertise
   - Schedule meetings and allocate resources
   - Prepare and distribute review materials

2. **Overview**

   - Present work products and inspection objectives
   - Explain goals and focus areas

3. **Preparation**

   - Review materials individually
   - Identify defects and improvement areas

4. **Meeting**

   - Discuss findings and document defects
   - Assign tasks for fixing issues

5. **Rework**

   - Author revises based on feedback
   - Correct defects and make improvements

6. **Follow-Up**

   - Verify that defects are fixed
   - Document inspection results and lessons learned

## Code Signing

Code signing is used to verify the authenticity and integrity of software code, ensuring that it has not been tampered with.

- Developer creates a cryptographic hash of the file, then encrypts it with his own private key.
- Associates code with a verified digital certificate whenever the program is sent out.
- Helps users and systems confirm the software’s source and integrity.
- Prevents the execution of unauthorized or modified software.

It is important to know that the presence of digital signatures on a file or program does not guarantee its absolute security or the absence of vulnerabilities, but the digital signature confirms that the file is in the same state that the developer intended it to be when he/she distributed it.


## Interface Testing

Interface Testing ensures that different software components or systems interact correctly and reliably. This type of testing focuses on validating the data exchanges, communication protocols, and integration points between systems.

- Ensure that data sent between systems is accurate and complete.
- Test the adherence to defined protocols and formats for communication.
- Confirm that error messages are properly handled and communicated.

### Types of Interfaces

- **Application Programming Interface (API)**

  - Allows different software systems to communicate programmatically
  - Defines methods and data formats for interactions
  - Enables integration and functionality across various applications

- **User Interface (UI)**

  - Involves interactions between users and software through visual elements
  - Includes components like buttons, menus, and forms
  - Focuses on usability, accessibility, and user experience

- **Physical Interfaces**

  - Connects hardware devices or hardware to software
  - Examples include ports, connectors, and cables
  - Facilitates data transfer and device interaction


## Sandboxing

Sandboxing is a security mechanism used to isolate running applications to prevent them from affecting the operating system or other applications.

- Limits the access of an application to the system resources.
- Provides a controlled environment for executing untrusted code.
- Helps protect the system from potential malicious activity initiated by the application.
- Testing security controls before replicating them to the production environment.

Security professionals can use isolated virtual machines that has no access to the network or other resources and use them as sandbox environments to perform any testing and evaluations. When they're finish, they can simply destroy the virtual machine without any impact to the rest of the network.

## Package Monitoring

Package Monitoring involves keeping track of security of third-party packages and dependencies used.

- Ensures that packages are up-to-date with the latest security patches.
- Verifies the integrity and authenticity of packages to prevent supply chain attacks.
- Alerts developers to known vulnerabilities in dependencies.
- Example tools are Snyk and Dependabot.

## Web Server Security 

Web server security involves protecting web servers and the services they host from various online threats. This includes securing the server software, the web applications, and the underlying infrastructure to ensure data integrity, confidentiality, and availability.

- Enable HTTPS on the web server using a PKI certs and TLS.
- Use TCP port 443 instead of port 80.
- Use TLS version 1.2 or higher.
- Secure web app user using LDAP over SSL.