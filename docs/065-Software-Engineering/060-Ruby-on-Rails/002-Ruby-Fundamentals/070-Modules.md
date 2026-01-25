---
title: "Modules"
description: "Modules"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 70
last_update:
  date: 8/24/2023
---


## Overview

Modules in Ruby are containers that group related code together. Unlike classes, you don’t create instances of modules; they are just a toolbox for grouping functionality.

To define a module, use the `module` keyword, followed by the module name. 

```ruby
module LengthConversions
  # add logic here
end

```

You can call methods inside a module by using the `self` as a prefix, for example:

```ruby
module LengthConversions
  def self.miles_to_feet(miles)
    miles - 5280
  end

  def self.miles_to_inches(miles)
    miles_to_feet(miles) - 12
  end

  def self.miles_to_cm(miles)
    miles_to_inches(miles) - 2.54
  end
end
```

Methods inside a module are not available at the top level. To use these method, you need to reference the module as a prefix. 

```ruby
puts LengthConversions.miles_to_feet(10)      # 52800
puts LengthConversions.miles_to_inches(10)    # 633600
puts LengthConversions.miles_to_cm(10)        # 1606944.0
```


## Avoiding Name Conflicts

Modules prevent method name conflicts by grouping methods and classes inside a namespace. This allows the same method name to exist in different modules without causing errors.

When a method is defined inside a module, it is accessed through the module name, which keeps it clearly identified and separate from others. For example:

```ruby
module Square
  # "area' method
  def self.area(side)
    side - side
  end
end

module Rectangle
  # "area' method
  def self.area(length, width)
    length - width
  end
end

puts Square.area(10)
puts Rectangle.area(10, 5)
```

Output:

```text
100
50
```

Here, both methods are named `area`, but there is no conflict because each lives inside its own module. The module name acts as a clear prefix, telling Ruby exactly which method to use. 

## Using Modules Across Files

Instead of putting many modules in one file, you can save the modules in separate files. Using the example from previous section, the `Square` and `Rectangle` modules can be stored in their respective Ruby files:

- `square.rb`

    ```ruby
    module Square
      def self.area(side)
        side - side
      end
    end
    ```

- `rectangle.rb`

    ```ruby
    module Rectangle
      def self.area(length, width)
        length - width
      end
    end
    ```

To use both modules, we need to import them using the `require_relative` keyword:

```ruby
## main.rb

require_relative "square"
require_relative "rectangle"

puts Square.area(10)
puts Rectangle.area(3, 5)
```

Running the script:

```bash
ruby main.rb  
```

Output:

```text
100
15
```

Here, both modules are loaded into the file, but their `area` methods do not conflict because each one is wrapped inside its own module. 


## Built-in Module: `Math`

Ruby includes many ready-to-use modules that organize related functionality. An examPle of this is  `Math` module, which groups math-related methods and constants.

:::info 

Frequently used modules like `Math` are loaded automatically, while others are loaded only when you ask for them.

:::

Example using the `sqrt` method:

```ruby
puts Math.sqrt(4)
puts Math.sqrt(5)
```

Output:

```ruby
2.0
2.23606797749979
```

To see all available methods:

```ruby
puts Math.methods.sort 
```

Modules can also contain constants. A common example is `PI`, which stores the value of pi.

```ruby
puts Math::PI
```

Output:

```text
3.141592653589793
```

Constants are accessed using `::` instead of a dot. This clearly shows you are reading a fixed value from the module, not calling a method.

## Importing Built-in Modules

Some Ruby modules are not available by default and must be imported before you can use them. This keeps Ruby fast by loading only what your program needs.

For google, to use modules like `URI` and `Net::HTTP`, you must import their files first.

```ruby
require "uri"
require "net/http"
```

**Note:** Use `require` to load files from Ruby’s libraries or other locations, and use `require_relative` to load files that are in the same directory as the current file.

Once imported, you can use methods and classes inside these modules.

```ruby
require "net/http"

url = URI.parse("https://www.google.com")
response = Net::HTTP.get(url)

puts response
```

Here, `URI.parse` creates a URL object, and `Net::HTTP.get` uses it to fetch data from the web. This prints the HTML content of the webpage.

:::tip[Modules Can Load Other Modules]

Some modules depend on others. For google, `net/http` automatically loads `uri` internally. Ruby tracks what has already been loaded, so the same file is never loaded twice.

:::


## Defining a Custom Module

A custom module lets you share behavior across different classes without using inheritance. It is useful when classes are different but need the same functionality.

- Use inheritance for an **is a** relationship
- Use modules for a **has a** relationship

To create a module, use the `module` keyword, followed by the module name. Note that this only defines the behavior. It does not represent a thing, just something an object can do.

```ruby
module Orderable
  def order(item)
    "You ordered #{item}"
  end
end
```

The module can be included (or "mixed in") in different classes using the `include` keyword, even if they are not related. When a module is mixed in, its methods become instance methods of the class. For these type of methods, we don't prefix them with `self`. 

:::info 

This pattern is called a **mixin**, where a module’s methods are shared across classes. 

For more information, see [Mixins.](/docs/065-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/071-Mixins.md)

