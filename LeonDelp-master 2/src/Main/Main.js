import { useEffect, useState } from "react";
import { getAllPurchased } from "../servs/Users.js";
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
const backgroundImage = "/images/animals_background.jpg";

const Main = () => {
  const [purchased, setPurchased] = useState([]);

  useEffect(() => {
    getAllPurchased().then((fetchedPurchased) => {
      console.log("Fetched purchased items:", fetchedPurchased); // Debugging line
      // Sort the purchased items in decreasing order by cost
      const sortedPurchased = fetchedPurchased.sort((a, b) => b.cost - a.cost);
      setPurchased(sortedPurchased);
    });
  }, []);

  return (
    <Container 
      maxWidth="md" 
      style={{ 
        marginTop: "2rem", 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: "cover", 
        padding: "2rem", 
        borderRadius: "8px" 
      }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Leadership Board
      </Typography>
      <TableContainer component={Paper} style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">#</Typography></TableCell>
              <TableCell><Typography variant="h6">Name</Typography></TableCell>
              <TableCell><Typography variant="h6">Buyer</Typography></TableCell>
              <TableCell><Typography variant="h6">Cost</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchased.map((item, index) => (
              <TableRow 
                key={item.id} 
                style={index === 0 ? { backgroundColor: "#d4edda" } : {}}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.buyer}</TableCell>
                <TableCell>${item.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Main;