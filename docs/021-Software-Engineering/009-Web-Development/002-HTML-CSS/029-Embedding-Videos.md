---
title: "Embedding Videos"
description: "Embedding Videos"
tags:
- Computer Science
- Application Development
- Software Development
- Web Development
- Frontend Development
- HTML
- CSS
sidebar_position: 29
last_update:
  date: 03/30/2019
---

## Overview

You can embed videos in an HTML page using the `<video>` tag. This allows you to play video files directly on the webpage without needing external players.

```html
<video width="640" height="360" controls>
  <source src="video.mp4" type="video/mp4">
</video>
```

- `src` points to the video file  
- `controls` adds playback controls like play, pause, and volume  
- `width` and `height` set the display size of the video


## `<video>` vs. `<iframe>`

### Using `<video>`

Using a `<video>`:

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

### Using `<iframe>`

You can also use `<iframe>` if you want adaptive streaming or less hassle:

```html
<iframe 
  src="https://player.vimeo.com/video/VIDEO_ID?autoplay=1&loop=1&background=1&muted=1"
  frameborder="0"
  allow="autoplay; fullscreen"
  allowfullscreen>
</iframe>
```

What `autoplay=1&loop=1&background=1&muted=1` does:

- Removes title, controls, logo, everything
- Enables looping and autoplay
- Makes the video behave like a **background video**

### Comparison 

| Feature              | `<video>` Tag                   | `<iframe>` Embed                |
|----------------------|----------------------------------|----------------------------------|
| Raw video file (e.g. .mp4) | ✅ Yes                           | ❌ No                            |
| YouTube video support      | ❌ Not supported                 | ✅ Required                      |
| Full control with HTML5    | ✅ Total control                 | ⚠️ Limited (YouTube API needed for more control) |
| Autoplay & Loop (YouTube)  | ❌ Not possible via `<video>`   | ✅ Works via `iframe` + URL params |

**When to Use `<video>`**

- You have a **.mp4**, **.webm**, or **.ogg** file
- You're hosting it yourself or using a direct media file URL (like from Azure Blob, S3, or Vimeo direct stream)

**When to Use `<iframe>`**

- You're embedding a video from **YouTube**, **Vimeo**, or **another streaming service**
- You don’t have access to a raw media file

:::info 

