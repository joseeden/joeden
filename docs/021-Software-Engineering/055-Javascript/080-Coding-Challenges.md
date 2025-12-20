---
title: "Coding Challenges"
description: "Coding Challenges in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Javascript
sidebar_position: 80
last_update:
  date: 12/21/2020
---

## Practice 01 

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


## Practice 02

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


## Practice 03 

Two athletic teams, **Lions** and **Tigers**, compete in three rounds. The team with the highest average score wins the trophy!  

**Tasks:**  

1. Calculate each team's average score using the test data.  
2. Compare the scores and determine the winner. If both teams have the same average, it's a draw.  
3. A team only wins if its average score is **higher than the other team** and **at least 100 points**.  
4. **Bonus Round:** A draw only happens if both teams have the **same average** and **at least 100 points**. Otherwise, no team wins.  


**Data:**

| Dataset      | Lions Scores     | Tigers Scores    |
|--------------|------------------|-----------------|
| **Round 1**  | 96, 108, 89      | 88, 91, 110     |
| **Round 2**  | 97, 112, 101     | 109, 95, 123    |
| **Bonus Round**  | 97, 112, 101     | 109, 95, 106    |
x

<details>
  <summary> **Solution** </summary>

To start with, create the function the first set of scores from round 1.

```js
const getAve = (a, b, c) => (a + b + c)/3;
console.log(getAge(86, 108, 90))
```

Now compute for both teams:

```js
const scoreLions = getAve(96, 108, 89);
const scoreTigers = getAve(88, 91, 110);
console.log(scoreLions);                  // Output: 97.66666666666667   
console.log(scoreTigers);                 // Output: 96.33333333333333
```

To round off to two decimal points,

```js
console.log(scoreLions.toFixed(2));       // Output: 97.67  
console.log(scoreTigers.toFixed(2));      // Output: 96.33
```


**The ES6 way of computing average**

As of ES6, the shorter way of computing average:

```js
const average = array => array.reduce((a, b) => a + b) / array.length;
console.log(average([1,2,3,4,5])) 
```

Explanation:

In `reduce((a, b) => a + b)`, the function takes two parameters:  

- `a`: The accumulated sum (starts with the first element by default).  
- `b`: The current element being processed.  

Let's say we have an array:

```js
const mynumbers = [1, 3, 4, 8, 2];
```

If we want to get the average of the list:

```js
const getAverage => getAverage.reduce((a, b) => a + b) / mynumbers.length;
console.log(getAverage(mynumbers));
```

1. **First iteration** → `a = 1`, `b = 3` → `1 + 3 = 4`  
2. **Second iteration** → `a = 4`, `b = 4` → `4 + 4 = 8`  
3. **Third iteration** → `a = 8`, `b = 8` → `8 + 8 = 16`  
4. **Fourth iteration** → `a = 16`, `b = 2` → `16 + 2 = 18`  

Final sum = `18`.  

When divided by the array length (`5`), the average is:  

```js
18 / 5 = 3.6
```


**Going back to the challenge:**

