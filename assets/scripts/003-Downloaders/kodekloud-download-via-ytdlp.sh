#!/bin/bash


# Another way to download kodeklod courses is through yt-dlp.
# Maake sure yt-dlp is downloaded first.
# To run this script:
#
#       ./kodekloud-download-via-ytdlp.sh url-list.txt 
#
# The URL list text file is passed as a parameter.
# This file contains the URLs of each videos in a courses.

while read url; do
   yt-dlp  -f bv[protocol=m3u8_native]+ba[protocol=m3u8_native] "$url" --paths .
done < $1


# UPDATE:
# This is a bit troublesome become you have to get the address link of each video first.
# Better to use "kodekloud-downloader" from Github.
# See 'kodekloud_download_courses.md'
