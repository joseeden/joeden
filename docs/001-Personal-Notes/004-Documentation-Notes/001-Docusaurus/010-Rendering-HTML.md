---
title: "Admonitions"
sidebar_position: 6
description: "Resources, bookmarks"
tags: 
- Docusaurus
# last_update:
#   date: 7/14/2024
---

import React from "react";


## Using Google Drive (NOT WORKING)

:::info 

I've tried a lot of workarounds to use static files uploaded in Google Drive but none of it worked.

:::

Google Drive does not allow embedding files in an `iframe` in your `.mdx` file, even if the file is publicly shared. The Google Drive viewer page blocks embedding for security reasons.

```html
import React from "react";

<iframe
  src="https://drive.google.com/file/d/194ILry_ILrOUqMjDxNGE-uqaeA1IBCAA/view"
  width="100%" 
  height="600px" 
  style={{ border: "1px solid #ccc" }}
></iframe>
```

<iframe
  src="https://drive.google.com/file/d/194ILry_ILrOUqMjDxNGE-uqaeA1IBCAA/view"
  width="100%"
  height="600px"
  style={{ border: "1px solid #ccc" }}
></iframe>


## Using Google Drive Download Link (NOT WORKING)

:::info 

I've tried a lot of workarounds to use static files uploaded in Google Drive but none of it worked.

:::


Instead of the **viewer link**, you can use the **direct download** link format:

```bash
https://drive.google.com/uc?export=download&id=FILE_ID
```

Example:

```html
import React from "react";

<iframe
  src="https://drive.google.com/uc?export=download&id=194ILry_ILrOUqMjDxNGE-uqaeA1IBCAA"
  width="100%" 
  height="600px" 
  style={{ border: "1px solid #ccc" }}
></iframe>
```

## Using Netlify Drop 

Since Google Drive doesn’t allow embedding HTML files, you can use a service that hosts static files and provides direct public URLs. An example is Netlify Drop.

- No need to link a Github/online Git repository 
- Drag and drop your HTML files
- Get a public URL to use in your iframe

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

Once you have the URL for the site, you can now add it to your markdown (`.mdx`) page:

```html
import React from "react";

<iframe
  src="https://steady-cocada-c4bfd7.netlify.app/"
  width="100%"
  height="600px"
  style={{ border: "1px solid #ccc" }}
></iframe>
```

The website is now embedded in your markdown page, as seen below. You can hover and test the site functionalities.


<iframe
  src="https://steady-cocada-c4bfd7.netlify.app/"
  width="100%"
  height="600px"
  style={{ border: "1px solid #ccc" }}
></iframe>


## Delete a Site in Netlify 

Steps:

1. Sign-in to your Netlify account.
2. Go to **Site Configuration.**
3. Scroll down to the bottom and click **Delete this site.**


<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-23-173855.png)

</div>