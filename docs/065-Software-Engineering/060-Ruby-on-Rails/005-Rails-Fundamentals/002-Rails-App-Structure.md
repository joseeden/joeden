---
title: "Rails App Structure"
description: "Structure of a Rails Application"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
- Ruby on Rails
sidebar_position: 2
last_update:
  date: 8/24/2023
---


## Overview 

This a simple guide to the main files and folders in a Rails application. There might be slight differences depending on your Rails version, but the core structure is mostly the same.

```bash
test_rails_app/

├── Dockerfile
├── Gemfile
├── Gemfile.lock
├── README.md
├── Rakefile
├── app
├── bin
├── config
├── config.ru
├── db
├── lib
├── log
├── public
├── script
├── storage
├── test
├── tmp
└── vendor 
```

Most of the work will be done in the **app folder**. Other folders like `config` and `db` are essential for setup and data, while root files manage dependencies and instructions. 

## `app` Folder

This is where most of the code lives.

- **Assets**

  - Stores static files like images and stylesheets
  - CSS controls how the HTML elements look.
  - `images` folder is for layout images, not user uploads
  - `stylesheets` contains CSS files for styling views
  - `application.css` makes all styles available to the views.

- **Channels**

  - Used for real-time features like chat or live notifications
  - Connected to `application_cable` for broadcasting
  - Lets your app send messages to users in real time.

- **Controllers**

  - Houses all controller files
  - `application_controller.rb` has default behavior for all controllers
  - Other controllers inherit from this file
  - Inheritance allows shared functionality across all controllers.

- **Helpers**

  - Contains helper methods used in views only
  - Makes view templates cleaner and easier to manage

- **JavaScript**

  - Managed with Webpack in Rails 6+
  - `packs/application.js` is the main JavaScript file
  - Linked in the layout via `javascript_pack_tag`
  - Ensures JavaScript code is available throughout the app.

- **Models**

  - Models handle data and database interactions.
  - `application_record.rb` is the base class for all models
  - New models inherit from this base

- **Views**

  - Views define the HTML structure
  - Contains templates for what users see
  - Links all CSS and JavaScript automatically
  - `layouts/application.html.erb` is the main layout file
  - All other views render inside this layout using `yield`

## `bin` Folder

This folder is mostly handled by Rails and usually doesn’t require changes.

- Stores executable scripts
- Not commonly used in most app development

## `config` Folder

Configurations help your app behave correctly in different environments.

- Stores configuration for the app
- `environments/` defines settings for development, test, and production
- `credentials.yml.enc` holds API keys and secrets
- `routes.rb` defines URL routes for the application

## `db` Folder

This folder holds development and test databases (usually SQLite by default).

- Migration files define database tables
- `schema.rb` shows the structure of all tables

Think of tables like Excel spreadsheets with rows and columns for storing data.


## Root Files

These root files manage dependencies, documentation, and project settings.

- *`Gemfile`

  - Lists Ruby gems your app uses
  - Update this to add or remove gems
  - `Gemfile.lock` stores locked versions, not edited directly
  - We don't modify the lock file.
  - All defined gems will be considered global, unless included in a `group` block.

      Example:

      ```bash
      ## Global 
      gem "importmap-rails"
      gem "turbo-rails"
      gem "stimulus-rails"
      gem "jbuilder"

      ## For dev and test environments only
      group :development, :test do
        gem "sqlite3", ">= 1.4"
      end

      ## For prod environments
      group :production do
        gem "pg"
      end
      ```

- `package.json`

  - Lists JavaScript dependencies installed via Yarn
  - This might not be available on early Rails version

- `README.md`

  - Markdown file for instructions or documentation
  - Displayed on GitHub or other code repositories

- Hidden files

  - Start with a dot, e.g., `.gitignore` or `.ruby-version`
  - Not shown by default in editors

