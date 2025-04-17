---
title: "Forms"
description: "Forms"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 11
last_update:
  date: 03/20/2019
---


## Overview

Forms allow user input through text fields, buttons, and more.

Example:

```html
<form>
    <p class="first">Please fill in this form</p>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" />
    <button type="submit">Submit</button>
</form>
```

Another way to write the form:

```html
  <form id="user-information">
    <p class="first">Please fill in this form</p>
    <input type="text" placeholder="First Name">
    <button>OK!</button>
  </form>
```

## Creating Forms 

The following is an example of an HTML registration form. 

- Set `type="email"` to ensures input is validated and follows proper email format.
- `required` attribute prevents users from leaving the field blank.  
- `name` attribute for gender buttons ensures only one option can be selected at a time. 
- `reset` button clears all inputs, and the checkboxes allow multiple selections.
- `select` with `option` allows users to choose from predefined choices in a dropdown.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register</title>
</head>
<body>
  <form>
    <label for="first-name">First Name:</label>
    <input type="text" id="first-name" required><br>

    <label for="last-name">Last Name:</label>
    <input type="text" id="last-name" required><br>

    <label for="email">Email:</label>
    <input type="email" id="email" required><br>

    <label for="birthday">Birthday:</label>
    <input type="date" id="birthday"><br>

    <label>Gender:</label><br>
    <input type="radio" name="gender" value="Male" id="male">
    <label for="male">Male</label><br>
    
    <input type="radio" name="gender" value="Female" id="female">
    <label for="female">Female</label><br>
    
    <input type="radio" name="gender" value="Other" id="other">
    <label for="other">Other</label><br>

    <label>Pets:</label><br>
    <input type="checkbox" name="pets" value="Cats" id="cats">
    <label for="cats">Cats</label><br>

    <input type="checkbox" name="pets" value="Dogs" id="dogs">
    <label for="dogs">Dogs</label><br>

    <label>Cars:</label><br>
    <select>
      <option value="audi" name="audi"><br>
        Audi
      </option>
      <option value="mercedes" name="mercedes"><br>
        Mercedes Benz
      </option>
      <option value="nissan" name="nissan"><br>
        Nissan
      </option>
    </select><br>

    <input type="submit" value="Register">
    <input type="reset" value="Reset">
  </form>
</body>
</html> 
```

How it looks like:

<div class="img-center"> 

![](/img/docs/html-samplesssss.png)

</div>
