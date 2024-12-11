import React, { useState, useEffect, useRef } from "react";
import Parse from "parse";
import { Grid, Card, CardMedia, CardContent, Typography, Modal, Box, Button, TextField } from "@mui/material";
import "../App.css";

// Parse Initialization
Parse.initialize("4AVSMbAhhvLMXgOeQ0jn8JFBXgvNEbSqLaXingUt", "soCNFHXs48gR1N9ur0KIUbkohjGwK6CLDpkoDpus");
Parse.serverURL = "https://parseapi.back4app.com/";

// Animal Modal Component
const AnimalModal = ({ animal, onClose }) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [error, setError] = useState("");

  if (!animal) return null;

  // function to allow users to adopt and add to leaderboard
  const handleAdopt = async () => {
    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    try {
      // Retrieve the logged-in user
      const user = Parse.User.current();
      if (!user) {
        alert("You must be logged in to adopt an animal!");
        return;
      }

      const firstName = user.get("firstName") || "Anonymous";

      // Save the adoption details to the `purchased` database
      const Purchased = Parse.Object.extend("purchased");
      const newPurchase = new Purchased();

      newPurchase.set("name", animal.name);
      newPurchase.set("cost", parseFloat(donationAmount));
      newPurchase.set("buyer", firstName); 
      newPurchase.set("animalId", animal.id);

      await newPurchase.save();

      alert(`Thank you for adopting ${animal.name}! Your donation of $${donationAmount} has been recorded.`);
      setDonationAmount(""); // Reset input
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving adoption:", error);
      alert("An error occurred while processing your adoption. Please try again.");
    }
  };
  return (
  <Modal open={!!animal} onClose={onClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        overflowY: "auto",
        maxHeight: "90vh",
        maxWidth: 400,
        textAlign: "center",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {animal.name}
      </Typography>
      <CardMedia
        component="img"
        src={animal.imageUrl || "https://via.placeholder.com/150"}
        alt={animal.name}
        sx={{ maxHeight: 300, objectFit: "contain", margin: "0 auto", borderRadius: 2 }}
      />

      <Box sx={{ mt: 2, textAlign: "left" }}>
        <Typography variant="h6" gutterBottom>
          Details
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Size:
          </Typography>
          <Typography variant="body1">{animal.size}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Color:
          </Typography>
          <Typography variant="body1">{animal.color}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Price:
          </Typography>
          <Typography variant="body1">{animal.price}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Species:
          </Typography>
          <Typography variant="body1">{animal.species}</Typography>
        </Box>
      </Box>

      <Box sx={{ textAlign: "left", mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          History
        </Typography>
        <Typography variant="body1">{animal.history}</Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        label="Donation Amount ($)"
        value={donationAmount}
        onChange={(e) => {
          setDonationAmount(e.target.value);
          setError("");
        }}
        sx={{ mt: 2 }}
      />
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button onClick={handleAdopt} variant="contained" color="success">
          Sponsor
        </Button>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Box>
  </Modal>
);
};




// Random Species Recommendation Component
const RandomSpecies = ({ onSpeciesRecommended }) => {
  const speciesList = ["giraffe", "cat", "elephant", "parrot", "dog", "horse", "ferret", "kangaroo"]; // Available species

  // Function to recommend a random species
  const recommendSpecies = () => {
    const randomIndex = Math.floor(Math.random() * speciesList.length); // Get random index from the list
    const randomSpecies = speciesList[randomIndex]; // Pick random species
    onSpeciesRecommended(randomSpecies); // Send the species back to the parent component
  };

  return (
    <div>
      <button onClick={recommendSpecies}>Get Species Recommendation</button>
    </div>
  );
};

// Species Component
const Species = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [recommendedSpecies, setRecommendedSpecies] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      const Animal = Parse.Object.extend("animals");
      const query = new Parse.Query(Animal);

      try {
        const results = await query.find();
        const formattedResults = results.map((animal) => {
          const imageFile = animal.get("image_url");
          const imageUrl = imageFile ? imageFile._url : null;
          return {
            id: animal.id,
            name: animal.get("name"),
            size: animal.get("size"),
            color: animal.get("color"),
            price: animal.get("price"),
            species: animal.get("species"),
            history: animal.get("history"),
            imageUrl,
          };
        });
        setAnimals(formattedResults);
        setFilteredAnimals(formattedResults); // Initially show all animals
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
  }, []);

  // Filter animals by species when recommended species changes
  useEffect(() => {
    if (recommendedSpecies) {
      setFilteredAnimals(animals.filter((animal) => animal.species === recommendedSpecies));
    } else {
      setFilteredAnimals(animals); // Show all if no species is selected
    }
  }, [recommendedSpecies, animals]);

  // Reset the list to show all animals
  const resetFilter = () => {
    setRecommendedSpecies(null);
  };
  const scrollToBottom = () => {
     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
   };

  return (
    <Box
      sx={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Our Database
      </Typography>
      <Typography variant="h5" gutterBottom>
        Explore all available sponsorships. Can't decide on an animal? Let us recommend a species for you using the filter below.
      </Typography>
      <Button
        variant="contained"
        onClick={scrollToBottom}
        sx={{ mt: 2, bgcolor: "gray", color: "white", "&:hover": { bgcolor: "#505050" } }}
      >
        Use Filter
      </Button>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        {filteredAnimals.map((animal) => (
          <Grid item key={animal.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{ maxWidth: 300, margin: "0 auto", cursor: "pointer" }}
              onClick={() => setSelectedAnimal(animal)}
            >
              <CardMedia
                component="img"
                height="150"
                image={animal.imageUrl || "https://via.placeholder.com/150"}
                alt={animal.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {animal.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {animal.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AnimalModal animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} />

      <Box ref={bottomRef} sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recommended Species: {recommendedSpecies || "None"}
        </Typography>
        <RandomSpecies onSpeciesRecommended={setRecommendedSpecies} />
        <Button
          onClick={resetFilter}
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: "#306b36", color: "white" }}
        >
          Reset Filter
        </Button>
      </Box>
    </Box>
  );
};

export default Species;
