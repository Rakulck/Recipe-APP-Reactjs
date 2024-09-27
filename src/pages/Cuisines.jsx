import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

function Cuisines() {
    const [cuisine, setCuisine] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    let params = useParams()

    const getCuisine = async (name) => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_APIKEY}&cuisine=${name}`)
            if (!data.ok) {
                throw new Error('Failed to fetch recipes')
            }
            const recipes = await data.json()
            setCuisine(recipes.results)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCuisine(params.type)
    }, [params.type])

    const handleImageError = (e) => {
        e.target.onerror = null // Prevents looping
        e.target.style.display = 'none'
        e.target.nextSibling.style.display = 'flex'
    }

    if (isLoading) return <LoadingMessage>Loading...</LoadingMessage>
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>
    if (cuisine.length === 0) return <NoResultsMessage>No recipes found for "{params.type}" cuisine. Try a different cuisine.</NoResultsMessage>

    return (
        <Grid
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >   
            {cuisine.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to={'/recipe/' + item.id}>
                            <ImageContainer>
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    onError={handleImageError}
                                />
                                <ImagePlaceholder style={{display: 'none'}}>
                                    <p>Image not available</p>
                                </ImagePlaceholder>
                            </ImageContainer>
                            <h4>{item.title}</h4>     
                        </Link>           
                    </Card>
                )
            })}
        </Grid>
    )
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
    grid-gap: 2rem;
    padding-top: 50px;
`

const Card = styled.div`
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
        color: #333;
    }
`

const ImageContainer = styled.div`
    width: 100%;
    height: 200px;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
`

const ImagePlaceholder = styled.div`
    background-color: #f0f0f0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    p {
        color: #666;
        font-style: italic;
    }
`

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    margin-top: 2rem;
    color: #333;
`

const ErrorMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    margin-top: 2rem;
    color: #ff0000;
`

const NoResultsMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    margin-top: 2rem;
    color: #333;
`

export default Cuisines