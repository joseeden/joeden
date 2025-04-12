---
title: "Mailchimp"
description: "Mailchimp"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 40
last_update:
  date: 03/20/2019
---

import React from "react";


## Overview

Setting up an email marketing service allows the users of our website to sign up for updates. 

- We need to host our website online  
- Users should be able to sign up for updates  
- We'll use an email marketing service like MailChimp  

This ensures our site is accessible and can collect user emails for future updates.  

## Setting Up MailChimp  

MailChimp is a tool that lets users sign up through a form. 

- Sign up for a [free-trail MailChimp account](https://login.mailchimp.com/signup/)  
- Confirm your email and provide a required address  
- Provide a contact number and address

This lets us collect emails at no cost while we build our audience.  

## Build a Signup Form  
 

We need a place to store email signups. In MailChimp, this is called an "Audience."  

1. Go to **Audience**  --> **Signup forms** --> **Create new form**
2. Choose the type: Embedded form, Popup form, Signup landing page
3. Name it something relevant and choose the audience
4. Click **Continue to builder** --> **Continue**>
5. Customize the form with a title and fields.
6.  Save and publish the form  

This form will capture and store email addresses from users.  


## Create a Landing Page  

A landing page promotes our site and collects signups. It gives users a clear way to sign up and receive updates.  

1. Go to **Campaigns** → **All campaigns** → **Create** → 
2. Choose **Landing Page** → select an audience → **Begin**
3. Use a template and customize the content
4. After customizing, click **Save and Close** twice.
5. You can also add a page title.
6. In the URL, you can choose a paid option or use the free MailChimp domain.
7. Once done, click **Publish.**

Example landing page: 

<iframe
  src="https://mailchi.mp/2ce980b93259/justkeeprunning"
  width="100%"
  height="600px"
  style={{ border: "1px solid #ccc" }}
></iframe>

 
## Connect the Signup Form to your Website  

After creating the signup form, we need to add the signup form link to our website. This can be done by adding the URL to the HTML file.

```html
<a href="https://mailchi.mp/example/signup">Sign up for updates</a>
```  

Note: 

- Replace the URL with your form’s link  
- Add this to your site’s "Find Out More" button  

This lets visitors sign up directly from your website.  

## Enable Double Opt-In  

By default, Mailchimp uses single opt-in, where users are added to your audience immediately after signing up. With **double opt-in**, they must confirm their signup via email or SMS. 

To change opt-in settings for an existing Audience:

1. Go to **Audience** > **Audience dashboard**.  
2. If you have multiple audiences, select the one you want.  
3. Click **Manage Audience** > **Settings**.  
4. Select **Audience name and campaign defaults**.  
5. Under **Form Settings**, check or uncheck **Enable double opt-in** as needed.  

Reference: https://mailchimp.com/help/set-signup-preferences/

## Testing the Signup Process  

Before launching, test if everything works.  

- Enter a test email and submit the form  
- Check if you receive a confirmation email  
- Verify that the email appears in your MailChimp audience  

This ensures that signups are being collected correctly.  

## Going Live  

Once everything is set up and tested, publish your website.  

- Copy your landing page link  
- Add it to your main website  
- Share it with your audience  

Now, your site is live, and users can sign up for updates.