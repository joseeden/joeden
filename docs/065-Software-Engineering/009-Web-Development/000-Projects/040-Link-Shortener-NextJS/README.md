---
title: "Link Shortener using NextJS"
description: "Link Shortener with NextJS and Clerk Authentication"
tags: 
- Computer Science
- Application Development
- Web Development
- HTML
- CSS
- JavaScript
- NextJS
- React
sidebar_position: 5
# last_update:
#   date: 4/23/2019
---

## Overview 

This project is a full-stack Link Shortener application designed to demonstrate how a modern web app is built using multiple architectural layers, including frontend, backend, authentication, and database integration.

The goal is not just to build a simple URL shortener, but to simulate a real-world system where:

- Users authenticate securely
- Data is stored and managed in a database
- Backend logic processes requests
- Frontend provides a clean user experience

The project also demonstrates advanced workflows using GitHub Copilot, including:

- MCP (Model Context Protocol) for database interaction
- Custom agents for code and documentation generation
- Structured multi-layer architecture

## Architecture and Stack

The application is built entirely using Next.js as a full-stack framework, meaning both frontend and backend logic live in the same project.

Key technologies:

| Component                | Purpose                                             |
| ------------------------ | --------------------------------------------------- |
| Next.js                  | Frontend + backend (server actions, route handlers) |
| shadcn UI + Tailwind CSS | All UI components                                   |
| Clerk                    | Authentication (login, signup, session handling)    |
| Neon (Postgres)          | Cloud-hosted database                               |
| Drizzle ORM              | Database interaction (no raw SQL)                   |
| Zod                      | Validation                                          |

Important constraints enforced in this project:

- No raw SQL queries → only Drizzle ORM
- No custom-built UI → only shadcn components
- No alternative auth → Clerk only

This ensures consistency and makes Copilot-generated code more reliable.

## Project Initialization

We start by scaffolding a Next.js application using the official CLI with recommended defaults.

```bash
npx create-next-app@latest linkshortener
```

When prompted, choose the default options.

```bash
? Would you like to use the recommended Next.js defaults? › - Use arrow-keys. Return to submit.
❯   Yes, use recommended defaults 
```

If successful:

```bash
Generating route types...
✓ Types generated successfully

Initialized a git repository.

Success! Created linkshortener at /mnt/c/Git/3-Repos/linkshortener
```

Navigate into the project and open it in VS Code:

```bash
cd linkshortener/
code .
```


If you get this error: 

```bash
You are using Node.js 18.20.5. For Next.js, Node.js version ">=20.9.0" is required. 
```
The project was actually created successfully, but the scaffolding failed during the type generation step.

See [Troubleshooting](#troubleshooting) section.


## UI Setup (shadcn + Tailwind)

Instead of building UI from scratch, the project uses **shadcn UI**, which provides prebuilt, composable components styled with Tailwind.

Initialize it with:

```bash
npx shadcn@latest init -t next 
```

Example output:

```bash
✔ Select a component library › Radix
✔ Which preset would you like to use? › Nova
✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS. Found v4.
✔ Created 2 files:
  - components/ui/button.tsx
  - lib/utils.ts
```

This sets up your UI foundation and ensures consistent design across the app.



## Authentication Setup (Clerk)

Authentication is handled entirely by Clerk. This removes the need to build login systems manually and ensures secure session handling.

Sign up here: [https://dashboard.clerk.com/sign-up](https://dashboard.clerk.com/sign-up)

After signing up:

1. Click **Create application**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01090624.png)

    </div>

2. Provide a name for your application and choose **Email** as the sign-in option

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01125044.png)

    </div>

3. Upon creating the application, you should see your application dashboard.

    Clerk provides the list of steps to integrate Clerk with your application, but it also provides a prompt you can copy and use directly in GitHub Copilot to generate integration code.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01125309.png)

    </div>

    Click **Copy prompt**, and then in VS Code, open GitHub Copilot chat and paste the prompt in there.

