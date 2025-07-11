---
title: "Tor Browser"
description: "The Onion Router"
tags: [Security, Cybersecurity, Cryptography]
sidebar_position: 15
last_update:
  date: 1/30/2024
---



## The Onion Router (TOR)

The Tor Browser allows users to browse the internet anonymously by routing traffic through a network of servers.

- Routes traffic through multiple nodes
- Hides user’s IP address and encrypts data multiple times
- Bypasses censorship and access blocked content while protecting privacy

## Perfect Forward Secrecy

Perfect Forward Secrecy (PFS) ensures that encryption keys are not compromised, even if long-term keys are exposed.

- Each session uses a unique key that is not derived from past or future sessions.
- Different session keys prevents decryption of past or future sessions
- Common in secure communication protocols like TLS

## Tor in Action

How it works:

1. Client opens Tor Browser and enters the website URL
2. Tor Browser retrieves available nodes from the directory server
3. Browser selects three or more nodes to route the traffic
4. Each node only knows the previous and next node
5. Client sends request to Node 1, which forwards it to Node 2
6. Node 2 forwards the request to Node 3
7. Node 3 sends the request to the destination server
8. Website sees Node 3 as the source
9. The response follows the same path back to the client
10. The route maintains the client's anonymity

How it looks like:

![](/img/docs/networking-basics-how-tor-browser-works-behind-the-scenessss.png)


## Request Chain

The request chain in Tor ensures privacy through multiple layers of encryption:

1. Client encrypts request so only Node 3 can read it
2. Client places it in an envelope for Node 3, encrypts it for Node 2
3. Adds another encrypted envelope for Node 1
4. Node 1 forwards the request to Node 2
5. Node 2 decrypts the envelope and sends it to Node 3
6. Node 3 decrypts the final envelope and forwards the request to the website

How it looks like:

![](/img/docs/networking-basics-how-tor-browser-works-request-chainsss.png)



## Hidden Services

Hidden services, also known as "onion services" in the Tor network, are websites that can only be accessed via the Tor browser. These sites use the .onion domain and are designed to provide privacy for both the host and the user.

- The server’s location and identity are also concealed.
- Instead of domain names (like google.com), it uses strange URLs (like xyz123abc.onion)
- Ideal for privacy-sensitive activities, like accessing censored information

## How to access onion sites

On your computer: 

1. **Connect to a VPN first**. This one is a must.
2. Download Tor Browser from the official Tor website: [Tor.](https://www.torproject.org/download/)
3. Install Tor Browser by opening the file you downloaded and following the prompts.
4. Open Tor Browser and click “Connect” on the Tor startup page.

    <div class='img-center'>

    ![](/img/docs/networking-basics-tor-browser-downloadeddd.png)

    </div>

5. Wait for the connection to be established. Once done, you should see:


    <div class='img-center'>

    ![](/img/docs/networking-basics-tor-browser-connecteddd.png)

    </div>


There is some example links that you can try accessing here: [Dark Web Links: The best .onion and Tor sites in 2024](https://www.expressvpn.com/blog/best-onion-sites-on-dark-web/)