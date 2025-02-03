---
title: "Coding Challenges"
description: "Coding Challenges in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Javascript
sidebar_position: 30
last_update:
  date: 12/21/2020
---

## Practice 1 

Alex and Jake want to compare their BMI (Body Mass Index), calculated as:  

```bash
BMI = mass / height² (mass in kg, height in meters)  
```

**Tasks:**  

1. Store Alex's and Jake's weight and height in variables.  
2. Calculate their BMIs using the formula.  
3. Create a Boolean variable `alexHigherBMI` to check if Alex's BMI is higher than Jake's.  

**Test Data:**  

- Data 1:
  - Alex: 78 kg, 1.69 m
  - Jake: 92 kg, 1.95 m  

- Data 2:
  - Alex: 95 kg, 1.88 m
  - Jake: 85 kg, 1.76 m


<details>
  <summary> **Solution** </summary>

Using first test data:

```js
const dataAlex = { weight: 78, height: 1.69};
const dataJake = { weight: 92, height: 1.95};

function getBMI(weight, height) {
  return (weight / (height * height)).toFixed(2);
}

const bmiAlex = getBMI(dataAlex.weight, dataAlex.height)
const bmiJake = getBMI(dataJake.weight, dataJake.height)

console.log(`Alex has BMI of ${bmiAlex}`);
console.log(`Jake has BMI of ${bmiJake}`);

const alexHigherBMI = bmiAlex > bmiJake;
console.log(`Does Alex have a higher BMI? ${alexHigherBMI}`);
```

Output:

```js
Alex has BMI of 27.31
Jake has BMI of 24.19
Does Alex have a higher BMI? true
```

Using second test data:

```js
const dataAlex = { weight: 95, height: 1.88};
const dataJake = { weight: 85, height: 1.76};

function getBMI(weight, height) {
  return (weight / (height * height)).toFixed(2);
}

const bmiAlex = getBMI(dataAlex.weight, dataAlex.height)
const bmiJake = getBMI(dataJake.weight, dataJake.height)

console.log(`Alex has BMI of ${bmiAlex}`);
console.log(`Jake has BMI of ${bmiJake}`);

const alexHigherBMI = bmiAlex > bmiJake;
console.log(`Does Alex have a higher BMI? ${alexHigherBMI}`);
```

Output:

```js
Alex has BMI of 26.88
Jake has BMI of 27.44
Does Alex have a higher BMI? false
```

</details>


## Practice 2

Improve on practice 1, and modify the code to print either of the two:

- `Alex has a higher BMI than Jake.`
- `Jake has a higher BMI than Alex.`

Use the same set of test data.

<details>
  <summary> **Solution** </summary>

Using first test data:

```js
const dataAlex = { weight: 78, height: 1.69};
const dataJake = { weight: 92, height: 1.95};

function getBMI(weight, height) {
  return (weight / (height * height)).toFixed(2);
}

const bmiAlex = getBMI(dataAlex.weight, dataAlex.height)
const bmiJake = getBMI(dataJake.weight, dataJake.height)

console.log(`Alex has BMI of ${bmiAlex}`);
console.log(`Jake has BMI of ${bmiJake}`);

function finalBMI() {
  if ( bmiAlex > bmiJake) {
    console.log(`Alex has a higher BMI than Jake.`);
  } else {
    console.log(`Jake has a higher BMI than Alex.`);
  }
}

finalBMI();
```

Output:

```js
Alex has BMI of 27.31
Jake has BMI of 24.19
Alex has a higher BMI than Jake.
```

Using second test data:

```js
const dataAlex = { weight: 95, height: 1.88};
const dataJake = { weight: 85, height: 1.76};

function getBMI(weight, height) {
  return (weight / (height * height)).toFixed(2);
}

const bmiAlex = getBMI(dataAlex.weight, dataAlex.height)
const bmiJake = getBMI(dataJake.weight, dataJake.height)

console.log(`Alex has BMI of ${bmiAlex}`);
console.log(`Jake has BMI of ${bmiJake}`);

const alexHigherBMI = bmiAlex > bmiJake;
console.log(`Does Alex have a higher BMI? ${alexHigherBMI}`);
```

Output:

```js
Alex has BMI of 26.88
Jake has BMI of 27.44
Jake has a higher BMI than Alex.
```

</details>
