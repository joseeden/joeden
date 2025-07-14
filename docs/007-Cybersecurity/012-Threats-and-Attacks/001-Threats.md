---
title: "Threats"
tags: 
- Security
- Cybersecurity
sidebar_position: 1
last_update:
  date: 1/30/2024
---



## Malware

Malicious software designed to harm or exploit systems. Some examples are viruses, worms, trojans.

For more information, please see [Malware](/docs/007-Cybersecurity/012-Threats-and-Attacks/020-Malware.md)

## Virus 

A virus **requires user interaction**, such as opening an infected file or running a malicious program, to spread. They require a "host" application that they embed themselves in and they cannot replicate on their own. Some common types of viruses:

- **Master Boot Record Viruses**

    - Infects the master boot record (MBR) of a hard drive, making them particularly dangerous.
    - Stored in the first sector of the hard drive and loaded into memory during boot-up.
    - Infects the MBR and spreads when the system boots from an infected disk.
    - Hard to detect because they're installed before the operating system boots.

- **Macro Viruses**

    - Exploit document-embedded code.
    - Often found in word processing and spreadsheet applications.
    - Infects when files with macros are opened.
    - Macros are not malicious by default; they're designed to automate functions in documents.

- **File Infector Viruses**

    - Infects executable files (.exe, .com, .dll, etc.).
    - Spreads when infected programs are launched or accessed.
    - Can overwrite, corrupt, or modify files, leading to system damage or data loss.

- **Service Injection Viruses**

    - Injects itself into legitimate system processes, like those that run in the background.
    - Avoids detection by antivirus tools by blending with normal system activity.
    - Can persist through reboots and continue spreading without being easily identified.

- **Multipartite Viruses**

    - Uses more than one propagation technique.
    - Combines boot sector and file infections.
    - Spreads every time the computer boots or a specific program runs.
    - Mitigation: Run comprehensive antivirus scans that check both boot sectors and files.

- **Encrypted Viruses**

    - Encrypt themselves to avoid detection.
    - Malware is scrambled into unreadable cipher text.
    - Mitigation: Employ security tools that focus on encrypted threats.

- **Polymorphic Viruses**

    - Encrypts itself and alters its decryption module each time it infects a new system.
    - Continuously changes to avoid detection.
    - Mitigation: Employ heuristic-based detection systems.

- **Metamorphic Viruses**

    - Rewrites its own code with each infection.
    - Appears entirely different with each infection, making detection extremely hard.
    - Mitigation: Utilize advanced heuristic and behavior-based antivirus systems.

- **Stealth Viruses**

    - Hides by modifying system calls and antivirus queries.
    - Prevents detection by security tools.
    - Mitigation: Use antivirus solutions with rootkit detection capabilities.

- **Armor Viruses**

    - Confuses attempts to analyze or remove the virus.
    - Uses layered protections to evade security tools.
    - Mitigation: Ensure frequent updates to antivirus tools.

- **Hoaxes**

    - A form of social engineering, not a real virus.
    - Designed to trick users into spreading misinformation or purchasing unnecessary software.
    - Mitigation: Educate users to verify suspicious messages or alerts.


## Worm

A worm can replicate and spread automatically **without user intervention**.

- No "host" application needed, nor human interaction. 
- Takes advantage of vulnerabilities in systems and applications.
- Dangerous, can infect computers and computing assets. 
- Cause disruptions because they constantly try to replicate and spread.
- Consumes network, compute resources, power when it spread, slowing down the system.

Known examples:

- The Internet worm
- Code Red worm
- Nimda
- Stuxnet

## Trojan

Trojan Horses is a computer program that appears to have a useful function, but also has a hidden and potentially malicious function. It can also create backdoors but are only active while a specific application is running.

- Malware disguised as a piece of harmless or desirable software. 
- Not as effective as a rootkit (has root-level access while concealing activity)
- Examples: fake antivirus, games, and utilities/productivity tools.

**Mitigation:**

- Use an AV or Anti-malware prior to opening or installing any program.
- Ensure your system is patched against any vulnerabilities.

