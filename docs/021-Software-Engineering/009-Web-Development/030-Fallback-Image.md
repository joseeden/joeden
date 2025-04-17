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

The `poster` attribute is only valid for `<video>` elements, not `<iframe>` work on `<iframe>`, so browsers will might simply ignore this. 

