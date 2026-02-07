---
title: "Working with Issues"
description: "Jira Issues"
tags:
- Scrum
- Agile
- Project Management
- Jira
sidebar_position: 14
last_update:
  date: 1/27/2020
---


> *This notes is based on Atlassian's course on [Jira Fundamentals](https://community.atlassian.com/t5/Training-Certification-articles/Atlassian-University-Series-Jira-Fundamentals/ba-p/2204206)*


## Overview

Issues in Jira represent tasks, bugs, features, or any work item. Each issue contains various fields that help track its progress and details.

- Issue fields - due date, assignee, comments, priority, and attachments
- Access issues by selecting an issue card from the board view


## Common Issue Fields

<div class='img-center'>

![](/img/docs/commonissuefields.png)  

</div>


### Issue Key

Each issue has a unique identifier composed of the project key and a sequential number. This key helps team members locate and refer to specific issues.


<div class='img-center'>

![](/img/docs/issuekey.png)  

</div>


### Issue Summary

A brief title or name of the issue that appears on the issue card, making it easy to recognize.

<div class='img-center'>

![](/img/docs/issuefieldsummary.png)  

</div>


### Attachments and Links

Allows you to add relevant media or links to the issue, enhancing its context and supporting details.

<div class='img-center'>

![](/img/docs/issuefieldattachlinks.png)  

</div>


### Description

Provides a space for detailed information to help explain the issue and its requirements.

<div class='img-center'>

![](/img/docs/issuedescription.png)  

</div>



## Types of Issues 

Jira categorizes issues by size and type to help teams organize work. The issue type defines the category and scope of the task.

<div class='img-center'>

![](/img/docs/defaulttypeofissues.png)  

</div>

- **Epic**

    A large initiative that contains smaller tasks or issues. Used for breaking down significant work.

- **Task**

    The most common type of issue, representing a specific work item. Tasks can stand alone or be part of an epic.

- **Story**

    A user-focused requirement or feature, often written in non-technical language. It’s at the same level as a task.

- **Bug**

    Describes an error or problem, primarily in software development. Bugs can exist on their own or within an epic.

- **Subtask**

    A smaller work item that is part of a task, story, or bug. It cannot exist independently.
    




## How are issue types used?

Teams organize work using different issue types like epics, tasks, stories, bugs, and subtasks to manage varying sizes and categories of work.

<div class='img-center'>

![](/img/docs/useepic.png)  

</div>

<div class='img-center'>

![](/img/docs/usetasks.png)  

</div>

<div class='img-center'>

![](/img/docs/usebug.png)  

</div>

<div class='img-center'>

![](/img/docs/usesubtasks.png)  

</div>



## Update Issues

When working on an issue, you’ll often update the **status** and **comments** fields depending on your team’s setup. These fields help track progress and communicate effectively.

### Update Status

Change the issue status to reflect work progress, such as moving it from "To Do" to "In Progress." There are two ways to update the status:

- On the board view, drag and drop the issue into a different column
- In the issue detail view, click status dropdown and select new status

### Add Comments

Use comments to ask questions, share updates, or seek feedback. You can also mention teammates with @mentions to bring attention to important details or use emoji reactions like 👍 or 🔥 to engage with the discussion.


### How often should you update issues?

Update your issues daily to keep your team informed. Email notifications remind you when someone mentions you or updates an issue.


## Create New Issues

Use the **Create** button in the main navigation bar. Fill in the project, issue type, summary, and optionally a description for context. Your new issue will appear in the backlog. 

<div class='img-center'>

![](/img/docs/createnewissue1.png)  

</div>

Explore the backlog for newly created issues and update progress as needed.


### Issue Fields

To create an issue, start by entering the required fields. Optionally, add a description for more context. Once done, hit "Create."

1. Project - Defines which project the issue belongs to
2. Issue Type - Specifies if it’s an epic, story, task, bug, or subtask
3. Summary - Short, descriptive title
4. Description - Additional details (optional)
5. Create - Final step to submit

<div class='img-center'>

![](/img/docs/createissuefillupfields.png)  

</div>


### Where Did the Issue Go?

After creating, check the backlog for your new issue. The backlog contains all issues that haven't been started yet. 

<div class='img-center'>

![](/img/docs/backlog.png)  

</div>


Ready to update an issue yourself?

<div class='img-center'>

![](/img/docs/updateissueready.png)  

</div>


## Backlog and Roadmap

- **Backlog**

  - Lists issues that haven’t started yet.
  - Access it from the project sidebar.
  - Some teams show the backlog as a column on the board.

- **Roadmap**

  - Displays issues on a timeline to show start, end, and overlaps.
  - Useful for mapping dependencies and planning.
  - Access it from the sidebar or under "Plans" in the navigation bar.

> Note: If you don’t see these views, check with your Jira admin.


<div class='img-center'>

![](/img/docs/backlogsroadmaps.png)  

</div>



## Search for Issues


### Search Bar 

Located at the top right of the screen, the search bar displays recent issues, boards, and projects.

- Suggests matches as you type.
- Searches within descriptions and comments.

<div class='img-center'>

![](/img/docs/seachbarbasicsearch.png)  

</div>



### Basic Search

Try basic search if the search bar didn't work for you. In basic search, you can filter and sort issues by specific criteria.

<div class='img-center'>

![](/img/docs/bsaicsearch1.png)  

</div>

<div class='img-center'>

![](/img/docs/basicsearch2.png)  

</div>

<div class='img-center'>

![](/img/docs/basicsearch3.png)  

</div>

<div class='img-center'>

![](/img/docs/basicsearch4.png)  

</div>


### JQL (Jira Query Language)

If basic search doesn’t work, try JQL for advanced searches. Learn more about JQL [here](https://support.atlassian.com/jira-software-cloud/docs/what-is-advanced-searching-in-jira-cloud/).
