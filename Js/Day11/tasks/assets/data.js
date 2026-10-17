//Task 1

// let numbers = [10, 20, 30, 40, 50];

// let result = numbers.map((num,i)=>num*2)

// console.log(result);


// Task 2

// let numbers = [10, 15, 20, 25, 30, 35, 40];

// let result = numbers.filter((num,i)=>num%2===0)

// console.log(result);

//task 3

// let numbers = [10, 25, 35, 50, 60];

// let result = numbers.find((num,i)=> num > 30 )

// console.log(result);

//Task 4

// let students = [

// { id: 1, name: "Arun", mark: 75 },

// { id: 2, name: "Priya", mark: 90 },

// { id: 3, name: "Kumar", mark: 65 }

// ];

// let foundStudent = students.find((students,i)=>students.id===2)

// console.log(foundStudent);


//Task 5

let employees = [

{ name: "Arun", salary: 25000 },

{ name: "Priya", salary: 45000 },

{ name: "Kumar", salary: 30000 },

{ name: "Ravi", salary: 50000 }

];

let filteredList = employees.filter((e,i) => e.salary >= 30000)

console.log(filteredList);
