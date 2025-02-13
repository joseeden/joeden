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


//-------------------------------------------------------------------------

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


//-------------------------------------------------------------------------


// Practice 3 
// const round1Lions = [96, 108, 89], 
//       round2Lions = [97, 112, 101],
//       round3Lions = [97, 112, 101],
//       round1Tigers = [88, 91, 110],
//       round2Tigers = [109, 95, 123],
//       round3Tigers = [109, 95, 106];

// // average is (a + b + c)/number of itema
// // Below is the ES6 way
// const getAve = array => array.reduce((a, b) => a + b) / array.length;

// function checkWinner(scores1, scores2) {
//   const aveLions = getAve(scores1).toFixed(2);
//   const aveTigers = getAve(scores2).toFixed(2);
//   console.log(`Average scores per team:`)
//   console.log(`Lions: ${aveLions}\nTigers: ${aveTigers}\n`)

//   if (aveLions > aveTigers && aveLions >= 100) {
//     console.log(`Lions wins the trophy! 🏆`)
//   } else if (aveLions < aveTigers && aveTigers >= 100) {
//     console.log(`Tigers wins the trophy! 🏆`)
//   } else if (aveLions === aveTigers && aveLions >= 100 && aveTigers >= 100) {
//     console.log(`It's a draw! 🏆`)
//   }else {
//     console.log(`No winner!`)
//   }
// };

// console.log(`Bonus Round:`)
// checkWinner(round3Lions, round3Tigers);


//-------------------------------------------------------------------------


// Practice 4

// const bill = 275;
// const bill = 40;
// const bill = 430;

// const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
// const total =  bill + tip;
// console.log(`Bill: ${bill}`)
// console.log(`Tip: ${tip}`);
// console.log(`Total: ${total}`);

// const friends = ["Michael", "Steven", "Peter"];
// console.log(friends);

// const years = new Array(1991, 1984, 2008, 2020);
// console.log(years);

// console.log(friends[friends.length - 1]); 

//--------------------------------------------------------------


// const person = ["James", "Smith", 25, "Architect"];     // first Array
// const organization = 'ABC Holdings';                    // variable
// const platform = ["Singapore", organization, person]
// console.log(platform);


const friends = ["Michael", "Steven", "Peter", "Jay"] 
friends.pop();  
console.log(friends); // ["John", "Michael", "Steven", "Peter"]

friends.push(23);
console.log(friends);