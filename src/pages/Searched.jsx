import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    let params = useParams();

    const getSearched = async (name) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_APIKEY}&query=${name}`);
            if (!data.ok) {
                throw new Error('Failed to fetch recipes');
            }
            const recipes = await data.json();
            setSearchedRecipes(recipes.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);

    const handleImageError = (e) => {
        e.target.onerror = null; // Prevents looping
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
    }

    if (isLoading) return <LoadingMessage>Loading...</LoadingMessage>;
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
    if (searchedRecipes.length === 0) return <NoResultsMessage>No recipes found for "{params.search}". Try a different search term.</NoResultsMessage>;

    return (
        <Wrapper>
            <Title>Search Results for "{params.search}"</Title>
            <Grid>
                {searchedRecipes.map((item) => {
                    return (
                        <Card key={item.id}>
                            <Link to={'/recipe/' + item.id}>
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    onError={handleImageError}
                                />
                                <ImagePlaceholder style={{display: 'none'}}>
                                    <p>Image not available</p>
                                </ImagePlaceholder>
                                <h4>{item.title}</h4>
                            </Link>
                        </Card>
                    )
                })}
            </Grid>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding-top: 2rem;
`

const Title = styled.h2`
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
    font-size: 2rem;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
    grid-gap: 2rem;
`

const Card = styled.div`
    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
        color: #333;
    }
`

const ImagePlaceholder = styled.div`
    background-color: #f0f0f0;
    border-radius: 2rem;
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
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

export default Searched