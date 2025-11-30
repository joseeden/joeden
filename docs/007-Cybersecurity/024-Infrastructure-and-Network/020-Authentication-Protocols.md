---
title: "Authentication Protocols"
description: "PAP, NTLM, Kerberos, and the sorts"
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
sidebar_position: 20
last_update:
  date: 1/30/2024
---



## Overview 

Network authentication protocols are mechanisms or sets of rules that ensure that users or devices can securely prove their identity to access network resources or services.

They ensure that only authorized users or devices can access a network, reducing the risk of unauthorized access and enhancing security.


## PAP 

**PAP (Password Authentication Protocol)** is a basic authentication protocol that has been largely replaced by more secure methods. Here’s an overview of its characteristics:

- Transmits passwords in plaintext, making it vulnerable to interception.
- Lacks encryption, thus passwords are exposed during transmission.
- Legacy use, common in older systems where security measures were less advanced.
- Offers minimal protection against attacks such as eavesdropping.

## CHAP

**CHAP (Challenge Handshake Authentication Protocol)** is a more secure authentication method compared to PAP, using a challenge-response process to avoid transmitting passwords in plaintext.

- The server sends a random challenge to the client.
- Client responds with a hash value created from the challenge and the user's password.
- Server compares received hash with its own calculated hash to authenticate the user.
- Repeated challenges during a session reduce the risk of replay attacks.

## MS-CHAPv2 

**MS-CHAPv2** is a more secure version of the Challenge-Handshake Authentication Protocol, designed to provide enhanced security in network environments. 

- Utilizes a challenge-response mechanism with stronger encryption
- Widely used in VPNs and Windows-based environments
  
  ![](/img/docs/sec+-mschapv222.png)

## NTLM

**NTLM** is a Microsoft proprietary authentication protocol that has evolved over time to enhance security in network environments, though it is now largely replaced by more secure protocols like Kerberos.

- "NT" - New technology
- Microsoft’s proprietary authentication protocol
- Supersedes the older LANMAN protocol
- Designed for workgroup computers, not joined to any AD domain
- Known for vulnerabilities to various attacks
- Password hashes with NTLM are not salted, making them easier to crack
- NTLM v2 includes salted passwords for improved security

## Kerberos

**Kerberos** is a ticket-based authentication system that allows users to authenticate to a centralized service and use tickets to gain access to distributed services.

- Primarily used for single sign-on (SSO) in enterprise environments.
- Commonly used in Microsoft Active Directory authentication.
- Users are provided with a "ticket" for accessing resources securely.

### Kerberos Components 

The following components are essential for Kerberos to function:

- **Kerberos Key Distribution Center (KDC)**  
  
  - The central authority that issues and manages security credentials.
  - Holds all cryptographic keys for the principals within a realm.
  - Can also be a single point of failure unless there are redundant KDCs.
  
- **Authentication Service (AS)**  
  
  - A part of the KDC
  - Verifies a user's credentials
  - Issues a *Ticket-Granting Ticket (TGT)*.
  
- **Ticket-Granting Service (TGS)**  
  
  - Another part of the KDC that issues service-specific tickets
  - Allows users to access the services after identity is authenticated.
  
- **Ticket-Granting Ticket (TGT)**  
  
  - A token that the client receives after initial authentication
  - Allows requesting access to services without re-entering credentials.
  - Used by subjects for trusted access to other resources
  - Permits a principal to access another principal

### How Kerberos Works 

Kerberos operates through a series of steps that ensure secure communication and authentication between a client and a service.

1. The end user uses a Kerberos client to provide their username and password.

2. The client sends a clear authentication request to an Authentication Server (AS).

3. The AS looks up the user in its database and replies to the client with the following:

    - Random session key 
    
      - Used for future communication between client and ticket-granting server
      - Encrypted with client's password  
    - Ticket granting ticket

      - Includes information of the client
      - Includes a copy of the client ticket-granting server's (TGS) session key
      - Encrypted using a key known only to the ticket-granting server 


4. The client decrypts the session key using the user’s password, gaining access to the client-TGS session key.

5. To access a service, the client contacts the TGS and sends:

    - A copy of the TGT and the identity of the requested service.
    - An authenticator containing the client's ID and current time, encrypted with the client-TGS session key.