- **Round 1:**

    ```js
    // average is (a + b + c)/number of itema
    // Below is the ES6 way
    const getAve = array => array.reduce((a, b) => a + b) / array.length;

    function checkWinner(scores1, scores2) {
      const aveLions = getAve(scores1).toFixed(2);
      const aveTigers = getAve(scores2).toFixed(2);
      console.log(`Average scores per team:`)
      console.log(`Lions: ${aveLions}\nTigers: ${aveTigers}\n`)

      if (aveLions > aveTigers && aveLions >= 100) {
        console.log(`Lions wins the trophy! 🏆`)
      } else if (aveLions < aveTigers && aveTigers >= 100) {
        console.log(`Tigers wins the trophy! 🏆`)
      } else {
        console.log(`It's a draw!`)
      }
    };

    console.log(`Round 1:`)
    checkWinner(round1Lions, round1Tigers);
    ```

    Output:

    ```js
    Average scores per team:
    Lions: 97.67
    Tigers: 96.33

    Lions wins the trophy! 🏆  
    ```

- **Round 2:**

    ```js
    console.log(`Round 2:`)
    checkWinner(round2Lions, round2Tigers);
    ```

    Output:

    ```js
    Lions average score: 103.33,
    Tigers average score: 109.00
      
    Tigers win the trophy! 🏆 
    ```

- **Bonus Round:**

    ```js
    const round1Lions = [96, 108, 89], 
          round2Lions = [97, 112, 101],
          round3Lions = [97, 112, 101],
          round1Tigers = [88, 91, 110],
          round2Tigers = [109, 95, 123],
          round3Tigers = [109, 95, 106];

    // average is (a + b + c)/number of itema
    // Below is the ES6 way
    const getAve = array => array.reduce((a, b) => a + b) / array.length;

    function checkWinner(scores1, scores2) {
      const aveLions = getAve(scores1).toFixed(2);
      const aveTigers = getAve(scores2).toFixed(2);
      console.log(`Average scores per team:`)
      console.log(`Lions: ${aveLions}\nTigers: ${aveTigers}\n`)

      if (aveLions > aveTigers && aveLions >= 100) {
        console.log(`Lions wins the trophy! 🏆`)
      } else if (aveLions < aveTigers && aveTigers >= 100) {
        console.log(`Tigers wins the trophy! 🏆`)
      } else if (aveLions === aveTigers && aveLions >= 100 && aveTigers >= 100) {
        console.log(`It's a draw! 🏆`)
      }else {
        console.log(`No winner!`)
      }
    };

    console.log(`Bonus Round:`)
    checkWinner(round3Lions, round3Tigers); 
    ```

    Output:

    ```js
    Bonus Round:
    Average scores per team:
    Lions: 103.33
    Tigers: 103.33

    It's a draw! 🏆 
    ```

</details>

## Practice 04 

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

Uncomment the lines for the `const bill` to use each test data:

```js
const bill = 275;       // Uncomment to use 1st data
// const bill = 40;     // Uncomment to use 2nd data
// const bill = 430;    // Uncomment to use 3rd data

const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
const total =  bill + tip;
console.log(`Tip: ${tip}`);
console.log(`Total: ${total}`);
```

Output for test data 1:

```js
Bill: 430
Tip: 86
Total: 516 
```

</details>


## Practice 05

Alex is working on a tip calculator with these rules:  
- If the bill is between 50 and 300, the tip is 15%.  
- Otherwise, the tip is 20%.  

**Tasks:**  

1. Write a function `calculateTip` that takes a bill amount and returns the tip based on the rules above. Test it with a bill of 100. Tip should be 15.
2. Create an array `bills` with the test values: **120, 500, and 40**.  
3. Create an array `tips` that stores the calculated tips using `calculateTip`.  
4. **Bonus:** Create an array `total` that holds the final amounts (bill + tip).  

💡 **Hint:** You can call the function directly inside the array instead of storing tip values separately.

**Test Data:**  

| Bills ($)  | Expected Tip ($) | Total Amount ($) |  
|------------|----------------|----------------|  
| 120        | 18             | 138            |  
| 500        | 100            | 600            |  
| 40         | 8              | 48             |  



<details>
  <summary> **Solution** </summary>

```js
const bill = 100;                 // initial test data for the calculateTip

function calculateTip(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
};

console.log(calculateTip(bill));  // Output: 100


const bills = [120, 500, 40];
const tips = [];
const total = [];

for (const x of bills){
  const tip = calculateTip(x);
  tips.push(tip);
  total.push(x + tip);
};

console.log(tips);        // Output: [18, 100, 8]
console.log(total);       // Output: [138, 600, 48] 
```


</details>


## Practice 06 

Let's compare two individuals' BMIs using objects and methods. The Body Mass Index (BMI) is calculated using the formula:  

```bash
BMI = mass / height² (mass in kg, height in meters)  
```

where mass is in kg and height is in meters.  

**Tasks:**

1. Create an object for each person with properties for their full name, mass, and height.  
2. Add a `calcBMI` method to each object that calculates and stores the BMI, returning it as well.  
3. Compare their BMIs and log the person with the higher BMI.  

**Test Data:**

| Name         | Mass (kg) | Height (m) |
|-------------|----------|-----------|
| Alex Brown  | 85       | 1.75      |
| Jake Wilson | 95       | 1.88      |

<details>
  <summary> **Solution** </summary>

```js
const userAlex = {
  name: "Alex Brown",
  mass: 85,
  height: 1.75,

  calcBMI: function () {
    this.bmi = this.mass / (this.height ** 2)
    return this.bmi
  }
}

