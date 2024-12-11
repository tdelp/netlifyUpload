// Random Cost Generator Component
const RandomCost = ({ onCostGenerated }) => {
  // Function to generate random number
  const generateRandomCost = () => {
    const randomCost = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    onCostGenerated(randomCost); // Send the number back to the parent component
  };

  return (
    <div>
      <button onClick={generateRandomCost}>Generate Random Cost</button>
    </div>
  )
};

export default RandomCost;