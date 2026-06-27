---
title: "Templates, Plugins, Execution, and Vault"
description: "Templates, Plugins, Execution, and Vault"
tags: 
- DevOps
- Infrastructure as Code
- Ansible
sidebar_position: 50
last_update:
  date: 1/6/2021
---

## Tags

![](/img/docs/accftags.png)

This is another way to break down our playbook and specify only the tasks that we want to run. By attaching tags to each task, we can refer to the tags when we ran the playbook.

In the example above, we can tell Ansible to run just the tasks tagged with **create** using the `--tags`.

On the other hand, we could do the opposite by using the `--skip-tags`. This will run everything except those that has the tags specified.


## Prompts

![](/img/docs/accfprompts.png)


## Jinja2 Templates

![](/img/docs/plansjinja1.png)
![](/img/docs/plansjinja2.png)

### template module
![](/img/docs/plansjinja3.png)

### ansible_facts
![](/img/docs/plansjinja4.png)

### Sample Jinja2 Templates 
![](/img/docs/plansjinja5.png)
![](/img/docs/plansjinja6.png)

### for-loop
![](/img/docs/plansjinja7.png)

### conditionals
![](/img/docs/plansjinja8.png)

### filters 

![](/img/docs/kkfilter1.png)
![](/img/docs/plansjinjafilter1.png)
![](/img/docs/plansjinjafilter2.png)
![](/img/docs/plansjinjafilter3.png)
![](/img/docs/plansjinjafilter4.png)
![](/img/docs/plansjinjafilter5.png)
![](/img/docs/plansjinjafilter6.png)

### filters: list and set

![](/img/docs/kkfilter2.png)

### filters: file

![](/img/docs/kkfilter3.png)


## Templating External Data with Lookup Plugins

We can list out different plugins available to us.
In the example below, we're listing connection-type plugins.
```bash
$ ansible-doc -t connection -l
$ ansible-doc --type connection --list
```

![](/img/docs/whpjugins.png)


![](/img/docs/planslookup1.png)

### Lookup and Query 

![](/img/docs/plansquery2.png)

### File Lookups

![](/img/docs/kkfilelookup.png)
![](/img/docs/plansfilelookup1.png)
![](/img/docs/plansfilelookup2.png)
![](/img/docs/plansfilelookup3.png)
![](/img/docs/plansfilelookup4.png)
![](/img/docs/plansfilelookup5.png)

### Plugins

![](/img/docs/kkplugins.png)


## Strategy and Forks

From the [official Ansible Documentation:](https://docs.ansible.com/ansible/2.5/user_guide/playbooks_strategies.html)

> **Strategies** are a way to control play execution. By default, plays run with a linear strategy, in which all hosts will run each task before any host starts the next task, using the number of **forks** (default 5) to parallelize.

Available strategies:
| Strategy | Description |
| --- | --- |
| linear | Connects to multiple servers in parallel |
| free | Connections are independent from each other |
| serial | Define 'x' at a time, or in a batch |


### Setting the Fork

The number of forks or the number of simultaneous connections with different nodes that Ansible can establish. In layman's term, how many nodes can Ansible can talk to at a time.

This can be set in the **ansible.cfg**.

```bash
[defaults]
forks = 30 
```

You can read more about strategies and forks [here.](https://docs.ansible.com/ansible/latest/user_guide/playbooks_strategies.html)


## Asynchronous Actions: Async and Poll

![](/img/docs/kkasyncactions.png)

We can use **async** directive to tell Ansible that the task is async task, which means it can be run and then just check again later.

![](/img/docs/kkasyncpoll.png)

By default, Ansible checks every 10 seconods. To change how frequent Ansible checks, set the **poll** directive.

If we want for Ansible to proceed with the next task without waiting for the first task to finish, set **poll=0**.

![](/img/docs/kkpoll0.png)

Since Ansible won't be waiting for any task to finish, we must ensure that the result of the tasks is **registered** to a variable so that they can be consolidated and used at the end of the play.

![](/img/docs/kkpollasync10.png)

**Note:** Not all modules support async.


## Ansible Vault

![](/img/docs/accfansivault.png)

![](/img/docs/plansvault.png)
![](/img/docs/plansvault2.png)
![](/img/docs/plansvault3.png)
![](/img/docs/plansvault4.png)
![](/img/docs/plansvult5.png)
![](/img/docs/plansvault5.png)
