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
sidebar_position: 2
last_update:
  date: 8/24/2023
---

## Overview

> Make sure have [installed Ruby and Rails](/docs/021-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/001-Starter-Notes.md#installation).

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
