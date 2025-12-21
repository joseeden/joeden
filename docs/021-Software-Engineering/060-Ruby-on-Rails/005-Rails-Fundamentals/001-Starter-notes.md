---
title: "Starter Notes"
description: "Starter Notes on Ruby on Rails"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
- Ruby on Rails
sidebar_position: 1
last_update:
  date: 8/24/2023
---

## Overview

Ruby on Rails (or Rails) is a framework to build web applications. You can use it to create simple sites or large enterprise applications.

Popular platforms that have used/still uses Rails:

- Twitter
- Airbnb
- GitHub
- Basecamp
- Shopify


## Gems and Packages

Gems are reusable code packages that add functionality to Rails apps. They can be found at [Rubygems.org](https://rubygems.org/) or [GitHub](https://github.com/ruby/rubygems).

## MVC Structure in Rails

Rails follows the **Model-View-Controller** (MVC) pattern to organize web applications. MVC separates what users see from how the application works behind the scenes.

The principle divides the work of an application into 3 separate but closely cooperative subsystems.

- **Model** 

  - Manages the data in the application. 
  - Typically, your database tables.

- **View** 

  - Makes up the frontend of the application.
  - Handles rendering responses in different formats.
  - Comprise of HTML, JSON, XML, etc.

- **Controller** 

  - User interactions and the logic for each request.
  - Interacts with the model

Diagram: 

<div class='img-center'>

![](/img/docs/Screenshot-2025-12-21-225947.png)

</div>

General flow of Rails application:

1. A user makes a request (like visiting a URL)
2. The router sends the request to the right controller action
3. The controller talks to models to get or change data
4. The controller picks a view to show the user
5. The view renders HTML (or JSON/XML) and sends it back to the user


### Models

Models represent the data and core resources of your application. They usually connect to a database.

- Models represent resources like users posts or products
- Each model usually maps to a database table
- Models handle data rules and database communication

For example, a user model works with a users table. This keeps data logic in one place and supports the MVC idea of separation.

### Views

Views are the part of the application that users see and interact with.

- Views make up the front end
- They use HTML CSS and JavaScript
- Rails views use ERB templates

In Rails view, files usually end with `.html.erb`. This lets you mix HTML with Ruby code so pages can display dynamic data while still staying focused on presentation.

- `home.html.erb`
- `new.html.erb`
- `friends.html.erb`
- `portfolio.html.erb`

### Controllers

Controllers handle requests and connect models with views. They decide what happens when a user interacts with the app.

- Controllers process user requests
- They fetch or update data using models
- They choose which view to render

For example, a users controller manages actions related to users. Controllers act as the middle layer which keeps the MVC flow clear and predictable.

- `users_controller`
- `posts_controller`
- `articles_controller`
- `stocks_controller`

## MVC Folders in a Rails App

A standard Rails app shows MVC clearly through its folder structure.

- Controllers are in `app/controllers`
- Models are in `app/models`
- Views are in `app/views`

Example structure:

```ruby
app/
├── controllers/
├── models/
└── views/
```

We will also see files like `application.html.erb` which look like normal HTML but include embedded Ruby code. This layout ties views into the MVC structure.

## Create a Rails App 

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

## Create a Controller

Controllers handle actions that respond to routes. 

To create a new controller, run:

```ruby
rails generate controller pages
```

This will create the following:

- `app/controllers/pages_controller.rb` template
- `app/views/pages` folder 

Next, update `config/routes.rb` to point the root route to the new controller and action:

```ruby
Rails.application.routes.draw do
  root "pages#home"
  get "up" => "rails/health#show", as: :rails_health_check
end
```


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