6. The TGS decrypts the TGT to retrieve the client-TGS session key.

7. Using this key, the TGS decrypts the authenticator and retrieves the client ID and timestamp.

8. The TGS generates a random client-server session key for communication between the client and the service.

9.  The TGS sends two messages to the client:
 
    - A **client-server ticket**, encrypted with the service's secret key, containing the client-server session key.
  
    - A copy of the client-server session key, encrypted with the client-TGS session key.

10. Upon receiving these messages, the client is ready to complete the authentication process.

11. The client sends the following to the service:

    - The **client-server ticket** (received from the TGS).
    - A new authenticator encrypted with the client-server session key.

12. The service decrypts the client-server ticket to retrieve the session key and uses it to decrypt the authenticator, validating the client.

13. Once the service validates the client, the client is granted access to the service.

How it looks like: 

<div class='img-center'>

![](/img/docs/sec+-kerberos-diagram-how-it-works-detailed-version.png)

</div>

### Disadvantages of Kerberos 

Some known weaknesses of Kerberos are:

- The KDC can be a single point of failure.
- Network traffic is not protected if encryption is not enabled.
- Secret keys are vulnerable when they are temporarily stored on users’ workstations.

## SESAME

**SESAME (Secure European System for Applications in a Multi-vendor Environment)** is a single sign-on technology designed to improve security and streamline access management across systems.

- Uses public key encryption to enhance authentication security.
- Combines both symmetric and asymmetric encryption to protect credentials.
- Supports role-based access control, allowing for more granular permission settings.

While SESAME is designed as an improvement to Kerberos, it is still vulnerable to impersonation attacks and password guessing.

## EAP

**EAP (Extensible Authentication Protocol)** is a flexible authentication framework used in network access protocols. It supports multiple authentication methods and is commonly used in wireless networks and point-to-point connections.

- Not an authentication mechanism but a framework supporting various methods.
- Operates at the data link layer, allows for secure exchanges before IP assignment.
- Ensures compatibility between different authentication methods and devices.
- **Authentication**: Simple passwords, Digital Certificates, and PKI
- Commonly used in 802.1X networks for secure authentication.

Examples:

- PKI certificate authentication
- Smart card authentication

### EAP Variants 

All variants are considered cross-platform, except for LEAP. 

- **EAP-MD5**
  - Simple challenge-response method.
  - Provides weak security; no encryption of data.
  - Vulnerable to password-based attacks.
  - Suitable for **basic authentication** needs.
  - If used, ensure to have a long and strong password.
  - One-way authentication process, no mutual authentication.

- **EAP-TLS**
  - Uses PKI with digital certificates for authentication.
  - Digital certificates are installed on both client and server.
  - Provides strong security through **mutual authentication**.
  - Widely regarded as one of the most secure EAP methods.

- **EAP-TTLS**
  - Extends EAP-TLS with additional tunneling.
  - **Only the server needs a certificate,** not on the client.
  - Client uses a password for the authentication, making it less secure.
  - Supports older authentication methods within a secure tunnel.
  - Easier to deploy compared to EAP-TLS.

- **EAP-FAST**
  - FAST (Flexible Authentication via Secure Tunneling)
  - **Uses Protected Access Credentials (PACs), instead of a certificate.**
  - PACs is used to establish mutual authentication between two devices.
  - Designed as an alternative to EAP-TTLS and EAP-PEAP.
  - Suitable for environments where issuing certificates is challenging.

- **PEAP**
  - "Protected EAP", encapsulates **EAP within a secure TLS tunnel.**
  - Only the server requires a certificate.
  - Supports multiple authentication methods within the tunnel.
  - Uses server certs and Microsoft AD Databases for the password.
  - Commonly used due to its balance of security and ease of deployment.

- **EAP-LEAP**
  - Lightweight EAP.
  - Cisco-proprietary protocol.
  - Uses mutual authentication, but could still be vulnerable to dictionary attacks.
  - Mostly deprecated in favor of more secure methods.


## LDAP 

**LDAP (Lightweight Directory Access Protocol)** is a protocol designed for accessing and managing directory information in a network.

- Facilitates sharing of information infrastructure across networks
- Can be used to create a directory of employees and organizational units
- Acts as a central repository for user information
- Stores group memberships and roles, essential for authorization processes

