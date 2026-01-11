---
title: "Frontend"
description: "Frontend"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
- Ruby on Rails
sidebar_position: 10
last_update:
  date: 8/24/2023
---


## Overview

:::info 

This page builds on the `articles` table created in the [CRUD Operations](/docs/021-Software-Engineering/060-Ruby-on-Rails/005-Rails-Fundamentals/008-CRUD-Operations.md) page.

The complete config files can be found here: [Github/test-rails-app](https://github.com/joseeden/test-rails-app/tree/3a17f32ed06ba18908e71891f80bd6d02fe6b974)

:::

This page focuses on showing one article on the front end, which means handling the **read** part of CRUD in the browser. 

When a user visits a URL like `/articles/1`, Rails processes it step by step.

1. The URL contains the article ID.
2. The request is received by the `routes.rb` file.
3. The route maps the request to the controller's `show` action
4. The controller uses the `Article` model to interact with the database.
5. The model queries the database and retrieves the article.
6. The model sends back the article to the `show` action.
7. The controller uses the `show` view.
8. The view is displayed on the browser.

At the end of this flow, the view has access to the article data and can render it on the browser.

<div class='img-center'>

![](/img/docs/all-things-ruby.png)

</div>

## Add a `show` Route 

We need a route that accepts an article ID and routes the request to the `show` action.

In the example below, we define a route where `articles` is the resource and `show` is the only action exposed.

```ruby
# config/routes.rb
Rails.application.routes.draw do
  # resources :articles
  root "pages#home"
  get "about", to: "pages#about"
  get "up" => "rails/health#show", as: :rails_health_check
  resources :articles, only: [:show]
end
```

This generates a `GET` route in the form `/articles/:id`, which is exactly what’s needed to display a single article.

You can confirm this by checking the routes:

```bash
rails routes --expanded 
```

Output:

```bash
Prefix            | article
Verb              | GET
URI               | /articles/:id(.:format)
Controller#Action | articles#show
Source Location   | /test-rails-app/config/routes.rb:6
```


## Confirm the Article IDs

Before testing in the browser, it helps to know which articles exist.

For this setup, below are the articles that were added in the `articles` table.

| id   | title       | description                                    |
| ---- | ----------- | ---------------------------------------------- |
| 1    | First post  | Introduction article                           |
| 2    | Second post | Edited description of second article           |
| 3    | Third post  | This is the third post                         |
| 4    | Fourth post | This is a 4th article that has a proper length |

:::info 

To learn how create the table and add articles, please see the [Backend](/docs/021-Software-Engineering/060-Ruby-on-Rails/005-Rails-Fundamentals/004-Backend.md) page.

:::

`Article` is the model representing the articles table. We can see all the articles added by opening the rails console and calling `.all`:

```ruby
rails console
Article.all
```

The output shows the available records along with their IDs, which we can use in the URL.

```ruby
[#<Article:0x00007b1ae8ebd998
  id: 1,
  created_at: "2023-01-11 02:17:34.505517000 +0000",
  title: "First post",
  updated_at: "2023-01-11 02:17:34.505517000 +0000",
  description: "Introduction article">,
 #<Article:0x00007b1ae8912e58
  id: 2,
  created_at: "2023-01-11 02:21:36.948319000 +0000",
  title: "Second post",
  updated_at: "2023-01-11 05:22:30.483007000 +0000",
  description: "Edited description of second article">,
 #<Article:0x00007b1ae8912d18
  id: 8,
  created_at: "2023-01-11 08:01:45.875675000 +0000",
  title: "Third post",
  updated_at: "2023-01-11 08:01:45.875675000 +0000",
  description: "This is the third post">,
 #<Article:0x00007b1ae8912bd8
  id: 9,
  created_at: "2023-01-11 08:02:52.917372000 +0000",
  title: "Fourth post",
  updated_at: "2023-01-11 08:02:52.917372000 +0000",
  description: "This is a 4th article that has a proper length">]
```

Right now, the route knows which controller to send the request to, but we still need to create the controller to actually handle it.

## Create the Controller

Rails expects a controller to handle the request, so we need to create a `app/controllers/articles_controller.rb`

```ruby
# app/controllers/articles_controller.rb
class ArticlesController < ApplicationController
  def show
    @article = Article.find(params[:id])
  end
end
```

**Explanation:**

- `@article `→ instance variable available in the **view** (`show.html.erb`)
- `Article` → the model class (inherits from `ApplicationRecord`)
- .`find` → Fetches a record by its **primary key**, usually `id`

In simple terms:

> “Look in the `articles` table for the record whose `id` matches `params[:id]`, and store it in `@article`.”

Regarding the `params[:id]`, the `params` is a hash-like object that Rails automatically fills from the incoming request, and `:id` is the key in that hash representing the value from the URL defined in the routes.

From the route defined in the [Add a `show` Route](#add-a-show-route) step:

```bash
$ rails routes --expanded

Prefix            | article
Verb              | GET
URI               | /articles/:id(.:format)
Controller#Action | articles#show
Source Location   | /test-rails-app/config/routes.rb:6
```

This links the URL ID to a database query and makes the article ready to display. 

Next, we need to create a view so we can actually show the article details in the browser.


## Create the View

Rails follows conventions, so the view must live in the correct folder and match the action name. Create the `articles` folder and the `show.html.erb`.

```bash
app/views/
├── articles
│   └── show.html.erb
```
 
The `show.html.erb`:

```erb
<%# app/views/articles/show.html.erb %>

<h1>Article details</h1>

<p>
  <strong>Title:</strong>
  <%= @article.title %>
</p>

<p>
  <strong>Description:</strong>
  <%= @article.description %>
</p>
```

Here, the `@article` comes from the controller and is used to display the title and description. The `<%= %>` tags tell Rails to evaluate the Ruby code and render the result in the browser.




## Test in the browser

With everything wired together, we can now test the feature.

Start the Rails server locally:

```bash
rails server 
```

Open a web browser:

```text
http://localhost:3000/articles/1
```

Rails retrieves the article with ID `1` and displays its title and description. 

<div class='img-center'>

![](/img/docs/Screenshot-2026-01-11-181606.png)

</div>

Changing the ID in the URL shows a different article.

<div class='img-center'>

![](/img/docs/Screenshot-2026-01-11-181752.png)

</div>

This confirms that the show action works and that the application can display individual articles based on their IDs.

