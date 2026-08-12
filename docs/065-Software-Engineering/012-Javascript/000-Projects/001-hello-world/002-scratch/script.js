// const names = ["Alice", "Bob", "Charlie", "David", "Eve"];

// for (var x = names.length - 1; x >= 0; x--) {
//   console.log(names[x]);
// }

// ----------------------------------------------

// for (var exercise = 1; exercise <= 3; exercise++) {
//   console.log(`Starting iteration ${exercise}`);

//   for (var rep = 1; rep <= 5; rep++) {
//     console.log(` Repetition ${rep}`)

//   }
// };

// ----------------------------------------------

// const dataArray = ["Alice", "Bob", 25, "Charlie", { age: 30 }, true];

// for (const x of dataArray) {
//   console.log(x);
// }

// ----------------------------------------------

// const dataArray = [
//   "Jane", 
//   "Doe", 
//   1988, 
//   "Charlie", 
//   { age: 30 }, 
//   true];

// dataArray.forEach((item, index) => {
//   console.log(`Index: ${index}: ${item}`)
// });

// ----------------------------------------------

// let dice = Math.trunc(Math.random() * 6) + 1;
// console.log(dice);

// ----------------------------------------------

let dice; 

while (dice != 6) {
  dice = Math.trunc(Math.random() * 6) + 1;
  console.log(`You rolled a ${dice}`)
};
