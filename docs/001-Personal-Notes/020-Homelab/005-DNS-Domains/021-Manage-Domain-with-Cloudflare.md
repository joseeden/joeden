---
title: "Manage Domain with Cloudflare"
description: "Manage Domain with Cloudflare"
sidebar_position: 21
last_update:
  date: 5/5/2024
---

## Purpose

This KB outlines the steps on how to move DNS management for a domain registered at **Name.com** to **Cloudflare** using the **free Cloudflare plan**. 
It includes recommended Cloudflare settings, email-related DNS guidance, troubleshooting tips, a rollback plan, and a short FAQ.

Moving DNS to Cloudflare gives you CDN, DDoS protection, simplified SSL, caching and optional WAF/protection features. 
The registrar remains `Name.com`, you only change the domain's authoritative nameservers to Cloudflare's nameservers.

## Prerequisites

- Access to the Name.com account where the domain is registered.
- Cloudflare account (free plan is sufficient).
- Access to your origin hosting (optional but recommended: confirm whether origin supports HTTPS).
- A list of current DNS records (A, AAAA, CNAME, MX, TXT, SRV, etc.) or access to export/view them at Name.com.

## High-level Steps

1. Add site to Cloudflare and import DNS records
2. Confirm and add any missing DNS records (especially email-related records)
3. Update nameservers at Name.com to the two nameservers Cloudflare provides
4. Wait for propagation and confirm the site is "Active" in Cloudflare
5. Tune SSL, security, and performance settings

## Steps

### 1. Add the Domain to Cloudflare

1. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com) and sign in/sign up.
2. On the Cloudflare dashboard, click **Add a site**.
3. Enter your domain name and select **Quick scan for DNS records**. 
4. Click **Continue.**

    <div class='img-center'>

    ![](/img/docs/cloudflare-3.png)

    </div>

4. Choose the **Free** plan when prompted.
5. Cloudflare will scan existing DNS records. Wait for the scan to complete.

### 2. Review and Confirm DNS Records

1. Cloudflare shows the DNS records it discovered:

    - A / AAAA records (point to your server IPs)
    - CNAME records
    - MX records (email)
    - TXT records (SPF, domain verification)
    - DKIM (for email signing) and DMARC records
    - Any SRV records used by services (e.g., Teams, VoIP)

2. If any record is missing, add it manually (click **Add record**).

    :::info[Important]

    Important: For email to continue working, ensure **all MX and related TXT/DKIM records are present** before switching nameservers.

    :::

4. Decide which records should be proxied through Cloudflare:

    - Orange cloud (proxied): HTTP/HTTPS web traffic (gains CDN + security)
    - Grey cloud (DNS-only): mail (MX), subdomains required for SMTP, many non-HTTP services, and some verification endpoints
      
5. Typical rule: leave MX, IMAP/SMTP (A records for mail servers), and other mail-related records as **grey cloud** (DNS-only).

    <div class='img-center'>

    ![](/img/docs/cloudflare-4.png)

    </div>

6. Click **Continue Activation.**

7. After confirming DNS records, Cloudflare will show the two authoritative nameservers it wants you to use.

    <div class='img-center'>

    ![](/img/docs/cloudflare-5.png)

    </div>

8. Copy both values exactly.

### 3. Update Nameservers at Name.com

