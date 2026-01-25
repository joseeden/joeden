---
title: "Create a Rails App"
description: "Create a Rails App"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
- Ruby on Rails
sidebar_position: 3
last_update:
  date: 8/24/2023
---

## Overview

> Make sure have [installed Ruby and Rails](/docs/065-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/001-Starter-Notes.md#installation).

To create a Rails application, run the following command in your terminal:

```ruby
rails new test_rails_app 
```

If you have a specific version that you want the Rails app to use, you can do:

```ruby
rails _<version-number> new test_rails_app 

# Example:
rails _5.2.1.4_ new test_rails_app
```

**Additional notes:** In my setup, the Rails app directory already existed because it was a Git submodule inside a parent repository. Instead of creating a new folder or Git repo, I generated the Rails app in the current directory:

```bash
cd test-rails-app  # This is a submodule
rails new . --force --skip-git
```

After your application is created, switch to its directory:

```ruby
cd test_rails_app 
```

To start the server:

```ruby
rails server 

# Another way 
rails s
```

Open a web browser and navigate to:

```ruby
http://localhost:3000
```

The default Rails welcome page is displayed.  This confirms the application is running and the root route is active.

<div class='img-center'>

![](/img/docs/Screenshot-2025-12-22-054251.png)

</div>

To stop the server, press `Ctrl+C` in the terminal.

For now, we'll keep the server running so we can simply refresh the page when we introduce configuration changes in the next steps.

## Directory Structure

The main directories in a Rails app are:

```ruby
test_rails_app/app

├── assets
├── controllers
├── helpers
├── javascript
├── jobs
├── mailers
├── models
└── views
```

These directories separate logic, data, and presentation, which keeps the application organized as it grows.

:::info 

For more information, please see [Rails App Structure.](/docs/065-Software-Engineering/060-Ruby-on-Rails/005-Rails-Fundamentals/002-Rails-App-Structure.md)

:::

Inside the controllers directory, `application_controller.rb` serves as the base controller and will be used in the next step to control how the root route responds.

```ruby
test_rails_app/app/controllers/

├── application_controller.rb
└── concerns 
```


## Root Route

The root route is the default page shown when no extra path is provided.

- It is the base URL of the application
- It handles the first incoming request
- It can be customized in the routes file

For example:

- `http://example.com`
- `http://localhost:3000`

This route is what users see first, so changing it lets us control the initial page of the application.

- Routes are defined in `config/routes.rb`
- Where each route maps a request to a controller action. 
- Root route is usually the starting point for this flow.

To update the route, edit the `config/routes.rb`:

```ruby
Rails.application.routes.draw do
  root "application#hello"

  get "up" => "rails/health#show", as: :rails_health_check
end
```

This tells Rails to send the root request to the `ApplicationController` and handle it using the `hello` method for that controller.

This `Hello` method doesn't actually exist yet, and will be created in the next step.

## Application Controller

The application controller is the base controller for the entire app.

- Other controllers inherit from it
- Shared behavior is defined here
- It can directly handle routes if needed

Open `app/controllers/application_controller.rb`:

```ruby
class ApplicationController < ActionController::Base
  
  allow_browser versions: :modern

  stale_when_importmap_changes
end
```

The class definition `ApplicationController` inherits from `ActionController`, which gives it core controller features such as handling requests and rendering responses.

This line limits supported browsers to modern versions:

```ruby
allow_browser versions: :modern 
```

This line helps Rails manage caching when JavaScript import maps change:

```ruby
stale_when_importmap_changes
```

To define a `hello` method, edit `app/controllers/application_controller.rb`:

```ruby
class ApplicationController < ActionController::Base

  allow_browser versions: :modern
  stale_when_importmap_changes

  def hello
    render html: "Hello, world!"
  end

end
```

Back in the web browser, refresh the page. The page now displays "Hello world!", which confirms that the root route and controller action are working as expected.

<div class='img-center'>

![](/img/docs/Screenshot-2025-12-22-070021.png)

</div>

Note that this approach does not follow Rails conventions. The HTML should not be defined in the application controller, but instead placed inside `.html.erb` files within the `views` directory, where presentation logic belongs.

## Conventional Expectations 

Rails follows "convention over configuration," which means it expects code and files to follow standard patterns.

1. Define a route pointing to `controller#action`
2. Create a controller with a meaningful name
3. Add an action/method in that controller
4. Place the corresponding `.html.erb` template in the matching folder under **views**

For example, for static pages:

- Controller: `pages_controller`
- Action: `home`

Rails will then expect:

- `app/views/pages` folder matching the controller name
- `home.html.erb` template inside that folder matching the action name

These conventions keeps the app organized and allows Rails to automatically link routes, controllers, and views.

Go back to the `app/controllers/application_controller.rb` and remove the `hello` action to reset the application controller to only contain shared behavior.

```ruby
class ApplicationController < ActionController::Base

  allow_browser versions: :modern
  stale_when_importmap_changes

end
```

## Update Route 

Following the conventional way, update the `config/routes.rb` to point the root route to a new controller called `pages`:

```ruby
Rails.application.routes.draw do
  root "pages#home"
  get "up" => "rails/health#show", as: :rails_health_check
end
```

**Note**: You can use a different controller name here instead of `pages`, as long as it matches the controller created in the next step. The `home` action can also be changed, but it must match the method defined in that controller.


## Create a Controller

Controllers handle actions that respond to routes. 

To create a new controller called `pages`, run:

```ruby
rails generate controller pages
```

This will create the following:

- `app/controllers/pages_controller.rb` template
- `app/pages/pages_helper.rb` module
- `app/views/pages` folder 


## Add a Controller Action

After creating the pages controller, the next step is to define a controller action to handle the root route.

Edit `app/controllers/pages_controller.rb`:

```ruby
class PagesController < ApplicationController
  def home
  end
end
```

This prepares the controller to render a view automatically.


## Create the View

Once the `home` action is defined in `PagesController`, next is to create its view so the content can be displayed in the browser.

To do this, create the `app/views/pages/home.html.erb`:

```erb
Hello, world!
```

Go back to the browser and refresh the page. The text "Hello, world!" now appears at http://localhost:3000.

<div class='img-center'>

![](/img/docs/Screenshot-2025-12-22-070021.png)

</div>

## How the Request Flows

Rails follows a clear pattern when handling requests.

1. User sends a request from the browser
2. Router receives the request
3. Router determines the destination based on defined routes
4. Router sends the request to the correct controller action
5. If needed, the action interacts with models to fetch or save data
6. Model returns data to the controller
7. Controller selects the appropriate view template
8. View renders the response and sends it back to the user

In this case:

- No database or models are involved
- The controller directly renders the view

This same pattern repeats throughout Rails applications and becomes the foundation for more complex features.


## Add an About page

We can add a simple **About** page to the application that can be accessed at `/about` in the browser. The About page will use a GET request and be handled by the existing `pages` controller.

Update `config/routes.rb` to add a route for `/about` using `to:` to point it to the `pages` controller:

```ruby
Rails.application.routes.draw do
  root "pages#home"
  get "about", to: "pages#about"
  get "up" => "rails/health#show", as: :rails_health_check
end
```

Next, add a new `about` action in `app/controllers/pages_controller.rb`:

```ruby
class PagesController < ApplicationController
  def home
  end

  def about
  end
end
```

Create the view file for the About page. Inside `app/views/pages`, create `about.html.erb` with:

```erb
<h1>This is the about page</h1>
```

You can also update `app/views/pages/home.html.erb` to add a heading for the home page:

```erb
<h1>This is the home page</h1>
```

Once the view exists, Rails can render the About page in the browser. Refresh the page and go to `/about` to see it in action.

Home page: 

<div class='img-center'>

![](/img/docs/Screenshot-2026-01-06-224516.png)

</div>

About page: 

<div class='img-center'>

![](/img/docs/Screenshot-2026-01-06-224608.png)

</div>



## Deploy App to Heroku

We can deploy the Rails application so it is live online and accessible from any browser. 

:::info 

Production runs separately from local development, uses a persistent web server, and has its own database.

:::

Firstly, make sure to do the following first:

- [Sign up for a free Heroku account ](https://signup.heroku.com/)
- [Install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)


#### Steps

1. In your terminal, use Heroku CLI to login:

    ```bash
    heroku login
    ```

    **Note:** If you encountered an issue, please see [Heroku](/docs/001-Personal-Notes/020-Homelab/031-Heroku.md) page.

    This will open a web browser. Click **Log in.**

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-01-06-235019.png)

    </div>

2. Create a Heroku app from your application directory:

    ```bash
    heroku create
    ```

    Sample output:

    ```bash
    Creating app... done, ⬢ arcane-caverns-35777
    https://arcane-caverns-35777-419bbd25c167.herokuapp.com/ | https://git.heroku.com/arcane-caverns-35777.git
    ```

3. (Optional) You can rename your Heroku app:

    ```bash
    heroku rename alphard
    ```

    Output:

    ```bash
    Renaming arcane-caverns-35777 to alphard... done
    https://arcane-caverns-35777-419bbd25c167.herokuapp.com/ | https://git.heroku.com/alphard.git
    Git remote heroku updated
    Git remote heroku updated
    ›   Warning: Don't forget to update git remotes for all other local checkouts of the app.
    ```

    Now run:

    ```bash
    heroku open  
    ```

    <div class='img-center'>

    <!-- ![](/img/docs/Screenshot-2026-01-07-014636.png) -->
    ![](/img/docs/Screenshot-2026-01-10-194009.png)

    </div>

    At this stage, the app is still using Heroku’s default page. 

    The Rails application will be deployed in the next step.

4. Update the `Gemfile` to use PostgreSQL in production instead of SQLite.

    <!-- Comment out this line:

    ```ruby
    # gem "sqlite3", ">= 1.4"
    ``` -->

    ```ruby
    source "https://rubygems.org"

    # Rails
    gem "rails", "~> 8.1.1"

    # Web server
    gem "puma", ">= 5.0"

    # Assets & frontend
    gem "propshaft"
    gem "importmap-rails"
    gem "turbo-rails"
    gem "stimulus-rails"

    # JSON APIs
    gem "jbuilder"

    # Time zones for Windows
    gem "tzinfo-data", platforms: %i[ windows jruby ]

    # Rails 8 database-backed features
    gem "solid_cache"
    gem "solid_queue"
    gem "solid_cable"

    # Performance & boot
    gem "bootsnap", require: false

    # Deployment
    gem "kamal", require: false
    gem "thruster", require: false

    # Image processing
    gem "image_processing", "~> 1.2"

    # ======================
    # Development & Test
    # ======================
    group :development, :test do
      gem "sqlite3", ">= 1.4"

      gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
      gem "bundler-audit", require: false
      gem "brakeman", require: false
      gem "rubocop-rails-omakase", require: false
    end

    # ======================
    # Development only
    # ======================
    group :development do
      gem "web-console"
    end

    # ======================
    # Test only
    # ======================
    group :test do
      gem "capybara"
      gem "selenium-webdriver"
    end

    # ======================
    # Production (Heroku)
    # ======================
    group :production do
      gem "pg"
    end
    ```

    **Update:** Heroku doesn't support SQLite, only PostgreSQL for Rails apps.

<!-- 4. Since you don't have PostgreSQL installed on your local machine, you can skip the installation of `pg` gem (and other production gems) locally:

    ```bash
    bundle install --without production
    ```

    **Note:** In newer Rails version, the `--without` flag has been removed. You can use this instead:

    ```bash
    bundle config set without 'production'
    ``` -->
<!-- 
5. (Optional) If you're testing and are not using a database, you can update the `config/application.rb` and comment out this line:

    ```bash
    # require "rails/all"
    ```

    This line loads all the default Rails frameworks, including the ActiveRecord. If ActiveRecord is not loaded, Rails won’t try to connect to SQLite or Postgres.

    Note that `app/models/application_record.rb` does reference ActiveRecord:

    ```ruby
    class ApplicationRecord < ActiveRecord::Base
      self.abstract_class = true
    end
    ```

    So you will need to delete the `app/models/application_record.rb` as well.

    **Note:** You can always generate this file anytime:

    ```bash
    rails generate model ApplicationRecord
    ``` -->


<!-- 6. (Optional) When testing locally, you might need to turn off frozen mode to let the Bundler update the `Gemfile.lock`:

    ```bash
    bundle config set frozen false
    ```

    Add `pg` to the lockfile without installing it locally:

    ```bash
    bundle lock --add-platform x86_64-linux
    ``` -->


5. Update your `config/database.yml` for production to use PostgreSQL.

    ```yaml
    # ===========================================================================
    # SQLite (Local)
    # ===========================================================================
    sqlite: &sqlite
      adapter: sqlite3
      pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
      timeout: 5000

    development:
      <<: *sqlite
      database: storage/development.sqlite3

    test:
      <<: *sqlite
      database: storage/test.sqlite3

    # ===========================================================================
    # PostgreSQL (Heroku)
    # ===========================================================================
    postgres: &postgres
      adapter: postgresql
      pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

    production:
      primary:
        <<: *postgres
        url: <%= ENV["DATABASE_URL"] %>

      cache:
        <<: *postgres
        url: <%= ENV["DATABASE_URL"] %>
        migrations_paths: db/cache_migrate

      queue:
        <<: *postgres
        url: <%= ENV["DATABASE_URL"] %>
        migrations_paths: db/queue_migrate

      cable:
        <<: *postgres
        url: <%= ENV["DATABASE_URL"] %>
        migrations_paths: db/cable_migrate
    ```


6. **Important step:** Make sure to commit the changes:

    ```bash
    git add -A
    git commit -m "Deploy app"
    ```

7. Push the app to Heroku:

    ```bash
    git push heroku master
    ```

    Sample output:

    ```bash
    remote: -----> Compressing...
    remote:        Done: 60.1M
    remote: -----> Launching...
    remote:        Released v3
    remote:        https://alphard-10f64f0a1adf.herokuapp.com/ deployed to Heroku
    remote:
    remote: Verifying deploy... done.
    To https://git.heroku.com/alphard.git
    * [new branch]      master -> master
    ```

8. Open the app. 

    ```bash
    heroku open 
    ```

    This will open the app in the browser:

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-01-10-194441.png)

    </div>



