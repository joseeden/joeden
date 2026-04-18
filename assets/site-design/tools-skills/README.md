
# How to use 

Put all the skills tools in one place, and link to them from the homepage.

1. List the filenames in the `_icon-list.txt` file. 

    The filenames can be any name, since the downloaded image will be renamed to match the filename in the list. The file extension can be any of the supported formats (jpg, jpeg, png, gif, webp, avif).

3. List the URLs in the `_url-list.txt` file. 

    The URLs should be in the same order as the filenames in the `_icon-list.txt` file, so that each image corresponds to the correct URL.

3. Set the permission for the script:

    ```bash
    chmod +x download-icons.sh
    ```

4. Run the script to download the icons:

    ```bash
    ./download-icons.sh
    ```