1. Sign in to your Name.com account: [https://www.name.com](https://www.name.com)
2. From the dashboard, find **My Domains**  and click the domain you want to manage.

    <div class='img-center'>

    ![](/img/docs/cloudflare-1.png)

    </div>

3. Click **Manage Nameservers** for that domain. 

    <div class='img-center'>

    ![](/img/docs/cloudflare-2.png)

    </div>

4. Delete the registrar default nameservers.

    <div class='img-center'>

    ![](/img/docs/cloudflare-6.png)

    </div>

5. Paste the two Cloudflare nameservers provided earlier into the two nameserver fields.

    <div class='img-center'>

    ![](/img/docs/cloudflare-7.png)

    </div>

6. Click **Save changes.**

    :::info[Name.com UI variations]

    Some Name.com pages label this area as **Nameservers** or **Registrar DNS**. 

    If Name.com offers a built-in DNS editor and you are moving DNS to Cloudflare, you'll replace the current nameservers with the Cloudflare ones (this disables Name.com DNS editor because authoritative DNS will now be Cloudflare).

    :::

7. Back in Cloudflare, make sure to click **Continue**.


### 4. Wait for Nameserver Propagation

1. Cloudflare will show the domain as **Pending Nameserver Update** until it detects the new nameservers at the global registry.
2. Propagation usually completes in 5–30 minutes but can take up to 24–48 hours in rare cases.

    <div class='img-center'>

    ![](/img/docs/cloudflare-8.png)

    </div>

3. Once the nameserver change is visible, the site status changes to **Active**.

    <div class='img-center'>

    ![](/img/docs/cloudflare-9.png)

    </div>

4. Verify using [Mxtoolbox](https://mxtoolbox.com/) to confirm the NS records match Cloudflare's nameservers.

    <div class='img-center'>

    ![](/img/docs/cloudflare-10.png)

    </div>


### 5. Set SSL/TLS mode and Verify origin certificate

1. Go to Cloudflare Dashboard → **SSL/TLS → Overview**.
2. Choose a mode:

    - **Full (recommended)** if your origin has a valid TLS certificate (self-signed is acceptable for Full but not Full (Strict))
    - **Full (Strict)** if your origin has a certificate issued by a trusted CA or Cloudflare Origin CA
    - **Flexible** if your origin does not support HTTPS (not recommended — can cause redirect loops and security gaps)
    - 
3. (Optional) Generate and install a Cloudflare Origin Certificate on your origin server and select **Full (Strict)** for the best security.

### 6. Configure Cloudflare Settings (Recommended)

- **DNS**: 

  - Keep web site A/CNAME records proxied (orange cloud). 
  - Keep MX and mail server records DNS-only (grey cloud).

- **SSL/TLS**:

    - Minimum TLS version: 1.2 or 1.3
    - Enable HTTP Strict Transport Security (HSTS) only after testing (Hard to undo).
  
- **Security → WAF & Firewall**:

    - Free plan: enable basic managed rules and block obvious malicious traffic patterns.
    - Create firewall rules for admin paths (e.g., `/wp-admin`) and restrict by IP if possible.

- **Speed → Caching**:

    - Browser Cache TTL: choose per your application
    - Enable Brotli (Compression) and Auto Minify (JS/CSS/HTML) if desired

- **Page Rules**:

    - Free plan: limited number
    - Use them for redirects, caching overrides, or forcing HTTPS.

- **Network**: 
  
    - Enable HTTP/2 and HTTP/3 (if available) for better performance.


### 7. Email specifics (Very important)

- Keep MX records unchanged and DNS-only (grey cloud)
- Keep any SPF, DKIM and DMARC TXT records intact.
- If SPF is missing, add them in Cloudflare before nameserver switch.
- If your mail uses a host like `mail.example.com`, ensure the A record for `mail` is **grey cloud** (Cloudflare does not proxy SMTP.)

## Useful Commands

- Check NS records (expect Cloudflare NS):

    ```
    dig NS example.com +short
    ```

- Check A record:

    ```
    dig A example.com +short
    ```

- Query a specific resolver (Google DNS):

    ```
    dig NS example.com @8.8.8.8 +short
    ```

## Troubleshooting

1. **Website not reachable after switching nameservers**

    - Check DNS records in Cloudflare.
    - A record must point to correct origin IP and be proxied (orange) if you want Cloudflare protection.
    - Use `dig +short example.com A` and `dig +short example.com NS` to verify.
    - Temporary DNS propagation: test with `nslookup` or `dig` against 1.1.1.1 and 8.8.8.8 to confirm global status.

2. **Email broken after move**

    - Most likely cause: missing MX or mail-server A record
    - MX record points to a host that is orange-clouded (proxied). 
    - Set mail-related records to DNS-only.

3. **Redirect loops or mixed content after enabling SSL**

    - If your origin serves HTTP and Cloudflare is set to Flexible, you may get redirect loops. 
    - Switch to Full or Full (Strict) after enabling HTTPS at origin.

4. **DNS records missing from Cloudflare**

    - Add them manually in Cloudflare DNS. 
    - Check the Name.com DNS page for records you may have missed.


## Rollback Plan

- In Cloudflare: Keep DNS records as-is (they will remain authoritative once NS revert).
- At Name.com: Replace the Cloudflare nameservers with the former nameservers (Name.com defaults or your hosting provider nameservers).
- After the change, wait for propagation. 
- Your domain will stop using Cloudflare features and return to the old DNS provider.


## Common FAQ

1. **Do I have to transfer my domain registration from Name.com to Cloudflare to use Cloudflare?**

    No. You only need to change nameservers. Your domain registration stays at Name.com unless you choose to transfer registration.

2. **Will changing nameservers break email?**

    Not if you copy MX and mail-related records correctly into Cloudflare before switching. Keep mail records DNS-only.

3. **How long does propagation take?**

    Typically 5–30 minutes. Up to 24–48 hours in rare cases.

4. **Is Cloudflare free for basic protection?**

    The Free plan includes CDN, basic DDoS protection, WHOIS Redaction/Privacy, DNS, and limited security features.



