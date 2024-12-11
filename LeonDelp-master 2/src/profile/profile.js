import React, { useEffect, useState } from "react";
import Parse from "parse";
import { Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

const ProfilePage = () => {
  const [userName, setUserName] = useState("Loading...");
  const [adoptedAnimals, setAdoptedAnimals] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
  try {
    // Get current user
    const user = Parse.User.current();
    if (!user) {
      setUserName("Guest");
      return;
    }

    // Get the first name of the user
    const firstName = user.get("firstName") || "User";
    setUserName(firstName);

    // Fetch adopted animals from the purchased database
    const Purchased = Parse.Object.extend("purchased");
    const purchasedQuery = new Parse.Query(Purchased);
    purchasedQuery.equalTo("buyer", firstName); // Match by first name
    const purchasedResults = await purchasedQuery.find();

    // Format results by matching with animals database
    const formattedResults = await Promise.all(
      purchasedResults.map(async (item) => {
        const animalName = item.get("name");
        const donationAmount = item.get("cost");

        // Create a new query for the animals database
        const Animal = Parse.Object.extend("animals");
        const animalQuery = new Parse.Query(Animal);
        animalQuery.equalTo("name", animalName);
        const animalResult = await animalQuery.first();

        const imageFile = animalResult ? animalResult.get("image_url") : null;
        const imageUrl = imageFile ? imageFile._url : "https://via.placeholder.com/150";

        return {
          id: item.id,
          name: animalName,
          cost: donationAmount,
          imageUrl,
        };
      })
    );

    setAdoptedAnimals(formattedResults);
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};


    fetchUserProfile();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Welcome, {userName}!
      </Typography>

      <Typography variant="h5" gutterBottom align="center">
        Your Adopted Animals
      </Typography>

      <Grid container spacing={3}>
        {adoptedAnimals.map((animal) => (
          <Grid item xs={12} sm={6} md={4} key={animal.id}>
            <Card
              sx={{
                maxWidth: 300,
                margin: "0 auto",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={animal.imageUrl}
                alt={animal.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {animal.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Donation: ${animal.cost}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {adoptedAnimals.length === 0 && (
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: "2rem", color: "gray" }}
        >
          You have not adopted any animals yet.
        </Typography>
      )}
    </Container>
  );
};

export default ProfilePage;

