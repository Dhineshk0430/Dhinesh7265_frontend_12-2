import NavBar from "../Components/NavBar"
import Images from "../assets/TripyfyEmblem.png"
import Images2 from "../assets/1.jpeg"


const Home = ()=>{


    return(<>
<div className="nav">
    <div>
<img src={Images} className="img"/>
</div>
 
    <NavBar/>
</div>

<div>
<img src={Images2} />

</div>
    
    </>)
}

export default Home