---
title: "Hosting Static Sites"
tags: 
- DevOps
- Personal Notes
- Development
description: "VirtualBox NOtes"
sidebar_position: 22
last_update:
  date: 11/22/2023
---


## Netlify 

Steps:

1. Sign up for a [free Netlify account.](https://app.netlify.com/signup)
2. After verifying your account, sign-in to Netlify.
3. Go to [Netlify Drop.](https://app.netlify.com/drop)
4. Upload your static files.
5. Once its live, you should see the new site under **Sites.**

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-03-23-174204.png)

    </div>

6. Click the site, then click the link on the next page. This is the public link of your site.

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-03-23-174317.png)

    </div>


### Delete a Site

Steps:

1. Sign-in to your Netlify account.
2. Go to **Site Configuration.**
3. Scroll down to the bottom and click **Delete this site.**


<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-23-173855.png)

</div>


### Edit a Site 

Site deploys at Netlify are **atomic**. There is **no way to edit an existing deploy**, you must make a new deploy to make a change. If you want to change a file a complete deploy of the whole site is required again with the change included.

Reference:

- [How to Edit my website](https://answers.netlify.com/t/how-to-edit-my-website/13083)
- [Atomic and immutable deploys](https://www.netlify.com/blog/2021/02/23/terminology-explained-atomic-and-immutable-deploys/#main)