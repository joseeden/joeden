---
title: "Buying a Domain"
description: "Buying a Domain"
sidebar_position: 10
last_update:
  date: 5/5/2024
---



## Overview

Once you've chosen a registrar and a domain, you can proceed to buy the domain. The process is usually straightforward:

1. Go to the registrar's website.
2. Search for your desired domain name.
3. If available, add it to your cart.
4. Proceed to checkout and provide the necessary information. 
5. Complete the payment process.
6. After payment, you will receive a confirmation email with the details of your purchase.


## Namecheap

To buy a domain on Namecheap, go to their website and enter the domain name you want. You’ll see available options and different domain endings (like `.net`, `.org`, `.cars`, `.xyz`).

#### Buying a Domain

After picking your domain, follow these steps:

1. Create an account
2. Enter your Whois contact details
3. Add your payment method
4. Confirm your order

In the **Whois Contact** section, fill in:

- Registrant Contact
- Administrative Contact
- Technical Contact
- Billing Contact

You can also choose to enable **Domain Privacy** on the same page.

![Namecheap Whois Privacy Setup](/img/docs/08092025-namecheap-1.PNG)

On the **Billing** page, add your credit card information. At the bottom, you can opt to enable automatic renewal.

![Namecheap Billing Setup](/img/docs/08092025-namecheap-2.PNG)

After confirming, you’ll see your order number.

![Namecheap Order Confirmation](/img/docs/08092025-namecheap-3.PNG)


#### Account Requires Verification 

After buying your domain, you need to verify your email address. Namecheap will send you a verification email. 

![Namecheap Order Confirmation](/img/docs/08092025-namecheap-11.PNG)

Check your bank notifications or your credit card statemen, the payment will appear with a descriptor like `NAME-CHEAP.COM*XXXXXX`.


#### Enable Two-Factor Authentication (2FA)

For most users, using an **Authentication App** for 2FA is recommended.

![Namecheap 2FA Setup](/img/docs/08092025-namecheap-4.PNG)

You’ll need to enter your password first.

![Namecheap Password Prompt](/img/docs/08092025-namecheap-5.PNG)


#### Dashboard

In your Namecheap dashboard, you can view all your domain details.

![Namecheap Dashboard](/img/docs/08092025-namecheap-6.PNG)

Click **Verify Contacts** — a banner will say "Email sent successfully."

Check your email for a message titled "IMMEDIATE VERIFICATION required for your domain(s)."

![Verification Email](/img/docs/08092025-namecheap-7.PNG)

Scroll down and click the link labeled **"Click to verify your email address."**

![Verify Email Link](/img/docs/08092025-namecheap-8.PNG)

A new tab will open showing a **"successfully verified"** message.

![Verification Success](/img/docs/08092025-namecheap-9.PNG)


#### Disable Auto-renew

Back in your Namecheap dashboard, click the **arrow down** icon next to your domain.

![Disable Auto-renew](/img/docs/08092025-namecheap-10.PNG)



## Porkbun

To buy a domain on Porkbun, go to their website, enter the domain you want, choose from the available options, and create your account.

#### Verify Identification 

**Note:** Porkbun requires ID verification. Some people may find this a bit invasive, so keep that in mind.

![Porkbun ID Verification](/img/docs/08092025-porkbun-1.PNG)

Click **Continue with ID verification**. You’ll scan a QR code and finish the process on your phone.

![Porkbun QR Code](/img/docs/08092025-porkbun-2.PNG)

You’ll need to:

- Take photos of the front and back of your ID
- Take a selfie

After submitting, you should see a confirmation message.

![Porkbun Submission Confirmation](/img/docs/08092025-porkbun-3.PNG)

Verification is usually fast, but if there’s a delay, it may take up to 24 hours. You can email **[support@porkbun.com](mailto:support@porkbun.com)** if needed.

![Porkbun Support Email](/img/docs/08092025-porkbun-4.PNG)

#### Enable MFA 

After verification, you can enable **Multi-Factor Authentication (MFA)** for added security. 

1. Go to [Security Settings](https://porkbun.com/account#accountSecuritySettings) 
2. Scroll down to **2FA - App Based** > Enable app based two factor authentication.
3. Scan the code with your authenticator app
4. Enter the code from the authenticator app 
5. You can also copy the backup codes and save it in a file(recommended).

## Name.com 

Buying a domain on Name.com works like most other registrars:

1. Choose your domain
2. Create an account
3. Add a payment method
4. Confirm your order

After creating your account, you’ll need to verify your contact information.

![Name.com Contact Verification](/img/docs/08092025-namedotcom-1.PNG)


## Vercel

If you buy a domain from **Vercel**, you can use it for Vercel projects, but you can also use it for projects hosted elsewhere.

### How it works

Vercel acts as your **registrar** (usually via Tucows/OpenSRS).

- You fully own the domain, just like if you bought it from Porkbun or Namecheap.
- You can **change the nameservers** to any DNS provider and host your site anywhere.
- Other DNS providers: Cloudflare, AWS Route 53, etc.
- You’re not required to keep the domain linked to Vercel services.


### Using your Vercel domain outside Vercel

1. Buy the domain on Vercel.
2. In your Vercel dashboard, go to Domain settings.
3. Update the **nameservers** to your preferred DNS provider 
4. You can also update DNS records to point to your non-Vercel project.
5. Set up hosting for your domain wherever you want.


### Things to note

- Renewal prices depend on what Vercel charges — sometimes higher than other registrars.
- You can transfer your domain to another registrar after the 60-day ICANN lock.
- For complex DNS setups, services like Cloudflare or Route 53 might offer more features than Vercel’s DNS.


## Manage DNS in Cloudflare  

Cloudflare can handle your domain’s DNS, security, and performance features even if your domain is registered elsewhere.

For more inforrmation, please see [Cloudflare.](/docs/001-Personal-Notes/055-Homelab/018-Cloudflare.md)
