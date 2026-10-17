const moneyHave = ()=>{

    let money = 10000;

    const lessMoney= (a)=>{

        money -= a

        console.log(money);
        
    
    }

    return lessMoney

}

const finalMoney = moneyHave()

finalMoney()=> {
setInterval(()=>{

    finalMoney(500)
},1000)

 if(money<0){
            clearInterval(timer)
        }
}


