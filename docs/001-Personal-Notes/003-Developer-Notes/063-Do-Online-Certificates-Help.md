---
title: "Do Online Certs Help?"
description: "Do Online Certs Help?"
tags: 
- Personal Notes
- Development
sidebar_position: 63
last_update:
  date: 7/26/2019
---

:::info 

These are compilation of notes that I've gathered researching online.

:::



## Do Online Certificates Help You Get Hired?

Online courses like Coursera and edX can help, but they’re not enough by themselves.

- Many people take online courses  
- Building real projects makes a big difference  
- Employers want to see what you’ve done with what you learned  

A course certificate is just a sign you studied. What matters more is how you apply that knowledge.

## Showing Skills Beats Listing Them

Just saying you finished courses doesn’t show how you’ll do the job.

- Making something small that works is better than having no project  
- Sharing a personal project helps people see your real skills  
- Even buggy apps can be valuable if you built them yourself  

For example, someone who built a simple app to find gluten-free restaurants might stand out more than someone who only has certificates.

## Use Courses to Build, Not Just Learn

The best way to use online learning is to build something real from it.

- Pick a project that solves a small problem you care about  
- Apply what you learned step-by-step  
- Keep improving your project as you learn more  

Here's a very basic example of using Python to make a simple web server:

```python
from http.server import SimpleHTTPRequestHandler, HTTPServer

server_address = ('', 8000)
httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
print("Serving on port 8000")
httpd.serve_forever()
```

**Expected result:**  
When run, this starts a web server you can access at `http://localhost:8000`

Even small projects like this show that you’ve turned learning into action.