:::info 

A **RAT (Remote Access Trojan)** is a widely used threat because it provides the attacker with remote control of the machine.

For more information, please see [Remote Access Trojan](/docs/007-Cybersecurity/012-Threats-and-Attacks/020-Malware.md#remote-access-trojan-rat)

:::

## Ransomware

Malware that encrypts files, demanding payment for their release.                               

- Blocks access to computer or its data until the ransom is paid.
- For more information, please see [Ransomware](/docs/007-Cybersecurity/012-Threats-and-Attacks/020-Malware.md#ransomware)

**Mitigation:**

- Conduct regular backups.
- Install regular software updates. 
- Provide security awareness training.
- Implementing MFA for the systems.

## Zombies and Botnets 

- **Botnet**

    - A network of compromised computers, known as **zombies** or **bots**.
    - Remotely controlled by malicious actors.
    - Created using other types of malwares to gain access to a system and victimize it. 
    - Zombies are used to perform tasks using remote commands.

- **Command and Control Node (C2 Node)** 

    - Used for managing and coordinating the activities of the zombies. 
    - Can use zombies as pivot points to gain access to new victims.
    - Can use a zombie to make it look like the infected computer is performing the attach.
    - It can also store illegal media on the infected machines inside of the botnet.
    - Commonly used to perform a DDoS attack.

## Rootkits

A rootkit tries to maintain root-level access while concealing malicious activity. 

- Creates a backdoor and attempts to remain active and undetected
- Digs into the OS deeply, making it difficult for AV systems to detect it.

For more information, please see [Rootkits.](/docs/007-Cybersecurity/013-List-of-Attacks/014-Execution-and-Escalation.md#rootkits)


## DLL Injection

DLL injection is a technique used to run malicious code within another process by forcing it to load a dynamic-link library (DLL).

- Runs arbitrary code within the address space of another process.
- Forces the target process to load a specific DLL.
- DLLs are often part of the default Windows OS environment.
- Uses a shim to load the DLL automatically every time the Windows machine starts.

## Shim

A shim is a small piece of software that sits between two components to alter their interaction.

- Placed between two software components.
- Intercepts calls between the components and redirects them as needed.

## Backdoors and Logic Bombs 

- **Backdoors**

    - Allow unauthorized access by bypassing regular security measures.
    - Originally created for maintenance or repair purposes.
    - Example: Remote Access Trojan (RAT) allows remote control of infected systems.

- **Easter Eggs**

    - An insecure coding practice often meant as a harmless joke or "gift" to users.
    - Related to logic bombs, but typically non-malicious.
    - Example: Typing "do a barrel roll" in Google's search bar triggers a visual effect.


- **Logic Bombs**

    - Executes harmful functions when triggered by certain events.
    - Typically inserted by insiders with malicious intent, such as disgruntled employees.
    - Not installed directly by malware but hidden within existing code.

## Keylogger

A piece of a software or hardware that records every single keystroke made on the device. 

- Originally created by system administrators to help in troubleshooting.
- Recorded key strokes are sent back to the threat actor without the user's consent.
- For more information, please see [Keylogger](/docs/007-Cybersecurity/012-Threats-and-Attacks/020-Malware.md#keylogger)


**Mitigation:**

- Perform regular updates and patches.
- Use quality AV and Anti-malware solutions.
- Conduct Phishing awareness training for end users.
- Implement MFA.
- Encrypt keystrokes being sent to the systems.
- Perform physical checks on desktops, laptops, and servers.

## Spyware and Bloatware

**Spyware** and **bloatware** are both unwanted software which serve different purposes.

- **Spyware** – Software that secretly collects user data such as browsing habits.
- **Bloatware** – Pre-installed or unnecessary software that slows down the system.

For more information, please see [Malware](/docs/007-Cybersecurity/012-Threats-and-Attacks/020-Malware.md#spyware).


**Mitigation:**

- Use reputable antivirus or anti-malware tools
- Uninstall unused or unnecessary programs
- AApply system updates and security patches