4. Install Clerk:

    ```bash
    npm install @clerk/nextjs@latest
    ```

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01125457.png)
    </div>


    This updates the following files:

    - `app/layout.tsx`
    - `proxy.ts` (previously `middleware.ts`)
    - `.env.local` or `.env`

5. If the `.env` file is not created, you can create it and add the following environment variables:

    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLIC_KEY
    CLERK_SECRET_KEY=YOUR_SECRET_KEY
    DATABASE_URL=YOUR_DATABASE_URL
    ```


6. Back in the Clerk dashboard, locate the API keys.

    Copy the Publishable key and Secret key to your `.env` file.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01132645.png)

    </div>

7. Edit the `.env` file and add the API keys as environment variables:

    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_********************
    CLERK_SECRET_KEY=************************************************************
    DATABASE_URL=YOUR_DATABASE_URL
    ```

Since this project uses test accounts during development, email verification can be disabled to simplify the sign-up and login process. This allows users to authenticate immediately without needing to verify their email.

1. Go to **Configure → User & Authentication → Email.**
2. Disable **Verify at sign-up** and confirm when prompted.
3. Scroll to the sign-in options section.
4. Disable **Email verification code**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01153517.png)

    </div>

5. Go to the **Password** tab and temporarily disable **Client Trust**.

    Once done, click **Save.**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01153631.png)

    </div>




## Database Setup (Neon + Drizzle)

The application uses a serverless Postgres database hosted on Neon, with **Drizzle ORM** as the only way to interact with it.

Go to the Neon website to sign up for a free account: [https://neon.com/](https://neon.com/)

After signing up, click **Create database** and choose region closest to you

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01130712.png)

</div>

This provides an NPX command for connecting to your database using the Neon CLI, along with a connection string that can be used with any Postgres client. 

```bash
postgresql://neondb_owner:*************.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=req
```

Add it to `.env`:


```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_********************
CLERK_SECRET_KEY=************************************************************
DATABASE_URL=postgresql://neondb_owner:*************.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=req
```