Supports:

- LDAP over SSL
- StartTLS 

Ports: 

- Kerberos uses port 88 
- LDAP uses port 389
- Secure LDAP uses port 636 

:::info[NOTE]

Active Directory uses Kerberos in conjunction with LDAP.

Kerberos handles authentication, while LDAP provides the means to query the information stored in Active Directory.

:::


## IEEE 802.1X

**IEEE 802.1X** is a standard for port-based network access control, ensuring that only authenticated devices can access the network.

- Requires devices to authenticate before accessing the network.
- Authentication is managed through a central RADIUS server.
- Widely used in both wired and wireless networks to enhance security.

For more information, please see [IEEE 802.1X Protocol](/docs/007-Cybersecurity/024-Infrastructure-and-Network/022-IEEE-Standards.md#ieee-8021x)

## RADIUS

**RADIUS (Remote Authentication Dial-In User Service)** is a networking protocol that provides centralized Authentication, Authorization, and Accounting for users who connect and use a network service.

- Centralizes authentication for easier management of user credentials.
- Used to control access to network services in enterprise environments.
- Supports various authentication methods, such as username/password and certificates.

Variations:

- TACACS
- TACACS+
- XTACACS

### Disadvantages 

RADIUS has couple of downsides:

- RADIUS relies on UDP, which has reduced reliability.
- Provides cryptographic protection for the password, but does not encrypt the entire authentication sequence.

### Authentication 

The RADIUS authentication proces:

1. The user connects to an access server
2. The access server prompts the user for their credentials
3. The user enters their credentials
4. The access server forwards those credentials to a RADIUS server. 
5. The RADIUS server accepts or rejects the user connection.

Successful authentication: 

<div class='img-center'>

![](/img/docs/authentication-protocols-radius-sample-diagramsss.png)

</div>

If password is incorrect: 

<div class='img-center'>

![](/img/docs/authentication-protocols-radius-sample-diagramsss-unsuccesful.png)

</div>


### RADIUS Components

In a RADIUS architecture, several key components work together to ensure secure network access:

- **RADIUS Supplicants** 

  - Devices trying to authenticate to RADIUS
  - End-user, application server

- **RADIUS Clients** 

  - Edgepoint devices, not devices authenticating to RADIUS
  - Ethernet switches, WIFI routers, VPN appliances

### How RADIUS works

RADIUS operates by delegating authentication tasks from edge devices to the RADIUS server:

- If edge point device (like a router) is IEEE 802.1x compliant, it will handover the authentication to RADIUS server.
- Note that the router has limited memory, so it's useful to handoff the authentication.
- The router will not be storing the credentials as well.

  <div class='img-center'>

  ![](/img/docs/sec+-radius-diagram-how-it-works.png)

  </div>


## TACACS+

TACACS+ (Terminal Access Controller Access-Control System Plus) is a protocol used for centralizing authentication, authorization, and accounting management for users who access network services. 

- separate access control, accounting, and authentication services.
- Used for managing remote access to routers and switches.
- Centralize management of user credentials and access controls.

TACACS+ is an alternative to RADIUS, since it performas similar functions but with some improvements:

- Uses a reliable TCP connection instead of a less-reliable UDP
- Allows for more detailed control over AAA functions
- Fully encrypts the entire authentication session 

Unlike RADIUS, TACACS+ separates authentication, authorization, and accounting processes which allows for more detailed control. This makes TACACS+ preferred in scenarios that require granular command authorization, especially in network device management. 

However, **RADIUS is more commonly chosen for wireless networks** and remote server access due to its broader application scope.

## Diameter (RADIUS 2.0)

**Diameter** is a modern, more advanced authentication, authorization, and accounting (AAA) protocol designed to replace RADIUS.

- Like RADIUS, but newer, stronger, and more flexible.
- It runs over TCP or SCTP, unlike RADIUS which uses UDP.
- supports encryption, reliability, and better error handling.

RADIUS had limitations (UDP, no built-in encryption, less scalable). Diameter was created to fix these issues and support modern networks—especially telecom and mobile systems. It's uses include:

- 4G / LTE networks
- 5G networks
- Mobile carrier authentication
- Large telecom environments