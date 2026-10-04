let arrayNumber = [1,2,3,4,5,6,7,8,9,10,11,12]


let numbers= 0

const evenNumber = (arrayNumber,arrayEven)=>{
    for(let a =0; a<arrayNumber.length; a++){
        if (arrayNumber [a] % 2===0){
            arrayEven[numbers]=arrayNumber[a]
            numbers++
        }
    }
        numbers=0
        return arrayEven
}

console.log(evenNumber(arrayNumber,[]));

console.log(evenNumber([78,437589,3492,4897218,9752],[]));
