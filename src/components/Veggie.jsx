import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Veggie() {
    const [veggie, setVeggie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getVeggie();
    }, [])

    const getVeggie = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const check = localStorage.getItem('veggie')
            if (check) {
                setVeggie(JSON.parse(check))
            } else {
                const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_APIKEY}&number=9&tags=vegetarian`)
                if (!api.ok) {
                    throw new Error('Failed to fetch vegetarian recipes')
                }
                const data = await api.json()
                localStorage.setItem("veggie", JSON.stringify(data.recipes))
                setVeggie(data.recipes)
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleImageError = (e) => {
        e.target.onerror = null; // Prevents looping
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
    }

    if (isLoading) return <LoadingMessage>Loading vegetarian picks...</LoadingMessage>;
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

    return (
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
                {veggie.map((recipe) => (
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
                                <Gradient />
                                <Title>{recipe.title}</Title>
                            </Link>
                        </Card>
                    </SplideSlide>
                ))}
            </Splide>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;

    h3 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 1rem;
    }
`;

const Card = styled.div`
    height: 250px;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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
    }
`;

const ImagePlaceholder = styled.div`
    background-color: #f0f0f0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    p {
        color: #666;
        font-style: italic;
        text-align: center;
        padding: 1rem;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7));
`;

const Title = styled.p`
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`;

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.2rem;
    margin: 2rem 0;
    color: #333;
`;

const ErrorMessage = styled.div`
    text-align: center;
    font-size: 1.2rem;
    margin: 2rem 0;
    color: #ff0000;
    background-color: #ffe6e6;
    padding: 1rem;
    border-radius: 0.5rem;
`;

export default Veggie