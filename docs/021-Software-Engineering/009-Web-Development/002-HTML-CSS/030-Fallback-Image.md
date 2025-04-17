---
title: "Fallback Image"
description: "Using a Fallback Image for Videos"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 30
last_update:
  date: 03/30/2019
---


## Using `poster` 

The `poster` attribute in a `<video>` tag is basically a fallback image. It's what shows up **before** the video starts playing — especially on slower connections or in browsers that delay autoplay, like on some mobile devices. It acts like a thumbnail or preview image.

```html
<video class="video-background" 
              autoplay 
              loop 
              muted 
              playsinline 
              poster="https://abc.xyz/~/media/store/banner/banner.jpg?rev=12345678">
  <source src="https://player.vimeo.com/progressive_redirect/file.mp4?loc=external&amp;signature=876945321" 
          type="video/mp4">
</video>
```

Note that `poster` doesn't work for `<iframe>` elements. For more information, please see [Fallback Image for `<iframe>`.](#fallback-image-for-iframe)

## How it works 

What it does:

- It's shown **while the video is loading**
- It stays visible if autoplay fails or is disabled (like on some mobile or low-power scenarios)
- If autoplay works fine and loads fast, it may flash briefly or not appear at all

## Do You Need It?

You *don’t* technically need it, especially if:

- Your video **autoplays smoothly** every time
- You're **okay with a blank space or first frame** being visible before the video loads
- Your design doesn't depend on having a preview image for aesthetics or structure

But you **might want to keep it** if:

- You want a seamless visual experience while the video loads
- You're designing for varied connection speeds or device types
- Your site might be used in places where autoplay is blocked (e.g. data-saving mode on mobile)

## Optimizing

You can optimize the poster by using a compressed image or a first frame extracted from the video itself.


## Fallback Image for `<iframe>`

The `poster` attribute is only valid for `<video>` elements, not `<iframe>`, so browsers will might simply ignore this attribute.

### Using Overlay

You’ll need to overlay a fallback image behind the iframe using CSS, then optionally hide it once the video loads

HTML: 

```html
<div class="video-iframe-wrapper">
  <img src="./images/site-poster.png" alt="Video Fallback" class="video-fallback" />
  <div class="video-inside">
    <iframe
      src="https://player.vimeo.com/video/12345678?autoplay=1&loop=1&muted=1&background=1&title=0&byline=0&portrait=0"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      title="banner-vid"
      frameborder="0">
    </iframe>
  </div>
</div>
```

CSS:

```css
.video-iframe-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

/* iframe layered above the fallback image */
.video-inside iframe {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
}
```

## Fallback Image Not Showing

**Issue:** The poster image doesn't appear when the video hosting service is offline, even though it’s properly set.

I have a website that uses a video as the background for the landing page banner. To simulate a disconnection from the video hosting service, I turned off my internet connection and refreshed the site a few times. As expected, the video failed to load, but instead of showing the fallback poster image, the browser displayed the default **broken embed** icon.

<div class="img-center">  
![](/img/docs/Screenshot-2025-04-17-172129.png)  
</div>

This happens because of a limitation with iframes — when the iframe source becomes unreachable, the browser shows a broken frame (often with a sad face icon) and doesn’t let any JavaScript inside the iframe handle the error or provide a graceful fallback.

### Possible Fixes

| Checkpoint | Solution |
|-----------|----------|
| Local file exists? | Ensure `images/site-poster.png` is correct |
| Browser blocking file:// access? | Use **Live Server** (localhost) |
| Styling hides image? | Add border/debug styling |
| Want true iframe fallback? | Use `background-image` on the container instead |

### Root Cause Checklist

1. **Image path**

    Make sure the path is correct and the image is actually available locally.

      ```html
      <img src="./images/site-poster.png" alt="Video Fallback" class="video-fallback" />
      ```

      - Does the file exist at the path specified ?
      - Is the file name spelled **exactly** the same?

    Quick test: Open that image directly in the browser: `file:///path-to-your-folder/images/site-poster.png`


2. **Your browser is blocking local loading for security**

    When opening with `file://`, some browsers (especially Chrome) **block loading local resources** (like `iframe` and sometimes `img`) due to CORS and file URI policies.

    Solution: Use **Live Server** instead of `file://` view.

      - Reconnect to the Live Server (even without internet)
      - Then disconnect Wi-Fi again
      - Refresh the browser

    Live Server uses `http://localhost:PORT`, which avoids most browser restrictions.


3. **Image fails due to incorrect styling or `z-index` stacking**

    If the image is **rendering but invisible**, it's possibly covered or collapsed. Add this debug style temporarily:

      ```css
      .video-fallback {
        z-index: 1;
        display: block;
        border: 2px solid red; /* DEBUG: to see if it shows up */
      }
      ```

### Add a real `<picture>` fallback if iframe fails

The current fallback might be working **only if Vimeo is slow to load**, not if it's offline.

For a more reliable approach: 

HTML (fallback background directly on `.video-container`)

```html
<div class="video-container" 
      style="background-image: url('./images/site-poster.png');       
              background-size: cover; 
              background-position: center;">

  <div class="video-inside">
    <iframe ...></iframe>
  </div>

</div>
```

CSS (ensure fallback image always displays when iframe fails):

```css
.video-container {
  background-image: url('./images/site-poster.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```