Next, we will set up Drizzle ORM to connect to this database. Go to the [Drizzle website](https://orm.drizzle.team/docs/get-started) and then choose the **Neon** option for the setup instructions.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01131151.png)

</div>

Copy the instructions to install Drizzle ORM and its dependencies:

```bash
npm i drizzle-orm @neondatabase/serverless dotenv
npm i -D drizzle-kit tsx
```

In your project directory, create the `db/index.tsx` file and add the following code to set up the Drizzle ORM connection to your Neon database:

```typescript
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL!);

export { db };
```

Next, create a `drizzle.config.ts` file in the root of your project with the following content:

```typescript
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

**Note**: Make sure to update the `schema` property with the correct path to your Drizzle schema file:

```bash
schema: './db/schema.ts', 
```


## Running the Application

Start the development server:

```bash
npm run dev
```

Expected output:

```bash
Local:  http://localhost:3000
```

Open the URL in your browser to verify the app is running.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01133311.png)

</div>

If you are using WSL with files stored under `/mnt/c/...`, hot reload may not work correctly. This means changes to the codebase may not automatically refresh the browser. See [Hot Reload Not Working with WSL.](#hot-reload-not-working-with-wsl)

## Custom Agents and Prompts

To make the application more intelligent, scalable, and automation-friendly, we introduce a documentation-driven agent system powered by GitHub Copilot.

This setup includes:

- A **custom agent** responsible for generating structured instruction files for the project.
- A **custom prompt** that creates documentation based on the project structure and codebase.


#### 1. Create AGENTS.md

In the root of the project, create a file called:

```bash
AGENTS.md
```

> In some cases, this file may already be generated automatically when initializing a Next.js project with recommended defaults. If not, create it manually.


#### 2. Generate the Agent Definition

Open GitHub Copilot Chat in VS Code, start a new conversation, and attach `AGENTS.md`.

Then enter the following prompt:

```bash
Build out the content for this agent instructions file for this project. This is an instructions file specifically for LLMs to adhere to the coding standards for this project. 

Agent instructions will be separated into separate .md markdown files located in the /docs directory. Each file will have a specific focus, for example one file may be focused on database instructions, another file may be focused on backend instructions, another file may be focused on frontend instructions and so on. 

Finally, make sure that in the AGENTS.md file, the relevant instructions files in the /docs directory are ALWAYS read and referenced before generating any code.
```

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01134450.png)

</div>

After Copilot completes generation, you should see the following files created in the `/docs` directory:

```bash
docs/
├── auth.md
├── backend.md
├── database.md
├── frontend.md
├── general.md
```

At this stage, Copilot also updates `AGENTS.md` to reference these files.


#### 3. Reset Documentation Structure 

To enforce a controlled structure, remove the generated files from the previous step:

```bash
rm -rf docs/*
```

Then simplify `AGENTS.md`:

```bash
For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory. 

ALWAYS refer to the relevant .md file BEFORE generating any code.
```

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01135542.png)

</div>


#### 4. Create a Custom Agent in Copilot

In Copilot Chat:

1. Open context dropdown
2. Select **Configure Custom Agents**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01135801.png)

    </div>

3. Click **Create new custom agent**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01135857.png)

    </div>

4. You'll be prompted to choose the location for the agent definition file. 

    If you choose the *Workspace* options, the agent can only be used within this project, but if you choose the *Global* option, the agent can be used across all your projects.

    For this example, choose the *Workspace* option.

    ```bash
    .github/agents (default)
    ```

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01140142.png)

    </div>

5. Provide a name to the agent. 

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01140257.png)

    </div>

    This will create a new markdown file with the name of the agent in the `.github/agents` directory. 

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01140711.png)

    </div>

#### 5. Define Agent Behavior

Provide a description for the agent and then uncomment the commented *tools*. A **Configure Tools** will appear in the context dropdown, click on it and then click on **Add new tool**.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01140952.png)

</div>

Select the following tools:

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01141157.png)

</div>


Finally, add the following core instruction:

```bash
This agent takes the provided information and generates a concise and clear .md (markdown) instructions file in the /docs directory. It can read existing documentation, search for relevant information, and edit or create new documentation as needed. The agent will also create a todo list of tasks to complete the documentation updates.
```

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01141523.png)

</div>

**Note:** VS Code may not immediately detect the newly created agent in the context dropdown. If it doesn’t appear, restart VS Code and reopen the project folder. After that, reopen Copilot Chat and check the context dropdown again—the new agent should now be available.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01142932.png)

</div>


#### 6. Create a Custom Prompt

In Copilot Chat:

1. Open Settings (gear icon)

2. Go to **Prompts → Generate Prompt**

3. Select **New Prompt (Workspace)**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01142155.png)

    </div>

4. Name the prompt file:

    ```bash
    instructions-generator.prompt.md
    ```

    This will create the new prompt file in the `.github/prompts` directory. Provide the following content to the prompt file:

    ```bash
    Take the information below and create a an agent instructions file in markdown format in the /docs directory of this repository. If a .md filename is provided, use that as the name of the file. If not, use the filename based on the name of the prompt. The instructions should include when to use this prompt, how to use it, and any other relevant information that would help someone understand how to use this prompt effectively. Make sure the instructions are clear, concise, and easy to follow. Use examples if necessary to illustrate your points. Lastly, update the AGENTS.md file to include a link to the new instructions file you created. 

    If no information is provided, prompt the user to provide the necessary details about the layer of the architecture this prompt is designed for, the intended use cases, and any specific guidelines for using this prompt effectively.
    ```

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01143406.png)

    </div>


5. Type *agent:* below the *name*, this should list all the agents available in the context. Select the agent created earlier from the list.

    ```bash
    agent: instructions-generator
    ```

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-05-01143527.png)

    </div>


**How this works:** When we open a new conversation in Copilot chat and type "/", the prompt will now appear as an option in the prompt list. 

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01144633.png)

</div>

When you select this prompt, it will ask us for the necessary information about the architectural layer, intended use cases, and any specific guidelines for using the prompt effectively. 

Once we provide that information, it will use the `instructions-generator` agent to generate a new instructions file in the `/docs` directory and update the `AGENTS.md` file to reference the new instructions file.

## Generating the Instruction File (Auth Layer)

In Copilot chat, open a new conversation, then type "/" to open the prompt list and select the prompt created in the previous steps. Provide the necessary information about the architectural layer, starting with the authtentication layer.

```bash
Everything related to authentication will be managed by Clerk.
NO OTHER AUTHENTICATION METHODS SHOULD BE USED.

Make sure the /dashboard page is a protected route and must require the user to be logged in first. If the user is logged in and is trying to access the homepage, they should be redirected to the /dashboard page. 

Finally, the sign-in and sign-up button should always launched as modal buttons when clicked, instead of redirecting to a separate page.
```

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01145352.png)

</div>

When you submit the information, it will automatically use the `instructions-generator` agent to generate a new instructions file in the `/docs` directory with the provided information and update the `AGENTS.md` file to reference the new instructions file.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01145502.png)

</div>

Once its done, you should see a new file called `auth.md` in the `/docs` directory with the provided information. The `AGENTS.md` file should also be updated to reference the new `auth.md` file.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01145726.png)

</div>

Review the new `auth.md` file and make sure the information is accurate and clear. If there are any issues with the generated instructions, you can edit the `auth.md` file directly to make any necessary changes. 

Otherwise, click **Keep** to keep the generated instructions as they are.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01145848.png)

</div>

Going back to the web browser, you can try to click the Sign in and Sign up button to confirm that they are launching as modals instead of redirecting to a separate page.

Sign-in:

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01164647.png)

</div>

Sign-up:

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01164733.png)

</div>

Now that the authentication instructions file has been generated, repeat the same process for the remaining architectural layers.

For the UI and frontend-related instructions, use the following information:


```bash
All UI components should be built using shadcn UI and Tailwind CSS. No other component libraries or custom built components should be used.
```

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01150248.png)

</div>


## Adding a Dashboard Page

This section implements a protected dashboard route using Clerk authentication and enforces strict routing behavior between authenticated and unauthenticated users.

Open a new conversation in Copilot Chat, switch to **Agent mode**, then provide the following instructions:

```bash
Create a /dashboard page that is only accessible to authenticated users. The page should contain only a single h1 tag "Dashboard".

No other content, no data fetching.

Route protection must be handled exclusively in the Clerk middleware, do not add any auth checks inside the page component itself.

In the Clerk middleware, enforce the following rules:

1. If an unauthenticated user navigates to /dashboard (or any sub-route), redirect them to "/" (the homepage). 
2. If an authenticated user navigates to /, redirect them to /dashboard.
```

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01154543.png)

</div>

Going back to the browser, try to navigate to the `/dashboard` page. 

```bash
http://localhost:3000/dashboard
```

You should be redirected to the homepage since you're not authenticated.

Now create a test account. Click **Sign up**, and add a test email address and password to create the test account. 

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01170719.png)

</div>

After creating the test account, you should be automatically signed in and redirected to the `/dashboard` page. The page should display only the **"Dashboard"** heading

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01170847.png)

</div>

If you try to navigate back to the homepage while authenticated, you should be redirected back to the `/dashboard` page.

```bash
http://localhost:3000/ 
```

If you sign out, you should be redirected back to the homepage and if you try to access the `/dashboard` page again, you should be redirected back to the homepage since you're no longer authenticated.

## Dark Mode Support

This section adds theme switching using Tailwind CSS with persistent user preference storage.

Open a new Copilot Chat session in **Agent mode**, then provide:

```bash 
Implement dark mode support for the application using Tailwind CSS. The user should be able to toggle between light and dark mode using a button in the UI. The selected theme should be persisted across sessions so that when the user returns to the application, their preferred theme is automatically applied. Use local storage to persist the user's theme preference. 
```

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01171655.png)

</div>

Go back to the browser, refresh the page, and verify that the dark mode toggle button is working correctly and that the theme preference is persisted across sessions.

Light mode: 

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01172139.png)

</div>

Dark mode: 

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01172207.png)

</div>


## Opening Localhost in VS Code

In VS Code, open the Command Palette (Ctrl + Shift + P) and search for "Browser: Open Integrated Browser" and open it. In the URL field, enter the URL of your localhost server (e.g. `http://localhost:3000`) and press Enter.

To improve Copilot responses, you can attach UI context directly by clicking on the **Add Element to the Chat** button.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01180114.png)

</div>

Select the relevant UI component (e.g., Sign-up button). 

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01180341.png)

</div>

Copilot will include the source code, UI snapshot, and component context in the prompt for better understanding.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-01180620.png)

</div>

**Update:** I've updated my application to use Roboto as the default font for the application. If you want to do the same, you can simply add a prompt in a new Copilot Chat conversation in **Agent mode**:

```bash 
Update the application's default font to Roboto. Make sure to include the necessary imports and configurations to apply the Roboto font across the entire application.
```

## Commit and Push Changes 

After making changes to the codebase, you can use the Git extension in VS Code to commit and push your changes to a remote repository.

Provide a commit message, click **Commit** and then **Publish branch**.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02010015.png)

</div>

Note that at this point, we have not set up a remote repository yet. VS Code will prompt you to choose between publishing to a private repository or a public repository on GitHub. Provide a repo name and choose public repository.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02010056.png)

</div>

It will open a **Connect to Github** promtpt, click on **Sign in with browser** and authorized VS Code to access your GitHub account. After successful authentication, the branch will be published to the new GitHub repository.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02010125.png)

</div>

You should see a confirmation message at the bottom right in VS Code indicating that the branch has been published successfully. 

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02010846.png)

</div>


## Adding a Landing Page with Copilot Cloud Agent 

There are three ways to use Copilot agents: 

- In-context
- Custom agents
- Copilot Cloud Agents

The previous sections covered in-context agents and custom agents, but now we will see use a Copilot Cloud Agent to generate a landing page for our application.

Open a new conversation in Copilot Chat, then click on the **Copilot Cloud Agent** tab. Add the following prompt:

```bash
Create a landing page for this application. The landing page should be visually appealing and provide a clear value proposition for the application. It should include the following:

- A headline
- A brief description of the application
- A call-to-action button that directs users to sign up or log in

Make sure the Roboto font is applied and the landing page is responsive, looking good on both desktop and mobile devices.
```

Click on the options (showing "Local" by default) and select **Cloud**. 

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02012902.png)

</div>

A few notes:

1. When you choose **Copilot CLI**, it will run in the background, create a new branch, make the necessary code changes to implement the landing page, and then create a pull request with the changes. 

2. When you choose **Cloud**, the agent will also create a new branch, but it will work on the task in the cloud instead of your local environment. It will also launch a virtual browser via Playwright to test the landing page. Once its done, it will create a pull request with the changes just like the local agent.

3. Using the Cloud agent takes more resources and time since it’s running in the cloud, but it is also useful because you can launch multiple agents at the same time without worrying about resource constraints on your local machine. 

Once the agent is done, head over to your Github repository. You should see a new branch, as well as a new pull request with the changes for the landing page. Review the changes.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02020651.png)

</div>

Go to **Pull requests** and open the PR created by the agent. 

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02020807.png)

</div>

Click on **View session** to see the detailed activity of the agent, including the code changes it made, the tests it ran, and the browser interactions it performed.

**Note:** Make sure to review the code changes made by the agent. DO NOT blindly merge the PR without reviewing the changes, as the agent may make mistakes or introduce bugs.

For our setup, we will not merge the changes yet because we want to test the landing page first. 

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02021042.png)

</div>

To test the landing page, go back to VS Code and open Copilot Chat. You should see the cloud icon beside the prompt you used to generate the landing page, indicating that it was generated by a cloud agent.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02022327.png)

</div>

Open the session and click **Checkout** to switch to the new branch created by the agent.

**Note:** Make sure you don't have any uncommitted changes in your current branch before checking out the new branch, as you may lose those changes.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02022453.png)

</div>

If you get this prompt below, you need to install the Github Pull Requests extension. Click on **Install and Checkout** and then **Install (Do not sync)**.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02022954.png)

</div>

In your terminal, confirm that you are now on the new branch created by the agent:

```bash
git branch
```

You should see the new branch listed and highlighted with an asterisk (`*`), indicating that it is the currently active branch.

Example output: 

```bash
joseeden@TOWER-1:linkshortener$ git branch
* copilot/create-landing-page
  main 
```

Run the development server to test the landing page:

```bash
npm run dev
```

Open the URL in your browser and verify that the landing page is working correctly.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02023538.png)

</div>

After testing the landing page, go back to the PR created by the agent and click **Add your review**.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02023752.png)

</div>

You can review the changes made the agent and then click **Viewed.**, then click the down arrow on the **Submit review** button. Add any comments here (e.g. changes you want to add). If no changes are needed, you can simply approve the PR by selecting **Approve** and then click **Submit review**.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02024145.png)

</div>

**Note:** The PR may not automatically merge after approval if the agent created a draft PR. In that case, you can simply click on the **Ready for review** button to mark the PR as ready. The **Merge pull request** button should now be available, click on it to merge the PR.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02024550.png)

</div>

Provide a commit message and click **Confirm merge**.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02024636.png)

</div>


Back in VS Code, click the branch name at the bottom left and switch back to the main branch. 

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02025120.png)

</div>

Click **Sync Changes** to pull down the latest changes from the main branch, which now includes the landing page code.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02025233.png)

</div>

As best practice, run the development server again to make sure everything is working correctly after merging the changes from the landing page branch.

```bash
npm run dev 
```



## Troubleshooting

#### Node.js Version Error

You may encounter this error during setup:

```bash 
You are using Node.js 18.20.5. For Next.js, Node.js version ">=20.9.0" is required.
Error running typegen: Error: next typegen exited with code 1
    at ChildProcess.<anonymous> (/home/joseeden/.npm/_npx/cc2145a2fe1558fa/node_modules/create-next-app/dist/index.js:74:204521)
    at ChildProcess.emit (node:events:517:28)
    at maybeClose (node:internal/child_process:1098:16)
    at ChildProcess._handle.onexit (node:internal/child_process:303:5)
Success! Created linkshortener at /path/to/linkshortener
```

The project was created successfully, but the failure happened after scaffolding, during the type generation step.

The real problem is this line:

```bash
You are using Node.js 18.20.5. For Next.js, Node.js version ">=20.9.0" is required. 
```

So your app exists, but it won’t run properly until you upgrade Node.

1. Verify current environment.

    ```bash 
    node -v
    npm -v
    npx --version
    ```

    Example output:

    ```bash
    joseeden@TOWER-1:submodules$ node -v
    v18.20.5
    joseeden@TOWER-1:submodules$ npm -v
    10.9.2
    joseeden@TOWER-1:submodules$ npx --version
    10.9.2 
    ```

2. Since the project got created successfully, check what got installed:

    ```bash 
    cd /path/to/linkshortener
    cat package.json | grep next
    ```

    Example output:

    ```bash
    joseeden@TOWER-1:linkshortener$ cat package.json | grep next
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "next": "16.2.4",
        "eslint-config-next": "16.2.4", 
    ```

    Alternative verification:

    ```bash 
    npm list next
    ```

    Example output:

    ```bash
    joseeden@TOWER-1:linkshortener$ npm list next
    linkshortener@0.1.0 /path/to/linkshortener
    └── next@16.2.4
    ```

3. In my case, I have Node 18.20.5 installed, which is not compatible with Next.js 16.2.4.

    ```bash
    Node: 18.20.5 ❌ (too old)
    npm / npx: fine
    Next.js: 16.2.4 → requires Node ≥ 20.9.0
    ```

    Next.js v16 simply doesn’t support Node 18 anymore. I have to upgrade Node to version 20.9.0 or higher if I want to use Next.js v16 properly.

    Simply upgrade Node:

    ```bash
    nvm install 20
    nvm use 20
    node -v
    ```

4. Optional: Set Node 20 as default so you don’t fall back to 18 later:

    ```bash 
    nvm alias default 20
    ```

    Optional project-level safety:

    ```bash 
    echo "20" > .nvmrc
    ```

    So anytime you enter:

    ```bash
    nvm use
    ```

    It will automatically switch to Node 20.

    Output:

    ```bash
    Found '/path/to/linkshortener/.nvmrc' with version <20>
    Now using node v20.20.2 (npm v10.8.2)
    ```


5. After upgrading Node, do a clean reinstall of dependencies (required).

    ```bash 
    cd /path/to/linkshortener

    rm -rf node_modules package-lock.json
    npm install
    npm run dev
    ```

#### Hot Reload Not Working with WSL 

If you’re using WSL and your project files are stored under `/mnt/c/...`, you may encounter issues with hot reload not working properly when running the development server. 

**What this means:** When you make changes to your code, the browser does not automatically refresh to reflect those changes (even though you refresh the browser itself). 

Possible solutions:

1. Edit the `package.json` file and update the `dev` script to set the `WATCHPACK_POLLING` to `true` when running the development server. 

    This forces Webpack to use polling to watch for file changes, which can be more reliable in certain environments like WSL.

    ```json
    {
      "name": "linkshortener",
      "version": "0.1.0",
      "private": true,
      "scripts": {
        "dev": "WATCHPACK_POLLING=true next dev",
        "build": "next build",
        "start": "next start",
        "lint": "eslint"
      },
      .... 
    ```

    :::warning 

    This fix did not work when running `npm run dev`. It actually caused the [hydration mismatch error](#react-hydration-mismatch) in the browser. 

    :::

2. Move the project files into the Linux filesystem (e.g., under `/home/username/...`) instead of the Windows filesystem (`/mnt/c/...`). 

    This is the recommended solution for WSL users, as it provides better performance and compatibility with development tools.

Simple rule of thumb: If you’re using WSL, always keep your project files in the Linux filesystem to avoid issues with file watching and hot reload.

| Project location   | Hot reload | Stability   |
| ------------------ | ---------- | ----------- |
| `/home` (WSL)      | ✅ perfect  | ✅ best      |
| `/mnt/c` (Windows) | ❌ flaky    | ⚠️ meh      |
| `/mnt/c` + polling | ✅ works    | ⚠️ unstable |


#### React Hydration Mismatch 

You may see an issue in the web browser when you run the development server. 

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02013834.png)

</div>

When you click the issue details, you may see a hydration mismatch error like this:

<div class='img-center'>

![](/img/docs/Screenshot2026-05-02013902.png)

</div>

This is a classic React hydration mismatch in Next.js, and the diff already points to the real issue:sn

```bash
+ Client className="roboto_... geist_mono_..."
- Server className="roboto_... geist_mono_..." 
```

At first glance they look identical, but React is telling you they’re not exactly the same string at runtime. The problem is almost certainly coming from dynamic font class generation (e.g. `next/font`) in the `layout.tsx`.

```tsx
className={`${roboto.variable} ${geistMono.variable} h-full antialiased`} 
```

Those `.variable` values are generated at build/runtime, and if anything causes them to differ between server and client, hydration breaks.



{
  "name": "linkshortener",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "WATCHPACK_POLLING=true next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },