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

| Data Set | Alex (Weight in kg) | Alex (Height in m) | Jake (Weight in kg) | Jake (Height in m) |
|----------|---------------------|---------------------|---------------------|---------------------|
| **Data 1** | 78                  | 1.69                | 92                  | 1.95                |
| **Data 2** | 95                  | 1.88                | 85                  | 1.76                |

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

console.log(`Alex has a BMI of ${bmiAlex}`);
console.log(`Jake has a BMI of ${bmiJake}`);

const alexHigherBMI = bmiAlex > bmiJake;
console.log(`Does Alex have a higher BMI than Jake? ${alexHigherBMI}`);
```

Output:

```js
Alex has a BMI of 27.31
Jake has a BMI of 24.19
Does Alex have a higher BMI than Jake? true
```

A simpler way to write this is:

```js
const massAlex = 78, massJake = 92;
const heightAlex = 1.69, heightJake = 1.95;

const BMIAlex = (massAlex / (heightAlex ** 2)).toFixed(2);
const BMIJake = (massJake / (heightJake ** 2)).toFixed(2);
const higherBMI = BMIAlex > BMIJake;

console.log(`Alex has a BMI of ${BMIAlex}`);
console.log(`Jake has a BMI of ${BMIJake}`);
console.log(`Does Alex have a higher BMI than Jake? ${higherBMI}`);
```

Output:

```js
Alex has a BMI of 27.31
Jake has a BMI of 24.19
Does Alex have a higher BMI than Jake? true
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

console.log(`Alex has a BMI of ${bmiAlex}`);
console.log(`Jake has a BMI of ${bmiJake}`);

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
Alex has a BMI of 27.31
Jake has a BMI of 24.19
Alex has a higher BMI than Jake.
```

Another way to write this:

```js

const massAlex = 78, massJake = 92;
const heightAlex = 1.69, heightJake = 1.95;

const BMIAlex = (massAlex / (heightAlex ** 2)).toFixed(2);
const BMIJake = (massJake / (heightJake ** 2)).toFixed(2);
const higherBMI = BMIAlex > BMIJake;

function finalBMI() {
  if  (BMIAlex > BMIJake) {
    console.log(`Alex has a higher BMI than Jake.`);
  } else {
    console.log(`Jake has a higher BMI than Alex.`);
  }
}

console.log(`Alex has a BMI of ${BMIAlex}`);
console.log(`Jake has a BMI of ${BMIJake}`);

finalBMI();
```

Output:

```js
Alex has a BMI of 27.31
Jake has a BMI of 24.19
Alex has a higher BMI than Jake.
```

</details>


## Practice 3 

Two athletic teams, **Lions** and **Tigers**, compete in three rounds. The team with the highest average score wins the trophy!  

**Tasks:**  

1. Calculate each team's average score using the test data.  
2. **Round 1** Compare the scores and determine the winner. If both teams have the same average, it's a draw.  
3. **Round 2:** A team only wins if its average score is **higher than the other team** and **at least 100 points**.  
4. **Round 3:** A draw only happens if both teams have the **same average** and **at least 100 points**. Otherwise, no team wins.  


**Data:**

| Dataset      | Lions Scores     | Tigers Scores    |
|--------------|------------------|-----------------|
| **Round 1**  | 96, 108, 89      | 88, 91, 110     |
| **Round 2**  | 97, 112, 101     | 109, 95, 123    |
| **Round 3**  | 97, 112, 101     | 109, 95, 106    |


<details>
  <summary> **Solution** </summary>

Round 1:

```js
const scoreLions= [96, 108, 89], scoreTigers = [88, 91, 110];

const getScore = (sum, score) => sum + score;
const getAverage = scores => scores.reduce(getScore, 0) / scores.length;

function getWinner(lions, tigers) {
  const avgLions = getAverage(scoreLions).toFixed(2);
  const avgTigers = getAverage(scoreTigers).toFixed(2);
  console.log(`Lions average score: ${avgLions},\nTigers average score: ${avgTigers}`);

  if (avgLions > avgTigers) {
    console.log("Lions win the trophy! 🏆");
  } else if (avgLions < avgTigers) {
    console.log("Tigers win the trophy! 🏆");
  } else if (avgLions === avgTigers) {
    console.log("It's a draw! 🏆");
  } else {
    console.log("No team wins the trophy! 😢");
  }
}

getWinner(scoreLions, scoreTigers);
```

Output:

```js
Lions average score: 97.67,
Tigers average score: 96.33
  
Lions win the trophy! 🏆  
```

Round 2:

```js
const scoreLions= [97, 112, 101], scoreTigers = [109, 95, 123];

const getScore = (sum, score) => sum + score;
const getAverage = scores => scores.reduce(getScore, 0) / scores.length;

function getWinner(lions, tigers) {
  const avgLions = getAverage(scoreLions).toFixed(2);
  const avgTigers = getAverage(scoreTigers).toFixed(2);
  console.log(`Lions average score: ${avgLions},\nTigers average score: ${avgTigers}`);

  if (avgLions > avgTigers && avgLions >= 100) {
    console.log("Lions win the trophy! 🏆");
  } else if (avgLions < avgTigers && avgTigers >= 100) {
    console.log("Tigers win the trophy! 🏆");
  } else if (avgLions === avgTigers && avgLions >= 100 && avgTigers >= 100) {
    console.log("It's a draw! 🏆");
  } else {
    console.log("No team wins the trophy! 😢");
  }
}

getWinner(scoreLions, scoreTigers);
```

Output:

```js
Lions average score: 103.33,
Tigers average score: 109.00
  
Tigers win the trophy! 🏆 
```

For round 3, simply substitute the values to the second solution above.

</details>

## Practice 4 

Robin wants a simple tip calculator for dining out. In his country:  

- A **15% tip** is given when the bill is **between 50 and 300** (inclusive).  
- Otherwise, a **20% tip** is applied.  

**Tasks:**  

1. Calculate the tip based on the bill amount. Store it in a variable `tip` (without using `if/else`).  
2. Print a message showing the **bill**, **tip**, and **total amount (bill + tip)**.  

**Test Data:**  

| Bill Amount | Expected Tip | Total Amount |
|-------------|--------------|--------------|
| 275         | 41.25        | 316.25       |
| 40          | 8.00         | 48.00        |
| 430         | 86.00        | 516.00       |  


<details>
  <summary> **Solution** </summary>

Using the third data:

```js
const bill = 430

const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20; 
const total = bill + tip;

console.log(`Bill: ${bill}\nTip: ${tip}\nTotal: ${total}`)
```

Output:

```js
Bill: 430
Tip: 86
Total: 516 
```


</details>


## Practice 5