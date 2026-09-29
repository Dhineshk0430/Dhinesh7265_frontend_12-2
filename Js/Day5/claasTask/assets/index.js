// 1 -100
let line =" "
for (let count=1; count<=100; count++)
{
     line+= count+" "
    
}
console.log(line);



//99- 0

let reverseline =" "
for (let less=99; less>=0; less--)
{
  reverseline+= less + " "
}
  console.log(reverseline);




//1-100 even

let evenline=" "

for(let even=1; even<=100; even++)
{
    if(even % 2===0)
        evenline += even + " "
}
  console.log(evenline);


// 1 -100 odd

let oddline = " "
for (let odd =1; odd<=100; odd++)
{
    if (odd % 2!==0)
        oddline += odd+ " "
}

console.log(oddline)

