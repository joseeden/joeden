---
title: "One-way and Mutual SSL"
description: "Authenticating client and server communication"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 60
last_update:
  date: 7/7/2022
---



## One-way SSL

One-way SSL (single-sided authentication) secures communication by having the client authenticate the server. The server provides an SSL certificate, which the client verifies.

- Client authenticates server using SSL certificate.
- Server does not authenticate the client.
- Secure communication where server identity is verified.
- Commonly applied in web servers and APIs.

### How It Works

In a one-way SSL setup:

1. The client connects to the server.
2. The server sends its SSL certificate.
3. The client verifies the certificate’s validity.
4. The client and server establish an encrypted communication.

### Sample Scenario

In this scenario, a web server is configured with an SSL certificate. The client (web browser) connects to the server via HTTPS, and the server presents its SSL certificate during the handshake.

Nginx configuration example (nginx.conf):

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /path/to/server.crt;
    ssl_certificate_key /path/to/server.key;

    # Other SSL/TLS configurations...

    location / {
        # Your application settings...
    }
}
```

Here, the server presents its SSL certificate for authentication, enabling one-way SSL where only the server is authenticated. The client does not need to present a certificate.

For mutual authentication, both the client and server would authenticate each other, requiring additional configuration.


### Use Cases

In server-only SSL, the server needs to authenticate itself to clients but does not require clients to present certificates for authentication. Here are some use cases for one-way SSL:

- **Web Server Authentication**  
  - Secures web servers for client connections over HTTPS  
  - Example: Websites or web applications requiring secure server authentication

- **APIs and Microservices**  
  - Protects communication between clients and API servers  
  - Example: RESTful APIs ensuring secure client-server interactions

- **Public-Facing Services**  
  - Secures client communication with services like CDNs  
  - Example: Content delivery networks (CDNs) serving static content securely

- **IoT Devices**  
  - Ensures secure communication for IoT devices connecting to central servers  
  - Example: IoT devices sending data to cloud servers over a secure connection

- **Intranet Applications**  
  - Protects communication within an organization  
  - Example: Intranet portals accessed by employees over HTTPS

- **Authentication Services**  
  - Secures authentication with services like LDAP or Active Directory  
  - Example: LDAP servers providing secure user authentication

- **Data Transfer Services**  
  - Safeguards file transfer services like FTP or FTPS  
  - Example: FTP servers allowing secure file uploads and downloads

- **Public Wi-Fi**  
  - Protects communication between users and Wi-Fi access points  
  - Example: Public Wi-Fi services in airports or cafes securing client connections



## Mutual SSL

Mutual SSL (Two-Way SSL) is a protocol where both the client and server authenticate each other using certificates, ensuring secure communication.

- Both parties authenticate using certificates.
- Enhances security and trust in communication

<div class='img-center'>

![](/img/docs/mutual-ssl-setup.png)

</div>

### Mutual SSL Handshake Process

1. **Client Hello**
   
   The client initiates the SSL/TLS handshake by sending a "Client Hello" message to the server, indicating its intent to establish a secure connection.

2. **Server Hello**
   
   The server responds with a "Server Hello" message, indicating its willingness to establish a secure connection.

3. **Server Certificate**
   
   The server sends its digital certificate to the client. This certificate contains the server's public key and is signed by a trusted Certificate Authority (CA).

4. **Client Certificate Request**
   
   The server requests the client to provide its digital certificate.

5. **Client Certificate**
   
   The client sends its digital certificate to the server. This certificate contains the client's public key and is also signed by a trusted CA.

6. **Key Exchange and Finished:**
   
   The client and server exchange key information and complete the SSL handshake. Subsequent communication is encrypted using the exchanged keys.

### Sample Scenario

In a mutual SSL setup, a web server requires client authentication through certificates.

Nginx configuration example (`nginx.conf`):

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /path/to/server.crt;
    ssl_certificate_key /path/to/server.key;

    ssl_client_certificate /path/to/ca.crt;
    ssl_verify_client on;

    # Other SSL/TLS settings...

    location / {
        # Application settings...
    }
}
```

Where:

- `ssl_client_certificate`: Specifies the CA certificate for verifying the client's certificate.
- `ssl_verify_client on;`: Enables client certificate verification.

### Use Cases

Mutual SSL ensures trust with certificates from both parties. Key use cases include:

- **Secure APIs**  

   - Both client and server authenticate.
   - Protects sensitive API communication.

- **Financial Transactions**  

   - Secure connections between institutions and clients.
   - Ensures data integrity during transactions.

- **Employee Access**  

   - Secures communication in internal applications.
   - Verifies employee identity for access.


## Pod-to-Pod Encryption with mTLS

Using mutual TLS (mTLS) for pod-to-pod encryption in Kubernetes ensures secure communication by requiring both client and server pods to authenticate using TLS certificates.

<div class='img-center'>

![](/img/docs/pod-to-pod-encryption-using-mtls.png)

</div>

### Steps to Implement mTLS

1. **Generate TLS Certificates**  

   - Create TLS certificates for both server and client pods.
   - Tools like OpenSSL or a certificate manager can be used.

2. **Create Kubernetes Secrets**  

   - Store the TLS certificates in Kubernetes secrets.
   - Example:  
     ```bash
     kubectl create secret tls server-tls-secret --cert=path/to/server.crt --key=path/to/server.key
     kubectl create secret tls client-tls-secret --cert=path/to/client.crt --key=path/to/client.key
     ```

3. **Update Pod Configurations**  

   - Modify pod specs to include secrets for certificates.
   - Example:  
     ```yaml
     volumes:
       - name: server-certificate
         secret:
           secretName: server-tls-secret
       - name: client-certificate
         secret:
           secretName: client-tls-secret
     ```

5. **Configure Applications**  

   - Ensure apps inside pods use certificates for mutual authentication.
   - Configure them to reference mounted certificates.

7. **Network Policies**  

   - Use Kubernetes Network Policies
   - Restrict which pods can communicate over mTLS.

9. **Test the Setup**  
   
   - Confirm mutual authentication between pods using the certificates.

### Important Considerations

Ensure secure mTLS implementation by following these guidelines:

- Ensure all CAs are trusted by both client and server.
- Rotate certificates periodically for enhanced security.
- Use RBAC to control access to secrets.
- Monitor traffic for security incidents.

For advanced features, consider using Kubernetes Ingress controllers or service meshes.



## Third-Party Encryption

Instead of relying on applications for encryption, third-party tools like **Istio** and **Linkerd** can handle mTLS encryption between pods. These tools provide secure service-to-service communication without depending on the applications.

<div class='img-center'>

![](/img/docs/third-party-encryptions-using-istio-and-linkerd.png)

</div>

Besides encryption, they offer additional features to connect services in a microservice architecture.




