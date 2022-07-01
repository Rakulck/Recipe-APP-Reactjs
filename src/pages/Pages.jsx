import Home from "./Home"
import {Route,Routes} from'react-router-dom'
import Cuisines from "./Cuisines";

function Pages() {
  return (
    <Routes> 
      <Route path='/' element={<Home />}/>
      <Route path='/cuisine/:type' element={<Cuisines />}/>
    </Routes>
  )
}

export default Pages