const userJake = {
  name: "Jake Wilson",
  mass: 95,
  height: 1.88,

  calcBMI: function() {
    this.bmi = this.mass / (this.height ** 2)
    return this.bmi 
  }
}

const bmiAlex = userAlex.calcBMI().toFixed(2);
const bmiJake = userJake.calcBMI().toFixed(2);

console.log(`${userAlex.name}: ${bmiAlex}`);
console.log(`${userJake.name}: ${bmiJake}`);

if (userAlex.calcBMI().toFixed(2)) {
  console.log(`${userAlex.name} has a higher BMI than ${userJake.name}`);
} else {
  console.log(`${userJake.name} has a higher BMI than ${userAlex.name}`);
} 
```

</details>


## Practice 07 

Alex is working on a tip calculator with these rules:  

- If the bill is between 50 and 300, the tip is 15%.  
- Otherwise, the tip is 20%.  

**Steps:**  

1. Create an array `bills` containing 10 test values.  
2. Create empty arrays `tips` and `total` for tips and total values.  
3. Calculate the tip and total (bill + tip) for each value in `bills`. Use a loop to do this for all 10 values.  

**Bonus:**  

1. Create a `computeAverage` function that takes an array `arr` and returns the average of its values.  
   - Start with a `sum` variable at 0.  
   - Use a loop to add up all values in the array.  
   - Divide `sum` by the number of elements to get the average.  
2. Call `computeAverage` with the `finalAmounts` array.  


**Test Data:**  

| Bill Amount | Expected Tip | Expected Total |  
|-------------|-------------|---------------|  
| 18         | 3.60        | 21.60         |  
| 320        | 64.00       | 384.00        |  
| 150        | 22.50       | 172.50        |  
| 500        | 100.00      | 600.00        |  
| 45         | 9.00        | 54.00         |  
| 98         | 14.70       | 112.70        |  
| 12         | 2.40        | 14.40         |  
| 900        | 180.00      | 1,080.00      |  
| 75         | 11.25       | 86.25         |  
| 60         | 9.00        | 69.00         |  

Average:

| Category   | Average    |
|------------|------------|
| Bill       | 217.80     |
| Tip        | 41.64      |
| Total      | 259.44     |

<details>
  <summary> **Solution** </summary>

Computing the tips and total:

```js
const bills = [18, 320, 150, 500, 45, 98, 12, 900, 75, 60];

function calculateTip(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
};
  
for (const x of bills){
  const tip = calculateTip(x);
  const totalBill = x + tip;
  console.log(`Tip: ${tip.toFixed(2)}, Total: ${totalBill.toFixed(2)}`)
};
```

Output:

```js
Tip: 3.60, Total: 21.60
Tip: 64.00, Total: 384.00
Tip: 22.50, Total: 172.50
Tip: 100.00, Total: 600.00
Tip: 9.00, Total: 54.00
Tip: 14.70, Total: 112.70
Tip: 2.40, Total: 14.40
Tip: 180.00, Total: 1080.00 
Tip: 11.25, Total: 86.25
Tip: 9.00, Total: 69.00 
```

We can also forward the tips and total to their own arrays.

```js
const bills = [18, 320, 150, 500, 45, 98, 12, 900, 75, 60];
const tips = [], total = [];

function calculateTip(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
};
  

for (const x of bills){
  const tip = calculateTip(x);
  const totalBill = x + tip;
  tips.push(tip.toFixed(2))
  total.push(totalBill.toFixed(2))
};

