 const fetchData = async()=>{

    const getData = await fetch("https://dummyjson.com/products")  
    
    
    // console.log(getData);
    
    const changedData = await getData.json()

    // console.log(changedData.products);
    
    const data = changedData.products

    const tableData = document.getElementById("tableData")

    let product = ""

    data.forEach(e=> {
        
     product += `
     <tr>
 

     <td>${e.id}</td>
     <td>${e.title}</td>
     <td>${e.price}</td>

     </tr>
     
     
     `
    });

tableData.innerHTML= product

 }

 fetchData()