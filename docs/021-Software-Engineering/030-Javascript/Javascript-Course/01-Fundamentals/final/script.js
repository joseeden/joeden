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

// const userAlex = getBMI(dataAlex.weight, dataAlex.height)
// const userJake = getBMI(dataJake.weight, dataJake.height)

// console.log(`Alex has BMI of ${userAlex}`);
// console.log(`Jake has BMI of ${userJake}`);

// function finalBMI() {
//   if ( userAlex > userJake) {
//     console.log(`Alex has a higher BMI than Jake.`);
//   } else {
//     console.log(`Jake has a higher BMI than Alex.`);
//   }
// }

// finalBMI();


//-------------------------------------------------------------------------

// const massAlex = 78, massJake = 92;
// const heightAlex = 1.69, heightJake = 1.95;

// const userAlex = (massAlex / (heightAlex ** 2)).toFixed(2);
// const userJake = (massJake / (heightJake ** 2)).toFixed(2);
// const higherBMI = userAlex > userJake;

// function finalBMI() {
//   if  (userAlex > userJake) {
//     console.log(`Alex has a higher BMI than Jake.`);
//   } else {
//     console.log(`Jake has a higher BMI than Alex.`);
//   }
// }

// console.log(`Alex has a BMI of ${userAlex}`);
// console.log(`Jake has a BMI of ${userJake}`);
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


// const friends = ["Michael", "Steven", "Peter", "Jay"] 
// friends.pop();  
// console.log(friends); // ["John", "Michael", "Steven", "Peter"]

// friends.push(23);
// console.log(friends);


//--------------------------------------------------------------


// const bill = 100;                 // initial test data for the calculateTip

// function calculateTip(bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
// };

// console.log(calculateTip(bill));  // Output: 100


// const bills = [120, 500, 40];
// const tips = [];
// const total = [];

// for (const x of bills){
//   const tip = calculateTip(x);
//   tips.push(tip);
//   total.push(x + tip);
// };

// console.log(tips);        // Output: [18, 100, 8]
// console.log(total);       // Output: [138, 600, 48]


//--------------------------------------------------------------


// const user1 = {
//   firstname: "John",
//   lastname: "Smith",
//   birthYear: 1990,
//   job: "Architect",
//   permission: ['Administrator', 'Cloud', 'Devops']
// };

// console.log(user1.lastname);  // Output: Smith
// console.log(user1["job"]);    // Output: Architect

// const nameKey = "name";
// console.log(user1["first" + nameKey]); // John
// console.log(user1["last" + nameKey]);  // Smith


// const getInput = prompt("Choose property: firstName, lastName, job")
// console.log(user1[getInput]);

// if (user1[getInput]) {
//   console.log(user1[getInput]);
// } else {
//   console.log("Invalid property");
// }

// user1.location = "Sweden";
// user1["twitter"] = "@JohnSmith";

// console.log(user1);


//--------------------------------------------------------------


// const user2 = {
//   firstName: "Jane Doe",
//   hasDriverLicense: true,
//   birthYear: 1991,

//   age: function () {
//     return 2037 - this.birthYear;
//   } 
// };

// console.log(user2.age());         // Using dot notation, output: 46
// console.log(user2["age"]());      // Using bracket notation, output: 46

// const user2 = {
//   birthYear: 1991,
//   hasDriversLicense: true,

//   age: function () {
//     this.age = 2037 - this.birthYear; 
//     return this.age;
//   } 
// };

// console.log(user2.age());    // 46
// console.log(user2.age);      // 46


// const userAlex = {
//   name: "Alex Brown",
//   mass: 85,
//   height: 1.75,

//   calcBMI: function () {
//     this.bmi = this.mass / (this.height ** 2)
//     return this.bmi
//   }
// }

// const userJake = {
//   name: "Jake Wilson",
//   mass: 95,
//   height: 1.88,

//   calcBMI: function() {
//     this.bmi = this.mass / (this.height ** 2)
//     return this.bmi 
//   }
// }

// const bmiAlex = userAlex.calcBMI().toFixed(2);
// const bmiJake = userJake.calcBMI().toFixed(2);

// console.log(`${userAlex.name}: ${bmiAlex}`);
// console.log(`${userJake.name}: ${bmiJake}`);

// if (userAlex.calcBMI().toFixed(2)) {
//   console.log(`${userAlex.name} has a higher BMI than ${userJake.name}`);
// } else {
//   console.log(`${userJake.name} has a higher BMI than ${userAlex.name}`);
// }

//--------------------------------------------------------------

// for (let apple =1; apple <= 10; apple++) {
//   console.log(`Picked apple ${apple}`);
// };

// const participants = ["Alice", "Bob", "Charlie", "David", "Eve"];

// for (let i = 0; i < participants.length; i++) {
//   console.log(participants[i]);
// };

// participants.push("Frank");
// console.log(participants);


// const nameLengths = [];

// for (let i = 0; i < participants.length; i++) {
//   nameLengths.push(participants[i].length);
// }

// console.log(nameLengths);

// const data = [
//   "Alice",
//   "Smith",
//   "Manager",
//   1993,
//   { age: 30},
//   true
// ];

// const types = [];

// for (let i = 0; i < data.length; i++) {
//   console.log(data[i]);
//   types.push(typeof data[i])
// };

// console.log(types);

// const participants = ["Alice", "Bob", "Charlie", "David", "Eve"];

// for (const x of participants) {
//   console.log(x);
// };


