import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components';
import {Link} from 'react-router-dom'
function Searched() {

    const [searchedRecipes,setsearchedRecipes] =useState([]);
    let params=useParams()

       const getSearched=async(name)=>{
        const data= await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_APIKEY}&query=${name}`)
        
        const recipes= await data.json()
        setsearchedRecipes(recipes.results)

    }
    useEffect(()=>{
       getSearched(params.search)
    },[params.search]);

  return (
         <Grid>
            {searchedRecipes.map((item)=>{
                return(
                    <Card key={item.id}>
                      <Link to={'/recipe/'+item.id}>
                             <img src={item.image} alt=""/>
                             <h4>{item.title}</h4>
                      </Link>
                    </Card>
                )
            })}
        </Grid>
  )
}

const Grid=styled.div`
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


export default Searched