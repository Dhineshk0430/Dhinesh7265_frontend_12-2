
// TASK 1 – FRUIT ARRAY
// Create an array with 5 fruit names.

// Print:

// Complete array

// First fruit

// Third fruit

// Last fruit

let fruits = ["mango", "apple", "banana", "grapes", "pineapple"]

console.log(fruits);

console.log(fruits[0]);
console.log(fruits[2]);
console.log(fruits[fruits.length-1]);


// TASK 2 – UPDATE COLORS
// Create:

// let colors = ["Red", "Blue", "Green", "Yellow"];
// Change "Blue" to "Black".

// Print the updated array.

let colors = ["Red", "Blue", "Green", "Yellow"];

colors[1]="Black"

console.log(colors);

// TASK 3 – LOOP STUDENT NAMES
// Create an array containing 5 student names.

// Using a for loop, print every student name one by one.

// Expected:

// Arun
// Kumar
// Priya
// Ravi
// Divya

let names = ["Arun", "kumar", "Priya", "Ravi", "Divya"]

for(a=0; a<names.length-1;a++){
  console.log(names[a]);
    
}

// TASK 4 – TOTAL MARKS
// Create:

// let marks = [80, 70, 90, 60, 85];
// Using a loop, calculate the total of all marks.

// Print:

// Total = ?

let marks = [80, 70, 90, 60, 85];
let total = 0
for(a=0;a<marks.length;a++){
    total= total + marks[a]
}

console.log("Total = " +(total));

// TASK 5 – ARRAY MULTIPLICATION
// Create:

// let numbers = [2, 4, 6, 8, 10];
// Using a loop, print each number multiplied by 2.

// Expected:

// 4
// 8
// 12
// 16
// 20

let numbers = [2, 4, 6, 8, 10];

for (let a = 0; a < numbers.length; a++) {
    
    console.log(numbers[a]*2);
    
}

// TASK 6 – STUDENT OBJECT
// Create a student object containing:

// name
// age
// course
// city
// Print only:

// name
// course
// using object properties.


let studentProfile ={name:"Dhinesh", age:20, course:"FullStack", city:"Tiruvannamalai"}

console.log(studentProfile.name);
console.log(studentProfile.course);


//TASK 7 – UPDATE EMPLOYEE

// Create an employee object:

// name = "Arun"
// salary = 25000
// role = "Developer"
// Update:

// salary = 30000


let employeeDetails = {name:"Arun", salary:25000, role:"Developer"}

employeeDetails.salary=30000

console.log(employeeDetails.salary);


// TASK 8 – ADD NEW PROPERTY
// Create:

// let product = {
//     name: "Laptop",
//     price: 50000
// };
// Add:

// brand = "Dell"
// Then print:

// Product Name
// Price
// Brand

let product = {
    name: "Laptop",
    price: 50000
};

product.brand= "Dell"

console.log(product.name);
console.log(product.price);
console.log(product.brand);

// TASK 9 – LOOP OBJECT
// Create an object:

// let car = {
//     brand: "Toyota",
//     model: "Fortuner",
//     year: 2025
// };
// Using for...in, print all keys and values.

// Expected format:
// brand Toyota
// model Fortuner
// year 2025


