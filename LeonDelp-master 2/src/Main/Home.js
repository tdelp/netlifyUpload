import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

const backgroundImage = "/images/animals_background.jpg";

// featured animals data
const featuredAnimals = [
  {
    name: "Dumbo",
    species: "African Elephant",
    image: "/images/dumbo.jpg",
  },
  {
    name: "Coco",
    species: "Blue & Yellow Macaw",
    image: "/images/coco.jpg",
  },
  {
    name: "Bella",
    species: "Red Kangaroo",
    image: "/images/bella.jpg",
  },
];

const HeroSection = styled(Box)({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "white",
});

const HomePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Retrieve authentication status from localStorage on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate("/species");
    } else {
      navigate("/register");
    }
  };

  

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <Box>
          <Typography variant="h2" gutterBottom>
            Adopt Your Favorite Animal Virtually!
          </Typography>
          <Typography variant="h5" gutterBottom>
            Make a difference by supporting animal conservation efforts.
          </Typography>
        </Box>
      </HeroSection>

      {/* How It Works Section */}
      <Container sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          How Virtual Adoption Works
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              1. Browse Animals
            </Typography>
            <Typography>Choose from a wide variety of species.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              2. Adopt and Personalize
            </Typography>
            <Typography>
              Sponsor an animal of your choosing and see where your donation ranks in the leaderboard!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              3. Support a Cause
            </Typography>
            <Typography>
              Your adoption supports animal welfare and conservation efforts.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Featured Animals Section */}
      <Container sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Featured Animals
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {featuredAnimals.map((animal, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={animal.image}
                  alt={animal.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {animal.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {animal.species}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ textAlign: "center", py: 4, bgcolor: "green", color: "white" }}>
        <Typography variant="h5" gutterBottom>
          Join Our Community Today
        </Typography>
        <Typography variant="body1" gutterBottom>
          Create an account to track your adoptions, personalize certificates,
          and get exclusive updates.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: "#f5f7f5", color: "black" }}
          onClick={handleButtonClick}
        >
          {isAuthenticated ? "View Species" : "Sign Up for Free"}
        </Button>
      </Box>
    </>
  );
};

export default HomePage;

