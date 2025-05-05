---
title: "Generate Video Subtitles"
description: "Generate Video Subtitles"
sidebar_position: 4
---


You can generate English subtitles (e.g., `.srt` files) from MP4 videos using automatic speech recognition (ASR) tools. 


## OpenAI Whisper (Best Accuracy)

:::info 

Of all the options, this is the one that I used for majority of my videos. 

:::

Whisper is an open-source ASR model by OpenAI, known for its accuracy and support for many languages.

1. Make sure Python 3.8+ and pip are available:

   ```bash
   python3 --version
   pip3 --version
   ```

   If not yet installed:

   ```bash
   sudo apt update
   sudo apt install python3 python3-pip
   ```


2. Install Whisper and dependencies:

   ```bash
   pip install openai-whisper
   sudo apt install ffmpeg
   ```

3. Generate subtitles:

   ```bash
   whisper your_video.mp4 --language English --task transcribe --output_format srt
   ```

4. It will create `your_video.srt` in the same folder.

*Note:* It uses your CPU or GPU. Can be slow on large files without a GPU.


## SubtitleEdit (GUI, Windows)

Subtitle Edit is a Windows app with built-in speech recognition using Whisper or Google APIs.

1. Download Subtitle Edit: [https://www.nikse.dk/subtitleedit/](https://www.nikse.dk/subtitleedit/)
2. Open your MP4 video in the app.
3. Go to `Video` > `Audio to text (Whisper)` or `Generate Subtitles via Google`.



## YouTube (Hacky but works)

If the video is not sensitive/private, upload it as **unlisted** to YouTube.

1. Upload video as unlisted/private.
2. Wait for auto-captions to generate.
3. Download captions via YouTube Studio or use 3rd-party tools like [DownSub](https://downsub.com).


## Online Tools

There are websites that offer auto-captioning:

* [https://www.veed.io](https://www.veed.io)
* [https://kapwing.com](https://kapwing.com)
* [https://happy-scribe.com](https://www.happyscribe.com)

These often require a free account or have limits unless you subscribe.

## (Optional) Transcribe All MP4s in a Folder 

If you have multiple videos that you want to transcribe, you can use a script:

```bash
for f in *.mp4; do
  whisper "$f" --language English --task transcribe --output_format srt
done
```