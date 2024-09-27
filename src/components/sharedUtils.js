import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Safe localStorage operations
export const safeLocalStorage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },
  getItem: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },
};

// Shared RecipeCard component
export function RecipeCard({ recipe }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card>
      <Link to={"/recipe/" + recipe.id}>
        <ImageWrapper>
          {!imageError ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              onError={handleImageError}
            />
          ) : (
            <ImagePlaceholder>
              <p>Image not available</p>
            </ImagePlaceholder>
          )}
        </ImageWrapper>
        <Gradient />
        <Title>{recipe.title}</Title>
      </Link>
    </Card>
  );
}

// Styled components
export const Wrapper = styled.div`
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
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

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin: 2rem 0;
  color: #333;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin: 2rem 0;
  color: #ff0000;
  background-color: #ffe6e6;
  padding: 1rem;
  border-radius: 0.5rem;
`;
