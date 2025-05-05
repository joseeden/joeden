---
title: "Unlock Encrypted PDF"
description: "Unlock Encrypted PDF"
sidebar_position: 3
---


## Using `cat` to read Encrypted PDF

`cat` just shows raw file contents — but **PDF files are binary and structured**, not plain text.
Even without password protection, PDFs look like that when you `cat` them.

**Can you extract useful data directly?**

No. The "stream" output when you use `cat` is compressed and encrypted. Without decrypting it (correct password or a successful crack), you cannot extract readable text.

However, you can determine some details from the `cat` output:


| **Field**             | **Example** | **Remarks / Comments**                          |
| --------------------- | ----------- | ----------------------------------------------- |
| PDF Version           | PDF-1.3     | Indicates it's an older format (from \~1999)    |
| Encryption Algorithm  | RC4 40-bit  | Very weak encryption by modern standards        |
| Encryption Dictionary | `/V 1`      | Means standard security handler is used         |
| Revision Number       | `/R 2`      | Corresponds with 40-bit RC4 (Adobe Acrobat 3.x) |
| Security Level        | Low         | Easily crackable with freely available tools    |



## Cracking the Password 

:::warning

**Legal note**: Only do this if you own the document or have rights to access it.

:::

There are ways to unlock or remove a password from an encrypted PDF, bbut it depends on a few things:

