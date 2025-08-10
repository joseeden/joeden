---
title: "Tranferring Domains"
description: "Tranferring Domains"
sidebar_position: 16
last_update:
  date: 5/5/2024
---


## Overview

You can’t instantly “move” a domain between registrars or DNS providers. It depends on what you’re changing.

#### Registrar transfer

Moving your domain registration from one registrar to another (e.g., Namecheap → AWS Route 53 Registrar).

- Has a 60-day lock after registration or transfer (ICANN rule)
- Rarely needed for lab work

When you transfer again, the new registrar will add 1 extra year to your current expiration date, and you’ll pay for that year. Your existing time isn’t lost.

Frequent transfers mean paying extra renewal fees each time, at the **destination registrar’s rate**, which means **it has nothing to do with**:

- The price you originally paid
- The “market price” average
- Your old registrar’s renewal cost

**Example:**

- Your domain expires Jan 2027 at Cloudflare
- You transfer to Route 53 in Aug 2026
- Route 53 charges **Route 53’s transfer/renewal fee** for 1 year (for `.com` right now, that’s USD \$12 at Route 53)
- New expiry becomes Jan 2028

So if you hop registrars a lot, you’re essentially **paying for an extra renewal every time you move**, priced according to the destination registrar’s rates for that TLD.


#### Nameserver change

Pointing your domain to a different DNS host (e.g., Cloudflare → Route 53 Hosted Zone).

- No 60-day lock
- Can change anytime from your registrar dashboard
- Usually takes minutes to a few hours, but can be up to 24 hours for full propagation


## From Namecheap to Cloudflare 

Cloudflare charges for a 1-year domain registration when you transfer a domain in. This is the same as their regular registration cost, plus any taxes or ICANN fees.

- .xyz domains usually cost around $7 to $9 per year
- No extra “transfer fee” is added
- The cost is just the standard renewal paid at the time of transfer

Prices may change, so check Cloudflare’s official registrar pricing for the exact amount.


## From Namecheap to Amazon Route 53

Route 53 also requires a 1-year registration fee when transferring a domain, which covers the first year of renewal.

- .xyz domains typically cost **\$12–\$14 per year**
- No separate “transfer fee” is charged
- You simply pay for the first year’s registration during the transfer

Check AWS Route 53 domain pricing for current rates.

## Comparison

**Summary Table**

| Transfer Destination | Approx. Cost (1st Year, .xyz) |
| -------------------- | ----------------------------- |
| Cloudflare Registrar | \$7–\$9                       |
| Amazon Route 53      | \$12–\$14                     |


**To confirm pricing:**

1. Visit Cloudflare’s *Registrar Pricing* page
2. Visit AWS Route 53’s domain pricing page

