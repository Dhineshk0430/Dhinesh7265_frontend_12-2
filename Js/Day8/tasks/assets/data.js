// TASK 1 – EVEN OR ODD

function checkEvenOdd(number) {
if (number % 2 === 0) {
return "Even Number";
} else {
return "Odd Number";
}
}

console.log(checkEvenOdd(10));

// TASK 2 – LARGEST OF TWO NUMBERS

function findLargest(a, b) {
if (a > b) {
return a;
} else {
return b;
}
}

console.log(findLargest(25, 40));

// TASK 3 – VOTING ELIGIBILITY

function checkVote(age) {
if (age >= 18) {
return "Eligible to Vote";
} else {
return "Not Eligible to Vote";
}
}

console.log(checkVote(20));

// TASK 4 – SUM OF ARRAY

let numbers = [10, 20, 30, 40, 50];

function getTotal(numbers) {
let total = 0;

for (let a = 0; a < numbers.length; a++) {
    total = total + numbers[a];
}

return total;

}

console.log(getTotal(numbers));

// TASK 5 – COUNT EVEN NUMBERS

let values = [10, 15, 20, 25, 30, 35, 40];

function countEven(numbers) {
let count = 0;

for (let a = 0; a < numbers.length; a++) {
    if (numbers[a] % 2 === 0) {
        count++;
    }
}

return count;

}

console.log(countEven(values));
