---
title: "Swiftlink"
description: "Landing page for a fictional logistics company"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 5
last_update:
  date: 03/22/2019
---


## Swiftlink International

import React from "react";

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) 	![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![Mailchimp](https://img.shields.io/badge/mailchimp--%23FFE01B?style=for-the-badge&logo=mailchimp) 

Swiftlink International is a fictional transportation and logistics company. This project is a clean, responsive landing page created to practice HTML, CSS, and JavaScript.


## Technologies Used  

- HTML, CSS, JavaScript  
- Bootstrap CSS 


## Explore 

Links: 

- [Live Demo](https://swiftlink-global.netlify.app/) 
- [Github](https://github.com/joseeden/Swiftlink) 

Screenshot:

<div class="img-center"> 

![](/img/docs/Screenshot-2025-04-02-181039.png)

</div>

## Features  

- Modern and responsive design  
- Smooth scrolling and engaging UI  
- Service highlights and call-to-action sections  
- Contact form for customer inquiries  


## Modals - Search

close modal when:

- user click close button 
- user click outside of modal 
- user click Search button 
- user types into the Search field and press Enter 

Modal will not close if user press enter but left Search field empty


## Responsive Web Design 

Smallest screen - 320px

As of **2024–2025**, the **smallest commonly used mobile phone screen width** is around **320 pixels**, though the majority of modern smartphones used by people globally now start at **360–390 pixels** in **CSS pixels** (not physical pixels).

### Common Screen Widths 

| Device Type     | Screen Width (CSS px) | Example Devices |
|------------------|------------------------|------------------|
| **Small phones** | **320px**               | iPhone SE (1st gen), older Androids |
| **Compact phones** | **360px – 375px**      | iPhone SE (2022), Pixel 4a, Galaxy A series |
| **Average phones** | **390px – 414px**      | iPhone 13, iPhone 14, Galaxy S23, Pixel 7 |
| **Large phones / phablets** | 428px – 480px | iPhone 15 Pro Max, Galaxy Note series |

Notes: 

- **320px** is still a safe **minimum baseline** for mobile responsiveness.
- Designing for **360px** is a modern minimum 
- If you're using media queries, it's smart to test breakpoints at:
  - `max-width: 575.98px` (Bootstrap's XS breakpoint)
  - `max-width: 480px`
  - `max-width: 360px`

To configure Chrome DevTools for simulating the Samsung Galaxy Z Flip series, you'll need the viewport dimensions in CSS pixels (device-independent pixels). Here's the information for various models:


### Galaxy Z Flip (2020) & Z Flip 5G

- **Viewport Size**:412 × 1004 CSS pixel
- **Device Pixel Ratio**:2.625 (xxhdpi
- **Physical Resolution**:1080 × 2636 pixel
These specifications are suitable for both the original Z Flip and the Z Flip 5G, as they share the same display characteristics citeturn0search1


### Galaxy Z Flip 3, Z Flip 4, and Z Flip 5

- **Viewport Size** 412 × 915 CSS pixes
- **Device Pixel Ratio** 3.0 (xxhdp)
- **Physical Resolution** 1080 × 2640 pixes

These models have similar display specifications, with slight variations in resolution and pixel densit.

### Adding a Custom Device in Chrome DevTools

To add a custom device:

1. Open Chrome DevTools (press `F12` or `Ctrl+Shift+I`).
2. Click the device toolbar icon (toggle device emulation).
3. Click the device list dropdown and select "Edit…".
4. Click "Add custom device" and enter the following:

   - **Name*: Samsung Galaxy Z Flip (modl)
   - **Width*: 12
   - **Height*: 1004 (for Z Flip 2020/5G) r 915 (for Z Flip 3/45)
   - **Device Pixel Ratio*: 2.625 (for Z Flip 2020/5G) r 3.0 (for Z Flip 3/45)
   - **User Agent String*: (optional, can be left blak)

This setup will help you emulate the display characteristics of the Samsung Galaxy Z Flip series accurately in Chrome DevTools.


## Contact Form 

## Bootstrap Grid 

## Navbar and OffCanvas 

### Visible Items 

On Navbar, at 1321px and above, all the items in the Navbar ar evisible 

- Logo/Brand 
- Navbar items (left-aligned) 
- Navbar items with labels and icons (right-aligned)

At 1320px to 1130px, the labels of right-aligned items are hidden to ensure navbar doesnt become crowded. Only visible:

- Logo/Brand 
- Navbar items (left-aligned) 
- Navbar items with icons only (right-aligned)

At 1129px to 401px, left-aligned navbar items are hidden, showing only:

- Logo/Brand 
- Navbar items with icons only (right-aligned)
- Toggler icon for the collapsible menu

At 400px and below, only two items are shown:

- Logo/Brand 
- Toggler icon for the collapsible menu

### Using OffCanvas 

offCanvas is used in this project to style the collapsible navbar. At screen sizes 1129px and below,When toggler icon is clicked, a sidebar slides in from the right which contains the previously left-aligned navbar items. These items are stacked vertically in a column and are listed in this order:

- About 
- Shipping Services (dropdown)
- Logistics Solutions (dropdown)
- Business Solutions (dropdown) 
- Support (dropdown) 

### Offcanvas Widths 

At screen sizes 768px to 1129px, the OffCanvas sidebar slides in and takes up 50% of the screen or viewport width. 

At screen sizes 767px to 400px, the OffCanvas sidebar slides in and takes up 70% of the screen or viewport width. 





## Dynamically Populate Countries

To dynamically populate the country dropdown, I used a country-fetching Javscript:

- Fetch the list of countries using the Intl.DisplayNames API.
- Sort them alphabetically.
- Inject them into the `<select id="country">` dropdown.

Initial script:

```js
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const countrySelect = document.getElementById("country");

    // Keep the first placeholder option
    const placeholderOption = countrySelect.options[0];

    // Clear existing options except the placeholder
    countrySelect.innerHTML = "";
    countrySelect.appendChild(placeholderOption);

    // Get country names using Intl API
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

    const countries = Array.from(
      new Set(
        Intl.supportedValuesOf('region')
          .filter(code => /^[A-Z]{2}$/.test(code)) // Ensure ISO country codes
      )
    ).map(code => regionNames.of(code));

    // Sort alphabetically
    countries.sort((a, b) => a.localeCompare(b));

    // Append countries to the dropdown
    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      countrySelect.appendChild(option);
    });
  });
</script>
```

then configured the section in HTML:

```html
<body>
  <!-- Other sections above -->

    <div class="form-group">
      <div class="custom-select 
                  supp-sec-3-select-wrapper">
        <select class="form-control" 
                id="country">
          <option value="" disabled selected>Country/Region</option>
        </select>
        <img src="./icons/arrow-down.svg" class="dropdown-arrow" alt="arrow icon">
      </div>
    </div>

  <!-- Other sections below -->

  <script src="./src/js/fetch-countries.js"></script>

</body>
```

However this required a modern browser that supports `Intl.DisplayNames` and `Intl.supportedValuesOf` (Chrome 102+, Edge 102+, Firefox 103+, Safari 15.4+). Still tried it, but it didnt worked, did some troubleshooting

- Open browser's DevTools → Console
- Errors like "Uncaught ReferenceError" or 404 errors in the "Network" tab

Check if Intl.supportedValuesOf('region') is supported

This API is fairly new and may not work in older browsers (or older versions of Chromium-based browsers). Open the browser console and type:

```js
Intl.supportedValuesOf('region')
```

it throws an error:

![](/img/docs/Screenshot-2025-04-12-171659.png)

I also saw this error when i try the script:

```bash
fetch-countries.js:14 Uncaught RangeError: Invalid key : region
    at Intl.supportedValuesOf (<anonymous>)
    at HTMLDocument.<anonymous> (fetch-countries.js:14:12)
(anonymous)	@	fetch-countries.js:14 
```

Specific error:

```js
Uncaught RangeError: Invalid key : region
```

This means the browser doesn't support the API.

Solution: Use a fallback list of country codes

Instead of using an API, I opted for using a static list of country codes. Not the most automated, but it works. 

Script:

```js
document.addEventListener("DOMContentLoaded", function () {
  const countrySelect = document.getElementById("country");

  // Save and clear the placeholder
  const placeholder = countrySelect.querySelector("option[disabled]");
  countrySelect.innerHTML = "";
  countrySelect.appendChild(placeholder);

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  // Full ISO 3166-1 alpha-2 country code list
  const countryCodes = [
    "AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ",
    "BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BQ","BA","BW","BV","BR",
    "IO","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC",
    "CO","KM","CG","CD","CK","CR","CI","HR","CU","CW","CY","CZ","DK","DJ","DM","DO",
    "EC","EG","SV","GQ","ER","EE","SZ","ET","FK","FO","FJ","FI","FR","GF","PF","TF",
    "GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY",
    "HT","HM","VA","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM",
    "JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY",
    "LI","LT","LU","MO","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX",
    "FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI",
    "NE","NG","NU","NF","MK","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH",
    "PN","PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC",
    "WS","SM","ST","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS",
    "SS","ES","LK","SD","SR","SJ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK",
    "TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","UY","UZ","VU",
    "VE","VN","VG","VI","WF","EH","YE","ZM","ZW"
  ];

  const countries = countryCodes.map(code => ({
    code,
    name: regionNames.of(code)
  }));

  countries.sort((a, b) => a.name.localeCompare(b.name));

  countries.forEach(({ name }) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    countrySelect.appendChild(option);
  });
});
 
```

Further improvig: this script was using the elementID which is very specific. To make it reusable, I changed it to use lass name instead of an ID to target multiple dropdowns 

- Replace `getElementById` calls with `querySelectorAll` to select all elements with specific class.
- Use `forEach` loops to iterate over the elements with that class

Script:

```js
document.addEventListener("DOMContentLoaded", function () {
  const countrySelect = document.getElementById("country");

  // Save and clear the placeholder
  const placeholder = countrySelect.querySelector("option[disabled]");
  countrySelect.innerHTML = "";
  countrySelect.appendChild(placeholder);

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  // Full ISO 3166-1 alpha-2 country code list
  const countryCodes = [
    "AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ",
    "BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BQ","BA","BW","BV","BR",
    "IO","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC",
    "CO","KM","CG","CD","CK","CR","CI","HR","CU","CW","CY","CZ","DK","DJ","DM","DO",
    "EC","EG","SV","GQ","ER","EE","SZ","ET","FK","FO","FJ","FI","FR","GF","PF","TF",
    "GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY",
    "HT","HM","VA","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM",
    "JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY",
    "LI","LT","LU","MO","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX",
    "FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI",
    "NE","NG","NU","NF","MK","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH",
    "PN","PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC",
    "WS","SM","ST","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS",
    "SS","ES","LK","SD","SR","SJ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK",
    "TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","UY","UZ","VU",
    "VE","VN","VG","VI","WF","EH","YE","ZM","ZW"
  ];

  const countries = countryCodes.map(code => ({
    code,
    name: regionNames.of(code)
  }));

  countries.sort((a, b) => a.name.localeCompare(b.name));

  countries.forEach(({ name }) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    countrySelect.appendChild(option);
  });
});
```

## Navbar 

The script should **only attaches the dropdown-handling logic inside the `.offcanvas`** **when** screen width is `≤1129px`. That way:

- Offcanvas dropdowns behave correctly on small screens.
- Regular Bootstrap dropdowns work normally on large screens.



| Screen Width      | Behavior                      |
|-------------------|-------------------------------|
| ≤1129px (Mobile)  | Use your custom offcanvas script |
| >1129px (Desktop) | Let Bootstrap handle dropdowns |

No interference with regular dropdowns on large screens, and offcanvas dropdowns now behave as intended on mobile.

## Offcanvas Sidebar Behavior (Responsive Navigation)

This section describes the interactive behavior of the Bootstrap 5.3 offcanvas sidebar when used on screens 1129px wide and below.

- Toggler icon opens the sidebar and dims the background  
- Close button hides the sidebar and removes the dim  
- Clicking outside the sidebar closes it and removes the dim  
- Clicking non-dropdown links inside the sidebar:
  - Closes the sidebar  
  - Navigates to the section  
  - Removes the dim  
- Clicking a dropdown link inside the sidebar:
  - Expands the dropdown  
  - Shows the child items  
  - Keeps the sidebar open  
- Clicking a dropdown child item:
  - Closes the sidebar  
  - Navigates to the section  
  - Removes the dim  


