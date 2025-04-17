---
title: "Swapping Modals"
description: "Swapping Modals"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Frontend Development
- HTML
- CSS
- Bootstrap
sidebar_position: 44
# last_update:
#   date: 04/21/2019
---


## Overview 

I used this approach for the login and signup modals in one of my personal projects:

<div class="img-center"> 

![](/gif/docs/swapping-modals.gif)

</div>


The **Login modal** is the "main box", and when the user clicks **Sign up**, we want to **transition within that box** — almost like a panel swap — without touching anything "outside" that modal’s visual bounds.

- The **Signup modal is inside the Login modal box**
- It **slides in over** the login form **within the same `.modal-content` box**
- It should **never cause overflow**, **never go outside**, and **not touch the body scroll**
- The whole thing should feel like a single component

## Panel Swapping

I used **panel swapping** via absolute positioning and a **wrapper div inside `.modal-content`**. One panel is for Login, the other is for Signup.

HTML: 

```html
<div class="modal-content global-modal-content">
  <div class="global-modal-body">
    <div class="modal-panel-wrapper">
      
      <!-- Login Panel -->
      <div class="modal-panel modal-login-panel">
        <h2 class="signup-modal-title">Login</h2>
        <!-- login form HTML here -->
      </div>

      <!-- Signup Panel -->
      <div class="modal-panel modal-signup-panel">
        <h2 class="signup-modal-title">Create an account</h2>
        <!-- signup form inputs go here -->
      </div>

    </div>
  </div>
</div>
```


CSS:

```css
.modal-panel-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Both panels fill the space */
.modal-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease-in-out, opacity 0.3s ease;
}

/* Show login panel by default */
.modal-login-panel {
  z-index: 1;
  background: white;
  transform: translateX(0%);
}

/* Signup is offscreen initially */
.modal-signup-panel {
  z-index: 2;
  background: white;
  transform: translateX(100%);
  opacity: 0;
  pointer-events: none;
}

/* Active state: slide signup in */
.modal-signup-panel.active {
  transform: translateX(0%);
  opacity: 1;
  pointer-events: auto;
}

/* Slide login out */
.modal-login-panel.shift-left {
  transform: translateX(-100%);
  opacity: 0;
  pointer-events: none;
}

.signup-modal-title {
  font-size: 1.5rem;
  margin: 1rem 0;
}
```

JS (Panel Toggling):

```js
document.addEventListener("DOMContentLoaded", () => {
  const signupLink = document.getElementById("login-modal-signup-link");
  const loginPanel = document.querySelector(".modal-login-panel");
  const signupPanel = document.querySelector(".modal-signup-panel");
  const closeSignup = document.querySelector(".close-signup-modal");

  signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    signupPanel.classList.add("active");
    loginPanel.classList.add("shift-left");
  });

  closeSignup.addEventListener("click", () => {
    signupPanel.classList.remove("active");
    loginPanel.classList.remove("shift-left");
  });
});
```


**Result:**

- Both **Login and Signup panels live inside the same modal box**
- When "Sign up" is clicked, **Signup slides in**, Login **slides out**
- Everything **stays scoped** to `.modal-content`
- ✅ No body scroll
- ✅ No overflow
- ✅ Works with Bootstrap modals


## Reset Active Panel on Modal Open

When switching from the Login panel to the Signup panel within the modal, the active state persists even after the modal is closed. As a result, reopening the modal displays the previously active panel instead of defaulting to the Login panel.

To ensure consistent behavior, the active panel should be reset to **Login** each time the modal is opened via the navbar button.

<div class="img-center"> 

![](/gif/docs/swapping-modals-2.gif)

</div>

Javascript code: 

```js
// Get modal section and open button
const modal = document.getElementById('modal-navbar-login');
const openModalBtn = document.getElementById('open-login-modal');  
const closeModalBtn = document.getElementById('close-login-modal');

// Panel switching
const loginPanel = document.getElementById('login-panel');
const signupPanel = document.getElementById('signup-panel');

// Show modal when "Login" is clicked
openModalBtn.addEventListener('click', function(event) {
  event.preventDefault(); 
  modal.style.display = 'block';

  // Always reset to Login panel on modal open
  loginPanel.classList.add('active');
  signupPanel.classList.remove('active');
});

// Hide modal when close button is clicked
closeModalBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Hide the modal if user clicks outside of modal
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none'; 
  }
});

document.getElementById('login-modal-signup-link').addEventListener('click', function(e) {
  e.preventDefault();
  loginPanel.classList.remove('active');
  signupPanel.classList.add('active');
});

document.getElementById('signup-modal-login-link').addEventListener('click', function(e) {
  e.preventDefault();
  signupPanel.classList.remove('active');
  loginPanel.classList.add('active');
});
 
```

## Clear Fields on Modal Close 

To clear the form fields when the modal is closed (either by clicking "Continue," "Sign Up," or the close button), I added a custom logic to reset the input fields to their initial state. This is done by selecting the form fields inside the modal and resetting them when the modal is closed.

**Expectation:** After closing the modal (either via button click or clicking outside the modal), the form fields are cleared.

<div class="img-center"> 

![](/gif/docs/swapping-modals-3.gif)

</div>

Javascript code:

```js
// Close modal 
document.querySelectorAll('.login-modal-button').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();                               // Optional: if forms are not being submitted
    modal.style.display = 'none';
    resetModalFields();                               // Clear all input fields when it's closed
  });
});

// Reset all input fields in the modal
function resetModalFields() {
  const inputs = modal.querySelectorAll('input');     // Select all input elements inside the modal
  inputs.forEach(input => {
    input.value = '';                                 // Clear the value of each input field
    input.classList.remove('is-invalid', 'is-valid'); // Remove any validation feedback
  });
}
```



## Clear Search Fields 

I also used the same approach to clear the search field every time the Search modal is hidden - using the Bootstrap modal `hidden.bs.modal` event.

```js
const searchModalEl = document.getElementById('navbar-search-modal');
const searchInput = document.getElementById('searchInput');

searchModalEl.addEventListener('hidden.bs.modal', function () {
  searchInput.value = '';
});
```

<div class="img-center"> 

![](/gif/docs/swapping-modals-4.gif)

</div>