console.log(tips);
console.log(total);  
```

Output:

```js
Tips: 3.60,64.00,22.50,100.00,9.00,14.70,2.40,180.00,11.25,9.00

Total: 21.60,384.00,172.50,600.00,54.00,112.70,14.40,1080.00,86.25,69.00
```

**Bonus:**

Create the `computeAverage` function which will compute the average of the array provided. In this case, the `bills` array.

```js

const bills = [18, 320, 150, 500, 45, 98, 12, 900, 75, 60];
const tips = [], total = [];

function calculateTip(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
};
  
for (const x of bills){
  const tip = calculateTip(x);
  const totalBill = x + tip;
  tips.push(tip.toFixed(2))
  total.push(totalBill.toFixed(2))
};

function computeAverage(arr) {
  let sum = 0;
  
  for (const i of arr) {
    sum = sum + i;
  }

  return sum / arr.length
}

console.log(`Average of Bills: ${computeAverage(bills)}`);
console.log(`Average of Tips: ${computeAverage(tips)}`);
console.log(`Average of Total Bills: ${computeAverage(total)}`); 
```

Note that if you try to use the `computeAverage` function to get the average of the `tips` and `total` arrays, you will get an `NaN` response.

**Reason:** The `tips` and `total` contain **string values** due to `.toFixed(2)`, which returns a string. Since `computeAverage(arr)` performs arithmetic operations, JavaScript treats them as **NaN** when trying to add strings as numbers.  

To fix this, conver the value to number format before they are "pushed" to the array:

```js
for (const x of bills) {
  const tip = calculateTip(x);
  const totalBill = x + tip;
  tips.push(Number(tip.toFixed(2)));        // Convert to number
  total.push(Number(totalBill.toFixed(2))); // Convert to number
}

console.log(`Average of Bills: ${computeAverage(bills)}`);
console.log(`Average of Tips: ${computeAverage(tips).toFixed(2)}`);
console.log(`Average of Total Bills: ${computeAverage(total).toFixed(2)}`);
```

This should now return the correct values:

```bash
Average of Bills: 217.8
Average of Tips: 41.64
Average of Total Bills: 259.44 
```

</details>



## Practice 08

We have a set of temperature measurements from a sensor. We need to get the amplitude of the temperature records. Any invalid temperatures should be ignored.

💡 **Hint:** Amplitude means the difference between the highest and lowest temperature recorded.

**Test Data:**

| Temperatures            | Expected Min | Expected Max | Expected Amplitude |
|-------------------------|--------------|--------------|--------------------|
| [3, 2, 5, 1, 14]        | 1            | 14           | 13                 |
| [10, 20, 30, 40]        | 10           | 40           | 30                 |
| [5, 'a', 7, 2, 9]       | 2            | 9            | 7                  |
| [5, 3, 7, 2, 9]         | 2            | 9            | 7                  |
| [-5, -10, -3, -8]       | -10          | -3           | 7                  |
| [11, -8, undefined, 20] | -8           | 20           | 28                 |


<details>
  <summary> **Solution** </summary>

Understanding the problem:

- Get the highest temperature (max) in the list
- Get the lowest temperature (min) in the list
- Subtract max from min, and return 

Attacking the problem:

- Assume the first item in the list is the `max`
- Compare all other items to the `max` 
- If type of next item is not "number", skip and proceed to next item
- If next item is higher than `max`, set this item as new `max`
- Repeat process until you reach the last item of the list 
- To get the lowest temp, do the same step, but save value to `min`

Solution:

```js
const arr = [11, -8, undefined, 20]     // Replace with other test data

function getAmplitude(temps) {
  let max = temps[0];
  let min = temps[0];

  for (const x of temps) {

    if (typeof x !== 'number') {
      continue;
    }

    if (x >= max) {
      max = x;
    }

    if (x <= min) {
      min = x;
    }
  };

  const amplitude = max - min;
  return { max, min, amplitude };

};

const amp = getAmplitude(arr);

console.log(`Min temp: ${amp.min}`);
console.log(`Max temp: ${amp.max}`);
console.log(`Amplitude: ${amp.amplitude}`);
```


</details>


## Practice 09
