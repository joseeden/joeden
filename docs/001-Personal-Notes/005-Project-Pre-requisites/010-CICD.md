---
sidebar_position: 10
title: CICD
---




## Create a Github Account 

Since we will be implementing CICD in some of the labs, we will need to set this up. Github is a free to use code repository.

To sign up for a Github account, click [here](https://github.com/signup).


## Setup Git Locally

In addition to creating the Github account, you will also need to setup Git in your machine.

- [Add your SSH keys to your Github account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

- [Install Git on your computer](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

- [Configure Git](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration)


## Setup Travis CI 

Travis CI is an opensource CI tool which we can use to build and test our project. Wherever changes are pushed to our Github repo, Travis CI automatically pulls the code and allows us to run tests on it.

Once the code passed the test, Travis CI can automatically deploy our code to AWS.

To setup Travis CI, Go to the [Travis CI site](https://app.travis-ci.com/signup) and sign up using your SCM account. Choose **Sign up with Github**.

<div class='img-center'>

![](/img/docs/lab14signuptravisci.png)

</div>

In the next page, choose **Authorize Travis CI.**
You may need to confirm your account through the email sent to your email address.

In the upper right, click your profile avatar and select Settings. 

We will need to select a plan before we can use Travis CI. Choose the **Free Trial plan** and fill up your personal details. A valid credit/debit card number is also needed to proceed. 

<div class='img-center'>

![](/img/docs/lab14selectfreeplantravisci.png)

</div>

In the Repositories tab, click the green **Activate** button to integrate Travis CI with your Github account. In the next page, click **Approve and install.**

<div class='img-center'>

![](/img/docs/lab14travisciactivate.png)

</div>

Click on the Dashboard tab at the top to view all the Github repositories that are synced with Travis CI.


 