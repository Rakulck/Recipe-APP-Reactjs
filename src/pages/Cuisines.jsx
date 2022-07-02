import styled from "styled-components"
import {motion} from 'framer-motion'
import {Link,useParams} from 'react-router-dom'
import{useState,useEffect} from 'react'


function Cuisines() {
    const [cusine,setCuisine]=useState([])
    let params=useParams()

    const getCuisine=async(name)=>{
        const data= await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_APIKEY}&cuisine=${name}`)
        const recipes= await data.json()
        setCuisine(recipes.results)
    }

    useEffect(()=>{
        getCuisine(params.type)
    },[params.type])

  return (
    <Grid
    animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    transition={{duration:0.5}}>   
         {cusine.map((item)=>{
            return(
                <Card key={item.id}>
                  <Link to={'/recipe/'+item.id}>
                    <img src={item.image} alt=''/>
                    <h4>{item.title}</h4>     
                  </Link>           
                </Card>
            )
         })}
    </Grid>
  )
}


const Grid=styled(motion.div)`
display:grid;
grid-template-columns:repeat(auto-fit,minmax(19rem,1fr));
grid-gap:2rem;
`
const Card=styled.div`
  img{
      border-radius: 2rem;
      width: 100%;
  }
  a{
    text-decoration:none;
  }
  h4{
    text-align: center;
    padding: 1rem;
  }
  `
export default Cuisines