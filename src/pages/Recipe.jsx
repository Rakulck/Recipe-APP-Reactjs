import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { useParams } from 'react-router-dom'

function Recipe() {
    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState("instructions")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    let params = useParams();

    const fetchDetails = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_APIKEY}`)
            if (!data.ok) {
                throw new Error('Failed to fetch recipe details')
            }
            const detailData = await data.json()
            setDetails(detailData)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchDetails()
    }, [params.name]);

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
    }

    if (isLoading) return <LoadingMessage>Loading...</LoadingMessage>;
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

    return (
        <DetailWrapper>
            <LeftColumn>
                <h2>{details.title}</h2>
                <ImageContainer>
                    <img 
                        src={details.image} 
                        alt={details.title}
                        onError={handleImageError}
                    />
                    <ImagePlaceholder style={{display: 'none'}}>
                        <p>Image not available</p>
                    </ImagePlaceholder>
                </ImageContainer>
            </LeftColumn>
            <Info>
                <ButtonWrapper>
                    <Button 
                        className={activeTab === 'instructions' ? 'active' : ''} 
                        onClick={() => setActiveTab('instructions')}
                    >
                        Instructions
                    </Button>
                    <Button 
                        className={activeTab === 'ingredients' ? 'active' : ''}
                        onClick={() => setActiveTab('ingredients')}
                    >
                        Ingredients
                    </Button>
                </ButtonWrapper>
                {activeTab === 'instructions' && (
                    <div>
                        <Summary dangerouslySetInnerHTML={{__html: details.summary}}></Summary>
                        <Instructions dangerouslySetInnerHTML={{__html: details.instructions}}></Instructions>
                    </div>
                )}
                {activeTab === 'ingredients' && (
                    <IngredientList>
                        {details.extendedIngredients && details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </IngredientList> 
                )}
            </Info>
        </DetailWrapper>
    )
}

const DetailWrapper = styled.div`
    margin: 2rem auto;
    max-width: 1200px;
    padding: 2rem;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    
    @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
    }

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
`

const LeftColumn = styled.div`
    flex: 1;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
        margin-bottom: 0;
        margin-right: 2rem;
    }

    h2 {
        margin-bottom: 1rem;
        font-size: 1.8rem;
        color: #333;

        @media (min-width: 768px) {
            font-size: 2.2rem;
        }
    }
`

const ImageContainer = styled.div`
    width: 100%;
    max-width: 400px;
    margin: 0 auto;

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
`

const Button = styled.button`
    padding: 0.75rem 1.5rem;
    color: #313131;
    background: white;
    border: 2px solid #313131;
    border-radius: 0.5rem;
    margin-right: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #f0f0f0;
    }

    @media (min-width: 768px) {
        padding: 1rem 2rem;
        font-size: 1rem;
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2rem;
`

const Info = styled.div`
    flex: 2;
`

const Summary = styled.div`
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #555;

    @media (min-width: 768px) {
        font-size: 1.1rem;
    }
`

const Instructions = styled.div`
    font-size: 1rem;
    line-height: 1.8;
    color: #333;

    @media (min-width: 768px) {
        font-size: 1.1rem;
    }

    ol, ul {
        margin-left: 1.5rem;
        margin-bottom: 1.5rem;
    }

    li {
        margin-bottom: 0.5rem;
    }
`

const IngredientList = styled.ul`
    list-style-type: none;
    padding: 0;

    li {
        font-size: 1rem;
        line-height: 1.6;
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
        color: #333;

        @media (min-width: 768px) {
            font-size: 1.1rem;
        }

        &:last-child {
            border-bottom: none;
        }
    }
`

const ImagePlaceholder = styled.div`
    background-color: #f0f0f0;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    
    p {
        color: #666;
        font-style: italic;
    }
`

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    margin-top: 4rem;
    color: #333;
`

const ErrorMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    margin-top: 4rem;
    color: #ff0000;
    background-color: #ffe6e6;
    padding: 1rem;
    border-radius: 0.5rem;
`

export default Recipe