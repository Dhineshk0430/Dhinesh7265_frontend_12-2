// TASK 1 – Print Multiples of 5
// Using a loop, print:

// 5 10 15 20 25 30 35 40 45 50

for(a=0; a<=50; a+=5){
    console.log(a);
    
}

// TASK 2 – Print Numbers by 2
// Using a loop, print:

// 2 4 6 8 10 12 14 16 18 20
// Do this by changing the loop value by 2 each time.

for(a=0; a<=20 ; a+=2){
    console.log(a)
}

// TASK 3 – Find Sum from 1 to 20
// Using a loop, calculate:

// 1 + 2 + 3 + ... + 20
// Print the final total.


let total = 0;
for (let a=1; a<=20; a++){
    total= total + a;
}

console.log(total);


// TASK 4 – Print Squares
// Using a loop, print the square of numbers from 1 to 10.


for (let a = 1; a<=10; a++){
    console.log(a*a);
}


// TASK 5 – Countdown
// Using a loop, print numbers from 50 to 0, decreasing by 5.

for( let a=50; a>=0 ; a-=5){
     console.log(a);
}

