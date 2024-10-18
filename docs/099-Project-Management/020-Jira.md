---
title: "Jira"
description: "Atlassian Jira"
tags: [Scrum, Agile, Project Management, Jira]
sidebar_position: 20
last_update:
  date: 6/13/2020
---



> *This notes is based on Atlassian's course on [Jira Fundamentals](https://community.atlassian.com/t5/Training-Certification-articles/Atlassian-University-Series-Jira-Fundamentals/ba-p/2204206)*


## Overview

Jira offers several products for different types of team management:

- Jira Software
- Jira Work Management
- Jira Service Management
- Jira Align

This guide focuses on **Jira Software**.

![](/img/docs/jira-software-landing-pageeee.png)



### What is Jira Software?

Jira Software helps teams manage and track work, acting like a team-wide to-do list for better organization and timely delivery.

- **Transparency:** Everyone can see work progress.
- **Efficiency:** Teams can plan and track start and end dates.
- **Collaboration:** Keeps team discussions and comments well-organized.


### Jira Work Management

Jira Work Management is designed to help teams manage business projects and processes efficiently.

- Tailored for non-technical teams like marketing and finance
- Simplifies tracking, approvals, and reporting across teams


<div class='img-center'>

![](/img/docs/jira-work-management-sample-pageee.png)

</div>


### Jira Service Management


Jira Service Management is used for IT and customer service teams to manage requests and incidents.

- Streamlines support requests and incident handling
- Integrates with ITSM workflows for better support 


<div class='img-center'>

![](/img/docs/jira-service-management-sample-pageee.png)

</div>


### Jira Align

Jira Align connects business strategy to technical execution, aligning teams and projects.

- Helps scale Agile practices across teams
- Tracking of project progress and alignment with goals


<div class='img-center'>

![](/img/docs/jira-align-sample-pageee.png)

</div>



## Jira Roles

Jira has two primary roles:

<div class='img-center'>

![](/img/docs/jirausersadminswhattheydo.png)  

</div>


#### As a User

Your main responsibility is to update work items (called "issues") daily. Issues track progress, questions, and notes.

- Update issues when work is completed.
- Use issues to ask questions or add notes.
- Regularly update issues to reflect progress.

Issues may vary in size—some may take hours, others months. Each issue has an assigned person responsible for updating it.


## Working in Jira

<div class='img-center'>

![](/img/docs/jiratour.png)  

</div>

## Jira Project

A project in Jira is a collection of issues that helps organize work. Every issue belongs to a project, which is named based on how your team structures its work.

- Project name is visible under the Jira logo.
- View all projects via the 'Projects' dropdown in the navigation bar.

<div class='img-center'>

![](/img/docs/jiraprojectview1.png)

</div>



### Project Names

Project names give insight into how work is organized in Jira.

- Projects can be named after teams or specific deliverables.
- Helps identify how work is structured within Jira.

<div class='img-center'>

![](/img/docs/jiraprojectnaming.png)

</div>

### Projects Types 

There are two main types of Jira projects:

- **Team-managed projects**: for smaller teams controlling their own processes.
- **Company-managed projects**: standardized for larger teams, managed by Jira admins.


These types determine how workflows and team management are handled in Jira.

<div class='img-center'>

![](/img/docs/openjiraproject.png)

</div>






## Boards 

Boards visually track work progress with columns for statuses like "To Do" and "Done."

- **Workflow:** Issues move through stages (e.g., `To Do → Done`).
- **Moving Issues:** Drag issue cards across columns to update progress.

### Moving Issue Cards

These board columns have headers at the top representing the  status  of each issue. For example, statuses could be: 

- To Do
- In Progress
- In Review
- Done

Issues can move forward and backward in a workflow, depending on how the work gets done.


### Board Names

Boards are part of projects and named after teams or deliverables.

- Boards exist within projects and may have multiple boards.
- Board names focus on teams or deliverables.

<div class='img-center'>

![](/img/docs/howareboardsnamed.png)  

</div>


### Board Views

To view all your boards, use the left project sidebar and select the board dropdown. Projects can have multiple boards, often named after deliverables.

<div class='img-center'>

![](/img/docs/howtoseeyourboards.png)  

</div>



### Board Types

Boards help organize work.

- **Kanban:** Continuous workflow without fixed deadlines.
- **Scrum:** Work done in sprints, ideal for agile teams.

## Agile and Scrum

**Agile** is a project management methodology focusing on iterative development, continuous releases, and regular updates based on feedback.

- Increases delivery speed and collaboration
- Helps teams adapt to market changes

**Scrum** is an agile framework, primarily used by software teams, organizing work into short, focused periods called sprints.

- Focuses on completing a batch of issues within a sprint
- Emphasizes team collaboration and incremental progress

## Jira Navigation 


### Getting Around in Jira

To navigate Jira, use these two key bars:

- **Main navigation bar** at the top for accessing work, projects, etc.
- **Project sidebar** on the left for project-specific options.

These tools help you quickly find and manage your tasks and projects.

<div class='img-center'>

![](/img/docs/getaroundjira2.png)  

</div>

<div class='img-center'>

![](/img/docs/getaroundjira3.png)  

</div>




### Main Navigation Bar

<div class='img-center'>

![](/img/docs/jira-getting-around-main-navigation-barrr.png)

</div>


1. **Product switcher:** Allows you to switch to other Atlassian products your team may be using, like Confluence or Bitbucket.

2. **Your work:** Shows issues, projects, and boards you’ve recently visited. And allows you to view all work assigned to you.

3. **Projects:** Shows a list of all of your projects. And includes a button to create new projects.

4. **Filters and Dashboards:** View any saved or starred filters and dashboards to see your work. You'll learn more about filters and dashboards in future courses.

5. **People:** Shows a list of the people and teams you interact with most.

6. **Plans, Insight, and Apps:** Allows you to manage your plans and see apps installed on your Jira instance (for premium users only).

7. **Create:** A quick way to create new issues.

8. **Search:** Open text search field to help you find issues, projects, boards, queues, filters, and people.

9. **Settings and Profile**: Customize your personal settings, set up your profile, and control email notifications.

### Starred items

You may notice some items with stars beside them. In Jira, you can  star  your most important projects, boards, and filters so you can easily find them later. 

Specifically in the 'Your work' and 'Projects' dropdowns, Jira organizes your starred items and shows them first. You can reorder your starred items by going to Your work > Starred.

<div class='img-center'>

![](/img/docs/staritems.png)  

</div>


### Project Sidebar

<div class='img-center'>

![](/img/docs/projsidebar.png)  

</div>


1. **Project name:** Shows the current project you are in.

2. **Board switcher:** Select this dropdown to switch between different boards in this project.

3. **Backlog:** Shows a list of issues that have not yet been started. Depending on your settings, the backlog may also contain some issues currently on the board.

4. **Board view:** Brings you to a view of the selected board.

5. **Reports:** Shows you all the available reports you can create. You'll learn more about reports in future courses.

6. **Lower menu options:** The 'Issues' button shows you all issues in the project. The 'Components, Releases, and Project pages' buttons are more advanced features of Jira. Check with your Jira admin if you need to learn about these.

7. **Project settings:** You may not be able to see this option. It is mostly used by Jira admins and project managers to edit project details, update permissions, and create workflows.

8. **Project type indicator:** Jira projects can be created as either team-managed or company-managed. The core functionality of these project types is the same, but you may find a few differences based on your project type.

