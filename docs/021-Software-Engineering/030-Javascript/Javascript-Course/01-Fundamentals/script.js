// let js = "amazing";
// console.log(40 + 8 + 23 - 10); 

// console.log("John");
// console.log(23);

// let firstName = "Jane";
// console.log(firstName);

// // Data Types
// let javascriptIsFun = true;
// console.log(javascriptIsFun);
// console.log(typeof javascriptIsFun);

// Using const 
// const name = 'Ken';
// name = 'Barbie';

// Template Literals 
// let firstName = "John";
// const introNew = `I'm ${firstName}`;
// console.log(introNew);

// let name = "Alice";
// let text2 = `Hello ${name},
// How are you doing?`;
// console.log(text2);

// text2 = `Hello ${name},
//   How are you doing?    // Indentation also matters
//   Are you having a good day?`;
// console.log(text2);


// const year = `1995`;
// console.log(year, Number(year));
// console.log(typeof(year), typeof(Number(year)));
// console.log(year + 2009);
// console.log(Number(year) + 35);


// console.log(`45` - `13` - `8`);
// console.log(`24` / `2`);
// console.log(`100` * `2`);
// console.log(`25` < `49`);         // Output: True


// console.log(Boolean(0));       // false
// console.log(Boolean(``));      // false
// console.log(Boolean(`Jonas`)); // true
// console.log(Boolean({}));      // true


// let money = 0;
// if (money) {
//   console.log(`Don't spend it all!`);
// } else {
//   console.log(`You should get a job.`); // This runs because 0 is falsy
// }


// let height;
// if (height) {
//   console.log(`Yay! Height is defined.`);
// } else {
//   console.log(`Height is undefined.`);
// } 


// height = 0;
// if (height) {
//   console.log(`Height is defined.`);
// } else {
//   console.log(`Height is undefined.`); // This also runs because 0 is falsy
// } 


// let a = true;
// let b = false;

// console.log(a && b);    // AND: false (both must be true)
// console.log(a || b);    // OR:  true (at least one must be true)
// console.log(!a);        // NOT: false (inverts the value)
// console.log(!b);        // NOT: true
// console.log(a && !b);   // AND: true
// console.log(a || !b);   // OR:  true

// let a = true;
// let b = false;
// let c = true;
// console.log(a && b && c);  // false
// console.log(a && b || c);  // true
// console.log(a || b && c);  // true
// console.log(a || b || c);  // true


// const licensed = true;
// const clearVision = false; 

// console.log(licensed && clearVision);   // false 
// console.log(licensed || clearVision);   // true

// const shouldDrive = licensed && clearVision;

// if (shouldDrive) {
//   console.log(`You are able to drive.`);
// } else {
//   console.log(`You are not able to drive.`);
// }


// const day = prompt("What day is it today?");

// switch (day) {
//   case 'Monday':
//     console.log(`Attend the sprint retroactive today.`);
//     break;
//   case 'Tuesday':
//     console.log(`Work on the feature requests today.`);
//     break;
//   case 'Wednesday':
//     console.log(`Meeting with the Vendor in the afternoon.`);
//     break;
//   case 'Thursday':
//     console.log(`Test the changes in Dev environment`);
//     break;
//   case 'Friday':
//     console.log(`Update the team`);
//     break;
//   default:
//     console.log("Invalid day");
// }



// const age = 18;
// const canVote = age >= 18 ? 'Yes, you can vote' : 'No, you cannot vote';
// console.log(canVote);

// const bill = prompt("How much is the bill?");
// const tip = (bill >= 50 && bill <= 300) ? bill * 0.15 : bill * 0.20;
// const total = Number(bill) + Number(tip);

// console.log(`The bill was ${bill}, the tip was ${tip}, and the total value is ${total} `);


// function logger() {
//   console.log("My name is John");
// }

// logger();

// function greet(name) {
//   console.log(`Hello, ${name}!`);
// }

// greet("Alice");  // Output: Hello, Alice!

'use strict'

// function fruitjuices(apples, oranges) {
//   const drinks = `Order for ${apples} apple juice and ${oranges} orange juice.`; 
//   return drinks;
// }

// const drinkOrders = fruitjuices(6,3)
// console.log(drinkOrders);

// const getAge = function (birthYear) {
//   return 2025 - birthYear;
// }

// const actualAge = getAge(1990);
// console.log(actualAge);

