---
title: "Infrastructure Security"
description: "Securing your AWS Infrastructure"
tags: [Cloud, AWS, Cloud, DevOps, Security, Certifications]
sidebar_position: 30
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::


## EC2 Keypairs 

Keypairs are used to interact with EC2 instances without entering any username or passwords. 

- [Amazon EC2 key pairs and Linux instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html)
- [Create key pairs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html)

To connect to the EC2 instance using the generated/downloaded keypair:

```bash
ssh -i keyfile.pem ec2-user@10.1.2.3 
```

### Change permissions

When you first generate a keypair in the AWS console and download it locally, the default permissions of the keypair is **777**. When you use it to connect to the EC2 instance for the first time, you'll get prompted with an error:

```bash
WARNING: UNPROTECTED KEY FILE! 
```
To change the permissions, use the command below. **400** permissions means only the owner can use it. 

```bash
sudo chmod 400 keyfile.pem 
```

### Generating keypair locally

We can also generate a keypair from any Linux machine using the command below.

```bash
ssh-keygen -t rsa -n 4096 
```

This will generate a key pair:

- Private key (only you should have it)
- Public key (can be shared with anyone)

We can then import the public key onto the EC2 menu. 

To learn more, see:

- [Import the public key to Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html#how-to-generate-your-own-key-and-import-it-to-aws)
- [man ssh-keygen.](https://man7.org/linux/man-pages/man1/ssh-keygen.1.html)

### Invalidate the key

When you delete the keypair in the EC2 menu, it will only prevent any future usage of that key. However if you have existing instances that use that keypair, the keypair can still be used to connect to those instance.

To fully revoke the keypair, login to any machines that are using the keypair and delete the key from the machine:

```bash
sudo vi ~/.ssh/authorized_keys  
```

## Hypervisors and Dedicated Instances

### Hypervisors

This is the engine that sits on top of physical machines which allows us to run virtual machines on top of the machines.

- Xen is the hypervisor used by most instance types.
- Newest types uses KVM.
- Guest OS run as either of the two:
    - Paravirtualization (PV)
    - Hardware Virtual Machine (HVM) - **recommended**

### Isolations 

The hypervsor can only be accessed by AWS administrators when there is a valid business case.

- Access is heavily scrutinized, logged, audited, and revoked afterwards.
- In this setup, there is full control over virtual machines. 
- AWS does not have access to the virtual machines.
- When VM is terminated, guest memory is scrubbed. 

### Dedicated Hosts vs. Dedicated Instances 

A dedicated instance may or may not share the physical host with shared instances, from the same AWS account. 

- Gives you dedicated hardware, but shared instances can still run in same host.
- Shared instances can still be deployed in the same underlying hardware. 
- Billing is per instance.

A dedicated host gives you control about instance placement in that physical host.

- Gives you dedicated hardware.
- Visibility over CPU cores, sockers, etc.
- Billing is per host.

  ![](/img/docs/dedicatedhosts-vs-dedicated-instances.png)

## AWS Systems Manager (SSM)

This allows you to centralize operational data from multiple AWS services and automate tasks across your AWS resources.

- Insights 
- Compliance
- Inventory
- Automation 

### Parameter Store 

We can use Parameter Store to store and retrieve any parameter, such as usernames, passwords, and API keys.

- Can be in plain text or encrypted (SecureString)
- Maximum size per parameter is 4KB (standard)
- Maximum size for advanced is 8KB 
- No additional cost since integrated with AWS SSM
- Nuilt-in integration with different services

### Run Command 

This automation tool allows us to run a command in a given group of systems (manual or tag-based selection).

- SSM agent needs to be installed in the EC2 Instances
- Can be used with on-premise servers
- Commands can be issued through: 
    - AWS console
    - AWS CLI 
    - AWS SDKs
 
## AWS VPC 

Amazon Virtual Private Cloud (Amazon VPC) enables you to launch AWS resources into a virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center, with the benefits of using the scalable infrastructure of AWS.

- A VPC can only be associated with one single AWS region 
- This means its is a regional-scope resource 
- You can have more than 1 VPC per region 
- Can have one or more subnets (either public or private)
- A subnet is availability zone-scope within the same VPC region

![](/img/docs/awsvpcdiagramscope.png)


### NACLs vs. Security Groups 

Network ACLs (NACLs) is applied into the entire subnet which serves as some sort of a firewall for the subnet.

- Define incoming and outgoing connectivity

Security groups are applied on the specific instance.

- Allowing connections via ports

### VPC Connectivity Options 

To enable internet connectivity:

- NAT Instance or NAT Gateway (connections within VPC)
- VPN or Direct Connect (connections to on-premise DC)

A few notes on NAT Instances:

- Disable instance source/destination checks before using. 
- Must be in a public subnet.
- Requires a route from private subnet to the NAT instance.
- Amount of traffic depends on the instance type.

See [Comparison of NAT Gateway and NAT Instances.](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-comparison.html)

### VPN vs. Direct Connect

VPN Gateway:

- Connectivity is established via VPN tunnel, on top of the internet. 
- Use multiple parallel VPN tunnels for fault tolerance and HA.
- Cheaper than Direct Connect. 

Direct Connect 

- Dedicated connectivity is established via a partner.
- Use-case: consistent network performance and increased BW throughput. 
- More expensive than VPN Gateway.

See [AWS Direct Connect + VPN.](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-vpn.html)

![](/img/docs/vpnvsdirectconnectaws.png)


## AWS Marketplace Security Products

There are some capabilities that AWS does not offer as a feature, but is available through third-party vendors. These capabilities include:

- IDS/Network Packet Inspection 
- Penetration Testing

AWS does not provide network packet inspection, but we can utilize:

- VPC Flow Logs
- WAF Shield 
- EC3 with IPTables

Recommended wat is to use third-party solution such as:

- Trend Micro
- Alertlogic 

For penetration testing, this is allowed **for some AWS services without prior approval.** See [AWS Penetration Testing.](https://aws.amazon.com/security/penetration-testing/) 
