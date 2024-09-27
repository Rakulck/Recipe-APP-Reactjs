import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Veggie() {
    const [veggie, setVeggie] = useState([]);

    useEffect(() => {
        getVeggie();
    }, [])

    const getVeggie = async () => {
        const check = localStorage.getItem('veggie')
        if (check) {
            setVeggie(JSON.parse(check))
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_APIKEY}&number=9&tags=vegetarian`)
            const data = await api.json()
            localStorage.setItem("veggie", JSON.stringify(data.recipes))
            setVeggie(data.recipes)
        }
    }

    const handleImageError = (e) => {
        e.target.onerror = null; // Prevents looping
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
    }

    return (
        <div>
            <Wrapper>
                <h3>Veggie Picks!</h3>
                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "1rem",
                    breakpoints: {
                        1024: { perPage: 2 },
                        768: { perPage: 1 }
                    }
                }}>
                    {veggie.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={'/recipe/' + recipe.id}>
                                        <ImageWrapper>
                                            <img 
                                                src={recipe.image} 
                                                alt={recipe.title}
                                                onError={handleImageError}
                                            />
                                            <ImagePlaceholder style={{display: 'none'}}>
                                                <p>Image not available</p>
                                            </ImagePlaceholder>
                                        </ImageWrapper>
                                        <p>{recipe.title}</p>
                                        <Gradient />
                                    </Link>
                                </Card>
                            </SplideSlide>
                        )
                    })}
                </Splide>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    height: 300px;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 2rem;
    }
`;

const ImagePlaceholder = styled.div`
    background-color: #f0f0f0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    
    p {
        color: #666;
        font-style: italic;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Veggie