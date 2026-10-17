let dataName = ["Dhinesh","Kumar","Aravind"]

const dataList = document.getElementById("dataList")

const button = document.getElementById("btn")

const arrayRenduring = ()=>{
    dataList.innerHTML= ""
    dataName.forEach((stuname,i)=>{
        let li = document.createElement("li")

        li.textContent= stuname
        dataList.append(li)
    })
}

button.addEventListener("click",()=>{
   arrayRenduring()  
})