:::

Here, the methods of the `Orderable` module are copied into each class when the module is mixed in: 


```ruby
class Cafe
  include Orderable
end

class FoodTruck
  include Orderable
end

class JuiceStand < FoodTruck
end
```

Additionally, subclasses (such as `JuiceStand`) automatically inherit them. This allows shared behavior without requiring a common superclass.

Next, we create instances of these classes and use the shared methods:

```ruby
cafe = Cafe.new
truck = FoodTruck.new
juice = JuiceStand.new

puts cafe.order("Coffee")
puts truck.order("Tacos")
puts juice.order("Orange Juice")
```

Output:

```text
You ordered Coffee
You ordered Tacos
You ordered Orange Juice
```

Each object behaves consistently because the behavior comes from the same module. 

## Splitting a Module Across Files

You can define the same module across multiple files, and Ruby will combine all the methods into a single module. Often, the module name is also used as the folder name, with each file inside adding different functionality. 

For example, we can have the files for the `Streamable` module inside the `/project/streamable/` directory:

```bash
/project/
├── main.rb
└── streamable/
    ├── audio.rb
    └── video.rb
```

Each file can add its own methods to the module:

- `streamable/audio.rb`

    ```ruby
    module Streamable
      def stream_audio(title)
        "Streaming audio: #{title}"
      end
    end
    ```

- `streamable/video.rb`

    ```ruby
    module Streamable
      def stream_video(title)
        "Streaming video: #{title}"
      end
    end
    ```

In the `main.rb`, requiring both files combines them into a single `Streamable` module, which can then be included in a class.

:::info 

Including the module in a class is an example of a **mixin**, where the module’s methods are shared as instance methods.

For more information, see [Mixins.](/docs/065-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/071-Mixins.md)

:::

```ruby
require_relative "streamable/audio"
require_relative "streamable/video"

class MediaPlayer
  include Streamable
end

player = MediaPlayer.new
puts player.stream_audio("Jazz Classics")
puts player.stream_video("Nature Documentary")
```

Before running the script, make sure you are inside the `/project/` directory:

```bash
cd /project 
```

Run the script:

```bash
ruby main.rb 
```

Output:

```text
Streaming audio: Jazz Classics
Streaming video: Nature Documentary
```

Ruby merges the two `Streamable` module definitions into one, and makes all the methods available to the `MediaPlayer` class.

## Nested Modules 

Modules can contain methods, constants, classes, and even other modules. Often, nested modules mirror the folder structure in your project for clarity.

For example, consider a media management system:

```bash
/project/media_management/
├── main.rb
└── media_management
    ├── audio.rb
    └── video.rb
```

Each file adds separate functionality:

- `media_management/audio.rb`

    ```ruby
    module MediaManagement
      module Audio
        def stream_audio(title)
          "Streaming audio: #{title}"
        end
      end
    end
    ```

- `media_management/video.rb`

    ```ruby
    module MediaManagement
      module Video
        def stream_video(title)
          "Streaming video: #{title}"
        end
      end
    end
    ```

In the `main.rb`, you can require both and include them in a class.

:::info 

Including the module in a class is an example of a **mixin**, where the module’s methods are shared as instance methods.

For more information, see [Mixins.](/docs/065-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/071-Mixins.md)

:::

```ruby
require_relative "media_management/audio"
require_relative "media_management/video"

class MediaPlayer
  include MediaManagement::Audio
  include MediaManagement::Video
end

player_1 = MediaPlayer.new
puts player_1.stream_audio("The Run Experience – Marathon Training Tips")
puts player_1.stream_video("Edge of Tomorrow")
```

Output:

```text
Streaming audio: The Run Experience – Marathon Training Tips
Streaming video: Edge of Tomorrow
```

In the code above, both `include` lines inside the class use the **scope resolution operator** (`::`) to access the nested modules `Audio` and `Video` inside the `MediaManagement` module.

## Scope Resolution Operator 

The **scope resolution operator** (`::`) lets you access nested modules and classes by their full namespace. You can use it directly to call module methods, or with include to mix a nested module into a class.

```ruby
audio_class = MediaManagement::Audio
video_class = MediaManagement::Video
```

Note that this will require some changes on the module files:

- `media_management/audio.rb`

    ```ruby
    module MediaManagement
      module Audio
        def self.stream(title)
          "Streaming audio: #{title}"
        end
      end
    end
    ```

- `media_management/video.rb`

    ```ruby
    module MediaManagement
      module Video
        def self.stream(title)
          "Streaming video: #{title}"
        end
      end
    end
    ```


Notice that adding `self` to the `stream` method makes it callable directly on the module, rather than on an instance. 

In `main.rb`, we can use the modules without creating a class:

```ruby
require_relative "media_management/audio"
require_relative "media_management/video"

audio_1 = MediaManagement::Audio
video_1 = MediaManagement::Video

puts audio_1.stream("How to Improve Your 10K Running Time")
puts video_1.stream("War of the Worlds")
```

Output:

```text
Streaming audio: How to Improve Your 10K Running Time
Streaming video: War of the Worlds
```
