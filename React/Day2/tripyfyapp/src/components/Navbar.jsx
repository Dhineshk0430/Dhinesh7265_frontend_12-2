const Navbar = ()=>{


return(<>

<h1 className="welcome">
    Welcome to Tripyfy
</h1>
<LoginButton/>
</>)


}


export default Navbar




const LoginButton = ()=>{

return(<>

<div className="btn"><button className="loginbtn">Click To Login</button></div>

<div className="btn">
    <a href="" className="loginbtn">Click for Task 1</a>
</div>


</>)

}



