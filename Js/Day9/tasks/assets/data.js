// TASK 1 – GLOBAL AND FUNCTION SCOPE

// ----------------------------------

// Create:

// let company = "ABC Technologies";

// Create a function:

// showEmployee()

// Inside the function create:

// let employee = "Arun";

// Print both:

// company

// employee

// Then try to print employee outside the function.

// Find:

// 1. Which variable is Global Scope?

// 2. Which variable is Function Scope?

// 3. Why can't employee be accessed outside?


let company = "ABC Technologies"

function showEmployee (){

    let employee = "arun";

    console.log(company);
    console.log(employee);

}

showEmployee()

console.log(employee);


//Task 2
// Create an if condition:

// if (true) {

//     Create:

//     let age = 25;

//     const city = "Chennai";

// }

// Print age and city:

// 1. Inside the if block

// 2. Outside the if block

// Observe the result.

// Then change:

// let age

// to:

// var age

// and check the difference.

if (true){
    let age = 25;

    const city = "Chennai"


    console.log(age);
    console.log(city);

    
    
}


    console.log(age);
    console.log(city);
    

// TASK 3 – HOISTING

// -----------------

// Create these three examples separately:

// Example 1:

// Print a variable before declaring it using:

// var

// Example 2:

// Print a variable before declaring it using:

// let

// Example 3:

// Call this function before creating it:

// greet();

// The function should print:

// "Welcome to JavaScript"

// Observe:

// 1. What happens with var?

// 2. What happens with let?

// 3. Does the function declaration work before its declaration?



console.log(age);
var age = 25;

console.log(city);
let city = "Tvm";

greet();

function greet(){
    console.log( "Welcome to javaScript");
   
}


//Task 4

// Create a function:

// createCounter()

// Inside create:

// let count = 0;

// Create another function inside it.

// Every time the inner function runs:

// Increase count by 1

// and print count.

// Return the inner function.

// Call it 3 times.

// Expected Output:

// 1

// 2

// 3

// Concept:

// Outer Function

//      ↓

// Inner Function

//      ↓

// Remember count

//      ↓

// Closure

function createCounter(){
    let count = 0;

    function innerFunction (){
        count++
        console.log(count);
        
    }
    return innerFunction;
}

let counter = createCounter();

counter();
counter();
counter();

// TASK 5 – CALLBACK CALCULATOR

// ----------------------------

// Create three functions:

// add(a, b)

// subtract(a, b)

// calculate(a, b, callback)

// add()

// should print addition.

// subtract()

// should print subtraction.

// calculate()

// should receive:

// a

// b

// callback

// and execute the callback.

// Call:

// calculate(20, 10, add);

// Expected:

// 30

// Call:

// calculate(20, 10, subtract);

// Expected:

// 10

// Concept:

// Function passed to another function

// → Callback


function add(a,b){
    console.log(a+b);
    
}

function subtract(a,b){
    console.log(a-b);   
}

function calculate(a,b, callback){
    callback(a,b);
}

calculate(20,10,add)
calculate(20,10,subtract)