// logger();             // Output: "My name is John"

// function logger() {
//   console.log("My name is John");
// }



// const actualAge = getAge(1990);

// const getAge = function (birthYear) {
//   return 2025 - birthYear;
// }

// console.log(actualAge); 


// const getAge = birthYear => 2025 - birthYear;
// const actualAge = getAge(1990);
// console.log(actualAge);



// const yearsBeforeRetirement = birthYear => {
//   const getAge = 2025 - birthYear;
//   const retirement = 65 - getAge;
//   return retirement;
// }

// const actualAge = yearsBeforeRetirement(1990);
// console.log(actualAge);



// const yearsBeforeRetirement = (birthYear, firstName) => {
//   const getAge = 2025 - birthYear;
//   const retirement = 65 - getAge;
//   return `${firstName} will retire in ${retirement} years`;
// }

// console.log(yearsBeforeRetirement(1990, 'John'));
// console.log(yearsBeforeRetirement(1988, 'Ted'));
// console.log(yearsBeforeRetirement(1997, 'Andy'));
// console.log(yearsBeforeRetirement(1979, 'Robin'));


// Calling Other Functions  
// const getAge = birthYear => 2025 - birthYear;

// const yearsBeforeRetirement = (birthYear, firstName) => {
//   const age = getAge(birthYear);
//   const retirement = 65 - age;
//   return `${firstName} will retire in ${retirement} years`;
// }

// console.log(yearsBeforeRetirement(1990, 'John'));
// console.log(yearsBeforeRetirement(1985, 'Sarah'));  


// Practice 1 - Compare BMI
// const dataAlex = { weight: 95, height: 1.88};
// const dataJake = { weight: 85, height: 1.76};

// function getBMI(weight, height) {
//   return (weight / (height * height)).toFixed(2);
// }

// const bmiAlex = getBMI(dataAlex.weight, dataAlex.height)
// const bmiJake = getBMI(dataJake.weight, dataJake.height)

// console.log(`Alex has BMI of ${bmiAlex}`);
// console.log(`Jake has BMI of ${bmiJake}`);

// function finalBMI() {
//   if ( bmiAlex > bmiJake) {
//     console.log(`Alex has a higher BMI than Jake.`);
//   } else {
//     console.log(`Jake has a higher BMI than Alex.`);
//   }
// }

// finalBMI();




// const massAlex = 78, massJake = 92;
// const heightAlex = 1.69, heightJake = 1.95;

// const BMIAlex = (massAlex / (heightAlex ** 2)).toFixed(2);
// const BMIJake = (massJake / (heightJake ** 2)).toFixed(2);
// const higherBMI = BMIAlex > BMIJake;

// function finalBMI() {
//   if  (BMIAlex > BMIJake) {
//     console.log(`Alex has a higher BMI than Jake.`);
//   } else {
//     console.log(`Jake has a higher BMI than Alex.`);
//   }
// }

// console.log(`Alex has a BMI of ${BMIAlex}`);
// console.log(`Jake has a BMI of ${BMIJake}`);
// // console.log(`Does Alex have a higher BMI than Jake? ${higherBMI}`);
// finalBMI();



// Practice 3 
// const scoreLions= [97, 112, 101], scoreTigers = [109, 95, 123];

// const getScore = (sum, score) => sum + score;
// const getAverage = scores => scores.reduce(getScore, 0) / scores.length;

// function getWinner(lions, tigers) {
  
//   const avgLions = getAverage(scoreLions).toFixed(2);
//   const avgTigers = getAverage(scoreTigers).toFixed(2);

//   console.log(`Lions average score: ${avgLions},\nTigers average score: ${avgTigers}
//   `);

//   if (avgLions > avgTigers && avgLions >= 100) {
//     console.log("Lions win the trophy! 🏆");
//   } else if (avgLions < avgTigers && avgTigers >= 100) {
//     console.log("Tigers win the trophy! 🏆");
//   } else if (avgLions === avgTigers && avgLions >= 100 && avgTigers >= 100) {
//     console.log("It's a draw! 🏆");
//   } else {
//     console.log("No team wins the trophy! 😢");
//   }
// }

// getWinner(scoreLions, scoreTigers);



// Practice 4 
const bill = 430

const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20; 
const total = bill + tip;

console.log(`Bill: ${bill}\nTip: ${tip}\nTotal: ${total}`)