1. **If you know the password** (legitimate unlocking)

    In Adobe Acrobat: **File > Properties > Security tab > Security Method: No Security > Save**.
    This creates an unlocked copy without needing the password again.

    If you want to use WSL2, you can [install qpdf.](#using-qpdf-password-known)

2. **If you don't know the password** (recovery attempts)

    If you **don't know the password**, it's much harder — unless the encryption is weak.
    Some tools can *attempt* to crack it:

    - **PDFCrack** (free, open source) — brute-force or dictionary attacks.
    - **Elcomsoft PDF Password Recovery** (paid, very powerful).
    - **John the Ripper** with PDF plugin — advanced, for Linux users.

    :::info 

    If the PDF is strongly encrypted (e.g., AES-256), and you don't have the password, cracking it could be **practically impossible** without a lot of time and computing power.

    :::


3. **Online unlock services**

    Websites like `smallpdf.com/unlock-pdf` or `ilovepdf.com/unlock_pdf` allow you to upload and unlock simple password-protected PDFs.


    :::warning 

    Do not upload confidential or sensitive files to random online services — you lose control of your data.

    :::

4. **Using command-line tools (if you know the password)**

    If you know the password and want a quicker method: **qpdf** (Linux, Mac, Windows):

      ```bash
      qpdf --password=YOUR_PASSWORD --decrypt input.pdf output.pdf
      ```

## Using `qpdf` (Password Known)

You can use `qpdf` tool in WSL2 if you already know the password to an encrypted PDF and want to remove the password** (i.e., create a non-encrypted copy).

1. Install `qpdf`

  ```bash
  sudo apt update
  sudo apt install qpdf
  ```

2. Verify:

  ```bash
  qpdf --version
  ```

  Sample output:

  ```bash
  qpdf version 10.6.3
  ```

3. Remove the password from the PDF


  ```bash
  qpdf --password=yourpassword --decrypt input.pdf output.pdf
  ```


## Using `pdfcrack` and `John the Ripper`

**On WSL2/Linux**, you can try:

* `pdfcrack` (simple and common)
* `John the Ripper` with `pdf2john` (for stronger attacks)
* `hashcat` with `pdf2hashcat`

Example using `pdfcrack`:

```bash
sudo apt install pdfcrack
pdfcrack -f yourfile.pdf
```

This will try simple brute-force and dictionary guesses.

Or using `John`:

```bash
sudo apt install john
pdf2john yourfile.pdf > hash.txt
john hash.txt
```

:::info 

- You can **speed up cracking** if you know part of the password (e.g., "I think it started with 1234...").
- **For strong passwords** (random characters, long), even the best tools might take **years** to crack.

:::



## Using Hashcat 

**Hashcat** is much faster than `pdfcrack`, especially if you have a GPU (even in WSL2 CPU mode, it can be faster).

**1. Install Hashcat**

  In WSL2:

  ```bash
  sudo apt update
  sudo apt install hashcat
  ```

  GPU acceleration needs extra steps, but you can start with CPU.


**2. Extract the Hash from the PDF**

  Hashcat **doesn’t crack the PDF directly** — it cracks the **hash** of the password.

  You need a **hash extractor** first.

  Install `pdf2john.pl` (comes with John the Ripper tools):

  ```bash
  sudo apt install john
  ```

  Then extract the hash:

  ```bash
  pdf2john.pl yourfile.pdf > hash.txt
  ```

  Now you have a `hash.txt` file that contains the extracted PDF password hash.

  ```bash
  $ cat hash.txt

  $pdf$1*2*40*20*1*16*9a6f3b5e12d7a8c3f4e1629be8310f9d*32*bcf1a3d9f2e6d4c1ab9c7083f6de2a8e90cd4e7b6d5a1234c7e98f31a4d6b7c1*32*2f7e1a9c5b3d84a6c4e29715e1b2d3c4f5a60789deabc123fedcba5432109876
  ```

  
  :::info 

  If you encounter `pdf2john: command not found`, please see [Missing `pdf2john`](#missing-pdf2john)

  :::


**3. Run Hashcat**

  Now crack it:

  ```bash
  hashcat -m 10500 -a 3 hash.txt ?a?a?a?a?a?a
  ```

  Note:

  - `-m 10500` → mode for PDF 1.1 - 1.3 (40-bit RC4 encryption)
  - `-a 3` → brute-force attack mode
  - `?a?a?a?a?a?a` → trying **all characters, 6 characters long**

  If you know the password length or pattern (e.g., numbers only?), you can adjust this.

  **For example**:

  - Only numbers: use `?d` instead of `?a`
  - Only lowercase letters: use `?l`

  Example for 4-digit number:

  ```bash
  hashcat -m 10500 -a 3 hash.txt ?d?d?d?d
  ```

**4. Faster: use a Wordlist instead**

  If you have an idea it might be a real word, or a simple phrase, better use a **wordlist** (like `rockyou.txt`).

  Install a huge wordlist:

  ```bash
  sudo apt install wordlists
  ```

  It installs `/usr/share/wordlists/rockyou.txt.gz`.

  Unzip:

  ```bash
  gunzip /usr/share/wordlists/rockyou.txt.gz
  ```

  Then run:

  ```bash
  hashcat -m 10500 -a 0 hash.txt /usr/share/wordlists/rockyou.txt
  ```

  This way, hashcat will **try passwords from a dictionary** instead of guessing character by character.


### Commands Summary

| Step              | Command                                                           |
| :---------------- | :---------------------------------------------------------------- |
| Install Hashcat   | `sudo apt install hashcat`                                        |
| Install John      | `sudo apt install john`                                           |
| Extract hash      | `pdf2john.pl yourfile.pdf > hash.txt`                             |
| Brute-force crack | `hashcat -m 10500 -a 3 hash.txt ?a?a?a?a?a?a`                     |
| Dictionary crack  | `hashcat -m 10500 -a 0 hash.txt /usr/share/wordlists/rockyou.txt` |


### Notes

- Use `hashcat --help` to see options.
- You can **resume** a crack if it stops (don't need to start over).
- **Monitor CPU/GPU usage** if you're doing heavy attacks.
- WSL2 **can use your GPU** if you set up Nvidia CUDA toolkit inside WSL2 (optional).


## Troubleshooting 

###  Missing `pdf2john`

If you’re seeing:

> `pdf2john: command not found`

This might be expected because the **correct script name** is actually `pdf2john.pl` (with `.pl` at the end), not just `pdf2john`.

1. **Make sure you have John the Ripper installed:**

    ```bash
    sudo apt install john
    ```

    This installs `john`, which includes `pdf2john.pl`.


2. **Locate `pdf2john.pl`**

    It’s usually installed at:

    ```bash
    /usr/share/john/pdf2john.pl
    ```

    You can check:

    ```bash
    ls /usr/share/john/pdf2john.pl
    ```

3. **Run it properly**

    Use **`perl`** to run the script:

    ```bash
    perl /usr/share/john/pdf2john.pl yourfile.pdf > hash.txt
    ```

    This will extract the hash into `hash.txt`.

    :::info 

    If you encounter `No such file or directory`, please see [`pdf2john.pl` not found](#pdf2johnpl-not-found).

**Optional shortcut**

If you don’t want to always type the full path, you can create an alias:

```bash
alias pdf2john='perl /usr/share/john/pdf2john.pl'
```

Then you can just run:

```bash
pdf2john yourfile.pdf > hash.txt
```

### `pdf2john.pl` not found

Possible cause: You installed `john` **version 1.8.0** but **your version is too old** to include `pdf2john.pl`(That script was included in later versions, like `john 1.9+`.)


#### Option 1 — Quickest

`pdf2john.pl` is just a simple Perl script. You can **download it manually**.

```bash
curl -o pdf2john.pl https://raw.githubusercontent.com/openwall/john/bleeding-jumbo/run/pdf2john.pl
chmod +x pdf2john.pl
```

Then use it:

```bash
perl pdf2john.pl yourfile.pdf > hash.txt
```

This way you don't have to mess with upgrading your whole John the Ripper.


#### Option 2 - Use **pdf2john.py** instead of **pdf2john.pl**

You can **switch to Python version** of `pdf2john`:

Download **pdf2john.py**:

```bash
curl -o pdf2john.py https://raw.githubusercontent.com/openwall/john/bleeding-jumbo/run/pdf2john.py
```

Run it:

```bash
python3 pdf2john.py yourfile.pdf > hash.txt
```

If successful, you should have something like this:

```bash
$ cat hash.txt

$pdf$1*2*40*20*1*16*9a6f3b5e12d7a8c3f4e1629be8310f9d*32*bcf1a3d9f2e6d4c1ab9c7083f6de2a8e90cd4e7b6d5a1234c7e98f31a4d6b7c1*32*2f7e1a9c5b3d84a6c4e29715e1b2d3c4f5a60789deabc123fedcba5432109876
```

Then you can run:

```bash
hashcat -m 10500 hash.txt /path/to/your/wordlist.txt
```




#### Option 3 — Upgrade John the Ripper (harder)

If you really want a full modern `john`, you would need to:

- Remove your current version
- Build `john` from source (takes longer)
- Install dependencies like `build-essential`, `libssl-dev`, etc.

