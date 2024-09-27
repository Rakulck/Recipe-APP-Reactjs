export function RecipeCard({ recipe }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    // Check if the image URL is valid
    if (!recipe.image) {
      setImageError(true);
    } else {
      // Preload the image
      const img = new Image();
      img.src = recipe.image;
      img.onerror = handleImageError;
    }
  }, [recipe.image]);

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

// Update the ImagePlaceholder styled component
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
    text-align: center;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 0.5rem;
  }
`;