## Pennywise

Pennywise is a simple static HTML project for tracking monthly income and expenses. It features a clean Bootstrap 5 interface with two tabs:

| Tab   | Description |
|-------|-------------|
| **Data**  | Enter your income and expenses for each month (January to December). All fields are pre-filled with zero for convenience. Input validation ensures only non-negative numbers are accepted. |
| **Chart** | View a bar chart of your income and expenses by month, powered by Chart.js. The chart updates in real time as you type in the Data tab. |

## Prompt Used

This project was created using the following prompt:

```markdown
This is a static html project called "Pennywise".
We need a UI library for styling and we need income and expense inputs for months January to December.

The UI should be split into 2 tabs:

- Data - This tab will have the inputs for income and expenses for each month
- Chart - This tab will show a bar chart of the income and expenses from the inputs in the data tab

We will need a chart library to create the bar chart in the Chart tab. We can use Chart.js for this purpose.
We don't need data persistence for this project, so we can store the input data in memory while the user is on the page.
We want input validation to ensure that the user enters valid numbers for income and expenses.
Use Bootstrap version 5 for the UI library to style the tabs and inputs.
Update the chart automatically as users type in the data tab, so they can see the changes reflected in real-time on the chart tab.
Pre-filled the inputs with zeroes for better user experience.
Add default values between 50 and 1000 for income and expenses to make the chart more visually appealing when the page loads.

Build out a "Download Chart" button in the script.js file. This should allow users to download the current state of the chart as a PNG image when they click the "Download Chart" button in the Chart tab.
```

## Troubleshooting

### Chart appear empty

If you open `index.html` directly in Chrome (using a `file://` URL), the Chart may appear empty:

<div class='img-center'>

![](/img/docs/gh-copilot-pwise-1.png)

</div>

If you open Developer Tools and check the console, you may see errors like:

```
script.js:1  Failed to load resource: net::ERR_ACCESS_DENIED
index.html:1 Unsafe attempt to load URL file:///... 'file:' URLs are treated as unique security origins.
```

<div class='img-center'>

![](/img/docs/gh-copilot-pwise-2.png)

</div>

This happens because Chrome blocks some JavaScript operations for security reasons when using `file://` URLs. 

To fix this, run a local web server and open the project in your browser using `http://localhost`.

In VS Code, you can use the "Live Server" extension to easily serve the project. Just right-click on `index.html` and select "Open with Live Server".

**UPDATE:** I've updated the code to generate random default values for income and expenses.

<div class='img-center'>

![](/img/docs/gh-copilot-pwise-3.png)

</div>

Chart tab:

<div class='img-center'>

![](/img/docs/gh-copilot-pwise-4.png)

</div>

