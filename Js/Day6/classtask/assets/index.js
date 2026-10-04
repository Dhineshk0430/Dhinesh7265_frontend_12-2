let first = 0
let second = 1

let line = " "


for(a=0;a<=10;a++){
   
    line += first + " "
    let third = first + second

    first = second
    second = third
    
}

console.log(line)