[For Youtube, you need to use `<iframe>`](#youtube).

:::


## Canva 

Using a Canva video:

```html
<div class="video-background" 
      style="position: relative; 
             width: 100%; 
             height: 0; 
             padding-top: 56.25%; 
             overflow: hidden; 
             border-radius: 8px; 
             box-shadow: 0 2px 8px rgba(63,69,81,0.16);">
  <iframe 
    loading="lazy" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
    src="https://www.canva.com/design/abcdefg/jklmnop/watch?embed" 
    allowfullscreen 
    allow="fullscreen">
  </iframe>
</div>
```

Notes: 

- The `padding-top: 56.25%` preserves the responsive layout for a 16:9 aspect ratio 
- Since Canva doesn't use native video tags, `poster` and `source` doesn't work here

### `autoplay` and `loop` not supported on Canva

Canva doesn’t officially support `autoplay` or `loop` through URL parameters because of browser security rules. This means embedded videos will show a "play" button, which is not ideal for using videos as a webpage background.

If you need autoplay or loop, download the video from Canva and host it yourself using a native `<video>` tag. This way, you can control autoplay, loop, mute, and more.

## Youtube 

Using a Youtube video:

```html
<iframe 
  class="video-background"
  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID"
  frameborder="0" 
  allow="autoplay; fullscreen" 
  allowfullscreen>
</iframe>
```

Replace `VIDEO_ID` with your actual YouTube video ID (from `https://www.youtube.com/watch?v=VIDEO_ID`)

Notes:

- `autoplay=1` – starts playing automatically
- `mute=1` – required for autoplay to work in most browsers
- `loop=1` – loops the video
- `playlist=VIDEO_ID` – **this is required for looping to work** (even though it's not a playlist; it's a YouTube quirk)

For smoother experience:

- Add `controls=0` if you don’t want playback buttons visible.
- Add `modestbranding=1&rel=0` to avoid related video ads or logos.


### Removing the YouTube Logo

Unfortunately, **YouTube does not allow** complete removal of their logo from embedded players. There are **workarounds to reduce branding**:

| Parameter           | What it Does |
|---------------------|----------------|
| `modestbranding=1`  | Minimizes YouTube logo (still appears on hover or pause) |
| `controls=0`        | Hides controls (but logo may show on loop or pause) |
| `rel=0`             | Prevents showing related videos at the end |
| `showinfo=0`        | (Deprecated) Used to hide title, now ignored |
| `playlist=VIDEO_ID` | Required for `loop=1` to work |

**There’s no official way to fully remove the logo**. YouTube enforces branding. Only way to 100% eliminate it is **hosting your own video** and using the `<video>` tag.

- Host the `.mp4` video on your own server or a cloud CDN (Azure, S3, etc.)
- Use the `<video>` tag (like you originally did)
- Full control, no logos, and easier to style


## Vimeo

Using `<video>` tag:

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

Using `<iframe>` tag:

```html
<iframe 
  src="https://player.vimeo.com/video/VIDEO_ID?autoplay=1&loop=1&background=1&muted=1"
  frameborder="0"
  allow="autoplay; fullscreen"
  allowfullscreen>
</iframe> 
```

Replace `VIDEO_ID` with your actual Vimeo video ID (e.g. 76979871).


#### Notes

1. **Hotlinking Issues**: Some direct video URLs from Vimeo are **tokenized or expire** after some time unless you’re on Vimeo Pro or above and have enabled file access.
2. **Performance**: Vimeo's player (with iframe) does adaptive streaming and buffering better than raw MP4s.


### Advantages

Advantages of Vimeo for Embeds:

| Feature              | Vimeo                                      | YouTube                             |
|----------------------|---------------------------------------------|-------------------------------------|
| No logo or branding  | ✅ Can be hidden (with correct settings)     | ❌ Always shows YouTube logo         |
| No black bars        | ✅ Easier to control aspect ratio            | ❌ Often shows black bars (letterbox) |
| Loop support         | ✅ Easy with `loop=1`                        | ⚠️ Needs `playlist=videoID` trick    |
| Autoplay + mute      | ✅ Fully supported                          | ✅ Supported                         |
| Clean, minimal UI    | ✅ Professional look                         | ❌ Always has some clutter           |



### Troubleshooting 

When you encounter the "Sorry, we're having a little trouble" message from embedded video while testing your webpage locally, it could be due to several factors. 

1. **Embedding Restrictions**  

      - Vimeo may block embedding on local or unknown domains  
      - Check video privacy settings and allow embedding  

   **Fix**: Make sure that the video you're trying to embed allows embedding to any domain. You can verify this by going to Vimeo video settings and checking the privacy settings.

2. **Invalid Video URL**  

      - Use the correct embed URL format  
      - Test the link directly in your browser  

   Sample code:

   ```html
   <iframe src="https://player.vimeo.com/video/1073214773?background=1&autoplay=1&loop=1&muted=1"
           frameborder="0"
           allow="autoplay; fullscreen; picture-in-picture"
           allowfullscreen
           title="Site-Swiftlink-banner-vid">
   </iframe>
   ```

   **Fix**: Try loading this embed URL directly in a browser to confirm the video is working. If it doesn't load directly, the issue might be with the video itself (e.g., privacy settings).

3. **Local Testing Issues**
   Vimeo might have trouble loading videos in local environments due to CORS (Cross-Origin Resource Sharing) or other restrictions.

   **Fix**: 
   - Do not test by opening the HTML file directly in a browser (i.e., using `file://`). 
   - Run local project on a local development server
   - Use a server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VSCode
   - You could also set up a local server using Python or Node.js.

     - **Python**
       ```bash
       python -m http.server
       ```
     - **Node.js (with `http-server`)**
       ```bash
       npx http-server
       ```

4. **Browser Cache**
   Browsers cache certain elements, which might be causing issues with loading embedded videos.

   **Fix**: Try clearing the cache in your browser or use **Incognito Mode** to bypass cached content.

5. **Network or Vimeo Issue**
   The problem could be related to Vimeo's servers, or there could be an issue with your internet connection.

   **Fix**: Check Vimeo's status page to ensure there are no widespread issues or try again after some time.

6. **Iframe Size**
   Ensure that the iframe has sufficient space to load the video. Improper sizing of the iframe can sometimes cause issues with the video loading.

   **Fix**: Set the `width` and `height` of the iframe properly, and use responsive styles (like `width: 100%` and `height: 100%`).

7. **Inspect the Network**
   Use the browser's developer tools to inspect the network tab and check if there are any errors or failed requests when trying to load the video.

   **Fix**: Look for any failed network requests or blocked resources, as this may provide clues on what might be wrong.

## Storing the Video Locally

You can download and host the video file locally on your server, and then reference it using the `<video>` element. This will allow the video to load directly from your server rather than relying on other providers.

**Pros**:
- No reliance on third-party services
- Faster load time (no third-party delay)  
- Full control over video playback, no external branding or logos.

**Cons**:
- Larger initial page load time if the video is large.
- Higher server and bandwidth usage if video is viewed frequently.

### Steps 

1. **Download the Video**: 
   - Download the video  or request a version from the content owner.
   - Use a web-friendly format (MP4 is a commonly supported).
   
2. **Store the Video on Your Server**: 
   - Upload video to your server or hosting service. 
   - Store it in a directory such as `/assets/videos/` for example.
   
3. **Modify Your Code to Use the Local Video File**:

      ```html
      <div class="video-header-container">
        <div class="video-iframe-wrapper">
          <!-- Use a local video file -->
          <video class="video-background" 
                autoplay 
                loop 
                muted 
                playsinline>
            <source src="assets/videos/my-local-video.mp4" type="video/mp4">
          </video>
        </div>
      </div>
      ```

### Points to Consider 

- **Server Load**  
  - Self-hosting uses your server’s bandwidth and processing power  
  - High traffic may slow down or impact site performance

- **Video Size and Format**  
  - Compress video to reduce file size  
  - Use MP4 (H.264) for broad browser support  

- **Mobile Experience**  
  - Test on phones and tablets  
  - Offer lower-resolution versions if needed  

- **Autoplay**  
  - Might not work on all browsers  
  - Muted videos autoplay more reliably  

- **Storage**  
  - Check available disk space and server resources
  - Use CDN for better performance with high traffic


### Using a Hybrid Approach

You can also use a **hybrid approach**, where the video is stored locally but falls back to a Vimeo embed if it's not available locally. This can be done by checking if the local video exists before trying to load it.


## Smooth Looping

You can add this to your CSS if the looping causes a flicker:

```css
.video-background {
  animation: none;
  backface-visibility: hidden;
}
```

You can also trim your video slightly to make it loop cleanly without a jump.


## Fallback Image

The `poster` attribute in a `<video>` tag is a fallback image. It appears before the video starts playing, especially on slow connections or browsers that delay autoplay, like on some mobile devices. It works like a thumbnail or preview image.

For more information, please see [Using a Fallback Image for Videos](/docs/021-Software-Engineering/009-Web-Development/002-HTML-CSS/030-Fallback-Image.md)


## Overlay

An overlay allows you to use a video as the background while placing text or an image on top, like this:

<div class="img-center"> 

![](/gif/docs/css-video-overlay.gif)

</div>

Sample code:

<details>
  <summary> `video.html` </summary>

```html
<div class="video-header-container">
  
  <!-- Background video -->
  <div class="video-iframe-wrapper">
    <div class="video-inside">
      <iframe
        src="https://player.vimeo.com/video/12345678?autoplay=1&loop=1&muted=1&background=1&title=0&byline=0&portrait=0"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        title="banner-vid">
      </iframe>
    </div>
  </div>

  <!-- Text on top -->
  <div class="video-overlay-content">
    <h1 class="display-4">Lorem Ipsum</h1>
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis iusto dolore expedita facilis dolorem. Optio laboriosam, illo, explicabo officia excepturi expedita laborum id blanditiis quas dignissimos illum, aliquid omnis? DeserunLorem ipsum dolor sit amet consectetur adipisicing elit. </p>
    </div>
  </div>

</div>
```

</details>

<details>
  <summary> `video.css` </summary>

```css
.video-header-container {
  position: absolute;
  top: 100px; /* navbar offset */
  left: 0;
  width: 100%;
  height: calc(80vh - 100px);
  overflow: hidden;
}

.video-iframe-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.video-iframe-wrapper iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 177.78vh; /* Maintain 16:9 ratio: 100 / 56.25 = 1.7778 */
  height: 100vh;
  transform: translate(-50%, -50%);
  pointer-events: none; /* Disable interaction */
  object-fit: cover;
  object-position: center;
  border: none;
}

.video-overlay-content {
  position: relative;
  z-index: 2;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
} 
```

</details>


## Embed Videos in Docusaurus 

You can embed videos in Docusaurus pages using standard HTML tags or third-party tools like `react-player`.

For more information, please see [Embed Videos.](/docs/001-Personal-Notes/040-Documentation-Notes/001-Docusaurus/015-Embed-Videos.md)
