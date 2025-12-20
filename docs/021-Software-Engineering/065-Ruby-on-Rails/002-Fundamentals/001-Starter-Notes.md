---
title: "Starter Notes"
description: "Notes on Ruby on Rails"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby on Rails
sidebar_position: 10
last_update:
  date: 8/24/2023
---


## Install Ruby on Rails

1. **Install Ruby:**

    - For Windows, see the official [Install Ruby on Rails Guide](https://guides.rubyonrails.org/install_ruby_on_rails.html#install-ruby-on-windows).

        ```bash
      ## Run on WSL 
      sudo apt update
      sudo apt install -y build-essential rustc libssl-dev libyaml-dev zlib1g-dev libgmp-dev
      curl https://mise.run | sh
      echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
      source ~/.bashrc
      mise use -g ruby@3
      ```

    - For macOS, use Homebrew:

      ```bash
      brew install ruby
      ```

    - For Linux, use your package manager, e.g., for Ubuntu:

      ```bash
      sudo apt-get install ruby-full
      ```

2. **Verify Ruby install:**

    - Verify it works by running:

      ```bash
      ruby --version
      ```

      Sample output:

      ```bash
      ruby 2.5.0
      ```

3. **Install Rails:**

    - Use Ruby's gem command to install Rails and its dependencies from [RubyGems.org](https://rubygems.org/).

      ```bash
      gem install rails
      ```

    - To verify that Rails is installed correctly

      ```bash
      rails --version
      ```

      Sample output:

      ```bash
      Rails 6.1.7.4
      ```