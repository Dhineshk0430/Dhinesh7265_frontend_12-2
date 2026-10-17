
const value = []

const numberOne = document.getElementById("numberOne")
const numberTwo = document.getElementById("numberTwo")

const add = document.getElementById("add")
const sub = document.getElementById("sub")
const multiple = document.getElementById("multiple")
const divide = document.getElementById("divide")

const output= document.getElementById("output")


add.addEventListener("click",()=>{

    let data = " "
    data = Number(numberOne.value) + Number(numberTwo.value)

    console.log(data);
    

    value.push(data)

    output.innerHTML = ""

    value.forEach((result) => {
    let p = document.createElement("h4")
    p.textContent = result
    output.append(p)
})
})

sub.addEventListener("click",()=>{

    let data = " "
    data = Number(numberOne.value) - Number(numberTwo.value)

    console.log(data);
    

    value.push(data)

})

multiple.addEventListener("click",()=>{

    let data = " "
    data = Number(numberOne.value) * Number(numberTwo.value)

    console.log(data);
    

    value.push(data)

})

add.addEventListener("click",()=>{

    let data = " "
    data = Number(numberOne.value) / Number(numberTwo.value)

    console.log(data);
    

    value.push(data)

})


