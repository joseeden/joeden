---
title: "macOS Gatekeeper Error for Unverified CLI Binaries"
description: "macOS Gatekeeper Error for Unverified CLI Binaries"
sidebar_position: 15
tags: 
- DevOps
- Personal Notes
- Development
# last_update:
#   date: 6/14/2024
---

## Purpose

This KB explains why macOS blocks certain command-line tools with a malware verification error and how to safely run trusted binaries.
`eck-diagnostics` is used as an example, but this applies to **any non-notarized CLI tool**.

## Error 

When executing a downloaded binary, macOS displays the following error:

> Apple could not verify `<binary-name>` is free of malware that may harm your Mac or compromise your privacy

<div class='img-center'>

![](/img/docs/Screenshot-2026-01-28-4.04.45 PM.png)

</div>


## Root Cause

macOS Gatekeeper blocks binaries when:

- The binary is **not notarized by Apple**
- The binary was **downloaded from the internet**
- The file has a `com.apple.quarantine` attribute set

This is common for:

- Open-source tools
- Vendor-provided diagnostics utilities
- Internal or airgapped tooling

This behavior is **expected** and does not indicate malware.

## Security Considerations

Before bypassing Gatekeeper, ensure:

- The binary is obtained from a **trusted source**
- Checksums are verified when provided
- The tool is required for operational or diagnostic purposes

This applies to:

- macOS on Apple Silicon and Intel
- Any third-party or open-source CLI tool
- Airgapped or restricted environments


## Resolution (Recommended Method)

Use Terminal to remove the quarantine flag from the binary:

```bash
xattr -dr com.apple.quarantine <binary-name>
```

Example:

```bash
xattr -dr com.apple.quarantine eck-diagnostics
```

Ensure the binary is executable:

```bash
chmod +x <binary-name>
```

## Verification

Run the binary again:

```bash
./<binary-name>
```

The error should no longer appear.

## Alternative Resolution (GUI Method)

If the binary was already blocked:

1. Open **System Settings**
2. Go to **Privacy & Security**
3. Scroll to **Security**
4. Locate the blocked application
5. Click **Allow Anyway**
6. Re-run the binary

