---
title: "Account Security"
description: "Account Security"
tags: 
    - CICD
    - Continuous Integration
    - Continuous Delivery
    - Continuous Deployment
    - GitLab
sidebar_position: 5
---


## Overview

When you created a GitLab account by signing with Google, you authenticated your account with SSO or SAML. As such, you may encounter the following messages when you first create a project in GitLab. 

![](/img/docs/12082024-gitlab-new-account-sso.png)

## Adding SSH Keys 

Click Add SSH Key > Add new key. You will need to [create an SSH key](https://docs.gitlab.com/ee/user/ssh.html) on your local computer. 

![](/img/docs/12082024-gitlab-add-ssh-key.png)

Paste the public key on the **Key** field. Add a title and click **Add key**.


## Add a Password 

Click your profile photo > Edit profile > Password. Enter the password twice and click Save password.

![](/img/docs/12082024-gitlab-add-password.png)


## Enable Two-Factor Authentication

Click your profile photo > Edit profile > Account > Enable two-factor authentication. 

![](/img/docs/12082024-gitlab-enable-2fa.png)

Open your authenticator app and scan the QR code. Once its save, enter the following:

- Current Password 
- Verification code (from the authenticator app)

Click Register with authenticator app > Download recovery codes > Proceed. Once done, you should now see the 2FA enabled.

![](/img/docs/12082024-gitlab-enabled-2faaa.png)

## Personal Access Tokens

Personal Access Tokens (PATs) are used to authenticate and interact with the GitLab API. They are an alternative to using passwords for operations like cloning repositories or managing projects.

Click your profile photo > Edit profile > Access tokens > Add new token.

Add a token name, select the scopes, then click Create personal access token at the bottom.

![](/img/docs/12082024-gitlab-add-pat.png)
